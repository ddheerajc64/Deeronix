import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const app = (
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

createRoot(document.getElementById('root')).render(
  clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>{app}</ClerkProvider>
  ) : (
    app
  )
)
