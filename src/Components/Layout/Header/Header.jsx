import React, { useContext } from 'react';
import { authContext } from '../../../Context/AuthContext';

const Header = () => {
  const {state,authDispatch} = useContext(authContext)
  return (
    <div className='header'>
     <p className='welcome'>Welcome {state.userDetails.username} </p>
    </div>
  );
};
export default Header;