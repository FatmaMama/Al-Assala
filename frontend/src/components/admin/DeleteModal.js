import React from 'react'

export default function DeleteModal({asset, name, deleteHandler, index}) {
    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-2" id="deleteModalLabel">Supprimer "{asset}" ?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <p className='p-3 pb-5'>Êtes-vous sûr de vouloir supprimer l'actif {name} ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary fs-4" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-danger fs-4" data-bs-dismiss="modal" onClick={() => deleteHandler(index)} >Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
