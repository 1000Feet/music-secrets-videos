// Vibrato: a regular wobble in pitch (roughly 5-7 times per second in classical singing). No copyrighted
// music: every sung or bowed line is an ORIGINAL demonstration. Voices, violins, cellos and guitars are
// additive tones (engine note option `tone`); vibrato is a sine-shaped pitch curve (tone option `bend`).
// The pitch graph is made of one-cell grid dots; 1 half step = 150 px, so the wobble looks as small as it is.
const VOX = [1, 0.7, 0.45, 0.3, 0.2, 0.12, 0.07, 0.04];
const BOW = [1, 0.85, 0.7, 0.62, 0.52, 0.45, 0.36, 0.3];
const LOWBOW = [1, 0.9, 0.75, 0.6, 0.48, 0.38, 0.3, 0.24, 0.18, 0.12];
const GUITAR = [1, 0.75, 0.5, 0.38, 0.28, 0.2, 0.14, 0.1, 0.07, 0.05];
const PAD = [1, 0.5, 0.3, 0.18, 0.1];

module.exports = {
  slug: 'vibrato',
  title: 'Vibrato',
  segments: [
    { id: 'hook',    text: 'Hold a note perfectly still, and it sounds cold.' },
    { id: 'hook2',   text: 'Add a tiny wobble, and it comes alive.' },
    { id: 'what',    text: 'That wobble is vibrato: a regular wave in pitch.' },
    { id: 'sing',    text: 'Classical singers use it on most long notes...' },
    { id: 'strings', text: 'and so do violinists and cellists.' },
    { id: 'guitar',  text: 'Guitarists bend or shake the string. A whammy bar does it mechanically.' },
    { id: 'why1',    text: 'So why does it work? The pitch rises and falls a few times per second.' },
    { id: 'why2',    text: 'In classical singing, roughly five to seven times.' },
    { id: 'why3',    text: 'A violinist rocks the fingertip back and forth on the string.' },
    { id: 'why3b',   text: 'Singers use the larynx and breath.' },
    { id: 'why4',    text: 'It makes a tone richer, and helps a solo voice stand out from an orchestra.' },
    { id: 'why5',    text: 'Baroque specialists often use it more sparingly, as an ornament.' },
    { id: 'fender',  text: 'Fun fact: Fender called its pitch bending arm a tremolo arm...' },
    { id: 'fender2', text: 'and its amp volume effect, vibrato. Technically, backwards.' },
    { id: 'fender3', text: 'Vibrato is pitch. Tremolo is volume.' },
    { id: 'essence', text: 'A tiny wobble in pitch, and a cold note becomes a living voice.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2', 'what'], label: 'A WAVE IN PITCH', title: 'VIBRATO', accent: true, circle: false, tonic: 9, lead: 0.4, gap: 0.35, tail: 0.8 },
    { id: 'sing', segs: ['sing', 'strings'], label: 'YOU HEAR IT IN', title: 'Classical Music', sub: 'singers · violinists · cellists', circle: false, tonic: 9, gap: 0.3, tail: 2.0 },
    { id: 'guitar', segs: ['guitar'], label: 'YOU HEAR IT IN', title: 'The Guitar', sub: 'finger · whammy bar', circle: false, tonic: 9, tail: 2.0 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'UP AND DOWN', circle: false, tonic: 9, gap: 0.3, tail: 1.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'HOW IT IS MADE', circle: false, tonic: 9, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'STANDING OUT', circle: false, tonic: 2, tail: 2.0 },
    { id: 'why5', segs: ['why5'], label: 'A MATTER OF STYLE', title: 'BAROQUE', circle: false, tonic: 9, tail: 2.2 },
    { id: 'fender', segs: ['fender', 'fender2', 'fender3'], label: 'A FAMOUS MIXUP', title: 'VIBRATO OR TREMOLO?', circle: false, tonic: 9, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A LIVING VOICE', accent: true, circle: false, tonic: 9, gap: 0.4, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', ORANGE = '#ffa45c', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const nrm = P => 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0));

    // ---------- pitch curves (semitones vs seconds) ----------
    // vibrato that starts at `onset`, grows over `ramp` seconds
    const vib = (o = {}) => x => {
      const on = o.onset ?? 0.25, r = o.rate ?? 5.8, d = o.depth ?? 0.4, ramp = o.ramp ?? 0.35;
      if (x < on) return 0;
      return d * Math.min(1, (x - on) / ramp) * Math.sin(2 * Math.PI * r * (x - on));
    };
    const bendOf = (fn, dur) => { const b = []; for (let x = 0; x <= dur + 0.4; x += 0.01) b.push([x, fn(x)]); return b; };
    // play a note with a pitch curve
    const play = (n, t, dur, fn, o = {}) => {
      const P = o.P ?? VOX;
      a.note(typeof n === 'string' ? a.T.midi(n) + 0.0001 : n + 0.0001, t, dur, { vel: (o.vel ?? 0.3) * nrm(P), show: false, tone: { partials: P, attack: o.attack ?? 0.08, release: o.release ?? 0.25, decay: o.decay, bend: fn ? bendOf(fn, dur) : undefined } });
      if (o.keys !== false) a.note(n, t, dur, { vel: 0, show: false });
    };

    // ---------- the pitch graph ----------
    const X0 = 150, XW = 840, PX = 150;            // 1 half step = 150 px
    function lanes(t0, t1, name, o = {}) {
      const y = o.y ?? 800;
      a.grid([{ label: '', color: '#6a6a74' }], t0, t1, { rows: 1, cols: 1, cw: XW + 40, chh: 20, x: X0 + XW / 2, y: y - 10 });
      a.big(name, t0, t1, { x: X0 - 70, y, size: 40, color: WHITE, blur: 0 });
      if (o.semis !== false) {
        [[-1, o.lo ?? 'G#'], [1, o.hi ?? 'A#']].forEach(([s, l]) => {
          a.grid([{ label: '', color: '#3a3a42' }], t0, t1, { rows: 1, cols: 1, cw: XW + 40, chh: 18, x: X0 + XW / 2, y: y - s * PX - 9 });
          a.big(l, t0, t1, { x: X0 - 70, y: y - s * PX, size: 30, color: '#6a6a74', blur: 0 });
        });
        a.big('1 HALF STEP', t0, t1, { x: 1000, y: y - PX / 2, size: 20, ...MONO, color: '#6a6a74', blur: 0 });
      }
      if (o.caption) a.big(o.caption, t0, t1, { x: X0 + XW / 2, y: y + PX + 50, size: 26, ...MONO, color: GREY, blur: 0 });
    }
    // dots along fn(x) for x in [0, span]; drawn over `draw` seconds (default: real time)
    function curve(fn, span, t0, t1, o = {}) {
      const y = o.y ?? 800, col = o.color ?? GOLD, size = o.size ?? 14, step = o.step ?? 0.01, k = o.scale ?? PX;
      const xa = o.x0 ?? X0, xw = o.xw ?? XW;
      for (let x = 0; x <= span + 1e-6; x += step) {
        const ta = t0 + (o.draw !== undefined ? (x / span) * o.draw : x);
        const g = a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: size + 16, chh: size + 16, x: xa + (x / span) * xw, y: y - fn(x) * k - (size + 16) / 2 });
        if (o.lit !== false) g.active.push({ t0: ta, t1: o.litUntil ?? t1, i: 0 });
      }
    }
    const chord = (notes, t, dur, vel = 0.14, P = PAD) => notes.forEach(n => a.note(n, t, dur, { vel: vel * nrm(P), show: false, tone: { partials: P, attack: 0.4, release: 0.6 } }));

    // ---- hook: one line that starts straight, then wobbles (cover: the whole line at once) ----
    const h1 = S('hook').t1;
    const HF = vib({ onset: 1.0, ramp: 0.2, rate: 5.5, depth: 0.42 });
    lanes(0.05, h1, 'A');
    curve(HF, 2.0, 0.05, h1, { draw: 0.6, step: 0.008 });
    a.big('STRAIGHT', 0.1, h1, { x: 360, y: 545, size: 36, ...MONO, color: WHITE, blur: 0 });
    a.big('VIBRATO', 0.1, h1, { x: 780, y: 545, size: 36, ...MONO, color: GOLD, blur: 8 });
    a.big('TIME  →', 0.1, h1, { x: X0 + XW / 2, y: 1080, size: 26, ...MONO, color: GREY, blur: 0 });
    const tSt = a.w('hook', 'still') - 0.05, tWo = a.w('hook2', 'wobble') - 0.05, tAl = a.w('hook2', 'alive') - 0.05;
    play('A4', 0.15, 1.6, HF, { vel: 0.26 });          // a short straight-then-wobble sample for the cover
    play('A4', tSt, tWo - tSt - 0.1, null, { vel: 0.3 });
    play('A4', tWo, a.at('what') - tWo + 0.2, vib({ onset: 0.15, ramp: 0.4 }), { vel: 0.32 });
    const tWh = a.w('what', 'wave') - 0.05;
    play('A4', tWh, h1 - tWh - 0.3, vib({ onset: 0.05, ramp: 0.2 }), { vel: 0.28 });
    chord(['D3', 'A3', 'F#4'], tAl, h1 - tAl - 0.2, 0.12);

    // ---- sing: a singer, a violin, a cello - original long notes, all with vibrato ----
    const s0 = S('sing').t0, s1 = S('sing').t1;
    const PEOPLE = [['SINGER', VOX, 'A4', PINK, 'singers'], ['VIOLIN', BOW, 'E5', GOLD, 'violinists'], ['CELLO', LOWBOW, 'A3', ORANGE, 'cellists']];
    const gp = a.grid(PEOPLE.map(([l, , n, c]) => ({ label: l, sub: n.replace(/\d/, ''), color: c, size: 44 })), s0 + 0.05, s1, { rows: 1, cols: 3, cw: 300, chh: 170, y: 470 });
    lanes(s0 + 0.05, s1, '', { y: 860, semis: false });
    const tLo = a.w('sing', 'long') - 0.05;
    PEOPLE.forEach(([, P, n, c, w], i) => {
      const t0 = i === 0 ? s0 + 0.2 : a.w('strings', w) - 0.05, t1 = i === 0 ? a.w('strings', 'violinists') - 0.05 : i === 1 ? a.w('strings', 'cellists') - 0.05 : a.end('strings') + 0.8;
      play(n, t0, t1 - t0, vib({ onset: 0.3, ramp: 0.4 }), { P, vel: 0.3 });
      gp.active.push({ t0, t1, i });
      curve(vib({ onset: 0.3, ramp: 0.4 }), 2, t0, t1, { y: 860, color: c, size: 12, step: 0.008, draw: t1 - t0 - 0.1 });
    });
    // an original little phrase, then all three together
    const tP = a.end('strings') + 0.9;
    [['A4', 0.6], ['B4', 0.4], ['C#5', 1.3]].reduce((t, [n, d]) => { play(n, t, d, vib({ onset: 0.15, ramp: 0.25 }), { P: VOX, vel: 0.28 }); return t + d; }, tP);
    play('E4', tP, s1 - tP - 0.4, vib({ onset: 0.3 }), { P: BOW, vel: 0.14 }); play('A2', tP, s1 - tP - 0.4, vib({ onset: 0.3, rate: 5.2 }), { P: LOWBOW, vel: 0.2 });
    a.big('ON MOST LONG NOTES', tLo, a.at('strings'), { y: 705, size: 36, ...MONO, color: WHITE, blur: 0 });
    gp.active.push({ t0: tP, t1: s1, i: 0 });

    // ---- guitar: finger vibrato (bends up and back), then a whammy-bar dip-and-wobble ----
    const g0 = S('guitar').t0, g1 = S('guitar').t1;
    const finger = x => (x < 0.3 ? 0 : 0.45 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 5 * (x - 0.3))));
    const whammy = x => (x < 0.3 ? 0 : -0.5 * Math.min(1, (x - 0.3) / 0.3) + 0.4 * Math.min(1, (x - 0.3) / 0.3) * Math.sin(2 * Math.PI * 6 * (x - 0.3)));
    const tBe = a.w('guitar', 'bend') - 0.05, tWh2 = a.w('guitar', 'whammy') - 0.05;
    lanes(g0 + 0.05, g1, 'E', { lo: 'D#', hi: 'F', y: 820 });
    const gtr = (t, dur, fn, vel = 0.32) => play('E5', t, dur, fn, { P: GUITAR, attack: 0.004, decay: 0.45, release: 0.3, vel });
    gtr(g0 + 0.15, tWh2 - g0 - 0.3, finger);
    curve(finger, 2.0, tBe, tWh2 - 0.1, { y: 820, color: TEAL, size: 12, draw: 1.0 });
    a.big('FINGER: BEND AND SHAKE', tBe, tWh2 - 0.1, { y: 520, size: 40, ...MONO, color: TEAL, blur: 6 });
    gtr(tWh2, g1 - tWh2 - 0.2, whammy);
    curve(whammy, 2.0, tWh2, g1, { y: 820, color: ORANGE, size: 12, draw: 1.0 });
    a.big('WHAMMY BAR', tWh2, g1, { y: 520, size: 44, color: ORANGE, blur: 10 });
    a.big('MECHANICAL', a.w('guitar', 'mechanically') - 0.05, g1, { y: 590, size: 30, ...MONO, color: WHITE, blur: 0 });
    gtr(a.end('guitar') + 0.2, g1 - a.end('guitar') - 0.4, whammy, 0.26);
    chord(['E3', 'B3', 'G#4'], g0 + 0.1, g1 - g0 - 0.3, 0.1);

    // ---- why1-2: up and down, a few times per second (a 1-second ruler with the cycles counted) ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const RF = vib({ onset: 0, ramp: 0.001, rate: 6, depth: 0.42 });
    const tRi = a.w('why1', 'rises') - 0.05, tFe = a.w('why1', 'few') - 0.05, tFi = a.w('why2', 'five') - 0.05;
    lanes(y0 + 0.05, y1, 'A', { y: 780 });
    a.big('▲ UP', tRi, y1, { x: 1010, y: 650, size: 26, ...MONO, color: GOLD, blur: 0 });
    a.big('▼ DOWN', a.w('why1', 'falls') - 0.05, y1, { x: 1005, y: 910, size: 26, ...MONO, color: GOLD, blur: 0 });
    curve(RF, 1.0, tRi, y1, { y: 780, step: 0.004, size: 12, draw: 1.0 });
    // ruler: 0 s ... 1 s
    a.grid([{ label: '', color: GREY }], tFe, y1, { rows: 1, cols: 1, cw: XW + 16, chh: 22, x: X0 + XW / 2, y: 1000 });
    a.big('0 s', tFe, y1, { x: X0, y: 1060, size: 28, ...MONO, color: GREY, blur: 0 });
    a.big('1 s', tFe, y1, { x: X0 + XW, y: 1060, size: 28, ...MONO, color: GREY, blur: 0 });
    for (let k = 0; k < 6; k++) a.big(String(k + 1), tFe + 0.15 + k * 0.17, y1, { x: X0 + ((k + 0.25) / 6) * XW, y: 780 - 0.42 * PX - 40, size: 34, ...MONO, color: WHITE, blur: 6 });
    a.big('5 TO 7 PER SECOND', tFi, y1, { y: 520, size: 46, color: GOLD, blur: 10 });
    a.big('IN CLASSICAL SINGING', tFi + 0.2, y1, { y: 590, size: 30, ...MONO, color: WHITE, blur: 0 });
    play('A4', y0 + 0.2, tRi - y0 - 0.2, null, { vel: 0.24 });
    play('A4', tRi, y1 - tRi - 0.3, vib({ onset: 0, ramp: 0.15, rate: 6 }), { vel: 0.28 });

    // ---- why3: a fingertip rocking on a string (two positions blinking), then larynx and breath ----
    const r0 = S('why3').t0, r1 = S('why3').t1, tRo = a.w('why3', 'rocks') - 0.05, tSi = a.at('why3b') - 0.05;
    a.grid([{ label: '', color: WHITE }], r0 + 0.05, tSi, { rows: 1, cols: 1, cw: 900, chh: 24, x: 540, y: 760 });
    a.big('STRING', r0 + 0.05, tSi, { x: 140, y: 720, size: 26, ...MONO, color: GREY, blur: 0 });
    const tipA = a.grid([{ label: '', color: GOLD }], r0 + 0.1, tSi, { rows: 1, cols: 1, cw: 110, chh: 110, x: 520, y: 765 - 110 });
    const tipB = a.grid([{ label: '', color: GOLD }], r0 + 0.1, tSi, { rows: 1, cols: 1, cw: 110, chh: 110, x: 560, y: 765 - 110 });
    for (let t = tRo; t < tSi; t += 1 / 5.5) { tipA.active.push({ t0: t, t1: t + 0.09, i: 0 }); tipB.active.push({ t0: t + 0.09, t1: t + 0.18, i: 0 }); }
    a.big('◀  ▶', tRo, tSi, { x: 540, y: 560, size: 56, color: GOLD, blur: 10 });
    a.big('FINGERTIP ROCKS', tRo, tSi, { y: 480, size: 44, color: GOLD, blur: 8 });
    curve(vib({ onset: 0, ramp: 0.001, rate: 5.5, depth: 0.3 }), 1.6, tRo, tSi, { y: 960, size: 10, step: 0.008, draw: 1.2, scale: 120 });
    play('E5', r0 + 0.2, tRo - r0 - 0.3, null, { P: BOW, vel: 0.24 });
    play('E5', tRo, tSi - tRo, vib({ onset: 0.05, ramp: 0.25, rate: 5.5 }), { P: BOW, vel: 0.28 });
    a.big('LARYNX', tSi + 0.1, r1, { y: 620, size: 66, color: PINK, blur: 14 });
    a.big('+ BREATH', a.w('why3b', 'breath') - 0.05, r1, { y: 720, size: 50, color: WHITE, blur: 8 });
    curve(vib({ onset: 0.2, ramp: 0.3, rate: 5.8, depth: 0.35 }), 1.6, tSi, r1, { y: 920, color: PINK, size: 12, scale: 120, draw: 1.4 });
    play('A4', tSi, r1 - tSi - 0.2, vib({ onset: 0.2, ramp: 0.3 }), { P: VOX, vel: 0.3 });

    // ---- why4: an orchestra of straight lines, one solo voice wobbling above ----
    const o0 = S('why4').t0, o1 = S('why4').t1, tRic = a.w('why4', 'richer') - 0.05, tSo = a.w('why4', 'solo') - 0.05;
    const ORCH = [['D3', 1060], ['A3', 1000], ['D4', 940], ['F#4', 880], ['A4', 820]];
    ORCH.forEach(([, y], i) => {
      const g = a.grid([{ label: '', color: '#7a7a84' }], o0 + 0.1 + i * 0.05, o1, { rows: 1, cols: 1, cw: XW + 16, chh: 22, x: X0 + XW / 2, y: y - 11 });
      g.active.push({ t0: tSo, t1: o1, i: 0 });
    });
    a.big('ORCHESTRA', o0 + 0.1, o1, { x: X0 - 20, y: 1110, size: 26, ...MONO, color: GREY, blur: 0, });
    chord(ORCH.map(([n]) => n), o0 + 0.15, o1 - o0 - 0.4, 0.15, BOW);
    a.big('RICHER', tRic, tSo, { y: 520, size: 52, color: GOLD, blur: 12 });
    a.big('THE SOLO STANDS OUT', tSo, o1, { y: 520, size: 46, color: GOLD, blur: 12 });
    const SOLO = vib({ onset: 0.2, ramp: 0.3, rate: 5.8, depth: 0.45 });
    curve(SOLO, 2, tSo, o1, { y: 680, size: 14, scale: 120, step: 0.008, draw: 1.6 });
    a.big('SOLO', tSo, o1, { x: X0 - 20, y: 610, size: 26, ...MONO, color: GOLD, blur: 0 });
    play('A4', o0 + 0.3, tRic - o0 - 0.3, null, { vel: 0.22 });
    play('A4', tRic, tSo - tRic - 0.05, vib({ onset: 0.1 }), { vel: 0.26 });
    [['D5', 1.3], ['C#5', 0.6], ['B4', 0.6], ['A4', 2.4]].reduce((t, [n, d]) => { play(n, t, Math.min(d, o1 - t - 0.3), vib({ onset: 0.15, ramp: 0.25 }), { vel: 0.32 }); return t + d; }, tSo);

    // ---- why5: baroque style - straight notes, vibrato only as an ornament on the last one ----
    const b0 = S('why5').t0, b1 = S('why5').t1, tOr = a.w('why5', 'ornament') - 0.05;
    const BAR = [['A4', 0.45], ['B4', 0.45], ['C#5', 0.45], ['D5', 0.45], ['E5', 0.9], ['D5', 0.45], ['C#5', 0.45], ['B4', 0.45], ['A4', 1.6]];
    const barLen = BAR.reduce((s, [, d]) => s + d, 0);
    const BFN = x => { let t = 0; for (let i = 0; i < BAR.length; i++) { const d = BAR[i][1]; if (x < t + d || i === BAR.length - 1) { const st = a.T.midi(BAR[i][0]) - 69; return st + (i === BAR.length - 1 ? vib({ onset: 0.5, ramp: 0.2, rate: 5.6, depth: 0.35 })(x - t) : 0); } t += d; } return 0; };
    const melo = t0 => BAR.reduce((t, [n, d], i) => { play(n, t, d * 0.94, i === BAR.length - 1 ? vib({ onset: 0.5, ramp: 0.2, rate: 5.6, depth: 0.35 }) : null, { P: BOW, vel: 0.28, attack: 0.04 }); return t + d; }, t0);
    const yb = 1010, kb = 55;
    curve(BFN, barLen, b0 + 0.2, b1, { y: yb, size: 12, step: 0.012, scale: kb, color: WHITE, draw: barLen });
    curve(x => { const v = BFN(barLen - 1.6 + x); return v + (v - Math.round(v)) * 1.5; }, 1.6, b0 + 0.2 + barLen - 1.6, b1, { y: yb, size: 14, step: 0.008, scale: kb, x0: X0 + XW * (barLen - 1.6) / barLen, xw: XW * 1.6 / barLen, draw: 1.6 });
    melo(b0 + 0.2);
    a.big('STRAIGHT NOTES', b0 + 0.3, b1, { x: 380, y: 560, size: 36, ...MONO, color: WHITE, blur: 0 });
    a.big('ORNAMENT', tOr, b1, { x: 840, y: 560, size: 40, color: GOLD, blur: 10 });
    const tM2 = Math.max(a.end('why5') + 0.1, b0 + 0.3 + barLen);
    [['A4', 0.45], ['C#5', 0.45], ['E5', 1.4]].reduce((t, [n, d], i) => { play(n, t, d * 0.94, i === 2 ? vib({ onset: 0.45, ramp: 0.2 }) : null, { P: BOW, vel: 0.26, attack: 0.04 }); return t + d; }, Math.min(tM2, b1 - 2.4));
    chord(['A3', 'E4'], b0 + 0.2, b1 - b0 - 0.4, 0.1);

    // ---- fender: the names are swapped. Vibrato = pitch, tremolo = volume ----
    const f0 = S('fender').t0, f1 = S('fender').t1;
    const tArm = a.w('fender', 'arm') - 0.05, tAmp = a.w('fender2', 'amp') - 0.05, tBk = a.w('fender2', 'backwards') - 0.05, tF3 = a.at('fender3') - 0.05;
    const gF = a.grid([{ label: 'TREMOLO ARM', sub: 'moves the pitch', color: ORANGE, size: 40 }, { label: 'AMP "VIBRATO"', sub: 'moves the volume', color: TEAL, size: 40 }], f0 + 0.1, tF3, { rows: 1, cols: 2, cw: 470, chh: 200, y: 560 });
    gF.active.push({ t0: tArm, t1: tAmp, i: 0 }, { t0: tAmp, t1: tBk, i: 1 });
    a.big('⇄  SWAPPED', tBk, tF3, { y: 1080, size: 56, color: RED, blur: 12 });
    curve(vib({ onset: 0, ramp: 0.001, rate: 4, depth: 0.5 }), 1.0, tArm, tF3, { x0: 110, xw: 390, y: 880, scale: 110, color: ORANGE, size: 10, step: 0.005, draw: 0.6, litUntil: tAmp });
    a.big('PITCH', tArm, tF3, { x: 305, y: 1000, size: 28, ...MONO, color: ORANGE, blur: 0 });
    for (let i = 0; i < 14; i++) {
      const v = 0.5 + 0.5 * Math.cos(2 * Math.PI * 3 * (i / 13)), hh = Math.round(24 + 120 * v), t = tAmp + i * 0.03;
      a.grid([{ label: '', color: TEAL }], t, tF3, { rows: 1, cols: 1, cw: 28, chh: hh, x: 590 + i * 29, y: 880 - hh / 2 }).active.push({ t0: t, t1: tBk, i: 0 });
    }
    a.big('VOLUME', tAmp, tF3, { x: 775, y: 1000, size: 28, ...MONO, color: TEAL, blur: 0 });
    const gtr2 = (t, dur, fn) => play('E5', t, dur, fn, { P: GUITAR, attack: 0.004, decay: 0.5, release: 0.3, vel: 0.3 });
    gtr2(tArm, tAmp - tArm - 0.1, whammy);
    // tremolo: the same note chopped into volume pulses
    const trem = (n, t0, t1, P = GUITAR, vel = 0.3, rate = 6) => { for (let t = t0; t < t1 - 0.05; t += 1 / rate) a.note(a.T.midi(n) + 0.0001, t, 0.5 / rate, { vel: vel * nrm(P), show: false, tone: { partials: P, attack: 0.03, release: 0.06 } }); a.note(n, t0, t1 - t0, { vel: 0, show: false }); };
    trem('E5', tAmp, tBk - 0.05, PAD, 0.3);
    // fender3: two graphs - pitch moves vs volume moves
    const tPi = a.w('fender3', 'pitch') - 0.05, tVo = a.w('fender3', 'volume') - 0.05;
    a.big('VIBRATO = PITCH', tF3, f1, { y: 520, size: 42, ...MONO, color: GOLD, blur: 8 });
    curve(vib({ onset: 0, ramp: 0.001, rate: 5, depth: 0.5 }), 1.2, tF3, f1, { y: 680, size: 12, step: 0.005, scale: 110, draw: 0.8 });
    play('A4', tPi - 0.2, tVo - tPi, vib({ onset: 0, ramp: 0.15, rate: 5.5 }), { vel: 0.28 });
    a.big('TREMOLO = VOLUME', tVo, f1, { y: 850, size: 42, ...MONO, color: TEAL, blur: 8 });
    const NB = 28;
    for (let i = 0; i < NB; i++) {
      const v = 0.5 + 0.5 * Math.cos(2 * Math.PI * 5 * (i / NB) * 1.2), hh = Math.round(30 + 150 * v), t = tVo + i * 0.025;
      a.grid([{ label: '', color: TEAL }], t, f1, { rows: 1, cols: 1, cw: 30, chh: hh, x: X0 + (i / (NB - 1)) * XW, y: 1020 - hh / 2 }).active.push({ t0: t, t1: f1, i: 0 });
    }
    trem('A4', tVo, f1 - 0.3, VOX, 0.3, 5.5);

    // ---- essence: straight, then alive ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tCta = a.at('cta');
    const EF = vib({ onset: 0.8, ramp: 0.2, rate: 5.6, depth: 0.42 });
    lanes(e0 + 0.05, e1, 'A');
    const tTi = a.w('essence', 'tiny') - 0.05, tLi = a.w('essence', 'living') - 0.05;
    curve(EF, 2.0, e0 + 0.1, e1, { step: 0.008, draw: Math.max(1.2, tLi - e0 - 0.3) });
    a.big('COLD', e0 + 0.2, e1, { x: 360, y: 545, size: 40, ...MONO, color: BLUE, blur: 0 });
    a.big('ALIVE', tLi, e1, { x: 780, y: 545, size: 48, color: GOLD, blur: 12 });
    play('A4', e0 + 0.15, tTi - e0 + 0.6, null, { vel: 0.26 });
    play('A4', tTi + 0.7, tCta - tTi - 0.5, vib({ onset: 0.1, ramp: 0.4 }), { vel: 0.3 });
    [['A4', 0.7], ['B4', 0.5], ['C#5', 0.5], ['E5', 2.2]].reduce((t, [n, d]) => { play(n, t, Math.min(d, e1 - t - 0.3), vib({ onset: 0.15, ramp: 0.25 }), { vel: 0.3 }); return t + d; }, tCta + 0.1);
    chord(['A3', 'C#4', 'E4'], tLi, e1 - tLi - 0.3, 0.12);
    void LILAC;
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
