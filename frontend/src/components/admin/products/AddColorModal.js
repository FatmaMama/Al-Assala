import React from 'react'

export default function AddColorModal({colorName, setColorName, code, setCode, addColor}) {

    return (
        <div className="modal fade" id="colorsModal" tabIndex="-1" aria-labelledby="colorsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-2" id="colorsModalLabel">Ajouter une couleur</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className='d-flex gap-5'>
                            <div className="form-group">
                                <label htmlFor="colorName_field">Nom</label>
                                <input
                                    type="text"
                                    id="colorName_field"
                                    className="form-control"
                                    name= "colorName"
                                    value={colorName}
                                    onChange={(e) => setColorName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="code_field">Code</label>
                                <input
                                    type="text"
                                    id="code_field"
                                    className="form-control"
                                    name= "code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary fs-4" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" className="btn btn-warning fs-4 fw-bold" data-bs-dismiss="modal" onClick={() => addColor()} >Ajouter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
