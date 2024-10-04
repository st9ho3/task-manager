import React, { useContext } from 'react';
import { Layout, AuthForm } from './Constants/Components';
import { routeContext } from './Context/RouteContext';
import { authContext } from './Context/AuthContext';

const App = () => {
  const { routeState, dispatch } = useContext(routeContext);
  const {currentUser} = useContext(authContext)

  return (
    <div className="app">
      {routeState.currentForm === 'login' && !currentUser && (
        <AuthForm 
          formType='login' 
          onFormSwitch={() => dispatch({type: 'ONFORMSWITCH', payload: 'register'})} 
        />
      )}
      {routeState.currentForm === 'register' && !currentUser && (
        <AuthForm 
          formType='registration' 
          onFormSwitch={() => dispatch({type: 'ONFORMSWITCH', payload: 'login'})} 
        />
      )}
      {routeState.currentForm === 'home' && <Layout /> || currentUser && <Layout />}
    </div>
  );
};

export default App;
