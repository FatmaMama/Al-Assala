import React, { useEffect, Fragment } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getByStatusOrders } from '../../../redux/actions/orderActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { deleteOrder } from '../../../redux/actions/orderActions';
import { DELETE_ORDER_RESET } from '../../../redux/constants/orderConstants';

export default function OrdersByStatus() {

    const dispatch = useDispatch();
    const params = useParams();

    const { isDeleted, error: deleteError}= useSelector(state => state.order);
    const { loading, orders, error } = useSelector(state => state.orders);
    const { message, messageType } = useSelector(state => state.notify)

    useEffect(() => {
        dispatch(getByStatusOrders());

        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(deleteError){
            dispatch(notifyUser(deleteError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isDeleted){
            dispatch(notifyUser('Commande supprimée avec succès', 'success'));
            setTimeout(() => dispatch({type: DELETE_ORDER_RESET}), 5000)
        } 
        
    }, [error, deleteError, isDeleted, dispatch]);

    const deleteHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        orders && orders.forEach(order => {
            if(order.orderStatus === params.status){
                order.orders.forEach(preOrder => {
                    data.rows.push({
                        id : preOrder,
                        actions : 
                        <Fragment>
                            <Link to={`/admin/orders/${preOrder}`} data-bs-dismiss="modal" className="btn py-1 px-2 me-3 fs-4 bg-primary">
                                <i className="fa fa-pencil-alt"></i>
                            </Link>
                            <button className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(preOrder)} >
                                <i className="fa fa-trash"></i>
                            </button>
                            {/* <button type="button" className="btn py-1 px-2 ml-2 fs-4 bg-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                <i className="fa fa-trash"></i>
                            </button>
                            <DeleteModal asset='produit' name={product.name} deleteHandler={deleteHandler} index={product._id} /> */}
                        </Fragment>
                    })
                })
                
            }
        });
        return data
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10 px-5">
                    <Fragment>
                        {(isDeleted || error || deleteError) && <Alert message={message} messageType={messageType} /> }
                        <h1 className="text-uppercase my-5" >Commandes {params.status}s</h1>
                        
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
        </div>
    )
}
