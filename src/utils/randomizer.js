// ECHOFORM Challenge Randomization Engine

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
 * 1. Unique sound per team (or looped if teams > sounds)
 * 2. Balanced context distribution (equal allocation of contexts across teams)
 */
export function generateRandomAssignments(teams = [], sounds = [], contexts = []) {
  const activeSounds = sounds.filter(s => s.active !== false);
  const activeContexts = contexts.filter(c => c.active !== false);

  if (teams.length === 0 || activeSounds.length === 0 || activeContexts.length === 0) {
    return [];
  }

  // Shuffle active sounds
  const shuffledSounds = shuffleArray(activeSounds);
  
  // Create balanced pool of contexts
  const contextPool = [];
  const minPerContext = Math.floor(teams.length / activeContexts.length);
  const remainder = teams.length % activeContexts.length;

  const shuffledContexts = shuffleArray(activeContexts);

  shuffledContexts.forEach((ctx, idx) => {
    const count = minPerContext + (idx < remainder ? 1 : 0);
    for (let c = 0; c < count; c++) {
      contextPool.push(ctx);
    }
  });

  // Final shuffle of context pool to randomize order across teams
  const finalContexts = shuffleArray(contextPool);

  const assignments = teams.map((team, index) => {
    // Pick unique sound (cycle if more teams than sounds)
    const sound = shuffledSounds[index % shuffledSounds.length];
    const context = finalContexts[index];

    return {
      id: `asg-${team.id}`,
      teamId: team.id,
      soundId: sound.id,
      contextId: context.id,
      revealed: false,
      revealedAt: null,
      assignedAt: new Date().toISOString()
    };
  });

  return assignments;
}
