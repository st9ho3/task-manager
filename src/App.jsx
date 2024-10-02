import React, { useContext } from 'react';
import { Layout, AuthForm } from './Constants/Components';
import { routeContext } from './Context/RouteContext';

const App = () => {
  const { state, dispatch } = useContext(routeContext);

  return (
    <div className="app">
      {state.currentForm === 'login' && (
        <AuthForm 
          formType='login' 
          onFormSwitch={() => dispatch({type: 'ONFORMSWITCH', payload: 'register'})} 
        />
      )}
      {state.currentForm === 'register' && (
        <AuthForm 
          formType='registration' 
          onFormSwitch={() => dispatch({type: 'ONFORMSWITCH', payload: 'login'})} 
        />
      )}
      {state.currentForm === 'home' && <Layout />}
    </div>
  );
};

export default App;
