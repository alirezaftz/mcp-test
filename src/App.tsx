import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the HelloWorld page component
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld />
    </main>
  );
};