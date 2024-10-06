import React, { useContext, useEffect } from 'react';
import { auth } from '../../../../utils/Firebase';
import { signOut } from 'firebase/auth';
import { authContext, INITIAL_STATE } from '../../../../Context/AuthContext';
import { routeContext } from '../../../../Context/RouteContext';
import { fileUploadContext } from '../../../../Context/FileUploadContext';
import {TaskForm, PopUpWindow} from '../../../../Constants/Components'
import { eventContext } from '../../../../Context/EventContext';

const TaskBoard = () => {
  const { authDispatch } = useContext(authContext);
  const { uploadDispatch } = useContext(fileUploadContext);
  const { routeState,dispatch } = useContext(routeContext);
  const { eventDispatch } = useContext(eventContext);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out')
        authDispatch({ type: 'SET_CURRENT_USER', payload: auth.currentUser });
        uploadDispatch({ type: 'RESET_FILE_STATE' });
        setTimeout(() => {
          dispatch({ type: 'ONFORMSWITCH', payload: 'login' });
          authDispatch({ type: 'RESET_FORM', initialState: INITIAL_STATE });
        }, 300);
      })
      .catch((error) => {
        // An error happened.
      });
    eventDispatch({ type: 'RESET_FORM' });
  };
  

  return (
    <div>
      <PopUpWindow type='signout' action={SignOut} />
      {routeState.currentForm === 'taskForm' && <TaskForm />}
    </div>
  );
};

export default TaskBoard;