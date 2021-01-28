import React from 'react';
import { Switch, BrowserRouter, Route} from "react-router-dom";
import Home from "./Home/Home";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import NavBar from "./Navbar/NavBar";



const Routers = () => {
    return (
        <BrowserRouter>
        <NavBar/>
        <Switch>         
            <Route exact path="/" component={Home}/>
            <Route exact path="/gallery" component={PhotoGallery}/>
        </Switch>  
           
        </BrowserRouter>
        
    )
}

export default Routers;
