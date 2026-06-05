export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          form_type: string
          name: string
          company: string | null
          work_email: string
          platform: string[] | null
          service_needed: string | null
          project_timeline: string | null
          business_challenge: string | null
          preferred_contact: string | null
          status: string
          source: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_content: string | null
          referrer_url: string | null
          ip_country: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['leads']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string | null
          cover_image_url: string | null
          author_id: string | null
          topic_cluster: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          og_image_url: string | null
          read_time_minutes: number | null
          status: string
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['blog_posts']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      case_studies: {
        Row: {
          id: string
          slug: string
          title: string
          client_situation: string | null
          platforms: string[] | null
          industries: string[] | null
          services: string[] | null
          solution_approach: string | null
          outcome_summary: string | null
          metrics: Json | null
          is_featured: boolean
          cover_image_url: string | null
          meta_title: string | null
          meta_description: string | null
          og_image_url: string | null
          status: string
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['case_studies']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Database['public']['Tables']['case_studies']['Insert']
        >
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['profiles']['Row'],
          'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      lead_activity: {
        Row: {
          id: string
          lead_id: string
          action: string
          notes: string | null
          performed_by: string | null
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['lead_activity']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['lead_activity']['Insert']
        >
      }
      resources: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          file_url: string | null
          file_type: string | null
          is_gated: boolean
          download_count: number
          meta_title: string | null
          meta_description: string | null
          status: string
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['resources']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['resources']['Insert']>
      }
      resource_downloads: {
        Row: {
          id: string
          resource_id: string
          name: string
          company: string | null
          work_email: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['resource_downloads']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['resource_downloads']['Insert']
        >
      }
      faqs: {
        Row: {
          id: string
          page_slug: string
          question: string
          answer: string
          sort_order: number
          is_schema_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['faqs']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>
      }
      seo_overrides: {
        Row: {
          id: string
          page_slug: string
          meta_title: string | null
          meta_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          no_index: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['seo_overrides']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<
          Database['public']['Tables']['seo_overrides']['Insert']
        >
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['site_settings']['Row'],
          'id' | 'updated_at'
        >
        Update: Partial<
          Database['public']['Tables']['site_settings']['Insert']
        >
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['audit_logs']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['audit_logs']['Insert']
        >
      }
      consent_logs: {
        Row: {
          id: string
          session_id: string
          consent_type: string
          granted: boolean
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['consent_logs']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['consent_logs']['Insert']
        >
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
