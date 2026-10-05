// Polyrhythm: two different beat divisions at the same time (3 against 2, 4 against 3).
// Chopin and Debussy are public domain, but their melodies are NOT reconstructed here:
// every demo uses original broken-chord patterns and generic drum layers.
const BEAT = 0.9;            // one beat (the span shared by both hands)

module.exports = {
  slug: 'polyrhythm',
  title: 'Polyrhythm',
  segments: [
    { id: 'hook',    text: 'Two hands, two different speeds, at exactly the same time.' },
    { id: 'what',    text: "That's a polyrhythm: like three notes against two, played together." },
    { id: 'chopin',  text: "In Chopin's Fantaisie Impromptu, the right hand plays four notes against the left hand's three." },
    { id: 'debussy', text: "Debussy's first Arabesque sets triplets in one hand against pairs in the other." },
    { id: 'africa',  text: 'And in West African drumming, layering patterns in three and in two is a basic principle.' },
    { id: 'why1',    text: 'So why does it work? In one beat, one hand plays three even notes, the other two.' },
    { id: 'why2',    text: 'They meet only on the beat. In between, every note has its own spot on a grid of six.' },
    { id: 'tea',     text: 'To feel it, say: nice cup of tea.' },
    { id: 'tea2',    text: 'Nice together, then cup, of, tea.' },
    { id: 'four',    text: 'Four against three meets only once every twelve small steps.' },
    { id: 'brain',   text: 'Your brain tracks both speeds at once, so the music feels restless and alive.' },
    { id: 'hemiola', text: 'Hemiola puts three and two in a row. Polyrhythm stacks them at the same time.' },
    { id: 'essence', text: 'Two speeds, one moment. Music that moves in two currents at once.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TWO SPEEDS AT ONCE', title: 'POLYRHYTHM', accent: true, circle: false, min: 5 * BEAT + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'TWO SPEEDS AT ONCE', title: '3 AGAINST 2', circle: false, min: 4 * BEAT, tail: 0.6 },
    { id: 'chopin', segs: ['chopin'], label: 'YOU HEAR IT IN', title: 'Fantaisie-Impromptu', sub: 'Chopin · 1834 · in C# minor', circle: false, tail: 2.7 },
    { id: 'debussy', segs: ['debussy'], label: 'YOU HEAR IT IN', title: 'Arabesque No. 1', sub: 'Debussy · 1888–91', circle: false, tail: 2.6 },
    { id: 'africa', segs: ['africa'], label: 'YOU HEAR IT IN', title: 'West African Drums', sub: 'layers in 3 and in 2', circle: false, tail: 2.7 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'ONE BEAT', circle: false, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A GRID OF SIX', circle: false, tail: 1.6 },
    { id: 'tea', segs: ['tea', 'tea2'], label: 'FEEL IT', title: 'NICE CUP OF TEA', circle: false, gap: 0.4, tail: 3 * 1.1 + 0.3 },
    { id: 'four', segs: ['four'], label: 'FOUR AGAINST THREE', title: 'A GRID OF TWELVE', circle: false, tail: 2.0 },
    { id: 'brain', segs: ['brain'], label: 'WHY IT WORKS', title: 'TWO CURRENTS', circle: false, tail: 1.0 },
    { id: 'hemiola', segs: ['hemiola'], label: 'THE COUSIN', title: 'HEMIOLA', circle: false, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TWO SPEEDS, ONE MOMENT', accent: true, circle: false, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', GREY = '#6a6a72', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1120, size: 48, ...MONO };
    const WIDTH = 900;
    const gcd = (x, y) => (y ? gcd(y, x % y) : x), lcm = (x, y) => (x * y) / gcd(x, y);

    // one row of n cells spanning the same width, so the cells line up in time; cell 0 = the shared beat
    function row(n, col, t0, t1, y, chh, caption, o = {}) {
      const size = n <= 4 ? 60 : n <= 6 ? 52 : 30;
      const labels = o.labels || [...Array(n)].map((_, i) => String(i + 1));
      const cells = labels.map((l, i) => ({ label: l, color: o.colors ? o.colors[i] : i === 0 ? GOLD : col, size: o.size ?? size }));
      return a.grid(cells, t0, t1, { rows: 1, cols: n, cw: WIDTH / n, chh, y, caption, ...o.g });
    }
    // the combined grid (lcm cells): where each side's notes fall
    function combo(nA, nB, t0, t1, y, chh, caption, o = {}) {
      const L = lcm(nA, nB);
      const colors = [...Array(L)].map((_, i) => (i === 0 ? GOLD : i % (L / nA) === 0 ? PINK : i % (L / nB) === 0 ? TEAL : GREY));
      return row(L, PINK, t0, t1, y, chh, caption, { colors, labels: o.labels, size: o.size, g: o.g });
    }
    // play nA against nB from t0 to t1; lights gA / gB / gC; onA / onB make the sound
    function play(nA, nB, t0, t1, o = {}) {
      const beat = o.beat ?? BEAT, L = lcm(nA, nB);
      let tb = t0, k = 0;
      for (; tb < t1 - 0.1; tb += beat, k++) {
        for (const [n, g, on, side] of [[nA, o.gA, o.onA, 0], [nB, o.gB, o.onB, 1]]) {
          const d = beat / n;
          for (let i = 0; i < n; i++) {
            const t = tb + i * d;
            if (t >= t1 - 0.05) break;
            if (g) g.active.push({ t0: t, t1: t + d * 0.8, i });
            if (o.gC) o.gC.active.push({ t0: t, t1: t + Math.min(d, beat / L) * 0.95, i: i * (L / n) });
            if (on) on(t, i, k, d, side);
          }
        }
      }
      return tb;
    }
    // sound presets: a high hand (the faster side) and a low hand
    const hand = (notes, vel = 0.3, len = 0.8) => (t, i, k, d) => a.note(notes[i % notes.length], t, d * len, { vel: i === 0 ? vel * 1.25 : vel });
    const handSeq = (seqs, vel = 0.3, len = 0.8) => (t, i, k, d) => { const s = seqs[k % seqs.length]; a.note(s[i % s.length], t, d * len, { vel: i === 0 ? vel * 1.25 : vel }); };
    const AM_HI = ['A4', 'C5', 'E5'], AM_LO = ['A2', 'E3'];
    const withPerc = (f, type, v) => (t, i, k, d) => { f(t, i, k, d); a.perc(type, t, i === 0 ? v * 1.4 : v); };

    // standard 3:2 pair of rows
    const pair32 = (t0, t1, o = {}) => [
      row(3, PINK, t0, t1, o.y ?? 500, o.chh ?? 170, o.capA ?? '3 · RIGHT HAND', { g: o.gA }),
      row(2, TEAL, t0, t1, (o.y ?? 500) + (o.dy ?? 260), o.chh ?? 170, o.capB ?? '2 · LEFT HAND', { g: o.gB }),
    ];

    // ---- hook + what: three against two, piano + a soft pulse ----
    const [hA, hB] = pair32(0, S('what').t1);
    const tEnd0 = play(3, 2, 0.25, S('what').t1 - 0.3, {
      gA: hA, gB: hB,
      onA: withPerc(hand(AM_HI, 0.26), 'hat', 0.3),
      onB: withPerc(hand(AM_LO, 0.3), 'kick', 0.35),
    });
    a.ch('Am', tEnd0, S('what').t1, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.5, shape: false, hideName: true });
    a.big('3  AGAINST  2', 0.2, S('hook').t1, { ...LBL, size: 60, color: GOLD });
    a.big('= POLYRHYTHM', a.w('what', 'polyrhythm'), S('what').t1, { ...LBL, size: 56, color: WHITE });

    // ---- Chopin: 4 against 3, original C# minor broken chords ----
    const c0 = S('chopin').t0 + 0.1, c1 = S('chopin').t1;
    const cA = row(4, PINK, S('chopin').t0, c1, 500, 170, '4 · RIGHT HAND');
    const cB = row(3, TEAL, S('chopin').t0, c1, 760, 170, '3 · LEFT HAND');
    const RH = [['E4', 'G#4', 'C#5', 'G#4'], ['E4', 'G#4', 'C#5', 'G#4'], ['E4', 'A4', 'C#5', 'A4'], ['D#4', 'G#4', 'C5', 'G#4']];
    const LH = [['C#2', 'G#2', 'E3'], ['C#2', 'G#2', 'E3'], ['A1', 'E2', 'C#3'], ['G#1', 'D#2', 'C3']];
    const cEnd = play(4, 3, c0, c1 - 0.5, { beat: 0.84, gA: cA, gB: cB, onA: handSeq(RH, 0.22), onB: handSeq(LH, 0.28) });
    a.ch('C#m', cEnd, c1, { notes: ['C#3', 'G#3', 'C#4', 'E4'], bass: 'C#2', vel: 0.5, shape: false, hideName: true });
    a.big('4  AGAINST  3', a.w('chopin', 'four'), c1, { ...LBL, color: GOLD });

    // ---- Debussy: triplets against pairs, original E major broken chords ----
    const d0 = S('debussy').t0 + 0.1, d1 = S('debussy').t1;
    const [dA, dB] = pair32(S('debussy').t0, d1, { capA: '3 · TRIPLETS', capB: '2 · PAIRS' });
    const DH = [['G#4', 'B4', 'E5'], ['A4', 'C#5', 'E5'], ['G#4', 'B4', 'E5'], ['F#4', 'A4', 'D#5']];
    const DL = [['E2', 'B2'], ['A2', 'E3'], ['E2', 'B2'], ['B1', 'F#2']];
    const dEnd = play(3, 2, d0, d1 - 0.5, { beat: 1.0, gA: dA, gB: dB, onA: handSeq(DH, 0.22, 1.2), onB: handSeq(DL, 0.26, 1.1) });
    a.ch('E', dEnd, d1, { notes: ['E3', 'B3', 'E4', 'G#4'], bass: 'E2', vel: 0.45, shape: false, hideName: true });
    a.big('3  AGAINST  2', a.w('debussy', 'triplets'), d1, { ...LBL, color: GOLD });

    // ---- West African drumming: generic layers in 3 and in 2 (drums only) ----
    const f0 = S('africa').t0 + 0.1, f1 = S('africa').t1;
    const [fA, fB] = pair32(S('africa').t0, f1, { capA: 'LAYER IN 3', capB: 'LAYER IN 2' });
    play(3, 2, f0, f1 - 0.2, {
      beat: 0.75, gA: fA, gB: fB,
      onA: (t, i, k, d) => { a.perc('hat', t, i === 0 ? 0.7 : 0.5); a.note(i === 0 ? 'D5' : 'A4', t, 0.08, { vel: 0.1 }); },
      onB: (t, i, k, d) => { a.perc('kick', t, i === 0 ? 0.9 : 0.6); a.note(i === 0 ? 'D3' : 'A2', t, 0.12, { vel: 0.22 }); if (i === 1 && k % 2) a.perc('snare', t, 0.4); },
    });
    a.big('3  +  2  LAYERED', a.w('africa', 'layering'), f1, { ...LBL, color: GOLD });

    // ---- why1: one slow beat, three even notes against two ----
    const w0 = S('why1').t0, w1 = S('why2').t1;
    const [wA, wB] = pair32(w0, w1, { y: 470, chh: 140, dy: 220 });
    const wC = combo(3, 2, a.w('why2', 'between') - 0.2, w1, 910, 130, 'THE GRID OF SIX');
    const slow = { gA: wA, gB: wB, beat: 1.5, onA: hand(['E5'], 0.24), onB: hand(['A3'], 0.3) };
    play(3, 2, a.w('why1', 'one') - 0.05, S('why1').t1 - 0.1, slow);
    a.big('THREE', a.w('why1', 'three'), S('why1').t1, { x: 300, y: 1120, size: 48, ...MONO, color: PINK });
    a.big('TWO', a.w('why1', 'two'), S('why1').t1, { x: 780, y: 1120, size: 48, ...MONO, color: TEAL });

    // ---- why2: they meet only on the beat; the six-step grid ----
    play(3, 2, S('why2').t0 + 0.05, w1 - 0.1, { ...slow, gC: wC, beat: 1.35 });

    // ---- tea: nice cup of tea ----
    const e0 = S('tea').t0, e1 = S('tea').t1;
    const tA = row(3, PINK, e0, e1, 470, 140, 'THREE', { labels: ['NICE', 'CUP', 'TEA'], size: 50 });
    const tB = row(2, TEAL, e0, e1, 690, 140, 'TWO', { labels: ['NICE', 'OF'], size: 50 });
    const tC = combo(3, 2, e0, e1, 910, 130, 'TOGETHER', { labels: ['NICE', '·', 'CUP', 'OF', 'TEA', '·'], size: 34 });
    const WORDS = [['nice', [0], [0], 0], ['cup', [1], [], 2], ['of', [], [1], 3], ['tea', [2], [], 4]];
    for (const seg of ['tea', 'tea2']) {
      WORDS.forEach(([w, ia, ib, ic], j) => {
        const t = a.w(seg, w), t2 = j < 3 ? a.w(seg, WORDS[j + 1][0]) : t + 0.6;
        ia.forEach(i => tA.active.push({ t0: t, t1: t2, i }));
        ib.forEach(i => tB.active.push({ t0: t, t1: t2, i }));
        tC.active.push({ t0: t, t1: t2, i: ic });
      });
    }
    a.ch('Am', S('tea').t0 + 0.1, a.end('tea2') + 0.1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.3, shape: false, hideName: true });
    play(3, 2, a.end('tea2') + 0.35, e1 - 0.2, { beat: 1.1, gA: tA, gB: tB, gC: tC, onA: hand(['E5', 'C5', 'A4'], 0.26), onB: hand(['A2', 'E3'], 0.3) });

    // ---- four: 4 against 3 on a grid of twelve ----
    const q0 = S('four').t0, q1 = S('four').t1;
    const qA = row(4, PINK, q0, q1, 470, 140, '4 NOTES');
    const qB = row(3, TEAL, q0, q1, 690, 140, '3 NOTES');
    const qC = combo(4, 3, q0, q1, 910, 130, null, { labels: [...Array(12)].map((_, i) => String(i + 1)) });
    play(4, 3, q0 + 0.1, q1 - 0.3, { beat: 1.4, gA: qA, gB: qB, gC: qC, onA: hand(['C5', 'E5', 'G5', 'E5'], 0.22), onB: hand(['C3', 'G3', 'E3'], 0.28) });
    a.big('TOGETHER ONCE IN 12 STEPS', a.w('four', 'once'), q1, { y: 1100, size: 40, ...MONO, color: GOLD });

    // ---- brain: both speeds, faster, with drums ----
    const b0 = S('brain').t0, b1 = S('brain').t1;
    const [bA, bB] = pair32(b0, b1, { capA: 'SPEED ONE', capB: 'SPEED TWO' });
    play(3, 2, b0 + 0.1, b1 - 0.1, {
      beat: 0.72, gA: bA, gB: bB,
      onA: withPerc(handSeq([AM_HI, ['G4', 'C5', 'E5'], ['F4', 'A4', 'C5'], ['E4', 'G#4', 'B4']], 0.22), 'hat', 0.35),
      onB: withPerc(handSeq([AM_LO, ['C3', 'G3'], ['F2', 'C3'], ['E2', 'B2']], 0.28), 'kick', 0.45),
    });
    a.big('RESTLESS', a.w('brain', 'restless'), b1, { x: 320, ...LBL, color: PINK });
    a.big('ALIVE', a.w('brain', 'alive'), b1, { x: 790, ...LBL, color: TEAL });

    // ---- hemiola: 3 and 2 in a row vs 3 and 2 at once ----
    const m0 = S('hemiola').t0, m1 = S('hemiola').t1, tStack = a.w('hemiola', 'Polyrhythm') - 0.1;
    const H33 = [PINK, GREY, GREY, PINK, GREY, GREY], H222 = [TEAL, GREY, TEAL, GREY, TEAL, GREY];
    const h33 = row(6, PINK, m0, tStack + 0.2, 500, 170, 'BAR 1 · 3 + 3', { colors: H33, labels: ['1', '2', '3', '1', '2', '3'] });
    const h222 = row(6, TEAL, m0, tStack + 0.2, 760, 170, 'BAR 2 · 2 + 2 + 2', { colors: H222, labels: ['1', '2', '1', '2', '1', '2'] });
    const P = Math.min(0.3, (tStack - m0 - 0.4) / 12);
    for (let i = 0; i < 12; i++) {
      const t = m0 + 0.25 + i * P, j = i % 6, acc = i < 6 ? j % 3 === 0 : j % 2 === 0;
      (i < 6 ? h33 : h222).active.push({ t0: t, t1: t + P, i: j });
      a.perc('hat', t, acc ? 0.45 : 0.25);
      if (acc) { a.perc('kick', t, 0.6); a.note(i < 6 ? 'E5' : 'A3', t, P * 1.5, { vel: 0.26 }); }
    }
    const mA = row(3, PINK, tStack + 0.2, m1, 500, 170, '3 · RIGHT HAND');
    const mB = row(2, TEAL, tStack + 0.2, m1, 760, 170, '2 · LEFT HAND');
    play(3, 2, tStack + 0.3, m1 - 0.1, { beat: 0.9, gA: mA, gB: mB, onA: hand(['E5'], 0.24), onB: hand(['A3'], 0.3) });
    a.big('IN A ROW', a.w('hemiola', 'row') - 0.2, tStack + 0.2, { ...LBL, color: PINK });
    a.big('AT ONCE', tStack + 0.2, m1, { ...LBL, color: GOLD });

    // ---- essence: three against two one last time, then a final chord ----
    const s0 = S('essence').t0 + 0.1, s1 = S('essence').t1;
    const [sA, sB] = pair32(S('essence').t0, s1);
    const sEnd = play(3, 2, s0, a.at('cta') + 0.4, {
      gA: sA, gB: sB,
      onA: withPerc(handSeq([AM_HI, ['F4', 'A4', 'C5'], ['E4', 'G#4', 'B4']], 0.24), 'hat', 0.3),
      onB: withPerc(handSeq([AM_LO, ['F2', 'C3'], ['E2', 'B2']], 0.3), 'kick', 0.4),
    });
    a.ch('Am', sEnd, s1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4', 'A4'], bass: 'A1', vel: 0.75, shape: false, hideName: true });
    a.perc('kick', sEnd, 0.9);
    sA.active.push({ t0: sEnd, t1: s1, i: 0 }); sB.active.push({ t0: sEnd, t1: s1, i: 0 });
    a.big('TWO CURRENTS', a.w('essence', 'Music'), s1, { ...LBL, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
