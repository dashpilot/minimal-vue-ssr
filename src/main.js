import { createSSRApp } from 'vue';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Contact from './pages/Contact.vue';
import NotFound from './pages/NotFound.vue';

// Map routes to components
const routes = {
	'/': Home,
	'/about': About,
	'/contact': Contact,
	404: NotFound
};

export function createApp(url) {
	// Get component for this URL or 404 component
	const page = routes[url] || routes['404'];

	// Create the app with the matched component
	const app = createSSRApp(page);

	return { app };
}
