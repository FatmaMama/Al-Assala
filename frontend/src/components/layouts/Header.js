import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import { LOGOUT_RESET } from '../../redux/constants/userConstants';
import Alert from './Alert';
import { getProducts, getSearchProducts } from '../../redux/actions/productActions';

export default function Header() {
    const dispatch= useDispatch();
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('');

    const { user, loading, isLogout } = useSelector(state => state.auth);
    const { message, messageType } = useSelector(state => state.notify);
    const { cartItems } = useSelector(state => state.cart);
    const {searchProducts} = useSelector(state => state.searchProducts);


    useEffect(() => {
        if(keyword.trim()){
            dispatch(getSearchProducts(keyword))
        } 
        
        if(isLogout){
            dispatch(notifyUser('Déconnecté avec succès', 'success'));
            setTimeout(() => dispatch({type: LOGOUT_RESET}), 5000)
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
            <header>
                <Link to='/'>
                    <img src='./images/al-assala-logo.png' alt='Al Assala Logo' className='logo' />
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
                                    <span className='float-end'>{product.price + ' TND'} </span>
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
                                            <Link to="/me" className="dropdown-item">Profil</Link>
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
                                        <span className="user-nav__text">Se connecter</span>
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
