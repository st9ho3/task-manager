import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from './AuthReducer';

export const INITIAL_STATE = {
  currentUser: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
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
  
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state.currentUser))
  },[state.currentUser])

  return (
    <authContext.Provider value={{currentUser: state.currentUser, state, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;