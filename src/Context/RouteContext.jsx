import React, { createContext, useContext, useReducer } from 'react';
import { routeReducer } from './RouteReducer';
import { authContext } from './AuthContext';

const INITIAL_STATE = {
  currentForm: 'login'
};

export const routeContext = createContext();

const RouteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, INITIAL_STATE);
  
  return (
    <routeContext.Provider value={{ state, dispatch }}>
      {children}
    </routeContext.Provider>
  );
};

export default RouteContextProvider;