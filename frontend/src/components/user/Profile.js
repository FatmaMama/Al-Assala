import React, { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader';
import { notifyUser } from '../../redux/actions/notifyActions';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import Alert from '../layouts/Alert';


export default function Profile() {
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    const { isUpdated } = useSelector(state => state.user);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(isUpdated){
            dispatch(notifyUser('Profil mis à jour avec succès', 'success'));
            setTimeout(() => dispatch({type: UPDATE_PROFILE_RESET}), 4000)
        }
    }, [isUpdated, dispatch])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    {isUpdated && <Alert message={message} messageType={messageType} />}
                    <h2 className="profile-title">Mon Profil</h2>
                   
                    <div className="row justify-content-around mt-5 profile">
                        <div className="col-12 col-md-4 profile__box1">
                            <figure className='profile__avatar'>
                                <img className="rounded-circle img-fluid" src={user && user.avatar && user.avatar.url} alt={user && user.firstName} />
                            </figure>
                            <Link to="/user/update" className="btn profile__btn">
                                Modifier le profil
                            </Link>
                        </div>
                
                        <div className="col-12 col-md-4 profile__box2">
                            <div className='profile__info'>
                                <div>
                                    <h4 className='profile__title'>Nom et Prénom</h4>
                                    <p className='profile__subTitle'>{`${user.firstName} ${user.lastName}`}</p>
                                </div>
                                <div>
                                    <h4 className='profile__title'>Email</h4>
                                    <p className='profile__subTitle'>{user.email}</p>
                                </div>
                                <div>
                                    <h4 className='profile__title'>Rejoint le</h4>
                                    <p className='profile__subTitle'>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                            </div>
                            {user.role !== "admin" && (
                                <Link to="/user/orders" className="btn profile__btn profile__btn2">
                                    Mes Commandes
                                </Link>
                            )}

                            <Link to="/password/update" className="btn profile__btn profile__btn3">
                                Changer le mot de passe
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
