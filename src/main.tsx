import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloWorld } from './components/HelloWorld';
import './index.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HelloWorld />
    </React.StrictMode>
  );
}