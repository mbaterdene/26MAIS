// ─── studentLife.ts ────────────────────────────────────────────────────────────
// Structured content for the Student Life & Support page.
// Replace these mock exports with real CMS API calls (e.g. Contentful, Sanity)
// without touching any component code.

export interface CommunityItem {
  id: string;
  label: string;
  description: string;
  accentBg: string;    // Tailwind bg class for icon container
  textColor: string;   // Tailwind text color for heading
  shadowColor: string; // Tailwind shadow class (default)
  shadowHover: string; // Tailwind hover shadow class
}

export interface EventItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  gradient: string; // Tailwind bg-gradient-to-br value
  stat: string;
  statLabel: string;
}

export interface SupportService {
  id: string;
  num: string;
  title: string;
  description: string;
  accentColor: string; // Tailwind text color
  barColor: string;    // Tailwind bg color for animated bar
}

export interface StudentLifePageContent {
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
  };
  community: {
    sectionLabel: string;
    heading: string;
    body: string;
    stat: { value: string; label: string };
    items: CommunityItem[];
  };
  events: {
    sectionLabel: string;
    heading: string;
    body: string;
    items: EventItem[];
  };
  support: {
    sectionLabel: string;
    heading: string;
    body: string;
    services: SupportService[];
  };
}

// ─── Mock Data (swap for CMS fetch) ───────────────────────────────────────────
export const studentLifeContent: StudentLifePageContent = {
  hero: {
    title: 'More Than a School.',
    titleAccent: 'A Community.',
    subtitle: 'A vibrant, global community where students connect, lead, celebrate, and support one another — across every time zone.',
  },

  community: {
    sectionLabel: 'Community',
    heading: 'Built on Real Human Connection',
    body: 'Despite spanning the globe, OHS students build some of the deepest friendships in education — united by curiosity, ambition, and a shared digital home.',
    stat: { value: '60+', label: 'Student-Run Clubs' },
    items: [
      {
        id: 'clubs',
        label: '60+ Student-Run Clubs',
        description: 'From Model UN to robotics, literary magazines, and cultural societies — students lead what they love.',
        accentBg: 'bg-cardinal-red',
        textColor: 'text-cardinal-red',
        shadowColor: 'shadow-[0_0_0_0_rgba(140,21,21,0)]',
        shadowHover: 'hover:shadow-[0_4px_32px_rgba(140,21,21,0.18)]',
      },
      {
        id: 'gov',
        label: 'Student Government',
        description: 'Elected representatives who shape school policy, advocate for peers, and build OHS culture.',
        accentBg: 'bg-digital-blue',
        textColor: 'text-digital-blue',
        shadowColor: 'shadow-[0_0_0_0_rgba(0,108,184,0)]',
        shadowHover: 'hover:shadow-[0_4px_32px_rgba(0,108,184,0.18)]',
      },
      {
        id: 'homeroom',
        label: 'Weekly Homeroom',
        description: "A dedicated weekly session for community connection, announcements, and advisory support — the heartbeat of OHS.",
        accentBg: 'bg-sand',
        textColor: 'text-black',
        shadowColor: 'shadow-[0_0_0_0_rgba(210,194,149,0)]',
        shadowHover: 'hover:shadow-[0_4px_32px_rgba(210,194,149,0.28)]',
      },
    ],
  },

  events: {
    sectionLabel: 'Events',
    heading: 'Where the World Meets',
    body: "From the Stanford campus to forests, cities, and beyond — OHS events bring our digital community into stunning physical reality.",
    items: [
      {
        id: 'summer',
        title: 'Summer @ Stanford',
        tag: 'Residential',
        description: 'An exclusive on-campus residential program at Stanford University — where our global community finally meets in person. Coursework, exploration, and memories that last a lifetime.',
        gradient: 'from-[#8C1515] via-[#B1040E] to-[#D2654E]',
        stat: '4 Weeks',
        statLabel: 'On Campus',
      },
      {
        id: 'retreats',
        title: 'Homeroom Retreats',
        tag: 'Community',
        description: 'Multi-day retreats where homeroom groups gather in nature, strengthening bonds beyond the screen through shared experiences and collaborative challenges.',
        gradient: 'from-[#006CB8] via-[#0A84D0] to-[#38B6FF]',
        stat: '3× / Year',
        statLabel: 'Per Group',
      },
      {
        id: 'spirit',
        title: 'Spirit Week & Graduation',
        tag: 'Celebration',
        description: "An electrifying week of school-wide pride culminating in a joyful in-person graduation ceremony — caps, gowns, confetti, and cheers from a global family.",
        gradient: 'from-[#2E2D29] via-[#4A4843] to-[#6B6966]',
        stat: 'Annual',
        statLabel: 'Tradition',
      },
      {
        id: 'travel',
        title: 'Student Travel',
        tag: 'Global',
        description: "Organized trips spanning continents — student-led cultural immersions, study tours, and adventures that bring OHS's global identity to life.",
        gradient: 'from-[#5C4A1E] via-[#8B6914] to-[#D2A531]',
        stat: '30+ Countries',
        statLabel: 'Represented',
      },
    ],
  },

  support: {
    sectionLabel: 'Support Services',
    heading: 'Every Student, Fully Supported',
    body: 'Rigorous academics demand serious support. Our comprehensive network of advisors, counselors, and tutors ensures no student navigates their journey alone.',
    services: [
      {
        id: 'advising',
        num: '01',
        title: 'Academic Advising',
        description: 'Personalized one-on-one guidance to craft the right course sequence, manage workload, and build a cohesive long-term academic roadmap.',
        accentColor: 'text-digital-blue',
        barColor: 'bg-digital-blue',
      },
      {
        id: 'counseling',
        num: '02',
        title: 'College Counseling',
        description: 'Dedicated college counselors with deep expertise in elite university admissions — starting early to shape a compelling, authentic application narrative.',
        accentColor: 'text-cardinal-red',
        barColor: 'bg-cardinal-red',
      },
      {
        id: 'wellness',
        num: '03',
        title: 'Wellness & SEL Counseling',
        description: 'Licensed counselors specializing in Social-Emotional Learning, supporting mental health, resilience, and balance in a high-achieving environment.',
        accentColor: 'text-sand',
        barColor: 'bg-sand',
      },
      {
        id: 'tutoring',
        num: '04',
        title: 'Writing & Tutoring Center',
        description: 'Peer and instructor-led sessions covering essay craft, mathematical problem sets, reading strategies, and every academic challenge in between.',
        accentColor: 'text-white',
        barColor: 'bg-white',
      },
    ],
  },
};
