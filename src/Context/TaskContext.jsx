import React, { createContext, useReducer } from 'react'
import INITIAL_STATE, { taskReducer } from './TaskReducer'

export const taskContext = createContext()

const TaskContextProvider = ({children}) => {
    const [taskState, taskDispatch] = useReducer(taskReducer, INITIAL_STATE)

  return (
    <div>
        <taskContext.Provider value={{taskState, taskDispatch}}>
      {children}
        </taskContext.Provider>
    </div>
  )
}

export default TaskContextProvider
