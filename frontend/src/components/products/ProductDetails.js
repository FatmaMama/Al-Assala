import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Menu from '../layouts/Menu'

export default function ProductDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    const { loading, product, error } = useSelector(state => state.productDetails)

    useEffect(() => {

    }, [])

    return (
        <div>
            <Menu />
            
            
        </div>
    )
}
