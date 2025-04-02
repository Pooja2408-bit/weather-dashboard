import { createContext, useContext, useState, useEffect } from "react";
import { getWeatherDataForCity, getWeatherDataForCoordinates } from "../api/apiData";

const WeatherContext = createContext(null);

export const useWeather = () => {
    return useContext(WeatherContext);
}

export const WeatherProvider = (props) => {
    const [data, setData] = useState(null);
    const [searchCity, setSearchCity] = useState(null);
    const [searchCoordinates, setSearchCoordinates] = useState(null);
    console.log("S.c", searchCoordinates);

    const fetchData = async () => {
        let response;
        if (searchCity) {
            response = await getWeatherDataForCity(searchCity);
        } else if (searchCoordinates) {
            const { lat, lng } = searchCoordinates;
            response = await getWeatherDataForCoordinates(lat, lng);
            
            console.log("Response", response);
        } else {
            throw new Error("No search parameters provided");
        }
        setData(response);
    };

    // Use useEffect to fetch data whenever searchCoordinates changes
    useEffect(() => {
        if (searchCoordinates) {
            fetchData();
        }
    }, [searchCoordinates]);
    const [myLocation, setMyLocation] = useState(null);
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setSearchCoordinates({ lat: latitude, lng: longitude });
                        setMyLocation({ lat: latitude, lng: longitude })
                        console.log(position.coords);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        // You might want to set a default location here
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                // Set a default location here if needed
            }
        };

        getUserLocation();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <WeatherContext.Provider value={{ searchCity, data, setSearchCity, setSearchCoordinates,fetchData,searchCoordinates,setMyLocation }}>
            {props.children}
        </WeatherContext.Provider>
    );
};
