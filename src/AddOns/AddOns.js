import React,{useState, useEffect} from 'react';
import "./AddOns.css";

const AddOns = ({handlePostChange, title}) => {
    //const [title,setTitle]= useState("");
    const [locationDetails, setLocationDetails] = useState(null);

    useEffect(() => {
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccess = () => {
        const url = "https://api.ipify.org/?format=json"
        fetch(url)
        .then(response =>response.json())
        .then(({ip}) => {
            fetch(`https://geolocation-db.com/json/09068b10-55fe-11eb-8939-299a0c3ab5e5/${ip}`)
            .then(response =>response.json())
            .then(data => {
                console.log('location data: ', data)
                setLocationDetails(data);
                handlePostChange('location', `${data.city}, ${data.country_name}`)
            })
        });
    }

    const onError = (error) => {
        setLocationDetails(
            'unknown'
        );
        console.log('Something went wrong getting location: ', error)
    }

    const getLocation = () => {
        if(!("geolocation" in navigator)){
            onError({
                 code:0,
                 message:'Geolocation is not supported by your browser'
            }) 
        }
         navigator.geolocation.getCurrentPosition(onSuccess,onError); 
    }
        

    const handleTitleChange = (e) => {
        handlePostChange('title', e.target.value)
    }

    return (
        <div>
        <div className="add-wrapper">
           <label>
            Title:
           </label>
           <div>
            <input type="text" value = {title} onChange={handleTitleChange}/>
           </div>
           <div>
          
          {locationDetails ? (
              locationDetails === 'unknown' ? (
                <p>Location access denied.</p>
              ) : (
                  <p>{`Your location: ${locationDetails.city},${locationDetails.country_name}`}</p>
              )
          ) : (
              <p>Trying to get your location...</p>
          )}
        
           </div>
           </div>
        </div>
    )
}

export default AddOns;
