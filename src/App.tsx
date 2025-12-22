import React from 'react';
import HelloWorld from './components/HelloWorld';
import './App.css';

/**
 * Main Application Component
 * 
 * Root component that renders the HelloWorld page
 */
const App: React.FC = () => {
  return (
    <div className="app">
      <HelloWorld />
    </div>
  );
};

export default App;