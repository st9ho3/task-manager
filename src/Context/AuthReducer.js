export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    case 'SET_FIELD':
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          [action.name]: action.value
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'RESET_FORM':
      return {
        ...state,
        login: action.initialState.login,
        registration: action.initialState.registration,
        error:false,
        loading:false
      }
    default:
      return state
  }
}
