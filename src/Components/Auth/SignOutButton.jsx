import React, { useContext, useState } from 'react';
import { auth } from '../../utils/Firebase';
import { signOut } from "firebase/auth";
import { authContext, INITIAL_STATE } from '../../Context/AuthContext';
import { routeContext } from '../../Context/RouteContext';
import { GoSignOut } from "react-icons/go";
import { fileUploadContext } from '../../Context/FileUploadContext';

const SignOutButton = () => {
    const {state,authDispatch} = useContext(authContext)
  const {dispatch} = useContext(routeContext)
  const {uploadDispatch} = useContext(fileUploadContext)

  const handleclick = () => {signOut(auth).then(() => {
    authDispatch({type:'SET_CURRENT_USER', payload: auth.currentUser})
    uploadDispatch({type: 'RESET_FILE_STATE'})
    setTimeout(() => {
      dispatch({type:'ONFORMSWITCH', payload: 'login'}),300
      authDispatch({type:'RESET_FORM', initialState: INITIAL_STATE})

    })
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });}
  return (
    <div className='signoutContainer' onClick={handleclick}>
        <GoSignOut className='signoutButton' />
      </div>
  )
}

export default SignOutButton
