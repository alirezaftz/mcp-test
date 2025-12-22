import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component
 * Renders the HelloWorld component
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld 
        title="Hello World"
        placeholder="Enter your name..."
        greeting="Welcome"
      />
    </main>
  );
};