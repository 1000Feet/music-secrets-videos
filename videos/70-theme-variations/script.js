// Theme and variations: Paganini's Caprice No. 24 (public domain) - only its harmonic skeleton (A minor / E, i - V) is played.
// The violin melody is NOT reconstructed: every variation technique is demonstrated on an ORIGINAL short motif.
// Rachmaninoff's Rhapsody (copyrighted) is named only; its scene plays generic D flat major chords.
const B = 0.3;   // one beat of the motif
// an ORIGINAL two-bar motif over the skeleton: bar 1 on A minor, bar 2 on E
const MOTIF = [
  [['A4', 1], ['C5', 0.5], ['E5', 0.5], ['D5', 1], ['C5', 1]],
  [['B4', 1], ['G#4', 0.5], ['E4', 0.5], ['G#4', 1], ['B4', 1]],
];
const RHYTHM = [
  [['A4', 0.75], ['C5', 0.25], ['E5', 0.75], ['D5', 0.25], ['C5', 2]],
  [['B4', 0.75], ['G#4', 0.25], ['E4', 0.75], ['G#4', 0.25], ['B4', 2]],
];
const MAJOR = [
  [['A4', 1], ['C#5', 0.5], ['E5', 0.5], ['D5', 1], ['C#5', 1]],
  [['B4', 1], ['G#4', 0.5], ['E4', 0.5], ['G#4', 1], ['B4', 1]],
];
// bar 1 mirrored around A (diatonic): every step up now goes down
const INV1 = [['A4', 1], ['F4', 0.5], ['D4', 0.5], ['E4', 1], ['F4', 1]];
// the inverted shape, slow and lush in D flat major
const DFLAT = [
  [['Ab4', 1], ['F4', 0.5], ['Db4', 0.5], ['Eb4', 1], ['F4', 1]],
  [['Ab4', 1], ['C5', 0.5], ['Eb5', 0.5], ['C5', 1], ['Ab4', 1]],
];
const len = bars => bars.reduce((s, bar) => s + bar.reduce((x, [, d]) => x + d, 0), 0);

