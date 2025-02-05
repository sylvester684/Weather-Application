import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try again!');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={fetchWeather} disabled={!city.trim()}>
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="temp">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p>{Math.round(weatherData.main.temp)}°C</p>
          </div>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
