// ─── about.ts ────────────────────────────────────────────────────────────────
// Structured content for the About page.
// Swap exports for CMS fetch calls without touching component code.

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  initials: string;
  accentBg: string;  // Tailwind bg class for avatar
  accentText: string;
}

export interface MissionPillar {
  id: string;
  num: string;
  heading: string;
  body: string;
  accentColor: string; // Tailwind text color
  barColor: string;    // Tailwind bg color for bar
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  color: string;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
  };
  mission: {
    sectionLabel: string;
    heading: string;
    body: string;
    pillars: MissionPillar[];
  };
  stats: {
    heading: string;
    items: StatItem[];
  };
  history: {
    sectionLabel: string;
    heading: string;
    paragraphs: string[];
    quote: string;
    quoteAttr: string;
  };
  leadership: {
    sectionLabel: string;
    heading: string;
    body: string;
    members: LeadershipMember[];
  };
  tour: {
    heading: string;
    body: string;
    ctaLabel: string;
  };
}

export const aboutContent: AboutPageContent = {
  hero: {
    eyebrow: 'About Stanford OHS',
    title: 'Redefining What',
    titleAccent: 'School Can Be.',
    subtitle:
      'Stanford Online High School is a selective, diploma-granting independent school for exceptional students worldwide — built on the belief that rigorous academics and deep community belong together.',
  },

  mission: {
    sectionLabel: 'Our Mission',
    heading: 'Why We Exist',
    body: 'Stanford OHS was founded on a single conviction: that intellectually exceptional students, wherever they are born, deserve an education that truly challenges and connects them.',
    pillars: [
      {
        id: 'intellect',
        num: '01',
        heading: 'Intellectual Rigor',
        body: 'We offer a university-style curriculum anchored by our Core philosophy sequence, pushing students to think more clearly and argue more honestly than anywhere else.',
        accentColor: 'text-cardinal-red',
        barColor: 'bg-cardinal-red',
      },
      {
        id: 'access',
        num: '02',
        heading: 'Global Access',
        body: 'By removing geography from the equation, we unite the brightest young minds across 50+ countries into one vibrant, diverse academic community.',
        accentColor: 'text-digital-blue',
        barColor: 'bg-digital-blue',
      },
      {
        id: 'whole',
        num: '03',
        heading: 'The Whole Student',
        body: 'Academic excellence cannot come at the cost of wellbeing. Our counselors, advisors, and community structures ensure every student thrives as a human being.',
        accentColor: 'text-sand',
        barColor: 'bg-sand',
      },
    ],
  },

  stats: {
    heading: 'OHS by the Numbers',
    items: [
      { id: 'founded', value: '2006', label: 'Year Founded', color: 'text-cardinal-red' },
      { id: 'countries', value: '50+', label: 'Countries Represented', color: 'text-digital-blue' },
      { id: 'courses', value: '100+', label: 'Courses Offered', color: 'text-sand' },
      { id: 'grads', value: '2,000+', label: 'Alumni Worldwide', color: 'text-white' },
    ],
  },

  history: {
    sectionLabel: 'Our History',
    heading: 'A School Born from Stanford',
    paragraphs: [
      'Stanford Online High School grew out of the Stanford University Education Program for Gifted Youth (EPGY), which had for years served academically talented students through distance learning.',
      'In 2006, EPGY launched OHS as a fully accredited diploma-granting secondary school — the first of its kind to offer rigorous live, online seminars at the university level. From the beginning, the vision was not merely to replicate a traditional school online, but to build something fundamentally better.',
      'Today, OHS is an independent, non-profit school accredited by the Western Association of Schools and Colleges, housed on the Stanford University campus and staffed by world-class faculty.',
    ],
    quote:
      '"OHS is not an online version of a traditional school. It is a new model for what a school can be — more rigorous, more connected, and more humane."',
    quoteAttr: '— OHS Founding Vision Document, 2006',
  },

  leadership: {
    sectionLabel: 'Leadership',
    heading: 'Guided by Experts',
    body: 'Our faculty and leadership team bring deep expertise from Stanford University and leading institutions worldwide.',
    members: [
      {
        id: 'director',
        name: 'Dr. Liz Kohler',
        title: 'Executive Director',
        initials: 'LK',
        accentBg: 'bg-cardinal-red',
        accentText: 'text-white',
      },
      {
        id: 'academic',
        name: 'Dr. Scott Eberle',
        title: 'Dean of Academics',
        initials: 'SE',
        accentBg: 'bg-digital-blue',
        accentText: 'text-white',
      },
      {
        id: 'student',
        name: 'Dr. Nadia Rahman',
        title: 'Dean of Student Life',
        initials: 'NR',
        accentBg: 'bg-black',
        accentText: 'text-white',
      },
      {
        id: 'admission',
        name: 'Jessica Torres',
        title: 'Director of Admissions',
        initials: 'JT',
        accentBg: 'bg-sand',
        accentText: 'text-black',
      },
    ],
  },

  tour: {
    heading: 'See OHS in Action',
    body: 'Experience a live seminar, explore our virtual campus, and meet the community that makes Stanford OHS unlike any school on earth.',
    ctaLabel: 'Take the Tour',
  },
};
