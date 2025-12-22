import React from 'react';
import HelloWorld from './components/HelloWorld';
import './components/HelloWorld.css';

/**
 * Main application component
 * 
 * Renders the HelloWorld component with default props
 */
const App: React.FC = () => {
  return <HelloWorld />;
};

export default App;