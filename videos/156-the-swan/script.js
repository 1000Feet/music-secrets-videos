// The Swan: a gliding cello line over rippling piano - calm above, movement below.
// Brief/copyright: Saint-Saëns's cello melody is NOT reconstructed. We play generic G major chords
// as our own continuous rippling broken-chord pattern, and our own slow, smooth cello-like line.
// "The Dying Swan" (Fokine/Pavlova) is only named.
const BEAT = 0.5, SX = BEAT / 4, BAR = 4 * BEAT;
// ripple voicings (five notes, rippling up and down), one chord per bar
const RIP = {
  G: ['G3', 'B3', 'D4', 'G4', 'B4'], Em: ['E3', 'G3', 'B3', 'E4', 'G4'], C: ['E3', 'G3', 'C4', 'E4', 'G4'],
  D: ['F#3', 'A3', 'D4', 'F#4', 'A4'], Am: ['E3', 'A3', 'C4', 'E4', 'A4'], D7: ['F#3', 'A3', 'C4', 'D4', 'F#4'],
};
const PROG = ['G', 'Em', 'C', 'D', 'Am', 'D', 'D7', 'G'];
const PAT = [0, 1, 2, 3, 4, 3, 2, 1];
// our own slow cello line (in beats), one bar per chord of PROG
const CEL = [['B2', 3], ['D3', 1], ['E3', 2], ['D3', 2], ['G3', 4], ['F#3', 2], ['E3', 1], ['D3', 1],
  ['C3', 3], ['B2', 1], ['A2', 4], ['D3', 3], ['C3', 1], ['B2', 2], ['A2', 2], ['G2', 8]];

