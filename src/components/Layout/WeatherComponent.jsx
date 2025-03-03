import { useEffect, useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog, WiThunderstorm } from "react-icons/wi";

const WeatherComponent = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "35297dbb59df5a87ca39a6966dae13ea"; // Replace with your API key

  useEffect(() => {
    if (!capital) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [capital]);

  if (!weather) return <p className="text-gray-500">Loading weather...</p>;

  // Weather condition mapping to icons
  const getWeatherIcon = (condition) => {
    if (condition.includes("clear")) return <WiDaySunny className="text-yellow-500 text-6xl" />;
    if (condition.includes("cloud")) return <WiCloud className="text-gray-500 text-6xl" />;
    if (condition.includes("rain")) return <WiRain className="text-blue-500 text-6xl" />;
    if (condition.includes("snow")) return <WiSnow className="text-blue-300 text-6xl" />;
    if (condition.includes("fog")) return <WiFog className="text-gray-400 text-6xl" />;
    if (condition.includes("thunderstorm")) return <WiThunderstorm className="text-purple-500 text-6xl" />;
    return <WiDaySunny className="text-yellow-500 text-6xl" />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
      <h2 className="text-xl font-semibold">{weather.name} Weather</h2>
      <div className="flex justify-center my-2">{getWeatherIcon(weather.weather[0].description)}</div>
      <p className="text-lg">🌡️ {weather.main.temp}°C</p>
      <p className="text-gray-600">{weather.weather[0].description.toUpperCase()}</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>🌍 Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherComponent;
