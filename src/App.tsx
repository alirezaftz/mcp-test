import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the HelloWorld component within a main wrapper
 */
export const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application content">
      <HelloWorld 
        title="Hello World"
        placeholder="Enter your name..."
        greeting="Hello"
      />
    </main>
  );
};