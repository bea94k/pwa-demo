import React, { useState } from 'react';

const AddPost = () => {
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
    }

    return (
        <div>
            <h1>Add your post</h1>
            <p>Photo here</p>
            <input onChange={handleInputChange} name="title" type="text" placeholder="Title" />
            <input onChange={handleInputChange} name="location" type="text" placeholder="Location" />
            <p className="btn" onClick={() => addNewPost(post)}>ADD</p>
        </div>
    );
}

export default AddPost;
