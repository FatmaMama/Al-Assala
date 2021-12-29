import React, { useState,Fragment, useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { getCategories, clearErrors, newCategory } from '../../../redux/actions/categoryActions';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [parent, setParent] = useState('');

    const { loading, categories, error } = useSelector(state => state.categories);
    const { success, error: addError } = useSelector(state => state.newCategory);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getCategories());

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(addError){
            dispatch(notifyUser(addError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(success){
            navigate('/admin/categories')
        }

    }, [dispatch, error, addError, success]);

    const addHandler = (e) => {
        e.preventDefault();
        const categoryData = {
            name
        };

        if(parent !== ''){
            categoryData.parentId = parent
        }
        dispatch(newCategory(categoryData))
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
                        {loading ? <Loader /> : (
                            <div className="row wrapper">
                                <div className="col-10 col-lg-7">
                                    <form className="shadow-lg" onSubmit={addHandler} >
                                        <h1 className="mt-2 mb-5 wrapper__title text-center">Ajouter une catégorie</h1>
                                        {error && <Alert message={message} messageType={messageType} />}
                
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
                                                <option>Choisir une catégorie</option>
                                                {categories && createCategoryList(categories).map(category => 
                                                    <option key={category.value} value={category.value} >{category.name} </option> )}
                                            </select>
                                        </div>
                

                                        <div className="d-grid gap-5 mt-3">
                                            <button type="submit" className="btn wrapper__button btn-block mt-4 mb-3" >Ajouter</button>
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
