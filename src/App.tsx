import React from 'react';
import HelloWorld from './components/HelloWorld';
import './App.css';

/**
 * Main App Component
 * 
 * Root component that renders the HelloWorld component
 */
const App: React.FC = () => {
  return (
    <main className="app" role="main">
      <HelloWorld />
    </main>
  );
};

export default App;