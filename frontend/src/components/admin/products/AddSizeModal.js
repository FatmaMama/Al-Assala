import React from 'react';

export default function AddSizeModal({addSize, sizeName, setSizeName, stock, setStock}) {

    return (
        <div className="modal fade" id="sizesModal" tabIndex="-1" aria-labelledby="sizesModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-2" id="sizesModalLabel">Ajouter une taille</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className='d-flex gap-5'>
                            <div className="form-group">
                                <label htmlFor="sizeName_field">Nom</label>
                                <input
                                     type="text"
                                    id="sizeName_field"
                                    className="form-control"
                                    name= "sizeName"
                                    value={sizeName}
                                    onChange={(e) => setSizeName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="text"
                                    id="stock_field"
                                    className="form-control"
                                    name= "stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary fs-4" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" className="btn btn-warning fs-4 fw-bold" data-bs-dismiss="modal" onClick={() => addSize()} >Ajouter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
