import React from 'react';

import { BrowserRouter as Router, Link,Switch,Route} from "react-router-dom";
import Home from '../Home/Home';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import "./NavBar.css";

export default function NavBar() {
    return (
        <Router>       
            <nav className="nav-container"> 
                 <a className="app-logo">App Name</a>                
              <ul className="nav-list">
                <li className="list-item"> 
                <Link to="/">Home</Link>
                </li>
               
                <li className="list-item">
                <Link to="/gallery">
                PhotoGallery
                </Link>
                </li>
            </ul>
            </nav>  
             <Switch>         
            <Route exact path="/">{Home}</Route>
            <Route exact path="/gallery">{PhotoGallery}</Route>
        </Switch>      
        </Router>
    )
}
