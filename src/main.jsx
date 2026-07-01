import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App.jsx'
import { ViewModeProvider } from './context/ViewModeContext'
import './index.css'
import './ppl-theme.css'

const rootEl = document.getElementById('root')

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <ViewModeProvider>
        <App />
      </ViewModeProvider>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
)

if (document.documentElement.dataset.prerendered === 'true' && rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, tree)
} else {
  ReactDOM.createRoot(rootEl).render(tree)
}
