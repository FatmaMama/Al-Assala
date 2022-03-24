import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import { getSearchProducts, clearErrors } from '../../redux/actions/productActions';
import Loader from '../utils/Loader';
import ProductsDisplay from './ProductsDisplay';
import { notifyUser } from '../../redux/actions/notifyActions';
import Alert from '../utils/Alert';
import Pagination  from 'react-js-pagination';

export default function SearchProducts() {
    const dispatch = useDispatch();
    const location = useLocation();

    const keyword = new URLSearchParams(location.search).get('keyword') ? new URLSearchParams(location.search).get('keyword') : '';
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, searchProducts, productsCount, resPerPage, error } = useSelector(state => state.searchProducts);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getSearchProducts(keyword, currentPage));

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, currentPage, keyword, error]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <div>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}

            {loading ? <Loader/> : (
                <ProductsDisplay products={searchProducts} productsCount={productsCount} resPerPage={resPerPage}/>
            )}

            {searchProducts && resPerPage <= productsCount && (
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
