import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './index.css';

/**
 * Main App Component
 * 
 * Root component that renders the HelloWorld page
 */
const App: React.FC = () => {
  return (
    <HelloWorld
      title="Hello World"
      subtitle="Welcome to our interactive greeting page"
      inputPlaceholder="Enter your name..."
      inputLabel="Your Name"
      defaultGreeting="Hello! Please enter your name above."
    />
  );
};

export default App;