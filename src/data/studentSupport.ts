

export interface SupportService {
  id: string;
  title: string;
  iconId: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
  imageUrl: string;
  accentBg: string;
  accentText: string;
}

export interface StudentSupportContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  services: {
    sectionLabel: string;
    heading: string;
    body: string;
    items: SupportService[];
  };
}

export const studentSupportContent: StudentSupportContent = {
  hero: {
    eyebrow: 'Student Support',
    title: 'Guidance Every Step',
    subtitle: 'From navigating coursework to college admissions and personal wellness, our comprehensive support network ensures every student thrives.',
  },
  services: {
    sectionLabel: 'Our Services',
    heading: 'Dedicated Support Network',
    body: 'Select a service below to learn how we help our students achieve their academic and personal goals.',
    items: [
      {
        id: 'academic-advising',
        title: 'Academic Advising',
        iconId: 'book',
        description: 'Every student at Stanford OHS is assigned a dedicated Academic Advisor who provides individualized guidance on course selection, study skills, and long-term academic planning.',
        features: ['Personalized course planning', 'Time management coaching', 'Academic performance monitoring', 'Homeroom and regional community building'],
        ctaLabel: 'Book Advising Appointment',
        ctaLink: '#book-advising',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
        accentBg: 'bg-digital-blue',
        accentText: 'text-digital-blue',
      },
      {
        id: 'college-counseling',
        title: 'College Counseling',
        iconId: 'grad-cap',
        description: 'Our expert College Counselors guide students and families through the complex university admissions process, from identifying right-fit colleges to polishing personal statements.',
        features: ['One-on-one college list development', 'Application essay writing workshops', 'University representative visits', 'Alumni networking and panels'],
        ctaLabel: 'Schedule College Counseling',
        ctaLink: '#book-college',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
        accentBg: 'bg-cardinal-red',
        accentText: 'text-cardinal-red',
      },
      {
        id: 'counseling-wellness',
        title: 'Counseling & Wellness',
        iconId: 'heart',
        description: 'We prioritize the holistic well-being of our students. Our Counseling & Wellness team offers confidential, short-term personal counseling, psychoeducation, and wellness initiatives.',
        features: ['Confidential emotional support', 'Stress management workshops', 'Crisis intervention and referrals', 'Parent/guardian educational webinars'],
        ctaLabel: 'Contact Wellness Team',
        ctaLink: '#contact-wellness',
        imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80',
        accentBg: 'bg-sand',
        accentText: 'text-black',
      },
      {
        id: 'writing-tutoring',
        title: 'Writing & Tutoring Center',
        iconId: 'pen',
        description: 'The Writing and Tutoring Center (WTC) provides peer and professional tutoring across all subjects. Whether you need help brainstorming an essay or solving a physics problem, the WTC is here to help.',
        features: ['Drop-in peer tutoring', 'Scheduled professional writing feedback', 'Math and science problem-solving sessions', 'Study groups and collaborative reviews'],
        ctaLabel: 'Visit the WTC',
        ctaLink: '#visit-wtc',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80',
        accentBg: 'bg-black',
        accentText: 'text-black',
      },
    ]
  }
};
