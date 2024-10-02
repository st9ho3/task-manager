// AuthForm.js
import React, { useContext } from 'react';
import { Form } from '../../Constants/Components';
import { RegistrationFormData, loginData } from '../../Constants/FormData';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/Firebase';
import { routeContext } from '../../Context/RouteContext';
import { authContext } from '../../Context/AuthContext';

const AuthForm = ({ formType }) => {
  const { dispatch } = useContext(routeContext);
  const { state, authDispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked  } = e.target;
    authDispatch({
      type: 'SET_FIELD',
      form: formType,
      name: name,
      value: type === 'checkbox' ? checked : value
    });
    console.log(`Field ${name} updated:`, checked);};
    console.log(state.registration)

  const handleSubmit = async (e) => {
    e.preventDefault();
    authDispatch({ type: 'SET_LOADING', payload: true });
    authDispatch({ type: 'SET_ERROR', payload: false });

    const formState = state[formType];

    try {
      if (formType === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, formState.email, formState.password);
        console.log("User logged in:", userCredential.user);
        dispatch({ type: 'HANDLESUCCESSLOGIN' });
      } else if (formType === 'registration') {
        if (formState.password !== formState.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (!formState.agreeWithTermsOfService) {
          throw new Error("You need to agree with Terms of service");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formState.email, formState.password);
        console.log("User registered:", userCredential.user);
        dispatch({ type: 'HANDLESUCCESSLOGIN' });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      authDispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      authDispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const formData = formType === 'login' ? loginData : RegistrationFormData;
  const updatedFormData = formData.map(field => ({
    ...field,
    value: state[formType][field.name],
    onChange: handleInputChange
  }));

  return (
    <div>
      <Form
        formData={updatedFormData}
        type={formType}
        onSubmit={handleSubmit}
        error={state.error}
      />
      {state.loading && <p>Loading...</p>}
      
    </div>
  );
};

export default AuthForm;