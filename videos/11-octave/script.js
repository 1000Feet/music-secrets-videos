// The octave: two notes twelve half steps apart that sound like the same note, and why (2:1).
module.exports = {
  slug: 'octave',
  title: 'The Octave',
  segments: [
    { id: 'hook',     text: 'Play two notes twelve keys apart, and your ear hears... the same note.' },
    { id: 'what',     text: "Start on C and climb twelve half steps, all the way to the next C. That's an octave." },
    { id: 'rainbow',  text: "It's the giant leap that opens Over the Rainbow..." },
    { id: 'ball',     text: 'and Take Me Out to the Ball Game starts with an octave leap down.' },
    { id: 'why1',     text: 'So why do they sound alike? An A vibrates 440 times a second.' },
    { id: 'why2',     text: 'The A above vibrates 880 times. Exactly double: two to one.' },
    { id: 'why3',     text: 'Every swing of the low note lines up with exactly two of the high one.' },
    { id: 'harm',     text: 'And every harmonic of the upper note is already a harmonic of the lower one.' },
    { id: 'harm2',    text: 'So they blend completely.' },
    { id: 'names',    text: "That's why note names repeat every twelve keys. C, C, C, C." },
    { id: 'circle',   text: 'On the circle, an octave is one full turn, back to the same spot.' },
    { id: 'sing',     text: 'When men and women sing a tune together, they are often an octave apart...' },
    { id: 'sing2',    text: 'and we hear one melody.' },
    { id: 'essence',  text: "The octave is the frame that holds every other note. Music's home address." },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE INTERVAL', title: 'THE OCTAVE', accent: true, min: 4.8 },
    { id: 'what', segs: ['what'], label: 'COUNT 12 HALF STEPS', title: 'C TO C', tail: 1.0 },
    { id: 'rainbow', segs: ['rainbow'], label: 'YOU HEAR IT IN', title: 'Over the Rainbow', sub: 'Harold Arlen · 1939', tail: 2.4 },
    { id: 'ball', segs: ['ball'], label: 'YOU HEAR IT IN', title: 'Take Me Out to the Ball Game', sub: 'Albert Von Tilzer · 1908 · in C', tail: 3.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'VIBRATION', circle: false, tail: 0.3 },
    { id: 'why2', segs: ['why2', 'why3'], label: 'WHY IT WORKS', title: 'TWO TO ONE', circle: false, tail: 0.6 },
    { id: 'harm', segs: ['harm', 'harm2'], label: 'THE HARMONICS', title: 'A PERFECT BLEND', circle: false, gap: 0.3, tail: 0.6 },
    { id: 'names', segs: ['names'], label: 'ON THE PIANO', title: 'SAME NAME', tail: 0.6 },
    { id: 'circle', segs: ['circle'], label: 'ON THE CIRCLE', title: 'ONE FULL TURN', tail: 0.8 },
    { id: 'sing', segs: ['sing', 'sing2'], label: 'SINGING TOGETHER', title: 'ONE MELODY', gap: 0.2, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: "MUSIC'S HOME ADDRESS", accent: true, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', PINK = '#ff7a93', GOLD = '#ffcf5a';

    // hook: C rings out in four registers, always on the same spot of the circle
    a.scale(0.2, 'C', [0], { popIn: { t0: 0.3, step: 0.2 } });
    a.ring(['C'], 0.5, S('hook').t1, { color: GOLD });
    a.note('C2', 0.3, 4.2, { vel: 0.22, show: false });
    ['C3', 'C4', 'C5'].forEach((n, i) => a.note(n, 0.6 + i * 0.55, 3.2 - i * 0.55, { vel: 0.3 }));
    a.arc('C', 'C', 1.15, S('hook').t1, { steps: 12, color: GOLD, dr: 30 });
    a.tag('C', a.w('hook', 'same'), S('hook').t1, 'SAME NOTE', { color: GOLD, dr: -92 });
    a.note('C4', a.w('hook', 'same'), 1.4, { vel: 0.26 }); a.note('C5', a.w('hook', 'same'), 1.4, { vel: 0.26 });

    // what: walk all twelve half steps, a full turn back to C
    const tStart = a.w('what', 'C'), tClimb = a.w('what', 'climb');
    const steps = [[tStart, 0]];
    for (let i = 1; i <= 12; i++) steps.push([tClimb + 0.1 + i * 0.17, i]);
    a.walker(steps, { t1: S('what').t1, color: '#ffffff', dr: 0 });
    steps.forEach(([t, p]) => a.note(60 + p, t, 0.22, { vel: 0.18, show: false }));
    const tOct = a.w('what', 'octave');
    a.ch('C5', tOct - 0.05, S('what').t1, { label: 'C → C', notes: ['C4', 'C5'], bass: 'C3', shape: false });
    a.tag('F#', a.w('what', 'next'), S('what').t1, '12 HALF STEPS', { color: '#ffffff', dr: -92 });
    a.tag('C', tOct, S('what').t1, 'OCTAVE', { color: GOLD });

    // over the rainbow (copyrighted): only the two-note octave leap
    const r0 = a.end('rainbow') + 0.05;
    a.note('C2', S('rainbow').t0 + 0.1, S('rainbow').t1 - S('rainbow').t0 - 0.1, { vel: 0.2, show: false });
    a.note('C4', r0, 0.6, { vel: 0.42 }); a.note('C5', r0 + 0.65, 1.5, { vel: 0.42 });
    a.arc('C', 'C', r0 + 0.65, S('rainbow').t1, { steps: 12, color: TEAL, label: 'UP AN OCTAVE', labelR: 165 });
    a.ring(['C'], r0, S('rainbow').t1, { color: GOLD });

    // take me out to the ball game (public domain): the opening phrase, in C, 3/4
    const b0 = a.end('ball') + 0.05, beat = 0.27;
    a.scale(S('ball').t0, 'C');
    a.arc('C', 'C', a.w('ball', 'down'), S('ball').t1, { steps: -12, color: PINK, label: 'DOWN AN OCTAVE', labelR: 165 });
    a.ch('C', S('ball').t0 + 0.1, b0 + 10 * beat, { notes: ['E3', 'G3'], bass: 'C2', vel: 0.5, hideName: true, shape: false });
    a.ch('G7', b0 + 10 * beat, S('ball').t1, { notes: ['F3', 'B3'], bass: 'G2', vel: 0.5, hideName: true, shape: false });
    a.melody([['C5', 2], ['C4', 1], ['A4', 1], ['G4', 1], ['E4', 1], ['G4', 3], ['D4', 3]], b0, beat, { vel: 0.42 });

    // why1-3: 440 vs 880, the 2:1 figure
    a.note('A4', S('why1').t0 + 0.6, 2.0, { vel: 0.3, show: false });
    a.big('A = 440 Hz', S('why1').t0 + 0.6, a.w('why2', 'two'), { y: 700, size: 76, family: 'DM Mono', weight: 500, color: TEAL });
    a.note('A5', a.w('why2', '880'), 2.0, { vel: 0.26, show: false });
    a.big('A = 880 Hz', a.w('why2', '880'), a.w('why2', 'two'), { y: 860, size: 76, family: 'DM Mono', weight: 500, color: PINK });
    const tRatio = a.w('why2', 'two');
    a.lissajous(2, 1, tRatio, S('why2').t1, { drawIn: 2.2, labelA: 'HIGH × 2', labelB: 'LOW × 1', drift: 0.12 });
    a.big('2 : 1', tRatio, S('why2').t1, { y: 470, size: 72, family: 'DM Mono', weight: 500, color: GOLD });
    a.note('A3', tRatio, 4.5, { vel: 0.24, show: false }); a.note('A4', tRatio, 4.5, { vel: 0.24, show: false });

    // harm: harmonics of A 440 vs A 880 (every upper one is already in the lower row)
    const LOW = [440, 880, 1320, 1760, 2200, 2640], cell = (l, i, col) => ({ label: l, sub: '×' + (i + 1), size: 40, color: col });
    const DARK = '#0b0b0d';
    const g1 = a.grid(LOW.map((f, i) => cell(String(f), i, TEAL)), S('harm').t0 + 0.2, S('harm').t1,
      { rows: 1, cols: 6, cw: 160, chh: 150, y: 600, revealStep: 0.12, caption: 'HARMONICS OF A 440' });
    const g2 = a.grid(LOW.map((f, i) => (i % 2 ? { label: String(f), sub: '×' + ((i + 1) / 2), size: 40, color: PINK } : { label: '', color: DARK })),
      a.w('harm', 'upper'), S('harm').t1, { rows: 1, cols: 6, cw: 160, chh: 150, y: 860, caption: 'HARMONICS OF A 880' });
    const hs = S('harm').t0 + 0.2;
    LOW.forEach((f, i) => { g1.active.push({ t0: hs + i * 0.12, t1: hs + i * 0.12 + 0.3, i }); a.note(57 + [0, 12, 19, 24, 28, 31][i], hs + i * 0.12, 1.2, { vel: i ? 0.12 : 0.28, show: false }); });
    const tAl = a.w('harm', 'already');
    [1, 3, 5].forEach(i => { g1.active.push({ t0: tAl, t1: S('harm').t1, i }); g2.active.push({ t0: tAl, t1: S('harm').t1, i }); });
    a.note('A3', a.w('harm2', 'blend'), 2.2, { vel: 0.26, show: false }); a.note('A4', a.w('harm2', 'blend'), 2.2, { vel: 0.26, show: false });

    // names: C2..C5 light up on the keyboard and land on the same spot of the circle
    a.scale(S('names').t0, 'C', [0]);
    const KX = [50, 324, 599, 873];
    ['C2', 'C3', 'C4', 'C5'].forEach((n, i) => {
      const t = a.w('names', 'C', i);
      a.note(n, t, S('names').t1 - t - 0.1, { vel: 0.32 });
      a.big(n, t, S('names').t1, { x: KX[i] + (i === 0 ? 14 : 0), y: 1165, size: 34, family: 'DM Mono', weight: 500, color: GOLD, blur: 10 });
    });
    a.ring(['C'], a.w('names', 'C', 0), S('names').t1, { color: GOLD });
    a.tag('C', a.w('names', 'repeat'), S('names').t1, 'EVERY 12 KEYS', { color: '#ffffff', dr: -92 });

    // circle: one full turn, back home
    const c0 = a.w('circle', 'full') - 0.2;
    const turn = [[S('circle').t0 + 0.2, 0]];
    for (let i = 1; i <= 12; i++) turn.push([c0 + i * 0.13, i]);
    a.walker(turn, { t1: S('circle').t1, color: '#ffffff', dr: 34 });
    turn.forEach(([t, p], i) => a.note(60 + p, t, 0.2, { vel: i ? 0.14 : 0.26, show: false }));
    a.arc('C', 'C', c0, S('circle').t1, { steps: 12, color: GOLD, dr: -30, label: '1 TURN = 1 OCTAVE', labelR: 140 });
    a.ring(['C'], a.w('circle', 'same'), S('circle').t1, { color: GOLD });

    // sing: a simple tune in parallel octaves, both voices on the same spots
    a.scale(S('sing').t0, 'C');
    const TUNE = ['C', 'D', 'E', 'F', 'G', 'E', 'D', 'C'];
    const s0 = S('sing').t0 + 0.3, sl = (S('sing').t1 - s0 - 0.6) / TUNE.length;
    TUNE.forEach((n, i) => { a.note(n + '3', s0 + i * sl, sl * 0.95, { vel: 0.3, show: false }); a.note(n + '4', s0 + i * sl, sl * 0.95, { vel: 0.3, show: false }); });
    a.walker(TUNE.map((n, i) => [s0 + i * sl, n]), { t1: S('sing').t1, dr: 34, color: TEAL, label: 'LOW', labelDr: 60 });
    a.walker(TUNE.map((n, i) => [s0 + i * sl, n]), { t1: S('sing').t1, dr: -40, color: PINK, label: 'HIGH', labelDr: -50 });
    a.ch('C', s0, S('sing').t1, { notes: ['G2', 'C3'], bass: 'C2', vel: 0.35, hideName: true, shape: false, label: '' });

    // essence: C stacked in every register
    const e0 = S('essence').t0 + 0.1;
    a.scale(S('essence').t0, 'C', [0, 4, 7]);
    a.ch('C', e0, S('essence').t1 - 0.3, { notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.8 });
    a.ring(['C'], e0, S('essence').t1, { color: GOLD });
    a.tag('C', a.w('essence', 'home'), S('essence').t1, 'HOME');
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
