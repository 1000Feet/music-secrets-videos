// How a synthesizer makes sound: oscillator -> filter -> envelope (subtractive synthesis).
// Copyright/brief: Switched-On Bach (Wendy Carlos, 1968) is named only; every sound here is an ORIGINAL
// demo built with the engine note option `tone`: sine = [1], sawtooth = all harmonics at 1/n,
// square = odd harmonics at 1/n. The low-pass filter is simulated per note by scaling the harmonics;
// ADSR = two layered tones (a decaying one on top of a steady "sustain" one) with the same attack.
const hz = f => 69 + 12 * Math.log2(f / 440);
const N = 30;
const SAW = Array.from({ length: N }, (_, i) => 1 / (i + 1));
const SQUARE = Array.from({ length: N }, (_, i) => ((i + 1) % 2 ? 1 / (i + 1) : 0));
const SINE = [1];
// original riffs
const RIFF = ['C2', 'C2', 'C3', 'C2', 'D#2', 'C2', 'G2', 'A#2'];
const LEAD = [['G4', 1], ['C5', 1], ['D#5', 0.5], ['D5', 0.5], ['C5', 1], ['G4', 1], ['A#4', 0.5], ['G4', 1.5]];
// an original baroque-style line in sixteenths (not Bach)
const BAROQUE = ['C4', 'G4', 'D#4', 'G4', 'C4', 'G4', 'D#4', 'G4', 'D4', 'G4', 'F4', 'G4', 'D4', 'G4', 'F4', 'G4',
  'D#4', 'G4', 'C5', 'G4', 'D#4', 'G4', 'C5', 'G4', 'D4', 'B4', 'G4', 'B4', 'D4', 'B4', 'G4', 'B4'];

