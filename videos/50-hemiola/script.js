// The hemiola: six pulses regrouped from 3 + 3 to 2 + 2 + 2 - three against two, at the same speed.
// "America" (Bernstein) is copyrighted: rhythm only. The cadence demo is a generic progression.
const P = 0.26, BAR = 6 * P;     // six quick pulses per bar
const Q = 0.5;                   // quarter-note beat for the cadence demo (two bars of 3/4 = six beats)

module.exports = {
  slug: 'hemiola',
  title: 'The Hemiola',
  segments: [
    { id: 'hook',    text: 'Same speed, same six pulses... and suddenly the beat shifts under your feet.' },
    { id: 'what',    text: 'Six pulses can be grouped as three plus three...' },
    { id: 'what2',   text: 'or as two plus two plus two. Switching between them is a hemiola.' },
    { id: 'what3',   text: 'Three against two, without changing the speed.' },
    { id: 's1',      text: "Leonard Bernstein's America, from West Side Story, flips back and forth:" },
    { id: 's1b',     text: 'one bar in two groups of three, the next in three groups of two.' },
    { id: 's2',      text: 'And composers from Handel to Brahms love a hemiola right before a cadence.' },
    { id: 'why1',    text: 'So why does it work? The smallest pulse never changes speed.' },
    { id: 'why2',    text: 'Only the grouping changes: where the accents fall.' },
    { id: 'why3',    text: 'Accents on one and four... then on one, three and five.' },
    { id: 'why4',    text: 'For a moment, your ear loses its footing. That confusion creates energy...' },
    { id: 'why5',    text: 'then the music snaps back into place.' },
    { id: 'essence', text: "Same six beats, regrouped. Rhythm's own optical illusion." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THREE AGAINST TWO', title: 'THE HEMIOLA', accent: true, circle: false, min: 5 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'SIX PULSES', title: '3 + 3', circle: false, min: 3 * BAR, tail: 0.3 },
    { id: 'what2', segs: ['what2', 'what3'], label: 'SIX PULSES', title: '2 + 2 + 2', circle: false, min: 4 * BAR, gap: 0.35, tail: 0.6 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'America', sub: 'Leonard Bernstein · 1957', circle: false, gap: 0.3, tail: 3 * BAR },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Handel to Brahms', sub: 'right before a cadence', circle: false, min: 17 * Q + 1.0, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SAME SPEED', circle: false, min: 4 * BAR, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'NEW GROUPING', circle: false, min: 2 * BAR, tail: 0.4 },
    { id: 'why3', segs: ['why3'], label: 'WHERE THE ACCENTS FALL', title: '1 · 4  →  1 · 3 · 5', circle: false, min: 5 * BAR, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why5'], label: 'WHY IT WORKS', title: 'LOST, THEN FOUND', circle: false, gap: 0.3, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'AN OPTICAL ILLUSION', accent: true, circle: false, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1110, size: 44, ...MONO };

    // two stacked six-cell grids: 3 + 3 on top, 2 + 2 + 2 below; the first pulse of each group is accented
    const mk = (n, cols) => [...Array(6)].map((_, i) => {
      const g = Math.floor(i / n), acc = i % n === 0;
      return { label: String(i + 1), color: cols[g], size: acc ? 64 : 50, sub: acc ? 'ACCENT' : undefined, subSize: 18 };
    });
    const C33 = mk(3, [PINK, TEAL]), C222 = mk(2, [GOLD, BLUE, GREEN]);
    const top = (t0, t1, o = {}) => a.grid(C33, t0, t1, { rows: 1, cols: 6, cw: 150, chh: 190, y: 500, caption: '3 + 3', ...o });
    const bot = (t0, t1, o = {}) => a.grid(C222, t0, t1, { rows: 1, cols: 6, cw: 150, chh: 190, y: 790, caption: '2 + 2 + 2', ...o });

    // one bar of six pulses grouped `mode` ('33' or '222'). o.g33 / o.g222 = grids to light, o.chord = stabs on accents
    function bar(t, mode, o = {}) {
      const p = o.p ?? P, vel = o.vel ?? 1, stop = o.stop ?? Infinity;
      for (let i = 0; i < 6; i++) {
        const tp = t + i * p;
        if (tp > stop - 0.05) break;
        const acc = mode === '33' ? i % 3 === 0 : i % 2 === 0;
        const g = mode === '33' ? o.g33 : o.g222;
        if (g) g.active.push({ t0: tp, t1: tp + p, i });
        if (o.both) { if (o.g33 && g !== o.g33) o.g33.active.push({ t0: tp, t1: tp + p, i }); if (o.g222 && g !== o.g222) o.g222.active.push({ t0: tp, t1: tp + p, i }); }
        a.perc('hat', tp, (acc ? 0.4 : 0.26) * vel);
        if (acc && !o.ticksOnly) {
          a.perc('kick', tp, 0.75 * vel); a.perc('snare', tp, 0.5 * vel);
          if (o.tom) a.note(o.tom, tp, p * 1.5, { vel: 0.4 * vel });
          if (o.chord) a.ch(o.chord, tp, tp + p * (mode === '33' ? 3 : 2), { notes: o.notes, bass: o.bass ?? false, vel: 0.5 * vel, shape: false, hideName: true });
        }
      }
    }
    const run = (t0, t1, modeAt, o = {}) => { let k = 0, t = t0; for (; t < t1 - 0.4; t += 6 * (o.p ?? P), k++) bar(t, modeAt(k, t), { ...o, stop: t1, k }); return t; };
    const CV = { C: ['E4', 'G4', 'C5'], F: ['F4', 'A4', 'C5'] };

    // ---- hook: 3 + 3, then it flips to 2 + 2 + 2 ----
    const tShift = a.w('hook', 'shifts') - 0.2;
    const gT0 = top(0.3, S('what2').t1, { revealStep: 0.06 });
    const gB0 = bot(0.5, S('what2').t1, { revealStep: 0.05 });
    run(0.3, S('hook').t1, (k, t) => (t >= tShift - 0.05 && k % 2 === 1 ? '222' : '33'), { g33: gT0, g222: gB0, chord: 'C', notes: CV.C, vel: 0.85 });

    // ---- what: 3 + 3 only ----
    run(S('what').t0 + 0.05, S('what').t1, () => '33', { g33: gT0, chord: 'C', notes: CV.C, bass: 'C3' });
    a.big('TWO GROUPS OF THREE', a.w('what', 'three'), S('what').t1, { ...LBL, color: PINK });

    // ---- what2 + what3: 2 + 2 + 2, then alternating: three against two ----
    const tAg = a.at('what3') - 0.1;
    run(S('what2').t0 + 0.05, tAg, () => '222', { g222: gB0, chord: 'F', notes: CV.F, bass: 'F2' });
    run(tAg, S('what2').t1, k => (k % 2 ? '222' : '33'), { g33: gT0, g222: gB0, chord: 'C', notes: CV.C, bass: 'C3' });
    a.big('THREE GROUPS OF TWO', a.w('what2', 'two'), a.w('what2', 'hemiola') - 0.1, { ...LBL, color: GOLD });
    a.big('= HEMIOLA', a.w('what2', 'hemiola') - 0.1, tAg, { ...LBL, size: 56, color: '#ffffff' });
    a.big('3  AGAINST  2', tAg + 0.1, S('what2').t1, { ...LBL, size: 56, color: GOLD });

    // ---- s1: America - rhythm only, bars alternate 6/8 and 3/4 ----
    const gT1 = top(S('s1').t0, S('s1').t1, { caption: '6/8 · TWO GROUPS OF THREE' });
    const gB1 = bot(S('s1').t0, S('s1').t1, { caption: '3/4 · THREE GROUPS OF TWO' });
    run(S('s1').t0 + 0.05, S('s1').t1, k => (k % 2 ? '222' : '33'), { g33: gT1, g222: gB1, tom: 'A2' });
    for (let t = S('s1').t0 + 0.05, k = 0; t < S('s1').t1 - 0.4; t += BAR, k++)
      a.big(k % 2 ? '3/4' : '6/8', t, Math.min(t + BAR, S('s1').t1), { ...LBL, size: 64, color: k % 2 ? GOLD : PINK });

    // ---- s2: a generic cadence in 3/4 - two bars in threes, then the hemiola (2+2+2), then home ----
    const c0 = S('s2').t0 + 0.1;
    const gT2 = top(S('s2').t0, S('s2').t1, { caption: 'BARS 1 – 2 · IN THREES' });
    const gB2 = bot(S('s2').t0, S('s2').t1, { caption: 'BARS 3 – 4 · HEMIOLA' });
    const V = { G: ['B3', 'D4', 'G4'], C: ['C4', 'E4', 'G4'], Am: ['C4', 'E4', 'A4'], D: ['A3', 'D4', 'F#4'], D7: ['A3', 'C4', 'F#4'] };
    const BB = { G: 'G2', C: 'C3', Am: 'C3', D: 'D3', D7: 'D3' };
    const place = (name, t, beats, grid, cell0, strikes) => {
      a.ch(name, t, t + beats * Q, { notes: V[name], bass: BB[name], vel: 0.7, strikes, shape: false, hideName: true });
      for (let b = 0; b < beats; b++) {
        grid.active.push({ t0: t + b * Q, t1: t + (b + 1) * Q, i: cell0 + b });
        a.perc('hat', t + b * Q, b === 0 ? 0.35 : 0.2);
      }
      a.perc('kick', t, 0.5);
    };
    const s3 = [{ o: 0, v: 1 }, { o: Q, v: 0.45 }, { o: 2 * Q, v: 0.45 }], s2 = [{ o: 0, v: 1 }, { o: Q, v: 0.45 }];
    place('G', c0, 3, gT2, 0, s3); place('C', c0 + 3 * Q, 3, gT2, 3, s3);
    place('Am', c0 + 6 * Q, 2, gB2, 0, s2); place('D', c0 + 8 * Q, 2, gB2, 2, s2); place('D7', c0 + 10 * Q, 2, gB2, 4, s2);
    a.ch('G', c0 + 12 * Q, S('s2').t1 - 0.2, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.75, shape: false, hideName: true });
    a.perc('kick', c0 + 12 * Q, 0.6);
    a.big('IN THREES', c0, c0 + 6 * Q, { ...LBL, color: PINK });
    a.big('HEMIOLA: 2 + 2 + 2', c0 + 6 * Q, c0 + 12 * Q, { ...LBL, color: GOLD });
    a.big('CADENCE ✓', c0 + 12 * Q, S('s2').t1, { ...LBL, color: GREEN });

    // ---- why1: same speed - both grids tick together ----
    const gT3 = top(S('why1').t0, S('why3').t1), gB3 = bot(S('why1').t0, S('why3').t1);
    run(S('why1').t0 + 0.05, S('why1').t1, () => '33', { g33: gT3, g222: gB3, both: true, ticksOnly: true, vel: 0.9 });
    a.big('PULSE: NEVER CHANGES', a.w('why1', 'pulse'), S('why1').t1, { ...LBL, color: '#ffffff' });

    // ---- why2 + why3: the accents move ----
    run(S('why2').t0 + 0.05, S('why2').t1, k => (k % 2 ? '222' : '33'), { g33: gT3, g222: gB3, chord: 'C', notes: CV.C, bass: 'C3', vel: 0.8 });
    a.big('ONLY THE ACCENTS MOVE', a.w('why2', 'accents') - 0.3, S('why2').t1, { ...LBL, color: GOLD });
    const tThen = a.w('why3', 'then') - 0.1;
    run(S('why3').t0 + 0.05, tThen, () => '33', { g33: gT3, chord: 'C', notes: CV.C, bass: 'C3' });
    run(tThen, S('why3').t1, () => '222', { g222: gB3, chord: 'F', notes: CV.F, bass: 'F2' });
    a.big('1 · 4', a.w('why3', 'Accents'), tThen, { ...LBL, size: 64, color: PINK });
    a.big('1 · 3 · 5', tThen, S('why3').t1, { ...LBL, size: 64, color: GOLD });

    // ---- why4 + why5: confusion, energy... snap back ----
    const tSnap = a.w('why5', 'snaps') - 0.1;
    const gT4 = top(S('why4').t0, S('why4').t1), gB4 = bot(S('why4').t0, S('why4').t1);
    const tSn = run(S('why4').t0 + 0.05, tSnap, k => (k % 2 ? '222' : '33'), { g33: gT4, g222: gB4, chord: 'C', notes: CV.C, bass: 'C3', vel: 0.9 });
    run(tSn, S('why4').t1 - 0.4, () => '33', { g33: gT4, chord: 'C', notes: CV.C, bass: 'C3' });
    a.big('LOST FOOTING', a.w('why4', 'loses'), a.w('why4', 'energy') - 0.1, { ...LBL, color: RED });
    a.big('ENERGY', a.w('why4', 'energy') - 0.1, tSnap, { ...LBL, size: 60, color: GOLD });
    a.big('BACK IN PLACE ✓', tSnap, S('why4').t1, { ...LBL, color: GREEN });

    // ---- essence: one last flip, then a final hit on one ----
    const e0 = S('essence').t0 + 0.05;
    const gT5 = top(S('essence').t0, S('essence').t1), gB5 = bot(S('essence').t0, S('essence').t1);
    const tEnd = run(e0, e0 + 4 * BAR, k => (k % 2 ? '222' : '33'), { g33: gT5, g222: gB5, chord: 'C', notes: CV.C, bass: 'C3' });
    a.ch('C', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'G3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.8, shape: false, hideName: true });
    a.perc('kick', tEnd, 1); a.perc('snare', tEnd, 0.6);
    gT5.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 }); gB5.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.big('SAME SIX BEATS', a.w('essence', 'Same'), S('essence').t1, { ...LBL, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
