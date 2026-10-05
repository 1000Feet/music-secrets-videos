// Power chords: root + fifth, no third. Why rock loves them.
// Brief/copyright: no riffs from the songs - only generic power-chord patterns and grooves.
module.exports = {
  slug: 'power-chords',
  title: 'Power Chords',
  segments: [
    { id: 'hook',    text: "Rock's favorite chord has just two notes, and no third at all." },
    { id: 'what',    text: "Take a root, C, add the fifth above it, G. That's a power chord: C five." },
    { id: 'what2',   text: "No third, so it's neither major nor minor." },
    { id: 'kinks',   text: 'You hear it in the distorted riff of You Really Got Me...' },
    { id: 'ramones', text: 'in Blitzkrieg Bop, punk built almost entirely on power chords...' },
    { id: 'metal',   text: 'and all over heavy metal and grunge guitar.' },
    { id: 'why1',    text: 'So why does it work? Distortion adds tons of overtones.' },
    { id: 'why2',    text: 'Add a third, ratio five to four, and those overtones clash into mud.' },
    { id: 'why3',    text: 'The fifth, three to two, stays clean.' },
    { id: 'why4',    text: 'Even better: the two notes create a difference tone, one octave below the root.' },
    { id: 'why4b',   text: 'Three minus two is one. The chord reinforces its own bass.' },
    { id: 'why5',    text: "And with no third, it's neither happy nor sad. Just strong." },
    { id: 'why5b',   text: 'The singer or the riff decides the mood.' },
    { id: 'why6',    text: "On guitar, it's one shape you can slide anywhere on the neck." },
    { id: 'why7',    text: 'Classical counterpoint forbade parallel fifths.' },
    { id: 'why7b',   text: 'Medieval organum and rock are built on them.' },
    { id: 'essence', text: 'Drop the third, keep the fifth. Pure power, no mood.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ROCK’S FAVORITE CHORD', title: 'POWER CHORDS', accent: true, tonic: 0, min: 4.8 },
    { id: 'what', segs: ['what'], label: 'ROOT + FIFTH', title: 'C5 = C + G', tonic: 0, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'NO THIRD', title: 'NO MOOD', tonic: 0, tail: 0.7 },
    { id: 'kinks', segs: ['kinks'], label: 'YOU HEAR IT IN', title: 'You Really Got Me', sub: 'The Kinks · 1964', tonic: 9, row: ['A5', 'C5', 'D5', 'C5'], tail: 1.6 },
    { id: 'ramones', segs: ['ramones'], label: 'YOU HEAR IT IN', title: 'Blitzkrieg Bop', sub: 'Ramones · 1976', tonic: 2, row: ['D5', 'G5', 'A5', 'G5'], tail: 1.5 },
    { id: 'metal', segs: ['metal'], label: 'YOU HEAR IT IN', title: 'Metal and Grunge', sub: 'heavy guitar', tonic: 4, row: ['E5', 'G5', 'A5', 'E5'], tail: 1.7 },
    { id: 'why1', segs: ['why1'], label: 'DISTORTION', title: 'OVERTONES', circle: false, tonic: 0, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WITH A THIRD', title: 'MUD', circle: false, tonic: 0, tail: 0.7 },
    { id: 'why3', segs: ['why3'], label: 'WITH A FIFTH', title: 'CLEAN', circle: false, tonic: 0, tail: 0.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'A HIDDEN BASS', title: 'DIFFERENCE TONE', circle: false, tonic: 0, gap: 0.3, tail: 0.7 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'NEITHER HAPPY NOR SAD', title: 'JUST STRONG', tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'why6', segs: ['why6'], label: 'ON GUITAR', title: 'ONE SHAPE', tonic: 0, row: ['C5', 'D5', 'E5', 'G5', 'A5'], tail: 1.0 },
    { id: 'why7', segs: ['why7', 'why7b'], label: 'BREAKING THE RULES', title: 'PARALLEL FIFTHS', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'PURE POWER', accent: true, tonic: 0, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => a.T.midi(n);
    // power chord voicing: root (octave 3), fifth, root above, low root in the bass
    const ROOT = { C: 'C3', D: 'D3', E: 'E2', F: 'F2', G: 'G2', A: 'A2', Bb: 'Bb2', Eb: 'Eb3' };
    const pv = name => { const r = name.replace('5', ''), m = M(ROOT[r]); return { notes: [m, m + 7, m + 12], bass: m - 12 >= 36 ? m - 12 : m }; };
    const P = (name, t0, t1, o = {}) => a.ch(name, t0, t1, { ...pv(name), ...o });
    const eighths = (len, n = 8) => Array.from({ length: n }, (_, k) => ({ o: (k * len) / n, v: k % 2 ? 0.55 : 0.9 }));
    // a loop of power chords with a rock beat
    const riff = (names, t0, t1, o = {}) => {
      const len = (t1 - t0) / names.length;
      names.forEach((c, i) => P(c, t0 + i * len, t0 + (i + 1) * len, { row: o.rows === false ? null : i, vel: o.vel ?? 0.85, strikes: eighths(len, o.n ?? 8) }));
      const beats = names.length * (o.beats ?? 4), st = (t1 - t0) / beats;
      for (let i = 0; i < beats; i++) {
        const t = t0 + i * st;
        a.perc(i % 2 ? 'snare' : 'kick', t, 0.75); a.perc('hat', t, 0.3); a.perc('hat', t + st / 2, 0.25);
        if (o.double && i % 2 === 0) a.perc('kick', t + st / 2, 0.5);
      }
    };
    // "distorted" note: the note plus a stack of loud overtones
    const H = [0, 12, 19, 24, 28, 31, 34, 36];
    const dist = (n, t, dur, vel = 0.3) => H.forEach((h, k) => a.note(M(n) + h, t, dur, { vel: vel * Math.pow(0.72, k), show: false }));

    // ---- hook: C5 chugging, with the empty third marked (cover) ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'C', [0, 7], { popIn: { t0: 0.2, step: 0.15 } });
    P('C5', 0.3, h1 - 2.2, { vel: 0.8, strikes: eighths(h1 - 2.5, 12) });
    riff(['Bb5', 'C5'], h1 - 2.2, h1, { rows: false, n: 4, beats: 2, vel: 0.85 });
    for (let t = 0.3; t < h1 - 2.25; t += 0.42) { a.perc('kick', t, 0.6); a.perc('snare', t + 0.21, 0.45); }
    a.ring(['E'], 0.35, h1, { color: RED });
    a.ring(['Eb'], 0.35, h1, { color: RED });
    a.tag(0, 0.4, h1, 'ROOT + FIFTH · NO THIRD', { x: 540, y: 455, color: GOLD });

    // ---- what: C, then G, seven half steps up ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const tC = a.w('what', 'C') - 0.04, tG = a.w('what', 'G') - 0.04, tPow = a.w('what', 'power') - 0.04;
    a.note('C3', tC, 1.0, { vel: 0.4 });
    a.note('G3', tG, 1.0, { vel: 0.4 });
    a.tag('C', tC, w1, 'ROOT', { dr: -92, color: degColor(0) });
    a.arc('C', 'G', tG - 0.2, w1, { steps: 7, color: GOLD, dr: 30, label: '7 HALF STEPS', labelR: 165 });
    a.tag('G', tG, w1, 'FIFTH', { dr: -92, color: degColor(7) });
    P('C5', tPow, w1, { strikes: eighths(w1 - tPow, 8) });
    a.big('WRITTEN  C5', a.w('what', 'five') - 0.1, w1, { y: 462, size: 48, ...MONO, color: GOLD });
    function degColor(d) { return a.T.DEG12[d]; }

    // ---- what2: no third - neither major nor minor ----
    const x0 = S('what2').t0, x1 = S('what2').t1;
    P('C5', x0 + 0.05, x1, { vel: 0.7, strikes: eighths(x1 - x0, 6) });
    a.ring(['E', 'Eb'], a.w('what2', 'third') - 0.05, x1, { color: RED });
    a.tag(0, a.w('what2', 'major') - 0.05, a.w('what2', 'minor') - 0.05, 'NOT MAJOR', { x: 540, y: 462, color: RED });
    a.tag(0, a.w('what2', 'minor') - 0.05, x1, 'NOT MAJOR · NOT MINOR', { x: 540, y: 462, color: RED });

    // ---- songs: generic power-chord loops (not the songs' riffs) ----
    a.scale(S('kinks').t0, 'A', [0, 7]);
    riff(['A5', 'C5', 'D5', 'C5'], S('kinks').t0 + 0.05, S('kinks').t1, {});
    a.scale(S('ramones').t0, 'D', [0, 7]);
    riff(['D5', 'G5', 'A5', 'G5'], S('ramones').t0 + 0.05, S('ramones').t1, { double: true });
    a.scale(S('metal').t0, 'E', [0, 7]);
    riff(['E5', 'G5', 'A5', 'E5'], S('metal').t0 + 0.05, S('metal').t1, { n: 12, double: true, vel: 0.9 });

    // ---- why1: distortion adds overtones - the harmonics of a low C ----
    const o0 = S('why1').t0, o1 = S('why1').t1;
    const HC = [['C', '×1'], ['C', '×2'], ['G', '×3'], ['C', '×4'], ['E', '×5'], ['G', '×6']];
    const g1 = a.grid(HC.map(([l, s]) => ({ label: l, sub: s, color: l === 'G' ? TEAL : l === 'E' ? '#ffd84a' : PINK })),
      o0 + 0.1, o1, { rows: 2, cols: 3, cw: 260, chh: 190, y: 540, caption: 'OVERTONES OF ONE LOW C', revealStep: 0.06 });
    a.note('C3', o0 + 0.15, 1.2, { vel: 0.35, show: false });
    const tD = a.w('why1', 'Distortion') - 0.05;
    dist('C3', tD, o1 - tD - 0.1, 0.32);
    HC.forEach((_, i) => g1.active.push({ t0: a.w('why1', 'overtones') - 0.2 + i * 0.12, t1: o1, i }));
    a.big('MORE OVERTONES', a.w('why1', 'tons') - 0.05, o1, { y: 1080, size: 50, ...MONO, color: GOLD });

    // ---- why2: with a third (5:4) the overtones clash ----
    const m0 = S('why2').t0, m1 = S('why2').t1;
    a.lissajous(5, 4, m0 + 0.15, m1, { drawIn: 2.0, res: 4000, color: RED, drift: 0.9, labelA: 'E × 5', labelB: 'C × 4', colorA: RED, colorB: PINK });
    a.big('5 : 4', a.w('why2', 'five') - 0.05, m1, { y: 470, size: 72, ...MONO, color: RED });
    const tCl = a.w('why2', 'third') - 0.05;
    dist('C3', tCl, m1 - tCl - 0.1, 0.26); dist('E3', tCl, m1 - tCl - 0.1, 0.24);

    // ---- why3: the fifth (3:2) stays clean ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    a.lissajous(3, 2, c0 + 0.1, c1, { drawIn: 1.4, labelA: 'G × 3', labelB: 'C × 2', drift: 0.1 });
    a.big('3 : 2', c0 + 0.2, c1, { y: 470, size: 72, ...MONO, color: GOLD });
    dist('C3', c0 + 0.15, c1 - c0 - 0.3, 0.26); dist('G3', c0 + 0.15, c1 - c0 - 0.3, 0.24);

    // ---- why4: difference tone - 3 minus 2 is 1, an octave below the root ----
    const d0 = S('why4').t0, d1 = S('why4').t1;
    const g4 = a.grid([
      { label: '3', sub: 'G', color: TEAL, size: 80 }, { label: '2', sub: 'C', color: PINK, size: 80 }, { label: '1', sub: 'LOW C', color: GOLD, size: 80 },
    ], d0 + 0.1, d1, { rows: 1, cols: 3, cw: 280, chh: 230, y: 560, revealStep: 0.15 });
    const tDiff = a.w('why4', 'difference') - 0.05, tOct = a.w('why4', 'octave') - 0.05;
    a.ch('C5', d0 + 0.1, d1, { notes: ['C3', 'G3'], bass: false, vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: tDiff - d0 - 0.1, v: 0.8 }] });
    g4.active.push({ t0: d0 + 0.15, t1: d1, i: 0 }, { t0: d0 + 0.15, t1: d1, i: 1 });
    g4.active.push({ t0: tOct, t1: d1, i: 2 });
    a.note('C2', tOct, d1 - tOct - 0.1, { vel: 0.3, show: false });
    a.big('ONE OCTAVE BELOW', tOct, a.at('why4b') - 0.05, { y: 900, size: 52, ...MONO, color: GOLD });
    const t3 = a.w('why4b', 'Three') - 0.05;
    a.big('3 − 2 = 1', t3, d1, { y: 900, size: 96, ...MONO, color: GOLD, blur: 24 });
    a.note('C2', a.w('why4b', 'bass') - 0.05, 1.2, { vel: 0.35, show: false });

    // ---- why5: add E = happy, add Eb = sad, keep only the fifth = strong ----
    const j0 = S('why5').t0, j1 = S('why5').t1;
    const tHap = a.w('why5', 'happy') - 0.05, tSad = a.w('why5', 'sad') - 0.05, tStr = a.w('why5', 'strong') - 0.05;
    P('C5', j0 + 0.05, tHap, { vel: 0.7 });
    a.ch('C', tHap, tSad, { notes: ['C3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.75 });
    a.tag('E', tHap, tSad, 'HAPPY', { dr: -92, color: GOLD });
    a.ch('Cm', tSad, tStr, { notes: ['C3', 'G3', 'C4', 'Eb4'], bass: 'C2', vel: 0.75 });
    a.tag('Eb', tSad, tStr, 'SAD', { dr: -92, color: BLUE });
    P('C5', tStr, a.at('why5b') - 0.05, { vel: 0.95, strikes: eighths(1.2, 6) });
    a.big('JUST STRONG', tStr, a.at('why5b') - 0.05, { y: 462, size: 48, ...MONO, color: GOLD });
    // the singer decides: one line leaning major, then one leaning minor, over the same C5
    const v0 = a.w('why5b', 'singer') - 0.1, vl = (j1 - v0 - 0.2) / 2;
    P('C5', a.at('why5b') - 0.05, j1, { vel: 0.65, strikes: eighths(j1 - a.at('why5b'), 10) });
    a.melody([['E4', 1], ['D4', 1], ['E4', 1], ['G4', 2]], v0, vl / 6, { vel: 0.38 });
    a.melody([['Eb4', 1], ['D4', 1], ['Eb4', 1], ['C4', 2]], v0 + vl, vl / 6, { vel: 0.38 });
    a.tag(0, v0, v0 + vl, 'THE MELODY: MAJOR', { x: 540, y: 462, color: GOLD });
    a.tag(0, v0 + vl, j1, 'THE MELODY: MINOR', { x: 540, y: 462, color: BLUE });

    // ---- why6: one shape, slid anywhere ----
    const s0 = S('why6').t0 + 0.05, s1 = S('why6').t1;
    a.scale(S('why6').t0, 'C', [0, 7]);
    const SL = ['C5', 'D5', 'E5', 'G5', 'A5'], sl = (s1 - s0) / SL.length;
    SL.forEach((c, i) => P(c, s0 + i * sl, s0 + (i + 1) * sl, { row: i, strikes: eighths(sl, 6) }));
    a.walker(SL.map((c, i) => [s0 + i * sl, c.replace('5', '')]), { t1: s1, dr: 34, color: GOLD, label: 'SLIDE', labelDr: 82 });
    for (let t = s0; t < s1 - 0.1; t += sl / 2) { a.perc('kick', t, 0.6); a.perc('snare', t + sl / 4, 0.45); }

    // ---- why7: parallel fifths - forbidden in counterpoint, the core of organum and rock ----
    const p0 = S('why7').t0 + 0.1, pMid = a.at('why7b') - 0.05, p1 = S('why7').t1;
    const chant = ['D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4', 'D4'];
    const cl = (pMid - p0) / chant.length;
    chant.forEach((hi, i) => {
      const lo = M(hi) - 7;
      a.ch('C5', p0 + i * cl, p0 + (i + 1) * cl, { notes: [lo, M(hi)], bass: false, vel: 0.7, label: a.T.NAMES[lo % 12] + '5' });
    });
    a.big('FORBIDDEN', a.w('why7', 'forbade') - 0.05, pMid, { y: 462, size: 56, color: RED });
    a.tag(0, a.w('why7b', 'organum') - 0.05, a.w('why7b', 'rock') - 0.05, 'MEDIEVAL ORGANUM', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('why7b', 'rock') - 0.05, p1, 'ROCK', { x: 540, y: 462, color: GOLD });
    const rk = a.w('why7b', 'rock') - 0.05;
    riff(['E5', 'G5', 'A5', 'C5', 'D5', 'E5'], rk, p1, { rows: false, n: 4, beats: 2 });

    // ---- essence: the C5 riff with the empty third marked, landing on a big C5 ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1, eL = e0 + 3.6;
    riff(['C5', 'Bb5', 'F5', 'C5'], e0, eL, { rows: false, vel: 0.9 });
    P('C5', eL, e1 - 0.3, { vel: 1 });
    a.perc('kick', eL, 1); a.perc('snare', eL, 0.7);
    a.ring(['E', 'Eb'], a.w('essence', 'third') - 0.05, e1, { color: RED });
    a.ring(['G'], a.w('essence', 'fifth') - 0.05, e1, { color: GOLD });
    a.tag(0, a.w('essence', 'Pure'), e1, 'ROOT + FIFTH', { x: 540, y: 462, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
