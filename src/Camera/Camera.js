import React, { useState, useEffect } from 'react';
import "./Camera.css";

const Camera = ({passPhotoBlob}) => {
    const [camerasList, setCamerasList] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(0);

    useEffect(() => {
        saveCamerasList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // TO DO: what happens when the camera changed when the video is already on?
    const playVideoFromCamera = async () => {
        if (camerasList.length > 0) {
            // use the first available video camera with a resolution of 1280x720 pixels
            const constraints = {
                'video': {
                    'deviceId': camerasList[selectedCamera].deviceId,
                    'width': {'min': 1280},
                    'height': {'min': 720}
                    }
                }
            
            try {    
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (stream) {
                const videoTracks = stream.getVideoTracks();
                const track = videoTracks[0];
                const imageCapture = new ImageCapture(track);
                
                const videoEl = document.querySelector('video#camera-view');
                const startVideoBtn = document.querySelector('#start-video');
                const takePhotoBtn = document.querySelector('#take-photo');
                const changeCameraBtn = document.querySelector('#change-camera');
                const snappedImg = document.querySelector('img#snap');

                hideEl(snappedImg);
                
                const stopVideo = () => {
                    track.stop();
                    hideEl(takePhotoBtn);
                    hideEl(videoEl);
                    showEl(startVideoBtn);
                }
                
                const changeCamera = () => {
                    //console.log('active camera: ', selectedCamera);
                    //console.log('changing camera...');
                    //console.log('cameraList.length', camerasList.length);
                    stopVideo();
                    
                    let nextCamera;
                    if (selectedCamera === camerasList.length - 1) {
                        // last camera on the list, go back to index 0
                        nextCamera = 0;
                    } else {
                        nextCamera = selectedCamera + 1;
                    }
                    setSelectedCamera(nextCamera);
                    
                    return;
                }
                
                // if there are several cameras and the change camera btn appears
                // clicking on it will stop the video, change camera and start new wideo
                if (changeCameraBtn) {
                    showEl(changeCameraBtn);
                    changeCameraBtn.addEventListener('click', () => {changeCamera()})
                }

                const takePhoto = async () => {
                    imageCapture.takePhoto().then(function(blob) {
                        console.log('Took photo:', blob);
                        passPhotoBlob(blob);
                        showEl(snappedImg);
                        const photoUrl = URL.createObjectURL(blob);
                        snappedImg.src = photoUrl;
                        stopVideo();
                    }).catch(function(error) {
                    console.log('takePhoto() error: ', error);
                    });
                }

                showEl(videoEl);
                videoEl.srcObject = stream;
                hideEl(startVideoBtn);
                // TO DO: not the best solution to add a listener every time the video is started - many same listenersa at the same time?
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
            {camerasList.length > 1 ? (
                <p className="btn hidden" id="change-camera" >Change camera</p>
            ) : null}
            <div>
            <p className="btn" id="start-video" onClick={() => playVideoFromCamera()}>Start video</p>
            <p className="btn hidden" id="take-photo">Take photo</p>
            </div>
            <div className="video-frame">
                <video id="camera-view" className="hidden" autoPlay playsInline controls={false} />
                <img id="snap" className="hidden" alt="Pic captured from video stream" />
            </div>
        </div>
    );
}

export default Camera;
