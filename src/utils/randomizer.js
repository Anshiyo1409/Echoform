// ECHOFORM Challenge Randomization Engine
import { CURATED_CHALLENGES } from './constants';

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates assignments ensuring:
 * 1. Each team receives a unique curated challenge vector (Sound + Context + Design DNA)
 * 2. Vector pairs follow the 30 ECHOFORM rules
 */
export function generateRandomAssignments(teams = [], sounds = [], contexts = []) {
  if (teams.length === 0) {
    return [];
  }

  // Shuffle available 30 curated challenge vectors
  const shuffledVectors = shuffleArray(CURATED_CHALLENGES);

  const assignments = teams.map((team, index) => {
    const vector = shuffledVectors[index % shuffledVectors.length];
    
    // Find matching sound & context in active list or fallback to index matching
    const soundMatch = sounds.find(s => s.name === vector.soundName || s.synthType === vector.synthType) || sounds[index % (sounds.length || 1)] || { id: `snd-${index}` };
    const contextMatch = contexts.find(c => c.name === vector.contextName) || contexts[index % (contexts.length || 1)] || { id: `ctx-${index}` };

    return {
      id: `asg-${team.id}`,
      teamId: team.id,
      soundId: soundMatch.id,
      contextId: contextMatch.id,
      customDesignDna: vector.designDna,
      customSound: soundMatch.audioUrl ? null : {
        name: vector.soundName,
        synthType: vector.synthType
      },
      customContext: {
        name: vector.contextName,
        icon: vector.icon,
        description: `Target application context: ${vector.contextName} emphasizing ${vector.designDna}.`
      },
      revealed: false,
      revealedAt: null,
      assignedAt: new Date().toISOString()
    };
  });

  return assignments;
}
