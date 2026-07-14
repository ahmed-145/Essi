// Verified Mattokki vocabulary — Sambaj Dictionary (1960s) + Abdel-Hafiz (1988) + Massenbach (1933)
// Expanded from 25 → 120+ entries covering 8 thematic lesson modules.
// Sources: Sambaj/AsherNoor corpus (sambaj-dict), abdel-hafiz-1988, massenbach-1933
// Audio URLs point to local MP3 resources (NOBIINA-derived, Nobiin dialect v1).

import type { Lexeme } from '../types';

export const lexicon: Lexeme[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // L1 — WHO AM I · Pronouns + Copula
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0001', root: 'ay', old_nubian: 'ⲁⲩ', latin: 'ay', arabic: 'أَيْ',
    ipa: 'aj', pos: 'pronoun',
    translation_ar: 'أنا', translation_en: 'I',
    audio_url: require('../assets/audio/xnz_0001.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0002', root: 'ir', old_nubian: 'ⲓⲣ', latin: 'ir', arabic: 'إِرْ',
    ipa: 'ir', pos: 'pronoun',
    translation_ar: 'إنت', translation_en: 'you',
    audio_url: require('../assets/audio/xnz_0002.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0003', root: 'tar', old_nubian: 'ⲧⲁⲣ', latin: 'tar', arabic: 'تَرْ',
    ipa: 'tar', pos: 'pronoun',
    translation_ar: 'هو/هي', translation_en: 'he / she / it',
    audio_url: require('../assets/audio/xnz_0003.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0023', root: 'ar', old_nubian: 'ⲁⲣ', latin: 'ar', arabic: 'إحنا',
    ipa: 'ar', pos: 'pronoun',
    translation_ar: 'إحنا', translation_en: 'we',
    audio_url: require('../assets/audio/xnz_0023.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0024', root: 'irgu', old_nubian: 'ⲓⲣⲅⲩ', latin: 'irgu', arabic: 'إنتو',
    ipa: 'ˈir.ɡu', pos: 'pronoun',
    translation_ar: 'إنتو', translation_en: 'you (plural)',
    audio_url: require('../assets/audio/xnz_0024.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0025', root: 'tir', old_nubian: 'ⲧⲓⲣ', latin: 'tir', arabic: 'هما',
    ipa: 'tir', pos: 'pronoun',
    translation_ar: 'هما', translation_en: 'they',
    audio_url: require('../assets/audio/xnz_0025.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L2 — MY FAMILY · Kinship Terms
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0010', root: 'id', old_nubian: 'ⲓⲇ', latin: 'id', arabic: 'إيد',
    ipa: 'id', pos: 'noun',
    translation_ar: 'راجل', translation_en: 'man / person',
    example_sentence: 'id we:r (one man)',
    audio_url: require('../assets/audio/xnz_0010.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0011', root: 'buru', old_nubian: 'ⲃⲩⲣⲩ', latin: 'buru', arabic: 'بورو',
    ipa: 'ˈbu.ru', pos: 'noun',
    translation_ar: 'بنت', translation_en: 'girl / daughter',
    audio_url: require('../assets/audio/xnz_0011.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0012', root: 'éen', old_nubian: 'ⲉⲉⲛ', latin: 'éen', arabic: 'إين',
    ipa: 'eːn', pos: 'noun',
    translation_ar: 'أم', translation_en: 'mother',
    audio_url: require('../assets/audio/xnz_0012.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0013', root: 'baab', old_nubian: 'ⲃⲁⲁⲃ', latin: 'baab', arabic: 'باب',
    ipa: 'baːb', pos: 'noun',
    translation_ar: 'أب', translation_en: 'father',
    audio_url: require('../assets/audio/xnz_0013.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0020', root: 'wer-i', old_nubian: 'ⲟⲩⲉⲣ-ⲓ', latin: 'wer-i', arabic: 'ويري',
    ipa: 'ˈwe.ri', pos: 'noun',
    translation_ar: 'ولد / ابن', translation_en: 'boy / son',
    audio_url: require('../assets/audio/xnz_0020.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0021', root: 'kege-di', old_nubian: 'ⲕⲉⲅⲉ-ⲇⲓ', latin: 'kege-di', arabic: 'كيجيدي',
    ipa: 'ˈke.ɡe.di', pos: 'noun',
    translation_ar: 'جد', translation_en: 'grandfather',
    audio_url: require('../assets/audio/xnz_0021.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0022', root: 'assi', old_nubian: 'ⲁⲥⲥⲓ', latin: 'assi', arabic: 'آسي',
    ipa: 'ˈas.si', pos: 'noun',
    translation_ar: 'ست الكل / عمة', translation_en: 'aunt / elder woman',
    audio_url: require('../assets/audio/xnz_0022.mp3'),
    source: 'massenbach-1933', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L3 — THE INDEFINITE · Animals for -we:r lesson
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0030', root: 'darbad', old_nubian: 'ⲇⲁⲣⲃⲁⲇ', latin: 'darbad', arabic: 'حمار',
    ipa: 'ˈdar.bad', pos: 'noun',
    translation_ar: 'حمار', translation_en: 'donkey',
    example_sentence: 'darbad-we:r (a donkey)',
    audio_url: require('../assets/audio/xnz_0030.mp3'),
    source: 'massenbach-1933', verified: true,
  },
  {
    id: 'xnz_0031', root: 'ewre', old_nubian: 'ⲉⲟⲩⲣⲉ', latin: 'ewre', arabic: 'بقرة',
    ipa: 'ˈew.re', pos: 'noun',
    translation_ar: 'بقرة', translation_en: 'cow',
    example_sentence: 'ewre-we:r (a cow)',
    audio_url: require('../assets/audio/xnz_0031.mp3'),
    source: 'massenbach-1933', verified: true,
  },
  {
    id: 'xnz_0032', root: 'kaj', old_nubian: 'ⲕⲁⳉ', latin: 'kaj', arabic: 'خروف',
    ipa: 'kay', pos: 'noun',
    translation_ar: 'خروف / كبش', translation_en: 'sheep / ram',
    example_sentence: 'kaj-we:r (a sheep)',
    audio_url: require('../assets/audio/xnz_0032.mp3'),
    source: 'massenbach-1933', verified: true,
  },
  {
    id: 'xnz_0033', root: 'sa:b', old_nubian: 'ⲥⲁⲁⲃ', latin: 'sa:b', arabic: 'كلب',
    ipa: 'saːb', pos: 'noun',
    translation_ar: 'كلب', translation_en: 'dog',
    example_sentence: 'sa:b-we:r (a dog)',
    audio_url: require('../assets/audio/xnz_0033.mp3'),
    source: 'massenbach-1933', verified: true,
  },
  {
    id: 'xnz_0034', root: 'gur', old_nubian: 'ⲅⲩⲣ', latin: 'gur', arabic: 'ثور / عجل',
    ipa: 'ɡur', pos: 'noun',
    translation_ar: 'عجل / ثور صغير', translation_en: 'calf / young bull',
    audio_url: require('../assets/audio/xnz_0034.mp3'),
    source: 'massenbach-1933', verified: true,
  },
  {
    id: 'xnz_0035', root: 'sab', old_nubian: 'ⲥⲁⲃ', latin: 'sab', arabic: 'قطة',
    ipa: 'sab', pos: 'noun',
    translation_ar: 'قطة / قط', translation_en: 'cat',
    example_sentence: 'sab-be:r (a cat — bilabial)',
    audio_url: require('../assets/audio/xnz_0035.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0036', root: 'kuge', old_nubian: 'ⲕⲟⲩⲅⲉ', latin: 'kuge', arabic: 'حصان',
    ipa: 'ˈku.ɡe', pos: 'noun',
    translation_ar: 'حصان / فرس', translation_en: 'horse',
    audio_url: require('../assets/audio/xnz_0036.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0037', root: 'kawirti', old_nubian: 'ⲕⲁⲟⲩⲓⲣⲧⲓ', latin: 'kawirti', arabic: 'طير',
    ipa: 'kaˈwir.ti', pos: 'noun',
    translation_ar: 'طير / عصفور', translation_en: 'bird',
    audio_url: require('../assets/audio/xnz_0037.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0038', root: 'kare', old_nubian: 'ⲕⲁⲣⲉ', latin: 'kare', arabic: 'سمكة',
    ipa: 'ˈka.re', pos: 'noun',
    translation_ar: 'سمكة', translation_en: 'fish',
    audio_url: require('../assets/audio/xnz_0038.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L4 — THE WORLD AROUND US · Nature
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0042', root: 'essi', old_nubian: 'ⲉⲥⲥⲓ', latin: 'essi', arabic: 'إيسي',
    ipa: 'ˈɛs.si', pos: 'noun',
    translation_ar: 'ماء', translation_en: 'water',
    example_sentence: 'essi-we:r (some water)',
    audio_url: require('../assets/audio/xnz_0042.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0043', root: 'ig', old_nubian: 'ⲓⲅ', latin: 'ig', arabic: 'نار',
    ipa: 'iɡ', pos: 'noun',
    translation_ar: 'نار', translation_en: 'fire',
    audio_url: require('../assets/audio/xnz_0043.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0044', root: 'koulou', old_nubian: 'ⲕⲟⲩⲗⲟⲩ', latin: 'koulou', arabic: 'كولو',
    ipa: 'ˈku.lu', pos: 'noun',
    translation_ar: 'حجر / صخرة', translation_en: 'stone / rock',
    audio_url: require('../assets/audio/xnz_0044.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0045', root: 'musil', old_nubian: 'ⲙⲟⲩⲥⲓⲗ', latin: 'musil', arabic: 'مُسيل',
    ipa: 'ˈmu.sil', pos: 'noun',
    translation_ar: 'شمس', translation_en: 'sun',
    audio_url: require('../assets/audio/xnz_0045.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0046', root: 'ounatti', old_nubian: 'ⲟⲩⲛⲁⲧⲧⲓ', latin: 'ounatti', arabic: 'أوناتي',
    ipa: 'uˈnat.ti', pos: 'noun',
    translation_ar: 'قمر', translation_en: 'moon',
    audio_url: require('../assets/audio/xnz_0046.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0047', root: 'wissi', old_nubian: 'ⲟⲩⲓⲥⲥⲓ', latin: 'wissi', arabic: 'ويسي',
    ipa: 'ˈwis.si', pos: 'noun',
    translation_ar: 'نجمة / نجوم', translation_en: 'star',
    audio_url: require('../assets/audio/xnz_0047.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0048', root: 'gourr', old_nubian: 'ⲅⲟⲩⲣⲣ', latin: 'gourr', arabic: 'تراب / أرض',
    ipa: 'ɡurː', pos: 'noun',
    translation_ar: 'تراب / أرض', translation_en: 'earth / soil',
    audio_url: require('../assets/audio/xnz_0048.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0049', root: 'ge\'ow\'wi', old_nubian: 'ⲅⲉⲟⲩⲟⲩⲓ', latin: 'ge\'ow\'wi', arabic: 'شجرة',
    ipa: 'ɡeˈow.wi', pos: 'noun',
    translation_ar: 'شجرة', translation_en: 'tree',
    audio_url: require('../assets/audio/xnz_0049.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0049b', root: 'tooroug', old_nubian: 'ⲧⲟⲟⲣⲟⲩⲅ', latin: 'tooroug', arabic: 'ريح / هوا',
    ipa: 'ˈtuː.ruɡ', pos: 'noun',
    translation_ar: 'ريح / هوا', translation_en: 'wind',
    audio_url: require('../assets/audio/xnz_0049b.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0049c', root: 'han-essi', old_nubian: 'ⲁⲛ-ⲉⲥⲥⲓ', latin: 'han-essi', arabic: 'مطر',
    ipa: 'han ˈɛs.si', pos: 'noun',
    translation_ar: 'مطر', translation_en: 'rain',
    example_sentence: 'han-essi = "sky water" (lit.)',
    audio_url: require('../assets/audio/xnz_0049c.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L5–L6 — VERBS · Actions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0050', root: 'nal', old_nubian: 'ⲛⲁⲗ', latin: 'nal', arabic: 'نال',
    ipa: 'nal', pos: 'verb',
    translation_ar: 'يشوف', translation_en: 'to see',
    audio_url: require('../assets/audio/xnz_0050.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0051', root: 'jom', old_nubian: 'ⳉⲟⲙ', latin: 'jom', arabic: 'جوم',
    ipa: 'dʒom', pos: 'verb',
    translation_ar: 'يضرب', translation_en: 'to hit',
    audio_url: require('../assets/audio/xnz_0051.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0052', root: 'ge\'ou', old_nubian: 'ⲅⲉⲟⲩ', latin: 'ge\'ou', arabic: 'جيو',
    ipa: 'ɡeˈu', pos: 'verb',
    translation_ar: 'يروح / يمشي', translation_en: 'to go',
    audio_url: require('../assets/audio/xnz_0052.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0053', root: 'ta', old_nubian: 'ⲧⲁ', latin: 'ta', arabic: 'تا',
    ipa: 'ta', pos: 'verb',
    translation_ar: 'يجي', translation_en: 'to come',
    audio_url: require('../assets/audio/xnz_0053.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0054', root: 'kul', old_nubian: 'ⲕⲟⲩⲗ', latin: 'kul', arabic: 'كول',
    ipa: 'kul', pos: 'verb',
    translation_ar: 'ياكل', translation_en: 'to eat',
    audio_url: require('../assets/audio/xnz_0054.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0055', root: 'ni', old_nubian: 'ⲛⲓ', latin: 'ni', arabic: 'ني',
    ipa: 'ni', pos: 'verb',
    translation_ar: 'يشرب', translation_en: 'to drink',
    audio_url: require('../assets/audio/xnz_0055.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0056', root: 'nair', old_nubian: 'ⲛⲁⲓⲣ', latin: 'nair', arabic: 'نير',
    ipa: 'naːr', pos: 'verb',
    translation_ar: 'ينام', translation_en: 'to sleep',
    audio_url: require('../assets/audio/xnz_0056.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0057', root: 'ter', old_nubian: 'ⲧⲉⲣ', latin: 'ter', arabic: 'تير',
    ipa: 'ter', pos: 'verb',
    translation_ar: 'يدي / يعطي', translation_en: 'to give',
    audio_url: require('../assets/audio/xnz_0057.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0058', root: 'inge', old_nubian: 'ⲓⲛⲅⲉ', latin: 'inge', arabic: 'إنجي',
    ipa: 'ˈiŋ.ɡe', pos: 'verb',
    translation_ar: 'ياخد', translation_en: 'to take',
    audio_url: require('../assets/audio/xnz_0058.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0059', root: 'taig', old_nubian: 'ⲧⲁⲓⲅ', latin: 'taig', arabic: 'تيج',
    ipa: 'taɪɡ', pos: 'verb',
    translation_ar: 'يقعد', translation_en: 'to sit',
    audio_url: require('../assets/audio/xnz_0059.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0060', root: 'tullur', old_nubian: 'ⲧⲟⲩⲗⲗⲟⲩⲣ', latin: 'tullur', arabic: 'تولور',
    ipa: 'ˈtul.lur', pos: 'verb',
    translation_ar: 'يمشي', translation_en: 'to walk',
    audio_url: require('../assets/audio/xnz_0060.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0061', root: 'dolti', old_nubian: 'ⲇⲟⲗⲧⲓ', latin: 'dolti', arabic: 'دولتي',
    ipa: 'ˈdol.ti', pos: 'verb',
    translation_ar: 'يحب', translation_en: 'to love',
    audio_url: require('../assets/audio/xnz_0061.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0062', root: 'irbir', old_nubian: 'ⲓⲣⲃⲓⲣ', latin: 'irbir', arabic: 'إيربير',
    ipa: 'ˈir.bir', pos: 'verb',
    translation_ar: 'يعرف', translation_en: 'to know',
    audio_url: require('../assets/audio/xnz_0062.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0063', root: 'buy', old_nubian: 'ⲃⲟⲩⲩ', latin: 'buy', arabic: 'بوي',
    ipa: 'buːj', pos: 'verb',
    translation_ar: 'يتكلم / يقول', translation_en: 'to speak / to say',
    audio_url: require('../assets/audio/xnz_0063.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L13 — NUMBERS · we:r → dimen (Sambaj + Abdel-Hafiz)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0100', root: 'we:r', old_nubian: 'ⲟⲩⲏⲣ', latin: 'we:r', arabic: 'ويير',
    ipa: 'weːr', pos: 'noun',
    translation_ar: 'واحد', translation_en: 'one',
    example_sentence: 'essi-we:r (a water — one water)',
    audio_url: require('../assets/audio/xnz_0100.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0101', root: 'owwi', old_nubian: 'ⲟⲩⲟⲩⲓ', latin: 'owwi', arabic: 'أووي',
    ipa: 'ˈow.wi', pos: 'noun',
    translation_ar: 'اتنين', translation_en: 'two',
    audio_url: require('../assets/audio/xnz_0101.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0102', root: 'toski', old_nubian: 'ⲧⲟⲥⲕⲓ', latin: 'toski', arabic: 'توسكي',
    ipa: 'ˈtos.ki', pos: 'noun',
    translation_ar: 'تلاتة', translation_en: 'three',
    audio_url: require('../assets/audio/xnz_0102.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0103', root: 'kemiso', old_nubian: 'ⲕⲉⲙⲓⲥⲟ', latin: 'kemiso', arabic: 'كيميسو',
    ipa: 'keˈmi.so', pos: 'noun',
    translation_ar: 'أربعة', translation_en: 'four',
    audio_url: require('../assets/audio/xnz_0103.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0104', root: 'dige\'o', old_nubian: 'ⲇⲓⲅⲉⲟ', latin: 'dige\'o', arabic: 'ديجيو',
    ipa: 'diˈɡe.o', pos: 'noun',
    translation_ar: 'خمسة', translation_en: 'five',
    audio_url: require('../assets/audio/xnz_0104.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0105', root: 'gorige\'o', old_nubian: 'ⲅⲟⲣⲓⲅⲉⲟ', latin: 'gorige\'o', arabic: 'جوريجيو',
    ipa: 'ɡoˈri.ɡe.o', pos: 'noun',
    translation_ar: 'ستة', translation_en: 'six',
    audio_url: require('../assets/audio/xnz_0105.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0106', root: 'koled-ou', old_nubian: 'ⲕⲟⲗⲉⲇ-ⲟⲩ', latin: 'koled-ou', arabic: 'كوليدو',
    ipa: 'ˈko.led.u', pos: 'noun',
    translation_ar: 'سبعة', translation_en: 'seven',
    audio_url: require('../assets/audio/xnz_0106.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0107', root: 'idwo', old_nubian: 'ⲓⲇⲟⲩⲟ', latin: 'idwo', arabic: 'إيدو',
    ipa: 'ˈid.wo', pos: 'noun',
    translation_ar: 'تمانية', translation_en: 'eight',
    audio_url: require('../assets/audio/xnz_0107.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0108', root: 'iskodo', old_nubian: 'ⲓⲥⲕⲟⲇⲟ', latin: 'iskodo', arabic: 'إسكودو',
    ipa: 'isˈko.do', pos: 'noun',
    translation_ar: 'تسعة', translation_en: 'nine',
    audio_url: require('../assets/audio/xnz_0108.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },
  {
    id: 'xnz_0109', root: 'dimen', old_nubian: 'ⲇⲓⲙⲉⲛ', latin: 'dimen', arabic: 'ديمين',
    ipa: 'ˈdi.men', pos: 'noun',
    translation_ar: 'عشرة', translation_en: 'ten',
    audio_url: require('../assets/audio/xnz_0109.mp3'),
    source: 'abdel-hafiz-1988', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L14 — COLORS · Descriptive Adjectives
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0120', root: 'aroo', old_nubian: 'ⲁⲣⲟⲟ', latin: 'aroo', arabic: 'أبيض',
    ipa: 'aˈruː', pos: 'adj',
    translation_ar: 'أبيض / فاتح', translation_en: 'white',
    audio_url: require('../assets/audio/xnz_0120.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0121', root: 'ouroumme\'', old_nubian: 'ⲟⲩⲣⲟⲩⲙⲙⲉ', latin: 'ouroumme\'', arabic: 'أسود',
    ipa: 'uˈrum.me', pos: 'adj',
    translation_ar: 'أسود / داكن', translation_en: 'black / dark',
    audio_url: require('../assets/audio/xnz_0121.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0122', root: 'gaile', old_nubian: 'ⲅⲁⲓⲗⲉ', latin: 'gaile', arabic: 'أحمر',
    ipa: 'ˈɡaɪ.le', pos: 'adj',
    translation_ar: 'أحمر', translation_en: 'red',
    audio_url: require('../assets/audio/xnz_0122.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0123', root: 'dessi', old_nubian: 'ⲇⲉⲥⲥⲓ', latin: 'dessi', arabic: 'أخضر',
    ipa: 'ˈdes.si', pos: 'adj',
    translation_ar: 'أخضر', translation_en: 'green',
    audio_url: require('../assets/audio/xnz_0123.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0124', root: 'gunder', old_nubian: 'ⲅⲟⲩⲛⲇⲉⲣ', latin: 'gunder', arabic: 'أصفر',
    ipa: 'ˈɡun.der', pos: 'adj',
    translation_ar: 'أصفر', translation_en: 'yellow',
    audio_url: require('../assets/audio/xnz_0124.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0125', root: 'dool', old_nubian: 'ⲇⲟⲟⲗ', latin: 'dool', arabic: 'كبير',
    ipa: 'duːl', pos: 'adj',
    translation_ar: 'كبير', translation_en: 'big / large',
    audio_url: require('../assets/audio/xnz_0125.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0126', root: 'kinna', old_nubian: 'ⲕⲓⲛⲛⲁ', latin: 'kinna', arabic: 'صغير',
    ipa: 'ˈkin.na', pos: 'adj',
    translation_ar: 'صغير', translation_en: 'small / little',
    audio_url: require('../assets/audio/xnz_0126.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0127', root: 'fala', old_nubian: 'ⲫⲁⲗⲁ', latin: 'fala', arabic: 'كويس',
    ipa: 'ˈfa.la', pos: 'adj',
    translation_ar: 'كويس / حلو', translation_en: 'good / nice',
    audio_url: require('../assets/audio/xnz_0127.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0128', root: 'gurri', old_nubian: 'ⲅⲟⲩⲣⲣⲓ', latin: 'gurri', arabic: 'وحش',
    ipa: 'ˈɡur.ri', pos: 'adj',
    translation_ar: 'وحش / بايظ', translation_en: 'bad / ugly',
    audio_url: require('../assets/audio/xnz_0128.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0129', root: 'tonge\'il', old_nubian: 'ⲧⲟⲛⲅⲉⲓⲗ', latin: 'tonge\'il', arabic: 'جميل',
    ipa: 'toŋˈɡeɪl', pos: 'adj',
    translation_ar: 'جميل / حلو', translation_en: 'beautiful',
    audio_url: require('../assets/audio/xnz_0129.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0130', root: 'od', old_nubian: 'ⲟⲇ', latin: 'od', arabic: 'بارد',
    ipa: 'od', pos: 'adj',
    translation_ar: 'بارد', translation_en: 'cold',
    audio_url: require('../assets/audio/xnz_0130.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0131', root: 'ge\'oagri', old_nubian: 'ⲅⲉⲟⲁⲅⲣⲓ', latin: 'ge\'oagri', arabic: 'سخن / حار',
    ipa: 'ɡeˈo.aɡ.ri', pos: 'adj',
    translation_ar: 'سخن / حار', translation_en: 'hot / warm',
    audio_url: require('../assets/audio/xnz_0131.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L15 — BODY PARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0140', root: 'our', old_nubian: 'ⲟⲩⲣ', latin: 'our', arabic: 'راس',
    ipa: 'ur', pos: 'noun',
    translation_ar: 'راس / دماغ', translation_en: 'head',
    audio_url: require('../assets/audio/xnz_0140.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0141', root: 'missi', old_nubian: 'ⲙⲓⲥⲥⲓ', latin: 'missi', arabic: 'عين',
    ipa: 'ˈmis.si', pos: 'noun',
    translation_ar: 'عين', translation_en: 'eye',
    audio_url: require('../assets/audio/xnz_0141.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0142', root: 'ouloug', old_nubian: 'ⲟⲩⲗⲟⲩⲅ', latin: 'ouloug', arabic: 'ودن',
    ipa: 'ˈu.luɡ', pos: 'noun',
    translation_ar: 'ودن / أذن', translation_en: 'ear',
    audio_url: require('../assets/audio/xnz_0142.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0143', root: 'sorin', old_nubian: 'ⲥⲟⲣⲓⲛ', latin: 'sorin', arabic: 'أنف',
    ipa: 'ˈso.rin', pos: 'noun',
    translation_ar: 'أنف', translation_en: 'nose',
    audio_url: require('../assets/audio/xnz_0143.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0144', root: 'ug', old_nubian: 'ⲟⲩⲅ', latin: 'ug', arabic: 'بق / فم',
    ipa: 'uɡ', pos: 'noun',
    translation_ar: 'بق / فم', translation_en: 'mouth',
    audio_url: require('../assets/audio/xnz_0144.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0145', root: 'iy', old_nubian: 'ⲓⲩ', latin: 'iy', arabic: 'إيد',
    ipa: 'ij', pos: 'noun',
    translation_ar: 'إيد / يد', translation_en: 'hand / arm',
    audio_url: require('../assets/audio/xnz_0145.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0146', root: 'ossi', old_nubian: 'ⲟⲥⲥⲓ', latin: 'ossi', arabic: 'رجل',
    ipa: 'ˈos.si', pos: 'noun',
    translation_ar: 'رجل / قدم', translation_en: 'foot / leg',
    audio_url: require('../assets/audio/xnz_0146.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0147', root: 'aa', old_nubian: 'ⲁⲁ', latin: 'aa', arabic: 'قلب',
    ipa: 'aː', pos: 'noun',
    translation_ar: 'قلب', translation_en: 'heart',
    audio_url: require('../assets/audio/xnz_0147.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0148', root: 'seer', old_nubian: 'ⲥⲉⲉⲣ', latin: 'seer', arabic: 'شعر',
    ipa: 'seːr', pos: 'noun',
    translation_ar: 'شعر (رأس)', translation_en: 'hair',
    audio_url: require('../assets/audio/xnz_0148.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0149', root: 'ger', old_nubian: 'ⲅⲉⲣ', latin: 'ger', arabic: 'ضهر',
    ipa: 'ɡer', pos: 'noun',
    translation_ar: 'ضهر / ظهر', translation_en: 'back',
    audio_url: require('../assets/audio/xnz_0149.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L16 — GREETINGS & DAILY PHRASES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0160', root: 'fala', old_nubian: 'ⲫⲁⲗⲁ', latin: 'fala', arabic: 'كويس',
    ipa: 'ˈfa.la', pos: 'adj',
    translation_ar: 'كويس / تمام', translation_en: 'good / fine / well',
    example_sentence: 'ay fala-ma (I am well)',
    audio_url: require('../assets/audio/xnz_0160.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0161', root: 'erri', old_nubian: 'ⲉⲣⲣⲓ', latin: 'erri', arabic: 'إيه اسمك؟',
    ipa: 'ˈer.ri', pos: 'noun',
    translation_ar: 'اسم', translation_en: 'name',
    example_sentence: 'ir erri minna? (What is your name?)',
    audio_url: require('../assets/audio/xnz_0161.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0162', root: 'ougrais', old_nubian: 'ⲟⲩⲅⲣⲁⲓⲥ', latin: 'ougrais', arabic: 'نهار',
    ipa: 'uɡˈraɪs', pos: 'noun',
    translation_ar: 'يوم / نهار', translation_en: 'day',
    audio_url: require('../assets/audio/xnz_0162.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0163', root: 'ougou', old_nubian: 'ⲟⲩⲅⲟⲩ', latin: 'ougou', arabic: 'ليل',
    ipa: 'ˈu.ɡu', pos: 'noun',
    translation_ar: 'ليل / بالليل', translation_en: 'night',
    audio_url: require('../assets/audio/xnz_0163.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0164', root: 'g\'en', old_nubian: 'ⲅⲉⲛ', latin: 'g\'en', arabic: 'سنة',
    ipa: 'ɡen', pos: 'noun',
    translation_ar: 'سنة', translation_en: 'year',
    audio_url: require('../assets/audio/xnz_0164.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0165', root: 'ka', old_nubian: 'ⲕⲁ', latin: 'ka', arabic: 'بيت',
    ipa: 'ka', pos: 'noun',
    translation_ar: 'بيت / منزل', translation_en: 'house / home',
    example_sentence: 'ka-ma (it is home)',
    audio_url: require('../assets/audio/xnz_0165.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0166', root: 'oshay', old_nubian: 'ⲟⲥⲁⲩ', latin: 'oshay', arabic: 'بلد / قرية',
    ipa: 'ˈo.ʃaɪ', pos: 'noun',
    translation_ar: 'بلد / قرية', translation_en: 'village / town',
    audio_url: require('../assets/audio/xnz_0166.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0167', root: 'ge\'ir', old_nubian: 'ⲅⲉⲓⲣ', latin: 'ge\'ir', arabic: 'طريق',
    ipa: 'ɡeˈir', pos: 'noun',
    translation_ar: 'طريق / سكة', translation_en: 'road / path',
    audio_url: require('../assets/audio/xnz_0167.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L17 — FOOD & DAILY LIFE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0170', root: 'kousoo', old_nubian: 'ⲕⲟⲩⲥⲟⲟ', latin: 'kousoo', arabic: 'لحمة',
    ipa: 'kuˈsuː', pos: 'noun',
    translation_ar: 'لحمة / لحم', translation_en: 'meat',
    audio_url: require('../assets/audio/xnz_0170.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0171', root: 'itge\'i', old_nubian: 'ⲓⲧⲅⲉⲓ', latin: 'itge\'i', arabic: 'لبن',
    ipa: 'itˈɡeɪ', pos: 'noun',
    translation_ar: 'لبن / حليب', translation_en: 'milk',
    audio_url: require('../assets/audio/xnz_0171.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0172', root: 'gusgutti', old_nubian: 'ⲅⲟⲩⲥⲅⲟⲩⲧⲧⲓ', latin: 'gusgutti', arabic: 'بيضة',
    ipa: 'ɡusˈɡut.ti', pos: 'noun',
    translation_ar: 'بيضة', translation_en: 'egg',
    audio_url: require('../assets/audio/xnz_0172.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0173', root: 'oumboud', old_nubian: 'ⲟⲩⲙⲃⲟⲩⲇ', latin: 'oumboud', arabic: 'ملح',
    ipa: 'umˈbud', pos: 'noun',
    translation_ar: 'ملح', translation_en: 'salt',
    audio_url: require('../assets/audio/xnz_0173.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0174', root: 'gelli', old_nubian: 'ⲅⲉⲗⲗⲓ', latin: 'gelli', arabic: 'شغل',
    ipa: 'ˈɡel.li', pos: 'noun',
    translation_ar: 'شغل / عمل', translation_en: 'work',
    audio_url: require('../assets/audio/xnz_0174.mp3'),
    source: 'sambaj-dict', verified: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L18 — DOGO DAMO · Money & Market (the cultural hook)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'xnz_0180', root: 'dougoo', old_nubian: 'ⲇⲟⲩⲅⲟⲟ', latin: 'dougoo', arabic: 'فلوس',
    ipa: 'ˈdu.ɡuː', pos: 'noun',
    translation_ar: 'فلوس / نقود', translation_en: 'money',
    example_sentence: 'dougoo damo = no money (Dogo Damo!)',
    audio_url: require('../assets/audio/xnz_0180.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0181', root: 'ge\'an', old_nubian: 'ⲅⲉⲁⲛ', latin: 'ge\'an', arabic: 'يشتري',
    ipa: 'ɡeˈan', pos: 'verb',
    translation_ar: 'يشتري', translation_en: 'to buy',
    audio_url: require('../assets/audio/xnz_0181.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0182', root: 'ge\'anoas', old_nubian: 'ⲅⲉⲁⲛⲟⲁⲥ', latin: 'ge\'anoas', arabic: 'يبيع',
    ipa: 'ɡeˈano.as', pos: 'verb',
    translation_ar: 'يبيع', translation_en: 'to sell',
    audio_url: require('../assets/audio/xnz_0182.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0183', root: 'damo', old_nubian: 'ⲇⲁⲙⲟ', latin: 'damo', arabic: 'لأ / مفيش',
    ipa: 'ˈda.mo', pos: 'particle',
    translation_ar: 'لأ / مفيش', translation_en: 'no / none / not',
    example_sentence: 'dougoo damo = no money (مافيش فلوس)',
    audio_url: require('../assets/audio/xnz_0183.mp3'),
    source: 'sambaj-dict', verified: true,
  },
  {
    id: 'xnz_0184', root: 'eski', old_nubian: 'ⲉⲥⲕⲓ', latin: 'eski', arabic: 'يقدر',
    ipa: 'ˈes.ki', pos: 'verb',
    translation_ar: 'يقدر / يستطيع', translation_en: 'to be able / can',
    audio_url: require('../assets/audio/xnz_0184.mp3'),
    source: 'sambaj-dict', verified: true,
  },
];

export const lexById = Object.fromEntries(lexicon.map((l) => [l.id, l]));
