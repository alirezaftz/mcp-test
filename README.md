# Hello World Application

A simple, accessible Hello World page built with React, TypeScript, and Vite, featuring comprehensive Playwright testing.

## Features

- 🎨 Beautiful gradient design with smooth animations
- ♿ WCAG 2.2 compliant accessibility
- 📱 Fully responsive (mobile, tablet, desktop)
- 🧪 Comprehensive test coverage (component + E2E)
- ⚡ Fast development with Vite
- 🎯 TypeScript for type safety
- 🎭 Playwright for reliable testing

## Prerequisites

- Node.js 18+ 
- npm 9+

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

## Building

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Testing

Run all tests (component + E2E):

```bash
npm test
```

Run component tests only:

```bash
npm run test:component
```

Run E2E tests only:

```bash
npm run test:e2e
```

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── HelloWorld.tsx      # Main component
│   │   └── HelloWorld.css      # Component styles
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styles
│   └── main.tsx                # Entry point
├── tests/
│   ├── component/
│   │   └── HelloWorld.spec.tsx # Component tests
│   └── e2e/
│       └── hello-world.spec.ts # E2E tests
├── playwright/
│   ├── index.html              # Component test harness
│   └── index.tsx               # React setup
├── playwright-ct.config.ts     # Component test config
├── playwright.config.ts        # E2E test config
├── vite.config.ts              # Vite config
└── package.json
```

## Coding Standards

This project follows strict coding standards:

- **Semantic HTML**: Uses `<section>`, `<main>`, `<button>` with proper ARIA attributes
- **BEM Naming**: All CSS classes follow Block__Element--Modifier pattern
- **Accessibility**: WCAG 2.2 compliant with proper roles and labels
- **TypeScript**: Full type safety with interfaces and type annotations
- **Testing**: Comprehensive coverage with Playwright component and E2E tests

## Accessibility Features

- Semantic HTML structure
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible indicators
- Proper heading hierarchy
- High contrast colors

## Browser Support

Tested on:
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)

## License

MIT