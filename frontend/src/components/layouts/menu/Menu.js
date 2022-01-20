import React, { useState } from 'react';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import classNames from 'classnames';

export default function Menu() {

    const [open, setOpen] = useState(false);

    const closeMobileMenu = () => {
        setOpen(false)
    }

    return (
        <div className={classNames('navbar', { 'navbar-open' : open})}>
            <Navigation />
            <MobileNavigation open={open} setOpen={setOpen} closeMobileMenu={closeMobileMenu} />
        </div>
    )
}
