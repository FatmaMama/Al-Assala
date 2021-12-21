import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link to='#'>
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
                        </Link></li>
                    <li className="user-nav__item">
                        <Link to='#' className="user-nav__link">
                            <i className="fas fa-user user-nav__icon"></i>
                            <span className="user-nav__text">Se connecter</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}
