import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet } from 'react-router-dom';


export default function AdminProtectedRoute() {
     
    const { loading, isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (isAuthenticated === false ? <Navigate to='/login'/> : ( user && user.role !== 'admin' ? <Navigate to='/'/> : <Outlet />) )}
        </Fragment>
    )
}