module.exports = {
  slug: 'theme-variations',
  title: 'Theme and Variations',
  segments: [
    { id: 'hook',    text: 'One short theme... transformed again and again, and you still recognize it.' },
    { id: 'what',    text: "That's theme and variations. The classic: Paganini's Caprice No. 24, in A minor." },
    { id: 'what2',   text: 'For solo violin, published in 1820: a theme, eleven variations and a finale.' },
    { id: 'brahms',  text: 'Brahms wrote variations on it in 1863, and Liszt arranged it too.' },
    { id: 'rach',    text: 'In 1934, Rachmaninoff wrote his Rhapsody on a Theme of Paganini.' },
    { id: 'rach2',   text: 'In Variation 18, he turns it upside down, slows it, and moves it to D flat major.' },
    { id: 'why1',    text: 'So why does it work? The theme sits on the simplest harmony:' },
    { id: 'why1b',   text: 'home, A minor, and its five chord, E.' },
    { id: 'motif',   text: 'Take a simple motif.' },
    { id: 'v1',      text: 'Change its rhythm...' },
    { id: 'v2',      text: 'its register...' },
    { id: 'v3',      text: 'its speed...' },
    { id: 'v4',      text: 'its mode, minor to major...' },
    { id: 'v5',      text: 'You still recognize the bones.' },
    { id: 'inv',     text: 'Or invert it: every interval that went up now goes down.' },
    { id: 'inv2',    text: 'Slow it, move it to D flat major, and a nervous minor tune turns lush.' },
    { id: 'essence', text: 'A great theme is a skeleton. The variations are everything you build on it.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE THEME, MANY FACES', title: 'THEME & VARIATIONS', accent: true, tonic: 9, min: 0.3 + 4 * 4 * B + 0.5 },
    { id: 'what', segs: ['what'], label: 'NICCOLÒ PAGANINI', title: 'CAPRICE NO. 24', sub: 'Op. 1 · 1820 · in A minor', tonic: 9, row: ['i', 'V'], tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'SOLO VIOLIN · 1820', title: 'THEME + 11 + FINALE', circle: false, tonic: 9, tail: 0.6 },
    { id: 'brahms', segs: ['brahms'], label: 'YOU HEAR IT IN', title: 'Paganini Variations', sub: 'Brahms · 1863 · Liszt', circle: false, tonic: 9, tail: 0.6 },
    { id: 'rach', segs: ['rach', 'rach2'], label: 'YOU HEAR IT IN', title: 'Rhapsody', sub: 'Rachmaninoff · 1934', circle: false, tonic: 1, gap: 0.35, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE SKELETON', tonic: 9, row: ['i', 'V'], gap: 0.3, tail: 1.0 },
    { id: 'motif', segs: ['motif'], label: 'AN ORIGINAL MOTIF', title: 'THE MOTIF', tonic: 9, min: 0.15 + 0.6 + len(MOTIF) * B + 0.3 },
    { id: 'v1', segs: ['v1'], label: 'VARIATION', title: 'RHYTHM', tonic: 9, min: 0.15 + 0.5 + len(RHYTHM) * B + 0.3 },
    { id: 'v2', segs: ['v2'], label: 'VARIATION', title: 'REGISTER', tonic: 9, min: 0.15 + 0.4 + len(MOTIF) * B + 0.3 },
    { id: 'v3', segs: ['v3'], label: 'VARIATION', title: 'SPEED', tonic: 9, min: 0.15 + 0.4 + len(MOTIF) * B + 0.3 },
    { id: 'v4', segs: ['v4'], label: 'VARIATION', title: 'MODE', tonic: 9, min: 0.15 + 2.0 + len(MAJOR) * B + 0.3 },
    { id: 'v5', segs: ['v5'], label: 'UNDERNEATH', title: 'THE BONES', tonic: 9, row: ['i', 'V'], min: 0.15 + 0.2 + len(MOTIF) * B + 0.6 },
    { id: 'inv', segs: ['inv', 'inv2'], label: 'UPSIDE DOWN', title: 'INVERSION', tonic: 9, gap: 0.4, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BUILD ON THE BONES', accent: true, tonic: 9, gap: 0.5, tail: 1.6, min: 0.15 + 4 * 4 * B + 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => a.T.NAMES[a.T.mod(a.T.midi(n), 12)];
    const SK = { Am: { notes: ['A3', 'C4', 'E4'], bass: 'A2' }, E: { notes: ['G#3', 'B3', 'E4'], bass: 'E2' }, A: { notes: ['A3', 'C#4', 'E4'], bass: 'A2' } };

    // play bars of [note, beats] with one skeleton chord per bar; returns { pts, end }
    const play = (bars, t0, b, o = {}) => {
      const pts = []; let t = t0;
      const chords = o.chords ?? ['Am', 'E'];
      bars.forEach((bar, k) => {
        const blen = bar.reduce((x, [, d]) => x + d, 0) * b;
        if (chords) {
          const c = chords[k % chords.length], v = (o.voicing && o.voicing[c]) || SK[c] || {};
          a.ch(c, t, k === bars.length - 1 && o.lastEnd ? o.lastEnd : t + blen, { ...v, vel: o.chordVel ?? 0.45, row: o.row ? k % 2 : null,
            strikes: o.strikes ? o.strikes(blen) : [{ o: 0, v: 1 }, { o: blen / 2, v: 0.5 }], hideName: o.hideName, shape: o.shape });
        }
        bar.forEach(([n, d]) => {
          const m = a.T.midi(n) + (o.oct ?? 0);
          a.note(m, t, d * b * 0.92, { vel: o.vel ?? 0.4, show: o.show ?? true });
          pts.push([t, pcOf(n)]);
          t += d * b;
        });
      });
      return { pts, end: t };
    };
    const walk = (pts, t1, o = {}) => a.walker(pts, { t1, dr: o.dr ?? -40, color: o.color ?? GOLD, label: o.label, labelDr: o.labelDr ?? -46 });
    // the bare skeleton: Am / E, one chord per bar, four strikes each
    const skeleton = (t0, t1, bar, o = {}) => {
      for (let t = t0, k = 0; t < t1 - 0.2; t += bar, k++) {
        const c = k % 2 ? 'E' : 'Am';
        a.ch(c, t, Math.min(t + bar, t1), { ...SK[c], vel: o.vel ?? 0.6, row: o.row ? k % 2 : null, hideName: o.hideName, shape: o.shape,
          strikes: [0, 1, 2, 3].map(i => ({ o: i * bar / 4, v: i ? 0.55 : 1 })).filter(s => s.o < t1 - t) });
      }
    };

    // ---- hook: the motif, then a rhythmic variation of it ----
    a.scale(0.2, 'A', a.T.MINOR, { popIn: { t0: 0.3, step: 0.12 } });
    const h1 = play(MOTIF, 0.3, B, { vel: 0.38 });
    const h2 = play(RHYTHM, h1.end, B, { vel: 0.4, lastEnd: S('hook').t1 });
    walk([...h1.pts, ...h2.pts], S('hook').t1);
    a.tag(0, 0.3, h1.end, 'THEME', { x: 540, y: 462, color: GOLD });
    a.tag(0, h1.end, S('hook').t1, 'VARIATION', { x: 540, y: 462, color: TEAL });

    // ---- what: Caprice No. 24 - the skeleton i - V ----
    const bar = 4 * 0.28;
    skeleton(S('what').t0 + 0.1, S('what').t1, bar, { row: true });
    a.ring(['A'], a.w('what', 'A', 0), S('what').t1, { color: GOLD });

    // ---- what2: theme, 11 variations and a finale ----
    const cells = [{ label: 'THEME', size: 36, color: GOLD }, ...Array.from({ length: 11 }, (_, i) => ({ label: String(i + 1), size: 48, color: i % 2 ? TEAL : BLUE })), { label: 'FINALE', size: 34, color: PINK }];
    const g13 = a.grid(cells, S('what2').t0 + 0.1, S('what2').t1, { rows: 4, cols: 4, cw: 210, chh: 130, y: 500, revealStep: 0.06, caption: '24 CAPRICES · OP. 1 · NO. 24' });
    const tT = a.w('what2', 'theme') - 0.05, tEl = a.w('what2', 'eleven') - 0.05, tFin = a.w('what2', 'finale') - 0.05;
    g13.active.push({ t0: tT, t1: tEl, i: 0 });
    for (let i = 0; i < 11; i++) g13.active.push({ t0: tEl + i * (tFin - tEl) / 11, t1: tEl + (i + 1) * (tFin - tEl) / 11, i: i + 1 });
    g13.active.push({ t0: tFin, t1: S('what2').t1, i: 12 });
    skeleton(S('what2').t0 + 0.1, S('what2').t1, bar, { vel: 0.4, shape: false, hideName: true });

    // ---- Brahms 1863, Liszt ----
    const gb = a.grid([{ label: 'BRAHMS', sub: '1863', size: 60, color: GOLD }, { label: 'LISZT', sub: 'ARRANGED IT', size: 60, color: TEAL }], S('brahms').t0 + 0.1, S('brahms').t1,
      { rows: 1, cols: 2, cw: 440, chh: 230, y: 600, revealStep: 0.25 });
    gb.active.push({ t0: a.w('brahms', 'Brahms') - 0.05, t1: a.w('brahms', 'Liszt') - 0.05, i: 0 }, { t0: a.w('brahms', 'Liszt') - 0.05, t1: S('brahms').t1, i: 1 });
    a.big('SAME SKELETON', a.w('brahms', 'variations'), S('brahms').t1, { y: 960, size: 48, ...MONO, color: '#8a8a92', blur: 0 });
    const OCT = { Am: { notes: ['A3', 'E4', 'A4'], bass: 'A2' }, E: { notes: ['G#3', 'E4', 'G#4'], bass: 'E2' } };
    for (let t = S('brahms').t0 + 0.1, k = 0; t < S('brahms').t1 - 0.2; t += bar, k++) {
      const c = k % 2 ? 'E' : 'Am';
      a.ch(c, t, Math.min(t + bar, S('brahms').t1), { ...OCT[c], vel: 0.6, shape: false, hideName: true, strikes: [{ o: 0, v: 1 }, { o: bar / 2, v: 0.7 }, { o: 3 * bar / 4, v: 0.5 }] });
    }

    // ---- Rachmaninoff 1934 (name only): generic lush D flat major chords; three changes in Variation 18 ----
    const gr = a.grid([{ label: 'UPSIDE DOWN', sub: 'INVERSION', size: 44, color: PINK }, { label: 'SLOWER', sub: 'TEMPO', size: 44, color: TEAL }, { label: 'D♭ MAJOR', sub: 'NEW KEY', size: 44, color: GOLD }],
      a.at('rach2'), S('rach').t1, { rows: 3, cols: 1, cw: 620, chh: 150, y: 500, revealStep: 0.1, caption: 'VARIATION 18' });
    gr.active.push({ t0: a.w('rach2', 'upside') - 0.05, t1: S('rach').t1, i: 0 }, { t0: a.w('rach2', 'slows') - 0.05, t1: S('rach').t1, i: 1 }, { t0: a.w('rach2', 'D') - 0.05, t1: S('rach').t1, i: 2 });
    a.big('1934', a.w('rach', '1934'), a.at('rach2'), { y: 640, size: 120, color: GOLD });
    a.big('RHAPSODY ON A THEME', a.w('rach', 'Rhapsody'), a.at('rach2'), { y: 820, size: 46, ...MONO, color: '#ffffff' });
    a.big('OF PAGANINI', a.w('rach', 'Rhapsody'), a.at('rach2'), { y: 890, size: 46, ...MONO, color: '#ffffff' });
    const LUSH = [['Db', ['Ab3', 'Db4', 'F4', 'Ab4'], 'Db2'], ['Bbm', ['F3', 'Bb3', 'Db4', 'F4'], 'Bb1'], ['Gb', ['Gb3', 'Bb3', 'Db4', 'Gb4'], 'Gb2'], ['Ab', ['Eb3', 'Ab3', 'C4', 'Eb4'], 'Ab2']];
    const l0 = S('rach').t0 + 0.1, ll = (S('rach').t1 - l0) / 5;
    [...LUSH, LUSH[0]].forEach(([n, notes, bass], i) => a.ch(n, l0 + i * ll, l0 + (i + 1) * ll, { notes, bass: bass === 'Bb1' ? 'Bb2' : bass, vel: 0.45, shape: false, hideName: true,
      strikes: [0, 1, 2, 3].map(k => ({ o: k * ll / 4, v: k ? 0.35 : 0.9 })) }));

    // ---- why1: home (A minor) and its five chord (E) ----
    a.scale(S('why1').t0, 'A', a.T.MINOR);
    const tA = a.w('why1b', 'A') - 0.04, tE = a.w('why1b', 'E') - 0.04, tC = a.end('why1b') + 0.5;
    a.ch('Am', S('why1').t0 + 0.1, tA, { ...SK.Am, vel: 0.35, hideName: true, row: 0 });
    a.ch('Am', tA, tE, { ...SK.Am, vel: 0.7, row: 0 });
    a.tag('A', tA, tC, 'HOME', { color: GOLD, dr: -92 });
    a.ch('E', tE, tC, { ...SK.E, vel: 0.7, row: 1 });
    a.tag('E', tE, tC, 'FIVE', { color: TEAL, dr: -92 });
    skeleton(tC, S('why1').t1, 0.9, { row: true, vel: 0.6 });
    a.tag(0, tC, S('why1').t1, 'SKELETON: i – V', { x: 540, y: 462, color: GOLD });

    // ---- the original motif and four variations, each played after it is named ----
    const vScene = (id, bars, b, o = {}) => {
      const t0 = a.at(id) + (o.delay ?? 0.4);
      const r = play(bars, t0, b, { ...o, lastEnd: S(id).t1 - 0.05 });
      a.ch(o.pre ?? 'Am', S(id).t0 + 0.05, t0, { ...SK[o.pre ?? 'Am'], vel: 0.3, hideName: true, mute: true });
      walk(r.pts, S(id).t1, { label: o.label });
      return r;
    };
    vScene('motif', MOTIF, B, { delay: 0.6, label: 'MOTIF' });
    vScene('v1', RHYTHM, B, { delay: 0.5 });
    a.tag(0, a.w('v1', 'rhythm'), S('v1').t1, 'LONG – SHORT', { x: 540, y: 462, color: TEAL });
    vScene('v2', MOTIF, B, { oct: -12, delay: 0.4, voicing: { Am: { notes: ['A2', 'C3', 'E3'], bass: 'A1' }, E: { notes: ['G#2', 'B2', 'E3'], bass: 'E1' } } });
    a.tag(0, a.w('v2', 'register'), S('v2').t1, 'AN OCTAVE LOWER', { x: 540, y: 462, color: BLUE });
    vScene('v3', [...MOTIF, ...MOTIF], B / 2, { delay: 0.4, strikes: l => [{ o: 0, v: 1 }] });
    a.tag(0, a.w('v3', 'speed'), S('v3').t1, 'TWICE AS FAST', { x: 540, y: 462, color: PINK });
    a.scale(a.w('v4', 'major'), 'A', a.T.MAJOR);
    vScene('v4', MAJOR, B, { delay: a.w('v4', 'major') - a.at('v4') - 0.04, chords: ['A', 'E'] });
    a.tag('C#', a.w('v4', 'major'), S('v4').t1, 'C#', { color: GOLD, dr: -92 });
    a.ring(['C#'], a.w('v4', 'major'), S('v4').t1, { color: GOLD });

    // ---- v5: the bones - the motif again over a loud skeleton ----
    a.scale(S('v5').t0, 'A', a.T.MINOR);
    const b5 = play(MOTIF, a.at('v5') + 0.2, B, { chordVel: 0.75, row: true, lastEnd: S('v5').t1 - 0.05 });
    walk(b5.pts, S('v5').t1);
    a.tag('A', a.at('v5') + 0.2, S('v5').t1, 'i', { color: GOLD, dr: -92 });
    a.tag('E', a.at('v5') + 0.2 + 4 * B, S('v5').t1, 'V', { color: TEAL, dr: -92 });

    // ---- inversion: up becomes down, then slow and lush in D flat major ----
    const tUp = a.w('inv', 'up') - 0.3, tDown = a.w('inv', 'down') - 0.04;
    const o1 = play([MOTIF[0]], S('inv').t0 + 0.2, 0.26, { chords: ['Am'], hideName: false, lastEnd: tDown });
    walk(o1.pts, tDown, { color: GOLD, dr: -40, label: 'UP', labelDr: -46 });
    const i1 = play([INV1], tDown, 0.3, { chords: ['Dm'], voicing: { Dm: { notes: ['D3', 'F3', 'A3'], bass: 'D2' } }, lastEnd: a.at('inv2') });
    walk(i1.pts, a.at('inv2'), { color: PINK, dr: 34, label: 'DOWN', labelDr: 82 });
    a.arc('A', 'C', S('inv').t0 + 0.4, tDown, { steps: 3, color: GOLD, dr: -100 });
    a.arc('A', 'F', tDown, a.at('inv2'), { steps: -4, color: PINK, dr: 34 });
    const tDb = a.w('inv2', 'D') - 0.04;
    a.scale(tDb, 'Db', a.T.MAJOR);
    const d0 = tDb;
    a.ch('Dm', a.at('inv2'), d0, { notes: ['D3', 'F3', 'A3'], bass: 'D2', vel: 0.3 });
    const dv = play(DFLAT, d0, 0.42, { chords: ['Db', 'Ab'], voicing: { Db: { notes: ['F3', 'Ab3', 'Db4'], bass: 'Db2' }, Ab: { notes: ['Eb3', 'Ab3', 'C4'], bass: 'Ab2' } },
      strikes: l => [0, 1, 2, 3].map(k => ({ o: k * l / 4, v: k ? 0.4 : 1 })), chordVel: 0.6, vel: 0.42 });
    a.ch('Db', dv.end, S('inv').t1, { notes: ['F3', 'Ab3', 'Db4', 'F4'], bass: 'Db2', vel: 0.7 });
    a.note('Db5', dv.end, 1.0, { vel: 0.35 });
    walk(dv.pts, S('inv').t1, { color: PINK });
    a.tag('C#', tDb + 0.2, S('inv').t1, 'D♭', { color: GOLD, dr: -92 });
    a.tag(0, tDb, S('inv').t1, 'D FLAT MAJOR · SLOW', { x: 540, y: 462, color: GOLD });

    // ---- essence: theme, skeleton, home on A minor ----
    a.scale(S('essence').t0, 'A', a.T.MINOR);
    const e0 = S('essence').t0 + 0.15;
    const e1 = play(MOTIF, e0, B, { vel: 0.36 });
    const e2 = play(MAJOR, e1.end, B, { vel: 0.34, chords: ['A', 'E'] });
    const e3 = e2;
    walk([...e1.pts, ...e2.pts], e3.end);
    a.ch('Am', e3.end, S('essence').t1 - 0.3, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.8 });
    a.note('A4', e3.end, 2.4, { vel: 0.32 });
    a.tag('A', e3.end, S('essence').t1, 'HOME', { color: GOLD, dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
