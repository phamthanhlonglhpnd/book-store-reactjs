import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import AccessDenied from '../commonComponents/accessDenied/AccessDenied';

const ProtectedRoute = ({role}) => {
  const { userInfor, isLoggin } = useSelector(state => state.user);
  const { roleID } = userInfor;
  
  let isHasRequireRole = roleID && role.includes(roleID) ? true : false;

  return (
    <>
      {
        isLoggin && isHasRequireRole ? <Outlet/> : <AccessDenied/>
      }
    </>
  )
}

export default ProtectedRoute