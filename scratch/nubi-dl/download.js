const apk_dl = require('apk-dl');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function main() {
  console.log("Searching Aptoide for com.nubian.nubi...");
  try {
    const app = await apk_dl.aptoide.download('com.nubian.nubi');
    console.log("Found App details:", app);
    
    if (!app || !app.link) {
      console.error("No download link found for com.nubian.nubi on Aptoide!");
      process.exit(1);
    }

    const apkPath = path.join(__dirname, 'nubi.apk');
    console.log(`Downloading APK from: ${app.link} to ${apkPath}...`);
    
    const file = fs.createWriteStream(apkPath);
    https.get(app.link, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log("✅ Download complete! File saved as:", apkPath);
        process.exit(0);
      });
    }).on('error', (err) => {
      fs.unlink(apkPath, () => {});
      console.error("Error downloading file:", err.message);
      process.exit(1);
    });

  } catch (error) {
    console.error("An error occurred during retrieval:", error.message);
    process.exit(1);
  }
}

main();
