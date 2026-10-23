import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Activity, ShieldCheck, Ear } from 'lucide-react';

interface FrequencyPreset {
  hz: number;
  label: string;
  clinicalZone: string;
  cochlearTurn: string;
  speechRole: string;
  dbThreshold: string;
}

const FREQUENCY_PRESETS: FrequencyPreset[] = [
  {
    hz: 250,
    label: '250 Hz',
    clinicalZone: 'Low-Frequency Basal Warmth',
    cochlearTurn: 'Apical Helicotrema Zone (Apex)',
    speechRole: 'Vocal Fundamental Resonance & Ambient Depth',
    dbThreshold: '15 dB HL Normal Threshold',
  },
  {
    hz: 500,
    label: '500 Hz',
    clinicalZone: 'Lower-Mid Vowel Energy',
    cochlearTurn: 'Upper Middle Spiral Turn',
    speechRole: 'Core Vowel Power & Timbre Foundation',
    dbThreshold: '10 dB HL Normal Threshold',
  },
  {
    hz: 1000,
    label: '1000 Hz',
    clinicalZone: 'Clinical Reference Standard',
    cochlearTurn: 'Central Basilar Membrane',
    speechRole: 'Primary Audiometric Calibration Anchor',
    dbThreshold: '05 dB HL Normal Threshold',
  },
  {
    hz: 2000,
    label: '2000 Hz',
    clinicalZone: 'Consonant Articulation Band',
    cochlearTurn: 'Lower Middle Spiral Turn',
    speechRole: 'Plosive & Nasal Speech Intelligibility',
    dbThreshold: '10 dB HL Normal Threshold',
  },
  {
    hz: 4000,
    label: '4000 Hz',
    clinicalZone: 'Acoustic Notch & Clarity Band',
    cochlearTurn: 'Proximal Basal Turn',
    speechRole: 'Sibilant Precision & Noise-in-Speech Clarity',
    dbThreshold: '15 dB HL Normal Threshold',
  },
  {
    hz: 8000,
    label: '8000 Hz',
    clinicalZone: 'Ultra-Fine Harmonic Brilliance',
    cochlearTurn: 'Basal Round Window Entrance',
    speechRole: 'Spatial Localization & Micro-Acoustic Detail',
    dbThreshold: '20 dB HL Normal Threshold',
  },
];

