/*
  # Create Weather Records Table

  1. New Tables
    - `weather_records`
      - `id` (uuid, primary key)
      - `location` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `temperature` (numeric)
      - `coordinates` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `weather_records` table
    - Add policies for all users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS weather_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  temperature numeric NOT NULL,
  coordinates jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE weather_records ENABLE ROW LEVEL SECURITY;

-- Allow all users to read weather records
CREATE POLICY "Anyone can read weather records"
  ON weather_records
  FOR SELECT
  TO public
  USING (true);

-- Allow all users to insert weather records
CREATE POLICY "Anyone can insert weather records"
  ON weather_records
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow all users to update weather records
CREATE POLICY "Anyone can update weather records"
  ON weather_records
  FOR UPDATE
  TO public
  USING (true);

-- Allow all users to delete weather records
CREATE POLICY "Anyone can delete weather records"
  ON weather_records
  FOR DELETE
  TO public
  USING (true);