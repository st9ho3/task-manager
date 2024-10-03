import React, { useContext, useState } from 'react';
import { auth } from '../../../utils/Firebase';
import { signOut } from "firebase/auth";
import { authContext, INITIAL_STATE } from '../../../Context/AuthContext';
import { routeContext } from '../../../Context/RouteContext';
import { GoSignOut } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import {SignOutButton, ProfileButton} from '../../../Constants/Components'



const Navbar = () => {
  const [toggle, settoggle] = useState('home')


  return (
    <div className='navbar'>
      <ProfileButton />
      <div className="navCockpit">
        <div className={`ring ${toggle}`}></div>
          <GoHomeFill onClick={() => settoggle('home')} className={ toggle === 'home' ? 'active button' : 'button'} />
          <IoCreateOutline onClick={() => settoggle('create')} className={ toggle === 'create' ? 'active button' : 'button'} />
          <IoNotificationsOutline onClick={() => settoggle('not')} className={ toggle === 'not' ? 'active button' : 'button'} />
        </div>
        <SignOutButton />
      
    </div>
  )
}

export default Navbar
