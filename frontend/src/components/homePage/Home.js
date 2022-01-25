import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import Loader from '../layouts/Loader';
import Alert from '../layouts/Alert';
import { getProducts, clearErrors } from '../../redux/actions/productActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import Slide from './Slide';


export default function Home() {

    const dispatch = useDispatch();

    const { loading, products, productsCount, resPerPage, error } = useSelector(state => state.products);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getProducts());

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, error])

    return (
        <div>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}

            {loading ? <Loader/> : (
                <Slide  products={products} />
            )}
        </div>
    )
}
