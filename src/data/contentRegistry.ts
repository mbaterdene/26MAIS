/**
 * Content Registry
 * Defines all editable content files
 */

import aboutData from '../content/about.json';
import alumniData from '../content/alumni/alumni.json';
import clubsData from '../content/clubs.json';
import subjectsData from '../content/subjects.json';
import eventsData from '../content/events.json';
import faqData from '../content/faq.json';
import slidesData from '../content/slides.json';
import studentsData from '../content/students.json';
import staffData from '../content/staffData.json';
import contactData from '../content/contact.json';

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
    key: 'subjects',
    label: 'Academics - Subjects',
    label_mn: 'Боловсрол - Хичээлүүд',
    description: 'International and national programme subjects',
    data: subjectsData,
    path: 'src/content/subjects.json',
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
    key: 'faq',
    label: 'FAQ',
    label_mn: 'ЧХА',
    description: 'Frequently asked questions and answers',
    data: faqData.faq,
    path: 'src/content/faq.json',
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
    key: 'staff',
    label: 'Staff',
    label_mn: 'Багш нар',
    description: 'Staff profiles and information',
    data: (staffData as any).staff,
    path: 'src/content/staffData.json',
  },
  {
    key: 'contact',
    label: 'Contact Us',
    label_mn: 'Холбоо барих',
    description: 'Contact page information and inquiry types',
    data: contactData,
    path: 'src/content/contact.json',
  },
];

export function getContentPageByKey(key: string): ContentPageConfig | undefined {
  return CONTENT_PAGES.find(page => page.key === key);
}

export function getContentPageLabel(key: string, isEnglish: boolean = true): string {
  const page = getContentPageByKey(key);
  return page ? (isEnglish ? page.label : page.label_mn) : key;
}
