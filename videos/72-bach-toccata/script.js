// Toccata and Fugue in D minor, decoded: a mordent, a falling run in octaves, and one diminished seventh chord.
// The opening (public domain) is played as given in the brief; rhythm approximate. A5 is above the
// on-screen keyboard (C2-G5), so the top octave sounds but only the lower octave lights up.
const M = 0.085; // mordent note length
// one statement of the opening idea from t0, transposed by `sh` semitones; returns key times and walker points
function plan(t0, k = 1) {
  const T = { a: t0, g: t0 + M, a2: t0 + 2 * M };
  T.run = T.a2 + 0.85 * k + 0.25 * k;
  T.cs = T.run + 4 * 0.12 * k;
  T.d = T.cs + 0.65 * k;
  T.end = T.d + 0.6 * k;
  return T;
}
const STMT = plan(0).end; // length of one statement

module.exports = {
  slug: 'bach-toccata',
  title: 'Toccata and Fugue in D minor',
  segments: [
    { id: 'hook',      text: 'A quick flick, a falling run, one huge chord.' },
    { id: 'what',      text: 'This is the Toccata and Fugue in D minor, traditionally attributed to Bach.' },
    { id: 'what2',     text: 'Some scholars question whether he really wrote it.' },
    { id: 'play',      text: 'Here is how it begins.' },
    { id: 'chord',     text: 'Then a huge chord builds from the bottom, over a low D in the pedals, and resolves to D minor.' },
    { id: 'fantasia',  text: "Disney's Fantasia, in 1940, opened with an orchestral version by Leopold Stokowski." },
    { id: 'fantasia2', text: 'It became the classic spooky organ sound in films.' },
    { id: 'why1',      text: 'So why does it grab you? The mordent: a quick flick to the neighbor note and back.' },
    { id: 'why2',      text: 'Octaves make one single line sound enormous.' },
    { id: 'why3',      text: 'That chord is a diminished seventh, built only of minor thirds.' },
    { id: 'why3b',     text: 'Perfectly symmetrical, so it has no clear home, and maximum tension.' },
    { id: 'why3c',     text: 'Then it resolves into D minor.' },
    { id: 'why4',      text: 'And the pauses let the sound ring through a stone church.' },
    { id: 'why4b',     text: 'The organ runs on wind, not hammers, so it can hold a note as long as the player wants.' },
    { id: 'essence',   text: 'A flick, a fall, one tense chord... and silence that rings.' },
    { id: 'cta',       text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'BWV 565', title: 'TOCCATA IN D MINOR', accent: true, tonic: 2, min: 6.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'TRADITIONALLY: J. S. BACH', title: 'TOCCATA AND FUGUE', sub: 'in D minor · BWV 565', tonic: 2, gap: 0.3, tail: 0.4 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'IN OCTAVES', tonic: 2, tail: 0.2 + 3 * STMT + 0.6 },
    { id: 'chord', segs: ['chord'], label: 'THE OPENING', title: 'ONE HUGE CHORD', tonic: 2, tail: 1.2 },
    { id: 'fantasia', segs: ['fantasia', 'fantasia2'], label: 'DISNEY · 1940', title: 'FANTASIA', sub: 'orchestral version · Leopold Stokowski', circle: false, tonic: 2, gap: 0.3, tail: 0.5 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE MORDENT', tonic: 2, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'OCTAVES', tonic: 2, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b', 'why3c'], label: 'WHY IT WORKS', title: 'DIMINISHED SEVENTH', tonic: 2, gap: 0.3, tail: 0.9 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'THE PAUSES', circle: false, tonic: 2, gap: 0.3, tail: 0.7 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SILENCE THAT RINGS', accent: true, tonic: 2, gap: 0.5, tail: 1.5 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8', LILAC = '#b48cff', GREY = '#8a8a92', WHITE = '#ffffff';
    const midi = a.T.midi, HI = 79;
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, ...o });
    // one octave-doubled note; only notes on the keyboard light up
    const oct = (n, sh, t, dur, v) => {
      const m = midi(n) + sh;
      a.note(m, t, dur, { vel: v, show: m <= HI });
      a.note(m - 12, t, dur, { vel: v * 0.9, show: m > HI });
    };
    // the opening idea: A G A (mordent, held A), pause, G F E D, C# (held), D
    function stmt(t0, sh = 0, o = {}) {
      const k = o.k ?? 1, v = o.vel ?? 0.36, T = plan(t0, k);
      oct('A5', sh, T.a, M * 0.95, v); oct('G5', sh, T.g, M * 0.95, v); oct('A5', sh, T.a2, 0.85 * k, v);
      ['G5', 'F5', 'E5', 'D5'].forEach((n, i) => oct(n, sh, T.run + i * 0.12 * k, 0.12 * k * 0.95, v));
      oct('C#5', sh, T.cs, 0.65 * k * 0.97, v); oct('D5', sh, T.d, 0.6 * k, v);
      T.pts = [[T.a, 'A'], [T.g, 'G'], [T.a2, 'A'], ...['G', 'F', 'E', 'D'].map((p, i) => [T.run + i * 0.12 * k, p]), [T.cs, 'C#'], [T.d, 'D']];
      if (o.walk !== false) a.walker(T.pts, { t1: o.t1 ?? T.end + 0.5, dr: -40, color: o.color || GOLD });
      return T;
    }
    // the big chord: pedal D, then C# E G Bb stacked from the bottom, then D minor
    const DIM = ['C#3', 'E3', 'G3', 'Bb3', 'C#4', 'E4', 'G4', 'Bb4'];
    const DM = ['D3', 'F3', 'A3', 'D4', 'F4', 'A4', 'D5'];
    function bigChord(t0, tRes, t1, o = {}) {
      const st = o.step ?? 0.16, v = o.vel ?? 1;
      a.note('D2', t0, tRes - t0, { vel: 0.4 * v });
      DIM.forEach((n, i) => a.note(n, t0 + 0.2 + i * st, tRes - (t0 + 0.2 + i * st), { vel: 0.2 * v, show: false }));
      a.ch('C#dim7', t0 + 0.2, tRes, { notes: DIM, bass: 'D2', mute: true, label: o.label ?? 'C#dim7' });
      a.ch('Dm', tRes, t1, { notes: DM, bass: 'D2', vel: 0.9 * v });
    }

    // hook: flick on "flick", run on "run", chord on "chord"
    a.scale(0.1, 'D', a.T.MINOR);
    const h = stmt(0.25, 0, { t1: a.w('hook', 'chord') });
    big('MORDENT', 0.25, h.run, { color: GOLD });
    big('FALLING RUN', h.run, a.w('hook', 'chord') - 0.1, { color: TEAL });
    const hc = a.w('hook', 'chord') - 0.1;
    bigChord(hc, hc + 1.7, S('hook').t1, { step: 0.08 });
    big('ONE HUGE CHORD', hc, S('hook').t1, { color: RED });

    // what: D minor, attributed to Bach
    a.ch('Dm', S('what').t0 + 0.1, S('what').t1, { notes: ['D4', 'F4', 'A4'], bass: 'D2', vel: 0.45 });
    a.tag('D', a.w('what', 'D'), S('what').t1, 'D MINOR', { dr: -92, color: GOLD });
    big('BACH?', a.w('what2', 'scholars'), S('what').t1, { color: GOLD, size: 64, family: 'DM Sans', weight: 800 });

    // play: the idea three times, an octave lower each time
    let t = a.end('play') + 0.2;
    const NAMES = [['IN OCTAVES', GOLD], ['AN OCTAVE LOWER', TEAL], ['AND LOWER AGAIN', LILAC]];
    [0, -12, -24].forEach((sh, i) => {
      const T = stmt(t, sh, { color: NAMES[i][1], t1: t + STMT });
      big(NAMES[i][0], t, t + STMT, { color: NAMES[i][1] });
      t += STMT;
    });

    // chord: builds from the bottom over the pedal D, then D minor
    const c0 = a.w('chord', 'builds') - 0.1, cRes = a.w('chord', 'D', 1) - 0.05;
    bigChord(c0, cRes, S('chord').t1, { step: Math.min(0.3, (a.w('chord', 'pedals') - c0) / 9) });
    a.ring(['D'], a.w('chord', 'D'), cRes, { color: WHITE });
    a.tag('D', a.w('chord', 'pedals'), cRes, 'PEDAL', { dr: 58, color: WHITE });
    a.tag('D', cRes, S('chord').t1, 'HOME', { dr: -92, color: GOLD });

    // fantasia: organ -> orchestra, then the spooky organ sound
    const gf = a.grid([{ label: 'ORGAN', sub: 'THE ORIGINAL', size: 56, color: GOLD }, { label: 'ORCHESTRA', sub: 'STOKOWSKI · 1940', size: 56, color: TEAL }],
      S('fantasia').t0 + 0.1, S('fantasia').t1, { rows: 1, cols: 2, cw: 440, chh: 240, y: 600, revealStep: 0.25 });
    gf.active.push({ t0: S('fantasia').t0 + 0.1, t1: a.w('fantasia', 'orchestral'), i: 0 }, { t0: a.w('fantasia', 'orchestral'), t1: S('fantasia').t1, i: 1 });
    a.big('SPOOKY ORGAN', a.w('fantasia2', 'spooky'), S('fantasia').t1, { y: 960, size: 72, color: LILAC });
    const f1 = stmt(S('fantasia').t0 + 0.3, -12, { vel: 0.24, walk: false });
    stmt(f1.end + 0.6, -24, { vel: 0.22, walk: false });
    const fc = a.w('fantasia2', 'spooky') - 0.1;
    DIM.forEach((n, i) => a.note(n, fc + i * 0.05, 2.0, { vel: 0.14, show: false })); a.note('D2', fc, 2.4, { vel: 0.3, show: false });

    // why1: the mordent - flick to the neighbour and back, slowly then at speed
    const tFl = a.w('why1', 'flick') - 0.05, tNb = a.w('why1', 'neighbor'), tBk = a.w('why1', 'back');
    a.ring(['A'], S('why1').t0 + 0.2, S('why1').t1, { color: GOLD });
    const tS = S('why1').t0 + 0.2;
    oct('A5', 0, tS, M * 0.95, 0.3); oct('G5', 0, tS + M, M * 0.95, 0.3); oct('A5', 0, tS + 2 * M, 1.2, 0.3);
    a.note('D2', tS, 2.0, { vel: 0.2, show: false });
    big('A → G → A', a.w('why1', 'mordent'), tFl + 1.6, { color: GOLD });
    a.note('A4', tFl, 0.35, { vel: 0.36 }); a.note('G4', tFl + 0.4, 0.35, { vel: 0.36 }); a.note('A4', tFl + 0.8, 0.8, { vel: 0.36 });
    a.walker([[tFl, 'A'], [tFl + 0.4, 'G'], [tFl + 0.8, 'A']], { t1: S('why1').t1, dr: -40, color: GOLD });
    a.arc('A', 'G', tNb - 0.2, S('why1').t1, { steps: -2, color: TEAL, dr: 30, label: 'NEIGHBOR', labelR: 165 });
    a.arc('G', 'A', tBk - 0.1, S('why1').t1, { steps: 2, color: GOLD, dr: 62 });
    const tFast = a.end('why1') + 0.15;
    oct('A5', 0, tFast, M * 0.95, 0.36); oct('G5', 0, tFast + M, M * 0.95, 0.36); oct('A5', 0, tFast + 2 * M, 1.0, 0.36);
    big('A FLICK', Math.max(tFast, tFl + 1.6), S('why1').t1, { color: GOLD });

    // why2: one line, doubled at the octave
    const o0 = S('why2').t0 + 0.2, oE = a.w('why2', 'enormous') - 0.05;
    a.note('A4', o0, 0.8, { vel: 0.3 }); a.note('G4', o0 + 0.9, 0.3, { vel: 0.3 });
    big('ONE LINE', o0, a.w('why2', 'single') + 0.3, { color: GREY });
    const w2 = stmt(oE - 0.2, -12, { vel: 0.4, t1: S('why2').t1 });
    big('ONE LINE, TWO OCTAVES', oE, S('why2').t1, { color: TEAL, size: 46 });

    // why3: the diminished seventh - four minor thirds around the circle, then D minor
    const d0 = S('why3').t0 + 0.1, tMin = a.w('why3', 'minor'), tSym = a.w('why3b', 'symmetrical'), tRes = a.w('why3c', 'resolves');
    a.note('D2', d0, tRes - d0, { vel: 0.32, show: false });
    a.ch('C#dim7', d0, tRes, { notes: ['C#4', 'E4', 'G4', 'Bb4'], bass: 'D2', mute: true, label: 'C#dim7' });
    ['C#4', 'E4', 'G4', 'Bb4'].forEach((n, i) => a.note(n, d0 + i * 0.05, a.w('why3', 'diminished') - d0, { vel: 0.22, show: false }));
    const DP = ['C#', 'E', 'G', 'Bb'];
    DP.forEach((p, i) => {
      const t3 = tMin + i * 0.35;
      a.arc(p, DP[(i + 1) % 4], t3, tSym + 1.5, { steps: 3, color: LILAC, dr: 30, label: 'm3', labelR: 205 });
      a.note(['C#4', 'E4', 'G4', 'Bb4', 'C#5'][i + 1], t3, 0.4, { vel: 0.3 });
    });
    a.note('C#4', tMin - 0.3, 0.3, { vel: 0.3 });
    big('3 + 3 + 3 + 3', tMin, tSym, { color: LILAC });
    a.poly(DP, tSym, tRes, { color: GOLD, closed: true, glow: true, dash: false, alpha: 0.9 });
    big('NO CLEAR HOME', tSym + 0.6, tRes, { color: RED });
    DIM.forEach((n, i) => a.note(n, tSym - 0.1 + i * 0.03, tRes - tSym, { vel: 0.16, show: false }));
    a.ch('Dm', tRes - 0.05, S('why3').t1, { notes: DM, bass: 'D2', vel: 0.85 });
    [['C#', 'D', 1], ['E', 'F', 1], ['G', 'F', -2], ['Bb', 'A', -1]].forEach(([f, to, st]) => a.arc(f, to, tRes, S('why3').t1, { steps: st, color: TEAL, dr: 30 }));
    a.tag('D', tRes + 0.2, S('why3').t1, 'HOME', { dr: -92, color: GOLD });

    // why4: the pauses ring; wind, not hammers
    const r0 = S('why4').t0 + 0.15;
    const r1 = stmt(r0, -12, { vel: 0.34, walk: false });
    a.big('RING...', a.w('why4', 'ring'), a.at('why4b'), { y: 620, size: 90, color: GOLD, blur: 40 });
    a.big('THROUGH A STONE CHURCH', a.w('why4', 'stone'), a.at('why4b'), { y: 760, size: 46, family: 'DM Mono', weight: 500, color: GREY, blur: 0 });
    const g4 = a.grid([{ label: 'WIND', sub: 'ORGAN · HOLDS', size: 64, color: TEAL }, { label: 'HAMMERS', sub: 'PIANO · FADES', size: 64, color: GREY }],
      a.at('why4b'), S('why4').t1, { rows: 1, cols: 2, cw: 440, chh: 240, y: 560, revealStep: 0.25 });
    g4.active.push({ t0: a.w('why4b', 'wind'), t1: a.w('why4b', 'hammers'), i: 0 }, { t0: a.w('why4b', 'hammers'), t1: a.w('why4b', 'so'), i: 1 }, { t0: a.w('why4b', 'so'), t1: S('why4').t1, i: 0 });
    const tHold = a.w('why4b', 'hold') - 0.1;
    a.big('AS LONG AS YOU WANT', a.w('why4b', 'long'), S('why4').t1, { y: 940, size: 52, color: TEAL });
    // a held organ-like chord: re-struck softly so it never fades
    for (let u = tHold; u < S('why4').t1 - 0.3; u += 0.9) DM.slice(0, 4).forEach((n, i) => a.note(n, u + i * 0.01, 1.2, { vel: u === tHold ? 0.2 : 0.09, show: false }));
    a.note('D2', tHold, S('why4').t1 - tHold, { vel: 0.3, show: false });

    // essence: the whole opening gesture once more: flick, fall, chord, D minor
    a.scale(S('essence').t0, 'D', a.T.MINOR);
    const e = stmt(S('essence').t0 + 0.15, 0, { t1: a.w('essence', 'chord') });
    const eC = Math.max(e.end + 0.1, a.w('essence', 'chord') - 0.1);
    bigChord(eC, eC + 1.6, S('essence').t1 - 0.2, { step: 0.08 });
    big('SILENCE THAT RINGS', a.w('essence', 'silence'), S('essence').t1, { color: GOLD, size: 44 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
