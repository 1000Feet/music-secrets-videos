// The Picardy third: a minor-key piece that ends on a MAJOR chord (C minor -> C major: Eb rises to E).
// Bach's Prelude in C minor (BWV 847) is public domain: only generic C minor harmony and a major ending are played.
// The chorale example is a generic, original four-part cadence in A minor, not a quotation.
const SIX = 0.13; // one sixteenth note of the broken-chord figure

module.exports = {
  slug: 'picardy-third',
  title: 'The Picardy Third',
  segments: [
    { id: 'hook',     text: 'A sad piece in a minor key... then, on the very last chord, the lights come on.' },
    { id: 'what',     text: "That's a Picardy third. The music is minor, but the final chord is major." },
    { id: 'what2',    text: "In C minor, the last chord's E flat rises to E." },
    { id: 'bach',     text: "You hear it in Bach's Prelude in C minor, from 1722: minor throughout, then a C major ending." },
    { id: 'chorales', text: "Many of Bach's minor key chorales end the same way." },
    { id: 'name',     text: "The name appears in Rousseau's music dictionary of 1768... but its origin is unclear." },
    { id: 'why1',     text: 'So why does it work? Every low note carries hidden overtones.' },
    { id: 'why2',     text: 'In the series of a low C, the fifth note is E: a major third.' },
    { id: 'why3',     text: 'End on E flat, a minor third, and it rubs against that E.' },
    { id: 'why4',     text: "So for centuries, a minor chord didn't feel fully at rest as a final chord." },
    { id: 'why4b',    text: 'Composers raised the third, to end on pure consonance.' },
    { id: 'essence',  text: 'After all that darkness, one note rises half a step... and the very last chord opens like a window.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MINOR... THEN MAJOR', title: 'THE PICARDY THIRD', accent: true, tonic: 0, min: 5.6, tail: 1.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'THE LAST CHORD', title: 'MINOR TO MAJOR', tonic: 0, gap: 0.4, tail: 1.2 },
    { id: 'bach', segs: ['bach'], label: 'YOU HEAR IT IN', title: 'Prelude in C minor', sub: 'J.S. Bach · BWV 847 · 1722', tonic: 0, tail: 2.3 },
    { id: 'chorales', segs: ['chorales'], label: 'YOU HEAR IT IN', title: "Bach's Chorales", sub: 'minor keys · major endings', tonic: 9, tail: 2.3 },
    { id: 'name', segs: ['name'], label: 'ROUSSEAU · 1768', title: 'TIERCE DE PICARDIE', circle: false, tonic: 0, gap: 0.4, tail: 1.0 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'HIDDEN OVERTONES', circle: false, tonic: 0, gap: 0.3, tail: 1.1 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE RUB', tonic: 0, tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'FOR CENTURIES', title: 'RAISE THE THIRD', tonic: 0, gap: 0.35, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A WINDOW OPENS', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const PIC = [0, 2, 4, 5, 7, 8, 10]; // C minor with its third raised
    // C minor voicings (bass + upper notes)
    const V = {
      Cm: { notes: ['G3', 'C4', 'Eb4'], bass: 'C2' },
      Fm: { notes: ['Ab3', 'C4', 'F4'], bass: 'F2' },
      G7: { notes: ['G3', 'B3', 'D4', 'F4'], bass: 'G2' },
      C:  { notes: ['G3', 'C4', 'E4'], bass: 'C2' },
      Ab: { notes: ['Ab3', 'C4', 'Eb4'], bass: 'Ab2' },
    };
    const chord = (n, t0, t1, o = {}) => a.ch(n, t0, t1, { ...V[n], ...o });
    // generic broken-chord figure in sixteenths over a chord: bass, then the upper notes up and down
    const fig = (n, t0, t1, o = {}) => {
      const s = o.six ?? SIX, up = V[n].notes, pat = [0, 1, 2, 1, 2, 1, 0, 1];
      a.ch(n, t0, t1, { ...V[n], vel: o.vel ?? 0.4, strikes: [{ o: 0, v: 1 }], hideName: o.hideName });
      const hi = up.map(x => a.T.midi(x) + 12);
      for (let t = t0, i = 0; t < t1 - s * 0.5; t += s, i++) a.note(hi[pat[i % 8]], t, s * 0.95, { vel: 0.17, show: false });
    };
    // a simple cadence: list of [chord, beats]; returns end time
    const cad = (list, t0, beat, o = {}) => {
      let t = t0;
      list.forEach(([n, b], i) => { chord(n, t, i === list.length - 1 && o.end ? o.end : t + b * beat, { vel: o.vel ?? 0.75 }); t += b * beat; });
      return t;
    };

    // ---- hook: C minor, Fm, G7... then C MAJOR on "lights" ----
    a.scale(0.2, 'C', a.T.MINOR, { popIn: { t0: 0.3, step: 0.12 } });
    const tL = a.w('hook', 'lights') - 0.04, hl = (tL - 0.35) / 3;
    chord('Cm', 0.35, 0.35 + hl, { vel: 0.6 });
    chord('Fm', 0.35 + hl, 0.35 + 2 * hl, { vel: 0.6 });
    chord('G7', 0.35 + 2 * hl, tL, { vel: 0.65 });
    chord('C', tL, S('hook').t1, { notes: ['G3', 'C4', 'E4', 'G4'], vel: 0.85 });
    a.note('E5', tL, 1.6, { vel: 0.3 });
    a.scale(tL, 'C', PIC);
    a.ring(['E'], tL, S('hook').t1, { color: GOLD });
    a.tag('E', tL + 0.1, S('hook').t1, 'MAJOR!', { color: GOLD, dr: -92 });

    // ---- what: minor music, major final chord; Eb rises to E ----
    a.scale(S('what').t0, 'C', a.T.MINOR);
    const tMin = a.w('what', 'minor'), tFin = a.w('what', 'major') - 0.04;
    chord('Cm', S('what').t0 + 0.1, tFin, { vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: tMin - S('what').t0 - 0.1, v: 0.6 }] });
    chord('C', tFin, a.at('what2'), { vel: 0.6 });
    a.tag(0, tMin, tFin, 'MINOR', { x: 540, y: 462, color: BLUE });
    a.tag(0, tFin, a.at('what2'), 'FINAL CHORD: MAJOR', { x: 540, y: 462, color: GOLD });
    const tEb = a.w('what2', 'E'), tR = a.w('what2', 'rises') - 0.04, tE = a.w('what2', 'E', 1) - 0.04;
    chord('Cm', a.at('what2'), tE, { vel: 0.6 });
    a.ring(['Eb'], tEb, tE, { color: BLUE });
    a.note('Eb4', tEb, 0.6, { vel: 0.3 });
    chord('C', tE, S('what').t1, { vel: 0.8 });
    a.scale(tE, 'C', PIC);
    a.arc('Eb', 'E', tR, S('what').t1, { steps: 1, color: GOLD, dr: 34, label: 'HALF STEP', labelR: 165 });
    a.ring(['E'], tE, S('what').t1, { color: GOLD });
    a.note('E5', tE, 1.4, { vel: 0.3 });

    // ---- Bach, Prelude in C minor: minor all the way, then a C major ending ----
    a.scale(S('bach').t0, 'C', a.T.MINOR);
    const b0 = S('bach').t0 + 0.1, tBC = a.w('bach', 'C', 1) - 0.04;
    const PROG = ['Cm', 'Fm', 'G7', 'Cm', 'Ab', 'Fm', 'G7'];
    const bl = (tBC - b0) / PROG.length;
    PROG.forEach((n, i) => fig(n, b0 + i * bl, b0 + (i + 1) * bl, { six: bl / 8, vel: 0.5 }));
    chord('C', tBC, S('bach').t1 - 0.1, { notes: ['G3', 'C4', 'E4', 'G4', 'C5'], vel: 0.9 });
    a.note('E5', tBC, 2.2, { vel: 0.3 });
    a.scale(tBC, 'C', PIC);
    a.ring(['E'], tBC, S('bach').t1, { color: GOLD });
    a.tag('E', tBC + 0.1, S('bach').t1, 'C MAJOR', { color: GOLD, dr: -92 });

    // ---- chorales: a generic four-part cadence in A minor ending on A major ----
    a.scale(S('chorales').t0, 'A', a.T.MINOR);
    const CH = [['Am', ['C4', 'E4', 'A4'], 'A2'], ['Dm', ['D4', 'F4', 'A4'], 'F2'], ['Am', ['C4', 'E4', 'A4'], 'E2'], ['E', ['B3', 'E4', 'G#4'], 'E2'], ['A', ['C#4', 'E4', 'A4'], 'A2']];
    const c0 = S('chorales').t0 + 0.15, cl = (S('chorales').t1 - c0 - 2.2) / 4;
    CH.forEach(([n, notes, bass], i) => a.ch(n, c0 + i * cl, i < 4 ? c0 + (i + 1) * cl : S('chorales').t1 - 0.1, { notes, bass, vel: i === 4 ? 0.9 : 0.6 }));
    const tA = c0 + 4 * cl;
    a.scale(tA, 'A', PIC);
    a.ring(['C#'], tA, S('chorales').t1, { color: GOLD });
    a.tag('C#', tA + 0.1, S('chorales').t1, 'C# · MAJOR', { color: GOLD, dr: -92 });

    // ---- name: Rousseau's dictionary, 1768; origin unclear ----
    const n0 = S('name').t0 + 0.1;
    const gn = a.grid([{ label: 'ROUSSEAU', sub: 'DICTIONARY OF MUSIC', size: 60, color: BLUE }, { label: '1768', sub: 'YEAR', size: 80, color: GOLD }],
      n0, S('name').t1, { rows: 1, cols: 2, cw: 440, chh: 230, y: 560, revealStep: 0.25 });
    gn.active.push({ t0: a.w('name', "Rousseau's") - 0.05, t1: a.w('name', '1768') - 0.05, i: 0 }, { t0: a.w('name', '1768') - 0.05, t1: a.w('name', 'but'), i: 1 });
    a.big('= PICARDY THIRD', n0 + 0.4, a.w('name', 'but'), { y: 900, size: 64, color: '#ffffff' });
    a.big('?', a.w('name', 'but'), S('name').t1, { y: 940, size: 150, color: GOLD });
    a.big('ORIGIN UNCLEAR', a.w('name', 'unclear'), S('name').t1, { y: 1080, size: 44, ...MONO, color: '#8a8a92', blur: 0 });
    const nl = (S('name').t1 - n0 - 0.2) / 4;
    cad([['Cm', 1], ['Fm', 1], ['G7', 1], ['C', 1]], n0, nl, { vel: 0.45, end: S('name').t1 });

    // ---- why1-2: the overtone series of a low C: C C G C E ----
    const HAR = [['C', 'C2', '1'], ['C', 'C3', '2'], ['G', 'G3', '3'], ['C', 'C4', '4'], ['E', 'E4', '5']];
    const g0 = S('why1').t0 + 0.1;
    const go = a.grid(HAR.map(([l, n, k], i) => ({ label: l, sub: k, size: 72, subSize: 30, color: i === 4 ? GOLD : '#8d98ff' })),
      g0, S('why1').t1, { rows: 1, cols: 5, cw: 190, chh: 250, y: 600, revealStep: 0.12, caption: 'THE OVERTONE SERIES OF C' });
    const tO = a.w('why1', 'overtones') - 0.1;
    a.note('C2', tO, 2.5, { vel: 0.4, show: false });
    HAR.slice(1).forEach(([, n], i) => { a.note(n, tO + 0.35 * (i + 1), 1.4, { vel: 0.18, show: false }); go.active.push({ t0: tO + 0.35 * (i + 1), t1: tO + 0.35 * (i + 2), i: i + 1 }); });
    go.active.push({ t0: tO, t1: tO + 0.35, i: 0 });
    const tCount = a.w('why2', 'series') - 0.04, tFifth = a.w('why2', 'fifth') - 0.04, tE5 = a.w('why2', 'E') - 0.04;
    HAR.forEach(([, n], i) => { const t = tCount + i * ((tFifth - tCount) / 5); a.note(n, t, 0.5, { vel: i ? 0.25 : 0.4, show: false }); go.active.push({ t0: t, t1: t + (tFifth - tCount) / 5, i }); });
    go.active.push({ t0: tFifth, t1: S('why1').t1, i: 4 });
    a.note('C2', tE5, 2.4, { vel: 0.4, show: false }); a.note('E4', tE5, 2.4, { vel: 0.3, show: false });
    a.big('ALL INSIDE ONE LOW C', a.w('why1', 'overtones'), a.at('why2'), { y: 1010, size: 48, ...MONO, color: '#8d98ff' });
    a.big('MAJOR THIRD', a.w('why2', 'major'), S('why1').t1, { y: 1010, size: 72, color: GOLD });

    // ---- why3: E flat rubs against the overtone E ----
    a.scale(S('why3').t0, 'C', a.T.MINOR);
    const r0 = S('why3').t0 + 0.1, tEb3 = a.w('why3', 'E') - 0.04, tRub = a.w('why3', 'rubs') - 0.04;
    chord('C', r0, tEb3, { notes: ['C3', 'G3', 'C4'], vel: 0.5, label: 'C' });
    a.ring(['E'], r0 + 0.1, S('why3').t1, { color: GOLD });
    a.tag('E', r0 + 0.2, S('why3').t1, 'OVERTONE E', { color: GOLD, x: 540, y: 462 });
    chord('Cm', tEb3, S('why3').t1, { notes: ['G3', 'C4', 'Eb4'], vel: 0.65, strikes: [{ o: 0, v: 1 }, { o: tRub - tEb3, v: 0.9 }] });
    a.ring(['Eb'], tEb3, S('why3').t1, { color: RED });
    a.tag('Eb', tEb3 + 0.1, S('why3').t1, 'E FLAT', { color: RED, x: 540, y: 1085 });
    a.arc('E', 'Eb', tRub, S('why3').t1, { steps: -1, color: RED, dr: 34 });
    a.tag(0, tRub, S('why3').t1, 'RUB!', { x: 960, y: 905, color: RED });
    a.note('E5', tRub, 1.6, { vel: 0.12, show: false }); a.note('Eb5', tRub, 1.6, { vel: 0.2, show: false });

    // ---- why4: not at rest... raise the third ----
    const tRest = a.w('why4', 'rest'), tRaise = a.w('why4b', 'raised') - 0.04;
    chord('Cm', S('why4').t0 + 0.1, tRaise, { vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: tRest - S('why4').t0 - 0.1, v: 0.6 }] });
    a.tag(0, tRest, tRaise, 'NOT FULLY AT REST', { x: 540, y: 462, color: RED });
    chord('C', tRaise, S('why4').t1, { notes: ['G3', 'C4', 'E4', 'G4'], vel: 0.85 });
    a.scale(tRaise, 'C', PIC);
    a.arc('Eb', 'E', tRaise, S('why4').t1, { steps: 1, color: GOLD, dr: 34 });
    a.ring(['E'], tRaise, S('why4').t1, { color: GOLD });
    a.tag(0, a.w('why4b', 'pure'), S('why4').t1, 'PURE CONSONANCE', { x: 540, y: 462, color: GOLD });

    // ---- essence: one last minor cadence, the window opens on "opens" ----
    a.scale(S('essence').t0, 'C', a.T.MINOR);
    const e0 = S('essence').t0 + 0.1, tOpen = a.w('essence', 'opens') - 0.04, el = (tOpen - e0) / 4;
    ['Cm', 'Fm', 'Cm', 'G7'].forEach((n, i) => chord(n, e0 + i * el, e0 + (i + 1) * el, { vel: 0.55 }));
    chord('C', tOpen, S('essence').t1 - 0.3, { notes: ['G3', 'C4', 'E4', 'G4', 'C5'], vel: 0.9 });
    a.note('E5', tOpen, 3, { vel: 0.3 });
    a.scale(tOpen, 'C', PIC);
    a.arc('Eb', 'E', a.w('essence', 'rises'), S('essence').t1, { steps: 1, color: GOLD, dr: 34 });
    a.ring(['E'], tOpen, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
