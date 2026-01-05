import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the Hello World page
 */
const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application">
      <HelloWorld 
        message="Hello World"
        subtitle="Welcome to your first React + TypeScript application"
      />
    </main>
  );
};

export default App;