// Jesu, Joy of Man's Desiring (Bach, BWV 147): a river of triplets around a slow hymn.
// Brief/copyright: NEITHER melody is reconstructed (not Bach's triplet line, not Schop's hymn tune).
// We play G major chords, our OWN flowing triplet line (arpeggios with turns, piano) and our OWN slow,
// hymn-like line in long notes (soft additive "choir" tone) sitting above it. Myra Hess's arrangement
// is named only.
const E = 0.2;            // one triplet eighth
const BEAT = 3 * E, BAR = 9 * E;   // three beats per bar, three notes per beat
// our own triplet line, one bar per chord
const TRIP = {
  G:  ['D4', 'B3', 'G3', 'A3', 'B3', 'D4', 'G4', 'D4', 'B3'],
  C:  ['E4', 'C4', 'G3', 'A3', 'C4', 'E4', 'G4', 'E4', 'C4'],
  D:  ['F#4', 'D4', 'A3', 'B3', 'A3', 'F#3', 'A3', 'D4', 'F#4'],
  G2: ['G4', 'D4', 'B3', 'A3', 'G3', 'F#3', 'G3', 'B3', 'D4'],
};
const PROG = [['G', 'G'], ['C', 'C'], ['D', 'D'], ['G2', 'G']];          // [triplet bar, chord]
const HYMN = ['B4', 'C5', 'A4', 'B4', 'D5', 'C5', 'A4', 'G4'];             // our own slow line, one note per bar
const BASS = { G: 'G2', C: 'C3', D: 'D3' };
const SHAPE = { G: ['G3', 'B3', 'D4'], C: ['G3', 'C4', 'E4'], D: ['F#3', 'A3', 'D4'] };
const CHOIR = { partials: [1, 0.6, 0.35, 0.2, 0.1, 0.05], attack: 0.22, release: 0.45 };

