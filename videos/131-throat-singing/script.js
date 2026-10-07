// Throat singing: one singer holds a low drone and boosts single harmonics so they ring out as a
// second, whistling melody. No recordings or traditional melodies are used: every sound is an
// original demonstration built with the engine note option `tone` - a buzzy voice drone on C2 plus a
// sine "whistle" that moves between harmonics 8-12 of that drone (C5 D5 E5 ~F#5 G5).
const F0 = 65.406;                                   // the drone: C2
const hz = f => 69 + 12 * Math.log2(f / 440);        // frequency -> fractional midi
const VOICE = [1, 0.8, 0.62, 0.5, 0.4, 0.33, 0.27, 0.22, 0.18, 0.15, 0.12, 0.1, 0.08, 0.065, 0.05, 0.04];
const GROWL_A = [0.6, 1, 0.95, 0.9, 0.8, 0.62, 0.5, 0.42, 0.36, 0.3, 0.25, 0.2, 0.16, 0.13, 0.1, 0.08, 0.06, 0.05];
const GROWL_B = [0.6, 0.8, 0.6, 0.5, 0.55, 0.7, 0.8, 0.75, 0.6, 0.45, 0.32, 0.24, 0.18, 0.14, 0.1, 0.08, 0.06, 0.05];
const NOTE = { 1: 'C2', 2: 'C3', 3: 'G3', 4: 'C4', 5: 'E4', 6: 'G4', 7: 'A#4', 8: 'C5', 9: 'D5', 10: 'E5', 11: 'F#5', 12: 'G5' };
const NAME = { 8: 'C', 9: 'D', 10: 'E', 11: '~F#', 12: 'G' };
// original overtone melodies: [harmonic, beats]
const MEL_A = [[8, 1], [9, 0.5], [10, 1.5], [9, 0.5], [10, 0.5], [12, 1.5], [10, 0.5], [9, 1], [8, 2]];
const MEL_B = [[10, 1], [12, 1], [10, 0.5], [9, 0.5], [8, 1], [9, 0.5], [10, 0.5], [8, 2]];
const MEL_C = [[8, 0.75], [10, 0.75], [12, 1.5], [11, 0.5], [10, 0.5], [9, 0.5], [8, 1.5]];

