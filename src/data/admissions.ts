// ─── admissions.ts ────────────────────────────────────────────────────────────
// Structured content for the Admissions page.
// Replace these mock exports with real CMS API calls (e.g. Contentful, Sanity)
// without touching any component code.

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  accentBg: string;   // Tailwind bg class for the step badge
  accentText: string; // Tailwind text color for badge
}

export interface EnrollmentOption {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  borderColor: string;       // Tailwind border class
  hoverBg: string;           // Tailwind hover:bg class
  titleColor: string;        // Tailwind text color for title (default)
  titleHoverColor: string;   // Tailwind text color for title on hover
}

export interface FinancialAidItem {
  id: string;
  text: string;
}

export interface AdmissionsPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  process: {
    sectionLabel: string;
    heading: string;
    steps: ProcessStep[];
  };
  enrollment: {
    sectionLabel: string;
    heading: string;
    body: string;
    options: EnrollmentOption[];
  };
  financialAid: {
    sectionLabel: string;
    heading: string;
    body: string;
    quote: string;
    ctaLabel: string;
    items: FinancialAidItem[];
  };
}

// ─── Mock Data (swap for CMS fetch) ───────────────────────────────────────────
export const admissionsContent: AdmissionsPageContent = {
  hero: {
    title: 'Admissions',
    subtitle: 'Join a vibrant community of passionate learners from around the globe.',
  },

  process: {
    sectionLabel: 'Process',
    heading: 'The Application Process',
    steps: [
      {
        id: 'traditional',
        step: 1,
        title: 'Traditional App',
        description: 'Similar to a college application, requiring transcripts, teacher recommendations, and standardized test scores.',
        accentBg: 'bg-cardinal-red',
        accentText: 'text-white',
      },
      {
        id: 'holistic',
        step: 2,
        title: 'Holistic Review',
        description: 'We look beyond numbers. There are no strict cut-offs. Every applicant is evaluated comprehensively to gauge potential.',
        accentBg: 'bg-digital-blue',
        accentText: 'text-white',
      },
      {
        id: 'assessment',
        step: 3,
        title: 'Assessments',
        description: 'Finalist candidates complete a proctored online assessment and engage in a personalized interview with our admissions team.',
        accentBg: 'bg-black',
        accentText: 'text-white',
      },
    ],
  },

  enrollment: {
    sectionLabel: 'Enrollment',
    heading: 'Enrollment Options',
    body: 'Customize your educational journey. Whether you are looking for a complete high school experience or supplemental advanced coursework, we have an option for you.',
    options: [
      {
        id: 'full-time',
        title: 'Full-Time',
        subtitle: '4+ Courses',
        features: ['Complete diploma path', 'Full advising support'],
        borderColor: 'border-cardinal-red',
        hoverBg: 'hover:bg-cardinal-red',
        titleColor: 'text-cardinal-red',
        titleHoverColor: 'group-hover:text-white',
      },
      {
        id: 'part-time',
        title: 'Part-Time',
        subtitle: '2–3 Courses',
        features: ['Dual enrollment', 'Flexible schedule'],
        borderColor: 'border-digital-blue',
        hoverBg: 'hover:bg-digital-blue',
        titleColor: 'text-digital-blue',
        titleHoverColor: 'group-hover:text-white',
      },
      {
        id: 'single-course',
        title: 'Single Course',
        subtitle: '1 Course',
        features: ['Advanced subjects', 'Specialized focus'],
        borderColor: 'border-gray-300',
        hoverBg: 'hover:bg-black',
        titleColor: 'text-black',
        titleHoverColor: 'group-hover:text-white',
      },
    ],
  },

  financialAid: {
    sectionLabel: 'Financial Aid',
    heading: 'Financial Aid',
    body: 'Stanford OHS is committed to making our program accessible to all qualified students, regardless of financial circumstance.',
    quote: '"Our financial aid program ensures that geographic and socioeconomic diversity remains a cornerstone of the OHS experience."',
    ctaLabel: 'Learn About Tuition & Aid',
    items: [
      { id: 'need-based', text: 'Need-based awards only' },
      { id: 'international', text: 'Available for International Students' },
    ],
  },
};
