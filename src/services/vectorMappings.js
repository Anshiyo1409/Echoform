import { getItem, setItem, KEYS } from './storage';
import { CURATED_CHALLENGES } from '../utils/constants';

const VECTOR_KEYS = 'echoform_vector_mappings';

export function getVectorMappings() {
  let mappings = getItem(VECTOR_KEYS);
  if (!mappings || mappings.length === 0) {
    mappings = CURATED_CHALLENGES.map((item, idx) => ({
      id: item.id || `vector-${idx + 1}`,
      soundName: item.soundName,
      soundId: `snd-${(idx + 1).toString().padStart(2, '0')}`,
      contextName: item.contextName,
      contextId: `ctx-${(idx + 1).toString().padStart(2, '0')}`,
      designDna: item.designDna,
      icon: item.icon || '🎯',
      synthType: item.synthType,
      active: true
    }));
    setItem(VECTOR_KEYS, mappings);
  }
  return mappings;
}

export function saveVectorMapping(id, updateData) {
  const mappings = getVectorMappings();
  const index = mappings.findIndex(m => m.id === id);
  if (index !== -1) {
    mappings[index] = { ...mappings[index], ...updateData };
    setItem(VECTOR_KEYS, mappings);
    return mappings[index];
  }
  return null;
}

export function createVectorMapping(vectorData) {
  const mappings = getVectorMappings();
  const newMapping = {
    id: `vector-${Date.now()}`,
    soundName: vectorData.soundName || 'Custom Audio',
    soundId: vectorData.soundId || '',
    contextName: vectorData.contextName || 'Café App',
    contextId: vectorData.contextId || '',
    designDna: vectorData.designDna || 'SONIC TEXTURE',
    icon: vectorData.icon || '🎯',
    synthType: vectorData.synthType || 'Rain + Traffic',
    audioUrl: vectorData.audioUrl || '',
    active: true,
    createdAt: new Date().toISOString()
  };
  mappings.push(newMapping);
  setItem(VECTOR_KEYS, mappings);
  return newMapping;
}

export function deleteVectorMapping(id) {
  const mappings = getVectorMappings();
  const filtered = mappings.filter(m => m.id !== id);
  setItem(VECTOR_KEYS, filtered);
  return true;
}

export function resetVectorMappingsToDefault() {
  const defaults = CURATED_CHALLENGES.map((item, idx) => ({
    id: `vector-${idx + 1}`,
    soundName: item.soundName,
    soundId: `snd-${(idx + 1).toString().padStart(2, '0')}`,
    contextName: item.contextName,
    contextId: `ctx-${(idx + 1).toString().padStart(2, '0')}`,
    designDna: item.designDna,
    icon: item.icon || '🎯',
    synthType: item.synthType,
    active: true
  }));
  setItem(VECTOR_KEYS, defaults);
  return defaults;
}
