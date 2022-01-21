import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../layouts/Loader';

export default function Profile() {
    const { user, loading } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
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
