// The augmented chord: two major thirds stacked into a perfect triangle, pure motion.
module.exports = {
  slug: 'augmented-chord',
  title: 'The Augmented Chord',
  segments: [
    { id: 'hook',    text: 'One chord sounds dreamy, unstable... like something is about to change.' },
    { id: 'what',    text: "Stack two major thirds on C: C, E, G sharp. That's C augmented." },
    { id: 'darling', text: 'It opens Oh! Darling, by the Beatles...' },
    { id: 'film',    text: 'it makes the wavy shimmer of film and TV dream sequences...' },
    { id: 'move',    text: 'and it powers a classic move: C, C augmented, F.' },
    { id: 'move2',   text: 'G rises to G sharp, then to A.' },
    { id: 'why1',    text: 'So why does it float? Two major thirds make eight half steps.' },
    { id: 'why2',    text: "One more major third, and you're back on C. Three equal parts: a perfect triangle." },
    { id: 'root',    text: "It's symmetric, so no note is clearly the root." },
    { id: 'rotate',  text: 'Turn the triangle one step, two, three...' },
    { id: 'rotate2', text: 'and the fourth step is the first chord again.' },
    { id: 'four',    text: 'So there are only four augmented chords.' },
    { id: 'pull',    text: 'And the raised fifth, G sharp, acts like a leading tone, pushing up to A.' },
    { id: 'pull2',   text: "That's why C augmented leads so naturally to F, or A minor." },
    { id: 'essence', text: 'A chord with no bottom and no top: pure motion, waiting to land.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE DREAM CHORD', title: 'THE AUGMENTED CHORD', accent: true, tonic: 0, min: 5.0 },
    { id: 'what', segs: ['what'], label: 'STACK MAJOR THIRDS', title: 'C AUGMENTED', tonic: 0, tail: 0.9 },
    { id: 'darling', segs: ['darling'], label: 'YOU HEAR IT IN', title: 'Oh! Darling', sub: 'The Beatles · 1969', tonic: 4, tail: 2.6 },
    { id: 'film', segs: ['film'], label: 'YOU HEAR IT IN', title: 'Dream Sequences', sub: 'Film & TV · wavy transitions', tonic: 0, tail: 2.8 },
    { id: 'move', segs: ['move', 'move2'], label: 'A CLASSIC MOVE', title: 'C · C+ · F', tonic: 0, row: ['C', 'C+', 'F'], gap: 0.4, tail: 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT FLOATS', title: 'EIGHT HALF STEPS', tonic: 0, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT FLOATS', title: 'A PERFECT TRIANGLE', tonic: 0, tail: 1.0 },
    { id: 'root', segs: ['root'], label: 'NO NOTE IN CHARGE', title: 'NO CLEAR ROOT', tonic: 0, tail: 2.2 },
    { id: 'rotate', segs: ['rotate', 'rotate2'], label: 'ROTATE THE TRIANGLE', title: 'ONE STEP AT A TIME', tonic: 0, gap: 0.4, tail: 0.8 },
    { id: 'four', segs: ['four'], label: 'ALL TWELVE NOTES', title: 'ONLY FOUR', tonic: 0, tail: 1.6 },
    { id: 'pull', segs: ['pull'], label: 'THE RAISED FIFTH', title: 'A LEADING TONE', tonic: 0, tail: 1.0 },
    { id: 'pull2', segs: ['pull2'], label: 'WHERE IT LEADS', title: 'TO F OR Am', tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'PURE MOTION', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', PINK = '#ff7a93';
    const AUG = [0, 4, 8];
    const CA = ['C4', 'E4', 'G#4'];
    // rippling arpeggio over a chord (the dreamy shimmer)
    const ripple = (notes, t0, t1, step = 0.16, vel = 0.2) => {
      const seq = [...notes, ...notes.map(n => n.replace(/\d/, d => +d + 1)), ...notes.map(n => n.replace(/\d/, d => +d + 1)).reverse().slice(1), ...notes.slice(1).reverse()];
      for (let t = t0, i = 0; t < t1 - 0.1; t += step, i++) a.note(seq[i % seq.length], t, step * 2.5, { vel, show: false });
    };

    // hook: a shimmering C augmented, the triangle drawn in
    const h0 = 0.3, h1 = S('hook').t1;
    a.scale(0.2, 'C', AUG, { popIn: { t0: 0.4, step: 0.3 } });
    a.ch('Caug', h0, h1, { notes: CA, bass: 'C2', label: 'C+', vel: 0.45 });
    ripple(CA, h0 + 0.4, h1, 0.15, 0.17);
    a.poly(['C', 'E', 'G#'], 1.4, h1, { color: GOLD, dash: true, width: 3, alpha: 0.6 });

    // what: stack major thirds C -> E -> G#
    const tC = a.w('what', 'C', 1), tE = a.w('what', 'E'), tG = a.w('what', 'G');
    a.scale(S('what').t0, 'C', [0]); a.scale(tE, 'C', [0, 4]); a.scale(tG, 'C', AUG);
    a.note('C4', tC, 0.8, { vel: 0.34 }); a.note('E4', tE, 0.8, { vel: 0.34 }); a.note('G#4', tG, 0.9, { vel: 0.34 });
    a.walker([[tC, 'C'], [tE, 'E'], [tG, 'G#']], { t1: a.w('what', 'augmented') - 0.1, dr: 34 });
    a.arc('C', 'E', tE, S('what').t1, { steps: 4, color: TEAL, dr: 30 });
    a.arc('E', 'G#', tG, S('what').t1, { steps: 4, color: TEAL, dr: 30 });
    a.tag(0, a.w('what', 'major'), S('what').t1, 'MAJOR 3RD = 4 HALF STEPS', { x: 540, y: 455, color: TEAL });
    a.tag(8, tG, S('what').t1, 'G#', { dr: -75 });
    a.ch('Caug', a.w('what', 'augmented') - 0.04, S('what').t1, { notes: CA, bass: 'C3', label: 'C+' });

    // oh! darling: one plain E augmented chord (E G# B#), no melody
    a.scale(S('darling').t0, 'E', AUG);
    const d0 = a.end('darling') + 0.05, d1 = S('darling').t1;
    a.ch('Eaug', d0, d1, { notes: ['E4', 'G#4', 'C5'], bass: 'E2', label: 'E+', strikes: [0, 1, 2, 3].map(k => ({ o: k * 0.62, v: k ? 0.55 : 1 })) });
    a.tag('C', d0 + 0.3, d1, 'B# = C', { x: 540, y: 455, color: '#62a8ff' });

    // film: wavy whole-step shifts between C+ and D+, rippling like a harp
    const f0 = S('film').t0 + 0.1, f1 = S('film').t1, fm = (f0 + f1) / 2;
    const DA = ['D4', 'F#4', 'A#4'];
    a.scale(f0, 'C', AUG);
    a.ch('Caug', f0, fm, { notes: CA, bass: 'C3', label: 'C+', vel: 0.5 });
    a.ch('Daug', fm, f1, { notes: DA, bass: 'D3', label: 'D+', vel: 0.5 });
    a.scale(fm, 'D', AUG);
    ripple(CA, f0 + 0.2, fm, 0.13, 0.2);
    ripple(DA, fm, f1, 0.13, 0.2);
    a.tag(0, a.w('film', 'wavy'), f1, 'DREAMY', { x: 540, y: 455, color: GOLD });

    // move: C -> C+ -> F, G rises to G# then to A
    a.scale(S('move').t0, 'C');
    const V = { C: ['C4', 'E4', 'G4'], Caug: ['C4', 'E4', 'G#4'], F: ['C4', 'F4', 'A4'] };
    const BS = { C: 'C3', Caug: 'C3', F: 'F2' };
    const LB = { C: 'C', Caug: 'C+', F: 'F' };
    const m1 = [S('move').t0 + 0.05, a.w('move', 'augmented'), a.w('move', 'F'), a.w('move2', 'G', 0)].map(t => t - 0.04);
    const m2 = [a.w('move2', 'G', 0), a.w('move2', 'G', 1), a.w('move2', 'A'), S('move').t1].map(t => t - 0.04);
    ['C', 'Caug', 'F'].forEach((c, i) => {
      a.ch(c, m1[i], m1[i + 1], { notes: V[c], bass: BS[c], label: LB[c], row: i, vel: 0.8 });
      a.ch(c, m2[i], i === 2 ? S('move').t1 : m2[i + 1], { notes: V[c], bass: BS[c], label: LB[c], row: i });
    });
    a.walker([[m2[0], 'G'], [m2[1], 'G#'], [m2[2], 'A']], { t1: S('move').t1, dr: 34, color: GOLD });
    a.arc('G', 'G#', m2[1], S('move').t1, { steps: 1, color: TEAL, dr: 30 });
    a.arc('G#', 'A', m2[2], S('move').t1, { steps: 1, color: TEAL, dr: 30 });
    a.tag('A', m2[2] + 0.2, S('move').t1, '3RD OF F', { dr: -125 });

    // why1: two major thirds = eight half steps
    a.scale(S('why1').t0, 'C', AUG);
    const w0 = S('why1').t0 + 0.1, tTwo = a.w('why1', 'Two'), tMore = a.w('why2', 'more');
    a.ch('Caug', w0, S('why2').t1, { notes: CA, bass: 'C3', label: 'C+', vel: 0.55 });
    a.arc('C', 'E', tTwo, S('why2').t1, { steps: 4, color: TEAL, dr: 30 });
    a.arc('E', 'G#', tTwo + 0.4, S('why2').t1, { steps: 4, color: TEAL, dr: 30 });
    a.note('E4', tTwo, 0.5, { vel: 0.3 }); a.note('G#4', tTwo + 0.4, 0.6, { vel: 0.3 });
    a.tag(8, tTwo + 0.4, S('why1').t1, 'G#', { dr: -75 });
    a.big('4 + 4 = 8', a.w('why1', 'eight'), S('why1').t1, { y: 455, size: 56, family: 'DM Mono', weight: 500, color: GOLD });
    // why2: one more third closes the loop -> triangle
    a.arc('G#', 'C', tMore, S('why2').t1, { steps: 4, color: PINK, dr: 30 });
    a.note('C5', tMore + 0.3, 0.8, { vel: 0.32 });
    a.tag('C', a.w('why2', 'back'), a.w('why2', 'Three') - 0.1, 'BACK ON C', { x: 540, y: 455, color: PINK });
    a.big('3 × 4 = 12', a.w('why2', 'Three'), a.w('why2', 'triangle'), { y: 455, size: 56, family: 'DM Mono', weight: 500, color: GOLD });
    a.poly(['C', 'E', 'G#'], a.w('why2', 'triangle') - 0.2, S('why2').t1, { color: GOLD, dash: false, glow: true, width: 5, alpha: 0.9 });
    a.big('3 EQUAL SIDES', a.w('why2', 'triangle'), S('why2').t1, { y: 455, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // root: the same three notes, each one taking a turn in the bass
    a.scale(S('root').t0, 'C', AUG);
    const q0 = a.w('root', 'no'), q1 = S('root').t1, ql = (q1 - q0) / 3;
    a.ch('Caug', S('root').t0 + 0.05, q0, { notes: CA, bass: 'C3', label: 'C+', vel: 0.6 });
    [['Caug', 'C+', 'C', 'C3'], ['Eaug', 'E+', 'E', 'E2'], ['G#aug', 'G#+', 'G#', 'G#2']].forEach(([c, lbl, pc, bass], i) => {
      a.ch(c, q0 + i * ql, q0 + (i + 1) * ql, { notes: CA, bass, label: lbl, vel: 0.8 });
      a.ring([pc], q0 + i * ql, q0 + (i + 1) * ql, { color: '#ffffff' });
    });
    a.poly(['C', 'E', 'G#'], S('root').t0, q1, { color: GOLD, dash: true, width: 3, alpha: 0.5 });
    a.tag(0, q0, q1, 'SAME THREE NOTES', { x: 540, y: 455, color: '#ffffff' });

    // rotate: one, two, three steps -> new chords; the fourth step = the first again
    const RO = [['C+', CA], ['C#+', ['C#4', 'F4', 'A4']], ['D+', ['D4', 'F#4', 'A#4']], ['Eb+', ['Eb4', 'G4', 'B4']], ['E+ = C+', ['E4', 'G#4', 'C5']]];
    const rt = [S('rotate').t0 + 0.05, a.w('rotate', 'one'), a.w('rotate', 'two'), a.w('rotate', 'three'), a.w('rotate2', 'first') - 0.3, S('rotate').t1].map((t, i) => (i && i < 5 ? t - 0.04 : t));
    ['C', 'C#', 'D', 'Eb', 'E'].forEach((k, i) => a.scale(rt[i], k, AUG));
    const RN = ['Caug', 'C#aug', 'Daug', 'Ebaug', 'Eaug'];
    RO.forEach(([lbl, notes], i) => a.ch(RN[i], rt[i], rt[i + 1], { notes, bass: false, label: lbl, vel: 0.8 }));
    a.poly(['C', 'E', 'G#'], rt[4], S('rotate').t1, { color: GOLD, dash: true, width: 3, alpha: 0.7 });
    a.tag(0, rt[1], rt[4], '+1 STEP', { x: 540, y: 455, color: TEAL });
    a.tag(0, rt[4], S('rotate').t1, 'SAME AS THE START', { x: 540, y: 455, color: GOLD });

    // four: only four augmented chords cover all twelve notes
    const th0 = S('four').t0, thw = a.w('four', 'four');
    a.ch('Caug', th0 + 0.05, thw, { notes: CA, bass: false, vel: 0.6, hideName: true });
    a.poly(['C', 'E', 'G#'], th0, S('four').t1, { color: PINK, dash: false, glow: true, width: 4, alpha: 0.9 });
    a.poly(['C#', 'F', 'A'], thw - 0.3, S('four').t1, { color: TEAL, dash: false, glow: true, width: 4, alpha: 0.9 });
    a.poly(['D', 'F#', 'A#'], thw - 0.05, S('four').t1, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.9 });
    a.poly(['D#', 'G', 'B'], thw + 0.2, S('four').t1, { color: '#8d98ff', dash: false, glow: true, width: 4, alpha: 0.9 });
    a.scale(thw + 0.3, 'C', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], { popIn: { t0: thw + 0.3, step: 0.05 } });
    a.big('4', thw, S('four').t1, { y: 830, size: 150, family: 'DM Sans', color: '#ffffff' });
    a.big('12 ÷ 3 = 4', thw + 0.3, S('four').t1, { y: 455, size: 56, family: 'DM Mono', weight: 500, color: GOLD });
    [['C#4', 'F4'], ['D4', 'F#4'], ['D#4', 'G4']].forEach((p, i) => p.forEach(n => a.note(n, thw - 0.3 + i * 0.25, 1.2, { vel: 0.17, show: false })));

    // pull: the raised fifth G# leans up to A
    a.scale(S('pull').t0, 'C', AUG);
    const tG2 = a.w('pull', 'G'), tUp = a.w('pull', 'up');
    a.ch('Caug', S('pull').t0 + 0.1, S('pull').t1, { notes: CA, bass: 'C3', label: 'C+', vel: 0.65 });
    a.ring(['G#'], tG2, S('pull').t1, { color: GOLD });
    a.tag(8, tG2, S('pull').t1, 'G#', { dr: -75 });
    a.tag('G#', a.w('pull', 'leading'), S('pull').t1, 'LEADING TONE', { x: 540, y: 455, color: GOLD });
    a.arc('G#', 'A', tUp, S('pull').t1, { steps: 1, color: TEAL, dr: 30, label: 'UP', labelR: 345 });
    a.note('G#4', tG2, 0.6, { vel: 0.32 }); a.note('A4', tUp, 1.0, { vel: 0.34 });

    // pull2: C+ -> F, then C+ -> Am, G# rising to A each time
    const p0 = S('pull2').t0 + 0.05, tF = a.w('pull2', 'F') - 0.05, tA = a.w('pull2', 'A') - 0.05;
    a.ch('Caug', p0, tF, { notes: CA, bass: 'C3', label: 'C+', vel: 0.7 });
    a.ch('F', tF, tF + (tA - tF) * 0.55, { notes: ['C4', 'F4', 'A4'], bass: 'F2' });
    a.ch('Caug', tF + (tA - tF) * 0.55, tA, { notes: CA, bass: 'C3', label: 'C+', vel: 0.65 });
    a.ch('Am', tA, S('pull2').t1, { notes: ['C4', 'E4', 'A4'], bass: 'A2' });
    a.arc('G#', 'A', tF, tF + (tA - tF) * 0.55, { steps: 1, color: TEAL, dr: 30 });
    a.arc('G#', 'A', tA, S('pull2').t1, { steps: 1, color: TEAL, dr: 30 });
    a.scale(tF, 'F'); a.scale(tA, 'A', a.T.MINOR);

    // essence: the floating triangle, then it lands on F
    a.scale(S('essence').t0, 'C', AUG);
    const e0 = S('essence').t0 + 0.1, eLand = a.w('essence', 'land') - 0.05;
    a.ch('Caug', e0, eLand, { notes: CA, bass: 'C2', label: 'C+', vel: 0.5 });
    a.poly(['C', 'E', 'G#'], e0, eLand + 0.3, { color: GOLD, dash: false, glow: true, width: 4, alpha: 0.8 });
    ripple(CA, e0 + 0.2, eLand, 0.15, 0.15);
    a.ch('F', eLand, S('essence').t1 - 0.3, { notes: ['C4', 'F4', 'A4', 'C5'], bass: 'F2' });
    a.arc('G#', 'A', eLand, S('essence').t1, { steps: 1, color: TEAL, dr: 30 });
    a.scale(eLand, 'F');
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
