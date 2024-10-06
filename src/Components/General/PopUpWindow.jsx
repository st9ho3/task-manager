import React, { useState, useEffect, useContext } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { fileUploadContext } from '../../Context/FileUploadContext';
import { eventContext } from '../../Context/EventContext';
import { FaArrowRight } from "react-icons/fa";



const PopUpWindow = ({ type, action }) => {
  const { fileState } = useContext(fileUploadContext);
  const { eventState, eventDispatch } = useContext(eventContext);

  // Compute the classes dynamically based on the toggle and eventState


  return (
    <div>
    {eventState.notification && (
      <div className="popupWindow">
        <div className="popUpIcon">
          <img className="popUpImg" src={fileState.fileURL} alt="notification-icon" />
        </div>
        <div className="popUpBody">
          <div className="popUpTitle">
            Notification
          </div>
          <div className="popUptext">
            Congratulations! Your new profile picture is great!
          </div>
        </div>
        <IoIosCloseCircleOutline className="closeButton" onClick={() => eventDispatch({ type: 'HIDE_MODAL', name: 'notification' })} />
      </div>
    )}
  
    {eventState.signOutRequest && (
      <div className="popupWindow signout">
        <div className="popUpBody signout" >
          <div className="popUpTitle signout">
            Are you sure you want to sign out?
          </div>
        </div>
        <div className="Buttons">
          <div className='Button A' onClick={action}>
            Sign out
            <FaArrowRight className='signoutArrow' />
          </div>
          <div className='Button B' onClick={() => eventDispatch({ type: 'HIDE_MODAL', name: 'signOutRequest' })}>Cancel</div>
        </div>
      </div>
    )}
  </div>
   
  );
};

export default PopUpWindow;