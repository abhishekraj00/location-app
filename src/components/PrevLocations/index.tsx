import React, { useContext } from "react";
import { LocationsContext } from "../../App";
import "./PrevLocation.css";

const PrevLocations = () => {
  const { locations, setLocations } = useContext(LocationsContext);

  const handleDelete = (index: number): void => {
    if (locations) {
      const updatedLocations = locations.filter((_, i) => i !== index);
      setLocations(updatedLocations);
    }
  };
  const deleteAllLocations = () => {
    setLocations([]);
  };

  return (
    <div className={"previous-location-box"}>
      <h5 className="prev-location">Prev Location</h5>
      <button
        className="btn-clear"
        onClick={deleteAllLocations}
        data-testid={`list-clear-all-button`}
      >
        Clear Previous Location
      </button>
      {locations &&
        locations.map(({ location_name, time }, i) => {
          return (
            <div
              className="center-row"
              key={`${location_name}-${time + Math.random() * 1000}`}
            >
              <p>{i + 1}</p>
              <div className="location-box">
                <p data-testid={`List-previous-name-${i}`}>{location_name}</p>
                <p data-testid={`list-previous-time-${i}`}>{time}</p>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(i)}
                data-testid={`list-previous
                remove-${i}`}
              >
                Remove
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PrevLocations;
