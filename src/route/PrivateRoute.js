import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

export default function PrivateRoute() {
    const { isLoggin } = useSelector(state => state.user);
    return (
        <>
            {
                isLoggin ? <Outlet/> : <Navigate to="login" />
            }
        </>

    )

}