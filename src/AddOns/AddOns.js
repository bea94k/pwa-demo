import React,{useState} from 'react';
import "./AddOns.css";

const Title =()=> {
    const [title,setTitle]= useState("")

    const handleSubmit=(e)=>{
   e.preventDefault();
        alert("Sumbitted: " + title)
    }

    const handleTitleChange = (e)=> {
        setTitle(e.target.value)
    }
    return (
        <div>
        <form onSubmit= {handleSubmit}>
        <div className="add-wrapper">
        <label>
           Title:
           </label>
           <div>
           <input type="text" value = {title} onChange={handleTitleChange}/>
           </div>
           <label>
           Add Location:
           </label>
           <div>
           <input type="text" /> 
           </div>
           </div>
           <button>Add</button>
        </form>
        </div>
    )
}

export default Title
