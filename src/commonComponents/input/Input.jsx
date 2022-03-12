import React from 'react';
import './Input.scss';

const Input = ({ title, type, onChange, value, disabled, onBlur }) => {
  return (
      <>
        <div className="box">
            <div className="box-title">{title}</div>
            <input
                className='box-input'
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
            />
        </div>
      </>
  )
};

export default Input;
