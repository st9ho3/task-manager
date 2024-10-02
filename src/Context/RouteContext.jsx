import React, { createContext, useReducer } from 'react';
import { routeReducer } from './RouteReducer';

const INITIAL_STATE = {
  currentForm: 'login',
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