import React, { useState, useContext } from 'react';
import { Form } from '../../Constants/Components';
import { RegistrationFormData } from '../../Constants/FormData';
import { auth } from '../../utils/Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { contextT } from '../../App';


const RegistrationForm = () => {
  const {handleSuccessLogin} = useContext(contextT)
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeWithTermsOfService: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formState.password === formState.confirmPassword ?
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    handleSuccessLogin()
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }) :
    setError(true)
    
  };

  const updatedFormData = RegistrationFormData.map(field => ({
    ...field,
    value: formState[field.name],
    onChange: handleInputChange
  }));

  return (
    <div>
      <Form
        formData={updatedFormData}
        type='registration'
        onSubmit={handleSubmit}
        user={formState}
        error={error}
      />
    </div>
  );
};

export default RegistrationForm;