// Chord inversions: the same three notes over a different bass note, and why the bass decides the feel.
module.exports = {
  slug: 'inversions',
  title: 'Chord Inversions',
  segments: [
    { id: 'hook',    text: 'Same chord, same three notes...' },
    { id: 'hook2',   text: "but it can sound solid, or like it's floating." },
    { id: 'what',    text: "Here's C major: C, E and G, with C in the bass. That's root position." },
    { id: 'inv1',    text: 'Put E in the bass, and you get C over E. The first inversion.' },
    { id: 'inv2',    text: 'Put G in the bass: C over G. The second inversion.' },
    { id: 'whiter',  text: 'You hear inversions in A Whiter Shade of Pale...' },
    { id: 'whiter2', text: 'a bass that walks down step by step...' },
    { id: 'whiter3', text: 'while the chords change above it.' },
    { id: 'bach',    text: "It was inspired by Bach's Air on the G String..." },
    { id: 'bach2',   text: 'and its famous slow walking bass.' },
    { id: 'why1',    text: 'So why does it matter?' },
    { id: 'why1b',   text: 'With C in the bass, the chord sounds solid and finished.' },
    { id: 'why2',    text: "With E in the bass, it feels lighter, like it's still moving." },
    { id: 'why3',    text: "With G in the bass, it's unstable. It wants to move." },
    { id: 'why4',    text: 'Classical composers used it right before the final cadence.' },
    { id: 'why5',    text: 'Without inversions, the bass jumps around.' },
    { id: 'why5b',   text: 'With them, it walks step by step.' },
    { id: 'why6',    text: "That's how smooth, singable bass lines are built." },
    { id: 'essence', text: 'Same chord, new foundation.' },
    { id: 'essence2', text: 'The bass note decides how a chord feels.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2'], gap: 0.2, label: 'SAME NOTES, NEW BASS', title: 'CHORD INVERSIONS', accent: true, tonic: 0, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'C IN THE BASS', title: 'ROOT POSITION', tonic: 0, row: ['C', 'C/E', 'C/G'], tail: 0.6 },
    { id: 'inv1', segs: ['inv1'], label: 'E IN THE BASS', title: 'FIRST INVERSION', tonic: 0, row: ['C', 'C/E', 'C/G'], tail: 0.6 },
    { id: 'inv2', segs: ['inv2'], label: 'G IN THE BASS', title: 'SECOND INVERSION', tonic: 0, row: ['C', 'C/E', 'C/G'], tail: 0.8 },
    { id: 'whiter', segs: ['whiter', 'whiter2', 'whiter3'], label: 'YOU HEAR IT IN', title: 'A Whiter Shade of Pale', sub: 'Procol Harum · 1967', tonic: 0, gap: 0.2, tail: 2.0 },
    { id: 'bach', segs: ['bach', 'bach2'], gap: 0.2, label: 'INSPIRED BY', title: 'Air on the G String', sub: 'Johann Sebastian Bach', tonic: 2, tail: 3.2 },
    { id: 'why1', segs: ['why1', 'why1b'], gap: 0.2, label: 'ROOT POSITION', title: 'SOLID', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'FIRST INVERSION', title: 'STILL MOVING', tonic: 0, tail: 0.6 },
    { id: 'why3', segs: ['why3'], label: 'SECOND INVERSION', title: 'UNSTABLE', tonic: 0, tail: 0.4 },
    { id: 'why4', segs: ['why4'], label: 'BEFORE THE CADENCE', title: 'C/G → G7 → C', tonic: 0, row: ['C/G', 'G7', 'C'], tail: 1.6 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'WHY IT WORKS', title: 'JUMP OR STEP', tonic: 0, gap: 1.2, tail: 1.6 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'A SINGABLE BASS', tonic: 0, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'NEW FOUNDATION', accent: true, tonic: 0, row: ['C', 'C/E', 'C/G'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', WHITE = '#ffffff';
    const UP = ['C4', 'E4', 'G4'];
    const INV = { C: 'C3', 'C/E': 'E2', 'C/G': 'G2' };
    const ROW = { C: 0, 'C/E': 1, 'C/G': 2 };
    const bassWalker = (pts, t1) => a.walker(pts, { t1, dr: -44, color: WHITE, label: 'BASS', labelDr: -46 });
    const inv = (name, t0, t1, o = {}) => a.ch(name, t0, t1, { notes: UP, bass: INV[name], row: o.row === undefined ? ROW[name] : o.row, vel: o.vel ?? 0.85, strikes: o.strikes });

    // hook: the same triangle, the bass moving under it
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    const h0 = 0.3, hl = (S('hook').t1 - h0) / 4;
    ['C', 'C/E', 'C/G', 'C'].forEach((c, i) => inv(c, h0 + i * hl, h0 + (i + 1) * hl, { row: null, vel: 0.65 }));
    bassWalker(['C', 'E', 'G', 'C'].map((p, i) => [h0 + i * hl, p]), S('hook').t1);

    // what / inv1 / inv2: root, first, second inversion on the spoken words
    const tRoot = a.w('what', 'C', 0) - 0.04;
    const t1 = a.w('inv1', 'E', 1) - 0.04, t2 = a.w('inv2', 'G', 1) - 0.04;
    inv('C', tRoot, a.w('inv1', 'E', 0) - 0.04);
    a.note('E2', a.w('inv1', 'E', 0) - 0.04, 0.6, { vel: 0.35, show: false });
    inv('C/E', a.w('inv1', 'E', 0) - 0.04 + 0.6, t1, { vel: 0.6 });
    inv('C/E', t1, S('inv1').t1);
    a.note('G2', a.w('inv2', 'G', 0) - 0.04, 0.6, { vel: 0.35, show: false });
    inv('C/E', S('inv2').t0, a.w('inv2', 'G', 0) - 0.04, { vel: 0.5 });
    inv('C/G', a.w('inv2', 'G', 0) - 0.04 + 0.6, t2, { vel: 0.6 });
    inv('C/G', t2, S('inv2').t1);
    bassWalker([[tRoot, 'C'], [a.w('inv1', 'E', 0), 'E'], [a.w('inv2', 'G', 0), 'G']], S('inv2').t1);
    a.ring(['C'], a.w('what', 'bass'), S('what').t1, { color: WHITE });
    a.ring(['E'], a.w('inv1', 'bass'), S('inv1').t1, { color: WHITE });
    a.ring(['G'], a.w('inv2', 'bass'), S('inv2').t1, { color: WHITE });

    // whiter shade: a generic bass walking down the scale under changing chords
    const WS = ['C', 'Em/B', 'Am', 'Am/G', 'F', 'F/E', 'Dm', 'Dm/C'];
    const WB = ['C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];
    const w0 = S('whiter').t0 + 0.1, wl = (S('whiter').t1 - w0) / 8;
    const wc = WS.map((c, i) => a.ch(c, w0 + i * wl, w0 + (i + 1) * wl, { bass: WB[i], vel: 0.75, strikes: [{ o: 0, v: 1 }, { o: wl / 2, v: 0.45 }] }));
    bassWalker(WB.map((n, i) => [wc[i].t0, n.replace(/\d/, '')]), S('whiter').t1);
    a.tag(0, a.w('whiter2', 'walks'), S('whiter').t1, 'STEP BY STEP', { x: 540, y: 474, color: GOLD });

    // air on the G string (public domain): slow bass in octaves, walking down
    a.scale(S('bach').t0, 'D');
    const AB = ['D', 'C#', 'B', 'A', 'G', 'F#', 'E', 'D'];
    const AO = [3, 3, 2, 2, 2, 2, 2, 2];
    const AC = ['D', 'F#m/C#', 'Bm', 'Bm/A', 'G', 'G/F#', 'Em', 'Em/D'];
    const b0 = S('bach').t0 + 0.1, bl = (S('bach').t1 - b0 - 0.3) / 8;
    AB.forEach((n, i) => {
      const t = b0 + i * bl;
      a.note(n + AO[i], t, bl / 2 * 0.95, { vel: 0.4, show: false });
      a.note(n + (AO[i] + 1), t + bl / 2, bl / 2 * 0.95, { vel: 0.36, show: false });
      a.ch(AC[i], t, t + bl, { bass: false, vel: 0.45 });
    });
    bassWalker(AB.map((n, i) => [b0 + i * bl, n]), S('bach').t1);

    // why1-3: the feel of each position
    a.scale(S('why1').t0, 'C');
    const r1 = a.w('why1b', 'C') - 0.04, r2 = a.w('why2', 'E') - 0.04, r3 = a.w('why3', 'G') - 0.04;
    inv('C', S('why1').t0 + 0.1, r1, { vel: 0.5 });
    inv('C', r1, S('why1').t1);
    a.big('SOLID · FINISHED', a.w('why1b', 'solid'), S('why1').t1, { y: 474, size: 44, family: 'DM Mono', weight: 500, color: TEAL });
    inv('C/E', r2, S('why2').t1);
    a.big('LIGHTER · STILL MOVING', a.w('why2', 'lighter'), S('why2').t1, { y: 474, size: 40, family: 'DM Mono', weight: 500, color: GOLD });
    const sl = 0.42;
    for (let t = r3, k = 0; t < S('why3').t1 - 0.05; t += sl, k++) inv('C/G', t, Math.min(t + sl, S('why3').t1), { vel: k % 2 ? 0.6 : 0.85 });
    a.big('WANTS TO MOVE', a.w('why3', 'unstable'), S('why3').t1, { y: 474, size: 48, family: 'DM Mono', weight: 500, color: RED });
    inv('C', S('why2').t0, r2, { vel: 0.4 });
    inv('C/E', S('why3').t0, r3, { vel: 0.4 });
    bassWalker([[S('why1').t0 + 0.1, 'C'], [r2, 'E'], [r3, 'G']], S('why3').t1);

    // why4: the cadential C/G -> G7 -> C
    const cG = S('why4').t0 + 0.05, cG7 = a.w('why4', 'final') - 0.04, cC = a.w('why4', 'cadence') + 0.35;
    inv('C/G', cG, cG7, { row: 0 });
    a.ch('G7', cG7, cC, { notes: ['B3', 'D4', 'F4'], bass: 'G2', row: 1 });
    a.ch('C', cC, S('why4').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', row: 2 });
    bassWalker([[cG, 'G'], [cC, 'C']], S('why4').t1);
    a.tag('C', cC + 0.1, S('why4').t1, 'HOME', { color: degColorC(0), dr: -92 });
    function degColorC(p) { return a.T.DEG12[p]; }

    // why5: root position jumps, inversions step
    const J = ['C', 'G', 'Am', 'F'], JB = ['C3', 'G2', 'A2', 'F2'];
    const j0 = S('why5').t0 + 0.1, j1 = a.at('why5b') - 0.1, jl = (j1 - j0) / 4;
    J.forEach((c, i) => a.ch(c, j0 + i * jl, j0 + (i + 1) * jl, { bass: JB[i], vel: 0.75 }));
    a.walker(JB.map((n, i) => [j0 + i * jl, n.replace(/\d/, '')]), { t1: j1, dr: -44, color: RED, label: 'JUMPS', labelDr: -46 });
    const P = ['C', 'G/B', 'Am', 'Am/G', 'F'], PB = ['C3', 'B2', 'A2', 'G2', 'F2'];
    const p0 = a.at('why5b'), pl = (S('why5').t1 - p0) / 5;
    P.forEach((c, i) => a.ch(c, p0 + i * pl, p0 + (i + 1) * pl, { bass: PB[i], vel: 0.8 }));
    a.walker(PB.map((n, i) => [p0 + i * pl, n.replace(/\d/, '')]), { t1: S('why5').t1, dr: -44, color: TEAL, label: 'STEPS', labelDr: -46 });

    // why6: the full stepwise descent, with the bass line sung on top of the keyboard
    const s0 = S('why6').t0 + 0.05, sL = (S('why6').t1 - s0) / 8;
    const sc = WS.map((c, i) => a.ch(c, s0 + i * sL, s0 + (i + 1) * sL, { bass: WB[i], vel: 0.75 }));
    bassWalker(WB.map((n, i) => [sc[i].t0, n.replace(/\d/, '')]), S('why6').t1);
    a.tag(0, a.w('why6', 'singable'), S('why6').t1, 'C B A G F E D C', { x: 540, y: 474, color: GOLD });

    // essence: root, first, second inversion, then home
    const e0 = S('essence').t0 + 0.1, el = 1.1;
    ['C', 'C/E', 'C/G'].forEach((c, i) => inv(c, e0 + i * el, e0 + (i + 1) * el, { vel: 0.8 }));
    a.ch('G7', e0 + 3 * el, e0 + 4 * el, { notes: ['B3', 'D4', 'F4'], bass: 'G2' });
    a.ch('C', e0 + 4 * el, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', row: 0 });
    bassWalker([[e0, 'C'], [e0 + el, 'E'], [e0 + 2 * el, 'G'], [e0 + 4 * el, 'C']], S('essence').t1);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
