// ─── studentSupport.ts ────────────────────────────────────────────────────────
// Structured content for the Student Support page.
// Swap exports for CMS fetch calls without touching component code.

export interface SupportService {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  accentColor: string; // Tailwind text color class
  gradientFrom: string; // Tailwind from-[] class for card gradient
  gradientTo: string;
  iconId: string;      // maps to icon in component
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  accentBorder: string; // Tailwind border-l color
}

export interface StudentSupportPageContent {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
  };
  overview: {
    sectionLabel: string;
    heading: string;
    body: string;
  };
  services: SupportService[];
  testimonials: {
    sectionLabel: string;
    heading: string;
    items: TestimonialItem[];
  };
  cta: {
    heading: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}

export const studentSupportContent: StudentSupportPageContent = {
  hero: {
    eyebrow: 'Student Support',
    title: 'You\'re Never',
    titleAccent: 'Navigating Alone.',
    subtitle:
      'From course planning to college applications, mental wellness to writing craft — our dedicated support network ensures every student has the tools to thrive inside the most rigorous academic program in online education.',
  },

  overview: {
    sectionLabel: 'Overview',
    heading: 'A Full Ecosystem of Support',
    body: 'Stanford OHS pairs world-class academic challenge with a comprehensive student support infrastructure. Every student — regardless of where they are in the world — has personalized access to advisors, counselors, and specialist tutors who know them by name.',
  },

  services: [
    {
      id: 'advising',
      num: '01',
      title: 'Academic Advising',
      tagline: 'Your roadmap, built with you.',
      description:
        'Our academic advisors work one-on-one with every student to craft a personalized multi-year course plan that balances intellectual ambition with sustainable workload management.',
      bullets: [
        'Individual advising sessions each semester',
        'Course selection and sequence planning',
        'Load management and study strategies',
        'Coordination with faculty on academic concerns',
      ],
      accentColor: 'text-digital-blue',
      gradientFrom: 'from-[#006CB8]',
      gradientTo: 'to-[#0A84D0]',
      iconId: 'advising',
    },
    {
      id: 'college',
      num: '02',
      title: 'College Counseling',
      tagline: 'From OHS to the world\'s best universities.',
      description:
        'Our dedicated college counselors have deep expertise in elite university admissions worldwide. We begin early — building authentic narratives and compelling applications that reflect each student\'s unique story.',
      bullets: [
        'Dedicated counselor assigned in 10th grade',
        'Essay brainstorming and revision support',
        'School list building and strategic guidance',
        'Interview preparation and decision support',
      ],
      accentColor: 'text-cardinal-red',
      gradientFrom: 'from-[#8C1515]',
      gradientTo: 'to-[#B1040E]',
      iconId: 'college',
    },
    {
      id: 'wellness',
      num: '03',
      title: 'Counseling & Wellness',
      tagline: 'Thriving, not just surviving.',
      description:
        'Licensed counselors specializing in Social-Emotional Learning (SEL) support student mental health, resilience, and balance. In a high-achieving environment, we actively protect every student\'s wellbeing.',
      bullets: [
        'Licensed SEL and mental health counselors',
        'Individual and group support sessions',
        'Crisis intervention protocols',
        'Mindfulness and stress-management workshops',
      ],
      accentColor: 'text-emerald-400',
      gradientFrom: 'from-[#064E3B]',
      gradientTo: 'to-[#065F46]',
      iconId: 'wellness',
    },
    {
      id: 'tutoring',
      num: '04',
      title: 'Writing & Tutoring Center',
      tagline: 'From draft to distinction.',
      description:
        'Peer tutors and expert instructors support every academic discipline — from essay argumentation and mathematical proofs to reading strategies and lab report writing.',
      bullets: [
        'Peer and instructor-led tutoring sessions',
        'Writing workshops and one-on-one feedback',
        'Math support across all levels',
        'Study skills and research methodology',
      ],
      accentColor: 'text-amber-400',
      gradientFrom: 'from-[#78350F]',
      gradientTo: 'to-[#92400E]',
      iconId: 'tutoring',
    },
  ],

  testimonials: {
    sectionLabel: 'Student Voices',
    heading: 'What Our Students Say',
    items: [
      {
        id: 't1',
        quote:
          '"My academic advisor helped me design a course plan that challenged me without burning me out. She remembered every detail about my goals and checked in every semester."',
        author: 'Maya K.',
        role: 'OHS Class of 2024 · Now at MIT',
        accentBorder: 'border-l-digital-blue',
      },
      {
        id: 't2',
        quote:
          '"The college counseling team was extraordinary. They helped me craft a narrative I\'m genuinely proud of — one that got me into my first-choice school."',
        author: 'James L.',
        role: 'OHS Class of 2023 · Now at Yale',
        accentBorder: 'border-l-cardinal-red',
      },
      {
        id: 't3',
        quote:
          '"The Writing Center transformed how I approach essays. The tutors didn\'t just correct my work — they taught me to think like a writer."',
        author: 'Priya S.',
        role: 'OHS Class of 2025',
        accentBorder: 'border-l-sand',
      },
    ],
  },

  cta: {
    heading: 'Ready to experience the OHS difference?',
    body: 'Explore admissions, request a consultation with our team, or take a virtual tour of our support ecosystem.',
    primaryLabel: 'Apply Now',
    secondaryLabel: 'Contact Us',
  },
};
