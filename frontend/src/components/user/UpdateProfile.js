import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notifyUser } from '../../redux/actions/notifyActions';
import { loadUser, clearErrors, updateProfile } from '../../redux/actions/userActions';
import Alert from '../layouts/Alert';

export default function UpdateProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');

    const { user } = useSelector(state => state.auth);
    const { loading, isUpdated, error} = useSelector(state => state.user);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            if(user.avatar){
                setAvatarPreview(user.avatar.url);
            }
        }

        if(isUpdated){
            dispatch(loadUser())
            navigate('/user/profile');
        };

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, isUpdated, error, user, navigate]);

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    };

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
    };

  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form  className='shadow-lg' encType='multipart/form-data' onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Mettre à jour le profil</h1>
                {error && <Alert message={message} messageType={messageType} />}

                <div className="form-group">
                    <label htmlFor="firstName_field">Nom</label>
                    <input 
                        type="firstName" 
                        id="firstName_field" 
                        className="form-control"
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="lastName_field">Prénom</label>
                    <input 
                        type="lastName" 
                        id="lastName_field" 
                        className="form-control"
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group mt-3'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='me-3'>
                                <img
                                    src={avatarPreview}
                                    className='avatar'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='form-control'
                                id='customFile'
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-5 mt-3">
                    <button 
                        type="submit" 
                        className="btn wrapper__button btn-block mt-4 mb-3"
                        disabled={loading ? true : false}
                        >
                    Mettre à jour
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
