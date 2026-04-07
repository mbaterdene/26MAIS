/**
 * Content Registry
 * Defines all editable content files
 */

import aboutData from '../content/about.json';
import alumniData from '../content/alumni.json';
import clubsData from '../content/clubs.json';
import coursesData from '../content/courses.json';
import eventsData from '../content/events.json';
import slidesData from '../content/slides.json';
import studentsData from '../content/students.json';
import teachersData from '../content/teachers.json';

export interface ContentPageConfig {
  key: string;
  label: string;
  label_mn: string;
  description: string;
  data: any;
  path: string;
}

export const CONTENT_PAGES: ContentPageConfig[] = [
  {
    key: 'about',
    label: 'About Page',
    label_mn: 'Сургуулийн тухай',
    description: 'Complete about page with all sections',
    data: aboutData,
    path: 'src/content/about.json',
  },
  {
    key: 'alumni',
    label: 'Alumni',
    label_mn: 'Төгсөгчид',
    description: 'Alumni statistics and locations',
    data: alumniData,
    path: 'src/content/alumni.json',
  },
  {
    key: 'clubs',
    label: 'Clubs',
    label_mn: 'Клубууд',
    description: 'School clubs and activities',
    data: clubsData,
    path: 'src/content/clubs.json',
  },
  {
    key: 'courses',
    label: 'Courses',
    label_mn: 'Хичээлүүд',
    description: 'Course listings and descriptions',
    data: coursesData,
    path: 'src/content/courses.json',
  },
  {
    key: 'events',
    label: 'Events',
    label_mn: 'Үйл явдлууд',
    description: 'School events and announcements',
    data: eventsData,
    path: 'src/content/events.json',
  },
  {
    key: 'slides',
    label: 'Homepage Slides',
    label_mn: 'Эхлэл хуудас слайдууд',
    description: 'Banner slides for the homepage',
    data: slidesData,
    path: 'src/content/slides.json',
  },
  {
    key: 'students',
    label: 'Students',
    label_mn: 'Сурагчид',
    description: 'Student information and statistics',
    data: studentsData,
    path: 'src/content/students.json',
  },
  {
    key: 'teachers',
    label: 'Teachers',
    label_mn: 'Багш нар',
    description: 'Teacher profiles and information',
    data: teachersData,
    path: 'src/content/teachers.json',
  },
];

export function getContentPageByKey(key: string): ContentPageConfig | undefined {
  return CONTENT_PAGES.find(page => page.key === key);
}

export function getContentPageLabel(key: string, isEnglish: boolean = true): string {
  const page = getContentPageByKey(key);
  return page ? (isEnglish ? page.label : page.label_mn) : key;
}
