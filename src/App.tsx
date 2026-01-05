import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the HelloWorld component with default text
 */
export const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application">
      <HelloWorld 
        defaultText="Hello World"
        placeholderText="Type your message here..."
      />
    </main>
  );
};