module.exports = {
  slug: 'throat-singing',
  title: 'Throat Singing',
  segments: [
    { id: 'hook',    text: 'One singer, two notes at once: a deep drone, and a whistling melody above it.' },
    { id: 'what',    text: 'This is throat singing, or khoomei, from Tuva and Mongolia.' },
    { id: 'sygyt',   text: 'In the sygyt style, the overtones sing a high, whistling melody.' },
    { id: 'karg',    text: 'In kargyraa, the voice drops into a very deep growl.' },
    { id: 'why1',    text: 'So how does it work? Every sung note is a stack of harmonics.' },
    { id: 'why2',    text: 'The fundamental, plus two, three, four times its frequency.' },
    { id: 'why3',    text: 'By shaping the mouth, tongue and throat, the singer boosts one harmonic at a time...' },
    { id: 'why4',    text: 'so strongly that you hear it as a second, whistling note.' },
    { id: 'why5',    text: 'The low note stays the same. The melody comes from moving between harmonics.' },
    { id: 'why6',    text: 'So it can only use notes of the harmonic series.' },
    { id: 'why7',    text: "Around harmonics eight to twelve, they're close enough together to make a scale." },
    { id: 'why8',    text: 'Your mouth works like a filter: its resonances, called formants, shape every vowel.' },
    { id: 'why9',    text: 'Throat singers push that to the extreme.' },
    { id: 'essence', text: 'One voice, two notes. The harmonic series becomes a melody.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'ONE VOICE · TWO NOTES', title: 'THROAT SINGING', accent: true, circle: false, lead: 0.5, gap: 0.4, tail: 0.9 },
    { id: 'sygyt', segs: ['sygyt'], label: 'YOU HEAR IT IN', title: 'Sygyt', sub: 'khoomei style · a high whistle', circle: false, tail: 3.0 },
    { id: 'karg', segs: ['karg'], label: 'YOU HEAR IT IN', title: 'Kargyraa', sub: 'khoomei style · a deep growl', circle: false, tail: 2.6 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'A STACK OF HARMONICS', circle: false, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'WHY IT WORKS', title: 'BOOST ONE HARMONIC', circle: false, gap: 0.2, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'DRONE + MELODY', circle: false, tail: 2.2 },
    { id: 'why6', segs: ['why6', 'why7'], label: 'WHY IT WORKS', title: 'HARMONICS 8 TO 12', circle: false, gap: 0.3, tail: 2.0 },
    { id: 'why8', segs: ['why8', 'why9'], label: 'WHY IT WORKS', title: 'THE MOUTH FILTER', circle: false, gap: 0.3, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE VOICE, TWO NOTES', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', ORANGE = '#ffa45c', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const nrm = P => 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0));
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));

    // ---------- sound ----------
    const drone = (t, dur, vel = 0.3, P = VOICE, f = F0) => a.note(hz(f), t, dur, { vel: vel * nrm(P), show: false, tone: { partials: P, attack: 0.25, release: 0.4 } });
    // the whistle: one sine that glides quickly from harmonic to harmonic; returns [{t0,t1,n}]
    function whistle(mel, t0, beat, vel = 0.2) {
      const bend = [], wins = [];
      let x = 0, prev = null;
      mel.forEach(([n, b]) => {
        const st = 12 * Math.log2(n / 8), d = b * beat;
        if (prev === null) bend.push([0, st]); else bend.push([x, prev], [x + 0.05, st]);
        wins.push({ t0: t0 + x, t1: t0 + x + d, n });
        a.note(NOTE[n], t0 + x, d * 0.95, { vel: 0, show: false });
        prev = st; x += d;
      });
      a.note(hz(8 * F0), t0, x, { vel, show: false, tone: { partials: [1, 0.05], attack: 0.12, release: 0.3, bend } });
      return wins;
    }
    const melLen = (mel, beat) => mel.reduce((s, m) => s + m[1], 0) * beat;

    // ---------- visuals: bar charts made of one-cell grids ----------
    const BASE = 1100;
    function bars(list, t0, t1, o = {}) {
      const cw = o.cw ?? 76, hmax = o.hmax ?? 420, cx = o.cx ?? 540, n = list.length;
      return list.map((b, i) => {
        const hh = Math.round(hmax * b.h) + 20, x = cx + (i - (n - 1) / 2) * cw, g0 = t0 + i * (o.step ?? 0);
        const g = a.grid([{ label: b.text ?? '', color: b.color, size: b.size ?? 34 }], g0, t1, { rows: 1, cols: 1, cw, chh: hh, y: BASE - hh + 8, x });
        if (b.lit !== false) g.active.push({ t0: g0, t1, i: 0 });
        if (b.label) a.big(b.label, g0, t1, { x, y: BASE + 38, size: o.labelSize ?? 28, ...MONO, color: b.labelColor ?? GREY, blur: 0 });
        g.x = x; g.hh = hh;
        return g;
      });
    }
    // the singer's spectrum: 12 harmonics of the drone + tall "boost" outlines over harmonics 8-12
    function voiceBars(t0, t1, o = {}) {
      const base = bars(VOICE.slice(0, 12).map((h, i) => ({ h: h * 0.75, color: i ? TEAL : GOLD, label: String(i + 1), labelColor: i ? GREY : GOLD })), t0, t1, { step: o.step ?? 0 });
      const ghost = {};
      if (o.ghost !== false) for (let n = 8; n <= 12; n++) {
        const g = a.grid([{ label: NAME[n], color: PINK, size: n === 11 ? 26 : 34 }], t0 + (n - 1) * (o.step ?? 0), t1, { rows: 1, cols: 1, cw: 76, chh: 470, y: BASE - 462, x: base[n - 1].x });
        ghost[n] = g;
      }
      return { base, ghost };
    }
    const boost = (V, wins) => wins.forEach(w => V.ghost[w.n] && V.ghost[w.n].active.push({ t0: w.t0, t1: w.t1, i: 0 }));
    const gx = V => V.ghost[10].x;

    // ---- hook: drone + whistle, the spectrum with one boosted harmonic (cover: all visible at once) ----
    const h1 = S('hook').t1;
    const HV = voiceBars(0.05, h1, { step: 0.02 });
    HV.ghost[10].active.push({ t0: 0.05, t1: 0.9, i: 0 });
    a.big('DRONE', 0.1, h1, { x: HV.base[0].x + 20, y: BASE - HV.base[0].hh - 40, size: 30, ...MONO, color: GOLD, blur: 6 });
    a.big('MELODY', 0.1, h1, { x: gx(HV), y: BASE - 500, size: 30, ...MONO, color: PINK, blur: 6 });
    drone(0.1, h1 - 0.4, 0.34); keys(['C2'], 0.1, h1);
    let t = 0.9;
    boost(HV, whistle(MEL_A, t, 0.3, 0.17)); t += melLen(MEL_A, 0.3) + 0.2;
    boost(HV, whistle(MEL_B, t, 0.3, 0.17));
    const tKh = a.w('what', 'khoomei') - 0.05;
    a.big('TWO NOTES, ONE THROAT', 0.1, tKh, { y: 520, size: 44, ...MONO, color: WHITE, blur: 6 });
    a.big('KHOOMEI', tKh, h1, { y: 510, size: 64, color: GOLD, blur: 14 });
    a.big('TUVA · MONGOLIA', a.w('what', 'Tuva') - 0.05, h1, { y: 590, size: 34, ...MONO, color: WHITE, blur: 0 });

    // ---- sygyt: a high whistling overtone melody over the drone ----
    const s0 = S('sygyt').t0, s1 = S('sygyt').t1;
    const SV = voiceBars(s0, s1);
    drone(s0 + 0.1, s1 - s0 - 0.4, 0.32); keys(['C2'], s0 + 0.1, s1);
    boost(SV, whistle(MEL_C, s0 + 0.3, 0.3, 0.17));
    const tS2 = Math.max(a.end('sygyt') + 0.1, s0 + 0.3 + melLen(MEL_C, 0.3) + 0.2);
    boost(SV, whistle(MEL_A, tS2, 0.28, 0.24));
    a.big('HIGH WHISTLE', a.w('sygyt', 'high') - 0.05, s1, { y: 520, size: 52, color: PINK, blur: 14 });
    a.big('ON TOP OF THE DRONE', a.w('sygyt', 'whistling') - 0.05, s1, { y: 590, size: 32, ...MONO, color: WHITE, blur: 0 });

    // ---- kargyraa: a very deep growl - rich, low, pulsing phrases ----
    const k0 = S('karg').t0, k1 = S('karg').t1;
    const KB = bars(GROWL_A.slice(0, 12).map((h, i) => ({ h: h * 0.7, color: i ? ORANGE : GOLD, lit: false, label: String(i + 1), labelColor: i ? GREY : GOLD })), k0 + 0.1, k1);
    const tDeep = a.w('karg', 'deep') - 0.05;
    for (let tp = k0 + 0.2, i = 0; tp < k1 - 0.9; tp += 1.15, i++) {
      const P = i % 2 ? GROWL_B : GROWL_A, d = 0.95;
      drone(tp, d, 0.4, P); drone(tp, d, 0.22, P, F0 / 2);
      KB.forEach(g => g.active.push({ t0: tp, t1: tp + d, i: 0 }));
      keys(['C2'], tp, tp + d);
    }
    a.big('VERY DEEP', a.w('karg', 'drops') - 0.05, tDeep, { y: 520, size: 52, color: ORANGE, blur: 14 });
    a.big('A DEEP GROWL', tDeep, k1, { y: 520, size: 56, color: ORANGE, blur: 14 });

    // ---- why1-2: one sung note = a stack of harmonics ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const tSt = a.w('why1', 'stack') - 0.05, tFu = a.w('why2', 'fundamental') - 0.05, tFr = a.w('why2', 'frequency');
    const appear = [y0 + 0.3, a.w('why2', 'two'), a.w('why2', 'three'), a.w('why2', 'four')].map(x => x - 0.05);
    for (let i = 4; i < 12; i++) appear.push(tFr + 0.1 + (i - 4) * 0.12);
    VOICE.slice(0, 12).forEach((h, i) => {
      const tt = appear[i];
      bars([{ h: h * 0.75, color: i ? TEAL : GOLD, label: (i + 1) + '×', labelColor: i ? WHITE : GOLD }], tt, y1, { cx: 540 + (i - 5.5) * 76, labelSize: 26 });
      a.note(hz(F0 * (i + 1)), tt, y1 - tt - 0.2, { vel: 0.32 * h * 0.6, show: false, tone: { partials: [1], attack: 0.05, release: 0.3 } });
    });
    a.big('ONE SUNG NOTE', y0 + 0.3, tFu, { y: 520, size: 50, ...MONO, color: WHITE, blur: 6 });
    a.big('FUNDAMENTAL', tFu, a.w('why2', 'two') - 0.05, { y: 520, size: 50, ...MONO, color: GOLD, blur: 10 });
    a.big('+ 2× · 3× · 4× ...', a.w('why2', 'two') - 0.05, y1, { y: 520, size: 50, ...MONO, color: TEAL, blur: 10 });
    drone(y0 + 0.2, appear[0] - y0 - 0.2, 0.3);
    keys(['C2'], y0 + 0.2, y1);

    // ---- why3-4: shaping the mouth boosts one harmonic at a time -> a second note ----
    const b0 = S('why3').t0, b1 = S('why3').t1;
    const BV = voiceBars(b0, b1);
    drone(b0 + 0.1, b1 - b0 - 0.4, 0.3); keys(['C2'], b0 + 0.1, b1);
    a.big('MOUTH · TONGUE · THROAT', a.w('why3', 'shaping') - 0.05, a.w('why3', 'boosts') - 0.05, { y: 520, size: 44, ...MONO, color: WHITE, blur: 6 });
    a.big('ONE HARMONIC AT A TIME', a.w('why3', 'boosts') - 0.05, a.at('why4') - 0.05, { y: 520, size: 44, ...MONO, color: PINK, blur: 8 });
    const tBo = a.w('why3', 'boosts') - 0.05, tSe = a.w('why4', 'second') - 0.05;
    boost(BV, whistle([[8, 1], [9, 1], [10, 1], [12, 1.5], [10, 1]], tBo, (a.at('why4') - tBo) / 5.5, 0.17));
    boost(BV, whistle([[10, 1], [9, 0.5], [10, 0.5], [12, 1], [10, 2]], a.at('why4') + 0.1, 0.32, 0.2));
    a.big('A SECOND NOTE', tSe, b1, { y: 520, size: 56, color: PINK, blur: 14 });

    // ---- why5: the drone stays, the melody moves between harmonics ----
    const c0 = S('why5').t0, c1 = S('why5').t1;
    const CV = voiceBars(c0, c1);
    drone(c0 + 0.1, c1 - c0 - 0.4, 0.32); keys(['C2'], c0 + 0.1, c1);
    const tSame = a.w('why5', 'same') - 0.05, tMov = a.w('why5', 'moving') - 0.05;
    CV.base[0].active.push({ t0: tSame, t1: tSame + 0.5, i: 0 }, { t0: tSame + 0.5, t1: c1, i: 0 });
    a.big('DRONE: STAYS', tSame, c1, { x: 290, y: 520, size: 40, ...MONO, color: GOLD, blur: 8 });
    a.big('MELODY: MOVES', tMov, c1, { x: 790, y: 520, size: 40, ...MONO, color: PINK, blur: 8 });
    boost(CV, whistle(MEL_B, tMov, 0.3, 0.2));
    boost(CV, whistle([[12, 1], [10, 1], [9, 0.5], [8, 1.5]], Math.min(c1 - 1.5, tMov + melLen(MEL_B, 0.3) + 0.1), 0.3, 0.2));

    // ---- why6-7: harmonics of C2 on the keyboard: far apart low, close together high ----
    const d0 = S('why6').t0, d1 = S('why6').t1;
    const KW = 1020 / 26;
    const WH = []; for (let m = 36; m <= 79; m++) if (![1, 3, 6, 8, 10].includes(m % 12)) WH.push(m);
    const keyCx = m => ([1, 3, 6, 8, 10].includes(m % 12) ? 30 + WH.indexOf(m - 1) * KW + KW * 0.68 + KW * 0.32 : 30 + WH.indexOf(m) * KW + KW / 2);
    const tSer = a.w('why6', 'series') - 0.05, tEi = a.w('why7', 'eight') - 0.05, tCl = a.w('why7', 'close') - 0.05, tSc = a.w('why7', 'scale') - 0.05;
    const span = Math.min(2.6, tEi - tSer - 0.2);
    for (let n = 1; n <= 12; n++) {
      const m = a.T.midi(NOTE[n]), tt = (n === 1 ? d0 + 0.2 : tSer + ((n - 1) / 11) * span), hi = n >= 8;
      const hh = 110 + 22 * n;
      const g = a.grid([{ label: '', color: hi ? PINK : TEAL }], tt, d1, { rows: 1, cols: 1, cw: 34, chh: hh, x: keyCx(m), y: 1160 - hh });
      g.active.push({ t0: tt, t1: hi ? tEi : d1, i: 0 });
      if (hi) g.active.push({ t0: tEi, t1: d1, i: 0 });
      a.big(String(n), tt, d1, { x: keyCx(m), y: 1160 - hh - 26, size: hi ? 21 : 26, ...MONO, color: hi ? PINK : WHITE, blur: 0 });
      if (n > 1) a.note(hz(F0 * n), tt, Math.min(1.0, tEi - tt), { vel: 0.13, show: false, tone: { partials: [1], attack: 0.02, release: 0.25 } });
      keys([NOTE[n]], tt, tt + 0.5);
    }
    drone(d0 + 0.2, tEi - d0 - 0.3, 0.22); keys(['C2'], d0 + 0.2, tSer);
    a.big('THE HARMONIC SERIES OF C', tSer, tEi, { y: 520, size: 40, ...MONO, color: WHITE, blur: 6 });
    a.big('FAR APART', tEi, d1, { x: 300, y: 600, size: 40, ...MONO, color: TEAL, blur: 6 });
    a.big('CLOSE TOGETHER', tCl, d1, { x: 820, y: 600, size: 40, ...MONO, color: PINK, blur: 8 });
    a.big('C · D · E · ~F# · G', tSc, d1, { x: 760, y: 520, size: 36, ...MONO, color: PINK, blur: 8 });
    drone(tEi, d1 - tEi - 0.3, 0.26); keys(['C2'], tEi, d1);
    whistle([[8, 1], [9, 1], [10, 1], [11, 1], [12, 2]], tSc, 0.3, 0.2);
    whistle([[12, 1], [10, 1], [9, 1], [8, 2]], tSc + 2.0, 0.3, 0.2);

    // ---- why8-9: the mouth as a filter - two vowels, then the extreme: one single peak ----
    const f0 = S('why8').t0, f1 = S('why8').t1, V3 = 130.81;
    const formant = (F) => Array.from({ length: 16 }, (_, i) => {
      const f = V3 * (i + 1); let g = 0.06;
      F.forEach(([fc, A, bw]) => { g += A / (1 + ((f - fc) / bw) ** 2); });
      return Math.min(1, g * Math.pow(i + 1, -0.25));
    });
    const AH = formant([[720, 1, 160], [1100, 0.75, 160]]), EE = formant([[280, 1, 90], [2050, 0.8, 200]]);
    const tFi = a.w('why8', 'filter') - 0.05, tVo = a.w('why8', 'vowel') - 0.05, tEx = a.at('why9') - 0.05;
    const half = tFi + (tEx - tFi) / 2;
    const vowel = (P, tt, d, label, col) => {
      bars(P.map((h, i) => ({ h: h * 0.85, color: col, label: i % 3 === 0 || i === 15 ? String(i + 1) : '' })), tt, tt + d, { cw: 58 });
      a.big(label, tt, tt + d, { y: 560, size: 70, color: col, blur: 14 });
      a.note(hz(V3), tt + 0.05, d - 0.3, { vel: 0.32 * nrm(P), show: false, tone: { partials: P, attack: 0.08, release: 0.2 } });
      keys(['C3'], tt + 0.05, tt + d - 0.2);
    };
    a.big('ONE NOTE, TWO VOWELS', f0 + 0.2, f1, { y: 470, size: 32, ...MONO, color: GREY, blur: 0 });
    bars(VOICE.map(h => ({ h: h * 0.62, color: WHITE })), f0 + 0.1, tFi + 0.2, { cw: 58 });
    a.note(hz(V3), f0 + 0.15, tFi - f0 - 0.2, { vel: 0.3 * nrm(VOICE), show: false, tone: { partials: VOICE, attack: 0.08, release: 0.2 } });
    vowel(AH, tFi, half - tFi + 0.2, 'AH', BLUE);
    vowel(EE, half, tEx - half + 0.2, 'EE', TEAL);
    a.big('FORMANTS = PEAKS', a.w('why8', 'formants') - 0.05, tEx, { y: 650, size: 34, ...MONO, color: WHITE, blur: 0 });
    const XV = voiceBars(tEx, f1);
    a.big('ONE HUGE PEAK', a.w('why9', 'extreme') - 0.05, f1, { y: 560, size: 56, color: PINK, blur: 14 });
    drone(tEx + 0.05, f1 - tEx - 0.35, 0.3); keys(['C2'], tEx + 0.05, f1);
    boost(XV, whistle([[9, 1], [10, 1], [12, 2], [10, 1], [9, 1], [8, 2]], tEx + 0.3, 0.3, 0.22));

    // ---- essence: drone + melody one last time ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tCta = a.at('cta');
    const EV = voiceBars(e0, e1);
    drone(e0 + 0.1, e1 - e0 - 0.5, 0.34); keys(['C2'], e0 + 0.1, e1 - 0.2);
    a.big('ONE VOICE', e0 + 0.2, e1, { x: 300, y: 520, size: 50, color: GOLD, blur: 12 });
    a.big('TWO NOTES', a.w('essence', 'two') - 0.05, e1, { x: 780, y: 520, size: 50, color: PINK, blur: 12 });
    let te = e0 + 0.4;
    boost(EV, whistle(MEL_A, te, 0.3, 0.2)); te += melLen(MEL_A, 0.3) + 0.15;
    boost(EV, whistle(MEL_C, te, 0.3, 0.2)); te += melLen(MEL_C, 0.3) + 0.15;
    if (te + melLen(MEL_B, 0.3) < e1 - 0.4) boost(EV, whistle(MEL_B, te, 0.3, 0.2));
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
