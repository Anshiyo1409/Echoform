import { getItem, setItem, KEYS } from './storage';

export function getContexts() {
  return getItem(KEYS.CONTEXTS) || [];
}

export function getContextById(contextId) {
  const contexts = getContexts();
  return contexts.find(c => c.id === contextId);
}

export function createContext(contextData) {
  const contexts = getContexts();
  const newContext = {
    id: `ctx-${Date.now()}`,
    name: contextData.name,
    icon: contextData.icon || '🎯',
    description: contextData.description || '',
    designDna: contextData.designDna || 'SONIC TEXTURE',
    active: true,
    createdAt: new Date().toISOString()
  };
  contexts.push(newContext);
  setItem(KEYS.CONTEXTS, contexts);
  return newContext;
}

export function updateContext(contextId, updateData) {
  const contexts = getContexts();
  const index = contexts.findIndex(c => c.id === contextId);
  if (index !== -1) {
    contexts[index] = { ...contexts[index], ...updateData };
    setItem(KEYS.CONTEXTS, contexts);
    return contexts[index];
  }
  return null;
}

export function deleteContext(contextId) {
  const contexts = getContexts();
  const filtered = contexts.filter(c => c.id !== contextId);
  setItem(KEYS.CONTEXTS, filtered);
  return true;
}
