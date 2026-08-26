import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, KEYS } from '../services/storage';
import { getTeamById, findOrCreateTeamForRoom } from '../services/teams';
import { getGameroomById } from '../services/gamerooms';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getItem(KEYS.AUTH_SESSION);
    if (session) {
      if (session.role === 'admin') {
        setCurrentUser({ role: 'admin', name: 'Organizer Admin' });
      } else if (session.role === 'participant' && session.teamId) {
        const team = getTeamById(session.teamId);
        const gameroom = session.gameroomId ? getGameroomById(session.gameroomId) : null;
        if (team) {
          setCurrentUser({ role: 'participant', team, gameroom });
        }
      }
    }
    setLoading(false);
  }, []);

  const loginTeam = (teamName, gameroomId) => {
    if (!teamName || !teamName.trim()) {
      return { success: false, error: 'Please enter your Team Name.' };
    }
    if (!gameroomId || !gameroomId.trim()) {
      return { success: false, error: 'Please enter a Gameroom ID.' };
    }

    const room = getGameroomById(gameroomId.trim());
    if (!room) {
      return { 
        success: false, 
        error: `Gameroom ID "${gameroomId}" not found. Please verify with your admin or try ROOM-101.` 
      };
    }

    if (room.status === 'CLOSED') {
      return { success: false, error: `Gameroom "${room.name}" (${room.id}) is currently closed.` };
    }

    const team = findOrCreateTeamForRoom(teamName.trim(), room.id);
    const session = { role: 'participant', teamId: team.id, gameroomId: room.id };
    
    setItem(KEYS.AUTH_SESSION, session);
    setCurrentUser({ role: 'participant', team, gameroom: room });
    return { success: true, team, gameroom: room };
  };

  const loginAdmin = (passcode) => {
    if (passcode === 'admin' || passcode === 'echoform2026') {
      const session = { role: 'admin' };
      setItem(KEYS.AUTH_SESSION, session);
      setCurrentUser({ role: 'admin', name: 'Organizer Admin' });
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials.' };
  };

  const logout = () => {
    localStorage.removeItem(KEYS.AUTH_SESSION);
    setCurrentUser(null);
  };

  const refreshUser = () => {
    if (currentUser?.role === 'participant' && currentUser?.team?.id) {
      const updated = getTeamById(currentUser.team.id);
      if (updated) {
        setCurrentUser(prev => ({ ...prev, team: updated }));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginTeam, loginAdmin, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
