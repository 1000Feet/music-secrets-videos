// The Wonderwall trick: two top notes (D and G in the chord shapes) ring through every chord.
// Copyright: only the chord shapes are played, with generic strumming - no melody, no lyrics.
// The chords are played at SHAPE pitch (as if without the capo), so the names match the shapes.
const BEAT = 0.69, BAR = 4 * BEAT; // about 87 BPM
const SHAPES = ['Em7', 'G', 'Dsus4', 'A7sus4'];
// guitar voicings, low to high: Em7 022033, G 320033, Dsus4 xx0233, A7sus4 x02233
const V = {
  Em7: ['E2', 'B2', 'E3', 'G3', 'D4', 'G4'], G: ['G2', 'B2', 'D3', 'G3', 'D4', 'G4'],
  Dsus4: ['D3', 'A3', 'D4', 'G4'], A7sus4: ['A2', 'E3', 'A3', 'D4', 'G4'],
  D: ['D3', 'A3', 'D4', 'F#4'],
};
const PARSE = { Em7: 'Em7', G: 'G', Dsus4: 'Dsus4', A7sus4: 'Asus4', D: 'D' };
// fret per string (high E first, as in tab): -1 = not played
const FRETS = { Em7: [3, 3, 0, 2, 2, 0], G: [3, 3, 0, 0, 2, 3], Dsus4: [3, 3, 2, 0, -1, -1], A7sus4: [3, 3, 2, 2, 0, -1] };

