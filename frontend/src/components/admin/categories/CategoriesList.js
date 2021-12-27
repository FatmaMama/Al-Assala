import React, { Fragment, useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { getCategories, clearErrors } from '../../../redux/actions/categoryActions';

export default function CategoriesList() {

    const dispatch = useDispatch();

    const { loading, categories, error } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());

        if(error){
            dispatch(notifyUser(error, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
    }, [dispatch, error]);

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                <li key={category._id} className='fs-4'>
                    <div className='d-flex gap-5 p-2 border'>
                        <span>{category.name}</span>
                        <span>{category._id}</span>
                        <div className='ms-auto'>
                            <span className="btn py-1 px-2 me-3 fs-4 bg-primary"><i className="fa fa-pencil-alt"></i></span>
                            <span className="btn py-1 px-2 ml-2 fs-4 bg-danger"> <i className="fa fa-trash"></i></span>
                        </div>
                        
                    </div>
                    
                    {category.children.length > 0 && (<ul className='ms-5'>{renderCategories(category.children)}</ul>)}
                </li>
            )
        };
        return myCategories
    }


    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                    {loading ? <Loader/> : (
                        <Fragment>
                            <h1 className="text-uppercase my-5">Catégories</h1>
                            <ul>
                                {categories && renderCategories(categories)}
                            </ul>
                        </Fragment>
                    )}
                </div>
        </div>
    )
}
