import React, { useEffect, useState } from 'react';
import "./System.scss";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navigation from '../commonComponents/navigation/Navigation';
import HeaderAccount from '../components/home/header/HeaderAccount';
import { ROLES } from '../utils/constant';
import { adminMenu, employeeMenu, userMenu } from '../utils/menuApp';

const System = () => {

  const [menu, setMenu ] = useState([]);
  const { userInfor } = useSelector( state => state.user );

  useEffect(() => {
    if( userInfor.roleID === ROLES.ADMIN ) {
      setMenu(adminMenu);
    }
    if( userInfor.roleID === ROLES.EMPLOYEE ) {
      setMenu(employeeMenu);
    }
    if( userInfor.roleID === ROLES.USER ) {
      setMenu(userMenu);
    }
  }, [userInfor.roleID])

  return (
    <div className='system'>
      <div className='system-left'>
        <Navigation menu={menu}/>
      </div>
      <div className='system-right'>
        <HeaderAccount/>
        <Outlet/>
      </div>
    </div>
  )
}

export default System