import React from 'react';

const Element = ({ data, user }) => {
  return (
    <div className='element'>
      {data.element === 'input' && (
        <input
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
      {data.className === 'terms-container' && (
        <div className="terms-container">
          <input
            className='checkInp'
            type="checkbox"
            name={data.name}
            checked={data.value}
            onChange={data.onChange}
          />
          <label htmlFor={data.name}>{data.content}</label>
        </div>
      )}
    </div>
  );
};

export default Element;