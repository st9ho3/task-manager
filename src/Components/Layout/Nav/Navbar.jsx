import React, { useContext, useState } from 'react';
import { GoHomeFill } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";

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
        </div>
        <SignOutButton />
      
    </div>
  )
}

export default Navbar
