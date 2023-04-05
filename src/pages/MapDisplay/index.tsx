import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationsContext } from "../../App";
import "./mapDispaly.css";
import Leaflet from "leaflet";
import useGeolocation from "../../hooks/useGeolocation";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapDisplay() {
  const { locations } = useContext(LocationsContext);
  const location = useGeolocation();

  if (!location) {
    return <div>Map Loading...</div>;
  }
  return (
    <div className="map-container">
      <MapContainer center={[location.lat, location.lng]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=tjWg9HzmJmtJeqx9y58M"
        />
        {!locations?.[0] && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>Your current Location</Popup>
          </Marker>
        )}

        {locations.map((location, index) => {
          console.log(`location ${index}:`, location);
          return (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                This is {location.location_name} located at ({location.latitude}
                ,{location.longitude})
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapDisplay;
