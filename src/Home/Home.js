import React, { useState } from 'react';
import Camera from '../Camera/Camera';
import AddPost from '../AddPost/AddPost';

export default function Home() {
    const [photoBlobUrl, setPhotoBlobUrl] = useState('')

    const handlePhotoBlobUrl = (newPhotoBlob) => {
        setPhotoBlobUrl(newPhotoBlob);
    }

    return (
        <div>
            Home here
            <Camera passPhotoBlobUrl={handlePhotoBlobUrl}/>
            <AddPost photoBlobUrl={photoBlobUrl} />
        </div>
    )
}
