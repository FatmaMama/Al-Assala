import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/Menu';
import { getProducts, clearErrors } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import ProductsDisplay from '../products/ProductsDisplay';
import { notifyUser } from '../../redux/actions/notifyActions';
import Alert from '../layouts/Alert';

export default function AllProducts() {

    const dispatch = useDispatch();

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category') ? new URLSearchParams(location.search).get('category') : '';
    const currentPage = new URLSearchParams(location.search).get('currentPage') ? new URLSearchParams(location.search).get('currentPage') : 1;

    const { loading, products, productsCount, resPerPage, error } = useSelector(state => state.products);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getProducts(currentPage, category));

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, currentPage, category, error])

    return (
        <div>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}

            {loading ? <Loader/> : (
                <ProductsDisplay products={products} productsCount={productsCount} resPerPage={resPerPage} />
            )}
            
        </div>
    )
}
