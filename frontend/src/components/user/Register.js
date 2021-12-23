import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {register, clearErrors} from '../../redux/actions/userActions';
import {notifyUser} from '../../redux/actions/notifyActions';
import Alert from '../layouts/Alert';


export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser]= useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const {firstName, lastName, email, password} = user;
    

    const {loading, isAuthenticated, error} = useSelector(state => state.auth);
    const {message, messageType} = useSelector(state => state.notify)

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        };

        if(error){
            dispatch(notifyUser(error, 'error'));
        };
        setTimeout(() => dispatch(clearErrors()), 9000) 
    }, [isAuthenticated, navigate, error, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        dispatch(register(formData))
    }

    const changeData = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    return (
        <div className="register">
            <div className="login__wrapper register__wrapper">
		        <div className="login__col col-10 col-lg-6 ">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="login__title mb-3 text-center">Créez votre compte</h1>
                        {error !== null && <Alert message={message} messageType={messageType} />}

                        <div className="form-group pt-5">
                            <label htmlFor="firstName_field">Nom</label>
                            <input 
                                type="name" 
                                id="firstName_field" 
                                className="form-control" 
                                name="firstName" 
                                value={firstName}
                                onChange={changeData}
                                required />
                        </div>

                        <div className="form-group pt-3">
                            <label htmlFor="lastName_field">Prénom</label>
                            <input 
                                type="name" 
                                id="lastName_field" 
                                className="form-control" 
                                name="lastName" 
                                value={lastName}
                                onChange={changeData}
                                required />
                        </div>

                        <div className="form-group pt-3">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email" 
                                value={email}
                                onChange={changeData}
                                required
                            />
                        </div>
            
                        <div className="form-group pt-3">
                            <label htmlFor="password_field">Mot de passe</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password" 
                                value={password}
                                onChange={changeData}
                                required
                            />
                        </div>

                        <div className="d-grid gap-5 mt-3">
                            <button
                                id="register_button"
                                type="submit"
                                className="login__button btn btn-block py-3 mt-5"
                                disabled={loading ? true : false}
                                >
                                Enregistrer
                            </button>
                        </div>
                       

                        <Link to="/login" className="float-end mt-3 mb-3">Vous avez déjà un compte ? Connectez-vous !</Link>
                    </form>
		        </div>
            </div>
        </div>
    )
}
