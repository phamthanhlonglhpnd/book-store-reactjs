import React from 'react';
import './Button.scss';

const Button = ({backgroundColor, text, onClick, cursor, disabled}) => {
  return (
      <button 
        className='button'
        disabled={disabled}
        style={{
          backgroundColor: backgroundColor,
          cursor: cursor 
        }}
        onClick={onClick}
      >
          <div className="button-text">{text}</div>
      </button>
  )
};

export default Button;
