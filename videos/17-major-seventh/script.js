// The major seventh chord: a major chord plus the note a half step below the root. Dreamy, floating.
module.exports = {
  slug: 'major-seventh',
  title: 'The Major Seventh Chord',
  segments: [
    { id: 'hook',      text: 'Add one note to a plain major chord, and suddenly it sounds like a dream.' },
    { id: 'what',      text: 'Take C major: C, E, G. Now add B, a half step below the root.' },
    { id: 'name',      text: "That's C major seven." },
    { id: 'imagine',   text: "It's the gentle intro of Imagine, by John Lennon..." },
    { id: 'norah',     text: "the start of Don't Know Why, by Norah Jones..." },
    { id: 'something', text: 'and the opening of Something, by the Beatles.' },
    { id: 'why1',      text: 'So why does it float? B is the leading tone. Normally, it pulls up to C.' },
    { id: 'why2',      text: 'But here it just sits inside the chord, right next to C, never resolving.' },
    { id: 'why3',      text: 'That gentle rub, a half step below the octave, is the floating feeling.' },
    { id: 'two',       text: "And look closer: it's two chords at once. C major, and E minor, stacked." },
    { id: 'two2',      text: 'Bright and melancholic, together.' },
    { id: 'genres',    text: 'Jazz, bossa nova and neo-soul lean on it.' },
    { id: 'essence',   text: "A little tension that never resolves. That's what dreamy sounds like." },
    { id: 'cta',       text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE DREAMY CHORD', title: 'MAJOR SEVENTH', accent: true, tonic: 0, min: 5.0 },
    { id: 'what', segs: ['what', 'name'], label: 'C, E, G + B', title: 'Cmaj7', tonic: 0, gap: 0.4, tail: 0.8 },
    { id: 'imagine', segs: ['imagine'], label: 'YOU HEAR IT IN', title: 'Imagine', sub: 'John Lennon · 1971 · in C', tonic: 0, row: ['C', 'Cmaj7', 'F'], tail: 3.2 },
    { id: 'norah', segs: ['norah'], label: 'YOU HEAR IT IN', title: "Don't Know Why", sub: 'Norah Jones · 2002 · in Bb', tonic: 10, row: ['Bbmaj7', 'Bb7', 'Ebmaj7', 'D7', 'Gm7', 'C7', 'F'], tail: 4.2 },
    { id: 'something', segs: ['something'], label: 'YOU HEAR IT IN', title: 'Something', sub: 'The Beatles · 1969 · in C', tonic: 0, row: ['C', 'Cmaj7', 'C7', 'F'], tail: 3.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE LEADING TONE', tonic: 0, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'NEVER RESOLVED', tonic: 0, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'A GENTLE RUB', tonic: 0, tail: 0.9 },
    { id: 'two', segs: ['two', 'two2'], label: 'WHY IT WORKS', title: 'TWO CHORDS IN ONE', tonic: 0, gap: 0.4, tail: 1.0 },
    { id: 'genres', segs: ['genres'], label: 'WHERE IT LIVES', title: 'THE DREAMY CHORD', tonic: 0, circle: false, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'UNRESOLVED', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8';
    const C = ['C4', 'E4', 'G4', 'C5'], CM7 = ['C4', 'E4', 'G4', 'B4'];
    const strum = len => [{ o: 0, v: 1 }, { o: len * 0.5, v: 0.55 }];

    // hook: plain C, then the B slips in
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    const hD = a.w('hook', 'suddenly') - 0.04;
    a.ch('C', 0.5, hD, { notes: C, bass: 'C3', vel: 0.75 });
    a.ch('Cmaj7', hD, S('hook').t1, { notes: CM7, bass: 'C3', vel: 0.85 });
    a.ring(['B'], hD, S('hook').t1, { color: GOLD });

    // what: C E G on their names, then B
    const wC = a.w('what', 'C', 1) - 0.04, wB = a.w('what', 'B') - 0.04;
    a.ch('C', S('what').t0 + 0.1, wB, { notes: C, bass: 'C3', vel: 0.7 });
    ['C', 'E', 'G'].forEach((n, i) => a.note(n + '4', a.w('what', n, n === 'C' ? 1 : 0), 0.4, { vel: 0.3 }));
    a.ch('Cmaj7', wB, S('what').t1, { notes: CM7, bass: 'C3' });
    a.tag('B', wB + 0.2, S('what').t1, '+ B', { color: GOLD });
    a.arc('B', 'C', a.w('what', 'half'), S('what').t1, { steps: 1, color: GOLD, label: 'HALF STEP', labelR: 345 });
    a.note('B4', a.w('name', 'seven'), 1.2, { vel: 0.3 });

    // imagine: C, Cmaj7, F (intro alternates)
    const i0 = a.end('imagine') + 0.05, il = (S('imagine').t1 - i0) / 3;
    a.ch('C', S('imagine').t0 + 0.05, i0, { notes: C, bass: 'C3', row: 0, vel: 0.6 });
    [['C', C, 'C3'], ['Cmaj7', CM7, 'C3'], ['F', ['C4', 'F4', 'A4'], 'F2']].forEach(([c, n, b], i) =>
      a.ch(c, i0 + i * il, i0 + (i + 1) * il, { notes: n, bass: b, row: i, strikes: [0, 0.25, 0.5, 0.75].map((k, j) => ({ o: il * k, v: j ? 0.5 : 1 })) }));

    // norah: Bbmaj7 Bb7 Ebmaj7 D7 Gm7 C7 F
    a.scale(S('norah').t0, 'Bb');
    const NJ = [['Bbmaj7', ['A3', 'D4', 'F4', 'Bb4'], 'Bb2'], ['Bb7', ['Ab3', 'D4', 'F4', 'Bb4'], 'Bb2'], ['Ebmaj7', ['G3', 'Bb3', 'D4', 'Eb4'], 'Eb2'],
      ['D7', ['F#3', 'A3', 'C4', 'D4'], 'D2'], ['Gm7', ['F3', 'Bb3', 'D4', 'G4'], 'G2'], ['C7', ['E3', 'Bb3', 'C4', 'G4'], 'C3'], ['F', ['F3', 'A3', 'C4', 'F4'], 'F2']];
    const n0 = a.at('norah') + 0.3, nl = (S('norah').t1 - n0) / NJ.length;
    NJ.forEach(([c, n, b], i) => a.ch(c, n0 + i * nl, n0 + (i + 1) * nl, { notes: n, bass: b, row: i, strikes: strum(nl) }));

    // something: C Cmaj7 C7 F
    a.scale(S('something').t0, 'C');
    const s0 = a.end('something') + 0.05, sl = (S('something').t1 - s0) / 4;
    a.ch('C', S('something').t0 + 0.05, s0, { notes: C, bass: 'C3', row: 0, vel: 0.6 });
    [['C', C, 'C3'], ['Cmaj7', CM7, 'C3'], ['C7', ['C4', 'E4', 'G4', 'Bb4'], 'C3'], ['F', ['C4', 'F4', 'A4'], 'F2']].forEach(([c, n, b], i) =>
      a.ch(c, s0 + i * sl, s0 + (i + 1) * sl, { notes: n, bass: b, row: i, strikes: strum(sl) }));

    // why1: B is the leading tone, it pulls up to C
    const tLead = a.w('why1', 'leading'), tPull = a.w('why1', 'pulls');
    const run = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4'], rs = (a.w('why1', 'B') - S('why1').t0 - 0.3) / 6;
    run.forEach((n, i) => a.note(n, S('why1').t0 + 0.2 + i * rs, rs * 0.95, { vel: 0.28 }));
    a.ring(['B'], a.w('why1', 'B'), S('why1').t1, { color: RED });
    a.tag('B', tLead, S('why2').t1, 'LEADING TONE', { color: RED });
    a.arc('B', 'C', tPull, S('why1').t1, { steps: 1, color: RED, label: 'PULLS UP', labelR: 345 });
    a.note('B4', a.w('why1', 'B'), 0.9, { vel: 0.36 });
    a.note('B4', tPull, 0.5, { vel: 0.36 }); a.note('C5', a.w('why1', 'C'), 1.2, { vel: 0.4 });

    // why2: here it just sits inside the chord, next to C
    const tHere = a.w('why2', 'here') - 0.04;
    a.ch('Cmaj7', tHere, S('why3').t1, { notes: CM7, bass: 'C3', vel: 0.75 });
    a.ring(['B', 'C'], a.w('why2', 'next'), S('why2').t1, { color: GOLD });
    a.tag(0, a.w('why2', 'never'), S('why2').t1, 'NO RESOLUTION', { x: 540, y: 455, color: GOLD });

    // why3: the rub, a major seventh = a half step below the octave
    const tRub = a.w('why3', 'rub');
    a.note('C3', tRub, 2.4, { vel: 0.3, show: false }); a.note('B3', tRub + 0.6, 1.8, { vel: 0.3, show: false });
    a.arc('B', 'C', a.w('why3', 'half'), S('why3').t1, { steps: 1, color: GOLD, label: 'HALF STEP', labelR: 345 });
    a.tag('B', a.w('why3', 'octave'), S('why3').t1, 'MAJOR 7TH', { color: GOLD });
    a.big('OCTAVE  −  ½ STEP', a.w('why3', 'octave'), S('why3').t1, { y: 425, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // two: C major + E minor stacked
    const tCm = a.w('two', 'C') - 0.04, tEm = a.w('two', 'E') - 0.04, tSt = a.w('two', 'stacked') - 0.04;
    a.ch('Cmaj7', S('two').t0 + 0.1, tCm, { notes: CM7, bass: 'C3', vel: 0.6 });
    a.ch('C', tCm, tEm, { notes: ['C4', 'E4', 'G4'], bass: 'C3' });
    a.ch('Em', tEm, tSt, { notes: ['E4', 'G4', 'B4'], bass: 'E3' });
    a.ch('Cmaj7', tSt, S('two').t1, { notes: CM7, bass: 'C3' });
    const tBr = a.w('two2', 'Bright'), tMel = a.w('two2', 'melancholic');
    a.ghost('C', tCm, S('two').t1, { color: GOLD });
    a.ghost('Em', tEm, S('two').t1, { color: TEAL });
    a.tag(0, tCm, tBr, 'C MAJOR', { x: 300, y: 450, color: GOLD });
    a.tag(0, tEm, tMel, 'E MINOR', { x: 780, y: 450, color: TEAL });
    a.tag(0, tBr, S('two').t1, 'BRIGHT', { x: 300, y: 450, color: GOLD });
    a.tag(0, tMel, S('two').t1, 'MELANCHOLIC', { x: 780, y: 450, color: TEAL });

    // genres: a soft bossa-style groove on major sevenths
    const g = a.grid([{ label: 'JAZZ', size: 44, color: GOLD }, { label: 'BOSSA NOVA', size: 36, color: TEAL }, { label: 'NEO-SOUL', size: 40, color: '#b48cff' }],
      S('genres').t0 + 0.1, S('genres').t1, { rows: 1, cols: 3, cw: 320, chh: 170, y: 640, revealStep: 0.15 });
    const gw = [a.w('genres', 'Jazz'), a.w('genres', 'bossa'), a.w('genres', 'neosoul')];
    gw.forEach((t, i) => g.active.push({ t0: t, t1: i < 2 ? gw[i + 1] : S('genres').t1, i }));
    const b0 = S('genres').t0 + 0.1, bl = (S('genres').t1 - b0 - 0.2) / 4;
    ['Cmaj7', 'Fmaj7', 'Cmaj7', 'Fmaj7'].forEach((c, i) => a.ch(c, b0 + i * bl, b0 + (i + 1) * bl, {
      notes: c === 'Cmaj7' ? CM7 : ['C4', 'E4', 'F4', 'A4'], bass: c === 'Cmaj7' ? 'C3' : 'F2', vel: 0.75,
      strikes: [0, 0.1875, 0.375, 0.625, 0.8125].map((k, j) => ({ o: bl * k, v: j ? 0.45 : 1 })) }));
    ['Cmaj7', 'Fmaj7', 'Cmaj7', 'Fmaj7'].forEach((c, i) => a.big(c, b0 + i * bl, b0 + (i + 1) * bl, { y: 930, size: 84 }));
    for (let i = 0; i < 16; i++) a.perc('hat', b0 + i * bl / 4, i % 2 ? 0.2 : 0.35);

    // essence: one long, unresolved Cmaj7
    a.ch('Cmaj7', S('essence').t0 + 0.1, S('essence').t1 - 0.2, { notes: ['E4', 'G4', 'B4', 'C5'], bass: 'C3' });
    a.ring(['B'], a.w('essence', 'tension'), S('essence').t1, { color: GOLD });
    a.tag('B', a.w('essence', 'never'), S('essence').t1, 'NEVER RESOLVES', { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
