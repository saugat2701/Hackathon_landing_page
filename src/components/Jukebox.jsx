import { useState, useEffect, useRef } from 'react';

// C418 "Sweden" style chord frequencies (Hz) for procedural ambient synth
const SWEDEN_CHORDS = [
  // Chord 1: D major (D3, A3, D4, F#4)
  { bass: 146.83, notes: [220.0, 293.66, 369.99, 440.0], duration: 4.0 },
  // Chord 2: G major (G3, B3, D4, G4)
  { bass: 196.0, notes: [246.94, 293.66, 392.0, 493.88], duration: 4.0 },
  // Chord 3: B minor (B2, F#3, B3, D4)
  { bass: 123.47, notes: [185.0, 246.94, 293.66, 369.99], duration: 4.0 },
  // Chord 4: A major (A2, E3, A3, C#4)
  { bass: 110.0, notes: [164.81, 220.0, 277.18, 329.63], duration: 4.0 },
  // Chord 5: G major 7 (G2, D3, F#3, B3)
  { bass: 98.0, notes: [146.83, 185.0, 246.94, 329.63], duration: 4.0 },
  // Chord 6: E minor (E2, B2, E3, G3)
  { bass: 82.41, notes: [123.47, 164.81, 196.0, 246.94], duration: 4.0 },
];

const TRACKS = [
  {
    id: 1,
    title: 'C418 — Sweden (Ambient Synth)',
    disc: 'Disc 13 (Yellow)',
    discColor: 'bg-yellow-400',
    type: 'synth',
  },
  {
    id: 2,
    title: 'Minecraft Calm (Lofi Chords)',
    disc: 'Disc Cat (Green)',
    discColor: 'bg-green-500',
    type: 'synth-calm',
  },
  {
    id: 3,
    title: 'Subwoofer Piano (Relaxing)',
    disc: 'Disc Pigstep (Red)',
    discColor: 'bg-red-600',
    type: 'synth-piano',
  },
];

