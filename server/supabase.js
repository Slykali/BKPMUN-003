import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// API functions for Supabase
export const api = {
  // Teachers
  async getTeachers() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    return data
  },

  async createTeacher(teacher) {
    const { data, error } = await supabase
      .from('teachers')
      .insert(teacher)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateTeacher(id, updates) {
    const { data, error } = await supabase
      .from('teachers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteTeacher(id) {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Committees
  async getCommittees() {
    const { data, error } = await supabase
      .from('committees')
      .select('*')
      .order('name', { ascending: true })
    if (error) throw error
    return data
  },

  async createCommittee(committee) {
    const { data, error } = await supabase
      .from('committees')
      .insert(committee)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateCommittee(id, updates) {
    const { data, error } = await supabase
      .from('committees')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteCommittee(id) {
    const { error } = await supabase
      .from('committees')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Study Guides
  async getStudyGuides(category = null, search = null) {
    let query = supabase
      .from('study_guides')
      .select('*')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createStudyGuide(guide) {
    const { data, error } = await supabase
      .from('study_guides')
      .insert(guide)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateStudyGuide(id, updates) {
    const { data, error } = await supabase
      .from('study_guides')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteStudyGuide(id) {
    const { error } = await supabase
      .from('study_guides')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Schedules
  async getSchedules() {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        schedule_events (*)
      `)
      .order('day', { ascending: true })
    if (error) throw error
    return data
  },

  async createSchedule(schedule) {
    const { data, error } = await supabase
      .from('schedules')
      .insert(schedule)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Announcements
  async getActiveAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getAllAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async createAnnouncement(announcement) {
    const { data, error } = await supabase
      .from('announcements')
      .insert(announcement)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

