import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component
 * Renders the HelloWorld component within the main application structure
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld 
        greeting="Hello World"
        message="Welcome to your first React TypeScript application!"
      />
    </main>
  );
};