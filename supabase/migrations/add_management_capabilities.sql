CREATE TABLE IF NOT EXISTS public.management_capabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_value TEXT NOT NULL,
    metric_label TEXT NOT NULL,
    counter_value TEXT NOT NULL,
    counter_label TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.management_capabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on management_capabilities" ON public.management_capabilities
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert initial data
INSERT INTO public.management_capabilities (metric_value, metric_label, counter_value, counter_label, display_order)
VALUES 
    ('#1', 'ERP SOFTWARE', '', '', 1),
    ('25+', 'BUSINESS MODULES', '', '', 2),
    ('50+', 'INDUSTRIES SERVED', '', '', 3),
    ('100+', 'SERVICE LOCATIONS', '', '', 4),
    ('5K+', 'ENTERPRISE CUSTOMERS', '', '', 5);
