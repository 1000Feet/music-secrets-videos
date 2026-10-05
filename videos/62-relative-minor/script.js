// The relative minor: same notes, same chords - a different home, a different mood.
module.exports = {
  slug: 'relative-minor',
  title: 'Same Chords, Sad Song',
  segments: [
    { id: 'hook',    text: 'Same chords. One song sounds hopeful, another sounds dark. Why?' },
    { id: 'what',    text: 'Every major key shares its notes with a minor key. C major and A minor: the same seven white keys.' },
    { id: 'what2',   text: 'Only home is different: A, the sixth note.' },
    { id: 'letit',   text: 'Let It Be: C, G, A minor, F. Hopeful.' },
    { id: 'zombie',  text: "Zombie: E minor, C, G, D. G major's chords, but starting on the minor one. Dark." },
    { id: 'desp',    text: 'Despacito does it too: B minor, G, D, A.' },
    { id: 'why1',    text: 'So why does the mood flip? Rotate C, G, A minor, F to start on A minor:' },
    { id: 'why2',    text: 'A minor, F, C, G. Same four chords, different first chord.' },
    { id: 'home',    text: 'Your ear treats the chord you start on, and keep returning to, as home.' },
    { id: 'third',   text: 'A minor home chord has a minor third: A to C, three half steps. Major has four.' },
    { id: 'third2',  text: 'That one half step is the sad color.' },
    { id: 'sig',     text: "That's why C major and A minor share a key signature: no sharps, no flats." },
    { id: 'sig2',    text: 'Every major key has a relative minor, three half steps below.' },
    { id: 'essence', text: "Happy or sad isn't in the notes. It's where you decide home is." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SAME CHORDS, SAD SONG', title: 'THE RELATIVE MINOR', accent: true, tonic: 0, min: 5.6, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'SAME SEVEN NOTES', title: 'C MAJOR = A MINOR', tonic: 0, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'DIFFERENT HOME', title: 'THE SIXTH NOTE', tonic: 9, tail: 0.5 },
    { id: 'letit', segs: ['letit'], label: 'YOU HEAR IT IN', title: 'Let It Be', sub: 'The Beatles · 1970 · in C', tonic: 0, row: ['C', 'G', 'Am', 'F'], tail: 1.4 },
    { id: 'zombie', segs: ['zombie'], label: 'YOU HEAR IT IN', title: 'Zombie', sub: 'The Cranberries · 1994', tonic: 4, row: ['Em', 'C', 'G', 'D'], tail: 1.0 },
    { id: 'desp', segs: ['desp'], label: 'YOU HEAR IT IN', title: 'Despacito', sub: 'Luis Fonsi ft. Daddy Yankee · 2017', tonic: 11, row: ['Bm', 'G', 'D', 'A'], tail: 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY THE MOOD FLIPS', title: 'ROTATE IT', tonic: 0, row: ['C', 'G', 'Am', 'F'], tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY THE MOOD FLIPS', title: 'ROTATE IT', tonic: 9, row: ['Am', 'F', 'C', 'G'], tail: 0.5 },
    { id: 'home', segs: ['home'], label: 'THE FIRST CHORD', title: 'BECOMES HOME', tonic: 9, tail: 0.6 },
    { id: 'third', segs: ['third', 'third2'], label: 'MINOR VS MAJOR', title: 'ONE HALF STEP', tonic: 9, gap: 0.3, tail: 0.6 },
    { id: 'sig', segs: ['sig', 'sig2'], label: 'KEY SIGNATURE', title: 'RELATIVE KEYS', tonic: 0, gap: 0.3, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'WHERE HOME IS', accent: true, tonic: 9, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const MAJ = a.T.MAJOR, MIN = a.T.MINOR;
    const V = {
      C: [['C4', 'E4', 'G4'], 'C3'], G: [['B3', 'D4', 'G4'], 'G2'], Am: [['C4', 'E4', 'A4'], 'A2'], F: [['C4', 'F4', 'A4'], 'F2'],
      Em: [['B3', 'E4', 'G4'], 'E2'], D: [['A3', 'D4', 'F#4'], 'D3'], Bm: [['B3', 'D4', 'F#4'], 'B2'], A: [['A3', 'C#4', 'E4'], 'A2'],
    };
    // a chord loop; o.beats strikes per chord, o.drums(t, i, beat) for a groove
    const loop = (names, t0, t1, o = {}) => {
      const len = (t1 - t0) / names.length, beats = o.beats ?? 2;
      names.forEach((c, i) => a.ch(c, t0 + i * len, t0 + (i + 1) * len, {
        notes: V[c][0], bass: V[c][1], row: o.rows ? o.rows[i] : null, vel: o.vel ?? 0.8, hideName: o.hideName,
        strikes: Array.from({ length: beats }, (_, k) => ({ o: k * len / beats, v: k ? 0.5 : 1 })),
      }));
      if (o.drums) { const beat = len / 4; for (let i = 0; i < names.length * 4; i++) o.drums(t0 + i * beat, i, beat); }
    };
    const rock = (t, i, beat) => { a.perc(i % 2 ? 'snare' : 'kick', t, 0.65); a.perc('hat', t + beat / 2, 0.3); };
    const latin = (t, i, beat) => { a.perc('kick', t, 0.6); a.perc('snare', t + beat * 0.75, 0.4); if (i % 2) a.perc('snare', t + beat * 0.5, 0.35); a.perc('hat', t + beat / 2, 0.2); };

    // ---- hook: the same loop, once from C, once from Am ----
    const h1 = S('hook').t1, hm = a.w('hook', 'another') - 0.1;
    a.scale(0.2, 'C', MAJ, { popIn: { t0: 0.3, step: 0.12 } });
    loop(['C', 'G', 'Am', 'F'], 0.3, hm, { vel: 0.6, beats: 2 });
    a.scale(hm, 'A', MIN);
    loop(['Am', 'F', 'C', 'G'], hm, h1 - 0.6, { vel: 0.6, beats: 2 });
    a.ch('Am', h1 - 0.6, h1, { notes: V.Am[0], bass: 'A2', vel: 0.6 });
    a.tag('C', 1.0, hm, 'HOPEFUL', { x: 540, y: 462, color: GOLD });
    a.tag('A', hm, h1, 'DARK', { x: 540, y: 462, color: BLUE });

    // ---- what: C major's seven notes = A minor's seven notes ----
    const w0 = S('what').t0, tAm = a.w('what', 'A'), tWhite = a.w('what', 'white');
    a.scale(w0, 'C', MAJ);
    a.ch('C', w0 + 0.1, tAm - 0.05, { notes: V.C[0], bass: 'C3', vel: 0.6 });
    a.ring(['C'], a.w('what', 'C'), tAm, { color: PINK });
    a.scale(tAm, 'A', MIN);
    a.ch('Am', tAm - 0.05, S('what').t1, { notes: V.Am[0], bass: 'A2', vel: 0.65 });
    a.ring(['A'], tAm, S('what').t1, { color: BLUE });
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].forEach((n, i) => a.note(n, tWhite + i * 0.12, 0.6, { vel: 0.2 }));
    a.big('SAME 7 NOTES', tWhite, S('what').t1, { y: 462, size: 48, ...MONO, color: GOLD });

    // ---- what2: home moves to A, the sixth note of C major ----
    const x0 = S('what2').t0, tSix = a.w('what2', 'sixth');
    a.scale(x0, 'A', MIN);
    a.walker([[x0 + 0.1, 'C'], [a.w('what2', 'A'), 'A']], { t1: S('what2').t1, dr: 34, color: '#ffffff' });
    a.arc('C', 'A', a.w('what2', 'A'), S('what2').t1, { steps: -3, color: TEAL, dr: 30 });
    a.ch('Am', x0 + 0.1, S('what2').t1, { notes: V.Am[0], bass: 'A2', vel: 0.6 });
    a.tag('A', a.w('what2', 'A'), S('what2').t1, 'HOME', { color: BLUE, dr: -92 });
    a.big('DEGREE 6 OF C MAJOR', tSix, S('what2').t1, { y: 462, size: 40, ...MONO, color: TEAL });

    // ---- songs (copyrighted): chords only, generic grooves ----
    const L0 = S('letit').t0 + 0.1, L1 = S('letit').t1;
    a.scale(S('letit').t0, 'C', MAJ);
    loop(['C', 'G', 'Am', 'F'], L0, L1, { rows: [0, 1, 2, 3], beats: 4, vel: 0.75 });
    a.ring(['C'], L0, L1, { color: GOLD });

    const Z0 = S('zombie').t0 + 0.1, Z1 = S('zombie').t1;
    a.scale(S('zombie').t0, 'E', MIN);
    loop(['Em', 'C', 'G', 'D'], Z0, Z1, { rows: [0, 1, 2, 3], beats: 4, vel: 0.85, drums: rock });
    a.ring(['E'], a.w('zombie', 'minor', 1), Z1, { color: BLUE });

    const D0 = S('desp').t0 + 0.1, D1 = S('desp').t1;
    a.scale(S('desp').t0, 'B', MIN);
    loop(['Bm', 'G', 'D', 'A'], D0, D1, { rows: [0, 1, 2, 3], beats: 4, vel: 0.8, drums: latin });
    a.ring(['B'], a.w('desp', 'B'), D1, { color: BLUE });

    // ---- why1: C G Am F, then rotate to start on Am ----
    const r0 = S('why1').t0 + 0.05, tRot = a.w('why1', 'Rotate') - 0.05;
    a.scale(S('why1').t0, 'C', MAJ);
    loop(['C', 'G', 'Am', 'F'], tRot, S('why1').t1, { rows: [0, 1, 2, 3], beats: 2, vel: 0.75 });
    a.ch('C', r0, tRot, { notes: V.C[0], bass: 'C3', vel: 0.45, hideName: true, shape: false });
    a.ring(['A'], a.w('why1', 'A', 1), S('why1').t1, { color: BLUE });

    const s0 = S('why2').t0;
    a.scale(s0, 'A', MIN);
    const tq = [a.w('why2', 'A'), a.w('why2', 'F'), a.w('why2', 'C'), a.w('why2', 'G')].map(t => t - 0.05);
    ['Am', 'F', 'C', 'G'].forEach((c, i) => a.ch(c, i ? tq[i] : s0 + 0.05, i < 3 ? tq[i + 1] : a.w('why2', 'different'), { notes: V[c][0], bass: V[c][1], row: i, vel: 0.8 }));
    loop(['Am', 'F', 'C', 'G'], a.w('why2', 'different'), S('why2').t1, { rows: [0, 1, 2, 3], beats: 2, vel: 0.7 });
    a.ring(['A'], s0 + 0.1, S('why2').t1, { color: BLUE });
    a.tag('A', a.w('why2', 'different'), S('why2').t1, 'NEW START', { color: BLUE, dr: -92 });

    // ---- home: start on Am, keep coming back to it ----
    const m0 = S('home').t0 + 0.05, m1 = S('home').t1, mh = (m1 - m0) / 6;
    a.scale(S('home').t0, 'A', MIN);
    ['Am', 'F', 'Am', 'G', 'Am', 'Am'].forEach((c, i) => a.ch(c, m0 + i * mh, m0 + (i + 1) * mh, { notes: V[c][0], bass: V[c][1], vel: c === 'Am' ? 0.85 : 0.6 }));
    a.ring(['A'], a.w('home', 'start'), m1, { color: BLUE });
    a.tag('A', a.w('home', 'home'), m1, 'HOME', { color: BLUE, dr: -92 });
    a.big('START · RETURN · REST', a.w('home', 'returning'), m1, { y: 462, size: 40, ...MONO, color: BLUE });

    // ---- third: A to C (3 half steps) vs A to C# (4), the sad colour ----
    const q0 = S('third').t0, tA = a.w('third', 'A', 1), tC = a.w('third', 'C'), tFour = a.w('third', 'four'), q1 = S('third').t1, t2 = a.at('third2');
    a.scale(q0, 'A', MIN);
    a.ch('Am', q0 + 0.1, tFour - 0.05, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.7 });
    a.ring(['A'], a.w('third', 'home'), tA, { color: BLUE });
    a.arc('A', 'C', tA, q1, { steps: 3, color: BLUE, dr: 30 });
    a.note('A4', tA, 0.5, { vel: 0.32 }); a.note('C5', tC, 0.8, { vel: 0.32 });
    a.big('A → C · 3 HALF STEPS', tC, tFour, { y: 462, size: 42, ...MONO, color: BLUE });
    a.ch('A', tFour - 0.05, t2 - 0.1, { notes: ['A3', 'C#4', 'E4'], bass: 'A2', vel: 0.7 });
    a.arc('A', 'C#', tFour, t2, { steps: 4, color: GOLD, dr: 30 });
    a.big('A → C# · 4 HALF STEPS', tFour, t2, { y: 462, size: 42, ...MONO, color: GOLD });
    a.ch('Am', t2 - 0.1, q1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.75 });
    a.ring(['C', 'C#'], a.w('third2', 'half'), q1, { color: RED });
    a.arc('C#', 'C', a.w('third2', 'half'), q1, { steps: -1, color: RED, dr: 30 });
    a.big('ONE HALF STEP = SAD', a.w('third2', 'half'), q1, { y: 462, size: 44, ...MONO, color: RED });

    // ---- sig: no sharps, no flats; every major key has its relative minor 3 half steps below ----
    const k0 = S('sig').t0, k1 = S('sig').t1, tEvery = a.w('sig2', 'Every'), tBelow = a.w('sig2', 'three');
    a.scale(k0, 'C', MAJ);
    a.ch('C', k0 + 0.1, a.w('sig', 'A') - 0.05, { notes: V.C[0], bass: 'C3', vel: 0.55 });
    a.ch('Am', a.w('sig', 'A') - 0.05, tEvery, { notes: V.Am[0], bass: 'A2', vel: 0.55 });
    a.ring(['C'], a.w('sig', 'C'), tEvery, { color: PINK });
    a.ring(['A'], a.w('sig', 'A'), tEvery, { color: BLUE });
    a.big('NO SHARPS · NO FLATS', a.w('sig', 'no'), tEvery, { y: 462, size: 44, ...MONO, color: '#ffffff' });
    // pairs: C/Am, G/Em, D/Bm - the keys of our three songs
    const PAIRS = [['C', 'A', 'C', 'Am'], ['G', 'E', 'G', 'Em'], ['D', 'B', 'D', 'Bm']];
    const pl = (k1 - tEvery - 0.2) / PAIRS.length;
    PAIRS.forEach(([M, m, cM, cm], i) => {
      const t = tEvery + i * pl;
      a.scale(t, M, MAJ);
      a.ch(cM, t, t + pl * 0.45, { notes: V[cM][0], bass: V[cM][1], vel: 0.6 });
      a.ch(cm, t + pl * 0.45, t + pl, { notes: V[cm][0], bass: V[cm][1], vel: 0.65 });
      a.arc(M, m, t + 0.1, t + pl, { steps: -3, color: TEAL, dr: 30, label: t + 0.1 >= tBelow - 0.5 ? '3 DOWN' : undefined, labelR: 165 });
      a.big(`${M} MAJOR → ${m} MINOR`, t, t + pl, { y: 462, size: 44, ...MONO, color: TEAL });
    });

    // ---- essence: the minor loop, landing home on A minor ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1, eL = a.at('cta') - 0.1;
    a.scale(S('essence').t0, 'A', MIN);
    loop(['Am', 'F', 'C', 'G'], e0, eL, { rows: null, beats: 2, vel: 0.75 });
    a.ch('Am', eL, e1 - 0.3, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.75 });
    a.ring(['A'], eL, e1, { color: BLUE });
    a.tag('A', eL + 0.2, e1, 'HOME', { color: BLUE, dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
