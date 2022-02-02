import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notifyUser } from '../../redux/actions/notifyActions';
import { clearErrors, updatePassword } from '../../redux/actions/userActions';
import Alert from '../utils/Alert';

export default function UpdatePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { loading, isUpdated, error} = useSelector(state => state.user);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 4000)
        };

        if(isUpdated){
            navigate('/user/profile');
        };

    },[error, dispatch, isUpdated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('newPassword', newPassword);
        dispatch(updatePassword(formData))
    }

  return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-5 mt-2">Changer le mot de passe</h1>
                    {error && <Alert message={message} messageType={messageType} />}

                    <div className="form-group">
                        <label htmlFor="oldPassword_field">Mot de passe</label>
                        <input
                            type="password"
                            id="oldPassword_field"
                            className="form-control"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="newPassword_field">Nouveau mot de passe</label>
                        <input
                            type="password"
                            id="newPassword_field"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid gap-5 mt-3">
                    <button 
                        type="submit" 
                        className="btn wrapper__button btn-block mt-4 mb-3"
                        disabled={loading ? true : false}
                        >
                            Changer
                    </button>
                </div>

                </form>
            </div>
        </div>
  )
}
