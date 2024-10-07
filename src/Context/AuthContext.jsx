import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { authReducer } from './AuthReducer'; // Reducer function for authentication state
import { storage, db } from "../utils/Firebase"; // Firebase services for storage and database
import { /* doc, updateDoc, getDoc */ collection, getDocs  } from "firebase/firestore"; // Firestore document operations
import { routeContext } from './RouteContext'; // Context for routing state

// Initial state for authentication context
export const INITIAL_STATE = {
  users:[],
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

 

    /* // Function to retrieve user details from Firestore
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
    }; */
    
    useEffect(() => {
      // Store current user in local storage
      localStorage.setItem('auth', JSON.stringify(state.currentUser));
    
      const updateData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersArray = []; // Array to hold all users' data
    
          querySnapshot.forEach((doc) => {
            const user = { ...doc.data(), id: doc.id };
            usersArray.push(user); // Push each user's data to array
          });
    
          // Dispatch action to update state.users
          authDispatch({ type: 'SET_USERS', payload: usersArray });
        } catch (error) {
          console.error("Error fetching users: ", error);
        }
      };
    
      // Only fetch and update users if there is a current user
      if (state.currentUser) {
        updateData();
      }
    
      // Update state.userDetails based on state.currentUser's id
      if (state.currentUser && state.users) {
        const currentUserDetails = state.users.find(
          (user) => user.id === state.currentUser.uid
        );
    
        if (currentUserDetails) {
          authDispatch({ type: 'SET_USER_DETAILS', payload: currentUserDetails });
        }
      }
    }, [state.currentUser, state.users, authDispatch]); // Added state.users as a dependency too

  // Render authentication context provider
  return (
    <authContext.Provider value={{ currentUser: state.currentUser, state, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;