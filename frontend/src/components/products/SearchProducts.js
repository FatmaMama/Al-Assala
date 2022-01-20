import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import { getSearchProducts, clearErrors } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import ProductsDisplay from './ProductsDisplay';
import { notifyUser } from '../../redux/actions/notifyActions';
import Alert from '../layouts/Alert';

export default function SearchProducts() {
    const dispatch = useDispatch();
    const location = useLocation();

    const keyword = new URLSearchParams(location.search).get('keyword') ? new URLSearchParams(location.search).get('keyword') : '';
    const currentPage = new URLSearchParams(location.search).get('currentPage') ? new URLSearchParams(location.search).get('currentPage') : 1;

    const { loading, searchProducts, productsCount, resPerPage, error } = useSelector(state => state.searchProducts);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getSearchProducts(keyword, currentPage));

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, currentPage, keyword, error])
    return (
        <div>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}

            {loading ? <Loader/> : (
                <ProductsDisplay products={searchProducts} productsCount={productsCount} resPerPage={resPerPage}/>
            )}
        </div>
    )
}
