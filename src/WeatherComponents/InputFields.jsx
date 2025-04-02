import React from 'react';
import Button from './Button';
import { useWeather } from '../context/Weather';


const InputFields = () => {
  const weather = useWeather();
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      weather.fetchData();
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    weather.fetchData();
  }
  return (
    <>
      <form action="#" className="find-location" onSubmit={handleSubmit}>
        <input type="text" placeholder="Find your location..." value={weather.searchCity || ''} onChange={(e) => weather.setSearchCity(e.target.value)} onKeyDown={handleEnterPress} className='locationInput' />
        <input type="submit" value="Find" onClick={weather.fetchData} />
      </form>
    </>
  )
}

export default InputFields
