import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

/**
 * Main application component
 * Renders the HelloWorld page with text input functionality
 */
const App: React.FC = () => {
  return (
    <main className="app" role="main" aria-label="Main application">
      <HelloWorld
        title="Hello World"
        subtitle="Welcome to our simple page"
        placeholder="Type something here..."
        initialValue=""
      />
    </main>
  );
};

export default App;