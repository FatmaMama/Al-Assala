import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import Loader from '../utils/Loader';
import Alert from '../utils/Alert';
import {clearErrors, getOnSaleProducts } from '../../redux/actions/productActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import ProductsDisplay from '../products/ProductsDisplay';

export default function OnSale() {
    const dispatch = useDispatch();

    const { loading, onSaleProducts, productsCount, error} = useSelector(state => state.onSaleProducts);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
      dispatch(getOnSaleProducts());

      if(error){
          dispatch(notifyUser(error, 'error'));
          setTimeout(() => dispatch(clearErrors()), 5000)
      };
     
  }, [dispatch, error])
    
  return (
    <div>
      <Menu />
      {error && <Alert message={message} messageType={messageType} />}

      {loading ? <Loader/> : (
        <ProductsDisplay products={onSaleProducts} productsCount={productsCount} resPerPage={12} />
      )}
    </div>
  )
}
