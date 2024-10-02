import React, { useContext } from 'react';
import { routeContext } from '../../Context/RouteContext';


const FormBottomSection = ({ type, error }) => {
  const {state, dispatch} = useContext(routeContext)

  return (
    <>
      <p className="formTitle">
        {type === 'login' ? 'Welcome back' : 'Join Now for Success'}
      </p>
      <div className="bottomMessage">
        <hr />
        <p className="regSignIn">
          {type === 'login' ? "Don't you have an account? " : 'Already have an account? '}
          <span className="routeSpan" onClick={() => dispatch({type:'ONFORMSWITCH', payload: type === 'login' ? 'register' : 'login'})}>
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