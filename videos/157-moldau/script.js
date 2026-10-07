// The Moldau: a symphonic poem that follows a river, from two springs to Prague.
// Brief/copyright: Smetana's melodies are NOT reconstructed. We play generic E minor chords with our
// own flowing sixteenth-note patterns (two flute-like streams), our own short horn call, a generic
// polka oom-pah, soft high chords, fast runs, and our own broad song-like line (minor, then major).
const E8 = 0.25, SX = E8 / 2, BAR = 6 * E8; // 6/8: a bar of six eighths, flowing in sixteenths
// our flowing wave, 12 sixteenths per bar, per chord
const WAVE = {
  Em: ['E4', 'F#4', 'G4', 'B4', 'E5', 'B4', 'G4', 'B4', 'E5', 'G5', 'E5', 'B4'],
  C: ['E4', 'G4', 'C5', 'E5', 'G5', 'E5', 'C5', 'G4', 'C5', 'E5', 'C5', 'G4'],
  Am: ['E4', 'A4', 'C5', 'E5', 'A5', 'E5', 'C5', 'A4', 'C5', 'E5', 'C5', 'A4'],
  B7: ['D#4', 'F#4', 'A4', 'B4', 'D#5', 'B4', 'A4', 'F#4', 'A4', 'B4', 'D#5', 'B4'],
  E: ['E4', 'G#4', 'B4', 'E5', 'G#5', 'E5', 'B4', 'G#4', 'B4', 'E5', 'B4', 'G#4'],
  A: ['E4', 'A4', 'C#5', 'E5', 'A5', 'E5', 'C#5', 'A4', 'C#5', 'E5', 'C#5', 'A4'],
};
const LOW = { Em: [['E3', 'G3', 'B3'], 'E2'], C: [['E3', 'G3', 'C4'], 'C2'], Am: [['E3', 'A3', 'C4'], 'A2'], B7: [['D#3', 'A3', 'B3'], 'B1'],
  E: [['E3', 'G#3', 'B3'], 'E2'], A: [['E3', 'A3', 'C#4'], 'A2'] };
const PROG = ['Em', 'Em', 'C', 'B7'], PROG_MAJ = ['E', 'E', 'A', 'B7'];
// our own broad, song-like line (in eighths): minor, then the same shape in major
const SONG_MIN = [['B3', 3], ['E4', 2], ['G4', 1], ['F#4', 3], ['D4', 3], ['E4', 6]];
const SONG_MAJ = [['B3', 3], ['E4', 2], ['G#4', 1], ['F#4', 3], ['D#4', 3], ['E4', 6]];

