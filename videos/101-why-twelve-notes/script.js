// Why 12 notes: stack pure fifths (3:2) and after exactly twelve you almost land back on C.
// Amazing Grace (public domain) is played on the black keys exactly as given in the brief.
const FIFTH = 12 * Math.log2(1.5);           // a pure fifth in semitones (about 7.02)
const COMMA = 12 * FIFTH - 84;               // twelve pure fifths minus seven octaves (about 0.23)

module.exports = {
  slug: 'why-twelve-notes',
  title: 'Why Are There 12 Notes?',
  segments: [
    { id: 'hook',    text: 'Why does every octave have exactly twelve notes?' },
    { id: 'what',    text: 'A piano octave: seven white keys, five black keys.' },
    { id: 'grace',   text: 'Play only the black keys, and you get Amazing Grace: a pentatonic scale.' },
    { id: 'west',    text: 'Most Western music uses just these twelve.' },
    { id: 'why1',    text: 'So why twelve? Start on C and climb by perfect fifths, a ratio of three to two.' },
    { id: 'why2',    text: 'C, G, D, A, E, B, F sharp... after twelve fifths, you land on B sharp.' },
    { id: 'why3',    text: "That's almost C, seven octaves higher." },
    { id: 'comma',   text: 'But a little sharp: about a quarter of a half step. The Pythagorean comma.' },
    { id: 'close',   text: 'Twelve is the first number of fifths that comes this close.' },
    { id: 'close2',  text: "That's why the octave has twelve notes, and the circle of fifths closes." },
    { id: 'five',    text: 'Five notes of the chain give the black keys, a pentatonic scale.' },
    { id: 'seven',   text: 'Seven give the white keys, a major scale. Twelve fill in everything.' },
    { id: 'legend',  text: 'Legend credits Pythagoras, in the sixth century BC, with these ratios.' },
    { id: 'essence', text: "Twelve notes aren't a convention. They're where the fifths almost come home." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'NOT 10, NOT 8', title: 'WHY 12 NOTES?', accent: true, tonic: 0, min: 4.2, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'ONE OCTAVE', title: '7 WHITE + 5 BLACK', tonic: 0, tail: 1.0 },
    { id: 'grace', segs: ['grace'], label: 'YOU HEAR IT IN', title: 'Amazing Grace', sub: 'Black keys only · in Gb', tonic: 6, tail: 4.6 },
    { id: 'west', segs: ['west'], label: 'YOU HEAR IT IN', title: 'Western Music', sub: 'the same 12 notes', tonic: 0, tail: 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY TWELVE?', title: 'THE PERFECT FIFTH', circle: false, tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why3'], label: 'STACK THE FIFTHS', title: 'C → B#', tonic: 0, gap: 0.35, tail: 0.8 },
    { id: 'comma', segs: ['comma'], label: 'ALMOST', title: 'THE PYTHAGOREAN COMMA', tonic: 0, tail: 1.6 },
    { id: 'close', segs: ['close', 'close2'], label: 'TWELVE FIFTHS', title: 'THE CIRCLE CLOSES', tonic: 0, gap: 0.35, tail: 1.6 },
    { id: 'five', segs: ['five'], label: 'FIVE IN A ROW', title: 'PENTATONIC', tonic: 6, tail: 0.9 },
    { id: 'seven', segs: ['seven'], label: 'SEVEN IN A ROW', title: 'MAJOR SCALE', tonic: 0, tail: 1.0 },
    { id: 'legend', segs: ['legend'], label: 'THE LEGEND', title: 'PYTHAGORAS', sub: '6th century BC', circle: false, tonic: 0, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'WHERE FIFTHS COME HOME', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], BLACK = [1, 3, 6, 8, 10];
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    const NM = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    // the chain of fifths from C: names as spoken (sharps), pitch classes, pure pitches folded into C4..C5
    const CHAIN = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
    const pure = k => { let m = 60 + k * FIFTH; while (m >= 72.5) m -= 12; return m; };
    const pcOf = k => (k * 7) % 12;
    const FIFTHS = [...Array(12)].map((_, k) => pcOf(k));   // pitch classes in circle-of-fifths order

    // ---- hook: twelve dots pop in, a chromatic climb ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'C', ALL, { popIn: { t0: 0.2, step: 0.06 } });
    for (let i = 0; i <= 12; i++) a.note(60 + i, 0.2 + i * 0.06, i === 12 ? 2.5 : 0.5, { vel: 0.2 });
    a.big('12', 0.2, h1, { y: 815, size: 170, color: WHITE });
    a.big('NOTES', 0.4, h1, { y: 925, size: 40, ...MONO, color: GOLD });
    a.ch('C', 1.2, h1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.35, shape: false, hideName: true });

    // ---- what: seven white keys, then five black ----
    const w0 = S('what').t0, tSeven = a.w('what', 'seven'), tFive = a.w('what', 'five'), w1 = S('what').t1;
    a.scale(w0, 'C', ALL);
    a.scale(tSeven, 'C', a.T.MAJOR);
    a.scale(tFive, 'C', BLACK);
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].forEach((n, i) => a.note(n, tSeven + i * 0.1, tFive - tSeven - i * 0.1, { vel: 0.18 }));
    ['C#4', 'D#4', 'F#4', 'G#4', 'A#4'].forEach((n, i) => a.note(n, tFive + i * 0.12, w1 - tFive - i * 0.12 - 0.1, { vel: 0.18 }));
    a.big('7 WHITE', tSeven, w1, { x: 300, y: 462, size: 46, ...MONO, color: WHITE });
    a.big('5 BLACK', tFive, w1, { x: 780, y: 462, size: 46, ...MONO, color: GOLD });

    // ---- Amazing Grace on the black keys, in Gb (notes as given in the brief) ----
    const g0 = S('grace').t0, gm = a.w('grace', 'Amazing') - 0.1, g1 = S('grace').t1;
    a.scale(g0, 'Gb', [0, 2, 4, 7, 9]);
    a.tag(6, g0 + 0.3, g1, 'Gb', { dr: -92, color: WHITE });
    a.big('BLACK KEYS ONLY', a.w('grace', 'black'), g1, { y: 462, size: 40, ...MONO, color: GOLD });
    const GR = [['Db4', 1], ['Gb4', 2], ['Bb4', 0.5], ['Gb4', 0.5], ['Bb4', 2], ['Ab4', 1], ['Gb4', 2], ['Eb4', 1], ['Db4', 3]];
    const beat = 0.42;
    a.melody(GR, gm, beat, { vel: 0.42 });
    // a black-key drone underneath (Gb and Db)
    a.ch('Gb5', gm + beat, g1 - 0.1, { notes: ['Gb3', 'Db4'], bass: 'Gb2', vel: 0.4, hideName: true, strikes: [{ o: 0, v: 1 }, { o: 3 * beat, v: 0.6 }, { o: 6 * beat, v: 0.6 }, { o: 9 * beat, v: 0.6 }] });
    a.ch('Gb5', g0 + 0.1, gm + beat, { notes: ['Gb3', 'Db4'], bass: 'Gb2', vel: 0.3, hideName: true });

    // ---- west: the same twelve, a plain progression ----
    const v0 = S('west').t0;
    a.scale(v0, 'C', ALL);
    a.seq(['C', 'G', 'Am', 'F'], v0 + 0.1, S('west').t1 - 0.1, { strikes: 'pulse', vel: 0.7 });

    // ---- why1: the perfect fifth, 3 : 2 ----
    const y0 = S('why1').t0, y1 = S('why1').t1, tF = a.w('why1', 'fifths');
    a.lissajous(3, 2, a.w('why1', 'Start') - 0.2, y1, { drawIn: 2.2, labelA: 'G × 3', labelB: 'C × 2', drift: 0.1 });
    a.big('3 : 2', a.w('why1', 'ratio'), y1, { y: 470, size: 72, ...MONO, color: GOLD });
    a.note(48, a.w('why1', 'C'), y1 - a.w('why1', 'C'), { vel: 0.26, show: false });
    a.note(48 + FIFTH, tF, y1 - tF, { vel: 0.24, show: false });
    keys(['C3'], a.w('why1', 'C'), y1); keys(['G3'], tF, y1);
    void y0;

    // ---- why2: walk the chain of fifths around the chromatic circle (a twelve-point star) ----
    const z0 = S('why2').t0, z1 = S('why2').t1, cEnd = S('close').t1;
    const tNames = ['C', 'G', 'D', 'A', 'E', 'B', 'F'].map(n => a.w('why2', n));
    const tLand = a.w('why2', 'B', 1);
    const tFast0 = tNames[6] + 0.55, fs = (tLand - 0.1 - tFast0) / 5;
    const T = [...tNames, ...[0, 1, 2, 3, 4].map(i => tFast0 + i * fs), tLand];
    a.scale(z0, 'C', ALL);
    const pts = CHAIN.map((n, k) => [T[k], k === 12 ? COMMA : pcOf(k)]);
    a.walker(pts, { t1: S('comma').t1, dr: 34, color: WHITE });
    for (let k = 1; k <= 12; k++) {
      a.line(pcOf(k - 1), k === 12 ? COMMA : pcOf(k), T[k], cEnd, { color: k === 12 ? GOLD : TEAL, width: 3 });
    }
    CHAIN.forEach((n, k) => {
      const len = k === 12 ? 2.4 : Math.max(0.35, (T[k + 1] ?? T[k] + 0.6) - T[k]) + 0.25;
      a.note(pure(k), T[k], len, { vel: k === 12 ? 0.3 : 0.24, show: false });
      a.note(Math.round(pure(k)), T[k], Math.min(len, 0.6), { vel: 0, show: true });
    });
    a.big('×  3/2', z0 + 0.2, tNames[6], { y: 462, size: 48, ...MONO, color: TEAL });
    a.big('12 FIFTHS', tNames[6], tLand, { y: 462, size: 48, ...MONO, color: TEAL });
    a.big('B#', tLand, a.at('why3'), { y: 462, size: 56, ...MONO, color: GOLD });
    a.big('≈ C + 7 OCTAVES', a.w('why3', 'almost'), z1, { y: 462, size: 46, ...MONO, color: GOLD });
    a.tag(5, T[11], z1, 'E#', { dr: -75, color: WHITE });
    a.ring([0], tLand, cEnd, { color: GOLD });
    a.note(60, a.w('why3', 'C'), 1.4, { vel: 0.22, show: false });

    // ---- comma: B# against C - a little sharp, you can hear them rub ----
    const c0 = S('comma').t0, c1 = S('comma').t1, tSharp = a.w('comma', 'sharp');
    a.arc(0, COMMA, tSharp, c1, { steps: COMMA, color: RED, dr: 62 });
    a.big('B# ≠ C', c0 + 0.1, c1, { y: 830, size: 84, color: WHITE });
    a.big('A LITTLE SHARP', tSharp, a.w('comma', 'quarter'), { y: 462, size: 44, ...MONO, color: RED });
    a.big('≈ 1/4 OF A HALF STEP', a.w('comma', 'quarter'), c1, { y: 462, size: 42, ...MONO, color: RED });
    a.note(60, tSharp, c1 - tSharp - 0.2, { vel: 0.26, show: false });
    a.note(60 + COMMA, tSharp + 0.6, c1 - tSharp - 0.8, { vel: 0.26, show: false });
    keys(['C4'], tSharp, c1);

    // ---- close: twelve fifths almost close; morph to the circle of fifths ----
    const k0 = S('close').t0, tCircle = a.w('close2', 'circle');
    a.big('12', a.w('close', 'Twelve') - 0.05, a.at('close2'), { y: 815, size: 150, color: WHITE });
    a.big('THE FIRST THIS CLOSE', a.w('close', 'first'), a.at('close2'), { y: 462, size: 42, ...MONO, color: GOLD });
    a.ch('C', k0 + 0.1, tCircle, { notes: ['C4', 'G4', 'D5'], bass: 'C3', vel: 0.4, shape: false, hideName: true });
    a.layout(tCircle - 0.2, 1, 1.6);
    const tAround = tCircle + 1.6;
    const around = [...Array(13)].map((_, k) => [tAround + k * 0.16, pcOf(k)]);
    a.walker(around, { t1: cEnd, dr: 34, color: GOLD });
    around.forEach(([t, p], k) => a.note(60 + (k ? ((p + 12 - 0) % 12) : 0), t, 0.3, { vel: 0.16 }));
    a.ch('C', tAround + 12 * 0.16, cEnd - 0.1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.55, label: 'C' });
    a.big('12 NOTES', a.w('close2', 'twelve'), tCircle - 0.2, { y: 462, size: 48, ...MONO, color: WHITE });
    a.big('THE CIRCLE OF FIFTHS', tCircle, cEnd, { y: 462, size: 42, ...MONO, color: GOLD });

    // ---- five: five neighbours on the circle = the black keys (pentatonic) ----
    const f0 = S('five').t0, f1 = S('five').t1, tBlack = a.w('five', 'black');
    a.scale(f0 + 0.1, 'Gb', [0, 2, 4, 7, 9]);
    a.poly(['F#', 'C#', 'G#', 'D#', 'A#'], f0 + 0.3, f1, { closed: false, dash: false, glow: true, color: GOLD, width: 5, alpha: 0.9 });
    ['Gb4', 'Ab4', 'Bb4', 'Db5', 'Eb5', 'Gb5'].forEach((n, i) => a.note(n, tBlack + i * 0.14, 0.5, { vel: 0.22 }));
    a.ch('Gb5', f0 + 0.2, f1 - 0.05, { notes: ['Gb3', 'Db4'], bass: 'Gb2', vel: 0.35, hideName: true, shape: false });
    a.big('5 = BLACK KEYS', a.w('five', 'Five'), f1, { y: 462, size: 46, ...MONO, color: GOLD });

    // ---- seven: seven neighbours = the white keys (major), then all twelve ----
    const s0 = S('seven').t0, s1 = S('seven').t1, tTw = a.w('seven', 'Twelve');
    a.scale(s0 + 0.1, 'C', a.T.MAJOR);
    a.poly(['F', 'C', 'G', 'D', 'A', 'E', 'B'], s0 + 0.2, tTw, { closed: false, dash: false, glow: true, color: TEAL, width: 5, alpha: 0.9 });
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].forEach((n, i) => a.note(n, a.w('seven', 'white') + i * 0.13, 0.45, { vel: 0.2 }));
    a.big('7 = WHITE KEYS', a.w('seven', 'Seven'), tTw, { y: 462, size: 46, ...MONO, color: TEAL });
    a.scale(tTw, 'C', ALL);
    a.poly(FIFTHS, tTw + 0.1, s1, { closed: true, dash: false, glow: true, color: GOLD, width: 4, alpha: 0.8 });
    a.big('12 = EVERYTHING', tTw, s1, { y: 462, size: 46, ...MONO, color: GOLD });
    a.ch('C', s0 + 0.1, tTw, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.35, shape: false, hideName: true });
    for (let i = 0; i < 12; i++) a.note(60 + i, tTw + 0.1 + i * 0.07, 0.4, { vel: 0.15 });

    // ---- legend: Pythagoras and the 3 : 2 ratio ----
    const l0 = S('legend').t0, l1 = S('legend').t1;
    a.lissajous(3, 2, l0 + 0.1, l1, { drawIn: 2.0, labelA: '3', labelB: '2', drift: 0.1, y: 800, r: 200 });
    a.big('3 : 2', a.w('legend', 'ratios'), l1, { y: 1100, size: 64, ...MONO, color: GOLD });
    a.big('A LEGEND', l0 + 0.4, a.w('legend', 'ratios'), { y: 1100, size: 44, ...MONO, color: '#b9b9c2' });
    a.note(48, l0 + 0.2, l1 - l0 - 0.4, { vel: 0.22, show: false });
    a.note(48 + FIFTH, l0 + 0.5, l1 - l0 - 0.7, { vel: 0.2, show: false });
    keys(['C3', 'G3'], l0 + 0.2, l1);

    // ---- essence: around the circle of fifths one last time, home on C ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'C', ALL);
    const ew = [...Array(13)].map((_, k) => [e0 + 0.3 + k * 0.28, pcOf(k)]);
    a.walker(ew, { t1: e1, dr: 34, color: GOLD });
    ew.forEach(([t, p], k) => { if (k < 12) a.note(pure(k), t, 0.5, { vel: 0.17, show: false }); a.note(Math.round(pure(k % 12)), t, 0.3, { vel: 0, show: true }); });
    a.poly(FIFTHS, e0 + 0.2, e1, { closed: true, dash: true, color: GOLD, width: 3, alpha: 0.5 });
    a.ch('C', ew[12][0], e1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.7, label: 'C' });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void PINK;
  },
};
