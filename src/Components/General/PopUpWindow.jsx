import React, { useState, useEffect, useContext } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { fileUploadContext } from '../../Context/FileUploadContext';

const PopUpWindow = ({ type, handleSignOut }) => {
  const [toggle, setToggle] = useState(true);
  const { fileState } = useContext(fileUploadContext);

  useEffect(() => {
    if (type === 'popup' && fileState.fileURL) {
      setTimeout(() => setToggle(true), 5000);
      setTimeout(() => setToggle(false), 14000);
    }
  }, [fileState.fileURL, type]);

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <div className={type === 'popup' ? 'popUp' : 'signOutPopUp'}>
      <div className={toggle ? (type === 'popup' ? 'popupWindow' : 'signOutWindow') : 'popupWindowClose'}>
        {type === 'popup' ? (
          <>
            <div className="popUpIcon">
              <img
                className={toggle ? 'popUpImg' : 'popUpImgClose'}
                src={fileState.fileURL}
                alt="popup-icon"
              />
            </div>
            <div className="popUpBody">
              <p className={toggle ? 'popTitle' : 'popTitleClose'}>New Profile Photo</p>
              <p className={toggle ? 'poptext' : 'poptextClose'}>
                Your new photo is great! Keep it up... Great to see you active.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="popUpBodySignOut">
              <p className='popTitleSignOut'>Are you sure you want to sign out?</p>
              <div className="buttons">
                <div className="Button A" onClick={handleSignOut}>Yes, sign out</div>
                <div className="Button B" onClick={handleClose}>Cancel</div>
              </div>
            </div>
          </>
        )}
        {type === 'popup' && (
          <IoIosCloseCircleOutline onClick={handleClose} className="closeButton" />
        )}
      </div>
    </div>
  );
};

export default PopUpWindow;