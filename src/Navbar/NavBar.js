import React from 'react';

import {Link} from "react-router-dom";
import logo from '../druid_logo.png';

import "./NavBar.css";

export default function NavBar() {
    return (
        <div>       
            <nav className="nav-container"> 
            <Link to="/" className="app-logo">
                <img className="logo" src={logo} />    
            </Link>                
              <ul className="nav-list">    
                <Link to="/" className="list-item">Home</Link> 
                <Link to="/gallery" className="list-item">
                PhotoGallery
                </Link> 
            </ul>
            </nav>  
             
        </div>
    )
}
