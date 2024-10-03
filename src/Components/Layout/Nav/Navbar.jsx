import React, { useContext, useState } from 'react';
import { auth } from '../../../utils/Firebase';
import { signOut } from "firebase/auth";
import { authContext, INITIAL_STATE } from '../../../Context/AuthContext';
import { routeContext } from '../../../Context/RouteContext';
import { GoSignOut } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";



const Navbar = () => {
  const {state,authDispatch} = useContext(authContext)
  const {dispatch} = useContext(routeContext)
  const [toggle, settoggle] = useState('home')

  const handleclick = () => {signOut(auth).then(() => {
    authDispatch({type:'SET_CURRENT_USER', payload: auth.currentUser})
    setTimeout(() => {
      dispatch({type:'ONFORMSWITCH', payload: 'login'}),300
      authDispatch({type:'RESET_FORM', initialState: INITIAL_STATE})
    })
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });}
  return (
    <div className='navbar'>
      <div className='signoutContainer' onClick={handleclick}>
        <GoSignOut className='signoutButton' />
      </div>

      <div className="navCockpit">
        <div className={`ring ${toggle}`}></div>
          <GoHomeFill onClick={() => settoggle('home')} className={ toggle === 'home' ? 'active button' : 'button'} />
          <IoCreateOutline onClick={() => settoggle('create')} className={ toggle === 'create' ? 'active button' : 'button'} />
          <IoNotificationsOutline onClick={() => settoggle('not')} className={ toggle === 'not' ? 'active button' : 'button'} />
        </div>
      
    </div>
  )
}

export default Navbar
