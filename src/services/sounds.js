import { getItem, setItem, KEYS } from './storage';
import { saveAudioToDB, getAudioFromDB, deleteAudioFromDB } from './audioStorage';

export function getSounds() {
  const sounds = getItem(KEYS.SOUNDS) || [];
  return sounds;
}

export function getSoundById(soundId) {
  const sounds = getSounds();
  return sounds.find(s => s.id === soundId);
}

export async function loadAudioUrlForSound(sound) {
  if (!sound) return null;
  if (sound.audioUrl && (sound.audioUrl.startsWith('http') || sound.audioUrl.startsWith('data:audio/'))) {
    return sound.audioUrl;
  }
  // Try retrieving heavy audio Data URL from IndexedDB
  const idbAudio = await getAudioFromDB(sound.id);
  if (idbAudio) {
    return idbAudio;
  }
  return sound.audioUrl || null;
}

export async function createSound(soundData) {
  const sounds = getSounds();
  const soundId = `snd-${Date.now()}`;
  const rawAudioUrl = soundData.audioUrl || '';
  const isBase64 = rawAudioUrl.startsWith('data:audio/');

  if (isBase64) {
    // Store heavy audio stream in IndexedDB
    await saveAudioToDB(soundId, rawAudioUrl);
  }

  // Create lightweight metadata for localStorage to avoid 5MB quota limit
  const newSound = {
    id: soundId,
    name: soundData.name,
    description: soundData.description || '',
    // If base64, save identifier marker in localStorage; full data lives in IndexedDB
    audioUrl: isBase64 ? `[IDB]:${soundId}` : rawAudioUrl,
    synthType: soundData.synthType || soundData.name,
    designDna: soundData.designDna || null,
    isCustom: !!rawAudioUrl,
    hasIdbAudio: isBase64,
    active: true,
    createdAt: new Date().toISOString()
  };

  sounds.push(newSound);
  setItem(KEYS.SOUNDS, sounds);

  // Return sound object with original audioUrl attached in memory
  return {
    ...newSound,
    audioUrl: rawAudioUrl
  };
}

export async function updateSound(soundId, updateData) {
  const sounds = getSounds();
  const index = sounds.findIndex(s => s.id === soundId);
  if (index !== -1) {
    const rawAudioUrl = updateData.audioUrl || '';
    const isBase64 = rawAudioUrl.startsWith('data:audio/');

    if (isBase64) {
      await saveAudioToDB(soundId, rawAudioUrl);
    }

    const updatedSound = {
      ...sounds[index],
      ...updateData,
      audioUrl: isBase64 ? `[IDB]:${soundId}` : rawAudioUrl,
      hasIdbAudio: isBase64 || sounds[index].hasIdbAudio
    };

    sounds[index] = updatedSound;
    setItem(KEYS.SOUNDS, sounds);
    return {
      ...updatedSound,
      audioUrl: rawAudioUrl || updatedSound.audioUrl
    };
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
