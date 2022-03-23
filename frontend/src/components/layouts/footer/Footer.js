import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Footer() {

    const { isAuthenticated } = useSelector(state => state.auth);
    const today = new Date();
    const year = today.getFullYear();

  return (
    <footer className='footer'>
        <div className='features container'>
            <div className='features__feature'>
                <i className="fas fa-shipping-fast features__icon"></i>
                <h1 className='features__title'>Livraison à domicile</h1>
            </div>
            <div className='features__feature'>
                <i className="far fa-credit-card features__icon"></i>
                <h1 className='features__title'>Paiement sécurisé</h1>
            </div>
            <div className='features__feature'>
                <i className="fas fa-sync features__icon"></i>
                <h1 className='features__title'>Retours et échanges</h1>
            </div>
        </div>

        <ul className='nav container'>
            <li className='nav__item'>
                <h1 className='pb-3'>Contactez nous</h1>
                <div>
                    <i className="fa fa-map-marker me-3 fs-4"></i>
                    <span>Ksar Hellal, 5070, Monastir Tunisie</span>
                </div>
                <div>
                    <i className="fas fa-phone-alt me-3 fs-4"></i>
                    <span>93 492 127</span>
                </div>
                <div>
                    <i className="fas fa-envelope me-3 fs-4"></i>
                    <span>contact@alassala.tn</span>
                </div>
            </li>
            <li className='nav__item'>
                <h1 className='pb-3'>Notre Politique</h1>
                <ul>
                    <li>
                        <Link to='/salepolicy' className='nav__link'>Politique de vente</Link> 
                    </li>
                    <li><Link to='/confidentiality' className='nav__link'>Confidentialité</Link></li>
                </ul>
            </li>
            <li className='nav__item'>
                <h1 className='pb-3'>Informations</h1>
                <ul>
                    <li>
                    {isAuthenticated ? 
                        <Link to='/user/profile' className='nav__link'>Votre compte</Link> 
                        : 
                        <Link to='/login' className='nav__link'>Votre compte</Link>}
                    </li>
                    <li>
                    {isAuthenticated ? 
                        <Link to='/user/orders' className='nav__link'>Vos commandes</Link> 
                        : 
                        <Link to='/login' className='nav__link'>Vos commandes</Link>}
                    </li>
                </ul>
            </li>
            <li className='nav__item'>
                <h1 className='pb-3'>Nous Rejoindre</h1>
                <a href='https://www.facebook.com/Al-Assala-%D8%A7%D9%84%D8%A3%D8%B5%D8%A7%D9%84%D8%A9-111927638089839' target="_blank">
                    <i className="fab fa-facebook-square nav__social-icon me-3"></i>
                </a>
                <a href='https://www.instagram.com/al_assala_store/' target="_blank">
                    <i className="fab fa-instagram nav__social-icon"></i>
                </a>
            </li>
        </ul>
        <p className="copyright">
            &copy; Copyright {year} by Fatma Mama.
        </p>
    </footer>
  )
}
