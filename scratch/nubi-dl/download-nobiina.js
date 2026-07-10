const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function main() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  console.log("Step 1: Fetching Nobiina download page...");
  try {
    const resPage = await fetch('https://apkcombo.com/nobiina-nubian-dictionary/com.Squaresumgames.Nobiina/download/apk', {
      headers: { 'User-Agent': userAgent }
    });
    const html = await resPage.text();
    console.log(`Fetched HTML length: ${html.length}`);
    
    const xidMatch = html.match(/var xid\s*=\s*"([^"]+)"/);
    console.log(`xidMatch:`, xidMatch ? `Found xid: ${xidMatch[1]}` : `null`);
    
    if (!xidMatch) {
      console.error("Failed to extract xid!");
      process.exit(1);
    }
    const xid = xidMatch[1];
    console.log(`Extracted xid: ${xid}`);

    console.log("Step 2: Sending POST to fetch variants HTML...");
    const params = new URLSearchParams();
    params.append("package_name", "com.Squaresumgames.Nobiina");
    params.append("version", "");

    const dlRes = await fetch(`https://apkcombo.com/nobiina-nubian-dictionary/com.Squaresumgames.Nobiina/${xid}/dl`, {
      method: 'POST',
      headers: { 
        'User-Agent': userAgent,
        'Referer': 'https://apkcombo.com/nobiina-nubian-dictionary/com.Squaresumgames.Nobiina/download/apk'
      },
      body: params
    });

    const dlHtml = await dlRes.text();
    console.log(`Fetched variants HTML. Length: ${dlHtml.length}`);

    const $ = cheerio.load(dlHtml);
    const variantLink = $('a.variant').attr('href');
    if (!variantLink) {
      console.error("No variant link found!");
      process.exit(1);
    }
    console.log(`Found base variant link: ${variantLink}`);

    console.log("Step 3: Checking in...");
    const checkinRes = await fetch('https://apkcombo.com/checkin', {
      method: 'POST',
      headers: {
        'User-Agent': userAgent,
        'Referer': 'https://apkcombo.com/nobiina-nubian-dictionary/com.Squaresumgames.Nobiina/download/apk'
      }
    });
    const checkinText = await checkinRes.text();
    console.log(`Checkin token: ${checkinText}`);

    const finalLink = `${variantLink}&${checkinText}&package_name=com.Squaresumgames.Nobiina&lang=en`;
    console.log(`Final Download Link: ${finalLink}`);

    // Rewrite to apkpure.net to bypass 403
    const rewrittenLink = finalLink.replace('apkpure.com', 'apkpure.net').replace('pureapk.com', 'pureapk.net');
    console.log(`Rewritten Download Link: ${rewrittenLink}`);

    const apkPath = path.join(__dirname, 'nobiina.apk');
    console.log(`Downloading APK file to: ${apkPath}...`);

    const file = fs.createWriteStream(apkPath);
    
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
          const redirectUrl = response.headers.location.replace('apkpure.com', 'apkpure.net').replace('pureapk.com', 'pureapk.net');
          console.log(`Redirecting to: ${redirectUrl}`);
          downloadFile(redirectUrl);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log("✅ NOBIINA APK DOWNLOAD COMPLETE!");
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

    downloadFile(rewrittenLink);

  } catch (error) {
    console.error("Execution failed:", error.message);
    process.exit(1);
  }
}

main();
