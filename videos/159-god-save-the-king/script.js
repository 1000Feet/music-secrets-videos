// God Save the King: one public-domain melody that several nations sing as their own.
// Brief/copyright: only the first phrase is played (public domain, in G, 3/4):
// G G A | F#. G A | B B C | B. A G | A G F# | G. The harmony under it is our own simple one,
// and the second phrase is NEVER played as a melody: only our own generic 3/4 chords.
const MEL = [ // first phrase: [note, beats], 6 bars of 3/4
  [['G4', 1], ['G4', 1], ['A4', 1]],
  [['F#4', 1.5], ['G4', 0.5], ['A4', 1]],
  [['B4', 1], ['B4', 1], ['C5', 1]],
  [['B4', 1.5], ['A4', 0.5], ['G4', 1]],
  [['A4', 1], ['G4', 1], ['F#4', 1]],
  [['G4', 3]],
];
const HARM = [[['G', 3]], [['D', 3]], [['G', 2], ['C', 1]], [['Em', 3]], [['D7', 3]], [['G', 3]]];
const PHRASE2 = ['G', 'C', 'G', 'D', 'Em', 'C', 'D7', 'G']; // our own chords, no melody
const CH = {
  G: [['G3', 'B3', 'D4'], 'G2'], D: [['F#3', 'A3', 'D4'], 'D2'], C: [['G3', 'C4', 'E4'], 'C3'],
  Em: [['G3', 'B3', 'E4'], 'E2'], D7: [['F#3', 'A3', 'C4'], 'D2'],
};

