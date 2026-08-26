// ECHOFORM Storage Manager
import { DEFAULT_EVENT, INITIAL_SOUNDS, INITIAL_CONTEXTS, INITIAL_TEAMS, INITIAL_ASSIGNMENTS, INITIAL_GAMEROOMS } from '../utils/constants';

const KEYS = {
  EVENT: 'echoform_event',
  GAMEROOMS: 'echoform_gamerooms',
  TEAMS: 'echoform_teams',
  SOUNDS: 'echoform_sounds',
  CONTEXTS: 'echoform_contexts',
  ASSIGNMENTS: 'echoform_assignments',
  SUBMISSIONS: 'echoform_submissions',
  AUTH_SESSION: 'echoform_auth_session'
};

export function initStorage() {
  if (!localStorage.getItem(KEYS.EVENT)) {
    localStorage.setItem(KEYS.EVENT, JSON.stringify(DEFAULT_EVENT));
  }
  if (!localStorage.getItem(KEYS.GAMEROOMS)) {
    localStorage.setItem(KEYS.GAMEROOMS, JSON.stringify(INITIAL_GAMEROOMS));
  }
  if (!localStorage.getItem(KEYS.SOUNDS)) {
    localStorage.setItem(KEYS.SOUNDS, JSON.stringify(INITIAL_SOUNDS));
  }
  if (!localStorage.getItem(KEYS.CONTEXTS)) {
    localStorage.setItem(KEYS.CONTEXTS, JSON.stringify(INITIAL_CONTEXTS));
  }
  if (!localStorage.getItem(KEYS.TEAMS)) {
    localStorage.setItem(KEYS.TEAMS, JSON.stringify(INITIAL_TEAMS));
  }
  if (!localStorage.getItem(KEYS.ASSIGNMENTS)) {
    localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
  }
  if (!localStorage.getItem(KEYS.SUBMISSIONS)) {
    localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify([]));
  }
}

export function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage`, e);
  }
}

export { KEYS };