module.exports = {
  slug: 'moldau',
  title: 'The Moldau',
  segments: [
    { id: 'hook',    text: 'Two tiny springs... that grow into a mighty river.' },
    { id: 'what',    text: 'This is Vltava, The Moldau, by Bedřich Smetana.' },
    { id: 'what2',   text: "It's from his cycle Má vlast, My Homeland, composed in 1874, the year he became deaf." },
    { id: 'prog',    text: 'It follows the river: from two springs, past a hunt in the forest, with horns,' },
    { id: 'prog2',   text: 'a peasant wedding with a polka, nymphs dancing by moonlight,' },
    { id: 'prog3',   text: "the Saint John's Rapids, and finally, broadly past Vyšehrad castle in Prague." },
    { id: 'why1',    text: 'So how does music become a river? Two flutes.' },
    { id: 'why1b',   text: 'Interweaving running notes: two streams. Then other instruments join. The river grows.' },
    { id: 'why2',    text: 'And the flowing notes never stop, like the current.' },
    { id: 'why3',    text: 'The main theme, in E minor, is broad and song-like.' },
    { id: 'why3b',   text: 'Near the end, it returns in E major: triumph, as the river reaches Prague.' },
    { id: 'why4',    text: "Program music: every section paints a scene, like Vivaldi's Spring." },
    { id: 'essence', text: 'Two trickles become a mighty river... and the music flows from minor to major.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'BEDŘICH SMETANA · 1874', title: 'THE MOLDAU', accent: true, tonic: 4, min: 5.4 },
    { id: 'what', segs: ['what', 'what2'], label: 'MÁ VLAST · MY HOMELAND', title: 'THE MOLDAU', sub: 'Bedřich Smetana · 1874 · in E minor', tonic: 4, gap: 0.3, tail: 0.6 },
    { id: 'prog', segs: ['prog', 'prog2', 'prog3'], label: 'THE PROGRAM', title: 'DOWN THE RIVER', circle: false, tonic: 4, gap: 0.15, tail: 2.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'TWO STREAMS', circle: false, tonic: 4, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE CURRENT', tonic: 4, tail: 2.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MINOR TO MAJOR', tonic: 4, gap: 0.4, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'PROGRAM MUSIC', title: 'EVERY SECTION A SCENE', circle: false, tonic: 4, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A MIGHTY RIVER', accent: true, tonic: 4, gap: 0.6, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff', RED = '#ff5d6c', GREEN = '#7be07b', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n), pcOf = n => n.replace(/-?\d/, '');
    const FLUTE = { partials: [1, 0.35, 0.12, 0.05], attack: 0.02, release: 0.08 };
    const BRASS = { partials: [1, 0.8, 0.6, 0.45, 0.3, 0.2, 0.12], attack: 0.04, release: 0.2 };
    const STR = { partials: [1, 0.6, 0.4, 0.25, 0.15, 0.08], attack: 0.15, release: 0.4 };

    // one flowing stream: our wave, one chord per bar; shift in semitones, offset in sixteenths
    function stream(t0, t1, prog, o = {}) {
      const v = o.vel ?? 0.13;
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.05) break;
        const c = prog[b % prog.length], w = WAVE[c];
        for (let k = 0; k < 12; k++) {
          const t = tb + k * SX + (o.offset ?? 0) * SX;
          if (t >= t1 - 0.03) break;
          a.note(midi(w[k]) + (o.shift ?? 0), t, SX * 0.95, { vel: v * (k % 6 === 0 ? 1.15 : 0.9), show: false, tone: FLUTE });
          if (o.grid) o.grid.active.push({ t0: t, t1: t + SX, i: o.cell });
        }
      }
    }
    // the river underneath: held low chords (shape on the circle) with a bass on each bar
    function river(t0, t1, prog, o = {}) {
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.05) break;
        const c = prog[b % prog.length], [n, bs] = LOW[c];
        a.ch(c, tb, Math.min(tb + BAR, t1), { notes: n, bass: o.bass === false ? false : bs, vel: o.vel ?? 0.4, shape: o.shape, hideName: o.hideName,
          strikes: [{ o: 0, v: 1 }, { o: 3 * E8, v: 0.55 }] });
      }
    }
    // our broad song-like line (eighths), with a string-like tone; returns walker points
    function song(list, t0, o = {}) {
      let t = t0; const pts = [];
      for (const [n, d] of list) { a.note(n, t, d * E8 * 0.97, { vel: o.vel ?? 0.3, tone: STR, show: o.show ?? true }); pts.push([t, pcOf(n)]); t += d * E8; }
      return { pts, end: t };
    }

    // ---- hook (cover): E minor, two streams on the circle, then the river ----
    const h1 = S('hook').t1, tRiver = a.w('hook', 'river') - 0.05;
    a.scale(0.1, 'E', a.T.MINOR, { popIn: { t0: 0.15, step: 0.06 } });
    a.ch('Em', 0.3, h1, { notes: ['E3', 'G3', 'B3'], bass: false, mute: true });
    stream(0.3, h1, ['Em', 'Em', 'C', 'B7'], { vel: 0.14 });
    stream(0.3, h1, ['Em', 'Em', 'C', 'B7'], { vel: 0.11, shift: -12, offset: 6 });
    river(tRiver - 0.6, h1, ['Em'], { vel: 0.5 });
    const sp = [], sp2 = [];
    for (let t = 0.3, k = 0; t < h1 - 0.1; t += 2 * SX, k++) { sp.push([t, pcOf(WAVE.Em[(2 * k) % 12])]); sp2.push([t + 6 * SX, pcOf(WAVE.Em[(2 * k + 6) % 12])]); }
    a.walker(sp, { t1: h1, dr: -40, color: TEAL, label: 'SPRING 1', labelDr: -60 });
    a.walker(sp2, { t1: h1, dr: 30, color: BLUE, label: 'SPRING 2', labelDr: 60 });
    a.big('TWO SPRINGS → A RIVER', 0.3, h1, { y: 462, size: 46, ...MONO, color: TEAL, blur: 10 });

    // ---- what: Vltava, Má vlast, 1874, deaf ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'E', a.T.MINOR);
    river(w0 + 0.05, w1, PROG, { vel: 0.38 });
    stream(w0 + 0.05, w1, PROG, { vel: 0.1 });
    a.tag('E', a.w('what', 'Vltava'), w1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('VLTAVA', a.w('what', 'Vltava') - 0.05, a.at('what2') - 0.05, { y: 462, size: 60, color: TEAL, blur: 16 });
    a.big('MY HOMELAND', a.w('what2', 'Homeland') - 0.05, a.w('what2', 'year') - 0.05, { y: 462, size: 54, ...MONO, color: WHITE, blur: 8 });
    a.big('THE YEAR HE BECAME DEAF', a.w('what2', 'year') - 0.05, w1, { y: 462, size: 42, ...MONO, color: RED, blur: 10 });

    // ---- prog: the river's journey, scene by scene ----
    const p0 = S('prog').t0, p1 = S('prog').t1;
    const CARDS = [
      { label: 'SPRINGS', sub: 'TWO FLUTES', color: TEAL, size: 44, subSize: 22 },
      { label: 'HUNT', sub: 'HORNS', color: ORANGE, size: 50, subSize: 22 },
      { label: 'WEDDING', sub: 'A POLKA', color: GOLD, size: 44, subSize: 22 },
      { label: 'NYMPHS', sub: 'MOONLIGHT', color: LILAC, size: 44, subSize: 22 },
      { label: 'RAPIDS', sub: "ST. JOHN'S", color: RED, size: 44, subSize: 22 },
      { label: 'PRAGUE', sub: 'VYŠEHRAD', color: GREEN, size: 44, subSize: 22 },
    ];
    const gp = a.grid(CARDS, p0 + 0.1, p1, { rows: 2, cols: 3, cw: 320, chh: 210, y: 470, revealStep: 0.08 });
    const tp = [a.w('prog', 'springs'), a.w('prog', 'hunt'), a.w('prog2', 'wedding'), a.w('prog2', 'nymphs'), a.w('prog3', 'Rapids'), a.w('prog3', 'castle')].map(t => t - 0.1);
    tp.forEach((t, i) => gp.active.push({ t0: t, t1: i < 5 ? tp[i + 1] : p1, i }));
    const pBig = [['FROM THE SOURCE', TEAL], ['IN THE FOREST', ORANGE], ['A PEASANT WEDDING', GOLD], ['DANCING BY MOONLIGHT', LILAC], ['WILD WATER', RED], ['VYŠEHRAD CASTLE', GREEN]];
    pBig.forEach(([txt, col], i) => a.big(txt, tp[i], i < 5 ? tp[i + 1] : p1, { y: 1030, size: 48, ...MONO, color: col, blur: 10 }));
    // 0: springs - two streams
    stream(p0 + 0.1, tp[1], ['Em'], { vel: 0.12 });
    stream(tp[0], tp[1], ['Em'], { vel: 0.1, shift: -12, offset: 6 });
    // 1: hunt - our horn call over C major
    a.ch('C', tp[1], tp[2], { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.4, shape: false, strikes: [{ o: 0, v: 1 }, { o: 0.75, v: 0.5 }, { o: 1.5, v: 0.6 }] });
    [['C4', 0, 0.2], ['E4', 0.25, 0.2], ['G4', 0.5, 0.45], ['E4', 1.0, 0.2], ['G4', 1.25, 0.2], ['C5', 1.5, 0.9]].forEach(([n, u, d]) => {
      if (tp[1] + u < tp[2] - 0.1) { a.note(n, tp[1] + u, d, { vel: 0.2, tone: BRASS, show: false }); a.note(midi(n) - 12, tp[1] + u, d, { vel: 0.12, tone: BRASS, show: false }); }
    });
    // 2: wedding - polka oom-pah in 2/4
    for (let t = tp[2], k = 0; t < tp[3] - 0.1; t += 0.2, k++) {
      if (k % 2 === 0) { a.note(k % 4 === 0 ? 'G2' : 'D2', t, 0.18, { vel: 0.4, show: false }); a.perc('kick', t, 0.4); }
      else { ['B3', 'D4', 'G4'].forEach(n => a.note(n, t, 0.12, { vel: 0.16, show: false })); a.perc('hat', t, 0.3); }
    }
    // 3: nymphs - soft, high, shimmering chord
    for (let t = tp[3], k = 0; t < tp[4] - 0.1; t += SX, k++) a.note(['Ab4', 'C5', 'Eb5', 'Ab5'][k % 4], t, SX * 2, { vel: 0.07, show: false, tone: FLUTE });
    ['Ab3', 'C4', 'Eb4'].forEach(n => a.note(n, tp[3], tp[4] - tp[3], { vel: 0.12, show: false, tone: STR }));
    // 4: rapids - fast runs, crashes
    stream(tp[4], tp[5], ['B7', 'Em'], { vel: 0.16 });
    stream(tp[4], tp[5], ['B7', 'Em'], { vel: 0.13, shift: -12, offset: 3 });
    for (let t = tp[4]; t < tp[5] - 0.1; t += 0.375) { a.perc('snare', t, 0.45); a.perc('kick', t, 0.5); }
    a.ch('B7', tp[4], tp[5], { notes: ['D#3', 'A3', 'B3'], bass: 'B1', vel: 0.5, shape: false, strikes: [{ o: 0, v: 1 }, { o: 0.75, v: 0.7 }, { o: 1.5, v: 0.8 }] });
    // 5: Prague - broad E major
    a.ch('E', tp[5], p1 - 0.1, { notes: ['E3', 'G#3', 'B3', 'E4'], bass: 'E2', vel: 0.7, shape: false });
    ['E4', 'G#4', 'B4'].forEach(n => a.note(n, tp[5], p1 - tp[5] - 0.2, { vel: 0.12, tone: BRASS, show: false }));
    a.perc('kick', tp[5], 0.7);

    // ---- why1: two flutes, then the river grows (lanes) ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const LANES = [
      { label: 'FLUTE 1', sub: 'STREAM', color: TEAL, size: 44, subSize: 22 },
      { label: 'FLUTE 2', sub: 'STREAM', color: BLUE, size: 44, subSize: 22 },
      { label: 'MORE INSTRUMENTS', sub: 'JOIN IN', color: LILAC, size: 40, subSize: 22 },
      { label: 'THE RIVER', sub: 'GROWS', color: GOLD, size: 44, subSize: 22 },
    ];
    const gl = a.grid(LANES, y0 + 0.1, y1, { rows: 4, cols: 1, cw: 720, chh: 135, y: 440, revealStep: 0.12 });
    const tF = a.w('why1', 'flutes') - 0.1, tTwo = a.w('why1b', 'two') - 0.05, tJoin = a.w('why1b', 'join') - 0.1, tGrow = a.w('why1b', 'grows') - 0.1;
    stream(tF, y1, PROG, { vel: 0.14 });
    stream(tF + 0.4, y1, PROG, { vel: 0.11, shift: -12, offset: 6 });
    gl.active.push({ t0: tF, t1: y1, i: 0 }, { t0: tF + 0.4, t1: y1, i: 1 }, { t0: tJoin, t1: y1, i: 2 }, { t0: tGrow, t1: y1, i: 3 });
    river(tJoin, y1, PROG, { vel: 0.3, bass: false, shape: false });
    river(tGrow, y1, PROG, { vel: 0.45, shape: false });
    a.big('INTERWEAVING', a.at('why1b') - 0.05, tJoin, { y: 1030, size: 54, ...MONO, color: TEAL, blur: 10 });
    a.big('THE RIVER GROWS', tGrow, y1, { y: 1030, size: 58, color: GOLD, blur: 16 });

    // ---- why2: the flowing notes never stop - the current, around the circle ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    a.scale(z0, 'E', a.T.MINOR);
    river(z0 + 0.1, z1, PROG, { vel: 0.4 });
    stream(z0 + 0.1, z1, PROG, { vel: 0.15 });
    const cur = [];
    for (let t = z0 + 0.1, k = 0; t < z1 - 0.1; t += SX, k++) cur.push([t, pcOf(WAVE[PROG[Math.floor(k / 12) % 4]][k % 12])]);
    a.walker(cur, { t1: z1, dr: -40, color: TEAL, label: 'CURRENT', labelDr: -55 });
    a.big('NEVER STOPS', a.w('why2', 'never') - 0.05, z1, { y: 462, size: 56, ...MONO, color: TEAL, blur: 12 });

    // ---- why3: broad theme in E minor... then E major ----
    const q0 = S('why3').t0, q1 = S('why3').t1;
    a.scale(q0, 'E', a.T.MINOR);
    const tMaj = a.w('why3b', 'E') - 0.05;
    river(q0 + 0.1, a.at('why3b') - 0.1, ['Em', 'Em', 'Am', 'B7'], { vel: 0.4 });
    stream(q0 + 0.1, a.at('why3b') - 0.1, ['Em', 'Em', 'Am', 'B7'], { vel: 0.08 });
    const sm = song(SONG_MIN, q0 + 0.2, { vel: 0.3 });
    a.walker(sm.pts, { t1: a.at('why3b') - 0.1, dr: -40, color: GOLD, label: 'THEME', labelDr: -55 });
    a.tag('G', a.w('why3', 'minor') - 0.05, a.at('why3b') - 0.1, 'G = MINOR', { dr: -92, color: BLUE });
    a.big('BROAD · SONG-LIKE', a.w('why3', 'broad') - 0.05, a.at('why3b') - 0.1, { y: 462, size: 48, ...MONO, color: GOLD, blur: 10 });
    a.ch('Em', a.at('why3b') - 0.1, tMaj, { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.3 });
    a.scale(tMaj, 'E', a.T.MAJOR);
    river(tMaj, q1 - 0.3, PROG_MAJ, { vel: 0.55 });
    stream(tMaj, q1 - 0.3, PROG_MAJ, { vel: 0.12 });
    const sM = song(SONG_MAJ, tMaj + 0.1, { vel: 0.36 });
    SONG_MAJ.forEach(([n], i) => a.note(midi(n) + 12, sM.pts[i][0], 0.4, { vel: 0.1, tone: BRASS, show: false }));
    a.walker(sM.pts, { t1: q1, dr: -40, color: GOLD, label: 'THEME', labelDr: -55 });
    a.tag('G#', tMaj, q1, 'G# = MAJOR', { dr: -92, color: GOLD });
    a.big('TRIUMPH', a.w('why3b', 'triumph') - 0.05, q1, { y: 462, size: 64, color: GOLD, blur: 22 });
    a.perc('kick', tMaj, 0.6);

    // ---- why4: program music - every section paints a scene ----
    const r0 = S('why4').t0, r1 = S('why4').t1;
    const gr = a.grid(CARDS, r0 + 0.1, r1, { rows: 2, cols: 3, cw: 320, chh: 210, y: 470, revealStep: 0.06 });
    const tSc = a.w('why4', 'section') - 0.05, tV = a.w('why4', "Vivaldi's") - 0.05;
    for (let i = 0; i < 6; i++) gr.active.push({ t0: tSc + i * (tV - tSc) / 6, t1: tSc + (i + 1) * (tV - tSc) / 6, i });
    [0, 1, 2, 3, 4, 5].forEach(i => gr.active.push({ t0: tV, t1: r1, i }));
    river(r0 + 0.1, r1, PROG, { vel: 0.35, shape: false });
    stream(r0 + 0.1, r1, PROG, { vel: 0.1 });
    a.big('MUSIC THAT TELLS A STORY', a.at('why4'), tV, { y: 1030, size: 44, ...MONO, color: WHITE, blur: 8 });
    a.big("LIKE VIVALDI'S SPRING", tV, r1, { y: 1030, size: 48, ...MONO, color: GREEN, blur: 10 });

    // ---- essence: two streams, the full river, minor to major ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'E', a.T.MINOR);
    const tMin = a.w('essence', 'minor') - 0.05, tMj = a.w('essence', 'major') - 0.05, tBig = a.w('essence', 'mighty') - 0.05;
    stream(e0 + 0.1, tMj, PROG, { vel: 0.13 });
    stream(e0 + 0.5, tMj, PROG, { vel: 0.1, shift: -12, offset: 6 });
    a.ch('Em', e0 + 0.1, tBig, { notes: ['E3', 'G3', 'B3'], bass: false, mute: true });
    river(tBig, tMj, ['Em', 'C', 'B7'], { vel: 0.5 });
    a.ring(['G'], tMin, tMj, { color: BLUE });
    a.scale(tMj, 'E', a.T.MAJOR);
    a.ch('E', tMj, e1 - 0.2, { notes: ['E3', 'G#3', 'B3', 'E4'], bass: 'E2', vel: 0.75 });
    ['E4', 'G#4', 'B4'].forEach(n => a.note(n, tMj, e1 - tMj - 0.4, { vel: 0.1, tone: BRASS, show: false }));
    stream(tMj, tMj + 2 * BAR, ['E'], { vel: 0.12 });
    a.perc('kick', tMj, 0.7);
    a.ring(['G#'], tMj, e1, { color: GOLD });
    a.big('MINOR → MAJOR', tMin, e1, { y: 462, size: 52, ...MONO, color: GOLD, blur: 12 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
