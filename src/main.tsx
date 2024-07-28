import React from 'react'
import {hydrateRoot, createRoot} from 'react-dom/client'
import App from './App.tsx'
import Header from "./Header.tsx";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

hydrateRoot(document.getElementById('header')!, <Header />);

