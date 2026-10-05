// The diminished chord: minor thirds stacked into a perfect square, the chameleon of harmony.
module.exports = {
  slug: 'diminished-chord',
  title: 'The Diminished Chord',
  segments: [
    { id: 'hook',    text: 'One chord is the sound of villains, danger and suspense.' },
    { id: 'what',    text: "Stack minor thirds on C: C, E flat, G flat. That's C diminished." },
    { id: 'what2',   text: 'Add one more third, A, and you get the diminished seventh.' },
    { id: 'villain', text: "It's the trembling chord of the silent film villain..." },
    { id: 'bach',    text: "the crash at the start of Bach's Toccata and Fugue in D minor..." },
    { id: 'horror',  text: 'and the shiver in countless horror and suspense scores.' },
    { id: 'why1',    text: 'So why does it work? Four minor thirds split the octave into four equal parts.' },
    { id: 'why2',    text: "On the circle, that's a perfect square." },
    { id: 'root',    text: 'No note is in charge. Any of the four can act as the root...' },
    { id: 'resolve', text: 'so one chord can lead to four different keys.' },
    { id: 'rotate',  text: 'Turn the square one step, and you get a new chord.' },
    { id: 'rotate2', text: "Three steps, and you're back where you started." },
    { id: 'three',   text: 'So there are only three diminished seventh chords.' },
    { id: 'tritone', text: 'And inside hide two tritones at once: C to G flat, E flat to A. Double tension.' },
    { id: 'essence', text: 'The chameleon chord: perfectly balanced, belonging nowhere, leading anywhere.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE VILLAIN CHORD', title: 'THE DIMINISHED CHORD', accent: true, tonic: 0, min: 4.6 },
    { id: 'what', segs: ['what'], label: 'STACK MINOR THIRDS', title: 'C DIMINISHED', tonic: 0, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'ONE MORE THIRD', title: 'DIMINISHED 7TH', tonic: 0, tail: 0.9 },
    { id: 'villain', segs: ['villain'], label: 'YOU HEAR IT IN', title: 'Silent Film Villains', sub: 'The classic tremolo', tonic: 0, tail: 2.4 },
    { id: 'bach', segs: ['bach'], label: 'YOU HEAR IT IN', title: 'Toccata and Fugue', sub: 'J. S. Bach (attr.) · in D minor', tonic: 2, tail: 3.6 },
    { id: 'horror', segs: ['horror'], label: 'YOU HEAR IT IN', title: 'Horror Scores', sub: 'Suspense, every time', tonic: 0, tail: 2.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'FOUR EQUAL PARTS', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A PERFECT SQUARE', tonic: 0, tail: 0.9 },
    { id: 'root', segs: ['root'], label: 'NO NOTE IN CHARGE', title: 'ANY ROOT', tonic: 0, tail: 0.5 },
    { id: 'resolve', segs: ['resolve'], label: 'ONE CHORD', title: 'FOUR DOORS', tonic: 0, tail: 5.0 },
    { id: 'rotate', segs: ['rotate', 'rotate2'], label: 'ROTATE THE SQUARE', title: 'ONE STEP', tonic: 0, gap: 0.5, tail: 0.6 },
    { id: 'three', segs: ['three'], label: 'ALL TWELVE NOTES', title: 'ONLY THREE', tonic: 0, tail: 1.4 },
    { id: 'tritone', segs: ['tritone'], label: 'HIDDEN INSIDE', title: 'TWO TRITONES', tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE CHAMELEON', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    const C7 = ['C4', 'Eb4', 'Gb4', 'A4'];
    // tremolo: the two halves of the chord alternate quickly (short notes), the chord itself sounds softly
    const trem = (lo, hi, t0, t1, step = 0.085, vel = 0.2) => {
      for (let t = t0, i = 0; t < t1 - 0.05; t += step, i++) (i % 2 ? hi : lo).forEach(n => a.note(n, t, step * 0.9, { vel, show: false }));
    };

    // hook: a trembling C diminished seventh
    const h0 = 0.3, h1 = S('hook').t1;
    a.scale(0.2, 'C', [0, 3, 6, 9], { popIn: { t0: 0.4, step: 0.25 } });
    a.ch('Cdim7', h0, h1, { notes: C7, bass: 'C2', vel: 0.45 });
    trem(['C4', 'Gb4'], ['Eb4', 'A4'], h0 + 0.3, h1 - 0.1);

    // what: stack minor thirds C -> Eb -> Gb
    const tC = a.w('what', 'C', 1), tE = a.w('what', 'E'), tG = a.w('what', 'G');
    a.scale(S('what').t0, 'C', [0]); a.scale(tE, 'C', [0, 3]); a.scale(tG, 'C', [0, 3, 6]);
    a.note('C4', tC, 0.8, { vel: 0.34 }); a.note('Eb4', tE, 0.8, { vel: 0.34 }); a.note('Gb4', tG, 0.8, { vel: 0.34 });
    a.walker([[tC, 'C'], [tE, 'Eb'], [tG, 'Gb']], { t1: a.w('what', 'diminished') - 0.1, dr: 34 });
    a.arc('C', 'Eb', tE, S('what2').t1, { steps: 3, color: TEAL, dr: 30 });
    a.arc('Eb', 'Gb', tG, S('what2').t1, { steps: 3, color: TEAL, dr: 30 });
    a.tag(6, tG, S('what2').t1, 'Gb', { dr: -75 });
    a.tag(0, a.w('what', 'minor'), S('what').t1, 'MINOR 3RD = 3 HALF STEPS', { x: 540, y: 455, color: TEAL });
    a.ch('Cdim', a.w('what', 'diminished') - 0.04, a.w('what2', 'A') - 0.04, { notes: ['C4', 'Eb4', 'Gb4'], bass: 'C3' });
    // what2: one more third, A
    const tA = a.w('what2', 'A');
    a.arc('Gb', 'A', tA, S('what2').t1, { steps: 3, color: TEAL, dr: 30 });
    a.ch('Cdim', tA - 0.04, a.w('what2', 'seventh') - 0.04, { notes: ['C4', 'Eb4', 'Gb4'], bass: 'C3', vel: 0.5 });
    a.note('A4', tA, 0.8, { vel: 0.36 }); a.scale(tA, 'C', [0, 3, 6, 9]);
    a.ch('Cdim7', a.w('what2', 'seventh') - 0.04, S('what2').t1, { notes: C7, bass: 'C3' });

    // silent film villain: low rumble + tremolo
    const v0 = S('villain').t0 + 0.1, v1 = S('villain').t1;
    a.ch('Cdim7', v0, v1, { notes: C7, bass: 'C2', vel: 0.5 });
    trem(['C4', 'Gb4'], ['Eb4', 'A4'], v0 + 0.2, v1 - 0.1, 0.075, 0.22);
    trem(['C2'], ['C3'], v0 + 0.2, v1 - 0.1, 0.15, 0.16);

    // Bach (public domain): the mordent, the falling run, then the rolled diminished seventh
    a.scale(S('bach').t0, 'D', [0, 2, 3, 5, 7, 8, 11]);
    const MOTIF = o => [['A' + o, 0.5], ['G' + o, 0.5], ['A' + o, 3], ['G' + o, 0.5], ['F' + o, 0.5], ['E' + o, 0.5], ['D' + o, 0.5], ['C#' + o, 2], ['D' + o, 3]];
    a.melody(MOTIF(4), S('bach').t0 + 0.3, 0.13, { vel: 0.36 });
    let b = Math.max(S('bach').t0 + 2.3, a.end('bach') - 1.5);
    b = a.melody(MOTIF(3), b, 0.13, { vel: 0.4 });
    ['C#2', 'E2', 'G2', 'Bb2', 'C#3', 'E3'].forEach((n, i) => a.note(n, b + 0.1 + i * 0.09, 0.6, { vel: 0.32, show: false }));
    const bc = b + 0.1 + 6 * 0.09;
    a.ch('C#dim7', bc, S('bach').t1, { notes: ['G3', 'Bb3', 'C#4', 'E4'], bass: 'C#2', vel: 1.1 });

    // horror: a low dim7 and a heartbeat
    const r0 = S('horror').t0 + 0.1, r1 = S('horror').t1;
    a.scale(S('horror').t0, 'B', [0, 3, 6, 9]);
    a.ch('Bdim7', r0, r1, { notes: ['B3', 'D4', 'F4', 'Ab4'], bass: 'B1', vel: 0.55 });
    for (let t = r0 + 0.3; t < r1 - 0.4; t += 0.85) { a.perc('kick', t, 0.9); a.perc('kick', t + 0.22, 0.6); }
    trem(['B3', 'F4'], ['D4', 'Ab4'], a.end('horror'), r1 - 0.1, 0.07, 0.2);

    // why1: four minor thirds around the circle
    const w0 = a.w('why1', 'Four');
    a.scale(S('why1').t0, 'C', [0, 3, 6, 9]);
    a.ch('Cdim7', S('why1').t0 + 0.1, S('why2').t1, { notes: C7, bass: 'C3', vel: 0.6 });
    ['C', 'Eb', 'Gb', 'A'].forEach((n, i) => {
      a.arc(n, ['Eb', 'Gb', 'A', 'C'][i], w0 + i * 0.4, S('why2').t1, { steps: 3, color: TEAL, dr: 30 });
      a.note(['Eb4', 'Gb4', 'A4', 'C5'][i], w0 + i * 0.4, 0.5, { vel: 0.3 });
    });
    a.big('4 × 3 = 12', a.w('why1', 'equal'), S('why1').t1, { y: 455, size: 56, family: 'DM Mono', weight: 500, color: GOLD });
    // why2: the square
    a.poly(['C', 'Eb', 'Gb', 'A'], a.w('why2', 'square') - 0.2, S('why2').t1, { color: GOLD, dash: false, glow: true, width: 5, alpha: 0.9 });
    a.big('4 EQUAL SIDES', a.w('why2', 'square'), S('why2').t1, { y: 455, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // root: the same four notes, each one taking a turn as root (same voicing, new bass)
    const R = [['Cdim7', 'Cdim7', 'C', 'C3'], ['Ebdim7', 'Ebdim7', 'Eb', 'Eb3'], ['Gbdim7', 'Gbdim7', 'Gb', 'Gb2'], ['Adim7', 'Adim7', 'A', 'A2']];
    const q0 = a.w('root', 'Any'), q1 = S('root').t1, ql = (q1 - q0) / 4;
    a.ch('Cdim7', S('root').t0, q0, { notes: C7, bass: 'C3', vel: 0.6 });
    R.forEach(([c, lbl, pc, bass], i) => {
      a.ch(c, q0 + i * ql, q0 + (i + 1) * ql, { notes: C7, bass, label: lbl, vel: 0.8 });
      a.ring([pc], q0 + i * ql, q0 + (i + 1) * ql, { color: '#ffffff' });
    });
    a.tag(0, q0, q1, 'SAME FOUR NOTES', { x: 540, y: 455, color: '#ffffff' });

    // resolve: each note can act as a leading tone, a half step below a new home
    const doors = [['C', 'Db', ['Db4', 'F4', 'Ab4'], 'Db3'], ['Eb', 'E', ['E4', 'G#4', 'B4'], 'E3'], ['Gb', 'G', ['G3', 'B3', 'D4'], 'G2'], ['A', 'Bb', ['Bb3', 'D4', 'F4'], 'Bb2']];
    const d0 = a.end('resolve') + 0.1, dl = (S('resolve').t1 - d0 - 0.2) / 4;
    a.ch('Cdim7', S('resolve').t0, d0, { notes: C7, bass: 'C3', vel: 0.6 });
    doors.forEach(([lt, home, notes, bass], i) => {
      const t = d0 + i * dl;
      a.ch('Cdim7', t, t + dl * 0.45, { notes: C7, bass: 'C3', vel: 0.75 });
      a.ch(home, t + dl * 0.45, t + dl, { notes, bass, vel: 0.9 });
      a.arc(lt, home, t + dl * 0.2, t + dl, { steps: 1, color: TEAL, dr: 30 });
    });
    a.big('Db  ·  E  ·  G  ·  Bb', d0 + 0.3, S('resolve').t1, { y: 455, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // rotate: turn one step -> new chord; three steps -> back home
    const RO = [['Cdim7', C7], ['C#dim7', ['C#4', 'E4', 'G4', 'Bb4']], ['Ddim7', ['D4', 'F4', 'Ab4', 'B4']], ['Ebdim7', ['Eb4', 'Gb4', 'A4', 'C5']]];
    const tStep = a.w('rotate', 'step'), tThree = a.w('rotate2', 'Three'), tBack = a.w('rotate2', 'back');
    const rt = [S('rotate').t0 + 0.05, tStep - 0.04, tThree + 0.3, tBack - 0.04, S('rotate').t1];
    ['C', 'C#', 'D', 'Eb'].forEach((k, i) => a.scale(rt[i], k, [0, 3, 6, 9]));
    RO.forEach(([c, notes], i) => a.ch(c, rt[i], rt[i + 1], { notes, bass: false, label: i === 3 ? 'Cdim7' : c, vel: 0.8 }));
    a.poly(['C', 'Eb', 'Gb', 'A'], tBack, S('rotate').t1, { color: GOLD, dash: true, width: 3, alpha: 0.7 });
    a.tag(0, tBack, S('rotate').t1, 'SAME AS THE START', { x: 540, y: 455, color: GOLD });
    a.tag(0, tStep, tThree, '+1 STEP', { x: 540, y: 455, color: TEAL });

    // three: only three diminished sevenths, together they cover all twelve notes
    const th0 = S('three').t0, thw = a.w('three', 'three');
    a.ch('Cdim7', th0 + 0.05, thw, { notes: C7, bass: false, vel: 0.6, hideName: true });
    a.poly(['C', 'Eb', 'Gb', 'A'], th0, S('three').t1, { color: '#ff7a93', dash: false, glow: true, width: 4, alpha: 0.9 });
    a.poly(['C#', 'E', 'G', 'Bb'], thw - 0.3, S('three').t1, { color: TEAL, dash: false, glow: true, width: 4, alpha: 0.9 });
    a.poly(['D', 'F', 'Ab', 'B'], thw + 0.1, S('three').t1, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.9 });
    a.scale(thw + 0.3, 'C', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], { popIn: { t0: thw + 0.3, step: 0.05 } });
    a.big('3', thw, S('three').t1, { y: 830, size: 150, family: 'DM Sans', color: '#ffffff' });
    a.note('C#4', thw - 0.3, 1.2, { vel: 0.18, show: false }); a.note('E4', thw - 0.3, 1.2, { vel: 0.18, show: false });
    a.note('D4', thw + 0.1, 1.2, { vel: 0.18, show: false }); a.note('F4', thw + 0.1, 1.2, { vel: 0.18, show: false });

    // tritone: two diameters crossing
    a.scale(S('tritone').t0, 'C', [0, 3, 6, 9]);
    a.ch('Cdim7', S('tritone').t0 + 0.1, S('tritone').t1, { notes: C7, bass: 'C3', vel: 0.7, hideName: true });
    const tC2 = a.w('tritone', 'C'), tE2 = a.w('tritone', 'E');
    a.line('C', 'Gb', tC2, S('tritone').t1, { color: RED, r: 255 });
    a.line('Eb', 'A', tE2, S('tritone').t1, { color: RED, r: 255 });
    a.note('C4', tC2, 0.9, { vel: 0.3 }); a.note('Gb4', tC2 + 0.25, 0.9, { vel: 0.3 });
    a.note('Eb4', tE2, 0.9, { vel: 0.3 }); a.note('A4', tE2 + 0.25, 0.9, { vel: 0.3 });
    a.big('DOUBLE TENSION', a.w('tritone', 'Double'), S('tritone').t1, { y: 455, size: 48, family: 'DM Mono', weight: 500, color: RED });
    a.tag(0, tC2 + 0.2, S('tritone').t1, 'TRITONE', { x: 540, y: 690, color: RED });
    a.tag(0, tE2 + 0.2, S('tritone').t1, 'TRITONE', { x: 690, y: 830, color: RED });

    // essence: the chameleon lands somewhere new (F# rises to G)
    a.scale(S('essence').t0, 'C', [0, 3, 6, 9]);
    const e0 = S('essence').t0 + 0.1, eAny = a.w('essence', 'anywhere') - 0.05;
    a.ch('Cdim7', e0, eAny, { notes: C7, bass: 'C2', vel: 0.55 });
    trem(['C4', 'Gb4'], ['Eb4', 'A4'], e0 + 0.2, eAny, 0.1, 0.14);
    a.ch('G', eAny, S('essence').t1 - 0.3, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2' });
    a.arc('Gb', 'G', eAny, S('essence').t1, { steps: 1, color: TEAL, dr: 30 });
    a.scale(eAny, 'G');
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