export default function Jukebox({ soundEnabled, onToggleSound, autoPlayTrigger }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const synthTimerRef = useRef(null);
  const chordIndexRef = useRef(0);

  const currentTrack = TRACKS[currentTrackIndex];

  // Initialize Web Audio Context on demand
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gainNode;
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a soft piano-like tone with envelope
  const playSoftTone = (freq, startTime, duration, type = 'sine', gainMultiplier = 0.2) => {
    const ctx = getAudioContext();
    if (!ctx || !gainNodeRef.current) return;

    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Attack - Decay - Sustain - Release piano envelope
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(gainMultiplier, startTime + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(gainMultiplier * 0.4, startTime + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      // ignore
    }
  };

  // Procedural Synth Loop
  const startProceduralMusic = () => {
    stopProceduralMusic();
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNextChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;

      const chord = SWEDEN_CHORDS[chordIndexRef.current % SWEDEN_CHORDS.length];
      chordIndexRef.current++;
      const now = ctx.currentTime;
      const stepDuration = chord.duration;

      // Bass note
      playSoftTone(chord.bass, now, stepDuration * 0.95, 'triangle', 0.28);

      // Staggered arpeggiated piano melody notes
      chord.notes.forEach((freq, idx) => {
        const noteStart = now + idx * 0.45 + (Math.random() * 0.1);
        playSoftTone(freq, noteStart, stepDuration - (idx * 0.3), 'sine', 0.22);
      });

      // Extra high chime
      if (Math.random() > 0.4) {
        const highFreq = chord.notes[chord.notes.length - 1] * 2;
        playSoftTone(highFreq, now + 1.8, 2.5, 'sine', 0.08);
      }

      synthTimerRef.current = setTimeout(playNextChord, stepDuration * 950);
    };

    playNextChord();
  };

  const stopProceduralMusic = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Volume update
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying && soundEnabled) {
      startProceduralMusic();
    } else {
      stopProceduralMusic();
    }
    return () => stopProceduralMusic();
  }, [isPlaying, soundEnabled, currentTrackIndex]);

  // Autoplay trigger on entering world
  useEffect(() => {
    if (autoPlayTrigger && soundEnabled) {
      getAudioContext();
      setIsPlaying(true);
    }
  }, [autoPlayTrigger]);

  const togglePlay = (e) => {
    e.stopPropagation();
    getAudioContext();
    if (!soundEnabled) {
      onToggleSound(true);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNextTrack = (e) => {
    e.stopPropagation();
    getAudioContext();
    chordIndexRef.current = (chordIndexRef.current + 2) % SWEDEN_CHORDS.length;
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
    if (!soundEnabled) {
      onToggleSound(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-pixel-body">
      {/* Expanded Track Info & Controls */}
      {isExpanded && (
        <div className="bg-black/95 border-4 border-mc-wood p-4 shadow-[0_0_30px_rgba(0,0,0,0.9)] text-white w-72 mb-2 animate-fadeIn select-none">
          <div className="flex items-center justify-between border-b-2 border-gray-700 pb-2 mb-3">
            <span className="font-pixel text-[10px] text-yellow-300">📻 JUKEBOX</span>
            <span className="font-pixel text-[8px] text-gray-400">{currentTrack.disc}</span>
          </div>

          <p className="font-pixel text-xs text-mc-diamond truncate mb-1">
            {currentTrack.title}
          </p>
          <p className="text-gray-400 text-sm mb-3">Native Minecraft Ambient Chords</p>

          {/* Controls */}
          <div className="flex items-center justify-between gap-2 border-t-2 border-gray-800 pt-3">
            <button
              onClick={togglePlay}
              className="mc-btn font-pixel text-[10px] px-3 py-1.5 bg-mc-grass text-white flex-1 hover:brightness-110"
            >
              {isPlaying && soundEnabled ? '⏸️ Pause' : '▶️ Play'}
            </button>

            <button
              onClick={handleNextTrack}
              className="mc-btn font-pixel text-[10px] px-3 py-1.5 bg-mc-wood text-white hover:brightness-110"
              title="Next Track / Chords"
            >
              ⏭️ Next
            </button>
          </div>

          {/* Volume Slider */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 accent-mc-grass cursor-pointer"
            />
            <span className="font-pixel text-[8px] text-gray-400 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Floating Jukebox Main Pill */}
      <div className="flex items-center gap-2 bg-black/85 p-1.5 border-3 border-mc-wood shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Track preview tag */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="px-2 py-1 text-left hover:bg-gray-800/80 transition-colors cursor-pointer"
        >
          <div className="font-pixel text-[9px] text-yellow-300 flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isPlaying && soundEnabled ? 'bg-mc-grass animate-ping' : 'bg-gray-500'
              }`}
            />
            <span className="truncate max-w-[130px] sm:max-w-[180px]">
              {isPlaying && soundEnabled ? currentTrack.title : 'Jukebox (Click to Play)'}
            </span>
          </div>
          <span className="text-gray-400 text-xs hidden sm:block">Click to open Jukebox</span>
        </button>

        {/* Jukebox Disc Button */}
        <button
          onClick={togglePlay}
          className={`mc-btn w-11 h-11 bg-mc-wood flex items-center justify-center relative hover:scale-105 active:scale-95 transition-all ${
            isPlaying && soundEnabled ? 'border-yellow-400 shadow-[0_0_15px_rgba(252,176,64,0.6)]' : 'border-black'
          }`}
          title={isPlaying && soundEnabled ? 'Pause Music' : 'Play Music'}
        >
          {/* Spinning Vinyl Disc */}
          <div
            className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center transition-transform ${
              isPlaying && soundEnabled ? 'animate-spin' : ''
            } ${currentTrack.discColor}`}
            style={{ animationDuration: '3.5s' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-black border border-gray-400" />
          </div>

          <span className="absolute -top-1.5 -right-1.5 text-xs filter drop-shadow">
            {isPlaying && soundEnabled ? '🎶' : '🔇'}
          </span>
        </button>
      </div>
    </div>
  );
}
