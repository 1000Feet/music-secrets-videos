// The Amen break: a four-bar drum solo from 1969 that producers sampled, sped up and chopped into new genres.
// Copyright: the real break is NOT reproduced. Every beat here is an original funk breakbeat
// in the same spirit (syncopated kicks, snare on 2 and 4, ghost notes, a late snare in bar 3).
const B0 = 60 / 136, S0 = B0 / 4, BAR0 = 16 * S0;   // break tempo: four bars take about seven seconds
const BH = 60 / 95, SH = BH / 4;                       // hip hop, slower
const BJ = 60 / 170, SJ = BJ / 4;                      // jungle, fast

module.exports = {
  slug: 'amen-break',
  title: 'The Amen Break',
  segments: [
    { id: 'hook',    text: 'Seven seconds of drums from 1969 ended up in thousands of tracks.' },
    { id: 'what',    text: "It's the Amen break: a four bar drum solo by Gregory Coleman..." },
    { id: 'what2',   text: 'in Amen, Brother, by The Winstons. The B side of Color Him Father.' },
    { id: 's1',      text: 'Hip hop sampled it...' },
    { id: 's2',      text: 'and in the 1990s, above all jungle and drum and bass.' },
    { id: 's3',      text: 'The band never got royalties for it.' },
    { id: 's3b',     text: 'In 2015, crowdfunding raised about 24,000 pounds for bandleader Richard Spencer.' },
    { id: 'why1',    text: "So why does it work? It's funk drumming: kicks off the beat..." },
    { id: 'why1b',   text: 'snare on two and four, soft ghost notes in between. It already swings.' },
    { id: 'why2',    text: 'Coleman also varies it: the snare lands late, the kick shifts. Little surprises in a loop.' },
    { id: 'why3',    text: 'Producers sped it up, to around 160 to 180 BPM in jungle...' },
    { id: 'why3b',   text: 'chopped it into single hits, and rearranged them. A whole new instrument.' },
    { id: 'why4',    text: 'Short, clean, and unaccompanied: perfect for sampling.' },
    { id: 'essence', text: 'Seven seconds of drumming, chopped and rearranged... and it built whole genres.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE DRUM BREAK', title: 'THE AMEN BREAK', accent: true, circle: false, tonic: 9, lead: 0.5, min: 4 * BAR0 + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'WHERE IT COMES FROM', title: 'Amen, Brother', sub: 'The Winstons · 1969', circle: false, tonic: 9, gap: 0.3, min: 4 * BAR0, tail: 0.4 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Hip Hop', circle: false, tonic: 9, min: 48 * SH, tail: 0.4 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Jungle · Drum & Bass', sub: '1990s', circle: false, tonic: 9, min: 96 * SJ, tail: 0.5 },
    { id: 's3', segs: ['s3', 's3b'], label: 'THE BAND', title: 'No Royalties', sub: 'The Winstons', circle: false, tonic: 9, gap: 0.3, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'FUNK DRUMMING', circle: false, tonic: 9, gap: 0.3, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'LITTLE SURPRISES', circle: false, tonic: 9, min: 4 * BAR0, tail: 0.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'SPED UP', circle: false, tonic: 9, min: 64 * SJ, tail: 0.5 },
    { id: 'why3b', segs: ['why3b'], label: 'WHY IT WORKS', title: 'CHOPPED UP', circle: false, tonic: 9, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'MADE FOR SAMPLING', circle: false, tonic: 9, min: 2 * BAR0, tail: 0.5 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SEVEN SECONDS', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', ORANGE = '#ffa45c', GREY = '#55555d';
    const MONO = { family: 'DM Mono', weight: 500 };

    // ---- an ORIGINAL four-bar funk break (not a transcription): K kick, S snare, G ghost note ----
    const PAT = [
      { K: [0, 7, 10], S: [4, 12], G: [6, 9, 14] },
      { K: [0, 7, 10], S: [4, 12], G: [2, 9, 15] },
      { K: [0, 7, 11], S: [4, 13], G: [6, 9] },        // the variation: kick shifts, snare lands late
      { K: [0, 3, 10], S: [4, 12, 15], G: [6, 8, 14] },
    ];
    const kindAt = (p, s) => (p.K.includes(s) ? 'K' : p.S.includes(s) ? 'S' : p.G.includes(s) ? 'G' : null);
    const CELL = { K: { label: 'K', color: PINK, size: 34 }, S: { label: 'S', color: TEAL, size: 34 }, G: { label: 's', color: TEAL, size: 24 } };
    const cellOf = (k, hi) => (k ? { ...CELL[k], color: hi && hi.includes(k) ? GOLD : CELL[k].color } : { label: '', color: GREY });
    // four rows of sixteen: the whole break on screen. o.mark = [[bar, step], ...] cells drawn gold
    const breakGrid = (t0, t1, o = {}) => a.grid(PAT.flatMap((p, r) => [...Array(16)].map((_, s) => {
      const c = cellOf(kindAt(p, s));
      return o.mark && o.mark.some(([mr, ms]) => mr === r && ms === s) ? { ...c, color: GOLD } : c;
    })), t0, t1, { rows: 4, cols: 16, cw: 62, chh: 92, y: o.y ?? 470, caption: o.caption ?? 'FOUR BARS · SIXTEEN STEPS EACH' });

    function hit(k, t, vel = 1) {
      if (k === 'K') a.perc('kick', t, 1.0 * vel);
      else if (k === 'S') { a.perc('snare', t, 0.85 * vel); a.perc('snare', t + 0.012, 0.35 * vel); }
      else if (k === 'G') a.perc('snare', t, 0.22 * vel);
    }
    // play bars of the break from t0 until t1; g = 4x16 grid to light
    function playBreak(t0, t1, o = {}) {
      const s16 = o.s16 ?? S0, vel = o.vel ?? 1;
      let t = t0, r = o.bar0 ?? 0;
      for (; t < t1 - 0.2; t += 16 * s16, r++) {
        const p = PAT[r % 4];
        for (let s = 0; s < 16; s++) {
          const ts = t + s * s16;
          if (ts > t1 - 0.05) break;
          const k = kindAt(p, s);
          if (k) { hit(k, ts, vel); if (o.g) o.g.active.push({ t0: ts, t1: ts + Math.max(0.12, s16), i: (r % 4) * 16 + s }); }
          if (s % 2 === 0) a.perc('hat', ts, (s % 4 ? 0.18 : 0.26) * vel);
          if (o.lanes) o.lanes(ts, s, k, s16);
        }
        if (o.onBar) o.onBar(t, r, 16 * s16);
      }
      return t;
    }

    // ---- hook: the whole break, from the first frame ----
    const gH = breakGrid(0, S('hook').t1);
    playBreak(0.15, S('hook').t1, { g: gH });
    a.big('7 SECONDS', 0.15, S('hook').t1, { y: 1010, size: 80, ...MONO, color: GOLD });

    // ---- what: Gregory Coleman, The Winstons ----
    const gW = breakGrid(S('what').t0, S('what').t1);
    playBreak(S('what').t0, S('what').t1, { g: gW });
    a.big('DRUMS: GREGORY COLEMAN', a.w('what', 'Gregory'), a.at('what2'), { y: 1010, size: 44, ...MONO, color: PINK });
    a.big('B SIDE OF', a.w('what2', 'B'), S('what').t1, { y: 980, size: 36, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('COLOR HIM FATHER', a.w('what2', 'B'), S('what').t1, { y: 1045, size: 52, ...MONO, color: GOLD });

    // ---- s1: hip hop, slower, with a generic bass and chord ----
    const s10 = S('s1').t0;
    const gS1 = breakGrid(s10, S('s1').t1);
    playBreak(s10, S('s1').t1, { g: gS1, s16: SH, onBar: (t, r, len) => {
      const [c, n, b] = r % 2 ? ['Dm7', ['F3', 'A3', 'C4'], 'D2'] : ['Am7', ['E3', 'G3', 'C4'], 'A1'];
      a.ch(c, t, t + Math.min(len, S('s1').t1 - t), { notes: n, bass: b, vel: 0.45, hideName: true, shape: false });
    } });
    a.big('SLOWER', s10 + 0.3, S('s1').t1, { y: 1010, size: 64, ...MONO, color: BLUE });

    // ---- s2: jungle / drum & bass, fast, with a long sub bass ----
    const s20 = S('s2').t0;
    const gS2 = breakGrid(s20, S('s2').t1);
    playBreak(s20, S('s2').t1, { g: gS2, s16: SJ, onBar: (t, r, len) => {
      if (r % 2 === 0) a.ch('Am', t, t + Math.min(2 * len, S('s2').t1 - t), { notes: ['A3', 'C4', 'E4'], bass: r % 4 ? 'F1' : 'A1', vel: 0.4, hideName: true, shape: false });
    } });
    a.big('FASTER', s20 + 0.3, S('s2').t1, { y: 1010, size: 64, ...MONO, color: PINK });

    // ---- s3: no royalties, then the crowdfunding ----
    const s30 = S('s3').t0;
    const gR = a.grid([{ label: 'ROYALTIES', sub: 'FOR THE SAMPLES', color: '#9a9aa2', size: 56 }, { label: '£24,000', sub: 'CROWDFUNDING · 2015', color: GOLD, size: 72 }],
      s30, S('s3').t1, { rows: 2, cols: 1, cw: 720, chh: 220, y: 480 });
    a.big('NONE', a.w('s3', 'never'), S('s3').t1, { x: 820, y: 560, size: 40, ...MONO, color: '#ff5d6c', blur: 12 });
    gR.active.push({ t0: a.w('s3b', 'raised'), t1: S('s3').t1, i: 1 });
    a.big('FOR RICHARD SPENCER', a.w('s3b', 'bandleader'), S('s3').t1, { y: 1010, size: 46, ...MONO, color: GOLD });
    playBreak(s30, S('s3').t1, { vel: 0.55 });

    // ---- why1: funk drumming, one bar in lanes ----
    const y10 = S('why1').t0;
    const COUNT = [...Array(16)].map((_, i) => ({ label: i % 4 ? '·' : String(i / 4 + 1), color: i % 4 ? '#7a7a86' : BLUE, size: 26 }));
    const P0 = PAT[0];
    const KL = [...Array(16)].map((_, s) => (P0.K.includes(s) ? { label: 'K', color: s % 4 ? GOLD : PINK, size: 36 } : { label: '', color: GREY }));
    const SL = [...Array(16)].map((_, s) => (P0.S.includes(s) ? { label: 'S', color: TEAL, size: 36 } : P0.G.includes(s) ? { label: 's', color: '#9a9aa2', size: 24 } : { label: '', color: GREY }));
    const gC = a.grid(COUNT, y10, S('why1').t1, { rows: 1, cols: 16, cw: 62, chh: 80, y: 470 });
    const gK = a.grid(KL, y10, S('why1').t1, { rows: 1, cols: 16, cw: 62, chh: 130, y: 570, caption: 'KICK' });
    const gS = a.grid(SL, y10, S('why1').t1, { rows: 1, cols: 16, cw: 62, chh: 130, y: 760, caption: 'SNARE + GHOST NOTES' });
    let t = y10;
    for (; t < S('why1').t1 - 0.2; t += BAR0) {
      for (let s = 0; s < 16; s++) {
        const ts = t + s * S0, k = kindAt(P0, s);
        if (ts > S('why1').t1 - 0.05) break;
        gC.active.push({ t0: ts, t1: ts + S0, i: s });
        if (k) { hit(k, ts); (k === 'K' ? gK : gS).active.push({ t0: ts, t1: ts + 0.14, i: s }); }
        if (s % 2 === 0) a.perc('hat', ts, (s % 4 ? 0.18 : 0.26) * 1);
      }
    }
    const tOff = a.w('why1', 'kicks'), tBack = a.w('why1b', 'snare'), tGh = a.w('why1b', 'ghost'), tSw = a.w('why1b', 'swings');
    a.big('KICKS OFF THE BEAT', tOff, tBack, { y: 1030, size: 48, ...MONO, color: GOLD });
    a.big('SNARE ON 2 + 4', tBack, tGh, { y: 1030, size: 52, ...MONO, color: TEAL });
    a.big('+ GHOST NOTES', tGh, tSw, { y: 1030, size: 52, ...MONO, color: '#c9c9d2' });
    a.big('IT SWINGS', tSw, S('why1').t1, { y: 1030, size: 64, ...MONO, color: GOLD });

    // ---- why2: the variation in bar three ----
    const y20 = S('why2').t0;
    const gV = breakGrid(y20, S('why2').t1, { mark: [[2, 11], [2, 13]], caption: 'BAR 3: THE VARIATION' });
    const tLate = a.w('why2', 'late'), tShift = a.w('why2', 'shifts');
    playBreak(y20, S('why2').t1, { g: gV });
    a.big('SNARE LATE', tLate, S('why2').t1, { x: 330, y: 1010, size: 46, ...MONO, color: GOLD });
    a.big('KICK SHIFTS', tShift, S('why2').t1, { x: 760, y: 1010, size: 46, ...MONO, color: GOLD });
    a.big('SURPRISES IN A LOOP', a.w('why2', 'surprises'), S('why2').t1, { y: 1090, size: 40, ...MONO, color: '#ffffff', blur: 10 });

    // ---- why3: sped up to jungle tempo ----
    const y30 = S('why3').t0;
    const gF = breakGrid(y30, S('why3').t1);
    playBreak(y30, S('why3').t1, { g: gF, s16: SJ, onBar: (tb, r, len) => {
      if (r % 2 === 0) a.ch('Am', tb, tb + Math.min(2 * len, S('why3').t1 - tb), { notes: ['A3', 'C4', 'E4'], bass: 'A1', vel: 0.35, hideName: true, shape: false });
    } });
    a.big('160–180 BPM', a.w('why3', '160'), S('why3').t1, { y: 1010, size: 72, ...MONO, color: PINK });

    // ---- why3b: chopped into single hits, rearranged ----
    const y3b = S('why3b').t0;
    const HITS = [['K', 0], ['S', 4], ['G', 6], ['K', 7], ['G', 9], ['K', 10], ['S', 12], ['G', 14]];   // bar 1, hit by hit
    const gSl = a.grid(HITS.map(([k], j) => ({ ...CELL[k], sub: String(j + 1), size: k === 'G' ? 30 : 44 })), y3b, S('why3b').t1,
      { rows: 1, cols: 8, cw: 120, chh: 150, y: 470, caption: 'SINGLE HITS' });
    const REARR = [0, null, 5, null, 1, 2, null, 3, null, 0, 6, 4, 1, null, 7, 1];   // a new order, one hit per step
    const tRe = a.w('why3b', 'rearranged');
    const gRe = a.grid(REARR.map(j => (j === null ? { label: '', color: GREY } : { label: String(j + 1), color: HITS[j][0] === 'K' ? PINK : TEAL, size: 30 })), tRe - 0.3, S('why3b').t1,
      { rows: 1, cols: 16, cw: 62, chh: 110, y: 720, caption: 'REARRANGED' });
    // first the hits one by one, then the new pattern at jungle tempo
    const tChop = a.w('why3b', 'single');
    HITS.forEach(([k], j) => { const th = tChop + j * 0.16; if (th < tRe - 0.1) { hit(k, th, 0.9); gSl.active.push({ t0: th, t1: th + 0.15, i: j }); } });
    for (let tb = tRe, n = 0; tb < S('why3b').t1 - 0.2; tb += 16 * SJ, n++) {
      REARR.forEach((j, s) => {
        const ts = tb + s * SJ;
        if (ts > S('why3b').t1 - 0.05) return;
        if (s % 2 === 0) a.perc('hat', ts, 0.2);
        if (j === null) return;
        hit(HITS[j][0], ts);
        gRe.active.push({ t0: ts, t1: ts + 0.1, i: s });
        gSl.active.push({ t0: ts, t1: ts + 0.1, i: j });
      });
      if (n % 2 === 0) a.ch('Am', tb, tb + Math.min(32 * SJ, S('why3b').t1 - tb), { notes: ['A3', 'C4', 'E4'], bass: 'A1', vel: 0.35, hideName: true, shape: false });
    }
    a.big('A NEW INSTRUMENT', a.w('why3b', 'whole'), S('why3b').t1, { y: 1010, size: 54, ...MONO, color: GOLD });

    // ---- why4: short, clean, unaccompanied ----
    const y40 = S('why4').t0;
    const Q3 = [['SHORT', 'Short', PINK], ['CLEAN', 'clean', TEAL], ['ALONE', 'unaccompanied', GOLD]];
    const g3 = a.grid(Q3.map(([l, , c]) => ({ label: l, color: c, size: 50 })), y40, S('why4').t1, { rows: 1, cols: 3, cw: 320, chh: 180, y: 480 });
    Q3.forEach(([, w], i) => g3.active.push({ t0: a.w('why4', w), t1: S('why4').t1, i }));
    const gW4 = a.grid([...Array(16)].map((_, s) => cellOf(kindAt(PAT[0], s))), y40, S('why4').t1, { rows: 1, cols: 16, cw: 62, chh: 110, y: 720, caption: 'NOTHING ELSE PLAYING' });
    playBreak(y40, S('why4').t1, { lanes: (ts, s, k) => { if (k && kindAt(PAT[0], s) === k) gW4.active.push({ t0: ts, t1: ts + 0.14, i: s }); }, vel: 0.95, bar0: 0 });
    a.big('PERFECT FOR SAMPLING', a.w('why4', 'perfect'), S('why4').t1, { y: 1010, size: 48, ...MONO, color: GOLD });

    // ---- essence: the break, then its chopped version, then one last hit ----
    const e0 = S('essence').t0, eEnd = S('essence').t1 - 1.8;
    const gE = breakGrid(e0, S('essence').t1);
    const tChp = a.w('essence', 'chopped');
    let te = playBreak(e0, Math.min(tChp, eEnd), { g: gE });
    te = Math.min(te, tChp);
    for (let tb = te, n = 0; tb + 16 * SJ <= eEnd; tb += 16 * SJ, n++) {
      REARR.forEach((j, s) => { const ts = tb + s * SJ; if (s % 2 === 0) a.perc('hat', ts, 0.2); if (j !== null) hit(HITS[j][0], ts, 0.9); });
      if (n % 2 === 0) a.ch('Am', tb, tb + 32 * SJ, { notes: ['A3', 'C4', 'E4'], bass: 'A1', vel: 0.35, hideName: true, shape: false });
      te = tb + 16 * SJ;
    }
    a.big('CHOPPED · REARRANGED', tChp, S('essence').t1, { y: 980, size: 44, ...MONO, color: TEAL });
    a.big('WHOLE GENRES', a.w('essence', 'genres'), S('essence').t1, { y: 1060, size: 64, ...MONO, color: GOLD });
    hit('K', te); a.perc('snare', te, 0.6);
    gE.active.push({ t0: te, t1: S('essence').t1, i: 0 });
    a.ch('Am', te, S('essence').t1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4'], bass: 'A1', vel: 0.7, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
