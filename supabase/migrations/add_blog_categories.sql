CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_category_relations (
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_id, category_id)
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_category_relations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on blog_categories" ON blog_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on blog_category_relations" ON blog_category_relations FOR ALL USING (true) WITH CHECK (true);

GRANT ALL ON TABLE public.blog_categories TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.blog_category_relations TO anon, authenticated, service_role;

-- Insert default categories to match current UI
INSERT INTO blog_categories (name) VALUES 
('Engineering'), 
('Architecture'), 
('Strategy'), 
('Security & Compliance')
ON CONFLICT (name) DO NOTHING;
