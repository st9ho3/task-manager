export const authReducer = (state, action) => {
  switch (action.type) {
    // Update current authenticated user
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    // Update user details (e.g., name, email)
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    // Update a specific field within a form (login or registration)
    case 'SET_FIELD':
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          [action.name]: action.value,
        },
      };
    case 'ADD_VALUE':
      return {
        ...state,
        userDetails: {
          ...state.userDetails, 
          [action.field]: [...state.userDetails?.[action.field], action.payload]
        }
      }
    case 'REMOVE_VALUE':
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.field]: action.payload
        }
      }
    // Set error flag for authentication operations
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    // Set loading flag for authentication operations
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    // Reset all form fields and error/loading flags
    case 'RESET_FORM':
      return {
        ...state,
        login: action.initialState.login,
        registration: action.initialState.registration,
        userDetails: action.initialState.userDetails,
        error: false,
        loading: false,
      };
    case 'ADD_TAG':
      return {
        ...state,
        tempTagsStore: action.payload
      }
    case 'ADD_NEW_TAG':
      return {
        ...state,
        tempTagsStore: [
          ...state.tempTagsStore, action.payload
        ]
      }
    case 'REMOVE_TEMP_TAG':
      return {
        ...state,
        tempTagsStore: action.payload
      }

    default:
      return state;
  }
};