// Dvořák's New World Largo, decoded: a homesick melody built from just five notes (major pentatonic).
// The English horn melody (public domain, as given in the brief) is played in D-flat major:
// mi sol sol, mi re do, re mi sol mi re = F Ab Ab, F Eb Db, Eb F Ab F Eb.
const BEAT = 0.55;
// [note, beats]
const MEL = [['F4', 1.5], ['Ab4', 0.5], ['Ab4', 2], ['F4', 1.5], ['Eb4', 0.5], ['Db4', 2],
  ['Eb4', 1], ['F4', 1], ['Ab4', 1], ['F4', 1], ['Eb4', 4]];
const MEL_BEATS = 16;
const PENTA = [0, 2, 4, 7, 9];

module.exports = {
  slug: 'new-world-largo',
  title: "Dvořák's New World Largo",
  segments: [
    { id: 'hook',    text: 'Five notes, played slowly... and suddenly everyone feels homesick.' },
    { id: 'what',    text: "This is the Largo from Dvořák's Ninth Symphony, From the New World." },
    { id: 'what2',   text: 'He wrote it while living in the United States.' },
    { id: 'what3',   text: 'It premiered at Carnegie Hall, New York, in December 1893.' },
    { id: 'play',    text: 'Here is the English horn solo.' },
    { id: 'song',    text: "In 1922, his student William Arms Fisher set words to it, as the song Goin' Home." },
    { id: 'why1',    text: 'So why does it feel like home? The melody only uses the major pentatonic scale.' },
    { id: 'why1b',   text: 'Five notes, no half steps, so nothing clashes. It sounds like a folk song.' },
    { id: 'why2',    text: 'Dvořák was deeply interested in African American spirituals,' },
    { id: 'why2b',   text: 'which his student Harry T. Burleigh sang for him, and in Native American music.' },
    { id: 'why3',    text: 'The English horn, a lower, darker oboe, gives it a warm, melancholy voice.' },
    { id: 'why4',    text: 'And the slow tempo, long held notes and simple steps feel like remembering home.' },
    { id: 'essence', text: 'Five notes, no clashes, a dark reed voice... and everyone feels homesick.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DVOŘÁK · 1893', title: 'THE NEW WORLD LARGO', accent: true, tonic: 1, min: 8 * BEAT + 1.4 },
    { id: 'what', segs: ['what', 'what2', 'what3'], label: 'SYMPHONY NO. 9', title: 'FROM THE NEW WORLD', circle: false, tonic: 1, gap: 0.35, tail: 0.8 },
    { id: 'play', segs: ['play'], label: 'THE ENGLISH HORN SOLO', title: 'THE LARGO', sub: 'Dvořák · 1893 · in Db major', tonic: 1, row: ['Db', 'Ab'], tail: MEL_BEATS * BEAT + 1.4 },
    { id: 'song', segs: ['song'], label: 'LATER, IN 1922', title: "GOIN' HOME", circle: false, tonic: 1, tail: 1.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'ONLY FIVE NOTES', tonic: 1, gap: 0.35, tail: 1.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'DVOŘÁK IN AMERICA', circle: false, tonic: 1, gap: 0.2, tail: 1.2 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE ENGLISH HORN', circle: false, tonic: 1, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'SLOW AND SIMPLE', tonic: 1, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'GOING HOME', accent: true, tonic: 1, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', AMBER = '#ffa45c', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n), pcOf = n => n.replace(/\d/, '');
    const CH = { Db: { notes: ['Ab2', 'Db3', 'F3'], bass: 'Db2' }, Ab: { notes: ['C3', 'Eb3', 'Ab3'], bass: 'Ab2' } };
    const BARCH = ['Db', 'Db', 'Db', 'Ab'];

    // the melody from t0; returns { end, pts }
    function largo(t0, o = {}) {
      let t = t0; const pts = [], list = o.list || MEL, sh = o.shift ?? 0;
      for (const [n, b] of list) {
        a.note(midi(n) + sh, t, b * (o.beat ?? BEAT) * 0.95, { vel: o.vel ?? 0.36, show: o.show ?? true });
        pts.push([t, a.T.NAMES[a.T.mod(midi(n) + sh, 12)]]);
        t += b * (o.beat ?? BEAT);
      }
      return { end: t, pts };
    }
    // soft held chords, one per bar of 4 beats
    function pad(t0, bars, o = {}) {
      for (let k = 0; k < bars; k++) {
        const name = o.chords ? o.chords[k % o.chords.length] : BARCH[k % 4], t = t0 + k * 4 * BEAT;
        a.ch(name, t, t + 4 * BEAT, { ...CH[name], vel: o.vel ?? 0.32, row: name === 'Db' ? 0 : 1, shape: o.shape ?? true, hideName: o.hideName,
          strikes: [{ o: 0, v: 1 }, { o: 2 * BEAT, v: 0.45 }] });
      }
      return t0 + bars * 4 * BEAT;
    }
    const dbTag = (t0, t1) => a.tag('C#', t0, t1, 'Db', { dr: -92, color: GOLD });

    // ---- hook: the pentatonic pops in, the first phrase plays (cover) ----
    a.scale(0.15, 'Db', PENTA, { popIn: { t0: 0.2, step: 0.1 } });
    pad(0.3, 3, { vel: 0.3, chords: ['Db', 'Db', 'Db'] });
    const h = largo(0.35, { list: MEL.slice(0, 6), vel: 0.34 });
    a.walker(h.pts, { t1: S('hook').t1, dr: -40, color: AMBER });
    a.ring(['Db', 'Eb', 'F', 'Ab', 'Bb'], 0.35, S('hook').t1, { color: AMBER });
    a.tag(0, 0.4, S('hook').t1, '5 NOTES', { x: 540, y: 455, color: AMBER });

    // ---- what: Largo / USA / 1893 ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const g1 = a.grid([
      { label: 'LARGO', sub: 'SLOW', color: AMBER, size: 50, subSize: 24 },
      { label: 'USA', sub: 'WRITTEN THERE', color: BLUE, size: 56, subSize: 22 },
      { label: '1893', sub: 'CARNEGIE HALL', color: GOLD, size: 56, subSize: 22 },
    ], w0 + 0.1, w1, { rows: 1, cols: 3, cw: 320, chh: 240, y: 600, revealStep: 0.2 });
    const tL = a.w('what', 'Largo') - 0.05, tU = a.w('what2', 'United') - 0.05, tC = a.w('what3', 'Carnegie') - 0.05;
    g1.active.push({ t0: tL, t1: tU, i: 0 }, { t0: tU, t1: tC, i: 1 }, { t0: tC, t1: w1, i: 2 });
    a.big('NEW YORK · DECEMBER 1893', a.w('what3', 'December') - 0.05, w1, { y: 960, size: 40, color: '#ffffff', ...MONO, blur: 8 });
    pad(w0 + 0.1, Math.floor((w1 - w0 - 0.3) / (4 * BEAT)), { vel: 0.24, shape: false });

    // ---- play: the whole English horn phrase ----
    const p0 = a.end('play') + 0.3, p1 = S('play').t1;
    a.ch('Db', S('play').t0 + 0.1, p0, { ...CH.Db, vel: 0.25, row: 0 });
    a.scale(S('play').t0, 'Db', PENTA);
    const pe = pad(p0, 4, { vel: 0.3, hideName: true });
    const pm = largo(p0, { vel: 0.4 });
    a.walker(pm.pts, { t1: p1, dr: -40, color: AMBER });
    // solfege under the circle, one group at a time
    const SOLF = [['mi · sol · sol', 0, 4], ['mi · re · do', 4, 8], ['re · mi · sol · mi · re', 8, 16]];
    SOLF.forEach(([txt, b0, b1]) => a.tag(0, p0 + b0 * BEAT, p0 + b1 * BEAT, txt, { x: 540, y: 830, color: AMBER }));
    a.ch('Db', pe, p1 - 0.1, { notes: ['Ab2', 'Db3', 'F3', 'Ab3'], bass: 'Db2', vel: 0.4, row: 0 });
    dbTag(p0 + 6 * BEAT, p1);

    // ---- song: Goin' Home, 1922 ----
    const s0 = S('song').t0, s1 = S('song').t1;
    a.big('1922', s0 + 0.2, s1, { y: 660, size: 180, color: AMBER, blur: 36 });
    a.big('WILLIAM ARMS FISHER', a.w('song', 'William') - 0.05, s1, { y: 830, size: 40, color: '#ffffff', ...MONO, blur: 8 });
    a.big('+ WORDS = A SONG', a.w('song', 'song') - 0.05, s1, { y: 910, size: 40, color: GOLD, ...MONO, blur: 8 });
    pad(s0 + 0.1, Math.floor((s1 - s0 - 0.3) / (4 * BEAT)), { vel: 0.22, shape: false });
    largo(s0 + 0.1 + 4 * BEAT, { list: MEL.slice(0, 6), vel: 0.22, shift: 12, show: false });

    // ---- why1: major scale -> drop the two half steps -> pentatonic ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    a.scale(y0, 'Db', a.T.MAJOR);
    a.ch('Db', y0 + 0.1, y1, { ...CH.Db, vel: 0.22, shape: false });
    const tMaj = a.w('why1', 'melody') - 0.05, tPen = a.w('why1', 'pentatonic') - 0.05;
    // the major scale's two half steps: F-Gb and C-Db
    a.arc('F', 'F#', tMaj, tPen + 1.0, { steps: 1, color: RED, dr: 34 });
    a.arc('C', 'C#', tMaj, tPen + 1.0, { steps: 1, color: RED, dr: 34 });
    a.tag('F#', tMaj, tPen + 1.0, 'Gb', { dr: -92, color: RED });
    a.tag(0, tMaj, tPen + 1.0, '2 HALF STEPS', { x: 540, y: 830, color: RED });
    [0, 2, 4, 5, 7, 9, 11, 12].forEach((d, i) => a.note(61 + d, tMaj + i * 0.14, 0.3, { vel: 0.24 }));
    a.scale(tPen, 'Db', PENTA);
    a.poly(['Db', 'Eb', 'F', 'Ab', 'Bb'], tPen + 0.3, y1, { color: AMBER, closed: true });
    const n5 = a.w('why1b', 'Five') - 0.05;
    ['Db4', 'Eb4', 'F4', 'Ab4', 'Bb4'].forEach((n, i) => a.note(n, n5 + i * 0.16, 0.5, { vel: 0.28 }));
    a.tag(0, a.w('why1b', 'half') - 0.05, a.w('why1b', 'folk') - 0.05, 'NO HALF STEPS', { x: 540, y: 455, color: TEAL });
    a.tag(0, a.w('why1b', 'folk') - 0.05, y1, 'LIKE A FOLK SONG', { x: 540, y: 455, color: AMBER });
    dbTag(tPen + 0.3, y1);
    largo(a.w('why1b', 'clashes') + 0.2, { list: MEL.slice(0, 6), vel: 0.28 });

    // ---- why2: spirituals and Native American music ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const g2 = a.grid([
      { label: 'SPIRITUALS', sub: 'AFRICAN AMERICAN', color: AMBER, size: 44, subSize: 22 },
      { label: 'NATIVE', sub: 'AMERICAN MUSIC', color: TEAL, size: 54, subSize: 22 },
    ], z0 + 0.1, z1, { rows: 1, cols: 2, cw: 470, chh: 250, y: 600, revealStep: 0.25 });
    const tSp = a.w('why2', 'spirituals') - 0.05, tNa = a.w('why2b', 'Native') - 0.05;
    g2.active.push({ t0: tSp, t1: tNa, i: 0 }, { t0: tNa, t1: z1, i: 1 });
    a.big('SUNG BY HARRY T. BURLEIGH', a.w('why2b', 'Harry') - 0.05, tNa, { y: 940, size: 36, color: '#ffffff', ...MONO, blur: 8 });
    pad(z0 + 0.1, Math.floor((z1 - z0 - 0.3) / (4 * BEAT)), { vel: 0.22, shape: false, chords: ['Db', 'Ab'] });

    // ---- why3: oboe vs English horn ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    const g3 = a.grid([
      { label: 'OBOE', sub: 'HIGHER · BRIGHTER', color: GREY, size: 56, subSize: 22 },
      { label: 'ENGLISH HORN', sub: 'LOWER · DARKER', color: AMBER, size: 40, subSize: 22 },
    ], c0 + 0.1, c1, { rows: 1, cols: 2, cw: 470, chh: 250, y: 600, revealStep: 0.25 });
    const tOb = a.w('why3', 'oboe') - 0.05, tWarm = a.w('why3', 'warm') - 0.05;
    g3.active.push({ t0: c0 + 0.2, t1: tOb, i: 1 }, { t0: tOb, t1: tOb + 1.6, i: 0 }, { t0: tOb + 1.6, t1: c1, i: 1 });
    largo(tOb, { list: MEL.slice(0, 3), vel: 0.24, shift: 12, beat: 0.4 });
    largo(tOb + 1.6, { list: MEL.slice(0, 6), vel: 0.34 });
    pad(tOb + 1.6, 2, { vel: 0.24, shape: false, chords: ['Db', 'Db'] });
    a.big('WARM · MELANCHOLY', tWarm, c1, { y: 940, size: 50, color: AMBER, ...MONO, blur: 14 });

    // ---- why4: slow, long, stepwise ----
    const v0 = S('why4').t0, v1 = S('why4').t1;
    a.scale(v0, 'Db', PENTA);
    const vm = largo(v0 + 0.2, { vel: 0.34, beat: 0.6 });
    pad(v0 + 0.2, 4, { vel: 0.26 });
    a.walker(vm.pts, { t1: v1, dr: -40, color: AMBER });
    const vt = [['SLOW', 'slow'], ['LONG NOTES', 'long'], ['SMALL STEPS', 'steps'], ['HOME', 'home']];
    vt.forEach(([txt, w], i) => a.tag(0, a.w('why4', w) - 0.05, i < 3 ? a.w('why4', vt[i + 1][1]) - 0.05 : v1, txt, { x: 540, y: 455, color: i === 3 ? GOLD : AMBER }));
    dbTag(v0 + 0.3, v1);

    // ---- essence: the phrase once more, home on Db ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'Db', PENTA);
    const em = largo(e0 + 0.15, { vel: 0.34, list: MEL.slice(0, 6) });
    pad(e0 + 0.15, 2, { vel: 0.28, chords: ['Db', 'Db'] });
    a.walker(em.pts, { t1: em.end + 0.6, dr: -40, color: AMBER });
    a.ch('Db', em.end, e1 - 0.3, { notes: ['Ab2', 'Db3', 'F3', 'Ab3', 'Db4'], bass: 'Db2', vel: 0.55, row: 0 });
    a.note('F4', em.end, 2.4, { vel: 0.3 });
    a.ring(['Db', 'Eb', 'F', 'Ab', 'Bb'], em.end, e1, { color: AMBER });
    dbTag(em.end, e1);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
