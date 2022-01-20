import React, { Fragment } from 'react';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';


export default function Menu() {

    return (
        <div className='navbar'>
            <Navigation />
            <MobileNavigation />
        </div>
    )
}
