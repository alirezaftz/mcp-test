import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component that renders the HelloWorld page
 */
const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld
        title="Hello World"
        placeholder="Enter your name..."
        initialValue=""
      />
    </main>
  );
};

export default App;