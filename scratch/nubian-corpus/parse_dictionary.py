#!/usr/bin/env python3
"""
Parse the Sambaj Nubian Dictionary (from AsherNoor/nubian-dictionary-v001)
Format: english  mattokki(K-D)  nobiin(F-M)
Outputs:
  - mattokki_words.json   → Mattokki-only clean list
  - full_dictionary.json  → All 3 columns
"""

import json, re

RAW = "sambaj_dictionary_raw.txt"
OUT_FULL = "full_dictionary.json"
OUT_MATTOKKI = "mattokki_words.json"

entries = []
skipped = []

with open(RAW, encoding="utf-8", errors="replace") as f:
    for i, line in enumerate(f, 1):
        line = line.strip().strip("\r\n")
        if not line or line.startswith("-") or line.startswith("(") or ":" in line[:20]:
            continue
        parts = line.split()
        if len(parts) < 2:
            skipped.append({"line": i, "raw": line})
            continue
        
        # First word is English (may be multi-word via parentheses)
        # Format: english_word(s)  mattokki  nobiin
        # Sometimes english is multi-word: "a(one) ai-wt a-we'"
        # We'll treat first token as english key and remaining as Nubian columns
        english = parts[0]
        
        if len(parts) == 2:
            mattokki = parts[1]
            nobiin = ""
        elif len(parts) == 3:
            mattokki = parts[1]
            nobiin = parts[2]
        else:
            # Multi-token — join remaining as mattokki / nobiin best guess
            mattokki = parts[1]
            nobiin = " ".join(parts[2:])
        
        entries.append({
            "english": english.lower().replace("(", "").replace(")", ""),
            "mattokki": mattokki,
            "nobiin": nobiin,
            "raw": line
        })

# Write full dictionary
with open(OUT_FULL, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

# Write Mattokki-only (what Essi uses)
mattokki_only = [
    {"english": e["english"], "mattokki": e["mattokki"]}
    for e in entries if e["mattokki"] and e["mattokki"] != "N/A"
]
with open(OUT_MATTOKKI, "w", encoding="utf-8") as f:
    json.dump(mattokki_only, f, ensure_ascii=False, indent=2)

print(f"Total entries parsed:  {len(entries)}")
print(f"Mattokki words:        {len(mattokki_only)}")
print(f"Skipped lines:         {len(skipped)}")
print(f"\nSample Mattokki entries:")
for e in mattokki_only[:15]:
    print(f"  {e['english']:20s} → {e['mattokki']}")
