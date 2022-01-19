import React from 'react';

export default function AddProductToOrderUpdateModal({addToOrder, productId, setProductId, size, setSize, quantity, setQuantity}) {
  return (
  <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title fs-2" id="productModalLabel">Ajouter un Produit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
              <div className='d-flex gap-5 justify-content-center'>
                  <div className="form-group">
                      <label htmlFor="productId_field">Identifiant</label>
                      <input
                           type="text"
                          id="productId_field"
                          className="form-control"
                          name= "productId"
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="size_field">Taille</label>
                      <input
                          type="text"
                          id="size_field"
                          className="form-control"
                          name= "size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="quantity_field">Quantité</label>
                      <input
                          type="text"
                          id="quantity_field"
                          className="form-control"
                          name= "quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                      />
                  </div>
              </div>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-secondary fs-4" data-bs-dismiss="modal">Fermer</button>
              <button type="button" className="btn btn-warning fs-4 fw-bold" data-bs-dismiss="modal" onClick={() => addToOrder(productId, quantity, size)} >Ajouter</button>
          </div>
      </div>
  </div>
</div>
)
}
