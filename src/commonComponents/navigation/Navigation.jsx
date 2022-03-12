import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navigation.scss";
import logo from '../../assets/images/logo.jpg';

const Navigation = ({ menu }) => {

    const [menuApp, setMenuApp] = useState([]);

    const showActive = (item) => {
        let newMenu = menuApp.map(menuItem => {
            if(menuItem.id === item.id) {
                menuItem.isActive = true;
                // menuItem.isShowDropdown = true;
            } else {
                menuItem.isActive = false;
            }
            return menuItem;
        });
        setMenuApp(newMenu);
    }

    const showDropdown = (item) => {
        let newMenu = menuApp.map(menuItem => {
            if(menuItem.id === item.id) {
                menuItem.isShowDropdown = !menuItem.isShowDropdown;
            } else {
                menuItem.isShowDropdown = false;
            }
            return menuItem;
        });
        setMenuApp(newMenu);
       
    }

    useEffect(() => {
        let newMenu = menu.map((menuItem) => ({...menuItem, isActive: false, isShowDropdown: false}));
        setMenuApp(newMenu);
    }, [menu])
    
  return (
    <div className='menu'>
        <div className='menu-header'>
            <img src={logo} alt="logo" className='menu-logo'/>
            <Link to="/">Polarbear Bookshop</Link>
        </div>
        <div className='menu-body'>
        {
            menuApp && menuApp.length>0 && menuApp.map((menuItem, index) => (
                menuItem.menus.length>1 ? 
                <>
                    <div 
                        className={menuItem.isActive ? 'menu-item menu-active' : 'menu-item'}
                        key={menuItem.id}
                        onClick={() => showActive(menuItem)}
                    >
                        <i className={menuItem.menus[0].icon}></i>
                        <div className='menu-name'>
                                {menuItem.name}
                        </div>
                        {
                            menuItem.isActive && menuItem.isShowDropdown ? 
                            <i 
                                className="fas fa-angle-down"
                                onClick={() => showDropdown(menuItem)}
                            ></i> : 
                            <i 
                                className="fas fa-angle-left"
                                onClick={() => showDropdown(menuItem)}
                            ></i>
                        }
                    </div>
                    {
                        menuItem.isActive && menuItem.isShowDropdown ? 
                        <div className="menu-box">
                            {
                                menuItem.menus.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        className='menu-box-item'
                                        to={item.link}
                                        style={
                                            ({isActive}) => {
                                                return {
                                                    color: isActive ? 'orange' : 'white'
                                                }
                                            }
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))
                            }
                        </div> : ''
                    }
                </> : 
                <Link 
                    className={menuItem.isActive ? 'menu-item menu-active' : 'menu-item'}
                    key={menuItem.id}
                    to={menuItem.menus[0].link}
                    onClick={() => showActive(menuItem)}
                >
                    <i className={menuItem.menus[0].icon}></i>
                    <div 
                        className='menu-name'
                    >
                        {menuItem.name}
                    </div>
                </Link>
            ))
        }
        </div>
    </div>
  )
}

export default Navigation