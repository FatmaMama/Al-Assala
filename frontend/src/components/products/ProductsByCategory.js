import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import { getProducts, clearErrors } from '../../redux/actions/productActions';
import Loader from '../utils/Loader';
import ProductsDisplay from './ProductsDisplay';
import { notifyUser } from '../../redux/actions/notifyActions';
import Alert from '../utils/Alert';
import Pagination  from 'react-js-pagination';

export default function ProductsByCategory() {

    const dispatch = useDispatch();

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category') ? new URLSearchParams(location.search).get('category') : '';
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, products, productsCount, resPerPage, error } = useSelector(state => state.products);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getProducts(currentPage, category));

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, currentPage, category, error]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div className='mb-5'>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}


            {loading ? <Loader/> : (
                <ProductsDisplay products={products} productsCount={productsCount} resPerPage={resPerPage} />
            )}

            {products && resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                        <Pagination 
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Suiv'}
                            prevPageText={'Prec'}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                        </div>
            )}
            
        </div>
    )
}
