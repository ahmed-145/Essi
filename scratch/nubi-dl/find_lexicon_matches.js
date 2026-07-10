const fs = require('fs');
const path = require('path');

const lexicon = [
  { root: 'ay', old_nubian: 'ⲁⲓ̈', en: 'I' },
  { root: 'ir', old_nubian: 'ⲓⲣ', en: 'you' },
  { root: 'tar', old_nubian: 'ⲧⲁⲣ', en: 'he / she' },
  { root: 'id', old_nubian: 'ⲓⲇ', en: 'man' },
  { root: 'buru', old_nubian: 'ⲃⲩⲣⲩ', en: 'girl' },
  { root: 'éen', old_nubian: 'ⲉⲉⲛ', en: 'mother' },
  { root: 'baab', old_nubian: 'ⲃⲁⲁⲃ', en: 'father' },
  { root: 'essi', old_nubian: 'ⲉⲥⲥⲓ', en: 'water' },
  { root: 'ig', old_nubian: 'ⲓⲅ', en: 'fire' },
  { root: 'seer', old_nubian: 'ⲥⲉⲉⲣ', en: 'stone' },
  { root: 'nal', old_nubian: 'ⲛⲁⲗ', en: 'see' },
  { root: 'jom', old_nubian: 'ⳉⲟⲙ', en: 'hit' },
  { root: 'wer-i', old_nubian: 'ⲟⲩⲉⲣ', en: 'boy' },
  { root: 'kege-di', old_nubian: 'ⲕⲉⲅⲉ', en: 'grandfather' },
  { root: 'assi', old_nubian: 'ⲁⲥⲥⲓ', en: 'aunt' },
  { root: 'ar', old_nubian: 'ⲁⲣ', en: 'we' },
  { root: 'irgu', old_nubian: 'ⲓⲣⲅⲩ', en: 'you (plural)' },
  { root: 'tir', old_nubian: 'ⲧⲓⲣ', en: 'they' },
  { root: 'darbad', old_nubian: 'ⲇⲁⲣⲃⲁⲇ', en: 'donkey' },
  { root: 'ewre', old_nubian: 'ⲉⲟⲩⲣⲉ', en: 'cow' },
  { root: 'kaj', old_nubian: 'ⲕⲁⳉ', en: 'ram' },
  { root: 'sa:b', old_nubian: 'ⲥⲁⲁⲃ', en: 'dog' },
  { root: 'gur', old_nubian: 'ⲅⲩⲣ', en: 'calf' },
  { root: 'esked', old_nubian: 'ⲉⲥⲕⲉⲇ', en: 'sun' },
  { root: 'aman', old_nubian: 'ⲁⲙⲁⲛ', en: 'sky' }
];

const dictPath = path.join(__dirname, '..', 'nobiina_extracted_text', 'NubianDictionary.txt');
const audioDir = path.join(__dirname, '..', 'nobiina_extracted_audio');

const dictLines = fs.readFileSync(dictPath, 'utf8').trim().split('\n');

console.log(`Loaded ${dictLines.length} dictionary lines.`);

for (const lex of lexicon) {
  let matched = [];
  
  // Clean old_nubian for matching (remove combining diaeresis if needed or match exact)
  const exactUnicode = lex.old_nubian;
  
  for (let idx = 0; idx < dictLines.length; idx++) {
    const line = dictLines[idx];
    const parts = line.split(',');
    if (parts.length < 3) continue;
    const word = parts[0].trim();
    const eng = parts[1].trim().toLowerCase();
    const ara = parts[2].trim();
    
    // Check if exact unicode match
    if (word === exactUnicode || word.split(' = ').includes(exactUnicode)) {
      matched.push({ lineNum: idx + 1, word, eng, ara, type: 'exact-unicode' });
    }
  }
  
  if (matched.length === 0) {
    // Try substring matching
    for (let idx = 0; idx < dictLines.length; idx++) {
      const line = dictLines[idx];
      const parts = line.split(',');
      if (parts.length < 3) continue;
      const word = parts[0].trim();
      const eng = parts[1].trim().toLowerCase();
      const ara = parts[2].trim();
      
      if (word.includes(exactUnicode)) {
        matched.push({ lineNum: idx + 1, word, eng, ara, type: 'sub-unicode' });
      }
    }
  }

  if (matched.length === 0) {
    // Try English matching
    for (let idx = 0; idx < dictLines.length; idx++) {
      const line = dictLines[idx];
      const parts = line.split(',');
      if (parts.length < 3) continue;
      const word = parts[0].trim();
      const eng = parts[1].trim().toLowerCase();
      const ara = parts[2].trim();
      
      if (eng === lex.en.toLowerCase() || eng.split(' - ').includes(lex.en.toLowerCase())) {
        matched.push({ lineNum: idx + 1, word, eng, ara, type: 'english' });
      }
    }
  }
  
  console.log(`\nWord: ${lex.root} (${lex.old_nubian}) -> Found ${matched.length} matches:`);
  for (const m of matched) {
    const audioFile = `${m.lineNum}.ogg`;
    const audioPath = path.join(audioDir, audioFile);
    const exists = fs.existsSync(audioPath);
    console.log(`  Line ${m.lineNum}: [${m.word}] En: [${m.eng}] Ar: [${m.ara}] | Audio: ${audioFile} (Exists: ${exists})`);
  }
}
