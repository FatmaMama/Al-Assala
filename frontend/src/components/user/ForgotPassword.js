import React from 'react';

export default function ForgotPassword() {
  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg p-5">
                <h1 className="mb-3">Mot  de passe Oublié</h1>
                <div className="form-group mt-4">
                    <label htmlFor="email_field">Votre Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value=''
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    className="btn btn--1 mt-4">
                    Envoyer
                </button>

            </form>
        </div>
    </div>
  )
}
