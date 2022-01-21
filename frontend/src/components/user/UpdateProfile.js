import React from 'react';

export default function UpdateProfile() {
  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form  className='shadow-lg' encType='multipart/form-data'>
                <h1 className="mt-2 mb-5">Mettre à jour le profil</h1>

                <div className="form-group">
                    <label htmlFor="email_field">Name</label>
                    <input 
                        type="name" 
                        id="name_field" 
                        className="form-control"
                        name='name'
                        value=''
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value=''
                    />
                </div>

                <div className='form-group mt-3'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src=''
                                    className='rounded-circle'
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
                            />
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-5 mt-3">
                    <button 
                        type="submit" 
                        className="btn wrapper__button btn-block mt-4 mb-3"
                        >
                    Mettre à jour
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
