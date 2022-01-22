import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function NewPassword() {
  const dispatch = useDispatch();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  return (
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-3">Nouveau mot de passe</h1>

                    <div className="form-group mt-5">
                        <label htmlFor="password_field">Mot de passe</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value=''
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="confirm_password_field">Confirmer mot de passe</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value=''
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
