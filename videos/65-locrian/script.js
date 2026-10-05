// Locrian: the white keys from B. Its home chord, B diminished, has no perfect fifth, so home won't sit still.
// Autumn Leaves (copyrighted): chords only, no melody.
module.exports = {
  slug: 'locrian',
  title: 'Locrian',
  segments: [
    { id: 'hook',    text: "One mode that almost nobody writes songs in. Here's why." },
    { id: 'what',    text: "White keys from B to B: B, C, D, E, F, G, A. That's Locrian." },
    { id: 'what2',   text: 'Its home chord is B diminished: a flat second and a flat fifth.' },
    { id: 'leaves',  text: 'In jazz, Autumn Leaves has a half diminished chord...' },
    { id: 'leaves2', text: 'and players use Locrian over chords like it, in the minor two, five, one.' },
    { id: 'bdim',    text: "It's the B diminished chord in any C major song: the only chord whose fifth isn't perfect." },
    { id: 'metal',   text: 'And metal guitarists borrow its flat second and flat fifth for menacing riffs.' },
    { id: 'why1',    text: 'So why does nobody live there? A home chord needs a perfect fifth to feel stable.' },
    { id: 'why2',    text: 'But B to F is a tritone, six half steps. Home itself is unstable.' },
    { id: 'why3',    text: 'And the flat second, C, pulls away from home instead of toward it.' },
    { id: 'why4',    text: 'So Locrian keeps wanting to resolve elsewhere... usually to C, where its notes really belong.' },
    { id: 'why5',    text: 'Medieval and Renaissance theorists treated it as mostly theoretical.' },
    { id: 'essence', text: "A home that can't sit still: proof that the perfect fifth makes a home feel like home." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE MODE NOBODY USES', title: 'LOCRIAN', accent: true, tonic: 11, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'WHITE KEYS FROM B', title: 'B LOCRIAN', tonic: 11, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'THE HOME CHORD', title: 'B DIMINISHED', tonic: 11, tail: 0.5 },
    { id: 'leaves', segs: ['leaves', 'leaves2'], label: 'YOU HEAR IT IN', title: 'Autumn Leaves', sub: 'Joseph Kosma · 1945', tonic: 4, row: ['F#m7b5', 'B7', 'Em'], gap: 0.3, tail: 2.0 },
    { id: 'bdim', segs: ['bdim'], label: 'YOU HEAR IT IN', title: 'Any C major song', sub: 'the seventh chord: B dim', tonic: 0, row: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'], tail: 1.0 },
    { id: 'metal', segs: ['metal'], label: 'YOU HEAR IT IN', title: 'Heavy metal riffs', sub: 'flat 2nd · flat 5th', tonic: 11, tail: 2.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE PERFECT FIFTH', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A TRITONE HOME', tonic: 11, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE FLAT SECOND', tonic: 11, tail: 0.5 },
    { id: 'why4', segs: ['why4'], label: 'WHERE IT WANTS TO GO', title: 'B → C', tonic: 11, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'IN THE HISTORY BOOKS', title: 'MOSTLY THEORY', tonic: 11, circle: false, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'NO FIFTH, NO HOME', accent: true, tonic: 11, gap: 0.5, tail: 1.5 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const LOC = [0, 1, 3, 5, 6, 8, 10], MAJ = a.T.MAJOR;
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const BDIM = ['B3', 'D4', 'F4'];
    const run = (list, t0, step, vel = 0.28, show = true) => list.forEach((n, i) => a.note(n, t0 + i * step, step * 1.6, { vel, show }));

    // ---- hook: B Locrian pops in, a restless B diminished ----
    a.scale(0.2, 'B', LOC, { popIn: { t0: 0.3, step: 0.2 } });
    run(['B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], 0.3, 0.2, 0.26);
    a.ch('Bdim', 1.9, S('hook').t1, { notes: BDIM, bass: 'B2', vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: 1.2, v: 0.5 }, { o: 2.4, v: 0.5 }] });
    a.line('B', 'F', 2.3, S('hook').t1, { color: RED, label: 'NO PERFECT FIFTH', ly: 80 });

    // ---- what: white keys from B ----
    const tw = a.w('what', 'white');
    run(['B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], tw, 0.12, 0.2, false);
    const names = ['B', 'C', 'D', 'E', 'F', 'G', 'A'];
    const tn = names.map((n, i) => a.w('what', n, n === 'B' ? 2 : 0));
    names.forEach((n, i) => a.note(n + (i === 0 ? '3' : '4'), tn[i], 0.7, { vel: 0.3 }));
    a.walker(names.map((n, i) => [tn[i], n]), { t1: S('what').t1, dr: 34, color: '#ffffff' });
    a.big('LOCRIAN', a.w('what', 'Locrian'), S('what').t1, { y: 460, size: 40, ...MONO, color: GOLD });
    a.note('B4', a.w('what', 'Locrian'), 1.0, { vel: 0.3 });

    // ---- what2: B diminished, flat 2 and flat 5 ----
    const tD = S('what2').t0 + 0.1;
    a.ch('Bdim', tD, S('what2').t1, { notes: BDIM, bass: 'B2', vel: 0.75 });
    a.ring(['C'], a.w('what2', 'second'), S('what2').t1, { color: RED });
    a.tag('C', a.w('what2', 'second'), S('what2').t1, 'FLAT 2ND', { color: RED, dr: -75 });
    a.note('C5', a.w('what2', 'second'), 0.6, { vel: 0.3 });
    a.ring(['F'], a.w('what2', 'fifth'), S('what2').t1, { color: RED });
    a.tag('F', a.w('what2', 'fifth'), S('what2').t1, 'FLAT 5TH', { color: RED, dr: -75 });
    a.note('F4', a.w('what2', 'fifth'), 0.8, { vel: 0.34 });

    // ---- Autumn Leaves: the minor ii - V - i around F#m7b5 (chords only) ----
    a.scale(S('leaves').t0, 'F#', LOC);
    const l0 = S('leaves').t0 + 0.1, l1 = S('leaves').t1;
    const tHalf = a.w('leaves', 'half') - 0.04;
    a.ch('Em', l0, tHalf, { notes: ['B3', 'E4', 'G4'], bass: 'E2', vel: 0.45, tonic: 4, strikes: [{ o: 0, v: 1 }, { o: 1.0, v: 0.5 }] });
    const ii = { notes: ['A3', 'C4', 'E4'], bass: 'F#2', label: 'F#m7b5' }, V = { notes: ['A3', 'D#4', 'F#4'], bass: 'B2', label: 'B7' }, i1 = { notes: ['G3', 'B3', 'E4'], bass: 'E2', label: 'Em' };
    const swing = len => [{ o: 0, v: 1 }, { o: len * 0.5, v: 0.4 }];
    const tTwo = a.w('leaves2', 'two') - 0.04, tFive = a.w('leaves2', 'five') - 0.04, tOne = a.w('leaves2', 'one') - 0.04;
    a.ch('F#m7b5', tHalf, tTwo, { ...ii, row: 0, vel: 0.75, strikes: swing(1.2) });
    a.tag('F#', tHalf + 0.3, a.w('leaves2', 'Locrian'), 'HALF DIMINISHED', { color: GOLD });
    a.tag('F#', a.w('leaves2', 'Locrian'), l1, 'F# LOCRIAN', { color: GOLD });
    a.ch('F#m7b5', tTwo, tFive, { ...ii, row: 0, vel: 0.8 });
    a.ch('B7', tFive, tOne, { ...V, row: 1, vel: 0.8 });
    a.ch('Em', tOne, a.end('leaves2') + 0.5, { ...i1, row: 2, vel: 0.8 });
    // the tail: the progression once more, brushed
    const r0 = a.end('leaves2') + 0.5, rl = (l1 - r0) / 3;
    a.ch('F#m7b5', r0, r0 + rl, { ...ii, row: 0, vel: 0.75, strikes: swing(rl) });
    a.ch('B7', r0 + rl, r0 + 2 * rl, { ...V, row: 1, vel: 0.75, strikes: swing(rl) });
    a.ch('Em', r0 + 2 * rl, l1, { ...i1, row: 2, vel: 0.8, strikes: swing(rl) });
    for (let t = tHalf; t < l1 - 0.2; t += 0.5) a.perc('hat', t, 0.18);

    // ---- bdim: the diatonic chords of C, the last one stands out ----
    a.scale(S('bdim').t0, 'C', MAJ);
    const DIA = [['C', ['C4', 'E4', 'G4'], 'C3'], ['Dm', ['D4', 'F4', 'A4'], 'D3'], ['Em', ['E4', 'G4', 'B4'], 'E3'], ['F', ['C4', 'F4', 'A4'], 'F2'],
      ['G', ['B3', 'D4', 'G4'], 'G2'], ['Am', ['C4', 'E4', 'A4'], 'A2'], ['Bdim', BDIM, 'B2']];
    const b0 = S('bdim').t0 + 0.1, tB = a.w('bdim', 'B') - 0.04, bl = (tB - b0) / 6;
    DIA.slice(0, 6).forEach(([c, v, b], i) => a.ch(c, b0 + i * bl, b0 + (i + 1) * bl, { notes: v, bass: b, row: i, vel: 0.55, tonic: 0 }));
    a.ch('Bdim', tB, S('bdim').t1, { notes: BDIM, bass: 'B2', row: 6, vel: 0.8, tonic: 0 });
    a.line('B', 'F', a.w('bdim', 'fifth'), S('bdim').t1, { color: RED, label: 'NOT PERFECT', ly: 80 });

    // ---- metal: an original low chug on B with the flat 2 and flat 5 ----
    a.scale(S('metal').t0, 'B', LOC);
    const m0 = a.w('metal', 'menacing') - 0.3, m1 = S('metal').t1, ms = 0.19;
    a.ch('B5', S('metal').t0 + 0.1, m0, { notes: ['B2', 'F#3'], bass: false, vel: 0.5, label: 'B5' });
    const RIFF = ['B2', 'B2', 'C3', 'B2', 'B2', 'B2', 'F3', 'B2', 'B2', 'C3', 'B2', 'F3', 'E3', 'B2', 'B2', 'C3', 'B2', 'B2', 'F3', 'F3', 'B2', 'C3', 'B2', 'B2'];
    RIFF.forEach((n, i) => {
      const t = m0 + i * ms; if (t > m1 - 0.3) return;
      a.note(n, t, ms * 0.9, { vel: n === 'B2' ? 0.4 : 0.5 });
      if (n === 'B2') a.note('F#3', t, ms * 0.9, { vel: 0.18, show: false });
      if (i % 2 === 0) a.perc('kick', t, 0.7);
      if (i % 4 === 2) a.perc('snare', t, 0.55);
    });
    a.ring(['C'], a.w('metal', 'second'), m1, { color: RED });
    a.tag('C', a.w('metal', 'second'), m1, 'b2', { color: RED, dr: -75 });
    a.ring(['F'], a.w('metal', 'fifth'), m1, { color: RED });
    a.tag('F', a.w('metal', 'fifth'), m1, 'b5', { color: RED, dr: -75 });

    // ---- why1: a stable home has a perfect fifth (C - G) ----
    a.scale(S('why1').t0, 'C', MAJ);
    a.ch('C', S('why1').t0 + 0.1, S('why1').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.7, tonic: 0 });
    a.line('C', 'G', a.w('why1', 'perfect'), S('why1').t1, { color: TEAL, label: 'PERFECT FIFTH', ly: 80 });
    a.note('C3', a.w('why1', 'perfect'), 1.4, { vel: 0.3, show: false }); a.note('G3', a.w('why1', 'fifth'), 1.4, { vel: 0.3 });
    a.big('STABLE', a.w('why1', 'stable'), S('why1').t1, { y: 460, size: 44, ...MONO, color: TEAL });

    // ---- why2: B to F is a tritone ----
    a.scale(S('why2').t0, 'B', LOC);
    const tBF = a.w('why2', 'B') - 0.04;
    a.ch('Bdim', tBF, S('why2').t1, { notes: BDIM, bass: 'B2', vel: 0.75, strikes: [{ o: 0, v: 1 }, { o: 2.2, v: 0.6 }, { o: 3.6, v: 0.6 }] });
    a.line('B', 'F', a.w('why2', 'tritone'), a.w('why2', 'six'), { color: RED, label: 'TRITONE', ly: 80 });
    a.line('B', 'F', a.w('why2', 'six'), S('why2').t1, { color: RED, label: '6 HALF STEPS', ly: 80 });
    a.arc('B', 'F', a.w('why2', 'six'), S('why2').t1, { steps: -6, color: RED, dr: 30 });
    a.note('B3', a.w('why2', 'tritone'), 1.2, { vel: 0.3 }); a.note('F4', a.w('why2', 'tritone') + 0.3, 1.2, { vel: 0.3 });
    a.big('UNSTABLE', a.w('why2', 'unstable'), S('why2').t1, { y: 460, size: 44, ...MONO, color: RED });

    // ---- why3: the flat second, C, a half step above B ----
    a.ch('Bdim', S('why3').t0 + 0.1, S('why3').t1, { notes: BDIM, bass: 'B2', vel: 0.45, hideName: true });
    const tC = a.w('why3', 'C');
    a.ring(['C'], tC, S('why3').t1, { color: RED });
    a.arc('B', 'C', tC, S('why3').t1, { steps: 1, color: RED, dr: 30 });
    a.tag('C', tC, S('why3').t1, 'HALF STEP ABOVE B', { color: RED });
    a.note('C5', tC, 0.6, { vel: 0.32 });
    const tA = a.w('why3', 'pulls');
    for (let k = 0; k < 3; k++) { a.note('B4', tA + k * 0.7, 0.35, { vel: 0.3 }); a.note('C5', tA + k * 0.7 + 0.35, 0.35, { vel: 0.32 }); }
    a.big('AWAY FROM HOME', tA, S('why3').t1, { y: 460, size: 40, ...MONO, color: RED });

    // ---- why4: it wants to resolve to C ----
    const tRes = a.w('why4', 'C') - 0.04;
    a.ch('Bdim', S('why4').t0 + 0.1, tRes, { notes: BDIM, bass: 'B2', vel: 0.7, strikes: [{ o: 0, v: 1 }, { o: 1.4, v: 0.6 }, { o: 2.8, v: 0.6 }] });
    a.ghost('C', a.w('why4', 'resolve'), tRes + 0.3, { color: '#ffffff' });
    a.scale(tRes, 'C', MAJ);
    a.ch('C', tRes, S('why4').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.85, tonic: 0 });
    a.walker([[a.w('why4', 'resolve'), 'B'], [tRes, 'C']], { t1: S('why4').t1, dr: 34, color: GOLD, label: 'HOME', labelDr: 82 });
    a.line('C', 'G', tRes + 0.2, S('why4').t1, { color: TEAL, label: 'PERFECT FIFTH', ly: 80 });

    // ---- why5: mostly theoretical ----
    const g0 = S('why5').t0 + 0.1, g1 = S('why5').t1;
    const g = a.grid([{ label: 'MEDIEVAL', size: 50, color: BLUE }, { label: 'RENAISSANCE', size: 50, color: LILAC }], g0, g1,
      { rows: 1, cols: 2, cw: 470, chh: 180, y: 560, revealStep: 0.4 });
    g.active.push({ t0: a.w('why5', 'Medieval') - 0.05, t1: a.w('why5', 'Renaissance') - 0.05, i: 0 }, { t0: a.w('why5', 'Renaissance') - 0.05, t1: g1, i: 1 });
    a.big('MOSTLY THEORETICAL', a.w('why5', 'mostly'), g1, { y: 860, size: 56, color: GOLD });
    a.ch('Bdim', g0, g1, { notes: BDIM, bass: 'B2', vel: 0.4, shape: false, hideName: true });

    // ---- essence: B diminished can't sit still... then C, with its perfect fifth ----
    a.scale(S('essence').t0, 'B', LOC);
    const e0 = S('essence').t0 + 0.1, eC = a.w('essence', 'Proof') - 0.04;
    a.ch('Bdim', e0, eC, { notes: BDIM, bass: 'B2', vel: 0.7, strikes: [0, 1, 2, 3, 4, 5].map(i => ({ o: i * 0.4, v: 0.6 })) });
    a.line('B', 'F', e0 + 0.3, eC, { color: RED, label: 'NO FIFTH', ly: 80 });
    a.scale(eC, 'C', MAJ);
    a.ch('C', eC, S('essence').t1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.85, tonic: 0 });
    a.line('C', 'G', a.w('essence', 'perfect'), S('essence').t1, { color: TEAL, label: 'PERFECT FIFTH', ly: 80 });
    a.tag('C', a.w('essence', 'home', 2), S('essence').t1, 'HOME', { dr: -75, color: TEAL });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
