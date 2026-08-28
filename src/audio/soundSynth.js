// ECHOFORM Web Audio Synthesizer Engine
// Generates rich, procedural soundscapes for design challenge sounds in browser

import { getAudioFromDB } from '../services/audioStorage';

let audioCtx = null;
let currentNodes = [];
let isPlaying = false;
let currentSoundId = null;
let currentAudioElement = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopSynthSound() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {}
    currentAudioElement = null;
  }
  if (currentNodes.length > 0) {
    currentNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore cleanup errors
      }
    });
    currentNodes = [];
  }
  isPlaying = false;
  currentSoundId = null;
}

function createNoiseBuffer(ctx, duration = 5) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
}
export async function playSynthSound(soundInput, volume = 0.7, onFrameCallback = null) {
  stopSynthSound();

  let customUrl = null;
  let key = '';
  let soundId = null;

  if (typeof soundInput === 'object' && soundInput !== null) {
    customUrl = soundInput.audioUrl || null;
    soundId = soundInput.id || null;
    key = (soundInput.synthType || soundInput.name || '').toLowerCase();
  } else if (typeof soundInput === 'string') {
    if (
      soundInput.startsWith('data:audio/') ||
      soundInput.startsWith('http://') ||
      soundInput.startsWith('https://') ||
      soundInput.startsWith('blob:')
    ) {
      customUrl = soundInput;
    } else {
      key = soundInput.toLowerCase();
    }
  }

  // If audio URL is stored in IndexedDB or missing, try loading from IDB
  if ((!customUrl || customUrl.startsWith('[IDB]:')) && soundId) {
    const dbAudio = await getAudioFromDB(soundId);
    if (dbAudio) {
      customUrl = dbAudio;
    }
  }

  if (customUrl && !customUrl.startsWith('[IDB]:')) {
    isPlaying = true;
    currentSoundId = 'custom_audio';
    try {
      const audio = new Audio(customUrl);
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.loop = true;
      audio.play().catch(err => console.warn('Custom audio playback error:', err));
      currentAudioElement = audio;
      return audio;
    } catch (err) {
      console.warn('Failed to play custom audio, falling back to synth:', err);
    }
  }

  const ctx = getAudioContext();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(volume, ctx.currentTime);
  masterGain.connect(ctx.destination);
  currentNodes.push(masterGain);

  isPlaying = true;
  currentSoundId = key;

  if (key.includes('rain') || key.includes('shower')) {
    // Rain Soundscape
    const noiseBuffer = createNoiseBuffer(ctx, 4);
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    // Dynamic rain intensity modulation
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(300, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    currentNodes.push(lfo);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    whiteNoise.start();
    currentNodes.push(whiteNoise, filter);
  } 
  else if (key.includes('thunder')) {
    // Thunderstorm
    const noiseBuffer = createNoiseBuffer(ctx, 6);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(180, ctx.currentTime);

    const rumbleOsc = ctx.createOscillator();
    rumbleOsc.type = 'sawtooth';
    rumbleOsc.frequency.setValueAtTime(45, ctx.currentTime);

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.2, ctx.currentTime);

    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(lowpass);
    noise.connect(lowpass);
    lowpass.connect(masterGain);

    noise.start();
    rumbleOsc.start();
    currentNodes.push(noise, lowpass, rumbleOsc, rumbleGain);
  }
  else if (key.includes('ocean') || key.includes('wave')) {
    // Ocean Waves
    const noiseBuffer = createNoiseBuffer(ctx, 8);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    const waveLfo = ctx.createOscillator();
    waveLfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const waveGain = ctx.createGain();
    waveGain.gain.setValueAtTime(350, ctx.currentTime);

    waveLfo.connect(waveGain);
    waveGain.connect(filter.frequency);
    waveLfo.start();

    noise.connect(filter);
    filter.connect(masterGain);
    noise.start();
    currentNodes.push(noise, filter, waveLfo, waveGain);
  }
  else if (key.includes('clock') || key.includes('tick')) {
    // Clock Ticking
    const tickInterval = setInterval(() => {
      if (!isPlaying || currentSoundId !== key) {
        clearInterval(tickInterval);
        return;
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, ctx.currentTime);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }, 1000);
  }
  else if (key.includes('coffee') || key.includes('cafe') || key.includes('market')) {
    // Cafe / Market Ambience
    const noiseBuffer = createNoiseBuffer(ctx, 4);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(800, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(masterGain);
    noise.start();
    currentNodes.push(noise, bandpass);

    // Random clinks
    const clinkInterval = setInterval(() => {
      if (!isPlaying || currentSoundId !== key) {
        clearInterval(clinkInterval);
        return;
      }
      if (Math.random() > 0.4) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2200 + Math.random() * 800, ctx.currentTime);
        g.gain.setValueAtTime(0.15, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    }, 800);
  }
  else if (key.includes('cyber') || key.includes('neon') || key.includes('space')) {
    // Cyberpunk Ambient Drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    sub.type = 'sine';

    osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
    osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
    sub.frequency.setValueAtTime(55, ctx.currentTime); // A1

    gain.gain.setValueAtTime(0.25, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    sub.connect(filter);
    filter.connect(masterGain);

    osc1.start();
    osc2.start();
    sub.start();
    currentNodes.push(osc1, osc2, sub, filter);
  }
  else if (key.includes('keyboard') || key.includes('typing')) {
    // Keyboard typing simulation
    const typeInterval = setInterval(() => {
      if (!isPlaying || currentSoundId !== key) {
        clearInterval(typeInterval);
        return;
      }
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200 + Math.random() * 1500, ctx.currentTime);
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    }, 180);
  }
  else {
    // Generic ambient synth wave fallback
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    
    // Smooth frequency shimmer
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.3, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(15, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    osc.connect(filter);
    filter.connect(masterGain);
    osc.start();
    currentNodes.push(osc, lfo, lfoGain, filter);
  }

  return masterGain;
}

export function isAudioPlaying() {
  return isPlaying;
}
