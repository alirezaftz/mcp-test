import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component that renders the Hello World page
 * @returns {JSX.Element} The main App component
 */
export const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name"
        inputLabel="Name"
      />
    </main>
  );
};