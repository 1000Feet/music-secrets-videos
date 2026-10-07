// The Mozart effect: what the 1993 study found, what the media made of it, and what later research says.
// Copyright/brief: Mozart's K. 448 is NOT reconstructed. Every bar heard is our own bright D major texture
// (Alberti bass, broken chords, scale runs), plus one generic pop groove.
const BT = 0.42, BAR = 4 * BT, E8 = BT / 2, S16 = BT / 4;

module.exports = {
  slug: 'mozart-effect',
  title: 'The Mozart Effect',
  segments: [
    { id: 'hook',    text: "Does Mozart make you smarter? Here's what the science actually found." },
    { id: 'what',    text: 'In 1993, Rauscher, Shaw and Ky published a short paper in Nature.' },
    { id: 'what2',   text: "College students heard Mozart's Sonata for Two Pianos, K 448." },
    { id: 'what3',   text: 'Then they scored slightly higher on a spatial reasoning task.' },
    { id: 'media',   text: 'The media spun it: Mozart makes babies smarter.' },
    { id: 'ga',      text: "In 1998, Georgia's governor Zell Miller..." },
    { id: 'ga2',     text: 'proposed a classical music CD for every newborn in the state.' },
    { id: 'why1',    text: "So what's the truth? The effect was small, and lasted only about 10 to 15 minutes." },
    { id: 'why2',    text: 'It was never about babies or general intelligence: adults, one kind of task.' },
    { id: 'why3',    text: 'Reviews of many later studies found little or no special Mozart effect.' },
    { id: 'why3b',   text: 'Any short boost is better explained by mood and arousal...' },
    { id: 'why3c',   text: 'and any enjoyable, energising music can do it.' },
    { id: 'why4',    text: 'Actually learning to play music is a different question.' },
    { id: 'essence', text: "Mozart won't make you a genius. But music that lifts your mood can lift your focus, for a while." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MYTH OR FACT?', title: 'THE MOZART EFFECT', accent: true, circle: false, tonic: 2, lead: 0.4, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'NATURE · 1993', title: 'THE STUDY', circle: false, tonic: 2, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'THE MUSIC', title: 'Sonata for Two Pianos', sub: 'W. A. Mozart · K. 448 · in D', tonic: 2, tail: 2.4 },
    { id: 'what3', segs: ['what3'], label: 'THE RESULT', title: 'SLIGHTLY HIGHER', circle: false, tonic: 2, tail: 1.0 },
    { id: 'media', segs: ['media'], label: 'THE HEADLINES', title: 'THE MYTH IS BORN', circle: false, tonic: 2, tail: 1.0 },
    { id: 'ga', segs: ['ga', 'ga2'], label: 'GEORGIA · 1998', title: 'A CD FOR EVERY BABY', circle: false, tonic: 2, gap: 0.2, tail: 1.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SMALL AND SHORT', circle: false, tonic: 2, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'MYTH VS FACT', title: 'WHO WAS TESTED?', circle: false, tonic: 2, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b', 'why3c'], label: 'LATER RESEARCH', title: 'MOOD + AROUSAL', circle: false, tonic: 2, gap: 0.3, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'ANOTHER QUESTION', title: 'PLAYING ≠ LISTENING', circle: false, tonic: 0, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'MOOD, THEN FOCUS', accent: true, tonic: 2, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const T = a.T;
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', RED = '#ff5d6c', WHITE = '#ffffff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };

    // ---------- our own bright D major texture ----------
    // per chord: [name, LH alberti (low, high, mid), RH broken chord notes, bass]
    const V = {
      D: ['D', ['D3', 'A3', 'F#3'], ['A4', 'D5', 'F#5'], 'D2'],
      G: ['G', ['B2', 'G3', 'D3'], ['B4', 'D5', 'G5'], 'G2'],
      A7: ['A7', ['C#3', 'G3', 'E3'], ['A4', 'C#5', 'E5'], 'A1'],
      Bm: ['Bm', ['B2', 'F#3', 'D3'], ['B4', 'D5', 'F#5'], 'B1'],
      Em: ['Em', ['B2', 'G3', 'E3'], ['B4', 'E5', 'G5'], 'E2'],
    };
    // one bar: Alberti bass in eighths, RH broken chord up in sixteenths then a held chord tone
    function bar(c, t, o = {}) {
      const [, lh, rh] = V[c], v = o.vel ?? 1;
      [0, 1, 2, 1, 0, 1, 2, 1].forEach((k, j) => a.note(lh[k], t + j * E8, E8 * 0.9, { vel: 0.16 * v, show: false }));
      if (o.rh !== false) {
        const up = [rh[0], rh[1], rh[2], T.midi(rh[0]) + 12];
        up.forEach((n, j) => a.note(n, t + j * S16, S16 * 0.9, { vel: 0.2 * v, show: o.show ?? false }));
        a.note(T.midi(rh[0]) + 12, t + BT, BT * 0.9, { vel: 0.18 * v, show: false });
        a.note(rh[2], t + 2 * BT, BT * 0.9, { vel: 0.17 * v, show: false });
        a.note(rh[1], t + 3 * BT, BT * 0.9, { vel: 0.16 * v, show: false });
      }
    }
    const PROG = ['D', 'G', 'A7', 'D'];
    function texture(t0, t1, o = {}) {
      const prog = o.prog || PROG;
      let t = t0, k = 0;
      for (; t + BAR <= t1 + 0.05; t += BAR, k++) bar(prog[k % prog.length], t, o);
      if (o.ring !== false && t1 - t > 0.4) { a.note('D3', t, t1 - t - 0.1, { vel: 0.14, show: false }); a.note('F#4', t, t1 - t - 0.1, { vel: 0.12, show: false }); }
      return t;
    }
    // a held final D major chord
    const tonicChord = (t0, t1, v = 0.55) => a.ch('D', t0, t1, { notes: ['F#3', 'A3', 'D4', 'F#4', 'A4'], bass: 'D2', vel: v, hideName: true, shape: false });

    const cards = (t0, t1, o = {}) => a.grid([
      { label: 'MYTH', sub: o.mythSub, color: RED, size: 72, subSize: 26 },
      { label: 'FACT', sub: o.factSub, color: GREEN, size: 72, subSize: 26 },
    ], t0, t1, { rows: 1, cols: 2, cw: 440, chh: o.chh ?? 300, y: o.y ?? 500, revealStep: o.reveal });

    // ---- hook: MYTH / FACT, with the texture from the first frame ----
    const h1 = S('hook').t1;
    const gH = cards(0.05, h1, { reveal: 0.1 });
    a.big('MOZART = SMARTER?', 0.15, h1, { y: 900, size: 64, color: GOLD, blur: 24 });
    for (let t = 0.3, i = 0; t < h1 - 0.3; t += BAR / 2, i++) gH.active.push({ t0: t, t1: t + BAR / 2, i: i % 2 });
    texture(0.2, h1, { vel: 1.05 });

    // ---- what: the 1993 paper ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.big('1993', w0 + 0.15, w1, { y: 600, size: 160, color: GOLD, blur: 32 });
    a.big('RAUSCHER · SHAW · KY', a.w('what', 'Rauscher') - 0.05, w1, { y: 780, size: 48, ...MONO, color: WHITE, blur: 8 });
    a.big('A SHORT PAPER IN NATURE', a.w('what', 'short') - 0.05, w1, { y: 880, size: 40, ...MONO, color: TEAL, blur: 0 });
    texture(w0 + 0.05, w1, { vel: 0.7, prog: ['D', 'Bm', 'G', 'A7'] });

    // ---- what2: the music (our own texture, chords on the circle) ----
    const m0 = S('what2').t0, m1 = S('what2').t1;
    a.scale(m0, 'D', a.T.MAJOR);
    const mb = (m1 - m0 - 0.1) / 4;
    PROG.forEach((c, i) => {
      const t = m0 + 0.05 + i * mb;
      a.ch(c, t, t + mb, { notes: c === 'A7' ? ['C#4', 'E4', 'G4', 'A4'] : c === 'G' ? ['B3', 'D4', 'G4'] : ['A3', 'D4', 'F#4'], bass: V[c][3], vel: 0.32, strikes: [{ o: 0, v: 1 }, { o: mb / 2, v: 0.5 }] });
      const [, , rh] = V[c];
      const run = [rh[0], rh[1], rh[2], T.midi(rh[0]) + 12, rh[2], rh[1]];
      run.forEach((n, j) => a.note(n, t + 0.1 + j * S16 * 1.4, S16 * 1.3, { vel: 0.16 }));
    });
    a.big('COLLEGE STUDENTS', a.w('what2', 'College') - 0.05, a.w('what2', 'Sonata') - 0.05, { y: 462, size: 40, ...MONO, color: TEAL });
    a.big('TWO PIANOS', a.w('what2', 'Sonata') - 0.05, m1, { y: 462, size: 40, ...MONO, color: GOLD });

    // ---- what3: slightly higher on a spatial reasoning task ----
    const r0 = S('what3').t0, r1 = S('what3').t1;
    const NB = 10;
    const bars = (lit, col) => [...Array(NB)].map((_, i) => ({ label: '', color: i < lit ? col : '#3a3a42' }));
    const gB = a.grid(bars(6, BLUE), r0 + 0.05, r1, { rows: 1, cols: NB, cw: 80, chh: 110, y: 520, caption: 'WITHOUT MOZART' });
    const tHi = a.w('what3', 'slightly') - 0.05;
    const gA = a.grid(bars(7, GOLD), tHi - 0.2, r1, { rows: 1, cols: NB, cw: 80, chh: 110, y: 760, caption: 'AFTER MOZART' });
    for (let i = 0; i < 6; i++) gB.active.push({ t0: r0 + 0.3 + i * 0.12, t1: r1, i });
    for (let i = 0; i < 7; i++) gA.active.push({ t0: tHi + i * 0.12, t1: r1, i });
    a.big('SLIGHTLY HIGHER', tHi + 0.8, r1, { y: 1010, size: 52, ...MONO, color: GOLD });
    a.big('ONE SPATIAL REASONING TASK', a.w('what3', 'spatial') - 0.05, r1, { y: 1090, size: 32, ...MONO, color: '#c9c9d2', blur: 0 });
    texture(r0 + 0.05, r1, { vel: 0.6, prog: ['G', 'A7', 'D', 'D'] });

    // ---- media: the headline ----
    const n0 = S('media').t0, n1 = S('media').t1;
    a.big('THE MEDIA', n0 + 0.15, n1, { y: 560, size: 44, ...MONO, color: GREY, blur: 0 });
    a.big('“MOZART MAKES', a.w('media', 'Mozart') - 0.1, n1, { y: 700, size: 80, color: WHITE, blur: 18 });
    a.big('BABIES SMARTER”', a.w('media', 'babies') - 0.1, n1, { y: 800, size: 80, color: WHITE, blur: 18 });
    a.big('HEADLINE', a.w('media', 'babies') + 0.3, n1, { y: 950, size: 40, ...MONO, color: RED });
    for (let t = n0 + 0.05; t < n1 - 0.2; t += BAR) bar(t - n0 < BAR ? 'D' : 'A7', t, { vel: 0.6 });
    a.perc('kick', a.w('media', 'babies') - 0.05, 0.5);

    // ---- ga: Georgia 1998, a classical CD for every newborn ----
    const g0 = S('ga').t0, g1 = S('ga').t1;
    a.big('1998', g0 + 0.15, g1, { y: 590, size: 140, color: GOLD, blur: 30 });
    a.big('GOVERNOR ZELL MILLER', a.w('ga', 'Zell') - 0.05, g1, { y: 740, size: 46, ...MONO, color: WHITE, blur: 8 });
    a.big('PROPOSED', a.w('ga2', 'proposed') - 0.05, g1, { y: 840, size: 32, ...MONO, color: GREY, blur: 0 });
    a.big('A CLASSICAL CD', a.w('ga2', 'classical') - 0.05, g1, { y: 920, size: 60, color: TEAL, blur: 18 });
    a.big('FOR EVERY NEWBORN', a.w('ga2', 'newborn') - 0.1, g1, { y: 1010, size: 52, color: TEAL, blur: 18 });
    texture(g0 + 0.05, g1, { vel: 0.65, prog: ['D', 'G', 'Em', 'A7'] });

    // ---- why1: a small bump that fades after 10 to 15 minutes ----
    const y10 = S('why1').t0, y11 = S('why1').t1;
    const MIN = [...Array(16)].map((_, i) => ({ label: i % 5 === 0 ? String(i) : '', color: i <= 12 ? GOLD : '#4a4a52', size: 26 }));
    const gT = a.grid(MIN, y10 + 0.05, y11, { rows: 1, cols: 16, cw: 58, chh: 90, y: 760, caption: 'MINUTES AFTER LISTENING' });
    const BOOST = [...Array(NB)].map((_, i) => ({ label: '', color: i < 6 ? BLUE : i === 6 ? GOLD : '#3a3a42' }));
    const gK = a.grid(BOOST, y10 + 0.05, y11, { rows: 1, cols: NB, cw: 80, chh: 110, y: 520, caption: 'SCORE' });
    const tSm = a.w('why1', 'small') - 0.05, tLast = a.w('why1', 'lasted') - 0.05, tMin = a.w('why1', 'minutes') - 0.05;
    for (let i = 0; i < 6; i++) gK.active.push({ t0: y10 + 0.2, t1: y11, i });
    gK.active.push({ t0: tSm, t1: tMin + 0.4, i: 6 });
    for (let i = 0; i <= 15; i++) gT.active.push({ t0: tLast + i * (tMin + 0.4 - tLast) / 16, t1: tLast + (i + 1) * (tMin + 0.4 - tLast) / 16, i });
    a.big('SMALL', tSm, tLast, { y: 1010, size: 64, color: GOLD, blur: 20 });
    a.big('≈ 10 – 15 MINUTES', tLast, y11, { y: 1010, size: 56, ...MONO, color: GOLD });
    a.big('THEN GONE', tMin + 0.4, y11, { y: 1090, size: 40, ...MONO, color: GREY, blur: 0 });
    texture(y10 + 0.05, tMin + 0.4, { vel: 0.55 });
    a.ch('Bm', tMin + 0.4, y11 - 0.1, { notes: ['F#3', 'B3', 'D4'], bass: 'B1', vel: 0.3, hideName: true, shape: false });

    // ---- why2: myth vs fact ----
    const x0 = S('why2').t0, x1 = S('why2').t1;
    const gM = a.grid([
      { label: 'BABIES', sub: 'MYTH', color: RED, size: 54 }, { label: 'ADULTS', sub: 'FACT', color: GREEN, size: 54 },
      { label: 'GENERAL IQ', sub: 'MYTH', color: RED, size: 48 }, { label: 'ONE TASK', sub: 'FACT', color: GREEN, size: 48 },
    ], x0 + 0.05, x1, { rows: 2, cols: 2, cw: 440, chh: 220, y: 500, revealStep: 0.08 });
    const tBa = a.w('why2', 'babies') - 0.05, tGI = a.w('why2', 'general') - 0.05, tAd = a.w('why2', 'adults') - 0.05, tTa = a.w('why2', 'task') - 0.05;
    gM.active.push({ t0: tBa, t1: tGI, i: 0 }, { t0: tGI, t1: tAd, i: 2 }, { t0: tAd, t1: x1, i: 1 }, { t0: tTa - 0.4, t1: x1, i: 3 });
    a.big('NEVER ABOUT', a.w('why2', 'never') - 0.05, tAd, { y: 1010, size: 48, ...MONO, color: RED });
    a.big('WHAT WAS TESTED', tAd, x1, { y: 1010, size: 48, ...MONO, color: GREEN });
    texture(x0 + 0.05, x1, { vel: 0.5, prog: ['Bm', 'Em', 'A7', 'D'] });

    // ---- why3: no special effect; mood and arousal; any enjoyable music ----
    const z0 = S('why3').t0, z1 = S('why3').t1;
    const tSp = a.w('why3', 'special') - 0.05, tMo = a.w('why3b', 'mood') - 0.05, tAny = a.at('why3c') - 0.05;
    const gC = a.grid([{ label: 'MOZART', sub: 'SPECIAL?', color: GOLD, size: 56 }, { label: 'ANY MUSIC', sub: 'YOU ENJOY', color: PINK, size: 52 }],
      z0 + 0.05, z1, { rows: 1, cols: 2, cw: 440, chh: 220, y: 480 });
    const gMo = a.grid([{ label: 'MOOD', color: TEAL, size: 60 }, { label: 'AROUSAL', color: BLUE, size: 56 }],
      tMo - 0.1, z1, { rows: 1, cols: 2, cw: 440, chh: 160, y: 740 });
    gC.active.push({ t0: z0 + 0.2, t1: tSp, i: 0 }, { t0: a.w('why3c', 'energising') - 0.05, t1: z1, i: 1 }, { t0: a.w('why3c', 'energising') - 0.05, t1: z1, i: 0 });
    gMo.active.push({ t0: tMo, t1: z1, i: 0 }, { t0: a.w('why3b', 'arousal') - 0.05, t1: z1, i: 1 });
    a.big('LITTLE OR NO SPECIAL EFFECT', tSp, tMo, { y: 1010, size: 38, ...MONO, color: RED });
    a.big('SAME SHORT BOOST', a.w('why3c', 'energising') - 0.05, z1, { y: 1010, size: 46, ...MONO, color: GOLD });
    texture(z0 + 0.05, tAny, { vel: 0.5 });
    // "any enjoyable, energising music": an original upbeat pop groove
    const PG = [['G', ['G3', 'B3', 'D4'], 'G1'], ['D', ['F#3', 'A3', 'D4'], 'D2'], ['A', ['E3', 'A3', 'C#4'], 'A1'], ['Bm', ['F#3', 'B3', 'D4'], 'B1']];
    const PB = 0.4;
    for (let t = tAny, k = 0; t < z1 - 0.4; t += 4 * PB, k++) {
      const [c, n, b] = PG[k % 4];
      a.ch(c, t, Math.min(t + 4 * PB, z1 - 0.1), { notes: n, bass: b, vel: 0.45, hideName: true, shape: false, strikes: [0, 1.5, 2, 3].map((x, j) => ({ o: x * PB, v: j ? 0.6 : 1 })) });
      for (let i = 0; i < 4; i++) { const tb = t + i * PB; if (tb > z1 - 0.2) break; a.perc(i % 2 ? 'snare' : 'kick', tb, 0.6); a.perc('hat', tb + PB / 2, 0.3); }
    }

    // ---- why4: playing is a different question ----
    const p0 = S('why4').t0, p1 = S('why4').t1;
    const gL = a.grid([{ label: 'LISTENING', sub: 'PASSIVE', color: BLUE, size: 50 }, { label: '≠', color: GREY, size: 90 }, { label: 'PLAYING', sub: 'LEARNING', color: GOLD, size: 50 }],
      p0 + 0.05, p1, { rows: 1, cols: 3, cw: 320, chh: 260, y: 520 });
    const tLe = a.w('why4', 'learning') - 0.05, tDi = a.w('why4', 'different') - 0.05;
    gL.active.push({ t0: p0 + 0.2, t1: tLe, i: 0 }, { t0: tLe, t1: p1, i: 2 }, { t0: tDi, t1: p1, i: 1 });
    a.big('A DIFFERENT QUESTION', tDi, p1, { y: 1000, size: 46, ...MONO, color: GOLD });
    // a learner's slow C major scale, up and down
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'].forEach((n, i) => {
      const t = tLe + i * 0.3; if (t < p1 - 0.3) a.note(n, t, 0.28, { vel: 0.24 });
    });
    a.ch('C', p0 + 0.1, tLe, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.3, hideName: true, shape: false });

    // ---- essence: the texture on the circle, ending on D ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'D', a.T.MAJOR);
    const tMood = a.w('essence', 'mood') - 0.05, tFoc = a.w('essence', 'focus') - 0.05, tWh = a.w('essence', 'while') - 0.05;
    a.ch('Bm', e0 + 0.1, tMood, { notes: ['F#3', 'B3', 'D4'], bass: 'B1', vel: 0.35 });
    a.big('NO GENIUS', a.w('essence', 'genius') - 0.05, tMood, { y: 462, size: 44, ...MONO, color: RED });
    a.ch('G', tMood, tFoc, { notes: ['G3', 'B3', 'D4'], bass: 'G2', vel: 0.45 });
    a.big('LIFTS MOOD', tMood, e1, { x: 320, y: 462, size: 40, ...MONO, color: TEAL });
    a.ch('A7', tFoc, tWh, { notes: ['G3', 'C#4', 'E4', 'A4'], bass: 'A1', vel: 0.5 });
    a.big('LIFTS FOCUS', tFoc, e1, { x: 760, y: 462, size: 40, ...MONO, color: GOLD });
    a.ch('D', tWh, e1 - 0.3, { notes: ['F#3', 'A3', 'D4', 'F#4', 'A4'], bass: 'D2', vel: 0.6 });
    a.tag('D', tWh + 0.2, e1, 'FOR A WHILE', { color: GOLD, dr: -92 });
    texture(tMood, tWh, { vel: 0.55, rh: false });
    ['A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'A5'].forEach((n, i) => a.note(n, tWh + i * S16, S16 * 0.9, { vel: 0.2 }));
    a.note('D6', tWh + 7 * S16, 1.6, { vel: 0.2, show: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
