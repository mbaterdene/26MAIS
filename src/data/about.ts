export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    bgImage: string;
  };
  mission: {
    sectionLabel: string;
    heading: string;
    body: string;
    pillars: any[];
  };
  news: {
    sectionLabel: string;
    heading: string;
    items: NewsItem[];
  };
  tour: {
    sectionLabel: string;
    heading: string;
    body: string;
    videoPlaceholderUrl: string;
    galleryImages: string[];
  };
}

export const aboutContent: AboutPageContent = {
  hero: {
    eyebrow: 'About Stanford OHS',
    title: 'Redefining What',
    titleAccent: 'School Can Be.',
    subtitle: 'Stanford Online High School is a selective, diploma-granting independent school for exceptional students worldwide — built on the belief that rigorous academics and deep community belong together.',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80',
  },
  mission: {
    sectionLabel: 'Our Mission',
    heading: 'Why We Exist',
    body: 'Stanford OHS was founded on a single conviction: that intellectually exceptional students, wherever they are born, deserve an education that truly challenges and connects them.',
    pillars: [
      {
        id: 'intellect', num: '01', heading: 'Intellectual Rigor',
        body: 'We offer a university-style curriculum anchored by our Core philosophy sequence.',
        accentColor: 'text-cardinal-red', barColor: 'bg-cardinal-red',
      },
      {
        id: 'access', num: '02', heading: 'Global Access',
        body: 'Uniting the brightest young minds across 50+ countries into one vibrant community.',
        accentColor: 'text-digital-blue', barColor: 'bg-digital-blue',
      },
      {
        id: 'whole', num: '03', heading: 'The Whole Student',
        body: 'Ensuring every student thrives as a human being with our dedicated support structures.',
        accentColor: 'text-sand', barColor: 'bg-sand',
      },
    ],
  },
  news: {
    sectionLabel: 'Community News',
    heading: 'Latest Updates',
    items: [
      { id: '1', title: 'Stanford OHS Robotics Team Wins Regionals', category: 'Student Life', date: 'March 15, 2026', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80' },
      { id: '2', title: 'New Astronomy Course Added to Curriculum', category: 'Academics', date: 'March 10, 2026', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80' },
      { id: '3', title: 'Alumni Spotlight: Building the Future in Silicon Valley', category: 'Alumni', date: 'March 5, 2026', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80' },
      { id: '4', title: 'Global Homeroom Retreat Highlights', category: 'Community', date: 'February 28, 2026', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80' },
    ],
  },
  tour: {
    sectionLabel: 'Take the Tour',
    heading: 'Experience Our Campus',
    body: 'Explore our digital classrooms and global community through an immersive virtual tour.',
    videoPlaceholderUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80'
    ]
  }
};
