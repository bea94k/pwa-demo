import React from 'react';
const Preview = ({photoBlob, passPhotoBlob, togglePhotoAccepted}) => {
    const takeNewPhoto = () => {
        passPhotoBlob(null);
    };
    const acceptPreviewPhotoPhoto = () => {
        togglePhotoAccepted();
    };
    return (
        <div>
            <h2>PREVIEW</h2>
            <div className="btn-wrapper">
                <p className="btn" onClick={() => acceptPreviewPhotoPhoto()}>Continue with this photo</p>
                <p className="btn" onClick={() => takeNewPhoto()}>Take a new photo</p>
            </div>
            {photoBlob ? (
                <div className="photo-prev-frame">
                    <img id="photo-preview" src={URL.createObjectURL(photoBlob)} alt='Preview' />
                    </div>
            ) : null}
        </div>
    );
}
export default Preview;