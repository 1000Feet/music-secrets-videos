// Secondary dominants: a five chord borrowed to point at a chord other than home.
module.exports = {
  slug: 'secondary-dominants',
  title: 'Secondary Dominants',
  segments: [
    { id: 'hook',      text: 'One small trick makes a plain progression sound suddenly rich.' },
    { id: 'what',      text: 'In C, the five chord, G seven, points home.' },
    { id: 'what2',     text: 'A secondary dominant borrows that pull to point somewhere else.' },
    { id: 'what3',     text: 'A seven is the five of D minor. E seven, of A minor. D seven, of G.' },
    { id: 'yesterday', text: "It's in Yesterday: F, E minor seven, A seven, D minor." },
    { id: 'georgia',   text: 'Sweet Georgia Brown chains them: D seven, G seven, C seven, F.' },
    { id: 'georgia2',  text: 'Each chord is the five of the next.' },
    { id: 'why1',      text: 'So why does it work? A seven contains C sharp, a note outside the key of F.' },
    { id: 'why2',      text: 'C sharp becomes a temporary leading tone, pulling up to D.' },
    { id: 'why3',      text: "For a moment, D minor feels like home. That's tonicization." },
    { id: 'every',     text: 'Every major or minor chord in a key can get its own five.' },
    { id: 'every2',    text: "That's how songs add color without really changing key." },
    { id: 'chain',     text: 'Chain them, and each chord falls into the next, like the circle of fifths.' },
    { id: 'essence',   text: 'Borrow a pull from outside the key, and any chord can become home for a moment.' },
    { id: 'cta',       text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'BORROWED PULL', title: 'SECONDARY DOMINANTS', accent: true, tonic: 0, row: ['C', 'A7', 'Dm', 'G7', 'C'], min: 5.4 },
    { id: 'what', segs: ['what'], label: 'THE FIVE CHORD', title: 'G7 TO C', tonic: 0, tail: 0.7 },
    { id: 'what2', segs: ['what2'], label: 'A SECONDARY DOMINANT', title: 'SOMEWHERE ELSE', tonic: 0, tail: 0.9 },
    { id: 'what3', segs: ['what3'], label: 'IN THE KEY OF C', title: 'A FIVE FOR EACH', tonic: 0, circle: false, tail: 1.0 },
    { id: 'yesterday', segs: ['yesterday'], label: 'YOU HEAR IT IN', title: 'Yesterday', sub: 'The Beatles · 1965 · in F', tonic: 5, row: ['F', 'Em7', 'A7', 'Dm'], tail: 2.8 },
    { id: 'georgia', segs: ['georgia', 'georgia2'], label: 'YOU HEAR IT IN', title: 'Sweet Georgia Brown', sub: '1925 · in F', tonic: 5, row: ['D7', 'G7', 'C7', 'F'], gap: 0.3, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'AN OUTSIDE NOTE', tonic: 5, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'C# PULLS TO D', tonic: 5, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'HOME FOR A MOMENT', title: 'TONICIZATION', tonic: 2, tail: 1.2 },
    { id: 'every', segs: ['every', 'every2'], label: 'IN THE KEY OF C', title: 'EVERY CHORD A FIVE', tonic: 0, circle: false, gap: 0.4, tail: 1.2 },
    { id: 'chain', segs: ['chain'], label: 'CHAIN THEM', title: 'FALLING BY FIFTHS', tonic: 5, row: ['D7', 'G7', 'C7', 'F'], tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'HOME FOR A MOMENT', accent: true, tonic: 2, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    const V = {
      C: ['C4', 'E4', 'G4'], A7: ['C#4', 'E4', 'G4', 'A4'], Dm: ['D4', 'F4', 'A4'], G7: ['B3', 'D4', 'F4', 'G4'],
      E7: ['B3', 'D4', 'E4', 'G#4'], Am: ['C4', 'E4', 'A4'], D7: ['C4', 'D4', 'F#4', 'A4'], G: ['B3', 'D4', 'G4'],
      F: ['C4', 'F4', 'A4'], Em7: ['D4', 'E4', 'G4', 'B4'], C7: ['C4', 'E4', 'G4', 'Bb4'], B7: ['B3', 'D#4', 'F#4', 'A4'], Em: ['B3', 'E4', 'G4'],
    };
    const B = { C: 'C3', A7: 'A2', Dm: 'D3', G7: 'G2', E7: 'E2', Am: 'A2', D7: 'D3', G: 'G2', F: 'F2', Em7: 'E2', C7: 'C3', B7: 'B2', Em: 'E2' };
    const chd = (c, t0, t1, o = {}) => a.ch(c, t0, t1, { notes: V[c], bass: B[c], ...o });
    const swing = len => [{ o: 0, v: 1 }, { o: len * 0.5, v: 0.5 }];

    // hook: C - A7 - Dm - G7 - C, the outside C# flashes on A7
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const hk = ['C', 'A7', 'Dm', 'G7', 'C'], h0 = 0.3, hl = (S('hook').t1 - h0) / 5;
    hk.forEach((c, i) => chd(c, h0 + i * hl, h0 + (i + 1) * hl, { row: i, vel: 0.6, strikes: swing(hl) }));
    a.ring(['C#'], h0 + hl, h0 + 2 * hl, { color: RED });

    // what: G7 points home to C
    a.scale(S('what').t0, 'C');
    const tG = a.w('what', 'G') - 0.05, tHome = a.w('what', 'home') - 0.05;
    chd('C', S('what').t0 + 0.05, tG, { vel: 0.5 });
    chd('G7', tG, tHome);
    chd('C', tHome, S('what').t1);
    a.line('G', 'C', tG + 0.2, S('what').t1, { color: GOLD, arrow: true, r: 230 });
    a.tag('C', tHome, S('what').t1, 'HOME', { dr: -75 });
    a.big('V  →  I', tG, S('what').t1, { y: 455, size: 56, family: 'DM Mono', weight: 500, color: GOLD });

    // what2: the same pull, aimed at D minor
    const tB = a.w('what2', 'borrows') - 0.05, tE = a.w('what2', 'else') - 0.05;
    chd('C', S('what2').t0 + 0.05, tB, { vel: 0.5 });
    chd('A7', tB, tE);
    chd('Dm', tE, S('what2').t1);
    a.line('A', 'D', tB + 0.2, S('what2').t1, { color: TEAL, arrow: true, r: 230 });
    a.ring(['C#'], tB, tE, { color: RED });
    a.tag('D', tE, S('what2').t1, 'NEW TARGET', { x: 540, y: 1100, color: TEAL });
    a.big('V  →  ii', tB, S('what2').t1, { y: 455, size: 56, family: 'DM Mono', weight: 500, color: TEAL });

    // what3: three pairs in C
    const g3 = a.grid([
      { label: 'A7 → Dm', sub: 'FIVE OF D MINOR', color: '#62a8ff' },
      { label: 'E7 → Am', sub: 'FIVE OF A MINOR', color: '#ffd84a' },
      { label: 'D7 → G', sub: 'FIVE OF G', color: '#ffa45c' },
    ], S('what3').t0 + 0.1, S('what3').t1, { rows: 3, cols: 1, cw: 620, chh: 190, y: 560, revealStep: 0.15 });
    const p3 = [
      ['A7', 'Dm', a.w('what3', 'A', 0), a.w('what3', 'D', 0), a.w('what3', 'E')],
      ['E7', 'Am', a.w('what3', 'E'), a.w('what3', 'A', 1), a.w('what3', 'D', 1)],
      ['D7', 'G', a.w('what3', 'D', 1), a.w('what3', 'G'), S('what3').t1],
    ];
    p3.forEach(([x, y, t0, t1, t2], i) => {
      chd(x, t0 - 0.05, t1 - 0.05, { vel: 0.8 });
      chd(y, t1 - 0.05, t2 - 0.05, { vel: 0.85 });
      g3.active.push({ t0: t0 - 0.05, t1: t2 - 0.05, i });
    });

    // yesterday (chords only): F - Em7 - A7 - Dm on the words, then once more
    a.scale(S('yesterday').t0, 'F');
    const Y = ['F', 'Em7', 'A7', 'Dm'];
    const yw = [a.w('yesterday', 'F'), a.w('yesterday', 'E'), a.w('yesterday', 'A'), a.w('yesterday', 'D')].map(t => t - 0.05);
    const yEnd = a.end('yesterday') + 0.25;
    chd('F', S('yesterday').t0 + 0.05, yw[0], { row: 0, vel: 0.5 });
    Y.forEach((c, i) => chd(c, yw[i], i < 3 ? yw[i + 1] : yEnd, { row: i, vel: 0.8 }));
    const yl = (S('yesterday').t1 - yEnd) / 4;
    Y.forEach((c, i) => chd(c, yEnd + i * yl, yEnd + (i + 1) * yl, { row: i, strikes: swing(yl) }));
    a.ring(['C#'], yw[2], yw[3], { color: RED });
    a.ring(['C#'], yEnd + 2 * yl, yEnd + 3 * yl, { color: RED });
    a.tag('C#', yEnd + 2 * yl, yEnd + 3 * yl, 'C#', { dr: -75, color: RED });
    a.line('A', 'D', yEnd + 2 * yl + 0.1, yEnd + 4 * yl, { color: TEAL, arrow: true, r: 230 });

    // sweet georgia brown: D7 G7 C7 F, each the five of the next
    const GW = ['D7', 'G7', 'C7', 'F'], GR = ['D', 'G', 'C', 'F'];
    const gw = [a.w('georgia', 'D'), a.w('georgia', 'G'), a.w('georgia', 'C'), a.w('georgia', 'F')].map(t => t - 0.05);
    chd('F', S('georgia').t0 + 0.05, gw[0], { row: 3, vel: 0.5 });
    GW.forEach((c, i) => chd(c, gw[i], i < 3 ? gw[i + 1] : a.at('georgia2'), { row: i, vel: 0.8 }));
    a.walker(GR.map((r, i) => [gw[i], r]), { t1: a.at('georgia2'), dr: 34, label: 'ROOT', labelDr: 82 });
    const q0 = a.at('georgia2'), ql = (S('georgia').t1 - q0) / 4;
    GW.forEach((c, i) => {
      chd(c, q0 + i * ql, q0 + (i + 1) * ql, { row: i, strikes: [0, 0.25, 0.5, 0.75].map(k => ({ o: ql * k, v: k ? 0.55 : 1 })) });
      if (i < 3) a.arc(GR[i], GR[i + 1], q0 + (i + 1) * ql, i < 2 ? q0 + (i + 2) * ql + 0.2 : S('georgia').t1, { steps: 5, color: TEAL, dr: 30 });
    });
    for (let t = q0; t < S('georgia').t1 - 0.1; t += ql / 2) { a.perc('kick', t, 0.5); a.perc('hat', t + ql / 4, 0.35); }

    // why1: A7 holds C#, outside the key of F
    a.scale(S('why1').t0, 'F');
    const tA = a.w('why1', 'A') - 0.05, tC = a.w('why1', 'C');
    chd('F', S('why1').t0 + 0.05, tA, { vel: 0.5 });
    chd('A7', tA, a.w('why2', 'D') - 0.05, { vel: 0.8 });
    a.ring(['C#'], tC, a.w('why2', 'D'), { color: RED });
    a.tag('C#', a.w('why1', 'outside'), S('why1').t1, 'NOT IN F', { x: 540, y: 455, color: RED });
    a.note('C#5', tC, 0.8, { vel: 0.3 });
    // why2: C# leans up to D
    const tLT = a.w('why2', 'leading'), tD = a.w('why2', 'D') - 0.05;
    a.tag('C#', tLT, tD, 'LEADING TONE', { x: 540, y: 455, color: GOLD });
    a.arc('C#', 'D', tD, S('why2').t1, { steps: 1, color: TEAL, dr: 30, label: 'UP', labelR: 345 });
    chd('Dm', tD, S('why2').t1);
    a.note('C#5', a.w('why2', 'pulling'), 0.5, { vel: 0.3 }); a.note('D5', tD, 1.0, { vel: 0.32 });
    // why3: D minor as a temporary home (C# becomes part of its scale)
    const tH = a.w('why3', 'home') - 0.05;
    chd('A7', S('why3').t0 + 0.05, a.w('why3', 'D') - 0.05, { vel: 0.6 });
    chd('Dm', a.w('why3', 'D') - 0.05, S('why3').t1);
    a.scale(tH, 'D', [0, 2, 3, 5, 7, 8, 11]);
    a.tag('D', tH, S('why3').t1, 'HOME?', { dr: -92 });
    a.big('TONICIZATION', a.w('why3', 'tonicization'), S('why3').t1, { y: 455, size: 52, family: 'DM Mono', weight: 500, color: GOLD });

    // every: each chord of C gets its own five
    a.scale(S('every').t0, 'C');
    const T5 = [['A7', 'Dm'], ['B7', 'Em'], ['C7', 'F'], ['D7', 'G'], ['E7', 'Am']];
    const cells = [...T5.map(([x]) => ({ label: x, size: 58, sub: 'FIVE', color: TEAL })), ...T5.map(([, y]) => ({ label: y, size: 58, sub: 'TARGET', color: '#ffffff' }))];
    const g5 = a.grid(cells, S('every').t0 + 0.1, S('every').t1, { rows: 2, cols: 5, cw: 200, chh: 200, y: 560, revealStep: 0.08, subSize: 20 });
    const e0 = a.w('every', 'own') - 0.6, e1 = a.at('every2') + 2.4, el = (e1 - e0) / 5;
    T5.forEach(([x, y], i) => {
      const t = e0 + i * el;
      chd(x, t, t + el / 2, { vel: 0.75 }); chd(y, t + el / 2, t + el, { vel: 0.85 });
      g5.active.push({ t0: t, t1: t + el / 2, i }, { t0: t + el / 2, t1: t + el, i: i + 5 });
    });
    chd('C', e1, S('every').t1, { vel: 0.8 });
    a.big('STILL IN C', a.w('every2', 'without'), S('every').t1, { y: 1010, size: 52, family: 'DM Mono', weight: 500, color: GOLD });

    // chain: rearrange by fifths, the roots walk neighbour to neighbour
    a.scale(S('chain').t0, 'F');
    a.layout(S('chain').t0 + 0.2, 1, 1.4);
    const c0 = S('chain').t0 + 0.3, cl = (S('chain').t1 - c0) / 4.6;
    ['D7', 'G7', 'C7', 'F'].forEach((c, i) => chd(c, c0 + i * cl, i < 3 ? c0 + (i + 1) * cl : S('chain').t1, { row: i, vel: 0.85, strikes: swing(cl) }));
    a.walker(GR.map((r, i) => [c0 + i * cl, r]), { t1: S('chain').t1, dr: 34 });
    a.tag('G', a.w('chain', 'circle'), S('chain').t1, 'CIRCLE OF FIFTHS', { x: 540, y: 1100, color: GOLD });
    a.layout(S('chain').t1 - 1.0, 0, 1.0);

    // essence: A7 resolves to D minor, home for a moment
    a.scale(S('essence').t0, 'F');
    const s0 = S('essence').t0 + 0.1, sHome = a.w('essence', 'home') - 0.05;
    chd('F', s0, a.w('essence', 'outside') - 0.05, { vel: 0.6 });
    chd('A7', a.w('essence', 'outside') - 0.05, sHome, { vel: 0.8 });
    a.ring(['C#'], a.w('essence', 'outside'), sHome, { color: RED });
    chd('Dm', sHome, S('essence').t1 - 0.3, { notes: ['D4', 'F4', 'A4', 'D5'], bass: 'D2' });
    a.arc('C#', 'D', sHome, S('essence').t1, { steps: 1, color: TEAL, dr: 30 });
    a.scale(sHome, 'D', [0, 2, 3, 5, 7, 8, 11]);
    a.tag('D', sHome + 0.2, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
