import React, { useState } from 'react';
import "./HeaderAccount.scss";

const HeaderAccount = () => {


  return (
    <>
      <div className='header-account'>
        <div className='header-account-left'>
          Management Information
        </div>
        <div className='header-account-right'>
        
            <input 
              className='header-account-search'
              type="text"
              placeholder='Search'
            /> 
          <i className="fas fa-search" ></i>
          <i className="fas fa-bell"></i>
          <i className="far fa-user-circle"></i>
        </div>
      </div>
      <div className='header-account-bottom'>
        <i className="fas fa-home"></i>
        <div className='header-account-home'>Home</div>
        <i className="fas fa-angle-right"></i>
      </div>
    </>
  )
}

export default HeaderAccount