module.exports = {
  slug: 'wonderwall',
  title: 'The Wonderwall Trick',
  segments: [
    { id: 'hook',     text: "Four chords, and two notes that never move. That's the Wonderwall trick." },
    { id: 'what',     text: 'Wonderwall, by Oasis, from 1995. Capo on the second fret, and four chord shapes:' },
    { id: 'what2',    text: 'E minor seven, G, D sus four, A seven sus four.' },
    { id: 'fingers',  text: 'The trick: the ring and little fingers stay on the third fret of the two highest strings...' },
    { id: 'fingers2', text: 'for every chord. So the same two top notes ring all the way through.' },
    { id: 'why1',     text: 'So why does it work? Notes shared by neighboring chords are called common tones.' },
    { id: 'why2',     text: 'Here, two notes are shared by all four chords. Like a mini drone, from our drone video.' },
    { id: 'why3',     text: 'Only the lower notes move, so the chords seem to shift under a fixed ceiling.' },
    { id: 'why4',     text: 'The sus chords swap the third for the fourth. They sound open and unresolved...' },
    { id: 'why4b',    text: 'so the loop just floats.' },
    { id: 'why5',     text: 'And open strings plus fixed fingers make it easy to play, with a ringing, shimmering sound.' },
    { id: 'essence',  text: 'Keep two notes still, move everything underneath, and four chords become one sound.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TWO NOTES THAT NEVER MOVE', title: 'THE WONDERWALL TRICK', accent: true, tonic: 4, lead: 0.3, min: 5.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'YOU HEAR IT IN', title: 'Wonderwall', sub: 'Oasis · 1995 · capo on fret 2', tonic: 4, gap: 0.3, tail: 1.0 },
    { id: 'fingers', segs: ['fingers', 'fingers2'], label: 'FRETS COUNTED FROM THE CAPO', title: 'TWO FINGERS STAY', circle: false, tonic: 4, gap: 0.3, tail: 1.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'COMMON TONES', tonic: 4, tail: 1.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A MINI DRONE', tonic: 4, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'A FIXED CEILING', circle: false, tonic: 4, tail: 2.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'SUS CHORDS', tonic: 4, gap: 0.3, tail: 1.4 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'EASY AND RINGING', circle: false, tonic: 4, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'FOUR CHORDS, ONE SOUND', accent: true, tonic: 4, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    // a strummed chord: generic pattern of down/up strums across `bars` bars (or a single strike)
    const PAT = [[0, 1], [1, 0.55], [1.5, 0.7], [2.5, 0.6], [3, 0.8], [3.5, 0.6]];
    function strum(c, t0, t1, o = {}) {
      const len = t1 - t0, sc = o.scale ?? 1;
      const strikes = o.single ? [{ o: 0, v: 1 }] : PAT.map(([b, v]) => ({ o: b * BEAT * sc, v })).filter(s => s.o < len - 0.05);
      return a.ch(PARSE[c], t0, t1, { notes: V[c], bass: false, label: c, strikes, vel: o.vel ?? 0.55, hideName: o.hideName, shape: o.shape });
    }
    const cycle = (t0, t1, o = {}) => { const n = o.n ?? 4, l = (t1 - t0) / n; for (let i = 0; i < n; i++) strum(SHAPES[(i + (o.from ?? 0)) % 4], t0 + i * l, t0 + (i + 1) * l, { scale: l / BAR, ...o }); return l; };
    const keep = (t0, t1, o = {}) => { a.ring(['D', 'G'], t0, t1, { color: GOLD }); if (o.tag !== false) a.tag(0, t0 + 0.1, t1, o.text || 'D + G STAY', { x: 540, y: o.y ?? 462, color: GOLD }); };

    // ---- hook (cover): the four shapes cycle on the circle, D and G ringed the whole time ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'E', a.T.MINOR, { popIn: { t0: 0.2, step: 0.06 } });
    cycle(0.3, h1 - 0.1, { vel: 0.5 });
    keep(0.3, h1, { text: 'TWO NOTES NEVER MOVE' });

    // ---- what: the song; the four shapes on their spoken names ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'E', a.T.MINOR);
    const tw = [a.w('what2', 'E'), a.w('what2', 'G'), a.w('what2', 'D'), a.w('what2', 'A')].map(t => t - 0.05);
    cycle(w0 + 0.1, tw[0], { n: 4, vel: 0.45 });
    SHAPES.forEach((c, i) => strum(c, tw[i], i < 3 ? tw[i + 1] : w1, { scale: 0.5, vel: 0.6 }));
    a.big('CAPO 2 · 4 SHAPES', a.w('what', 'Capo') - 0.05, tw[0], { y: 462, size: 32, ...MONO, color: GREY, blur: 0 });
    keep(tw[0], w1, { tag: false });

    // ---- fingers: a fretboard (strings x frets 0-3); the two fret-3 dots never move ----
    const f0 = S('fingers').t0, f1 = S('fingers').t1;
    const STR = ['E', 'B', 'G', 'D', 'A', 'E'];
    const cells = [];
    STR.forEach((s, r) => { for (let f = 0; f < 4; f++) cells.push({ label: '', color: r < 2 && f === 3 ? GOLD : f === 0 ? BLUE : TEAL }); });
    const fb = a.grid(cells, f0 + 0.05, f1, { rows: 6, cols: 4, cw: 190, chh: 84, y: 520, revealStep: 0.01 });
    STR.forEach((s, r) => a.big(s, f0 + 0.05, f1, { x: 125, y: 520 + r * 84 + 42, size: 30, ...MONO, color: GREY, blur: 0 }));
    ['OPEN', '1', '2', '3'].forEach((s, f) => a.big(s, f0 + 0.05, f1, { x: 540 - 380 + (f + 0.5) * 190, y: 492, size: 24, ...MONO, color: f === 3 ? GOLD : GREY, blur: 0 }));
    const tStay = a.w('fingers', 'stay') - 0.05, fl = (f1 - f0 - 0.3) / 6;
    for (let k = 0; k < 6; k++) {
      const c = SHAPES[k % 4], t = f0 + 0.15 + k * fl;
      strum(c, t, t + fl, { scale: fl / BAR, vel: 0.5, shape: false, hideName: true });
      FRETS[c].forEach((fr, r) => {
        if (fr < 0) return;
        const fixed = r < 2;
        fb.active.push({ t0: fixed ? Math.max(t, f0 + 0.15) : t, t1: t + fl, i: r * 4 + fr });
      });
      a.big(c, t, t + fl, { y: 1090, size: 56, color: WHITE, blur: 12 });
    }
    a.big('RING + LITTLE FINGER', tStay, f1, { x: 540 + 285, y: 455, size: 24, ...MONO, color: GOLD, blur: 0 });
    a.big('SAME TWO TOP NOTES', a.w('fingers2', 'same') - 0.05, f1, { x: 540 - 150, y: 455, size: 24, ...MONO, color: GOLD, blur: 0 });

    // ---- why1: common tones - Em7 to G shares G, B and D ----
    const x0 = S('why1').t0, x1 = S('why1').t1, tSh = a.w('why1', 'shared') - 0.05, tCo = a.w('why1', 'common') - 0.05;
    a.scale(x0, 'E', a.T.MINOR);
    strum('Em7', x0 + 0.05, tSh, { vel: 0.5, scale: 0.6 });
    strum('G', tSh, x1, { vel: 0.5, scale: 0.6 });
    a.ring(['G', 'B', 'D'], tSh + 0.1, x1, { color: TEAL });
    a.tag(0, tCo, x1, 'COMMON TONES: G · B · D', { x: 540, y: 462, color: TEAL });

    // ---- why2: two notes in all four chords - a mini drone ----
    const y0 = S('why2').t0, y1 = S('why2').t1;
    cycle(y0 + 0.05, y1 - 0.1, { vel: 0.5 });
    keep(a.w('why2', 'two') - 0.05, y1, { text: 'IN ALL FOUR CHORDS' });
    const tDr = a.w('why2', 'drone') - 0.05;
    ['D4', 'G4'].forEach(n => a.note(n, tDr, y1 - tDr - 0.1, { vel: 0.12, show: false, tone: { partials: [1, 0.4, 0.2, 0.1], attack: 0.3, release: 0.5 } }));
    a.tag(0, tDr, y1, 'LIKE A DRONE', { x: 540, y: 945, color: GOLD });

    // ---- why3: a voicing chart - the top two rows never change, the lower notes move ----
    const z0 = S('why3').t0, z1 = S('why3').t1;
    const LOW = { Em7: ['G3', 'E3', 'B2', 'E2'], G: ['G3', 'D3', 'B2', 'G2'], Dsus4: ['A3', 'D3', '', ''], A7sus4: ['A3', 'E3', 'A2', ''] };
    const vc = [];
    const ROWS = 6;
    for (let r = 0; r < ROWS; r++) SHAPES.forEach(c => {
      const n = r === 0 ? 'G4' : r === 1 ? 'D4' : LOW[c][r - 2];
      vc.push({ label: n.replace(/\d/, ''), color: r < 2 ? GOLD : TEAL, size: 44 });
    });
    const gv = a.grid(vc, z0 + 0.05, z1, { rows: ROWS, cols: 4, cw: 230, chh: 92, y: 520, revealStep: 0.015 });
    SHAPES.forEach((c, i) => a.big(c, z0 + 0.05, z1, { x: 540 - 460 + (i + 0.5) * 230, y: 492, size: 30, ...MONO, color: WHITE, blur: 0 }));
    const tLo = a.w('why3', 'lower') - 0.05, tCe = a.w('why3', 'ceiling') - 0.05;
    const zl = (z1 - z0 - 0.3) / 6;
    for (let k = 0; k < 6; k++) {
      const c = SHAPES[k % 4], i = k % 4, t = z0 + 0.15 + k * zl;
      strum(c, t, t + zl, { scale: zl / BAR, vel: 0.5, shape: false, hideName: true });
      for (let r = 0; r < ROWS; r++) if (r < 2 || LOW[c][r - 2]) gv.active.push({ t0: t, t1: t + zl, i: r * 4 + i });
    }
    a.big('FIXED CEILING', tCe, z1, { y: 1110, size: 46, ...MONO, color: GOLD, blur: 8 });
    a.big('ONLY THE LOWER NOTES MOVE', tLo, tCe, { y: 1110, size: 38, ...MONO, color: TEAL, blur: 8 });

    // ---- why4: sus4 - the third (F#) swapped for the fourth (G) ----
    const q0 = S('why4').t0, q1 = S('why4').t1;
    const tTh = a.w('why4', 'third') - 0.05, tFo = a.w('why4', 'fourth') - 0.05, tOp = a.w('why4', 'open') - 0.05, tFl = a.w('why4b', 'floats') - 0.05;
    a.scale(q0, 'D', a.T.MAJOR);
    strum('D', q0 + 0.05, tFo, { single: true, vel: 0.55 });
    a.tag('F#', tTh, tFo, 'THIRD', { dr: -75, color: BLUE });
    strum('Dsus4', tFo, tOp, { single: true, vel: 0.6 });
    a.arc('F#', 'G', tFo, tOp + 0.4, { steps: 1, color: GOLD, dr: 30 });
    a.tag('G', tFo, q1, 'FOURTH', { dr: -75, color: GOLD });
    a.tag(0, tFo + 0.2, tOp, 'SUS4: NO THIRD', { x: 540, y: 462, color: GOLD });
    const ql = (q1 - tOp - 0.1) / 4;
    ['Dsus4', 'A7sus4', 'Dsus4', 'A7sus4'].forEach((c, i) => strum(c, tOp + i * ql, tOp + (i + 1) * ql, { scale: ql / BAR, vel: 0.5 }));
    a.tag(0, tOp, tFl, 'OPEN · UNRESOLVED', { x: 540, y: 462, color: TEAL });
    a.tag(0, tFl, q1, 'IT FLOATS', { x: 540, y: 462, color: TEAL });

    // ---- why5: open strings + fixed fingers on the fretboard, ringing ----
    const r0 = S('why5').t0, r1 = S('why5').t1;
    const fb2 = a.grid(cells, r0 + 0.05, r1, { rows: 6, cols: 4, cw: 190, chh: 84, y: 520 });
    STR.forEach((s, r) => a.big(s, r0 + 0.05, r1, { x: 125, y: 520 + r * 84 + 42, size: 30, ...MONO, color: GREY, blur: 0 }));
    ['OPEN', '1', '2', '3'].forEach((s, f) => a.big(s, r0 + 0.05, r1, { x: 540 - 380 + (f + 0.5) * 190, y: 492, size: 24, ...MONO, color: f === 0 ? BLUE : f === 3 ? GOLD : GREY, blur: 0 }));
    const rl = (r1 - r0 - 0.3) / 4;
    for (let k = 0; k < 4; k++) {
      const c = SHAPES[k], t = r0 + 0.15 + k * rl;
      strum(c, t, t + rl, { scale: rl / BAR, vel: 0.55, shape: false, hideName: true });
      FRETS[c].forEach((fr, r) => { if (fr >= 0) fb2.active.push({ t0: t, t1: t + rl, i: r * 4 + fr }); });
      // a shimmer of the two top notes
      [0.5, 1.5, 2.5].forEach(b => { if (b * BEAT < rl) a.note(b % 2 ? 'G5' : 'D5', t + b * BEAT * (rl / BAR), 0.5, { vel: 0.08, show: false }); });
    }
    a.big('EASY TO PLAY', a.w('why5', 'easy') - 0.05, r1, { y: 1090, size: 46, ...MONO, color: GOLD, blur: 8 });
    a.big('RINGING · SHIMMERING', a.w('why5', 'ringing') - 0.05, r1, { y: 1150, size: 32, ...MONO, color: BLUE, blur: 0 });

    // ---- essence: the loop once more, D and G held, landing on Em7 ----
    const e0 = S('essence').t0, e1 = S('essence').t1, eL = a.at('cta') - 0.2;
    a.scale(e0, 'E', a.T.MINOR);
    cycle(e0 + 0.1, eL, { vel: 0.5 });
    strum('Em7', eL, e1 - 0.3, { single: true, vel: 0.6 });
    keep(e0 + 0.1, e1, { text: 'D + G NEVER MOVE' });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
