import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import Loader from '../../utils/Loader';

export default function MobileNavigation({open, setOpen, closeMobileMenu}) {

    const dispatch = useDispatch();

    const { loading, categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());

    }, [dispatch]);

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                <li key={category._id} onClick={closeMobileMenu}>
                    
                        {category.parentId ? 
                            <Link className='mobileNavigation-item' to={`/products?page=1&category=${category._id}`}>{category.name}</Link>
                            :
                            <Link className='mobileNavigation-head' to={`/products?category=${category._id}`} >
                                {category.name}
                                {category.children.length > 0 && <i className="fas fa-angle-down ms-2"></i>}
                            </Link>
                        }
                    
                    {category.children.length > 0 && (<ul >{renderCategories(category.children)}</ul>)}
                </li>
            )
        };
        return myCategories
    };

    return (
        <nav className='mobileNavigation'>
            {loading ? <Loader /> : (
                <Fragment>
                    {open ? <button className='mobileNavigation__close' onClick={() => setOpen(!open)}><i className="far fa-times-circle"></i></button> 
                    :
                    <button className='mobileNavigation__hamburger' onClick={() => setOpen(!open)} ><i className="fas fa-bars"></i></button>
                    }
                    
                    {open && <ul>
                                {categories && renderCategories(categories)}
                            </ul>
                    }
                </Fragment>
            )}
        </nav>
    )
}
