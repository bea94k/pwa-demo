import React, { useState } from 'react';
import { db } from '../firebase/Firebase';

const AddPost = ({photoBlobUrl}) => {
    const [post, setPost] = useState({
        photo: '',
        title: '',
        location: ''
    });

    const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const addNewPost = (newPost) => {
        console.log(newPost);

        db.collection("posts").add(newPost);

        setPost({
            photo: '',
            title: '',
            location: ''
        })
    }

    return (
        <div>
            <h1>Add your post</h1>
            <p>Photo here</p>
            <p>Photo blob from Home's state: {photoBlobUrl}</p>
            <input onChange={handleInputChange} name="title" type="text" placeholder="Title" value={post.title || ''}/>
            <input onChange={handleInputChange} name="location" type="text" placeholder="Location" value={post.location || ''}/>
            <p className="btn" onClick={() => addNewPost(post)}>ADD</p>
        </div>
    );
}

export default AddPost;