export default function AcousticLabStudio() {
  const [selectedPreset, setSelectedPreset] = useState<FrequencyPreset>(FREQUENCY_PRESETS[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gainPercent, setGainPercent] = useState(25); // Safe default volume

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Stop audio safely on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Update frequency & volume smoothly when active
  useEffect(() => {
    if (isPlaying && audioCtxRef.current && oscRef.current && gainNodeRef.current) {
      const now = audioCtxRef.current.currentTime;
      oscRef.current.frequency.setTargetAtTime(selectedPreset.hz, now, 0.04);
      const safeGain = Math.min((gainPercent / 100) * 0.18, 0.2);
      gainNodeRef.current.gain.setTargetAtTime(safeGain, now, 0.05);
    }
  }, [selectedPreset, gainPercent, isPlaying]);

  const toggleTone = () => {
    if (isPlaying) {
      if (audioCtxRef.current && gainNodeRef.current && oscRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.setTargetAtTime(0.0001, now, 0.04);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
          } catch {}
          setIsPlaying(false);
        }, 120);
      } else {
        setIsPlaying(false);
      }
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(selectedPreset.hz, ctx.currentTime);

    const targetGain = Math.min((gainPercent / 100) * 0.18, 0.2);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(targetGain, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    gainNodeRef.current = gain;
    setIsPlaying(true);
  };

  // Real-time 60fps Oscilloscope Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      animId = requestAnimationFrame(renderWave);
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Subtle Clinical Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      const gridRows = 4;
      for (let r = 1; r < gridRows; r++) {
        const y = (height / gridRows) * r;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const visualCycles = Math.log2(selectedPreset.hz / 125) * 2.4;
      const activeAmp = isPlaying
        ? (height * 0.34) * (gainPercent / 100 + 0.25)
        : height * 0.09;

      // Secondary Harmonic Wave
      ctx.beginPath();
      ctx.strokeStyle = isPlaying ? 'rgba(34, 211, 238, 0.28)' : 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = 1.5 * dpr;
      for (let x = 0; x < width; x++) {
        const normX = x / width;
        const envelope = Math.sin(normX * Math.PI);
        const y =
          height / 2 +
          Math.sin(normX * Math.PI * 2 * (visualCycles * 1.5) - phase * 1.3) *
            (activeAmp * 0.55) *
            envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Primary Pure-Tone Sine Wave
      ctx.beginPath();
      ctx.strokeStyle = isPlaying ? '#06B6D4' : 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2.5 * dpr;
      for (let x = 0; x < width; x++) {
        const normX = x / width;
        const envelope = Math.sin(normX * Math.PI);
        const y =
          height / 2 +
          Math.sin(normX * Math.PI * 2 * visualCycles - phase) * activeAmp * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isPlaying ? 0.09 + selectedPreset.hz * 0.000018 : 0.02;
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [selectedPreset, isPlaying, gainPercent]);

  return (
    <div className="bg-canvas border border-hairline-dark">
      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-hairline-dark bg-canvas-deep/60">
        <div className="flex items-center gap-3">
          <Ear className="w-4 h-4 text-lunar-cyan" />
          <span className="font-mono text-xs uppercase tracking-caption text-white">
            PONNAIAH ACOUSTIC RESONANCE STUDIO · PURE-TONE CALIBRATION
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-ink-body">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-lunar-cyan" />
            SAFE GAIN LIMITER ACTIVE
          </span>
          <span className="text-white/30">|</span>
          <span className={isPlaying ? 'text-lunar-cyan font-semibold' : 'text-ink-body'}>
            {isPlaying ? 'EMITTING PURE SINE WAVE' : 'STANDBY MODE'}
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 8 Cols: Oscilloscope & Frequency Selector */}
        <div className="lg:col-span-8 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-hairline-dark flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-caption text-lunar-cyan mb-1">
                  ACTIVE TONOTOPIC FREQUENCY
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="number-display text-white">{selectedPreset.hz}</span>
                  <span className="text-2xl font-light text-ink-body">Hz</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-caption text-ink-body mb-1">
                  COCHLEAR ANATOMICAL MAPPING
                </p>
                <p className="text-sm font-medium text-white">{selectedPreset.cochlearTurn}</p>
              </div>
            </div>

            {/* Real-time Waveform Canvas */}
            <div className="relative w-full h-56 bg-canvas-deep border border-hairline-dark mb-8 overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px] text-white/40 uppercase">
                PHASE-LOCKED HARMONIC OSCILLOSCOPE · {selectedPreset.clinicalZone}
              </div>
            </div>
          </div>

          {/* 6 Frequency Keys (0px Sharp Ferrari/Apple Matrix) */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-caption text-ink-body mb-3">
              SELECT AUDIOMETRIC OCTAVE BAND
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 border-t border-l border-hairline-dark">
              {FREQUENCY_PRESETS.map((preset) => {
                const active = preset.hz === selectedPreset.hz;
                return (
                  <button
                    key={preset.hz}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`py-4 px-3 border-r border-b border-hairline-dark text-left transition-colors rounded-none ${
                      active
                        ? 'bg-lunar-cyan text-canvas-deep font-bold'
                        : 'bg-canvas hover:bg-canvas-elevated text-white'
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase opacity-75">OCTAVE</div>
                    <div className="text-base font-semibold tracking-tight mt-0.5">
                      {preset.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Acoustic Controls & Clinical Telemetry */}
        <div className="lg:col-span-4 p-6 lg:p-10 flex flex-col justify-between bg-canvas-deep/40">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-canvas-elevated font-mono text-[11px] uppercase tracking-caption text-lunar-cyan mb-3">
                DR. GOPINATH · ENT ACOUSTIC LAB
              </span>
              <h4 className="text-xl font-medium text-white mb-2">
                {selectedPreset.clinicalZone}
              </h4>
              <p className="text-sm text-ink-body leading-relaxed">
                {selectedPreset.speechRole}. In clinical pure-tone audiometry, this frequency maps directly to the{' '}
                <span className="text-white">{selectedPreset.cochlearTurn.toLowerCase()}</span>.
              </p>
            </div>

            <div className="border-t border-b border-hairline-dark py-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-ink-body uppercase font-mono">CLINICAL REFERENCE</span>
                <span className="text-white font-mono">{selectedPreset.dbThreshold}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-body uppercase font-mono">WAVEFORM PURITY</span>
                <span className="text-lunar-cyan font-mono">99.98% PURE SINE</span>
              </div>
            </div>

            {/* Output Gain Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono uppercase mb-2">
                <span className="text-ink-body">CALIBRATED ATTENUATION LEVEL</span>
                <span className="text-white">{gainPercent}% OUTPUT</span>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                value={gainPercent}
                onChange={(e) => setGainPercent(Number(e.target.value))}
                className="w-full accent-lunar-cyan bg-canvas-elevated h-1.5 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <button
              type="button"
              onClick={toggleTone}
              className={`w-full h-12 rounded-none font-bold text-sm uppercase tracking-cta flex items-center justify-center gap-3 transition-all ${
                isPlaying
                  ? 'bg-rosso text-white'
                  : 'bg-lunar-cyan text-canvas-deep hover:bg-lunar-cyanGlow'
              }`}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  STOP ACOUSTIC TONE ({selectedPreset.hz} HZ)
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  EMIT {selectedPreset.hz} HZ TEST TONE
                </>
              )}
            </button>
            <p className="text-[11px] text-ink-muted leading-normal font-mono">
              * Use headphones at moderate volume for accurate frequency perception. Diagnostic audiometry is conducted inside our zero-decibel sound-treated chambers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

