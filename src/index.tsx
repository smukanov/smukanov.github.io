import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter, BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { DAppProvider } from '@usedapp/core';
import { config } from './dapp/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {path: '/', element: <App />}
])

root.render(
  <DAppProvider config={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DAppProvider>
)