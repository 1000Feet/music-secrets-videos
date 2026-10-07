// The Radetzky March: a march where the audience becomes the percussion section.
// Brief/copyright: Strauss's melody is NOT reconstructed. We play a generic oom-pah march in 2/4
// (D major chords; a contrasting middle section, key unnamed), audience-style claps on the beat
// (loud, soft or silent), and a short generic D major fanfare on chord tones.
const BEAT = 0.5, E8 = BEAT / 2, BAR = 2 * BEAT; // 2/4: two beats per bar
const LH = {
  D: ['D2', 'A2', ['F#3', 'A3', 'D4']], A7: ['A2', 'E2', ['G3', 'C#4', 'E4']], G: ['G2', 'D2', ['G3', 'B3', 'D4']],
  D7: ['D2', 'A2', ['F#3', 'C4', 'D4']], Em: ['E2', 'B2', ['G3', 'B3', 'E4']],
};
const PROG = ['D', 'D', 'A7', 'A7', 'A7', 'A7', 'D', 'D'], TRIO = ['G', 'G', 'D7', 'D7', 'D7', 'D7', 'G', 'G'];

module.exports = {
  slug: 'radetzky-march',
  title: 'The Radetzky March',
  segments: [
    { id: 'hook',    text: 'A march where the whole audience becomes the percussion section.' },
    { id: 'what',    text: 'This is the Radetzky March, by Johann Strauss the First, from 1848,' },
    { id: 'what2',   text: 'honouring Field Marshal Joseph Radetzky.' },
    { id: 'ny',      text: "It traditionally closes the Vienna Philharmonic's New Year's Concert," },
    { id: 'ny2',     text: 'with the audience clapping along, while the conductor directs them:' },
    { id: 'ny3',     text: 'louder, softer, or silent.' },
    { id: 'why1',    text: "So why does it work? First, it's a march in two four." },
    { id: 'why1b',   text: 'A strong one, two. One, two. Easy to clap.' },
    { id: 'why2',    text: 'Then, contrast: loud sections, and soft sections.' },
    { id: 'why2b',   text: 'That gives the conductor a game to play with the audience.' },
    { id: 'why3',    text: 'In the middle, a trio changes key and mood...' },
    { id: 'why3b',   text: 'then the main march returns, just like in our Stars and Stripes video.' },
    { id: 'why4',    text: 'And clapping on the beat turns listeners into performers.' },
    { id: 'why4b',   text: 'For a few minutes, the whole hall is part of the music.' },
    { id: 'essence', text: 'A steady beat, a few dynamics... and the whole hall joins the orchestra.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'JOHANN STRAUSS I · 1848', title: 'RADETZKY MARCH', accent: true, circle: false, tonic: 2, min: 6.4 },
    { id: 'what', segs: ['what', 'what2'], label: 'A MARCH BY STRAUSS', title: 'RADETZKY MARCH', sub: 'Johann Strauss I · 1848 · in D', tonic: 2, gap: 0.2, tail: 1.2 },
    { id: 'ny', segs: ['ny', 'ny2', 'ny3'], label: 'VIENNA PHILHARMONIC', title: "NEW YEAR'S CONCERT", circle: false, tonic: 2, gap: 0.25, tail: 4.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'TWO FOUR TIME', circle: false, tonic: 2, gap: 0.3, tail: 2.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'LOUD AND SOFT', circle: false, tonic: 2, gap: 0.3, tail: 2.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'THE TRIO', circle: false, tonic: 2, gap: 0.3, tail: 1.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'EVERYONE PLAYS', circle: false, tonic: 2, gap: 0.3, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE WHOLE HALL', accent: true, tonic: 2, gap: 0.6, tail: 2.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const BRASS = { partials: [1, 0.8, 0.65, 0.5, 0.38, 0.27, 0.18, 0.1], attack: 0.03, release: 0.15 };

    // oom-pah march bars from t0 until t1 (one chord per bar, cycling)
    function march(t0, t1, prog, o = {}) {
      const v = o.vel ?? 1;
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.1) break;
        const c = prog[b % prog.length], [b1, b2, ch] = LH[c], end = Math.min(tb + BAR, t1);
        if (o.shape !== false) a.ch(c, tb, end, { notes: ch, bass: false, mute: true, hideName: o.hideName });
        for (let k = 0; k < 4; k++) {
          const t = tb + k * E8;
          if (t >= t1 - 0.05) break;
          if (k % 2 === 0) { a.note(k ? b2 : b1, t, E8 * 0.9, { vel: 0.36 * v, show: false }); a.perc('kick', t, (k ? 0.3 : 0.5) * v); }
          else ch.forEach((n, j) => a.note(n, t + j * 0.008, E8 * 0.6, { vel: 0.17 * v, show: false }));
        }
      }
    }
    // an audience clap: a burst of slightly scattered noise hits
    function clap(t, v = 1) {
      if (v <= 0) return;
      [0, 0.012, 0.025, 0.04].forEach((d, i) => a.perc(i % 2 ? 'hat' : 'snare', t + d, v * (i ? 0.55 : 0.9)));
    }
    // claps on every beat from t0 to t1; dyn(t) gives the loudness 0..1; lights a grid of beat cells
    function claps(t0, t1, dyn, g) {
      for (let t = t0, i = 0; t < t1 - 0.05; t += BEAT, i++) {
        const v = dyn(t); clap(t, v);
        if (g && v > 0) g.active.push({ t0: t, t1: t + BEAT * 0.8, i: i % g.cells.length });
      }
    }
    // a generic fanfare on D major chord tones
    function fanfare(t, vel = 0.17) {
      [['A4', 0], ['D5', 0.25], ['F#5', 0.5], ['A5', 0.75]].forEach(([n, u], i) => a.note(n, t + u, i === 3 ? 0.9 : 0.2, { vel, tone: BRASS, show: false }));
    }
    const CLAPCELLS = (big = []) => Array.from({ length: 8 }, (_, i) => ({ label: i % 2 ? '2' : '1', sub: 'CLAP', color: i % 2 ? TEAL : GOLD,
      size: big[i] ?? (i % 2 ? 44 : 60), subSize: 20 }));

    // ---- hook (cover): the march with claps on every beat, lit on a 2/4 grid ----
    const h1 = S('hook').t1;
    const g0 = a.grid(CLAPCELLS(), 0.15, h1, { rows: 1, cols: 8, cw: 118, chh: 170, y: 560, revealStep: 0.04, caption: 'FOUR BARS OF 2/4 · CLAP ON THE BEAT' });
    march(0.3, h1 - 0.5, PROG, { vel: 0.9 });
    claps(0.3, h1 - 0.5, () => 0.8, g0);
    fanfare(0.3);
    a.ch('D', h1 - 0.5, h1, { notes: ['F#3', 'A3', 'D4'], bass: 'D2', vel: 0.6, shape: false });
    a.big('THE AUDIENCE PLAYS TOO', 0.3, h1, { y: 900, size: 54, color: GOLD, blur: 18 });

    // ---- what: Strauss I, 1848, Field Marshal Radetzky ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'D', a.T.MAJOR, { popIn: { t0: w0 + 0.05, step: 0.04 } });
    march(w0 + 0.1, w1, PROG, { vel: 0.6 });
    a.tag('D', a.w('what', 'Radetzky'), w1, 'D MAJOR', { dr: -92, color: GOLD });
    a.big('FIELD MARSHAL', a.w('what2', 'Field') - 0.05, w1, { y: 462, size: 46, ...MONO, color: WHITE, blur: 8 });

    // ---- ny: the New Year's Concert - louder, softer, silent ----
    const n0 = S('ny').t0, n1 = S('ny').t1;
    const tL = a.w('ny3', 'louder') - 0.05, tS = a.w('ny3', 'softer') - 0.05, tQ = a.w('ny3', 'silent') - 0.05;
    const gn = a.grid([
      { label: 'LOUDER', sub: 'CLAP!', color: GOLD, size: 50, subSize: 22 },
      { label: 'softer', sub: 'clap', color: TEAL, size: 44, subSize: 22 },
      { label: 'SILENT', sub: '· · ·', color: GREY, size: 46, subSize: 22 },
    ], a.at('ny2') - 0.1, n1, { rows: 1, cols: 3, cw: 320, chh: 230, y: 560, revealStep: 0.12 });
    const tD = a.end('ny3') + 0.3; // then a short demo: loud, soft, silent
    gn.active.push({ t0: tL, t1: tS, i: 0 }, { t0: tS, t1: tQ, i: 1 }, { t0: tQ, t1: tD, i: 2 },
      { t0: tD, t1: tD + 1.0, i: 0 }, { t0: tD + 1.0, t1: tD + 2.0, i: 1 }, { t0: tD + 2.0, t1: n1, i: 2 });
    a.big('THE TRADITIONAL FINALE', n0 + 0.2, a.at('ny2') - 0.1, { y: 640, size: 56, color: GOLD, blur: 16 });
    a.big('VIENNA · NEW YEAR', n0 + 0.4, a.at('ny2') - 0.1, { y: 740, size: 40, ...MONO, color: GREY, blur: 0 });
    a.big('THE AUDIENCE CLAPS ALONG', a.w('ny2', 'clapping') - 0.05, tL, { y: 920, size: 44, ...MONO, color: WHITE, blur: 8 });
    a.big('THE CONDUCTOR DECIDES', tL, n1, { y: 920, size: 46, ...MONO, color: GOLD, blur: 8 });
    march(n0 + 0.1, n1 - 0.2, PROG, { vel: 0.55, shape: false });
    claps(a.w('ny2', 'clapping') - 0.05, n1 - 0.2, t => (t < tL ? 0.55 : t < tS ? 1 : t < tQ ? 0.3 : t < tD - 0.05 ? 0 : t < tD + 0.95 ? 1 : t < tD + 1.95 ? 0.25 : 0));

    // ---- why1: 2/4 - ONE, two ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const g1 = a.grid([{ label: 'ONE', sub: 'STRONG', color: GOLD, size: 84 }, { label: 'two', sub: 'WEAK', color: TEAL, size: 60 }],
      y0 + 0.1, y1, { rows: 1, cols: 2, cw: 400, chh: 270, y: 560, revealStep: 0.15 });
    a.big('2 / 4', a.w('why1', 'two') - 0.05, a.at('why1b'), { y: 970, size: 120, color: GOLD, blur: 26 });
    a.big('TWO BEATS PER BAR', a.at('why1b'), a.w('why1b', 'Easy') - 0.05, { y: 970, size: 46, ...MONO, color: WHITE, blur: 8 });
    a.big('EASY TO CLAP', a.w('why1b', 'Easy') - 0.05, y1, { y: 970, size: 64, color: GOLD, blur: 16 });
    const tM = a.w('why1', 'march') - 0.05;
    march(tM, y1, PROG, { vel: 0.6, shape: false });
    const cnt = [a.w('why1b', 'one'), a.w('why1b', 'two'), a.w('why1b', 'One'), a.w('why1b', 'two', 1)];
    for (let t = tM, i = 0; t < y1 - 0.05; t += BEAT, i++) g1.active.push({ t0: t, t1: t + BEAT * 0.8, i: i % 2 });
    cnt.forEach((t, i) => clap(t, i % 2 ? 0.45 : 0.9));
    claps(a.w('why1b', 'Easy') - 0.05, y1, () => 0.7);

    // ---- why2: loud and soft - the conductor's game ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const tLoud = a.w('why2', 'loud') - 0.05, tSoft = a.w('why2', 'soft') - 0.05;
    const SIZES = [72, 56, 72, 56, 34, 28, 34, 28];
    const cells2 = CLAPCELLS(SIZES).map((c, i) => ({ ...c, sub: i < 4 ? 'LOUD' : 'soft', color: i < 4 ? GOLD : TEAL }));
    const g2 = a.grid(cells2, z0 + 0.1, z1, { rows: 1, cols: 8, cw: 118, chh: 190, y: 560, revealStep: 0.04, caption: 'LOUD BARS · SOFT BARS' });
    march(z0 + 0.1, z1, PROG, { vel: 0.6, shape: false });
    claps(tLoud, z1, t => (Math.floor((t - tLoud) / (4 * BEAT) + 1e-6) % 2 ? 0.25 : 1), g2);
    a.big('LOUD', tLoud, tSoft, { y: 940, size: 110, color: GOLD, blur: 30 });
    a.big('soft', tSoft, a.at('why2b') - 0.05, { y: 940, size: 60, color: TEAL, blur: 6 });
    a.big('A GAME WITH THE AUDIENCE', a.w('why2b', 'game') - 0.05, z1, { y: 940, size: 44, ...MONO, color: WHITE, blur: 8 });

    // ---- why3: march - trio - march ----
    const q0 = S('why3').t0, q1 = S('why3').t1;
    const g3 = a.grid([
      { label: 'MARCH', sub: 'MAIN', color: GOLD, size: 50, subSize: 22 },
      { label: 'TRIO', sub: 'NEW KEY · MOOD', color: LILAC, size: 54, subSize: 20 },
      { label: 'MARCH', sub: 'RETURNS', color: GOLD, size: 50, subSize: 22 },
    ], q0 + 0.1, q1, { rows: 1, cols: 3, cw: 320, chh: 230, y: 560, revealStep: 0.12 });
    const tTrio = a.w('why3', 'trio') - 0.05, tBack = a.w('why3b', 'main') - 0.05;
    g3.active.push({ t0: q0 + 0.2, t1: tTrio, i: 0 }, { t0: tTrio, t1: tBack, i: 1 }, { t0: tBack, t1: q1, i: 2 });
    march(q0 + 0.15, tTrio, PROG, { vel: 0.7, shape: false });
    march(tTrio, tBack, TRIO, { vel: 0.45, shape: false });
    march(tBack, q1, PROG, { vel: 0.75, shape: false });
    claps(tBack, q1, () => 0.7);
    a.big('NEW KEY · NEW MOOD', a.w('why3', 'key') - 0.05, tBack, { y: 920, size: 48, ...MONO, color: LILAC, blur: 10 });
    a.big('LIKE STARS AND STRIPES', a.w('why3b', 'Stars') - 0.1, q1, { y: 920, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('BACK HOME', tBack, a.w('why3b', 'Stars') - 0.1, { y: 920, size: 60, color: GOLD, blur: 16 });

    // ---- why4: listeners become performers ----
    const p0 = S('why4').t0, p1 = S('why4').t1;
    const g4 = a.grid([
      { label: 'ORCHESTRA', sub: 'ON STAGE', color: BLUE, size: 48, subSize: 22 },
      { label: 'AUDIENCE', sub: 'CLAPPING', color: GOLD, size: 50, subSize: 22 },
    ], p0 + 0.1, p1, { rows: 1, cols: 2, cw: 440, chh: 250, y: 560, revealStep: 0.15 });
    const tClap = a.w('why4', 'clapping') - 0.05, tPerf = a.w('why4', 'performers') - 0.05;
    g4.active.push({ t0: p0 + 0.2, t1: p1, i: 0 }, { t0: tClap, t1: p1, i: 1 });
    march(p0 + 0.1, p1 - 0.2, PROG, { vel: 0.7, shape: false });
    claps(tClap, p1 - 0.2, () => 0.85);
    a.big('LISTENERS', a.w('why4', 'listeners') - 0.05, tPerf, { y: 940, size: 72, color: GREY, blur: 0 });
    a.big('PERFORMERS', tPerf, a.at('why4b') - 0.05, { y: 940, size: 80, color: GOLD, blur: 24 });
    a.big('PART OF THE MUSIC', a.at('why4b') - 0.05, p1, { y: 940, size: 56, ...MONO, color: WHITE, blur: 10 });

    // ---- essence: the march, everyone clapping, a final D major ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'D', a.T.MAJOR);
    const tJoin = a.w('essence', 'joins') - 0.05;
    const eEnd = e0 + 0.1 + Math.ceil((tJoin + 0.5 - e0 - 0.1) / BAR) * BAR;
    march(e0 + 0.1, eEnd, PROG, { vel: 0.85 });
    claps(e0 + 0.1, eEnd, t => (t < a.w('essence', 'dynamics') - 0.05 ? 0.6 : 0.95));
    a.ch('D', eEnd, e1 - 0.3, { notes: ['F#3', 'A3', 'D4', 'F#4'], bass: 'D2', vel: 0.9, snap: true });
    a.perc('kick', eEnd, 1); clap(eEnd, 1);
    fanfare(eEnd - 0.75, 0.18);
    a.ring(['D', 'F#', 'A'], eEnd, e1, { color: GOLD });
    a.big('STEADY BEAT · DYNAMICS', e0 + 0.3, eEnd, { y: 462, size: 42, ...MONO, color: TEAL, blur: 8 });
    a.big('EVERYONE JOINS IN', eEnd, e1, { y: 462, size: 48, ...MONO, color: GOLD, blur: 12 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
