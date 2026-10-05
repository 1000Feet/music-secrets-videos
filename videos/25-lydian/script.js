// The Lydian mode: a major scale with a raised fourth, the sound of floating and wonder.
module.exports = {
  slug: 'lydian',
  title: 'The Lydian Mode',
  segments: [
    { id: 'hook',     text: 'Take a major scale, raise one note... and suddenly the music starts to float.' },
    { id: 'what',     text: 'C Lydian: C, D, E, F sharp, G, A, B. A major scale with a raised fourth.' },
    { id: 'simpsons', text: "It's the sound of The Simpsons theme..." },
    { id: 'satriani', text: 'the guitar classic Flying in a Blue Dream...' },
    { id: 'film',     text: 'and countless film scenes of flying, wonder and magic.' },
    { id: 'why1',     text: 'So why does it float? In C major, F sits a half step above E, the third.' },
    { id: 'why2',     text: 'It leans down, pulling the melody back to earth.' },
    { id: 'why3',     text: 'Raise it to F sharp, and that half step is gone. Nothing pulls down anymore.' },
    { id: 'why4',     text: 'It also turns the two chord major, because D major contains F sharp.' },
    { id: 'why5',     text: "C to D, back and forth. That's the classic dreamy Lydian move." },
    { id: 'bright',   text: 'And Lydian is the brightest mode.' },
    { id: 'fifths',   text: 'Stack perfect fifths from C: C, G, D, A, E, B, F sharp. Seven notes, all of Lydian.' },
    { id: 'essence',  text: "Raise one note, take away gravity. That's the sound of wonder." },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MAJOR, BUT FLOATING', title: 'THE LYDIAN MODE', accent: true, tonic: 0, min: 5.6 },
    { id: 'what', segs: ['what'], label: 'A RAISED FOURTH', title: 'C LYDIAN', tonic: 0, tail: 1.2 },
    { id: 'simpsons', segs: ['simpsons'], label: 'YOU HEAR IT IN', title: 'The Simpsons Theme', sub: 'Danny Elfman · 1989', tonic: 0, tail: 3.6 },
    { id: 'satriani', segs: ['satriani'], label: 'YOU HEAR IT IN', title: 'Flying in a Blue Dream', sub: 'Joe Satriani · 1989', tonic: 0, row: ['I', 'II', 'I', 'II'], min: 6.4 },
    { id: 'film', segs: ['film'], label: 'YOU HEAR IT IN', title: 'Film Scores', sub: 'Flying · wonder · magic', tonic: 0, tail: 3.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE HALF STEP', tonic: 0, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'GRAVITY', tonic: 0, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'RAISE THE FOURTH', title: 'NO MORE PULL', tonic: 0, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'THE TWO CHORD', title: 'D MAJOR', tonic: 0, tail: 0.6 },
    { id: 'why5', segs: ['why5'], label: 'THE DREAMY MOVE', title: 'I – II', tonic: 0, row: ['I', 'II', 'I', 'II'], tail: 1.4 },
    { id: 'fifths', segs: ['bright', 'fifths'], label: 'THE BRIGHTEST MODE', title: 'STACKED FIFTHS', tonic: 0, gap: 0.4, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'NO GRAVITY', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const LYD = [0, 2, 4, 6, 7, 9, 11], MAJ = a.T.MAJOR;
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    const C = ['C4', 'E4', 'G4'], D = ['D4', 'F#4', 'A4'];
    // I - II vamp, evenly spaced, optional drums
    const vamp = (t0, t1, n, o = {}) => {
      const len = (t1 - t0) / n;
      for (let i = 0; i < n; i++) {
        const isD = i % 2 === 1;
        a.ch(isD ? 'D' : 'C', t0 + i * len, t0 + (i + 1) * len, { notes: isD ? D : C, bass: isD ? 'D2' : 'C2', row: o.row ? i % 4 : null,
          strikes: o.strikes || [{ o: 0, v: 1 }, { o: len * 0.5, v: 0.5 }], vel: o.vel ?? 0.85 });
        if (o.drums) for (let b = 0; b < 4; b++) { const t = t0 + i * len + b * len / 4; a.perc(b % 2 ? 'snare' : 'kick', t, 0.6); a.perc('hat', t + len / 8, 0.3); }
        if (o.arp) {
          const arp = isD ? ['D4', 'F#4', 'A4', 'D5', 'F#5', 'A4'] : ['C4', 'E4', 'G4', 'C5', 'F#5', 'G4'];
          arp.forEach((m, j) => a.note(m, t0 + i * len + j * len / arp.length, len / arp.length * 1.5, { vel: o.arp, show: false }));
        }
      }
    };

    // hook: C Lydian pops in, a soft C - D float
    a.scale(0.2, 'C', LYD, { popIn: { t0: 0.3, step: 0.2 } });
    vamp(0.3, S('hook').t1, 4, { vel: 0.55, arp: 0.16 });
    a.ring(['F#'], a.w('hook', 'raise'), S('hook').t1, { color: GOLD });

    // what: the notes on their spoken names, then the raised fourth
    const names = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const tn = names.map((n, i) => a.w('what', n, i === 0 ? 1 : 0));
    names.forEach((n, i) => a.note((n === 'F' ? 'F#' : n) + '4', tn[i], 0.7, { vel: 0.32 }));
    a.note('C5', tn[6] + 0.4, 1.0, { vel: 0.3 });
    a.walker(names.map((n, i) => [tn[i], n === 'F' ? 'F#' : n]), { t1: a.w('what', 'major'), dr: 34, color: '#ffffff' });
    const tR = a.w('what', 'raised');
    a.ch('C', a.w('what', 'major') - 0.1, S('what').t1, { notes: ['C4', 'E4', 'F#4', 'G4'], bass: 'C3', vel: 0.6, label: 'C LYDIAN' });
    a.arc('F', 'F#', tR, S('what').t1, { steps: 1, color: GOLD, dr: 30 });
    a.tag('F#', tR, S('what').t1, 'RAISED 4TH', { color: GOLD });

    // The Simpsons theme: the Lydian colour only, a C chord and the scale with F# (no melody)
    const s0 = S('simpsons').t0 + 0.1, s1 = S('simpsons').t1;
    a.ch('C', s0, s1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: 2.0, v: 0.6 }, { o: 4.0, v: 0.6 }] });
    const run = ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4', 'F#4', 'G4'];
    const r0 = a.end('simpsons') - 0.6, rs = (s1 - r0 - 0.6) / run.length;
    run.forEach((n, i) => a.note(n, r0 + i * rs, rs * (i === run.length - 1 ? 3 : 1.2), { vel: 0.34 }));
    a.ring(['F#'], S('simpsons').t0 + 0.5, s1, { color: GOLD });
    a.tag(0, S('simpsons').t0 + 0.6, s1, 'C WITH F#', { x: 540, y: 455, color: GOLD });

    // Flying in a Blue Dream: a driving C - D vamp (chords only)
    vamp(S('satriani').t0 + 0.05, S('satriani').t1, 4, { row: true, drums: true, strikes: [{ o: 0, v: 1 }, { o: 0.4, v: 0.5 }, { o: 0.8, v: 0.7 }] });

    // film scores: slow, wide, shimmering C and D chords
    const f0 = S('film').t0 + 0.1, f1 = S('film').t1, fm = (f0 + f1) / 2;
    a.ch('C', f0, fm, { notes: ['G3', 'C4', 'E4', 'B4'], bass: 'C2', vel: 0.6, label: 'Cmaj7' });
    a.ch('D', fm, f1, { notes: ['A3', 'D4', 'F#4', 'C#5'], bass: 'D2', vel: 0.6, label: 'Dmaj7' });
    const shimmer = ['C5', 'E5', 'G5', 'F#5', 'E5', 'G5', 'B4', 'D5', 'F#5', 'A5', 'F#5', 'D5', 'E5', 'F#5'];
    shimmer.forEach((n, i) => a.note(n, f0 + 0.3 + i * (f1 - f0 - 0.8) / shimmer.length, 0.9, { vel: 0.17 }));

    // why1: in C major, F sits a half step above E
    a.scale(S('why1').t0, 'C', MAJ);
    a.ch('C', S('why1').t0 + 0.1, S('why2').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.5, hideName: true });
    const tF = a.w('why1', 'F'), tE = a.w('why1', 'E'), tHalf = a.w('why1', 'half');
    a.ring(['F'], tF, S('why2').t1, { color: RED });
    a.note('F4', tF, 0.6, { vel: 0.32 });
    a.arc('F', 'E', tHalf, S('why2').t1, { steps: -1, color: RED, dr: 30, label: 'HALF STEP', labelR: 70 });
    a.tag('E', a.w('why1', 'third'), S('why2').t1, 'THE THIRD', { color: '#ffd84a', x: 930, y: 985 });
    a.note('E4', tE, 0.8, { vel: 0.32 });
    // why2: F leans down to E, again and again
    const l0 = a.w('why2', 'leans');
    for (let k = 0; k < 3; k++) { a.note('F4', l0 + k * 0.9, 0.4, { vel: 0.34 }); a.note('E4', l0 + k * 0.9 + 0.4, 0.45, { vel: 0.34 }); }
    a.tag('F', l0, S('why2').t1, 'PULLS DOWN', { color: RED, x: 835, y: 1110 });

    // why3: raise it to F#, the pull is gone
    const tRa = a.w('why3', 'Raise'), tS = a.w('why3', 'F');
    a.scale(tRa, 'C', LYD);
    a.ch('C', S('why3').t0 + 0.1, S('why3').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.5, hideName: true });
    a.arc('F', 'F#', tRa, S('why3').t1, { steps: 1, color: GOLD, dr: 30 });
    a.ring(['F#'], tS, S('why3').t1, { color: GOLD });
    a.tag('F#', a.w('why3', 'gone'), S('why3').t1, 'NO PULL', { color: GOLD, dr: -75 });
    a.note('F#4', tS, 2.2, { vel: 0.34 });
    a.note('F#5', a.w('why3', 'Nothing'), 2.4, { vel: 0.26 });
    a.big('FLOATING', a.w('why3', 'Nothing'), S('why3').t1, { y: 455, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // why4: the two chord, D major, contains F#
    a.ch('C', S('why4').t0 + 0.1, a.w('why4', 'two') - 0.04, { notes: C, bass: 'C3', vel: 0.6 });
    a.ch('D', a.w('why4', 'two') - 0.04, S('why4').t1, { notes: D, bass: 'D3', vel: 0.9 });
    a.ring(['F#'], a.w('why4', 'F'), S('why4').t1, { color: GOLD });
    a.tag('F#', a.w('why4', 'F'), S('why4').t1, 'F SHARP', { color: GOLD });

    // why5: the dreamy move, back and forth
    const v0 = a.w('why5', 'C') - 0.04;
    vamp(v0, S('why5').t1, 4, { row: true, drums: true, arp: 0.18, vel: 0.8 });

    // bright + fifths: stack fifths from C, then the circle of fifths shows seven in a row
    const FI = ['C', 'G', 'D', 'A', 'E', 'B', 'F#'], FM = ['C2', 'G2', 'D3', 'A3', 'E4', 'B4', 'F#5'];
    a.ch('C', S('fifths').t0 + 0.1, a.w('fifths', 'C', 1) - 0.1, { notes: ['E4', 'G4', 'B4'], bass: 'C2', vel: 0.5, label: 'Cmaj7' });
    a.tag(0, a.w('bright', 'brightest'), a.w('fifths', 'Stack'), 'BRIGHTEST OF THE MODES', { x: 540, y: 455, color: GOLD });
    const fp = FI.map((n, i) => [a.w('fifths', n === 'F#' ? 'F' : n, n === 'C' ? 1 : 0), n]);
    a.walker(fp, { t1: a.w('fifths', 'Seven') + 0.3, color: '#ffffff' });
    FI.forEach((n, i) => a.note(FM[i], fp[i][0], S('fifths').t1 - fp[i][0], { vel: 0.2 }));
    const tSev = a.w('fifths', 'Seven');
    a.layout(tSev - 0.3, 1, 1.4);
    a.poly(FI, tSev + 0.6, S('fifths').t1, { closed: false, dash: false, color: GOLD, glow: true, alpha: 0.9, width: 5 });
    a.tag('A', tSev + 0.6, S('fifths').t1, 'SEVEN IN A ROW', { color: GOLD, x: 540, y: 830 });
    a.layout(S('essence').t0, 0, 1.2);

    // essence: one last float, landing on the full Lydian chord
    const e0 = S('essence').t0 + 0.1, eL = e0 + 4.0;
    vamp(e0, eL, 4, { arp: 0.16, vel: 0.75 });
    a.ch('Cmaj7', eL, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'F#4', 'G4', 'B4'], bass: 'C2', label: 'Cmaj7#11' });
    a.ring(['F#'], eL, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
