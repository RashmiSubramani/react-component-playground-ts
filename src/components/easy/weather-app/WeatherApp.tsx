/*
  WEATHER APP (Fetch + Loading/Error States)
  --------------------------------------------
  Difficulty: Easy
  Concepts: typed API response (WeatherData),
            async/await with try/catch/finally,
            catch block error typing (unknown → instanceof Error),
            useState<WeatherData | null> for nullable API result,
            loading + error state pattern

  Uses OpenWeatherMap API — requires an API key.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

// Subset of the OpenWeatherMap /weather response shape
type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
};

// ─── API helper ───────────────────────────────────────────────────

const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city: string): Promise<WeatherData> {
  if (!city) throw new Error("City is required");

  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json() as Promise<WeatherData>;
}

// ─── Component ────────────────────────────────────────────────────

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ChangeEvent<HTMLInputElement> — typed event from the city input
  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  async function handleSearch() {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err: unknown) {
      // catch receives unknown — narrow with instanceof
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wa-container">
      <h1>Weather App</h1>

      {/* Search */}
      <div className="wa-search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="wa-input"
        />
        <button className="wa-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="wa-error">{error}</p>}

      {/* Weather Data */}
      {weather && (
        <div className="wa-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
