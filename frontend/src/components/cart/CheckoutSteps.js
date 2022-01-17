import React from 'react';
import classNames from 'classnames';

export default function CheckoutSteps({ shipping, payment}) {
    return (
        <div className='steps' >
            <div className='steps__step'>
                <p className={classNames('steps__1', {'steps__active': shipping })} ><span>1</span></p>
                <p>Informations de livraison</p>
            </div>

            <div className='steps__step'>
                <p className={classNames('steps__1', {'steps__active': payment })}><span>2</span></p>
                <p>Commande et Paiement</p>
            </div>
        </div>
    )
}
