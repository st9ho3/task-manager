import React, { useContext } from 'react';
import { contextT } from '../../App';

const FormBottomSection = ({ type, error }) => {
  const { onFormSwitch } = useContext(contextT);

  return (
    <>
      <p className="formTitle">
        {type === 'login' ? 'Welcome back' : 'Join Now for Success'}
      </p>
      <div className="bottomMessage">
        <hr />
        <p className="regSignIn">
          {type === 'login' ? "Don't you have an account? " : 'Already have an account? '}
          <span className="routeSpan" onClick={onFormSwitch}>
            {type === 'login' ? 'Register' : 'Sign in'}
          </span>
        </p>
      </div>
      {type === 'login' && error && (
        <p className='errorMessage'>Oops!!! Wrong Email or Password</p>
      )}
    </>
  );
};

export default FormBottomSection;