import universitiesData from '../content/alumni/alumni-universities.json';

export interface University {
  id: number;
  name: string;
  countryCode: string;
  countryName: string;
  alumniCount: number;
}

export interface CountryAlumniData {
  countryCode: string;
  countryName: string;
  totalAlumni: number;
  universities: University[];
}

// Real alumni data imported from editable JSON
export const realAlumniData: University[] = universitiesData as University[];

// Calculate country data with total alumni counts
export const getCountryAlumniData = (): CountryAlumniData[] => {
  const countryMap = new Map<string, CountryAlumniData>();

  realAlumniData.forEach(university => {
    const { countryCode, countryName } = university;
    
    if (!countryMap.has(countryCode)) {
      countryMap.set(countryCode, {
        countryCode,
        countryName,
        totalAlumni: 0,
        universities: []
      });
    }

    const countryData = countryMap.get(countryCode)!;
    countryData.totalAlumni += university.alumniCount;
    countryData.universities.push(university);
  });

  return Array.from(countryMap.values());
};

// Function to get universities by country code
export const getUniversitiesByCountry = (countryCode: string): University[] => {
  return realAlumniData.filter(university => university.countryCode === countryCode);
};

// Function to get total alumni count
export const getTotalAlumniCount = (): number => {
  return realAlumniData.reduce((total, university) => total + university.alumniCount, 0);
};

// Function to get total number of universities
export const getTotalUniversityCount = (): number => {
  return realAlumniData.length;
};

// Function to get total number of countries
export const getTotalCountryCount = (): number => {
  const uniqueCountries = new Set(realAlumniData.map(university => university.countryCode));
  return uniqueCountries.size;
};

// Legacy interface and data for backward compatibility (now using real data)
export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  university: string;
  major: string;
  countryCode: string;
  image?: string;
}

// Legacy function for backward compatibility
export const getAlumniByCountry = (countryCode: string): University[] => {
  return getUniversitiesByCountry(countryCode);
};
