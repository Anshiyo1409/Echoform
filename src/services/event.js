import { getItem, setItem, KEYS } from './storage';
import { DEFAULT_EVENT } from '../utils/constants';

export function getEventDetails() {
  return getItem(KEYS.EVENT) || DEFAULT_EVENT;
}

export function updateEventDetails(updates) {
  const current = getEventDetails();
  const updated = { ...current, ...updates };
  setItem(KEYS.EVENT, updated);
  return updated;
}

export function toggleAssignmentLock(lockedState) {
  const current = getEventDetails();
  const isLocked = lockedState !== undefined ? lockedState : !current.assignmentLocked;
  return updateEventDetails({ assignmentLocked: isLocked });
}

export function setEventStatus(status) {
  return updateEventDetails({ status });
}
