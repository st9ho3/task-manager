// Header.js
import React, { useContext } from 'react';
import { auth } from '../../../utils/Firebase';
import { signOut } from "firebase/auth";
import { authContext, INITIAL_STATE } from '../../../Context/AuthContext';
import { routeContext } from '../../../Context/RouteContext';
const Header = () => {
  const {state,authDispatch} = useContext(authContext)
  const {dispatch} = useContext(routeContext)
  
  const handleclick = () => {signOut(auth).then(() => {
    authDispatch({type:'SET_CURRENT_USER', payload: auth.currentUser})
    setTimeout(() => {
      dispatch({type:'ONFORMSWITCH', payload: 'login'}),300
      authDispatch({type:'RESET_FORM', initialState: INITIAL_STATE})
    })
    setTimeout(() => {

    })
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });}

  return (
    <div className='header'>
      <button onClick={handleclick} >Sign out</button>
    </div>
  );
};
export default Header;