module.exports = {
  slug: 'the-swan',
  title: 'The Swan',
  segments: [
    { id: 'hook',    text: 'A cello gliding calmly... over water that never stops moving.' },
    { id: 'what',    text: 'This is The Swan, by Camille Saint-Saëns.' },
    { id: 'what2',   text: "It's from The Carnival of the Animals, 1886: fourteen movements depicting animals." },
    { id: 'joke',    text: 'He considered it a light-hearted joke, and banned its publication in his lifetime.' },
    { id: 'joke2',   text: 'Except The Swan, published in 1887. The full work appeared after his death, in 1921.' },
    { id: 'dance',   text: 'In 1905, Michel Fokine created a solo dance to it,' },
    { id: 'dance2',  text: 'The Dying Swan, for the ballerina Anna Pavlova.' },
    { id: 'why1',    text: 'So why does it feel so graceful? First, the cello.' },
    { id: 'why1b',   text: 'It sings one long, smooth line, legato. The swan, gliding.' },
    { id: 'why2',    text: 'Underneath, the piano plays continuous rippling broken chords. The water.' },
    { id: 'why2b',   text: 'Originally, on two pianos.' },
    { id: 'why3',    text: 'The key is G major. Slow tempo, long notes, few leaps: grace and calm.' },
    { id: 'why4',    text: 'Two textures at once: a still surface, and constant movement beneath.' },
    { id: 'why4b',   text: 'Just like a swan, paddling.' },
    { id: 'essence', text: "Calm above, ripples below. That's how music draws a swan." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'CAMILLE SAINT-SAËNS · 1886', title: 'THE SWAN', accent: true, tonic: 7, min: 5.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'THE CARNIVAL OF THE ANIMALS', title: 'THE SWAN', sub: 'Saint-Saëns · 1886 · in G', tonic: 7, gap: 0.3, tail: 0.6 },
    { id: 'joke', segs: ['joke', 'joke2'], label: 'A MUSICAL JOKE', title: 'NOT FOR PRINT', circle: false, tonic: 7, gap: 0.35, tail: 0.6 },
    { id: 'dance', segs: ['dance', 'dance2'], label: 'MICHEL FOKINE · 1905', title: 'THE DYING SWAN', circle: false, tonic: 7, gap: 0.1, tail: 1.2 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE CELLO GLIDES', circle: false, tonic: 7, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE WATER', circle: false, tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'G MAJOR', tonic: 7, tail: 1.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'TWO TEXTURES', circle: false, tonic: 7, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'CALM ABOVE', accent: true, tonic: 7, gap: 0.6, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const CELLO = { partials: [1, 0.75, 0.5, 0.38, 0.25, 0.16, 0.1, 0.06], attack: 0.18, release: 0.45 };

    // continuous rippling broken chords, one chord per bar (from bar index `from` of PROG)
    function ripples(t0, t1, o = {}) {
      const v = o.vel ?? 0.2, prog = o.prog || PROG;
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.05) break;
        const c = prog[(b + (o.from ?? 0)) % prog.length], notes = RIP[c], end = Math.min(tb + BAR, t1);
        if (o.shape !== false) a.ch(c, tb, end, { notes: notes.slice(0, 4), bass: false, mute: true, hideName: o.hideName });
        for (let k = 0; k < 16; k++) {
          const t = tb + k * SX;
          if (t >= t1 - 0.05) break;
          a.note(notes[PAT[k % 8]], t, SX * 1.6, { vel: v * (k % 4 === 0 ? 1.15 : 0.85), show: false });
          if (o.grid) o.grid.active.push({ t0: t, t1: t + SX, i: k % 8 });
        }
      }
    }
    // our slow cello line from t0 (starting at bar `from` of the line) until t1; returns walker points
    function cello(t0, t1, o = {}) {
      let beats = 0, t = t0;
      const pts = [], skip = (o.from ?? 0) * 4;
      for (const [n, b] of CEL) {
        if (beats >= skip) {
          if (t >= t1 - 0.2) break;
          a.note(n, t, Math.min(b * BEAT, t1 - t) * 0.97, { vel: o.vel ?? 0.34, tone: CELLO, show: o.show ?? false });
          pts.push([t, pcOf(n)]);
          t += b * BEAT;
        }
        beats += b;
      }
      if (o.grid) o.grid.active.push({ t0, t1: Math.min(t, t1), i: 0 });
      return pts;
    }
    // two lanes: CELLO (one long cell) above, PIANO (eight ripple cells) below
    function lanes(t0, t1) {
      const gc = a.grid([{ label: 'CELLO', sub: 'LONG · SMOOTH', color: GOLD, size: 56, subSize: 24 }], t0, t1, { rows: 1, cols: 1, cw: 900, chh: 190, y: 470 });
      const gp = a.grid(Array.from({ length: 8 }, () => ({ label: '', color: TEAL })), t0, t1, { rows: 1, cols: 8, cw: 112, chh: 120, y: 690, revealStep: 0.04, caption: 'PIANO · RIPPLES' });
      return { gc, gp };
    }

    // ---- hook (cover): G major, the ripples and a gliding cello line on the circle ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'G', a.T.MAJOR, { popIn: { t0: 0.15, step: 0.06 } });
    ripples(0.25, h1, { vel: 0.2 });
    const hp = cello(0.3, h1, { vel: 0.36 });
    a.walker(hp, { t1: h1, dr: -40, color: GOLD, label: 'CELLO', labelDr: -50 });
    a.big('CALM ABOVE · RIPPLES BELOW', 0.3, h1, { y: 462, size: 42, ...MONO, color: TEAL, blur: 10 });

    // ---- what: the Swan, from the Carnival of the Animals ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'G', a.T.MAJOR);
    ripples(w0 + 0.05, w1, { vel: 0.17 });
    a.walker(cello(w0 + 0.1, w1, { vel: 0.3 }), { t1: w1, dr: -40, color: GOLD });
    a.big('14 MOVEMENTS', a.w('what2', 'fourteen') - 0.05, a.w('what2', 'animals') - 0.05, { y: 462, size: 56, ...MONO, color: GOLD, blur: 12 });
    a.big('14 ANIMAL PORTRAITS', a.w('what2', 'animals') - 0.05, w1, { y: 462, size: 46, ...MONO, color: WHITE, blur: 8 });
    a.tag('G', a.w('what', 'Swan'), w1, 'G MAJOR', { dr: -92, color: GOLD });

    // ---- joke: banned, except the Swan ----
    const j0 = S('joke').t0, j1 = S('joke').t1;
    ripples(j0 + 0.05, j1, { vel: 0.14, shape: false, from: 2 });
    const gj = a.grid([
      { label: '1886', sub: 'A JOKE', size: 72, color: GREY, subSize: 24 },
      { label: '1887', sub: 'THE SWAN', size: 72, color: GOLD, subSize: 24 },
      { label: '1921', sub: 'THE FULL WORK', size: 72, color: TEAL, subSize: 22 },
    ], j0 + 0.1, j1, { rows: 1, cols: 3, cw: 320, chh: 230, y: 560, revealStep: 0.15 });
    const tEx = a.w('joke2', 'Except') - 0.05, tFull = a.w('joke2', 'full') - 0.05;
    gj.active.push({ t0: a.w('joke', 'joke') - 0.05, t1: tEx, i: 0 }, { t0: tEx, t1: tFull, i: 1 }, { t0: tFull, t1: j1, i: 2 });
    a.big('LIGHT-HEARTED', a.w('joke', 'considered') - 0.05, a.w('joke', 'banned') - 0.05, { y: 920, size: 56, ...MONO, color: WHITE, blur: 8 });
    a.big('BANNED', a.w('joke', 'banned') - 0.05, tEx, { y: 920, size: 100, color: '#ff5d6c', blur: 24 });
    a.big('EXCEPT THE SWAN', tEx, tFull, { y: 920, size: 64, color: GOLD, blur: 18 });
    a.big('AFTER HIS DEATH', tFull, j1, { y: 920, size: 56, ...MONO, color: TEAL, blur: 10 });

    // ---- dance: Fokine, Pavlova, The Dying Swan ----
    const d0 = S('dance').t0, d1 = S('dance').t1;
    ripples(d0 + 0.05, d1, { vel: 0.17, shape: false, from: 4 });
    cello(d0 + 0.2, d1, { vel: 0.3, from: 4 });
    a.big('1905', d0 + 0.2, a.w('dance', 'Michel') - 0.05, { y: 680, size: 180, color: GOLD, blur: 30 });
    a.big('MICHEL FOKINE', a.w('dance', 'Michel') - 0.05, d1, { y: 600, size: 76, color: WHITE, blur: 14 });
    a.big('CHOREOGRAPHER', a.w('dance', 'Michel') + 0.1, d1, { y: 690, size: 36, ...MONO, color: GREY, blur: 0 });
    a.big('A SOLO DANCE', a.w('dance', 'solo') - 0.05, a.at('dance2'), { y: 860, size: 60, ...MONO, color: TEAL, blur: 10 });
    a.big('ANNA PAVLOVA', a.w('dance2', 'Anna') - 0.05, d1, { y: 860, size: 76, color: LILAC, blur: 18 });
    a.big('BALLERINA', a.w('dance2', 'Anna') + 0.1, d1, { y: 950, size: 36, ...MONO, color: GREY, blur: 0 });

    // ---- why1: the cello - one long, smooth line ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const L1 = lanes(y0 + 0.1, y1);
    const tC = a.w('why1', 'cello') - 0.05;
    a.ch('G', y0 + 0.1, tC, { notes: ['G3', 'B3', 'D4'], bass: 'G2', vel: 0.3, shape: false });
    cello(tC, y1, { vel: 0.4, grid: L1.gc });
    ripples(a.at('why1b'), y1, { vel: 0.1, shape: false });
    a.big('ONE LONG LINE', a.w('why1b', 'long') - 0.05, a.w('why1b', 'legato') - 0.05, { y: 960, size: 60, color: GOLD, blur: 14 });
    a.big('LEGATO', a.w('why1b', 'legato') - 0.05, a.w('why1b', 'swan') - 0.05, { y: 960, size: 100, color: GOLD, blur: 26 });
    a.big('GLIDING CALMLY', a.w('why1b', 'swan') - 0.05, y1, { y: 960, size: 60, ...MONO, color: WHITE, blur: 10 });

    // ---- why2: the piano ripples - the water ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const L2 = lanes(z0 + 0.1, z1);
    const tP = a.w('why2', 'piano') - 0.05;
    cello(z0 + 0.1, z1, { vel: 0.22, from: 2 });
    ripples(tP, z1, { vel: 0.24, shape: false, grid: L2.gp, from: 2 });
    a.big('BROKEN CHORDS', a.w('why2', 'broken') - 0.05, a.w('why2', 'water') - 0.05, { y: 960, size: 60, color: TEAL, blur: 14 });
    a.big('THE WATER', a.w('why2', 'water') - 0.05, a.at('why2b') - 0.05, { y: 960, size: 90, color: BLUE, blur: 26 });
    a.big('ORIGINALLY · 2 PIANOS', a.at('why2b') - 0.05, z1, { y: 960, size: 46, ...MONO, color: WHITE, blur: 8 });

    // ---- why3: G major - slow, long notes, few leaps ----
    const q0 = S('why3').t0, q1 = S('why3').t1;
    a.scale(q0, 'G', a.T.MAJOR);
    const tG = a.w('why3', 'G') - 0.05;
    ripples(q0 + 0.1, q1, { vel: 0.16 });
    a.walker(cello(q0 + 0.15, q1, { vel: 0.36, show: true }), { t1: q1, dr: -40, color: GOLD, label: 'CELLO', labelDr: -50 });
    a.ring(['G'], tG, q1, { color: GOLD });
    a.tag('G', tG, q1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('SLOW', a.w('why3', 'Slow') - 0.05, a.w('why3', 'long') - 0.05, { y: 462, size: 56, ...MONO, color: WHITE, blur: 8 });
    a.big('LONG NOTES', a.w('why3', 'long') - 0.05, a.w('why3', 'few') - 0.05, { y: 462, size: 56, ...MONO, color: GOLD, blur: 10 });
    a.big('FEW LEAPS', a.w('why3', 'few') - 0.05, a.w('why3', 'grace') - 0.05, { y: 462, size: 56, ...MONO, color: TEAL, blur: 10 });
    a.big('GRACE · CALM', a.w('why3', 'grace') - 0.05, q1, { y: 462, size: 56, color: GOLD, blur: 18 });

    // ---- why4: two textures at once - a swan paddling ----
    const p0 = S('why4').t0, p1 = S('why4').t1;
    const L4 = lanes(p0 + 0.1, p1);
    const tSt = a.w('why4', 'still') - 0.05, tMv = a.w('why4', 'constant') - 0.05;
    cello(p0 + 0.15, p1, { vel: 0.36, from: 4 });
    L4.gc.active.push({ t0: tSt, t1: p1, i: 0 });
    ripples(p0 + 0.15, p1, { vel: 0.22, shape: false, from: 4 });
    for (let t = tMv; t < p1 - 0.05; t += SX) L4.gp.active.push({ t0: t, t1: t + SX, i: Math.round((t - tMv) / SX) % 8 });
    a.big('STILL SURFACE', tSt, tMv, { y: 960, size: 64, color: GOLD, blur: 14 });
    a.big('CONSTANT MOVEMENT', tMv, a.at('why4b') - 0.05, { y: 960, size: 60, color: TEAL, blur: 14 });
    a.big('A SWAN, PADDLING', a.at('why4b') - 0.05, p1, { y: 960, size: 64, color: WHITE, blur: 16 });

    // ---- essence: calm above, ripples below, ending on G ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'G', a.T.MAJOR);
    const eEnd = e1 - 2.2;
    ripples(e0 + 0.1, eEnd, { vel: 0.2, from: 4 });
    a.walker(cello(e0 + 0.15, eEnd, { vel: 0.36, from: 4 }), { t1: e1, dr: -40, color: GOLD });
    a.ch('G', eEnd, e1 - 0.2, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.45 });
    a.note('G2', eEnd, 2.0, { vel: 0.3, tone: CELLO, show: false });
    a.ring(['G'], eEnd, e1, { color: GOLD });
    a.big('RIPPLES BELOW', a.w('essence', 'ripples') - 0.05, e1, { y: 462, size: 50, ...MONO, color: TEAL, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
