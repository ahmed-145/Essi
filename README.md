# Essi — Learn Nubian

> The world's first mobile learning platform for Mattokki (Kenzi) — the severely endangered indigenous language of the Egyptian Nubian people.

This is the **frontend / UI scaffold** that mirrors the design canvas in this same project. It's a real, runnable React Native + Expo codebase you can build out into the full product.

**Tagline.** اسقي جذورك — _Water your roots._

---

## What's in here

```
essi-rn/
├── app/                          Expo Router file-based routes
│   ├── _layout.tsx               Root layout, font loading, audio init
│   ├── index.tsx                 Welcome (Screen 1)
│   ├── onboarding/               Screens 2–8 of onboarding
│   ├── (tabs)/                   Home, Practice, Profile, Settings
│   └── lesson/[id].tsx           Lesson player with 4 exercise types
├── components/
│   ├── MattokkiText.tsx          Tri-script text component (PRD §6.2)
│   ├── EssiButton.tsx
│   ├── ScriptToggle.tsx
│   ├── AppTopBar.tsx / BottomNav.tsx
│   ├── brand/                    Sunburst, OilLampFlame, Drop, TreeGrassFrieze…
│   └── exercises/                AudioMatching, WordArrangement, SuffixSnap, MCQ
├── stores/                       Zustand: script, user, srs
├── lib/
│   ├── colors.ts                 Full Nubian palette from PRD §5.3
│   ├── fonts.ts                  Cairo, Fraunces, Sawarda Nubian, Inter
│   ├── srs.ts                    ML-SRS algorithm (PRD §6.4) — SM-2 extended
│   ├── audio.ts                  Expo AV wrapper
│   └── api.ts                    Supabase / API client
├── data/
│   ├── lessons/                  Lesson 1 fully populated as JSON shape
│   ├── morphology-rules.ts       All accusative allomorphs etc.
│   └── lexicon.ts                Verified core vocabulary (PRD Appendix A)
├── types/                        TS types for lesson, exercise, srs, user
├── assets/
│   └── fonts/                    Place Sawarda Nubian .ttf here
└── package.json, app.json, …     Expo + TS config
```

## What's mocked / TODO

This is a working frontend scaffold, not a complete app. Specifically:

- **No backend yet.** `lib/api.ts` returns mocked data; wire it to Supabase.
- **No real audio yet.** `lib/audio.ts` plays silence; drop `.m4a` files into S3 and replace URLs.
- **Sawarda Nubian font isn't included** (proprietary). Drop the `.ttf` into `assets/fonts/` and it'll load. `MattokkiText` falls back to Noto Sans Coptic.
- **Push notifications stubbed** — see `lib/notifications.ts`.
- **Auth screen is UI-only** — wire to `supabase.auth.signInWithApple/Google/OtpEmail`.
- **Tests, error boundaries, analytics** — not wired in.

## Running

```bash
cd essi-rn
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR with Expo Go on a real device.

For a real build (App Store / Play Store):

```bash
npx eas build --platform ios
npx eas build --platform android
```

## Design parity

Every component here matches an artboard in `Essi - All Screens.html`. If you tweak a screen, edit both — or treat the HTML canvas as the design source of truth and propagate to React Native.

The visual tokens (`lib/colors.ts`, `lib/fonts.ts`) match the canvas's `components/tokens.jsx` 1:1.

## Linguistic authority

This codebase ships with verified Mattokki vocabulary from:
- Abdel-Hafiz (1988/2024) — _A Reference Grammar of Kunuz Nubian_
- Massenbach (1933) — _Wörterbuch des nubischen Kunûzi-Dialektes_
- Armbruster (1965) — _Dongolese Nubian: A Lexicon_

See `data/lexicon.ts` for per-item source attribution.

## The promise

Learning content is **free forever**. No paywall. No ads. No data sales. The Mattokki language belongs to the Nubian community; Essi is a steward, not an owner. All language data is CC BY-NC-SA.

— with love, for the Nubian people 🪔
