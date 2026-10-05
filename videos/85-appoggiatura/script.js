// The appoggiatura: a note outside the chord, on a strong beat, that resolves by step - and why it gives chills.
// Brief/copyright: Someone Like You is played as chords only. All appoggiaturas heard are our own examples.
module.exports = {
  slug: 'appoggiatura',
  title: 'Why Songs Give You Chills',
  segments: [
    { id: 'hook',    text: 'Why do some songs give you chills? Meet the note that leans.' },
    { id: 'what',    text: "It's the appoggiatura, from the Italian appoggiare: to lean." },
    { id: 'what2',   text: 'A note outside the chord lands on a strong beat...' },
    { id: 'what3',   text: 'then resolves by step into the chord.' },
    { id: 'adele',   text: "Adele's Someone Like You: A, C sharp minor, F sharp minor, D." },
    { id: 'wsj',     text: 'In 2012, the Wall Street Journal asked why it makes people cry, in Anatomy of a Tear-Jerker.' },
    { id: 'wsj2',    text: 'It pointed to the appoggiaturas.' },
    { id: 'why1',    text: 'So why does it work? Over a C chord, sing D on the beat: a clash.' },
    { id: 'why1b',   text: 'Then fall to C. Release.' },
    { id: 'why2',    text: 'Over G, sing C, then fall to B.' },
    { id: 'why3',    text: "It's tension and release in miniature." },
    { id: 'why3b',   text: 'You expect a chord note, get a wrong one, and the resolution comes slightly late.' },
    { id: 'slob',    text: 'In 1991, psychologist John Sloboda asked listeners which passages gave them tears or shivers.' },
    { id: 'slob2',   text: 'Many of them contained appoggiaturas.' },
    { id: 'slob3',   text: 'Others had unexpected harmonies or sudden changes in loudness.' },
    { id: 'chain',   text: 'Chain them in a row: wave after wave of tension and release.' },
    { id: 'essence', text: 'Lean on the wrong note, then let it fall. That tiny release gives you chills.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'WHY SONGS GIVE YOU CHILLS', title: 'THE APPOGGIATURA', accent: true, tonic: 0, min: 5.2 },
    { id: 'what', segs: ['what'], label: 'FROM THE ITALIAN', title: 'APPOGGIARE', tonic: 0, tail: 0.5 },
    { id: 'what2', segs: ['what2', 'what3'], label: 'THE RECIPE', title: 'LEAN, THEN FALL', tonic: 0, gap: 0.25, tail: 0.6 },
    { id: 'adele', segs: ['adele'], label: 'YOU HEAR IT IN', title: 'Someone Like You', sub: 'Adele · 2011 · in A', tonic: 9, row: ['A', 'C#m', 'F#m', 'D'], tail: 1.6 },
    { id: 'wsj', segs: ['wsj', 'wsj2'], label: 'WHY DOES IT MAKE US CRY?', title: 'A TEAR-JERKER', circle: false, tonic: 9, gap: 0.25, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'CLASH, THEN RELEASE', tonic: 0, gap: 0.2, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'OVER G', tonic: 0, tail: 0.8 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'IN MINIATURE', title: 'TENSION, RELEASE', circle: false, tonic: 0, gap: 0.3, tail: 0.6 },
    { id: 'slob', segs: ['slob', 'slob2', 'slob3'], label: 'A PSYCHOLOGY STUDY', title: 'JOHN SLOBODA · 1991', circle: false, tonic: 0, gap: 0.2, tail: 0.5 },
    { id: 'chain', segs: ['chain'], label: 'A CHAIN', title: 'WAVE AFTER WAVE', tonic: 0, row: ['C', 'Am', 'F', 'G', 'C'], tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LEAN, THEN FALL', accent: true, tonic: 0, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const V = {
      C: [['C4', 'E4', 'G4'], 'C3'], G: [['B3', 'D4', 'G4'], 'G2'], Am: [['C4', 'E4', 'A4'], 'A2'], F: [['C4', 'F4', 'A4'], 'F2'],
      A: [['A3', 'C#4', 'E4'], 'A2'], 'C#m': [['G#3', 'C#4', 'E4'], 'C#3'], 'F#m': [['A3', 'C#4', 'F#4'], 'F#2'], D: [['A3', 'D4', 'F#4'], 'D3'],
    };
    const chd = (c, t0, t1, o = {}) => a.ch(c, t0, t1, { notes: V[c][0], bass: V[c][1], ...o });
    const pcOf = n => n.replace(/\d/, '');
    // one appoggiatura: wrong note at tW (with a soft kick for the strong beat), resolution at tR
    function lean(wrong, right, tW, tR, t1, o = {}) {
      const v = o.vel ?? 0.4;
      a.note(wrong, tW, tR - tW, { vel: v * 1.08 });
      a.note(right, tR, Math.max(0.6, (t1 - tR) * 0.9), { vel: v * 0.9 });
      if (o.kick !== false) a.perc('kick', tW, 0.35);
      if (o.marks !== false) {
        a.ring([pcOf(wrong)], tW, tR + 0.25, { color: RED });
        a.arc(pcOf(wrong), pcOf(right), tR - 0.05, t1, { steps: o.steps ?? -2, color: TEAL, dr: 30 });
        a.ring([pcOf(right)], tR, t1, { color: TEAL });
      }
    }

    // ---- hook: C chord, D leans, falls to C (cover) ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'C', [0, 4, 7], { popIn: { t0: 0.2, step: 0.1 } });
    chd('C', 0.3, h1, { vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: 2.4, v: 0.7 }] });
    a.note('D5', 0.35, 1.5, { vel: 0.44 }); a.note('C5', 1.85, 0.9, { vel: 0.36 });
    a.ring(['D'], 0.35, h1, { color: RED });
    a.tag('D', 0.4, h1, 'LEAN', { dr: -92, color: RED });
    a.arc('D', 'C', 0.5, h1, { steps: -2, color: TEAL, dr: 30 });
    a.tag(0, 0.45, h1, 'WRONG NOTE → CHORD NOTE', { x: 540, y: 462, color: GOLD });
    lean('D5', 'C5', 2.7, 3.7, h1, { marks: false, vel: 0.38 });

    // ---- what: appoggiare, to lean ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'C', [0, 4, 7]);
    chd('C', w0 + 0.1, w1, { vel: 0.5 });
    a.big('APPOGGIARE = TO LEAN', a.w('what', 'appoggiare') - 0.05, w1, { y: 462, size: 44, ...MONO, color: GOLD });
    lean('D5', 'C5', a.w('what', 'lean') - 0.05, a.w('what', 'lean') + 0.75, w1, { vel: 0.36 });

    // ---- what2/3: outside the chord, on a strong beat, resolves by step ----
    const r0 = S('what2').t0, r1 = S('what2').t1;
    chd('C', r0 + 0.1, r1, { vel: 0.55, strikes: [{ o: 0, v: 1 }] });
    const tOut = a.w('what2', 'outside') - 0.05, tBeat = a.w('what2', 'strong') - 0.05, tStep = a.w('what3', 'step') - 0.05;
    a.ring(['D'], tOut, tStep + 0.2, { color: RED });
    a.tag('D', tOut, r1, 'NOT IN THE CHORD', { dr: -92, color: RED });
    chd('C', tBeat, tStep, { vel: 0.7, shape: true });
    a.note('D5', tBeat, tStep - tBeat, { vel: 0.44 });
    a.perc('kick', tBeat, 0.6);
    a.big('ON A STRONG BEAT', tBeat, tStep, { y: 462, size: 44, ...MONO, color: RED });
    chd('C', tStep, r1, { vel: 0.5 });
    a.note('C5', tStep, r1 - tStep - 0.1, { vel: 0.36 });
    a.arc('D', 'C', tStep, r1, { steps: -2, color: TEAL, dr: 30, label: 'ONE STEP', labelR: 165 });
    a.ring(['C'], tStep, r1, { color: TEAL });
    a.big('RESOLVES BY STEP', tStep, r1, { y: 462, size: 44, ...MONO, color: TEAL });

    // ---- adele (chords only): A - C#m - F#m - D on the words, then once more ----
    const d0 = S('adele').t0, d1 = S('adele').t1;
    a.scale(d0, 'A', a.T.MAJOR);
    const AD = ['A', 'C#m', 'F#m', 'D'];
    const dw = [a.w('adele', 'A'), a.w('adele', 'C'), a.w('adele', 'F'), a.w('adele', 'D')].map(t => t - 0.05);
    chd('A', d0 + 0.1, dw[0], { row: 0, vel: 0.45 });
    const dEnd = a.end('adele') + 0.2;
    AD.forEach((c, i) => chd(c, dw[i], i < 3 ? dw[i + 1] : dEnd, { row: i, vel: 0.7 }));
    const dl = (d1 - dEnd) / 4;
    AD.forEach((c, i) => chd(c, dEnd + i * dl, dEnd + (i + 1) * dl, { row: i, vel: 0.75, strikes: [0, 0.25, 0.5, 0.75].map(k => ({ o: k * dl, v: k ? 0.5 : 1 })) }));

    // ---- wsj: 2012, Anatomy of a Tear-Jerker ----
    const j0 = S('wsj').t0, j1 = S('wsj').t1;
    a.big('2012', j0 + 0.2, j1, { y: 620, size: 160, color: GOLD, blur: 32 });
    a.big('THE WALL STREET JOURNAL', a.w('wsj', 'Wall') - 0.05, j1, { y: 790, size: 38, ...MONO, color: '#ffffff', blur: 6 });
    a.big('“ANATOMY OF A TEAR-JERKER”', a.w('wsj', 'Anatomy') - 0.05, j1, { y: 880, size: 40, color: '#ffffff', blur: 8 });
    a.big('→ APPOGGIATURAS', a.w('wsj2', 'appoggiaturas') - 0.4, j1, { y: 1010, size: 52, ...MONO, color: TEAL, blur: 12 });
    const jl = (j1 - j0 - 0.2) / 4;
    AD.forEach((c, i) => chd(c, j0 + 0.1 + i * jl, j0 + 0.1 + (i + 1) * jl, { vel: 0.4, shape: false }));

    // ---- why1: over C, D on the beat (clash), then C (release) ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    a.scale(y0, 'C', [0, 4, 7]);
    const tCc = a.w('why1', 'C') - 0.05, tD = a.w('why1', 'D') - 0.05, tFall = a.w('why1b', 'fall') - 0.05;
    chd('C', y0 + 0.1, tFall, { vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: tD - y0 - 0.1, v: 0.8 }] });
    a.note('D5', tD, tFall - tD, { vel: 0.44 }); a.perc('kick', tD, 0.5);
    a.ring(['D'], tD, tFall + 0.2, { color: RED });
    a.tag('D', a.w('why1', 'clash') - 0.05, tFall + 0.2, 'CLASH', { dr: -92, color: RED });
    chd('C', tFall, y1, { vel: 0.55 });
    a.note('C5', a.w('why1b', 'C') - 0.05, y1 - a.w('why1b', 'C'), { vel: 0.36 });
    a.arc('D', 'C', a.w('why1b', 'C') - 0.05, y1, { steps: -2, color: TEAL, dr: 30 });
    a.ring(['C'], a.w('why1b', 'C') - 0.05, y1, { color: TEAL });
    a.tag('C', a.w('why1b', 'Release') - 0.05, y1, 'RELEASE', { dr: -92, color: TEAL });

    // ---- why2: over G, C then B ----
    const g0 = S('why2').t0, g1 = S('why2').t1;
    a.scale(g0, 'G', [0, 4, 7]);
    const tGc = a.w('why2', 'C') - 0.05, tB = a.w('why2', 'B') - 0.05;
    chd('G', g0 + 0.1, g1, { vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: tGc - g0 - 0.1, v: 0.8 }] });
    a.note('C5', tGc, tB - tGc, { vel: 0.44 }); a.perc('kick', tGc, 0.5);
    a.ring(['C'], tGc, tB + 0.2, { color: RED });
    a.tag('C', tGc, tB + 0.2, 'CLASH', { dr: -92, color: RED });
    a.note('B4', tB, g1 - tB - 0.1, { vel: 0.36 });
    a.arc('C', 'B', tB, g1, { steps: -1, color: TEAL, dr: 30 });
    a.ring(['B'], tB, g1, { color: TEAL });
    a.tag('B', tB + 0.2, g1, 'RELEASE', { dr: -92, color: TEAL });

    // ---- why3: expect, wrong note, late resolution ----
    const m0 = S('why3').t0, m1 = S('why3').t1;
    const g3 = a.grid([
      { label: 'EXPECT', sub: 'A CHORD NOTE', color: GREY, size: 44, subSize: 20 },
      { label: 'WRONG', sub: 'TENSION', color: RED, size: 44, subSize: 20 },
      { label: 'RESOLVE', sub: 'A LITTLE LATE', color: TEAL, size: 44, subSize: 20 },
    ], m0 + 0.1, m1, { rows: 1, cols: 3, cw: 320, chh: 230, y: 560, revealStep: 0.15 });
    const tE = a.w('why3b', 'expect') - 0.05, tWr = a.w('why3b', 'wrong') - 0.05, tRes = a.w('why3b', 'resolution') - 0.05;
    g3.active.push({ t0: tE, t1: tWr, i: 0 }, { t0: tWr, t1: tRes, i: 1 }, { t0: tRes, t1: m1, i: 2 });
    a.big('TENSION → RELEASE', a.w('why3', 'tension') - 0.05, tE, { y: 900, size: 52, ...MONO, color: GOLD });
    chd('C', m0 + 0.1, tWr, { vel: 0.5, shape: false });
    lean('D5', 'C5', m0 + 0.6, m0 + 1.6, tE, { marks: false, vel: 0.32 });
    chd('C', tWr, m1, { vel: 0.6, shape: false });
    a.note('D5', tWr, tRes - tWr, { vel: 0.42 }); a.perc('kick', tWr, 0.45);
    a.note('C5', tRes + 0.25, m1 - tRes - 0.3, { vel: 0.38 });
    a.big('SLIGHTLY LATE', a.w('why3b', 'late') - 0.05, m1, { y: 900, size: 52, ...MONO, color: TEAL });

    // ---- slob: Sloboda, 1991 - tears or shivers ----
    const s0 = S('slob').t0, s1 = S('slob').t1;
    const tPas = a.w('slob', 'passages') - 0.1, tS2 = a.at('slob2') - 0.05;
    a.big('1991', s0 + 0.2, tS2, { y: 620, size: 140, color: GOLD, blur: 32 });
    a.big('PSYCHOLOGIST JOHN SLOBODA', a.w('slob', 'psychologist') - 0.05, tPas, { y: 790, size: 36, ...MONO, color: '#ffffff', blur: 6 });
    a.big('WHICH PASSAGES GIVE YOU', tPas, tS2, { y: 780, size: 34, ...MONO, color: GREY, blur: 0 });
    a.big('TEARS OR SHIVERS?', tPas + 0.3, tS2, { y: 870, size: 64, color: '#ffffff', blur: 16 });
    const g4 = a.grid([
      { label: 'APPOGGIATURAS', sub: 'MANY PASSAGES', color: TEAL, size: 46, subSize: 22 },
      { label: 'UNEXPECTED HARMONY', sub: 'OTHERS', color: BLUE, size: 34, subSize: 22 },
      { label: 'SUDDEN LOUDNESS', sub: 'OTHERS', color: PINK, size: 34, subSize: 22 },
    ], a.at('slob2') - 0.05, s1, { rows: 3, cols: 1, cw: 680, chh: 160, y: 500, revealStep: 0.12 });
    g4.active.push({ t0: a.w('slob2', 'appoggiaturas') - 0.1, t1: a.at('slob3'), i: 0 });
    g4.active.push({ t0: a.w('slob3', 'harmonies') - 0.3, t1: s1, i: 1 }, { t0: a.w('slob3', 'loudness') - 0.3, t1: s1, i: 2 });
    // soft pad with our own leaning notes underneath
    const PAD = [['C', 'D5', 'C5'], ['Am', 'B4', 'A4'], ['F', 'G4', 'F4'], ['G', 'A4', 'G4']];
    const pl = (s1 - s0 - 0.2) / 6;
    for (let i = 0; i < 6; i++) {
      const [c, w, r] = PAD[i % 4], t = s0 + 0.1 + i * pl;
      chd(c, t, t + pl, { vel: 0.4, shape: false });
      lean(w, r, t, t + pl * 0.45, t + pl, { marks: false, kick: false, vel: 0.26 });
    }

    // ---- chain: our own chain of appoggiaturas over C - Am - F - G - C ----
    const c0 = S('chain').t0 + 0.1, c1 = S('chain').t1;
    a.scale(S('chain').t0, 'C', a.T.MAJOR);
    const CH = [['C', 'D5', 'C5', -2], ['Am', 'B4', 'A4', -2], ['F', 'G4', 'F4', -2], ['G', 'A4', 'G4', -2], ['C', 'D5', 'C5', -2]];
    const cl = (c1 - c0 - 0.3) / CH.length;
    CH.forEach(([c, w, r, st], i) => {
      const t = c0 + i * cl;
      chd(c, t, t + cl, { row: i, vel: 0.55 });
      lean(w, r, t, t + cl * 0.45, t + cl, { steps: st, vel: 0.4 });
    });

    // ---- essence: lean on D, fall to C, land ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'C', [0, 4, 7]);
    const tFl = a.w('essence', 'fall') - 0.05;
    chd('C', e0 + 0.1, tFl, { vel: 0.55 });
    a.note('D5', a.w('essence', 'wrong') - 0.05, tFl - a.w('essence', 'wrong'), { vel: 0.44 });
    a.ring(['D'], a.w('essence', 'wrong') - 0.05, tFl + 0.2, { color: RED });
    a.perc('kick', a.w('essence', 'wrong') - 0.05, 0.4);
    chd('C', tFl, e1 - 0.3, { notes: ['C4', 'E4', 'G4'], bass: 'C2', vel: 0.7 });
    a.note('C5', tFl, e1 - tFl - 0.4, { vel: 0.38 });
    a.arc('D', 'C', tFl, e1, { steps: -2, color: TEAL, dr: 30 });
    a.ring(['C'], tFl, e1, { color: TEAL });
    a.tag('C', a.w('essence', 'release') - 0.05, e1, 'CHILLS', { dr: -92, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
