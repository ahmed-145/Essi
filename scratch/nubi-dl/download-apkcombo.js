const apk_dl = require('apk-dl');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function main() {
  console.log("Downloading nobi.nobi from APKCombo...");
  try {
    const app = await apk_dl.apkcombo.download('https://apkcombo.com/nubi/nobi.nobi/');
    console.log("App Details retrieved:", app);

    if (!app || !app.link) {
      console.error("No download link returned by APKCombo!");
      process.exit(1);
    }

    const apkPath = path.join(__dirname, 'nobi.apk');
    console.log(`Downloading APK to ${apkPath}...`);
    
    // APKCombo link might require headers or direct GET. Let's do a GET request.
    const file = fs.createWriteStream(apkPath);
    
    // Note: APKCombo download links are sometimes served via HTTP/HTTPS redirect
    const request = https.get(app.link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://apkcombo.com/'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to: ${response.headers.location}`);
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log("✅ Download complete (redirected)! Saved as nobi.apk");
            process.exit(0);
          });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log("✅ Download complete! Saved as nobi.apk");
          process.exit(0);
        });
      }
    });

    request.on('error', (err) => {
      fs.unlink(apkPath, () => {});
      console.error("Download request failed:", err.message);
      process.exit(1);
    });

  } catch (error) {
    console.error("An error occurred during retrieval:", error.message);
    process.exit(1);
  }
}

main();
