import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../redux/actions/productActions';

export default function ProductsList() {

    const dispatch= useDispatch()
    const { loading, products, error }= useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch]);


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
                    <button className="btn py-1 px-2 ml-2 fs-4 bg-danger">
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
