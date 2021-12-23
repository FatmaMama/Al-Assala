import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <nav className='sidebar'>
            <ul className='sidebar__list'>
                <li className='sidebar__item'>
                    <Link className='sidebar__link' to="/dashboard">
                        <i className="fas fa-tachometer-alt me-2"></i> Dashboard
                    </Link>
                </li>

                <li className='sidebar__item'>
                    <Link to="#categorySubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                    <i class="fas fa-th-list me-2"></i> Categories
                    </Link>
                    <ul className="collapse list-unstyled" id="categorySubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="#" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i> All</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="#" className='sidebar__link ms-4 pt-1'><i className="fas fa-plus me-2"></i> Create</Link>
                        </li>
                    </ul>
                </li>
            
                <li className='sidebar__item'>
                    <Link to="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                        <i className="fab fa-product-hunt me-2"></i> Products
                    </Link>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="#" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i> All</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="#" className='sidebar__link ms-4 pt-1'><i className="fas fa-plus me-2"></i> Create</Link>
                        </li>
                    </ul>
                </li>

                <li className='sidebar__item'>
                    <Link to="#orderSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle sidebar__link">
                    <i className="fas fa-shopping-basket me-2"></i> Orders
                    </Link>
                    <ul className="collapse list-unstyled" id="orderSubmenu">
                        <li className='sidebar__item me-2'>
                            <Link to="#" className='sidebar__link ms-4'><i className="fas fa-clipboard-list me-2"></i> All</Link>
                        </li>
            
                        <li className='sidebar__item'>
                            <Link to="#" className='sidebar__link ms-4 pt-1'><i className="fas fa-cog me-2"></i>Settings</Link>
                        </li>
                    </ul>
                </li>

                <li className='sidebar__item'>
                    <Link to="#" className='sidebar__link'><i className="fas fa-users me-2"></i> Users</Link>
                </li>
            
            </ul>
        </nav>

        
    )
}
