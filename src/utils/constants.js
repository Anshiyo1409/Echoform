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
  announcement: 'Welcome to ECHOFORM 2026! Upload your custom audio tracks to map them with contexts and design DNA.'
};

export const DESIGN_DNA_OPTIONS = [
  'Texture',
  'Movement',
  'Typography',
  'Color',
  'Space',
  'Urgency',
  'Retro Aesthetic',
  'Organic Shapes',
  'Minimalism',
  'Pixel Language',
  'Hierarchy',
  'Contrast',
  'Atmosphere',
  'Playfulness',
  'Negative Space',
  'Warmth',
  'Rhythm',
  'Geometry',
  'Elegance',
  'Energy',
  'Futurism',
  'Mood',
  'Storytelling',
  'Retro-Futurism',
  'Memory',
  'Asymmetry',
  'Scale',
  'Glow & Contrast',
  'Surprise',
  'Mystery'
];

// Curated Context & Design DNA Presets (Ready for Custom Audio Mapping)
export const CURATED_CHALLENGES = [
  { id: 'vector-01', contextName: 'Café App', icon: '☕', designDna: 'Texture' },
  { id: 'vector-02', contextName: 'Travel Booking', icon: '🚆', designDna: 'Movement' },
  { id: 'vector-03', contextName: 'Banking App', icon: '🏦', designDna: 'Typography' },
  { id: 'vector-04', contextName: 'Café App', icon: '☕', designDna: 'Color' },
  { id: 'vector-05', contextName: 'Productivity App', icon: '📊', designDna: 'Space' },
  { id: 'vector-06', contextName: 'Food Delivery', icon: '🍕', designDna: 'Urgency' },
  { id: 'vector-07', contextName: 'Social Media', icon: '📻', designDna: 'Retro Aesthetic' },
  { id: 'vector-08', contextName: 'Dating App', icon: '🌲', designDna: 'Organic Shapes' },
  { id: 'vector-09', contextName: 'Meditation App', icon: '🧘', designDna: 'Minimalism' },
  { id: 'vector-10', contextName: 'Fitness App', icon: '🎮', designDna: 'Pixel Language' },
  { id: 'vector-11', contextName: 'E-commerce', icon: '🛒', designDna: 'Hierarchy' },
  { id: 'vector-12', contextName: 'Event Discovery', icon: '🎟️', designDna: 'Contrast' },
  { id: 'vector-13', contextName: 'Navigation App', icon: '🧭', designDna: 'Atmosphere' },
  { id: 'vector-14', contextName: 'Education Platform', icon: '🎓', designDna: 'Playfulness' },
  { id: 'vector-15', contextName: 'Sleep App', icon: '🌙', designDna: 'Negative Space' },
  { id: 'vector-16', contextName: 'Finance App', icon: '💳', designDna: 'Warmth' },
  { id: 'vector-17', contextName: 'Food Ordering', icon: '🍔', designDna: 'Rhythm' },
  { id: 'vector-18', contextName: 'Fashion Store', icon: '👗', designDna: 'Geometry' },
  { id: 'vector-19', contextName: 'Smart Home', icon: '🏠', designDna: 'Elegance' },
  { id: 'vector-20', contextName: 'Library App', icon: '📚', designDna: 'Energy' },
  { id: 'vector-21', contextName: 'Healthcare Dashboard', icon: '🏥', designDna: 'Futurism' },
  { id: 'vector-22', contextName: 'Travel App', icon: '✈️', designDna: 'Mood' },
  { id: 'vector-23', contextName: 'Food Delivery', icon: '🍱', designDna: 'Storytelling' },
  { id: 'vector-24', contextName: 'Real Estate App', icon: '🏢', designDna: 'Retro-Futurism' },
  { id: 'vector-25', contextName: 'Social Media', icon: '💬', designDna: 'Memory' },
  { id: 'vector-26', contextName: 'E-commerce', icon: '🛍️', designDna: 'Asymmetry' },
  { id: 'vector-27', contextName: 'Public Transport', icon: '🚌', designDna: 'Scale' },
  { id: 'vector-28', contextName: 'Night Café', icon: '🌙', designDna: 'Glow & Contrast' },
  { id: 'vector-29', contextName: 'Weather App', icon: '🌤️', designDna: 'Surprise' },
  { id: 'vector-30', contextName: 'Lost & Found App', icon: '🔍', designDna: 'Mystery' },
];

export const INITIAL_SOUNDS = [];

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
  soundId: '',
  contextId: INITIAL_CONTEXTS[idx % INITIAL_CONTEXTS.length].id,
  customDesignDna: CURATED_CHALLENGES[idx % CURATED_CHALLENGES.length].designDna,
  revealed: false,
  revealedAt: null,
  assignedAt: '2026-08-25T11:15:00.000Z'
}));
