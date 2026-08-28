import { getItem, setItem, KEYS } from './storage';
import { getTeams } from './teams';
import { getSounds } from './sounds';
import { getContexts } from './contexts';
import { generateRandomAssignments } from '../utils/randomizer';
import { CURATED_CHALLENGES } from '../utils/constants';

export function getAssignments() {
  return getItem(KEYS.ASSIGNMENTS) || [];
}

export function getAssignmentByTeamId(teamId) {
  const assignments = getAssignments();
  const soundList = getSounds();
  const contextList = getContexts();

  let asg = assignments.find(a => a.teamId === teamId);

  // If no assignment exists for this team, generate one from CURATED_CHALLENGES
  if (!asg) {
    const teamIdx = Math.abs(hashCode(teamId)) % CURATED_CHALLENGES.length;
    const vector = CURATED_CHALLENGES[teamIdx];
    
    return {
      id: `asg-${teamId}`,
      teamId,
      revealed: false,
      revealedAt: null,
      assignedAt: new Date().toISOString(),
      sound: {
        id: `snd-${teamIdx + 1}`,
        name: vector.soundName,
        synthType: vector.synthType,
        description: `Audio vector for ${vector.contextName} emphasizing ${vector.designDna}.`,
        designDna: vector.designDna
      },
      context: {
        id: `ctx-${teamIdx + 1}`,
        name: vector.contextName,
        icon: vector.icon,
        description: `Target application context: ${vector.contextName} emphasizing ${vector.designDna}.`,
        designDna: vector.designDna
      }
    };
  }

  let sound = soundList.find(s => s.id === asg.soundId);
  let context = contextList.find(c => c.id === asg.contextId);

  // Apply custom sound override if present
  if (asg.customSound) {
    sound = {
      ...(sound || {}),
      ...asg.customSound
    };
  }

  // Apply custom context override if present
  if (asg.customContext) {
    context = {
      ...(context || {}),
      ...asg.customContext
    };
  }

  // Apply custom design DNA override if present
  if (asg.customDesignDna) {
    if (context) {
      context = { ...context, designDna: asg.customDesignDna };
    } else {
      context = { name: 'Custom Context', designDna: asg.customDesignDna, icon: '🎯' };
    }
  }

  // Fallback to match curated challenges if sound or context is unlinked
  if (!sound || !context) {
    const teamIdx = Math.abs(hashCode(teamId)) % CURATED_CHALLENGES.length;
    const vector = CURATED_CHALLENGES[teamIdx];
    if (!sound) {
      sound = { id: `snd-${teamIdx + 1}`, name: vector.soundName, synthType: vector.synthType, designDna: vector.designDna };
    }
    if (!context) {
      context = { id: `ctx-${teamIdx + 1}`, name: vector.contextName, icon: vector.icon, designDna: vector.designDna };
    }
  }

  return {
    ...asg,
    sound,
    context
  };
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function markAssignmentRevealed(teamId) {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.teamId === teamId);
  if (index !== -1) {
    assignments[index].revealed = true;
    assignments[index].revealedAt = new Date().toISOString();
    setItem(KEYS.ASSIGNMENTS, assignments);
    return assignments[index];
  }
  return null;
}

export function generateAndSaveAssignments() {
  const teams = getTeams();
  const sounds = getSounds();
  const contexts = getContexts();

  const newAssignments = generateRandomAssignments(teams, sounds, contexts);
  setItem(KEYS.ASSIGNMENTS, newAssignments);
  return newAssignments;
}

export function updateSingleAssignment(teamId, soundId, contextId, customOverrides = null) {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.teamId === teamId);
  
  const payload = {
    soundId,
    contextId,
    customSound: customOverrides?.customSound || null,
    customContext: customOverrides?.customContext || null,
    customDesignDna: customOverrides?.customDesignDna || null
  };

  if (index !== -1) {
    assignments[index] = {
      ...assignments[index],
      ...payload
    };
  } else {
    assignments.push({
      id: `asg-${teamId}`,
      teamId,
      ...payload,
      revealed: false,
      revealedAt: null,
      assignedAt: new Date().toISOString()
    });
  }
  setItem(KEYS.ASSIGNMENTS, assignments);
  return assignments;
}
