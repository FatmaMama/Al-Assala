import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProducts, deleteProduct } from '../../../redux/actions/productActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import { DELETE_PRODUCT_RESET } from '../../../redux/constants/product_constants';

export default function ProductsList() {

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const { loading, products, error }= useSelector(state => state.products);
    const { isDeleted, error: deleteError }= useSelector(state => state.product)
    const { message, messageType }= useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getAdminProducts());

        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(deleteError){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isDeleted){
            dispatch(notifyUser('Produit supprimé avec succès', 'success'));
            navigate('/admin/products')
            setTimeout(() => dispatch({type: DELETE_PRODUCT_RESET}), 5000)
        } 
        
    }, [error, deleteError, isDeleted, navigate]);


    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Category',
                    field: 'category'
                },
                {
                    label: 'Price',
                    field: 'price'
                },
                {
                    label: 'Color',
                    field: 'color'
                },
                {
                    label: 'Sizes',
                    field: 'sizes'
                },
                {
                    label: 'Stock',
                    field: 'stock'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        products && products.forEach(product => {
            data.rows.push({
                id : product._id,
                name : product.name,
                category: product.category.name,
                price : `$${product.price}`,
                color : product.color,
                sizes: product.sizes.map(size => size.name + '  /  '),
                stock: product.sizes.map(size => size.stock + '  /  '),
                actions : 
                <Fragment>
                    <Link to='#' className="btn py-1 px-2 me-3 fs-4 bg-primary">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(product._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
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

                <div className="col-12 col-md-10 px-5">
                <Fragment>
                        {(isDeleted || error) && <Alert message={message} messageType={messageType} /> }
                        <h1 className="my-5" >All Products</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable 
                            data={setProducts()}
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
