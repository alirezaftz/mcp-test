import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main Application Component
 * 
 * @component
 */
export const App: React.FC = () => {
  return (
    <HelloWorld 
      initialGreeting="Hello, World!"
      inputPlaceholder="Enter your name..."
      ariaLabel="Hello World application"
    />
  );
};

export default App;