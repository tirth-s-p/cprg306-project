export default function ForecastCard({ forecast }) {
    const { dt_txt, main, weather } = forecast;
  
    return (
      <div className="p-4 bg-gray-100 rounded shadow-md text-center">
        <p className="font-bold">{new Date(dt_txt).toLocaleDateString()}</p>
        <p>{weather[0].description}</p>
        <p className="text-xl">{Math.round(main.temp)}°C</p>
      </div>
    );
  }
  