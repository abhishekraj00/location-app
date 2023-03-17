import { useContext, useEffect, useState } from "react";
import { LocationsContext } from "../../App";
import PrevLocations from "../../components/PrevLocations";
import useGeolocation from "../../hooks/useGeolocation";
import "./Home.css";

export interface LocationData {
  location_name: string;
  time: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const location = useGeolocation();
  const { locations, setLocations } = useContext(LocationsContext);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null
  );
  const MAX_LOCATIONS = 30;

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location?.lat}+${location?.lng}&key=813b9891c2474af5ac83956ff1f14fca`
        );
        const data = await response.json();
        const newLocation = {
          location_name: data.results[0].formatted,
          time: new Date().toLocaleString(),
          latitude: 3,
          longitude: 4,
        };
        setCurrentLocation(newLocation);
      } catch (error) {
        console.error(error);
      }
    };

    if (location?.lat && locations.length < MAX_LOCATIONS) {
      fetchLocationData();
    }
  }, [location, locations]);

  useEffect(() => {
    const INTERVAL_DURATION = 1000;

    if (currentLocation) {
      const intervalId = setInterval(async () => {
        setLocations((prevLocations) => {
          if (!prevLocations) {
            return [currentLocation];
          } else if (prevLocations.length < MAX_LOCATIONS) {
            return [...prevLocations, currentLocation];
          } else {
            return prevLocations;
          }
        });

        await fetch("https://httpstat.us/200", {
          method: "POST",
          body: JSON.stringify(currentLocation),
        });
      }, INTERVAL_DURATION);

      return () => clearInterval(intervalId);
    }
  }, [currentLocation, setLocations]);

  if (!currentLocation) {
    return <div>Loading...</div>;
  }

  const { location_name, time } = currentLocation;

  return (
    <div className="home-container">
      <h1 data-testid="list-current-item">Welcome to the Location Tracker!</h1>
      <label htmlFor="currentLocation" data-testid="list-current-label"></label>
      <p data-testid="list-current-name">
        Your current location is: <strong>{location_name}</strong>
      </p>
      <p data-testid="list-current-time">As of: {time}</p>
      <PrevLocations />
    </div>
  );
};

export default Home;
