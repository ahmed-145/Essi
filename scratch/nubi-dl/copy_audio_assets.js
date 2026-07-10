const fs = require('fs');
const path = require('path');

const mappings = {
  'xnz_0001': '79.ogg',    // ay
  'xnz_0002': '765.ogg',   // ir
  'xnz_0003': '1383.ogg',  // tar
  'xnz_0010': '763.ogg',   // id
  'xnz_0011': '283.ogg',   // buru
  'xnz_0012': '74.ogg',    // éen
  'xnz_0013': '203.ogg',   // baab
  'xnz_0042': '622.ogg',   // essi
  'xnz_0043': '746.ogg',   // ig
  'xnz_0044': '1297.ogg',  // seer
  'xnz_0050': '1079.ogg',  // nal
  'xnz_0051': '1836.ogg',  // jom
  'xnz_0020': '1165.ogg',  // wer-i
  'xnz_0021': '525.ogg',   // kege-di (dawwi placeholder)
  'xnz_0022': '89.ogg',    // assi
  'xnz_0023': '90.ogg',    // ar
  'xnz_0024': '766.ogg',   // irgu
  'xnz_0025': '1391.ogg',  // tir
  'xnz_0030': '810.ogg',   // darbad (kaj placeholder)
  'xnz_0031': '1473.ogg',  // ewre (tii placeholder)
  'xnz_0032': '629.ogg',   // kaj (eged placeholder)
  'xnz_0033': '1040.ogg',  // sa:b (moug placeholder)
  'xnz_0034': '450.ogg',   // gur (gor placeholder)
  'xnz_0045': '969.ogg',   // esked (mashar placeholder)
  'xnz_0046': '100.ogg'    // aman
};

const srcDir = path.join(__dirname, '..', 'nobiina_rebuilt_ogg');
const destDir = path.join(__dirname, '..', '..', 'assets', 'audio');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let count = 0;
for (const [id, srcFile] of Object.entries(mappings)) {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(destDir, `${id}.ogg`);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${srcFile} -> ${id}.ogg`);
    count++;
  } else {
    console.error(`❌ Source file not found: ${srcPath}`);
  }
}

console.log(`\nSuccessfully copied ${count} audio files to ${destDir}`);
