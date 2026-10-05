// The whole-tone scale: six notes a whole step apart, no half steps, no leading tone - no gravity.
module.exports = {
  slug: 'whole-tone',
  title: 'The Whole Tone Scale',
  segments: [
    { id: 'hook',    text: 'Six notes, all the same distance apart. No home, no gravity... just a dream.' },
    { id: 'what',    text: 'Start on C and climb only in whole steps: C, D, E, F sharp, G sharp, A sharp.' },
    { id: 'what2',   text: "One more step, and you're back on C. Not a single half step. That's the whole tone scale." },
    { id: 'debussy', text: 'Claude Debussy built much of his piano prelude Voiles on it.' },
    { id: 'film',    text: 'And film and TV use whole tone runs for dreams and flashbacks.' },
    { id: 'why1',    text: 'So why does it float? In a major scale, B sits a half step under C and pulls up into it.' },
    { id: 'why2',    text: "Here there's no half step, so no leading tone. Nothing pulls you home." },
    { id: 'hex',     text: 'It cuts the octave into six equal steps. On the circle, a perfect hexagon.' },
    { id: 'two',     text: 'Shift it up a half step, and you get the only other one.' },
    { id: 'two2',    text: "Shift again, and you're back to the first. Only two whole tone scales exist." },
    { id: 'aug',     text: 'Stack every other note into a chord, and it is always augmented: major thirds on major thirds.' },
    { id: 'essence', text: 'Equal steps, no gravity. The sound of a dream.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SIX EQUAL STEPS', title: 'THE WHOLE TONE SCALE', accent: true, tonic: 0, min: 5.6, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ONLY WHOLE STEPS', title: 'C D E F# G# A#', tonic: 0, tail: 0.5 },
    { id: 'what2', segs: ['what2'], label: 'NO HALF STEPS', title: 'BACK TO C', tonic: 0, tail: 0.9 },
    { id: 'debussy', segs: ['debussy'], label: 'YOU HEAR IT IN', title: 'Voiles', sub: 'Debussy · Préludes, Book 1 · 1909–10', tonic: 0, tail: 4.6 },
    { id: 'film', segs: ['film'], label: 'YOU HEAR IT IN', title: 'Dream Sequences', sub: 'Film & TV · flashbacks', tonic: 0, tail: 3.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT FLOATS', title: 'THE LEADING TONE', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT FLOATS', title: 'NO PULL HOME', tonic: 0, tail: 1.2 },
    { id: 'hex', segs: ['hex'], label: 'TWELVE ÷ SIX', title: 'A PERFECT HEXAGON', tonic: 0, tail: 1.2 },
    { id: 'two', segs: ['two', 'two2'], label: 'SHIFT IT', title: 'ONLY TWO SCALES', tonic: 0, gap: 0.4, tail: 1.2 },
    { id: 'aug', segs: ['aug'], label: 'BUILD A CHORD', title: 'ALWAYS AUGMENTED', tonic: 0, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE SOUND OF A DREAM', accent: true, tonic: 0, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', VIOLET = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const WT = [0, 2, 4, 6, 8, 10];
    const HEX1 = ['C', 'D', 'E', 'F#', 'G#', 'A#'], HEX2 = ['C#', 'D#', 'F', 'G', 'A', 'B'];
    const up = (n, k = 1) => n.replace(/-?\d$/, d => String(+d + k));
    // a rippling whole-tone run, up and down, like a harp
    const ripple = (notes, t0, t1, step = 0.14, vel = 0.18, show = false) => {
      const seq = [...notes, ...notes.map(n => up(n)), up(notes[0], 2)];
      const wave = [...seq, ...seq.slice(1, -1).reverse()];
      for (let t = t0, i = 0; t < t1 - 0.1; t += step, i++) a.note(wave[i % wave.length], t, step * 3, { vel, show });
    };
    const R1 = ['C4', 'D4', 'E4', 'F#4', 'G#4', 'A#4'];
    const R2 = ['C#4', 'D#4', 'F4', 'G4', 'A4', 'B4'];

    // ---- hook: six dots pop in, a hexagon draws, a harp-like shimmer ----
    const h1 = S('hook').t1;
    a.scale(0.2, 'C', WT, { popIn: { t0: 0.3, step: 0.18 } });
    a.note('A#1', 0.3, h1 - 0.5, { vel: 0.22, show: false });
    ripple(R1, 0.3, h1, 0.15, 0.18, true);
    a.poly(HEX1, 1.4, h1, { color: GOLD, dash: true, width: 3, alpha: 0.65 });
    a.ring(['C'], a.w('hook', 'home'), a.w('hook', 'gravity'), { color: '#8a8a92' });

    // ---- what: walk up in whole steps on the spoken names ----
    const names = ['C', 'D', 'E', 'F', 'G', 'A'];
    const tn = names.map((n, i) => a.w('what', n, i === 0 ? 1 : 0));
    a.scale(S('what').t0, 'C', WT);
    HEX1.forEach((n, i) => a.note(R1[i], tn[i], 0.9, { vel: 0.34 }));
    a.walker(HEX1.map((n, i) => [tn[i], n]), { t1: S('what').t1, dr: 34, color: '#ffffff' });
    for (let i = 1; i < 6; i++) a.arc(HEX1[i - 1], HEX1[i], tn[i], S('what').t1, { steps: 2, color: TEAL, dr: 30 });
    a.tag(0, a.w('what', 'whole'), S('what').t1, 'WHOLE STEP = 2 HALF STEPS', { x: 540, y: 462, color: TEAL });
    a.tag('G#', tn[4], S('what').t1, 'G#', { dr: -75, color: '#ffffff' });
    a.tag('A#', tn[5], S('what').t1, 'A#', { dr: -75, color: '#ffffff' });

    // ---- what2: the sixth step closes the loop on C ----
    const w0 = S('what2').t0, tBack = a.w('what2', 'back');
    a.scale(w0, 'C', WT);
    for (let i = 1; i < 6; i++) a.arc(HEX1[i - 1], HEX1[i], w0, S('what2').t1, { steps: 2, color: TEAL, dr: 30 });
    a.walker([[w0 + 0.05, 'A#'], [tBack, 'C']], { t1: a.w('what2', 'single'), dr: 34, color: '#ffffff' });
    a.arc('A#', 'C', tBack, S('what2').t1, { steps: 2, color: GOLD, dr: 30 });
    a.note('C5', tBack, 1.0, { vel: 0.36 });
    a.big('NO HALF STEPS', a.w('what2', 'single'), S('what2').t1, { y: 462, size: 52, ...MONO, color: GOLD });
    const tW = a.w('what2', 'whole');
    a.ch('Caug', tW - 0.05, S('what2').t1, { notes: ['C4', 'E4', 'G#4'], bass: false, hideName: true, shape: false, vel: 0.35 });
    ripple(R1, tW, S('what2').t1, 0.12, 0.16);

    // ---- Voiles (public domain): a floating whole-tone texture over a low B flat pedal ----
    const d0 = S('debussy').t0 + 0.1, d1 = S('debussy').t1;
    a.scale(S('debussy').t0, 'C', WT);
    a.note('A#1', d0, d1 - d0 - 0.2, { vel: 0.3, show: false });
    a.note('A#2', d0 + 2.6, d1 - d0 - 2.8, { vel: 0.18, show: false });
    // drifting parallel major thirds, all inside the scale
    const THIRDS = [['G#4', 'C5'], ['F#4', 'A#4'], ['E4', 'G#4'], ['D4', 'F#4'], ['E4', 'G#4'], ['F#4', 'A#4'], ['G#4', 'C5'], ['F#4', 'A#4'],
      ['E4', 'G#4'], ['D4', 'F#4'], ['C4', 'E4'], ['D4', 'F#4']];
    const ds = (d1 - d0 - 0.6) / THIRDS.length;
    THIRDS.forEach(([lo, hi], i) => { a.note(lo, d0 + i * ds, ds * 1.6, { vel: 0.26 }); a.note(hi, d0 + i * ds, ds * 1.6, { vel: 0.26 }); });
    a.poly(HEX1, d0, d1, { color: GOLD, dash: true, width: 3, alpha: 0.5 });
    a.ring(['A#'], a.w('debussy', 'built'), d1, { color: VIOLET });
    a.tag('A#', a.w('debussy', 'built') + 0.2, d1, 'LOW Bb PEDAL', { color: VIOLET, dr: -92 });

    // ---- film: wavy harp runs, up and down ----
    const f0 = S('film').t0 + 0.1, f1 = S('film').t1;
    a.scale(S('film').t0, 'C', WT);
    a.note('C2', f0, f1 - f0, { vel: 0.18, show: false });
    const RUN = ['C4', 'D4', 'E4', 'F#4', 'G#4', 'A#4', 'C5', 'D5', 'E5', 'F#5', 'G#5', 'A#5'];
    const tRun = f0 + 0.3, rs = 0.075;
    const runs = [...RUN, ...RUN.slice(0, -1).reverse(), ...RUN.slice(1), ...RUN.slice(0, -1).reverse()];
    runs.forEach((n, i) => a.note(n, tRun + i * rs, 0.35, { vel: 0.17 }));
    const tRun2 = a.end('film') + 0.1, rs2 = Math.min(0.065, (f1 - tRun2 - 0.3) / runs.length);
    runs.forEach((n, i) => a.note(n, tRun2 + i * rs2, 0.35, { vel: 0.2 }));
    a.walker(runs.map((n, i) => [tRun + i * rs, n.replace(/\d/, '')]).filter((_, i) => i % 2 === 0)
      .concat(runs.map((n, i) => [tRun2 + i * rs2, n.replace(/\d/, '')]).filter((_, i) => i % 2 === 0)), { t1: f1, dr: 34, color: GOLD });
    a.tag(0, a.w('film', 'dreams'), f1, 'DREAMS · FLASHBACKS', { x: 540, y: 462, color: GOLD });
    a.ch('Caug', tRun + runs.length * rs, f1, { notes: ['C4', 'E4', 'G#4', 'C5'], bass: 'C2', label: 'C+', vel: 0.5 });

    // ---- why1: in C major, B leans up into C (the leading tone) ----
    const y0 = S('why1').t0, tB = a.w('why1', 'B'), tPull = a.w('why1', 'pulls');
    a.scale(y0, 'C', a.T.MAJOR);
    a.ch('G', y0 + 0.1, tPull, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.6, hideName: true });
    a.ring(['B'], tB, S('why1').t1, { color: RED });
    a.note('B4', tB, 0.7, { vel: 0.34 });
    a.arc('B', 'C', tPull, S('why1').t1, { steps: 1, color: RED, dr: 30 });
    a.tag('B', tPull, S('why1').t1, 'LEADING TONE', { color: RED, dr: -92 });
    a.ch('C', tPull + 0.2, S('why1').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.75 });

    // ---- why2: in the whole tone scale, A# is a whole step away - no pull ----
    const z0 = S('why2').t0, tNo = a.w('why2', 'no'), tHome = a.w('why2', 'home');
    a.scale(z0, 'C', WT);
    a.arc('A#', 'C', tNo, S('why2').t1, { steps: 2, color: TEAL, dr: 30 });
    a.tag('A#', tNo + 0.2, S('why2').t1, 'A WHOLE STEP', { color: TEAL, dr: -92 });
    a.ring(['C'], a.w('why2', 'Nothing'), S('why2').t1, { color: '#8a8a92' });
    a.tag('C', a.w('why2', 'Nothing'), S('why2').t1, 'HOME?', { color: '#8a8a92', dr: -92 });
    const FLOAT = [['Caug', 'C+', ['C4', 'E4', 'G#4']], ['Daug', 'D+', ['D4', 'F#4', 'A#4']], ['Eaug', 'E+', ['E4', 'G#4', 'C5']], ['Daug', 'D+', ['D4', 'F#4', 'A#4']]];
    const fl = (S('why2').t1 - z0 - 0.1) / FLOAT.length;
    FLOAT.forEach(([c, lb, n], i) => a.ch(c, z0 + 0.1 + i * fl, z0 + 0.1 + (i + 1) * fl, { notes: n, bass: false, label: lb, vel: 0.55 }));
    ripple(R1, tHome, S('why2').t1, 0.13, 0.13);

    // ---- hex: six equal steps, a perfect hexagon ----
    const x0 = S('hex').t0, tSix = a.w('hex', 'six'), tHex = a.w('hex', 'hexagon');
    a.scale(x0, 'C', WT);
    a.poly(HEX1, x0 + 0.1, tHex - 0.3, { color: GOLD, dash: true, width: 3, alpha: 0.5 });
    HEX1.forEach((n, i) => { const t = tSix + i * 0.16; a.note(R1[i], t, 1.2, { vel: 0.24 }); a.arc(n, HEX1[(i + 1) % 6], t, S('hex').t1, { steps: 2, color: TEAL, dr: 30 }); });
    a.big('12 ÷ 6 = 2', a.w('hex', 'equal'), S('hex').t1, { y: 462, size: 56, ...MONO, color: GOLD });
    a.poly(HEX1, tHex - 0.3, S('hex').t1, { color: GOLD, dash: false, glow: true, width: 5, alpha: 0.9, fill: true });
    a.ch('Caug', tHex - 0.2, S('hex').t1, { notes: ['C4', 'E4', 'G#4', 'D5'], bass: 'C2', vel: 0.45, shape: false, hideName: true });

    // ---- two: rotate by a half step -> the other scale; once more -> the first again ----
    const t0 = S('two').t0, tShift = a.w('two', 'Shift'), tOther = a.w('two', 'other');
    const tAgain = a.w('two2', 'again'), tFirst = a.w('two2', 'first'), tOnly = a.w('two2', 'Only');
    a.scale(t0, 'C', WT);
    a.scale(tShift + 0.2, 'C#', WT);
    a.scale(tAgain, 'D', WT);
    a.poly(HEX1, t0, tShift + 0.2, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.85 });
    a.poly(HEX2, tShift + 0.4, tAgain, { color: TEAL, dash: false, glow: true, width: 4, alpha: 0.85 });
    a.big('+ 1 HALF STEP', tShift + 0.2, tOther, { y: 462, size: 52, ...MONO, color: TEAL });
    a.big('C# D# F G A B', tOther, tAgain, { y: 462, size: 50, ...MONO, color: TEAL });
    ripple(R2, tShift + 0.4, tAgain, 0.13, 0.16, true);
    a.poly(HEX1, tAgain + 0.4, S('two').t1, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.85 });
    a.big('SAME AS THE FIRST', tFirst, tOnly, { y: 462, size: 48, ...MONO, color: GOLD });
    ripple(['D4', 'E4', 'F#4', 'G#4', 'A#4', 'C5'], tAgain + 0.4, tOnly, 0.13, 0.16, true);
    a.poly(HEX2, tOnly, S('two').t1, { color: TEAL, dash: false, glow: true, width: 4, alpha: 0.85 });
    a.scale(tOnly, 'C', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    a.big('ONLY 2', tOnly, S('two').t1, { y: 450, size: 52, ...MONO, color: '#ffffff' });

    // ---- aug: every other note -> augmented triangles inside the hexagon ----
    const g0 = S('aug').t0, tStack = a.w('aug', 'Stack'), tAug = a.w('aug', 'augmented'), tMaj = a.w('aug', 'major');
    a.scale(g0, 'C', WT);
    a.poly(HEX1, g0, S('aug').t1, { color: GOLD, dash: true, width: 3, alpha: 0.45 });
    const AUGS = [['Caug', 'C+', ['C4', 'E4', 'G#4'], 'C3'], ['Daug', 'D+', ['D4', 'F#4', 'A#4'], 'D3'], ['Eaug', 'E+', ['E4', 'G#4', 'C5'], 'E3'], ['F#aug', 'F#+', ['F#4', 'A#4', 'D5'], 'F#2']];
    const al = (S('aug').t1 - tStack) / AUGS.length;
    AUGS.forEach(([c, lb, n, b], i) => a.ch(c, tStack + i * al, tStack + (i + 1) * al, { notes: n, bass: b, label: lb, vel: 0.8 }));
    a.tag(0, tAug, S('aug').t1, 'AUGMENTED', { x: 540, y: 462, color: PINK });
    a.arc('C', 'E', tMaj, tStack + al, { steps: 4, color: PINK, dr: 30 });
    a.arc('E', 'G#', tMaj + 0.3, tStack + al, { steps: 4, color: PINK, dr: 30 });

    // ---- essence: the shimmer one last time, floating on C+ ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'C', WT);
    a.poly(HEX1, e0, e1, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.8 });
    a.ch('Caug', e0, e1 - 0.3, { notes: ['C4', 'E4', 'G#4', 'D5'], bass: 'A#1', label: 'C+', vel: 0.5, shape: false });
    ripple(R1, e0 + 0.2, a.at('cta') + 1.2, 0.15, 0.15, true);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
