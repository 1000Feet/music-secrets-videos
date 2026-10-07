// Melisma: one syllable sung across a whole run of notes.
// Copyright: every run heard here is our own. Handel's runs on "born" are NOT reconstructed,
// no Gregorian melody is quoted, and no Whitney Houston / Mariah Carey melody is played.
module.exports = {
  slug: 'melisma',
  title: 'Melisma',
  segments: [
    { id: 'hook',    text: "One syllable, and a whole cascade of notes. That's a melisma." },
    { id: 'what',    text: 'The singer stretches one vowel over a run of notes.' },
    { id: 'handel',  text: "In Handel's Messiah, 1742, the chorus For unto us a Child is born..." },
    { id: 'handel2', text: 'spins long runs on the word born.' },
    { id: 'chant',   text: 'Gregorian chant spins long melismas on the final a of Alleluia.' },
    { id: 'gospel',  text: 'In gospel and R and B, Whitney Houston and Mariah Carey made runs a signature.' },
    { id: 'why1',    text: 'So why does it work? Syllabic singing is one note per syllable.' },
    { id: 'why1b',   text: 'Clear, perfect for telling a story.' },
    { id: 'why2',    text: 'Melisma stretches one syllable over many notes...' },
    { id: 'why2b',   text: 'and the voice takes over from the words.' },
    { id: 'why3',    text: 'Runs race through a scale, often pentatonic or blues in R and B...' },
    { id: 'why3b',   text: 'decorating one simple target note.' },
    { id: 'why4',    text: 'It shows control and emotion: the word holds while the melody blossoms.' },
    { id: 'why5',    text: 'You hear it in chant, Baroque arias, Arabic and Indian singing, and gospel.' },
    { id: 'essence', text: 'One syllable, many notes: the moment the voice speaks louder than the words.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE SYLLABLE, MANY NOTES', title: 'MELISMA', accent: true, tonic: 0, lead: 0.3, min: 6.2 },
    { id: 'what', segs: ['what'], label: 'ONE VOWEL', title: 'A RUN OF NOTES', tonic: 0, tail: 2.4 },
    { id: 'handel', segs: ['handel', 'handel2'], label: 'YOU HEAR IT IN', title: 'Messiah', sub: 'G. F. Handel · 1742', tonic: 2, gap: 0.2, tail: 2.6 },
    { id: 'chant', segs: ['chant'], label: 'YOU HEAR IT IN', title: 'Gregorian Chant', sub: 'Alleluia', tonic: 2, tail: 2.8 },
    { id: 'gospel', segs: ['gospel'], label: 'YOU HEAR IT IN', title: 'Gospel & R&B', sub: 'Whitney Houston · Mariah Carey', tonic: 5, tail: 2.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'SYLLABIC', circle: false, tonic: 0, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'MELISMATIC', circle: false, tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'THE RUN', tonic: 0, gap: 0.3, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'CONTROL + EMOTION', tonic: 7, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: 'NOT JUST POP', title: 'MANY TRADITIONS', circle: false, tonic: 2, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'MANY NOTES', accent: true, tonic: 0, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const T = a.T;
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', ORANGE = '#ffa45c', VIOLET = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    // a soft "voice": additive tone, with optional vibrato on held notes
    const VOICE = { partials: [1, 0.55, 0.3, 0.16, 0.08], attack: 0.025, release: 0.1 };
    const vib = (len, depth = 0.22) => { const p = [[0, 0], [0.22, 0]]; for (let x = 0.3; x < len; x += 0.045) p.push([x, depth * Math.sin((x - 0.22) * 2 * Math.PI * 5.4)]); return p; };
    // sing a run: notes (names or midi) one per `step`, last note held for `hold` s; walker follows on the circle
    function run(notes, t0, step, o = {}) {
      const ms = notes.map(n => T.midi(n));
      const pts = [];
      ms.forEach((m, i) => {
        const last = i === ms.length - 1, t = t0 + i * step;
        const dur = last ? (o.hold ?? step) : step * 0.92;
        a.note(m, t, dur, { vel: (o.vel ?? 0.26) * (last ? 1.05 : 1), show: o.show ?? true, tone: last && dur > 0.5 ? { ...VOICE, bend: vib(dur) } : VOICE });
        pts.push([t, T.mod(m, 12)]);
        if (o.g) o.g.active.push({ t0: t, t1: o.keep ? o.keep : t + step, i: (o.gi0 ?? 0) + i });
      });
      if (o.walker !== false) a.walker(pts, { t1: o.t1 ?? t0 + ms.length * step + (o.hold ?? 0) + 0.3, dr: -40, color: o.color || GOLD, label: o.label, labelDr: -46 });
      return t0 + (ms.length - 1) * step + (o.hold ?? step);
    }
    const pad = (name, t0, t1, notes, bass, o = {}) => a.ch(name, t0, t1, { notes, bass, vel: o.vel ?? 0.38, hideName: true, shape: o.shape ?? false, strikes: o.strikes });
    const syl = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 830, size: o.size ?? 150, color: o.color || '#ffffff', blur: 26 });

    // ---- hook: "AH" with a cascade of notes, from the first frames ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'C', a.T.MAJOR, { popIn: { t0: 0.12, step: 0.05 } });
    syl('AH', 0.15, h1);
    pad('C', 0.2, 2.6, ['E3', 'G3', 'C4'], 'C2', { vel: 0.35 });
    const HR = ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'A4', 'C5'];
    let te = run(HR, 0.25, 0.13, { hold: 1.0, t1: 2.9 });
    pad('F', 2.6, 4.4, ['F3', 'A3', 'C4'], 'F2', { vel: 0.32 });
    pad('C', 4.4, h1, ['E3', 'G3', 'C4'], 'C2', { vel: 0.35 });
    run(['G5', 'F5', 'E5', 'D5', 'C5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5', 'B4', 'C5'], 2.95, 0.12, { hold: h1 - 2.95 - 12 * 0.12 - 0.2, t1: h1 });
    a.big('1 SYLLABLE · 13 NOTES', 0.3, h1, { y: 462, size: 40, ...MONO, color: GOLD });

    // ---- what: one vowel, a run of notes, counted ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'C', a.T.MAJOR);
    syl('AH', w0 + 0.1, w1);
    pad('Am', w0 + 0.1, w0 + 2.2, ['E3', 'A3', 'C4'], 'A2');
    pad('F', w0 + 2.2, a.w('what', 'run') - 0.05, ['F3', 'A3', 'C4'], 'F2');
    const tRun = a.w('what', 'run') - 0.05;
    const WR = ['E5', 'D5', 'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'A4', 'C5', 'D5', 'C5', 'A4', 'G4'];
    run(['A4', 'C5'], w0 + 0.3, 0.6, { hold: 1.2, walker: false, vel: 0.22 });
    pad('G', tRun, tRun + WR.length * 0.13, ['G3', 'B3', 'D4'], 'G2');
    run(WR, tRun, 0.13, { hold: w1 - tRun - (WR.length - 1) * 0.13 - 0.3, t1: w1 });
    pad('C', tRun + WR.length * 0.13 - 0.13, w1 - 0.1, ['E3', 'G3', 'C4'], 'C2');
    a.big('ONE VOWEL', a.w('what', 'vowel') - 0.1, tRun, { y: 462, size: 44, ...MONO, color: TEAL });
    a.big('15 NOTES', tRun + 0.5, w1, { y: 462, size: 44, ...MONO, color: GOLD });

    // ---- handel: our own Baroque-style run on "BORN" (not Handel's) ----
    const d0 = S('handel').t0, d1 = S('handel').t1;
    a.scale(d0, 'D', a.T.MAJOR);
    a.big('FOR UNTO US A CHILD IS BORN', a.w('handel', 'For') - 0.1, d1, { y: 462, size: 34, ...MONO, color: '#c9c9d2', blur: 0 });
    const tBorn = a.w('handel2', 'born') - 0.05;
    syl('BORN', a.w('handel', 'born') - 0.05, d1, { size: 118, color: GOLD });
    // continuo-like chords
    const BQ = 0.5, cont = [['D', ['F#3', 'A3', 'D4'], 'D2'], ['A', ['E3', 'A3', 'C#4'], 'A1'], ['G', ['G3', 'B3', 'D4'], 'G2'], ['A', ['E3', 'A3', 'C#4'], 'A1']];
    for (let t = d0 + 0.1, k = 0; t < d1 - 0.3; t += 2 * BQ, k++) {
      const [c, n, b] = cont[k % 4];
      pad(c, t, Math.min(t + 2 * BQ, d1 - 0.1), n, b, { vel: 0.3, strikes: [{ o: 0, v: 1 }, { o: BQ, v: 0.6 }] });
    }
    const HB = ['D5', 'E5', 'F#5', 'G5', 'A5', 'G5', 'F#5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'A5', 'G5', 'F#5', 'E5', 'D5', 'E5', 'F#5', 'E5', 'D5'];
    run(HB, tBorn, 0.125, { hold: d1 - tBorn - (HB.length - 1) * 0.125 - 0.3, t1: d1 });
    run(['A4', 'B4', 'C#5', 'D5', 'E5', 'D5', 'C#5', 'B4', 'A4'], a.w('handel', 'born') + 0.1, 0.13, { hold: 0.4, walker: false, vel: 0.18, show: false });

    // ---- chant: an unaccompanied, original modal line on the final "A" ----
    const c0 = S('chant').t0, c1 = S('chant').t1;
    a.scale(c0, 'D', a.T.MINOR);
    a.big('ALLELUI-A', a.w('chant', 'final') - 0.1, c1, { y: 462, size: 44, ...MONO, color: '#c9c9d2', blur: 0 });
    syl('A', a.w('chant', 'final') - 0.1, c1, { size: 190, color: TEAL });
    const tA = a.w('chant', 'Alleluia') - 0.1;
    run(['D4', 'F4', 'E4', 'D4'], c0 + 0.3, 0.38, { hold: 0.8, walker: false, vel: 0.2, show: false });
    const CH = ['D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4', 'E4', 'C4', 'D4'];
    run(CH, tA, 0.22, { hold: c1 - tA - (CH.length - 1) * 0.22 - 0.3, t1: c1, color: TEAL, vel: 0.28 });
    a.note('D2', tA, c1 - tA - 0.2, { vel: 0.16, tone: { partials: [1, 0.3, 0.1], attack: 0.6, release: 0.5 } });

    // ---- gospel: generic gospel chords + our own pentatonic run (no song melody) ----
    const g0 = S('gospel').t0, g1 = S('gospel').t1;
    a.scale(g0, 'F', a.T.MAJOR);
    const GP = [['Bbmaj7', ['A3', 'D4', 'F4'], 'Bb1'], ['Am7', ['G3', 'C4', 'E4'], 'A1'], ['Dm7', ['F3', 'A3', 'C4'], 'D2'], ['C7', ['E3', 'Bb3', 'C4'], 'C2']];
    const gl = (g1 - g0 - 0.2) / 6;
    for (let k = 0; k < 6; k++) { const [c, n, b] = GP[k % 4]; pad(c, g0 + 0.1 + k * gl, g0 + 0.1 + (k + 1) * gl, n, b, { vel: 0.4, strikes: [{ o: 0, v: 1 }, { o: gl / 2, v: 0.6 }] }); }
    pad('F', g1 - 0.6, g1, ['F3', 'A3', 'C4'], 'F2', { vel: 0.3 });
    a.big('VOCAL RUNS', a.w('gospel', 'runs') - 0.1, g1, { y: 462, size: 44, ...MONO, color: PINK });
    const tG = a.w('gospel', 'signature') + 0.1;
    syl('OH', g0 + 0.2, g1, { color: PINK });
    run(['C5', 'A4', 'C5'], g0 + 0.4, 0.3, { hold: 0.9, walker: false, vel: 0.18, show: false });
    const GR = ['F5', 'D5', 'C5', 'A4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5', 'F5', 'D5', 'C5', 'D5', 'C5', 'A4', 'G4', 'F4'];
    run(GR, tG, 0.1, { hold: g1 - tG - (GR.length - 1) * 0.1 - 0.3, t1: g1, color: PINK });

    // ---- why1: syllabic, one note per syllable ----
    const y10 = S('why1').t0, y11 = S('why1').t1;
    const SYL = ['ONE', 'NOTE', 'PER', 'SYL', 'LA', 'BLE'];
    const gS = a.grid(SYL.map(s => ({ label: s, color: TEAL, size: 46 })), y10 + 0.05, y11, { rows: 1, cols: 6, cw: 160, chh: 190, y: 560, caption: 'SYLLABIC · ONE NOTE EACH' });
    const tSy = a.w('why1', 'Syllabic') - 0.05, sl = (a.end('why1') - tSy) / 6;
    const SM = ['G4', 'A4', 'B4', 'C5', 'B4', 'A4'];
    SM.forEach((n, i) => { a.note(n, tSy + i * sl, sl * 0.9, { vel: 0.26, tone: VOICE }); gS.active.push({ t0: tSy + i * sl, t1: tSy + (i + 1) * sl, i }); });
    pad('G', y10 + 0.1, a.at('why1b'), ['G3', 'B3', 'D4'], 'G2', { vel: 0.3 });
    pad('C', a.at('why1b'), y11 - 0.1, ['E3', 'G3', 'C4'], 'C2', { vel: 0.3 });
    const tCl = a.w('why1b', 'Clear') - 0.05;
    ['G4', 'G4', 'E4', 'G4', 'C5'].forEach((n, i) => { a.note(n, tCl + i * 0.3, 0.27, { vel: 0.22, tone: VOICE }); gS.active.push({ t0: tCl + i * 0.3, t1: tCl + i * 0.3 + 0.3, i: i + 1 }); });
    a.big('CLEAR WORDS', tCl, y11, { y: 960, size: 56, ...MONO, color: TEAL });
    a.big('TELLS A STORY', a.w('why1b', 'story') - 0.1, y11, { y: 1050, size: 40, ...MONO, color: '#c9c9d2', blur: 0 });

    // ---- why2: melismatic, one syllable over many notes ----
    const y20 = S('why2').t0, y21 = S('why2').t1;
    a.grid([{ label: 'AH', sub: 'ONE SYLLABLE', color: GOLD, size: 64 }], y20 + 0.05, y21, { rows: 1, cols: 1, cw: 900, chh: 190, y: 520 });
    const NN = 16;
    const gN = a.grid([...Array(NN)].map(() => ({ label: '', color: GOLD })), y20 + 0.05, y21, { rows: 1, cols: NN, cw: 56, chh: 120, y: 730, caption: 'MELISMATIC · MANY NOTES' });
    const tMe = a.w('why2', 'many') - 0.1;
    const MR = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4', 'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5'];
    run(MR, tMe, 0.12, { g: gN, keep: y21, walker: false });
    pad('G', y20 + 0.1, tMe, ['G3', 'B3', 'D4'], 'G2', { vel: 0.3 });
    pad('C', tMe, y21 - 0.1, ['E3', 'G3', 'C4'], 'C2', { vel: 0.32 });
    const tV = a.w('why2b', 'voice') - 0.05;
    run(['G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'A4', 'C5'], tV, 0.14, { hold: y21 - tV - 7 * 0.14 - 0.4, walker: false });
    a.big('THE VOICE TAKES OVER', tV, y21, { y: 1030, size: 48, ...MONO, color: GOLD });

    // ---- why3: a run through the pentatonic, then blues scale, landing on a target note ----
    const r0 = S('why3').t0, r1 = S('why3').t1;
    a.scale(r0, 'C', [0, 4, 7]);
    const tPen = a.w('why3', 'pentatonic') - 0.05, tBl = a.w('why3', 'blues') - 0.05, tTg = a.w('why3b', 'target') - 0.05;
    a.scale(tPen, 'C', [0, 3, 5, 7, 10], { popIn: { t0: tPen, step: 0.06 } });
    a.scale(tBl, 'C', [0, 3, 5, 6, 7, 10], { popIn: { t0: tBl, step: 0.05 } });
    a.tag(0, tPen, tBl, 'PENTATONIC', { x: 540, y: 462, color: GOLD });
    a.tag(0, tBl, tTg, 'BLUES SCALE', { x: 540, y: 462, color: BLUE });
    a.tag(6, tBl + 0.2, tTg, 'BLUE NOTE', { color: BLUE, dr: -92 });
    pad('Cm7', r0 + 0.1, r1 - 0.2, ['Eb3', 'G3', 'Bb3'], 'C2', { vel: 0.32, strikes: [{ o: 0, v: 1 }, { o: 1.6, v: 0.6 }, { o: 3.2, v: 0.6 }, { o: 4.8, v: 0.6 }] });
    run(['C5', 'Bb4', 'G4', 'F4', 'Eb4', 'C4', 'Eb4', 'F4', 'G4'], a.w('why3', 'Runs') - 0.05, 0.11, { hold: 0.5, t1: tPen });
    run(['C5', 'Eb5', 'F5', 'G5', 'Bb5', 'G5', 'F5', 'Eb5', 'C5'], tPen + 0.3, 0.11, { hold: 0.3, t1: tBl });
    run(['G5', 'Gb5', 'F5', 'Eb5', 'C5', 'Bb4', 'C5', 'Eb5', 'F5', 'Gb5', 'F5', 'Eb5'], tBl + 0.2, 0.11, { hold: 0.2, t1: tTg, color: BLUE });
    const TG = ['G5', 'F5', 'Eb5', 'C5', 'Bb4', 'G4', 'Bb4', 'C5'];
    run(TG, tTg, 0.12, { hold: r1 - tTg - 7 * 0.12 - 0.3, t1: r1 });
    a.ring([0], tTg + 7 * 0.12, r1, { color: TEAL });
    a.tag(0, tTg, r1, 'TARGET', { color: TEAL, dr: -92 });

    // ---- why4: the word held (vibrato), then the melody blossoms ----
    const f0 = S('why4').t0, f1 = S('why4').t1;
    a.scale(f0, 'G', a.T.MAJOR);
    syl('OH', f0 + 0.1, f1, { color: GOLD });
    const tCo = a.w('why4', 'control') - 0.05, tEm = a.w('why4', 'emotion') - 0.05, tBlo = a.w('why4', 'blossoms') - 0.05;
    a.big('CONTROL', tCo, f1, { x: 300, y: 462, size: 44, ...MONO, color: TEAL });
    a.big('EMOTION', tEm, f1, { x: 780, y: 462, size: 44, ...MONO, color: PINK });
    const tHold = a.w('why4', 'word') - 0.05;
    pad('Em', f0 + 0.1, tHold, ['E3', 'G3', 'B3'], 'E2', { vel: 0.3 });
    pad('C', tHold, tBlo, ['E3', 'G3', 'C4'], 'C2', { vel: 0.32 });
    a.note('D5', tHold, tBlo - tHold, { vel: 0.27, tone: { ...VOICE, bend: vib(tBlo - tHold, 0.28) } });
    a.ring([2], tHold, tBlo, { color: GOLD });
    a.tag(2, tHold, tBlo, 'HELD', { color: GOLD, dr: -92 });
    pad('D', tBlo, tBlo + 1.4, ['F#3', 'A3', 'D4'], 'D2', { vel: 0.35 });
    pad('G', tBlo + 1.4, f1 - 0.1, ['G3', 'B3', 'D4'], 'G2', { vel: 0.38 });
    const BL = ['D5', 'E5', 'F#5', 'A5', 'G5', 'F#5', 'E5', 'D5', 'B4', 'A4', 'B4', 'D5', 'E5', 'D5', 'B4', 'G4'];
    run(BL, tBlo, 0.1, { hold: f1 - tBlo - 15 * 0.1 - 0.3, t1: f1 });

    // ---- why5: many traditions, a short run for each ----
    const m0 = S('why5').t0, m1 = S('why5').t1;
    const TR = [['CHANT', 'chant', TEAL], ['BAROQUE ARIAS', 'Baroque', GOLD], ['ARABIC SINGING', 'Arabic', ORANGE], ['INDIAN SINGING', 'Indian', VIOLET], ['GOSPEL', 'gospel', PINK]];
    const gT = a.grid(TR.map(([l, , c]) => ({ label: l, color: c, size: 44 })), m0 + 0.05, m1, { rows: 5, cols: 1, cw: 720, chh: 112, y: 470, revealStep: 0.08 });
    const tw = TR.map(([, w]) => a.w('why5', w) - 0.08);
    tw.forEach((t, i) => gT.active.push({ t0: t, t1: i < 4 ? tw[i + 1] : m1, i }));
    const RUNS = [
      ['D4', 'E4', 'F4', 'E4', 'D4'],
      ['D5', 'C#5', 'B4', 'A4', 'B4', 'C#5', 'D5'],
      ['D4', 'Eb4', 'F#4', 'G4', 'F#4', 'Eb4', 'D4'],
      ['D4', 'E4', 'F#4', 'A4', 'B4', 'A4', 'F#4'],
      ['F4', 'Ab4', 'Bb4', 'C5', 'Eb5', 'C5', 'Bb4', 'Ab4', 'F4'],
    ];
    RUNS.forEach((r, i) => {
      const t1 = i < 4 ? tw[i + 1] : m1 - 0.3, st = Math.min(0.13, (t1 - tw[i] - 0.3) / r.length);
      run(r, tw[i], st, { hold: i < 4 ? Math.max(0.15, t1 - tw[i] - (r.length - 1) * st - 0.05) : t1 - tw[i] - (r.length - 1) * st, walker: false, vel: 0.24 });
    });
    a.note('D2', m0 + 0.1, tw[4] - m0 - 0.1, { vel: 0.14, tone: { partials: [1, 0.3, 0.1], attack: 0.5, release: 0.4 } });
    pad('Fm', tw[4], m1 - 0.1, ['F3', 'Ab3', 'C4'], 'F2', { vel: 0.3 });

    // ---- essence: AH, one last run landing home ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'C', a.T.MAJOR);
    syl('AH', e0 + 0.1, e1, { color: GOLD });
    const tMany = a.w('essence', 'many') - 0.05, tLoud = a.w('essence', 'louder') - 0.05;
    a.big('1 SYLLABLE', e0 + 0.2, e1, { x: 300, y: 462, size: 40, ...MONO, color: TEAL });
    a.big('MANY NOTES', tMany, e1, { x: 780, y: 462, size: 40, ...MONO, color: GOLD });
    pad('F', e0 + 0.1, tMany, ['F3', 'A3', 'C4'], 'F2', { vel: 0.32 });
    run(['C5', 'A4'], e0 + 0.3, 0.45, { hold: tMany - e0 - 0.8, walker: false, vel: 0.22 });
    const ER = ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'A4', 'C5', 'D5', 'E5', 'D5', 'C5'];
    pad('G', tMany, tMany + ER.length * 0.12 - 0.12, ['G3', 'B3', 'D4'], 'G2', { vel: 0.34 });
    const tLand = tMany + (ER.length - 1) * 0.12;
    run(ER, tMany, 0.12, { hold: Math.min(3.5, e1 - tLand - 0.4), t1: e1 });
    pad('C', tLand, e1 - 0.3, ['E3', 'G3', 'C4'], 'C2', { vel: 0.5 });
    a.ring([0], tLand, e1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
