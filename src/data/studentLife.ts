export interface Club {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface EventTimeline {
  id: string;
  title: string;
  season: string;
  description: string;
  imageUrl: string;
  accentBg: string;
  accentText: string;
}

export interface StudentLifePageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  clubs: {
    sectionLabel: string;
    heading: string;
    body: string;
    items: Club[];
  };
  events: {
    sectionLabel: string;
    heading: string;
    timeline: EventTimeline[];
  };
}

export const studentLifeContent: StudentLifePageContent = {
  hero: {
    eyebrow: 'Student Life',
    title: 'Vibrant & Digital Native',
    subtitle: 'Being online never means being alone. Discover our dynamic virtual campus and robust global community.',
  },
  clubs: {
    sectionLabel: 'Clubs & Community',
    heading: '60+ Student-run Clubs',
    body: 'From Student Government to Model UN, our students lead over 60 active clubs, fostering leadership and shared passions across borders.',
    items: [
      { id: '1', name: 'Model United Nations', category: 'Academic', image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80' },
      { id: '2', name: 'Student Government', category: 'Leadership', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80' },
      { id: '3', name: 'Robotics & Engineering', category: 'STEM', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80' },
      { id: '4', name: 'Literary Magazine', category: 'Arts', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80' },
      { id: '5', name: 'Astronomy Club', category: 'STEM', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80' },
      { id: '6', name: 'Debate Society', category: 'Academic', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80' },
    ],
  },
  events: {
    sectionLabel: 'Annual Traditions',
    heading: 'Events Timeline',
    timeline: [
      {
        id: '1', title: 'Summer @ Stanford', season: 'August',
        description: 'Students from around the world gather on the Stanford University campus for two weeks of intensive study, bonding, and residential campus living before the academic year begins.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
        accentBg: 'bg-cardinal-red', accentText: 'text-white'
      },
      {
        id: '2', title: 'Homeroom Retreats', season: 'October',
        description: 'Regional gatherings organized by academic advisors, where students in the same geographical area meet in person for weekend team-building and exploration.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
        accentBg: 'bg-digital-blue', accentText: 'text-white'
      },
      {
        id: '3', title: 'Spirit Week', season: 'February',
        description: 'A beloved virtual tradition featuring digital escape rooms, costume contests over video, esports tournaments, and competitive house cup challenges.',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
        accentBg: 'bg-cardinal-red', accentText: 'text-white'
      },
      {
        id: '4', title: 'Student Travel', season: 'Spring Break',
        description: 'Faculty-led academic excursions across the globe, from studying biodiversity in Costa Rica to exploring classical history in Greece and Italy.',
        imageUrl: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80',
        accentBg: 'bg-digital-blue', accentText: 'text-white'
      },
      {
        id: '5', title: 'Graduation', season: 'June',
        description: 'The spectacular culminating event where seniors and their families travel to Stanford University for the formal commencement ceremony.',
        imageUrl: 'https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?auto=format&fit=crop&q=80',
        accentBg: 'bg-black', accentText: 'text-white'
      }
    ]
  }
};
