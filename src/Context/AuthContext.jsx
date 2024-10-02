import { createContext, useReducer } from 'react';
import { authReducer } from './AuthReducer';

export const INITIAL_STATE = {
  login: {
    email: '',
    password: '',
    rememberMe: false,
  },
  registration: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeWithTermsOfService: false,
  },
  error: false,
  loading: false,
};

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  return (
    <authContext.Provider value={{ state, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
