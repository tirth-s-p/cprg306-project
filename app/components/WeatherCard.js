export default function WeatherCard({ weather }) {
    const { name, main, weather: weatherDetails } = weather;
  
    return (
      <div className="max-w-md mx-auto bg-blue-100 p-5 rounded shadow-md mt-5">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p>{weatherDetails[0].description}</p>
        <p className="text-3xl font-semibold">{Math.round(main.temp)}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} km/h</p>
      </div>
    );
  }
  