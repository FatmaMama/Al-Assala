import React, { Fragment } from 'react';
import ProductCart from './ProductCart';

export default function ProductsDisplay({ products, productsCount, resPerPage }) {
    return (
        <Fragment>
            {productsCount > resPerPage ? <h3 className='text-center result-text'>{`Affichage de 1-${products && products.length} sur ${productsCount} résultats`}</h3>
                :  <h3 className='text-center result-text'>{`${productsCount} Résultats affichés`}</h3>
            }
           
            <div className='display mb-5'>
                {products && products.map(product => (
                    <ProductCart product={product} />
                ))}
            </div>
        </Fragment>
    )
}
