# Hello World Page

A simple, beautifully styled Hello World page built with React, TypeScript, and Vite.

## Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ Fully accessible (WCAG 2.2 compliant)
- ✅ Semantic HTML5
- ✅ BEM CSS methodology
- ✅ Responsive design
- ✅ Comprehensive Jest unit tests
- ✅ Smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Test

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
│   │   └── HelloWorld.tsx      # Main component
│   ├── __tests__/
│   │   ├── App.test.tsx        # App component tests
│   │   └── HelloWorld.test.tsx # HelloWorld component tests
│   ├── App.tsx                 # Root app component
│   ├── main.tsx                # Application entry point
│   ├── styles.css              # Global styles
│   └── setupTests.ts           # Jest setup
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── jest.config.js              # Jest config
```

## Accessibility

This project follows WCAG 2.2 guidelines:

- Semantic HTML elements (`<section>`, `<main>`, `<button>`)
- Proper ARIA attributes (`role`, `aria-label`)
- Keyboard navigation support
- Focus indicators
- Sufficient color contrast

## Testing

All components have comprehensive test coverage:

- ✅ Rendering tests
- ✅ Accessibility tests
- ✅ BEM class naming validation
- ✅ Interactivity tests
- ✅ Props validation

## License

MIT