import React from 'react';
import Sidebar from '../../layouts/Sidebar';

export default function OrdersList() {
    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                    <h1>Orders</h1>
                </div>
        </div>
    )
}
