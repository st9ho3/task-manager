import React from 'react';
import { Element } from '../../Constants/Components';
import FormBottomSection from './FormBottomSection';

const Form = ({ formData, type, error, onSubmit, user }) => {
  return (
    <div className="formLayout">
      <div className="counterForm">
        <img src="image-init.jpg" alt="Registration-Page-image" />
      </div>
      <form onSubmit={onSubmit} className="registrationForm">
        {formData.map((elem) => (
          <Element key={elem.id} data={elem} user={user} />
        ))}
        <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <FormBottomSection type={type} error={error} />
    </div>
  );
};

export default Form;