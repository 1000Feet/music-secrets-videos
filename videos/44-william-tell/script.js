// The William Tell gallop, decoded: short-short-long, repeated fast, over the simplest harmony.
const U = 0.12; // one sixteenth at full gallop
// the gallop theme (public domain, simplified, in E): [note, sixteenths]; null = rest
const G = n => [[n, 1], [n, 1], [n, 2]];
const PA = [...G('B3'), ...G('B3'), ['B3', 1], ['B3', 1], ['E4', 2], ['F#4', 2], ['G#4', 2], [null, 2]];
const PB = [...G('B3'), ...G('B3'), ['B3', 1], ['B3', 1], ['D#4', 2], ['F#4', 2], ['A4', 2], [null, 2]];
const PC = [...G('B3'), ...G('B3'), ['B3', 1], ['B3', 1], ['E4', 2], ['G#4', 2], ['E4', 4]];
const PLEN = 16 * U;

module.exports = {
  slug: 'william-tell',
  title: 'The William Tell Gallop',
  segments: [
    { id: 'hook',    text: 'Three notes of rhythm... and suddenly you can hear horses.' },
    { id: 'what',    text: "This is the finale of Rossini's William Tell Overture, from 1829." },
    { id: 'what2',   text: 'Later, it became the theme of The Lone Ranger, on radio and TV.' },
    { id: 'play',    text: 'Here it is, at full gallop.' },
    { id: 'why1',    text: 'So why does it work? Listen to the rhythm: short, short, long.' },
    { id: 'why2',    text: 'Two quick hoofbeats, then a stronger one. A horse at a gallop.' },
    { id: 'why3',    text: 'Even on one single note, the rhythm alone tells the story.' },
    { id: 'harm',    text: 'The harmony is simple: just the home chord and the five chord.' },
    { id: 'harm2',   text: 'Add fast repeated notes and a trumpet fanfare... pure excitement.' },
    { id: 'speed',   text: 'And played at high speed, your brain hears it as forward motion.' },
    { id: 'speed2',  text: "That's why it became the sound of the chase." },
    { id: 'essence', text: 'Three notes of rhythm, repeated fast enough, can sound like a whole cavalry.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'WILLIAM TELL', accent: true, circle: false, tonic: 4, min: 5.6 },
    { id: 'what', segs: ['what'], label: 'THE FINALE', title: 'WILLIAM TELL OVERTURE', sub: 'Gioachino Rossini · 1829', tonic: 4, tail: 1.2 },
    { id: 'what2', segs: ['what2'], label: 'LATER, ON RADIO AND TV', title: 'THE LONE RANGER', circle: false, tonic: 4, tail: 1.2 },
    { id: 'play', segs: ['play'], label: 'THE GALLOP', title: 'WILLIAM TELL', sub: 'Rossini · 1829 · in E', tonic: 4, row: ['E', 'B7'], tail: 4 * PLEN + 0.9 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SHORT, SHORT, LONG', circle: false, tonic: 4, tail: 1.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A GALLOP', circle: false, tonic: 4, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE NOTE IS ENOUGH', circle: false, tonic: 4, tail: 1.6 },
    { id: 'harm', segs: ['harm'], label: 'THE HARMONY', title: 'JUST I AND V', tonic: 4, row: ['I', 'V'], tail: 0.6 },
    { id: 'harm2', segs: ['harm2'], label: 'NO COMPLEX HARMONY', title: 'PURE EXCITEMENT', tonic: 4, tail: 2.2 },
    { id: 'speed', segs: ['speed', 'speed2'], label: 'FORWARD MOTION', title: 'THE CHASE', circle: false, tonic: 4, gap: 0.3, tail: 2.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A WHOLE CAVALRY', accent: true, tonic: 4, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c';
    const E = { notes: ['G#3', 'B3', 'E4'], bass: 'E2' }, B7 = { notes: ['A3', 'B3', 'D#4', 'F#4'], bass: 'B2' };
    const GCELLS = [
      { label: 'da', sub: 'SHORT', color: TEAL, size: 70 },
      { label: 'da', sub: 'SHORT', color: TEAL, size: 70 },
      { label: 'DUM', sub: 'LONG', color: GOLD, size: 84 },
    ];
    const GRID = { rows: 1, cols: 3, cw: 290, chh: 290, y: 600 };
    const BIG = { y: 1030, size: 64, family: 'DM Mono', weight: 500 };

    // gallop figures from t0 to t1: da-da-DUM on `note` (or percussion), lighting a 3-cell grid
    function gallop(t0, t1, o = {}) {
      const u = o.u ?? U;
      let k = 0;
      for (let t = t0; t + 4 * u <= t1 + 0.01; t += 4 * u, k++) {
        const hits = [0, u, 2 * u];
        hits.forEach((h, i) => {
          const tt = t + h, len = i < 2 ? u : 2 * u;
          if (o.note) a.note(o.note, tt, len * 0.85, { vel: (i === 2 ? 0.4 : 0.3) * (o.vel ?? 1), show: o.show ?? false });
          if (o.hooves) { a.perc(i === 2 ? 'kick' : 'hat', tt, i === 2 ? 0.9 : 0.55); if (i === 2) a.perc('snare', tt, 0.25); }
          if (o.grid) o.grid.active.push({ t0: tt, t1: tt + len, i });
        });
        if (o.chord && k % 2 === 0) a.ch(o.chord, t, Math.min(t + 8 * u, t1), { ...(o.chord === 'E' ? E : B7), vel: 0.45 * (o.vel ?? 1), shape: o.shape ?? false, strikes: [{ o: 0, v: 1 }, { o: 4 * u, v: 0.7 }] });
      }
    }
    // a phrase of the theme with a chord underneath; returns walker points
    function phrase(list, t0, chord, o = {}) {
      let t = t0; const pts = [];
      for (const [n, d] of list) { if (n) { a.note(n, t, d * U * 0.85, { vel: o.vel ?? 0.4 }); pts.push([t, n.replace(/\d/, '')]); } t += d * U; }
      const c = chord === 'E' ? E : B7;
      a.ch(chord, t0, t0 + PLEN, { ...c, row: o.row ?? (chord === 'E' ? 0 : 1), vel: 0.6, strikes: [0, 4, 8, 12].map((s, i) => ({ o: s * U, v: i ? 0.6 : 1 })) });
      return pts;
    }
    const tune = (t0, o = {}) => {
      const pts = [];
      [[PA, 'E'], [PB, 'B7'], [PA, 'E'], [PC, 'E']].forEach(([p, c], i) => pts.push(...phrase(p, t0 + i * PLEN, c, o)));
      return pts;
    };

    // hook: the gallop on B over E, the three cells lighting up
    const g1 = a.grid(GCELLS, 0.3, S('hook').t1, { ...GRID, revealStep: 0.25 });
    gallop(0.3, S('hook').t1 - 0.2, { note: 'B3', chord: 'E', grid: g1 });
    gallop(0.3, S('hook').t1 - 0.2, { hooves: true });

    // what: E major, the finale's home key
    a.scale(S('what').t0, 'E', a.T.MAJOR, { popIn: { t0: S('what').t0 + 0.1, step: 0.08 } });
    gallop(S('what').t0 + 0.1, a.w('what', 'Overture') - 0.1, { note: 'B3', vel: 0.6 });
    const tO = a.w('what', 'Overture') - 0.05;
    a.ch('E', S('what').t0 + 0.1, tO, { ...E, vel: 0.4, row: 0 });
    a.ch('E', tO, S('what').t1, { notes: ['G#3', 'B3', 'E4', 'G#4'], bass: 'E2', row: 0, vel: 0.8 });
    a.tag('E', a.w('what', '1829'), S('what').t1, 'HOME KEY: E MAJOR', { x: 540, y: 455 });

    // what2: 1829 -> radio and TV
    const g2 = a.grid([{ label: '1829', sub: 'ROSSINI', size: 80, color: '#8a8a92' }, { label: 'RADIO · TV', sub: 'THE LONE RANGER', size: 56, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 440, chh: 260, y: 640, revealStep: 0.2 });
    const tLR = a.w('what2', 'Lone') - 0.05;
    g2.active.push({ t0: S('what2').t0 + 0.1, t1: tLR, i: 0 }, { t0: tLR, t1: S('what2').t1, i: 1 });
    gallop(S('what2').t0 + 0.1, S('what2').t1 - 0.1, { hooves: true });
    gallop(S('what2').t0 + 0.1, S('what2').t1 - 0.1, { note: 'E3', vel: 0.5 });

    // play: the theme, four phrases at full speed
    const p0 = a.end('play') + 0.25;
    a.ch('E', S('play').t0 + 0.1, p0, { ...E, vel: 0.35, row: 0 });
    const pts = tune(p0);
    a.walker(pts, { t1: S('play').t1, dr: -40, color: TEAL, label: 'MELODY', labelDr: -46 });
    for (let t = p0; t < p0 + 4 * PLEN - 0.01; t += 4 * U) { a.perc('hat', t, 0.35); a.perc('hat', t + U, 0.3); a.perc('kick', t + 2 * U, 0.5); }
    a.ch('E', p0 + 4 * PLEN, S('play').t1, { notes: ['G#3', 'B3', 'E4', 'B4'], bass: 'E2', row: 0 });
    a.note('E5', p0 + 4 * PLEN, 0.8, { vel: 0.36 });

    // why1: short, short, long on the spoken words
    const g3 = a.grid(GCELLS, S('why1').t0, S('why3').t1, GRID);
    const ws = [a.w('why1', 'short', 0), a.w('why1', 'short', 1), a.w('why1', 'long')];
    ws.forEach((t, i) => { g3.active.push({ t0: t, t1: i < 2 ? ws[i + 1] : S('why1').t1, i }); a.note(i < 2 ? 'B3' : 'E4', t, i < 2 ? 0.25 : 0.6, { vel: 0.36, show: false }); });
    gallop(S('why1').t0 + 0.15, a.w('why1', 'rhythm') - 0.1, { u: 0.2, note: 'B3', grid: g3, vel: 0.7 });

    // why2: hoofbeats (percussion only)
    const tH = a.w('why2', 'hoofbeats');
    gallop(S('why2').t0 + 0.1, tH, { u: 0.16, hooves: true, grid: g3 });
    a.big('TWO QUICK...', tH, a.w('why2', 'stronger'), { ...BIG, color: TEAL });
    a.big('...ONE STRONG', a.w('why2', 'stronger'), a.w('why2', 'horse') - 0.05, { ...BIG, color: GOLD });
    a.big('A HORSE', a.w('why2', 'horse'), S('why2').t1, { ...BIG, size: 96, family: 'DM Sans', weight: 800, color: '#ffffff' });
    gallop(tH, S('why2').t1, { u: 0.14, hooves: true, grid: g3 });

    // why3: one single note, the story is in the rhythm
    gallop(S('why3').t0 + 0.05, S('why3').t1 - 0.1, { u: U, note: 'B3', show: false, grid: g3, vel: 0.9 });
    gallop(S('why3').t0 + 0.05, S('why3').t1 - 0.1, { u: U, hooves: true });
    a.big('ONE NOTE: B', a.w('why3', 'single'), a.w('why3', 'rhythm'), { ...BIG, color: '#ffffff' });
    a.big('RHYTHM = STORY', a.w('why3', 'rhythm'), S('why3').t1, { ...BIG, color: GOLD });

    // harm: I and V on the circle, galloping chords
    a.scale(S('harm').t0, 'E');
    const tHome = a.w('harm', 'home') - 0.05, tFive = a.w('harm', 'five') - 0.05;
    const gch = (c, t0, t1, row) => { for (let t = t0; t < t1 - 0.05; t += 4 * U) a.ch(c, t, Math.min(t + 4 * U, t1), { ...(c === 'E' ? E : B7), row, vel: 0.55, strikes: [{ o: 0, v: 0.8 }, { o: U, v: 0.8 }, { o: 2 * U, v: 1 }] }); };
    gch('E', S('harm').t0 + 0.1, tFive, 0);
    gch('B7', tFive, tFive + 8 * U * 1.5, 1);
    gch('E', tFive + 12 * U, S('harm').t1, 0);
    a.tag('E', tHome + 0.1, S('harm').t1, 'I', { dr: -75 });
    a.tag('B', tFive + 0.1, S('harm').t1, 'V', { dr: -75 });
    a.line('E', 'B', tFive + 0.1, S('harm').t1, { color: GOLD, dash: true });

    // harm2: repeated notes + a trumpet fanfare over I and V
    const f0 = S('harm2').t0 + 0.1, fT = a.w('harm2', 'trumpet') - 0.05, fX = a.w('harm2', 'excitement') - 0.05;
    for (let t = f0; t < fT - 0.05; t += U) a.note('B4', t, U * 0.7, { vel: 0.26 });
    gch('E', f0, fT, 0);
    // fanfare: gallop on E5, then rising E - G# - B
    const FAN = [['E5', 1], ['E5', 1], ['E5', 2], ['E5', 1], ['E5', 1], ['E5', 2], ['E5', 1], ['E5', 1], ['G#5', 2], ['B4', 2], ['E5', 4]];
    let ft = fT;
    FAN.forEach(([n, d]) => { a.note(n, ft, d * U * 0.85, { vel: 0.42 }); ft += d * U; });
    gch('E', fT, fT + 8 * U, 0); gch('B7', fT + 8 * U, fT + 12 * U, 1); gch('E', fT + 12 * U, fX, 0);
    a.tag('E', fT, S('harm2').t1, 'FANFARE', { x: 540, y: 455, color: GOLD });
    gch('B7', fX, fX + 8 * U, 1); gch('E', fX + 8 * U, S('harm2').t1 - 0.2, 0);
    for (let t = fX; t < S('harm2').t1 - 0.3; t += 4 * U) { a.perc('kick', t + 2 * U, 0.7); a.perc('hat', t, 0.4); a.perc('hat', t + U, 0.35); }

    // speed: slow gallop speeds up until it runs; a row of cells lights like a runner
    const s0 = S('speed').t0 + 0.1, sHigh = a.w('speed', 'high'), s1 = S('speed').t1;
    const RUN = Array.from({ length: 8 }, (_, i) => ({ label: '›', color: i % 3 === 2 ? GOLD : TEAL, size: 90 }));
    const g4 = a.grid(RUN, S('speed').t0, s1, { rows: 1, cols: 8, cw: 122, chh: 200, y: 640, revealStep: 0.05 });
    let t = s0, u = 0.24, step = 0;
    while (t < s1 - 0.3) {
      for (let i = 0; i < 3; i++) {
        const tt = t + [0, u, 2 * u][i];
        if (tt > s1 - 0.3) break;
        a.note(i < 2 ? 'B3' : 'E4', tt, u * 0.8, { vel: i === 2 ? 0.36 : 0.28, show: false });
        a.perc(i === 2 ? 'kick' : 'hat', tt, i === 2 ? 0.8 : 0.5);
        g4.active.push({ t0: tt, t1: tt + u * 1.2, i: step++ % 8 });
      }
      t += 4 * u;
      if (t > sHigh - 0.3) u = Math.max(U, u * 0.86);
    }
    a.big('SLOW', s0, sHigh - 0.1, { ...BIG, color: '#8a8a92' });
    a.big('FAST = FORWARD', sHigh, a.w('speed2', 'chase'), { ...BIG, color: TEAL });
    a.big('THE CHASE', a.w('speed2', 'chase'), s1, { ...BIG, size: 96, family: 'DM Sans', weight: 800, color: GOLD });

    // essence: the theme once more, ending on a big E chord
    a.scale(S('essence').t0, 'E');
    const e0 = S('essence').t0 + 0.15;
    const ep = [...phrase(PA, e0, 'E', { vel: 0.3 }), ...phrase(PC, e0 + PLEN, 'E', { vel: 0.3 })];
    a.walker(ep, { t1: e0 + 2 * PLEN + 0.5, dr: -40, color: TEAL });
    const eEnd = e0 + 2 * PLEN;
    a.ch('B7', eEnd, eEnd + 0.5, { ...B7, vel: 0.8 });
    a.ch('E', eEnd + 0.5, S('essence').t1 - 0.3, { notes: ['G#3', 'B3', 'E4', 'G#4', 'B4'], bass: 'E2' });
    a.tag('E', eEnd + 0.6, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
