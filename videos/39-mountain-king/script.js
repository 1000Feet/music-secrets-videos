// In the Hall of the Mountain King, decoded: one creeping tune, repeated faster and louder until it explodes.
// the theme (public domain), in eighth notes: four bars
const THEME = [['B3', 1], ['C#4', 1], ['D4', 1], ['E4', 1], ['F#4', 1], ['D4', 1], ['F#4', 2],
  ['F4', 1], ['C#4', 1], ['F4', 2], ['E4', 1], ['C4', 1], ['E4', 2],
  ['B3', 1], ['C#4', 1], ['D4', 1], ['E4', 1], ['F#4', 1], ['D4', 1], ['F#4', 1], ['B4', 1],
  ['A4', 1], ['F#4', 1], ['D4', 1], ['F#4', 1], ['A4', 4]];
const ROUNDS = [0.2, 0.15, 0.11]; // eighth-note length of each round in the play scene
const PLAY_LEN = ROUNDS.reduce((s, e) => s + 32 * e, 0);

module.exports = {
  slug: 'mountain-king',
  title: 'In the Hall of the Mountain King',
  segments: [
    { id: 'hook',    text: 'A little tune tiptoes in the dark... then comes back again and again, faster and louder, until it explodes.' },
    { id: 'what',    text: "This is In the Hall of the Mountain King, from Grieg's music for Peer Gynt, 1875." },
    { id: 'what2',   text: 'One tune, in B minor.' },
    { id: 'play',    text: 'Listen to what happens to it.' },
    { id: 'why1',    text: 'So why does it work? First, the tune creeps up the scale, step by step.' },
    { id: 'why2',    text: 'Then it sidesteps onto chromatic notes: E sharp, and C natural.' },
    { id: 'why2b',   text: 'Sneaky, comic menace. You can almost see the trolls tiptoeing.' },
    { id: 'why3',    text: "At the start, it's just pizzicato low strings and bassoons, on tiptoe." },
    { id: 'why3b',   text: 'By the end, the full orchestra is in chaos.' },
    { id: 'why4',    text: 'And nothing new is ever added. Just repetition, faster and louder.' },
    { id: 'why4b',   text: 'That alone builds unbearable tension.' },
    { id: 'essence', text: 'Same tune, faster and louder. Tension can be built from repetition alone.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EDVARD GRIEG · 1875', title: 'THE MOUNTAIN KING', accent: true, tonic: 11, min: 7.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'FROM PEER GYNT', title: 'MOUNTAIN KING', sub: 'Edvard Grieg · 1875 · in B minor', tonic: 11, gap: 0.4, tail: 0.6 },
    { id: 'play', segs: ['play'], label: 'THE THEME', title: 'AGAIN AND AGAIN', sub: 'faster · and louder', tonic: 11, tail: 0.2 + PLAY_LEN + 2.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'STEP BY STEP', tonic: 11, tail: 2.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE SIDESTEP', tonic: 11, gap: 0.4, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'THE ORCHESTRA', title: 'TIPTOE TO CHAOS', circle: false, tonic: 11, gap: 0.3, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'NOTHING NEW', title: 'JUST REPETITION', circle: false, tonic: 11, gap: 0.3, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SAME TUNE, LOUDER', accent: true, tonic: 11, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PURPLE = '#b48cff';
    const midi = n => a.T.midi(n);
    // play the theme (or part of it) from t0 with eighth length e; returns { end, pts }
    function theme(t0, e, o = {}) {
      const list = o.list || THEME, sh = o.shift ?? 0, v = o.vel ?? 0.36;
      let t = t0; const pts = [];
      for (const [n, b] of list) {
        a.note(midi(n) + sh, t, b * e * (o.legato ?? 0.55), { vel: v, show: o.show ?? true });
        if (o.dbl) a.note(midi(n) + sh + o.dbl, t, b * e * (o.legato ?? 0.55), { vel: v * 0.7, show: false });
        pts.push([t, n.replace(/\d/, '')]);
        t += b * e;
      }
      return { end: t, pts };
    }
    // a low B / F# drone under the tune, with optional drum hits on each quarter
    function drone(t0, t1, o = {}) {
      a.ch('Bm', t0, t1, { notes: o.notes || ['F#3', 'B3', 'D4'], bass: o.bass ?? 'B1', vel: o.vel ?? 0.35, hideName: o.hideName ?? false, label: 'Bm',
        strikes: o.strikes || null, shape: o.shape ?? true });
    }
    const drums = (t0, t1, q, v) => { for (let t = t0, i = 0; t < t1 - 0.02; t += q, i++) { a.perc('kick', t, v); if (i % 2) a.perc('snare', t, v * 0.7); a.perc('hat', t + q / 2, v * 0.4); } };
    const MIN = a.T.MINOR;

    // hook: B minor pops in, the tune tiptoes in low, then twice as fast and loud
    a.scale(0.2, 'B', MIN, { popIn: { t0: 0.3, step: 0.1 } });
    const h1 = theme(0.4, 0.17, { shift: -12, vel: 0.32, list: THEME.slice(0, 13) });
    a.walker(h1.pts, { t1: h1.end + 0.2, dr: -40, color: TEAL });
    drone(0.4, h1.end, { vel: 0.25 });
    // then it comes back faster and louder, round after round, and explodes on the word
    const tX = a.w('hook', 'explodes') - 0.03, span = tX - h1.end, es = [];
    for (let e = 0.15, sum = 0; sum + 16 * e <= span + 0.6 || !es.length; e *= 0.8) { es.push(e); sum += 16 * e; }
    const fit = span / es.reduce((s2, e) => s2 + 16 * e, 0);
    let th = h1.end;
    es.forEach((e0, i) => {
      const e = e0 * fit, r = theme(th, e, { vel: 0.36 + 0.05 * i, dbl: -12, list: THEME.slice(0, 13), legato: 0.7 });
      a.walker(r.pts, { t1: r.end, dr: -40, color: i ? RED : GOLD });
      drone(th, r.end, { notes: ['D3', 'F#3', 'B3'], vel: 0.45 + 0.15 * i });
      drums(th, r.end, 2 * e, 0.45 + 0.15 * i);
      th = r.end;
    });
    a.perc('kick', tX, 1); a.perc('snare', tX, 1);
    a.ch('Bm', tX, S('hook').t1, { notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B1', vel: 1.1 });
    a.ring(['B', 'D', 'F#'], tX, S('hook').t1, { color: RED });

    // what: the tune, slow and quiet, under the title
    const w1 = theme(S('what').t0 + 0.2, 0.2, { shift: -12, vel: 0.26 });
    drone(S('what').t0 + 0.2, S('what').t1, { vel: 0.2 });
    a.walker(w1.pts.filter(p => p[0] < S('what').t1), { t1: S('what').t1, dr: -40, color: TEAL });
    a.ring(['B'], a.w('what2', 'B'), S('what').t1, { color: GOLD });
    a.tag('B', a.w('what2', 'B'), S('what').t1, 'B MINOR', { color: GOLD, dr: -92 });

    // play: three rounds, each faster and louder, then the explosion
    let t = a.end('play') + 0.2;
    const NAMES = ['ROUND 1', 'ROUND 2 · FASTER', 'ROUND 3 · FASTER STILL'];
    ROUNDS.forEach((e, i) => {
      const r = theme(t, e, { shift: i === 0 ? -12 : 0, vel: 0.3 + 0.08 * i, dbl: i ? -12 : 0, legato: i === 2 ? 0.8 : 0.55 });
      a.walker(r.pts, { t1: r.end, dr: -40, color: [TEAL, GOLD, RED][i] });
      drone(t, r.end, { notes: i ? ['D3', 'F#3', 'B3'] : undefined, vel: 0.25 + 0.25 * i, strikes: i === 2 ? [0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ o: k * 8 * e, v: 0.6 })) : null });
      if (i) drums(t, r.end, 2 * e, 0.4 + 0.25 * i);
      a.tag(0, t, r.end, NAMES[i], { x: 540, y: 455, color: [TEAL, GOLD, RED][i] });
      t = r.end;
    });
    a.ch('Bm', t, S('play').t1 - 0.1, { notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B1', vel: 1.2, strikes: [{ o: 0, v: 1 }, { o: 0.25, v: 0.8 }, { o: 0.5, v: 1 }] });
    a.perc('kick', t, 1); a.perc('snare', t, 1); a.perc('kick', t + 0.25, 0.9); a.perc('kick', t + 0.5, 1); a.perc('snare', t + 0.5, 1);
    a.tag(0, t, S('play').t1, 'BOOM!', { x: 540, y: 455, color: RED });
    a.ring(['B', 'D', 'F#'], t, S('play').t1, { color: RED });

    // why1: creeping up the scale, step by step: B C# D E F#
    const s0 = a.w('why1', 'creeps') - 0.04;
    drone(S('why1').t0 + 0.1, S('why1').t1, { vel: 0.25 });
    const steps = ['B3', 'C#4', 'D4', 'E4', 'F#4'];
    const tStep = a.w('why1', 'step'), stepT = steps.map((n, i) => s0 + i * (tStep + 0.6 - s0) / 5);
    steps.forEach((n, i) => a.note(n, stepT[i], 0.35, { vel: 0.38 }));
    a.walker(steps.map((n, i) => [stepT[i], n.replace(/\d/, '')]), { t1: S('why1').t1, dr: -40, color: TEAL, label: 'CREEPING UP', labelDr: -50 });
    for (let i = 1; i < 5; i++) a.arc(steps[i - 1].replace(/\d/, ''), steps[i].replace(/\d/, ''), stepT[i], S('why1').t1, { steps: i === 2 ? 1 : 2, color: TEAL, dr: 30 });
    const r1 = theme(tStep + 0.8, 0.18, { list: THEME.slice(0, 7), vel: 0.3 });

    // why2: the chromatic sidestep, E# and C natural
    drone(S('why2').t0 + 0.1, S('why2').t1, { vel: 0.25 });
    const tEs = a.w('why2', 'E') - 0.04, tC = a.w('why2', 'C') - 0.04;
    a.note('F4', tEs, 0.5, { vel: 0.4 }); a.note('F#4', tEs + 0.5, 0.4, { vel: 0.3 });
    a.ring(['F'], tEs, S('why2').t1, { color: RED });
    a.tag('F', tEs, S('why2').t1, 'E#', { color: RED, dr: -75 });
    a.note('C4', tC, 0.5, { vel: 0.4 }); a.note('C#4', tC + 0.5, 0.4, { vel: 0.3 });
    a.ring(['C'], tC, S('why2').t1, { color: PURPLE });
    a.tag('C', tC, S('why2').t1, 'C NATURAL', { color: PURPLE, dr: -75 });
    a.tag(0, a.w('why2', 'chromatic'), S('why2').t1, 'OUTSIDE THE SCALE', { x: 540, y: 455, color: RED });
    // why2b: the tiptoeing tune, with its sidesteps
    const sn = a.at('why2b') + 0.2;
    const r2 = theme(sn, 0.17, { list: THEME.slice(0, 13), vel: 0.3, shift: -12, legato: 0.4 });
    a.walker(r2.pts, { t1: S('why2').t1, dr: -40, color: TEAL });

    // why3: pizzicato and bassoons on tiptoe, then the full orchestra in chaos
    const tEnd = a.w('why3b', 'end') - 0.04;
    const g3 = a.grid([{ label: 'START', sub: 'LOW STRINGS · BASSOONS', color: TEAL, size: 64, subSize: 26 }, { label: 'END', sub: 'FULL ORCHESTRA', color: RED, size: 64, subSize: 26 }],
      S('why3').t0 + 0.1, S('why3').t1, { rows: 1, cols: 2, cw: 440, chh: 260, y: 560, revealStep: 0.2 });
    g3.active.push({ t0: S('why3').t0 + 0.1, t1: tEnd, i: 0 }, { t0: tEnd, t1: S('why3').t1, i: 1 });
    const r3 = theme(S('why3').t0 + 0.2, 0.17, { list: THEME.slice(0, 13), vel: 0.26, shift: -12, legato: 0.35, show: false });
    a.big('ON TIPTOE', a.w('why3', 'tiptoe'), tEnd, { y: 960, size: 64, color: TEAL });
    const r3b = theme(tEnd, 0.11, { vel: 0.44, dbl: -12, legato: 0.85, show: false });
    drone(tEnd, S('why3').t1, { notes: ['B2', 'D3', 'F#3', 'B3'], vel: 0.9, strikes: [0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ o: k * 0.88, v: 0.7 })), shape: false });
    drums(tEnd, Math.min(r3b.end, S('why3').t1), 0.22, 0.8);
    a.big('CHAOS', a.w('why3b', 'chaos'), S('why3').t1, { y: 960, size: 110, color: RED });

    // why4: nothing new: repeat, faster, louder (the tune accelerates underneath)
    const cells = [{ label: 'REPEAT', color: TEAL, size: 46 }, { label: 'FASTER', color: GOLD, size: 46 }, { label: 'LOUDER', color: RED, size: 46 }];
    const g4 = a.grid(cells, S('why4').t0 + 0.1, S('why4').t1, { rows: 1, cols: 3, cw: 300, chh: 200, y: 580, revealStep: 0.15 });
    const tRep = a.w('why4', 'repetition') - 0.04, tFast = a.w('why4', 'faster') - 0.04, tLoud = a.w('why4', 'louder') - 0.04;
    g4.active.push({ t0: tRep, t1: S('why4').t1, i: 0 }, { t0: tFast, t1: S('why4').t1, i: 1 }, { t0: tLoud, t1: S('why4').t1, i: 2 });
    let u = S('why4').t0 + 0.2, e4 = 0.2, k4 = 0;
    while (u < S('why4').t1 - 0.6) {
      const r = theme(u, e4, { list: THEME.slice(0, 7), vel: 0.24 + 0.04 * k4, shift: k4 < 2 ? -12 : 0, dbl: k4 >= 2 ? -12 : 0, show: false });
      if (k4 >= 2) drums(u, r.end, 2 * e4, 0.3 + 0.08 * k4);
      u = r.end; e4 = Math.max(0.09, e4 * 0.86); k4++;
    }
    a.big('UNBEARABLE TENSION', a.w('why4b', 'unbearable'), S('why4').t1, { y: 940, size: 62, color: RED });

    // essence: once more, fast and loud, ending in the crash
    const e0 = S('essence').t0 + 0.15;
    const re = theme(e0, 0.12, { vel: 0.4, dbl: -12, legato: 0.8 });
    a.walker(re.pts, { t1: re.end, dr: -40, color: RED });
    drone(e0, re.end, { notes: ['D3', 'F#3', 'B3'], vel: 0.6 });
    drums(e0, re.end, 0.24, 0.7);
    a.ch('Bm', re.end, S('essence').t1 - 0.3, { notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B1', vel: 1.1 });
    a.perc('kick', re.end, 1); a.perc('snare', re.end, 1);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
