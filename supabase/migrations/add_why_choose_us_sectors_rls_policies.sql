-- Enable RLS for why_choose_us_sectors
ALTER TABLE why_choose_us_sectors ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public read" ON why_choose_us_sectors;
DROP POLICY IF EXISTS "Allow authenticated insert" ON why_choose_us_sectors;
DROP POLICY IF EXISTS "Allow authenticated update" ON why_choose_us_sectors;
DROP POLICY IF EXISTS "Allow authenticated delete" ON why_choose_us_sectors;
DROP POLICY IF EXISTS "Enable all operations" ON why_choose_us_sectors;

-- Create Public Read Policy
CREATE POLICY "Allow public read" ON why_choose_us_sectors FOR SELECT USING (true);

-- Create Authenticated Write Policies
CREATE POLICY "Allow authenticated insert" ON why_choose_us_sectors FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON why_choose_us_sectors FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON why_choose_us_sectors FOR DELETE USING (auth.role() = 'authenticated');
