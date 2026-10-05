// Three-chord rock: I - IV - V, the three chords that hold every note of the key.
module.exports = {
  slug: 'three-chord-rock',
  title: 'Three-Chord Rock',
  segments: [
    { id: 'hook',    text: "Three chords. That's all it takes to write a rock and roll classic." },
    { id: 'what',    text: 'Build chords on notes one, four and five of the scale.' },
    { id: 'what2',   text: "In C, that's C, F and G." },
    { id: 'bamba',   text: 'You hear them in La Bamba...' },
    { id: 'twist',   text: 'Twist and Shout...' },
    { id: 'wild',    text: 'Wild Thing...' },
    { id: 'louie',   text: 'and Louie Louie, where the five turns minor.' },
    { id: 'why1',    text: 'So why these three? Look at their notes.' },
    { id: 'why1b',   text: 'C, E, G... F, A, C... G, B, D.' },
    { id: 'why1c',   text: "Together, that's every note of the C major scale." },
    { id: 'why2',    text: 'So they can harmonize almost any simple melody in the key.' },
    { id: 'why3',    text: "On the circle of fifths, F and G are C's neighbors." },
    { id: 'why3b',   text: 'One step each way from home.' },
    { id: 'why4',    text: 'G to C, five to one, is the strongest pull home.' },
    { id: 'why5',    text: 'F to C is the softer amen.' },
    { id: 'roots',   text: 'Rock, blues, folk and country all grew from these three chords.' },
    { id: 'essence', text: 'Three chords, every note of the key.' },
    { id: 'essence2', text: 'The smallest complete toolkit in music.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'I – IV – V', title: 'THREE-CHORD ROCK', accent: true, tonic: 0, row: ['I', 'IV', 'V'], min: 5.0 },
    { id: 'what', segs: ['what', 'what2'], gap: 0.25, label: 'NOTES 1, 4 AND 5', title: 'ONE, FOUR, FIVE', tonic: 0, row: ['I', 'IV', 'V'], tail: 0.8 },
    { id: 'bamba', segs: ['bamba'], label: 'YOU HEAR IT IN', title: 'La Bamba', sub: 'Ritchie Valens · 1958 · in C', tonic: 0, row: ['C', 'F', 'G'], min: 5.4 },
    { id: 'twist', segs: ['twist'], label: 'YOU HEAR IT IN', title: 'Twist and Shout', sub: 'The Beatles · 1963 · in D', tonic: 2, row: ['D', 'G', 'A'], min: 5.4 },
    { id: 'wild', segs: ['wild'], label: 'YOU HEAR IT IN', title: 'Wild Thing', sub: 'The Troggs · 1966 · in A', tonic: 9, row: ['A', 'D', 'E', 'D'], min: 5.4 },
    { id: 'louie', segs: ['louie'], label: 'YOU HEAR IT IN', title: 'Louie Louie', sub: 'The Kingsmen · 1963', tonic: 9, row: ['I', 'IV', 'v'], min: 5.8 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'EVERY NOTE', tonic: 0, row: ['C', 'F', 'G'], gap: 0.25, tail: 0.9 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'ANY MELODY', tonic: 0, row: ['C', 'F', 'G'], tail: 2.2 },
    { id: 'why3', segs: ['why3', 'why3b'], gap: 0.2, label: 'THE CIRCLE OF FIFTHS', title: 'NEIGHBORS', tonic: 0, tail: 0.8 },
    { id: 'why4', segs: ['why4'], label: 'V → I', title: 'THE STRONG PULL', tonic: 0, tail: 0.7 },
    { id: 'why5', segs: ['why5'], label: 'IV → I', title: 'THE SOFT AMEN', tonic: 0, tail: 1.0 },
    { id: 'roots', segs: ['roots'], label: 'ONE TOOLKIT', title: 'FOUR GENRES', tonic: 0, circle: false, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'THE SMALLEST TOOLKIT', accent: true, tonic: 0, row: ['I', 'IV', 'V'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', PINK = '#ff7a93';
    const V = { C: ['C4', 'E4', 'G4'], F: ['C4', 'F4', 'A4'], G: ['B3', 'D4', 'G4'] };
    const B = { C: 'C3', F: 'F2', G: 'G2' };
    const rockStrikes = len => [1, 0.5, 0.7, 0.5, 0.85, 0.5, 0.7, 0.5].map((v, k) => ({ o: (k * len) / 8, v }));
    // loop of chords; rows maps each chord to a row slot
    const loop = (t0, t1, names, o = {}) => {
      const len = (t1 - t0) / names.length;
      names.forEach((c, i) => a.ch(c, t0 + i * len, t0 + (i + 1) * len, {
        row: o.rows ? o.rows[i] : i, notes: o.voicing ? o.voicing[c] : undefined, bass: o.bass ? o.bass[c] : undefined,
        strikes: rockStrikes(len), vel: o.vel ?? 0.9,
      }));
      if (o.drums) {
        const n = names.length * 4, st = (t1 - t0) / n;
        for (let i = 0; i < n; i++) {
          const t = t0 + i * st;
          a.perc(i % 2 ? 'snare' : 'kick', t, 0.7);
          a.perc('hat', t, 0.3); a.perc('hat', t + st / 2, 0.3);
        }
      }
    };

    // hook: a rock vamp
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    loop(0.3, S('hook').t1, ['C', 'F', 'G', 'C'], { voicing: V, bass: B, rows: [0, 1, 2, 0], vel: 0.65 });

    // what: chords on the numbers, then on their names
    const tn = ['one', 'four', 'five'].map(w => a.w('what', w) - 0.04);
    const tc = [['C', 1], ['F', 0], ['G', 0]].map(([w, n]) => a.w('what2', w, n) - 0.04);
    ['C', 'F', 'G'].forEach((c, i) => a.ch(c, tn[i], i < 2 ? tn[i + 1] : tc[0], { row: i, notes: V[c], bass: B[c], vel: 0.75 }));
    ['C', 'F', 'G'].forEach((c, i) => a.ch(c, tc[i], i < 2 ? tc[i + 1] : S('what').t1, { row: i, notes: V[c], bass: B[c] }));
    a.tag('C', tn[0], S('what').t1, '1', { color: degColor(0) });
    a.tag('F', tn[1], S('what').t1, '4', { color: degColor(5) });
    a.tag('G', tn[2], S('what').t1, '5', { color: degColor(7) });
    function degColor(d) { return a.T.DEG12[d]; }

    // songs
    loop(S('bamba').t0 + 0.05, S('bamba').t1, ['C', 'F', 'G', 'G'], { voicing: V, bass: B, rows: [0, 1, 2, 2], drums: true });
    a.scale(S('twist').t0, 'D');
    loop(S('twist').t0 + 0.05, S('twist').t1, ['D', 'G', 'A', 'A'], { rows: [0, 1, 2, 2], drums: true });
    a.scale(S('wild').t0, 'A');
    loop(S('wild').t0 + 0.05, S('wild').t1, ['A', 'D', 'E', 'D'], { rows: [0, 1, 2, 3], drums: true });
    loop(S('louie').t0 + 0.05, S('louie').t1, ['A', 'D', 'Em', 'D'], { rows: [0, 1, 2, 1], drums: true });
    a.ring(['G'], a.w('louie', 'minor'), S('louie').t1, { color: '#8d98ff' });

    // why1: the three chords fill in the scale, note by note
    const w1 = [['C', 0], ['F', 0], ['G', 1]].map(([w, n]) => a.w('why1b', w, n) - 0.04);
    const tEvery = a.w('why1c', 'every');
    a.scale(S('why1').t0, 'C', []);
    const q0 = S('why1').t0 + 0.1, ql = (w1[0] - q0) / 3;
    ['C', 'F', 'G'].forEach((c, i) => a.ch(c, q0 + i * ql, q0 + (i + 1) * ql, { row: i, notes: V[c], bass: B[c], vel: 0.55 }));
    a.scale(w1[0], 'C', [0, 4, 7]);
    a.ch('C', w1[0], w1[1], { row: 0, notes: V.C, bass: B.C });
    a.scale(w1[1], 'C', [0, 4, 5, 7, 9]);
    a.ch('F', w1[1], w1[2], { row: 1, notes: V.F, bass: B.F });
    a.scale(w1[2], 'C', a.T.MAJOR);
    a.ch('G', w1[2], tEvery, { row: 2, notes: V.G, bass: B.G });
    a.ch('C', tEvery, S('why1').t1, { row: 0, notes: V.C, bass: B.C, vel: 0.8 });
    a.tag(0, tEvery, S('why1').t1, '7 OF 7 NOTES', { x: 540, y: 474, color: GOLD });

    // why2: a simple traditional melody, harmonized with just C, F and G
    const m0 = a.w('why2', 'harmonize') - 0.1, beat = 0.34;
    const LV = { C: ['E3', 'G3', 'C4'], F: ['F3', 'A3', 'C4'], G: ['D3', 'G3', 'B3'] };
    const LB = { C: 'C2', F: 'F2', G: 'G2' };
    a.ch('C', S('why2').t0 + 0.05, m0, { row: 0, notes: LV.C, bass: LB.C, vel: 0.55 });
    [['C', 4], ['F', 2], ['C', 2], ['F', 2], ['C', 2], ['G', 2], ['C', 2]].reduce((t, [c, b]) => {
      a.ch(c, t, t + b * beat, { row: { C: 0, F: 1, G: 2 }[c], notes: LV[c], bass: LB[c], vel: 0.6 });
      return t + b * beat;
    }, m0);
    a.melody([['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2], ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2]], m0, beat, { vel: 0.4 });
    a.big('C  F  G', m0 + 16 * beat, S('why2').t1, { y: 474, size: 56, family: 'DM Mono', weight: 500, color: GOLD });

    // why3: morph to the circle of fifths - F and G sit on either side of C
    const tL = S('why3').t0 + 0.1;
    a.layout(tL, 1, 1.4);
    a.scale(S('why3').t0, 'C');
    a.ch('C', tL, S('why3').t1, { notes: V.C, bass: B.C, vel: 0.6, shape: false });
    a.big('C', tL + 0.3, a.w('why3', 'neighbors'), { y: 860, size: 84, color: '#ffffff' });
    a.tag('C', a.w('why3', 'circle'), S('why5').t1, 'I', { color: degColor(0), dr: -100 });
    a.tag('F', a.w('why3', 'F'), S('why5').t1, 'IV', { color: degColor(5), dr: -100 });
    a.tag('G', a.w('why3', 'G'), S('why5').t1, 'V', { color: degColor(7), dr: -100 });
    a.ring(['F', 'G'], a.w('why3', 'neighbors'), S('why3').t1, { color: GOLD });
    a.walker([[a.w('why3b', 'One'), 'C'], [a.w('why3b', 'step'), 'G'], [a.w('why3b', 'each'), 'C'], [a.w('why3b', 'way'), 'F'], [a.w('why3b', 'home'), 'C']], { t1: S('why3').t1, dr: 40, color: GOLD });
    a.big('F   C   G', a.w('why3', 'neighbors'), S('why3').t1, { y: 860, size: 84, color: '#ffffff' });
    a.poly(['F', 'C', 'G'], a.w('why3', 'neighbors'), S('why3').t1, { closed: false, color: GOLD, glow: true, alpha: 0.8 });
    a.big('ONE STEP EACH WAY', a.w('why3b', 'One'), S('why3').t1, { y: 474, size: 40, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('F3', a.w('why3', 'F'), 0.8, { vel: 0.3 }); a.note('G3', a.w('why3', 'G'), 0.8, { vel: 0.3 });

    // why4: G -> C, the strong pull
    const tC4 = a.w('why4', 'C') - 0.04;
    a.ch('G', S('why4').t0 + 0.05, tC4, { notes: ['B3', 'D4', 'G4'], bass: 'G2', shape: false });
    a.ch('C', tC4, a.w('why4', 'strongest') - 0.04, { notes: ['C4', 'E4', 'G4'], bass: 'C3', shape: false });
    a.line('G', 'C', tC4, S('why4').t1, { arrow: true, color: RED, r: 215 });
    a.big('G  →  C', tC4, S('why4').t1, { y: 860, size: 92, color: RED });
    a.ch('G', a.w('why4', 'strongest') - 0.04, a.w('why4', 'home') - 0.04, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.8, shape: false });
    a.ch('C', a.w('why4', 'home') - 0.04, S('why4').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', shape: false });

    // why5: F -> C, the soft amen
    const tC5 = a.w('why5', 'C') - 0.04;
    a.ch('F', S('why5').t0 + 0.05, tC5, { notes: ['C4', 'F4', 'A4'], bass: 'F2', vel: 0.8, shape: false });
    a.ch('C', tC5, a.w('why5', 'amen') - 0.04, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.8, shape: false });
    a.line('F', 'C', tC5, S('why5').t1, { arrow: true, color: TEAL, r: 215 });
    a.ch('F', a.w('why5', 'amen') - 0.04, a.w('why5', 'amen') + 0.8, { notes: ['C4', 'F4', 'A4'], bass: 'F2', vel: 0.6, shape: false });
    a.ch('C', a.w('why5', 'amen') + 0.8, S('why5').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.65, shape: false });
    a.big('F  →  C', tC5, S('why5').t1, { y: 860, size: 92, color: TEAL });
    a.big('A – MEN', a.w('why5', 'amen'), S('why5').t1, { y: 474, size: 56, family: 'DM Mono', weight: 500, color: TEAL });
    a.layout(S('roots').t0, 0, 0.8);

    // roots: four genres light up over the same three chords
    const r0 = S('roots').t0 + 0.05, r1 = S('roots').t1;
    const g = a.grid([
      { label: 'ROCK', color: RED, size: 50 }, { label: 'BLUES', color: '#62a8ff', size: 50 },
      { label: 'FOLK', color: '#7be07b', size: 50 }, { label: 'COUNTRY', color: GOLD, size: 50 },
    ], r0, r1, { rows: 2, cols: 2, cw: 420, chh: 190, y: 560, revealStep: 0.15 });
    const gw = ['Rock', 'blues', 'folk', 'country'].map(w => a.w('roots', w) - 0.05);
    gw.forEach((t, i) => g.active.push({ t0: t, t1: i < 3 ? gw[i + 1] : a.w('roots', 'three'), i }));
    [0, 1, 2, 3].forEach(i => g.active.push({ t0: a.w('roots', 'three'), t1: r1, i }));
    loop(r0, r1, ['C', 'F', 'G', 'C'], { voicing: V, bass: B, rows: [null, null, null, null], drums: true, vel: 0.8 });

    // essence: the vamp once more, landing on C
    const e0 = S('essence').t0 + 0.1, el = 0.9;
    loop(e0, e0 + 6 * el, ['C', 'F', 'G', 'C', 'F', 'G'], { voicing: V, bass: B, rows: [0, 1, 2, 0, 1, 2], drums: true, vel: 0.9 });
    a.ch('C', e0 + 6 * el, S('essence').t1 - 0.3, { row: 0, notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2' });
    a.perc('kick', e0 + 6 * el, 1); a.perc('snare', e0 + 6 * el, 0.6);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
