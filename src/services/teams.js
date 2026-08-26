import { getItem, setItem, KEYS } from './storage';

export function getTeams() {
  return getItem(KEYS.TEAMS) || [];
}

export function getTeamById(teamId) {
  const teams = getTeams();
  return teams.find(t => t.id.toLowerCase() === (teamId || '').toLowerCase());
}

export function getTeamByNameAndRoom(teamName, gameroomId) {
  if (!teamName || !gameroomId) return null;
  const teams = getTeams();
  const cleanName = teamName.trim().toLowerCase();
  const cleanRoom = gameroomId.trim().toLowerCase();

  return teams.find(t => 
    (t.gameroomId?.toLowerCase() === cleanRoom || t.id.toLowerCase() === cleanName) &&
    (t.teamName.toLowerCase() === cleanName || t.id.toLowerCase() === cleanName)
  );
}

export function findOrCreateTeamForRoom(teamName, gameroomId) {
  const existing = getTeamByNameAndRoom(teamName, gameroomId);
  if (existing) return existing;

  // Auto-create team for room
  return registerTeam({
    teamName: teamName.trim(),
    gameroomId: gameroomId.trim().toUpperCase(),
    leaderName: `${teamName.trim()} Lead`,
    email: `${teamName.trim().toLowerCase().replace(/\s+/g, '')}@gameroom.local`
  });
}

export function registerTeam(teamData) {
  const teams = getTeams();
  // Generate Team ID: EF-001, EF-002 ...
  const nextNum = teams.length + 1;
  const teamId = `EF-${String(nextNum).padStart(3, '0')}`;
  
  const newTeam = {
    id: teamId,
    teamName: teamData.teamName,
    gameroomId: teamData.gameroomId || 'ROOM-101',
    leaderName: teamData.leaderName || 'Team Leader',
    email: teamData.email || 'team@echoform.dev',
    members: teamData.members || [teamData.leaderName || 'Team Leader'],
    department: teamData.department || 'Digital Design',
    createdAt: new Date().toISOString()
  };

  teams.push(newTeam);
  setItem(KEYS.TEAMS, teams);
  return newTeam;
}

export function updateTeam(teamId, updateData) {
  const teams = getTeams();
  const index = teams.findIndex(t => t.id === teamId);
  if (index !== -1) {
    teams[index] = { ...teams[index], ...updateData };
    setItem(KEYS.TEAMS, teams);
    return teams[index];
  }
  return null;
}

export function deleteTeam(teamId) {
  const teams = getTeams();
  const filtered = teams.filter(t => t.id !== teamId);
  setItem(KEYS.TEAMS, filtered);
  return true;
}
