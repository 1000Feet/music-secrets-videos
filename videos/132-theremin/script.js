// The theremin: pitch and volume controlled by hands moving near two antennas, never touching.
// Copyright/brief: The Day the Earth Stood Still (Bernard Herrmann, 1951) is named only; every phrase
// here is ORIGINAL - a near-pure sine (engine note option `tone`) whose pitch follows a smooth curve
// with glides and vibrato (tone option `bend`). Backing pads are generic held chords.
const TH = [1, 0.06, 0.025, 0.01];                   // close to a pure sine
const DT = 0.02;
// original phrases: [semitones above C4, hold seconds]
const PH_A = [[0, 0.4], [7, 0.7], [5, 0.3], [12, 0.9], [11, 0.25], [7, 1.0]];
const PH_B = [[4, 0.5], [10, 0.8], [9, 0.3], [3, 0.9], [6, 1.1]];
const PH_C = [[7, 0.5], [9, 0.35], [12, 0.8], [11, 0.3], [9, 0.35], [7, 0.45], [4, 1.0]];
const PH_D = [[0, 0.3], [12, 0.9], [5, 0.9]];

module.exports = {
  slug: 'theremin',
  title: 'The Theremin',
  segments: [
    { id: 'hook',    text: 'No keys, no strings, and the player never touches it.' },
    { id: 'what',    text: 'This is the theremin, played by moving your hands in the air.' },
    { id: 's1',      text: 'Leon Theremin invented it around 1920, in Soviet Russia.' },
    { id: 's2',      text: 'Its eerie glide became a hallmark of 1950s science fiction films...' },
    { id: 's2b',     text: 'like The Day the Earth Stood Still, scored by Bernard Herrmann.' },
    { id: 's3',      text: 'And Clara Rockmore became its most celebrated virtuoso.' },
    { id: 'why1',    text: 'So how does it work? Two antennas.' },
    { id: 'why2',    text: 'Move your right hand toward the vertical one, and the pitch rises.' },
    { id: 'why3',    text: 'Your left hand, near the loop, controls the volume.' },
    { id: 'why4',    text: 'Your hands disturb an electric field. You never touch it.' },
    { id: 'why5',    text: 'The pitch is continuous, so every move is a slide...' },
    { id: 'why6',    text: 'and a shaking hand makes vibrato.' },
    { id: 'why7',    text: 'The tone is close to a pure sine wave, with few overtones...' },
    { id: 'why7b',   text: 'so it sounds ghostly, almost like a voice.' },
    { id: 'why8',    text: 'Hitting exact notes in the air is notoriously hard: you must listen constantly.' },
    { id: 'essence', text: 'No keys, no touch: just a hand in the air, and a voice from another planet.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'MUSIC WITHOUT TOUCHING', title: 'THE THEREMIN', accent: true, circle: false, lead: 0.5, gap: 0.4, tail: 0.8 },
    { id: 's1', segs: ['s1'], label: 'THE INVENTION', title: 'Leon Theremin', sub: 'Lev Termen · around 1920', circle: false, tail: 1.0 },
    { id: 's2', segs: ['s2', 's2b'], label: 'YOU HEAR IT IN', title: '1950s Sci-Fi', sub: 'The Day the Earth Stood Still · 1951', circle: false, gap: 0.3, tail: 2.3 },
    { id: 's3', segs: ['s3'], label: 'THE VIRTUOSO', title: 'Clara Rockmore', sub: 'the theremin as a solo voice', circle: false, tail: 2.4 },
    { id: 'why1', segs: ['why1', 'why2', 'why3'], label: 'WHY IT WORKS', title: 'TWO ANTENNAS', circle: false, gap: 0.4, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'AN ELECTRIC FIELD', circle: false, tail: 1.0 },
    { id: 'why5', segs: ['why5', 'why6'], label: 'WHY IT WORKS', title: 'ALWAYS SLIDING', circle: false, gap: 0.3, tail: 1.6 },
    { id: 'why7', segs: ['why7', 'why7b'], label: 'WHY IT WORKS', title: 'A PURE TONE', circle: false, gap: 0.2, tail: 1.4 },
    { id: 'why8', segs: ['why8'], label: 'WHY IT WORKS', title: 'NOTES IN THIN AIR', circle: false, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A VOICE FROM SPACE', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92', WHITE = '#ffffff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const keysOn = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));

    // ---------- pitch curves: holds with vibrato, smooth (cosine) glides ----------
    function curve(ph, o = {}) {
      const g = o.glide ?? 0.3, vibA = o.vib ?? 0.22, keys = [];
      let t = 0;
      ph.forEach(([s, d], i) => { keys.push({ t0: t, t1: t + d, s }); t += d + (i < ph.length - 1 ? g : 0); });
      const dur = t, out = [];
      for (let x = 0; x <= dur + 1e-9; x += DT) {
        let k = keys.findIndex(q => x < q.t1);
        if (k < 0) k = keys.length - 1;
        const q = keys[k];
        let v;
        if (x < q.t0) { const p = keys[k - 1], u = (x - p.t1) / (q.t0 - p.t1); v = p.s + (q.s - p.s) * (0.5 - 0.5 * Math.cos(Math.PI * u)); }
        else { const h = x - q.t0; v = q.s + vibA * Math.min(1, Math.max(0, (h - 0.15) / 0.3)) * Math.sin(2 * Math.PI * 5.8 * h); }
        out.push([x, v]);
      }
      return out;
    }
    const cdur = c => c[c.length - 1][0];
    // play a curve (semitones above C4) and light the nearest keys along the way
    function sing(c, t, vel = 0.24, o = {}) {
      a.note(60.0001, t, cdur(c), { vel, show: false, tone: { partials: TH, attack: o.attack ?? 0.15, release: o.release ?? 0.35, bend: c } });
      let cur = Math.round(c[0][1]), st = 0;
      for (let i = 1; i <= c.length; i++) {
        const r = i < c.length ? Math.round(c[i][1]) : null;
        if (r !== cur) { a.note(60 + cur, t + c[st][0], Math.max(0.05, c[Math.min(i, c.length - 1)][0] - c[st][0]), { vel: 0, show: false }); cur = r; st = i; }
      }
    }
    // soft generic pad under the theremin
    const pad = (notes, t0, t1, vel = 0.05) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel, show: false, tone: { partials: [1, 0.4, 0.2, 0.1], attack: 0.8, release: 0.8 } }));

    // ---------- the pitch graph: note lanes + a dot curve, and a volume meter on the right ----------
    const Y = s => 1060 - s * 40, X0 = 160, XW = 680;
    const LANES = [[0, 'C'], [2, 'D'], [4, 'E'], [5, 'F'], [7, 'G'], [9, 'A'], [11, 'B'], [12, 'C']];
    function lanes(t0, t1, o = {}) {
      LANES.forEach(([s, l]) => {
        const hi = o.hi === s;
        a.grid([{ label: '', color: hi ? GOLD : '#5a5a66' }], t0, t1, { rows: 1, cols: 1, cw: XW + 30, chh: hi ? 24 : 19, x: X0 + XW / 2, y: Y(s) - (hi ? 12 : 9.5) });
        a.big(l, t0, t1, { x: X0 - 50, y: Y(s), size: 30, ...MONO, color: hi ? GOLD : '#9a9aa2', blur: 0 });
      });
      a.big('PITCH', t0, t1, { x: X0 + XW / 2, y: Y(-1.6), size: 26, ...MONO, color: GREY, blur: 0 });
    }
    function dots(c, t0, t1, o = {}) {
      const step = o.step ?? 0.04, size = o.size ?? 26, col = o.color ?? TEAL, dur = cdur(c);
      const sx = XW / (o.span ?? dur), xo = o.x0 ?? 0;
      for (let x = 0; x <= dur + 1e-6; x += step) {
        const v = c[Math.min(c.length - 1, Math.round(x / DT))][1];
        const ta = t0 + (o.draw !== undefined ? (x / dur) * o.draw : x);
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: size, chh: size, x: X0 + (xo + x) * sx, y: Y(v) - size / 2 });
        if (o.lit !== false) g.active.push({ t0: ta, t1, i: 0 });
      }
    }
    // volume meter: 10 stacked cells; level(t) in 0..1
    const VX = 975;
    function meter(t0, t1, level, o = {}) {
      const cells = Array.from({ length: 10 }, (_, i) => ({ label: '', color: i > 7 ? PINK : i > 4 ? GOLD : GREEN }));
      const g = a.grid(cells.reverse(), t0, t1, { rows: 10, cols: 1, cw: 90, chh: 50, x: o.x ?? VX, y: o.y ?? 570 });
      for (let i = 0; i < 10; i++) {
        const cell = 9 - i, th = (i + 0.5) / 10;
        let on = null;
        for (let t = t0; t < t1; t += 0.05) {
          const lit = level(t) > th;
          if (lit && on === null) on = t;
          if ((!lit || t + 0.05 >= t1) && on !== null) { g.active.push({ t0: on, t1: t, i: cell }); on = null; }
        }
      }
      a.big(o.label ?? 'VOLUME', t0, t1, { x: o.x ?? VX, y: (o.y ?? 570) + 540, size: 26, ...MONO, color: GREY, blur: 0 });
      return g;
    }
    // loudness of a sung curve at absolute time t
    const env = (t, t0, d, att = 0.15, rel = 0.35) => (t < t0 || t > t0 + d + rel) ? 0 : Math.min(1, (t - t0) / att) * (t > t0 + d ? 1 - (t - t0 - d) / rel : 1);

    const CA = curve(PH_A), CB = curve(PH_B, { glide: 0.4 }), CC = curve(PH_C, { glide: 0.18, vib: 0.28 }), CD = curve(PH_D, { glide: 0.9 });

    // ---- hook: the curve and the meter drawn at once (cover), then heard ----
    const h1 = S('hook').t1, tP = 0.4;
    lanes(0, h1);
    dots(CA, 0.05, h1, { draw: 0.45, color: TEAL, lit: false });
    dots(CA, tP, h1, { color: TEAL });
    sing(CA, tP, 0.26);
    const tP2 = tP + cdur(CA) + 0.4;
    sing(CD, tP2, 0.24);
    const lvl = t => Math.max(0.55 * (t < tP ? 1 : 0), 0.85 * env(t, tP, cdur(CA)) + 0.08 * Math.sin(t * 3), 0.9 * env(t, tP2, cdur(CD)));
    meter(0.05, h1, lvl);
    a.big('NO TOUCH', a.w('hook', 'touches') - 0.05, h1, { x: X0 + XW / 2, y: 470, size: 54, color: GOLD, blur: 14 });
    a.big('HANDS IN THE AIR', a.w('what', 'hands') - 0.05, h1, { x: X0 + XW / 2, y: 535, size: 32, ...MONO, color: WHITE, blur: 0 });
    pad(['C3', 'G3'], 0.1, h1 - 0.2, 0.04);

    // ---- s1: the invention ----
    const f0 = S('s1').t0, f1 = S('s1').t1;
    const gf = a.grid([{ label: 'AROUND 1920', sub: 'SOVIET RUSSIA', color: GOLD, size: 62 }, { label: 'LEON THEREMIN', sub: 'ALSO KNOWN AS LEV TERMEN', color: TEAL, size: 54 }],
      f0 + 0.1, f1, { rows: 2, cols: 1, cw: 820, chh: 230, y: 520, revealStep: 0.2 });
    gf.active.push({ t0: a.w('s1', 'Leon') - 0.05, t1: a.w('s1', '1920') - 0.05, i: 1 }, { t0: a.w('s1', '1920') - 0.05, t1: f1, i: 0 });
    sing(CD, f0 + 0.3, 0.16);
    sing(curve([[7, 0.6], [4, 0.8]], { glide: 0.5 }), f0 + 0.3 + cdur(CD) + 0.2, 0.14);
    pad(['C3', 'G3'], f0 + 0.1, f1, 0.035);

    // ---- s2: 1950s science fiction - an original eerie phrase over a dark pad ----
    const b0 = S('s2').t0, b1 = S('s2').t1;
    lanes(b0, b1);
    const tB1 = b0 + 0.3, tB2 = Math.max(a.end('s2b') + 0.1, b1 - cdur(CB) - 0.5);
    dots(CB, tB1, tB2 - 0.05, { color: LILAC, span: cdur(CB) });
    dots(CB, tB2, b1, { color: LILAC });
    sing(CB, tB1, 0.16); sing(CB, tB2, 0.26);
    a.big('EERIE GLIDES', a.w('s2', 'eerie') - 0.05, a.at('s2b'), { x: X0 + XW / 2, y: 470, size: 50, color: LILAC, blur: 14 });
    a.big('BERNARD HERRMANN', a.w('s2b', 'Bernard') - 0.05, b1, { x: X0 + XW / 2, y: 470, size: 48, color: GOLD, blur: 12 });
    meter(b0, b1, t => Math.max(0.6 * env(t, tB1, cdur(CB)), 0.9 * env(t, tB2, cdur(CB))));
    pad(['C3', 'Eb3', 'G3'], b0 + 0.1, (b0 + b1) / 2, 0.04); pad(['B2', 'D3', 'F#3'], (b0 + b1) / 2, b1 - 0.2, 0.04);

    // ---- s3: Clara Rockmore - a lyrical original phrase with vibrato ----
    const r0 = S('s3').t0, r1 = S('s3').t1;
    lanes(r0, r1);
    const tR0 = r0 + 0.3, tR = Math.max(tR0 + cdur(CC) + 0.2, r1 - cdur(CC) - 0.4);
    dots(CC, tR0, tR - 0.05, { color: PINK, lit: true });
    dots(CC, tR, r1, { color: PINK });
    sing(CC, tR0, 0.16, { attack: 0.3 }); sing(CC, tR, 0.26, { attack: 0.3 });
    meter(r0, r1, t => Math.max(0.6 * env(t, tR0, cdur(CC), 0.3), 0.85 * env(t, tR, cdur(CC), 0.3)) * (0.85 + 0.15 * Math.sin((t - tR) * 2.2)));
    a.big('SOLO VOICE', a.w('s3', 'virtuoso') - 0.05, r1, { x: X0 + XW / 2, y: 470, size: 50, color: PINK, blur: 14 });
    pad(['F3', 'A3', 'C4'], r0 + 0.1, (r0 + r1) / 2, 0.035); pad(['E3', 'G3', 'C4'], (r0 + r1) / 2, r1 - 0.2, 0.035);

    // ---- why1-3: two antennas - right hand = pitch, left hand = volume ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const tTwo = a.w('why1', 'Two') - 0.05, tRi = a.w('why2', 'right') - 0.05, tRis = a.w('why2', 'rises') - 0.05;
    const tLe = a.w('why3', 'left') - 0.05, tVo = a.w('why3', 'volume') - 0.05;
    const ant = a.grid([{ label: '', color: TEAL }], w0 + 0.1, w1, { rows: 1, cols: 1, cw: 44, chh: 520, x: 880, y: 540 });
    ant.active.push({ t0: tTwo, t1: tTwo + 0.6, i: 0 }, { t0: tRi, t1: tLe, i: 0 });
    const loop = a.grid([{ label: '', color: PINK }], w0 + 0.1, w1, { rows: 1, cols: 1, cw: 240, chh: 130, x: 190, y: 905 });
    loop.active.push({ t0: tTwo + 0.3, t1: tTwo + 0.9, i: 0 }, { t0: tLe, t1: w1, i: 0 });
    a.grid([{ label: 'THEREMIN', color: GREY, size: 40 }], w0 + 0.1, w1, { rows: 1, cols: 1, cw: 820, chh: 120, x: 540, y: 1050 });
    // right hand: five positions, closer = higher
    const rh = a.grid([0, 1, 2, 3, 4].map(() => ({ label: 'R', color: TEAL, size: 34 })), tRi, tLe + 0.3, { rows: 1, cols: 5, cw: 84, chh: 84, x: 600, y: 700 });
    const span = Math.max(1.2, tLe - tRi - 0.4);
    for (let i = 0; i < 5; i++) rh.active.push({ t0: tRi + (i / 5) * span, t1: i < 4 ? tRi + ((i + 1) / 5) * span : tLe, i });
    const up = []; for (let x = 0; x <= span + 1e-9; x += DT) up.push([x, 12 * (x / span)]);
    up.push([span + 0.6, 12]);
    sing(up, tRi, 0.24);
    a.big('RIGHT HAND → PITCH ↑', tRi, tLe, { y: 470, size: 46, ...MONO, color: TEAL, blur: 10 });
    // left hand: up and down above the loop; volume meter follows
    const lh = a.grid([0, 1, 2].map(() => ({ label: 'L', color: PINK, size: 34 })), tLe, w1, { rows: 3, cols: 1, cw: 84, chh: 84, x: 190, y: 630 });
    const vl = t => t < tLe ? 0 : 0.2 + 0.8 * (0.5 + 0.5 * Math.cos((t - tLe) * 3.2));
    for (let t = tLe; t < w1; t += 0.1) { const v = vl(t + 0.05); lh.active.push({ t0: t, t1: t + 0.1, i: v > 0.7 ? 2 : v > 0.4 ? 1 : 0 }); }
    meter(tLe, w1, vl, { x: 420, y: 560, label: '' });
    for (let t = tLe, k = 0; t < w1 - 0.4; t += 2 * Math.PI / 3.2, k++) a.note(67.0001, t, Math.min(2 * Math.PI / 3.2, w1 - t - 0.3), { vel: 0.26, show: false, tone: { partials: TH, attack: 0.25, release: 0.5, decay: 1.4 } });
    keysOn(['G4'], tLe, w1 - 0.2);
    a.big('LEFT HAND → VOLUME', tLe, w1, { y: 470, size: 46, ...MONO, color: PINK, blur: 10 });
    void tVo; void tRis;

    // ---- why4: the hands disturb an electric field around the antenna ----
    const e0 = S('why4').t0, e1 = S('why4').t1;
    const tDi = a.w('why4', 'disturb') - 0.05, tNe = a.w('why4', 'never') - 0.05;
    a.grid([{ label: '', color: TEAL }], e0 + 0.1, e1, { rows: 1, cols: 1, cw: 44, chh: 440, x: 760, y: 620 }).active.push({ t0: e0 + 0.1, t1: e1, i: 0 });
    const FIELD = [[150, 500], [260, 540], [370, 580], [480, 620]];
    FIELD.forEach(([w, h], i) => {
      const g = a.grid([{ label: '', color: BLUE }], e0 + 0.1 + i * 0.1, e1, { rows: 1, cols: 1, cw: w, chh: h, x: 760, y: 840 - h / 2 });
      for (let t = e0 + 0.3 + i * 0.12; t < e1; t += 0.8) g.active.push({ t0: t, t1: t + 0.25, i: 0 });
    });
    const hand = a.grid([0, 1, 2].map(() => ({ label: 'R', color: GOLD, size: 34 })), tDi, e1, { rows: 1, cols: 3, cw: 100, chh: 90, x: 300, y: 770 });
    [[tDi, tDi + 0.5, 0], [tDi + 0.5, tDi + 1.0, 1], [tDi + 1.0, e1, 2]].forEach(([t0, t1, i]) => hand.active.push({ t0, t1, i }));
    a.big('ELECTRIC FIELD', e0 + 0.3, tNe, { y: 470, size: 48, ...MONO, color: BLUE, blur: 10 });
    a.big('NO CONTACT', tNe, e1, { y: 470, size: 54, color: GOLD, blur: 14 });
    const wob = []; for (let x = 0; x <= e1 - e0 - 0.6; x += DT) wob.push([x, 7 + 3 * Math.sin(x * 1.7) + (x > tDi - e0 ? 2 * Math.sin((x - tDi + e0) * 4.3) : 0)]);
    sing(wob, e0 + 0.2, 0.2, { attack: 0.4 });

    // ---- why5-6: a continuous pitch: slides, then vibrato ----
    const c0 = S('why5').t0, c1 = S('why5').t1;
    lanes(c0, c1);
    const tCo = a.w('why5', 'continuous') - 0.05, tSh = a.w('why6', 'shaking') - 0.05;
    const slide = curve([[0, 0.2], [12, 0.25], [4, 0.2], [9, 0.25], [2, 0.3]], { glide: 0.55, vib: 0 });
    const vib = curve([[7, 2.2]], { vib: 0.7 });
    const totalSpan = cdur(slide) + 0.3 + cdur(vib);
    const tSl = Math.max(c0 + 0.2, tCo - 0.6), tVb = Math.max(tSh, tSl + cdur(slide) + 0.3);
    dots(slide, tSl, c1, { color: TEAL, span: totalSpan, step: 0.03 });
    dots(vib, tVb, c1, { color: GOLD, span: totalSpan, x0: tVb - tSl, step: 0.03, size: 22 });
    sing(slide, tSl, 0.24); sing(vib, tVb, 0.26);
    a.big('NO STEPS: SLIDES', tCo, c1, { x: 400, y: 470, size: 40, ...MONO, color: TEAL, blur: 8 });
    a.big('VIBRATO', tVb, c1, { x: 820, y: 470, size: 40, ...MONO, color: GOLD, blur: 8 });
    meter(c0, c1, t => Math.max(0.8 * env(t, tSl, cdur(slide)), 0.85 * env(t, tVb, cdur(vib))));

    // ---- why7: a nearly pure sine - one strong harmonic, few overtones ----
    const p0 = S('why7').t0, p1 = S('why7').t1;
    const tSi = a.w('why7', 'sine') - 0.05, tOv = a.w('why7', 'overtones') - 0.05, tGh = a.w('why7b', 'ghostly') - 0.05;
    for (let i = 0; i < 40; i++) {
      const x = 130 + i * 21, ta = p0 + 0.2 + i * 0.03, y = 690 - 130 * Math.sin((i / 39) * Math.PI * 4);
      a.grid([{ label: '', color: TEAL }], ta, p1, { rows: 1, cols: 1, cw: 22, chh: 22, x, y: y - 11 }).active.push({ t0: ta, t1: p1, i: 0 });
    }
    a.big('A SINE WAVE', tSi, p1, { y: 470, size: 46, ...MONO, color: TEAL, blur: 10 });
    const SP = [1, 0.06, 0.025, 0.01, 0, 0, 0, 0];
    SP.forEach((h, i) => {
      const hh = Math.round(260 * h) + 20, x = 540 + (i - 3.5) * 100;
      a.grid([{ label: '', color: i ? PINK : GOLD }], tOv, p1, { rows: 1, cols: 1, cw: 100, chh: hh, x, y: 1110 - hh + 8 }).active.push({ t0: tOv, t1: p1, i: 0 });
      a.big((i + 1) + '×', tOv, p1, { x, y: 1145, size: 26, ...MONO, color: GREY, blur: 0 });
    });
    a.big('FEW OVERTONES', tOv, tGh, { y: 880, size: 32, ...MONO, color: PINK, blur: 0 });
    a.big('GHOSTLY · VOICE-LIKE', tGh, p1, { y: 880, size: 34, ...MONO, color: WHITE, blur: 6 });
    sing(curve([[7, 1.2]], { vib: 0.18 }), p0 + 0.3, 0.24);
    sing(curve([[4, 0.6], [9, 0.9], [7, 1.1]], { glide: 0.35, vib: 0.25 }), Math.max(tGh, p0 + 2.4), 0.24);

    // ---- why8: aiming for G in the air - overshoot, correct, listen ----
    const q0 = S('why8').t0, q1 = S('why8').t1;
    lanes(q0, q1, { hi: 7 });
    const aim = []; for (let x = 0; x <= 3.2; x += DT) aim.push([x, 7 + 3.2 * Math.exp(-x * 1.25) * Math.cos(x * 5.5 + 0.6) + (x > 2.2 ? 0.18 * Math.sin(2 * Math.PI * 5.8 * (x - 2.2)) : 0)]);
    const tAim = q0 + 0.4;
    dots(aim, tAim, q1, { color: WHITE, step: 0.03, size: 22, span: 3.4 });
    sing(aim, tAim, 0.22);
    const tLi = a.w('why8', 'listen') - 0.05;
    a.big('TARGET: G', q0 + 0.3, tLi, { x: X0 + XW / 2, y: 470, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('LISTEN, ADJUST', tLi, q1, { x: X0 + XW / 2, y: 470, size: 46, ...MONO, color: GOLD, blur: 10 });
    const aim2 = aim.map(([x, s]) => [x, s - 2]);
    sing(aim2, Math.max(tLi, tAim + 3.5), 0.2);
    meter(q0, q1, t => Math.max(0.8 * env(t, tAim, 3.2), 0.8 * env(t, Math.max(tLi, tAim + 3.5), 3.2)));

    // ---- essence: the hook phrase again ----
    const z0 = S('essence').t0, z1 = S('essence').t1;
    lanes(z0, z1);
    const tZ = z0 + 0.3;
    dots(CA, tZ, z1, { color: TEAL });
    sing(CA, tZ, 0.26);
    const tZ2 = tZ + cdur(CA) + 0.3;
    if (tZ2 + cdur(CD) < z1 - 0.3) sing(CD, tZ2, 0.22);
    meter(z0, z1, t => Math.max(0.85 * env(t, tZ, cdur(CA)), 0.8 * env(t, tZ2, cdur(CD))));
    a.big('A HAND IN THE AIR', z0 + 0.3, z1, { x: X0 + XW / 2, y: 470, size: 44, ...MONO, color: GOLD, blur: 10 });
    pad(['C3', 'G3'], z0 + 0.1, z1 - 0.3, 0.04);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
