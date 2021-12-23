import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { notifyUser } from '../../redux/actions/notifyActions';
// import Alert from './Alert';

export default function Header() {
    const dispatch= useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    // const { message, messageType } = useSelector(state => state.notify)
   
    const logoutHandler = () =>{
        dispatch(logout());
        dispatch(notifyUser('Déconnecté avec succès', 'success'));
        // setTimeout(() => dispatch(clearErrors()), 5000)  
    }

    return (
        <Fragment>
            <header>
                <Link to='/'>
                    <img src='./images/al-assala-logo.png' alt='Al Assala Logo' className='logo' />
                </Link>

                <form action="#" className="search">
                    <input type="text" className="search__input" placeholder="Chercher votre produit..." />
                    <button className="search__button">
                        <i className="fas fa-search search__icon"></i>
                    </button>
                </form>

                <nav className="user-nav" >
                    <ul className="user-nav__list">
                        <li className="user-nav__item--1">
                            <Link to='#' className="user-nav__link">
                                <i className="fas fa-shopping-bag user-nav__icon"></i>
                                <span className="user-nav__notification">7</span>
                                <span className="user-nav__text">Panier</span>
                            </Link>
                        </li>
                        
                        <li>
                            {user ? (
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <figure>
                                            <img src={user && user.avatar && user.avatar.url} alt={user && user.name} className="avatar" />
                                        </figure>
                                        <span>{user && user.firstName + ' ' + user.lastName}</span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {user && user.role === "admin" && (
                                            <li>
                                                <Link  to="/dashboard" className="dropdown-item">Dashboard</Link>
                                            </li>
                                        )} 
                                        <li>
                                            <Link  to="/orders/me" className="dropdown-item">Orders</Link>
                                        </li>
                                        <li>
                                            <Link to="/me" className="dropdown-item">Profile</Link>
                                        </li>
                                        <li> 
                                            <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                                ) : 
                                    !loading && 
                                    <Link to='/login' className="user-nav__link">
                                        <i className="fas fa-user user-nav__icon"></i>
                                        <span className="user-nav__text">Se connecter</span>
                                    </Link>
                            }
                                
                        </li>
                    </ul>
                </nav>
                
            </header>
           
        </Fragment>
    )
}
