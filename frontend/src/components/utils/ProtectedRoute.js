import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet, useLocation } from 'react-router-dom';


export default function ProtectedRoute({allowedRoles}) {
     
    const location = useLocation();
    const { loading, isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (allowedRoles.includes(user?.role)
                ?
                <Outlet />
                : isAuthenticated 
                    ? <Navigate to='/unauthorized' state={{ from:location }} replace/>
                    : <Navigate to='/login' state={{ from:location }} replace/>)}
        </Fragment>
    )
}