import React from 'react';
import { Switch, BrowserRouter, Route} from "react-router-dom";
import App from './App';
import Home from "./Home/Home";
import PhotoGallery from "./PhotoGallery/PhotoGallery";



const Routers = () => {
    return (
        <BrowserRouter>
        <App/>
        <Switch>         
            <Route exact path="/" component={Home}/>
            <Route exact path="/gallery" component={PhotoGallery}/>
        </Switch>        
        </BrowserRouter>
        
    )
}

export default Routers;
