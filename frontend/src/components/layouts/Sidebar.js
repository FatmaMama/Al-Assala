import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className='sidebar'>
            <ul className='sidebar__list'>
                <li className='sidebar__item'>
                    <Link className='sidebar__link' to="/dashboard">
                        <i className="fas fa-tachometer-alt me-2"></i>Tableau de bord
                    </Link>
                </li>

                <li className='sidebar__item'>
                    <Link to="#categorySubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                    <i className="fas fa-th-list me-2"></i> Catégories
                    </Link>
                    <ul className="collapse list-unstyled" id="categorySubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="/admin/categories" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i>Tout</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="/admin/categories/new" className='sidebar__link ms-4 pt-1'><i className="fas fa-plus me-2"></i>Ajouter</Link>
                        </li>
                    </ul>
                </li>
            
                <li className='sidebar__item'>
                    <Link to="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                        <i className="fab fa-product-hunt me-2"></i> Produits
                    </Link>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="/admin/products" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i>Tout</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="/admin/products/new" className='sidebar__link ms-4 pt-1'><i className="fas fa-plus me-2"></i>Ajouter</Link>
                        </li>
                    </ul>
                </li>

                <li className='sidebar__item'>
                    <Link to="#orderSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                    <i className="fas fa-shopping-basket me-2"></i>Commandes
                    </Link>
                    <ul className="collapse list-unstyled" id="orderSubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="/admin/orders" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i>Tout</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="#" className='sidebar__link ms-4 pt-1'><i className="fas fa-cog me-2"></i>Réglages</Link>
                        </li>

                        <li className='sidebar__item'>
                            <Link to="/admin/orders/recap" className='sidebar__link ms-4 pt-1'>Récap</Link>
                        </li>
                    </ul>
                </li>

                <li className='sidebar__item'>
                    <Link to="/admin/users" className='sidebar__link'><i className="fas fa-users me-2"></i>Utilisateurs</Link>
                </li>

                <li className='sidebar__item'>
                    <Link to="#" className='sidebar__link'><i className="fas fa-chart-line me-2"></i>Statistiques</Link>
                </li>
            
            </ul>
        </nav>

        
    )
}
