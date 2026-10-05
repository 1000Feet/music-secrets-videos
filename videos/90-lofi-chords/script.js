// Why lo-fi sounds so relaxing: jazzy seventh and ninth chords, a lazy swung beat, and a softened sound.
// All music here is original: generic chords and beats, nothing taken from any stream or record.
const B = 0.72;            // about 83 BPM
const SW = B * 0.6;        // a lazy swing for the off-beat eighths
const LATE = 0.035;        // the snare sits a little behind the beat

module.exports = {
  slug: 'lofi-chords',
  title: 'Why Lo-fi Relaxes',
  segments: [
    { id: 'hook',    text: 'Why does lo-fi sound so relaxing? Three tricks: chords, beat, and sound.' },
    { id: 's1',      text: 'Since 2017, Lofi Girl, formerly ChilledCow, has streamed lofi hip hop radio around the clock.' },
    { id: 's1b',     text: 'It made the genre a worldwide study soundtrack.' },
    { id: 's2',      text: 'Its roots: J Dilla, known for loose, off-grid drums...' },
    { id: 's3',      text: 'and Nujabes, known for jazz-based hip hop.' },
    { id: 'why1',    text: 'So why does it work? First, the chords: sevenths and ninths, borrowed from jazz.' },
    { id: 'why2',    text: 'Major and minor seventh chords contain no tritone. Nothing demands to resolve.' },
    { id: 'why2b',   text: 'The music just floats.' },
    { id: 'why3',    text: 'Progressions hover, like two five moves that never land on the home chord.' },
    { id: 'why4',    text: 'Then the beat: slow, roughly 70 to 90 beats per minute, with a lazy swing.' },
    { id: 'why4b',   text: 'The drums sit slightly off the grid, like a human playing behind the beat.' },
    { id: 'why5',    text: 'And the sound is filtered: highs rolled off, vinyl crackle, tape wobble.' },
    { id: 'why5b',   text: 'Warm and muffled, like a memory.' },
    { id: 'essence', text: 'Chords that never ask to resolve, a beat that leans back. Music designed to let you breathe.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'CHORDS · BEAT · SOUND', title: 'WHY LO-FI RELAXES', accent: true, tonic: 0, row: ['Fmaj7', 'Em7', 'Dm9', 'Cmaj9'], tail: 0.6 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'lofi hip hop radio', sub: 'Lofi Girl · since 2017', circle: false, gap: 0.3, tail: 0.8 },
    { id: 's2', segs: ['s2'], label: 'THE ROOTS', title: 'J Dilla', sub: 'loose, off-grid drums', tonic: 0, tail: 1.6 },
    { id: 's3', segs: ['s3'], label: 'THE ROOTS', title: 'Nujabes', sub: 'jazz-based hip hop', tonic: 0, tail: 2.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'JAZZ CHORDS', tonic: 0, row: ['Fmaj7', 'Em7', 'Dm9', 'Cmaj9'], tail: 1.2 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'NO TRITONE', tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'NEVER LANDING', tonic: 0, row: ['Dm9', 'G9'], tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'A LAZY BEAT', circle: false, gap: 0.3, tail: 1.0 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'WHY IT WORKS', title: 'A SOFTENED SOUND', circle: false, gap: 0.3, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LET YOU BREATHE', accent: true, tonic: 0, row: ['Fmaj7', 'Em7', 'Dm9', 'Cmaj9'], gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', RED = '#ff5d6c', GREY = '#6a6a72';
    const MONO = { family: 'DM Mono', weight: 500 };
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 46, ...MONO, ...o });
    // the loop: chord symbol, parse name, voicing, bass
    const C = {
      Fmaj7: ['Fmaj7', ['F3', 'A3', 'C4', 'E4'], 'F2'],
      Em7: ['Em7', ['D3', 'G3', 'B3', 'E4'], 'E2'],
      Dm9: ['Dm7', ['D3', 'F3', 'A3', 'C4', 'E4'], 'D2'],
      Cmaj9: ['Cmaj7', ['E3', 'G3', 'B3', 'C4', 'D4'], 'C2'],
      G9: ['G7', ['G3', 'B3', 'D4', 'F4', 'A4'], 'G2'],
    };
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    // one chord, struck softly on the beat and again, lazily, before the next
    const chord = (sym, t0, t1, o = {}) => {
      const [n, v, b] = C[sym], len = t1 - t0;
      const strikes = [{ o: 0.02, v: 1 }];
      if (len > 2 * B) strikes.push({ o: 1.5 * B + SW - B / 2, v: 0.45 });
      return a.ch(n, t0, t1, { notes: v, bass: b, label: sym, row: o.row ?? null, vel: o.vel ?? 0.6, strikes, hideName: o.hideName, shape: o.shape });
    };
    // a loop of chords, `beats` beats each
    const loop = (syms, t0, t1, o = {}) => {
      const per = (o.beats ?? 2) * B; let i = 0, t = t0;
      for (; t < t1 - 0.3; t += per, i++) chord(syms[i % syms.length], t, Math.min(t + per, t1), { row: o.rows ? i % syms.length : null, vel: o.vel, hideName: o.hideName, shape: o.shape });
      return t;
    };
    // the lazy beat: kick on 1 and the swung "and" of 2, snare a little late on 2 and 4, swung hats
    // o.grid: light the eight cells; o.loose: extra random drift (the off-grid feel)
    const drums = (t0, t1, o = {}) => {
      const v = o.vel ?? 0.7;
      for (let i = 0, t = t0; t < t1 - 0.1; i++, t += B) {
        const k = i % 4, drift = () => (o.loose ? (rnd() - 0.3) * 0.05 : 0);
        if (k === 0) a.perc('kick', t + drift(), 0.8 * v);
        if (k === 1) a.perc('kick', t + SW + drift(), 0.55 * v);
        if (k === 1 || k === 3) a.perc('snare', t + LATE + drift(), 0.5 * v);
        a.perc('hat', t + drift(), 0.22 * v); a.perc('hat', t + SW + drift(), 0.14 * v);
        if (o.grid) { o.grid.active.push({ t0: t, t1: t + SW, i: k * 2 }); o.grid.active.push({ t0: t + SW, t1: t + B, i: k * 2 + 1 }); }
        if (o.crackle) for (let c = 0; c < 3; c++) a.perc('hat', t + rnd() * B, 0.04 + rnd() * 0.05);
      }
    };
    const LOOP = ['Fmaj7', 'Em7', 'Dm9', 'Cmaj9'];

    // ---------- hook: the loop and the beat, at once ----------
    const h1 = S('hook').t1;
    a.scale(0, 'C', a.T.MAJOR);
    loop(LOOP, 0.05, h1, { rows: true, vel: 0.6 });
    drums(0.05, h1, { vel: 0.6 });

    // ---------- s1: the stream ----------
    const s0 = S('s1').t0, s1 = S('s1').t1;
    const g = a.grid([{ label: '2017', sub: 'SINCE', color: GOLD, size: 96 }, { label: '24/7', sub: 'LIVE STREAM', color: PINK, size: 96 }],
      s0 + 0.1, s1, { rows: 1, cols: 2, cw: 420, chh: 300, y: 560, revealStep: 0.3 });
    g.active.push({ t0: a.w('s1', '2017') - 0.05, t1: a.w('s1', 'streamed') - 0.05, i: 0 }, { t0: a.w('s1', 'clock') - 0.3, t1: a.at('s1b'), i: 1 });
    a.big('FORMERLY CHILLEDCOW', a.w('s1', 'formerly') - 0.05, a.at('s1b'), { y: 960, size: 40, ...MONO, color: '#b9b9c2', blur: 0 });
    a.big('A STUDY SOUNDTRACK', a.at('s1b') + 0.2, s1, { y: 960, size: 48, ...MONO, color: TEAL });
    loop(LOOP, s0 + 0.1, s1, { vel: 0.45, shape: false, hideName: true });
    drums(s0 + 0.1, s1, { vel: 0.45 });

    // ---------- s2: J Dilla - loose, off-grid drums (an original groove) ----------
    const d0 = S('s2').t0 + 0.1, d1 = S('s2').t1;
    a.scale(S('s2').t0, 'C', a.T.MAJOR);
    loop(LOOP, d0, d1, { vel: 0.5 });
    drums(d0, d1, { vel: 0.8, loose: true });
    big('OFF THE GRID', a.w('s2', 'loose'), d1, { color: PINK });

    // ---------- s3: Nujabes - jazz-based hip hop (an original jazzy line over the loop) ----------
    const n0 = S('s3').t0 + 0.1, n1 = S('s3').t1;
    a.scale(S('s3').t0, 'C', a.T.MAJOR);
    loop(LOOP, n0, n1, { vel: 0.55 });
    drums(n0, n1, { vel: 0.6 });
    a.melody([['E5', 1], ['D5', 0.5], ['C5', 0.5], ['B4', 1.5], [null, 0.5], ['A4', 0.5], ['C5', 0.5], ['E5', 1], ['D5', 2]], a.end('s3') + 0.1, B, { vel: 0.28 });
    big('JAZZ + HIP HOP', a.w('s3', 'known'), n1, { color: GOLD });

    // ---------- why1: the four chords ----------
    const y0 = S('why1').t0, tSev = a.w('why1', 'sevenths') - 0.05;
    a.scale(y0, 'C', a.T.MAJOR);
    chord('Cmaj9', y0 + 0.1, tSev, { vel: 0.4, hideName: true, shape: false });
    loop(LOOP, tSev, S('why1').t1, { rows: true, vel: 0.65 });

    // ---------- why2: no tritone inside - nothing pulls ----------
    const z0 = S('why2').t0, tNo = a.w('why2', 'tritone') - 0.05, tFl = a.at('why2b') - 0.05, z1 = S('why2').t1;
    a.scale(z0, 'C', a.T.MAJOR);
    chord('Fmaj7', z0 + 0.1, tNo, { vel: 0.6 });
    chord('Em7', tNo, tFl, { vel: 0.6 });
    big('NO TRITONE', tNo, a.w('why2', 'Nothing') - 0.05, { color: TEAL, size: 56 });
    big('NOTHING PULLS', a.w('why2', 'Nothing') - 0.05, tFl, { color: TEAL });
    loop(['Dm9', 'Cmaj9'], tFl, z1, { beats: 2, vel: 0.5 });
    big('IT FLOATS', tFl, z1, { color: LILAC, size: 56 });
    for (let k = 0; k < 4; k++) a.note(['B4', 'D5', 'E5', 'G5'][k], tFl + 0.2 + k * 0.45, 0.6, { vel: 0.16 });

    // ---------- why3: ii - V, never home ----------
    const v0 = S('why3').t0 + 0.05, v1 = S('why3').t1;
    a.scale(S('why3').t0, 'C', a.T.MAJOR);
    loop(['Dm9', 'G9'], v0, v1, { rows: true, beats: 3, vel: 0.6 });
    drums(v0, v1, { vel: 0.5 });
    a.ghost('Cmaj7', a.w('why3', 'home'), v1, { label: 'HOME?', ly: 120, color: '#b9b9c2' });

    // ---------- why4: slow and lazy - a grid of eighths, the off-beats late ----------
    const b0 = S('why4').t0, tOff = a.at('why4b') - 0.05, b1 = S('why4').t1;
    const CELLS = [...Array(8)].map((_, i) => ({ label: i % 2 ? '&' : String(i / 2 + 1), color: i % 2 ? TEAL : PINK, size: 50 }));
    const gb = a.grid(CELLS, b0 + 0.1, b1, { rows: 1, cols: 8, cw: 120, chh: 150, y: 540, caption: 'SWUNG EIGHTHS' });
    drums(b0 + 0.1, b1, { vel: 0.8, grid: gb, loose: true });
    loop(LOOP, b0 + 0.1, b1, { vel: 0.4, shape: false, hideName: true });
    a.big('70–90 BPM', a.w('why4', 'slow'), tOff, { y: 900, size: 72, ...MONO, color: GOLD });
    a.big('BEHIND THE BEAT', tOff, b1, { y: 900, size: 56, ...MONO, color: PINK });
    a.big('→ a little late', a.w('why4b', 'behind'), b1, { y: 990, size: 34, ...MONO, color: '#b9b9c2', blur: 0 });

    // ---------- why5: the filtered sound ----------
    const f0 = S('why5').t0, f1 = S('why5').t1;
    const FX = [{ label: 'LOW-PASS', sub: 'HIGHS ROLLED OFF', color: BLUE, size: 54 }, { label: 'CRACKLE', sub: 'VINYL', color: GOLD, size: 54 }, { label: 'WOBBLE', sub: 'TAPE', color: LILAC, size: 54 }];
    const gf = a.grid(FX, f0 + 0.1, f1, { rows: 3, cols: 1, cw: 640, chh: 165, y: 500, revealStep: 0 });
    [['highs', 0], ['vinyl', 1], ['tape', 2]].forEach(([w, i]) => gf.active.push({ t0: a.w('why5', w) - 0.05, t1: f1, i }));
    loop(LOOP, f0 + 0.1, f1, { vel: 0.45, shape: false, hideName: true });
    drums(f0 + 0.1, f1, { vel: 0.5, crackle: true });
    // tape wobble: a soft line drifting slightly sharp and flat
    const tw = a.w('why5', 'tape') - 0.05;
    [[76.12, 0], [74.9, 1], [71.1, 2], [72.88, 3]].forEach(([m, k]) => a.note(m, tw + 0.3 + k * 0.7, 0.65, { vel: 0.15, show: false }));
    a.big('WARM · MUFFLED', a.at('why5b'), f1, { y: 1080, size: 50, ...MONO, color: GOLD });

    // ---------- essence: the loop, leaning back, ending on Cmaj9 that never quite lands ----------
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'C', a.T.MAJOR);
    const eL = loop(LOOP, e0, a.at('cta') + 0.4, { rows: true, vel: 0.6 });
    drums(e0, eL, { vel: 0.6 });
    a.ch('Cmaj7', eL, e1 + 0.1, { notes: ['E3', 'G3', 'B3', 'C4', 'D4'], bass: 'C2', label: 'Cmaj9', row: 3, vel: 0.55 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
