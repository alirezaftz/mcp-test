import React from 'react';
import HelloWorld from './components/HelloWorld';
import './styles/HelloWorld.css';

/**
 * Main Application Component
 * 
 * Renders the HelloWorld component with default props.
 */
const App: React.FC = () => {
  return (
    <HelloWorld 
      greeting="Hello, World!"
      inputPlaceholder="Enter your name..."
      inputLabel="Your Name:"
    />
  );
};

export default App;