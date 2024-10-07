import { createContext, useContext, useEffect, useReducer } from 'react';
import { authReducer } from './AuthReducer'; // Reducer function for authentication state
import { storage, db } from "../utils/Firebase"; // Firebase services for storage and database
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore document operations
import { routeContext } from './RouteContext'; // Context for routing state

// Initial state for authentication context
export const INITIAL_STATE = {
  userDetails: {}, // User details (e.g., name, email)
  currentUser: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null, // Current authenticated user
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
  error: false, // Error flag for authentication operations
  loading: false, // Loading flag for authentication operations
};

// Create authentication context
export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  // Use reducer for authentication state management
  const [state, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const { routeState } = useContext(routeContext); // Access routing state from context

  // Effect hook to persist authentication state and retrieve user details
  useEffect(() => {
    // Store current user in local storage
    localStorage.setItem('auth', JSON.stringify(state.currentUser));

    // Function to retrieve user details from Firestore
    const getData = async () => {
      const docRef = doc(db, "users", state.currentUser.uid); // Reference to user document
      const docSnap = await getDoc(docRef); // Get document snapshot

      if (docSnap.exists()) {
        // Update authentication state with user details
        authDispatch({ type: 'SET_USER_DETAILS', payload: docSnap.data() });
        
      } else {
        // Handle case where user document does not exist
        console.log("No such document!");
      }
    };

    // Call getPic function to retrieve user details
    state.currentUser && getData();
  }, [state.currentUser]); // Re-run effect when current user changes

  // Render authentication context provider
  return (
    <authContext.Provider value={{ currentUser: state.currentUser, state, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;