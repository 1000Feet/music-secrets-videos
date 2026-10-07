// The science of music chills: dopamine during the build-up (caudate) and at the peak (nucleus accumbens).
// Copyright: only our own generic build-and-peak example is played (generic chords, a crescendo to a climax).
module.exports = {
  slug: 'music-chills',
  title: 'The Science of Music Chills',
  segments: [
    { id: 'hook',    text: "That shiver when the music peaks? It's your brain handing out a reward." },
    { id: 'what',    text: 'Musical chills are called frisson. Many listeners get them, but not all.' },
    { id: 'study',   text: "In 2011, Valorie Salimpoor's team scanned listeners during music that gave them chills." },
    { id: 'study2',  text: 'The study appeared in Nature Neuroscience.' },
    { id: 'demo',    text: "Here's a build-up. Climbing... holding back..." },
    { id: 'demo2',   text: 'and the peak.' },
    { id: 'why1',    text: 'So why does it work? At the peak, the brain releases dopamine...' },
    { id: 'why1b',   text: 'the same reward chemical as food, in the nucleus accumbens.' },
    { id: 'why2',    text: 'But dopamine also flows before the peak, during anticipation, in the caudate.' },
    { id: 'why2b',   text: 'The build-up itself is a reward.' },
    { id: 'why3',    text: 'Common triggers: unexpected harmonies, sudden loudness changes...' },
    { id: 'why3b',   text: 'a new voice or instrument entering, and appoggiaturas.' },
    { id: 'why4',    text: 'Music plays with expectation: predict, delay, then deliver.' },
    { id: 'why4b',   text: 'and the brain rewards the waiting and the arrival.' },
    { id: 'essence', text: 'The build-up and the drop are both rewards. Your brain is paying you to listen.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE SCIENCE OF', title: 'MUSIC CHILLS', accent: true, circle: false, tonic: 2, lead: 1.1, tail: 1.0 },
    { id: 'what', segs: ['what'], label: 'MUSICAL CHILLS', title: 'FRISSON', circle: false, tonic: 2, tail: 0.8 },
    { id: 'study', segs: ['study', 'study2'], label: 'NATURE NEUROSCIENCE', title: 'THE 2011 STUDY', circle: false, tonic: 2, gap: 0.3, tail: 0.7 },
    { id: 'demo', segs: ['demo', 'demo2'], label: 'LISTEN', title: 'BUILD-UP + PEAK', circle: false, tonic: 2, gap: 3.2, tail: 3.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE PEAK', circle: false, tonic: 2, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE WAIT', circle: false, tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'THE TRIGGERS', circle: false, tonic: 0, gap: 0.8, tail: 1.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'EXPECTATION', circle: false, tonic: 2, gap: 0.4, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'PAID TO LISTEN', accent: true, circle: false, tonic: 2, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', ORANGE = '#ffa45c', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const mix = (c1, c2, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const x = p(c1), y = p(c2); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
    const SOFT = { partials: [1, 0.4, 0.15], attack: 0.04, release: 0.25 };

    // ---------- the meter (anticipation) and the peak card ----------
    const NM = 8;
    const METER = [...Array(NM)].map((_, i) => ({ label: '', color: mix(GOLD, BLUE, i / (NM - 1)) }));
    const meter = (t0, t1, o = {}) => a.grid(METER, t0, t1, { rows: NM, cols: 1, cw: 260, chh: 66, x: 300, y: o.y ?? 480, revealStep: o.reveal ?? 0.03 });
    const peakCard = (t0, t1, sub, o = {}) => a.grid([{ label: o.label ?? 'PEAK', sub, color: PINK, size: 72, subSize: 28 }], t0, t1, { rows: 1, cols: 1, cw: 400, chh: 528, x: 770, y: o.y ?? 480 });
    const fill = (g, t0, t1, keep) => { for (let k = 0; k < NM; k++) g.active.push({ t0: t0 + (k + 0.5) * (t1 - t0) / NM, t1: keep, i: NM - 1 - k }); };
    const labels = (t0, t1, sub1, sub2, o = {}) => {
      a.big('ANTICIPATION', t0, t1, { x: 300, y: 1060, size: 30, ...MONO, color: BLUE, blur: 0 });
      a.big('PEAK', t0, t1, { x: 770, y: 1060, size: 30, ...MONO, color: PINK, blur: 0 });
      if (sub1) a.big(sub1, o.s1 ?? t0, t1, { x: 300, y: 1110, size: 30, ...MONO, color: WHITE, blur: 10 });
      if (sub2) a.big(sub2, o.s2 ?? t0, t1, { x: 770, y: 1110, size: 30, ...MONO, color: WHITE, blur: 10 });
    };

    // ---------- music: an original build-up and peak in D ----------
    const BUILD = [['Bm', ['F#3', 'B3', 'D4'], 'B1'], ['G', ['G3', 'B3', 'D4'], 'G1'], ['D', ['F#3', 'A3', 'D4'], 'D2'], ['A', ['E3', 'A3', 'C#4'], 'A1']];
    const TOPS = ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5'];
    function build(t0, t1, o = {}) {
      const n = o.n ?? 8, len = (t1 - t0) / n;
      for (let i = 0; i < n; i++) {
        const t = t0 + i * len, k = i / Math.max(1, n - 1), v = (o.v0 ?? 0.22) + ((o.v1 ?? 0.75) - (o.v0 ?? 0.22)) * k;
        const per = i < n * 0.25 ? 1 : i < n * 0.5 ? 2 : i < n * 0.75 ? 4 : 8;
        const [c, notes, b] = BUILD[i % 4];
        a.ch(c, t, t + len, { notes, bass: b, vel: v, hideName: true, shape: false, strikes: [...Array(per)].map((_, j) => ({ o: j * len / per, v: j ? 0.6 : 1 })) });
        const top = TOPS[Math.min(TOPS.length - 1, Math.round(k * (TOPS.length - 1) * (o.climb ?? 1)))];
        a.note(top, t, len * 0.95, { vel: 0.12 + 0.14 * k, tone: SOFT });
        if (k > 0.45) for (let j = 0; j < per * 2; j++) a.perc('snare', t + j * len / (per * 2), 0.12 + 0.4 * k);
      }
      if (o.silence !== false) return t1;
      return t1;
    }
    function peak(t, t1, o = {}) {
      const v = o.vel ?? 1;
      a.perc('kick', t, 1.0 * v); a.perc('snare', t, 0.7 * v); a.perc('hat', t, 0.8 * v); a.perc('kick', t + 0.01, 0.5 * v);
      a.ch('D', t, Math.min(t1, t + (o.len ?? 2.4)), { notes: ['D3', 'A3', 'D4', 'F#4', 'A4', 'D5'], bass: 'D1', vel: 0.95 * v, hideName: true, shape: false });
      a.note('E5', t, 0.55, { vel: 0.3 * v, tone: SOFT }); a.note('D5', t + 0.55, 1.6, { vel: 0.26 * v, tone: SOFT });
      a.note('A5', t, 2.0, { vel: 0.16 * v, tone: SOFT });
      // afterglow: a calm groove on D - A - Bm - G
      const G = [['D', ['F#3', 'A3', 'D4'], 'D2'], ['A', ['E3', 'A3', 'C#4'], 'A1'], ['Bm', ['F#3', 'B3', 'D4'], 'B1'], ['G', ['G3', 'B3', 'D4'], 'G1']];
      const bl = o.bar ?? 1.6;
      for (let tt = t + (o.len ?? 2.4), k = 1; tt < t1 - 0.4; tt += bl, k++) {
        const [c, n, b] = G[k % 4];
        a.ch(c, tt, Math.min(tt + bl, t1 - 0.1), { notes: n, bass: b, vel: (o.after ?? 0.45) * v, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: bl / 2, v: 0.55 }] });
        a.perc('kick', tt, 0.4 * v); a.perc('hat', tt + bl / 2, 0.25 * v);
      }
    }

    // ---- hook: the whole build and peak from the first frames ----
    const h1 = S('hook').t1, tP = 1.2;
    const gH = meter(0.05, h1, { reveal: 0.02 });
    const pH = peakCard(0.05, h1);
    fill(gH, 0.1, tP, h1);
    build(0.1, tP, { n: 4, v0: 0.35, v1: 0.7, climb: 0.7 });
    pH.active.push({ t0: tP, t1: h1, i: 0 });
    peak(tP, h1, { len: 2.2 });
    a.big('CHILLS', tP, a.w('hook', 'reward') - 0.05, { x: 770, y: 880, size: 56, color: WHITE, blur: 24 });
    a.big('REWARD', a.w('hook', 'reward') - 0.05, h1, { x: 770, y: 880, size: 56, color: GOLD, blur: 24 });
    labels(0.1, h1);

    // ---- what: frisson, many listeners but not all ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.big('MUSICAL CHILLS', w0 + 0.15, w1, { y: 590, size: 70, color: WHITE, blur: 16 });
    a.big('FRISSON', a.w('what', 'frisson') - 0.1, w1, { y: 720, size: 120, color: GOLD, blur: 36 });
    a.big('MANY LISTENERS', a.w('what', 'Many') - 0.05, w1, { y: 880, size: 52, ...MONO, color: TEAL });
    a.big('BUT NOT ALL', a.w('what', 'not') - 0.05, w1, { y: 970, size: 52, ...MONO, color: GREY, blur: 0 });
    a.ch('Bm', w0 + 0.1, w0 + 2.4, { notes: ['F#3', 'B3', 'D4'], bass: 'B1', vel: 0.35, hideName: true, shape: false });
    a.ch('G', w0 + 2.4, w1 - 0.1, { notes: ['G3', 'B3', 'D4'], bass: 'G1', vel: 0.35, hideName: true, shape: false });
    // a shiver: soft high notes
    ['F#5', 'A5', 'D6', 'A5', 'B5', 'F#5'].forEach((n, i) => a.note(n, a.w('what', 'frisson') + i * 0.2, 0.5, { vel: 0.1, tone: SOFT, show: false }));

    // ---- study: Salimpoor 2011, Nature Neuroscience ----
    const s0 = S('study').t0, s1 = S('study').t1;
    a.big('2011', s0 + 0.2, s1, { y: 580, size: 150, color: GOLD, blur: 32 });
    a.big('VALORIE SALIMPOOR', a.w('study', 'Valorie') - 0.05, s1, { y: 730, size: 50, ...MONO, color: WHITE, blur: 8 });
    a.big('AND COLLEAGUES', a.w('study', 'team') - 0.05, s1, { y: 795, size: 32, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('BRAIN SCANS + CHILLS', a.w('study', 'scanned') - 0.05, s1, { y: 900, size: 44, ...MONO, color: TEAL });
    a.big('NATURE NEUROSCIENCE', a.w('study2', 'Nature') - 0.05, s1, { y: 1010, size: 44, ...MONO, color: PINK });
    const sl = (s1 - s0 - 0.2) / 4;
    [['D', ['F#3', 'A3', 'D4'], 'D2'], ['A', ['E3', 'A3', 'C#4'], 'A1'], ['Bm', ['F#3', 'B3', 'D4'], 'B1'], ['G', ['G3', 'B3', 'D4'], 'G1']].forEach(([c, n, b], i) =>
      a.ch(c, s0 + 0.1 + i * sl, s0 + 0.1 + (i + 1) * sl, { notes: n, bass: b, vel: 0.3, hideName: true, shape: false }));

    // ---- demo: a full build-up, a breath, and the peak ----
    const d0 = S('demo').t0, d1 = S('demo').t1, tPk = a.w('demo2', 'peak') - 0.03;
    const gD = meter(d0 + 0.05, d1);
    peakCard(d0 + 0.05, d1).active.push({ t0: tPk, t1: d1, i: 0 });
    labels(d0 + 0.05, d1);
    const tB = d0 + 0.15, tHold = tPk - 0.5;
    fill(gD, tB, tHold, d1);
    build(tB, tHold, { n: 8 });
    a.big('HOLDING BACK...', a.w('demo', 'holding') - 0.05, tPk, { x: 770, y: 880, size: 32, ...MONO, color: GREY, blur: 0 });
    peak(tPk, d1, { len: 2.4 });
    a.big('PEAK!', tPk, d1, { x: 770, y: 880, size: 90, color: WHITE, blur: 30 });

    // ---- why1: dopamine at the peak, nucleus accumbens ----
    const y10 = S('why1').t0, y11 = S('why1').t1;
    const gY1 = meter(y10 + 0.05, y11);
    const tPk1 = a.w('why1', 'peak') - 0.05;
    fill(gY1, y10 + 0.1, tPk1, y11);
    peakCard(y10 + 0.05, y11, 'NUCLEUS ACCUMBENS').active.push({ t0: tPk1, t1: y11, i: 0 });
    labels(y10 + 0.05, y11);
    build(y10 + 0.1, tPk1, { n: 4, v0: 0.2, v1: 0.45 });
    peak(tPk1, y11, { vel: 0.6, after: 0.5 });
    a.big('DOPAMINE', a.w('why1', 'dopamine') - 0.05, y11, { x: 770, y: 880, size: 54, color: GOLD, blur: 24 });
    a.big('LIKE FOOD', a.w('why1b', 'food') - 0.05, y11, { x: 770, y: 950, size: 32, ...MONO, color: WHITE, blur: 0 });

    // ---- why2: dopamine before the peak, in the caudate ----
    const y20 = S('why2').t0, y21 = S('why2').t1;
    const gY2 = meter(y20 + 0.05, y21);
    peakCard(y20 + 0.05, y21, 'NO PEAK YET', { label: 'WAIT...' });
    labels(y20 + 0.05, y21, 'CAUDATE', null, { s1: a.w('why2', 'caudate') - 0.05 });
    const tAn = a.w('why2', 'anticipation') - 0.05, tBR = a.w('why2b', 'reward') - 0.05;
    for (let k = 0; k < NM; k++) gY2.active.push({ t0: y20 + 0.3 + k * (tAn - y20 - 0.3) / NM, t1: y21, i: NM - 1 - k });
    build(y20 + 0.1, tBR, { n: 8, v0: 0.18, v1: 0.5, climb: 0.8 });
    a.big('DOPAMINE', tAn, y21, { x: 300, y: 380 + 70, size: 40, color: GOLD, blur: 20 });
    a.big('ALREADY', tBR - 0.3, y21, { x: 770, y: 880, size: 50, color: GOLD, blur: 20 });
    a.big('REWARDING', tBR - 0.3, y21, { x: 770, y: 950, size: 44, color: GOLD, blur: 20 });
    a.ch('A', tBR, y21 - 0.1, { notes: ['E3', 'A3', 'C#4', 'E4'], bass: 'A1', vel: 0.5, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: 0.4, v: 0.5 }, { o: 0.8, v: 0.5 }] });

    // ---- why3: the triggers, each one heard ----
    const z0 = S('why3').t0, z1 = S('why3').t1;
    const TRIG = [['UNEXPECTED', 'HARMONY', TEAL, 'unexpected'], ['SUDDEN', 'LOUDNESS', PINK, 'sudden'], ['A NEW', 'VOICE', GOLD, 'new'], ['APPOGGIATURA', 'LEAN, THEN FALL', BLUE, 'appoggiaturas']];
    const gT = a.grid(TRIG.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 42, subSize: 28 })), z0 + 0.05, z1, { rows: 2, cols: 2, cw: 440, chh: 280, y: 480, revealStep: 0.08 });
    const tt = TRIG.map(([, , , w], i) => a.w(i < 2 ? 'why3' : 'why3b', w) - 0.08);
    tt.forEach((t, i) => gT.active.push({ t0: t, t1: i < 3 ? tt[i + 1] : z1, i }));
    // 1: C, then an unexpected Ab major
    a.ch('C', z0 + 0.1, tt[0], { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.35, hideName: true, shape: false });
    a.ch('C', tt[0], tt[0] + 0.7, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.45, hideName: true, shape: false });
    a.ch('Ab', tt[0] + 0.7, tt[1], { notes: ['Eb3', 'Ab3', 'C4'], bass: 'Ab1', vel: 0.6, hideName: true, shape: false });
    // 2: soft, then suddenly loud
    a.ch('F', tt[1], tt[1] + 0.8, { notes: ['F3', 'A3', 'C4'], bass: 'F2', vel: 0.15, hideName: true, shape: false });
    a.ch('F', tt[1] + 0.8, tt[2], { notes: ['F3', 'A3', 'C4', 'F4', 'A4'], bass: 'F1', vel: 1.0, hideName: true, shape: false });
    a.perc('kick', tt[1] + 0.8, 0.9); a.perc('snare', tt[1] + 0.8, 0.6);
    // 3: a new voice enters over a held chord
    a.ch('Am', tt[2], tt[3], { notes: ['E3', 'A3', 'C4'], bass: 'A1', vel: 0.35, hideName: true, shape: false });
    ['E5', 'D5', 'C5', 'B4'].forEach((n, i) => a.note(n, tt[2] + 0.25 + i * 0.45, 0.42, { vel: 0.24, tone: SOFT }));
    // 4: an appoggiatura, D falling to C over C
    a.ch('C', tt[3], z1 - 0.1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.4, hideName: true, shape: false });
    a.note('D5', tt[3], 0.8, { vel: 0.3, tone: SOFT }); a.note('C5', tt[3] + 0.8, z1 - tt[3] - 1.0, { vel: 0.26, tone: SOFT });

    // ---- why4: predict, delay, deliver; then both rewarded ----
    const x0 = S('why4').t0, x1 = S('why4').t1;
    const PDD = [['PREDICT', 'predict', BLUE], ['DELAY', 'delay', ORANGE], ['DELIVER', 'deliver', PINK]];
    const tq = PDD.map(([, w]) => a.w('why4', w) - 0.05);
    const tWait = a.w('why4b', 'waiting') - 0.05, tArr = a.w('why4b', 'arrival') - 0.05;
    const gP = a.grid(PDD.map(([l, , c]) => ({ label: l, color: c, size: 48 })), x0 + 0.05, x1, { rows: 1, cols: 3, cw: 320, chh: 200, y: 480 });
    tq.forEach((t, i) => gP.active.push({ t0: t, t1: i < 2 ? tq[i + 1] : a.at('why4b'), i }));
    const gR = a.grid([{ label: 'THE WAITING', sub: 'REWARDED', color: BLUE, size: 46 }, { label: 'THE ARRIVAL', sub: 'REWARDED', color: PINK, size: 46 }],
      a.at('why4b') - 0.2, x1, { rows: 1, cols: 2, cw: 470, chh: 260, y: 760 });
    gR.active.push({ t0: tWait, t1: x1, i: 0 }, { t0: tArr, t1: x1, i: 1 });
    a.ch('Em', x0 + 0.1, tq[0], { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.3, hideName: true, shape: false });
    a.ch('A7', tq[0], tq[1], { notes: ['E3', 'G3', 'C#4'], bass: 'A1', vel: 0.45, hideName: true, shape: false });
    a.ch('Asus4', tq[1], tq[2], { notes: ['E3', 'A3', 'D4'], bass: 'A1', vel: 0.45, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: 0.4, v: 0.4 }, { o: 0.8, v: 0.5 }] });
    a.ch('D', tq[2], tWait, { notes: ['F#3', 'A3', 'D4', 'F#4'], bass: 'D2', vel: 0.75, hideName: true, shape: false });
    a.perc('kick', tq[2], 0.7);
    a.ch('G', tWait, tArr, { notes: ['G3', 'B3', 'D4'], bass: 'G1', vel: 0.4, hideName: true, shape: false });
    a.ch('D', tArr, x1 - 0.1, { notes: ['F#3', 'A3', 'D4', 'A4'], bass: 'D2', vel: 0.55, hideName: true, shape: false });

    // ---- essence: build and peak once more, both lit ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tDrop = a.w('essence', 'drop') - 0.03;
    const gE = meter(e0 + 0.05, e1);
    peakCard(e0 + 0.05, e1, 'NUCLEUS ACCUMBENS').active.push({ t0: tDrop, t1: e1, i: 0 });
    labels(e0 + 0.05, e1, 'CAUDATE');
    fill(gE, e0 + 0.1, tDrop, e1);
    build(e0 + 0.1, tDrop, { n: 4, v0: 0.3, v1: 0.65, climb: 0.8 });
    peak(tDrop, e1, { len: 2.6, vel: 0.85 });
    a.big('BOTH REWARDS', a.w('essence', 'both') - 0.05, e1, { x: 770, y: 880, size: 40, ...MONO, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