module.exports = {
  slug: 'god-save-the-king',
  title: 'One Melody, Many Anthems',
  segments: [
    { id: 'hook',    text: 'One melody... and several countries sing it as their very own.' },
    { id: 'what',    text: 'This is God Save the King.' },
    { id: 'what2',   text: 'Its origin is unknown. It was first published in 1744.' },
    { id: 'us',      text: "In America, the same tune became My Country, 'Tis of Thee..." },
    { id: 'us2',     text: 'with lyrics by Samuel Francis Smith, in 1831.' },
    { id: 'lie',     text: "And Liechtenstein's national anthem, Oben am jungen Rhein, uses exactly the same melody." },
    { id: 'why0',    text: 'So why does it work?' },
    { id: 'why1',    text: "It's in three four time. Slow, stately, a dignified dance." },
    { id: 'why2',    text: 'The phrases are unusual. The first is six bars long, the second is eight.' },
    { id: 'why2b',   text: 'Not the usual four plus four.' },
    { id: 'why2c',   text: 'Fourteen bars in all.' },
    { id: 'why3',    text: 'The melody moves mostly by step, in a small range...' },
    { id: 'why3b',   text: 'so a whole crowd can sing it.' },
    { id: 'why4',    text: 'And a simple tune, with no rhythms tied to particular words...' },
    { id: 'why4b',   text: 'is easy to give new lyrics.' },
    { id: 'why4c',   text: 'So one melody can serve several countries.' },
    { id: 'essence', text: 'One simple, singable tune... and several nations sing it as their own.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE MELODY', title: 'MANY ANTHEMS', accent: true, tonic: 7, min: 4.6 },
    { id: 'what', segs: ['what'], label: 'THE MELODY', title: 'GOD SAVE THE KING', sub: 'in G · three four time', tonic: 7, lead: 0.1, min: 5.0 },
    { id: 'origin', segs: ['what2'], label: 'ORIGIN UNKNOWN', title: 'GOD SAVE THE KING', circle: false, tonic: 7, tail: 1.2 },
    { id: 'us', segs: ['us', 'us2'], label: 'YOU HEAR IT IN', title: "My Country, 'Tis of Thee", sub: 'Samuel Francis Smith · 1831', tonic: 7, gap: 0.3, min: 9.4 },
    { id: 'lie', segs: ['lie'], label: 'YOU HEAR IT IN', title: 'Oben am jungen Rhein', sub: 'Liechtenstein · national anthem', tonic: 7, min: 9.4 },
    { id: 'why1', segs: ['why0', 'why1'], label: 'WHY IT WORKS', title: 'THREE FOUR TIME', circle: false, tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'SIX PLUS EIGHT', circle: false, tonic: 7, gap: 0.3, tail: 1.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'STEP BY STEP', tonic: 7, gap: 0.3, min: 8.2 },
    { id: 'why4', segs: ['why4', 'why4b', 'why4c'], label: 'WHY IT WORKS', title: 'NEW WORDS', circle: false, tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE TUNE, MANY VOICES', accent: true, tonic: 7, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');

    // one 3/4 bar of chord: struck on 1, softer on 2 and 3
    function bar3(c, t, b, o = {}) {
      const [n, bs] = CH[c], len = 3 * b, end = o.end ?? t + len;
      a.ch(c, t, end, { notes: n, bass: bs, vel: o.vel ?? 0.42, hideName: o.hideName, shape: o.shape,
        strikes: [0, 1, 2].filter(k => t + k * b < end - 0.05).map(k => ({ o: k * b, v: k ? 0.45 : 1 })) });
    }
    // the first phrase (melody + our chords). Returns { end, pts, bars }
    function tune(t0, b, o = {}) {
      const pts = [], bars = [];
      let t = t0;
      MEL.forEach((bar, i) => {
        bars.push(t);
        let u = t;
        bar.forEach(([n, d]) => { if (o.melody !== false) a.note(n, u, d * b * 0.95, { vel: o.vel ?? 0.4 }); pts.push([u, n]); u += d * b; });
        u = t;
        HARM[i].forEach(([c, d]) => {
          const [n, bs] = CH[c];
          a.ch(c, u, u + d * b, { notes: n, bass: bs, vel: o.chVel ?? 0.36, hideName: o.hideName, shape: o.shape,
            strikes: [...Array(d).keys()].map(k => ({ o: k * b, v: k ? 0.4 : 1 })) });
          u += d * b;
        });
        t += 3 * b;
      });
      return { end: t, pts, bars };
    }
    const walk = (r, t1, o = {}) => a.walker(r.pts.map(([t, n]) => [t, pcOf(n)]), { t1, dr: -40, color: o.color ?? WHITE, label: o.label, labelDr: -46 });

    // ---- hook (cover) + what: the first phrase, in G ----
    a.scale(0.1, 'G', a.T.MAJOR, { popIn: { t0: 0.15, step: 0.05 } });
    const hk = tune(0.25, 0.5, { vel: 0.42 });
    walk(hk, S('what').t1 - 0.05);
    if (hk.end < S('what').t1 - 0.3) bar3('G', hk.end, Math.min(0.5, (S('what').t1 - hk.end) / 3), { end: S('what').t1 - 0.05, vel: 0.3 });
    a.big('GOD SAVE THE KING', 0.15, S('hook').t1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('ONE TUNE', a.at('what'), S('what').t1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });

    // ---- origin: unknown, first published in 1744 ----
    const o0 = S('origin').t0, o1 = S('origin').t1;
    const tPub = a.w('what2', 'published') - 0.05;
    const gO = a.grid([{ label: '?', sub: 'COMPOSER', size: 110, color: GREY }, { label: '1744', sub: 'FIRST PUBLISHED', size: 84, color: GOLD }],
      o0 + 0.1, o1, { rows: 1, cols: 2, cw: 440, chh: 320, y: 560, revealStep: 0.25 });
    gO.active.push({ t0: a.w('what2', 'origin') - 0.05, t1: tPub, i: 0 }, { t0: tPub, t1: o1, i: 1 });
    a.big('ORIGIN UNKNOWN', a.w('what2', 'unknown') - 0.05, tPub, { y: 960, size: 56, color: WHITE, blur: 14 });
    a.big('IN PRINT SINCE 1744', tPub, o1, { y: 960, size: 52, ...MONO, color: GOLD, blur: 12 });
    const ob = 0.5;
    ['G', 'C', 'D', 'G'].forEach((c, i) => { const t = o0 + 0.1 + i * 3 * ob; if (t < o1 - 0.3) bar3(c, t, ob, { end: Math.min(t + 3 * ob, o1 - 0.05), vel: 0.3, shape: false }); });

    // ---- us: My Country, 'Tis of Thee - the same tune ----
    const u0 = S('us').t0, u1 = S('us').t1;
    a.scale(u0, 'G', a.T.MAJOR);
    const ut = tune(u0 + 0.2, Math.min(0.45, (u1 - u0 - 0.5) / 18), { vel: 0.4 });
    walk(ut, u1);
    a.big('SAME TUNE', a.w('us', 'same') - 0.05, u1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.tag('G', ut.pts[ut.pts.length - 1][0], u1, 'HOME', { dr: -92, color: GOLD });

    // ---- lie: Liechtenstein's anthem - the same tune again ----
    const l0 = S('lie').t0, l1 = S('lie').t1;
    a.scale(l0, 'G', a.T.MAJOR);
    const lt = tune(l0 + 0.2, Math.min(0.45, (l1 - l0 - 0.5) / 18), { vel: 0.4 });
    walk(lt, l1);
    a.big('SAME TUNE', l0 + 0.2, l1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.tag('G', lt.pts[lt.pts.length - 1][0], l1, 'HOME', { dr: -92, color: GOLD });

    // ---- why1: three four time, slow and stately ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const g3 = a.grid([1, 2, 3].map((n, i) => ({ label: String(n), color: i ? TEAL : GOLD, size: i ? 80 : 100 })), w0 + 0.1, w1,
      { rows: 1, cols: 3, cw: 260, chh: 250, y: 540, revealStep: 0.12, caption: 'ONE BAR OF 3/4' });
    const tThree = a.w('why1', 'three') - 0.05, wb = 0.55;
    ['G', 'C', 'D', 'G', 'Em', 'D7', 'G'].forEach((c, i) => {
      const t = w0 + 0.15 + i * 3 * wb;
      if (t > w1 - 0.4) return;
      const end = Math.min(t + 3 * wb, w1 - 0.05);
      bar3(c, t, wb, { end, vel: 0.42, shape: false });
      [0, 1, 2].forEach(k => { if (t + k * wb < end - 0.05) g3.active.push({ t0: t + k * wb, t1: t + (k + 0.85) * wb, i: k }); });
    });
    a.big('3/4', tThree, a.w('why1', 'Slow') - 0.05, { y: 980, size: 150, color: TEAL, blur: 28 });
    a.big('SLOW · STATELY', a.w('why1', 'Slow') - 0.05, a.w('why1', 'dignified') - 0.05, { y: 980, size: 60, ...MONO, color: TEAL, blur: 12 });
    a.big('A DIGNIFIED DANCE', a.w('why1', 'dignified') - 0.05, w1, { y: 980, size: 60, color: GOLD, blur: 18 });

    // ---- why2: six bars, then eight - not four plus four ----
    const p0 = S('why2').t0, p1 = S('why2').t1, CW = 104, LX = 124;
    const cells = (n, col) => [...Array(n)].map((_, i) => ({ label: String(i + 1), size: 36, color: col }));
    const g6 = a.grid(cells(6, GOLD), p0 + 0.1, p1, { rows: 1, cols: 6, cw: CW, chh: 120, x: LX + 3 * CW, y: 520, revealStep: 0.06 });
    const tSec = a.w('why2', 'second') - 0.05;
    const g8 = a.grid(cells(8, TEAL), tSec, p1, { rows: 1, cols: 8, cw: CW, chh: 120, x: LX + 4 * CW, y: 720, revealStep: 0.06 });
    a.big('PHRASE 1 · 6 BARS', p0 + 0.1, p1, { x: LX + 3 * CW, y: 492, size: 30, ...MONO, color: GOLD, blur: 0 });
    a.big('PHRASE 2 · 8 BARS', tSec, p1, { y: 692, size: 30, ...MONO, color: TEAL, blur: 0 });
    // phrase 1: the real first phrase, one block per bar
    const pb = 0.32, pt = tune(p0 + 0.15, pb, { vel: 0.4, shape: false });
    pt.bars.forEach((t, i) => g6.active.push({ t0: t, t1: t + 3 * pb, i }));
    // phrase 2: our own chords only, counted one strike per bar
    const c0 = Math.max(pt.end, tSec + 0.1), cb = Math.min(0.42, (p1 - c0 - 0.2) / 8);
    PHRASE2.forEach((c, i) => {
      const t = c0 + i * cb;
      a.ch(c, t, t + cb, { notes: CH[c][0], bass: CH[c][1], vel: 0.4, shape: false });
      g8.active.push({ t0: t, t1: t + cb, i });
    });
    a.ch('G', c0 + 8 * cb, p1 - 0.05, { notes: CH.G[0], bass: CH.G[1], vel: 0.3, shape: false, hideName: true });
    const tNot = a.at('why2b') - 0.05;
    a.grid(cells(4, GREY), tNot, p1, { rows: 1, cols: 4, cw: CW, chh: 90, x: LX + 2 * CW - 12, y: 930, revealStep: 0.04 });
    a.grid(cells(4, GREY), tNot + 0.2, p1, { rows: 1, cols: 4, cw: CW, chh: 90, x: LX + 6 * CW + 12, y: 930, revealStep: 0.04 });
    a.big('USUAL: 4 + 4', tNot, p1, { y: 900, size: 30, ...MONO, color: GREY, blur: 0 });
    a.big('6 + 8', a.w('why2', 'eight') - 0.05, a.at('why2c') - 0.05, { y: 1100, size: 72, color: GOLD, blur: 20 });
    a.big('6 + 8 = 14', a.at('why2c') - 0.05, p1, { y: 1100, size: 72, color: GOLD, blur: 20 });

    // ---- why3: steps in a small range ----
    const s0 = S('why3').t0, s1 = S('why3').t1;
    a.scale(s0, 'G', a.T.MAJOR);
    const st = tune(s0 + 0.15, Math.min(0.42, (s1 - s0 - 0.5) / 18), { vel: 0.42 });
    walk(st, s1, { color: GOLD });
    const tSm = a.w('why3', 'small') - 0.05;
    a.arc('F#', 'C', tSm, s1, { steps: 6, color: TEAL, dr: 30 });
    a.big('MOSTLY STEPS', a.w('why3', 'step') - 0.05, tSm, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('SMALL RANGE', tSm, a.at('why3b') - 0.05, { y: 462, size: 46, ...MONO, color: TEAL, blur: 10 });
    a.big('EASY TO SING', a.at('why3b') - 0.05, s1, { y: 462, size: 46, ...MONO, color: TEAL, blur: 10 });

    // ---- why4: the same notes, new words ----
    const n0 = S('why4').t0, n1 = S('why4').t1;
    const gW = a.grid([
      { label: 'GOD SAVE THE KING', sub: 'FIRST PUBLISHED 1744', size: 46, subSize: 22, color: GOLD },
      { label: "MY COUNTRY, 'TIS OF THEE", sub: 'USA · 1831', size: 40, subSize: 22, color: BLUE },
      { label: 'OBEN AM JUNGEN RHEIN', sub: 'LIECHTENSTEIN', size: 44, subSize: 22, color: PINK },
    ], n0 + 0.1, n1, { rows: 3, cols: 1, cw: 860, chh: 165, y: 470, revealStep: 0.15 });
    const nt = tune(n0 + 0.15, Math.min(0.45, (n1 - n0 - 0.4) / 18), { vel: 0.4, shape: false });
    [[0, 0], [2, 1], [4, 2]].forEach(([bi, i]) => gW.active.push({ t0: nt.bars[bi], t1: bi < 4 ? nt.bars[bi + 2] : n1, i }));
    a.big('SAME NOTES · NEW WORDS', a.w('why4b', 'new') - 0.05, n1, { y: 1010, size: 44, ...MONO, color: WHITE, blur: 8 });

    // ---- essence: the tune once more, home on G ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'G', a.T.MAJOR);
    const et = tune(e0 + 0.15, Math.min(0.42, (e1 - e0 - 2.2) / 18), { vel: 0.42 });
    walk(et, e1, { color: GOLD });
    a.ch('G', et.end, e1 - 0.3, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.5 });
    a.ring(['G'], et.pts[et.pts.length - 1][0], e1, { color: GOLD });
    a.big('ONE SINGABLE TUNE', a.w('essence', 'singable') - 0.05, e1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
