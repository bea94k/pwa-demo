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
    return (
        <div id="home-page">
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