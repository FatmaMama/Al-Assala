import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import { deleteOrder, getOrders, clearErrors } from '../../../redux/actions/orderActions';
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../../redux/constants/orderConstants';

export default function OrdersList() {

    const dispatch= useDispatch();

    const { loading, orders, error }= useSelector(state => state.orders);
    const { isDeleted, error: deleteError, isUpdated }= useSelector(state => state.order)
    const { message, messageType }= useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getOrders());

        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(deleteError){
            dispatch(notifyUser(deleteError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isDeleted){
            dispatch(notifyUser('Commande supprimée avec succès', 'success'));
            setTimeout(() => dispatch({type: DELETE_ORDER_RESET}), 5000)
        } 

        if(isUpdated){
            dispatch(notifyUser('Commande mise à jour avec succès', 'success'));
            setTimeout(() => dispatch({type: UPDATE_ORDER_RESET}), 5000)
        }
        
    }, [error, deleteError, isDeleted, isUpdated, dispatch]);


    const deleteHandler = (id) => {
        dispatch(deleteOrder(id))
    }


    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                   sort: 'desc'
                },
                {
                    label: 'Nbr des produits',
                    field: 'numOfItems'
                },
                {
                    label: 'Montant',
                    field: 'amount'
                },
                {
                    label: 'Statut',
                    field: 'status'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        orders && orders.forEach(order => {
            data.rows.push({
                id : order._id,
                numOfItems : order.orderItems.reduce((acc, item) => {
                    return acc + item.quantity
               },0),
                amount: `$${order.totalPrice}`,
                status : order.orderStatus && String(order.orderStatus).includes('livrée')
                ? <p style={{color : 'green'}}>{order.orderStatus}</p>
                : <p style={{color : 'red'}}>{order.orderStatus}</p>,
                actions : 
                <Fragment>
                    <Link to={`/admin/orders/${order._id}`} className="btn py-1 px-2 me-3 fs-4 bg-primary">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(order._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
                    {/* <button type="button" className="btn py-1 px-2 ml-2 fs-4 bg-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <i className="fa fa-trash"></i>
                    </button>
                    <DeleteModal asset='produit' name={product.name} deleteHandler={deleteHandler} index={product._id} /> */}
                </Fragment>
            })
            
        });
        return data
    };

    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                {loading ? <Loader/> : (
                    <div className="col-12 col-md-10 px-5">
                        <Fragment>
                            {(isDeleted || error || deleteError || isUpdated) && <Alert message={message} messageType={messageType} /> }
                            <h1 className="text-uppercase my-5" >Commandes</h1>
                            {loading ? <Loader /> : (
                                <MDBDataTable 
                                data={setOrders()}
                                className="mx-3 fs-4"
                                bordered
                                hover
                                striped
                            />
                            )}
                        </Fragment>
                    </div>
                )}
               
        </div>
    )
}
