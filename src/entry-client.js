import { createApp } from './main';

// Get current path
const path = window.location.pathname;

// Create app with the current path
const { app } = createApp(path);

// Mount the app
app.mount('#app');
