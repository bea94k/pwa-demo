import React, { useState, useEffect } from 'react';

const Camera = () => {
    const [camerasList, setCamerasList] = useState([]);

    useEffect(() => {
        saveCamerasList();
    }, []);

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

    const printCameras = () => {
        console.log('Cameras from state: ', camerasList);
        return;
    }


    return (
        <div>
            <h1>CAMERA</h1>
            <p className="btn" onClick={() => printCameras()}>Console.log cameras from state</p>
        </div>
    );
}

export default Camera;
