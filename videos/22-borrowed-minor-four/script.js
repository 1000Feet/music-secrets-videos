// The borrowed minor four (iv): one note from the parallel minor, and a happy song aches.
module.exports = {
  slug: 'borrowed-minor-four',
  title: 'The Borrowed Minor Four',
  segments: [
    { id: 'hook',    text: "There's a chord that makes happy songs hurt..." },
    { id: 'hook2',   text: 'and it changes just one note.' },
    { id: 'what',    text: 'In G major, the four chord is C major: C, E, G.' },
    { id: 'what2',   text: 'Now drop the E a half step, to E flat. C major becomes C minor.' },
    { id: 'name',    text: "It's called the borrowed minor four." },
    { id: 'creep',   text: 'You hear it in Creep: G, B, C, and C minor.' },
    { id: 'life',    text: 'And the Beatles slip a D minor into In My Life, a song in A major.' },
    { id: 'why1',    text: 'So where does it come from?' },
    { id: 'why1b',   text: "It's borrowed from G minor, the parallel minor key." },
    { id: 'why2',    text: 'There, the four chord is naturally minor.' },
    { id: 'why3',    text: 'And only one note changes. E drops a half step to E flat...' },
    { id: 'why4',    text: 'then slides down again, to D, the fifth of G, as the song comes home.' },
    { id: 'why5',    text: "A tiny chromatic slide. That's the lump in your throat." },
    { id: 'creep2',  text: 'In Creep, even the B major chord is outside the key. It contains D sharp.' },
    { id: 'creep3',  text: 'So the progression keeps leaving the key, and coming back.' },
    { id: 'bitter',  text: 'Major home, minor shadow. That sound is bittersweet.' },
    { id: 'essence', text: 'Borrow one note from the sad side, and a happy song suddenly aches.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2'], gap: 0.2, label: 'IV → iv', title: 'THE MINOR FOUR', accent: true, tonic: 7, row: ['I', 'IV', 'iv', 'I'], min: 5.4 },
    { id: 'what', segs: ['what'], label: 'IN G MAJOR', title: 'THE FOUR CHORD', tonic: 7, row: ['I', 'IV', 'iv'], tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'ONE NOTE DOWN', title: 'C MINOR', tonic: 7, row: ['I', 'IV', 'iv'], tail: 0.8 },
    { id: 'name', segs: ['name'], label: 'ALSO CALLED', title: 'THE BORROWED iv', tonic: 7, row: ['I', 'IV', 'iv', 'I'], tail: 1.0 },
    { id: 'creep', segs: ['creep'], label: 'YOU HEAR IT IN', title: 'Creep', sub: 'Radiohead · 1992 · in G', tonic: 7, row: ['G', 'B', 'C', 'Cm'], tail: 3.0 },
    { id: 'life', segs: ['life'], label: 'YOU HEAR IT IN', title: 'In My Life', sub: 'The Beatles · 1965 · in A', tonic: 9, row: ['I', 'IV', 'iv', 'I'], tail: 2.8 },
    { id: 'why1', segs: ['why1', 'why1b'], gap: 0.2, label: 'BORROWED FROM', title: 'G MINOR', tonic: 7, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'IN G MINOR', title: 'iv IS NATURAL', tonic: 7, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE NOTE MOVES', tonic: 7, tail: 0.3 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'ONE NOTE MOVES', tonic: 7, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'A CHROMATIC SLIDE', title: 'E → Eb → D', tonic: 7, tail: 1.0 },
    { id: 'creep2', segs: ['creep2'], label: 'CREEP’S OTHER SECRET', title: 'B MAJOR', tonic: 7, row: ['G', 'B', 'C', 'Cm'], tail: 0.5 },
    { id: 'creep3', segs: ['creep3'], label: 'IN AND OUT', title: 'LEAVING THE KEY', tonic: 7, row: ['G', 'B', 'C', 'Cm'], tail: 1.6 },
    { id: 'bitter', segs: ['bitter'], label: 'MAJOR AND MINOR', title: 'BITTERSWEET', tonic: 7, circle: false, tail: 0.9 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE BORROWED NOTE', accent: true, tonic: 7, row: ['I', 'IV', 'iv', 'I'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#8d98ff';
    const V = { G: ['D4', 'G4', 'B4'], C: ['E4', 'G4', 'C5'], Cm: ['Eb4', 'G4', 'C5'], B: ['D#4', 'F#4', 'B4'] };
    const BASS = { G: 'G2', C: 'C3', Cm: 'C3', B: 'B2' };
    const arp = len => [1, 0.45, 0.6, 0.45, 0.8, 0.45, 0.6, 0.45].map((v, k) => ({ o: (k * len) / 8, v }));
    const loop = (t0, t1, names, o = {}) => {
      const len = (t1 - t0) / names.length;
      names.forEach((c, i) => a.ch(c, t0 + i * len, t0 + (i + 1) * len, {
        row: o.rows ? o.rows[i] : i, notes: (o.voicing || V)[c], bass: (o.bass || BASS)[c], vel: o.vel ?? 0.85, strikes: arp(len),
      }));
      if (o.drums) {
        const n = names.length * 2, st = (t1 - t0) / n;
        for (let i = 0; i < n; i++) { a.perc(i % 2 ? 'snare' : 'kick', t0 + i * st, 0.5); a.perc('hat', t0 + i * st + st / 2, 0.25); }
      }
    };

    // hook: a slow G - C - Cm - G
    a.scale(0.2, 'G', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    loop(0.3, S('hook').t1, ['G', 'C', 'Cm', 'G'], { vel: 0.6, rows: [0, 1, 2, 3] });

    // what: C major, the four chord of G
    const tC = a.w('what', 'C') - 0.04;
    a.ch('G', S('what').t0 + 0.05, tC, { row: 0, notes: V.G, bass: BASS.G, vel: 0.6 });
    a.ch('C', tC, a.w('what2', 'drop'), { row: 1, notes: V.C, bass: BASS.C });
    a.ring(['E'], a.w('what', 'E'), a.w('what2', 'flat'), { color: '#ffffff' });

    // what2: E drops to Eb -> C minor
    const tEb = a.w('what2', 'E', 1) - 0.04, tCm = a.w('what2', 'minor') - 0.04;
    a.ch('C', a.w('what2', 'drop'), tEb, { row: 1, notes: V.C, bass: BASS.C, vel: 0.5 });
    a.arc('E', 'Eb', a.w('what2', 'half') - 0.1, S('what2').t1, { steps: -1, color: RED, label: 'HALF STEP', labelR: 345 });
    a.ch('Cm', tEb, a.w('what2', 'C', 0) - 0.04, { row: 2, notes: V.Cm, bass: BASS.Cm });
    a.ring(['Eb'], tEb, S('what2').t1, { color: RED });
    a.ch('C', a.w('what2', 'C', 0) - 0.04, tCm, { row: 1, notes: V.C, bass: BASS.C, vel: 0.7 });
    a.ch('Cm', tCm, S('what2').t1, { row: 2, notes: V.Cm, bass: BASS.Cm });

    // name: the gesture, looping
    loop(S('name').t0 + 0.05, S('name').t1, ['G', 'C', 'Cm', 'G'], { rows: [0, 1, 2, 3], vel: 0.75 });
    a.tag(0, a.w('name', 'borrowed'), S('name').t1, 'Eb · THE BORROWED NOTE', { x: 540, y: 474, color: RED });

    // creep: chords on their spoken names, then the loop
    const cw = [a.w('creep', 'G'), a.w('creep', 'B'), a.w('creep', 'C', 0), a.w('creep', 'minor')].map(t => t - 0.04);
    const cEnd = a.end('creep') + 0.25;
    a.ch('G', S('creep').t0 + 0.05, cw[0], { row: 0, notes: V.G, bass: BASS.G, vel: 0.5 });
    ['G', 'B', 'C', 'Cm'].forEach((c, i) => a.ch(c, cw[i], i < 3 ? cw[i + 1] : cEnd, { row: i, notes: V[c], bass: BASS[c] }));
    loop(cEnd, S('creep').t1, ['G', 'B', 'C', 'Cm'], { drums: true, vel: 0.9 });

    // in my life: A major with a D minor
    a.scale(S('life').t0, 'A');
    const LV = { A: ['C#4', 'E4', 'A4'], D: ['D4', 'F#4', 'A4'], Dm: ['D4', 'F4', 'A4'] };
    const LB = { A: 'A2', D: 'D3', Dm: 'D3' };
    const tDm = a.w('life', 'D') - 0.04, tA = a.w('life', 'A') - 0.04, lEnd = a.end('life') + 0.2;
    a.ch('A', S('life').t0 + 0.05, tDm - 1.0, { row: 0, notes: LV.A, bass: LB.A, vel: 0.6 });
    a.ch('D', tDm - 1.0, tDm, { row: 1, notes: LV.D, bass: LB.D, vel: 0.6 });
    a.ch('Dm', tDm, tA, { row: 2, notes: LV.Dm, bass: LB.Dm });
    a.ring(['F'], tDm, tA, { color: RED });
    a.ch('A', tA, lEnd, { row: 3, notes: LV.A, bass: LB.A });
    loop(lEnd, S('life').t1, ['A', 'D', 'Dm', 'A'], { voicing: LV, bass: LB, drums: true, vel: 0.85 });

    // why1/why2: G minor, where the four chord is naturally minor
    a.scale(S('why1').t0, 'G');
    a.ch('Cm', S('why1').t0 + 0.1, a.w('why2', 'four') - 0.04, { notes: V.Cm, bass: BASS.Cm, vel: 0.6 });
    const tGm = a.w('why1b', 'G');
    a.scale(tGm, 'G', a.T.MINOR);
    a.ring(['Bb', 'Eb'], tGm + 0.3, a.w('why2', 'four'), { color: BLUE });
    a.melody([['G3', 1], ['A3', 1], ['Bb3', 1], ['C4', 1], ['D4', 1], ['Eb4', 1], ['F4', 1], ['G4', 2]], tGm + 0.2, 0.2, { vel: 0.22 });
    const tNat = a.w('why2', 'naturally');
    a.ch('Cm', a.w('why2', 'four') - 0.04, S('why2').t1, { notes: V.Cm, bass: BASS.Cm });
    a.tag('C', a.w('why2', 'four'), S('why2').t1, 'iv', { color: degColor(0, 7), dr: -92 });
    a.ring(['C', 'Eb', 'G'], tNat, S('why2').t1, { color: '#ffffff' });

    // why3/why4: E -> Eb -> D, one voice sliding down by half steps
    a.scale(S('why3').t0, 'G');
    const tE = a.w('why3', 'E') - 0.04, tF = a.w('why3', 'flat') - 0.3, tD = a.w('why4', 'D') - 0.04;
    a.ch('C', S('why3').t0 + 0.1, tF, { notes: V.C, bass: BASS.C, vel: 0.75 });
    a.ch('Cm', tF, tD, { notes: V.Cm, bass: BASS.Cm });
    a.ch('G', tD, S('why4').t1, { notes: V.G, bass: BASS.G });
    a.walker([[tE, 'E'], [tF, 'Eb'], [tD, 'D']], { t1: S('why4').t1, dr: -40, color: GOLD });
    a.arc('E', 'Eb', tF, S('why4').t1, { steps: -1, color: RED, label: 'HALF', labelR: 345 });
    a.arc('Eb', 'D', tD, S('why4').t1, { steps: -1, color: RED, label: 'HALF', labelR: 345 });
    a.tag(0, a.w('why4', 'fifth'), S('why4').t1, 'D · THE FIFTH OF G', { x: 540, y: 474, color: GOLD });
    a.tag('G', a.w('why4', 'home'), S('why4').t1, 'HOME', { color: degColor(7, 7), dr: -92 });
    function degColor(p, t) { return a.T.DEG12[((p - t) % 12 + 12) % 12]; }

    // why5: the slide once more, slowly, with the voice on top
    const s0 = S('why5').t0 + 0.1, sl = (S('why5').t1 - s0 - 0.2) / 3;
    a.ch('C', s0, s0 + sl, { notes: V.C, bass: BASS.C, vel: 0.75 });
    a.ch('Cm', s0 + sl, s0 + 2 * sl, { notes: V.Cm, bass: BASS.Cm, vel: 0.8 });
    a.ch('G', s0 + 2 * sl, S('why5').t1, { notes: V.G, bass: BASS.G, vel: 0.8 });
    a.note('E5', s0, sl, { vel: 0.3, show: false }); a.note('Eb5', s0 + sl, sl, { vel: 0.3, show: false }); a.note('D5', s0 + 2 * sl, sl + 0.2, { vel: 0.3, show: false });
    a.walker([[s0, 'E'], [s0 + sl, 'Eb'], [s0 + 2 * sl, 'D']], { t1: S('why5').t1, dr: -40, color: GOLD });

    // creep2: B major holds D#, outside G major
    const tB = a.w('creep2', 'B') - 0.04;
    a.ch('G', S('creep2').t0 + 0.05, tB, { row: 0, notes: V.G, bass: BASS.G, vel: 0.6 });
    a.ch('B', tB, S('creep2').t1, { row: 1, notes: V.B, bass: BASS.B });
    a.ring(['Eb'], a.w('creep2', 'D'), S('creep2').t1, { color: RED });
    a.tag(0, a.w('creep2', 'outside'), S('creep2').t1, 'D# · OUTSIDE THE KEY', { x: 540, y: 474, color: RED });

    // creep3: in, out, in, out
    const q0 = S('creep3').t0 + 0.05, q1 = S('creep3').t1, ql = (q1 - q0) / 8;
    loop(q0, q1, ['G', 'B', 'C', 'Cm', 'G', 'B', 'C', 'Cm'], { rows: [0, 1, 2, 3, 0, 1, 2, 3], drums: true, vel: 0.85 });
    for (let i = 0; i < 8; i++) {
      const out = i % 2 === 1;
      a.tag(0, q0 + i * ql, q0 + (i + 1) * ql, out ? 'OUT OF THE KEY' : 'IN THE KEY', { x: 540, y: 474, color: out ? RED : TEAL });
    }

    // bitter: major home vs minor shadow
    const b0 = S('bitter').t0 + 0.05, b1 = S('bitter').t1, bm = a.w('bitter', 'minor') - 0.04, bs = a.w('bitter', 'bittersweet') - 0.04;
    const g = a.grid([{ label: 'G', sub: 'MAJOR HOME', color: GOLD, size: 96 }, { label: 'Cm', sub: 'MINOR SHADOW', color: BLUE, size: 96 }], b0, b1, { rows: 1, cols: 2, cw: 460, chh: 300, y: 620 });
    g.active.push({ t0: b0, t1: bm, i: 0 }, { t0: bm, t1: bs, i: 1 }, { t0: bs, t1: b1, i: 0 }, { t0: bs, t1: b1, i: 1 });
    a.ch('G', b0, bm, { notes: V.G, bass: BASS.G, vel: 0.8 });
    a.ch('Cm', bm, bs, { notes: V.Cm, bass: BASS.Cm, vel: 0.85 });
    a.ch('G', bs, b1, { notes: ['D4', 'G4', 'B4', 'D5'], bass: BASS.G, vel: 0.8 });

    // essence: once more, landing home
    const e0 = S('essence').t0 + 0.1, el = 1.2;
    ['G', 'C', 'Cm'].forEach((c, i) => a.ch(c, e0 + i * el, e0 + (i + 1) * el, { row: i, notes: V[c], bass: BASS[c], strikes: arp(el), vel: 0.8 }));
    a.ch('G', e0 + 3 * el, S('essence').t1 - 0.3, { row: 3, notes: ['D4', 'G4', 'B4', 'D5'], bass: 'G2' });
    a.note('E5', e0 + el, el, { vel: 0.26, show: false }); a.note('Eb5', e0 + 2 * el, el, { vel: 0.28, show: false }); a.note('D5', e0 + 3 * el, 2.5, { vel: 0.28, show: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
