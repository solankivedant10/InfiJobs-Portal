import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AnimatedBackground from './components/AnimatedBackground';
import './index.css'; // Ensure CSS is imported

// 1. Render the Background independently
// This prevents the heavy animation from re-rendering when the App state changes
const bgRoot = document.getElementById('background-root');
if (bgRoot) {
  ReactDOM.createRoot(bgRoot).render(
    <React.StrictMode>
      <AnimatedBackground />
    </React.StrictMode>
  );
}

// 2. Render the Main App
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}