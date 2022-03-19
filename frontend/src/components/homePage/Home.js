import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import Loader from '../utils/Loader';
import Alert from '../utils/Alert';
import { getProducts, clearErrors, getOnSaleProducts, getBestSellers } from '../../redux/actions/productActions';
import { notifyUser } from '../../redux/actions/notifyActions';
import Slide from './Slide';


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
        <div>
            <Menu />
            {error && <Alert message={message} messageType={messageType} />}
            <div>
                <div id="carouselExampleCaptions" className="carousel slide main-slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active item-1" data-bs-interval="5000">
                            <img src="images/enfants.jpg" className="d-block w-100 slide-img" alt="..." />
                            <div className="carousel-caption caption-1">
                            <button className='bg-danger'>Découvrir</button>
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                            
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="images/IMG_9968.jpg" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="images/chachia.jpg" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src="images/enfants2.jpg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            
            {loading || onSaleLoading || bestSellersLoading ? <Loader/> : (
                <Fragment>
                    <div className='pad new'>
                        <img className='new__img new__img--1' src='images/khomsa3.png' />
                        <img className='new__img new__img--2' src='images/khomsa.png' />
                        <h1>Nouveautés</h1>
                        <Slide  products={products} className='new__slider' />
                        
                    </div>

                    <div className='pad best'>
                        <h1>Meilleures Ventes</h1>
                        <Slide  products={bestSellers} />
                    </div>

                    {onSaleProducts && onSaleProducts.length > 0 && (
                        <div className='pad promo'>
                            <h1>Promo</h1>
                            <Slide  products={onSaleProducts} />
                        </div>
                    )}
                      
                </Fragment>
            )}
        
        </div>
    )
}
