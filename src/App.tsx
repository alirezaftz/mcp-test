import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Root App Component
 * 
 * Main application entry point that renders the HelloWorld component
 */
export const App: React.FC = () => {
  return (
    <HelloWorld 
      initialGreeting="Hello, World!"
      placeholder="Enter your name..."
    />
  );
};