// ─── academics.ts ─────────────────────────────────────────────────────────────
// Structured content for the Academics page.
// Replace these mock exports with real CMS API calls (e.g. Contentful, Sanity)
// without touching any component code.

export interface CurriculumItem {
  id: string;
  title: string;
  description: string;
  accentColor: string; // Tailwind border-l color class
  hoverColor: string;  // Tailwind group-hover text color class
}

export interface PedagogyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  accentBg: string;  // Tailwind bg class for the step circle
}

export interface GraduationStat {
  id: string;
  value: string;
  label: string;
  description: string;
  color: string;       // Tailwind text color class
  offset?: string;     // Optional: md:-translate-y-N
}

export interface AcademicsPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  curriculum: {
    sectionLabel: string;
    heading: string;
    body: string;
    items: CurriculumItem[];
  };
  pedagogy: {
    sectionLabel: string;
    heading: string;
    body: string;
    steps: PedagogyStep[];
  };
  graduation: {
    heading: string;
    stats: GraduationStat[];
  };
}

// ─── Mock Data (swap for CMS fetch) ───────────────────────────────────────────
export const academicsContent: AcademicsPageContent = {
  hero: {
    title: 'Academics',
    subtitle: 'A challenging, discussion-based curriculum designed for passionate learners.',
  },

  curriculum: {
    sectionLabel: 'Curriculum',
    heading: 'The Curriculum',
    body: 'Our core subjects interlock, creating a profound, university-level academic journey from early middle school to post-AP graduation.',
    items: [
      {
        id: 'core-sequence',
        title: 'Core Sequence',
        description: 'A rigorous sequence rooted in philosophy, teaching students to think critically, argue effectively, and write clearly.',
        accentColor: 'border-l-cardinal-red',
        hoverColor: 'group-hover:text-cardinal-red',
      },
      {
        id: 'college-courses',
        title: '40+ College Courses',
        description: 'Go beyond High School. Access specialized and advanced subjects rarely offered elsewhere.',
        accentColor: 'border-l-digital-blue',
        hoverColor: 'group-hover:text-digital-blue',
      },
      {
        id: 'post-ap',
        title: 'Post-AP & University',
        description: 'Opportunities for dual enrollment and ultra-advanced study in math, science, and humanities.',
        accentColor: 'border-l-black',
        hoverColor: 'group-hover:text-gray-700',
      },
      {
        id: 'middle-school',
        title: 'Middle School (7–8)',
        description: 'Building foundations for exceptional academic achievement with a specialized curriculum for younger students.',
        accentColor: 'border-l-sand',
        hoverColor: 'group-hover:text-sand',
      },
    ],
  },

  pedagogy: {
    sectionLabel: 'Pedagogy',
    heading: 'Pedagogy',
    body: 'Our pedagogical approach flips the traditional classroom model to maximize the value of instructional time.',
    steps: [
      {
        id: 'flipped',
        step: 1,
        title: 'Flipped Classroom Model',
        description: 'Students consume lectures and read materials independently before class, ensuring they arrive prepared to engage.',
        accentBg: 'bg-cardinal-red',
      },
      {
        id: 'seminars',
        step: 2,
        title: 'Live Discussion Seminars',
        description: 'Classes are exclusively discussion-based. Real-time online seminars with small class sizes foster active debate and collaboration.',
        accentBg: 'bg-digital-blue',
      },
      {
        id: 'reasoning',
        step: 3,
        title: 'Critical Reasoning',
        description: 'We train students to dismantle arguments, assess evidence, and articulate truth — not merely memorize facts.',
        accentBg: 'bg-black',
      },
    ],
  },

  graduation: {
    heading: 'Graduation Requirements',
    stats: [
      {
        id: 'courses',
        value: '20',
        label: 'Full-Year Courses',
        description: 'Total continuous credits required over four years of rigorous secondary education.',
        color: 'text-cardinal-red',
      },
      {
        id: 'core-years',
        value: '4',
        label: 'Years Core Class',
        description: 'Annual enrollment in our foundational multi-disciplinary philosophy sequence.',
        color: 'text-sand',
        offset: 'md:-translate-y-8',
      },
      {
        id: 'discipline',
        value: '1+',
        label: 'Discipline Unit',
        description: 'Strict specific minimums distributed across science, humanities, and critical languages.',
        color: 'text-digital-blue',
      },
    ],
  },
};
