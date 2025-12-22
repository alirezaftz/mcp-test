import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloWorld } from './components/HelloWorld';
import './styles/main.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);