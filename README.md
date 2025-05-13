# Minimal Vue 3 SSR

A lightweight, minimalist approach to server-side rendering with Vue 3 and Vite.

## Overview

Minimal Vue 3 SSR provides the simplest possible implementation of server-side rendering for Vue 3 applications. It leverages Vue's built-in SSR capabilities without the overhead of complex frameworks, delivering excellent performance and developer experience with minimal code.

## Features

- **Server-side rendering** with full client-side hydration
- **Zero client-side routing** - uses traditional server routing for simplicity
- **Tiny footprint** - minimal dependencies and files
- **Fast development** with Vite's HMR
- **Excellent SEO** out of the box
- **Progressive enhancement** - works even without JavaScript
- **No complex configuration** - just Vue and Express
- **Flexible deployment** - works on Node.js servers or serverless platforms like Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run serve
```

## Project Structure

```
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── server.js               # Express server for Node.js environments
├── vercel.js               # Serverless adapter for Vercel deployment
├── vercel.json             # Vercel configuration
└── src/
    ├── main.js             # Vue app creation
    ├── components/         # Shared components
    │   └── Header.vue
    ├── pages/              # Page components
    │   ├── Home.vue
    │   ├── About.vue
    │   ├── Contact.vue
    │   └── NotFound.vue
    ├── entry-client.js     # Client-side hydration
    └── entry-server.js     # Server-side rendering
```

## How It Works

1. **Server-side:** When a request comes in, the server determines which page component to render based on the URL, renders it to HTML, and sends it to the client.

2. **Client-side:** The JavaScript bundle hydrates the static HTML, making it interactive without requiring a full page reload.

3. **Navigation:** Traditional HTML links (`<a href="/about">`) are used for navigation, triggering server-side rendering of each new page.

## Deployment Options

### Traditional Node.js Server

By default, the application runs on an Express server. Simply build and run:

```bash
npm run build
npm run serve
```

### Vercel Deployment

The included Vercel adapter allows deployment to Vercel's serverless environment:

1. Ensure you have the `vercel.js` and `vercel.json` files in your project
2. Deploy using the Vercel CLI or connect your repository on the Vercel dashboard:

```bash
vercel
```

## Performance Benefits

- **Fast initial load** - HTML is pre-rendered on the server
- **Great SEO** - search engines see complete content
- **Small JavaScript bundles** - each page only includes what it needs
- **Progressive enhancement** - core functionality works without JavaScript

## Extending

This minimal approach can be extended with:

- API endpoints in Express
- Database connections
- Authentication
- Environment variables
- Static asset optimization
- Adapters for other platforms (Netlify, Cloudflare, etc.)

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

Made with ❤️ using Vue 3 and Vite
