import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProducts, deleteProduct } from '../../../redux/actions/productActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import { DELETE_PRODUCT_RESET, NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../../redux/constants/product_constants';
import DeleteModal from '../DeleteModal';

export default function ProductsList() {

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const { loading, products, error }= useSelector(state => state.products);
    const { isDeleted, error: deleteError }= useSelector(state => state.product)
    const { success } = useSelector(state => state.newProduct);
    const { isUpdated} = useSelector(state => state.product);
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
            setTimeout(() => dispatch({type: DELETE_PRODUCT_RESET}), 5000)
        } 

        if(success){
            dispatch(notifyUser('Produit ajouté avec succès', 'success'));
            setTimeout(() => dispatch({type: NEW_PRODUCT_RESET}), 5000)
        }

        if(isUpdated){
            dispatch(notifyUser('Produit mis à jour avec succès', 'success'));
            setTimeout(() => dispatch({type: UPDATE_PRODUCT_RESET}), 5000)
        }
        
    }, [error, deleteError, isDeleted, success, isUpdated, navigate, dispatch]);


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
                    label: 'Nom',
                    field: 'name'
                },
                {
                    label: 'Category',
                    field: 'category'
                },
                {
                    label: 'Prix',
                    field: 'price'
                },
                {
                    label: 'Couleur',
                    field: 'color'
                },
                {
                    label: 'Tailles',
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
                sizes: product.sizes.map(size => size.sizeName + '  /  '),
                stock: product.sizes.map(size => size.stock + '  /  '),
                actions : 
                <Fragment>
                    <Link to={`/admin/products/${product._id}`} className="btn py-1 px-2 me-3 fs-4 bg-primary">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(product._id)} >
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

                <div className="col-12 col-md-10 px-5">
                    <Fragment>
                        {(isDeleted || error || success || isUpdated) && <Alert message={message} messageType={messageType} /> }
                        <h1 className="text-uppercase my-5" >Produits</h1>
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
