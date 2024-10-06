import React from 'react';

const Element = ({ data,type }) => {
  return (
    <div className={data.type === 'checkbox' ? 'checkboxContainer' : 'element'}>
      {data.element === 'input' && (
        <input
          className={data.type === 'checkbox' ? 'checkbox' : type === 'auth' ? 'inputText' : type === 'task' ? 'taskInput' : null}
          type={data.type}
          placeholder={data.placeholder}
          name={data.name}
          value={data.value}
          onChange={data.onChange}
        />
      )}
      {data.element === 'label' && (
        <label htmlFor={data.htmlFor}>{data.content}</label>
      )}
      {data.type === 'checkbox' && data.name === 'agreeWithTermsOfService' ? <p>Agree with Terms of service</p> : data.type === 'checkbox' && data.name === 'rememberMe' ? <p>Remember me</p> : null }
      
    </div>
  );
};

export default Element;