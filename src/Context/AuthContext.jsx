import { createContext, useContext, useEffect, useReducer } from 'react';
import { authReducer } from './AuthReducer';
import { db } from "../utils/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { routeContext } from './RouteContext';

export const INITIAL_STATE = {
  users: [],
  userDetails: {},
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
  const { routeState } = useContext(routeContext);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state.currentUser));
    const fetchUsers = async () => {
      if (state.currentUser) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          authDispatch({ type: 'SET_USERS', payload: usersArray });
        } catch (error) {
          console.error("Error fetching users: ", error);
        }
      }
    };

    fetchUsers();
  }, [state.currentUser]);

  useEffect(() => {
    if (state.currentUser && state.users.length > 0) {
      const currentUserDetails = state.users.find(user => user.id === state.currentUser.uid);
      if (currentUserDetails) {
        authDispatch({ type: 'SET_USER_DETAILS', payload: currentUserDetails });
      }
    }
  }, [state.currentUser, state.users]);
  return (
    <authContext.Provider value={{ currentUser: state.currentUser, state, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;