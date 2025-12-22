import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component that renders the HelloWorld page.
 * 
 * @returns {JSX.Element} The main application component
 */
export const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application content">
      <HelloWorld 
        title="Hello World"
        placeholder="Enter your name..."
        label="Your Name"
      />
    </main>
  );
};