// ECHOFORM Default Constants & Seed Data

export const DEFAULT_EVENT = {
  id: 'evt-2026-01',
  name: 'ECHOFORM 2026',
  tagline: 'HEAR IT. INTERPRET IT. DESIGN IT.',
  date: '2026-08-31',
  startTime: '11:30',
  endTime: '16:30',
  durationHours: 5,
  status: 'LIVE', // 'UPCOMING' | 'LIVE' | 'ENDED'
  assignmentLocked: false,
  submissionOpen: true,
  announcement: 'Welcome to ECHOFORM 2026! 30 curated design vectors are loaded. Log in to reveal your challenge assignment.'
};

// Curated 30 Challenge Vectors as specified by ECHOFORM rules
export const CURATED_CHALLENGES = [
  { id: 'vector-01', soundName: '🌧️ Rain on a metal roof', contextName: 'Café App', icon: '☕', designDna: 'Texture', synthType: 'Rain + Traffic' },
  { id: 'vector-02', soundName: '🚆 Train journey ambience + rhythmic beat', contextName: 'Travel Booking', icon: '🚆', designDna: 'Movement', synthType: 'Railway Station' },
  { id: 'vector-03', soundName: '🎠 Dreamy music-box melody', contextName: 'Banking App', icon: '🏦', designDna: 'Typography', synthType: 'Clock Ticking' },
  { id: 'vector-04', soundName: '⚡ Glitchy electronic pulses', contextName: 'Café App', icon: '☕', designDna: 'Color', synthType: 'Cyberpunk Neon City' },
  { id: 'vector-05', soundName: '🌊 Ocean waves + ambient music', contextName: 'Productivity App', icon: '📊', designDna: 'Space', synthType: 'Ocean Waves' },
  { id: 'vector-06', soundName: '💓 Heartbeat + cinematic pulse', contextName: 'Food Delivery', icon: '🍕', designDna: 'Urgency', synthType: 'Thunderstorm' },
  { id: 'vector-07', soundName: '📻 Vintage radio + jazz', contextName: 'Social Media', icon: '📻', designDna: 'Retro Aesthetic', synthType: 'Coffee Shop Ambience' },
  { id: 'vector-08', soundName: '🌲 Forest ambience + soft piano', contextName: 'Dating App', icon: '🌲', designDna: 'Organic Shapes', synthType: 'Forest & Birds' },
  { id: 'vector-09', soundName: '🏙️ Busy city + traffic rhythm', contextName: 'Meditation App', icon: '🧘', designDna: 'Minimalism', synthType: 'Rain + Traffic' },
  { id: 'vector-10', soundName: '🎮 8-bit game music', contextName: 'Fitness App', icon: '🎮', designDna: 'Pixel Language', synthType: 'Cyberpunk Neon City' },
  { id: 'vector-11', soundName: '☕ Café chatter + cups + soft jazz', contextName: 'E-commerce', icon: '🛒', designDna: 'Hierarchy', synthType: 'Coffee Shop Ambience' },
  { id: 'vector-12', soundName: '🚨 Siren-like cinematic sound', contextName: 'Event Discovery', icon: '🎟️', designDna: 'Contrast', synthType: 'Railway Station' },
  { id: 'vector-13', soundName: '🌌 Ethereal ambient vocals', contextName: 'Navigation App', icon: '🧭', designDna: 'Atmosphere', synthType: 'Space Station Ambient' },
  { id: 'vector-14', soundName: '🪩 Funk / disco groove', contextName: 'Education Platform', icon: '🎓', designDna: 'Playfulness', synthType: 'Busy Market' },
  { id: 'vector-15', soundName: '🌙 Slow dark ambient', contextName: 'Sleep App', icon: '🌙', designDna: 'Negative Space', synthType: 'Space Station Ambient' },
  { id: 'vector-16', soundName: '🏖️ Upbeat summer indie', contextName: 'Finance App', icon: '💳', designDna: 'Warmth', synthType: 'Ocean Waves' },
  { id: 'vector-17', soundName: '🕰️ Clock ticking + piano', contextName: 'Food Ordering', icon: '🍔', designDna: 'Rhythm', synthType: 'Clock Ticking' },
  { id: 'vector-18', soundName: '🔧 Mechanical clicks + industrial beat', contextName: 'Fashion Store', icon: '👗', designDna: 'Geometry', synthType: 'Keyboard Typing' },
  { id: 'vector-19', soundName: '🎷 Smooth saxophone / lounge music', contextName: 'Smart Home', icon: '🏠', designDna: 'Elegance', synthType: 'Coffee Shop Ambience' },
  { id: 'vector-20', soundName: '🔥 Fast cinematic percussion', contextName: 'Library App', icon: '📚', designDna: 'Energy', synthType: 'Busy Market' },
  { id: 'vector-21', soundName: '🛸 Futuristic synthwave', contextName: 'Healthcare Dashboard', icon: '🏥', designDna: 'Futurism', synthType: 'Cyberpunk Neon City' },
  { id: 'vector-22', soundName: '🌧️ Thunderstorm + atmospheric music', contextName: 'Travel App', icon: '✈️', designDna: 'Mood', synthType: 'Thunderstorm' },
  { id: 'vector-23', soundName: '🎹 Emotional piano', contextName: 'Food Delivery', icon: '🍱', designDna: 'Storytelling', synthType: 'Clock Ticking' },
  { id: 'vector-24', soundName: '💿 80s synthwave', contextName: 'Real Estate App', icon: '🏢', designDna: 'Retro-Futurism', synthType: 'Cyberpunk Neon City' },
  { id: 'vector-25', soundName: '🧸 Gentle nostalgic melody', contextName: 'Social Media', icon: '💬', designDna: 'Memory', synthType: 'Forest & Birds' },
  { id: 'vector-26', soundName: '🧪 Strange experimental electronic', contextName: 'E-commerce', icon: '🛍️', designDna: 'Asymmetry', synthType: 'Space Station Ambient' },
  { id: 'vector-27', soundName: '🚀 Epic orchestral build', contextName: 'Public Transport', icon: '🚌', designDna: 'Scale', synthType: 'Railway Station' },
  { id: 'vector-28', soundName: '🌃 Neon city ambience + bass', contextName: 'Night Café', icon: '🌙', designDna: 'Glow & Contrast', synthType: 'Cyberpunk Neon City' },
  { id: 'vector-29', soundName: '🎪 Quirky circus / playful instrumental', contextName: 'Weather App', icon: '🌤️', designDna: 'Surprise', synthType: 'Busy Market' },
  { id: 'vector-30', soundName: '🔮 Mysterious cinematic soundscape', contextName: 'Lost & Found App', icon: '🔍', designDna: 'Mystery', synthType: 'Space Station Ambient' },
];

