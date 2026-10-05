// Ride of the Valkyries, decoded: a 9/8 gallop plus a chord turned into a brass fanfare.
// Brief/copyright: Wagner's exact theme is NOT reconstructed. We play our own B minor arpeggio
// pattern (B - D - F#) in the long-short-long rhythm, in 9/8, over swirling string-like runs.
const E = 0.16;            // one eighth note
const BEAT = 3 * E, BAR = 9 * E;
// our own pattern: each beat is long (1.5) - short (0.5) - long (1), climbing the B minor chord
const PAT = [
  ['B3', 1.5], ['B3', 0.5], ['D4', 1], ['F#4', 1.5], ['D4', 0.5], ['F#4', 1], ['B4', 3],
  ['F#4', 1.5], ['F#4', 0.5], ['B4', 1], ['D5', 1.5], ['B4', 0.5], ['D5', 1], ['F#5', 3],
];
const PAT_LEN = 2 * BAR;

module.exports = {
  slug: 'ride-valkyries',
  title: 'Ride of the Valkyries',
  segments: [
    { id: 'hook',    text: 'Listen... a rhythm that gallops through the sky.' },
    { id: 'what',    text: "This is the Ride of the Valkyries, from Wagner's opera Die Walküre, premiered in Munich in 1870." },
    { id: 'what2',   text: 'It opens Act 3, as the Valkyries ride through the air to the mountain rock.' },
    { id: 'apoc',    text: 'And in 1979, it was famously used in the helicopter attack scene of Apocalypse Now.' },
    { id: 'play',    text: 'Here is that galloping rhythm, on a B minor chord.' },
    { id: 'why1',    text: 'So why does it feel like flying? The meter is nine eight.' },
    { id: 'why1b',   text: 'Three big beats per bar, each divided in three.' },
    { id: 'why1c',   text: 'One two three, one two three, one two three. The lilting motion of a gallop.' },
    { id: 'why2',    text: 'On each beat, the rhythm goes long, short, long. Every beat gets a kick, like hooves.' },
    { id: 'why3',    text: 'The theme climbs through the notes of a single chord. An arpeggio, like a heroic fanfare.' },
    { id: 'why4',    text: "It's played by the brass, horns and trombones, the loudest section of the orchestra..." },
    { id: 'why4b',   text: 'while strings and woodwinds swirl around it like wind.' },
    { id: 'essence', text: 'A galloping rhythm, a chord turned into a fanfare... and the orchestra takes flight.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'RICHARD WAGNER · 1870', title: 'RIDE OF THE VALKYRIES', accent: true, tonic: 11, min: PAT_LEN + 1.2 },
    { id: 'what', segs: ['what', 'what2'], label: 'FROM DIE WALKÜRE', title: 'THE VALKYRIES', sub: 'Wagner · 1870 · Munich', tonic: 11, gap: 0.4, tail: 0.8 },
    { id: 'apoc', segs: ['apoc'], label: 'LATER, IN A FILM', title: 'APOCALYPSE NOW', circle: false, tonic: 11, tail: 1.2 },
    { id: 'play', segs: ['play'], label: 'THE GALLOP', title: 'A FLYING FANFARE', sub: 'in 9/8 · on B minor', tonic: 11, tail: 2 * PAT_LEN + 1.0 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'NINE EIGHT', circle: false, tonic: 11, gap: 0.3, tail: 1.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'LONG, SHORT, LONG', circle: false, tonic: 11, tail: 1.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE CHORD, CLIMBING', tonic: 11, tail: 1.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'THE ORCHESTRA', title: 'BRASS AND WIND', circle: false, tonic: 11, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TAKING FLIGHT', accent: true, tonic: 11, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n), pcOf = n => n.replace(/\d/, '');
    const BM = { notes: ['F#3', 'B3', 'D4'], bass: 'B1' };

    // the galloping fanfare; returns { end, pts }
    function ride(t0, o = {}) {
      let t = t0; const pts = [], v = o.vel ?? 0.4;
      for (const [n, d] of (o.list || PAT)) {
        const accent = d >= 1.5 || d === 3;
        a.note(n, t, d * E * 0.8, { vel: v * (accent ? 1.1 : 0.85), show: o.show ?? true });
        if (o.dbl) a.note(midi(n) - 12, t, d * E * 0.8, { vel: v * 0.6, show: false });
        pts.push([t, pcOf(n)]);
        t += d * E;
      }
      return { end: t, pts };
    }
    // swirling string-like runs: fast turns around B minor, high and soft
    const SW = ['B4', 'C#5', 'D5', 'E5', 'D5', 'C#5'];
    function swirl(t0, t1, vel = 0.1, shift = 0) {
      for (let t = t0, i = 0; t < t1 - 0.05; t += E / 2, i++) a.note(midi(SW[i % 6]) + shift, t, E / 2 * 0.9, { vel: vel * (i % 6 === 0 ? 1.2 : 1), show: false });
    }
    // low B on every beat, chord held under it
    function ground(t0, t1, o = {}) {
      for (let t = t0, k = 0; t < t1 - 0.1; t += BAR, k++) {
        a.ch('Bm', t, Math.min(t + BAR, t1), { ...BM, vel: o.vel ?? 0.4, hideName: o.hideName, shape: o.shape ?? true,
          strikes: [{ o: 0, v: 1 }, { o: BEAT, v: 0.5 }, { o: 2 * BEAT, v: 0.5 }] });
      }
    }
    // hoofbeats: long-short-long on percussion for every beat
    function hooves(t0, t1, vel = 0.6, grid) {
      for (let t = t0; t + BEAT <= t1 + 0.01; t += BEAT) {
        a.perc('kick', t, vel); a.perc('hat', t + 1.5 * E, vel * 0.7); a.perc('snare', t + 2 * E, vel * 0.45);
        if (grid) grid.active.push({ t0: t, t1: t + 1.5 * E, i: 0 }, { t0: t + 1.5 * E, t1: t + 2 * E, i: 1 }, { t0: t + 2 * E, t1: t + 3 * E, i: 2 });
      }
    }

    // ---- hook: B minor pops in, the fanfare climbs over swirling runs (cover) ----
    a.scale(0.15, 'B', a.T.MINOR, { popIn: { t0: 0.2, step: 0.06 } });
    a.ch('Bm', 0.3, S('hook').t1, { ...BM, vel: 0.35, strikes: [0, 1, 2, 3, 4, 5].map(k => ({ o: k * BEAT, v: k % 3 ? 0.4 : 0.8 })) });
    a.ring(['B', 'D', 'F#'], 0.35, S('hook').t1, { color: GOLD });
    swirl(0.3, S('hook').t1 - 0.3, 0.09);
    const h = ride(0.4, { vel: 0.38, dbl: true });
    a.walker(h.pts, { t1: S('hook').t1, dr: -40, color: GOLD, label: 'FANFARE', labelDr: -50 });
    hooves(0.4, h.end, 0.35);
    a.note('B4', h.end, 0.9, { vel: 0.4 }); a.note('B2', h.end, 0.9, { vel: 0.35, show: false });

    // ---- what: Die Walküre, Munich 1870, Act 3 ----
    const w0 = S('what').t0, w1 = S('what').t1;
    ground(w0 + 0.1, w1, { vel: 0.3 });
    swirl(w0 + 0.1, w1 - 0.2, 0.06);
    a.tag(0, a.w('what2', 'Act'), w1, 'ACT 3', { x: 540, y: 455, color: GOLD });
    a.tag('F#', a.w('what2', 'air'), w1, 'THROUGH THE AIR', { dr: -92, color: BLUE });
    const wr = ride(a.w('what2', 'ride'), { vel: 0.22, list: PAT.slice(0, 7) });
    a.walker(wr.pts, { t1: w1, dr: -40, color: GOLD });

    // ---- apoc: 1979 ----
    const p0 = S('apoc').t0, p1 = S('apoc').t1;
    a.big('1979', p0 + 0.2, p1, { y: 680, size: 200, color: GOLD, blur: 36 });
    a.big('HELICOPTER ATTACK SCENE', a.w('apoc', 'helicopter') - 0.05, p1, { y: 860, size: 40, color: '#ffffff', ...MONO, blur: 8 });
    swirl(p0 + 0.1, p1 - 0.2, 0.08);
    for (let t = p0 + 0.1; t < p1 - 0.2; t += BAR) a.note('B1', t, BAR, { vel: 0.26, show: false });
    hooves(a.w('apoc', 'helicopter'), p1 - 0.2, 0.4);

    // ---- play: our galloping pattern, twice, then a held B minor ----
    const q0 = a.end('play') + 0.25, q1 = S('play').t1;
    ground(S('play').t0 + 0.1, q0, { vel: 0.3 });
    const r1 = ride(q0, { vel: 0.42, dbl: true });
    const r2 = ride(r1.end, { vel: 0.46, dbl: true });
    a.walker([...r1.pts, ...r2.pts], { t1: q1, dr: -40, color: GOLD, label: 'FANFARE', labelDr: -50 });
    ground(q0, r2.end, { vel: 0.45 });
    swirl(q0, r2.end, 0.1);
    hooves(q0, r2.end, 0.45);
    a.ch('Bm', r2.end, q1 - 0.1, { notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B1', vel: 0.9 });
    a.perc('kick', r2.end, 0.9); a.perc('snare', r2.end, 0.6);

    // ---- why1: 9/8 = three big beats, each divided in three ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const NINE = Array.from({ length: 9 }, (_, i) => ({ label: String(i % 3 + 1), color: i % 3 === 0 ? GOLD : TEAL, size: i % 3 === 0 ? 64 : 46 }));
    const g1 = a.grid(NINE, y0 + 0.1, y1, { rows: 1, cols: 9, cw: 112, chh: 170, y: 560, revealStep: 0.06 });
    a.big('9/8', a.w('why1', 'meter') - 0.05, a.w('why1b', 'divided') - 0.05, { y: 900, size: 170, color: GOLD, blur: 30 });
    a.big('3 BEATS × 3', a.w('why1b', 'divided') - 0.05, a.at('why1c'), { y: 900, size: 90, color: TEAL, blur: 24 });
    // the three big beats light on "Three big beats"
    const tBig = a.w('why1b', 'beats');
    [0, 3, 6].forEach((i, k) => g1.active.push({ t0: tBig + k * 0.25, t1: a.w('why1b', 'divided') - 0.05, i }));
    // counting: each spoken number lights its cell
    const W = (w, n) => a.w('why1c', w, n);
    const cnt = [W('One', 0), W('two', 0), W('three', 0), W('one', 0), W('two', 1), W('three', 1), W('one', 1), W('two', 2), W('three', 2)];
    cnt.forEach((t, i) => {
      g1.active.push({ t0: t, t1: cnt[i + 1] ?? t + 0.4, i });
      a.note(i % 3 === 0 ? 'B2' : 'F#3', t, 0.25, { vel: i % 3 === 0 ? 0.36 : 0.2, show: false });
    });
    a.big('1 2 3 · 1 2 3 · 1 2 3', W('One', 0) - 0.05, a.w('why1c', 'gallop') - 0.05, { y: 900, size: 54, color: TEAL, ...MONO, blur: 12 });
    // "the lilting motion of a gallop": the 9 cells cycle with the hooves
    const tG = a.w('why1c', 'lilting') - 0.05;
    for (let t = tG, i = 0; t < y1 - 0.2; t += E, i++) g1.active.push({ t0: t, t1: t + E, i: i % 9 });
    hooves(tG, y1 - 0.2, 0.5);
    for (let t = tG; t < y1 - 0.3; t += BEAT) a.note('B2', t, 0.2, { vel: 0.3, show: false });
    a.big('A GALLOP', a.w('why1c', 'gallop') - 0.05, y1, { y: 900, size: 100, color: GOLD, blur: 30 });

    // ---- why2: long - short - long, a kick on every beat ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const g2 = a.grid([
      { label: 'LONG', sub: '3 UNITS', color: GOLD, size: 62 },
      { label: 'short', sub: '1 UNIT', color: TEAL, size: 46 },
      { label: 'LONG', sub: '2 UNITS', color: GOLD, size: 62 },
    ], z0 + 0.1, z1, { rows: 1, cols: 3, cw: 300, chh: 260, y: 580, revealStep: 0.15 });
    const ls = [a.w('why2', 'long', 0), a.w('why2', 'short'), a.w('why2', 'long', 1)];
    ls.forEach((t, i) => { g2.active.push({ t0: t - 0.04, t1: ls[i + 1] ?? t + 0.6, i }); a.note(i === 1 ? 'B3' : 'D4', t, i === 1 ? 0.15 : 0.4, { vel: 0.34, show: false }); });
    const tK = a.w('why2', 'kick') - 0.05;
    hooves(tK, z1 - 0.2, 0.7, g2);
    const zr = ride(tK, { vel: 0.3, show: false, list: PAT.slice(0, 7) });
    ride(zr.end, { vel: 0.3, show: false, list: PAT.slice(0, 7) });
    a.big('A KICK ON EVERY BEAT', tK, a.w('why2', 'hooves') - 0.05, { y: 960, size: 46, color: GOLD, ...MONO, blur: 12 });
    a.big('LIKE HOOVES', a.w('why2', 'hooves') - 0.05, z1, { y: 960, size: 80, color: '#ffffff', blur: 20 });

    // ---- why3: climbing one chord = an arpeggio = a fanfare ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    a.scale(c0, 'B', a.T.MINOR);
    const tCl = a.w('why3', 'climbs') - 0.05, tCh = a.w('why3', 'chord') - 0.05;
    a.ch('Bm', tCh, c1, { notes: ['B3', 'D4', 'F#4'], bass: false, mute: true });
    const up = ['B3', 'D4', 'F#4', 'B4', 'D5', 'F#5'];
    up.forEach((n, i) => a.note(n, tCl + i * 0.3, 0.5, { vel: 0.32 }));
    a.walker(up.map((n, i) => [tCl + i * 0.3, pcOf(n)]), { t1: c1, dr: -40, color: GOLD });
    a.tag('B', tCh, c1, 'ROOT', { dr: -92, color: GOLD });
    a.tag('D', tCh + 0.2, c1, '3RD', { dr: -92, color: GOLD });
    a.tag('F#', tCh + 0.4, c1, '5TH', { dr: -92, color: GOLD });
    a.tag(0, a.w('why3', 'arpeggio') - 0.05, c1, 'ARPEGGIO = FANFARE', { x: 540, y: 455, color: GOLD });
    const cr = ride(a.w('why3', 'heroic'), { vel: 0.4, dbl: true });
    ground(a.w('why3', 'heroic'), cr.end, { vel: 0.35 });
    a.note('B4', cr.end, 0.8, { vel: 0.38 });

    // ---- why4: brass in the middle, strings and woodwinds swirling around ----
    const b0 = S('why4').t0, b1 = S('why4').t1;
    const g4 = a.grid([
      { label: 'STRINGS', sub: 'SWIRL', color: TEAL, size: 40, subSize: 24 },
      { label: 'BRASS', sub: 'HORNS · TROMBONES', color: GOLD, size: 56, subSize: 20 },
      { label: 'WOODWINDS', sub: 'SWIRL', color: BLUE, size: 34, subSize: 24 },
    ], b0 + 0.1, b1, { rows: 1, cols: 3, cw: 330, chh: 260, y: 580, revealStep: 0.15 });
    const tBr = a.w('why4', 'brass') - 0.05, tLoud = a.w('why4', 'loudest') - 0.05, tSw = a.w('why4b', 'swirl') - 0.05;
    g4.active.push({ t0: tBr, t1: b1, i: 1 });
    g4.active.push({ t0: a.w('why4b', 'strings') - 0.05, t1: b1, i: 0 }, { t0: a.w('why4b', 'woodwinds') - 0.05, t1: b1, i: 2 });
    let bt = tBr;
    while (bt + PAT_LEN < b1 + 0.3) { const r = ride(bt, { vel: 0.44, dbl: true, show: false }); bt = r.end; }
    ground(tBr, b1, { vel: 0.4, shape: false });
    a.big('LOUDEST SECTION', tLoud, b1, { y: 960, size: 56, color: GOLD, ...MONO, blur: 14 });
    swirl(tSw - 0.4, b1 - 0.1, 0.12);
    swirl(tSw - 0.4, b1 - 0.1, 0.08, -12);

    // ---- essence: the pattern once more, then the big B minor ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'B', a.T.MINOR);
    const er = ride(e0 + 0.15, { vel: 0.42, dbl: true });
    a.walker(er.pts, { t1: er.end + 0.5, dr: -40, color: GOLD });
    ground(e0 + 0.15, er.end, { vel: 0.4 });
    swirl(e0 + 0.15, er.end, 0.1);
    hooves(e0 + 0.15, er.end, 0.4);
    a.ch('Bm', er.end, e1 - 0.3, { notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B1', vel: 0.9 });
    a.perc('kick', er.end, 0.9);
    a.ring(['B', 'D', 'F#'], er.end, e1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
