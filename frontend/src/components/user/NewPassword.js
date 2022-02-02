import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyUser } from '../../redux/actions/notifyActions';
import { newPassword, clearErrors, loadUser } from '../../redux/actions/userActions';
import Alert from '../utils/Alert';

export default function NewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {success, error} = useSelector(state => state.forgotPassword);
  const { message, messageType } = useSelector(state => state.notify);

  useEffect(() => {      
      if(success){
        dispatch(loadUser());
        navigate('/');
      };

      if(error){
        dispatch(notifyUser(error, 'error'));
        setTimeout(() => dispatch(clearErrors()), 5000)
      };
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      dispatch(newPassword(params.token, formData))
  };

  return (
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  {error && <Alert message={message} messageType={messageType} />}
                    <h1 className="mb-3">Nouveau mot de passe</h1>

                    <div className="form-group mt-5">
                        <label htmlFor="password_field">Mot de passe</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="confirm_password_field">Confirmer mot de passe</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn--1 mt-5">
                        Définir
                    </button>

                </form>
          </div>
      </div>
  )
}
