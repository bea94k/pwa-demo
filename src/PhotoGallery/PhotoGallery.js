import React,{useEffect,useState} from 'react';
import {db} from "./../firebase/Firebase";

import './PhotoGallery.css';

const PhotoGallery = () => {
    const [gallery, setGallery] = useState([]);

    //fetching data from firebase
    useEffect(() => {
        const getInfo = async ()=> {
     const getData = await db.collection("posts").get();
     const snapShot = [];
     getData.forEach((info)=>{
         //console.log({...info.data()});
         snapShot.unshift({
            id:info.id,
            ...info.data()
        })
     })
     //console.log(snapShot);
     setGallery(snapShot);
        }
        getInfo()
    }, []);


    return (
        <div>
            <h1 className="centered">GALLERY</h1>
            <div className="posts-grid">
            {gallery.map(({location,id,photo,title})=>{
                return <div className="post-card" key={id}>
                  <img src={photo} alt="photos" />
                <div className="card-text">
                    <div>Title: {title}</div>
                    <div>Location: {location}</div>
                  </div>
                </div>
            })}
            </div>
        </div>
    )
}


export default PhotoGallery;