#!/usr/bin/env node

/**
 * Generate Archive File ID Mappings from Google Drive
 * 
 * This script:
 * 1. Reads archive.json to get Drive folder IDs
 * 2. Lists all files in each folder using Google Drive API
 * 3. Creates fileIdMap entries for each page
 * 4. Updates archive.json with complete mappings
 * 
 * Setup:
 * 1. Create a Google Cloud service account: https://console.cloud.google.com/
 * 2. Download the service account JSON key
 * 3. Share your yearbook folders with the service account email
 * 4. Set GOOGLE_DRIVE_CREDENTIALS env var to the path of the JSON file
 * 
 * Usage:
 *   GOOGLE_DRIVE_CREDENTIALS=path/to/credentials.json node scripts/generate-archive-file-ids.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const archivePath = path.join(projectRoot, 'src', 'content', 'archive.json');

// Check for credentials
const credentialsPath = process.env.GOOGLE_DRIVE_CREDENTIALS;
if (!credentialsPath) {
  console.error('❌ Error: GOOGLE_DRIVE_CREDENTIALS environment variable not set');
  console.error('Set it to the path of your Google service account JSON file');
  console.error('');
  console.error('Usage:');
  console.error('  GOOGLE_DRIVE_CREDENTIALS=/path/to/credentials.json node scripts/generate-archive-file-ids.js');
  console.error('');
  console.error('To get credentials:');
  console.error('  1. Go to https://console.cloud.google.com/');
  console.error('  2. Create a Service Account');
  console.error('  3. Create a JSON key');
  console.error('  4. Share your Drive folders with the service account email');
  process.exit(1);
}

if (!fs.existsSync(credentialsPath)) {
  console.error(`❌ Credentials file not found: ${credentialsPath}`);
  process.exit(1);
}

// Check archive.json exists
if (!fs.existsSync(archivePath)) {
  console.error(`❌ Archive file not found: ${archivePath}`);
  process.exit(1);
}

console.log('📚 Archive File ID Generator');
console.log('════════════════════════════\n');

try {
  // Try to import and use google-auth-library
  const { google } = await import('googleapis');
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });
  const archiveData = JSON.parse(fs.readFileSync(archivePath, 'utf-8'));

  let updatedBooks = 0;

  for (const book of archiveData.books) {
    console.log(`\n📖 Processing: ${book.title_en}`);
    console.log(`   Folder: ${book.driveFolder}`);

    try {
      // List all files in the folder
      const res = await drive.files.list({
        q: `'${book.driveFolder}' in parents and trashed=false`,
        spaces: 'drive',
        fields: 'files(id, name, mimeType)',
        pageSize: 1000,
      });

      const files = res.data.files || [];
      console.log(`   Found ${files.length} files`);

      if (files.length === 0) {
        console.warn(`   ⚠️  No files found in this folder`);
        continue;
      }

      // Filter image files and create mapping
      const imageFiles = files.filter(f => 
        !f.mimeType.includes('folder') && 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name)
      );

      console.log(`   Found ${imageFiles.length} image files`);

      if (imageFiles.length === 0) {
        console.warn(`   ⚠️  No image files found`);
        continue;
      }

      // Sort by filename for consistent ordering
      imageFiles.sort((a, b) => a.name.localeCompare(b.name));

      // Create fileIdMap
      const fileIdMap = {};
      let frontFound = false;
      let backFound = false;

      for (const file of imageFiles) {
        const filename = file.name.toLowerCase();
        
        // Map front and back covers
        if (filename.includes('front') || filename === 'front.jpg') {
          book.pageMapping.frontFileId = file.id;
          frontFound = true;
          console.log(`   ✓ Front cover: ${file.name}`);
        } else if (filename.includes('back') || filename === 'back.jpg') {
          book.pageMapping.backFileId = file.id;
          backFound = true;
          console.log(`   ✓ Back cover: ${file.name}`);
        } else {
          // Map numbered pages
          fileIdMap[file.name] = file.id;
        }
      }

      // Add fileIdMap to pageMapping
      book.pageMapping.fileIdMap = fileIdMap;

      if (!frontFound) console.warn(`   ⚠️  Front cover not found`);
      if (!backFound) console.warn(`   ⚠️  Back cover not found`);

      console.log(`   ✓ Mapped ${Object.keys(fileIdMap).length} pages`);
      updatedBooks++;

    } catch (error) {
      console.error(`   ❌ Error processing folder: ${error.message}`);
    }
  }

  // Write updated archive.json
  console.log('\n💾 Updating archive.json...');
  fs.writeFileSync(
    archivePath,
    JSON.stringify(archiveData, null, 2) + '\n'
  );

  console.log('\n✅ Success!');
  console.log(`   Updated ${updatedBooks} book(s)`);
  console.log(`   File: ${archivePath}`);
  console.log('\n🎉 Archive file IDs have been generated and saved!');
  console.log('   Your yearbook pages will now load from Google Drive.');

} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('❌ Google APIs library not installed');
    console.error('\nInstall it with:');
    console.error('  npm install googleapis');
    process.exit(1);
  } else {
    console.error('❌ Error:', error.message);
    if (error.message.includes('permission')) {
      console.error('\n💡 Tip: Make sure you shared the Drive folders with the service account email');
      console.error('   Check the service account email in your credentials JSON');
    }
    process.exit(1);
  }
}
