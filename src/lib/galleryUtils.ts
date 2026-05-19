/**
 * Shared Gallery Utilities
 * Contains common helper functions used by both FlipBookGallery and ImageGallery
 */

import { PageMapping } from './archive-types';

/**
 * Generates a Google Drive thumbnail URL from a file ID.
 * Uses the /thumbnail endpoint which serves images publicly without
 * authentication or cookies.
 */
export function getDriveUrl(fileId: string, size: 'w1200' | 'w1600' = 'w1200'): string {
  if (!fileId) return '';
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
}

/**
 * Gets the filename for a given page index.
 * Handles custom naming: front.jpg, startPage-endPage numbered, back.jpg
 */
export function getPageFilename(pageIndex: number, pageMapping: PageMapping): string {
  if (pageIndex === 0) return pageMapping.front;
  
  const lastIndex = pageMapping.endPage - pageMapping.startPage + 2;
  if (pageIndex === lastIndex) return pageMapping.back;
  
  const pageNumber = pageMapping.startPage + (pageIndex - 1);
  return `${pageNumber}.jpg`;
}

/**
 * Gets the file ID for a given page index using the PageMapping.
 * Looks up the file ID from the fileIdMap, or uses front/backFileId if available.
 */
export function getFileId(pageIndex: number, pageMapping: PageMapping): string | null {
  const filename = getPageFilename(pageIndex, pageMapping);
  
  // Check if filename is in the fileIdMap
  if (pageMapping.fileIdMap?.[filename]) {
    return pageMapping.fileIdMap[filename];
  }
  
  // Check if it's the front or back page
  if (filename === pageMapping.front && pageMapping.frontFileId) {
    return pageMapping.frontFileId;
  }
  if (filename === pageMapping.back && pageMapping.backFileId) {
    return pageMapping.backFileId;
  }
  
  return null;
}

/**
 * Preloads an image using a new Image object.
 * Returns a promise that resolves when the image loads or rejects on error.
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

/**
 * Hook for managing gallery navigation state (used by both galleries)
 * Handles keyboard navigation with arrow keys
 */
export function setupKeyboardNavigation(
  onPrevious: () => void,
  onNext: () => void,
  excludeSelector?: string
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Skip if typing in an input/textarea
    if (excludeSelector && (e.target as HTMLElement).matches(excludeSelector)) {
      return;
    }
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNext();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Calculate page preload range based on current index
 * Returns array of indices to preload
 */
export function calculatePreloadRange(
  currentIndex: number,
  totalPages: number,
  preloadRange: number = 3
): number[] {
  const indicesToLoad = new Set<number>();
  
  // Always load current page
  indicesToLoad.add(currentIndex);
  
  // Load pages ahead
  for (let i = 1; i <= preloadRange; i++) {
    if (currentIndex + i < totalPages) {
      indicesToLoad.add(currentIndex + i);
    }
  }
  
  // Load previous page
  if (currentIndex > 0) {
    indicesToLoad.add(currentIndex - 1);
  }
  
  return Array.from(indicesToLoad).sort((a, b) => a - b);
}
