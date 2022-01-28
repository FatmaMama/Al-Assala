import React, { Fragment } from 'react';
import ProductCart from './ProductCart';

export default function ProductsDisplay({ products, productsCount, resPerPage }) {
    return (
        <Fragment>
            {productsCount > resPerPage ? <h3 className='text-center result-text'>{`Affichage de 1-${resPerPage} sur ${productsCount} résultats`}</h3>
                :  <h3 className='text-center result-text'>{`${productsCount} Résultats affichés`}</h3>
            }
            
            <div className='display'>
                {products && products.map(product => (
                    <ProductCart product={product} />
                ))}
            </div>
        </Fragment>
    )
}
