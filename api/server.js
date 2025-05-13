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
			template = fs.readFileSync(templatePath, 'utf-8');

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
