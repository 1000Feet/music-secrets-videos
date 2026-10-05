// The minor third: three half steps, a 6:5 ratio, and the building block of minor chords.
module.exports = {
  slug: 'minor-third',
  title: 'The Minor Third',
  segments: [
    { id: 'hook',    text: 'One tiny interval is the heart of minor chords, a Beatles classic, and a playground taunt.' },
    { id: 'what',    text: "Start on A and go up three half steps, to C. That's a minor third." },
    { id: 'greens',  text: "It's the very first leap in Greensleeves..." },
    { id: 'jude',    text: 'the two notes of Hey Jude, falling down...' },
    { id: 'smoke',   text: 'the start of the Smoke on the Water riff, going up...' },
    { id: 'taunt',   text: 'and the taunt kids sing everywhere.' },
    { id: 'why1',    text: 'So what makes it special? Its two notes vibrate in a ratio of six to five.' },
    { id: 'minor',   text: 'Look at A minor: A, C, E. A minor third on the bottom, a major third on top.' },
    { id: 'major',   text: 'Now C major: C, E, G. The same two thirds, just swapped.' },
    { id: 'fifth',   text: 'Either way, they stack up to a perfect fifth.' },
    { id: 'fifth2',  text: 'Six to five, times five to four... is three to two.' },
    { id: 'dim',     text: 'And if you stack only minor thirds? You get the diminished chord.' },
    { id: 'dim2',    text: 'Four of them divide the octave into equal parts.' },
    { id: 'essence', text: 'Two thirds, swapped. That small flip is the whole difference between happy and sad.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THREE HALF STEPS', title: 'THE MINOR THIRD', accent: true, tonic: 9, min: 5.0 },
    { id: 'what', segs: ['what'], label: 'COUNT 3 HALF STEPS', title: 'A TO C', tonic: 9, tail: 0.9 },
    { id: 'greens', segs: ['greens'], label: 'YOU HEAR IT IN', title: 'Greensleeves', sub: 'Traditional · in A minor', tonic: 9, tail: 3.0 },
    { id: 'jude', segs: ['jude'], label: 'YOU HEAR IT IN', title: 'Hey Jude', sub: 'The Beatles · 1968 · in F', tonic: 5, tail: 2.0 },
    { id: 'smoke', segs: ['smoke'], label: 'YOU HEAR IT IN', title: 'Smoke on the Water', sub: 'Deep Purple · 1972', tonic: 7, tail: 2.0 },
    { id: 'taunt', segs: ['taunt'], label: 'YOU HEAR IT IN', title: 'The Playground Taunt', sub: 'Kids everywhere · traditional', tonic: 0, tail: 2.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SIX TO FIVE', circle: false, tail: 0.9 },
    { id: 'minor', segs: ['minor'], label: 'WHY IT WORKS', title: 'A MINOR', tonic: 9, tail: 0.6 },
    { id: 'major', segs: ['major'], label: 'WHY IT WORKS', title: 'C MAJOR', tonic: 0, tail: 0.6 },
    { id: 'fifth', segs: ['fifth', 'fifth2'], label: 'EITHER WAY', title: 'A PERFECT FIFTH', tonic: 0, gap: 0.4, tail: 0.9 },
    { id: 'dim', segs: ['dim', 'dim2'], label: 'ONLY MINOR THIRDS', title: 'DIMINISHED', tonic: 9, gap: 0.4, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TWO THIRDS, SWAPPED', accent: true, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', PINK = '#ff7a93', GOLD = '#ffcf5a';

    // hook: A up to C, then the A minor chord it lives in
    a.scale(0.2, 'A', a.T.MINOR, { popIn: { t0: 0.3, step: 0.1 } });
    a.note('A3', 0.5, 0.7, { vel: 0.34 });
    a.note('C4', 1.1, 0.9, { vel: 0.34 });
    a.arc('A', 'C', 1.1, 3.6, { steps: 3, color: GOLD });
    a.ch('Am', 2.0, S('hook').t1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.6 });

    // what: walk three half steps from A to C
    const tA = a.w('what', 'A'), tUp = a.w('what', 'up');
    const steps = [[tA, 9]];
    for (let i = 1; i <= 3; i++) steps.push([tUp + 0.1 + i * 0.25, (9 + i) % 12]);
    a.walker(steps, { t1: S('what').t1 });
    steps.forEach(([t, p]) => a.note(57 + p - 9, t, 0.3, { vel: 0.2, show: false }));
    a.arc('A', 'C', tUp + 0.35, S('what').t1, { steps: 3, color: GOLD });
    a.tag('A', tUp + 0.6, S('what').t1, '3 HALF STEPS', { color: '#ffffff', x: 540, y: 905 });
    const tM = a.w('what', 'minor');
    a.ch('A5', tM - 0.05, S('what').t1, { notes: ['A3', 'C4'], bass: 'A2', hideName: true, vel: 0.7 });
    a.tag('C', tM, S('what').t1, 'MINOR THIRD', { color: GOLD, x: 540, y: 830 });

    // greensleeves (public domain): A C D E F E D over a soft A minor
    const g0 = a.end('greens') + 0.1, gb = 0.3;
    a.ch('Am', S('greens').t0 + 0.05, S('greens').t1, { notes: ['A2', 'C3', 'E3'], bass: false, vel: 0.45 });
    a.melody([['A3', 1], ['C4', 2], ['D4', 1], ['E4', 1.5], ['F4', 0.5], ['E4', 1], ['D4', 2]], g0, gb, { vel: 0.42 });
    a.arc('A', 'C', g0 + gb, S('greens').t1, { steps: 3, color: GOLD });
    a.tag('A', g0 + gb, S('greens').t1, 'MINOR THIRD, UP', { color: GOLD, x: 540, y: 458 });

    // hey jude: only the two notes, C falling to A, over a low F
    a.scale(S('jude').t0, 'F');
    const j0 = a.end('jude') + 0.05;
    a.note('F2', S('jude').t0 + 0.1, S('jude').t1 - S('jude').t0 - 0.2, { vel: 0.22, show: false });
    a.note('C4', j0, 0.55, { vel: 0.42 }); a.note('A3', j0 + 0.6, 1.2, { vel: 0.42 });
    a.arc('C', 'A', j0 + 0.6, S('jude').t1, { steps: -3, color: GOLD });
    a.tag('A', j0 + 0.6, S('jude').t1, 'MINOR THIRD, DOWN', { color: GOLD, x: 540, y: 458 });

    // smoke on the water: only the first two notes, G up to Bb
    a.scale(S('smoke').t0, 'G', a.T.MINOR);
    const s0 = a.end('smoke') + 0.05;
    ['G2', 'G3'].forEach(n => a.note(n, s0, 0.6, { vel: 0.38 }));
    ['Bb2', 'Bb3'].forEach(n => a.note(n, s0 + 0.65, 1.2, { vel: 0.38 }));
    a.arc('G', 'Bb', s0 + 0.65, S('smoke').t1, { steps: 3, color: GOLD });
    a.tag('G', s0 + 0.65, S('smoke').t1, 'MINOR THIRD, UP', { color: GOLD, x: 540, y: 458 });

    // the playground taunt: G E A G E
    a.scale(S('taunt').t0, 'C');
    const t0 = a.end('taunt') + 0.05, tb = 0.38;
    a.melody([['G4', 1], ['E4', 0.75], ['A4', 0.75], ['G4', 1], ['E4', 2]], t0, tb, { vel: 0.42 });
    a.arc('G', 'E', t0 + tb, S('taunt').t1, { steps: -3, color: GOLD });
    a.tag('E', t0 + tb, S('taunt').t1, 'MINOR THIRD, DOWN', { color: GOLD, x: 540, y: 458 });

    // why1: the 6:5 ratio
    a.lissajous(6, 5, a.w('why1', 'vibrate') - 0.3, S('why1').t1, { drawIn: 2.6, labelA: 'C × 6', labelB: 'A × 5', drift: 0.12, res: 3000 });
    a.big('6 : 5', a.w('why1', 'ratio'), S('why1').t1, { y: 470, size: 72, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('A3', a.w('why1', 'notes'), 3.5, { vel: 0.25, show: false });
    a.note('C4', a.w('why1', 'notes'), 3.5, { vel: 0.25, show: false });

    // minor: A C E = minor third + major third
    a.scale(S('minor').t0, 'A', a.T.MINOR);
    a.ch('Am', a.w('minor', 'A', 1) - 0.05, S('minor').t1, { notes: ['A3', 'C4', 'E4'], bass: 'A2' });
    a.arc('A', 'C', a.w('minor', 'bottom') - 0.6, S('minor').t1, { steps: 3, color: PINK });
    a.tag('A', a.w('minor', 'bottom') - 0.6, S('minor').t1, 'MINOR 3RD', { color: PINK, x: 360, y: 440 });
    a.arc('C', 'E', a.w('minor', 'major') - 0.1, S('minor').t1, { steps: 4, color: TEAL });
    a.tag('C', a.w('minor', 'major') - 0.1, S('minor').t1, 'MAJOR 3RD', { color: TEAL, x: 720, y: 440 });

    // major: C E G = major third + minor third
    a.scale(S('major').t0, 'C');
    a.ch('C', a.w('major', 'C', 1) - 0.05, S('fifth').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3' });
    const tSame = a.w('major', 'same') - 0.3;
    a.arc('C', 'E', tSame, S('major').t1, { steps: 4, color: TEAL });
    a.arc('E', 'G', tSame, S('major').t1, { steps: 3, color: PINK });
    a.tag('C', tSame, S('major').t1, 'MAJOR 3RD', { color: TEAL, x: 360, y: 440 });
    a.tag('E', tSame, S('major').t1, 'MINOR 3RD', { color: PINK, x: 720, y: 440 });
    a.tag('E', a.w('major', 'swapped'), S('major').t1, 'SWAPPED', { color: '#ffffff', x: 540, y: 905 });

    // fifth: both add up to 3:2
    a.arc('C', 'E', S('fifth').t0, S('fifth').t1, { steps: 4, color: TEAL, dr: 30 });
    a.arc('E', 'G', S('fifth').t0, S('fifth').t1, { steps: 3, color: PINK, dr: 30 });
    a.line('C', 'G', a.w('fifth', 'perfect'), S('fifth').t1, { color: GOLD, label: 'PERFECT FIFTH', ly: 78 });
    a.big('6:5 × 5:4 = 3:2', a.w('fifth2', 'Six'), S('fifth').t1, { y: 440, size: 60, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('C5', a.w('fifth2', 'three'), 1.6, { vel: 0.3, show: false });
    a.note('G5', a.w('fifth2', 'three'), 1.6, { vel: 0.3, show: false });

    // dim: stacked minor thirds A C Eb F# close the circle
    a.scale(S('dim').t0, 'A', [0, 3, 6, 9]);
    const tD = a.w('dim', 'stack');
    const DIM = [['A', 'A3'], ['C', 'C4'], ['Eb', 'Eb4'], ['F#', 'F#4']];
    DIM.forEach(([p, n], i) => a.note(n, tD + i * 0.35, 0.5, { vel: 0.3 }));
    const tDim = a.w('dim', 'diminished') - 0.05;
    a.ch('Adim7', tDim, S('dim').t1, { notes: ['A3', 'C4', 'Eb4', 'F#4'], bass: 'A2', label: 'Adim7' });
    const tF = a.w('dim2', 'Four');
    const cols = [PINK, GOLD, TEAL, '#8d98ff'];
    DIM.forEach(([p], i) => a.arc(p, DIM[(i + 1) % 4][0], tF + i * 0.3, S('dim').t1, { steps: 3, color: cols[i], dr: 30 }));
    a.big('3 + 3 + 3 + 3 = 12', a.w('dim2', 'octave'), S('dim').t1, { y: 440, size: 56, family: 'DM Mono', weight: 500, color: GOLD });

    // essence: the flip, minor to major and back
    a.scale(S('essence').t0, 'A', a.T.MINOR);
    const e0 = S('essence').t0 + 0.1, eSw = a.w('essence', 'swapped') - 0.05;
    const eH = a.w('essence', 'happy') - 0.05, eS = a.w('essence', 'sad') - 0.05;
    a.ch('Am', e0, eSw, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.7 });
    a.ch('C', eSw, eH, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.7 });
    a.ch('C', eH, eS, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.85, tonic: 0 });
    a.ch('Am', eS, S('essence').t1 - 0.3, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2' });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
