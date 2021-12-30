import React, { useState,Fragment, useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories, clearErrors} from '../../../redux/actions/categoryActions';
import { getProduct, updateProduct } from '../../../redux/actions/productActions';
import AddSizeModal from './AddSizeModal';
import AddColorModal from './AddColorModal';

export default function UpdateProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [productToUpdate, setProductToUpdate] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        color: ''
    });
    const { name, price, description, category, color } = productToUpdate;

    const [sizes, setSizes] = useState([]);
    const [sizeName, setSizeName] = useState('');
    const [stock, setStock] = useState(0);

    const [colors, setColors] = useState([]);
    const [colorName, setColorName] = useState('');
    const [code, setCode] = useState('');
    
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    

    const { categories, error } = useSelector(state => state.categories);
    const { loading, isUpdated, error: updateError } = useSelector(state => state.product);
    const { product, error: productError } = useSelector(state => state.productDetails);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        console.log(product)
        dispatch(getCategories());

        if(product && product._id !== params.id){
            dispatch(getProduct(params.id))
        } else {
            
            setProductToUpdate({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category._id,
                color: product.color
            })
            setSizes(product.sizes);
            setColors(product.colors);
            setOldImages(product.images)
        }

        if(isUpdated){
            navigate('/admin/products');
        }

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(productError){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }

        if(updateError){
            dispatch(notifyUser(updateError, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
       
    }, [dispatch, error, productError, isUpdated, updateError, product, navigate, params]);

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({value: category._id, name: category.name});
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        };
        return options
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('color', color);
        formData.set('category', category);

        formData.set('sizes', JSON.stringify(sizes));
        formData.set('colors', JSON.stringify(colors));
        formData.set('oldImages', JSON.stringify(oldImages));

        images.forEach(image => {
            formData.append('images', image)
        })
        
        dispatch(updateProduct(product._id, formData))
    };

    const onChange = (e) => {
        if(e.target.name === 'images'){

            const files = Array.from(e.target.files);

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImagesPreview(oldArray => [...oldArray, reader.result]);
                        setImages(oldArray => [...oldArray, reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })

        } else {
            setProductToUpdate({...product, [e.target.name] : [e.target.value]})
        }
    };

    const addSize = () => {
        if(sizeName !== ''){
            setSizes([...sizes, { sizeName, stock}])
        }
    };

    const deleteSize = (name) => {
        const newSizes = sizes.filter(size => size.sizeName !== name);
        setSizes(newSizes)
    }

    const addColor = () => {
        if(colorName !== '' && code !== ''){
            setColors([...colors, { colorName, code}])
        }
    };

    const deleteColor = (name) => {
        const newcolors = colors.filter(color => color.colorName !== name);
        setColors(newcolors)
    }

    const deleteOldImage = (id) => {
        const newImages = oldImages.filter(image => image.public_id !== id)
        setOldImages(newImages)
    }

    const deleteImagePreview = (imageToDelete) => {
        const newImages = imagesPreview.filter(image => image !== imageToDelete)
        setImagesPreview(newImages)
    }

    return (
        <div className="row">
                <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 px-5">
                <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row wrapper">
                                <div className="col-10 col-lg-7">
                                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler} >
                                        <h1 className="mt-2 mb-5 wrapper__title text-center">Mettre à jour le produit</h1>
                                        {(error || updateError || productError) && <Alert message={message} messageType={messageType} />}
                
                                        <div className="form-group">
                                            <label htmlFor="name_field">Nom</label>
                                            <input 
                                                type="name" 
                                                id="name_field" 
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={onChange}
                                            />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="price_field">Prix</label>
                                            <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            name= "price"
                                            value={price}
                                            onChange={onChange}
                                            />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="description_field">Description</label>
                                            <textarea className="form-control" id="description_field" rows="8" name= "description"
                                            value={description} onChange={onChange}></textarea>
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="category_field">Catégorie</label>
                                            <select
                                                id="category_field" 
                                                className="form-control"
                                                name='category'
                                                value={category}
                                                onChange={onChange}
                                            >
                                                <option value={category}>{product && product.category && product.category.name}</option>
                                                {categories && createCategoryList(categories).map(category => 
                                                    <option key={category.value} value={category.value} >{category.name} </option> )}
                                            </select>
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="color_field">Couleur</label>
                                            <input 
                                                type="text" 
                                                id="color_field" 
                                                className="form-control"
                                                name='color'
                                                value={color}
                                                onChange={onChange}
                                            />
                                        </div>

                                        <div className="form-group mt-5">
                                            <label htmlFor="price_field">Tailles</label>
                                            
                                            <button type="button" className="btn btn-secondary ms-4" data-bs-toggle="modal" data-bs-target="#sizesModal">
                                                <i className="fas fa-plus fs-2"></i>
                                            </button>

                                            <AddSizeModal  sizeName={sizeName} setSizeName={setSizeName} stock={stock} setStock={setStock} addSize={addSize} />

                                            {sizes.length > 0 && 
                                            <div className='border p-2 mt-4'>
                                            {sizes.map(size => (
                                                <div key={size.sizeName} className='d-flex gap-5 p-2'>
                                                <div className="form-group fs-5 d-flex gap-2 align-items-center">
                                                    <label htmlFor="sizeName_field">Nom</label>
                                                    <input
                                                    readOnly
                                                    type="text"
                                                    id="sizeName_field"
                                                    className="form-control"
                                                    value={size.sizeName}
                                                    />
                                                </div>

                                                <div className="form-group fs-5 d-flex gap-2 align-items-center">
                                                    <label htmlFor="stock_field">Stock</label>
                                                    <input
                                                    readOnly
                                                    type="text"
                                                    id="stock_field"
                                                    className="form-control"
                                                    value={size.stock}
                                                    />
                                                </div>
                                                <span><i className="fa fa-pencil-alt"></i></span>
                                                <span onClick={() => deleteSize(size.sizeName)}><i className="fas fa-trash-alt"></i></span>
                                            </div>
                                            
                                            ))}
                                        </div>
                                            }
                                            
                                        </div>

                                        <div className="form-group mt-5">
                                            <label htmlFor="price_field">Couleurs</label>
                                            
                                            <button type="button" className="btn btn-secondary ms-4" data-bs-toggle="modal" data-bs-target="#colorsModal">
                                                <i className="fas fa-plus fs-2"></i>
                                            </button>

                                            <AddColorModal color={color} setColorName={setColorName} code={code} setCode={setCode} addColor={addColor} />
                                            {/* <div className="modal fade" id="colorsModal" tabIndex="-1" aria-labelledby="colorsModalLabel" aria-hidden="true">
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
                                                        <button type="button" className="btn btn-warning fs-4 fw-bold" data-bs-dismiss="modal" onClick={addColor} >Ajouter</button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {colors.length > 0 &&
                                                <div className='border p-2 mt-4'>
                                                {colors.map(color => (
                                                    <div key={color.colorName} className='d-flex gap-5 p-2'>
                                                    <div className="form-group fs-5 d-flex gap-2 align-items-center">
                                                        <label htmlFor="colorName_field">Nom</label>
                                                        <input
                                                        readOnly
                                                        type="text"
                                                        id="colorName_field"
                                                        className="form-control"
                                                        value={color.colorName}
                                                        />
                                                    </div>

                                                    <div className="form-group fs-5 d-flex gap-2 align-items-center">
                                                        <label htmlFor="code_field">Code</label>
                                                        <input
                                                        readOnly
                                                        type="text"
                                                        id="code_field"
                                                        className="form-control"
                                                        value={color.code}
                                                        />
                                                    </div>
                                                    <span onClick={() => deleteColor(color.colorName)}><i className="fas fa-trash-alt"></i></span>
                                                    </div>
                                                ))}
                                                </div>
                                            }
                                            
                                        </div>

                                        <div className='form-group mt-5'>
                                            
                                                <div className='custom-file'>
                                                    <label htmlFor="formFileMultiple" className="form-label">Choisir des images</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="file" 
                                                        id="formFileMultiple" 
                                                        name= "images"
                                                        
                                                        onChange={onChange}
                                                        multiple={true}>
                                                    </input>
                                                </div>

                                                {oldImages && oldImages.map(image => (
                                                    <span  className='image' key={image.public_id}>
                                                        <img className=" mt-3 me-4" src={image.url} alt={image.url} 
                                                        width="55" height="52" />
                                                        <span className='image__delete' onClick={() => deleteOldImage(image.public_id)}><i className="fas fa-times-circle"></i></span>
                                                    </span>
                                                ))}

                                                {imagesPreview.map(image => (
                                                    <span  className='image' key={image}>
                                                        <img className="mt-3 mr-2" src={image} alt="images Preview" 
                                                        width="55" height="52" />
                                                        <span className='image__delete' onClick={() => deleteImagePreview(image)}><i className="fas fa-times-circle"></i></span>
                                                    </span>
                                                ))}
                                        </div>
                

                                        <div className="d-grid gap-5 mt-3">
                                            <button type="submit" className="btn wrapper__button btn-block mt-4 mb-3" >Mettre à jour</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
        </div>
    )
}
