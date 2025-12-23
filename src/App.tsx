import React from 'react';
import HelloWorld from './components/HelloWorld';
import './App.css';

/**
 * Main App Component
 * 
 * Root component that renders the HelloWorld page
 */
const App: React.FC = () => {
  return (
    <main role="main" aria-label="Main application">
      <HelloWorld />
    </main>
  );
};

export default App;