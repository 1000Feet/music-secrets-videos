// Major vs minor: one note, one half step, and the mood flips.
module.exports = {
  slug: 'major-vs-minor',
  title: 'Major vs Minor',
  segments: [
    { id: 'hook',    text: 'Change just one note by a half step, and happy turns sad.' },
    { id: 'what',    text: 'C major is C, E, G. Lower the E to E flat, and you get C minor.' },
    { id: 'tw1',     text: "Here's Twinkle, Twinkle in major..." },
    { id: 'tw2',     text: "and here's the very same tune in minor." },
    { id: 'hits',    text: 'Plenty of hits live in minor keys:' },
    { id: 'billie',  text: 'Billie Jean, in F sharp minor...' },
    { id: 'losing',  text: 'Losing My Religion, in A minor...' },
    { id: 'eleanor', text: 'and Eleanor Rigby, in E minor.' },
    { id: 'why1',    text: 'So what actually changes? Only the third.' },
    { id: 'why2',    text: 'E sits four half steps above C. E flat sits just three.' },
    { id: 'harm',    text: 'The major chord is built right into the harmonic series: four to five to six.' },
    { id: 'harm2',   text: 'The minor chord is not as simple: ten to twelve to fifteen.' },
    { id: 'speech',  text: 'Some research finds that sad speech moves in smaller pitch steps, close to a minor third.' },
    { id: 'speech2', text: 'That may be part of why minor sounds sad.' },
    { id: 'culture', text: "But culture plays a big role too. It's not a universal law." },
    { id: 'mirror',  text: 'And a twist: a minor chord is a major chord flipped upside down.' },
    { id: 'essence', text: 'One half step, and the whole mood flips. The smallest change, with the biggest emotional effect.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE NOTE', title: 'MAJOR VS MINOR', accent: true, tonic: 0, min: 4.8 },
    { id: 'what', segs: ['what'], label: 'C E G VS C Eb G', title: 'ONE HALF STEP', tonic: 0, tail: 0.9 },
    { id: 'tw1', segs: ['tw1'], label: 'IN MAJOR', title: 'Twinkle, Twinkle', sub: 'Traditional · in C major', tonic: 0, tail: 4.75 },
    { id: 'tw2', segs: ['tw2'], label: 'IN MINOR', title: 'Twinkle, Twinkle', sub: 'Traditional · in C minor', tonic: 0, tail: 4.8 },
    { id: 'billie', segs: ['hits', 'billie'], label: 'MINOR-KEY HITS', title: 'Billie Jean', sub: 'Michael Jackson · 1983 · F# minor', tonic: 6, gap: 0.3, tail: 1.7 },
    { id: 'losing', segs: ['losing'], label: 'MINOR-KEY HITS', title: 'Losing My Religion', sub: 'R.E.M. · 1991 · A minor', tonic: 9, tail: 1.7 },
    { id: 'eleanor', segs: ['eleanor'], label: 'MINOR-KEY HITS', title: 'Eleanor Rigby', sub: 'The Beatles · 1966 · E minor', tonic: 4, tail: 1.8 },
    { id: 'why', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'ONLY THE THIRD', tonic: 0, gap: 0.4, tail: 0.9 },
    { id: 'harm', segs: ['harm', 'harm2'], label: 'THE HARMONIC SERIES', title: "NATURE'S CHORD", circle: false, gap: 0.4, tail: 0.6 },
    { id: 'speech', segs: ['speech', 'speech2'], label: 'SOME RESEARCH', title: 'SAD SPEECH', tonic: 0, gap: 0.4, tail: 0.5 },
    { id: 'culture', segs: ['culture'], label: 'BUT', title: 'CULTURE MATTERS', circle: false, tail: 0.6 },
    { id: 'mirror', segs: ['mirror'], label: 'A TWIST', title: 'THE MIRROR', tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE STEP, NEW MOOD', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c';
    const MAJ = ['C4', 'E4', 'G4'], MIN = ['C4', 'Eb4', 'G4'];
    const C = (t0, t1, o = {}) => a.ch('C', t0, t1, { notes: MAJ, bass: 'C3', ...o });
    const Cm = (t0, t1, o = {}) => a.ch('Cm', t0, t1, { notes: MIN, bass: 'C3', ...o });

    // hook: C major, then the third drops and it turns to C minor
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const hSad = a.w('hook', 'sad') - 0.05;
    C(0.5, hSad, { vel: 0.7 });
    a.scale(hSad, 'C', a.T.MINOR);
    Cm(hSad, S('hook').t1, { vel: 0.8 });
    a.walker([[0.5, 'E'], [hSad, 'Eb']], { t1: S('hook').t1, dr: -40, color: GOLD });

    // what: C E G, then E drops to E flat
    const tC = a.w('what', 'C', 1) - 0.05, tLow = a.w('what', 'flat') - 0.05, tMin = a.w('what', 'minor') - 0.05;
    a.scale(S('what').t0, 'C');
    C(tC, tLow);
    a.walker([[a.w('what', 'Lower'), 'E'], [tLow, 'Eb']], { t1: S('what').t1, dr: -40, color: GOLD });
    a.arc('E', 'Eb', tLow, S('what').t1, { steps: -1, color: GOLD });
    Cm(tLow, S('what').t1);
    a.tag('Eb', tMin, S('what').t1, 'HALF STEP DOWN', { color: GOLD, x: 540, y: 905 });

    // twinkle (public domain), harmonised; then the same tune in C minor
    const twinkle = (t0, minor) => {
      const b = 0.28, n = minor ? { A: 'Ab4', E: 'Eb4' } : { A: 'A4', E: 'E4' };
      const mel = [['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], [n.A, 1], [n.A, 1], ['G4', 2],
        ['F4', 1], ['F4', 1], [n.E, 1], [n.E, 1], ['D4', 1], ['D4', 1], ['C4', 2]];
      a.melody(mel, t0, b, { vel: 0.42 });
      const I = minor ? ['Cm', ['C3', 'Eb3', 'G3']] : ['C', ['C3', 'E3', 'G3']];
      const IV = minor ? ['Fm', ['C3', 'F3', 'Ab3']] : ['F', ['C3', 'F3', 'A3']];
      const V = ['G', ['B2', 'D3', 'G3']];
      const prog = [[I, 4, 'C2'], [IV, 2, 'F2'], [I, 2, 'C2'], [IV, 2, 'F2'], [I, 2, 'C2'], [V, 2, 'G2'], [I, 2, 'C2']];
      let t = t0;
      prog.forEach(([[name, notes], beats, bass]) => { a.ch(name, t, t + beats * b, { notes, bass, vel: 0.45 }); t += beats * b; });
      return t;
    };
    const w1 = a.end('tw1') + 0.1;
    twinkle(w1, false);
    const w2 = a.end('tw2') + 0.1;
    a.scale(S('tw2').t0, 'C', a.T.MINOR);
    twinkle(w2, true);
    a.tag('Eb', w2, S('tw2').t1, 'A AND E LOWERED', { color: PINK, x: 540, y: 458 });
    a.ring(['Ab'], w2 + 4 * 0.28, w2 + 8 * 0.28, { color: PINK });
    a.ring(['Eb'], w2 + 10 * 0.28, w2 + 12 * 0.28 + 0.3, { color: PINK });

    // minor-key hits: only a generic minor-chord vamp in each key
    const vamp = (name, notes, bass, t0, t1, drums) => {
      const n = 4, len = (t1 - t0) / n;
      for (let i = 0; i < n; i++) a.ch(name, t0 + i * len, t0 + (i + 1) * len, { notes, bass, strikes: [{ o: 0, v: 1 }, { o: len / 2, v: 0.6 }], vel: 0.8 });
      if (drums) { const st = len / 2; for (let i = 0; i < n * 2; i++) { a.perc(i % 2 ? 'snare' : 'kick', t0 + i * st, 0.7); a.perc('hat', t0 + i * st + st / 2, 0.4); } }
    };
    a.scale(S('billie').t0, 'F#', a.T.MINOR);
    vamp('F#m', ['F#3', 'A3', 'C#4'], 'F#2', a.at('billie'), S('billie').t1 - 0.05, true);
    a.arc('F#', 'A', a.at('billie') + 0.3, S('billie').t1, { steps: 3, color: GOLD });
    a.tag('A', a.at('billie') + 0.3, S('billie').t1, 'MINOR THIRD', { color: GOLD, x: 540, y: 458 });
    a.scale(S('losing').t0, 'A', a.T.MINOR);
    vamp('Am', ['A3', 'C4', 'E4'], 'A2', S('losing').t0 + 0.1, S('losing').t1 - 0.05, false);
    a.arc('A', 'C', S('losing').t0 + 0.3, S('losing').t1, { steps: 3, color: GOLD });
    a.tag('C', S('losing').t0 + 0.3, S('losing').t1, 'MINOR THIRD', { color: GOLD, x: 540, y: 458 });
    a.scale(S('eleanor').t0, 'E', a.T.MINOR);
    vamp('Em', ['E3', 'G3', 'B3'], 'E2', S('eleanor').t0 + 0.1, S('eleanor').t1 - 0.05, false);
    a.arc('E', 'G', S('eleanor').t0 + 0.3, S('eleanor').t1, { steps: 3, color: GOLD });
    a.tag('G', S('eleanor').t0 + 0.3, S('eleanor').t1, 'MINOR THIRD', { color: GOLD, x: 540, y: 458 });

    // why: only the third, 4 vs 3 half steps
    a.scale(S('why').t0, 'C');
    const tThird = a.w('why1', 'third') - 0.05, tE = a.w('why2', 'E') - 0.05, tEb = a.w('why2', 'flat') - 0.05;
    C(S('why').t0 + 0.1, tThird, { vel: 0.6 });
    Cm(tThird, tE, { vel: 0.6 });
    a.ring(['E', 'Eb'], tThird, tE, { color: GOLD });
    C(tE, tEb);
    a.arc('C', 'E', tE, tEb, { steps: 4, color: TEAL });
    a.tag('E', tE + 0.2, tEb, '4 HALF STEPS', { color: TEAL, x: 540, y: 440 });
    Cm(tEb, S('why').t1);
    a.arc('C', 'Eb', tEb, S('why').t1, { steps: 3, color: PINK });
    a.tag('Eb', tEb + 0.2, S('why').t1, '3 HALF STEPS', { color: PINK, x: 540, y: 440 });

    // harmonic series: C E G = harmonics 4, 5, 6 of a low C
    const H = [['C', '×1', 36], ['C', '×2', 48], ['G', '×3', 55], ['C', '×4', 60], ['E', '×5', 64], ['G', '×6', 67]];
    const tH2 = a.at('harm2');
    const g = a.grid(H.map(([l, s], i) => ({ label: l, sub: s, color: i >= 3 ? TEAL : '#8a8a92' })),
      a.w('harm', 'series') - 0.3, tH2, { rows: 2, cols: 3, cw: 260, chh: 190, y: 520, caption: 'HARMONICS OF A LOW C', revealStep: 0.15 });
    const hs = a.w('harm', 'series') - 0.1;
    H.forEach(([, , m], i) => { const t = hs + i * 0.3; a.note(m, t, i ? 1.4 : 3.0, { vel: i ? 0.16 : 0.32, show: false }); g.active.push({ t0: t, t1: t + 0.3, i }); });
    const tFour = a.w('harm', 'four');
    [3, 4, 5].forEach(i => g.active.push({ t0: tFour, t1: tH2, i }));
    a.big('4 : 5 : 6', tFour, tH2, { y: 440, size: 72, family: 'DM Mono', weight: 500, color: TEAL });
    a.ch('C', tFour, tH2, { notes: MAJ, bass: 'C3', shape: false });
    const tTen = a.w('harm2', 'ten');
    a.big('C MINOR', tH2 + 0.2, S('harm').t1, { y: 620, size: 44, family: 'DM Mono', weight: 500, color: '#8a8a92' });
    a.big('10 : 12 : 15', tTen, S('harm').t1, { y: 760, size: 96, family: 'DM Mono', weight: 500, color: PINK });
    a.big('NOT AS SIMPLE', a.w('harm2', 'simple'), S('harm').t1, { y: 900, size: 40, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 });
    a.ch('Cm', tH2, S('harm').t1, { notes: MIN, bass: 'C3', shape: false });

    // speech: small falling steps, about a minor third
    a.scale(S('speech').t0, 'C', a.T.MINOR);
    a.ch('Cm', S('speech').t0 + 0.1, S('speech').t1, { notes: ['C3', 'Eb3', 'G3'], bass: false, vel: 0.35 });
    const tSm = a.w('speech', 'smaller');
    [0, 1].forEach(k => { const t = tSm + k * 1.3; a.note('Eb4', t, 0.45, { vel: 0.3 }); a.note('C4', t + 0.5, 0.7, { vel: 0.3 }); });
    a.arc('Eb', 'C', tSm + 0.5, S('speech').t1, { steps: -3, color: GOLD });
    a.tag('C', a.w('speech', 'minor'), S('speech').t1, 'CLOSE TO A MINOR THIRD', { color: GOLD, x: 540, y: 440 });

    // culture: not a universal law
    const tCu = a.w('culture', 'culture');
    a.big('CULTURE', tCu, S('culture').t1, { y: 720, size: 96, color: '#ffffff' });
    a.big('PLAYS A ROLE', tCu + 0.3, S('culture').t1, { y: 830, size: 56, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('NOT A UNIVERSAL LAW', a.w('culture', 'universal'), S('culture').t1, { y: 960, size: 44, family: 'DM Mono', weight: 500, color: RED });
    a.ch('C', S('culture').t0 + 0.1, a.w('culture', 'universal'), { notes: ['C3', 'E3', 'G3'], bass: false, shape: false, vel: 0.4 });
    a.ch('Cm', a.w('culture', 'universal'), S('culture').t1, { notes: ['C3', 'Eb3', 'G3'], bass: false, shape: false, vel: 0.4 });

    // mirror: C E G reflected across the C-G axis becomes C Eb G
    a.scale(S('mirror').t0, 'C');
    const tFl = a.w('mirror', 'flipped') - 0.05;
    C(S('mirror').t0 + 0.1, tFl, { vel: 0.7 });
    a.line(3.5, 9.5, a.w('mirror', 'minor') - 0.2, S('mirror').t1, { color: '#ffffff', dash: true, width: 2 });
    a.tag('C', S('mirror').t0 + 0.3, tFl, 'UP 4 + 3', { color: TEAL, x: 540, y: 440 });
    Cm(tFl, S('mirror').t1);
    a.ghost('C', tFl, S('mirror').t1, { color: TEAL });
    a.arc('E', 'Eb', tFl, S('mirror').t1, { steps: -1, color: GOLD });
    a.tag('Eb', tFl + 0.2, S('mirror').t1, 'UP 3 + 4', { color: PINK, x: 540, y: 440 });

    // essence: flip, flip back, and land
    a.scale(S('essence').t0, 'C');
    const e0 = S('essence').t0 + 0.1, eF = a.w('essence', 'flips') - 0.05, eS = a.w('essence', 'smallest') - 0.05;
    const eB = a.w('essence', 'biggest') - 0.05, eEnd = a.end('essence') + 0.1;
    C(e0, eF, { vel: 0.75 });
    Cm(eF, eS, { vel: 0.8 });
    C(eS, eB, { vel: 0.75 });
    Cm(eB, eEnd, { vel: 0.8 });
    a.ch('C', eEnd, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2' });
    a.walker([[e0, 'E'], [eF, 'Eb'], [eS, 'E'], [eB, 'Eb'], [eEnd, 'E']], { t1: S('essence').t1, dr: -40, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
