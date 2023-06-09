import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home, { LocationData } from "./pages/Home";
import { createContext, useState } from "react";
import MapDisplay from "./pages/MapDisplay";

interface HomeProp {
  locations: LocationData[] | [];
  setLocations: React.Dispatch<React.SetStateAction<LocationData[] | []>>;
}

export const LocationsContext = createContext<HomeProp>({
  locations: [],
  setLocations: () => null,
});

function App() {
  const [locations, setLocations] = useState<LocationData[] | []>([]);
  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapDisplay />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LocationsContext.Provider>
  );
}

export default App;
