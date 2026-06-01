import sharp from "sharp";

const SIZE_THRESHOLD = 5 * 1024 * 1024; // 5MB
const COMPRESSION_QUALITY = 85;

/**
 * Compresses image if it exceeds 5MB using sharp.
 * Reduces to 85% JPEG quality with metadata stripped for privacy.
 * Returns original buffer on error or if below threshold.
 *
 * @param {Buffer} fileBuffer - Raw image file buffer
 * @returns {Promise<Buffer>} - Compressed or original buffer
 */
export async function compressImageIfNeeded(fileBuffer) {
  // Skip compression for small files
  if (fileBuffer.length <= SIZE_THRESHOLD) {
    return fileBuffer;
  }

  try {
    // Check if buffer is valid image data
    const metadata = await sharp(fileBuffer).metadata();
    if (!metadata) return fileBuffer;

    // Compress to JPEG at 85% quality, remove EXIF for privacy
    const compressed = await sharp(fileBuffer)
      .withMetadata(false) // Remove EXIF and other metadata
      .jpeg({ quality: COMPRESSION_QUALITY, progressive: true })
      .toBuffer();

    const originalMB = (fileBuffer.length / 1024 / 1024).toFixed(2);
    const compressedMB = (compressed.length / 1024 / 1024).toFixed(2);
    const reduction = (((fileBuffer.length - compressed.length) / fileBuffer.length) * 100).toFixed(1);

    console.log(
      `[imageProcessor] Compressed ${originalMB}MB → ${compressedMB}MB (${reduction}% reduction)`
    );

    return compressed;
  } catch (error) {
    console.error(`[imageProcessor] Compression failed, using original:`, error.message);
    // Fail gracefully — return original buffer if compression fails
    return fileBuffer;
  }
}
