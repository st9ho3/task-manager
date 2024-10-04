import React, { useContext, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { authContext } from '../../Context/AuthContext';

const PopUpWindow = () => {
  const [toggle, setToggle] = useState(true);
  const {state} = useContext(authContext)
  

  return (
    <div>
      <div className={toggle ? 'popupWindow' : 'popupWindowClose'}>
        <div className="popUpIcon">
          <img
            className={toggle ? 'popUpImg' : 'popUpImgClose'}
            src={state.userDetails.img}
            alt="popup-icon"
          />
        </div>
        <div className="popUpBody">
          <p className={toggle ? 'popTitle' : 'popTitleClose'}>New Profile Photo</p>
          <p className={toggle ? 'poptext' : 'poptextClose'}>
            Your new photo is great! Keep it up... Great to see you active.
          </p>
        </div>
        <IoIosCloseCircleOutline onClick={() => setToggle(false)} className="closeButton" />
        
      </div>
    </div>
  );
};

export default PopUpWindow;