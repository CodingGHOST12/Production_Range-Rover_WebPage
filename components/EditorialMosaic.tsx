import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import EditorialMosaicUI from './EditorialMosaicUI';

export interface ImageData {
  src: string;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait' | 'square';
  score: number;
}

export default function EditorialMosaic() {
  const imagesDir = path.join(process.cwd(), 'public', 'sequence', 'images');
  let imagesData: ImageData[] = [];

  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      
      files
        .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
        .forEach(file => {
          const filePath = path.join(imagesDir, file);
          try {
            const buffer = fs.readFileSync(filePath);
            const dimensions = sizeOf(buffer);
            if (dimensions && dimensions.width && dimensions.height) {
              const { width, height } = dimensions;
              
              // Calculate orientation
              let orientation: 'landscape' | 'portrait' | 'square' = 'square';
              const ratio = width / height;
              if (ratio > 1.1) orientation = 'landscape';
              else if (ratio < 0.9) orientation = 'portrait';

              // Heuristic score for visual impact:
              // Prioritize extreme aspect ratios (very wide or very tall) and total resolution (sharpness/quality)
              const extremeFactor = Math.max(ratio, 1/ratio);
              const resolution = width * height;
              let score = resolution * (extremeFactor * 1.5); // Weight aspect ratio heavily for hero impact

              // User requested manual override: Force this specific image to be the primary Hero (Slot 0)
              if (file.includes('ce050914142409a1c0e76debf5d93a91')) {
                score = 999999999999;
                // Coerce orientation to landscape so it perfectly fits the massive top Slot 0
                orientation = 'landscape';
              }

              imagesData.push({
                src: `/sequence/images/${file}`,
                width,
                height,
                orientation,
                score
              });
            }
          } catch (e) {
            // Ignore unreadable images silently
          }
        });
        
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }

  if (imagesData.length === 0) {
    return null;
  }

  return <EditorialMosaicUI images={imagesData} />;
}
