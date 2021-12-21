import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        
        <div className='login'>
            <div className="login__wrapper"> 
                <div className="col-10 col-lg-6 shadow-lg">
                    <form >
                        <h1 className="login__title mb-3 text-center">Connectez-vous à votre compte</h1>
                        <div className="form-group pt-5">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value=""
                            />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="password_field">Mot de passe</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value=""
                            />
                        </div>

                        <Link to="/forgot/password" className="float-right mb-4">Mot de passe oublié?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="login__button btn btn-block py-3"
                        >
                        connexion
                        </button>

                        <Link to="/register" className="float-right mt-3 mb-3">Pas de compte? Créez-en un</Link>
                    </form>
                </div>
            </div>
        </div>
       
    )
}
