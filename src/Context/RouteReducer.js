export const routeReducer = (state, action) => {
    switch (action.type) {
      case 'ONFORMSWITCH':
        return {
          currentForm: action.payload
        }
      case 'HANDLESUCCESSLOGIN':
        return {
          currentForm: 'home'
        }
      default:
        return state
    }
  }