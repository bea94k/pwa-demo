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
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_dp3P6TrdEe8sOITMucPTvxr0675es&ipAddress=${ip}`)
            .then(response =>response.json())
            .then(data => {
                console.log('location data: ', data.location)
                setLocationDetails(data.location);
                handlePostChange('location', `${data.location.city}, ${data.location.country}`)
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
           <div className="input-wrapper">
           <label>
            Title:
           </label>
            <textarea value = {title} onChange={handleTitleChange}/>
            </div>
           
          
          {locationDetails ? (
              locationDetails === 'unknown' ? (
                <p>Location access denied.</p>
              ) : (
                  <>
                  <h4>{`Your location: ${locationDetails.city}, ${locationDetails.country}`}</h4>
                  <h4>{`Your lat/lgt: ${locationDetails.lat}, ${locationDetails.lng}`}</h4>
                  </>
              )
          ) : (
              <p>Trying to get your location...</p>
          )}
        
           
           </div>
        </div>
    )
}

export default AddOns;
