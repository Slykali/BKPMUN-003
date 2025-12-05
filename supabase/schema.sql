-- ============================================
-- BKPMUN Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TEACHERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  photo_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- COMMITTEES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS committees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(10) DEFAULT '🌍',
  members_count VARCHAR(50) DEFAULT 'customizable',
  status VARCHAR(100) DEFAULT 'customizable',
  topics TEXT[] DEFAULT ARRAY[]::TEXT[],
  schedule_time VARCHAR(100) DEFAULT '',
  schedule_location VARCHAR(255) DEFAULT '',
  schedule_day VARCHAR(100) DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- STUDY GUIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS study_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('security', 'economic', 'environmental', 'human-rights')),
  level VARCHAR(20) DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  duration VARCHAR(50) DEFAULT 'customizable',
  pages VARCHAR(50) DEFAULT 'customizable',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  content TEXT DEFAULT '',
  file_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- SCHEDULE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- SCHEDULE EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS schedule_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  event_time VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  location VARCHAR(255) DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'announcement' CHECK (type IN ('save-date', 'announcement', 'info')),
  date VARCHAR(100) DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_teachers_order ON teachers(display_order);
CREATE INDEX IF NOT EXISTS idx_committees_name ON committees(name);
CREATE INDEX IF NOT EXISTS idx_study_guides_category ON study_guides(category);
CREATE INDEX IF NOT EXISTS idx_study_guides_search ON study_guides USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_schedule_events_schedule ON schedule_events(schedule_id);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, priority DESC);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_committees_updated_at
  BEFORE UPDATE ON committees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_guides_updated_at
  BEFORE UPDATE ON study_guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at
  BEFORE UPDATE ON schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedule_events_updated_at
  BEFORE UPDATE ON schedule_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can read)
CREATE POLICY "Public read access for teachers" ON teachers
  FOR SELECT USING (true);

CREATE POLICY "Public read access for committees" ON committees
  FOR SELECT USING (true);

CREATE POLICY "Public read access for study_guides" ON study_guides
  FOR SELECT USING (true);

CREATE POLICY "Public read access for schedules" ON schedules
  FOR SELECT USING (true);

CREATE POLICY "Public read access for schedule_events" ON schedule_events
  FOR SELECT USING (true);

CREATE POLICY "Public read access for announcements" ON announcements
  FOR SELECT USING (true);

-- Admin write access (you'll need to set up authentication)
-- For now, we'll allow authenticated users to write
-- You can modify these policies based on your auth setup

-- ============================================
-- SAMPLE DATA (Optional - remove if not needed)
-- ============================================

-- Insert sample announcement
INSERT INTO announcements (title, content, type, date, is_active, priority)
VALUES (
  'Save the Date!',
  'Mark your calendars for BKPMUN!',
  'save-date',
  'customizable',
  true,
  10
) ON CONFLICT DO NOTHING;

-- ============================================
-- VIEWS FOR EASY QUERIES
-- ============================================

-- View for active announcements ordered by priority
CREATE OR REPLACE VIEW active_announcements AS
SELECT * FROM announcements
WHERE is_active = true
ORDER BY priority DESC, created_at DESC;

-- View for schedules with events
CREATE OR REPLACE VIEW schedules_with_events AS
SELECT 
  s.id,
  s.day,
  json_agg(
    json_build_object(
      'id', se.id,
      'time', se.event_time,
      'title', se.title,
      'description', se.description,
      'location', se.location,
      'order', se.display_order
    ) ORDER BY se.display_order
  ) as events
FROM schedules s
LEFT JOIN schedule_events se ON s.id = se.schedule_id
GROUP BY s.id, s.day
ORDER BY s.day;

-- ============================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- ============================================

-- Function to get study guides by category with search
CREATE OR REPLACE FUNCTION get_study_guides(
  p_category VARCHAR DEFAULT NULL,
  p_search VARCHAR DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  description TEXT,
  category VARCHAR,
  level VARCHAR,
  duration VARCHAR,
  pages VARCHAR,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sg.id,
    sg.title,
    sg.description,
    sg.category,
    sg.level,
    sg.duration,
    sg.pages,
    sg.tags,
    sg.created_at
  FROM study_guides sg
  WHERE 
    (p_category IS NULL OR sg.category = p_category)
    AND (
      p_search IS NULL OR
      sg.title ILIKE '%' || p_search || '%' OR
      sg.description ILIKE '%' || p_search || '%'
    )
  ORDER BY sg.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GRANT PERMISSIONS (Adjust based on your needs)
-- ============================================

-- Grant access to authenticated users (adjust role as needed)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

