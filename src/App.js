import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "f87dc34f3bb7f5eebe285b6977b2d718";

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found. Try again.");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
  <div className="container">
    <h1>Weather Dashboard</h1>
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>

    {loading && <p>Loading...</p>}
    {error && <p className="error">{error}</p>}

    {weather && (
      <div className="weather-card">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p className="description">{weather.weather[0].description}</p>
        <p className="temp">{Math.round(weather.main.temp)}°C</p>
        <div className="details">
          <div className="detail-item">
            <span>Feels like</span>
            <span>{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span>Humidity</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span>Wind</span>
            <span>{weather.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default App;