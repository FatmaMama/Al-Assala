import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import { LOGOUT_RESET } from '../../redux/constants/userConstants';
import Alert from '../utils/Alert';
import { getSearchProducts } from '../../redux/actions/productActions';

export default function Header() {
    const dispatch= useDispatch();
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('');

    const { user, loading, isLogout } = useSelector(state => state.auth);
    const { message, messageType } = useSelector(state => state.notify);
    const { cartItems } = useSelector(state => state.cart);
    const {searchProducts} = useSelector(state => state.searchProducts);
    const {settings} = useSelector(state => state.settingsInfos);

    useEffect(() => {
        if(keyword.trim()){
            dispatch(getSearchProducts(keyword))
        } 
        
        if(isLogout){
            dispatch(notifyUser('Déconnecté avec succès', 'success'));
            setTimeout(() => dispatch({type: LOGOUT_RESET}), 3000)
        }
    }, [isLogout, dispatch, keyword])
   
    const logoutHandler = () =>{
        dispatch(logout()); 
    };

    const submitHandler = (event) => {
        event.preventDefault();
        Array.from(event.target).forEach((e) => (e.value = ""));
        navigate({
            pathname: '/search/products',
            search: `?keyword=${keyword}`,
          });
        setKeyword('')
    }

    return (
        <Fragment>
            <div className='subHeader' >
                <div className='d-flex gap-2'>
                    <a href='https://www.facebook.com/Al-Assala-%D8%A7%D9%84%D8%A3%D8%B5%D8%A7%D9%84%D8%A9-111927638089839' target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook-square subHeader__icon-social"></i>
                    </a>
                    <a href='https://www.instagram.com/al_assala_store/' target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram subHeader__icon-social"></i>
                    </a>
                </div>
                <div className='subHeader__shipping'>
                    <i className="fas fa-shipping-fast me-1 subHeader__icon"></i>
                    <span className='subHeader__text'>Livraison gratuite à partir de {settings.shippingFreeLimit}dt</span>
                </div>
                <div>
                    <i className="fas fa-phone-alt me-1 subHeader__icon"></i>
                    <span className='subHeader__text'>(+216) 93 492 127</span>
                </div>
            </div>
            <header>
                <Link to='/'>
                    <img src='./images/logo.png' alt='Al Assala Logo' className='logo' />
                </Link>

                <form action="#" className="search" onSubmit={submitHandler}>
                    <input type="text" className="search__input" placeholder="Chercher votre produit..."
                            onChange={(e) => setKeyword(e.target.value)} />
                    <button  type="submit" className="search__button">
                        <i className="fas fa-search search__icon"></i>
                    </button>
                    {keyword.trim() && searchProducts && 
                        <div className='search__result'>
                            {searchProducts.map(product => (
                                <div key={product._id} >
                                    <img src={product.images[0].url} alt={product.name} width="52" height="52" />
                                    <span className='ms-4'>{product.name} </span>
                                    <span className='float-end'>{product.price && product.price.toFixed(2) + ' TND'} </span>
                                    <hr/>
                                </div>
                            ))}
                            <button type="submit" className='search__result__btn' >
                                <span className='text-center'>Voir tout<i className="fas fa-angle-double-right ms-2"></i></span>
                                <span className='float-end'>{searchProducts.length + ' résultats'}</span>
                            </button>
                        </div>
                    }
                </form>

                <nav className="user-nav" >
                    <ul className="user-nav__list">
                        <li className="user-nav__item--1">
                            <Link to='/cart' className="user-nav__link">
                                {/* <i className="fas fa-shopping-bag user-nav__icon"></i> */}
                                <i className="fas fa-shopping-cart user-nav__icon"></i>
                                <span className="user-nav__notification">{cartItems && cartItems.reduce((acc,item) => {
                                                                            return acc + item.quantity
                                                                        },0)}</span>
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
                                                <Link  to="/dashboard" className="dropdown-item">Tableau de bord</Link>
                                            </li>
                                        )} 
                                        <li>
                                            <Link  to="/user/orders" className="dropdown-item">Commandes</Link>
                                        </li>
                                        <li>
                                            <Link to="/user/profile" className="dropdown-item">Profil</Link>
                                        </li>
                                        <li> 
                                            <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>Se déconnecter</Link>
                                        </li>
                                    </ul>
                                </div>
                                ) : 
                                    !loading && 
                                    <Link to='/login' className="user-nav__link">
                                        <i className="fas fa-user user-nav__icon"></i>
                                        <span>Se connecter</span>
                                    </Link>
                            }
                                
                        </li>
                    </ul>
                </nav>
                
            </header>
            {isLogout && <Alert message={message} messageType={messageType} /> }

            
            
        </Fragment>
    )
}
