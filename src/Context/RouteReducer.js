export const routeReducer = (state, action) => {
  switch (action.type) {
    case 'ONFORMSWITCH':
      return {
        currentForm: action.payload
      }
    case 'HANDLESUCCESSLOGIN':
      return {
        currentForm: action.payload
      }
    default:
      return state
  }
}