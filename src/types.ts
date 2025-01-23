export interface WeatherRecord {
  id: string;
  location: string;
  start_date: string;
  end_date: string;
  temperature: number;
  created_at: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}