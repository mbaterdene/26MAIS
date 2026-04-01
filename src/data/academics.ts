export interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: string;
}

export interface GraduationRequirement {
  id: string;
  subject: string;
  years: number;
}

export interface AcademicsPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  middleSchool: {
    sectionLabel: string;
    heading: string;
    body: string;
    imageUrl: string;
  };
  philosophy: {
    sectionLabel: string;
    heading: string;
    body: string;
    imageUrl: string;
  };
  catalog: {
    sectionLabel: string;
    heading: string;
    courses: CourseItem[];
    categories: string[];
  };
  schedule: {
    sectionLabel: string;
    heading: string;
    body: string;
  };
  requirements: {
    sectionLabel: string;
    heading: string;
    totalCredits: number;
    items: GraduationRequirement[];
  };
}

export const academicsContent: AcademicsPageContent = {
  hero: {
    eyebrow: 'Academics',
    title: 'Intellectual Rigor',
    subtitle: 'A university-style curriculum pushing students to think more clearly and argue more honestly.',
  },
  middleSchool: {
    sectionLabel: 'Middle School',
    heading: 'Grade 7-8 Program',
    body: 'The Middle School curriculum introduces younger students to vibrant intellectual discourse through foundational courses in literature, logic, and scientific inquiry, preparing them for the rigors of our high school program.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80',
  },
  philosophy: {
    sectionLabel: 'Core Philosophy',
    heading: 'The Core Sequence',
    body: 'Central to the OHS experience is the Core sequence, required of all diploma students. Spanning multiple years, it immerses students in the history of science, methodology, political theory, and philosophical inquiry.',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80',
  },
  catalog: {
    sectionLabel: 'Course Catalog',
    heading: '40+ College-Level & Post-AP Courses',
    categories: ['Math', 'Science', 'Humanities', 'Core'],
    courses: [
      { id: 'math1', title: 'Multivariable Calculus', category: 'Math', level: 'Post-AP' },
      { id: 'math2', title: 'Linear Algebra', category: 'Math', level: 'Post-AP' },
      { id: 'sci1', title: 'Advanced Topics in Biological Research', category: 'Science', level: 'Post-AP' },
      { id: 'sci2', title: 'Modern Physics', category: 'Science', level: 'Post-AP' },
      { id: 'hum1', title: 'Advanced Literature Seminar', category: 'Humanities', level: 'College-Level' },
      { id: 'hum2', title: 'Global Historical Perspectives', category: 'Humanities', level: 'College-Level' },
      { id: 'core1', title: 'Methodology of Science', category: 'Core', level: 'Foundational' },
      { id: 'core2', title: 'History of Philosophy', category: 'Core', level: 'Advanced' },
    ],
  },
  schedule: {
    sectionLabel: 'Schedule',
    heading: 'College-Style Format',
    body: 'Flipped classrooms and live online seminars. Real-time intellectual engagement with PhD-level instructors.',
  },
  requirements: {
    sectionLabel: 'Graduation',
    heading: 'Diploma Requirements',
    totalCredits: 20,
    items: [
      { id: 'eng', subject: 'English', years: 4 },
      { id: 'math', subject: 'Mathematics', years: 3 },
      { id: 'sci', subject: 'Laboratory Science', years: 3 },
      { id: 'hist', subject: 'History / Social Science', years: 3 },
      { id: 'lang', subject: 'Foreign Language', years: 3 },
      { id: 'core', subject: 'Core Philosophy', years: 4 },
    ],
  },
};
