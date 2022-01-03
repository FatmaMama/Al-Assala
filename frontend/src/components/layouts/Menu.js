import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';

export default function Menu() {

    const dispatch = useDispatch();

    const { loading, categories, error } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());

    }, [dispatch]);

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                <li key={category._id}>
                    
                        {category.parentId ? 
                        <Link className='menu-item' to='/login'>{category.name}</Link>
                        : <span >{category.name}{category.children.length > 0 && <i class="fas fa-angle-down ms-2"></i>}</span>
                          
                        }
                    
                    {category.children.length > 0 && (<ul>{renderCategories(category.children)}</ul>)}
                </li>
            )
        };
        return myCategories
    };


    return (
        <div className='menu'>
            <ul>
                {categories && renderCategories(categories)}
            </ul> 
        </div>
    )
}
