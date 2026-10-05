// The perfect fourth: the leap that opens famous melodies, and why it sounds like arriving home.
module.exports = {
  slug: 'perfect-fourth',
  title: 'The Perfect Fourth',
  segments: [
    { id: 'hook',    text: 'Some of the most famous melodies ever written start with the same small leap.' },
    { id: 'what',    text: "Start on G and go up five half steps, to C. That's a perfect fourth." },
    { id: 'bride',   text: "It's the first step of Here Comes the Bride..." },
    { id: 'grace',   text: 'the opening of Amazing Grace...' },
    { id: 'auld',    text: 'and the first leap of Auld Lang Syne.' },
    { id: 'why1',    text: 'So why does it work? The fourth is the fifth turned upside down.' },
    { id: 'why2',    text: 'C up to G is a fifth. G up to C is a fourth. Together, exactly one octave.' },
    { id: 'ratio',   text: 'Four to three, times three to two, makes two to one.' },
    { id: 'land',    text: 'Leaping from the fifth below up to the root sounds like an arrival.' },
    { id: 'land2',   text: 'The pickup note lifts, and the melody lands on home, right on the downbeat.' },
    { id: 'sus',     text: "In a chord, a fourth over the bass sounds unresolved. That's the sus four chord." },
    { id: 'sus2',    text: 'F wants to fall to E... and C sus four resolves to C.' },
    { id: 'monks',   text: 'Medieval monks sang in parallel fourths, as well as fifths.' },
    { id: 'essence', text: 'Two halves of the octave: the fifth is a door out, and the fourth is the door back home.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE SMALL LEAP', title: 'THE PERFECT FOURTH', accent: true, min: 5.0 },
    { id: 'what', segs: ['what'], label: 'COUNT 5 HALF STEPS', title: 'G TO C', tail: 0.9 },
    { id: 'bride', segs: ['bride'], label: 'YOU HEAR IT IN', title: 'Here Comes the Bride', sub: 'Richard Wagner · 1850 · in C', tail: 2.6 },
    { id: 'grace', segs: ['grace'], label: 'YOU HEAR IT IN', title: 'Amazing Grace', sub: 'Traditional · in C', tail: 4.2 },
    { id: 'auld', segs: ['auld'], label: 'YOU HEAR IT IN', title: 'Auld Lang Syne', sub: 'Traditional · in C', tail: 3.2 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'UPSIDE DOWN', gap: 0.4, tail: 0.5 },
    { id: 'ratio', segs: ['ratio'], label: 'WHY IT WORKS', title: 'ONE OCTAVE', tail: 0.8 },
    { id: 'land', segs: ['land', 'land2'], label: 'WHY IT WORKS', title: 'THE ARRIVAL', gap: 0.3, tail: 0.9 },
    { id: 'sus', segs: ['sus', 'sus2'], label: 'IN HARMONY', title: 'SUS FOUR', gap: 0.3, tail: 0.9 },
    { id: 'monks', segs: ['monks'], label: 'MEDIEVAL CHANT', title: 'PARALLEL FOURTHS', tail: 2.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE DOOR HOME', accent: true, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', PINK = '#ff7a93', GOLD = '#ffcf5a';
    // bass + sustained harmony without a shape (keeps the melody readable on the circle)
    const pad = (name, t0, t1, notes, bass, vel = 0.45) => a.ch(name, t0, t1, { notes, bass, vel, hideName: true, shape: false });

    // hook: G up to C, the leap drawn as an arc
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    a.arc('G', 'C', 1.0, S('hook').t1, { steps: 5, color: PINK, label: 'UP A FOURTH', labelR: 165 });
    a.note('G3', 0.7, 0.4, { vel: 0.4 }); a.note('C4', 1.1, 1.6, { vel: 0.4 });
    a.note('G3', 3.0, 0.4, { vel: 0.36 }); a.note('C4', 3.4, 1.4, { vel: 0.36 });
    pad('C', 1.1, S('hook').t1, ['E3'], 'C2', 0.35);

    // what: walk five half steps from G to C
    const tG = a.w('what', 'G'), tGo = a.w('what', 'go');
    const steps = [[tG, 7]];
    for (let i = 1; i <= 5; i++) steps.push([tGo + 0.1 + i * 0.2, 7 + i]);
    a.walker(steps, { t1: S('what').t1, color: '#ffffff', dr: 0 });
    steps.forEach(([t, p]) => a.note(55 + p - 7, t, 0.25, { vel: 0.2, show: false }));
    const t4 = a.w('what', 'perfect');
    a.ch('C', t4 - 0.05, S('what').t1, { label: 'G → C', notes: ['G3', 'C4'], bass: false, hideName: true, vel: 0.9 });
    a.tag('A', a.w('what', 'five'), S('what').t1, '5 HALF STEPS', { color: '#ffffff', dr: -110 });
    a.tag('C', t4, S('what').t1, 'FOURTH', { color: PINK });

    // here comes the bride (public domain): G C C C, dotted rhythm
    const b0 = a.end('bride') + 0.1, bb = 0.42;
    pad('C', S('bride').t0 + 0.1, S('bride').t1, ['E3'], 'C2');
    a.melody([['G3', 1], ['C4', 0.75], ['C4', 0.25], ['C4', 2]], b0, bb, { vel: 0.45 });
    a.arc('G', 'C', b0 + bb, S('bride').t1, { steps: 5, color: PINK, label: 'UP A FOURTH', labelR: 165 });
    a.tag('C', b0 + bb, S('bride').t1, 'HOME');

    // amazing grace (public domain), 3/4
    const g0 = a.end('grace') + 0.1, gb = 0.32;
    a.scale(S('grace').t0, 'C');
    const gEnd = a.melody([['G3', 1], ['C4', 2], ['E4', 0.5], ['C4', 0.5], ['E4', 2], ['D4', 1], ['C4', 2], ['A3', 1], ['G3', 3]], g0, gb, { vel: 0.42 });
    pad('C', g0 + gb, g0 + 8 * gb, ['E3'], 'C2');
    pad('F', g0 + 8 * gb, g0 + 11 * gb, ['F3'], 'F2');
    pad('C', g0 + 11 * gb, S('grace').t1, ['E3'], 'C2');
    a.arc('G', 'C', g0 + gb, S('grace').t1, { steps: 5, color: PINK, label: 'UP A FOURTH', labelR: 165 });
    a.tag('C', g0 + gb, gEnd, 'HOME');

    // auld lang syne (public domain), 4/4
    const u0 = a.end('auld') + 0.1, ub = 0.3;
    a.melody([['G3', 1], ['C4', 1.5], ['C4', 0.5], ['C4', 1], ['E4', 1], ['D4', 1.5], ['C4', 0.5], ['D4', 1], ['E4', 1]], u0, ub, { vel: 0.42 });
    pad('C', u0 + ub, u0 + 5 * ub, ['E3'], 'C2');
    pad('G', u0 + 5 * ub, u0 + 8 * ub, ['B2'], 'G2');
    pad('C', u0 + 8 * ub, S('auld').t1, ['E3'], 'C2');
    a.arc('G', 'C', u0 + ub, S('auld').t1, { steps: 5, color: PINK, label: 'UP A FOURTH', labelR: 165 });
    a.tag('C', u0 + ub, S('auld').t1, 'HOME');

    // why: fifth (C up to G) + fourth (G up to C) = one full turn
    a.scale(S('why1').t0, 'C', [0, 7]);
    const tUp = a.w('why1', 'upside');
    a.line('C', 'G', S('why1').t0 + 0.3, tUp, { color: '#ffffff', dash: true });
    const tFifth = a.w('why2', 'fifth'), tFourth = a.w('why2', 'fourth'), tOct = a.w('why2', 'octave');
    a.note('G3', tUp, 0.5, { vel: 0.3, show: false }); a.note('C4', tUp + 0.5, 1.0, { vel: 0.3, show: false });
    a.note('C4', a.w('why2', 'C'), 0.5, { vel: 0.32 }); a.note('G4', a.w('why2', 'G'), 1.0, { vel: 0.32 });
    a.note('G4', a.w('why2', 'G', 1), 0.5, { vel: 0.32 }); a.note('C5', a.w('why2', 'C', 1), 1.0, { vel: 0.32 });
    a.arc('C', 'G', a.w('why2', 'G') - 0.1, S('why1').t1, { steps: 7, color: TEAL, label: 'FIFTH', labelR: 165 });
    a.arc('G', 'C', a.w('why2', 'C', 1) - 0.1, S('why1').t1, { steps: 5, color: PINK, label: 'FOURTH', labelR: 165 });
    a.tag('C', tOct, S('ratio').t1, 'OCTAVE', { color: GOLD });
    a.note('C3', tOct, 2.5, { vel: 0.26, show: false }); a.note('C4', tOct, 2.5, { vel: 0.26, show: false });
    // ratio
    a.big('4:3 × 3:2 = 2:1', a.w('ratio', 'Four'), S('ratio').t1, { y: 460, size: 56, family: 'DM Mono', weight: 500, color: GOLD });
    a.arc('G', 'C', S('ratio').t0, S('ratio').t1, { steps: 5, color: PINK, label: '4 : 3', labelR: 165 });
    a.arc('C', 'G', S('ratio').t0, S('ratio').t1, { steps: 7, color: TEAL, label: '3 : 2', labelR: 165 });
    pad('C5', a.w('ratio', 'makes'), S('ratio').t1, ['C4', 'G4', 'C5'], 'C3', 0.6);

    // land: pickup G, downbeat C (kick + chord)
    a.scale(S('land').t0, 'C');
    const l0 = a.w('land', 'Leaping'), lb = 0.5;
    const hits = [l0, a.w('land2', 'pickup'), a.w('land2', 'home') - 0.5];
    hits.forEach((t, k) => {
      a.note('G3', t, lb * 0.9, { vel: 0.42 });
      a.ch('C', t + lb, (k < 2 ? hits[k + 1] : S('land').t1), { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.75 });
      a.perc('kick', t + lb, 0.9);
      a.walker([[t, 'G'], [t + lb, 'C']], { t1: k < 2 ? hits[k + 1] + 0.3 : S('land').t1, color: '#ffffff', dr: 34 });
    });
    a.tag('G', a.w('land2', 'pickup'), S('land').t1, 'PICKUP', { color: '#ffffff', dr: -92 });
    a.tag('C', a.w('land2', 'downbeat'), S('land').t1, 'DOWNBEAT', { color: GOLD, x: 540, y: 1000 });

    // sus4: F over C wants to fall to E
    const tSus = a.w('sus', 'sus'), tRes = a.w('sus2', 'resolves');
    a.ch('Csus4', a.w('sus', 'chord') - 0.1, tRes, { notes: ['C4', 'F4', 'G4'], bass: 'C3', vel: 0.8 });
    a.tag('F', a.w('sus', 'fourth'), tRes, 'FOURTH', { color: PINK, dr: -92 });
    a.arc('F', 'E', a.w('sus2', 'fall'), S('sus').t1, { steps: -1, color: TEAL, label: 'FALLS', labelR: 345 });
    a.ch('C', tRes, S('sus').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3' });
    a.tag('E', tRes + 0.2, S('sus').t1, 'THIRD', { color: TEAL, dr: -92 });

    // monks: a chant with a second voice a fourth below, the same shape moving
    const m0 = a.w('monks', 'parallel') - 0.3;
    const chant = [['D4', 'A3'], ['E4', 'B3'], ['F4', 'C4'], ['G4', 'D4'], ['A4', 'E4'], ['G4', 'D4'], ['F4', 'C4'], ['E4', 'B3'], ['D4', 'A3']];
    const cl = (S('monks').t1 - m0 - 0.3) / chant.length;
    chant.forEach(([hi, lo], i) => a.ch('C', m0 + i * cl, m0 + (i + 1) * cl, { notes: [lo, hi], bass: false, vel: 0.8, hideName: true }));
    a.ch('D', S('monks').t0 + 0.1, m0, { notes: ['A3', 'D4'], bass: false, vel: 0.6, hideName: true });
    a.tag(2, a.w('monks', 'fourths'), S('monks').t1, 'SAME SHAPE, MOVING', { color: '#ffffff', dr: -150 });

    // essence: the two halves of the octave
    const e0 = S('essence').t0 + 0.1, tOut = a.w('essence', 'out'), tHome = a.w('essence', 'home');
    a.scale(S('essence').t0, 'C', [0, 7]);
    a.arc('C', 'G', a.w('essence', 'fifth') - 0.1, S('essence').t1, { steps: 7, color: TEAL, label: 'DOOR OUT', labelR: 165 });
    a.arc('G', 'C', a.w('essence', 'fourth') - 0.1, S('essence').t1, { steps: 5, color: PINK, label: 'DOOR HOME', labelR: 165 });
    a.ch('C5', e0, tOut, { notes: ['C4', 'G4'], bass: 'C3', vel: 0.6, shape: false });
    a.ch('G5', tOut, tHome - 0.05, { notes: ['G3', 'D4', 'G4'], bass: 'G2', vel: 0.7, shape: false });
    a.ch('C', tHome - 0.05, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', shape: false });
    a.note('G4', a.w('essence', 'fourth'), 0.5, { vel: 0.3, show: false }); a.note('C5', a.w('essence', 'fourth') + 0.5, 1.4, { vel: 0.3, show: false });
    a.tag('C', tHome, S('essence').t1, 'HOME');
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
