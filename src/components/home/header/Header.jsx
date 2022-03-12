import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import logo from '../../../assets/images/logo.jpg';
import cart from '../../../assets/images/cart.svg';
import account from '../../../assets/images/account.svg';
import Input from './Input';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';

const Header = () => {

    const [count, setCount] = useState(3);
    const [isShowAccount, setIsShowAccount] = useState(false);
    const { isLoggin } = useSelector( state => state.user );
    const dispatch = useDispatch();

    const menuRef     = useRef(null);
    const menuBtnRef  = useRef(null);


    const offShowAccount = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && !menuBtnRef.current.contains(e.target)) {
            setIsShowAccount(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', offShowAccount, true);
        return () => {
            window.removeEventListener('click', offShowAccount, true);
        }
    }, [])


  return (
      <>
        <div className="header">
            <div className="header-top">
                <div className="header-left">
                    <img src={logo} alt="logo" className="header-logo"/>
                    <Link to='/' className="header-name">POLARBEAR BOOKSTORE</Link>
                </div>
                <div className="header-middle">
                    <Input/>
                </div>
                <div className="header-right">
                    
                    <div className='header-choose'>Choose a Bookstore</div>
                        {
                            isLoggin===true ? 
                            <div style={{position: 'relative'}}>
                                <img 
                                    src={account} 
                                    ref={menuBtnRef}
                                    alt="account" 
                                    className="header-user"
                                    onClick={() => setIsShowAccount(!isShowAccount)} 
                                />
                                {
                                    isShowAccount ? 
                                    <div className='header-user-info' ref={menuRef}>
                                        <Link to="/system" className="header-user-item">My Account</Link>
                                        <div className="header-user-item">My Wishlists</div>
                                        <Link to="change-password" className="header-user-item">Change Password</Link>
                                        <div 
                                            className="header-user-item"
                                            onClick={() => dispatch(logout())}
                                        >
                                            Logout
                                        </div>
                                    </div> : ""
                                }
                            </div> :
                            <div className='header-choose'>
                                <Link to='/login'>Sign in</Link>
                            </div>
                        }
                        <div style={{position: 'relative'}}>
                            <img 
                                src={cart} 
                                alt="cart" 
                                className="header-cart" 
                            />
                            <div className='header-box'>
                                <span className="header-count">{count}</span>
                            </div>
                        </div>     
                    
                </div>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-item">Gift cards</div>
                <div className="header-bottom-item">Best Sellers</div>
                <div className="header-bottom-item">New Releases</div>
                <div className="header-bottom-item">Fiction</div>
                <div className="header-bottom-item">Nonfiction</div>
                <div className="header-bottom-item">YA</div>
                <div className="header-bottom-item">Kids</div>
                <div className="header-bottom-item">Games and Puzzles</div>
            </div>
        </div>
      </>
  )
};

export default Header;
