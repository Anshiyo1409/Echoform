import { getItem, setItem, KEYS } from './storage';

export function getSounds() {
  return getItem(KEYS.SOUNDS) || [];
}

export function getSoundById(soundId) {
  const sounds = getSounds();
  return sounds.find(s => s.id === soundId);
}

export function createSound(soundData) {
  const sounds = getSounds();
  const newSound = {
    id: `snd-${Date.now()}`,
    name: soundData.name,
    description: soundData.description || '',
    audioUrl: soundData.audioUrl || '',
    synthType: soundData.synthType || soundData.name,
    designDna: soundData.designDna || null,
    isCustom: !!soundData.audioUrl,
    active: true,
    createdAt: new Date().toISOString()
  };
  sounds.push(newSound);
  setItem(KEYS.SOUNDS, sounds);
  return newSound;
}

export function updateSound(soundId, updateData) {
  const sounds = getSounds();
  const index = sounds.findIndex(s => s.id === soundId);
  if (index !== -1) {
    sounds[index] = { ...sounds[index], ...updateData };
    setItem(KEYS.SOUNDS, sounds);
    return sounds[index];
  }
  return null;
}

export function deleteSound(soundId) {
  const sounds = getSounds();
  const filtered = sounds.filter(s => s.id !== soundId);
  setItem(KEYS.SOUNDS, filtered);
  return true;
}
