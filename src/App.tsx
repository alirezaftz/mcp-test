import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component
 * Renders the Hello World page with text input
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld />
    </main>
  );
};