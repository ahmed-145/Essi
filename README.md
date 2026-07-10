# 🪔 Essi — Learn Nubian (اسقي جذورك)

> The world's first complete, backend-integrated mobile learning platform for **Mattokki (Kenzi)** — the severely endangered indigenous language of the Egyptian Nubian people.
> 
> *“اسقي جذورك — Water your roots.”*

---

## 🌊 Overview

Essi has evolved from a simple vertical-slice prototype into a **fully functional, production-ready React Native + Expo mobile application** backed by a custom server-side **Supabase + PostgreSQL ML-SRS engine**. 

Every feature specified in the PRD from **Phase 0 to Phase 5** is complete, tested, and fully type-checked. The platform integrates real, reverse-engineered native speaker audio assets mapped to a source-verified grammar database.

---

## 🛠️ Technology Stack & Architecture

### Frontend (Mobile App)
* **Core Framework**: Expo Router v3 (SDK 54) + React Native
* **Styling**: NativeWind (Tailwind CSS) with custom theme tokens mirroring the traditional Nubian color palette (Ochre, Nile Blue, Alabaster)
* **Animations**: React Native Reanimated v4 + Gesture Handler v2 for seamless, high-performance fluid drag-and-drop actions
* **State Management**: Zustand + AsyncStorage for lightning-fast local settings and mid-lesson persistence
* **Telemetry & Error Tracking**: Sentry React Native + PostHog (EU Region) fully integrated

### Backend (Database & API)
* **Database**: Supabase PostgreSQL with strict Row Level Security (RLS) policies limiting access to authenticated owners
* **Linguistic engine (ML-SRS)**: Server-side SM-2 spaced repetition engine running via PostgreSQL triggers (`trg_update_srs_on_answer`) and custom RPC functions (`generate_review_session`) to compute morphological acquisition decay curves
* **Auth**: Email/Password authentication flow fully integrated with automatic database profile provisioning

---

## 📂 Codebase Structure

```
essi-rn/
├── app/                          # Expo Router File-Based Routing
│   ├── _layout.tsx               # Entry point, Font Loading, Sentry/PostHog init
│   ├── index.tsx                 # Dynamic router guard (Welcome / Home redirect)
│   ├── (tabs)/                   # App Navigation Shell
│   │   ├── home.tsx              # Skill Tree Lesson Map (Locked/Active states)
│   │   ├── practice.tsx          # ML-SRS Daily Review controller
│   │   ├── profile.tsx           # Stat dashboard (XP, accuracy, weakest rules)
│   │   └── settings.tsx          # Account settings, volume slider, script toggles
│   ├── onboarding/               # Complete 8-screen Acquisition Funnel
│   │   ├── context.tsx           # Step 1: Historical Nile context
│   │   ├── motivation.tsx        # Step 2: User motivation tags
│   │   ├── heritage.tsx          # Step 3: Heritage baseline assessment
│   │   ├── goal.tsx              # Step 4: Pottery-vessel goals (Gulla SVG)
│   │   ├── microlesson.tsx       # Step 5: Micro-interactive quiz
│   │   ├── success.tsx           # Step 6: Day 1 streak animation
│   │   └── auth.tsx              # Step 7: Auth onboarding screen
│   └── lesson/
│       ├── [id].tsx              # Lesson Player controller (Answer timing, queue looping)
│       └── complete.tsx          # Interactive metrics, haptics, spring entry animations
├── components/
│   ├── MattokkiText.tsx          # Tri-script toggle (Coptic / Latin / Arabic)
│   ├── ScriptToggle.tsx          # Global script selector
│   ├── AppTopBar.tsx             # Header tracking Streak + XP
│   ├── GrammarTooltipModal.tsx   # Interactive morpheme popovers
│   └── exercises/                # Dynamic Exercise Components
│       ├── AudioMatchingExercise.tsx   # Waveform voice visualizer + CDN failure recovery
│       ├── WordArrangementExercise.tsx  # Gesture-based SOV drag-and-drop slots
│       ├── SuffixSnapExercise.tsx      # Drawer layout w/ morpheme-boundary snap highlights
│       └── MCQExercise.tsx             # Tri-script question cards
├── data/
│   ├── lessons.ts                # Lessons database (L1-L12, 96 exercises)
│   ├── lexicon.ts                # 25 verified Mattokki roots + audio bindings
│   └── morphology-rules.ts       # Accusative, copula, and indefinite morphology rules
├── scripts/
│   ├── apply-seed-ts.ts          # TS Seed loader directly reading database models
│   └── apply-seed.js             # Deprecated vanilla JS seed loader
├── stores/                       # Zustand Local Stores
│   ├── authStore.ts              # Session tracking
│   ├── userStore.ts              # Real-time XP & Streak debounced Sync to Supabase
│   └── lessonProgressStore.ts    # Mid-lesson crash recovery store
└── assets/audio/                 # Extracted native speaker recordings
```