export const INITIAL_SOUNDS = CURATED_CHALLENGES.map((item, idx) => ({
  id: `snd-${(idx + 1).toString().padStart(2, '0')}`,
  name: item.soundName,
  description: `Audio vector paired with ${item.contextName} requiring ${item.designDna} design DNA.`,
  audioUrl: '',
  synthType: item.synthType,
  designDna: item.designDna,
  active: true
}));

export const INITIAL_CONTEXTS = CURATED_CHALLENGES.map((item, idx) => ({
  id: `ctx-${(idx + 1).toString().padStart(2, '0')}`,
  name: item.contextName,
  icon: item.icon,
  description: `Target application context: ${item.contextName} emphasizing ${item.designDna}.`,
  designDna: item.designDna,
  active: true
}));

export const INITIAL_GAMEROOMS = [
  {
    id: 'ROOM-101',
    code: 'ROOM-101',
    name: 'Cyber Design Arena 2026',
    description: 'Main ECHOFORM 2026 competitive design room.',
    status: 'ACTIVE',
    createdAt: '2026-08-25T09:00:00.000Z'
  },
  {
    id: 'ROOM-102',
    code: 'ROOM-102',
    name: 'UI/UX Sprint Room B',
    description: 'Secondary sprint challenge arena.',
    status: 'ACTIVE',
    createdAt: '2026-08-25T09:30:00.000Z'
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'EF-001',
    teamName: 'Neon Wave Studio',
    gameroomId: 'ROOM-101',
    leaderName: 'Alex Rivera',
    email: 'alex@echoform.dev',
    members: ['Alex Rivera', 'Maya Lin', 'Kaelen Vance'],
    department: 'Digital Design & HCI',
    phone: '+1 555-0192',
    password: 'password123',
    createdAt: '2026-08-25T10:00:00.000Z'
  },
  {
    id: 'EF-002',
    teamName: 'Pixel Pioneers',
    leaderName: 'Sophia Chen',
    email: 'sophia@echoform.dev',
    members: ['Sophia Chen', 'David Ross'],
    department: 'Computer Science',
    phone: '+1 555-0144',
    password: 'password123',
    createdAt: '2026-08-25T10:15:00.000Z'
  },
  {
    id: 'EF-003',
    teamName: 'Cyber Canvas',
    leaderName: 'Marcus Thorne',
    email: 'marcus@echoform.dev',
    members: ['Marcus Thorne', 'Elena Rostova', 'Leo Zhang'],
    department: 'Industrial Design',
    phone: '+1 555-0188',
    password: 'password123',
    createdAt: '2026-08-25T10:30:00.000Z'
  },
  {
    id: 'EF-004',
    teamName: 'Aura Collective',
    leaderName: 'Zara Malik',
    email: 'zara@echoform.dev',
    members: ['Zara Malik', 'Jonah Hill'],
    department: 'UI/UX Design Lab',
    phone: '+1 555-0122',
    password: 'password123',
    createdAt: '2026-08-25T10:45:00.000Z'
  },
  {
    id: 'EF-005',
    teamName: 'Synthetix UI',
    leaderName: 'Devon Park',
    email: 'devon@echoform.dev',
    members: ['Devon Park', 'Nia Sharma', 'Lucas Gray'],
    department: 'Media Arts',
    phone: '+1 555-0177',
    password: 'password123',
    createdAt: '2026-08-25T11:00:00.000Z'
  }
];

export const INITIAL_ASSIGNMENTS = INITIAL_TEAMS.map((team, idx) => ({
  id: `asg-${team.id}`,
  teamId: team.id,
  soundId: INITIAL_SOUNDS[idx % INITIAL_SOUNDS.length].id,
  contextId: INITIAL_CONTEXTS[idx % INITIAL_CONTEXTS.length].id,
  customDesignDna: CURATED_CHALLENGES[idx % CURATED_CHALLENGES.length].designDna,
  revealed: false,
  revealedAt: null,
  assignedAt: '2026-08-25T11:15:00.000Z'
}));
