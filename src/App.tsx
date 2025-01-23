import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { WeatherDisplay } from './components/WeatherDisplay';
import { WeatherHistory } from './components/WeatherHistory';
import { InfoModal } from './components/InfoModal';
import { supabase } from './lib/supabase';
import type { WeatherData, WeatherRecord } from './types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [records, setRecords] = useState<WeatherRecord[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<WeatherRecord | null>(null);

  useEffect(() => {
    fetchWeatherRecords();
  }, []);

  const fetchWeatherRecords = async () => {
    const { data, error } = await supabase
      .from('weather_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch weather records');
      return;
    }

    setRecords(data);
  };

  const fetchWeather = async (searchLocation: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      const data = await response.json();

      if (data.cod === '404') {
        toast.error('Location not found');
        return null;
      }

      return data;
    } catch (error) {
      toast.error('Failed to fetch weather data');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const weatherData = await fetchWeather(location);
    if (!weatherData) return;

    setWeather(weatherData);

    if (startDate && endDate) {
      const { error } = await supabase.from('weather_records').insert({
        location,
        start_date: startDate,
        end_date: endDate,
        temperature: weatherData.main.temp,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon,
        },
      });

      if (error) {
        toast.error('Failed to save weather record');
        return;
      }

      toast.success('Weather record saved');
      fetchWeatherRecords();
    }
  };

  const handleEdit = async (record: WeatherRecord) => {
    setEditingRecord(record);
    setLocation(record.location);
    setStartDate(record.start_date);
    setEndDate(record.end_date);
  };

  const handleUpdate = async () => {
    if (!editingRecord) return;

    const { error } = await supabase
      .from('weather_records')
      .update({
        location,
        start_date: startDate,
        end_date: endDate,
      })
      .eq('id', editingRecord.id);

    if (error) {
      toast.error('Failed to update weather record');
      return;
    }

    toast.success('Weather record updated');
    setEditingRecord(null);
    setLocation('');
    setStartDate('');
    setEndDate('');
    fetchWeatherRecords();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('weather_records')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete weather record');
      return;
    }

    toast.success('Weather record deleted');
    fetchWeatherRecords();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Weather App</h1>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city name"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {editingRecord ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingRecord(null);
                    setLocation('');
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Update Record
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Get Weather
              </button>
            )}
          </div>
        </form>

        {weather && <WeatherDisplay weather={weather} />}
        <WeatherHistory records={records} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
}

export default App;