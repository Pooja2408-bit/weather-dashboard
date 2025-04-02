import React from 'react';
import { useWeather } from '../context/Weather';
import ErrorMessage from './ErrorMessage';
import InputFields from './InputFields';
import TodayForeCastContainer from './TodayForeCastContainer';
import Footer from './Footer';

const Card = () => {
  const weather = useWeather();
  let data = weather?.data;
  console.log("Data", data);
  let name = data?.city?.name || '';

  // Function to get the day (Monday, Tuesday, etc.)
  const getDay = (datetime) => {
    const date = new Date(datetime);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  // Function to get the date (2nd October, etc.)
  const getDate = (datetime) => {
    const date = new Date(datetime);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  // Group forecasts by day
  const dailyForecasts = data && Array.isArray(data.list) && data.list.length > 0
    ? data.list.reduce((acc, forecast) => {
      const date = getDate(forecast.dt_txt); // Get the formatted date
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    }, {})
    : {};

  // 5 days forecast
  const nextDaysForecast = Object.keys(dailyForecasts).slice(1, 6);

  // Function to calculate min and max temp for a day
  const calculateMinMaxTemp = (forecasts) => {
    const temps = forecasts.map(forecast => forecast.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    return { minTemp, maxTemp };
  };

  return (
    <>
      {data && Array.isArray(data.list) && data.list.length > 0 ? (
        <div className="forecast-table">
          <div className="container">
            <div className="forecast-container">

              <TodayForeCastContainer />

              {/* Display the next 5 days' forecasts */}
              {nextDaysForecast.map((day, index) => {
                const forecasts = dailyForecasts[day];
                const { minTemp, maxTemp } = calculateMinMaxTemp(forecasts); 
                const forecast = forecasts[1]; 

                return (
                  <div className="forecast" key={index}>
                    <div className="forecast-header">
                      <div className="day">{getDay(forecast.dt_txt)}</div>
                    </div>
                    {/* Forecast content */}
                    <div className="forecast-content">
                      <div className="forecast-icon">
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="" width='48' />
                      </div>
                      <div>{forecast.weather[0].main}</div>
                      <span>
                        <img src="assets/images/icon-wind.png" alt="Wind icon" style={{ marginRight: '10px' }} />
                        {Math.round(forecast.wind.gust)} km/h
                      </span>
                      <div className="degree">
                        {Math.round(maxTemp)}<sup>o</sup>C {/* Display Max Temp */}
                      </div>
                      <span>{Math.round(minTemp)}<sup>o</sup>C</span> {/* Display Min Temp */}
                      <div className='mt-2'>
                        <span>
                         <img src="assets/images/icons/thermometer (1).png" alt="Pressure icon" width='30' />
                          <small>{Math.round(forecast.main.pressure)}</small>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="forecast-table">
          <div className="container">
            <div className="forecast-container" style={{ minHeight: '100px', textAlign: 'center', paddingTop: '40px' }}>
              <ErrorMessage />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
    </>
  );
};

export default Card;
