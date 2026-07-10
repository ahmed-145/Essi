const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function main() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  console.log("Step 1: Fetching download page to get xid...");
  try {
    const downloadPageRes = await fetch('https://apkcombo.com/nubi/nobi.nobi/download/apk', {
      headers: { 'User-Agent': userAgent }
    });
    const html = await downloadPageRes.text();
    
    // Extract xid
    const xidMatch = html.match(/var xid\s*=\s*"([^"]+)"/);
    if (!xidMatch) {
      console.error("Failed to extract xid from page!");
      process.exit(1);
    }
    const xid = xidMatch[1];
    console.log(`Extracted xid: ${xid}`);

    console.log("Step 2: Sending POST to fetch variants HTML...");
    // Simulate FormData
    const params = new URLSearchParams();
    params.append("package_name", "nobi.nobi");
    params.append("version", "");

    const dlRes = await fetch(`https://apkcombo.com/nubi/nobi.nobi/${xid}/dl`, {
      method: 'POST',
      headers: { 
        'User-Agent': userAgent,
        'Referer': 'https://apkcombo.com/nubi/nobi.nobi/download/apk'
      },
      body: params
    });

    const dlHtml = await dlRes.text();
    console.log(`Fetched variants HTML. Length: ${dlHtml.length}`);

    // Parse variants HTML using cheerio
    const $ = cheerio.load(dlHtml);
    const variantLink = $('a.variant').attr('href');
    if (!variantLink) {
      console.error("Failed to find any variant links in the response!");
      console.log("HTML response snippet:", dlHtml.substring(0, 500));
      process.exit(1);
    }
    console.log(`Found base variant link: ${variantLink}`);

    console.log("Step 3: Checking in to get access parameters...");
    const checkinRes = await fetch('https://apkcombo.com/checkin', {
      method: 'POST',
      headers: {
        'User-Agent': userAgent,
        'Referer': 'https://apkcombo.com/nubi/nobi.nobi/download/apk'
      }
    });
    const checkinText = await checkinRes.text();
    console.log(`Checkin token: ${checkinText}`);

    // Combine to get final link
    const finalLink = `${variantLink}&${checkinText}&package_name=nobi.nobi&lang=en`;
    console.log(`Generated Final Download Link: ${finalLink}`);

    const apkPath = path.join(__dirname, 'nobi.apk');
    console.log(`Downloading APK file to: ${apkPath}...`);

    const file = fs.createWriteStream(apkPath);
    
    // Download helper that supports redirects
    function downloadFile(url) {
      const parsedUrl = new URL(url);
      const req = https.get({
        host: parsedUrl.host,
        path: parsedUrl.pathname + parsedUrl.search,
        headers: {
          'User-Agent': userAgent,
          'Referer': 'https://apkcombo.com/'
        }
      }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          console.log(`Redirecting to: ${response.headers.location}`);
          downloadFile(response.headers.location);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log("✅ APK DOWNLOAD COMPLETE!");
            process.exit(0);
          });
        } else {
          console.error(`Failed to download. Status code: ${response.statusCode}`);
          process.exit(1);
        }
      });

      req.on('error', (err) => {
        fs.unlink(apkPath, () => {});
        console.error("Download failed:", err.message);
        process.exit(1);
      });
    }

    downloadFile(finalLink);

  } catch (error) {
    console.error("Execution failed:", error.message);
    process.exit(1);
  }
}

main();
