import React, { useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import Menu from '../layouts/Menu';

export default function AllProducts() {

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');

    useEffect(() => {

    }, [])

    return (
        <div>
            <Menu />
        </div>
    )
}
