export interface PageMapping {
  front: string;
  frontFileId?: string;
  startPage: number;
  endPage: number;
  back: string;
  backFileId?: string;
  fileIdMap?: Record<string, string>; // Maps filenames to Google Drive file IDs
}

export interface ArchiveBook {
  id: string;
  title_en: string;
  title_mn: string;
  category: 'yearbook' | 'study-guide' | 'publication' | 'collection';
  driveFolder: string;
  pageMapping: PageMapping;
  pageCount: number;
  thumbnailUrl: string;
  accessLevel: 'public' | 'restricted';
  downloadUrl?: string;
}

export interface ArchiveData {
  books: ArchiveBook[];
}
