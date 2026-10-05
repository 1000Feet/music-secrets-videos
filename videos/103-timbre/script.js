// Timbre: the same note on two instruments - same pitch, same loudness, different sound.
// Copyright/brief: Peter and the Wolf (Prokofiev, 1936) is copyrighted - name only; every motif here is
// original. Bolero's melody is NOT played: an original motif passes from "instrument" to "instrument".
// The instruments are additive synth recipes (engine note option `tone`) that follow the brief:
// flute close to pure, violin rich in overtones, low clarinet strong on the odd overtones.
const F0 = 293.66;                                   // the same note everywhere: D4
const hz = f => 69 + 12 * Math.log2(f / 440);        // frequency -> fractional midi

// overtone recipes (amplitude of harmonics 1..8)
const FLUTE = [1, 0.2, 0.07, 0.03, 0.015, 0.01, 0.005, 0.003];
const VIOLIN = [1, 0.85, 0.7, 0.62, 0.52, 0.45, 0.36, 0.3];
const CLAR = [1, 0.04, 0.72, 0.04, 0.5, 0.03, 0.36, 0.02];
const OBOE = [0.55, 1, 0.8, 0.5, 0.42, 0.3, 0.2, 0.14];
const HORN = [1, 0.62, 0.38, 0.22, 0.12, 0.06];
const STACK = [1, 0.62, 0.48, 0.4, 0.33, 0.28, 0.24, 0.2];

