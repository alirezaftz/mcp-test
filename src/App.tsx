import React from 'react';
import { HelloWorld } from './components/HelloWorld';
import './index.css';

/**
 * Main Application Component
 * 
 * Root component that renders the HelloWorld page
 */
const App: React.FC = () => {
  return <HelloWorld />;
};

export default App;