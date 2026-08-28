import { getItem, setItem, KEYS } from './storage';
import { saveAudioToDB, getAudioFromDB, deleteAudioFromDB } from './audioStorage';

export function getSounds() {
  const sounds = getItem(KEYS.SOUNDS) || [];
  // Ensure sounds array is returned
  return sounds;
}

export function getSoundById(soundId) {
  const sounds = getSounds();
  return sounds.find(s => s.id === soundId);
}

export async function createSound(soundData) {
  const sounds = getSounds();
  const soundId = `snd-${Date.now()}`;
  let audioUrl = soundData.audioUrl || '';

  // If audioUrl is a large base64 Data URL, offload it to IndexedDB to avoid 5MB localStorage quota limit
  if (audioUrl.startsWith('data:audio/')) {
    await saveAudioToDB(soundId, audioUrl);
    // Keep reference in sound object
  }

  const newSound = {
    id: soundId,
    name: soundData.name,
    description: soundData.description || '',
    audioUrl: audioUrl,
    synthType: soundData.synthType || soundData.name,
    designDna: soundData.designDna || null,
    isCustom: !!audioUrl,
    active: true,
    createdAt: new Date().toISOString()
  };

  sounds.push(newSound);
  setItem(KEYS.SOUNDS, sounds);
  return newSound;
}

export async function updateSound(soundId, updateData) {
  const sounds = getSounds();
  const index = sounds.findIndex(s => s.id === soundId);
  if (index !== -1) {
    if (updateData.audioUrl && updateData.audioUrl.startsWith('data:audio/')) {
      await saveAudioToDB(soundId, updateData.audioUrl);
    }
    sounds[index] = { ...sounds[index], ...updateData };
    setItem(KEYS.SOUNDS, sounds);
    return sounds[index];
  }
  return null;
}

export async function deleteSound(soundId) {
  const sounds = getSounds();
  const filtered = sounds.filter(s => s.id !== soundId);
  await deleteAudioFromDB(soundId);
  setItem(KEYS.SOUNDS, filtered);
  return true;
}
