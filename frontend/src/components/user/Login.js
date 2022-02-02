import React, { Fragment, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {login, clearErrors} from '../../redux/actions/userActions';
import {notifyUser} from '../../redux/actions/notifyActions';
import Loader from '../utils/Loader';
import Alert from '../utils/Alert';


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');

    const {loading, isAuthenticated, error} = useSelector(state => state.auth);
    const {message, messageType} = useSelector(state => state.notify);

    const redirect = location.search ? location.search.split('=')[1] : '';

    useEffect(() => {
        if(isAuthenticated){
            navigate('/'+ redirect)
        };

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [isAuthenticated, navigate, error, dispatch, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    
    return (
        <Fragment>
            {loading ? <Loader/> : (
                <div className='login'>
                    <div className="wrapper"> 
                        <div className="login__col col-10 col-lg-6 bg-light">
                            <form onSubmit={submitHandler} >
                                <h1 className="wrapper__title mb-3 text-center">Connectez-vous à votre compte</h1>
                                {error !== null && messageType!=='success' && <Alert message={message} messageType={messageType} />}
                                
                                <div className="form-group pt-5">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                    
                                <div className="form-group pt-3">
                                    <label htmlFor="password_field">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="d-grid gap-5 mt-3">
                                    <Link to="/password/forgot" className="text-end">Mot de passe oublié?</Link>
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="wrapper__button btn py-3"
                                        >
                                        connexion
                                    </button>
                                </div>
        
                                <Link to={location.search ? '/register?redirect=shipping' : '/register'} className="float-end mt-3 mb-3">Pas de compte? Créez-en un</Link>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
