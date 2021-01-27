import React from 'react';

import {Link} from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
    return (
        <div>       
            <nav className="nav-container"> 
            <Link to="/" className="app-logo">App Name</Link>                
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
