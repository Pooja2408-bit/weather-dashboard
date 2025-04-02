import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';
import { useWeather } from '../context/Weather';
import Marker from './Marker';
// Marker component to show selected location


const WeatherMap = () => {
  const weather = useWeather();
  const [mapCenter, setMapCenter] = useState({ lat: weather.setMyLocation.lat, lng: weather.setMyLocation.lng }); 
  console.log(mapCenter);
  const [markerPosition, setMarkerPosition] = useState(null); 

  // Update map center when weather data or coordinates change
  useEffect(() => {
    if (weather.data && weather.data.city.coord) {
      const { lat, lon } = weather.data.city.coord; 
      setMapCenter({ lat, lng: lon });
      setMarkerPosition({ lat, lng: lon });
    }
    else if (weather.searchCoordinates) {
      const { lat, lng } = weather.searchCoordinates;
      setMapCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
    }
  }, [weather.data, weather.searchCoordinates]);
  
  // Log markerPosition whenever it changes
  useEffect(() => {
    if (markerPosition) {
      console.log("Updated Marker Position: ", markerPosition);
    }
  }, [markerPosition]);
  
  // Handle map click and update search coordinates
  const handleMapClick = ({ lat, lng }) => {
    weather.setSearchCity(''); // Clear city search input when clicking on the map
    if (lat !== null && lng !== null) {
      weather.setSearchCoordinates({ lat, lng });
      console.log(`Clicked location: Latitude: ${lat}, Longitude: ${lng}`);
    } else {
      console.log("Error getting data");
    }
  };

  return (
    <div style={{ height: '450px', width: '100%',borderRadius: '15px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCrXq0I8bLMmZeGUCY6iVxC5n8H6QfJxt8' }}
        center={mapCenter}
        defaultZoom={10}
        onClick={handleMapClick}
      >
        {markerPosition && (
           <Marker
           lat={markerPosition.lat}
           lng={markerPosition.lng}
           text={weather.data?weather.data.city.name:"Location"}
            // Pass any text or label you want to display
         />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default WeatherMap;
