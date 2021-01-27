import React, { useState } from 'react';
import Camera from '../Camera/Camera';
import AddPost from '../AddPost/AddPost';

export default function Home() {
    const [photoBlob, setPhotoBlob] = useState()

    const handlePhotoBlob = (newPhotoBlob) => {
        setPhotoBlob(newPhotoBlob);
    }

    return (
        <div>
            Home here
            <Camera passPhotoBlob={handlePhotoBlob}/>
            <AddPost photoBlob={photoBlob} />
        </div>
    )
}
