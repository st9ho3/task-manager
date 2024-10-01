import React, { useContext, useState } from 'react';
import { Form } from '../../Constants/Components';
import { loginData } from '../../Constants/FormData';
import { auth } from '../../utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { contextT } from '../../App';

const LoginForm = () => {
  const {handleSuccessLogin} = useContext(contextT)
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);

    signInWithEmailAndPassword(auth, formState.email, formState.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    handleSuccessLogin()

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(true)
    setTimeout(() => setError(false),3000)
  });
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
        type='login'
        error={error}
        onSubmit={handleLogin}
        user={formState}
      />
    </div>
  );
}
export default LoginForm;