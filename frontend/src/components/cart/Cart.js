import React, {Fragment, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, saveCartPrice } from '../../redux/actions/cartActions';
import Menu from '../layouts/Menu';
import Alert from '../layouts/Alert';

export default function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userCoupon, setUserCoupon] = useState('');
    const [newSubtotalPrice, setNewSubtotalPrice ] = useState(0);

    const {cartItems} = useSelector(state => state.cart);
    const {settings} = useSelector(state => state.settingsInfos);
    const { shippingPrice, shippingFreeLimit, shippingDuration, coupon, saleCoupon, saleDuration} = settings;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    };

    const getSubTotalPrice = () => {
        return cartItems.reduce((total,item) => {
            return item.salePrice === 0 ?
                total + item.price * item.quantity
            :
                total + item.salePrice * item.quantity
        }, 0)
    }

    const subTotalPrice = getSubTotalPrice();

    const handleShippingPrice = () => {
        const today = new Date();
        console.log(today <= shippingDuration)
        return settings && subTotalPrice >=  shippingFreeLimit && today <= new Date(shippingDuration) ? '0.00' : shippingPrice
    }

    const newShippingPrice = handleShippingPrice();

    const increaseQty = (id, quantity, size, stock) => {
        const newQty = quantity + 1

        if(newQty > stock) return ;
        dispatch(addToCart(id,newQty, size, stock))
    };

    const decreaseQty = (id, quantity, size, stock) => {
        const newQty = quantity - 1

        if(newQty < 1) return ;
        dispatch(addToCart(id,newQty, size, stock))
    };

    const getNewSubtotalPrice = () => {
        userCoupon === coupon && new Date() <= new Date(saleDuration) ?
        setNewSubtotalPrice((subTotalPrice * (1 - saleCoupon)).toFixed(2))
        :
        setNewSubtotalPrice(0)
    };

    const totalPrice = newSubtotalPrice !== 0 ? (Number(newSubtotalPrice) + Number(newShippingPrice)).toFixed(2)  : (subTotalPrice + Number(newShippingPrice)).toFixed(2) 

    const removeItemHandler = (id, size) => {
        dispatch(removeFromCart(id, size))
    };

    const checkoutHandler = () => {
        dispatch(saveCartPrice({subTotalPrice, newShippingPrice, newSubtotalPrice, saleCoupon, totalPrice}))
        navigate({
            pathname: '/register',
            search: `?redirect=shipping`,
        });
    }

    return (
        <div>
             <Menu />
             <div className='p-5'>
                {cartItems.length === 0 ? <h2 className='text-center'>Votre panier est vide...</h2> : (
                    <Fragment>
                        <h1 className='cart-title'>Votre panier: <b>{getCartCount()} Articles</b></h1>
        
                        <div className="cart">
                            <div className='cart__container'>
                                <div className='cart__grid cart__head'>
                                    <h4></h4>
                                    <h4 className='center'>Produit</h4>
                                    <h4 className='center'>Couleur</h4>
                                    <h4 className='center'>Taille</h4>
                                    <h4 className='center'>Prix</h4>
                                    <h4 className='center'>Quantité</h4>
                                </div>

                                {cartItems.map(item => (
                                    <Fragment key={item.product}>
                                    <hr />
                                    <div key={item.product} className='cart__grid'>
                                        <div className='cart__img-container'>
                                            <img src={item.image} alt={item.name} className='cart__img' />
                                        </div>
                                        <div className='center cart__name-container'>
                                            <Link to={`/products/${item.product}`} className='cart__name' >{item.name}</Link>
                                        </div>
                                        <div className='center cart__color-container'>
                                            <span className='cart__color'><span className='cart__label'>Couleur: </span>{item.color}</span>
                                        </div>
                                        <div className='center cart__size-container'>
                                            <span className='cart__size'><span className='cart__label'>Taille: </span><b>{item.size}</b></span>
                                        </div>

                                        <div className='center cart__price-container'>
                                            {item.salePrice === 0 ? <p className='cart__price'><span className='cart__label'>Prix: </span>{`${item.price} TND`}</p>
                                                    : (
                                                        <Fragment>
                                                            <span className='cart__label'>Prix: </span>
                                                            <div className='d-flex gap-5 align-items-center justify-content-md-center'>
                                                                <span className='cart__price'>{`${item.salePrice && item.salePrice.toFixed(2)} TND`}</span>
                                                                <span className='product-cart__prev-price'>{`${item.price} TND`}</span>
                                                            </div>
                                                        </Fragment>
                                                    )}
                                        </div>

                                        <div className='center cart__qty-container-1'>
                                            <div className="cart__qty-container">
                                            <span className='cart__label'>Quantité: </span>
                                                <button className='cart__btn' onClick={() => decreaseQty(item.product, item.quantity, item.size, item.stock)}>
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input type="number" className="form-control cart__qty" value={item.quantity} readOnly />
                                                <button className='cart__btn' onClick={() => increaseQty(item.product, item.quantity, item.size, item.stock)}>
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart__delete" onClick={()=>{removeItemHandler(item.product, item.size)}}>
                                            <i className="far fa-times-circle"></i>
                                        </div>
                                    </div>
                                     </Fragment>
                                ))}
                                <hr/>   
                            </div>

                            <div className='cart__summary'>
                                <h2 className='text-center'>Total Panier</h2>
                                <hr />
                                <h4 className='cart__summary-item'>Sous-total:  <span className='cart__summary-value'>{subTotalPrice.toFixed(2) + ' TND'}</span></h4>

                                <div className='cart__summary-item cart__coupon'>
                                    <input type='text' className='form-control cart__input-sale' placeholder='Code Promo ?' onChange={(e) => setUserCoupon(e.target.value)}/>
                                    <button className='cart__btn-sale' data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={getNewSubtotalPrice}>Appliquer</button>
                                </div>

                                <div class="collapse" id="collapseExample">
                                    {userCoupon === coupon && new Date() <= new Date(saleDuration) ? 
                                    <div>
                                        <hr/>
                                        <h4 className='cart__summary-item'>Réduction:  
                                            <span className='cart__summary-saleValue'>{`- ${saleCoupon * 100}%`}</span>
                                        </h4>
                                        <h4 className='cart__summary-item'>Nouveau sous-total:  
                                            <span className='cart__summary-afterSaleValue'>{newSubtotalPrice + ' TND'}</span>
                                        </h4>
                                        <hr/>
                                    </div>
                                    :
                                    <Alert message={"Code promo n'est pas valide"}  messageType={"error"} />
                                    }
                                </div>
                                
                                <h4 className='cart__summary-item'>Livraison:  <span className='cart__summary-value'>{newShippingPrice + ' TND'}</span></h4>
                                <hr/>
                                <h4 className='cart__summary-item'>Total: <span className='cart__summary-totalValue'></span>{totalPrice + ' TND'}</h4>
                                <hr />
                                <button  className="btn btn--1" onClick={checkoutHandler}>Commander</button>
                            </div>
                        </div>
                    </Fragment>
                 )}

                <Link to='/' >
                    <button  className="cart__btn-shopBack"><i className="fas fa-angle-double-left me-3"></i>Continuer Vos Achats</button>
                </Link>
             </div>
        </div>
    )
}
