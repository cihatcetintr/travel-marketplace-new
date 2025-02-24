import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_DIR = IMAGES_DIR;

async function optimizeImage(filename: string) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, filename);

  await sharp(inputPath)
    .resize(800, 600, { // tour kartları için uygun boyut
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 }) // kalite/boyut optimizasyonu
    .toFile(outputPath);

  console.log(`Optimized: ${filename}`);
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await optimizeImage(file);
    }
  }
}

main().catch(console.error); 