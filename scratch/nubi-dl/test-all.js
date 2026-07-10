const cheerio = require('cheerio');

async function main() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  console.log("Fetching all details links...");
  try {
    const res = await fetch('https://apkcombo.com/nubi/com.nubian.nubi/', {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Print all links
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (href) {
        console.log(`Link: ${href} | Text: ${text}`);
      }
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

main();
