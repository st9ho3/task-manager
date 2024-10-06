import React, { createContext, useReducer } from 'react'
import { eventReducer, INITIAL_STATE } from './EventReducer'


export const eventContext = createContext()
const EventProvider = ({children}) => {
    const [eventState, eventDispatch] = useReducer(eventReducer, INITIAL_STATE)
  return (
    <div>
        <eventContext.Provider value={{eventState, eventDispatch}}>
        {children}
        </eventContext.Provider>
      
    </div>
  )
}

export default EventProvider
