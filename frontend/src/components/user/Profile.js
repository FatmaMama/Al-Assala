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
                    <h2 className="mt-5 ml-5">Mon Profil</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.firstName} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Modifier le profil
                            </Link>
                        </div>
                
                        <div className="col-12 col-md-5">
                            <h4>Nom et Prénom</h4>
                            <p>{`${user.firstName} ${user.lastName}`}</p>
                
                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Rejoint le</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== "admin" && (
                                <Link to="/user/orders" className="btn btn-block mt-5 myOrders-btn">
                                    Mes Commandes
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-block mt-3 changePassword-btn">
                                Changer le mot de passe
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
