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
  announcement: 'Welcome to ECHOFORM 2026! Random challenge assignments are now generated. Log in to reveal your challenge.'
};

export const INITIAL_SOUNDS = [
  { id: 'snd-01', name: 'Rain + Traffic', description: 'Continuous steady downpour mixed with distant urban vehicle hums.', audioUrl: '', synthType: 'Rain + Traffic', active: true },
  { id: 'snd-02', name: 'Thunderstorm', description: 'Deep reverberating thunder rumbles with sudden electrical strikes.', audioUrl: '', synthType: 'Thunderstorm', active: true },
  { id: 'snd-03', name: 'Ocean Waves', description: 'Rhythmic sea waves swelling and crashing gently along a pebble shore.', audioUrl: '', synthType: 'Ocean Waves', active: true },
  { id: 'snd-04', name: 'Coffee Shop Ambience', description: 'Muffled chatter, espresso machine steam hiss, and clinking ceramic cups.', audioUrl: '', synthType: 'Coffee Shop Ambience', active: true },
  { id: 'snd-05', name: 'Railway Station', description: 'Echoing station announcements, metallic train track clicks, and departing locomotives.', audioUrl: '', synthType: 'Railway Station', active: true },
  { id: 'snd-06', name: 'Clock Ticking', description: 'Subtle, mechanical pendulum ticking in a quiet room.', audioUrl: '', synthType: 'Clock Ticking', active: true },
  { id: 'snd-07', name: 'Keyboard Typing', description: 'Fast tactile mechanical switch keystrokes with spacebar thuds.', audioUrl: '', synthType: 'Keyboard Typing', active: true },
  { id: 'snd-08', name: 'Cyberpunk Neon City', description: 'Deep analog synth pad with glowing neon frequency shimmers.', audioUrl: '', synthType: 'Cyberpunk Neon City', active: true },
  { id: 'snd-09', name: 'Busy Market', description: 'Vibrant street vendor calls, bustling crowds, and ambient footsteps.', audioUrl: '', synthType: 'Busy Market', active: true },
  { id: 'snd-10', name: 'Forest & Birds', description: 'Gentle canopy wind rustle with wild songbird chirps.', audioUrl: '', synthType: 'Forest & Birds', active: true },
  { id: 'snd-11', name: 'Space Station Ambient', description: 'Low sub-bass air circulation drone with cosmic telemetry pulses.', audioUrl: '', synthType: 'Space Station Ambient', active: true },
  { id: 'snd-12', name: 'Heavy Rain', description: 'Torrential rain pounding against glass windows.', audioUrl: '', synthType: 'Heavy Rain', active: true },
];

export const INITIAL_CONTEXTS = [
  { id: 'ctx-01', name: 'Café', icon: '☕', description: 'Artisanal coffee house, order system, loyalty app, or cozy seating layout.', designDna: 'SONIC TEXTURE', active: true },
  { id: 'ctx-02', name: 'E-commerce', icon: '🛒', description: 'Online storefront, flash sale marketplace, product showcase, or checkout funnel.', designDna: 'TACTILE RHYTHM', active: true },
  { id: 'ctx-03', name: 'Healthcare', icon: '🏥', description: 'Patient portal, wellness tracking dashboard, emergency triage, or tele-health app.', designDna: 'ORGANIC PULSE', active: true },
  { id: 'ctx-04', name: 'Education', icon: '🎓', description: 'Interactive learning platform, quiz interface, virtual classroom, or student portal.', designDna: 'HARMONIC FLOW', active: true },
  { id: 'ctx-05', name: 'Banking & Fintech', icon: '🏦', description: 'Neobank dashboard, investment tracker, crypto wallet, or money transfer UI.', designDna: 'DIGITAL FREQUENCY', active: true },
  { id: 'ctx-06', name: 'Travel & Expeditions', icon: '✈️', description: 'Flight booking hub, itinerary planner, hotel explorer, or travel journal.', designDna: 'ACOUSTIC VECTORS', active: true },
  { id: 'ctx-07', name: 'Fitness & Sports', icon: '🏋️', description: 'Workout tracker, gym class booking, biometric dashboard, or habit logger.', designDna: 'KINETIC RESONANCE', active: true },
  { id: 'ctx-08', name: 'Gaming & Cyber', icon: '🎮', description: 'Esports tournament lobby, game launcher, inventory manager, or guild chat.', designDna: 'SYNTHETIC ECHO', active: true },
  { id: 'ctx-09', name: 'Real Estate', icon: '🏠', description: 'Architectural property viewer, virtual house tour, rental portal, or floor plan app.', designDna: 'SPATIAL AMBIENCE', active: true },
  { id: 'ctx-10', name: 'Food Delivery', icon: '🍔', description: 'Rapid delivery tracker, dish customizing menu, chef table reservation, or meal kit app.', designDna: 'SENSORY VIBRATION', active: true },
];

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

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-EF-001',
    teamId: 'EF-001',
    soundId: 'snd-01', // Rain + Traffic
    contextId: 'ctx-01', // Café
    revealed: false,
    revealedAt: null,
    assignedAt: '2026-08-25T11:15:00.000Z'
  },
  {
    id: 'asg-EF-002',
    teamId: 'EF-002',
    soundId: 'snd-03', // Ocean Waves
    contextId: 'ctx-06', // Travel
    revealed: false,
    revealedAt: null,
    assignedAt: '2026-08-25T11:15:00.000Z'
  },
  {
    id: 'asg-EF-003',
    teamId: 'EF-003',
    soundId: 'snd-05', // Railway Station
    contextId: 'ctx-02', // E-commerce
    revealed: false,
    revealedAt: null,
    assignedAt: '2026-08-25T11:15:00.000Z'
  },
  {
    id: 'asg-EF-004',
    teamId: 'EF-004',
    soundId: 'snd-08', // Cyberpunk Neon City
    contextId: 'ctx-08', // Gaming
    revealed: false,
    revealedAt: null,
    assignedAt: '2026-08-25T11:15:00.000Z'
  },
  {
    id: 'asg-EF-005',
    teamId: 'EF-005',
    soundId: 'snd-02', // Thunderstorm
    contextId: 'ctx-03', // Healthcare
    revealed: false,
    revealedAt: null,
    assignedAt: '2026-08-25T11:15:00.000Z'
  }
];
