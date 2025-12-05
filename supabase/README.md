# Supabase Setup for BKPMUN

## 🚀 Quick Start

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run the SQL Schema**
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy and paste the contents of `schema.sql`
   - Click "Run" to execute

3. **Set Environment Variables**
   - Create a `.env` file in your project root:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **That's it!** Your database is ready.

## 📊 Database Tables

- `teachers` - Teacher/staff information
- `committees` - Committee details
- `study_guides` - Study guide content
- `schedules` - Event schedules
- `schedule_events` - Individual schedule events
- `announcements` - Pop-up announcements

## 🔐 Row Level Security

The schema includes RLS policies that allow:
- ✅ Public read access (anyone can view)
- 🔒 Write access (configure based on your auth needs)

## 📝 Next Steps

1. Update RLS policies if you need authentication
2. Add your actual data
3. Connect your frontend using the Supabase client

