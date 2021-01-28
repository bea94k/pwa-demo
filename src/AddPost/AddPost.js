import React, { useState } from 'react';
import AddOns from "../AddOns/AddOns";
import { db, storageRef } from '../firebase/Firebase';

import "./AddPost.css";

const AddPost = ({photoBlob, passPhotoBlob, togglePhotoAccepted}) => {
    const [post, setPost] = useState({
        photo: '',
        title: '',
        location: ''
    });

   /*  const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    } */

    const handlePostChange = (key, value) => {
        setPost({
            ...post,
            [key]: value
        });
    };

    const addNewPost = (newPost) => {
        const blobUrl = URL.createObjectURL(photoBlob)
        // temporarily measure: the random string from blob url is assigned as the name of the photo file
        const newBlobName = blobUrl.slice(blobUrl.length - 36);

        // if names of the files repeat, the old one in Storage is overwritten!

        const uploadTask = storageRef.child(`images/${newBlobName}.jpg`).put(photoBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log('Something went wrong when uploading the photo: ', error)
            }, 
            () => {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then((photoUrl) => {
                    db.collection("posts").add({
                        photo: photoUrl,
                        title: newPost.title,
                        location: newPost.location
                    });
                }).then (() => {
                    console.log('New post added to Firestore.')
                    setPost({
                        photo: '',
                        title: '',
                        location: ''
                    });
                    passPhotoBlob(null);
                    togglePhotoAccepted();
                }).catch((err) => {
                    console.log('Something went wrong when saving the post to Firestore: ', err)
                });
            }
        );
    }

    return (
        <div>
            <h1>Add your post</h1>
            <div className="post-frame">
            {photoBlob ? (
                    <img id="photo-preview" src={URL.createObjectURL(photoBlob)} alt="Snapshot taken by the in-app camera" />
                    ) : null}
            {/* <input onChange={handleInputChange} name="title" type="text" placeholder="Title" value={post.title || ''}/>
            <input onChange={handleInputChange} name="location" type="text" placeholder="Location" value={post.location || ''}/> */}
            <AddOns handlePostChange={handlePostChange} title={post.title} />
            </div>
            <p className="btn" onClick={() => addNewPost(post)}>ADD</p>
        </div>
    );
}

export default AddPost;
