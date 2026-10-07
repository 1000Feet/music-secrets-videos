// Gamelan: bronze ensembles from Java and Bali, with tunings that don't match the piano.
// Only ORIGINAL interlocking patterns. Slendro is shown as five equal steps (240 cents, an idealised
// approximation) and pelog as one illustrative set of seven unequal steps. Bronze sounds are additive
// tones (engine note option `tone`): a fundamental plus an inharmonic partial at ~2.76x; gongs are low
// tones with a slow beat. Pagodes is named only: its scene plays an original piano figure.
const hz = f => 69 + 12 * Math.log2(f / 440);
const INH = 12 * Math.log2(2.76);
const SL = [0, 2.4, 4.8, 7.2, 9.6];                 // slendro, idealised equal steps (semitones above C)
const PE = [0, 1.2, 2.7, 5.4, 6.7, 8.0, 9.5];       // pelog, one illustrative tuning

module.exports = {
  slug: 'gamelan',
  title: 'Gamelan',
  segments: [
    { id: 'hook',    text: "Bronze, gongs, and notes that don't fit on a piano. This is gamelan." },
    { id: 'what',    text: 'Gamelan orchestras from Java and Bali are made mostly of bronze metallophones, gongs and drums.' },
    { id: 'debussy', text: 'Debussy heard a Javanese gamelan at the 1889 Paris Exposition...' },
    { id: 'pagodes', text: 'and it influenced works like his piano piece Pagodes, from 1903.' },
    { id: 'why1',    text: 'So how does it work? Two tuning systems. Slendro has five notes, roughly equally spaced.' },
    { id: 'pelog',   text: 'Pelog has seven unequal notes, usually five used at a time.' },
    { id: 'neither', text: 'Neither one matches Western equal temperament.' },
    { id: 'set',     text: 'Each gamelan is tuned as a set, so tunings vary from one ensemble to another.' },
    { id: 'cycle',   text: 'The music is cyclical: the large gong marks the end of each cycle...' },
    { id: 'cycle2',  text: 'and smaller gongs divide it.' },
    { id: 'ombak',   text: 'In Balinese gamelan, paired instruments are tuned slightly apart...' },
    { id: 'ombak2',  text: 'for a shimmering beat: ombak, the wave.' },
    { id: 'kotekan', text: 'In kotekan, two players each play part of a fast melody that only exists when combined.' },
    { id: 'essence', text: 'Bronze, cycles and a different tuning... music that shimmers instead of resolving.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'JAVA · BALI', title: 'GAMELAN', accent: true, tonic: 0, lead: 0.5, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'THE ORCHESTRA', title: 'BRONZE', circle: false, tonic: 0, tail: 0.8 },
    { id: 'debussy', segs: ['debussy'], label: 'PARIS · 1889', title: 'Debussy Hears It', sub: 'Exposition Universelle', circle: false, tonic: 0, tail: 0.8 },
    { id: 'pagodes', segs: ['pagodes'], label: 'YOU HEAR IT IN', title: 'Pagodes', sub: 'Claude Debussy · 1903 · piano', tonic: 0, tail: 2.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SLENDRO', tonic: 0, tail: 1.3 },
    { id: 'pelog', segs: ['pelog'], label: 'SEVEN UNEQUAL NOTES', title: 'PELOG', tonic: 0, tail: 1.0 },
    { id: 'neither', segs: ['neither'], label: 'NOT THE PIANO', title: 'NO MATCH', tonic: 0, tail: 1.0 },
    { id: 'set', segs: ['set'], label: 'EVERY ENSEMBLE', title: 'TUNED AS A SET', tonic: 0, tail: 1.0 },
    { id: 'cycle', segs: ['cycle', 'cycle2'], label: 'THE STRUCTURE', title: 'CYCLES', circle: false, tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'ombak', segs: ['ombak', 'ombak2'], gap: 0.3, label: 'BALINESE GAMELAN', title: 'OMBAK', circle: false, tonic: 0, tail: 1.2 },
    { id: 'kotekan', segs: ['kotekan'], label: 'INTERLOCKING PARTS', title: 'KOTEKAN', circle: false, tonic: 0, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'IT SHIMMERS', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c', LILAC = '#b48cff', GREY = '#8a8a92', BLUE = '#62a8ff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // bronze metallophone at any (fractional) pitch; `beat` Hz = optional detuned partner (ombak)
    const bronze = (m, t, dur = 1.4, vel = 0.26, beat = 0) => {
      const tn = { partials: [1, 0.12], attack: 0.003, decay: 1.6, release: 0.4 };
      a.note(m, t, dur, { vel, show: false, tone: tn });
      a.note(m + INH, t, dur * 0.5, { vel: vel * 0.3, show: false, tone: { partials: [1], attack: 0.002, decay: 5, release: 0.2 } });
      if (beat) { const f = 440 * Math.pow(2, (m - 69) / 12); a.note(hz(f + beat), t, dur, { vel, show: false, tone: tn }); }
      // light the key(s) it falls on or between
      if (m % 1 === 0) a.note(m, t, 0.4, { vel: 0, show: false });
      else { a.note(Math.floor(m), t, 0.4, { vel: 0, show: false }); a.note(Math.ceil(m), t, 0.4, { vel: 0, show: false }); }
    };
    const gong = (t, big = true, vel = 0.5) => {
      const m = big ? hz(70) : hz(196), f = big ? 70 : 196;
      a.note(m, t, big ? 3.5 : 1.6, { vel, show: false, tone: { partials: [1, 0.35, 0.15, 0.06], attack: 0.03, decay: big ? 0.45 : 1.1, release: 1 } });
      a.note(hz(f + (big ? 1.3 : 2.5)), t, big ? 3.5 : 1.6, { vel: vel * 0.8, show: false, tone: { partials: [1, 0.3], attack: 0.03, decay: big ? 0.45 : 1.1, release: 1 } });
    };
    const drum = (t, v = 0.3) => a.note(hz(110), t, 0.25, { vel: v, show: false, tone: { partials: [1, 0.4, 0.15], attack: 0.002, decay: 9, release: 0.05, bend: [[0, 2], [0.08, 0]] } });
    const SLM = SL.map(s => 60 + s).concat([72, 74.4, 76.8]);   // slendro notes from C4 upward
    // solid dots at any position on the circle (single-point walkers)
    const dots = (ps, t0, t1, color, step = 0) => ps.forEach((p, i) => a.walker([[t0 + i * step, p]], { t1, color }));
    // an original interlocking pattern on slendro degrees: [degree index, ...], one per pulse
    const PAT = [2, 3, 2, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 1, 0, 4];
    const pattern = (t0, t1, p = 0.2, vel = 0.24, beat = 0) => { for (let t = t0, i = 0; t < t1 - 0.2; t += p, i++) bronze(SLM[PAT[i % 16] + (i % 2 ? 2 : 0)], t, 0.6, vel * (i % 2 ? 0.8 : 1), beat); };

    // ---- hook: five equal slendro dots that miss the piano's twelve positions ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'C', []);
    dots(SL, 0.1, S('hook').t1, GOLD, 0.15);
    a.poly(SL, 0.6, h1, { closed: true, dash: false, color: GOLD, glow: true, alpha: 0.8, width: 4 });
    a.tag(0, 0.9, h1, 'FIVE EQUAL STEPS', { x: 540, y: 830, color: GOLD });
    SL.forEach((s, i) => bronze(60 + s, 0.1 + i * 0.15, 1.6, 0.26, 3));
    gong(0.1, true, 0.5);
    pattern(1.6, h1, 0.22, 0.22, 3);
    gong(a.w('hook', 'gamelan'), true, 0.55);

    // ---- what: metallophones, gongs, drums ----
    const w0 = S('what').t0 + 0.1, w1 = S('what').t1;
    const gW = a.grid([{ label: 'METALLOPHONES', size: 46, color: GOLD, sub: 'BRONZE' }, { label: 'GONGS', size: 54, color: PINK }, { label: 'DRUMS', size: 54, color: TEAL }],
      w0, w1, { rows: 3, cols: 1, cw: 720, chh: 190, y: 480, revealStep: 0.25 });
    const tMet = a.w('what', 'metallophones') - 0.05, tGo = a.w('what', 'gongs') - 0.05, tDr = a.w('what', 'drums') - 0.05;
    gW.active.push({ t0: tMet, t1: tGo, i: 0 }, { t0: tGo, t1: tDr, i: 1 }, { t0: tDr, t1: w1, i: 2 });
    a.big('JAVA · BALI', a.w('what', 'Java'), w1, { y: 1110, size: 44, ...MONO, color: '#ffffff', blur: 0 });
    pattern(w0, w1, 0.22, 0.2, 3);
    gong(tGo, false, 0.45); gong(tGo + 0.9, true, 0.45);
    for (let t = tDr, i = 0; t < w1 - 0.2; t += 0.22, i++) if (i % 4 !== 3) drum(t, i % 4 ? 0.2 : 0.32);

    // ---- debussy: Paris 1889 ----
    const d0 = S('debussy').t0 + 0.1, d1 = S('debussy').t1;
    a.big('1889', d0 + 0.2, d1, { y: 640, size: 220, color: GOLD, blur: 30 });
    a.big('JAVANESE GAMELAN', a.w('debussy', 'Javanese'), d1, { y: 820, size: 48, ...MONO, color: '#ffffff', blur: 6 });
    a.big('PARIS', a.w('debussy', 'Paris'), d1, { y: 920, size: 44, ...MONO, color: GREY, blur: 0 });
    pattern(d0, d1, 0.24, 0.2, 3);
    gong(d0, true, 0.45);

    // ---- Pagodes: named only - an original piano figure in the high register ----
    const p0 = S('pagodes').t0 + 0.1, p1 = S('pagodes').t1;
    a.scale(p0, 'F#', [0, 2, 4, 7, 9]);
    const FIG = ['F#5', 'C#5', 'D#5', 'A#4', 'F#5', 'C#5', 'D#5', 'G#4'];
    for (let t = p0 + 0.2, i = 0; t < p1 - 0.4; t += 0.2, i++) a.note(FIG[i % 8], t, 0.35, { vel: 0.18 });
    for (let t = p0 + 0.2; t < p1 - 0.4; t += 1.6) { a.note('F#2', t, 1.6, { vel: 0.3 }); a.note('C#3', t, 1.6, { vel: 0.22 }); }
    a.big('PIANO · 1903', a.w('pagodes', 'piano'), p1, { y: 470, size: 40, ...MONO, color: GOLD, blur: 6 });
    a.tag(0, a.w('pagodes', 'influenced'), p1, 'INFLUENCED BY GAMELAN', { x: 540, y: 830, color: GOLD });

    // ---- why1: slendro - five roughly equal steps ----
    const s0 = S('why1').t0 + 0.1, s1 = S('why1').t1;
    a.scale(s0, 'C', ALL);
    a.scale(a.w('why1', 'Slendro'), 'C', []);
    a.big('TWO TUNINGS', a.w('why1', 'Two'), a.w('why1', 'Slendro'), { y: 460, size: 40, ...MONO, color: '#ffffff', blur: 0 });
    const tSl = a.w('why1', 'Slendro'), tEq = a.w('why1', 'equally');
    dots(SL, tSl, s1, GOLD, 0.2);
    a.poly(SL, tEq, s1, { closed: true, dash: false, color: GOLD, glow: true, alpha: 0.8, width: 4 });
    a.tag(0, tEq, s1, '≈ EQUAL STEPS', { x: 540, y: 830, color: GOLD });
    SL.forEach((s, i) => bronze(60 + s, tSl + i * 0.2, 1.2, 0.26));
    [72, ...SL.slice().reverse().map(s => 60 + s)].forEach((m, i) => bronze(m, a.end('why1') + 0.1 + i * 0.18, 1.0, 0.24));

    // ---- pelog: seven unequal, five at a time ----
    const l0 = S('pelog').t0 + 0.1, l1 = S('pelog').t1, tFive = a.w('pelog', 'five');
    dots(PE, l0, l1, LILAC, 0.12);
    a.poly(PE, l0 + 0.9, tFive, { closed: true, dash: true, color: LILAC, alpha: 0.6 });
    const FIVE = [0, 1, 2, 4, 5];
    a.ring(FIVE.map(i => PE[i]), tFive, l1, { color: GOLD });
    a.poly(FIVE.map(i => PE[i]), tFive, l1, { closed: true, dash: false, color: GOLD, glow: true, alpha: 0.8, width: 4 });
    a.tag(0, a.w('pelog', 'unequal'), tFive, 'UNEQUAL STEPS', { x: 540, y: 830, color: LILAC });
    a.tag(0, tFive, l1, 'FIVE AT A TIME', { x: 540, y: 830, color: GOLD });
    a.big('ONE EXAMPLE TUNING', l0 + 0.3, l1, { y: 460, size: 30, ...MONO, color: GREY, blur: 0 });
    PE.forEach((s, i) => bronze(60 + s, l0 + i * 0.12, 1.2, 0.24));
    [0, 1, 2, 4, 5, 4, 2, 1, 0].forEach((k, i) => bronze(60 + PE[k], tFive + 0.2 + i * 0.24, 0.8, 0.24));

    // ---- neither: the piano's 12 equal steps vs slendro ----
    const n0 = S('neither').t0 + 0.1, n1 = S('neither').t1;
    a.scale(n0, 'C', ALL, { popIn: { t0: n0, step: 0.05 } });
    dots(SL, n0, n1, RED);
    a.poly(SL, n0, n1, { closed: true, dash: false, color: RED, glow: true, alpha: 0.7, width: 3 });
    a.tag(0, a.w('neither', 'Western'), n1, 'NOT ON THE 12', { x: 540, y: 830, color: RED });
    ALL.forEach((p, i) => a.note(60 + p, n0 + i * 0.05, 0.4, { vel: 0.12 }));
    [1, 2, 3, 4].forEach((k, i) => { bronze(60 + SL[k], a.w('neither', 'matches') + i * 0.45, 0.9, 0.26); a.note(60 + Math.round(SL[k]), a.w('neither', 'matches') + i * 0.45 + 0.2, 0.5, { vel: 0.16, show: false }); });

    // ---- set: three ensembles, three slightly different tunings ----
    const e0 = S('set').t0 + 0.1, e1 = S('set').t1;
    a.scale(e0, 'C', []);
    const T3 = [[GOLD, 0], [TEAL, 0.35], [PINK, -0.3]];
    const tVar = a.w('set', 'vary');
    T3.forEach(([col, off], j) => {
      const ps = SL.map((s, i) => s + off * (i % 2 ? 1 : 0.6));
      const t0 = j ? tVar + (j - 1) * 0.8 : e0;
      dots(ps, t0, e1, col);
      a.poly(ps, t0, e1, { closed: true, dash: j > 0, color: col, glow: !j, alpha: 0.7, width: 3 });
      [0, 1, 2, 3, 4].forEach((k, i) => bronze(60 + ps[k], (j ? t0 : a.w('set', 'set')) + i * 0.15, 0.7, 0.2));
    });
    a.big('ENSEMBLE A · B · C', tVar, e1, { y: 460, size: 36, ...MONO, color: '#ffffff', blur: 0 });

    // ---- cycle: 16 pulses, small gongs divide, the big gong ends it ----
    const c0 = S('cycle').t0 + 0.1, c1 = S('cycle').t1;
    const CC = [...Array(16)].map((_, i) => (i === 15 ? { label: 'GONG', size: 40, color: GOLD } : (i + 1) % 4 === 0 ? { label: String(i + 1), sub: 'SMALL', size: 46, color: PINK, subSize: 18 } : { label: String(i + 1), size: 42, color: TEAL }));
    const gC = a.grid(CC, c0, c1, { rows: 4, cols: 4, cw: 200, chh: 140, y: 470, revealStep: 0.04, caption: 'ONE CYCLE' });
    const tG = a.w('cycle', 'gong'), B = 0.3, cs = tG - 15 * B;
    for (let i = 0; cs + i * B < c1 - 0.3; i++) {
      const t = cs + i * B, j = i % 16;
      if (t < c0) continue;
      gC.active.push({ t0: t, t1: t + B, i: j });
      bronze(SLM[PAT[j] + (j % 2 ? 2 : 0)], t, 0.6, 0.18);
      if (j === 15) gong(t, true, 0.6); else if ((j + 1) % 4 === 0) gong(t, false, 0.4);
    }
    a.big('BIG GONG: END OF CYCLE', tG, a.w('cycle2', 'smaller'), { y: 1135, size: 38, ...MONO, color: GOLD, blur: 6 });
    a.big('SMALL GONGS DIVIDE IT', a.w('cycle2', 'smaller'), c1, { y: 1135, size: 38, ...MONO, color: PINK, blur: 6 });

    // ---- ombak: two instruments tuned slightly apart ----
    const o0 = S('ombak').t0 + 0.1, o1 = S('ombak').t1, tAp = a.w('ombak', 'apart'), tSh = a.w('ombak2', 'shimmering');
    a.lissajous(1, 1, o0, tAp, { drawIn: 0.6, drift: 0, r: 150, y: 640, color: TEAL, labelA: 'PAIR 1', labelB: 'PAIR 2' });
    a.lissajous(1, 1, tAp, o1, { drawIn: 0.4, drift: 2 * Math.PI * 1.5, r: 150, y: 640, color: GOLD, labelA: 'PAIR 1', labelB: 'PAIR 2' });
    for (let t = o0, i = 0; t < tAp - 0.3; t += 0.9, i++) bronze(SLM[[2, 3, 1, 2][i % 4]], t, 1.2, 0.26, 0);
    for (let t = tAp, i = 0; t < o1 - 0.4; t += 0.9, i++) bronze(SLM[[2, 3, 1, 2, 4, 3][i % 6]], t, 1.4, 0.24, 5);
    a.big('IN TUNE', o0 + 0.2, tAp, { y: 880, size: 44, ...MONO, color: TEAL, blur: 0 });
    a.big('SLIGHTLY APART', tAp, tSh, { y: 880, size: 44, ...MONO, color: '#ffffff', blur: 0 });
    a.big('〰 SHIMMER 〰', tSh, a.w('ombak2', 'ombak'), { y: 880, size: 48, ...MONO, color: GOLD, blur: 10 });
    a.big('OMBAK · THE WAVE', a.w('ombak2', 'ombak'), o1, { y: 880, size: 50, ...MONO, color: GOLD, blur: 12 });

    // ---- kotekan: two parts interlock into one fast line ----
    const k0 = S('kotekan').t0 + 0.1, k1 = S('kotekan').t1, P = 0.17;
    const KP = [2, 1, 2, 3, 2, 3, 4, 3];
    const row = (who, col) => KP.map((_, i) => ({ label: who === 2 || i % 2 === who ? '●' : '', size: 40, color: col }));
    const g1 = a.grid(row(0, TEAL), k0, k1, { rows: 1, cols: 8, cw: 118, chh: 120, y: 500, caption: 'PLAYER 1' });
    const g2 = a.grid(row(1, PINK), k0 + 0.2, k1, { rows: 1, cols: 8, cw: 118, chh: 120, y: 690, caption: 'PLAYER 2' });
    const gT = a.grid(row(2, GOLD), a.w('kotekan', 'combined') - 0.1, k1, { rows: 1, cols: 8, cw: 118, chh: 120, y: 880, caption: 'TOGETHER' });
    const tP1 = a.w('kotekan', 'two'), tCo = a.w('kotekan', 'combined') - 0.1;
    // player 1 alone, then player 2 alone, then both
    const play = (ta, tb, who) => { for (let t = ta, i = 0; t < tb - 0.05; t += P, i++) { const j = i % 8; if (who === 2 || j % 2 === who) { bronze(SLM[KP[j] + (j % 2 ? 1 : 0)], t, 0.4, 0.22); (who === 2 ? gT : j % 2 ? g2 : g1).active.push({ t0: t, t1: t + P, i: j }); if (who === 2) (j % 2 ? g2 : g1).active.push({ t0: t, t1: t + P, i: j }); } } };
    const mid = tP1 + (tCo - tP1) / 2;
    play(k0 + 0.3, Math.min(mid, k0 + 0.3 + 16 * P), 0);
    play(mid, mid + Math.min(16 * P, tCo - mid), 1);
    play(tCo, k1 - 0.2, 2);
    gong(tCo, false, 0.35);
    a.big('ONE FAST MELODY', tCo + 0.2, k1, { y: 1110, size: 44, ...MONO, color: GOLD, blur: 8 });

    // ---- essence: slendro, shimmering, ending on the big gong ----
    const f0 = S('essence').t0 + 0.1, f1 = S('essence').t1;
    a.scale(f0, 'C', []);
    dots(SL, f0, f1, GOLD);
    a.poly(SL, f0, f1, { closed: true, dash: false, color: GOLD, glow: true, alpha: 0.8, width: 4 });
    pattern(f0, a.at('cta') - 0.3, 0.22, 0.2, 5);
    gong(f0, true, 0.45);
    gong(a.at('cta') - 0.3, true, 0.65);
    a.big('SHIMMER, NOT RESOLVE', a.w('essence', 'shimmers') - 0.2, f1, { y: 460, size: 36, ...MONO, color: GOLD, blur: 6 });
    a.tag(0, a.at('cta') - 0.3, f1, 'GONG', { x: 540, y: 830, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void BLUE; void GREEN;
  },
};
