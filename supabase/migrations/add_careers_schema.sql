CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position_name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    responsibilities TEXT,
    requirements TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID REFERENCES careers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    resume_url TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public to view active careers" ON careers FOR SELECT USING (status = 'Active');
CREATE POLICY "Allow admins to manage careers" ON careers FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public to insert job applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admins to manage applications" ON job_applications FOR ALL USING (true) WITH CHECK (true);

-- Create bucket for resumes (assuming private bucket)
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false) ON CONFLICT DO NOTHING;

-- Bucket policies
CREATE POLICY "Allow public uploads to resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Allow admins to manage resumes" ON storage.objects FOR ALL USING (bucket_id = 'resumes') WITH CHECK (bucket_id = 'resumes');

-- Grant API Access
GRANT ALL ON TABLE public.careers TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.job_applications TO anon, authenticated, service_role;

-- Reload Schema Cache
NOTIFY pgrst, 'reload schema';
