export const INITIAL_STATE = {
    notification: false,
    signOutRequest:false
}
export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
           return {
            ...state,
            [action.name]: true
           }
        case 'HIDE_MODAL':
            return {
                ...state,
                [action.name]:false
            }
        case 'RESET_FORM':
            return {
                state:INITIAL_STATE
            }
        default:
            return state
    }
}