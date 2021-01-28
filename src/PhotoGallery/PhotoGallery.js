import React,{useEffect,useState} from 'react';
import {db} from "./../firebase/Firebase";

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
            {gallery.map(({location,id,photo,title})=>{
                return <div key={id}>
                  <img src={photo} alt="photos" width="600" height="400"/>
                  <div>{title}</div>
                  <div>{location}</div>
                </div>
            })}
        </div>
    )
}


export default PhotoGallery;