const cheerio = require('cheerio');

async function main() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  console.log("Fetching details page directly from APKCombo...");
  try {
    const res = await fetch('https://apkcombo.com/nubi/com.nubian.nubi/', {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      }
    });
    const html = await res.text();
    console.log("HTML length:", html.length);
    const $ = cheerio.load(html);
    
    // Find all links containing "download"
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      const cls = $(el).attr('class');
      if (href && (href.includes('download') || href.includes('apk'))) {
        console.log(`Link: ${href} | Text: ${text} | Class: ${cls}`);
      }
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

main();
