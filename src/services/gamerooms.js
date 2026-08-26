import { getItem, setItem, KEYS } from './storage';

export function getGamerooms() {
  return getItem(KEYS.GAMEROOMS) || [];
}

export function getGameroomById(id) {
  const rooms = getGamerooms();
  return rooms.find(r => r.id === id || r.code?.toLowerCase() === id?.toLowerCase());
}

export function createGameroom(data) {
  const rooms = getGamerooms();
  
  const roomCode = data.code ? data.code.toUpperCase().trim() : `ROOM-${Math.floor(100 + Math.random() * 900)}`;
  
  // Check duplicate code
  const existing = rooms.find(r => r.code === roomCode || r.id === roomCode);
  if (existing) {
    throw new Error(`Gameroom ID / Code "${roomCode}" already exists.`);
  }

  const newRoom = {
    id: roomCode,
    code: roomCode,
    name: data.name || `Gameroom ${roomCode}`,
    description: data.description || 'Interactive Design Sprint Gameroom',
    status: data.status || 'ACTIVE', // 'ACTIVE' | 'CLOSED'
    createdAt: new Date().toISOString()
  };

  rooms.push(newRoom);
  setItem(KEYS.GAMEROOMS, rooms);
  return newRoom;
}

export function updateGameroom(roomId, updates) {
  const rooms = getGamerooms();
  const index = rooms.findIndex(r => r.id === roomId);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...updates };
    setItem(KEYS.GAMEROOMS, rooms);
    return rooms[index];
  }
  return null;
}

export function deleteGameroom(roomId) {
  const rooms = getGamerooms();
  const filtered = rooms.filter(r => r.id !== roomId);
  setItem(KEYS.GAMEROOMS, filtered);
  return true;
}
