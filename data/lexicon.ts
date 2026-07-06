// Verified Mattokki vocabulary — PRD Appendix A
// Every entry sourced from peer-reviewed academic texts.
// Audio URLs point to CloudFront once recordings are uploaded.

import type { Lexeme } from '../types';

export const lexicon: Lexeme[] = [
  {
    id: 'xnz_0001', root: 'ay', old_nubian: 'ⲁⲩ', latin: 'ay', arabic: 'أَيْ',
    ipa: 'aj', pos: 'pronoun',
    translation_ar: 'أنا', translation_en: 'I',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0002', root: 'ir', old_nubian: 'ⲓⲣ', latin: 'ir', arabic: 'إِرْ',
    ipa: 'ir', pos: 'pronoun',
    translation_ar: 'إنت', translation_en: 'you',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0003', root: 'tar', old_nubian: 'ⲧⲁⲣ', latin: 'tar', arabic: 'تَرْ',
    ipa: 'tar', pos: 'pronoun',
    translation_ar: 'هو/هي', translation_en: 'he / she / it',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0010', root: 'id', old_nubian: 'ⲓⲇ', latin: 'id', arabic: 'إيد',
    ipa: 'id', pos: 'noun',
    translation_ar: 'راجل', translation_en: 'man / person',
    example_sentence: 'id wer (one man)',
    audio_url: 'https://cdn.essi.app/audio/xnz_0010_SPK001_T1.m4a',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0011', root: 'buru', old_nubian: 'ⲃⲩⲣⲩ', latin: 'buru', arabic: 'بورو',
    ipa: 'ˈbu.ru', pos: 'noun',
    translation_ar: 'بنت', translation_en: 'girl / daughter',
    audio_url: 'https://cdn.essi.app/audio/xnz_0011_SPK002_T1.m4a',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0012', root: 'éen', old_nubian: 'ⲉⲉⲛ', latin: 'éen', arabic: 'إين',
    ipa: 'eːn', pos: 'noun',
    translation_ar: 'أم', translation_en: 'mother',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0013', root: 'baab', old_nubian: 'ⲃⲁⲁⲃ', latin: 'baab', arabic: 'باب',
    ipa: 'baːb', pos: 'noun',
    translation_ar: 'أب', translation_en: 'father',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0042', root: 'essi', old_nubian: 'ⲉⲥⲥⲓ', latin: 'essi', arabic: 'إيسي',
    ipa: 'ˈɛs.si', pos: 'noun',
    translation_ar: 'ماء', translation_en: 'water',
    example_sentence: 'essi-we:r (some water)',
    audio_url: 'https://cdn.essi.app/audio/xnz_0042_SPK001_T1.m4a',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0043', root: 'ig', old_nubian: 'ⲓⲅ', latin: 'ig', arabic: 'نار',
    ipa: 'iɡ', pos: 'noun',
    translation_ar: 'نار', translation_en: 'fire',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0044', root: 'seer', old_nubian: 'ⲥⲉⲉⲣ', latin: 'seer', arabic: 'حجر',
    ipa: 'seːr', pos: 'noun',
    translation_ar: 'حجر', translation_en: 'stone',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0050', root: 'nal', old_nubian: 'ⲛⲁⲗ', latin: 'nal', arabic: 'نال',
    ipa: 'nal', pos: 'verb',
    translation_ar: 'يشوف', translation_en: 'to see',
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0051', root: 'jom', old_nubian: 'ⳉⲟⲙ', latin: 'jom', arabic: 'جوم',
    ipa: 'dʒom', pos: 'verb',
    translation_ar: 'يضرب', translation_en: 'to hit',
    source: 'abdel-hafiz-1988', verified: true,
  },
];

export const lexById = Object.fromEntries(lexicon.map((l) => [l.id, l]));
