// Bach's Cello Suite No. 1, Prelude: one line of notes, and the ear builds the chords.
// Brief/copyright: public domain - the opening four bars ARE played, exactly as given in the brief
// (each eight-note pattern twice per bar), on an additive "cello" tone. Chord shapes on the circle are
// silent (mute) so the keyboard only lights the notes the cello actually plays.
const S16 = 0.17;   // one sixteenth note
const PAT = {
  G:  ['G2', 'D3', 'B3', 'A3', 'B3', 'D3', 'B3', 'D3'],
  C:  ['G2', 'E3', 'C4', 'B3', 'C4', 'E3', 'C4', 'E3'],
  D7: ['G2', 'F#3', 'C4', 'B3', 'C4', 'F#3', 'C4', 'F#3'],
};
// the four bars: [pattern, chord label, chord tones for the shape, row index]
const BARS = [['G', 'G', ['G3', 'B3', 'D4'], 0], ['C', 'C/G', ['G3', 'C4', 'E4'], 1], ['D7', 'D7/G', ['G3', 'C4', 'F#4'], 2], ['G', 'G', ['G3', 'B3', 'D4'], 3]];
const ROW = ['I', 'IV', 'V7', 'I'];
const CELLO = { partials: [1, 0.75, 0.55, 0.4, 0.3, 0.2, 0.14, 0.1], attack: 0.02, release: 0.18 };

