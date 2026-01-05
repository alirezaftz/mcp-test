import React from 'react';
import HelloWorld from './components/HelloWorld';

/**
 * Main application component
 * 
 * This component serves as the root of the application,
 * rendering the HelloWorld component with default props.
 * 
 * @returns React functional component
 */
const App: React.FC = () => {
  return <HelloWorld />;
};

export default App;