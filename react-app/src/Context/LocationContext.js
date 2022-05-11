import { createContext, useContext, useState } from "react";

export const LocationContext = createContext();
export const useUserLocation = () => useContext(LocationContext);

export default function LocationProvider(props) {
    const [userLocation, setUserLocation] = useState('');

    return (
        <LocationContext.Provider value={{ userLocation, setUserLocation }}>
            {props.children}
        </LocationContext.Provider>
    )
};
