import { getItem, setItem } from './storage';
import { CURATED_CHALLENGES } from '../utils/constants';

const VECTOR_KEYS = 'echoform_vector_mappings';

export function getVectorMappings() {
  let mappings = getItem(VECTOR_KEYS);
  if (!mappings) {
    mappings = [];
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
    id: `vector-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    soundName: vectorData.soundName || 'Uploaded Custom Audio',
    soundId: vectorData.soundId || '',
    contextName: vectorData.contextName || 'Café App',
    contextId: vectorData.contextId || '',
    designDna: vectorData.designDna || 'Texture',
    icon: vectorData.icon || '🎯',
    audioUrl: vectorData.audioUrl || '',
    isCustom: true,
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
  setItem(VECTOR_KEYS, []);
  return [];
}
