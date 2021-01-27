import React,{useState} from 'react';
import "./AddOns.css";

const AddOns =()=> {
    const [title,setTitle]= useState("");
    const [locationDetails, setLocationDetails] = useState(null)

    const onSuccess = ()=>{
        const url = "https://api.ipify.org/?format=json"
        fetch(url)
        .then(response =>response.json())
        .then(({ip}) => {
        fetch(`http://api.ipstack.com/${ip}?access_key=aa858b8e27dd9459fe5e3d8eaff031f9&format=1`)
        .then(response =>response.json())
        .then(data => setLocationDetails(data))
     });
 }


    const onError = (error)=>{
        setLocationDetails({
            error
        })
    }
    const getLocation = ()=> {
        if(!("geolocation" in navigator)){
            onError({
                 code:0,
                 message:'Geolocation is not supported by your browser'
            }) 
        }
         navigator.geolocation.getCurrentPosition(onSuccess,onError); 
    }
        

    const handleSubmit=(e)=>{
   e.preventDefault();
        alert("Sumbitted: " + title + " " + `${locationDetails.city},${locationDetails.country_name}` )
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
           <div>
          <label onClick={getLocation}>
           Add Location:
           </label>
          
          {locationDetails && 
          <p>{`${locationDetails.city},${locationDetails.country_name}`}</p>}
        
           </div>
           </div>
           <button>Add</button>
        </form>
        </div>
    )
}

export default AddOns;
