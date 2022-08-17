import React from 'react';
import Logo from '../assets/spaceworld.jpg';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar () {
    return (
        <nav className="navbar">
            <div className="leftSide">
                <img src={ Logo } alt="Logo" />       
            </div>
            <div className="rightSide">
                <Link to="/"> Home </Link>
                <Link to="/News"> News </Link>
                <Link to="/profile"> Profile </Link>
                
            </div>
        </nav>
    )
}

export default Navbar;