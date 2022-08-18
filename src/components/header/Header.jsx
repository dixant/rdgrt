import React from 'react';
import logo from '../../images/logo/logoStateStreet.png';
import './Header.css';
const Header = () => {
    return (
        <header>
            <div className="pull-left left-header">
                <img className="logo" src={logo} />
                <div className="brand-name">STATE STREET</div>
            </div>
            <div className="mid-header">
                RDG Test
            </div>
            <div className="right-header">User Name: <span></span></div>
        </header>
    );
}

export default Header;
