"use client";

import { useState, useEffect } from "react";
import MainNavbar from "./components/MainNavbar";
import SecondaryNavbar from "./components/SecondaryNavbar";
import Footer from "./components/Footer";

export default function Home() {
  const [deviceDate, setDeviceDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState("");

  // Helper to get ordinal suffix for day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th–19th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format date only
  const formatDate = (date) => {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  // Update device's local date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceDate(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      if (!res.ok) throw new Error("Unable to fetch weather data.");
      const data = await res.json();

      setCurrentWeather({
        city: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        realFeel: data.main.feels_like,
        description: data.weather[0].description,
        windGusts: data.wind.gust || data.wind.speed,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility / 1000, // Convert from meters to km
        cloudCover: data.clouds.all,
        dewPoint: data.main.temp - (100 - data.main.humidity) / 5, // Approximation
        cloudCeiling: "N/A", // Not provided by OpenWeatherMap
        icon: data.weather[0].icon,
        timezone: data.timezone, // Timezone offset in seconds
      });
      setSelectedCity(`${data.name}, ${data.sys.country}`);
      setError("");
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
    }
  };

  // Prompt for location and fetch weather
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Location access denied:", err);
          setError("Location access denied. Please search for a city manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch weather by city name
  const fetchWeatherByCity = async (city) => {
    if (!city) {
      setError("Please enter a valid city name.");
      setCurrentWeather(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      if (!res.ok) throw new Error("City not found.");
      const data = await res.json();

      setCurrentWeather({
        city: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        realFeel: data.main.feels_like,
        description: data.weather[0].description,
        windGusts: data.wind.gust || data.wind.speed,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility / 1000, // Convert from meters to km
        cloudCover: data.clouds.all,
        dewPoint: data.main.temp - (100 - data.main.humidity) / 5, // Approximation
        cloudCeiling: "N/A", // Not provided by OpenWeatherMap
        icon: data.weather[0].icon,
        timezone: data.timezone, // Timezone offset in seconds
      });
      setSelectedCity(`${data.name}, ${data.sys.country}`);
      setError("");
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
    }
  };

  const handleCitySearch = (city) => {
    setSelectedCity(city);
    fetchWeatherByCity(city);
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Main Navigation */}
      <MainNavbar onSearch={handleCitySearch} />
      <SecondaryNavbar />

      {/* Main Content */}
      <div className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to WeatherWise</h1>
        <p className="text-lg">
          Get accurate weather forecasts for Today: {deviceDate}
        </p>
        <p className="text-xl mt-4">
          {selectedCity ? (
            <>Showing weather information for: <strong>{selectedCity}</strong></>
          ) : (
            <>Search for a city to view weather information.</>
          )}
        </p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {currentWeather && (
          <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Current Weather</h2>
              <p className="text-sm text-gray-600">
                {formatDate(new Date(new Date().getTime() + currentWeather.timezone * 1000))} (Local Time)
              </p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                  alt={currentWeather.description}
                  className="w-24 h-24"
                />
                <p className="text-6xl font-bold">{Math.round(currentWeather.temperature)}°C</p>
              </div>
              <div>
                <p className="text-xl font-bold text-right">
                  RealFeel® {Math.round(currentWeather.realFeel)}°C
                </p>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-700 capitalize text-center mb-6">
              {currentWeather.description}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Wind Gusts:</strong> {currentWeather.windGusts} km/h
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Humidity:</strong> {currentWeather.humidity}%
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Dew Point:</strong> {currentWeather.dewPoint.toFixed(1)}°C
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Pressure:</strong> {currentWeather.pressure} mb
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Cloud Cover:</strong> {currentWeather.cloudCover}%
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Visibility:</strong> {currentWeather.visibility.toFixed(1)} km
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
