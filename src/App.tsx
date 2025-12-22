import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component
 * 
 * @returns The root application component
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        label="What's your name?"
      />
    </main>
  );
};