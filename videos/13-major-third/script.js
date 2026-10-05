// The major third: four half steps that make a chord major, and why (5:4, the harmonic series).
module.exports = {
  slug: 'major-third',
  title: 'The Major Third',
  segments: [
    { id: 'hook',    text: 'One small interval is what makes a chord sound major, and bright.' },
    { id: 'what',    text: "Start on C and go up four half steps, to E. That's a major third." },
    { id: 'saints',  text: "It's the opening rise of When the Saints Go Marching In..." },
    { id: 'swing',   text: 'the gentle fall of Swing Low, Sweet Chariot...' },
    { id: 'beet',    text: "and Beethoven's Fifth: three short notes, then a fall of a major third." },
    { id: 'why1',    text: 'So why does it sound so bright? The ratio is five to four.' },
    { id: 'harm',    text: 'Play a low C, and listen to its harmonics. The fifth one... is an E.' },
    { id: 'chord',   text: 'Add the G above, and you get C major: four, five, six.' },
    { id: 'chord2',  text: 'The major chord is built right into the harmonic series.' },
    { id: 'tune',    text: 'But on a piano, the major third is about fourteen cents wider than the pure five to four.' },
    { id: 'tune2',   text: 'So choirs and string players often narrow it by ear.' },
    { id: 'aug',     text: 'Stack two major thirds, C, E, G sharp, and you get the augmented chord.' },
    { id: 'aug2',    text: 'Add a third one, and you are back at C. A perfect triangle.' },
    { id: 'essence', text: 'Four half steps, and the whole world of major. Brightness is built into physics.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE INTERVAL', title: 'THE MAJOR THIRD', accent: true, min: 4.8 },
    { id: 'what', segs: ['what'], label: 'COUNT 4 HALF STEPS', title: 'C TO E', tail: 0.9 },
    { id: 'saints', segs: ['saints'], label: 'YOU HEAR IT IN', title: 'When the Saints', sub: 'Traditional · in C', tail: 2.6 },
    { id: 'swing', segs: ['swing'], label: 'YOU HEAR IT IN', title: 'Swing Low, Sweet Chariot', sub: 'Traditional · in C', tail: 2.3 },
    { id: 'beet', segs: ['beet'], label: 'YOU HEAR IT IN', title: 'Symphony No. 5', sub: 'Ludwig van Beethoven · 1808', tail: 2.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT SOUNDS BRIGHT', title: 'FIVE TO FOUR', circle: false, tail: 0.8 },
    { id: 'harm', segs: ['harm'], label: 'THE HARMONIC SERIES', title: 'E HIDES IN C', circle: false, tail: 0.6 },
    { id: 'chord', segs: ['chord', 'chord2'], label: 'THE HARMONIC SERIES', title: 'THE MAJOR CHORD', circle: false, gap: 0.4, tail: 0.8 },
    { id: 'tune', segs: ['tune', 'tune2'], label: 'ON THE PIANO', title: '14 CENTS WIDE', gap: 0.3, tail: 1.2 },
    { id: 'aug', segs: ['aug', 'aug2'], label: 'STACK THEM', title: 'THE AUGMENTED CHORD', gap: 0.3, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BUILT INTO PHYSICS', accent: true, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', PINK = '#ff7a93', GOLD = '#ffcf5a', YEL = '#ffd84a';
    const pad = (name, t0, t1, notes, bass, vel = 0.45) => a.ch(name, t0, t1, { notes, bass, vel, hideName: true, shape: false });

    // hook: the C major triangle, with its major third drawn as an arc
    a.scale(0.2, 'C', [0, 4, 7], { popIn: { t0: 0.2, step: 0.15 } });
    a.ch('C', 0.4, S('hook').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.6 });
    a.arc('C', 'E', 0.8, S('hook').t1, { steps: 4, color: YEL, dr: 30 });
    a.note('C5', 0.8, 0.5, { vel: 0.28, show: false }); a.note('E5', 1.3, 2.0, { vel: 0.28, show: false });
    a.tag('E', a.w('hook', 'major'), S('hook').t1, 'MAJOR THIRD', { color: YEL, dr: -92 });

    // what: four half steps, C to E
    const tC = a.w('what', 'C'), tGo = a.w('what', 'go');
    const steps = [[tC, 0]];
    for (let i = 1; i <= 4; i++) steps.push([tGo + 0.1 + i * 0.22, i]);
    a.walker(steps, { t1: S('what').t1, color: '#ffffff', dr: 0 });
    steps.forEach(([t, p]) => a.note(60 + p, t, 0.25, { vel: 0.2, show: false }));
    const t3 = a.w('what', 'major');
    a.ch('C', t3 - 0.05, S('what').t1, { notes: ['C4', 'E4'], bass: false, hideName: true, vel: 0.9 });
    a.tag('D', a.w('what', 'four'), S('what').t1, '4 HALF STEPS', { color: '#ffffff', dr: -110 });
    a.tag('E', t3, S('what').t1, 'MAJOR THIRD', { color: YEL });

    // when the saints (public domain): C E F G
    const s0 = a.end('saints') + 0.1, sb = 0.3;
    a.scale(S('saints').t0, 'C');
    pad('C', S('saints').t0 + 0.1, S('saints').t1, ['G2'], 'C2', 0.4);
    a.melody([['C4', 1], ['E4', 1], ['F4', 1], ['G4', 4]], s0, sb, { vel: 0.44 });
    a.arc('C', 'E', s0 + sb, S('saints').t1, { steps: 4, color: YEL, label: 'UP A MAJOR THIRD', labelR: 165 });

    // swing low (public domain): E falls to C
    const w0 = a.end('swing') + 0.1, wb = 0.42;
    pad('C', S('swing').t0 + 0.1, S('swing').t1, ['G2'], 'C2', 0.4);
    a.melody([['E4', 1.5], ['C4', 2.5]], w0, wb, { vel: 0.44 });
    a.arc('E', 'C', w0 + 1.5 * wb, S('swing').t1, { steps: -4, color: TEAL, label: 'DOWN A MAJOR THIRD', labelR: 165 });

    // beethoven 5 (public domain): G G G Eb, short-short-short-long, in octaves
    const b0 = a.end('beet') + 0.1, bb = 0.24;
    a.scale(S('beet').t0, 'Eb', [0, 4]);
    [['G4', 0], ['G4', 1], ['G4', 2], ['Eb4', 3]].forEach(([n, i]) => {
      const t = b0 + i * bb, d = i < 3 ? bb * 0.9 : 1.8;
      a.note(n, t, d, { vel: 0.46 }); a.note(n.replace('4', '3'), t, d, { vel: 0.36, show: false }); a.note(n.replace('4', '2'), t, d, { vel: 0.3, show: false });
    });
    a.arc('G', 'Eb', b0 + 3 * bb, S('beet').t1, { steps: -4, color: TEAL, label: 'DOWN A MAJOR THIRD', labelR: 165 });

    // why1: the 5:4 figure
    const tR = a.w('why1', 'ratio');
    a.lissajous(5, 4, tR - 0.3, S('why1').t1, { drawIn: 2.0, labelA: 'E × 5', labelB: 'C × 4', drift: 0.12, colorA: YEL, colorB: PINK });
    a.big('5 : 4', tR, S('why1').t1, { y: 470, size: 72, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('C4', S('why1').t0 + 0.3, 1.6, { vel: 0.28, show: false }); a.note('E4', S('why1').t0 + 0.3, 1.6, { vel: 0.28, show: false });
    a.note('C4', tR, 2.6, { vel: 0.26, show: false }); a.note('E4', tR, 2.6, { vel: 0.26, show: false });

    // harmonics of a low C: C C G C E G (4:5:6 = C E G)
    const H = [['C2', '×1', 36], ['C3', '×2', 48], ['G3', '×3', 55], ['C4', '×4', 60], ['E4', '×5', 64], ['G4', '×6', 67]];
    const col = l => (l[0] === 'G' ? '#45d6c8' : l[0] === 'E' ? YEL : PINK);
    const g = a.grid(H.map(([l, s]) => ({ label: l, sub: s, color: col(l) })), a.w('harm', 'Play'), S('chord').t1,
      { rows: 2, cols: 3, cw: 260, chh: 190, y: 560, caption: 'HARMONICS OF A LOW C' });
    const hs = a.w('harm', 'harmonics');
    H.slice(0, 5).forEach(([, , m], i) => {
      const t = hs + i * 0.36;
      a.note(m, t, i ? 1.6 : 3.4, { vel: i ? 0.16 : 0.34, show: false });
      g.active.push({ t0: t, t1: t + 0.32, i });
    });
    const tE = a.w('harm', 'E');
    g.active.push({ t0: tE, t1: S('harm').t1, i: 4 });
    a.note('C2', tE, 2.0, { vel: 0.3, show: false }); a.note('E4', tE, 2.0, { vel: 0.3, show: false });
    // chord: 4 : 5 : 6
    [['four', 3], ['five', 4], ['six', 5]].forEach(([w, i]) => {
      const t = a.w('chord', w);
      g.active.push({ t0: t, t1: S('chord').t1, i });
      a.note(H[i][2], t, 0.9, { vel: 0.3, show: false });
    });
    a.note('G4', a.w('chord', 'G'), 0.9, { vel: 0.3, show: false });
    g.active.push({ t0: a.w('chord', 'G'), t1: a.w('chord', 'four'), i: 5 });
    a.big('4 : 5 : 6', a.w('chord', 'four'), S('chord').t1, { y: 1080, size: 64, family: 'DM Mono', weight: 500, color: GOLD });
    pad('C', a.w('chord2', 'major'), S('chord').t1, ['C4', 'E4', 'G4'], 'C2', 0.6);

    // tune: tempered third vs pure 5:4 (3.86 half steps)
    a.scale(S('tune').t0, 'C', [0, 4]);
    const tPiano = a.w('tune', 'piano'), tPure = a.w('tune', 'pure'), tNarrow = a.w('tune2', 'narrow');
    a.line('C', 'E', tPiano, S('tune').t1, { color: PINK });
    a.line(0, 3.86, tPure, S('tune').t1, { color: TEAL, dash: true });
    a.tag(0, tPiano + 0.3, S('tune').t1, 'PIANO', { color: PINK, x: 830, y: 1010 });
    a.tag(0, tPure, S('tune').t1, 'PURE 5 : 4', { color: TEAL, x: 640, y: 1040 });
    a.big('+14 CENTS', a.w('tune', 'fourteen'), S('tune').t1, { y: 452, size: 60, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('C4', tPiano, 2.4, { vel: 0.26 }); a.note('E4', tPiano, 2.4, { vel: 0.26 });
    a.note('C4', tNarrow, 2.6, { vel: 0.26, show: false }); a.note(63.86, tNarrow, 2.6, { vel: 0.26, show: false });

    // aug: stack two thirds, then a third one closes the triangle
    const tE2 = a.w('aug', 'E'), tGs = a.w('aug', 'G'), tAug = a.w('aug', 'augmented');
    a.scale(S('aug').t0, 'C', [0, 4, 8]);
    a.note('C4', a.w('aug', 'C'), 0.5, { vel: 0.3 });
    a.arc('C', 'E', tE2 - 0.1, S('aug').t1, { steps: 4, color: YEL, label: '+4', labelR: 165 });
    a.note('E4', tE2, 0.5, { vel: 0.3 });
    a.arc('E', 'G#', tGs - 0.1, S('aug').t1, { steps: 4, color: YEL, label: '+4', labelR: 165 });
    a.note('G#4', tGs, 0.5, { vel: 0.3 });
    a.tag('G#', tGs, S('aug').t1, 'G#', { color: '#ffffff', dr: -75 });
    a.ch('Caug', tAug - 0.05, S('aug').t1, { label: 'C+', notes: ['C4', 'E4', 'G#4'], bass: 'C3', vel: 0.8 });
    const tBack = a.w('aug2', 'third');
    a.arc('G#', 'C', tBack, S('aug').t1, { steps: 4, color: YEL, label: '+4', labelR: 165 });
    a.note('C5', a.w('aug2', 'C'), 1.2, { vel: 0.34 });
    a.tag('C', a.w('aug2', 'C'), S('aug').t1, 'BACK AT C', { color: YEL });

    // essence: C major once more, the third glowing
    const e0 = S('essence').t0 + 0.1;
    a.scale(S('essence').t0, 'C', [0, 4, 7]);
    a.ch('C', e0, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.8 });
    a.arc('C', 'E', e0 + 0.3, S('essence').t1, { steps: 4, color: YEL, dr: 30 });
    a.tag('E', a.w('essence', 'major'), S('essence').t1, 'BRIGHT', { color: YEL, dr: -92 });
    a.note('E5', a.w('essence', 'Brightness'), 2.0, { vel: 0.26, show: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
