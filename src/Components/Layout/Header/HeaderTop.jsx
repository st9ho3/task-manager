import React,{useContext} from 'react'
import { authContext } from '../../../Context/AuthContext';
import { IoNotificationsOutline } from 'react-icons/io5';
import { PiMagnifyingGlassLight } from 'react-icons/pi';

const HeaderTop = () => {
    const { state, authDispatch } = useContext(authContext);
  return (
    <div className="top">
        <div className="searchBarContainer">
          <PiMagnifyingGlassLight className="searchBarIcon" />
          <input placeholder="Search..." className="searchBar" type="text" />
        </div>
        <IoNotificationsOutline className="NotificationIcon" />
         <p className="welcome">Welcome {state.userDetails.username}</p>
      </div>
  )
}

export default HeaderTop
