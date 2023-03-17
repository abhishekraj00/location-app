import  { useEffect, useState } from 'react'

interface Location {
   
    lat: number;
    lng: number;
  }

const useGeolocation = () => {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
    
    useEffect(() => {
        const onSuccess = (position:any)=>{
            const { latitude, longitude } = position.coords;            
              const newLocation: Location = {          
                lat: latitude,
                lng: longitude,
              };
              setCurrentLocation(newLocation);
        }
        const onError = (error:any)=>{
            console.log(error);
            
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
        
}, []);
    
    return   currentLocation;
}

export default useGeolocation