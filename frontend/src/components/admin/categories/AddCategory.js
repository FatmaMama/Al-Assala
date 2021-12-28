import React from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';

export default function AddCategory() {

    const dispatch = useDispatch();

    const { loading, categories, error } = useSelector(state => state.categories);
    const { message, messageType } = useSelector(state => state.notify);

    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                    <h1>Add</h1>
                </div>
        </div>
    )
}
