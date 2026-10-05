// Auto-Tune: pitch correction pulls a sung note to the nearest note of a scale; at retune speed zero
// the smooth pitch curve becomes a staircase. Copyright: Believe (Cher) and T-Pain are named only;
// every sung line here is an ORIGINAL sliding phrase, sung by an additive "voice" tone whose pitch
// follows a curve (engine tone option `bend`). Chords are a generic C - Am - F - G.
const VOX = [1, 0.7, 0.45, 0.3, 0.2, 0.12, 0.07, 0.04];
const SCALE = [0, 2, 4, 5, 7, 9, 11];
// original phrases: [sung pitch in half steps above C4 (slightly off on purpose), hold seconds]
const PH_A = [[3.75, 0.55], [6.8, 0.6], [9.25, 0.45], [5.25, 0.5], [3.8, 0.75]];
const PH_B = [[6.8, 0.45], [9.2, 0.4], [11.8, 0.55], [9.2, 0.35], [6.8, 0.45], [4.2, 0.7]];
const PH_C = [[-0.25, 0.4], [3.8, 0.4], [6.75, 0.5], [4.2, 0.35], [2.2, 0.4], [-0.2, 0.7]];

module.exports = {
  slug: 'autotune',
  title: 'Auto-Tune',
  segments: [
    { id: 'hook',    text: 'Sing a note slightly off, and a computer pulls it into tune.' },
    { id: 'hook2',   text: 'Push it too far... and the voice turns robotic.' },
    { id: 'what',    text: "That's pitch correction. Its most famous name: Auto-Tune." },
    { id: 's1',      text: 'Antares released Auto-Tune in 1997.' },
    { id: 's1b',     text: 'Its inventor, Andy Hildebrand, had worked analysing seismic data for oil exploration.' },
    { id: 's2',      text: "Then Cher's Believe, in 1998, became the first big hit to use it as an obvious effect." },
    { id: 's3',      text: 'In the 2000s, T-Pain made the hard-tuned voice his signature.' },
    { id: 'why1',    text: 'So how does it work? A natural voice glides between notes, and wobbles with vibrato.' },
    { id: 'why1b',   text: 'Its pitch is a smooth curve.' },
    { id: 'why2',    text: 'Auto-Tune measures that pitch, and moves it to the nearest note of the chosen scale.' },
    { id: 'why3',    text: 'With a slow setting, it gently nudges notes into tune.' },
    { id: 'why4',    text: 'But set the retune speed to zero, and the voice jumps instantly from note to note.' },
    { id: 'why4b',   text: 'The slides become steps.' },
    { id: 'essence', text: 'Smooth slides, snapped to steps. A mistake fixer that became a new instrument.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2'], label: 'PITCH CORRECTION', title: 'AUTO-TUNE', accent: true, circle: false, lead: 0.5, gap: 0.6, tail: 2.6 },
    { id: 'what', segs: ['what'], label: 'NEAREST NOTE, ALWAYS', title: 'PITCH CORRECTION', circle: false, tail: 0.6 },
    { id: 's1', segs: ['s1', 's1b'], label: 'THE INVENTION', title: 'Auto-Tune', sub: 'Antares · 1997', circle: false, gap: 0.3, tail: 0.8 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Believe', sub: 'Cher · 1998 · "the Cher effect"', circle: false, tail: 3.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'T-Pain', sub: 'the 2000s · a signature sound', circle: false, tail: 3.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'A NATURAL VOICE', circle: false, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE NEAREST NOTE', tonic: 0, tail: 2.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'SLOW SETTING', circle: false, tail: 2.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'FASTEST SETTING', circle: false, gap: 0.3, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A NEW INSTRUMENT', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const DT = 0.01;

    // ---------- pitch curves ----------
    // the natural voice: a scoop into the first note, cosine glides, vibrato that grows on held notes
    function raw(ph, o = {}) {
      const g = o.glide ?? 0.2, keys = [];
      let t = 0;
      ph.forEach(([s, d], i) => { keys.push({ t0: t, t1: t + d, s }); t += d + (i < ph.length - 1 ? g : 0); });
      const dur = t, vibA = o.vib ?? 0.32;
      const f = x => {
        let k = keys.findIndex(q => x < q.t1);
        if (k < 0) k = keys.length - 1;
        const q = keys[k];
        if (x < q.t0) {   // gliding from the previous note
          const p = keys[k - 1], u = (x - p.t1) / (q.t0 - p.t1);
          return p.s + (q.s - p.s) * (0.5 - 0.5 * Math.cos(Math.PI * u));
        }
        const h = x - q.t0, scoop = k === 0 ? -1.1 * Math.max(0, 1 - h / 0.14) : 0;
        const vib = vibA * Math.min(1, Math.max(0, (h - 0.15) / 0.25)) * Math.sin(2 * Math.PI * 5.6 * h);
        return q.s + scoop + vib;
      };
      return { f, dur };
    }
    const nearest = s => { const o = Math.floor(s / 12) * 12; let best = 0, bd = 99; for (const d of [...SCALE, 12]) { const v = o + d; if (Math.abs(s - v) < bd) { bd = Math.abs(s - v); best = v; } } return best; };
    // three versions of the same performance
    function versions(ph, o) {
      const r = raw(ph, o), n = Math.ceil(r.dur / DT) + 1, R = [], Hd = [], Gn = [];
      let corr = 0;
      for (let i = 0; i < n; i++) {
        const x = i * DT, v = r.f(x), tgt = nearest(v);
        corr += (tgt - v - corr) * (DT / 0.18);   // slow retune: the correction is smoothed
        R.push([x, v]); Hd.push([x, tgt]); Gn.push([x, v + corr]);
      }
      return { dur: r.dur, raw: R, hard: Hd, gentle: Gn };
    }
    // sing a curve (semitones above C4) starting at t
    const sing = (curve, t, vel = 0.22, o = {}) => {
      const dur = curve[curve.length - 1][0];
      a.note(60.001, t, dur, { vel, show: false, tone: { partials: VOX, attack: 0.05, release: o.release ?? 0.25, bend: curve.map(([x, s]) => [x, s]) } });
    };
    // light the keyboard on each step of a hard-tuned curve (silent notes)
    const keys = (curve, t) => {
      let cur = curve[0][1], st = 0;
      for (let i = 1; i <= curve.length; i++) {
        if (i === curve.length || curve[i][1] !== cur) { a.note(60 + cur, t + curve[st][0], curve[Math.min(i, curve.length - 1)][0] - curve[st][0], { vel: 0, show: false }); if (i < curve.length) { cur = curve[i][1]; st = i; } }
      }
    };

    // ---------- the pitch graph: note lanes + dot curves made of one-cell grids ----------
    const Y = s => 1060 - s * 42, X0 = 170, XW = 840;
    const LANES = [[0, 'C'], [2, 'D'], [4, 'E'], [5, 'F'], [7, 'G'], [9, 'A'], [11, 'B'], [12, 'C']];
    function lanes(t0, t1, o = {}) {
      LANES.forEach(([s, l]) => {
        a.grid([{ label: '', color: '#5a5a66' }], t0, t1, { rows: 1, cols: 1, cw: XW + 30, chh: 19, x: X0 + XW / 2, y: Y(s) - 9.5 });
        a.big(l, t0, t1, { x: X0 - 52, y: Y(s), size: 30, ...MONO, color: '#9a9aa2', blur: 0 });
      });
      if (o.caption) a.big(o.caption, t0, t1, { x: X0 + XW / 2, y: Y(-1.8), size: 26, ...MONO, color: GREY, blur: 0 });
    }
    // dots along a curve; `draw` = seconds to draw it in (default: real time from t0); active = bright
    function dots(curve, dur, t0, t1, o = {}) {
      const step = o.step ?? 0.05, size = o.size ?? 30, col = o.color ?? WHITE;
      const sx = XW / (o.span ?? dur);
      for (let x = 0; x <= dur + 1e-6; x += step) {
        const v = curve[Math.min(curve.length - 1, Math.round(x / DT))][1];
        const ta = t0 + (o.draw !== undefined ? (x / dur) * o.draw : x);
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: size, chh: size, x: X0 + x * sx, y: Y(v) - size / 2 });
        if (o.lit !== false) g.active.push({ t0: ta, t1: o.litUntil ?? t1, i: 0 });
        if (o.relight) o.relight.forEach(([r0, r1]) => g.active.push({ t0: r0 + x, t1: r1, i: 0 }));
      }
    }
    // backing chords (soft piano), one per `len` seconds
    const PROG = { C: ['E3', 'G3', 'C4'], Am: ['E3', 'A3', 'C4'], F: ['F3', 'A3', 'C4'], G: ['D3', 'G3', 'B3'] };
    const BASS = { C: 'C2', Am: 'A1', F: 'F1', G: 'G1' };
    function bed(t0, t1, len = 1.6, vel = 0.4) {
      const names = ['C', 'Am', 'F', 'G'];
      for (let t = t0, k = 0; t < t1 - 0.2; t += len, k++) { const c = names[k % 4]; a.ch(c, t, Math.min(t1, t + len), { notes: PROG[c], bass: BASS[c], vel, shape: false, hideName: true }); }
    }
    const beat = (t0, t1, b = 0.5, vel = 0.8) => { for (let t = t0, i = 0; t < t1 - 0.1; t += b, i++) { a.perc('kick', t, vel * (i % 2 ? 0.7 : 1)); if (i % 2) a.perc('snare', t, vel * 0.6); a.perc('hat', t + b / 2, vel * 0.5); } };

    const VA = versions(PH_A), VB = versions(PH_B), VC = versions(PH_C);

    // ---- hook: the curve and the staircase, both drawn at once (cover), then heard in turn ----
    const h1 = S('hook').t1;
    lanes(0, h1);
    dots(VA.hard, VA.dur, 0.05, h1, { draw: 0.5, size: 34, color: GOLD });
    dots(VA.raw, VA.dur, 0.05, h1, { draw: 0.5, size: 22, color: WHITE });
    const tSing = a.w('hook', 'Sing') - 0.05, tPull = a.w('hook', 'pulls') - 0.05, tRob = a.w('hook2', 'robotic') - 0.05;
    a.big('○ VOICE', 0.1, h1, { x: 300, y: 480, size: 34, ...MONO, color: WHITE, blur: 6 });
    a.big('● AUTO-TUNED', 0.1, h1, { x: 760, y: 480, size: 34, ...MONO, color: GOLD, blur: 6 });
    sing(VA.raw, tSing, 0.2);
    sing(VA.gentle, tPull, 0.2);
    const tH = Math.max(tPull + VA.dur + 0.3, tRob);
    sing(VA.hard, tH, 0.22); keys(VA.hard, tH);
    bed(0.1, h1, VA.dur / 2 + 0.1, 0.32);

    // ---- what: pitch correction, the gentle version ----
    const w0 = S('what').t0, w1 = S('what').t1;
    lanes(w0, w1, { caption: 'TIME  →' });
    dots(VA.raw, VA.dur, w0 + 0.1, w1, { draw: 0.4, size: 24, color: WHITE, lit: false });
    const tAT = a.w('what', 'AutoTune') - 0.05;
    sing(VA.gentle, w0 + 0.3, 0.18);
    dots(VA.gentle, VA.dur, w0 + 0.3, w1, { size: 26, color: TEAL });
    a.big('AUTO-TUNE', tAT, w1, { x: 760, y: 480, size: 40, color: GOLD });
    bed(w0 + 0.1, w1, 1.4, 0.3);

    // ---- s1: the invention (facts) over a soft bed and a hard-tuned phrase ----
    const f0 = S('s1').t0, f1 = S('s1').t1;
    const FACT = [{ label: '1997', sub: 'ANTARES', color: GOLD, size: 70 }, { label: 'ANDY HILDEBRAND', sub: 'THE INVENTOR', color: TEAL, size: 52 }, { label: 'SEISMIC DATA', sub: 'OIL EXPLORATION', color: BLUE, size: 52 }];
    const gf = a.grid(FACT, f0 + 0.1, f1, { rows: 3, cols: 1, cw: 820, chh: 190, y: 470, revealStep: 0.15 });
    [[a.w('s1', '1997') - 0.05, a.at('s1b'), 0], [a.w('s1b', 'Andy') - 0.05, a.w('s1b', 'seismic') - 0.05, 1], [a.w('s1b', 'seismic') - 0.05, f1, 2]].forEach(([t0, t1, i]) => gf.active.push({ t0, t1, i }));
    bed(f0 + 0.1, f1, 1.6, 0.32);
    sing(VC.hard, f1 - VC.dur - 0.3, 0.12);

    // ---- s2: Believe (named only): an original phrase, hard-tuned ----
    const b0 = S('s2').t0, b1 = S('s2').t1;
    lanes(b0, b1);
    const tB = Math.max(b0 + 0.3, b1 - VB.dur - 0.5);
    dots(VB.raw, VB.dur, b0 + 0.3, b1, { size: 22, color: WHITE, litUntil: tB });
    sing(VB.raw, b0 + 0.3, 0.13);
    sing(VB.hard, tB, 0.24); keys(VB.hard, tB);
    dots(VB.hard, VB.dur, tB, b1, { size: 34, color: GOLD });
    a.big('THE CHER EFFECT', a.w('s2', 'obvious') - 0.05, b1, { y: 480, size: 50, color: GOLD });
    bed(b0 + 0.1, b1, 1.5, 0.34); beat(tB, b1 - 0.3, 0.42, 0.7);

    // ---- s3: T-Pain (named only): another original phrase, hard-tuned over a beat ----
    const p0 = S('s3').t0, p1 = S('s3').t1;
    lanes(p0, p1);
    const tP = Math.max(a.w('s3', 'signature') + 0.4, p1 - VC.dur - 0.4);
    dots(VC.hard, VC.dur, p0 + 0.3, tP - 0.05, { size: 30, color: PINK });
    sing(VC.hard, p0 + 0.3, 0.13);
    sing(VC.hard, tP, 0.24); keys(VC.hard, tP);
    dots(VC.hard, VC.dur, tP, p1, { size: 34, color: PINK });
    a.big('HARD-TUNED', a.w('s3', 'hardtuned') - 0.05, p1, { y: 480, size: 50, color: PINK });
    bed(p0 + 0.1, p1, 1.4, 0.32); beat(p0 + 0.2, p1 - 0.3, 0.4, 0.75);

    // ---- why1: the natural voice - glides, vibrato, a smooth curve ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    lanes(y0, y1, { caption: 'PITCH OVER TIME' });
    const tGl = a.w('why1', 'glides') - 0.05, tSm = a.w('why1b', 'smooth') - 0.05;
    sing(VA.raw, tGl, 0.2);
    dots(VA.raw, VA.dur, tGl, y1, { size: 26, color: WHITE, step: 0.04 });
    a.big('GLIDES', tGl, y1, { x: 330, y: 480, size: 40, ...MONO, color: WHITE, blur: 6 });
    a.big('VIBRATO', a.w('why1', 'vibrato') - 0.05, y1, { x: 750, y: 480, size: 40, ...MONO, color: TEAL, blur: 6 });
    a.big('A SMOOTH CURVE', tSm, y1, { y: 1150, size: 44, color: WHITE });
    sing(VA.raw, tSm + 0.2, 0.15);
    bed(y0 + 0.1, y1, 1.6, 0.28);

    // ---- why2: on the circle - the voice slides, the corrected note jumps to the nearest scale note ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    a.scale(z0, 'C', a.T.MAJOR);
    const tMe = a.w('why2', 'measures') - 0.05, tMo = a.w('why2', 'moves') - 0.05;
    const span = Math.min(VA.dur * 1.6, z1 - tMe - 0.6), k = span / VA.dur;
    const rawPts = [], hardPts = [];
    for (let x = 0; x <= VA.dur; x += 0.04) {
      const i = Math.round(x / DT);
      rawPts.push([tMe + x * k, (VA.raw[i][1] + 1200) % 12]);
      const hv = (VA.hard[i][1] + 1200) % 12;
      if (!hardPts.length || hardPts[hardPts.length - 1][1] !== hv) hardPts.push([tMe + x * k, hv]);
    }
    a.walker(rawPts, { t1: z1, dr: 22, color: WHITE });
    a.walker(hardPts.map(([t, v]) => [Math.max(t, tMo), v]), { t1: z1, dr: -60, color: GOLD });
    a.big('○ VOICE', tMe, z1, { x: 150, y: 1150, size: 30, ...MONO, color: WHITE, blur: 0 });
    a.big('● CORRECTED', tMo, z1, { x: 900, y: 1150, size: 30, ...MONO, color: GOLD, blur: 0 });
    sing(VA.raw.map(([x, s]) => [x * k, s]), tMe, 0.16);
    a.tag(0, tMo, z1, 'NEAREST NOTE OF THE SCALE', { x: 540, y: 462, color: GOLD });
    a.ring(SCALE, a.w('why2', 'scale') - 0.05, a.w('why2', 'scale') + 1.4, { color: GOLD });
    a.ch('C', z0 + 0.1, z1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.3, shape: false, hideName: true });

    // ---- why3: slow setting - the curve is nudged into tune, still smooth ----
    const v0 = S('why3').t0, v1 = S('why3').t1;
    lanes(v0, v1);
    const tSl = a.w('why3', 'slow') - 0.05, tNu = a.w('why3', 'nudges') - 0.05;
    dots(VA.raw, VA.dur, v0 + 0.1, v1, { draw: 0.4, size: 22, color: WHITE, lit: false });
    sing(VA.gentle, tSl, 0.2);
    dots(VA.gentle, VA.dur, tSl, v1, { size: 28, color: TEAL });
    a.big('GENTLE NUDGE', tNu, v1, { y: 480, size: 46, color: TEAL });
    sing(VA.gentle, v1 - VA.dur - 0.3, 0.14);
    bed(v0 + 0.1, v1, 1.6, 0.3);

    // ---- why4: retune speed zero - the staircase ----
    const q0 = S('why4').t0, q1 = S('why4').t1;
    lanes(q0, q1);
    const tZe = a.w('why4', 'zero') - 0.05, tJu = a.w('why4', 'jumps') - 0.05, tSt = a.w('why4b', 'steps') - 0.05;
    dots(VA.raw, VA.dur, q0 + 0.1, q1, { draw: 0.4, size: 22, color: WHITE, lit: false });
    a.big('RETUNE SPEED: 0', tZe, q1, { y: 480, size: 46, ...MONO, color: GOLD });
    sing(VA.hard, tJu, 0.24); keys(VA.hard, tJu);
    dots(VA.hard, VA.dur, tJu, q1, { size: 34, color: GOLD });
    a.big('SLIDES → STEPS', tSt, q1, { y: 1150, size: 48, color: GOLD });
    sing(VA.raw, a.at('why4b'), 0.13);
    sing(VA.hard, Math.max(tSt + 0.3, q1 - VA.dur - 0.3), 0.18);
    bed(q0 + 0.1, q1, 1.6, 0.3);

    // ---- essence: smooth, then snapped, then the beat ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    lanes(e0, e1);
    const tSn = a.w('essence', 'snapped') - 0.05, tIn = a.w('essence', 'instrument') - 0.05;
    sing(VA.raw, e0 + 0.15, 0.17);
    dots(VA.raw, VA.dur, e0 + 0.15, e1, { size: 24, color: WHITE });
    const tE = Math.max(tSn, e0 + VA.dur + 0.3);
    sing(VA.hard, tE, 0.22); keys(VA.hard, tE);
    dots(VA.hard, VA.dur, tE, e1, { size: 34, color: GOLD });
    const tE2 = Math.max(tIn, tE + VA.dur + 0.2);
    sing(VB.hard, tE2, 0.2); keys(VB.hard, tE2);
    beat(tE2, Math.min(e1 - 1.2, tE2 + VB.dur + 0.8), 0.42, 0.7);
    a.big('SMOOTH → SNAPPED', tSn, e1, { y: 480, size: 46, color: GOLD });
    bed(e0 + 0.1, e1 - 0.6, 1.6, 0.3);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
