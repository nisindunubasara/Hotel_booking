import { StrictMode } from 'react' // dvelopment time error checking
import { createRoot } from 'react-dom/client' //converts react components into HTML and renders them in the browser
import './index.css' // global styles
import App from './App.jsx' // UI structure and logic of the application
import { BrowserRouter } from 'react-router-dom' // enables client-side routing, allowing navigation without full page reloads
import { ClerkProvider } from '@clerk/clerk-react' 
import { AppProvider } from './context/AppContext.jsx' // app ekata common state and functions provide karanna use karanawa

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render( //HTML file eke id eka root thiyena element ekata react app eka render karanawa
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>
)
 