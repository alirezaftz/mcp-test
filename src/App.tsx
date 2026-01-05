import React from 'react';
import HelloWorld from './components/HelloWorld';

/**
 * Root application component
 */
const App: React.FC = () => {
  return (
    <HelloWorld
      initialGreeting="Hello, World!"
      inputPlaceholder="Enter your name..."
    />
  );
};

export default App;