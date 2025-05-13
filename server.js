const fs = require('fs');
const path = require('path');
const express = require('express');

const isProduction = process.env.NODE_ENV === 'production';
const port = 3010;

async function createServer() {
	const app = express();

	let vite;

	if (!isProduction) {
		// In development: create Vite dev server
		const { createServer: createViteServer } = require('vite');

		vite = await createViteServer({
			server: { middlewareMode: true },
			appType: 'custom'
		});

		app.use(vite.middlewares);
	} else {
		// In production: serve built static assets
		app.use(express.static(path.resolve(__dirname, 'dist/client')));
	}

	// Handle all routes
	app.use('*', async (req, res) => {
		// Get the path from the request
		const url = req.originalUrl;

		try {
			// Read index.html
			let template = fs.readFileSync(
				isProduction
					? path.resolve(__dirname, 'dist/client/index.html')
					: path.resolve(__dirname, 'index.html'),
				'utf-8'
			);

			// Apply Vite transformations in development
			if (!isProduction) {
				template = await vite.transformIndexHtml(url, template);
			}

			// Load the server entry
			let render;
			if (!isProduction) {
				// In development, use Vite's HMR to get fresh module
				render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
			} else {
				// In production, use the built SSR bundle
				render = require('./dist/server/entry-server.js').render;
			}

			// Pass the URL path to the render function
			const appContent = await render(url);

			// Inject the app content into the HTML template
			const html = template.replace('<!--ssr-outlet-->', appContent);

			// Send rendered HTML
			res
				.status(url.includes('/not-found') ? 404 : 200)
				.set({ 'Content-Type': 'text/html' })
				.end(html);
		} catch (e) {
			// Handle errors
			if (!isProduction) {
				vite.ssrFixStacktrace(e);
			}
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});

	app.listen(port, () => {
		console.log(`Server started at http://localhost:${port}`);
	});
}

createServer();