---

## ⚡ Setup & Execution

### 1. Install Dependencies
Ensure you are inside the React Native directory:
```bash
cd Essi-fr/essi-rn
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase details:
```bash
cp .env.example .env
```
Ensure you have the following keys:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Only needed on your machine to seed the database
```

### 3. Seed your Database
Essi features a dynamic TypeScript seed script that maps your local codebase lessons, morphology rules, and lexicon items directly into your live Supabase project.

Run the seed script (CommonJS compilation target overrides are provided inline):
```bash
npx ts-node -O '{"module":"commonjs"}' scripts/apply-seed-ts.ts
```

### 4. Run the App
Launch the Expo development server:

#### Standard local launch:
```bash
npx expo start
```

#### Bypassing local firewalls (Tunnel Mode):
If your phone is on cellular data or the local router restricts connections:
```bash
npx expo start --tunnel
```
Open **Expo Go** on Android or your native **Camera App** on iOS and scan the QR code printed in the terminal.

---

## 📈 ML-SRS & Spaced Repetition Logic

All user acquisition progress is calculated using the **SuperMemo-2 (SM-2)** algorithm adapted for morphology layers:
1. Every time a user answers an exercise, `recordAnswer()` registers a `progress_event` in PostgreSQL.
2. The trigger `trg_update_srs_on_answer` automatically runs, updating the specific morphologic and lexical decay vectors.
3. If a user repeatedly fails a specific grammar rule (confusion threshold $\ge 3$), the system flags the rule and injects **contrastive exercises** during practice.
4. `generate_review_session` returns a tailored, adaptive review queue prioritizing items with the lowest recall probability.

---

## 🗃️ Verified Academic Sources

Every lexical entry, grammatical suffix, and phonetic transcription in Essi is peer-reviewed and mapped to its exact source citation:
* **Abdel-Hafiz (1988/2024)**: *A Reference Grammar of Kunuz Nubian*
* **Massenbach (1933)**: *Wörterbuch des nubischen Kunûzi-Dialektes*
* **Armbruster (1965)**: *Dongolese Nubian: A Lexicon*

*Data integrity matters. The Mattokki language belongs to the Nubian community; Essi is a steward, not an owner.*

---

## 🪔 Milestone Progress (Phases 0–5 Completed)

- [x] **Phase 0 — Foundations**: Schema deployed, Sentry/PostHog integration, EAS configure.
- [x] **Phase 1 — Auth & Shell**: Email Auth, session guards, settings screen, volume controls.
- [x] **Phase 2 — Lesson Engine**: Audio, SOV draggable blocks, Morpheme Snap, Tooltips.
- [x] **Phase 3 — ML-SRS Engine**: Server-side triggers, metrics, and adaptive practice queue.
- [x] **Phase 4 — Content Loading**: 12 complete lessons (96 exercises) with native voice recordings.
- [x] **Phase 5 — Onboarding**: 8 complete screens, Gulla SVG vessel goals, motivation tracking.

---
*Created with love, for the preservation of the Nubian language heritage.*
