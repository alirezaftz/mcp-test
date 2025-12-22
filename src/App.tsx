import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component that renders the HelloWorld page
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return (
    <main className="app">
      <HelloWorld 
        title="Hello World"
        placeholder="Enter your name"
        greeting="Welcome"
      />
    </main>
  );
};

export default App;