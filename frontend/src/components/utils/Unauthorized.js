import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

  return (
    <div className="row wrapper ">
        <div className="col-10 col-lg-5 shadow-lg p-5">
            <h1>Non Autorisé <i className="fas fa-exclamation-triangle"></i></h1>
            <p className='mt-2'>Vous n'avez pas accès à la page demandée !!</p>
            <div className='mt-5'>
                <button className='btn btn--1' onClick={goBack}>Go Back</button>
            </div>
        </div>
    </div>
  )
}
