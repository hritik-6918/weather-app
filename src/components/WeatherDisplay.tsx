import React from 'react';
import { Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherDisplayProps {
  weather: WeatherData;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
        <div className="flex items-center justify-center mt-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
        </div>
        <p className="text-4xl font-bold text-gray-900 mt-2">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <ThermometerSun className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">{weather.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold">{weather.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="font-semibold">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}