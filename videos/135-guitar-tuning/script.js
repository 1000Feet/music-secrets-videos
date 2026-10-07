// Why guitars are tuned E A D G B E: all perfect fourths except one major third (G-B); the violin family
// is tuned in fifths, the double bass in fourths. No copyrighted music: only open strings, a C major
// scale in first position and generic open chords. Plucked/bowed strings are additive tones (engine `tone`).
const GUITAR = [1, 0.75, 0.5, 0.38, 0.28, 0.2, 0.14, 0.1, 0.07, 0.05];
const BOW = [1, 0.85, 0.7, 0.62, 0.52, 0.45, 0.36, 0.3];
const LOWBOW = [1, 0.9, 0.75, 0.6, 0.48, 0.38, 0.3, 0.24, 0.18, 0.12];
const GTR = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
const VLN = ['G3', 'D4', 'A4', 'E5'];
const VC = ['C2', 'G2', 'D3', 'A3'];
const DB = ['E1', 'A1', 'D2', 'G2'];

module.exports = {
  slug: 'guitar-tuning',
  title: 'Why Guitars Are Tuned E A D G B E',
  segments: [
    { id: 'hook',    text: 'Six strings: E, A, D, G, B, E. Why tune a guitar like that?' },
    { id: 'what',    text: 'Almost every neighbouring pair is a fourth apart. Except one.' },
    { id: 'violin',  text: 'A violin is tuned G, D, A, E, in fifths.' },
    { id: 'cello',   text: 'Viola and cello: C, G, D, A. Fifths again.' },
    { id: 'bass',    text: 'The double bass? E, A, D, G. Fourths, like a guitar.' },
    { id: 'why1',    text: 'So why does it work? E to A is five half steps, a perfect fourth.' },
    { id: 'why2',    text: 'So are A to D, D to G, and B to E.' },
    { id: 'why3',    text: 'But G to B is four half steps, a major third.' },
    { id: 'span',    text: 'Fourths keep scales and chord shapes within one hand span.' },
    { id: 'chords',  text: 'That one third makes common open chords easy to finger...' },
    { id: 'octaves', text: 'and puts the two E strings exactly two octaves apart.' },
    { id: 'fifths',  text: 'The violin family uses fifths: wider gaps, so fewer strings cover the range.' },
    { id: 'reach',   text: 'On a small neck, a fifth is still within reach.' },
    { id: 'dbass',   text: 'A double bass is so large that fifths would mean huge stretches. So, fourths.' },
    { id: 'essence', text: 'Fourths, one sneaky third, fifths for the violin.' },
    { id: 'essence2', text: 'Every tuning is a compromise between hands and harmony.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'WHY GUITARS ARE TUNED', title: 'E  A  D  G  B  E', accent: true, circle: false, tonic: 4, lead: 0.4, gap: 0.3, tail: 0.6 },
    { id: 'violin', segs: ['violin'], label: 'THE VIOLIN', title: 'G D A E', sub: 'four strings · in fifths', circle: false, tonic: 7, tail: 1.8 },
    { id: 'cello', segs: ['cello'], label: 'VIOLA AND CELLO', title: 'C G D A', sub: 'four strings · in fifths', circle: false, tonic: 0, tail: 1.8 },
    { id: 'bass', segs: ['bass'], label: 'THE DOUBLE BASS', title: 'E A D G', sub: 'four strings · in fourths', circle: false, tonic: 4, tail: 1.8 },
    { id: 'why1', segs: ['why1', 'why2', 'why3'], label: 'WHY IT WORKS', title: 'COUNT THE GAPS', tonic: 4, gap: 0.2, tail: 1.1 },
    { id: 'span', segs: ['span'], label: 'WHY FOURTHS', title: 'ONE HAND SPAN', circle: false, tonic: 0, tail: 1.0 },
    { id: 'chords', segs: ['chords'], label: 'WHY ONE THIRD', title: 'OPEN CHORDS', circle: false, tonic: 4, tail: 1.9 },
    { id: 'octaves', segs: ['octaves'], label: 'WHY ONE THIRD', title: 'TWO OCTAVES', circle: false, tonic: 4, tail: 1.1 },
    { id: 'fifths', segs: ['fifths', 'reach'], label: 'WHY FIFTHS', title: 'THE VIOLIN FAMILY', circle: false, tonic: 7, gap: 0.25, tail: 1.1 },
    { id: 'dbass', segs: ['dbass'], label: 'WHY NOT FIFTHS', title: 'THE DOUBLE BASS', circle: false, tonic: 4, tail: 1.3 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'HANDS AND HARMONY', accent: true, circle: false, tonic: 4, gap: 0.35, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', ORANGE = '#ffa45c', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const name = n => n.replace(/-?\d/, '');

    // ---------- sound ----------
    const pluck = (n, t, dur = 1.6, vel = 0.3) => a.note(n, t, dur, { vel, show: false, tone: { partials: GUITAR, attack: 0.004, decay: 1.5, release: 0.3 } });
    const vib = (dur, depth = 0.12, rate = 5.6, delay = 0.25) => {
      const b = [[0, 0]];
      for (let x = delay; x < dur + 0.3; x += 0.02) b.push([x, depth * Math.min(1, (x - delay) / 0.3) * Math.sin(2 * Math.PI * rate * (x - delay))]);
      return b;
    };
    const bow = (n, t, dur, vel = 0.26, P = BOW) => a.note(n, t, dur, { vel, show: false, tone: { partials: P, attack: 0.12, release: 0.25, bend: vib(dur) } });
    const strum = (notes, t, dur = 1.8, vel = 0.24, gap = 0.035) => notes.forEach((n, i) => n && pluck(n, t + i * gap, dur, vel));

    // ---------- the strings: one thin grid bar each, low string at the bottom ----------
    function strings(list, t0, t1, o = {}) {
      const N = list.length, top = o.top ?? 600, bot = o.bot ?? 1090, gap = (bot - top) / (N - 1);
      const L = 210, R = 880, th0 = o.thick ?? 14;
      return list.map((n, i) => {
        const y = bot - i * gap, th = Math.round(th0 - i * (th0 - 5) / (N - 1)), chh = 16 + th, ta = t0 + i * (o.step ?? 0.04);
        const col = o.color ?? WHITE;
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: R - L + 16, chh, x: (L + R) / 2, y: y - chh / 2 });
        a.big(name(n), ta, t1, { x: L - 75, y, size: 56, color: col === WHITE ? WHITE : col, blur: 0 });
        g.y = y; g.n = n;
        return g;
      });
    }
    // interval labels between neighbouring strings
    function gaps(G, labels, t0, t1, o = {}) {
      labels.forEach(([txt, col], i) => {
        const y = (G[i].y + G[i + 1].y) / 2;
        a.big(txt, t0 + i * (o.step ?? 0.05), t1, { x: o.x ?? 975, y, size: o.size ?? 32, ...MONO, color: col, blur: o.blur ?? 0 });
      });
    }
    const hit = (g, t, d = 0.6) => g.active.push({ t0: t, t1: t + d, i: 0 });

    // ---- hook: the six strings with their gaps (cover: everything on screen at once) ----
    const h1 = S('hook').t1;
    const HG = strings(GTR, 0.05, h1);
    const G4 = ['4TH', TEAL], G3 = ['3RD', GOLD];
    gaps(HG, [G4, G4, G4, G3, G4], 0.3, h1);
    strum(GTR, 0.15, 2.2, 0.22, 0.06);
    HG.forEach((g, i) => hit(g, 0.15 + i * 0.06, 1.0));
    const hw = [['E', 0], ['A', 0], ['D', 0], ['G', 0], ['B', 0], ['E', 1]];
    hw.forEach(([w, k], i) => { const t = a.w('hook', w, k) - 0.03; pluck(GTR[i], t, 1.2, 0.3); hit(HG[i], t, 0.5); });
    const tWhy = a.w('hook', 'Why');
    strum(GTR, tWhy, 2.0, 0.2, 0.05);
    const tFo = a.w('what', 'fourth') - 0.05, tEx = a.w('what', 'Except') - 0.05;
    [[0, 1], [1, 2], [2, 3], [4, 5]].forEach(([i, j], k) => { const t = tFo + k * 0.3; pluck(GTR[i], t, 0.6, 0.24); pluck(GTR[j], t, 0.6, 0.24); hit(HG[i], t, 0.3); hit(HG[j], t, 0.3); });
    a.big('4TH = 5 HALF STEPS', tFo, tEx, { y: 530, size: 34, ...MONO, color: TEAL, blur: 6 });
    pluck('G3', tEx, 1.4, 0.3); pluck('B3', tEx, 1.4, 0.3);
    hit(HG[3], tEx, h1 - tEx); hit(HG[4], tEx, h1 - tEx);
    a.big('EXCEPT G → B: A 3RD', tEx, h1, { y: 530, size: 34, ...MONO, color: GOLD, blur: 6 });

    // ---- the violin family and the double bass (open strings, original little figures) ----
    function family(id, notes, label, col, vel, P, words, ivl) {
      const s0 = S(id).t0, s1 = S(id).t1;
      const G = strings(notes, s0 + 0.05, s1, { top: 640, bot: 1060, thick: 12, color: col });
      gaps(G, [ivl, ivl, ivl], s0 + 0.3, s1, { size: 34 });
      words.forEach(([w, k], i) => { const t = a.w(id, w, k) - 0.03; bow(notes[i], t, 0.7, vel, P); hit(G[i], t, 0.7); });
      // after the line: walk the open strings up and back, then two neighbours together
      let t = a.end(id) + 0.1;
      [0, 1, 2, 3].forEach(i => { bow(notes[i], t, 0.24, vel * 0.9, P); hit(G[i], t, 0.26); t += 0.26; });
      bow(notes[0], t, s1 - t - 0.3, vel * 0.8, P); bow(notes[1], t, s1 - t - 0.3, vel * 0.8, P);
      hit(G[0], t, s1 - t); hit(G[1], t, s1 - t);
      a.big(label, s0 + 0.3, s1, { y: 530, size: 34, ...MONO, color: col, blur: 0 });
      return G;
    }
    const FIFTH = ['5TH', PINK], FOURTH = ['4TH', TEAL];
    family('violin', VLN, '7 HALF STEPS APART', PINK, 0.26, BOW, [['G', 0], ['D', 0], ['A', 1], ['E', 0]], FIFTH);
    family('cello', VC, 'CELLO: C2 · VIOLA: AN OCTAVE UP', PINK, 0.3, LOWBOW, [['C', 0], ['G', 0], ['D', 0], ['A', 0]], FIFTH);
    family('bass', DB, '5 HALF STEPS APART', ORANGE, 0.34, LOWBOW, [['E', 0], ['A', 0], ['D', 0], ['G', 0]], FOURTH);

    // ---- why1-3: on the circle, E A D G B E: 5, 5, 5, 4, 5 half steps ----
    const c0 = S('why1').t0, c1 = S('why1').t1;
    a.scale(c0 + 0.1, 4, [0, 5, 10, 3, 7], { popIn: { t0: c0 + 0.1, step: 0.1 } });
    const tE = a.w('why1', 'E') - 0.05, tFive = a.w('why1', 'five') - 0.05, tPf = a.w('why1', 'perfect') - 0.05;
    const walk = [[tE, 4]];
    for (let i = 1; i <= 5; i++) walk.push([tFive + i * 0.17, 4 + i]);
    a.walker(walk, { t1: tPf + 0.6, color: WHITE, dr: 0 });
    walk.forEach(([t, p]) => a.note(40 + p - 4, t, 0.22, { vel: 0, show: false }));
    walk.slice(1).forEach(([t, p]) => pluck(40 + p - 4, t, 0.3, 0.22));
    pluck('E2', tE, 1.0, 0.28);
    const arc = (from, to, steps, t, col, lbl, dr, labelR) => a.arc(from, to, t, c1, { steps, color: col, label: lbl, dr, labelR });
    arc('E', 'A', 5, tPf, TEAL, '5', 30, 168);
    pluck('E2', tPf, 1.2, 0.26); pluck('A2', tPf + 0.25, 1.2, 0.26);
    a.big('5 HALF STEPS = A 4TH', tPf, a.w('why3', 'But'), { y: 470, size: 38, ...MONO, color: TEAL, blur: 6 });
    const tA = a.w('why2', 'A') - 0.05, tD = a.w('why2', 'D', 1) - 0.05, tB = a.w('why2', 'B') - 0.05;
    arc('A', 'D', 5, tA, TEAL, '5', 30, 168); pluck('A2', tA, 0.8, 0.24); pluck('D3', tA + 0.2, 0.9, 0.24);
    arc('D', 'G', 5, tD, TEAL, '5', -32, 150); pluck('D3', tD, 0.8, 0.24); pluck('G3', tD + 0.2, 0.9, 0.24);
    arc('B', 'E', 5, tB, TEAL, '5', -58, 140); pluck('B3', tB, 0.8, 0.24); pluck('E4', tB + 0.2, 0.9, 0.24);
    const tG = a.w('why3', 'G') - 0.05, tTh = a.w('why3', 'third') - 0.05;
    arc('G', 'B', 4, tG, GOLD, '4', -32, 150); pluck('G3', tG, 1.0, 0.28); pluck('B3', tG + 0.25, 1.2, 0.28);
    a.big('4 HALF STEPS = A MAJOR 3RD', a.w('why3', 'four') - 0.05, c1, { y: 470, size: 38, ...MONO, color: GOLD, blur: 6 });
    a.ring(['G', 'B'], tTh, c1, { color: GOLD });
    pluck('G3', tTh + 0.1, 1.4, 0.24); pluck('B3', tTh + 0.1, 1.4, 0.24);
    let tw = a.end('why3') + 0.25;
    GTR.forEach(n => { pluck(n, tw, 0.5, 0.24); tw += 0.2; });

    // ---------- fretboard: 6 strings (high E on top) x frets 0-3 ----------
    const FB = { cw: 185, chh: 86, x: 575, y: 600 }, gx = FB.x - 2 * FB.cw;
    const ROWS = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
    const cellX = c => gx + c * FB.cw + FB.cw / 2, cellY = r => FB.y + r * FB.chh + FB.chh / 2;
    const midiOf = (r, f) => a.T.midi(ROWS[r]) + f;
    const NN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    function board(t0, t1, cells, col) {
      const g = a.grid(cells, t0, t1, { rows: 6, cols: 4, cw: FB.cw, chh: FB.chh, x: FB.x, y: FB.y });
      ROWS.forEach((n, r) => a.big(name(n), t0, t1, { x: gx - 45, y: cellY(r), size: 40, color: WHITE, blur: 0 }));
      ['OPEN', 'FRET 1', 'FRET 2', 'FRET 3'].forEach((l, c) => a.big(l, t0, t1, { x: cellX(c), y: FB.y - 22, size: 24, ...MONO, color: GREY, blur: 0 }));
      void col;
      return g;
    }

    // ---- span: a C major scale over two octaves, all within frets 0-3 ----
    const p0 = S('span').t0, p1 = S('span').t1;
    const SC = [[5, 0], [5, 1], [5, 3], [4, 0], [4, 2], [4, 3], [3, 0], [3, 2], [3, 3], [2, 0], [2, 2], [1, 0], [1, 1], [1, 3], [0, 0], [0, 1], [0, 3]];
    const inSc = new Set(SC.map(([r, f]) => r * 4 + f));
    const cells = []; for (let r = 0; r < 6; r++) for (let f = 0; f < 4; f++) cells.push({ label: inSc.has(r * 4 + f) ? NN[midiOf(r, f) % 12] : '', color: TEAL, size: 40 });
    const SG = board(p0 + 0.05, p1, cells, TEAL);
    const tSc = a.w('span', 'scales') - 0.05, tCh = a.w('span', 'chord') - 0.05, tHand = a.w('span', 'hand') - 0.05;
    const stepS = Math.min(0.2, (tCh - tSc + 0.6) / SC.length);
    SC.forEach(([r, f], i) => { const t = tSc + i * stepS; pluck(midiOf(r, f), t, 0.35, 0.24); SG.active.push({ t0: t, t1: t + stepS + 0.05, i: r * 4 + f }); });
    const tC = Math.max(tCh, tSc + SC.length * stepS + 0.1);
    const CSH = [[1, 3], [2, 2], [3, 0], [4, 1], [5, 0]].map(([s, f]) => [6 - s, f]);   // C major: x 3 2 0 1 0
    CSH.forEach(([r, f]) => SG.active.push({ t0: tC, t1: p1, i: r * 4 + f }));
    strum(CSH.slice().reverse().map(([r, f]) => midiOf(r, f)), tC, 1.8, 0.22);
    strum(CSH.slice().reverse().map(([r, f]) => midiOf(r, f)), p1 - 1.2, 1.2, 0.18);
    a.big('C MAJOR SCALE · 2 OCTAVES', tSc, tC, { y: 515, size: 32, ...MONO, color: TEAL, blur: 0 });
    a.big('ALL WITHIN ONE HAND SPAN', tC, p1, { y: 515, size: 32, ...MONO, color: GOLD, blur: 0 });
    void tHand;

    // ---- chords: open chord shapes E, G, C, D thanks to the G-B third ----
    const o0 = S('chords').t0, o1 = S('chords').t1;
    const CG = board(o0 + 0.05, o1, Array.from({ length: 24 }, () => ({ label: '', color: GOLD })), GOLD);
    // [chord, frets low E -> high E] (-1 = not played)
    const OPEN = [['E', [0, 2, 2, 1, 0, 0]], ['G', [3, 2, 0, 0, 0, 3]], ['C', [-1, 3, 2, 0, 1, 0]], ['D', [-1, -1, 0, 2, 3, 2]]];
    const tOp = a.w('chords', 'open') - 0.1, cl = (o1 - tOp - 0.3) / OPEN.length;
    OPEN.forEach(([nm, fr], k) => {
      const t = tOp + k * cl, t1 = t + cl;
      const notes = fr.map((f, s) => (f < 0 ? null : a.T.midi(GTR[s]) + f));
      fr.forEach((f, s) => {
        const r = 5 - s;
        if (f < 0) { a.big('×', t, t1, { x: gx - 95, y: cellY(r), size: 36, color: RED, blur: 0 }); return; }
        CG.active.push({ t0: t, t1, i: r * 4 + f });
        a.big(NN[(a.T.midi(GTR[s]) + f) % 12], t, t1, { x: cellX(f), y: cellY(r), size: 34, color: WHITE, blur: 0 });
      });
      a.big(nm, t, t1, { y: 515, size: 64, color: GOLD, blur: 14 });
      strum(notes, t + 0.02, cl - 0.1, 0.22);
      strum(notes.slice().reverse(), t + cl / 2, cl / 2 - 0.05, 0.16, 0.025);
    });
    strum([null, 'A2', 'E3', 'A3', 'C#4', 'E4'], o0 + 0.15, 1.2, 0.18);
    a.big('G → B: THE THIRD', o0 + 0.2, tOp, { y: 515, size: 34, ...MONO, color: GOLD, blur: 0 });
    a.grid([{ label: '', color: GOLD }], o0 + 0.2, tOp, { rows: 1, cols: 1, cw: 4 * FB.cw + 30, chh: 2 * FB.chh + 20, x: FB.x, y: FB.y + FB.chh - 10 }).active.push({ t0: o0 + 0.2, t1: tOp, i: 0 });

    // ---- octaves: 5 + 5 + 5 + 4 + 5 = 24 half steps = two octaves ----
    const v0 = S('octaves').t0, v1 = S('octaves').t1;
    const OG = strings(GTR, v0 + 0.05, v1);
    gaps(OG, [['5', TEAL], ['5', TEAL], ['5', TEAL], ['4', GOLD], ['5', TEAL]], v0 + 0.1, v1, { size: 40 });
    const tTwo = a.w('octaves', 'two') - 0.05, tOct = a.w('octaves', 'octaves') - 0.05;
    hit(OG[0], tTwo, v1 - tTwo); hit(OG[5], tTwo, v1 - tTwo);
    pluck('E2', tTwo, 1.6, 0.3); pluck('E4', tTwo + 0.3, 1.6, 0.3);
    a.big('5 + 5 + 5 + 4 + 5 = 24', v0 + 0.3, v1, { y: 470, size: 44, ...MONO, color: WHITE, blur: 6 });
    a.big('24 HALF STEPS = 2 OCTAVES', tOct, v1, { y: 540, size: 40, ...MONO, color: GOLD, blur: 8 });
    pluck('E2', tOct + 0.2, 2.2, 0.26); pluck('E4', tOct + 0.2, 2.2, 0.26);
    let te = v0 + 0.2;
    GTR.forEach((n, i) => { pluck(n, te, 0.4, 0.2); hit(OG[i], te, 0.3); te += 0.22; });

    // ---- fifths: range over the keyboard - 6 guitar strings vs 4 violin strings ----
    const f0 = S('fifths').t0, f1 = S('fifths').t1;
    const KW = 1020 / 26;
    const WH = []; for (let m = 36; m <= 79; m++) if (![1, 3, 6, 8, 10].includes(m % 12)) WH.push(m);
    const keyCx = m => ([1, 3, 6, 8, 10].includes(m % 12) ? 30 + WH.indexOf(m - 1) * KW + KW * 0.68 + KW * 0.32 : 30 + WH.indexOf(m) * KW + KW / 2);
    const tRe = a.at('reach') - 0.1;
    const bars = (list, t0, t1, hh, col, step) => list.forEach((n, i) => {
      const m = a.T.midi(n), ta = t0 + i * step;
      const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: 34, chh: hh, x: keyCx(m), y: 1170 - hh });
      g.active.push({ t0: ta, t1, i: 0 });
      a.big(name(n), ta, t1, { x: keyCx(m), y: 1170 - hh - 26, size: 26, ...MONO, color: col, blur: 0 });
    });
    const tGap = a.w('fifths', 'wider') - 0.05, tFew = a.w('fifths', 'fewer') - 0.05;
    bars(GTR, f0 + 0.2, tRe, 150, TEAL, 0.08);
    bars(VLN, a.w('fifths', 'fifths') - 0.05, tRe, 330, PINK, 0.12);
    a.big('GUITAR: 6 STRINGS', f0 + 0.2, tRe, { x: 300, y: 860, size: 32, ...MONO, color: TEAL, blur: 0 });
    a.big('VIOLIN: 4 STRINGS', a.w('fifths', 'fifths') - 0.05, tRe, { x: 790, y: 700, size: 32, ...MONO, color: PINK, blur: 0 });
    a.big('WIDER GAPS', tGap, tFew, { y: 530, size: 46, color: PINK, blur: 10 });
    a.big('FEWER STRINGS, BIG RANGE', tFew, tRe, { y: 530, size: 46, color: PINK, blur: 10 });
    let tf = f0 + 0.2;
    GTR.forEach(n => { pluck(n, tf, 0.4, 0.2); tf += 0.08; });
    VLN.forEach((n, i) => bow(n, a.w('fifths', 'fifths') + i * 0.25, 0.6, 0.22));
    VLN.forEach((n, i) => bow(n, tFew + i * 0.3, 0.45, 0.2));
    // reach: one hand position on the G string covers a fifth, G up to D
    const HS = ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];
    const RG = a.grid(HS.map((l, i) => ({ label: l, color: [0, 2, 4, 5, 7].includes(i) ? PINK : GREY, size: l.length > 1 ? 30 : 42 })), tRe, f1, { rows: 1, cols: 8, cw: 118, chh: 140, y: 720 });
    a.big('ON THE G STRING', tRe + 0.1, f1, { y: 650, size: 30, ...MONO, color: GREY, blur: 0 });
    const tNeck = a.w('reach', 'fifth') - 0.05;
    [[0, 'G3'], [2, 'A3'], [4, 'B3'], [5, 'C4'], [7, 'D4']].forEach(([i, n], k) => { const t = a.at('reach') + k * 0.3; bow(n, t, 0.3, 0.22); RG.active.push({ t0: t, t1: t + 0.32, i }); });
    RG.active.push({ t0: tNeck, t1: f1, i: 0 }, { t0: tNeck, t1: f1, i: 7 });
    a.big('◀ A FIFTH: 7 HALF STEPS ▶', tNeck, f1, { y: 940, size: 38, ...MONO, color: PINK, blur: 6 });
    a.big('ONE HAND POSITION', a.w('reach', 'reach') - 0.05, f1, { y: 1030, size: 44, color: WHITE, blur: 8 });
    bow('G3', tNeck + 0.1, f1 - tNeck - 0.4, 0.2); bow('D4', tNeck + 0.1, f1 - tNeck - 0.4, 0.2);

    // ---- dbass: fifths would mean huge stretches, so fourths ----
    const d0 = S('dbass').t0, d1 = S('dbass').t1;
    const DG = strings(DB, d0 + 0.05, d1, { top: 640, bot: 1060, thick: 16, color: ORANGE });
    const tFi = a.w('dbass', 'fifths') - 0.05, tFo2 = a.w('dbass', 'fourths') - 0.05;
    gaps(DG, [['5TH?', RED], ['5TH?', RED], ['5TH?', RED]], tFi, tFo2, { size: 34 });
    gaps(DG, [FOURTH, FOURTH, FOURTH], tFo2, d1, { size: 34 });
    a.big('HUGE STRETCHES', a.w('dbass', 'huge') - 0.05, tFo2, { y: 530, size: 50, color: RED, blur: 10 });
    a.big('SO: FOURTHS', tFo2, d1, { y: 530, size: 50, color: TEAL, blur: 10 });
    a.big('A VERY LARGE INSTRUMENT', d0 + 0.3, a.w('dbass', 'huge') - 0.05, { y: 530, size: 36, ...MONO, color: ORANGE, blur: 0 });
    bow('E1', d0 + 0.2, 1.3, 0.36, LOWBOW); hit(DG[0], d0 + 0.2, 1.3);
    let tb = tFo2;
    [0, 1, 2, 3].forEach(i => { bow(DB[i], tb, 0.38, 0.32, LOWBOW); hit(DG[i], tb, 0.4); tb += 0.4; });
    bow('E1', tb, d1 - tb - 0.3, 0.3, LOWBOW); bow('G2', tb, d1 - tb - 0.3, 0.26, LOWBOW);

    // ---- essence: guitar strings, gaps, and a last strum ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tCta = a.at('cta');
    const EG = strings(GTR, e0 + 0.05, e1);
    gaps(EG, [G4, G4, G4, G3, G4], e0 + 0.1, e1);
    a.big('HANDS', a.w('essence2', 'hands') - 0.05, e1, { x: 330, y: 515, size: 54, color: TEAL, blur: 12 });
    a.big('HARMONY', a.w('essence2', 'harmony') - 0.05, e1, { x: 750, y: 515, size: 54, color: GOLD, blur: 12 });
    a.big('↔', a.w('essence2', 'harmony') - 0.05, e1, { x: 540, y: 515, size: 54, color: WHITE, blur: 0 });
    const tTh2 = a.w('essence', 'third') - 0.05, tVi = a.w('essence', 'violin') - 0.05;
    strum(GTR, e0 + 0.2, 1.6, 0.2, 0.06); EG.forEach((g, i) => hit(g, e0 + 0.2 + i * 0.06, 0.8));
    pluck('G3', tTh2, 1.0, 0.26); pluck('B3', tTh2 + 0.2, 1.0, 0.26); hit(EG[3], tTh2, 1.0); hit(EG[4], tTh2 + 0.2, 1.0);
    VLN.forEach((n, i) => bow(n, tVi + i * 0.22, 0.5, 0.2));
    const tFin = tCta + 0.1;
    const E_MAJ = ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'];
    strum(E_MAJ, tFin, e1 - tFin - 0.2, 0.24, 0.05);
    EG.forEach((g, i) => hit(g, tFin + i * 0.05, e1 - tFin));
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
