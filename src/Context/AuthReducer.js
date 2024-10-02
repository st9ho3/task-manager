export const authReducer = (state, action) => {
    switch (action.type) {
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
          [action.form]: INITIAL_STATE[action.form],
          error: false
        }
      default:
        return state
    }
  }
  