module.exports = {
  slug: 'jesu-joy',
  title: "Jesu, Joy of Man's Desiring",
  segments: [
    { id: 'hook',    text: 'A river of notes that never stops... and floating on top, a slow, simple hymn.' },
    { id: 'what',    text: "This is Jesu, Joy of Man's Desiring, from a Bach cantata of 1723." },
    { id: 'hymn',    text: 'The slow hymn tune the choir sings is older: Werde munter, by Johann Schop, from 1642.' },
    { id: 'hess',    text: "The English title, and much of its fame, come from Myra Hess's piano arrangement, in 1926." },
    { id: 'why1',    text: 'So why does it feel so peaceful? Two layers at once.' },
    { id: 'why1b',   text: 'The orchestra plays a flowing line in triplets, three notes to every beat...' },
    { id: 'why1c',   text: 'while the choir sings the hymn in long, slow notes, between and over it.' },
    { id: 'why2',    text: 'Setting an old hymn tune, a chorale, inside new music...' },
    { id: 'why2b',   text: "was a common technique in Bach's time." },
    { id: 'why3',    text: 'The triplets never stop: calm, endless motion.' },
    { id: 'why3b',   text: 'The hymn gives it a solid core you can sing.' },
    { id: 'why4',    text: "That's counterpoint: two independent ideas that fit together." },
    { id: 'essence', text: 'A river of triplets around a simple hymn... motion and stillness, at the same time.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'J. S. BACH · BWV 147', title: 'JESU, JOY', accent: true, tonic: 7, min: 0.3 + 4 * BAR + 0.6 },
    { id: 'what', segs: ['what'], label: "JESU, JOY OF MAN'S DESIRING", title: 'A BACH CANTATA', sub: 'BWV 147 · 1723 · in G', tonic: 7, tail: 0.8 },
    { id: 'hymn', segs: ['hymn'], label: 'THE HYMN TUNE · 1642', title: 'WERDE MUNTER', circle: false, tonic: 7, tail: 1.0 },
    { id: 'hess', segs: ['hess'], label: 'PIANO ARRANGEMENT · 1926', title: 'MYRA HESS', tonic: 7, tail: 1.2 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'TWO LAYERS', circle: false, tonic: 7, gap: 0.3, tail: 1.4 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'A CHORALE', circle: false, tonic: 7, gap: 0.2, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MOTION + CORE', tonic: 7, gap: 0.4, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'COUNTERPOINT', tonic: 7, tail: 2.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'MOTION AND STILLNESS', accent: true, tonic: 7, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');

    // the river: triplet bars from t0 (bars cycle through PROG); returns { end, pts, starts }
    // o.until cuts it off; o.lane = grid that lights its cells on every note
    function river(t0, nBars, o = {}) {
      const e = o.e ?? E, pts = [], starts = [];
      let t = t0;
      for (let b = 0; b < nBars; b++) {
        const [tb, ch] = PROG[(b + (o.from ?? 0)) % 4];
        if (o.until !== undefined && t > o.until - 0.1) break;
        starts.push(t);
        const bEnd = o.until !== undefined ? Math.min(t + 9 * e, o.until) : t + 9 * e;
        if (o.chords !== false) a.ch(ch, t, bEnd, { notes: SHAPE[ch], bass: false, mute: true, hideName: o.hideName, shape: o.shape });
        if (o.bass !== false) a.note(BASS[ch], t, 9 * e * 0.95, { vel: (o.vel ?? 0.3) * 0.9, show: false });
        TRIP[tb].forEach((n, k) => {
          const tn = t + k * e;
          if (o.until !== undefined && tn > o.until - 0.05) return;
          a.note(n, tn, e * 0.95, { vel: (o.vel ?? 0.3) * (k % 3 === 0 ? 1 : 0.72), show: o.show ?? false });
          pts.push([tn, pcOf(n)]);
          if (o.lane) o.lane.active.push({ t0: tn, t1: tn + e * 0.9, i: k });
        });
        t += 9 * e;
      }
      return { end: t, pts, starts };
    }
    // the hymn: one long note per bar over the given bar starts
    function hymn(starts, o = {}) {
      const pts = [];
      starts.forEach((t, b) => {
        const n = HYMN[(b + (o.from ?? 0)) % 8], len = (o.len ?? BAR) * 0.96;
        a.note(n, t, len, { vel: o.vel ?? 0.34, show: false, tone: CHOIR });
        if (o.show !== false) a.note(n, t, Math.min(0.5, len), { vel: 0, show: true });
        pts.push([t, pcOf(n)]);
        if (o.lane) o.lane.active.push({ t0: t, t1: t + len, i: 0 });
      });
      return pts;
    }
    const walkers = (rp, hp, t1, o = {}) => {
      if (rp && rp.length) a.walker(rp, { t1, dr: -40, color: GOLD, label: o.labels === false ? undefined : 'TRIPLETS', labelDr: -52 });
      if (hp && hp.length) a.walker(hp, { t1, dr: 34, color: TEAL, label: o.labels === false ? undefined : 'HYMN', labelDr: 92 });
    };
    // the two lanes (circle-free scenes): 9 triplet cells over one long hymn cell
    const lanes = (t0, t1) => {
      const lt = a.grid(Array.from({ length: 9 }, (_, i) => ({ label: String(i % 3 + 1), size: i % 3 ? 34 : 44, color: i % 3 ? GOLD : '#ffe08a' })),
        t0, t1, { rows: 1, cols: 9, cw: 104, chh: 120, y: 500, revealStep: 0.03, caption: 'TRIPLETS · THREE PER BEAT' });
      const lh = a.grid([{ label: 'HYMN', sub: 'LONG, SLOW NOTES', size: 48, subSize: 22, color: TEAL }], t0 + 0.15, t1, { rows: 1, cols: 1, cw: 936, chh: 170, y: 720, caption: 'THE CHOIR' });
      return { lt, lh };
    };

    // ---------- hook (cover): both layers at once, on the circle ----------
    a.scale(0.15, 'G', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.05 } });
    const h = river(0.3, 4, { show: true });
    const hp = hymn(h.starts);
    walkers(h.pts, hp, S('hook').t1);
    a.ch('G', h.end, S('hook').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.35 });
    a.note('G4', h.end, S('hook').t1 - h.end, { vel: 0.3, tone: CHOIR });

    // ---------- what: the cantata ----------
    const w0 = S('what').t0 + 0.05, w1 = S('what').t1;
    const we = Math.min(E, (w1 - w0 - 0.2) / 36);
    const wr = river(w0, 4, { e: we, show: true, vel: 0.26 });
    walkers(wr.pts, hymn(wr.starts, { len: 9 * we, vel: 0.28 }), w1, { labels: false });
    a.tag(0, a.w('what', 'cantata') - 0.1, w1, 'HERZ UND MUND UND TAT UND LEBEN', { x: 540, y: 470, color: GOLD });

    // ---------- hymn: Schop's tune is older (1642) - our own slow line stands in ----------
    const y0 = S('hymn').t0, y1 = S('hymn').t1;
    const gH = a.grid([{ label: '1642', sub: 'JOHANN SCHOP · HYMN', size: 64, subSize: 20, color: TEAL }, { label: '1723', sub: 'BACH · CANTATA', size: 64, subSize: 20, color: GOLD }],
      y0 + 0.1, y1, { rows: 1, cols: 2, cw: 420, chh: 240, y: 500, revealStep: 0.2 });
    const tOl = a.w('hymn', 'older') - 0.05, tSc = a.w('hymn', 'Schop') - 0.05;
    gH.active.push({ t0: y0 + 0.1, t1: tOl, i: 1 }, { t0: tOl, t1: y1, i: 0 });
    a.big('WERDE MUNTER,', a.w('hymn', 'Werde') - 0.05, y1, { y: 900, size: 56, color: WHITE, blur: 14 });
    a.big('MEIN GEMÜTE', a.w('hymn', 'Werde') + 0.15, y1, { y: 975, size: 56, color: WHITE, blur: 14 });
    a.big('OLDER THAN BACH', tOl, tSc, { y: 1065, size: 40, ...MONO, color: TEAL, blur: 4 });
    a.big('BY JOHANN SCHOP', tSc, y1, { y: 1065, size: 40, ...MONO, color: TEAL, blur: 4 });
    const yb = (y1 - y0 - 0.3) / 4;
    [0, 1, 2, 3].forEach(b => {
      const [, ch] = PROG[b], t = y0 + 0.15 + b * yb;
      a.note(HYMN[b + 4], t, yb * 0.96, { vel: 0.36, show: false, tone: CHOIR });
      a.ch(ch, t, t + yb, { notes: SHAPE[ch], bass: BASS[ch], vel: 0.22, shape: false });
    });

    // ---------- hess: the piano arrangement, 1926 ----------
    const p0 = S('hess').t0, p1 = S('hess').t1;
    a.tag(0, p0 + 0.2, a.w('hess', 'fame') - 0.05, "THE ENGLISH TITLE", { x: 540, y: 462, color: WHITE });
    a.tag(0, a.w('hess', 'fame') - 0.05, a.w('hess', 'piano') - 0.05, '+ MUCH OF ITS FAME', { x: 540, y: 462, color: GOLD });
    a.tag(0, a.w('hess', 'piano') - 0.05, p1, 'PIANO ARRANGEMENT · 1926', { x: 540, y: 462, color: PINK });
    const pe = Math.min(E, (p1 - p0 - 0.3) / 36);
    const pr = river(p0 + 0.1, 4, { e: pe, vel: 0.3, show: true });
    pr.starts.forEach((t, b) => { const ch = PROG[b][1]; a.note({ G: 'G4', C: 'G4', D: 'F#4' }[ch], t, 9 * pe * 0.95, { vel: 0.14, show: false }); a.note({ G: 'D5', C: 'E5', D: 'D5' }[ch], t, 9 * pe * 0.95, { vel: 0.16, show: false }); });
    a.walker(pr.pts, { t1: p1, dr: -40, color: PINK, label: 'PIANO', labelDr: -52 });

    // ---------- why1: two layers - the lanes ----------
    const q0 = S('why1').t0, q1 = S('why1').t1;
    const L = lanes(q0 + 0.1, q1);
    const tTw = a.w('why1', 'Two') - 0.05, tOr = a.w('why1b', 'orchestra') - 0.05, tCh = a.w('why1c', 'choir') - 0.05;
    // "two layers": both cells flash together, a soft pair
    [0, 3, 6].forEach(i => L.lt.active.push({ t0: tTw, t1: tTw + 0.8, i }));
    L.lh.active.push({ t0: tTw, t1: tTw + 0.8, i: 0 });
    a.ch('G', q0 + 0.1, tOr, { notes: ['G3', 'B3', 'D4'], bass: 'G2', vel: 0.25, shape: false });
    const nb1 = Math.ceil((q1 - tOr - 0.2) / BAR);
    const r1 = river(tOr, nb1, { lane: L.lt, until: q1 - 0.2, vel: 0.3, shape: false });
    hymn(r1.starts.filter(t => t >= tCh - BAR * 0.6).map(t => Math.max(t, tCh)), { lane: L.lh, show: false, from: 1 });

    // ---------- why2: a chorale inside new music ----------
    const c0 = S('why2').t0, c1 = S('why2').t1;
    const gC = a.grid([{ label: 'OLD HYMN', sub: 'A CHORALE', size: 48, subSize: 22, color: TEAL }, { label: 'NEW MUSIC', sub: 'AROUND IT', size: 48, subSize: 22, color: GOLD }],
      c0 + 0.1, c1, { rows: 1, cols: 2, cw: 420, chh: 240, y: 500, revealStep: 0.2 });
    gC.active.push({ t0: a.w('why2', 'hymn') - 0.05, t1: c1, i: 0 }, { t0: a.w('why2', 'new') - 0.05, t1: c1, i: 1 });
    a.big('+', a.w('why2', 'new') - 0.05, c1, { y: 620, size: 80, color: WHITE, blur: 10 });
    a.big("COMMON IN BACH'S TIME", a.w('why2b', 'common') - 0.05, c1, { y: 900, size: 50, ...MONO, color: WHITE, blur: 6 });
    const cr = river(c0 + 0.1, 8, { until: c1 - 0.1, vel: 0.24, shape: false });
    hymn(cr.starts.filter(t => t >= a.w('why2', 'hymn') - 0.9), { show: false, vel: 0.36 });

    // ---------- why3: the triplets never stop / the hymn is the core ----------
    a.scale(S('why3').t0, 'G');
    const z0 = S('why3').t0, z1 = S('why3').t1, tCore = a.at('why3b');
    const zr = river(z0 + 0.1, 12, { until: z1 - 0.1, show: true, vel: 0.3 });
    const zh = hymn(zr.starts.filter(t => t >= tCore - 0.3), { vel: 0.38, from: 2 });
    a.walker(zr.pts, { t1: z1, dr: -40, color: GOLD, label: 'TRIPLETS', labelDr: -52 });
    if (zh.length) a.walker(zh, { t1: z1, dr: 34, color: TEAL, label: 'HYMN', labelDr: 92 });
    a.tag(0, a.w('why3', 'never') - 0.05, tCore, 'NEVER STOPS', { x: 540, y: 462, color: GOLD });
    a.tag(0, tCore, z1, 'A SINGABLE CORE', { x: 540, y: 462, color: TEAL });

    // ---------- why4: counterpoint - two independent lines that fit ----------
    const k0 = S('why4').t0, k1 = S('why4').t1;
    const kr = river(k0 + 0.1, 8, { until: k1 - 0.1, show: true, vel: 0.3 });
    const kh = hymn(kr.starts, { vel: 0.38, from: 4 });
    walkers(kr.pts, kh, k1);
    a.tag(0, a.w('why4', 'counterpoint') - 0.1, a.w('why4', 'fit') - 0.05, 'TWO INDEPENDENT IDEAS', { x: 540, y: 462, color: PINK });
    a.tag(0, a.w('why4', 'fit') - 0.05, k1, 'THAT FIT TOGETHER', { x: 540, y: 462, color: GOLD });

    // ---------- essence: river + hymn, then the final G ----------
    a.scale(S('essence').t0, 'G');
    const e0 = S('essence').t0 + 0.1, ee = Math.min(E, (a.at('cta') - e0) / 36);
    const er = river(e0, 4, { e: ee, show: true, vel: 0.3 });
    const eh = hymn(er.starts, { len: 9 * ee, vel: 0.36, from: 4 });
    walkers(er.pts, eh, er.end + 0.4, { labels: false });
    a.ch('G', er.end, S('essence').t1 - 0.3, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.5 });
    a.note('G4', er.end, S('essence').t1 - er.end - 0.4, { vel: 0.34, tone: CHOIR });
    a.ring(['G', 'B', 'D'], er.end, S('essence').t1, { color: GOLD });
    a.tag(0, a.w('essence', 'river') - 0.05, a.w('essence', 'motion') - 0.05, 'TRIPLETS + HYMN', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('essence', 'motion') - 0.05, S('essence').t1, 'MOTION + STILLNESS', { x: 540, y: 462, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
