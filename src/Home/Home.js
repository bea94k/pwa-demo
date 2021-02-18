import React, { useState } from 'react';
import Camera from '../Camera/Camera';
import Preview from '../Preview/Preview';
import AddPost from '../AddPost/AddPost';

import "./Home.css";

export default function Home() {
    const [photoBlob, setPhotoBlob] = useState();
    const [photoAccepted, setPhotoAccepted] = useState(false);
    
    const handlePhotoBlob = (newPhotoBlob) => {
        setPhotoBlob(newPhotoBlob);
    }
    const togglePhotoAccepted = () => {
        setPhotoAccepted(!photoAccepted);
    }

    ///// testing connecting to backend through Netlify functions ////
    const [msg, setMsg] = useState('DEFAULT MSG');

    const fetchMsg = () => {
        fetch('/.netlify/functions/hello')
        .then(res => res.json())
        .then(({message}) => setMsg({message}))
        //.catch((err) => setMsg(`Something went wrong when fetching from backend (${err}).`))
    }


    ////////////
    return (
        <div id="home-page">
            <div style={{"backgroundColor": "pink"}}>
                <p>Message: {msg}</p>
                <button onClick={() => fetchMsg()}>Click me to get msg from backend</button>
            </div>
                {/* <p>Photo blob exists: {photoBlob ? 'yes' : 'no'}</p>
                <p>Photo is accepted: {photoAccepted.toString()}</p> */}
                {!photoBlob ? (
                    <Camera passPhotoBlob={handlePhotoBlob} />
                ) : (
                    // there is a blob
                    !photoAccepted ? (
                        // blob, but not accepted yet
                        <Preview photoBlob={photoBlob} passPhotoBlob={handlePhotoBlob} togglePhotoAccepted={togglePhotoAccepted} />
                    ) : (
                        //blob and accepted
                        <AddPost photoBlob={photoBlob} passPhotoBlob={handlePhotoBlob} togglePhotoAccepted={togglePhotoAccepted} />
                    )
                )}
        </div>
    )
}