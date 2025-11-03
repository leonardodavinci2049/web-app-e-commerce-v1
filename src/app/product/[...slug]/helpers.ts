/**
 * Helper utilities for product detail page
 * URL parsing and slug extraction functions
 */

/**
 * Extracts product ID from slug array
 * Expected formats:
 * - [id] -> id
 * - [category, id, name-slug] -> id
 * - [id, name-slug] -> id
 *
 * @param slugArray - Array of slug segments
 * @returns Product ID or null if invalid
 */
export function extractProductIdFromSlug(slugArray: string[]): string | null {
  if (!slugArray || slugArray.length === 0) {
    return null;
  }

  // If single segment, assume it's the ID
  if (slugArray.length === 1) {
    return slugArray[0];
  }

  // If multiple segments, try to find numeric ID
  // Usually it's the second segment [category, id, name] or first [id, name]
  for (const segment of slugArray) {
    const numericId = Number.parseInt(segment, 10);
    if (!Number.isNaN(numericId) && numericId > 0) {
      return segment;
    }
  }

  return null;
}

/**
 * Generates product slug from array
 * Takes the last segment as the name slug
 *
 * @param slugArray - Array of slug segments
 * @returns Product slug
 */
export function extractProductSlugFromArray(slugArray: string[]): string {
  if (!slugArray || slugArray.length === 0) {
    return "";
  }

  // Last segment is usually the product name slug
  return slugArray[slugArray.length - 1] || "";
}
