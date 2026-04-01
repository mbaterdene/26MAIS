export interface ProcessStep {
  id: string;
  month: string;
  title: string;
  description: string;
  accentBg: string;
  accentText: string;
}

export interface EnrollmentOption {
  id: string;
  title: string;
  subtitle: string;
  tuition: string;
  features: string[];
  borderColor: string;
  hoverBg: string;
  titleColor: string;
  titleHoverColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdmissionsPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  process: {
    sectionLabel: string;
    heading: string;
    ctaLabel: string;
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
    faqs: FAQItem[];
  };
}

export const admissionsContent: AdmissionsPageContent = {
  hero: {
    eyebrow: 'Admissions',
    title: 'Your Future Starts Here',
    subtitle: 'Join a vibrant community of passionate learners from around the globe.',
  },
  process: {
    sectionLabel: 'Application Timeline',
    heading: 'How to Apply',
    ctaLabel: 'Apply Now',
    steps: [
      {
        id: 'jan', month: 'January', title: 'Start Application',
        description: 'Complete the initial candidate profile and submit preliminary transcripts.',
        accentBg: 'bg-cardinal-red', accentText: 'text-white',
      },
      {
        id: 'feb', month: 'February', title: 'Submit Documents',
        description: 'Teacher recommendations, essays, and optional test scores are due.',
        accentBg: 'bg-digital-blue', accentText: 'text-white',
      },
      {
        id: 'mar', month: 'March', title: 'Interviews & Decisions',
        description: 'Finalist interviews are conducted, followed by final admissions decisions.',
        accentBg: 'bg-black', accentText: 'text-white',
      },
    ],
  },
  enrollment: {
    sectionLabel: 'Tuition & Enrollment',
    heading: 'Flexible Learning Paths',
    body: 'Whether you need a full high school experience or supplemental advanced coursework, we offer an option for you.',
    options: [
      {
        id: 'full-time', title: 'Full-Time', subtitle: '4–5 Courses', tuition: '$29,850',
        features: ['Complete diploma path', 'Full advising & counseling', 'College admissions support'],
        borderColor: 'border-cardinal-red', hoverBg: 'hover:bg-cardinal-red', titleColor: 'text-cardinal-red', titleHoverColor: 'group-hover:text-white',
      },
      {
        id: 'part-time', title: 'Part-Time', subtitle: '2–3 Courses', tuition: '$18,500',
        features: ['Dual enrollment with local school', 'Flexible schedule', 'Access to student life'],
        borderColor: 'border-digital-blue', hoverBg: 'hover:bg-digital-blue', titleColor: 'text-digital-blue', titleHoverColor: 'group-hover:text-white',
      },
      {
        id: 'single', title: 'Single Course', subtitle: '1 Course', tuition: '$6,050',
        features: ['Advanced subjects (Post-AP)', 'Specialized focus', 'Live seminars'],
        borderColor: 'border-gray-300', hoverBg: 'hover:bg-black', titleColor: 'text-black', titleHoverColor: 'group-hover:text-white',
      },
    ],
  },
  financialAid: {
    sectionLabel: 'Financial Support',
    heading: 'Financial Aid & Criteria',
    body: 'Stanford OHS is committed to making our program accessible to all qualified students.',
    faqs: [
      {
        id: 'need-based', question: 'Are scholarships need-based or merit-based?',
        answer: 'All our financial aid awards are strictly need-based. We do not offer merit scholarships or athletic scholarships. Our goal is to support families who otherwise could not afford tuition.',
      },
      {
        id: 'intl', question: 'Is financial aid available for international students?',
        answer: 'Yes, international students are fully eligible to apply for and receive need-based financial aid. The application process requires submitting equivalent international tax forms.',
      },
      {
        id: 'holistic', question: 'What is holistic review? Are test scores required?',
        answer: 'We review every application holistically. Standardized test scores (like SSAT, ISEE, SAT, ACT) are optional. We focus on transcripts, teacher recommendations, student essays, and interviews to gauge potential.',
      },
      {
        id: 'timeline', question: 'When is the financial aid application due?',
        answer: 'The financial aid deadline aligns with the regular admissions deadline in February. We strongly encourage applying for aid concurrently with your admissions application.',
      }
    ],
  },
};
