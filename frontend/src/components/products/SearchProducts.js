import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/Menu';
import { getSearchProducts } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';

export default function SearchProducts() {
    const dispatch = useDispatch();
    const location = useLocation();

    const keyword = new URLSearchParams(location.search).get('keyword') ? new URLSearchParams(location.search).get('keyword') : '';
    const currentPage = new URLSearchParams(location.search).get('currentPage') ? new URLSearchParams(location.search).get('currentPage') : 1;

    const { loading, searchProducts, productsCount, resPerPage, error } = useSelector(state => state.searchProducts);

    useEffect(() => {
        dispatch(getSearchProducts(keyword, currentPage))
       
    }, [dispatch, currentPage, keyword])
    return (
        <div>
            <Menu />
            {loading ? <Loader/> : (
                <div>
                {searchProducts && searchProducts.map(product => (
                    <div key={product._id}>
                       <h1>{product.name} </h1>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}
