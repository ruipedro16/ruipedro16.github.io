# Personal Website

A minimalist personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Minimalist design with clean typography
- Dark/Light theme support with system preference detection
- Fully static export for GitHub Pages deployment
- Responsive layout
- TypeScript for type safety

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To build the static site:

```bash
npm run build
```

This will generate a static export in the `out` directory.

## Deployment

The site is configured to deploy to GitHub Pages. Push to the `main` branch to trigger automatic deployment.

## Structure

- `/app` - Next.js app directory with pages and components
- `/app/components` - React components (Navigation, ThemeToggle, etc.)
- `/public` - Static assets (CV, images, etc.)
