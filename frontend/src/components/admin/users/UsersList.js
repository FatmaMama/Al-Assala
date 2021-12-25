import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import { deleteUser, getAllUsers, clearErrors } from '../../../redux/actions/userActions';
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../../redux/constants/userConstants';

export default function UsersList() {

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const { loading, users, error }= useSelector(state => state.users);
    const { isDeleted, error: deleteError, isUpdated }= useSelector(state => state.user)
    const { message, messageType }= useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getAllUsers());

        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(deleteError){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(isDeleted){
            dispatch(notifyUser('Utilisateur supprimé avec succès', 'success'));
            navigate('/admin/users')
            setTimeout(() => dispatch({type: DELETE_USER_RESET}), 5000)
        } 

        if(isUpdated){
            dispatch(notifyUser('Utilisateur mis à jour avec succès', 'success'));
            navigate('/admin/users');
            setTimeout(() => {dispatch({ type : UPDATE_USER_RESET})},5000) 
        }
        
    }, [error, deleteError, isDeleted, isUpdated, navigate, dispatch]);


    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }


    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nom',
                    field: 'nom'
                },
                {
                    label: 'Prénom',
                    field: 'prénom'
                },
                {
                    label: 'Email',
                    field: 'email'
                },
                {
                    label: 'Rôle',
                    field: 'role'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        users && users.forEach(user => {
            data.rows.push({
                id: user._id,
                nom: user.firstName,
                prénom: user.lastName,
                email: user.email,
                role: user.role,
                actions : 
                <Fragment>
                    <Link to={`/admin/users/${user._id}`} className="btn py-1 px-2 me-3 fs-4 bg-primary">
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <button className="btn py-1 px-2 ml-2 fs-4 bg-danger" onClick={() => deleteHandler(user._id)} >
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
                        {(isDeleted || isUpdated || error) && <Alert message={message} messageType={messageType} /> }
                        <h1 className="my-5" >All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable 
                            data={setUsers()}
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