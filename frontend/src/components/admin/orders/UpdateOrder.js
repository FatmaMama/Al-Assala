import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notifyUser } from '../../../redux/actions/notifyActions';
import { getOrder, clearErrors } from '../../../redux/actions/orderActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import Sidebar from '../../layouts/Sidebar';

export default function UpdateOrder() {

    const dispatch = useDispatch();
    const params = useParams();

    const [status, setStatus] = useState('');
    const [newOrderItems, setNewOrderItems] = useState([]);
    const [newItemsPrice, setNewItemsPrice] = useState(0);
    const [newTotalPrice, setNewTotalPrice] = useState(0);

    const {loading, order, error} = useSelector(state => state.orderDetails);
    const {shippingInfo, orderItems, user, totalPrice, itemsPrice, shippingPrice, orderStatus, isPaid, saleCoupon} = order;
    const { message, messageType }= useSelector(state => state.notify);

    useEffect(() => {
        if(order && order._id !== params.id){
            dispatch(getOrder(params.id));
        } else {
            setStatus(orderStatus);
            setNewOrderItems(orderItems);
            setNewItemsPrice(itemsPrice);
            setNewTotalPrice(totalPrice)
        }
        
        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
        
    }, [order, params, error, dispatch]);

    const productsQty = order && orderItems && newOrderItems.reduce((acc, item) => {
        return acc + item.quantity
   },0)

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            {loading ? <Loader/> : (
                <div className="col-12 col-md-10 px-5 order">
                    <h1 className="text-uppercase my-5" >Mettre à jour la commande</h1>
                    {error && <Alert message={message} messageType={messageType} /> }

                        <div className="my-4">
                            <span className="me-4 order__title">Commande {order && order._id}</span>
                            <span><b>( {order && order.createdAt && order.createdAt.slice(0,10)} )</b></span>
                        </div>

                        <div className='row mt-5'>
                            <div className="col-12 col-lg-6 ps-5 mt-4">
                                <span className="pb-4 order__subTitle">Informations d'expédition</span>
                                <p><b className='me-2'>Nom:</b> {user && user.firstName + ' ' + user.lastName}</p>
                                <p><b className='me-2'>Téléphone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b className='me-2'>Adresse:</b>{shippingInfo && shippingInfo.address}</p>
                            </div>

                            <div className="col-12 col-lg-6 px-5 mt-4">
                                <div>
                                    <span className="pb-4 me-3 order__subTitle">Paiment:</span>
                                    <span className='text-uppercase'>{order && isPaid ? "payé" : "non payé"}</span>
                                </div>
                                
                                <div>
                                    <span className="pb-4 me-3 order__subTitle">Statut de la commande:</span>
                                    <span>{order && status}</span> 
                                </div>
                                
                                <div>
                                    <span className="me-3 order__subTitle">Montant:</span>
                                    <span>{order && totalPrice + ' TND'}</span>
                                </div>
                                
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h4 className="order__subTitle">({productsQty && productsQty}) Produits commandés:</h4>

                            <hr />
                            <div className="my-1">
                                {newOrderItems.map(item => (
                                    <div key={item._id} className="row my-5">
                                        <div className="col-4 col-lg-1">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-4">
                                            <a href="#">{item.name}</a>
                                        </div>

                                        <div className="col-4 col-lg-1">
                                            <p>{item.color}</p>
                                        </div>
                                        <div className="col-5 col-lg-1">
                                            <p>{item.size}</p>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <p>{item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <p>{item.quantity}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <span>{item.quantity * item.price}</span>
                                            <i className="fa fa-trash float-end"></i>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        <hr />
                        
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p>Sous-total</p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p>({productsQty && productsQty}) articles</p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p>{order && newItemsPrice + ' TND'}</p>
                                </div>
                            </div>

                            {saleCoupon > 0 && (
                                <div className="row">
                                    <div className="col-4 col-lg-4">
                                        <p>Coupon</p>
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <p>{`${saleCoupon * 100}%`}</p>
                                    </div>


                                    <div className="col-3 col-lg-3">
                                        <p>{(newItemsPrice * (1 - saleCoupon)).toFixed(2) + ' TND'}</p>
                                    </div>
                                </div>
                            )}
                       
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p>Expédition</p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p>Livraison 2-3 jours</p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p>{order && shippingPrice && shippingPrice.toFixed(2) + ' TND'}</p>
                                </div>
                            </div>
                       

                        
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p><b>Total</b></p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p></p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p><b>{order && newTotalPrice + ' TND'}</b></p>
                                </div>
                            </div>
                        
                    </div>

                    <div className='mt-5'>
                        <h4 className="order__subTitle">Statut</h4>
                        <div className='row'>
                            <div className='col-md-3 col-12'>
                                <div className="form-group">
                                    <select
                                        className="form-control fs-4"
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
                            <button className="btn mt-5 order_button">
                                Mettre à jour
                            </button>
                        </div>
                    </div>
                    
                </div>
            )}
            
		</div>
    )
}
