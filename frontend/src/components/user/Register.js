import React from 'react';
import { Link } from 'react-router-dom';


export default function Register() {
    return (
        <div class="register">
            <div class="login__wrapper">
		        <div class="col-10 col-lg-6 shadow-lg">
                    <form encType='multipart/form-data'>
                        <h1 class="login__title mb-3 text-center">Créez votre compte</h1>

                        <div class="form-group pt-5">
                            <label for="email_field">Name</label>
                            <input type="name" id="name_field" class="form-control" value="" />
                        </div>

                        <div class="form-group">
                            <label for="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                value=""
                            />
                        </div>
            
                        <div class="form-group">
                            <label for="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                class="form-control"
                                value=""
                            />
                        </div>

                        <div class='form-group'>
                            <label for='avatar_upload'>Avatar</label>
                            <div class='d-flex align-items-center'>
                                <div>
                                    <figure class='avatar mr-3 item-rtl'>
                                        <img
                                            src=""
                                            class='rounded-circle'
                                            alt='image'
                                        />
                                    </figure>
                                </div>
                                <div class='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        class='custom-file-input'
                                        id='customFile'
                                    />
                                    <label class='custom-file-label' for='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
            
                        <button
                        id="register_button"
                        type="submit"
                        class="login__button btn btn-block py-3 mt-5"
                        >
                        enregistrer
                        </button>
                        
                        <Link to="/login" className="float-right mt-3 mb-3">Vous avez déjà un compte ? Connectez-vous !</Link>
                    </form>
		        </div>
            </div>
        </div>
    )
}
