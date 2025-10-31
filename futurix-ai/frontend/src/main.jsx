import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { ThemeProvider } from 'next-themes'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <App />
      </ThemeProvider>
      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: '12px', background: '#ffffff', color: '#1E293B', border: '1px solid #e2e8f0' }
      }} />
    </BrowserRouter>
  </React.StrictMode>
)


