import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import Loader from '../../utils/Loader';

export default function Navigation() {

    const dispatch = useDispatch();

    const { loading, categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());

    }, [dispatch]);

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                <li key={category._id}>
                    
                        {category.parentId ? 
                            <Link className='navigation-item' to={`/products?page=1&category=${category._id}`}>{category.name}</Link>
                            :
                            <Link className='navigation-head' to={`/products?category=${category._id}`}>
                                {category.name}
                                {category.children.length > 0 && <i className="fas fa-angle-down ms-2"></i>}
                            </Link>
                        }
                    
                    {category.children.length > 0 && (<ul>{renderCategories(category.children)}</ul>)}
                </li>
            )
        };
        return myCategories
    };

    return (
        <nav className='navigation'>
            {loading ? <Loader /> : (
                <ul>
                    {categories && renderCategories(categories)}
                    <li>
                        <Link to='/onsale' className='navigation-head'>Promo</Link>
                    </li>
                </ul> 
            )}
        </nav>
    )
}
