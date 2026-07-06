// Audio playback wrapper around expo-audio.
// NOTE: expo-av was removed in Expo SDK 55 — this uses the supported successor.
// PRD §13/§6.6 — playsInSilentMode: true is critical (iPhones-on-silent in mosques etc.)

import { setAudioModeAsync, createAudioPlayer, type AudioPlayer } from 'expo-audio';

let initialised = false;

export async function initAudio() {
  if (initialised) return;
  await setAudioModeAsync({
    playsInSilentMode: true,          // PRD requirement — plays with the iOS silent switch on
    shouldPlayInBackground: false,
    interruptionMode: 'duckOthers',   // cross-platform (interruptionModeAndroid is deprecated)
    allowsRecording: false,
  });
  initialised = true;
}

// string = remote CDN URL (production); number = local require()'d asset
// (Phase -1 placeholder audio — see data/lessons.ts).
type Source = string | number;

const cache = new Map<Source, AudioPlayer>();

// PRD §21 Phase 1 Settings — "Audio volume slider." Applied to every player
// on creation and retroactively to already-cached ones on change.
let globalVolume = 1.0;

export function setVolume(v: number) {
  globalVolume = Math.max(0, Math.min(1, v));
  for (const p of cache.values()) p.volume = globalVolume;
}

export function getVolume() {
  return globalVolume;
}

export async function play(source: Source) {
  await initAudio();
  // Cheap LRU — keep last 16 players hot
  if (cache.size > 16) {
    const [first] = cache.keys();
    const old = cache.get(first);
    cache.delete(first);
    old?.remove();
  }
  let player = cache.get(source);
  if (!player) {
    player = createAudioPlayer(typeof source === 'number' ? source : { uri: source });
    player.volume = globalVolume;
    cache.set(source, player);
  }
  player.seekTo(0);
  player.play();
}

export function unloadAll() {
  for (const p of cache.values()) p.remove();
  cache.clear();
}
