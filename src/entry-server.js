import { createApp } from './main';
import { renderToString } from '@vue/server-renderer';

export async function render(url) {
	// Create the app instance with the requested URL
	const { app } = createApp(url);

	// Render the app to HTML
	const appContent = await renderToString(app);

	return appContent;
}
