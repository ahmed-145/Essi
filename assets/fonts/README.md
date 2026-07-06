# Fonts to drop here

The app loads these on startup via `lib/fonts.ts`. Until you drop the .ttf files in, the app falls back to system fonts (it still runs).

## Required

| File | Source | Notes |
|---|---|---|
| `SawardaNubian.ttf` | <https://github.com/eujayl/sawarda-nubian> (or contact Hatim Eujayl) | Old Nubian script. Falls back to NotoSansCoptic if missing. |
| `Inter-Regular.ttf`, `Inter-Medium.ttf`, `Inter-SemiBold.ttf`, `Inter-Bold.ttf` | <https://fonts.google.com/specimen/Inter> | Latin UI |
| `Cairo-Regular.ttf`, `Cairo-Bold.ttf` | <https://fonts.google.com/specimen/Cairo> | Arabic |
| `Fraunces-Regular.ttf`, `Fraunces-SemiBold.ttf` | <https://fonts.google.com/specimen/Fraunces> | Display |
| `NotoSansCoptic-Regular.ttf` | <https://fonts.google.com/noto/specimen/Noto+Sans+Coptic> | Old Nubian fallback |
| `JetBrainsMono-Regular.ttf` | <https://fonts.google.com/specimen/JetBrains+Mono> | Mono — for IPA, suffix glyphs |

## After dropping fonts in

```bash
npx expo start --clear
```

Run with `--clear` once so Metro picks up the new `require()`s.
