import React, {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails, clearErrors } from '../../../redux/actions/userActions';
import Loader from '../../layouts/Loader';
import SideBar from '../../layouts/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';


export default function UpdateUser() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const params = useParams();

    const { user } = useSelector(state => state.userDetails);
    const { loading, isUpdated, error } = useSelector(state => state.user);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(user && user._id !== params.id){
            dispatch(getUserDetails(params.id))
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isUpdated){
            navigate('/admin/users');
        }
       
    }, [dispatch, user, params, isUpdated, error, navigate]);

    const updateHandler = (e) =>{
        e.preventDefault();
        const userData = {
            firstName,
            lastName,
            email,
            role
        }
        dispatch(updateUser(user._id, userData))
    };


    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100" >
                    <SideBar />
                </div>

                <div className="col-12 col-md-10" >
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row wrapper">
                                <div className="col-10 col-lg-7">
                                    <form className="shadow-lg" onSubmit={updateHandler}>
                                        <h1 className="mt-2 mb-5 wrapper__title text-center">Mise à jour de l'utilisateur</h1>
                                        {error && <Alert message={message} messageType={messageType} /> }
                
                                        <div className="form-group">
                                            <label htmlFor="fname_field">Nom</label>
                                            <input 
                                                type="name" 
                                                id="fname_field" 
                                                className="form-control"
                                                name='firstName'
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="lname_field">Prénom</label>
                                            <input 
                                                type="name" 
                                                id="lname_field" 
                                                className="form-control"
                                                name='lastName'
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                
                                        <div className="form-group mt-3">
                                            <label htmlFor="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                
                                        <div className="form-group mt-3">
                                                    <label htmlFor="role_field">Role</label>
                
                                                    <select
                                                        id="role_field"
                                                        className="form-control"
                                                        name='role'
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <option value="user">user</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                </div>

                                        <div className="d-grid gap-5 mt-3">
                                            <button 
                                                type="submit" 
                                                className="btn wrapper__button btn-block mt-4 mb-3"
                                                disabled= {loading? true : false} 
                                            >
                                                Mettre à jour
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}