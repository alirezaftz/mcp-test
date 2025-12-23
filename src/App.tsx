import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main Application Component
 * 
 * Renders the HelloWorld component with default props
 * 
 * @returns {React.ReactElement} The rendered App component
 */
const App: React.FC = () => {
  return (
    <HelloWorld />
  );
};

export default App;