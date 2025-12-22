import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component that renders the Hello World page
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld />
    </main>
  );
};