import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './Components/Layout/Layout.css'
import './Components/Layout/Nav/Navbar.css'
import './Components/Layout/Header/Header.css'
import './Components/Auth/RegistrationForm.css'
import './Components/Form/Element.css'
import './Components/Form/Form.css'
import './Components/Form/FormBottomSection.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