module.exports = {
  slug: 'synthesizer',
  title: 'How a Synthesizer Works',
  segments: [
    { id: 'hook',    text: "A buzzing wave, a filter, an envelope: that's how a synthesizer makes sound." },
    { id: 'what',    text: "It's called subtractive synthesis." },
    { id: 's1',      text: 'Robert Moog introduced his modular synthesizer in 1964.' },
    { id: 's2',      text: 'In 1968, Wendy Carlos played Bach on a Moog.' },
    { id: 's2b',     text: 'Her album, Switched On Bach, won three Grammy Awards.' },
    { id: 's3',      text: 'And in 1970, the Minimoog made the synthesizer portable.' },
    { id: 'why1',    text: 'So how does it work? First, an oscillator makes a basic wave.' },
    { id: 'why2',    text: 'A sine is pure.' },
    { id: 'why3',    text: 'A sawtooth has all the harmonics: bright and buzzy.' },
    { id: 'why4',    text: 'A square has only the odd ones: hollow.' },
    { id: 'why5',    text: 'Next, a filter removes harmonics. A low pass filter cuts the highs...' },
    { id: 'why6',    text: 'and sweeping its cutoff makes that classic wow.' },
    { id: 'why7',    text: 'Then an envelope shapes the volume over time: attack, decay, sustain, release.' },
    { id: 'why8',    text: 'Start rich, then carve away, like a sculptor.' },
    { id: 'why9',    text: 'Real instruments work the same way:' },
    { id: 'why10',   text: 'a piano starts fast with a long decay, while a violin can start slowly.' },
    { id: 'essence', text: 'One waveform, carved by a filter, shaped by an envelope. Every synth sound starts there.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'OSCILLATOR · FILTER · ENVELOPE', title: 'THE SYNTHESIZER', accent: true, circle: false, lead: 0.4, gap: 0.3, tail: 0.6 },
    { id: 's1', segs: ['s1'], label: 'THE INVENTION', title: 'Moog Modular', sub: 'Robert Moog · 1964', circle: false, tail: 0.7 },
    { id: 's2', segs: ['s2', 's2b'], label: 'YOU HEAR IT IN', title: 'Switched-On Bach', sub: 'Wendy Carlos · 1968', circle: false, gap: 0.25, tail: 1.8 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Minimoog', sub: '1970 · the portable synth', circle: false, tail: 1.8 },
    { id: 'why1', segs: ['why1', 'why2', 'why3', 'why4'], label: 'WHY IT WORKS', title: 'THE OSCILLATOR', circle: false, gap: 0.35, tail: 0.8 },
    { id: 'why5', segs: ['why5', 'why6'], label: 'WHY IT WORKS', title: 'THE FILTER', circle: false, gap: 0.25, tail: 1.9 },
    { id: 'why7', segs: ['why7'], label: 'WHY IT WORKS', title: 'THE ENVELOPE', circle: false, tail: 1.7 },
    { id: 'why8', segs: ['why8'], label: 'WHY IT WORKS', title: 'LIKE A SCULPTOR', circle: false, tail: 0.9 },
    { id: 'why9', segs: ['why9', 'why10'], label: 'WHY IT WORKS', title: 'REAL INSTRUMENTS', circle: false, gap: 0.2, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'CARVE THE SOUND', accent: true, circle: false, gap: 0.45, tail: 2.1 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92', WHITE = '#ffffff', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => (typeof n === 'string' ? a.T.midi(n) : n);
    const nrm = P => 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0) || 1);
    const keysOn = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));

    // ---------- sound ----------
    // low-pass: harmonic n with cutoff fc (in harmonics), 12 dB/oct with a small resonant bump
    const lp = (P, fc, res = 0.9) => P.map((x, i) => { const n = i + 1, r = n / fc; return x / Math.sqrt(1 + r ** 4) * (1 + res * Math.exp(-(((n - fc) / Math.max(0.6, 0.25 * fc)) ** 2))); });
    // a synth note: recipe P, optional cutoff, ADSR {a, d, s, r} (seconds, seconds, level, seconds)
    function syn(n, t, dur, P, o = {}) {
      const Q = o.fc ? lp(P, o.fc, o.res) : P, v = (o.vel ?? 0.3) * nrm(Q), A = o.a ?? 0.01, R = o.r ?? 0.12;
      const sus = o.s ?? 1, dec = o.d ? 1 / o.d : 0;
      if (sus < 1) a.note(M(n), t, dur, { vel: v * (1 - sus), show: false, tone: { partials: Q, attack: A, release: R, decay: dec } });
      if (sus > 0) a.note(M(n), t, dur, { vel: v * sus, show: false, tone: { partials: Q, attack: A, release: R } });
      if (o.keys !== false && Number.isInteger(M(n))) a.note(M(n), t, Math.max(0.1, dur), { vel: 0, show: false });
    }
    // the bass riff with a cutoff that follows fc(t); returns end
    function riff(t0, t1, fc, o = {}) {
      const e = o.e ?? 0.2;
      let k = 0, t = t0;
      for (; t + e <= t1 + 0.01; t += e, k++) {
        syn(RIFF[k % RIFF.length], t, e * 0.8, SAW, { fc: fc(t), vel: o.vel ?? 0.4, d: 0.25, s: 0.5, r: 0.05 });
        if (o.drums) { if (k % 4 === 0) a.perc('kick', t, 0.8); if (k % 4 === 2) a.perc('snare', t, 0.5); a.perc('hat', t + e / 2, 0.35); }
      }
      return t;
    }

    // ---------- visuals ----------
    const BASE = 1100, NB = 16, CW = 56;
    const bx = i => 540 + (i - (NB - 1) / 2) * CW;
    // spectrum of 16 bars; lit while harmonic <= fc(t) (fc may be a function or a number)
    function spectrum(P, t0, t1, o = {}) {
      const col = o.color ?? TEAL, hmax = o.hmax ?? 420, fc = typeof o.fc === 'function' ? o.fc : () => (o.fc ?? 99);
      for (let i = 0; i < NB; i++) {
        if (!P[i] && o.skipZero) continue;
        const hh = Math.round(hmax * (P[i] || 0)) + 20, g0 = t0 + i * (o.step ?? 0);
        const g = a.grid([{ label: '', color: i ? col : GOLD }], g0, t1, { rows: 1, cols: 1, cw: CW, chh: hh, y: BASE - hh + 8, x: bx(i) });
        let on = null;
        for (let t = g0; t < t1; t += 0.05) {
          const lit = (P[i] || 0) > 0 && i + 1 <= fc(t) + 0.01;
          if (lit && on === null) on = t;
          if ((!lit || t + 0.05 >= t1) && on !== null) { g.active.push({ t0: on, t1: t + 0.05, i: 0 }); on = null; }
        }
        if (o.labels !== false && (i === 0 || (i + 1) % 3 === 0)) a.big(String(i + 1), g0, t1, { x: bx(i), y: BASE + 36, size: 24, ...MONO, color: GREY, blur: 0 });
      }
    }
    // a waveform drawn with dots
    function wave(fn, t0, t1, o = {}) {
      const n = o.n ?? 48, cy = o.y ?? 640, amp = o.amp ?? 95, col = o.color ?? WHITE;
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1), ta = t0 + x * (o.draw ?? 0.4);
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: 20, chh: 20, x: 150 + x * 780, y: cy - amp * fn(x) - 10 });
        g.active.push({ t0: ta, t1, i: 0 });
      }
    }
    const W_SINE = x => Math.sin(2 * Math.PI * 2 * x);
    const W_SAW = x => 1 - 2 * ((2 * x + 0.5) % 1);
    const W_SQ = x => (Math.sin(2 * Math.PI * 2 * x + 0.001) >= 0 ? 0.85 : -0.85);
    // an ADSR strip: NS bars over time, coloured by phase
    function adsr(t0, t1, o) {
      const NS = o.n ?? 26, w = o.cw ?? 32, y = o.y ?? 900, H = o.h ?? 300, cx = o.cx ?? 540;
      const { A, D, Sl, hold, R } = o, total = A + D + hold + R;
      for (let i = 0; i < NS; i++) {
        const x = ((i + 0.5) / NS) * total;
        let v, col;
        if (x < A) { v = x / A; col = GOLD; } else if (x < A + D) { v = 1 - (1 - Sl) * (x - A) / D; col = PINK; }
        else if (x < A + D + hold) { v = Sl; col = TEAL; } else { v = Sl * (1 - (x - A - D - hold) / R); col = BLUE; }
        const hh = Math.round(H * Math.max(0.03, v)) + 18, ta = o.real ? o.real + x : t0 + i * (o.step ?? 0);
        if (o.col) col = o.col;
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: w, chh: hh, x: cx + (i - (NS - 1) / 2) * w, y: y - hh + 8 });
        if (o.lit !== false) g.active.push({ t0: ta, t1, i: 0 });
      }
      return total;
    }

    // ---- hook: the three blocks + a sawtooth spectrum whose highs come and go with the filter (cover) ----
    const h1 = S('hook').t1;
    const BLK = [{ label: 'WAVE', sub: 'OSCILLATOR', color: TEAL, size: 46 }, { label: 'FILTER', sub: 'CUTS HARMONICS', color: PINK, size: 46 }, { label: 'SHAPE', sub: 'ENVELOPE', color: GOLD, size: 46 }];
    const gb = a.grid(BLK, 0.05, h1, { rows: 1, cols: 3, cw: 330, chh: 150, y: 440 });
    const tWa = a.w('hook', 'wave') - 0.05, tFi = a.w('hook', 'filter') - 0.05, tEn = a.w('hook', 'envelope') - 0.05;
    gb.active.push({ t0: 0.05, t1: tWa, i: 0 }, { t0: tWa, t1: tFi, i: 0 }, { t0: tFi, t1: tEn, i: 1 }, { t0: tEn, t1: a.at('what'), i: 2 });
    [0, 1, 2].forEach(i => gb.active.push({ t0: a.at('what') + i * 0.12, t1: h1, i }));
    const sweep = t => 2.5 + 6.5 * (0.5 - 0.5 * Math.cos((t - 0.2) * 1.3));
    spectrum(SAW, 0.05, h1, { fc: t => (t < 0.9 ? 7 : sweep(t)), step: 0.015 });
    riff(0.2, h1 - 0.3, sweep, { drums: true });
    a.big('SUBTRACTIVE SYNTHESIS', a.w('what', 'subtractive') - 0.05, h1, { y: 650, size: 48, color: GOLD, blur: 14 });

    // ---- s1: Moog modular - patched modules, a riff running through them ----
    const m0 = S('s1').t0, m1 = S('s1').t1;
    const MOD = ['OSC', 'OSC', 'FILTER', 'ENV', 'AMP', 'OUT'].map((l, i) => ({ label: l, color: [TEAL, TEAL, PINK, GOLD, BLUE, WHITE][i], size: 44 }));
    const gm = a.grid(MOD, m0 + 0.1, m1, { rows: 2, cols: 3, cw: 300, chh: 190, y: 470, revealStep: 0.1 });
    for (let t = m0 + 0.3, k = 0; t < m1 - 0.2; t += 0.2, k++) gm.active.push({ t0: t, t1: t + 0.2, i: k % 6 });
    a.big('1964', a.w('s1', '1964') - 0.05, m1, { y: 920, size: 90, color: GOLD, blur: 18 });
    riff(m0 + 0.3, m1 - 0.2, t => 3 + 2 * Math.sin(t * 2), { vel: 0.32 });

    // ---- s2: Switched-On Bach (named only) - an original baroque-style line on a synth ----
    const b0 = S('s2').t0, b1 = S('s2').t1;
    a.big('BACH ON A MOOG', a.w('s2', 'Bach') - 0.05, b1, { y: 500, size: 56, color: TEAL, blur: 14 });
    const tThr = a.w('s2b', 'three') - 0.05;
    const gg = a.grid([1, 2, 3].map(() => ({ label: 'GRAMMY', color: GOLD, size: 40 })), a.at('s2b'), b1, { rows: 1, cols: 3, cw: 300, chh: 150, y: 620 });
    [0, 1, 2].forEach(i => gg.active.push({ t0: tThr + i * 0.2, t1: b1, i }));
    const e16 = 0.125, bt0 = b0 + 0.3;
    for (let k = 0, t = bt0; t < b1 - 0.3; k++, t += e16) {
      const n = BAROQUE[k % BAROQUE.length];
      syn(n, t, e16 * 0.85, SQUARE, { fc: 5 + 2 * Math.sin(k * 0.2), vel: 0.24, d: 0.12, s: 0.4, r: 0.04 });
      if (k % 8 === 0) syn(['C3', 'G2', 'C3', 'G2'][(k / 8) % 4], t, e16 * 7.5, SAW, { fc: 3, vel: 0.22, keys: true });
    }
    spectrum(SQUARE, b0 + 0.1, b1, { color: TEAL, fc: 7, hmax: 240, skipZero: false, labels: false });

    // ---- s3: Minimoog - a portable synth lead with a filter wow ----
    const p0 = S('s3').t0, p1 = S('s3').t1;
    const gp = a.grid([{ label: 'OSC', color: TEAL, size: 40 }, { label: 'FILTER', color: PINK, size: 40 }, { label: 'ENV', color: GOLD, size: 40 }], p0 + 0.1, p1, { rows: 1, cols: 3, cw: 260, chh: 130, y: 470, revealStep: 0.1 });
    a.big('ALL IN ONE BOX', p0 + 0.3, p1, { y: 650, size: 40, ...MONO, color: WHITE, blur: 6 });
    a.big('PORTABLE', a.w('s3', 'portable') - 0.05, p1, { y: 730, size: 64, color: GOLD, blur: 18 });
    const fcL = t => 3 + 4 * (0.5 + 0.5 * Math.sin((t - p0) * 2.6));
    spectrum(SAW, p0 + 0.1, p1, { fc: fcL, hmax: 300, color: ORANGE });
    let tl = p0 + 0.3;
    for (let rep = 0; rep < 3 && tl < p1 - 1; rep++) {
      LEAD.forEach(([n, b]) => { if (tl < p1 - 0.3) { syn(n, tl, b * 0.24 * 0.92, SAW, { fc: fcL(tl), vel: 0.26, a: 0.02, d: 0.3, s: 0.6, r: 0.1 }); gp.active.push({ t0: tl, t1: tl + 0.15, i: 0 }, { t0: tl + 0.05, t1: tl + 0.2, i: 1 }, { t0: tl + 0.1, t1: tl + 0.25, i: 2 }); } tl += b * 0.24; });
    }
    riff(p0 + 0.3, p1 - 0.3, () => 3, { vel: 0.22, e: 0.24 * 2 });

    // ---- why1-4: the oscillator - sine, sawtooth, square (waveform + harmonics) ----
    const o0 = S('why1').t0, o1 = S('why1').t1;
    const tOs = a.w('why1', 'oscillator') - 0.05, tSi = a.at('why2') - 0.05, tSa = a.at('why3') - 0.05, tSq = a.at('why4') - 0.05;
    a.big('OSCILLATOR', tOs, tSi, { y: 470, size: 52, color: TEAL, blur: 12 });
    wave(W_SAW, o0 + 0.2, tSi + 0.2, { color: GREY });
    syn('C3', tOs, tSi - tOs - 0.1, SAW, { vel: 0.26, a: 0.05 });
    const WAVES = [[tSi, tSa, SINE, W_SINE, 'SINE: PURE', WHITE], [tSa, tSq, SAW, W_SAW, 'SAWTOOTH: ALL', ORANGE], [tSq, o1, SQUARE, W_SQ, 'SQUARE: ODD ONLY', LILAC]];
    WAVES.forEach(([t0, t1, P, fn, lab, col], k) => {
      const end = k < 2 ? t1 + 0.15 : t1;
      wave(fn, t0, end, { color: col });
      a.big(lab, t0, end, { y: 470, size: 48, color: col, blur: 12 });
      spectrum(P, t0, end, { color: col, skipZero: true, hmax: 340 });
      syn('C3', t0 + 0.1, t1 - t0 - 0.25, P, { vel: 0.32, a: 0.04, r: 0.15 });
    });
    a.big('BRIGHT, BUZZY', a.w('why3', 'bright') - 0.05, tSq + 0.15, { y: 800, size: 36, ...MONO, color: WHITE, blur: 0 });
    a.big('HOLLOW', a.w('why4', 'hollow') - 0.05, o1, { y: 800, size: 36, ...MONO, color: WHITE, blur: 0 });

    // ---- why5-6: the filter - cut the highs, then sweep the cutoff ----
    const f0 = S('why5').t0, f1 = S('why5').t1;
    const tLo = a.w('why5', 'cuts') - 0.05, tSw = a.w('why6', 'sweeping') - 0.05;
    const fcF = t => (t < tLo ? 16 : t < tSw ? Math.max(3, 16 - (t - tLo) * 20) : 2.5 + 7.5 * (0.5 - 0.5 * Math.cos((t - tSw) * 1.6)));
    spectrum(SAW, f0 + 0.05, f1, { fc: fcF, color: ORANGE });
    a.big('FILTER', f0 + 0.2, tLo, { y: 470, size: 56, color: PINK, blur: 14 });
    a.big('LOW-PASS: HIGHS CUT', tLo, tSw, { y: 470, size: 48, color: PINK, blur: 14 });
    a.big('SWEEP THE CUTOFF', tSw, f1, { y: 470, size: 48, color: GOLD, blur: 14 });
    a.big('WOW', a.w('why6', 'wow') - 0.05, f1, { y: 590, size: 90, color: GOLD, blur: 20 });
    a.big('KEEP', f0 + 0.3, f1, { x: 250, y: 600, size: 30, ...MONO, color: GREY, blur: 0 });
    a.big('REMOVE', f0 + 0.3, f1, { x: 830, y: 600, size: 30, ...MONO, color: GREY, blur: 0 });
    riff(f0 + 0.2, f1 - 0.3, fcF, { vel: 0.4, drums: true });

    // ---- why7: the envelope - A D S R drawn in real time with the note ----
    const v0 = S('why7').t0, v1 = S('why7').t1;
    const tAt = a.w('why7', 'attack') - 0.05, tDe = a.w('why7', 'decay') - 0.05, tSu = a.w('why7', 'sustain') - 0.05, tRe = a.w('why7', 'release') - 0.05;
    const A = Math.max(0.25, tDe - tAt), D = Math.max(0.3, tSu - tDe), hold = Math.max(0.4, tRe - tSu - 0), R = 0.9;
    adsr(v0 + 0.2, tAt + 0.2, { A, D, Sl: 0.5, hold, R, n: 28, cw: 30, y: 960, h: 380, col: GREY, lit: false, step: 0.02 });
    adsr(tAt, v1, { A, D, Sl: 0.5, hold, R, real: tAt, n: 28, cw: 30, y: 960, h: 380 });
    syn('C4', tAt, A + D + hold, SAW, { fc: 5, vel: 0.36, a: A, d: D * 0.7, s: 0.5, r: R });
    [['A', 'ATTACK', tAt, GOLD], ['D', 'DECAY', tDe, PINK], ['S', 'SUSTAIN', tSu, TEAL], ['R', 'RELEASE', tRe, BLUE]].forEach(([l, w, t, c], i) => {
      a.big(l, t, v1, { x: 300 + i * 160, y: 470, size: 72, color: c, blur: 14 });
      a.big(w, t, v1, { x: 300 + i * 160, y: 540, size: 22, ...MONO, color: c, blur: 0 });
    });
    a.big('VOLUME OVER TIME  →', v0 + 0.2, v1, { y: 1040, size: 28, ...MONO, color: GREY, blur: 0 });
    // a second, plucky envelope in the tail
    const tP = tAt + A + D + hold + R + 0.1;
    [['C4', 0], ['D#4', 0.3], ['G4', 0.6], ['C5', 0.9]].forEach(([n, o]) => { if (tP + o < v1 - 0.4) syn(n, tP + o, 0.25, SAW, { fc: 6, vel: 0.3, a: 0.005, d: 0.15, s: 0.2, r: 0.3 }); });

    // ---- why8: start rich, carve away ----
    const c0 = S('why8').t0, c1 = S('why8').t1;
    const tCa = a.w('why8', 'carve') - 0.05, tSc = a.w('why8', 'sculptor') - 0.05;
    const fc8 = t => (t < tCa ? 16 : Math.max(3, 16 - (t - tCa) * 9));
    spectrum(SAW, c0 + 0.05, c1, { fc: fc8, color: ORANGE });
    a.big('START RICH', c0 + 0.2, tCa, { y: 470, size: 56, color: ORANGE, blur: 14 });
    a.big('CARVE AWAY', tCa, c1, { y: 470, size: 56, color: PINK, blur: 14 });
    a.big('LIKE A SCULPTOR', tSc, c1, { y: 560, size: 36, ...MONO, color: WHITE, blur: 0 });
    for (let t = c0 + 0.2; t < c1 - 0.4; t += 0.4) syn('C3', t, 0.34, SAW, { fc: fc8(t), vel: 0.34, d: 0.4, s: 0.6, r: 0.05 });

    // ---- why9-10: real instruments - piano strike vs violin swell ----
    const r0 = S('why9').t0, r1 = S('why9').t1;
    const tPi = a.w('why10', 'piano') - 0.05, tVi = a.w('why10', 'violin') - 0.05;
    a.big('PIANO: FAST ATTACK, LONG DECAY', tPi, r1, { y: 480, size: 34, ...MONO, color: GOLD, blur: 6 });
    adsr(tPi, r1, { A: 0.02, D: 1.6, Sl: 0.02, hold: 0, R: 0.1, real: tPi, n: 22, cw: 38, y: 760, h: 200 });
    a.note('C4', tPi, 2.4, { vel: 0.5 });
    a.big('VIOLIN: SLOW ATTACK', tVi, r1, { y: 820, size: 34, ...MONO, color: PINK, blur: 6 });
    const VIOL = [1, 0.85, 0.7, 0.62, 0.52, 0.45, 0.36, 0.3];
    adsr(tVi, r1, { A: 1.3, D: 0.3, Sl: 0.85, hold: 0.4, R: 0.3, real: tVi, n: 22, cw: 38, y: 1100, h: 200 });
    syn('C4', tVi, Math.min(2.0, r1 - tVi - 0.3), VIOL, { vel: 0.34, a: 1.3, r: 0.3 });
    a.big('SAME BUILDING BLOCKS', r0 + 0.2, tPi, { y: 600, size: 44, ...MONO, color: WHITE, blur: 6 });
    syn('C3', r0 + 0.2, tPi - r0 - 0.4, SAW, { fc: 4, vel: 0.25, a: 0.3, r: 0.3 });

    // ---- essence: the three blocks and the riff, all together ----
    const z0 = S('essence').t0, z1 = S('essence').t1;
    const gz = a.grid(BLK, z0 + 0.1, z1, { rows: 1, cols: 3, cw: 330, chh: 150, y: 440 });
    const tWf = a.w('essence', 'waveform') - 0.05, tCv = a.w('essence', 'carved') - 0.05, tShp = a.w('essence', 'shaped') - 0.05, tEv = a.w('essence', 'Every') - 0.05;
    gz.active.push({ t0: tWf, t1: tCv, i: 0 }, { t0: tCv, t1: tShp, i: 1 }, { t0: tShp, t1: tEv, i: 2 });
    [0, 1, 2].forEach(i => gz.active.push({ t0: tEv + i * 0.12, t1: z1, i }));
    const zsw = t => 2.5 + 6.5 * (0.5 - 0.5 * Math.cos((t - z0) * 1.1));
    spectrum(SAW, z0 + 0.1, z1, { fc: zsw });
    const zEnd = riff(z0 + 0.2, z1 - 1.4, zsw, { drums: true });
    syn('C2', zEnd, 1.0, SAW, { fc: 3, vel: 0.4, d: 0.5, s: 0.3, r: 0.4 }); a.perc('kick', zEnd, 0.9);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
