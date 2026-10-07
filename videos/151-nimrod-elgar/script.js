// Nimrod and the Enigma Variations: fourteen musical portraits of friends, and a riddle never solved.
// Brief/copyright: Elgar's melodies (the Enigma theme, Nimrod) are NOT reconstructed. Every scene plays
// E flat major chords and our OWN slow, hymn-like theme (stepwise, original), shaped into a slow swell.
const B = 0.36;   // one beat of our slow theme
// our own slow theme in E flat: bars of [melody [[note, beats]...], chord]
const THEME = [
  [[['Bb4', 2], ['C5', 1], ['Bb4', 1]], 'Eb'],
  [[['G4', 3], ['F4', 1]], 'Cm'],
  [[['Eb4', 1], ['F4', 1], ['G4', 1], ['Ab4', 1]], 'Ab'],
  [[['Bb4', 4]], 'Bb'],
  [[['C5', 2], ['Eb5', 1], ['D5', 1]], 'Ab'],
  [[['C5', 1], ['Bb4', 1], ['Ab4', 1], ['F4', 1]], 'Bb7'],
  [[['Eb4', 4]], 'Eb'],
];
const CH = { Eb: [['Eb3', 'G3', 'Bb3'], 'Eb2'], Cm: [['Eb3', 'G3', 'C4'], 'C2'], Ab: [['Eb3', 'Ab3', 'C4'], 'Ab2'], Bb: [['D3', 'F3', 'Bb3'], 'Bb2'], Bb7: [['D3', 'F3', 'Ab3'], 'Bb2'] };
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

