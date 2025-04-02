import React from 'react';
import { useWeather } from '../context/Weather';

const TodayForeCastContainer = () => {
  const weather = useWeather();
  let data = weather.data;

  // Helper to get day name from datetime
  const getDay = (datetime) => {
    const date = new Date(datetime);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  // Helper to get formatted date (day and month)
  const getDate = (datetime) => {
    const date = new Date(datetime);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  // Helper to calculate min and max temperatures for the day
  const calculateMinMaxTemp = (forecasts) => {
    const temps = forecasts.map(forecast => forecast.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    return { minTemp, maxTemp };
  };

  // Get wind direction from degrees
  const getWindDirection = (degree) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW',
    ];
    const index = Math.floor((degree + 11.25) / 22.5);
    return directions[index % 16];
  };

  // Group forecasts by day
  const dailyForecasts = data && Array.isArray(data.list)
    ? data.list.filter(forecast => getDay(forecast.dt_txt) === getDay(data.list[0].dt_txt))
    : [];

  // Calculate today's min and max temperatures
  const { minTemp, maxTemp } = calculateMinMaxTemp(dailyForecasts);

  return (
    <div className="today forecast">
      <div className="forecast-header">
        <div className="day">{getDay(data.list[0].dt_txt)}</div>
        <div className="date">{getDate(data.list[0].dt_txt)}</div>
      </div>
      {/* Forecast Header End */}
      <div className="forecast-content">
        <div className="location">
          <span>{data.city.name}</span>
          <span>
            <img src="assets/images/icons/low-temperature.png" alt="Low Temp" width="20" />
            {minTemp.toFixed(1)}<sup>o</sup>C
          </span>
          <span>
            <img src="assets/images/icons/thermometer.png" alt="High Temp" width="20" />
            {maxTemp.toFixed(1)}<sup>o</sup>C
          </span>
        </div>

        <div className="degree">
          <div className="num">
            {Math.round(data.list[0].main.temp)}<sup>o</sup>C
          </div>
          <div className="forecast-icon">
            <img
              src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
        </div>

        <div className="sunrise-container">
          <span><img src="assets/images/icons/sunrise.png" alt="High Temp" width="30" /> {new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} A.M</span>
          <span><img src="assets/images/icons/sunset (1).png" alt="High Temp" width="30" />{new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} P.M</span>
          <span style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <img src="assets/images/icons/thermometer (1).png" alt="Pressure icon" width='30' />
                          <small>{Math.round(data.list[0].main.pressure)} hPa</small>
                        </span>
        </div>
        <div className="sunrise-container">
        <span>
          <img src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="Weather Condition" width="50" />
          {data.list[0].weather[0].main}
        </span>
        <span>
          <img src="assets/images/icon-wind.png" alt="Wind" />
          {data.list[0].wind.gust} km/h
        </span>
        <span>
          <img src="assets/images/icon-compass.png" alt="Compass" />
          {getWindDirection(data.list[0].wind.deg)}
        </span>
        </div>
      </div>
    </div>
  );
};

export default TodayForeCastContainer;
