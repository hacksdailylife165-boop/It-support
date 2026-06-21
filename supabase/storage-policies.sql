-- Storage buckets for ticket attachments and screenshots
-- Run this after creating the buckets in Supabase console

-- Create bucket for ticket attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ticket-attachments', 'ticket-attachments', false, 10485760);

-- Create bucket for resolution screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('resolution-screenshots', 'resolution-screenshots', false, 10485760);

-- RLS policies for ticket attachments bucket
CREATE POLICY "Allow users to upload ticket attachments" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'ticket-attachments');

CREATE POLICY "Allow authenticated users to download attachments" ON storage.objects
  FOR SELECT USING (bucket_id = 'ticket-attachments');

-- RLS policies for resolution screenshots bucket
CREATE POLICY "Allow IT staff to upload screenshots" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resolution-screenshots');

CREATE POLICY "Allow authenticated users to view screenshots" ON storage.objects
  FOR SELECT USING (bucket_id = 'resolution-screenshots');
