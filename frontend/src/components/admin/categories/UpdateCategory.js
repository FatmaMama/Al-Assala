import React, { useState,Fragment, useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { getCategories, clearErrors, getCategory, updateCategory } from '../../../redux/actions/categoryActions';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateCategory() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const params = useParams();

    const { loading: categoryLoading, category } = useSelector(state => state.categoryDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector(state => state.category);
    const { loading, categories, error } = useSelector(state => state.categories);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(category && category._id !== params.id){
            dispatch(getCategory(params.id))
        } else {
            setName(category.name);
            if(category.parentId){
                setParent(category.parentId)
            }
        }
        dispatch(getCategories());

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(updateError){
            dispatch(notifyUser(updateError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isUpdated){
            navigate('/admin/categories')
        }

    }, [dispatch, category, params, error, updateError, isUpdated, navigate]);

    const updateHandler = (e) => {
        e.preventDefault();
        const categoryData = {
            name
        };

        if(parent !== ''){
            categoryData.parentId = parent
        }
        dispatch(updateCategory(category._id, categoryData))
    }

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({value: category._id, name: category.name});
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        };
        return options
    }

    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                <Fragment>
                        {(loading || categoryLoading) ? <Loader /> : (
                            <div className="row wrapper">
                                <div className="col-10 col-lg-7">
                                    <form className="shadow-lg" onSubmit={updateHandler} >
                                        <h1 className="mt-2 mb-5 wrapper__title text-center">Mise à jour de la catégorie</h1>
                                        {(error || updateError) && <Alert message={message} messageType={messageType} />}
                
                                        <div className="form-group">
                                            <label htmlFor="name_field">Nom</label>
                                            <input 
                                                type="name" 
                                                id="name_field" 
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="parent_field">Catégorie parent</label>
                                            <select
                                                id="parent_field" 
                                                className="form-control"
                                                name='parent'
                                                value={parent}
                                                onChange={(e) => setParent(e.target.value)}
                                            >
                                                <option>Select Category</option>
                                                {categories && createCategoryList(categories).map(category => 
                                                    <option key={category.value} value={category.value} >{category.name} </option> )}
                                            </select>
                                        </div>
                

                                        <div className="d-grid gap-5 mt-3">
                                            <button 
                                                type="submit" 
                                                className="btn wrapper__button btn-block mt-4 mb-3"
                                                disabled= {updateLoading? true : false}
                                                 >Mettre à jour</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
        </div>
    )
}
