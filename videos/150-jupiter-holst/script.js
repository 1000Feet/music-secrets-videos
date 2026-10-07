// Jupiter, from Holst's The Planets: a festive dance with a hymn hidden inside.
// Brief/copyright: Holst's melody (Thaxted) is NOT reconstructed. We play our own fast syncopated
// E flat major chords for the "jollity" and our own broad, hymn-like melody in E flat major
// (stepwise, wide range, a few leaps). Mars is shown only as an even 5/4 count (no Holst rhythm).
const Q = 0.3, JBAR = 4 * Q;   // fast, festive
const HB = 0.55;               // slow hymn beat
const JOLLY = { Eb: [['G4', 'Bb4', 'Eb5'], 'Eb2'], Ab: [['Ab4', 'C5', 'Eb5'], 'Ab2'], Bb: [['F4', 'Bb4', 'D5'], 'Bb2'] };
const HCH = { Eb: [['Eb3', 'G3', 'Bb3'], 'Eb2'], Ab: [['Eb3', 'Ab3', 'C4'], 'Ab2'], Bb: [['D3', 'F3', 'Bb3'], 'Bb2'], Fm: [['C3', 'F3', 'Ab3'], 'F2'], Bb7: [['D3', 'F3', 'Ab3'], 'Bb2'] };
// our own hymn: bars of [melody [[note, beats]...], chords [[name, beats]...]]
const HYMN = [
  [[['Eb4', 2], ['F4', 1], ['G4', 1]], [['Eb', 4]]],
  [[['Ab4', 2], ['G4', 1], ['F4', 1]], [['Ab', 2], ['Bb', 2]]],
  [[['Eb4', 1], ['D4', 1], ['Eb4', 1], ['Bb4', 1]], [['Eb', 4]]],
  [[['C5', 3], ['Bb4', 1]], [['Ab', 4]]],
  [[['Ab4', 1], ['G4', 1], ['F4', 1], ['G4', 1]], [['Fm', 2], ['Bb', 2]]],
  [[['Bb3', 2], ['D4', 1], ['F4', 1]], [['Bb7', 4]]],
  [[['Eb4', 4]], [['Eb', 4]]],
];
const PLANETS = ['MARS', 'VENUS', 'MERCURY', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE'];

module.exports = {
  slug: 'jupiter-holst',
  title: 'Jupiter: From Planet to Hymn',
  segments: [
    { id: 'hook',    text: 'A party in outer space... and hidden inside it, a hymn.' },
    { id: 'what',    text: "This is Jupiter, from Gustav Holst's The Planets..." },
    { id: 'what2',   text: 'composed from 1914 to 1916.' },
    { id: 'seven',   text: 'Seven movements, one for each planet known to astrology.' },
    { id: 'noearth', text: "No Earth... and Pluto wasn't discovered until 1930." },
    { id: 'mars',    text: 'Mars, the Bringer of War, is even in five four.' },
    { id: 'jup',     text: 'Jupiter is the Bringer of Jollity.' },
    { id: 'hymn',    text: 'In 1921, its slow central tune was adapted as a hymn...' },
    { id: 'hymn2',   text: 'I Vow to Thee, My Country. The tune is called Thaxted.' },
    { id: 'why0',    text: 'So why does it work?' },
    { id: 'why1',    text: 'The outer sections are fast, syncopated and festive.' },
    { id: 'why2',    text: 'Then everything slows into a broad, singable melody in E flat major.' },
    { id: 'why2b',   text: 'A hymn hidden inside a dance.' },
    { id: 'why3',    text: 'A wide range, mostly step by step, with a few big leaps.' },
    { id: 'why3b',   text: 'That makes it feel noble.' },
    { id: 'why4',    text: 'And each planet gets its own character...' },
    { id: 'why4c',   text: 'through orchestration and rhythm.' },
    { id: 'why4b',   text: 'Music as personality.' },
    { id: 'essence', text: 'A party, then a hymn...' },
    { id: 'essence2', text: 'and one tune travelled from the stars to the church.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'GUSTAV HOLST · THE PLANETS', title: 'JUPITER', accent: true, tonic: 3, min: 6.4, tail: 2.2 },
    { id: 'what', segs: ['what', 'what2', 'seven', 'noearth'], label: 'GUSTAV HOLST · 1914–16', title: 'THE PLANETS', circle: false, tonic: 3, gap: 0.3, tail: 0.7 },
    { id: 'mars', segs: ['mars'], label: 'THE BRINGER OF WAR', title: 'MARS', circle: false, tonic: 3, tail: 1.2 },
    { id: 'jup', segs: ['jup', 'hymn'], label: 'THE BRINGER OF JOLLITY', title: 'JUPITER', sub: 'Holst · The Planets', tonic: 3, gap: 0.3, tail: 0.3 },
    { id: 'hymn', segs: ['hymn2'], label: 'A HYMN · 1921', title: 'I VOW TO THEE', sub: 'My Country · in Eb', tonic: 3, tail: 1.4 },
    { id: 'why1', segs: ['why0', 'why1'], label: 'WHY IT WORKS', title: 'FAST · SLOW · FAST', circle: false, tonic: 3, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'A HIDDEN HYMN', tonic: 3, gap: 0.3, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'STEPS AND LEAPS', tonic: 3, gap: 0.3, tail: 1.0 },
    { id: 'why4', segs: ['why4', 'why4c', 'why4b'], label: 'THE PLANETS', title: 'MUSIC AS PERSONALITY', circle: false, tonic: 3, gap: 0.3, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'STARS TO CHURCH', accent: true, tonic: 3, gap: 0.6, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', GREY = '#8a8a92', BLUE = '#62a8ff', LILAC = '#b48cff', WHITE = '#ffffff', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const VOICE = { partials: [1, 0.55, 0.38, 0.22, 0.12, 0.06], attack: 0.09, release: 0.3 };

    // fast, syncopated, festive chords: hits on 1, the "and" of 2, the "and" of 3, and 4
    function jolly(t0, t1, o = {}) {
      const prog = o.prog ?? ['Eb', 'Ab', 'Eb', 'Bb'];
      for (let i = 0, t = t0; t < t1 - 0.15; t += JBAR, i++) {
        const c = prog[i % prog.length], [n, bs] = JOLLY[c], end = Math.min(t + JBAR, t1);
        const hits = [[0, 1], [1.5, 0.85], [2.5, 0.85], [3, 0.7]].filter(([u]) => t + u * Q < end - 0.05);
        a.ch(c, t, end, { notes: n, bass: false, vel: o.vel ?? 0.45, hideName: o.hideName, shape: o.shape, strikes: hits.map(([u, v]) => ({ o: u * Q, v })) });
        [0, 2].forEach(u => { if (t + u * Q < end - 0.05) a.note(bs, t + u * Q, Q * 0.9, { vel: 0.3, show: false }); });
        for (let k = 0; k < 8; k++) if (t + k * Q / 2 < end - 0.05) a.perc('hat', t + k * Q / 2, k % 2 ? 0.2 : 0.3);
        a.perc('kick', t, 0.45); a.perc('snare', t + 1.5 * Q, 0.35); if (t + 2.5 * Q < end) a.perc('snare', t + 2.5 * Q, 0.3);
        if (o.grid) hits.forEach(([u]) => o.grid.active.push({ t0: t + u * Q, t1: t + u * Q + 0.15, i: o.gridI ?? 0 }));
      }
    }
    // our own broad hymn melody (bars from..to), beat b; returns { end, pts, times }
    function hymn(t0, b = HB, o = {}) {
      const from = o.from ?? 0, to = o.to ?? HYMN.length;
      let t = t0; const pts = [];
      for (let k = from; k < to; k++) {
        const [mel, chs] = HYMN[k];
        let u = t;
        mel.forEach(([n, d]) => { a.note(n, u, d * b * 0.97, { vel: o.vel ?? 0.3, tone: VOICE }); pts.push([u, n]); u += d * b; });
        u = t;
        chs.forEach(([c, d]) => { const [n, bs] = HCH[c]; a.ch(c, u, u + d * b, { notes: n, bass: bs, vel: o.chVel ?? 0.4, hideName: o.hideName, shape: o.shape, label: c === 'Bb7' ? 'Bb7' : undefined }); u += d * b; });
        t += 4 * b;
      }
      return { end: t, pts };
    }

    // ---- hook (cover): the party - then, on 'hymn', our broad tune ----
    a.scale(0.15, 'Eb', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.06 } });
    const tHy = a.w('hook', 'hymn') - 0.05, h1 = S('hook').t1;
    jolly(0.25, tHy, { vel: 0.5 });
    a.big('JOLLITY', 0.3, tHy, { y: 462, size: 56, color: GOLD, blur: 18 });
    const hh = hymn(tHy, 0.5, { to: 2, vel: 0.32 });
    a.walker(hh.pts.map(([t, n]) => [t, pcOf(n)]), { t1: h1, dr: -40, color: WHITE });
    a.big('A HYMN', tHy, h1, { y: 462, size: 56, color: WHITE, blur: 18 });

    // ---- what: The Planets - seven movements, no Earth, no Pluto ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const cells = PLANETS.map(p => ({ label: p, size: 34, color: p === 'JUPITER' ? GOLD : p === 'MARS' ? RED : BLUE })).concat([{ label: 'EARTH?', size: 34, color: GREY }]);
    const gP = a.grid(cells, w0 + 0.1, w1, { rows: 2, cols: 4, cw: 235, chh: 150, y: 520, revealStep: 0.06 });
    const tSev = a.w('seven', 'Seven') - 0.05, tNo = a.at('noearth') - 0.05;
    gP.active.push({ t0: a.w('what', 'Jupiter') - 0.05, t1: tSev, i: 3 });
    PLANETS.forEach((_, i) => gP.active.push({ t0: tSev + i * 0.25, t1: tNo, i }));
    gP.active.push({ t0: tNo, t1: w1, i: 7 });
    a.big('1914–16', a.w('what2', '1914') - 0.05, tSev, { y: 920, size: 90, ...MONO, color: WHITE, blur: 14 });
    a.big('7 MOVEMENTS', tSev, tNo, { y: 920, size: 70, color: BLUE, blur: 18 });
    a.big('NO EARTH', tNo, a.w('noearth', 'Pluto') - 0.05, { y: 920, size: 70, color: RED, blur: 18 });
    a.big('PLUTO: FOUND IN 1930', a.w('noearth', 'Pluto') - 0.05, w1, { y: 920, size: 52, ...MONO, color: GREY, blur: 6 });
    jolly(w0 + 0.1, w1, { vel: 0.25, shape: false });

    // ---- mars: 5/4 (an even count, nothing more) ----
    const m0 = S('mars').t0, m1 = S('mars').t1;
    const g5 = a.grid([1, 2, 3, 4, 5].map((n, i) => ({ label: String(n), color: i ? RED : GOLD, size: i ? 60 : 76 })), m0 + 0.1, m1, { rows: 1, cols: 5, cw: 180, chh: 200, y: 560, revealStep: 0.08, caption: 'ONE BAR OF 5/4' });
    const tF = a.w('mars', 'five') - 0.05;
    for (let t = tF, i = 0; t < m1 - 0.2; t += 0.36, i++) {
      g5.active.push({ t0: t, t1: t + 0.3, i: i % 5 });
      a.perc('kick', t, i % 5 ? 0.35 : 0.7);
      a.note('C2', t, 0.25, { vel: i % 5 ? 0.18 : 0.3, show: false });
    }
    a.big('5/4', tF, m1, { y: 940, size: 150, color: RED, blur: 30 });
    a.big('THE BRINGER OF WAR', m0 + 0.2, tF, { y: 940, size: 46, ...MONO, color: RED, blur: 10 });

    // ---- jup: the bringer of jollity, then the tune that became a hymn ----
    const j0 = S('jup').t0, j1 = S('jup').t1;
    a.scale(j0, 'Eb', a.T.MAJOR);
    const tSlow = a.w('hymn', 'slow') - 0.05;
    jolly(j0 + 0.1, tSlow, { vel: 0.5 });
    a.big('JOLLITY!', a.w('jup', 'Jollity') - 0.05, tSlow, { y: 462, size: 56, color: GOLD, blur: 18 });
    a.big('SLOW CENTRAL TUNE', tSlow, j1, { y: 462, size: 46, ...MONO, color: WHITE, blur: 8 });
    const hj = hymn(tSlow, HB, { vel: 0.3 });
    a.walker(hj.pts.map(([t, n]) => [t, pcOf(n)]), { t1: S('hymn').t1, dr: -40, color: WHITE });
    // ---- hymn: 1921 - I Vow to Thee, My Country (tune: Thaxted) ----
    const y1 = S('hymn').t1;
    a.big('TUNE: THAXTED', a.w('hymn2', 'Thaxted') - 0.1, y1, { y: 462, size: 50, ...MONO, color: GOLD, blur: 12 });
    a.ring(['Eb'], a.at('hymn2'), y1, { color: GOLD });
    a.ch('Eb', Math.max(hj.end, y1 - 1.0), y1 - 0.05, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4'], bass: 'Eb2', vel: 0.4 });

    // ---- why1: the tempo meter - fast, slow, fast ----
    const f0 = S('why1').t0, f1 = S('why1').t1;
    const gT = a.grid([{ label: 'FAST', sub: 'JOLLITY', size: 60, color: GOLD }, { label: 'SLOW', sub: 'HYMN', size: 60, color: TEAL }, { label: 'FAST', sub: 'JOLLITY', size: 60, color: GOLD }],
      f0 + 0.1, f1, { rows: 1, cols: 3, cw: 300, chh: 230, y: 540, revealStep: 0.15, caption: 'OUTER · MIDDLE · OUTER' });
    const tOut = a.w('why1', 'outer') - 0.05;
    gT.active.push({ t0: tOut, t1: f1, i: 0 }, { t0: tOut, t1: f1, i: 2 });
    jolly(tOut, f1, { vel: 0.55, shape: false });
    a.big('FAST', a.w('why1', 'fast') - 0.05, a.w('why1', 'syncopated') - 0.05, { y: 920, size: 80, color: GOLD, blur: 20 });
    a.big('SYNCOPATED', a.w('why1', 'syncopated') - 0.05, a.w('why1', 'festive') - 0.05, { y: 920, size: 80, color: ORANGE, blur: 20 });
    a.big('FESTIVE', a.w('why1', 'festive') - 0.05, f1, { y: 920, size: 80, color: RED, blur: 20 });

    // ---- why2: everything slows into a broad melody in E flat ----
    const q0 = S('why2').t0, q1 = S('why2').t1;
    a.scale(q0, 'Eb', a.T.MAJOR);
    const tSl2 = a.w('why2', 'slows') - 0.05;
    jolly(q0 + 0.1, tSl2, { vel: 0.45 });
    const hq = hymn(tSl2, HB, { vel: 0.3, to: Math.min(7, Math.floor((q1 - tSl2) / (4 * HB))) });
    a.walker(hq.pts.map(([t, n]) => [t, pcOf(n)]), { t1: q1, dr: -40, color: WHITE });
    if (hq.end < q1 - 0.3) a.ch('Eb', hq.end, q1 - 0.05, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4'], bass: 'Eb2', vel: 0.35 });
    a.ring(['Eb'], a.w('why2', 'E') - 0.05, a.at('why2b'), { color: GOLD });
    a.big('BROAD · SINGABLE', a.w('why2', 'broad') - 0.05, a.at('why2b'), { y: 462, size: 46, ...MONO, color: TEAL, blur: 8 });
    a.big('A HYMN INSIDE A DANCE', a.at('why2b'), q1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 8 });

    // ---- why3: wide range, steps and a few leaps ----
    const r0 = S('why3').t0, r1 = S('why3').t1;
    a.scale(r0, 'Eb', a.T.MAJOR);
    const tR = a.at('why3');
    const hr = hymn(tR, (r1 - tR - 0.6) / 16, { vel: 0.3, from: 2, to: 6 });
    a.walker(hr.pts.map(([t, n]) => [t, pcOf(n)]), { t1: r1, dr: -40, color: WHITE });
    // the leaps in bars 3-6: Eb up to Bb, G down to Bb (an octave lower)
    const lp = hr.pts;
    a.arc('Eb', 'Bb', lp[3][0], lp[3][0] + 1.6, { steps: 7, color: GOLD, dr: 30, label: 'LEAP', labelR: 165 });
    a.arc('G', 'Bb', lp[10][0], r1, { steps: -9, color: GOLD, dr: 30, label: 'LEAP', labelR: 165 });
    a.big('WIDE RANGE', a.w('why3', 'wide') - 0.05, a.w('why3', 'step') - 0.05, { y: 462, size: 48, ...MONO, color: TEAL, blur: 8 });
    a.big('STEP BY STEP', a.w('why3', 'step') - 0.05, a.w('why3', 'leaps') - 0.05, { y: 462, size: 48, ...MONO, color: WHITE, blur: 8 });
    a.big('+ A FEW BIG LEAPS', a.w('why3', 'leaps') - 0.05, a.at('why3b'), { y: 462, size: 48, ...MONO, color: GOLD, blur: 8 });
    a.big('NOBLE', a.w('why3b', 'noble') - 0.05, r1, { y: 462, size: 64, color: GOLD, blur: 22 });

    // ---- why4: each planet, its own character ----
    const p0 = S('why4').t0, p1 = S('why4').t1;
    const gC = a.grid(PLANETS.map(p => ({ label: p, size: 34, color: p === 'JUPITER' ? GOLD : p === 'MARS' ? RED : BLUE })), p0 + 0.1, p1,
      { rows: 2, cols: 4, cw: 235, chh: 150, y: 520, revealStep: 0.06 });
    const tOwn = a.w('why4', 'character') - 0.05;
    for (let k = 0; k < 14; k++) gC.active.push({ t0: tOwn + k * 0.22, t1: tOwn + (k + 1) * 0.22, i: k % 7 });
    PLANETS.forEach((_, i) => gC.active.push({ t0: a.at('why4b'), t1: p1, i }));
    a.big('ORCHESTRATION', a.w('why4c', 'orchestration') - 0.05, a.at('why4b'), { y: 900, size: 56, color: TEAL, blur: 14 });
    a.big('+ RHYTHM', a.w('why4c', 'rhythm') - 0.05, a.at('why4b'), { y: 980, size: 50, ...MONO, color: GOLD, blur: 10 });
    a.big('PERSONALITY', a.w('why4b', 'personality') - 0.05, p1, { y: 940, size: 84, color: GOLD, blur: 24 });
    jolly(p0 + 0.1, a.at('why4b') - 0.05, { vel: 0.3, shape: false });
    hymn(a.at('why4b') - 0.05, 0.45, { to: 1, vel: 0.3, shape: false });

    // ---- essence: party, hymn, home ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'Eb', a.T.MAJOR);
    const tH = a.w('essence', 'hymn') - 0.05, tTr = a.w('essence2', 'travelled') - 0.05;
    jolly(e0 + 0.1, tH, { vel: 0.5 });
    a.big('A PARTY', e0 + 0.2, tH, { y: 462, size: 56, color: GOLD, blur: 18 });
    a.big('A HYMN', tH, tTr, { y: 462, size: 56, color: WHITE, blur: 18 });
    const he = hymn(tH, Math.min(HB, (a.at('cta') - tH) / 12), { from: 4, to: 7, vel: 0.32 });
    a.walker(he.pts.map(([t, n]) => [t, pcOf(n)]), { t1: he.end + 0.6, dr: -40, color: WHITE });
    a.big('FROM THE STARS TO THE CHURCH', tTr, e1, { y: 462, size: 36, ...MONO, color: GOLD, blur: 8 });
    a.ch('Eb', he.end, e1 - 0.3, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.55 });
    a.ring(['Eb'], he.end, e1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
