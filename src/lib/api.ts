import type {
  CarouselSlide,
  Club,
  NewsItem,
  Course,
  Event,
  Teacher,
  Student,
  SchoolInfo,
  InternationalProgram,
  StudentProgram,
} from "./types";

import aboutData from "../content/about.json";
import schoolData from "../content/school.json";
import slidesRaw from "../content/slides.json";
import coursesData from "../content/courses.json";
import eventsData from "../content/events.json";
import studentsData from "../content/students.json";
import clubsData from "../content/clubs.json";
import staffData from "../content/staffData.json";
import { coursePDQData } from "../data/courseQuality";

// ─── Slide SVG Generation ──────────────────────────────────────────────────────
interface RawSlide {
  id: number;
  title_mn: string;
  title_en?: string;
  subtitle_mn?: string;
  subtitle_en?: string;
  background: string;
}

function svgDataUri(title: string, subtitle: string, bg: string): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
    <circle cx="1320" cy="140" r="260" fill="rgba(255,255,255,0.08)"/>
    <circle cx="220" cy="760" r="300" fill="rgba(255,255,255,0.06)"/>
    <text x="90" y="420" fill="white" font-size="78" font-family="Georgia, serif" font-weight="700">${title}</text>
    <text x="90" y="490" fill="rgba(255,255,255,0.9)" font-size="38" font-family="Segoe UI, sans-serif">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// ─── Transformed Data ──────────────────────────────────────────────────────────
const jsonSchoolInfo = schoolData as SchoolInfo;
const jsonSlides = (slidesRaw as RawSlide[]).map((s) => ({
  id: s.id,
  title_mn: s.title_mn,
  title_en: s.title_en,
  subtitle_mn: s.subtitle_mn,
  subtitle_en: s.subtitle_en,
  image: svgDataUri(
    s.title_en || s.title_mn,
    s.subtitle_en || s.subtitle_mn || "Mongol Aspiration",
    s.background
  ),
})) satisfies CarouselSlide[];
const jsonCourses = coursesData as Course[];
const jsonEvents = eventsData as Event[];
const jsonTeachers = (staffData as any).staff as Teacher[];
const jsonStudents = studentsData as Student[];
const jsonClubs = clubsData as Club[];

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
export interface Principal {
  name_en: string;
  name_mn: string;
  title_en: string;
  title_mn: string;
  photo: string | null;
  message_en: string;
  message_mn: string;
}
export interface TimelineItem {
  id: number;
  year: number;
  title_en: string;
  title_mn: string;
  description_en: string;
  description_mn: string;
}
export interface AboutData {
  school_info: SchoolInfo | null;
  international_program: InternationalProgram | null;
  student_programs: StudentProgram[];
  achievements: Achievement[];
  graduate_stats: GraduateStat[];
  principal: Principal;
  timeline: TimelineItem[];
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



// ─── Course Quality PDQ ────────────────────────────────────────────────────────
export interface CoursePDQData {
  pdq_page: any;
  teacher_dev: any;
  modules: any[];
  cycle_steps: any[];
}
export const getCoursePDQData = (): Promise<CoursePDQData> =>
  Promise.resolve(coursePDQData);
