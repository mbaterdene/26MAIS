/**
 * Archive Store - Handles archive/yearbook data and image URL generation
 * 
 * For Google Drive image loading, this module:
 * 1. Generates direct preview URLs using Google Drive's public sharing
 * 2. Caches file lookups to avoid repeated API calls
 * 3. Provides fallback URLs if files aren't found
 */

// In-memory cache for folder file mappings
// In production, this should be persisted to a database
const folderFileCache = new Map();

/**
 * Generates a Google Drive direct preview URL
 * URL format: https://drive.google.com/uc?id=FILE_ID&export=view
 * This works for files shared with "Viewer" access
 * 
 * @param {string} fileId - The Google Drive file ID
 * @returns {string} Direct preview URL
 */
export function generateGoogleDrivePreviewUrl(fileId) {
  if (!fileId) {
    throw new Error("File ID is required");
  }
  return `https://drive.google.com/uc?id=${fileId}&export=view`;
}

/**
 * Gets the file ID for a page in a yearbook
 * 
 * For production deployment:
 * 1. Store file IDs in your archive.json or database
 * 2. Use Google Drive API to list files in folders (requires authentication)
 * 3. Cache the results to minimize API calls
 * 
 * @param {string} driveFolder - Google Drive folder ID
 * @param {string} filename - Filename to lookup (e.g., "1.jpg", "front.jpg")
 * @returns {Promise<string|null>} File ID or null if not found
 */
export async function getFileIdFromDriveFolder(driveFolder, filename) {
  const cacheKey = `${driveFolder}:${filename}`;
  
  // Check cache first
  if (folderFileCache.has(cacheKey)) {
    return folderFileCache.get(cacheKey);
  }

  // TODO: Implement Google Drive API integration
  // This requires:
  // 1. Google Drive API credentials (service account)
  // 2. Folder shared with the service account
  // 3. Query the Google Drive API to find file by name
  
  // For now, return null - you'll need to set up file IDs
  // TEMPORARY SOLUTION: Update archive.json with fileIds for each page
  console.warn(`File lookup not implemented: ${driveFolder}/${filename}`);
  return null;
}

/**
 * Gets an image URL for a specific page in a yearbook
 * 
 * @param {string} driveFolder - Google Drive folder ID containing the pages
 * @param {string} filename - Page filename (e.g., "front.jpg", "1.jpg")
 * @returns {Promise<string>} Image URL or error message URL
 */
export async function getArchivePageImageUrl(driveFolder, filename) {
  try {
    const fileId = await getFileIdFromDriveFolder(driveFolder, filename);
    
    if (!fileId) {
      // If we don't have the file ID, return a URL that will trigger
      // the error handler in the frontend
      console.warn(`No file ID found for ${driveFolder}/${filename}`);
      return null;
    }

    return generateGoogleDrivePreviewUrl(fileId);
  } catch (error) {
    console.error(`Error getting archive image URL: ${error.message}`);
    return null;
  }
}

/**
 * Batch get image URLs for multiple pages
 * Useful for preloading nearby pages
 * 
 * @param {string} driveFolder - Google Drive folder ID
 * @param {string[]} filenames - Array of filenames to fetch
 * @returns {Promise<Object>} Map of filename to URL
 */
export async function getArchivePageImageUrls(driveFolder, filenames) {
  const results = {};
  
  for (const filename of filenames) {
    const url = await getArchivePageImageUrl(driveFolder, filename);
    if (url) {
      results[filename] = url;
    }
  }

  return results;
}

/**
 * SETUP INSTRUCTIONS FOR GOOGLE DRIVE INTEGRATION
 * 
 * To make the yearbook images load from Google Drive:
 * 
 * OPTION 1: Store File IDs in archive.json (Simplest)
 * ────────────────────────────────────────────────
 * 1. For each page in your yearbooks, get the Google Drive file ID
 * 2. Update archive.json to include fileIds in pageMapping:
 * 
 *    "pageMapping": {
 *      "front": { "filename": "front.jpg", "fileId": "1A2B3C..." },
 *      "startPage": 1,
 *      "endPage": 147,
 *      "back": { "filename": "back.jpg", "fileId": "2X3Y4Z..." }
 *    }
 * 
 * 3. Update the frontend ImageGallery.tsx to use these IDs
 * 
 * 
 * OPTION 2: Google Drive API Integration (More Flexible)
 * ───────────────────────────────────────────────────────
 * 1. Create a Google Cloud service account:
 *    - Go to https://console.cloud.google.com/
 *    - Create a new project
 *    - Create a Service Account
 *    - Download the credentials JSON
 * 
 * 2. Share your yearbook folders with the service account email
 * 
 * 3. Add credentials to backend environment:
 *    GOOGLE_DRIVE_API_KEY=your_service_account_json
 * 
 * 4. Install Google Drive API client:
 *    npm install googleapis
 * 
 * 5. Implement in archiveStore.js:
 *    - Initialize Drive API client
 *    - Query for files by name in folders
 *    - Cache results in database or memory
 * 
 * 
 * OPTION 3: Use Public Drive Links (Easiest for Demo)
 * ──────────────────────────────────────────────────
 * 1. Make sure all yearbook files are shared as "Anyone with link"
 * 2. Get each file's sharing link
 * 3. Extract the file ID from the link
 * 4. Store file IDs in database or archive.json
 * 5. Use generateGoogleDrivePreviewUrl(fileId) to create URLs
 */