module.exports = {
  slug: 'timbre',
  title: 'Timbre',
  segments: [
    { id: 'hook',    text: 'Play the same note, just as loud, on a flute and on a violin. You still know which is which.' },
    { id: 'what',    text: 'That difference is called timbre, or tone color.' },
    { id: 'peter',   text: "In Prokofiev's Peter and the Wolf, every character is an instrument." },
    { id: 'peter2',  text: 'The bird is a flute, the duck an oboe, the cat a clarinet, the wolf French horns.' },
    { id: 'bolero',  text: "Ravel's Boléro passes one melody from instrument to instrument. The tune stays, the color changes." },
    { id: 'why1',    text: 'So why does it work? Almost every note is a stack of frequencies.' },
    { id: 'why2',    text: 'The fundamental, plus overtones at two, three, four times the frequency.' },
    { id: 'why3',    text: 'The recipe, how loud each overtone is, gives each instrument its color.' },
    { id: 'flute',   text: 'A flute is close to pure, with weak overtones.' },
    { id: 'violin',  text: 'A violin is rich in overtones.' },
    { id: 'clar',    text: 'A low clarinet favors the odd ones: three, five, seven.' },
    { id: 'attack',  text: 'And the start of a note matters too.' },
    { id: 'attack2', text: 'A piano note starts with a hammer strike, then fades. A violin can swell.' },
    { id: 'essence', text: "Pitch tells you which note. Timbre tells you who's singing it." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'SAME NOTE · SAME VOLUME', title: 'TIMBRE', accent: true, circle: false, tonic: 2, lead: 0.5, gap: 0.4, tail: 1.0 },
    { id: 'peter', segs: ['peter', 'peter2'], label: 'YOU HEAR IT IN', title: 'Peter and the Wolf', sub: 'Sergei Prokofiev · 1936', circle: false, tonic: 2, gap: 0.3, tail: 2.2 },
    { id: 'bolero', segs: ['bolero'], label: 'YOU HEAR IT IN', title: 'Boléro', sub: 'Ravel · one tune, many colors', circle: false, tonic: 2, tail: 2.4 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'A STACK OF FREQUENCIES', circle: false, tonic: 2, gap: 0.3, tail: 1.2 },
    { id: 'recipe', segs: ['why3', 'flute', 'violin', 'clar'], label: 'WHY IT WORKS', title: 'THE RECIPE', circle: false, tonic: 2, gap: 0.45, tail: 1.4 },
    { id: 'attack', segs: ['attack', 'attack2'], label: 'WHY IT WORKS', title: 'ATTACK AND DECAY', circle: false, tonic: 2, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'WHO IS SINGING?', accent: true, circle: false, tonic: 2, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const loud = P => 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0));      // equal loudness
    const INST = {
      FLUTE: { P: FLUTE, attack: 0.07, release: 0.15, col: TEAL },
      VIOLIN: { P: VIOLIN, attack: 0.22, release: 0.2, col: PINK },
      CLARINET: { P: CLAR, attack: 0.04, release: 0.1, col: BLUE },
      OBOE: { P: OBOE, attack: 0.04, release: 0.1, col: GREEN },
      HORNS: { P: HORN, attack: 0.08, release: 0.2, col: GOLD },
    };
    // play one note (midi or frequency via hz) with an instrument recipe
    const play = (inst, m, t, dur, vel = 0.3, o = {}) => {
      const I = INST[inst];
      a.note(m, t, dur, { vel: vel * loud(I.P), show: false, tone: { partials: I.P, attack: o.attack ?? I.attack, release: I.release, decay: o.decay } });
    };
    const motif = (inst, list, t0, beat, vel = 0.3) => {
      let t = t0;
      list.forEach(([n, b]) => { if (n) play(inst, n, t, b * beat * 0.92, vel); t += b * beat; });
      return t;
    };
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));

    // a bar chart of overtones: one grid cell per harmonic, the fundamental in gold
    const BASE = 1105;
    function spectrum(amps, t0, t1, o = {}) {
      const cw = o.cw ?? 96, hmax = o.hmax ?? 400, cx = o.cx ?? 540, n = amps.length, col = o.color ?? TEAL;
      const out = [];
      amps.forEach((h, i) => {
        const hh = Math.round(hmax * h) + 20, g0 = t0 + i * (o.step ?? 0);
        const cellCol = i === 0 ? GOLD : (o.colorFn ? o.colorFn(i + 1) : col);
        const g = a.grid([{ label: '', color: cellCol }], g0, t1, { rows: 1, cols: 1, cw, chh: hh, y: BASE - hh + 8, x: cx + (i - (n - 1) / 2) * cw });
        if (o.lit !== false) g.active.push({ t0: g0, t1, i: 0 });
        out.push(g);
      });
      if (o.labels) amps.forEach((_, i) => a.big((i + 1) + '×', t0 + i * (o.step ?? 0), t1, { x: cx + (i - (amps.length - 1) / 2) * cw, y: BASE + 38, size: o.labelSize ?? 28, ...MONO, color: GREY, blur: 0 }));
      return out;
    }
    const lightUp = (gs, t0, t1) => gs.forEach(g => g.active.push({ t0, t1, i: 0 }));

    // ---- hook: flute and violin side by side on the same D (cover: both spectra visible at once) ----
    const h1 = S('hook').t1;
    const tFl = a.w('hook', 'flute'), tVi = a.w('hook', 'violin'), tWh = a.w('hook', 'which');
    const tTim = a.w('what', 'timbre');
    const fl = spectrum(FLUTE, 0.05, h1, { cx: 285, cw: 58, hmax: 360, color: TEAL, lit: false, step: 0.04 });
    const vi = spectrum(VIOLIN, 0.05, h1, { cx: 795, cw: 58, hmax: 360, color: PINK, lit: false, step: 0.04 });
    a.big('FLUTE', 0.1, h1, { x: 285, y: BASE + 42, size: 36, ...MONO, color: TEAL, blur: 0 });
    a.big('VIOLIN', 0.1, h1, { x: 795, y: BASE + 42, size: 36, ...MONO, color: PINK, blur: 0 });
    a.big('SAME NOTE: D', 0.1, tTim - 0.1, { y: 520, size: 46, ...MONO, color: '#ffffff', blur: 8 });
    a.big('TIMBRE = TONE COLOR', tTim - 0.05, h1, { y: 520, size: 52, ...MONO, color: GOLD, blur: 12 });
    // flute, violin, flute, violin, then both
    const turns = [['FLUTE', 0.15, 1.05], ['VIOLIN', 1.25, tFl - 0.1], ['FLUTE', tFl, tVi - 0.05], ['VIOLIN', tVi, tWh - 0.05], ['FLUTE', tWh, tWh + 0.6], ['VIOLIN', tWh + 0.6, a.end('hook') + 0.2]];
    turns.forEach(([inst, t0, t1]) => { play(inst, hz(F0), t0, t1 - t0 - 0.05, 0.32); lightUp(inst === 'FLUTE' ? fl : vi, t0, t1); });
    const tw0 = a.at('what');
    play('FLUTE', hz(F0), tw0, h1 - tw0 - 0.3, 0.24); play('VIOLIN', hz(F0), tw0 + 0.1, h1 - tw0 - 0.4, 0.22);
    lightUp(fl, tw0, h1); lightUp(vi, tw0 + 0.1, h1);
    keys(['D4'], 0.15, h1);

    // ---- Peter and the Wolf: four characters, four colors (original motifs only) ----
    const p0 = S('peter').t0, p1 = S('peter').t1;
    const CHAR = [['BIRD', 'FLUTE'], ['DUCK', 'OBOE'], ['CAT', 'CLARINET'], ['WOLF', 'HORNS']];
    const gp = a.grid(CHAR.map(([c, i]) => ({ label: c, sub: i, size: 66, subSize: 28, color: INST[i].col })),
      p0 + 0.1, p1, { rows: 2, cols: 2, cw: 440, chh: 250, y: 560, revealStep: 0.2 });
    const tEv = a.w('peter', 'every');
    [['FLUTE', 'A5'], ['OBOE', 'E4'], ['CLARINET', 'A3'], ['HORNS', 'D3']].forEach(([inst, n], i) => {
      play(inst, n, tEv + i * 0.35, 1.2, 0.2); gp.active.push({ t0: tEv + i * 0.35, t1: tEv + i * 0.35 + 0.35, i });
    });
    const MOT = {
      FLUTE: [['A5', 0.5], ['B5', 0.5], ['A5', 0.5], ['D6', 0.5], ['B5', 0.5], ['A5', 1]],
      OBOE: [['E4', 1], ['D4', 0.5], ['E4', 0.5], ['F#4', 1]],
      CLARINET: [['A3', 0.5], ['C4', 0.5], ['E4', 1], ['D#4', 0.5], ['D4', 1]],
      HORNS: [['D3', 1.5], ['F3', 0.5], ['A3', 1], ['G#3', 1.5]],
    };
    const words = ['bird', 'duck', 'cat', 'wolf'];
    words.forEach((w, i) => {
      const inst = CHAR[i][1], t0 = a.w('peter2', w) - 0.05;
      const t1 = i < 3 ? a.w('peter2', words[i + 1]) - 0.05 : p1;
      const beat = inst === 'FLUTE' ? 0.13 : inst === 'HORNS' ? 0.3 : 0.2;
      motif(inst, MOT[inst], t0, beat, inst === 'HORNS' ? 0.34 : 0.3);
      gp.active.push({ t0, t1, i });
      keys(MOT[inst].map(x => x[0]).filter(n => a.T.midi(n) <= 79), t0, t0 + 0.5);
    });
    motif('FLUTE', MOT.FLUTE, p1 - 1.6, 0.11, 0.24);

    // ---- Bolero: one original tune, passed from color to color ----
    const b0 = S('bolero').t0, b1 = S('bolero').t1;
    const TUNE = [['D4', 0.5], ['E4', 0.5], ['F4', 1], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['E4', 0.5], ['D4', 1]];
    const ROUND = ['FLUTE', 'CLARINET', 'VIOLIN', 'FLUTE', 'CLARINET'];
    const RECIPE = { FLUTE, CLARINET: CLAR, VIOLIN };
    const beatB = 0.27, len = 5 * beatB + 0.25;
    const tStays = a.w('bolero', 'stays');
    a.big('SAME TUNE', tStays - 0.05, b1, { y: 470, size: 40, ...MONO, color: '#ffffff', blur: 6 });
    for (let k = 0, t = b0 + 0.25; t + len <= b1 + 0.1 && k < ROUND.length; k++, t += len) {
      const inst = ROUND[k], end = Math.min(b1, t + len);
      motif(inst, TUNE, t, beatB, 0.32);
      TUNE.reduce((tt, [n, bb]) => { a.note(n, tt, bb * beatB * 0.9, { vel: 0, show: false }); return tt + bb * beatB; }, t);
      spectrum(RECIPE[inst], t - 0.15, end + 0.2, { cw: 88, hmax: 330, color: INST[inst].col });
      a.big(inst, t - 0.15, end + 0.1, { y: 560, size: 64, color: INST[inst].col, blur: 16 });
    }

    // ---- why1-2: one note = a stack of frequencies ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const tStack = a.w('why1', 'stack') - 0.05, tFund = a.w('why2', 'fundamental') - 0.05;
    const tOv = a.w('why2', 'overtones') - 0.05;
    const appear = [tStack, a.w('why2', 'two'), a.w('why2', 'three'), a.w('why2', 'four')];
    const tFreq = a.w('why2', 'frequency');
    for (let i = 4; i < 8; i++) appear.push(tFreq + 0.1 + (i - 4) * 0.18);
    a.big('ONE NOTE: D', y0 + 0.3, tStack, { y: 560, size: 60, color: '#ffffff' });
    spectrum([1], y0 + 0.3, tStack + 0.1, { cw: 200, hmax: 380, color: GOLD });
    STACK.forEach((h, i) => {
      const t = appear[i] - 0.05;
      spectrum([h], t, y1, { cx: 540 + (i - 3.5) * 100, cw: 100, hmax: 380, color: i ? TEAL : GOLD });
      a.big((i + 1) + '×', t, y1, { x: 540 + (i - 3.5) * 100, y: BASE + 38, size: 30, ...MONO, color: i ? '#ffffff' : GOLD, blur: 0 });
      a.note(hz(F0 * (i + 1)), t, y1 - t - 0.15, { vel: 0.3 * h * 0.55, show: false, tone: { partials: [1], attack: 0.05, release: 0.3 } });
    });
    a.note(hz(F0), y0 + 0.3, tStack - y0 - 0.4, { vel: 0.25, show: false, tone: { partials: STACK, attack: 0.05 } });
    a.big('FUNDAMENTAL', tFund, tOv, { y: 560, size: 50, ...MONO, color: GOLD, blur: 10 });
    a.big('+ OVERTONES', tOv, y1, { y: 560, size: 50, ...MONO, color: TEAL, blur: 10 });
    keys(['D4'], y0 + 0.3, y1);

    // ---- recipe: same D, different overtone mix ----
    const r0 = S('recipe').t0, r1 = S('recipe').t1;
    const tF = a.at('flute') - 0.1, tV = a.at('violin') - 0.1, tC = a.at('clar') - 0.1;
    const SPEC = { cw: 100, hmax: 380, labels: true, labelSize: 30 };
    spectrum(STACK, r0, tF + 0.2, { ...SPEC, color: TEAL });
    a.big('HOW LOUD IS EACH ONE?', a.w('why3', 'loud') - 0.1, tF + 0.2, { y: 560, size: 46, ...MONO, color: '#ffffff', blur: 6 });
    // during "the recipe": the overtones pulse one by one
    const tRec = a.w('why3', 'recipe');
    STACK.forEach((h, i) => a.note(hz(F0 * (i + 1)), tRec + i * 0.12, 0.5, { vel: 0.18 * h, show: false, tone: { partials: [1], attack: 0.02 } }));
    play('VIOLIN', hz(F0), a.w('why3', 'gives'), tF - a.w('why3', 'gives') - 0.1, 0.22);
    spectrum(FLUTE, tF, tV + 0.2, { ...SPEC, color: TEAL });
    a.big('FLUTE', tF, tV + 0.1, { y: 560, size: 70, color: TEAL, blur: 16 });
    a.big('CLOSE TO PURE', a.w('flute', 'pure') - 0.1, tV + 0.1, { y: 640, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    play('FLUTE', hz(F0), tF + 0.1, tV - tF - 0.2, 0.34);
    spectrum(VIOLIN, tV, tC + 0.2, { ...SPEC, color: PINK });
    a.big('VIOLIN', tV, tC + 0.1, { y: 560, size: 70, color: PINK, blur: 16 });
    a.big('RICH IN OVERTONES', a.w('violin', 'rich') - 0.1, tC + 0.1, { y: 640, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    play('VIOLIN', hz(F0), tV + 0.1, tC - tV - 0.2, 0.34);
    spectrum(CLAR, tC, r1, { ...SPEC, color: BLUE, colorFn: h => (h % 2 ? BLUE : GREY) });
    a.big('LOW CLARINET', tC, r1, { y: 560, size: 70, color: BLUE, blur: 16 });
    a.big('ODD OVERTONES: 3× 5× 7×', a.w('clar', 'odd') - 0.1, r1, { y: 640, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    play('CLARINET', hz(F0), tC + 0.1, r1 - tC - 0.4, 0.34);
    keys(['D4'], r0, r1);

    // ---- attack: the shape of a note over time (piano strike vs violin swell) ----
    const k0 = S('attack').t0, k1 = S('attack').t1;
    const tPi = a.w('attack2', 'piano') - 0.05, tVs = a.w('attack2', 'violin') - 0.05;
    const NB = 18, BW = 46;
    const strip = (fn, y, t0, dur, col) => {
      for (let i = 0; i < NB; i++) {
        const h = Math.max(0.03, fn(i / (NB - 1))), hh = Math.round(200 * h) + 18, t = t0 + (i / NB) * dur;
        const g = a.grid([{ label: '', color: col }], t, k1, { rows: 1, cols: 1, cw: BW, chh: hh, y: y - hh / 2, x: 540 + (i - (NB - 1) / 2) * BW });
        g.active.push({ t0: t, t1: k1, i: 0 });
      }
    };
    a.big('LOUDNESS OVER TIME  →', k0 + 0.3, k1, { y: 500, size: 32, ...MONO, color: GREY, blur: 0 });
    a.big('PIANO: STRIKE, THEN FADE', k0 + 0.4, k1, { y: 585, size: 40, ...MONO, color: GOLD, blur: 6 });
    strip(x => Math.min(1, x * 12) * Math.exp(-x * 3.2), 715, tPi, 1.6, GOLD);
    a.note('D4', tPi, 2.6, { vel: 0.5 });
    a.big('VIOLIN: SWELL', k0 + 0.6, k1, { y: 880, size: 40, ...MONO, color: PINK, blur: 6 });
    strip(x => 0.12 + 0.88 * Math.sin(Math.min(1, x * 1.25) * Math.PI / 2) ** 2, 1015, tVs, 1.8, PINK);
    play('VIOLIN', hz(F0), tVs, k1 - tVs - 0.2, 0.36, { attack: 1.6 });
    // before the examples: one piano note and one swelling violin note, side by side in time
    a.note('D4', k0 + 0.2, 1.0, { vel: 0.35 });
    play('VIOLIN', hz(F0), k0 + 1.1, tPi - k0 - 1.3, 0.24, { attack: 0.9 });

    // ---- essence: pitch = which note, timbre = who; a final chord shared by three colors ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tT = a.w('essence', 'Timbre'), tCta = a.at('cta');
    a.big('PITCH', e0 + 0.2, tCta, { y: 560, size: 74, color: '#ffffff', blur: 12 });
    a.big('WHICH NOTE', e0 + 0.4, tCta, { y: 640, size: 36, ...MONO, color: GREY, blur: 0 });
    a.big('TIMBRE', tT, tCta, { y: 820, size: 74, color: GOLD, blur: 16 });
    a.big("WHO'S SINGING", tT + 0.2, tCta, { y: 900, size: 36, ...MONO, color: GREY, blur: 0 });
    play('FLUTE', hz(F0), e0 + 0.2, tT - e0 - 0.3, 0.3);
    keys(['D4'], e0 + 0.2, tCta);
    ['FLUTE', 'CLARINET', 'VIOLIN'].forEach((inst, i) => play(inst, hz(F0), tT + i * 0.45, 0.45, 0.3));
    const tc = tCta + 0.1;
    spectrum(STACK, tc, e1, { cw: 90, hmax: 300, color: GOLD, step: 0.05 });
    [['VIOLIN', 'D4'], ['CLARINET', 'F#4'], ['FLUTE', 'A4'], ['FLUTE', 'D5']].forEach(([inst, n], i) => play(inst, n, tc + i * 0.25, e1 - tc - i * 0.25 - 0.4, 0.24));
    keys(['D4', 'F#4', 'A4', 'D5'], tc, e1);
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
