import type {
  AlumniCountry,
  AlumniStats,
  CarouselSlide,
  Club,
  Course,
  Event,
  SchoolInfo,
  Student,
  Teacher,
} from "../lib/types";

import schoolRaw from "../content/school.json";
import slidesRaw from "../content/slides.json";
import coursesRaw from "../content/courses.json";
import eventsRaw from "../content/events.json";
import teachersRaw from "../content/teachers.json";
import studentsRaw from "../content/students.json";
import alumniRaw from "../content/alumni.json";
import clubsRaw from "../content/clubs.json";

interface RawSlide {
  id: number;
  title_mn: string;
  title_en?: string;
  subtitle_mn?: string;
  subtitle_en?: string;
  background: string;
}

export interface JsonAlumniStatsData {
  statistics: AlumniStats;
  countries_data: (AlumniCountry & {
    code: string;
    latitude: number;
    longitude: number;
    color: string;
  })[];
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

export const jsonSchoolInfo = schoolRaw as SchoolInfo;
export const jsonSlides = (slidesRaw as RawSlide[]).map((s) => ({
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
export const jsonCourses = coursesRaw as Course[];
export const jsonEvents = eventsRaw as Event[];
export const jsonTeachers = teachersRaw as Teacher[];
export const jsonStudents = studentsRaw as Student[];
export const jsonClubs = clubsRaw as Club[];
export const jsonAlumni = alumniRaw as JsonAlumniStatsData;
