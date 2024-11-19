import { useContext,useRef } from 'react';
import { taskContext } from '../Context/TaskContext';
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../utils/Firebase";
import { fileUploadContext } from '../Context/FileUploadContext';

const useAddTask = () => {
  const { taskState, taskDispatch } = useContext(taskContext);
  const {fileState, uploadDispatch} = useContext(fileUploadContext)

  const handleTaskCreation = async () => {
    try {
      taskDispatch({type:'UPDATE_TASKS', payload: taskState.task})
      await setDoc(doc(db, "tasks", taskState.task.id), {
        ...taskState.task,
      });
      taskDispatch({type:'RESET_FORM'})
      uploadDispatch({type:'RESET_FILE_STATE'})
    } catch (error) {
      console.error(error); // Use console.error for errors
    }
  };
  
  console.log()
  return {
    handleTaskCreation,
  };
};

export default useAddTask;