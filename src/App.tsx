import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the HelloWorld page component
 */
export const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application">
      <HelloWorld
        title="Hello World"
        subtitle="Enter your name below"
        placeholderText="Enter your name"
        greetingPrefix="Hello"
      />
    </main>
  );
};