import React, { createContext, useState } from 'react';
import {LoginForm, RegistrationForm, Layout} from './Constants/Components'

export const contextT = createContext()


const App = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const onFormSwitch = () => {
    setCurrentForm( currentForm === 'register' ? 'login' : 'register')
  }
  const handleSuccessLogin = () => {
    setCurrentForm('home')
  }
  return (
    <div className="app">
      <contextT.Provider value={{onFormSwitch, handleSuccessLogin}}>
        {currentForm === 'login' ? (
          <LoginForm onFormSwitch={() => setCurrentForm('register')} />
        ) : 
         currentForm === 'register' ? (
          <RegistrationForm onFormSwitch={() => setCurrentForm('login')} />
        ) :
         currentForm === 'home' ? (
          <Layout />
        ) : null}
      </contextT.Provider>
      
    </div>
  );
};

export default App;