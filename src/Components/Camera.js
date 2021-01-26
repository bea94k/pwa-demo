import React, { useState, useEffect } from 'react';

const Camera = () => {
    const [camerasList, setCamerasList] = useState([]);

    useEffect(() => {
        saveCamerasList();
    }, []);
    
    const showEl = (el) => {
        el.classList.remove('hidden');
    };

    const hideEl = (el) => {
        el.classList.add('hidden');
    };
    
    async function getConnectedDevices(type) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        //return devices.filter(device => device.kind === type)
        const filtered = devices.filter(device => device.kind === type);
                console.log('Getting cameras... ', filtered);
                return filtered;
    }

    const saveCamerasList = async () => {
        const newCamerasList = await getConnectedDevices('videoinput');
        setCamerasList(newCamerasList);
    }

    const playVideoFromCamera = async () => {
        if (camerasList.length > 0) {
            // use the first available video camera with a resolution of 1280x720 pixels
            const constraints = {
                'video': {
                    'deviceId': camerasList[0].deviceId,
                    'width': {'min': 1280},
                    'height': {'min': 720}
                    }
                }
            
            try {    
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (stream) {
                console.log('stream: ', stream);

                const videoTracks = stream.getVideoTracks();
                const track = videoTracks[0];
                console.log('track: ', track);
                const imageCapture = new ImageCapture(track);
                
                const videoEl = document.querySelector('video#camera-view');
                const startVideoBtn = document.querySelector('#start-video');
                const stopVideoBtn = document.querySelector('#stop-video');
                const takePhotoBtn = document.querySelector('#take-photo');
                const snappedImg = document.querySelector('img#snap');

                const stopVideo = () => {
                    track.stop();
                    hideEl(stopVideoBtn);
                    hideEl(takePhotoBtn);
                    hideEl(videoEl);
                    showEl(startVideoBtn);
                }

                const takePhoto = async () => {
                    imageCapture.takePhoto().then(function(blob) {
                        console.log('Took photo:', blob);
                        showEl(snappedImg);
                        const photoUrl = URL.createObjectURL(blob);
                        snappedImg.src = photoUrl;
                    }).catch(function(error) {
                    console.log('takePhoto() error: ', error);
                    });
                }

                showEl(videoEl);
                videoEl.srcObject = stream;
                hideEl(startVideoBtn);
                showEl(stopVideoBtn);
                // TO DO: not the best solution to add a listener every time the video is started - many same listenersa at the same time?
                stopVideoBtn.addEventListener('click', () => {stopVideo()});
                showEl(takePhotoBtn);
                takePhotoBtn.addEventListener('click', () => {takePhoto()});
                

                } else {
                    console.log('no stream.')
                }
            } catch (err) {
                console.log('Camera access denied.');
                //console.log(err);
                return;
            }
        } else {
            console.log('no cameras available.')
        }
    }


    return (
        <div>
            <h1>CAMERA</h1>
            <div>
            <p className="btn" onClick={() => {console.log('Cameras from state: ', camerasList)}}>Console.log cameras from state</p>
            </div>
            <div>
            <p className="btn" id="start-video" onClick={() => playVideoFromCamera()}>Start video</p>
            <p className="btn hidden" id="stop-video">Stop video</p>
            <p className="btn hidden" id="take-photo">Take photo</p>
            </div>
            <div className="video-frame">
                <video id="camera-view" className="hidden" autoPlay playsInline controls={false} />
            </div>
            <div className="video-frame">
            <img id="snap" className="hidden" alt="Pic captured from video stream" />
            </div>
        </div>
    );
}

export default Camera;
