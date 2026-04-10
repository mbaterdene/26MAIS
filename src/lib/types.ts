// ─── Shared bilingual helper ─────────────────────────────────────────────────
export interface Bilingual {
  title_en?: string | null;
  title_mn: string;
}

// ─── Entity types ─────────────────────────────────────────────────────────────

export interface CarouselSlide {
  id: number;
  title_en?: string | null;
  title_mn: string;
  subtitle_en?: string | null;
  subtitle_mn?: string | null;
  image: string; // URL
}

export interface NewsItem {
  id: number;
  slug: string;
  title_en?: string | null;
  title_mn: string;
  content_en?: string | null;
  content_mn: string;
  image?: string | null;
  author: string;
  created_at: string; // ISO date
}

export interface Course {
  id: number;
  slug: string;
  name: string;
  description: string;
  teacher?: string | null;
  image?: string | null;
  grade?: string | null;
  grade_display?: string | null;
  program_type: string;
  program_type_display?: string | null;
}

export interface Event {
  id: number;
  title_en?: string | null;
  title_mn: string;
  description_en?: string | null;
  description_mn: string;
  event_date: string; // ISO
  event_end?: string | null;
  location?: string | null;
  image?: string | null;
  event_type: string;
  event_type_display?: string | null;
  event_type_style?: string | null;
}

export interface Teacher {
  id: number;
  full_name: string;
  subject?: string | null;
  bio?: string | null;
  email?: string | null;
  photo?: string | null;
  category: string;
}

export interface Student {
  id: number;
  student_id: string;
  full_name: string;
  grade: string;
  grade_display?: string | null;
  photo?: string | null;
  is_featured: boolean;
  achievement_type?: string | null;
  achievement_type_display?: string | null;
  achievement_title_mn?: string | null;
  achievement_title_en?: string | null;
  achievement_description_mn?: string | null;
  achievement_description_en?: string | null;
  achievement_year?: number | null;
}

export interface Club {
  id: number;
  name_en: string;
  name_mn: string;
  category: "student" | "school";
  description_en: string;
  description_mn: string;
  image_url: string;
}

export interface AlumniCountry {
  name: string;
  name_en?: string | null;
  alumni_count: number;
  color: string;
}

export interface AlumniStats {
  total_alumni: number;
  total_countries: number;
  total_universities: number;
  total_scholarship: number;
}

export interface SchoolInfo {
  vision_mn: string;
  vision_en?: string | null;
  mission_mn: string;
  mission_en?: string | null;
  general_info_mn?: string | null;
  general_info_en?: string | null;
  total_students?: number | null;
  total_teachers?: number | null;
}

export interface SchoolCharacteristic {
  id: number;
  title_mn: string;
  title_en?: string | null;
  description_mn: string;
  description_en?: string | null;
}

export interface NationalProgram {
  performance_rate: number;
  success_rate: number;
  quality_rate: number;
  description_mn?: string | null;
  description_en?: string | null;
}

export interface InternationalProgram {
  igcse: number;
  igcse_en: string;
  igcse_mn: string;
  igcse_desc_en: string;
  igcse_desc_mn: string;
  as_level: number;
  as_level_en: string;
  as_level_mn: string;
  as_level_desc_en: string;
  as_level_desc_mn: string;
  a2_level: number;
  a2_level_en: string;
  a2_level_mn: string;
  a2_level_desc_en: string;
  a2_level_desc_mn: string;
  pdq: number;
  pdq_en: string;
  pdq_mn: string;
  pdq_desc_en: string;
  pdq_desc_mn: string;
}

export interface StudentProgram {
  id: number;
  program_name_mn: string;
  program_name_en?: string | null;
  description_mn?: string | null;
  description_en?: string | null;
  total_participants: number;
  bronze_count: number;
  silver_count: number;
  gold_count: number;
  skills_programs: number;
  physical_programs: number;
}
