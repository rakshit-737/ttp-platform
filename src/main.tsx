import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// HashRouter ignores path URLs (/courses renders Home): send shared or
// typed path links to their hash equivalent before the app mounts.
// Trailing-slash paths are the app's own mount point (e.g. GitHub Pages
// serves it at /ttp-platform/), never a route — leave those alone.
const { pathname, search, hash } = window.location;
if (!hash && pathname !== '/' && !pathname.endsWith('/') && !pathname.endsWith('index.html')) {
  window.location.replace('/#' + pathname + search);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
