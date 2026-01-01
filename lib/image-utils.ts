import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Detects the correct file extension for an image by checking what exists
 * Supports .jpg, .jpeg, .png, .PNG, .JPG, .JPEG
 */
export function getImageWithExtension(basePath: string): string {
  const extensions = ['.jpg', '.jpeg', '.png', '.PNG', '.JPG', '.JPEG'];

  for (const ext of extensions) {
    const fullPath = join(process.cwd(), 'public', basePath + ext);
    if (existsSync(fullPath)) {
      return basePath + ext;
    }
  }

  // Fallback to .jpg if nothing found
  return basePath + '.jpg';
}

/**
 * Process an array of image paths, auto-detecting extensions
 */
export function processImagePaths(imagePaths: string[]): string[] {
  return imagePaths.map(path => {
    // Remove existing extension if any
    const basePath = path.replace(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/i, '');
    return getImageWithExtension(basePath);
  });
}