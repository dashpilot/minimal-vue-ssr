// vercel.js - Adapter for Vercel Serverless Functions
const fs = require('fs');
const path = require('path');

// Cached production assets
let template;
let render;
let isProd = process.env.NODE_ENV === 'production';

async function getProductionDependencies() {
	// In production, we need these files only once
	if (!template || !render) {
		try {
			const templatePath = path.join(process.cwd(), 'dist/client/index.html');
			console.log('Looking for template at:', templatePath);
			template = fs.readFileSync(templatePath, 'utf-8');

			const serverEntryPath = path.join(process.cwd(), 'dist/server/entry-server.js');
			console.log('Looking for server entry at:', serverEntryPath);

			if (fs.existsSync(serverEntryPath)) {
				console.log('Server entry exists');

				// List directory contents for debugging
				const serverDir = path.join(process.cwd(), 'dist/server');
				console.log('Server directory contents:', fs.readdirSync(serverDir));

				render = require(serverEntryPath).render;
			} else {
				console.error('Server entry file does not exist');
				throw new Error('Server entry file not found');
			}
		} catch (err) {
			console.error('Error loading production dependencies:', err);
			throw err;
		}
	}

	return { template, render };
}

let vite;
// This is the main handler for Vercel
module.exports = async function handler(req, res) {
	try {
		// Log the current environment and working directory
		console.log('NODE_ENV:', process.env.NODE_ENV);
		console.log('CWD:', process.cwd());
		console.log('Directory contents:', fs.readdirSync(process.cwd()));

		if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
			console.log('Dist directory contents:', fs.readdirSync(path.join(process.cwd(), 'dist')));

			if (fs.existsSync(path.join(process.cwd(), 'dist/server'))) {
				console.log(
					'Server dist contents:',
					fs.readdirSync(path.join(process.cwd(), 'dist/server'))
				);
			}

			if (fs.existsSync(path.join(process.cwd(), 'dist/client'))) {
				console.log(
					'Client dist contents:',
					fs.readdirSync(path.join(process.cwd(), 'dist/client'))
				);
			}
		}

		const url = req.url || '/';

		if (isProd) {
			// In production: Use the pre-built app
			const { template, render } = await getProductionDependencies();

			// SSR the page
			const appContent = await render(url);

			// Inject the app content into the HTML template
			const html = template.replace('<!--ssr-outlet-->', appContent);

			// Send rendered HTML
			res.setHeader('Content-Type', 'text/html');
			return res.status(200).send(html);
		} else {
			// In development: Use Vite's development server
			if (!vite) {
				const { createServer } = require('vite');
				vite = await createServer({
					server: { middlewareMode: true },
					appType: 'custom'
				});
			}

			// Apply Vite transforms to the template
			let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
			template = await vite.transformIndexHtml(url, template);

			// Load the server entry
			const { render } = await vite.ssrLoadModule('/src/entry-server.js');

			// Render the page
			const appContent = await render(url);

			// Inject the app content into the HTML template
			const html = template.replace('<!--ssr-outlet-->', appContent);

			// Send rendered HTML
			res.setHeader('Content-Type', 'text/html');
			return res.status(200).send(html);
		}
	} catch (e) {
		// Handle errors with detailed information
		console.error('Handler error details:', e);
		console.error('Error stack:', e.stack);
		return res.status(500).send(`Server Error: ${e.message}`);
	}
};

// For local development outside Vercel
if (require.main === module) {
	// Create a simple Express server for local testing
	const express = require('express');
	const app = express();
	const port = process.env.PORT || 3000;

	app.use('*', (req, res) => module.exports(req, res));

	app.listen(port, () => {
		console.log(`Local development server started at http://localhost:${port}`);
	});
}
