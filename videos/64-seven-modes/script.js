// Seven modes, one scale: the white keys started on each note. Same notes, seven homes, seven moods.
// Songs: Scarborough Fair (traditional) only as scale fragments; Norwegian Wood is named only.
module.exports = {
  slug: 'seven-modes',
  title: 'Seven Modes, One Scale',
  segments: [
    { id: 'hook',    text: 'Seven white keys. Start on a different one, and the mood changes.' },
    { id: 'what',    text: 'Start on C: Ionian. D is Dorian, E Phrygian, F Lydian, G Mixolydian, A Aeolian, B Locrian.' },
    { id: 'what2',   text: 'Same notes, seven moods.' },
    { id: 'pop',     text: 'Ionian: the major scale of most pop songs.' },
    { id: 'aeol',    text: 'Aeolian: the natural minor.' },
    { id: 'scar',    text: 'Dorian is how Scarborough Fair is usually sung...' },
    { id: 'nw',      text: 'Mixolydian: Norwegian Wood by The Beatles...' },
    { id: 'phry',    text: 'and Phrygian, the dark sound of flamenco and metal riffs.' },
    { id: 'why1',    text: "So why so different? The notes never change. Only home does." },
    { id: 'why2',    text: 'So the half steps land in different places relative to home.' },
    { id: 'why3',    text: "Each mode has a signature note: Dorian's raised sixth, Phrygian's flat second..." },
    { id: 'why3b',   text: "Lydian's sharp fourth, Mixolydian's flat seventh." },
    { id: 'why4',    text: 'From brightest to darkest: Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian.' },
    { id: 'why4b',   text: 'Each step lowers exactly one note.' },
    { id: 'why5',    text: 'The names come from ancient Greek regions...' },
    { id: 'why5b',   text: "but the church modes don't match how the Greeks used them." },
    { id: 'essence', text: 'Seven notes, seven moods. The home you choose changes everything.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE SCALE', title: 'SEVEN MODES', accent: true, tonic: 0, min: 5.2 },
    { id: 'what', segs: ['what'], label: 'THE WHITE KEYS', title: 'SEVEN HOMES', tonic: 0, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'THE WHITE KEYS', title: 'SEVEN MOODS', tonic: 0, tail: 0.6 },
    { id: 'pop', segs: ['pop'], label: 'YOU HEAR IT IN', title: 'Most pop songs', sub: 'Ionian · C to C', tonic: 0, row: ['C', 'G', 'Am', 'F'], tail: 0.9 },
    { id: 'aeol', segs: ['aeol'], label: 'AEOLIAN · A TO A', title: 'NATURAL MINOR', tonic: 9, tail: 1.1 },
    { id: 'scar', segs: ['scar'], label: 'YOU HEAR IT IN', title: 'Scarborough Fair', sub: 'Traditional ballad · Dorian', tonic: 2, tail: 2.0 },
    { id: 'nw', segs: ['nw'], label: 'YOU HEAR IT IN', title: 'Norwegian Wood', sub: 'The Beatles · 1965 · Mixolydian', tonic: 7, tail: 1.8 },
    { id: 'phry', segs: ['phry'], label: 'YOU HEAR IT IN', title: 'Flamenco · Metal', sub: 'Phrygian · E to E', tonic: 4, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'ONLY HOME MOVES', tonic: 0, tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE HALF STEPS', tonic: 0, tail: 0.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'SIGNATURE NOTES', title: 'ONE NOTE EACH', tonic: 2, gap: 0.2, tail: 0.5 },
    { id: 'why4', segs: ['why4'], label: 'ALL FROM C', title: 'BRIGHT TO DARK', tonic: 0, tail: 0.3 },
    { id: 'why4b', segs: ['why4b'], label: 'ALL FROM C', title: 'BRIGHT TO DARK', tonic: 0, tail: 0.6 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'THE NAMES', title: 'GREEK, BUT NOT QUITE', tonic: 2, circle: false, gap: 0.2, tail: 0.5 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'CHOOSE YOUR HOME', accent: true, tonic: 0, gap: 0.4, tail: 1.5 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const M = {
      Ionian: [0, 2, 4, 5, 7, 9, 11], Dorian: [0, 2, 3, 5, 7, 9, 10], Phrygian: [0, 1, 3, 5, 7, 8, 10], Lydian: [0, 2, 4, 6, 7, 9, 11],
      Mixolydian: [0, 2, 4, 5, 7, 9, 10], Aeolian: [0, 2, 3, 5, 7, 8, 10], Locrian: [0, 1, 3, 5, 6, 8, 10],
    };
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    // the seven white-key modes: tonic, mode, home chord voicing, bass
    const WM = [
      ['C', 'Ionian', 'C', ['C4', 'E4', 'G4'], 'C3'], ['D', 'Dorian', 'Dm', ['D4', 'F4', 'A4'], 'D3'], ['E', 'Phrygian', 'Em', ['E4', 'G4', 'B4'], 'E3'],
      ['F', 'Lydian', 'F', ['C4', 'F4', 'A4'], 'F2'], ['G', 'Mixolydian', 'G', ['B3', 'D4', 'G4'], 'G2'], ['A', 'Aeolian', 'Am', ['C4', 'E4', 'A4'], 'A2'],
      ['B', 'Locrian', 'Bdim', ['B3', 'D4', 'F4'], 'B2'],
    ];
    const pcN = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const homeChord = (k, t0, t1, o = {}) => { const [n, , c, v, b] = WM[k]; return a.ch(c, t0, t1, { notes: v, bass: b, tonic: pcN[n], vel: o.vel ?? 0.75, row: o.row ?? null, hideName: o.hideName, strikes: o.strikes }); };
    const run = (list, t0, step, vel = 0.28, show = true) => list.forEach((n, i) => a.note(n, t0 + i * step, step * 1.6, { vel, show }));

    // ---- hook: white keys pop in, then the home chord walks C, D, E... ----
    a.scale(0.2, 'C', M.Ionian, { popIn: { t0: 0.3, step: 0.18 } });
    run(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], 0.3, 0.18, 0.26);
    const h0 = 1.9, hl = (S('hook').t1 - h0) / 4;
    [0, 1, 2, 5].forEach((k, i) => homeChord(k, h0 + i * hl, h0 + (i + 1) * hl, { vel: 0.6 }));
    a.walker([0, 1, 2, 5].map((k, i) => [h0 + i * hl, WM[k][0]]), { t1: S('hook').t1, dr: 34, color: '#ffffff', label: 'HOME', labelDr: 82 });

    // ---- what: each white key as home, on its spoken name ----
    const tw = WM.map(([n], i) => a.w('what', n, 0));
    WM.forEach(([n, mode], i) => {
      const t0 = tw[i] - 0.04, t1 = i < 6 ? tw[i + 1] - 0.04 : S('what').t1;
      a.scale(t0, n, M[mode]);
      homeChord(i, t0, t1, { vel: 0.7 });
      a.big(mode.toUpperCase(), t0, t1, { y: 460, size: 40, ...MONO, color: GOLD });
    });
    a.walker(WM.map(([n], i) => [tw[i] - 0.04, n]), { t1: S('what').t1, dr: 34, color: '#ffffff' });

    // ---- what2: same notes, seven moods (the seven home chords, quickly) ----
    a.scale(S('what2').t0, 'C', M.Ionian);
    const q0 = S('what2').t0 + 0.1, ql = (S('what2').t1 - q0 - 0.1) / 7;
    WM.forEach((m, i) => homeChord(i, q0 + i * ql, q0 + (i + 1) * ql, { vel: 0.55 }));
    a.walker(WM.map(([n], i) => [q0 + i * ql, n]), { t1: S('what2').t1, dr: 34, color: GOLD });

    // ---- pop: Ionian, a generic I - V - vi - IV with drums ----
    a.scale(S('pop').t0, 'C', M.Ionian);
    const p0 = S('pop').t0 + 0.05, pl = (S('pop').t1 - p0) / 4;
    const POP = [['C', ['C4', 'E4', 'G4'], 'C3'], ['G', ['B3', 'D4', 'G4'], 'G2'], ['Am', ['C4', 'E4', 'A4'], 'A2'], ['F', ['C4', 'F4', 'A4'], 'F2']];
    POP.forEach(([c, v, b], i) => a.ch(c, p0 + i * pl, p0 + (i + 1) * pl, { notes: v, bass: b, row: i, strikes: [{ o: 0, v: 1 }, { o: pl / 2, v: 0.6 }] }));
    for (let i = 0; i < 16; i++) { const t = p0 + i * pl / 4; a.perc(i % 2 ? 'snare' : 'kick', t, 0.55); a.perc('hat', t + pl / 8, 0.3); }

    // ---- aeol: A to A, natural minor ----
    a.scale(S('aeol').t0, 'A', M.Aeolian);
    a.ch('Am', S('aeol').t0 + 0.1, S('aeol').t1, { notes: ['C4', 'E4', 'A4'], bass: 'A2', vel: 0.55, tonic: 9 });
    run(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'], a.w('aeol', 'natural'), 0.24, 0.28);
    a.tag('A', S('aeol').t0 + 0.3, S('aeol').t1, 'HOME', { dr: -75 });

    // ---- Scarborough Fair: D Dorian scale fragments over a soft D drone (no tune) ----
    a.scale(S('scar').t0, 'D', M.Dorian);
    a.ch('Dm', S('scar').t0 + 0.1, S('scar').t1, { notes: ['A3', 'D4'], bass: 'D2', vel: 0.4, shape: false, hideName: true, tonic: 2,
      strikes: [0, 1, 2, 3, 4].map(i => ({ o: i * 1.8, v: 0.7 })) });
    const s0 = a.w('scar', 'Fair');
    run(['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'E4', 'F4', 'A4', 'B4', 'C5', 'D5'], s0, 0.27, 0.26);
    a.ring(['B'], s0 + 5 * 0.27, S('scar').t1, { color: GOLD });
    a.tag('B', s0 + 5 * 0.27, S('scar').t1, 'RAISED 6TH', { color: GOLD });

    // ---- Norwegian Wood: named only; a generic G Mixolydian colour (G and F, no song material) ----
    a.scale(S('nw').t0, 'G', M.Mixolydian);
    const n0 = S('nw').t0 + 0.1, nl = (S('nw').t1 - n0) / 4;
    [['G', ['B3', 'D4', 'G4'], 'G2'], ['F', ['C4', 'F4', 'A4'], 'F2'], ['G', ['B3', 'D4', 'G4'], 'G2'], ['F', ['C4', 'F4', 'A4'], 'F2']].forEach(([c, v, b], i) =>
      a.ch(c, n0 + i * nl, n0 + (i + 1) * nl, { notes: v, bass: b, tonic: 7, vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: nl / 3, v: 0.45 }, { o: 2 * nl / 3, v: 0.45 }] }));
    a.ring(['F'], a.w('nw', 'Mixolydian') + 0.3, S('nw').t1, { color: LILAC });
    a.tag('F', a.w('nw', 'Mixolydian') + 0.3, S('nw').t1, 'FLAT 7TH', { color: LILAC });

    // ---- Phrygian: E - F flamenco strums, then a low E chug with F ----
    a.scale(S('phry').t0, 'E', M.Phrygian);
    const ras = [0, 0.06, 0.12, 0.18].map((o, i) => ({ o, v: 1 - i * 0.15 }));
    const f0 = S('phry').t0 + 0.1, fm = a.w('phry', 'metal') - 0.05, f1 = S('phry').t1;
    const fl = (fm - f0) / 4;
    ['E', 'F', 'E', 'F'].forEach((c, i) => a.ch(c, f0 + i * fl, f0 + (i + 1) * fl, { notes: c === 'E' ? ['G#3', 'B3', 'E4'] : ['A3', 'C4', 'F4'], bass: c === 'E' ? 'E2' : 'F2', strikes: ras, tonic: 4, vel: 0.7 }));
    const cl = (f1 - fm) / 6;
    ['E5', 'E5', 'F5', 'E5', 'E5', 'F5'].forEach((c, i) => {
      a.ch(c, fm + i * cl, fm + (i + 1) * cl, { notes: c === 'E5' ? ['E3', 'B3'] : ['F3', 'C4'], bass: c === 'E5' ? 'E2' : 'F2', tonic: 4, vel: 0.8, strikes: [{ o: 0, v: 1 }, { o: cl / 2, v: 0.7 }] });
      a.perc('kick', fm + i * cl, 0.8); a.perc('kick', fm + i * cl + cl / 2, 0.6); a.perc('snare', fm + i * cl + cl / 4, 0.4);
    });
    a.ring(['F'], a.w('phry', 'dark'), f1, { color: RED });
    a.tag('F', a.w('phry', 'dark'), f1, 'FLAT 2ND', { color: RED });

    // ---- why1: the half steps stay put, home moves ----
    a.scale(S('why1').t0, 'C', M.Ionian);
    const tH = a.w('why1', 'home');
    a.arc('E', 'F', a.w('why1', 'notes'), S('why2').t1, { steps: 1, color: RED, dr: 30 });
    a.arc('B', 'C', a.w('why1', 'notes'), S('why2').t1, { steps: 1, color: RED, dr: 30 });
    a.ch('C', S('why1').t0 + 0.1, tH - 0.04, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.5, hideName: true });
    const hk = [0, 1, 2];
    hk.forEach((k, i) => homeChord(k, tH - 0.04 + i * 0.7, i < 2 ? tH - 0.04 + (i + 1) * 0.7 : S('why1').t1, { vel: 0.65 }));
    a.walker(hk.map((k, i) => [tH - 0.04 + i * 0.7, WM[k][0]]), { t1: S('why1').t1, dr: 34, color: '#ffffff', label: 'HOME', labelDr: 82 });

    // ---- why2: the step pattern seen from C, D and E ----
    const tE = a.w('why2', 'half'), tB = tE + 0.5;
    a.tag('E', tE, S('why2').t1, 'HALF', { color: RED, dr: -75 });
    a.tag('B', tB, S('why2').t1, 'HALF', { color: RED, dr: -75 });
    a.note('E4', tE, 0.4, { vel: 0.3 }); a.note('F4', tE + 0.35, 0.5, { vel: 0.3 });
    a.note('B3', tB, 0.4, { vel: 0.3 }); a.note('C4', tB + 0.35, 0.5, { vel: 0.3 });
    const tD = a.w('why2', 'different') - 0.04, dl = (S('why2').t1 - tD) / 3;
    const PAT = ['W W H W W W H', 'W H W W W H W', 'H W W W H W W'];
    [0, 1, 2].forEach(k => {
      const t0 = tD + k * dl, t1 = tD + (k + 1) * dl;
      a.scale(t0, WM[k][0], M[WM[k][1]]);
      homeChord(k, t0, t1, { vel: 0.65 });
      a.big(WM[k][0] + ':  ' + PAT[k], t0, t1, { y: 460, size: 38, ...MONO, color: GOLD });
    });
    a.ch('C', S('why2').t0 + 0.1, tD - 0.04, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45, hideName: true });

    // ---- why3: signature notes ----
    const SIG = [["Dorian's", 'D', 'Dorian', 1, 'B', 'RAISED 6TH', GOLD, 'B4'], ["Phrygian's", 'E', 'Phrygian', 2, 'F', 'FLAT 2ND', RED, 'F4'],
      ["Lydian's", 'F', 'Lydian', 3, 'B', 'SHARP 4TH', TEAL, 'B4'], ["Mixolydian's", 'G', 'Mixolydian', 4, 'F', 'FLAT 7TH', LILAC, 'F4']];
    const ts = SIG.map(([w], i) => a.w(i < 2 ? 'why3' : 'why3b', w) - 0.04);
    a.scale(S('why3').t0, 'C', M.Ionian);
    a.ch('C', S('why3').t0 + 0.1, ts[0], { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45, tonic: 0, hideName: true });
    SIG.forEach(([w, n, mode, k, sig, label, col, sn], i) => {
      const t0 = ts[i], t1 = i < 3 ? ts[i + 1] : S('why3').t1;
      a.scale(t0, n, M[mode]);
      homeChord(k, t0, t1, { vel: 0.6 });
      a.ring([sig], t0 + 0.3, t1, { color: col });
      a.tag(sig, t0 + 0.3, t1, label, { color: col });
      a.note(sn, t0 + 0.35, 0.7, { vel: 0.34, tonic: pcN[n] });
      a.big(mode.toUpperCase(), t0, t1, { y: 460, size: 40, ...MONO, color: col });
    });

    // ---- why4: brightest to darkest, all from C, each step lowers one note ----
    const LAD = [['Lydian', 'C', null, null], ['Ionian', 'C', 'F#', 'F'], ['Mixolydian', 'C', 'B', 'Bb'], ['Dorian', 'Cm', 'E', 'Eb'],
      ['Aeolian', 'Cm', 'A', 'Ab'], ['Phrygian', 'Cm', 'D', 'Db'], ['Locrian', 'Cdim', 'G', 'Gb']];
    const VO = { C: ['C4', 'E4', 'G4'], Cm: ['C4', 'Eb4', 'G4'], Cdim: ['C4', 'Eb4', 'Gb4'] };
    const LOW = { F: 'F4', Bb: 'Bb4', Eb: 'Eb4', Ab: 'Ab4', Db: 'Db4', Gb: 'Gb4' };
    const tl = LAD.map(([m]) => a.w('why4', m) - 0.04);
    LAD.forEach(([mode, ch, from, to], i) => {
      const t0 = tl[i], t1 = i < 6 ? tl[i + 1] : S('why4b').t1;
      a.scale(t0, 'C', M[mode]);
      a.ch(ch, t0, t1, { notes: VO[ch], bass: 'C3', label: mode, vel: 0.65, tonic: 0 });
      if (from) { a.arc(from, to, t0, S('why4b').t1, { steps: -1, color: GOLD, dr: 30 }); a.note(LOW[to], t0 + 0.05, 0.6, { vel: 0.3 }); }
    });
    a.big('BRIGHTEST', tl[0], tl[1] + 0.3, { y: 460, size: 40, ...MONO, color: GOLD });
    a.big('DARKEST', tl[6], S('why4').t1, { y: 460, size: 40, ...MONO, color: LILAC });
    a.big('ONE NOTE LOWER, EACH STEP', S('why4b').t0 + 0.1, S('why4b').t1, { y: 460, size: 34, ...MONO, color: GOLD });
    const lw = a.w('why4b', 'lowers');
    ['F#4', 'F4', 'B4', 'Bb4', 'E4', 'Eb4'].forEach((n, i) => a.note(n, lw + i * 0.22, 0.4, { vel: 0.24, show: i % 2 === 1 }));

    // ---- why5: Greek names, medieval meanings ----
    const g0 = S('why5').t0 + 0.1, g1 = S('why5').t1;
    const gA = a.grid([{ label: 'GREEK', sub: 'REGION NAMES', size: 60, color: BLUE }], g0, g1, { rows: 1, cols: 1, cw: 400, chh: 230, y: 600, x: 300 });
    const gB = a.grid([{ label: 'CHURCH', sub: 'MEDIEVAL MODES', size: 60, color: GOLD }], g0 + 0.5, g1, { rows: 1, cols: 1, cw: 400, chh: 230, y: 600, x: 780 });
    gA.active.push({ t0: a.w('why5', 'Greek') - 0.05, t1: a.w('why5b', 'church') - 0.05, i: 0 });
    gB.active.push({ t0: a.w('why5b', 'church') - 0.05, t1: g1, i: 0 });
    a.big('≠', a.w('why5b', 'match') - 0.2, g1, { y: 712, size: 90, color: RED });
    a.big('SAME NAMES, DIFFERENT MEANINGS', a.w('why5b', 'match'), g1, { y: 920, size: 30, ...MONO, color: '#9a9aa2', blur: 0 });
    const c0 = S('why5').t0 + 0.1, cl5 = (g1 - c0) / 4;
    ['Dm', 'C', 'Dm', 'G'].forEach((c, i) => a.ch(c, c0 + i * cl5, c0 + (i + 1) * cl5, { notes: { Dm: ['D4', 'F4', 'A4'], C: ['C4', 'E4', 'G4'], G: ['B3', 'D4', 'G4'] }[c], bass: { Dm: 'D3', C: 'C3', G: 'G2' }[c], vel: 0.45, shape: false, hideName: true }));

    // ---- essence: the seven homes once more, then back to C ----
    const e0 = S('essence').t0 + 0.1, el = 0.62;
    WM.forEach(([n, mode], i) => { a.scale(e0 + i * el, n, M[mode]); homeChord(i, e0 + i * el, e0 + (i + 1) * el, { vel: 0.7 }); });
    a.walker([...WM.map(([n], i) => [e0 + i * el, n]), [e0 + 7 * el, 'C']], { t1: S('essence').t1, dr: 34, color: GOLD, label: 'HOME', labelDr: 82 });
    a.scale(e0 + 7 * el, 'C', M.Ionian);
    a.ch('C', e0 + 7 * el, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.8, tonic: 0 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
