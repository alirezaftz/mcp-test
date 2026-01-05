import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main App Component
 * 
 * Root component that renders the HelloWorld component
 */
const App: React.FC = () => {
  return (
    <main role="main">
      <HelloWorld />
    </main>
  );
};

export default App;