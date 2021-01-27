import React from 'react';

const AddPost = () => {
    return (
        <div>
            <h1>Add your post</h1>
            <p>Photo here</p>
            <input onChange={() => {console.log('tadaaa')}} name="title" type="text" placeholder="Title" />
            <input onChange={() => {console.log('tadaaammmm')}} name="location" type="text" placeholder="Location" />
            <p className="btn">ADD</p>
        </div>
    );
}

export default AddPost;
