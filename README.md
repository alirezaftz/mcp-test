# Hello World Page

A simple "Hello World" page built with React and TypeScript, following best practices for accessibility, semantic HTML, and BEM naming conventions.

## Features

- ✅ React 18 with TypeScript
- ✅ Semantic HTML5 elements
- ✅ WCAG 2.2 compliant accessibility
- ✅ BEM class naming convention
- ✅ Responsive design with CSS clamp()
- ✅ Comprehensive Jest unit tests
- ✅ Vite for fast development

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── HelloWorld.tsx       # Main greeting component
│   ├── __tests__/
│   │   ├── App.test.tsx          # App component tests
│   │   └── HelloWorld.test.tsx   # HelloWorld component tests
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Application entry point
│   ├── styles.css                # Global styles
│   └── setupTests.ts             # Test configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
└── jest.config.js                # Jest config
```

## Accessibility Features

- Semantic HTML elements (`<section>`, `<main>`, `<h1>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators for keyboard users
- Screen reader friendly

## BEM Naming Convention

All CSS classes follow the BEM (Block Element Modifier) pattern:

- **Block**: `.hello-world`
- **Element**: `.hello-world__heading`, `.hello-world__message`
- **Modifier**: `.hello-world__button--primary`

## License

MIT