// vercel.js - Adapter for Vercel Serverless Functions
const fs = require('fs');
const path = require('path');
const { createServer: createViteServer } = require('vite');

// Cached production assets
let template;
let render;
let manifest;
let isProd = process.env.NODE_ENV === 'production';

async function getProductionDependencies() {
	// In production, we need these files only once
	if (!template || !render || !manifest) {
		template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
		render = require('./dist/server/entry-server.js').render;
		// Optional: SSR manifest for preload directives
		try {
			manifest = JSON.parse(
				fs.readFileSync(path.resolve(__dirname, 'dist/client/.vite/ssr-manifest.json'), 'utf-8')
			);
		} catch (e) {
			// Handle case where manifest doesn't exist
			console.warn('SSR manifest not found');
		}
	}

	return { template, render, manifest };
}

// This is the main handler for Vercel
export default async function handler(req, res) {
	try {
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
			res.status(200).send(html);
		} else {
			// In development: Use Vite's development server
			const vite = await createViteServer({
				server: { middlewareMode: true },
				appType: 'custom'
			});

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
			res.status(200).send(html);
		}
	} catch (e) {
		// Handle errors
		console.error(e.stack);
		res.status(500).send(`Server Error: ${e.message}`);
	}
}

// For local development outside Vercel
if (require.main === module) {
	// Create a simple Express server for local testing
	const express = require('express');
	const app = express();
	const port = process.env.PORT || 3000;

	app.use('*', handler);

	app.listen(port, () => {
		console.log(`Local development server started at http://localhost:${port}`);
	});
}
