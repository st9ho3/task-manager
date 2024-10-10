import React, { useContext, useEffect } from 'react';
import { auth } from '../../../../utils/Firebase';
import { signOut } from 'firebase/auth';
import { authContext, INITIAL_STATE } from '../../../../Context/AuthContext';
import { routeContext } from '../../../../Context/RouteContext';
import { fileUploadContext } from '../../../../Context/FileUploadContext';
import {TaskForm, PopUpWindow} from '../../../../Constants/Components'
import { eventContext } from '../../../../Context/EventContext';
import { taskContext } from '../../../../Context/TaskContext';

const TaskBoard = () => {
  const { state,authDispatch } = useContext(authContext);
  const { fileState,uploadDispatch } = useContext(fileUploadContext);
  const { routeState,dispatch } = useContext(routeContext);
  const { eventState,eventDispatch } = useContext(eventContext);
  const { taskState,taskDispatch } = useContext(taskContext)

  const resetForms = () => {
    dispatch({ type: 'ONFORMSWITCH', payload: 'login' });
    authDispatch({type: 'RESET_FORM', initialState: INITIAL_STATE})
    eventDispatch({type: 'RESET_FORM'})
    uploadDispatch({type: 'RESET_FILE_STATE'})
    taskDispatch({type: 'RESET_FORM'})
  }
  const SignOut = () => {
    signOut(auth)
      .then(() => {
        authDispatch({ type: 'SET_CURRENT_USER', payload: auth.currentUser });
        uploadDispatch({ type: 'RESET_FILE_STATE' });
        setTimeout(() => {
          resetForms();
        }, 300);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  

  return (
    <div>
      <PopUpWindow type='signout' action={SignOut} />
      {routeState.currentForm === 'taskForm' && <TaskForm />}
    </div>
  );
};

export default TaskBoard;