module.exports = {
  slug: 'nimrod-elgar',
  title: 'Nimrod and the Enigma Variations',
  segments: [
    { id: 'hook',     text: 'Fourteen pieces of music... each one a portrait of a friend.' },
    { id: 'what',     text: "This is Edward Elgar's Enigma Variations, from 1899: a theme and fourteen variations." },
    { id: 'what2',    text: 'Each one portrays someone close to him: friends, his wife, and finally himself.' },
    { id: 'nimrod',   text: 'Variation nine, Nimrod, portrays his friend and publisher, Augustus Jaeger.' },
    { id: 'hunter',   text: 'Jäger means hunter in German... and Nimrod is the mighty hunter of the Bible.' },
    { id: 'cenotaph', text: "In Britain, it's often played at remembrance ceremonies, such as at the Cenotaph." },
    { id: 'why1',     text: 'So why does it work? First, the enigma.' },
    { id: 'why1b',    text: 'Elgar hinted that another well known theme goes with his main theme, without being played.' },
    { id: 'why1c',    text: 'He never revealed which one. People still debate it.' },
    { id: 'why2',     text: 'Nimrod itself is slow, in E flat major.' },
    { id: 'why2b',    text: 'It grows from very quiet to a powerful climax... then fades away.' },
    { id: 'why3',     text: 'And each variation changes rhythm, tempo and character to suggest a personality.' },
    { id: 'essence',  text: 'Fourteen friends, one theme, and a riddle. Music as a photo album.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EDWARD ELGAR · 1899', title: 'ENIGMA VARIATIONS', accent: true, circle: false, tonic: 3, min: 0.3 + 16 * B + 0.5 },
    { id: 'what', segs: ['what', 'what2'], label: 'A THEME + 14 VARIATIONS', title: 'MUSICAL PORTRAITS', circle: false, tonic: 3, gap: 0.35, tail: 0.8 },
    { id: 'nimrod', segs: ['nimrod', 'hunter'], label: 'VARIATION IX', title: 'NIMROD', sub: 'Elgar · 1899 · in Eb', tonic: 3, gap: 0.35, tail: 0.9 },
    { id: 'cenotaph', segs: ['cenotaph'], label: 'IN BRITAIN', title: 'REMEMBRANCE', circle: false, tonic: 3, tail: 1.4 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'THE ENIGMA', circle: false, tonic: 3, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'SLOW · E FLAT', tonic: 3, tail: 0.6 },
    { id: 'swell', segs: ['why2b'], label: 'NIMROD', title: 'THE SLOW SWELL', circle: false, tonic: 3, tail: 2.6 },
    { id: 'why3', segs: ['why3'], label: 'VARIATIONS', title: 'AS PORTRAITS', circle: false, tonic: 3, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A PHOTO ALBUM', accent: true, tonic: 3, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');

    // our theme, bars [from, to); chords under every bar; returns { end, pts }
    function theme(t0, b = B, o = {}) {
      const from = o.from ?? 0, to = o.to ?? THEME.length, pts = [];
      let t = t0;
      for (let i = from; i < to; i++) {
        const [mel, c] = THEME[i], [notes, bass] = CH[c];
        const v = typeof o.vel === 'function' ? o.vel(i) : (o.vel ?? 0.5);
        a.ch(c, t, t + 4 * b, { notes, bass, vel: v * 0.8, shape: o.shape, hideName: o.hideName, strikes: [{ o: 0, v: 1 }, { o: 2 * b, v: 0.45 }] });
        let u = t;
        mel.forEach(([n, d]) => { a.note(n, u, d * b * 0.95, { vel: v * 0.7, show: o.show ?? false }); pts.push([u, pcOf(n)]); u += d * b; });
        t += 4 * b;
      }
      return { end: t, pts };
    }

    // ---------- hook (cover): the album of portraits, a slow theme underneath ----------
    const cells = [{ label: 'THEME', size: 40, color: GOLD }].concat(ROMAN.map((r, i) => ({
      label: r, size: 50, color: i === 8 ? PINK : i === 13 ? LILAC : TEAL, sub: i === 8 ? 'NIMROD' : i === 13 ? 'HIMSELF' : undefined, subSize: 18,
    })));
    const gA = a.grid(cells, 0.05, S('what').t1, { rows: 3, cols: 5, cw: 196, chh: 150, y: 470, revealStep: 0.035 });
    const h = theme(0.3, B, { to: 4, vel: 0.5, shape: false });
    // a slow sweep through the portraits
    for (let i = 0; i < 15; i++) gA.active.push({ t0: 0.3 + i * 0.36, t1: 0.3 + i * 0.36 + 0.9, i });
    a.ch('Eb', h.end, S('hook').t1, { notes: CH.Eb[0], bass: 'Eb2', vel: 0.35, shape: false });
    a.big('14 PORTRAITS', 0.2, S('hook').t1, { y: 1010, size: 64, color: WHITE, blur: 16 });
    a.big('OF FRIENDS', 0.35, S('hook').t1, { y: 1090, size: 40, ...MONO, color: GOLD, blur: 6 });

    // ---------- what: theme + 14, then friends / wife / himself ----------
    const tTh = a.w('what', 'theme') - 0.05, tFo = a.w('what', 'fourteen') - 0.05;
    gA.active.push({ t0: tTh, t1: tFo, i: 0 });
    for (let i = 1; i < 15; i++) gA.active.push({ t0: tFo + (i - 1) * 0.07, t1: a.at('what2'), i });
    const tFr = a.w('what2', 'friends') - 0.05, tWi = a.w('what2', 'wife') - 0.05, tHi = a.w('what2', 'himself') - 0.05;
    gA.active.push({ t0: tHi, t1: S('what').t1, i: 14 });
    a.big('THEME + 14', tTh, a.at('what2'), { y: 1030, size: 64, color: GOLD, blur: 16 });
    a.big('FRIENDS', tFr, S('what').t1, { y: 1000, size: 46, ...MONO, color: TEAL, blur: 6 });
    a.big('HIS WIFE', tWi, S('what').t1, { y: 1060, size: 46, ...MONO, color: PINK, blur: 6 });
    a.big('HIMSELF', tHi, S('what').t1, { y: 1120, size: 46, ...MONO, color: LILAC, blur: 6 });
    theme(S('what').t0 + 0.05, (S('what').t1 - S('what').t0 - 0.1) / 12, { from: 4, to: 7, vel: 0.35, shape: false });
    // (the last bar stretches over the rest of the scene)

    // ---------- nimrod: Variation IX, in E flat ----------
    a.scale(S('nimrod').t0, 'Eb', a.T.MAJOR, { popIn: { t0: S('nimrod').t0 + 0.1, step: 0.06 } });
    const nb = (S('nimrod').t1 - S('nimrod').t0 - 0.2) / 28;
    const nm = theme(S('nimrod').t0 + 0.1, nb, { vel: 0.42, show: true });
    a.walker(nm.pts, { t1: S('nimrod').t1, dr: -40, color: GOLD });
    const tAu = a.w('nimrod', 'Augustus') - 0.05, tHu = a.w('hunter', 'means') - 0.3, tMi = a.w('hunter', 'mighty') - 0.05;
    a.tag(0, a.w('nimrod', 'friend') - 0.05, tAu, 'FRIEND · PUBLISHER', { x: 540, y: 462, color: TEAL });
    a.tag(0, tAu, tHu, 'AUGUSTUS JAEGER', { x: 540, y: 462, color: GOLD });
    a.tag(0, tHu, tMi, 'JÄGER = HUNTER', { x: 540, y: 462, color: TEAL });
    a.tag(0, tMi, S('nimrod').t1, 'NIMROD = MIGHTY HUNTER', { x: 540, y: 462, color: PINK });

    // ---------- cenotaph: remembrance ----------
    const c0 = S('cenotaph').t0, c1 = S('cenotaph').t1;
    a.grid([{ label: 'IX', sub: 'NIMROD', size: 96, subSize: 26, color: WHITE }], c0 + 0.1, c1, { rows: 1, cols: 1, cw: 300, chh: 380, y: 470 });
    a.big('REMEMBRANCE CEREMONIES', a.w('cenotaph', 'remembrance') - 0.05, c1, { y: 950, size: 44, ...MONO, color: WHITE, blur: 6 });
    a.big('THE CENOTAPH', a.w('cenotaph', 'Cenotaph') - 0.05, c1, { y: 1050, size: 72, color: GOLD, blur: 20 });
    theme(c0 + 0.1, (c1 - c0 - 0.3) / 16, { from: 4, to: 7, vel: 0.28, shape: false });
    a.ch('Eb', c0 + 0.1 + 12 * (c1 - c0 - 0.3) / 16, c1, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4'], bass: 'Eb2', vel: 0.25, shape: false });

    // ---------- why1: the enigma - a hidden theme that "goes" with the main one ----------
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const gE = a.grid([{ label: 'MAIN THEME', sub: 'PLAYED', size: 44, color: GOLD }, { label: '?', sub: 'NEVER PLAYED', size: 110, color: GREY }],
      y0 + 0.1, y1, { rows: 1, cols: 2, cw: 420, chh: 300, y: 500, revealStep: 0.15 });
    const tMa = a.w('why1b', 'main') - 0.05, tAn = a.w('why1b', 'another') - 0.05, tNe = a.w('why1c', 'never') - 0.05, tDe = a.w('why1c', 'debate') - 0.05;
    gE.active.push({ t0: a.w('why1', 'enigma') - 0.05, t1: tAn, i: 1 }, { t0: tAn, t1: tMa, i: 1 }, { t0: tMa, t1: y1, i: 0 });
    for (let t = tNe; t < y1 - 0.3; t += 0.9) gE.active.push({ t0: t, t1: t + 0.45, i: 1 });
    a.big('+', tAn, y1, { y: 650, size: 80, color: WHITE, blur: 10 });
    a.big('AN ENIGMA', a.w('why1', 'enigma') - 0.05, tAn, { y: 920, size: 72, color: GOLD, blur: 20 });
    a.big('IT "GOES" WITH IT', tAn + 0.4, tNe, { y: 920, size: 50, ...MONO, color: WHITE, blur: 8 });
    a.big('NEVER REVEALED', tNe, y1, { y: 920, size: 64, color: RED, blur: 18 });
    a.big('STILL DEBATED', tDe, y1, { y: 1010, size: 44, ...MONO, color: GREY, blur: 4 });
    theme(y0 + 0.1, (y1 - y0 - 0.3) / 28, { vel: 0.3, shape: false });

    // ---------- why2: slow, E flat major ----------
    a.scale(S('why2').t0, 'Eb');
    const tEb = a.w('why2', 'E') - 0.05, tSl = a.w('why2', 'slow') - 0.05;
    a.ch('Eb', S('why2').t0 + 0.1, tEb, { notes: ['Eb3', 'G3', 'Bb3'], bass: 'Eb2', vel: 0.4 });
    a.ch('Eb', tEb, S('why2').t1, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4'], bass: 'Eb2', vel: 0.55, snap: true });
    a.ring(['Eb'], tEb, S('why2').t1, { color: GOLD });
    a.tag('Eb', tEb, S('why2').t1, 'HOME', { color: GOLD, dr: -92 });
    a.tag(0, tSl, S('why2').t1, 'SLOW', { x: 540, y: 462, color: TEAL });
    [['G4', 0], ['Bb4', 0.5], ['Eb5', 1.0]].forEach(([n, u]) => a.note(n, tEb + u, 1.4, { vel: 0.26 }));

    // ---------- swell: very quiet -> powerful climax -> fades away (bar chart of loudness) ----------
    const s0 = S('swell').t0, s1 = S('swell').t1;
    const DYN = ['pp', 'p', 'mp', 'mf', 'f', 'ff', 'f', 'p', 'pp'];
    const HGT = [70, 110, 160, 220, 290, 360, 290, 140, 70];
    const VEL = [0.12, 0.2, 0.3, 0.45, 0.62, 0.85, 0.6, 0.28, 0.13];
    const sb = (s1 - s0 - 0.3) / (9 * 4);
    const bars = HGT.map((hh, i) => a.grid([{ label: DYN[i], size: 36, color: i === 5 ? GOLD : i > 5 ? BLUE : TEAL }],
      s0 + 0.1 + i * 0.05, s1, { rows: 1, cols: 1, cw: 110, chh: hh, x: 540 + (i - 4) * 112, y: 880 - hh }));
    const SW = [0, 1, 2, 3, 4, 4, 5, 6, 6];   // which theme bar plays during each loudness step
    for (let i = 0; i < 9; i++) {
      const t = s0 + 0.1 + i * 4 * sb;
      const [mel, c] = THEME[SW[i]], [notes, bass] = CH[c];
      a.ch(c, t, t + 4 * sb, { notes: i === 5 ? [...notes, notes[0].replace('3', '4')] : notes, bass, vel: VEL[i], shape: false, strikes: [{ o: 0, v: 1 }, { o: 2 * sb, v: 0.5 }] });
      let u = t; mel.forEach(([n, d]) => { a.note(n, u, d * sb * 0.95, { vel: VEL[i] * 0.75, show: false }); u += d * sb; });
      bars[i].active.push({ t0: t, t1: i === 5 ? s1 : t + 4 * sb + 0.2, i: 0 });
    }
    a.big('VERY QUIET', s0 + 0.3, a.w('why2b', 'powerful') - 0.05, { y: 960, size: 44, ...MONO, color: TEAL, blur: 4 });
    a.big('CLIMAX', a.w('why2b', 'climax') - 0.05, a.w('why2b', 'fades') - 0.05, { y: 960, size: 64, color: GOLD, blur: 22 });
    a.big('FADES AWAY', a.w('why2b', 'fades') - 0.05, s1, { y: 960, size: 44, ...MONO, color: BLUE, blur: 4 });

    // ---------- why3: rhythm, tempo, character -> a personality ----------
    const p0 = S('why3').t0, p1 = S('why3').t1;
    const gP = a.grid([{ label: 'RHYTHM', size: 44, color: TEAL }, { label: 'TEMPO', size: 44, color: GOLD }, { label: 'CHARACTER', size: 36, color: PINK }],
      p0 + 0.1, p1, { rows: 1, cols: 3, cw: 320, chh: 220, y: 520, revealStep: 0.12 });
    const tR = a.w('why3', 'rhythm') - 0.05, tT = a.w('why3', 'tempo') - 0.05, tC = a.w('why3', 'character') - 0.05, tPe = a.w('why3', 'personality') - 0.05;
    // the same opening bar three ways: dotted rhythm, twice as fast, then bold in the low register
    const M1 = THEME[0][0];
    const dotted = [['Bb4', 1.5], ['C5', 0.5], ['Bb4', 1.5], ['G4', 0.5]];
    const tAfter = a.end('why3') + 0.2;
    gP.active.push({ t0: tR, t1: tT, i: 0 }, { t0: tT, t1: tC, i: 1 }, { t0: tC, t1: tPe, i: 2 });
    a.ch('Eb', p0 + 0.1, tAfter, { notes: CH.Eb[0], bass: 'Eb2', vel: 0.25, shape: false });
    a.melody(dotted, tR, 0.2, { vel: 0.3, show: false });
    a.melody([...M1, ...M1].map(([n, d]) => [n, d / 2]), tT, 0.2, { vel: 0.3, show: false });
    // in the tail: three quick portraits, one after another
    const pb = (p1 - tAfter - 0.2) / 3;
    [[dotted, 'Eb', 0], [[...M1, ...M1].map(([n, d]) => [n, d / 2]), 'Ab', 1], [[['Bb3', 1], ['G3', 1], ['Eb3', 2]], 'Cm', 2]].forEach(([mel, c, k]) => {
      const t = tAfter + k * pb;
      a.melody(mel, t, pb / 4, { vel: 0.4, show: false });
      a.ch(c, t, t + pb, { notes: CH[c][0], bass: CH[c][1], vel: 0.4, shape: false, strikes: k === 1 ? [0, 1, 2, 3].map(j => ({ o: j * pb / 4, v: j ? 0.6 : 1 })) : [{ o: 0, v: 1 }] });
      gP.active.push({ t0: t, t1: t + pb, i: k });
    });
    a.big('A PERSONALITY', tPe, p1, { y: 900, size: 64, color: WHITE, blur: 18 });

    // ---------- essence: the theme once more, swelling, then home ----------
    a.scale(S('essence').t0, 'Eb');
    const e0 = S('essence').t0 + 0.1, eb = Math.min(0.3, (a.at('cta') - e0) / 24);
    const ev = [0.3, 0.38, 0.48, 0.6, 0.75, 0.6, 0.45];
    const em = theme(e0, eb, { to: 6, vel: i => ev[i], show: true });
    a.walker(em.pts, { t1: em.end + 0.4, dr: -40, color: GOLD });
    a.ch('Eb', em.end, S('essence').t1 - 0.3, { notes: ['Eb3', 'G3', 'Bb3', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.55 });
    a.note('Eb4', em.end, 2.4, { vel: 0.3, show: false });
    a.ring(['Eb', 'G', 'Bb'], em.end, S('essence').t1, { color: GOLD });
    a.tag(0, a.w('essence', 'Fourteen') - 0.05, a.w('essence', 'riddle') - 0.05, '14 FRIENDS · 1 THEME', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('essence', 'riddle') - 0.05, S('essence').t1, '+ A RIDDLE', { x: 540, y: 462, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
