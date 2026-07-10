const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Resolve path to the static ffmpeg binary
const ffmpegPath = require('ffmpeg-static');
console.log(`Using static ffmpeg binary at: ${ffmpegPath}`);

const audioDir = path.resolve(__dirname, '../../assets/audio');
console.log(`Scanning audio directory: ${audioDir}`);

if (!fs.existsSync(audioDir)) {
  console.error("Audio directory does not exist!");
  process.exit(1);
}

const files = fs.readdirSync(audioDir);
const oggFiles = files.filter(f => f.endsWith('.ogg'));

console.log(`Found ${oggFiles.length} .ogg files to convert.`);

for (const file of oggFiles) {
  const sourcePath = path.join(audioDir, file);
  const destFile = file.replace('.ogg', '.mp3');
  const destPath = path.join(audioDir, destFile);
  
  console.log(`Converting ${file} -> ${destFile}...`);
  try {
    // Convert to MP3
    // -y overrides output files
    execSync(`"${ffmpegPath}" -y -i "${sourcePath}" "${destPath}"`, { stdio: 'ignore' });
    
    // Check if MP3 was created successfully
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      console.log(`  ✓ Successfully converted. Deleting original ${file}...`);
      fs.unlinkSync(sourcePath);
    } else {
      console.error(`  ✗ Failed to create valid MP3 for ${file}`);
    }
  } catch (err) {
    console.error(`  ✗ Error converting ${file}:`, err.message || err);
  }
}

console.log("All audio conversions completed!");
