const cheerio = require('cheerio');

async function main() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  console.log("Fetching directly from APKCombo...");
  try {
    const res = await fetch('https://apkcombo.com/search/com.nubian.nubi', {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      }
    });
    const html = await res.text();
    console.log("HTML fetched successfully. Length:", html.length);
    const $ = cheerio.load(html);
    
    // Print all links
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const title = $(el).attr('title') || $(el).text().trim();
      if (href && (href.includes('com.nubian.nubi') || href.includes('nubi'))) {
        console.log(`Link: ${href} | Title: ${title}`);
      }
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

main();