module.exports = {
  slug: 'bach-cello-suite',
  title: "Bach's Cello Suite No. 1",
  segments: [
    { id: 'hook',    text: 'One instrument, mostly one note at a time... yet you hear full chords.' },
    { id: 'what',    text: "This is the Prelude from Bach's Cello Suite No. 1, in G major." },
    { id: 'what2',   text: 'Bach wrote six cello suites, around 1720.' },
    { id: 'casals',  text: 'As a teenager, the cellist Pablo Casals found an old edition in a Barcelona shop.' },
    { id: 'casals2', text: 'Later, he made the first complete recording, from 1936 to 1939... and made them famous.' },
    { id: 'why1',    text: 'So why does it work? Listen to the lowest note.' },
    { id: 'why1b',   text: 'The open G string comes back at the start of each pattern, like a bass note. A pedal point.' },
    { id: 'why2',    text: 'Above it, the notes outline chords.' },
    { id: 'why2b',   text: 'G major. C major over G. D seven over G. And G again.' },
    { id: 'why2c',   text: 'One, four, five, one.' },
    { id: 'why3',    text: 'The cello mostly plays one note at a time... but your ear connects them into chords.' },
    { id: 'why4',    text: 'And the same pattern repeats, with small changes...' },
    { id: 'why4b',   text: "a hypnotic flow, like Bach's Prelude in C." },
    { id: 'essence', text: 'One line of notes, and the ear builds the chords. A whole orchestra inside one cello.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'J. S. BACH · c. 1720', title: 'CELLO SUITE NO. 1', accent: true, tonic: 7, min: 0.3 + 32 * S16 + 0.3 },
    { id: 'what', segs: ['what'], label: 'THE PRELUDE', title: 'CELLO SUITE NO. 1', sub: 'J. S. Bach · BWV 1007 · in G', tonic: 7, row: ROW, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'BWV 1007–1012', title: 'SIX SUITES', circle: false, tonic: 7, tail: 0.8 },
    { id: 'casals', segs: ['casals', 'casals2'], label: 'THE CELLIST', title: 'PABLO CASALS', circle: false, tonic: 7, gap: 0.35, tail: 1.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE PEDAL POINT', tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'HIDDEN CHORDS', tonic: 7, row: ROW, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE EAR CONNECTS', tonic: 7, tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'A HYPNOTIC FLOW', circle: false, tonic: 7, gap: 0.3, min: 0.2 + 64 * 0.15 + 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'AN ORCHESTRA IN A CELLO', accent: true, tonic: 7, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };

    // the cello plays notes; returns end time. o.until cuts the line; o.ring sustains (ear "holds" them)
    function cello(notes, t0, s = S16, o = {}) {
      let t = t0;
      notes.forEach((n, k) => {
        if (o.until !== undefined && t > o.until - 0.05) return;
        const low = n === 'G2';
        const dur = o.ring ? (o.ring - (t - t0)) : s * 1.05;
        a.note(n, t, Math.max(s, dur), { vel: (o.vel ?? 0.34) * (low ? (o.pedal ?? 1.15) : 1), show: false, tone: CELLO });
        if (o.show !== false) a.note(n, t, s * 0.95, { vel: 0, show: true });
        if (low && o.onPedal) o.onPedal(t);
        t += s;
      });
      return t;
    }
    // one bar of the prelude (pattern twice) with its silent chord shape; returns end
    function bar(i, t0, s = S16, o = {}) {
      const [p, label, tones, row] = BARS[i];
      const reps = o.reps ?? 2;
      let t = t0;
      for (let r = 0; r < reps; r++) t = cello(PAT[p], t, s, o);
      if (o.shape !== false) a.ch(label.replace('D7/G', 'D7'), t0, o.t1 ?? t, { notes: tones, bass: false, mute: true, label, row: o.row === false ? null : row, hideName: o.hideName });
      return t;
    }
    const bars = (from, to, t0, s, o = {}) => { let t = t0; for (let i = from; i < to; i++) t = bar(i, t, s, o); return t; };

    // ---------- hook (cover): bars 1 and 2, chord shapes forming on the circle ----------
    a.scale(0.15, 'G', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.05 } });
    const h1 = bars(0, 2, 0.3, S16);
    a.ch('G', h1, S('hook').t1, { notes: ['G3', 'B3', 'D4'], bass: false, mute: true });
    a.note('G2', h1, S('hook').t1 - h1, { vel: 0.3, tone: CELLO });
    a.tag(0, 0.3, a.w('hook', 'full') - 0.05, 'ONE NOTE AT A TIME', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('hook', 'full') - 0.05, S('hook').t1, 'FULL CHORDS', { x: 540, y: 462, color: GOLD });

    // ---------- what: bars 3 and 4, with I IV V7 I ----------
    const w0 = S('what').t0 + 0.05, ws = Math.min(S16, (S('what').t1 - w0 - 0.4) / 32);
    const w1 = bars(2, 4, w0, ws);
    a.ch('G', w1, S('what').t1, { notes: ['G3', 'B3', 'D4'], bass: false, mute: true, row: 3 });
    a.note('G2', w1, S('what').t1 - w1, { vel: 0.3, tone: CELLO });

    // ---------- what2: six suites, BWV 1007-1012, around 1720 ----------
    const x0 = S('what2').t0, x1 = S('what2').t1;
    const g6 = a.grid([1, 2, 3, 4, 5, 6].map(n => ({ label: 'No. ' + n, sub: 'BWV ' + (1006 + n), size: 46, subSize: 20, color: n === 1 ? GOLD : BLUE })),
      x0 + 0.1, x1, { rows: 2, cols: 3, cw: 300, chh: 170, y: 500, revealStep: 0.08 });
    const tSix = a.w('what2', 'six') - 0.05;
    for (let i = 0; i < 6; i++) g6.active.push({ t0: tSix + i * 0.12, t1: tSix + i * 0.12 + 0.5, i });
    g6.active.push({ t0: tSix + 0.8, t1: x1, i: 0 });
    a.big('AROUND 1720', a.w('what2', 'around') - 0.05, x1, { y: 950, size: 70, color: WHITE, blur: 18 });
    bars(0, 1, x0 + 0.1, Math.min(S16, (x1 - x0 - 0.3) / 16), { show: false, shape: false, vel: 0.26 });

    // ---------- casals: found in Barcelona, first complete recording 1936-39 ----------
    const c0 = S('casals').t0, c1 = S('casals').t1;
    const gC = a.grid([{ label: 'FOUND', sub: 'AS A TEENAGER', size: 56, color: GOLD }, { label: 'RECORDED', sub: 'FIRST COMPLETE', size: 46, color: TEAL }],
      c0 + 0.1, c1, { rows: 1, cols: 2, cw: 420, chh: 240, y: 500, revealStep: 0.2 });
    const tFo = a.w('casals', 'found') - 0.05, tRec = a.w('casals2', 'recording') - 0.05, tFam = a.w('casals2', 'famous') - 0.05;
    gC.active.push({ t0: tFo, t1: a.at('casals2'), i: 0 }, { t0: tRec, t1: c1, i: 1 });
    a.big('AN OLD EDITION', a.w('casals', 'old') - 0.05, a.w('casals2', '1936') - 0.05, { y: 900, size: 50, ...MONO, color: WHITE, blur: 4 });
    a.big('A BARCELONA SHOP', a.w('casals', 'Barcelona') - 0.05, a.w('casals2', '1936') - 0.05, { y: 990, size: 60, color: GOLD, blur: 18 });
    a.big('1936–39', a.w('casals2', '1936') - 0.05, c1, { y: 900, size: 90, ...MONO, color: TEAL, blur: 14 });
    a.big('FAMOUS', tFam, c1, { y: 1010, size: 70, color: GOLD, blur: 22 });
    const cs = (c1 - c0 - 0.3) / 64;
    bars(0, 4, c0 + 0.1, Math.min(0.2, cs), { show: false, shape: false, vel: 0.24 });

    // ---------- why1: the open G string, a pedal point ----------
    a.scale(S('why1').t0, 'G');
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const tG = a.w('why1b', 'G') - 0.1, tPe = a.w('why1b', 'pedal') - 0.05;
    const pedalRing = t => a.ring(['G'], t, t + 0.45, { color: GOLD });
    a.note('G2', y0 + 0.2, 1.4, { vel: 0.4, tone: CELLO });
    pedalRing(y0 + 0.2);
    a.note('G2', a.w('why1', 'lowest') - 0.05, 1.2, { vel: 0.4, tone: CELLO });
    pedalRing(a.w('why1', 'lowest') - 0.05);
    let t = tG;
    while (t < y1 - 8 * S16) t = cello(PAT.G, t, S16, { vel: 0.3, pedal: 1.5, onPedal: pedalRing });
    a.ch('G', tG, y1, { notes: ['G3', 'B3', 'D4'], bass: false, mute: true, hideName: true });
    a.tag('G', tG, y1, 'OPEN G STRING', { color: GOLD, dr: -92 });
    a.tag(0, a.w('why1b', 'bass') - 0.05, tPe, 'LIKE A BASS NOTE', { x: 540, y: 462, color: TEAL });
    a.tag(0, tPe, y1, 'PEDAL POINT', { x: 540, y: 462, color: GOLD });

    // ---------- why2: the implied chords, I IV V7 I ----------
    const tAb = a.w('why2', 'chords') - 0.05;
    cello(PAT.G, a.at('why2'), S16, { vel: 0.28 });
    a.ch('G', tAb, a.at('why2b'), { notes: ['G3', 'B3', 'D4'], bass: false, mute: true, hideName: true });
    const cw = [a.w('why2b', 'G', 0), a.w('why2b', 'C'), a.w('why2b', 'D'), a.w('why2b', 'G', 3)].map(x => x - 0.08);
    cw.forEach((tw, i) => {
      const next = i < 3 ? cw[i + 1] : a.at('why2c') - 0.1;
      cello(PAT[BARS[i][0]], tw, S16, { vel: 0.32, until: next });
      a.ch(BARS[i][1].replace('D7/G', 'D7'), tw, next, { notes: BARS[i][2], bass: false, mute: true, label: BARS[i][1], row: i });
    });
    // why2c: one, four, five, one - each a quick pattern + its chord
    const nw = [a.w('why2c', 'One'), a.w('why2c', 'four'), a.w('why2c', 'five'), a.w('why2c', 'one', 0)].map(x => x - 0.06);
    nw.forEach((tw, i) => {
      const next = i < 3 ? nw[i + 1] : S('why2').t1;
      cello(PAT[BARS[i][0]].slice(0, 4), tw, Math.min(0.12, (next - tw) / 4), { vel: 0.32 });
      a.ch(BARS[i][1].replace('D7/G', 'D7'), tw, next, { notes: BARS[i][2], bass: false, mute: true, label: BARS[i][1], row: i });
    });
    a.note('G2', nw[3] + 0.5, S('why2').t1 - nw[3] - 0.6, { vel: 0.3, tone: CELLO });

    // ---------- why3: one note at a time... then the ear holds them together ----------
    const z0 = S('why3').t0, z1 = S('why3').t1, tEar = a.w('why3', 'ear') - 0.05, tCo = a.w('why3', 'connects') - 0.05;
    let u = z0 + 0.15;
    while (u < tEar - 8 * 0.2) u = cello(PAT.G, u, 0.2, { vel: 0.32 });
    a.tag(0, z0 + 0.15, tEar, 'ONE AT A TIME', { x: 540, y: 462, color: TEAL });
    // the same notes, now ringing on: they blend into a chord
    const r0 = tEar, rEnd = cello(PAT.G, r0, 0.2, { vel: 0.22, ring: z1 - tEar - 0.3 });
    cello(PAT.G, rEnd, 0.2, { vel: 0.2, ring: z1 - rEnd - 0.2, show: false });
    a.poly(['G', 'B', 'D'], tCo, z1, { color: GOLD, glow: true, alpha: 0.8, dash: false });
    a.ch('G', tCo + 0.3, z1, { notes: ['G3', 'B3', 'D4'], bass: false, mute: true });
    a.tag(0, tCo, z1, 'THE EAR HEARS A CHORD', { x: 540, y: 462, color: GOLD });

    // ---------- why4: same pattern, small changes - the four bars as cells ----------
    const q0 = S('why4').t0, q1 = S('why4').t1, qs = 0.15;
    const gQ = a.grid(BARS.map(([p, label], i) => ({ label, sub: 'BAR ' + (i + 1), size: label.length > 2 ? 40 : 56, subSize: 20, color: [GOLD, TEAL, PINK, GOLD][i] })),
      q0 + 0.1, q1, { rows: 1, cols: 4, cw: 240, chh: 220, y: 520, revealStep: 0.1, caption: 'SAME SHAPE · SMALL CHANGES' });
    let q = q0 + 0.2;
    for (let i = 0; i < 4; i++) { const e = bar(i, q, qs, { show: false, shape: false }); gQ.active.push({ t0: q, t1: e, i }); q = e; }
    a.note('G2', q, q1 - q, { vel: 0.3, tone: CELLO });
    a.big('SAME PATTERN', a.w('why4', 'same') - 0.05, a.w('why4b', 'hypnotic') - 0.05, { y: 950, size: 60, color: TEAL, blur: 16 });
    a.big('HYPNOTIC', a.w('why4b', 'hypnotic') - 0.05, a.w('why4b', 'Prelude') - 0.05, { y: 950, size: 76, color: WHITE, blur: 20 });
    a.big("LIKE BACH'S PRELUDE IN C", a.w('why4b', 'Prelude') - 0.05, q1, { y: 950, size: 44, ...MONO, color: GOLD, blur: 8 });

    // ---------- essence: the four bars once more (one pattern each), then the G chord ----------
    a.scale(S('essence').t0, 'G');
    const e0 = S('essence').t0 + 0.1, es = Math.min(S16, (a.at('cta') - e0 - 0.2) / 32);
    const eEnd = bars(0, 4, e0, es, { reps: 1 });
    // the "orchestra": the ear's chord, finally sounded in full under a long cello G
    a.ch('G', eEnd, S('essence').t1 - 0.3, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.45 });
    a.note('G2', eEnd, S('essence').t1 - eEnd - 0.4, { vel: 0.36, tone: CELLO });
    a.ring(['G', 'B', 'D'], eEnd, S('essence').t1, { color: GOLD });
    a.tag(0, a.w('essence', 'One') - 0.05, a.w('essence', 'orchestra') - 0.3, 'ONE LINE, MANY CHORDS', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('essence', 'orchestra') - 0.3, S('essence').t1, 'AN ORCHESTRA IN ONE CELLO', { x: 540, y: 462, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
