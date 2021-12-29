import React, { Fragment, useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { getCategories, clearErrors, deleteCategory } from '../../../redux/actions/categoryActions';
import { NEW_CATEGORY_RESET, UPDATE_CATEGORY_RESET, DELETE_CATEGORY_RESET } from '../../../redux/constants/categoryConstants';
import { Link } from 'react-router-dom';

export default function CategoriesList() {

    const dispatch = useDispatch();

    const { loading, categories, error } = useSelector(state => state.categories);
    const { success } = useSelector(state => state.newCategory);
    const { isUpdated, isDeleted, error: deleteError } = useSelector(state => state.category);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getCategories());
        
        if(error){
            dispatch(notifyUser(error, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(deleteError){
            dispatch(notifyUser(deleteError, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(success){
            dispatch(notifyUser('La catégorie est ajoutée avec succès', 'success'))
            setTimeout(() => dispatch({type: NEW_CATEGORY_RESET}), 5000)
        };

        if(isUpdated){
            dispatch(notifyUser('Catégorie mise à jour avec succès', 'success'));
            setTimeout(() => {dispatch({ type : UPDATE_CATEGORY_RESET})},5000) 
        };

        if(isDeleted){
            dispatch(notifyUser('Catégorie supprimée avec succès', 'success'));
            setTimeout(() => {dispatch({ type : DELETE_CATEGORY_RESET})},5000) 
        };

    }, [dispatch, error, deleteError, success, isUpdated, isDeleted]);

    const deleteHandler = (id) => {
        dispatch(deleteCategory(id))
    }

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                <li key={category._id} className='fs-4'>
                    <div className='d-flex gap-5 p-2 border'>
                        <span>{category.name}</span>
                        <span>{category._id}</span>
                        <div className='ms-auto'>
                            <Link to={`/admin/categories/${category._id}`} className="btn py-1 px-2 me-3 fs-4 bg-primary"><i className="fa fa-pencil-alt"></i></Link>
                            <span className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(category._id)} > <i className="fa fa-trash"></i></span>
                        </div>
                        
                    </div>
                    
                    {category.children.length > 0 && (<ul className='ms-5'>{renderCategories(category.children)}</ul>)}
                </li>
            )
        };
        return myCategories
    };


    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                    {loading ? <Loader/> : (
                        <Fragment>
                            {success && <Alert message={message} messageType={messageType} /> }
                            <h1 className="text-uppercase my-5">Catégories</h1>
                            {(error || isDeleted || isUpdated) && <Alert message={message} messageType={messageType} />}
                            <ul>
                                {categories && renderCategories(categories)}
                            </ul>
                        </Fragment>
                    )}
                </div>
        </div>
    )
}
