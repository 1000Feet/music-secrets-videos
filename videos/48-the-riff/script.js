// The riff: a short phrase repeated until it becomes the identity of a song.
// Copyrighted songs: only an ORIGINAL generic riff is played, never the songs' own riffs.
const E8 = 0.3, BAR = 8 * E8;           // eighth notes at 100 BPM
const MB = 0.34, MBAR = 5 * MB;          // Holst's Mars ostinato (public domain), 5/4
const BB = 0.5, BBAR = 3 * BB;           // Boléro-style snare idea, 3/4

module.exports = {
  slug: 'the-riff',
  title: 'The Riff',
  segments: [
    { id: 'hook',    text: 'A few notes, played over and over, can become the whole identity of a song.' },
    { id: 'what',    text: "That's a riff: a short musical phrase that keeps coming back." },
    { id: 's1',      text: 'Seven Nation Army sounds like a bass riff...' },
    { id: 's1b',     text: "but it's Jack White's guitar, pushed an octave down by a pedal." },
    { id: 's1c',     text: 'Today, stadiums around the world chant it.' },
    { id: 's2',      text: 'Keith Richards played the Satisfaction riff through a fuzz pedal: a Gibson Maestro Fuzz-Tone.' },
    { id: 's3',      text: 'And Smoke on the Water is one of the first riffs most guitarists learn.' },
    { id: 'why1',    text: 'So why does it work? Repetition makes a phrase easy to remember.' },
    { id: 'why2',    text: 'Repeat it enough, and the riff becomes a hook.' },
    { id: 'why3',    text: 'Riffs are short: usually just one or two bars.' },
    { id: 'why4',    text: 'And rhythmic, built from a few notes, often from the pentatonic or blues scale.' },
    { id: 'why5',    text: "Classical music has the same idea, the ostinato: the snare in Ravel's Boléro, or Holst's Mars." },
    { id: 'essence', text: "Say it short, and say it again. The riff is music's logo." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'A FEW NOTES', title: 'THE RIFF', accent: true, circle: false, tonic: 9, min: 3 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'A SHORT PHRASE', title: 'ON REPEAT', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 's1', segs: ['s1', 's1b', 's1c'], label: 'YOU HEAR IT IN', title: 'Seven Nation Army', sub: 'The White Stripes · 2003', circle: false, tonic: 9, gap: 0.3, tail: 0.8 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Satisfaction', sub: 'The Rolling Stones · 1965', circle: false, tonic: 9, min: 3 * BAR, tail: 0.8 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Smoke on the Water', sub: 'Deep Purple · 1972', circle: false, tonic: 9, min: 3 * BAR, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'EASY TO REMEMBER', circle: false, tonic: 9, min: 3 * BAR, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'IT BECOMES A HOOK', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE OR TWO BARS', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'A FEW NOTES', title: 'PENTATONIC', tonic: 9, tail: 1.4 },
    { id: 'why5', segs: ['why5'], label: 'IN CLASSICAL MUSIC', title: 'THE OSTINATO', circle: false, tonic: 7, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: "MUSIC'S LOGO", accent: true, circle: false, tonic: 9, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', RED = '#ff5d6c', PURPLE = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const BIG = { size: 64, ...MONO };

    // our own riff (original): root, root, rest, low b7, root, rest, fifth, fourth  (A minor pentatonic)
    const RIFF = ['A2', 'A2', null, 'G2', 'A2', null, 'E3', 'D3'];
    const NCOL = { A: PINK, G: PURPLE, E: TEAL, D: '#7be07b' };
    const CELLS = RIFF.map((n, i) => ({ label: n ? n[0] : '·', sub: ['1', '&', '2', '&', '3', '&', '4', '&'][i], color: n ? NCOL[n[0]] : '#55555d', size: n ? 60 : 50 }));
    const roll = (t0, t1, o = {}) => a.grid(CELLS, t0, t1, { rows: 1, cols: 8, cw: 122, chh: 200, y: 560, caption: 'THE RIFF · ONE BAR', ...o });
    const shift = (n, oct) => n.replace(/\d/, d => String(Number(d) + oct));

    // one bar of riff + drums. o.oct transposes, o.grid lights the cells, o.drums toggles the beat
    function bar(t, o = {}) {
      const vel = o.vel ?? 1, stop = o.stop ?? Infinity;
      RIFF.forEach((n, i) => {
        const tp = t + i * E8;
        if (tp > stop - 0.05) return;
        const g = typeof o.grid === 'function' ? o.grid(tp + 0.01) : o.grid;
        if (g) g.active.push({ t0: tp, t1: tp + E8, i });
        if (n) {
          const m = shift(n, o.oct ?? 0), len = i === 7 ? E8 * 1.6 : E8 * 0.8;
          a.note(m, tp, len, { vel: 0.5 * vel, show: false });
          if (o.double) a.note(shift(n, (o.oct ?? 0) + 1), tp, len, { vel: 0.22 * vel, show: false });
        }
        if (o.drums !== false) {
          a.perc('hat', tp, (i % 2 ? 0.22 : 0.38) * vel);
          if (i === 0 || i === 3 || i === 4) a.perc('kick', tp, 0.85 * vel);
          if (i === 2 || i === 6) a.perc('snare', tp, 0.7 * vel);
        }
      });
    }
    let loopN = 0;
    const run = (t0, t1, o = {}) => {
      let n = 0;
      for (let t = t0; t < t1 - 0.6; t += BAR, n++) {
        bar(t, { ...o, stop: t1, n });
        if (o.count) { loopN++; a.big('LOOP × ' + loopN, t, Math.min(t + BAR, t1), { y: 1100, size: 30, ...MONO, color: '#8a8a92', blur: 0 }); }
      }
      return n;
    };

    // ---- part 1: one riff, looping under everything ----
    const gA = roll(0.3, S('what').t1, { revealStep: 0.08 });
    run(0.3, a.w('hook', 'over'), { grid: gA, drums: false, vel: 0.8 , count: true });
    run(a.w('hook', 'over'), S('what').t1, { grid: gA , count: true });
    a.big('A FEW NOTES', a.w('hook', 'few'), a.w('hook', 'over'), { y: 940, ...BIG, color: '#ffffff' });
    a.big('OVER AND OVER', a.w('hook', 'over'), S('hook').t1, { y: 940, ...BIG, color: GOLD });
    a.big('RIFF = A SHORT PHRASE', a.w('what', 'riff'), S('what').t1, { y: 940, size: 52, ...MONO, color: PINK });
    a.big('ON REPEAT', a.w('what', 'keeps'), S('what').t1, { y: 1030, size: 52, ...MONO, color: GOLD });

    // s1: guitar, then the same riff an octave down
    const tDown = a.w('s1b', 'octave') - 0.1;
    const g1 = roll(S('s1').t0, S('s1').t1);
    run(S('s1').t0 + 0.05, tDown, { grid: g1, oct: 1, vel: 0.85 , count: true });
    run(tDown, S('s1').t1, { grid: g1, oct: 0 , count: true });
    a.big('GUITAR', a.w('s1b', 'guitar'), tDown + 0.2, { y: 940, ...BIG, color: TEAL });
    a.big('ONE OCTAVE DOWN ↓', tDown + 0.2, a.at('s1c'), { y: 940, size: 56, ...MONO, color: GOLD });
    a.big('STADIUMS CHANT IT', a.w('s1c', 'stadiums'), S('s1').t1, { y: 940, size: 56, ...MONO, color: PINK });

    // s2: fuzz pedal
    const g2 = roll(S('s2').t0, S('s2').t1);
    run(S('s2').t0 + 0.05, S('s2').t1, { grid: g2, double: true , count: true });
    a.big('FUZZ PEDAL', a.w('s2', 'fuzz'), S('s2').t1, { y: 940, ...BIG, color: RED });
    a.big('GIBSON MAESTRO FUZZ-TONE', a.w('s2', 'Gibson'), S('s2').t1, { y: 1030, size: 34, ...MONO, color: '#b9b9c2', blur: 0 });

    // s3: the first riff you learn
    const g3 = roll(S('s3').t0, S('s3').t1);
    run(S('s3').t0 + 0.05, S('s3').t1, { grid: g3, oct: 1 , count: true });
    a.big('LESSON ONE', a.w('s3', 'first'), S('s3').t1, { y: 940, ...BIG, color: BLUE });

    // ---- part 2 ----
    // why1 + why2: count the repetitions, the riff turns into a hook
    const w0 = S('why1').t0 + 0.05;
    const g4 = roll(S('why1').t0, S('why2').t1);
    const n4 = run(w0, S('why2').t1, { grid: g4, vel: 0.85 });
    for (let k = 0; k < n4; k++) {
      const t = w0 + k * BAR;
      if (t < a.w('why2', 'hook') - 0.3) a.big('× ' + (k + 1), t, Math.min(t + BAR, a.w('why2', 'hook')), { y: 960, size: 110, ...MONO, color: k < 2 ? '#ffffff' : GOLD });
    }
    a.big('HOOK', a.w('why2', 'hook'), S('why2').t1, { y: 960, size: 120, color: GOLD });

    // why3: short - one or two bars
    const BARS = [{ label: 'BAR 1', color: PINK, size: 52, sub: 'THE RIFF' }, { label: 'BAR 2', color: TEAL, size: 52, sub: 'AGAIN' }];
    const g5 = roll(S('why3').t0, S('why3').t1, { y: 520 });
    const gb = a.grid(BARS, a.w('why3', 'one'), S('why3').t1, { rows: 1, cols: 2, cw: 420, chh: 170, y: 800 });
    let k5 = 0;
    for (let t = S('why3').t0 + 0.05; t < S('why3').t1 - 0.6; t += BAR, k5++) {
      bar(t, { grid: g5, stop: S('why3').t1, vel: 0.8 });
      gb.active.push({ t0: Math.max(t, a.w('why3', 'one')), t1: Math.min(t + BAR, S('why3').t1), i: k5 % 2 });
    }

    // why4: on the circle - only a handful of notes, the minor pentatonic (then the blues note)
    const p0 = S('why4').t0, tBl = a.w('why4', 'blues');
    a.scale(p0, 'A', [0, 3, 5, 7, 10], { popIn: { t0: a.w('why4', 'few'), step: 0.15 } });
    a.scale(tBl, 'A', [0, 3, 5, 6, 7, 10]);
    a.ring(['Eb'], tBl + 0.1, S('why4').t1, { color: BLUE });
    a.ring(['A', 'C', 'D', 'E', 'G'], a.w('why4', 'pentatonic'), tBl, { color: GOLD });
    a.big('5 NOTES', a.w('why4', 'pentatonic'), tBl, { y: 830, size: 64, ...MONO, color: GOLD });
    a.big('+ BLUE NOTE', tBl, S('why4').t1, { y: 830, size: 44, ...MONO, color: BLUE });
    a.big('A FEW NOTES', a.w('why4', 'few'), a.w('why4', 'pentatonic'), { y: 830, size: 52, ...MONO, color: '#ffffff' });
    let k6 = 0;
    for (let t = p0 + 0.05; t < S('why4').t1 - 0.6; t += BAR, k6++) {
      RIFF.forEach((n, i) => {
        const tp = t + i * E8;
        if (tp > S('why4').t1 - 0.1) return;
        if (n) a.note(shift(n, 1), tp, E8 * 0.8, { vel: 0.4 });
        a.perc('hat', tp, i % 2 ? 0.18 : 0.3);
        if (i === 0 || i === 4) a.perc('kick', tp, 0.6);
      });
    }
    a.ch('Am', p0 + 0.05, S('why4').t1 - 0.1, { notes: ['A3', 'C4', 'E4'], bass: false, vel: 0.35, hideName: false, shape: false, label: 'Am PENT.' });

    // why5: the ostinato - a Boléro-like snare figure, then Holst's Mars rhythm on G
    const tRav = a.w('why5', "Ravel's") - 0.1, tMars = a.w('why5', "Holst's") - 0.1;
    const PAD3 = [1, 2, 3].map(n => ({ label: String(n), color: GOLD, size: 72 }));
    const PAD5 = [1, 2, 3, 4, 5].map(n => ({ label: String(n), color: RED, size: 72 }));
    a.big('SAME IDEA', S('why5').t0 + 0.2, a.w('why5', 'ostinato'), { y: 940, size: 64, ...MONO, color: '#ffffff' });
    a.big('OSTINATO', a.w('why5', 'ostinato'), tRav, { y: 940, size: 96, color: GOLD });
    const gO = roll(S('why5').t0, tRav, { caption: 'A REPEATED PATTERN' });
    run(S('why5').t0 + 0.05, tRav, { grid: gO, vel: 0.6, drums: false });
    const gR = a.grid(PAD3, tRav, tMars, { rows: 1, cols: 3, cw: 260, chh: 200, y: 560, caption: 'BOLÉRO · SNARE' });
    const SN = [0, 0.5, 0.5 + 1 / 6, 0.5 + 2 / 6, 1, 1.5, 1.5 + 1 / 6, 1.5 + 2 / 6, 2, 2.5];
    for (let t = tRav; t < tMars - 0.3; t += BBAR) SN.forEach(h => {
      const tt = t + h * BB;
      if (tt < tMars - 0.05) { a.perc('snare', tt, Number.isInteger(h) ? 0.8 : 0.5); gR.active.push({ t0: tt, t1: tt + 0.12, i: Math.floor(h) }); }
    });
    a.ch('C', tRav, tMars, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.4, strikes: [{ o: 0, v: 1 }, { o: 3 * BB, v: 0.8 }], shape: false, hideName: true });
    const gM = a.grid(PAD5, tMars, S('why5').t1, { rows: 1, cols: 5, cw: 180, chh: 200, y: 560, caption: 'MARS · 5/4' });
    for (let t = tMars; t < S('why5').t1 - 0.3; t += MBAR) {
      for (let b = 0; b < 5; b++) {
        const tb = t + b * MB;
        if (tb > S('why5').t1 - 0.1) break;
        gM.active.push({ t0: tb, t1: tb + MB, i: b });
        const hits = b === 0 ? [0, 1 / 3, 2 / 3] : b === 1 ? [0, 0.5] : [0];
        hits.forEach(h => { a.note('G2', tb + h * MB, MB * 0.3, { vel: 0.5 }); a.note('G3', tb + h * MB, MB * 0.3, { vel: 0.3 }); a.perc('kick', tb + h * MB, b === 0 || b === 3 ? 0.7 : 0.45); });
      }
    }
    a.big('RAVEL · BOLÉRO', tRav, tMars, { y: 940, size: 52, ...MONO, color: GOLD });
    a.big('HOLST · MARS', tMars, S('why5').t1, { y: 940, size: 52, ...MONO, color: RED });

    // essence: the riff twice more, then one big final hit
    const e0 = S('essence').t0 + 0.1;
    const gE = roll(S('essence').t0, S('essence').t1);
    run(e0, e0 + 3 * BAR, { grid: gE });
    const eHit = e0 + 3 * BAR;
    a.note('A1', eHit, 2.5, { vel: 0.5, show: false }); a.note('A2', eHit, 2.5, { vel: 0.45 }); a.note('E3', eHit, 2.5, { vel: 0.35 });
    a.perc('kick', eHit, 1); a.perc('snare', eHit, 0.7);
    for (let i = 0; i < 8; i++) gE.active.push({ t0: eHit, t1: S('essence').t1, i });
    a.big('SAY IT SHORT', a.w('essence', 'short'), a.w('essence', 'again'), { y: 940, ...BIG, color: '#ffffff' });
    a.big('SAY IT AGAIN', a.w('essence', 'again'), a.w('essence', 'logo') - 0.1, { y: 940, ...BIG, color: GOLD });
    a.big("MUSIC'S LOGO", a.w('essence', 'logo') - 0.1, S('essence').t1, { y: 940, size: 80, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
