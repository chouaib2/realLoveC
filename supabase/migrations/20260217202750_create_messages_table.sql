/*
  # Create messages table for shared notes

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `sender` (text, either 'coumba' or 'Le C')
      - `text` (text, message content)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `messages` table
    - Allow all authenticated and anonymous users to read all messages
    - Allow all to insert messages (no authentication required for shared site)
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender text NOT NULL CHECK (sender IN ('coumba', 'Le C')),
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read messages"
  ON messages
  FOR SELECT
  USING (true);

CREATE POLICY "Allow all to insert messages"
  ON messages
  FOR INSERT
  WITH CHECK (true);
