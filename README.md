# Weather App with CRUD Operations

A comprehensive weather application that allows users to:
- Check current weather for any location
- Save weather records with date ranges
- View historical weather records
- Update and delete saved records

## Features

- Real-time weather data using OpenWeatherMap API
- Data persistence using Supabase
- Full CRUD operations for weather records
- Beautiful UI with Tailwind CSS
- Responsive design
- Toast notifications for user feedback
- Info modal with developer details and PM Accelerator information

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Supabase
- OpenWeatherMap API
- date-fns
- react-hot-toast
- Lucide React icons

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

The application uses Supabase as the database. The necessary table and policies are created automatically through the migration file in `supabase/migrations/create_weather_records.sql`.

## Features Implemented

1. Weather Search
   - Users can search for weather by city name
   - Displays current temperature, feels like, humidity, wind speed, and pressure
   - Shows weather icon and description

2. Weather Records
   - Save weather data with date ranges
   - View all saved records in a table
   - Edit existing records
   - Delete records

3. User Interface
   - Clean and modern design
   - Responsive layout
   - Toast notifications for user feedback
   - Info modal with developer and company information

4. Data Validation
   - Location validation through OpenWeatherMap API
   - Date range validation
   - Error handling for API calls and database operations

## Developer

Hritik Kumar

## Company Information

Product Manager Accelerator - Visit our [LinkedIn page](https://www.linkedin.com/company/product-manager-accelerator) for more information.