import React, { useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/Menu';
import { getProducts } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import { getCategories } from '../../redux/actions/categoryActions';

export default function AllProducts() {

    const dispatch = useDispatch()

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category') ? new URLSearchParams(location.search).get('category') : '';
    const keyword = new URLSearchParams(location.search).get('keyword') ? new URLSearchParams(location.search).get('keyword') : '';
    const currentPage = new URLSearchParams(location.search).get('currentPage') ? new URLSearchParams(location.search).get('currentPage') : 1;

    const { loading, products, productsCount, resPerPage, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, category))
       
    }, [dispatch, keyword, currentPage, category])

    return (
        <div>
            <Menu />

            {loading ? <Loader/> : (
                <div>
                {products && products.map(product => (
                    <h1 key={product._id} >{product.name} </h1>
                ))}
                </div>
            )}
            
        </div>
    )
}
