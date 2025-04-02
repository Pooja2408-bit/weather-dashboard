import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useWeather } from '../context/Weather';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const pressureChartRef = useRef(null);
  const temperatureChartRef = useRef(null); 
  const chartInstanceRef = useRef(null); 
  const pressureInstanceRef = useRef(null); 
  const temperatureInstanceRef = useRef(null); 
  const weather = useWeather();
  const data = weather?.data;

  const labels = [];
  const humidity = [];
  const pressure = [];
  const temperature = [];
  const minTemperatures = [];
  const maxTemperatures = [];

  // Helper functions to format date
  const getDay = (datetime) => {
    const date = new Date(datetime);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  // Function to calculate min and max temp for a day
  const calculateMinMaxTemp = (forecasts) => {
    const temps = forecasts.map(forecast => forecast.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    return { minTemp, maxTemp };
  };

  // Process the weather data
  const dailyForecasts = data && Array.isArray(data.list) && data.list.length > 0
    ? data.list.reduce((acc, forecast) => {
        const day = getDay(forecast.dt_txt); // Get the day of the week
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(forecast);
        return acc;
      }, {})
    : {};

  // Extract labels and data for the next 6 days
  const nextDaysForecast = Object.keys(dailyForecasts).slice(0, 6);
  nextDaysForecast.forEach((day) => {
    const forecasts = dailyForecasts[day];
    if (forecasts) {
      labels.push(day);
      humidity.push(forecasts[0].main.humidity); 
      pressure.push(forecasts[0].main.pressure);

      // Calculate min and max temperatures for the day
      const { minTemp, maxTemp } = calculateMinMaxTemp(forecasts);
      minTemperatures.push(minTemp);
      maxTemperatures.push(maxTemp);
    }
  });

  useEffect(() => {
    // Destroy existing charts to avoid duplicate rendering
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    if (pressureInstanceRef.current) {
      pressureInstanceRef.current.destroy();
    }
    if (temperatureInstanceRef.current) {
      temperatureInstanceRef.current.destroy();
    }

    // Create Humidity Chart
    const ctxHumidity = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctxHumidity, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Humidity (%)',
            data: humidity,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Humidity (%)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Days of the Week',
            },
          },
        },
      },
    });

    // Create Pressure Chart
    const ctxPressure = pressureChartRef.current.getContext('2d');
    pressureInstanceRef.current = new Chart(ctxPressure, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pressure (hPa)',
            data: pressure,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pressure (hPa)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Days of the Week',
            },
          },
        },
      },
    });

    // Create Temperature Chart with Min and Max
    const ctxTemperature = temperatureChartRef.current.getContext('2d');
    temperatureInstanceRef.current = new Chart(ctxTemperature, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Min Temperature (°C)',
            data: minTemperatures,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Max Temperature (°C)',
            data: maxTemperatures,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Days of the Week',
            },
          },
        },
      },
    });

  }, [labels, humidity, pressure, minTemperatures, maxTemperatures]); // Include all dependencies

  return (
    <section className="weeklyCharts" style={{ marginTop: '4rem' }}>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex">
            <h3>Weekly OverViews</h3>
          </div>
          {/* Humidity Chart */}
          <div className="col col-lg-6 col-12">
            <figure className="highcharts-figure humidityChart">
              <div className="humidity">Humidity</div>
              <canvas ref={chartRef} id="humidityChart"></canvas>
            </figure>
          </div>
          {/* Pressure Chart */}
          <div className="col col-lg-6 col-12">
            <figure className="highcharts-figure">
              <div className="pressure">Pressure</div>
              <canvas ref={pressureChartRef} id="pressureChart"></canvas>
            </figure>
          </div>
          {/* Temperature Chart */}
          <div className="col col-12">
            <figure className="highcharts-figure">
              <div className="temperature">Temperature</div>
              <canvas ref={temperatureChartRef} id="temperatureChart"></canvas>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartComponent;
