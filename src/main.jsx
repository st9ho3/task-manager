import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './Components/Layout/Layout.css';
import './Components/Layout/Nav/Navbar.css';
import './Components/Layout/Header/Header.css';
import './Components/Form/Element.css';
import './Components/Form/Form.css';
import './Components/Form/FormBottomSection.css';
import RouteContextProvider from './Context/RouteContext.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouteContextProvider>
        <App />
      </RouteContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);