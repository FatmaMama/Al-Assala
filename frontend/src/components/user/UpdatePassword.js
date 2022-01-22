import React from 'react';

export default function UpdatePassword() {
  return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-5 mt-2">Changer le mot de passe</h1>

                    <div className="form-group">
                        <label for="oldPassword_field">Mot de passe</label>
                        <input
                            type="password"
                            id="oldPassword_field"
                            className="form-control"
                            value=''
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label for="newPassword_field">Nouveau mot de passe</label>
                        <input
                            type="password"
                            id="newPassword_field"
                            className="form-control"
                            value=''
                        />
                    </div>

                    <div className="d-grid gap-5 mt-3">
                    <button 
                        type="submit" 
                        className="btn wrapper__button btn-block mt-4 mb-3"
                        >
                            Changer
                    </button>
                </div>

                </form>
            </div>
        </div>
  )
}
