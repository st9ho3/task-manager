import React, { createContext, useReducer, useEffect, useContext } from 'react'
import INITIAL_STATE, { taskReducer } from './TaskReducer'
import { authContext } from './AuthContext'
import { db } from "../utils/Firebase";
import { collection, getDocs } from "firebase/firestore";

export const taskContext = createContext()

const TaskContextProvider = ({children}) => {
    const [taskState, taskDispatch] = useReducer(taskReducer, INITIAL_STATE)
    const {state} = useContext(authContext)

    useEffect(() => {
      
      const fetchTasks = async () => {
        if (state.currentUser) {
          try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const tasksArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            taskDispatch({ type: 'GET_TASKS', payload: tasksArray });
          } catch (error) {
            console.error("Error fetching tasks: ", error);
          }
        }
      };
      
      fetchTasks();
     

    }, [state.currentUser]);
    
  return (
    <div>
        <taskContext.Provider value={{taskState, taskDispatch}}>
      {children}
        </taskContext.Provider>
    </div>
  )
}

export default TaskContextProvider
