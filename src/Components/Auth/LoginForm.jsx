import React, { useContext, useState } from 'react';
import { Form } from '../../Constants/Components';
import { loginData } from '../../Constants/FormData';
import { auth } from '../../utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { routeContext } from '../../Context/RouteContext';
import { authContext } from '../../Context/AuthContext';

const LoginForm = ({formstate}) => {

  const { dispatch } = useContext(routeContext)
  const {authDispatch } = useContext(authContext)
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    authDispatch({type: 'SET_FIELD', form: formstate, value: type === 'checkbox' ? checked : value, name:name})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authDispatch({type:'SET_LOADING',payload: true})
    authDispatch({type:'SET_ERROR',payload: false})
    if (formstate === 'login')
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        dispatch({type: 'HANDLESUCCESSLOGIN'})
      })
      .catch((error) => {
        authDispatch({type:'SET_ERROR',payload: true})
        setTimeout(() => authDispatch({type:'SET_ERROR',payload: false}), 3000)
        console.error(error)
      });
      else {
        e.preventDefault();
    if (formState.password === formState.confirmPassword) {
      createUserWithEmailAndPassword(auth, formState.email, formState.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          dispatch({type:'HANDLESUCCESSLOGIN'})
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(true);
        });
    } else {
      setError(true);
    }
      }
  };

  const updatedLoginData = loginData.map(field => ({
    ...field,
    value: formState[field.name],
    onChange: handleInputChange
  }));

  return (
    <div>
      <Form
        formData={updatedLoginData}
        type={formState}
        error={error}
        onSubmit={handleSubmit}
        user={formState}
      />
    </div>
  );
}

export default LoginForm;