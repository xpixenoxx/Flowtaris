-- ==========================================
-- INTEGRATIONS REGISTRY & CONTENT TABLES
-- ==========================================

-- Parent integrations registry
CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    svg_slot_1 TEXT,
    svg_slot_2 TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero Section
CREATE TABLE IF NOT EXISTS integrations_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security Precision Area Main
CREATE TABLE IF NOT EXISTS integrations_security_precision_main (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security Precision Area Cards
CREATE TABLE IF NOT EXISTS integrations_security_precision_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    svg TEXT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Execution Trace Area
CREATE TABLE IF NOT EXISTS integrations_execution_trace (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    description TEXT,
    card_title TEXT,
    code_snippet TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for now so the admin panel can write to them
ALTER TABLE integrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE integrations_hero DISABLE ROW LEVEL SECURITY;
ALTER TABLE integrations_security_precision_main DISABLE ROW LEVEL SECURITY;
ALTER TABLE integrations_security_precision_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE integrations_execution_trace DISABLE ROW LEVEL SECURITY;

-- Reload the schema cache
NOTIFY pgrst, 'reload schema';
