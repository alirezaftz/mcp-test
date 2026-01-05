import React from 'react';
import { HelloWorld } from './components/HelloWorld';

/**
 * Main application component that renders the Hello World page
 * @returns {JSX.Element} The application root component
 */
const App: React.FC = () => {
  return (
    <main className="app" role="main">
      <HelloWorld
        title="Hello World"
        subtitle="Enter your name below"
        placeholder="Type your name here..."
      />
    </main>
  );
};

export default App;