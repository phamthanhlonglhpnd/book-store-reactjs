import React from 'react';
import './Input.scss';

const Input = () => {
  return (
      <>
        <input 
            type="text" 
            className="input" 
            placeholder='Search books, author, ISBNs'
        />
        <i className="fas fa-search input-icon"></i>
      </>
  )
};

export default Input;
