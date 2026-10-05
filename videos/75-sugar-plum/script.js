// The Sugar Plum Fairy, decoded: the sound of magic comes from an instrument, the celesta.
// Copyright/brief: Tchaikovsky's melody is NOT played. Only the E minor harmony (Em - B7) as short
// plucked chords, plus an original high sparkle motif. The "bell" sound is the piano with added
// soft upper partials, to illustrate a brighter overtone mix (it is not a real celesta).
const B = 0.4, BAR = 4 * B;

module.exports = {
  slug: 'sugar-plum',
  title: 'The Sugar Plum Fairy',
  segments: [
    { id: 'hook',    text: 'One instrument... and the music turns into magic.' },
    { id: 'what',    text: "This is the Dance of the Sugar Plum Fairy, from Tchaikovsky's ballet The Nutcracker." },
    { id: 'what2',   text: 'It premiered in Saint Petersburg in December 1892.' },
    { id: 'secret',  text: 'In 1891, in Paris, Tchaikovsky discovered a new instrument...' },
    { id: 'secret1b', text: 'the celesta, invented by Auguste Mustel.' },
    { id: 'secret2', text: 'He asked his publisher to keep it secret, so other Russian composers could not use it first.' },
    { id: 'why1',    text: 'So why does it sound magical? A celesta looks like a small piano...' },
    { id: 'why1b',   text: 'but its hammers strike metal plates instead of strings. The tone is bell-like and glassy.' },
    { id: 'why2',    text: 'Timbre is about overtones. The same note on different instruments has a different mix.' },
    { id: 'why2b',   text: 'Metal plates give bright, shimmering overtones that fade fast.' },
    { id: 'why3',    text: 'And the dance is in a minor key, quiet, with plucked strings underneath.' },
    { id: 'why3b',   text: 'Mysterious, rather than sweet.' },
    { id: 'why4',    text: 'High notes, short notes, metallic sparkle... that is fairy dust.' },
    { id: 'essence', text: 'The same notes on a different instrument become a different world. Timbre is magic.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TCHAIKOVSKY · 1892', title: 'THE SUGAR PLUM FAIRY', accent: true, tonic: 4, min: 2 * BAR + 1.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'FROM THE NUTCRACKER', title: 'SUGAR PLUM FAIRY', sub: 'Tchaikovsky · 1892 · in E minor', tonic: 4, row: ['Em', 'B7'], gap: 0.4, tail: 2 * BAR + 0.5 },
    { id: 'secret', segs: ['secret', 'secret1b'], label: 'PARIS · 1891', title: 'THE CELESTA', circle: false, tonic: 4, gap: 0.2, tail: 1.6 },
    { id: 'secret2', segs: ['secret2'], label: 'KEEP IT QUIET', title: 'TOP SECRET', circle: false, tonic: 4, tail: 1.2 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'METAL, NOT STRINGS', circle: false, tonic: 4, gap: 0.3, tail: 1.4 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'OVERTONES', circle: false, tonic: 4, gap: 0.4, tail: 1.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MINOR AND QUIET', tonic: 4, gap: 0.3, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'THE RECIPE', title: 'FAIRY DUST', circle: false, tonic: 4, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TIMBRE IS MAGIC', accent: true, tonic: 4, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n);
    const EM = { name: 'Em', shape: ['E4', 'G4', 'B4'], bass: ['E2', 'B2'], pl: ['G3', 'B3', 'E4'], spark: ['G5', 'E5', 'B4', 'E5'] };
    const B7 = { name: 'B7', shape: ['B3', 'D#4', 'F#4', 'A4'], bass: ['B2', 'F#2'], pl: ['A3', 'D#4', 'F#4'], spark: ['F#5', 'D#5', 'B4', 'D#5'] };

    // a "bell": the note plus soft, short upper partials (brighter overtone mix)
    const PART = [[12, 0.32], [19, 0.16], [24, 0.12], [31, 0.06]];
    function bell(n, t, dur = 0.28, vel = 0.26, show = true) {
      a.note(n, t, dur, { vel, show });
      PART.forEach(([iv, k]) => a.note(midi(n) + iv, t, dur * 0.5, { vel: vel * k, show: false }));
    }
    // original sparkle flick (not Tchaikovsky's melody)
    const sparkle = (list, t0, step = 0.11, vel = 0.24) => list.forEach((n, i) => bell(n, t0 + i * step, i === list.length - 1 ? 0.5 : 0.22, vel));
    // plucked (pizzicato-like) Em - B7 bars: short bass on 1 and 3, short chord on 2 and 4
    function pizz(t0, t1, o = {}) {
      const v = o.vel ?? 0.3, out = [];
      for (let t = t0, k = 0; t + BAR <= t1 + 0.05; t += BAR, k++) {
        const c = (o.seq || [EM, B7])[k % 2];
        if (o.shape !== false) a.ch(c.name, t, t + BAR, { notes: c.shape, bass: false, mute: true, row: k % 2, hideName: o.hideName });
        a.note(c.bass[0], t, 0.16, { vel: v });
        a.note(c.bass[1], t + 2 * B, 0.16, { vel: v * 0.85 });
        [B, 3 * B].forEach(off => c.pl.forEach(n => a.note(n, t + off, 0.13, { vel: v * 0.5, show: false })));
        if (o.spark) sparkle(c.spark, t + B * 0.5, 0.11, o.sparkVel ?? 0.24);
        out.push(t);
      }
      return out;
    }

    // ---- hook: E minor pops in, plucked chords and sparkles (cover) ----
    a.scale(0.15, 'E', a.T.MINOR, { popIn: { t0: 0.2, step: 0.06 } });
    a.ring(['E', 'G', 'B'], 0.3, S('hook').t1, { color: LILAC });
    pizz(0.3, S('hook').t1, { spark: true, vel: 0.28 });

    // ---- what: the harmony under the title, then the sparkle plays alone in the tail ----
    const w0 = S('what').t0 + 0.1, w1 = S('what').t1;
    pizz(w0, a.end('what2') + 0.1, { vel: 0.22, spark: false });
    const tl = Math.max(a.end('what2') + 0.3, w1 - 2 * BAR - 0.2);
    pizz(tl, w1, { vel: 0.3, spark: true, sparkVel: 0.27 });
    a.tag('E', a.w('what2', 'December'), w1, 'E MINOR', { dr: -92, color: LILAC });

    // ---- secret: 1891, Paris, the celesta ----
    const c0 = S('secret').t0, c1 = S('secret').t1;
    a.big('PARIS · 1891', c0 + 0.15, a.w('secret1b', 'celesta') - 0.05, { y: 700, size: 70, color: GREY, ...MONO, blur: 0 });
    a.big('CELESTA', a.w('secret1b', 'celesta') - 0.05, c1, { y: 680, size: 150, color: LILAC, blur: 40 });
    a.big('INVENTED BY AUGUSTE MUSTEL', a.w('secret1b', 'invented') - 0.05, c1, { y: 830, size: 38, color: '#ffffff', ...MONO, blur: 8 });
    const tC = a.w('secret1b', 'celesta') - 0.05;
    ['B4', 'E5', 'G5', 'B4', 'E5'].forEach((n, i) => bell(n, tC + i * 0.32, 0.4, 0.22));
    sparkle(EM.spark, c1 - 1.2, 0.12, 0.24);
    a.note('E3', tC, 2.0, { vel: 0.16, show: false });

    // ---- secret2: keep it quiet ----
    const s0 = S('secret2').t0, s1 = S('secret2').t1;
    a.big('SHHH...', s0 + 0.15, s1, { y: 660, size: 140, color: LILAC, blur: 36 });
    a.big('KEEP IT SECRET', a.w('secret2', 'secret') - 0.05, s1, { y: 830, size: 44, color: '#ffffff', ...MONO, blur: 8 });
    pizz(s0 + 0.1, s1, { vel: 0.16, shape: false });
    [0.3, 1.9, 3.5].forEach((o, i) => { if (s0 + o + 0.6 < s1) sparkle([EM.spark, B7.spark, EM.spark][i], s0 + o, 0.12, 0.16); });

    // ---- why1: a small piano whose hammers hit metal plates ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const g1 = a.grid([
      { label: 'PIANO', sub: 'HAMMER · STRING', color: GREY, size: 60, subSize: 26 },
      { label: 'CELESTA', sub: 'HAMMER · METAL', color: LILAC, size: 60, subSize: 26 },
    ], y0 + 0.1, y1, { rows: 1, cols: 2, cw: 470, chh: 260, y: 560, revealStep: 0.25 });
    const tP = a.w('why1', 'piano') - 0.05, tM = a.w('why1b', 'metal') - 0.05, tT = a.w('why1b', 'tone') - 0.05;
    g1.active.push({ t0: tP, t1: tM, i: 0 }, { t0: tM, t1: y1, i: 1 });
    ['E4', 'B4', 'E5'].forEach((n, i) => a.note(n, tP + i * 0.4, 0.9, { vel: 0.26 }));
    ['E4', 'B4', 'E5'].forEach((n, i) => bell(n, tM + i * 0.4, 0.35, 0.26));
    a.big('BELL-LIKE · GLASSY', tT, y1, { y: 960, size: 54, color: LILAC, ...MONO, blur: 14 });
    sparkle(['B4', 'E5', 'G5', 'E5'], tT + 0.2, 0.14, 0.24);

    // ---- why2: overtone spectra, string vs metal plate ----
    const v0 = S('why2').t0, v1 = S('why2').t1;
    const BASE = 1050, HMAX = 380, CW = 64;
    // one bar per overtone (i = 0 is the fundamental); `only` picks which bars to draw
    const bars = (cx, hs, t0, t1, col, only = () => true) => hs.forEach((h, i) => {
      if (!only(i)) return;
      const hh = Math.round(HMAX * h) + 16;
      const g0 = t0 + (only(0) ? i * 0.06 : 0);
      const g = a.grid([{ label: '', color: i === 0 ? GOLD : col }], g0, t1,
        { rows: 1, cols: 1, cw: CW, chh: hh, y: BASE - hh + 8, x: cx + (i - 2.5) * CW });
      g.active.push({ t0: g0, t1, i: 0 });
    });
    const tSame = a.w('why2', 'same') - 0.05, tMix = a.w('why2', 'mix') - 0.05;
    const tBr = a.w('why2b', 'bright') - 0.05;
    a.big('TIMBRE = OVERTONES', v0 + 0.2, tSame, { y: 760, size: 60, color: '#ffffff', ...MONO, blur: 10 });
    // string: a smooth, gently falling series; it stays
    bars(290, [1, 0.62, 0.45, 0.34, 0.25, 0.18], tSame, v1, TEAL);
    a.big('STRING', tSame, v1, { x: 290, y: 1110, size: 36, color: TEAL, ...MONO, blur: 0 });
    a.note('E4', tSame, 1.4, { vel: 0.3 });
    // metal plate: an uneven, bright mix; its upper overtones flash and fade fast on every strike
    const MET = [1, 0.35, 0.9, 0.25, 0.75, 0.6];
    bars(790, MET, tMix, v1, LILAC, i => i < 2);
    bars(790, MET, tMix, tBr, LILAC, i => i >= 2);
    bell('E4', tMix, 0.6, 0.3);
    for (let t = tBr; t < v1 - 0.6; t += 0.9) { bars(790, MET, t, t + 0.75, LILAC, i => i >= 2); bell('E4', t, 0.5, 0.3); }
    a.big('METAL PLATE', tMix, v1, { x: 790, y: 1110, size: 36, color: LILAC, ...MONO, blur: 0 });
    a.big('SAME NOTE: E', tSame, tBr, { y: 560, size: 44, color: GOLD, ...MONO, blur: 8 });
    a.big('BRIGHT · FAST FADE', tBr, v1, { y: 560, size: 44, color: LILAC, ...MONO, blur: 8 });

    // ---- why3: minor, quiet, plucked ----
    const m0 = S('why3').t0, m1 = S('why3').t1;
    a.scale(m0, 'E', a.T.MINOR);
    pizz(m0 + 0.1, m1, { vel: 0.26, spark: false });
    a.tag('G', a.w('why3', 'minor'), m1, 'MINOR 3RD', { dr: -92, color: LILAC });
    a.tag(0, a.w('why3', 'plucked'), a.w('why3b', 'Mysterious'), 'PLUCKED · PIZZICATO', { x: 540, y: 455, color: TEAL });
    a.tag(0, a.w('why3b', 'Mysterious'), m1, 'MYSTERIOUS', { x: 540, y: 455, color: LILAC });
    sparkle(EM.spark, a.w('why3b', 'Mysterious') + 0.2, 0.13, 0.2);

    // ---- why4: high + short + metallic sparkle = fairy dust ----
    const f0 = S('why4').t0, f1 = S('why4').t1;
    const g4 = a.grid([
      { label: 'HIGH', sub: 'REGISTER', color: BLUE, size: 52 },
      { label: 'SHORT', sub: 'NOTES', color: TEAL, size: 52 },
      { label: 'SPARKLE', sub: 'METAL', color: LILAC, size: 44 },
    ], f0 + 0.1, f1, { rows: 1, cols: 3, cw: 320, chh: 230, y: 560, revealStep: 0.15 });
    const tH = a.w('why4', 'High') - 0.05, tS = a.w('why4', 'short') - 0.05, tSp = a.w('why4', 'sparkle') - 0.05, tF = a.w('why4', 'fairy') - 0.05;
    g4.active.push({ t0: tH, t1: f1, i: 0 }, { t0: tS, t1: f1, i: 1 }, { t0: tSp, t1: f1, i: 2 });
    bell('G5', tH, 0.6, 0.24);
    ['E5', 'E5', 'E5'].forEach((n, i) => a.note(n, tS + i * 0.15, 0.08, { vel: 0.26 }));
    sparkle(['B4', 'E5', 'G5'], tSp, 0.12, 0.26);
    a.big('= FAIRY DUST', tF, f1, { y: 940, size: 80, color: GOLD, blur: 30 });
    pizz(tF, f1 + 0.5, { vel: 0.2, spark: true, shape: false, sparkVel: 0.26 });

    // ---- essence: once more, then E minor rings out ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'E', a.T.MINOR);
    const eb = pizz(e0 + 0.1, a.at('cta'), { vel: 0.26, spark: true });
    const eEnd = eb[eb.length - 1] + BAR;
    a.ch('Em', eEnd, e1 - 0.3, { notes: ['E3', 'G3', 'B3', 'E4'], bass: 'E2', vel: 0.5, row: 0 });
    sparkle(['B4', 'E5', 'G5', 'E5'], eEnd + 0.05, 0.14, 0.24);
    a.ring(['E', 'G', 'B'], eEnd, e1, { color: LILAC });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
