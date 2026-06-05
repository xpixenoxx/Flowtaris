import type { Database } from './database'

/** Blog post row type */
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']

/** Case study row type */
export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

/** Resource row type */
export type Resource = Database['public']['Tables']['resources']['Row']

/** FAQ row type */
export type FAQ = Database['public']['Tables']['faqs']['Row']

/** Blog post with computed fields */
export interface BlogPostWithMeta extends BlogPost {
  author?: {
    full_name: string | null
    avatar_url: string | null
  }
}

/** Case study metric structure */
export interface CaseStudyMetric {
  label: string
  value: string
  suffix?: string
  description?: string
}

/** Case study with parsed metrics */
export interface CaseStudyWithMetrics extends CaseStudy {
  parsedMetrics?: CaseStudyMetric[]
}

/** Topic cluster for blog filtering */
export type TopicCluster =
  | 'NetSuite'
  | 'Coupa'
  | 'SAP'
  | 'Workday'
  | 'Integrations'
  | 'Automation'
  | 'Strategy'
  | 'Governance'

/** Platform identifiers */
export type Platform =
  | 'NetSuite'
  | 'Coupa'
  | 'SAP'
  | 'Workday'
  | 'Ironclad'
  | 'Workato'
  | 'Make'
  | 'Salesforce'
  | 'Zylo'

/** Industry identifiers */
export type Industry =
  | 'Technology & SaaS'
  | 'Healthcare'
  | 'Manufacturing'
  | 'Financial Services'
  | 'Professional Services'

/** Service identifiers */
export type ServiceType =
  | 'NetSuite Consulting'
  | 'Coupa Consulting'
  | 'ERP Integrations'
  | 'Managed Support'
  | 'AI & Automation'
  | 'SAP & Workday'

/** Navigation item structure */
export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
  isExternal?: boolean
}
