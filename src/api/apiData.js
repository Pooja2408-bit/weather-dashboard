import axios from 'axios';
const API_KEY = 'a8e41b3023d547e336e230b5eeacaed4';
const city = 'London'; // Change to your desired city
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?`;

// const baseUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=a8e41b3023d547e336e230b5eeacaed4";

export const getWeatherDataForCity = async (city, country) => {
  try {
    const response = await axios.get(`${baseUrl}q=${city}&appid=${API_KEY}&units=metric`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return error.response ? error.response.data : { error: "Failed to fetch data" };
  }
};
export const getWeatherDataForCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(`${baseUrl}lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    return error.response ? error.response.data : { error: "Failed to fetch data" };
  }
};

// AIzaSyBQAPAJwXuYZGF7Fgx_9yZM2JId0zLoS7k