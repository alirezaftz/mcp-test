import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component
 * Renders the HelloWorld page
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld 
        message="Hello World"
        subtitle="Welcome to your first React + TypeScript application"
      />
    </main>
  );
};