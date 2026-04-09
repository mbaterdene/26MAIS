import type {
  CarouselSlide,
  Club,
  NewsItem,
  Course,
  Event,
  Teacher,
  Student,
  AlumniStats,
  AlumniCountry,
  SchoolInfo,
  SchoolCharacteristic,
  NationalProgram,
  InternationalProgram,
  StudentProgram,
} from "./types";

import aboutData from "../content/about.json";
import {
  jsonAlumni,
  jsonClubs,
  jsonCourses,
  jsonEvents,
  jsonSchoolInfo,
  jsonSlides,
  jsonStudents,
  jsonTeachers,
} from "../data/contentJson";
import { coursePDQData } from "../data/courseQuality";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

function filterCourses(items: Course[], params?: { grade?: string; program_type?: string }): Course[] {
  return items.filter((c) => {
    if (params?.grade && c.grade !== params.grade) return false;
    if (params?.program_type && c.program_type !== params.program_type) return false;
    return true;
  });
}

function filterEvents(items: Event[], featured?: boolean): Event[] {
  if (featured === undefined) return items;
  return featured ? items.slice(0, 3) : items;
}

function filterStudents(items: Student[], params?: { grade?: string; featured?: boolean }): Student[] {
  return items.filter((s) => {
    if (params?.grade && s.grade !== params.grade) return false;
    if (params?.featured !== undefined && s.is_featured !== params.featured) return false;
    return true;
  });
}

function filterTeachers(items: Teacher[], category?: string): Teacher[] {
  if (!category) return items;
  return items.filter((t) => t.category === category);
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export interface HomeData {
  slides: CarouselSlide[];
  latest_news: NewsItem[];
  upcoming_events: Event[];
  school_info: SchoolInfo | null;
}
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/news`);
    const data = await response.json();
    const latest_news = (data.data || []).slice(0, 4);
    
    return {
      slides: jsonSlides,
      latest_news: latest_news,
      upcoming_events: jsonEvents.slice(0, 3),
      school_info: jsonSchoolInfo,
    };
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    // Fallback to empty news array
    return {
      slides: jsonSlides,
      latest_news: [],
      upcoming_events: jsonEvents.slice(0, 3),
      school_info: jsonSchoolInfo,
    };
  }
};

// ─── About ────────────────────────────────────────────────────────────────────
export interface Achievement {
  id: number;
  year: number;
  type: string;
  title_mn: string;
  title_en?: string | null;
  description_mn?: string | null;
  description_en?: string | null;
}
export interface GraduateStat {
  year: number;
  total_graduates: number;
  abroad_count: number;
  scholarship_amount: number;
  percentage: number;
}
export interface CounselingService {
  id: number;
  title_mn: string;
  title_en?: string | null;
  description_mn: string;
  description_en?: string | null;
}
export interface AboutData {
  school_info: SchoolInfo | null;
  characteristics: SchoolCharacteristic[];
  national_program: NationalProgram | null;
  international_program: InternationalProgram | null;
  student_programs: StudentProgram[];
  achievements: Achievement[];
  graduate_stats: GraduateStat[];
  total_graduates: number;
  total_abroad: number;
  total_scholarship: number;
  counseling_services: CounselingService[];
}
export const getAboutData = (): Promise<AboutData> =>
  Promise.resolve(aboutData);

// ─── News ─────────────────────────────────────────────────────────────────────
export const getNewsList = async (limit = 20, offset = 0): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/news`);
    const data = await response.json();
    return (data.data || []).slice(offset, offset + limit);
  } catch (error) {
    console.error("Failed to fetch news list:", error);
    return [];
  }
};

export const getNewsDetail = async (slug: string): Promise<NewsItem> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/news/${slug}`);
    if (!response.ok) {
      throw new Error(`News not found: ${slug}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch news detail:", error);
    throw new Error(`News not found: ${slug}`);
  }
};

// ─── Courses ──────────────────────────────────────────────────────────────────
export const getCourseList = (params?: { grade?: string; program_type?: string }) => {
  return Promise.resolve(filterCourses(jsonCourses, params));
};

export const getCourseDetail = async (slug: string): Promise<Course> => {
  const item = jsonCourses.find((c) => c.slug === slug);
  if (!item) throw new Error(`Course not found: ${slug}`);
  return item;
};

// ─── Events ───────────────────────────────────────────────────────────────────
export const getEvents = (featured?: boolean) => {
  return Promise.resolve(filterEvents(jsonEvents, featured));
};

export const getEventDetail = async (id: number | string): Promise<Event> => {
  const item = jsonEvents.find((e) => String(e.id) === String(id));
  if (!item) throw new Error(`Event not found: ${id}`);
  return item;
};

export interface CalendarData {
  months: unknown[];
  events: Event[];
}
export const getCalendarData = (): Promise<CalendarData> =>
  Promise.resolve({ months: [], events: jsonEvents });

// ─── Students ─────────────────────────────────────────────────────────────────
export const getStudents = (params?: { grade?: string; featured?: boolean }) => {
  return Promise.resolve(filterStudents(jsonStudents, params));
};

export const getClubs = (category?: "student" | "school"): Promise<Club[]> => {
  if (!category) return Promise.resolve(jsonClubs);
  return Promise.resolve(jsonClubs.filter((c) => c.category === category));
};

// ─── Teachers ─────────────────────────────────────────────────────────────────
export const getTeachers = (category?: string) => {
  return Promise.resolve(filterTeachers(jsonTeachers, category));
};

// ─── Alumni ───────────────────────────────────────────────────────────────────
export interface AlumniStatsData {
  statistics: AlumniStats;
  countries_data: (AlumniCountry & {
    code: string;
    latitude: number;
    longitude: number;
    color: string;
  })[];
}
export const getAlumniStats = (): Promise<AlumniStatsData> =>
  Promise.resolve(jsonAlumni);

// ─── Course Quality PDQ ────────────────────────────────────────────────────────
export interface CoursePDQData {
  pdq_page: any;
  teacher_dev: any;
  modules: any[];
  cycle_steps: any[];
}
export const getCoursePDQData = (): Promise<CoursePDQData> =>
  Promise.resolve(coursePDQData);
