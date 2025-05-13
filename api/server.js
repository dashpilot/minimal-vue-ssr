// api/server.js - Serverless function for Vercel
const fs = require('fs');
const path = require('path');

// Cached production assets
let template;
let render;

// Helper to load the required assets
async function loadAssets() {
	if (!template || !render) {
		try {
			// Get the base directory - in Vercel it's /var/task
			const baseDir = process.cwd();
			console.log('Current working directory:', baseDir);

			// Load the HTML template
			const templatePath = path.join(baseDir, 'dist/client/index.html');
			console.log('Template path:', templatePath);
			let rawTemplate = fs.readFileSync(templatePath, 'utf-8');

			// Fix asset paths by adding /client prefix to assets
			template = rawTemplate.replace(/(href|src)="\/assets\//g, '$1="/client/assets/');

			// Import the server entry - this is generated as an ES module
			const serverEntryPath = path.join(baseDir, 'dist/server/entry-server.mjs');
			console.log('Server entry path:', serverEntryPath);

			// Since we're using ES modules, we need to import it dynamically
			const serverEntry = await import(`file://${serverEntryPath}`);
			render = serverEntry.render;

			console.log('Assets loaded successfully');
		} catch (err) {
			console.error('Error loading assets:', err);
			throw err;
		}
	}
	return { template, render };
}

// Export the handler for Vercel
module.exports = async (req, res) => {
	// Log some debug information
	console.log('Request URL:', req.url);
	console.log('NODE_ENV:', process.env.NODE_ENV);

	// Handle static asset requests directly
	if (req.url.startsWith('/client/')) {
		try {
			const filePath = path.join(process.cwd(), 'dist', req.url);
			console.log('Static file request:', filePath);

			if (fs.existsSync(filePath)) {
				const content = fs.readFileSync(filePath);

				// Set the correct content type based on file extension
				const ext = path.extname(filePath);
				let contentType = 'text/plain';

				if (ext === '.css') contentType = 'text/css';
				if (ext === '.js') contentType = 'application/javascript';
				if (ext === '.json') contentType = 'application/json';
				if (ext === '.svg') contentType = 'image/svg+xml';
				if (ext === '.png') contentType = 'image/png';
				if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

				res.setHeader('Content-Type', contentType);
				return res.status(200).send(content);
			}
		} catch (err) {
			console.error('Error serving static file:', err);
			return res.status(404).send('File not found');
		}
	}

	try {
		const url = req.url || '/';

		// Load the required assets
		const { template, render } = await loadAssets();

		// Render the page
		const appContent = await render(url);

		// Inject the app content into the HTML template
		const html = template.replace('<!--ssr-outlet-->', appContent);

		// Send the rendered HTML
		res.setHeader('Content-Type', 'text/html');
		return res.status(200).send(html);
	} catch (err) {
		console.error('Server error:', err);
		return res.status(500).send(`Server Error: ${err.message}`);
	}
};
