import React, {useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../redux/actions/notifyActions';
import { forgotPassword, clearErrors } from '../../redux/actions/userActions';
import Alert from '../layouts/Alert';

export default function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const { loading, message: emailMessage, error} = useSelector(state => state.forgotPassword);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {      
        if(emailMessage){
            dispatch(notifyUser(emailMessage, 'success'))
        };

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, error, emailMessage]);

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    };

  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg p-5" onSubmit={submitHandler}>
                {(error || emailMessage) && <Alert message={message} messageType={messageType} /> }
                {!emailMessage && (
                    <Fragment>
                    <h1 className="mb-3">Mot  de passe Oublié</h1>
                    <div className="form-group mt-4">
                        <label htmlFor="email_field">Votre Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn--1 mt-4"
                        disabled={loading ? true : false}>
                        Envoyer
                    </button>
                </Fragment>
                )}
            </form>
        </div>
    </div>
  )
}
