import { useContext } from 'react';
import { taskContext } from '../Context/TaskContext';
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../utils/Firebase";

const useAddTask = () => {
  const { taskState, taskDispatch } = useContext(taskContext);

  const handleTaskCreation = async () => {
    try {
      taskDispatch({type:'UPDATE_TASKS', payload: taskState.task})
      await setDoc(doc(db, "tasks", taskState.task.id), {
        ...taskState.task,
      });
      taskDispatch({type:'RESET_FORM'})
    } catch (error) {
      console.error(error); // Use console.error for errors
    }
  };

  return {
    handleTaskCreation,
  };
};

export default useAddTask;