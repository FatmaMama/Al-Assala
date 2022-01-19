import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { notifyUser } from '../../../redux/actions/notifyActions';
import { getOrder, clearErrors, getToUpdateOrder, removeFromOrder } from '../../../redux/actions/orderActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import Sidebar from '../../layouts/Sidebar';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

export default function UpdateOrder() {

    const pdfExportComponent = useRef(null);

    const dispatch = useDispatch();
    const params = useParams();

    const [status, setStatus] = useState('');
    // const [newOrderItems, setNewOrderItems] = useState([]);
    // const [newItemsPrice, setNewItemsPrice] = useState(0);
    // const [newTotalPrice, setNewTotalPrice] = useState(0);

    const {loading, order, error} = useSelector(state => state.orderDetails);
    
    const { message, messageType }= useSelector(state => state.notify);
    const {settings} = useSelector(state => state.settingsInfos);
    const { toUpdateOrder } = useSelector(state => state.orderToUpdate);
    const {shippingInfo, orderItems, user, shippingPrice, orderStatus, isPaid, saleCoupon} = toUpdateOrder;

    useEffect(() => {
        if(order && order._id !== params.id){
            dispatch(getOrder(params.id));
        }
        // } else {
            // setStatus(orderStatus);
            // setNewOrderItems(orderItems);
            // setNewItemsPrice(itemsPrice);
            // setNewTotalPrice(totalPrice);
            // setNewShippingPrice(shippingPrice)
            
        // }
        if(order){
            dispatch(getToUpdateOrder(order))
        }
       
        
        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
        
    }, [order, params, error, dispatch]);

    const productsQty = toUpdateOrder && orderItems && orderItems.reduce((acc, item) => {
        return acc + item.quantity
    },0);


    const getSubTotalPrice = () => {
        return toUpdateOrder && orderItems && orderItems.reduce((total,item) => {
            return item.salePrice === 0 ?
                total + item.price * item.quantity
            :
                total + item.salePrice * item.quantity
        }, 0)
    }

    const subTotalPrice = getSubTotalPrice();

    const handleShippingPrice = () => {
        return settings && subTotalPrice >=  settings.shippingFreeLimit  ? '0.00' : shippingPrice
    }

    const newShippingPrice = handleShippingPrice();


    const getNewSubtotalPrice = () => {
        return saleCoupon !== 0 ? (subTotalPrice * (1 - saleCoupon)).toFixed(2) : 0
    };

    const newSubtotalPrice = getNewSubtotalPrice();

    const totalPrice = newSubtotalPrice !== 0 ? (Number(newSubtotalPrice) + Number(newShippingPrice)).toFixed(2)  : (subTotalPrice + Number(newShippingPrice)).toFixed(2) 

    const removeItemHandler = (id, size) => {
        dispatch(removeFromOrder(id, size))
    };


   const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            {loading ? <Loader/> : (
                <div className="col-12 col-md-10 px-5 order">
                    {error && <Alert message={message} messageType={messageType} /> }
<h1>{console.log(toUpdateOrder)} </h1>
                    <div className='d-flex justify-content-between my-5'>
                        <h1 className="text-uppercase" >Mettre à jour la commande</h1>
                        <button className='btn order__button' onClick={exportPDFWithComponent}>Télécharger</button>
                    </div>
                    
                    <PDFExport ref={pdfExportComponent} scale={0.5} paperSize="A4" margin="0.5cm">
                        <div className="my-4">
                            <span className="order__title">{order && `Commande #${order._id}`}</span>
                            <div className="order__date"><b>{order && order.createdAt && order.createdAt.slice(0,10)}</b></div>
                        </div>

                        <div className='row px-1 mt-5 py-5 info'>
                        <div className='col-12 col-lg-6 info__box'>
                            <span className="pb-4 order__subTitle">Informations d'expédition:</span>
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Nom et Prénom:</span>
                                <span className='info__item-2 text-uppercase'>{user && user.firstName + ' ' + user.lastName}</span>
                            </div>
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Contact:</span>
                                <span className='info__item-2'>{shippingInfo && '+216 ' + shippingInfo.phoneNo}</span>
                            </div>
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Expédier à:</span>
                                <span className='info__item-2'>{`${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city},
                                        ${shippingInfo && shippingInfo.postalCode}, ${shippingInfo && shippingInfo.country}`}</span>
                            </div>
                        </div>

                        <div className='col-12 col-lg-5 mt-5 mt-lg-0 info__box'>
                            <span className="pb-4 order__subTitle">Paiement:</span>
                            <div className='info__items'>
                                <span className='info__item-1'>Paiement:</span>
                                <span className='info__item-2 text-uppercase'>{order && isPaid ? "payé" : "non payé"}</span>
                            </div>
                                
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Statut de la commande:</span>
                                <span className='info__item-2 text-uppercase'>{order && orderStatus}</span> 
                            </div>
                                
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Montant:</span>
                                <span className='info__item-2'><b>{order && totalPrice + ' TND'}</b></span>
                            </div>
                        </div>
                    </div>

                    <div className='order__cart'>
                    <h4 className="order__subTitle">({productsQty && productsQty}) Articles commandés:</h4>
                    <div className='mt-5'>
                                <div className='cart__grid cart__head'>
                                    <h4></h4>
                                    <h4 className='center'>Produit</h4>
                                    <h4 className='center'>Couleur</h4>
                                    <h4 className='center'>Taille</h4>
                                    <h4 className='center'>Prix</h4>
                                    <h4 className='center'>Quantité</h4>
                                </div>

                                {toUpdateOrder && toUpdateOrder.orderItems && toUpdateOrder.orderItems.map(item => (
                                    <Fragment key={item.product}>
                                    <hr />
                                    <div key={item.product} className='cart__grid order__item'>
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
                                                <input type="number" className="form-control cart__qty" value={item.quantity} readOnly />
                                               
                                            </div>
                                        </div>

                                        <div className="order__delete" onClick={()=>{removeItemHandler(item.product, item.size)}}>
                                            <i className="far fa-trash-alt"></i>
                                        </div>
                                    </div>
                                     </Fragment>
                                ))}
                                <hr/>   
                            </div>

                            <div className='px-5'>
                                <div className='cart__summary-item'>
                                    <span>Sous-total:</span> 
                                    <span>({productsQty && productsQty}) articles</span>
                                    <span className='cart__summary-value'>{subTotalPrice && subTotalPrice.toFixed(2) + ' TND'}</span>
                                </div>

                                <div>
                                    {saleCoupon !== 0 &&
                                    <div>
                                        
                                        <div className='cart__summary-item'>  
                                            <span>Réduction:</span>
                                            <span className='cart__summary-saleValue'>{`- ${saleCoupon * 100}%`}</span>
                                            <span className='cart__summary-afterSaleValue'>{newSubtotalPrice + ' TND'}</span>
                                        </div>
                                        
                                    </div>
                                    
                                    }
                                </div>
                                
                                <div className='cart__summary-item'>
                                    <span>Livraison:</span>
                                    <span>Livraison 2-3 jours</span>
                                    <span className='cart__summary-value'>{newShippingPrice + ' TND'}</span>
                                </div>
                                
                                <div className='cart__summary-item'>
                                    <h1>Total:</h1>
                                    <h1 className='cart__summary-totalValue'>{totalPrice + ' TND'}</h1>
                                </div>
                               
                            </div>
                            </div>
                    </PDFExport>

                    <div className='mt-5 order__cart'>
                        <div className='row d-flex justify-content-around'>
                            <div className='col-md-5 col-12'>
                                <Link to='/products' >
                                    <button className='btn order__button'>
                                        Ajouter un produit <i className="fas fa-plus ms-2"></i>
                                    </button>
                                </Link>
                            </div>

                            <div className='col-md-5 col-12 d-flex gap-4 align-items-center'>
                                <span className='order__subTitle'>Statut de la commande: </span>
                                <div className="form-group">
                                    <select
                                        className="form-control fs-4 order__status"
                                        name='status'
                                        value={status}
                                    >
                                        <option value="Processing">non-traitée</option>
                                        <option value="Shipped">expédiée</option>
                                        <option value="Delivered">livrée</option>
                                        <option value="Delivered">retournée</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-5 col-12 d-flex justify-content-center'>
                            <button className="btn btn--1 m-5">
                                Mettre à jour
                            </button>
                        </div>
                    </div>
                    
                </div>
            )}
            
		</div>
    )
}
