import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import Loader from '../utils/Loader';
import Alert from '../utils/Alert';
import { getProducts, clearErrors, getOnSaleProducts, getBestSellers } from '../../redux/actions/productActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import Slide from './Slide';
import { Link } from 'react-router-dom';


export default function Home() {

    const dispatch = useDispatch();

    const { loading, products, error } = useSelector(state => state.products);
    const { loading: onSaleLoading, onSaleProducts, error: onSaleError} = useSelector(state => state.onSaleProducts);
    const { loading: bestSellersLoading, bestSellers, error: bestSellersError} = useSelector(state => state.bestSellers);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getOnSaleProducts());
        dispatch(getBestSellers());

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(onSaleError){
            dispatch(notifyUser(onSaleError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(bestSellersError){
            dispatch(notifyUser(bestSellersError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, error, onSaleError, bestSellersError])

    return (
        <div className='homePage'>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}

            <div className='cover'>
                <picture >
                    <source media='(max-width: 65em)' srcSet='images/cover.png' />
                    <img src='images/bansite.png'  className='cover__img' alt='Habit traditionnel tunisien' />
                </picture>
               
                <div className='cover__box'>
                    <h1 className='cover__title'>Al Assala</h1>
                    <h1 className='cover__subtitle'>Habit Traditionnel Tunisien</h1>
                    <Link to='/products' >
                        <button className='cover__button'>Découvrir</button>
                    </Link>
                </div>
                <div className='cover__line1'></div>
                <div className='cover__line2'></div>
            </div>
            
            
            {loading || onSaleLoading || bestSellersLoading ? <Loader/> : (
                <Fragment>
                    <div className='pad new'>
                        {/* <img className='new__img new__img--1' src='images/khomsa3.png' /> */}
                        {/* <img className='new__img new__img--2' src='images/khomsa2.png' /> */}
                        <h1 className='home-title'>Nouveautés</h1>
                        <Slide  products={products} className='new__slider' />
                        
                    </div>

                    <div className='pad best'>
                        <h1 className='home-title home-title-best'>Meilleures Ventes</h1>
                        <Slide  products={bestSellers} />
                    </div>

                    {onSaleProducts && onSaleProducts.length > 0 && (
                        <div className='pad promo'>
                            <h1 className='home-title'>Promo</h1>
                            <Slide  products={onSaleProducts} />
                        </div>
                    )}
                      
                </Fragment>
            )}
        
        </div>
    )
}
