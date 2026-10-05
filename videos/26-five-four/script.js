// 5/4 time: five beats per bar, felt as 3 + 2, and why the uneven count feels restless.
const BEAT = 0.34, BAR = 5 * BEAT;

module.exports = {
  slug: 'five-four-time',
  title: '5/4 Time',
  segments: [
    { id: 'hook',    text: 'Most songs count to four. Add just one more beat, and the music starts to lean.' },
    { id: 'what',    text: 'This is five four time: five beats in every bar.' },
    { id: 'what2',   text: 'But nobody hears five equal beats. We feel them as three plus two.' },
    { id: 'take5',   text: "It's Take Five by the Dave Brubeck Quartet..." },
    { id: 'mi',      text: 'the Mission: Impossible theme...' },
    { id: 'mars',    text: 'and Mars, the Bringer of War, by Gustav Holst.' },
    { id: 'why1',    text: 'So why does it feel so restless? Your brain groups beats in twos and threes.' },
    { id: 'four',    text: 'Four splits evenly: two plus two.' },
    { id: 'five',    text: "Five can't. So it becomes three plus two... or two plus three." },
    { id: 'why3',    text: 'That uneven grouping feels like a limp, or a lean forward.' },
    { id: 'why4',    text: 'Restless and suspenseful. Perfect for spies and for war.' },
    { id: 'essence', text: 'One extra beat breaks the symmetry, and tension appears out of pure counting.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE EXTRA BEAT', title: '5/4 TIME', accent: true, circle: false, tonic: 2, min: 4 * BAR, tail: 0 },
    { id: 'what', segs: ['what'], label: 'THE TIME SIGNATURE', title: 'COUNT TO FIVE', circle: false, tonic: 2, min: 3 * BAR, tail: 0 },
    { id: 'what2', segs: ['what2'], label: 'HOW WE HEAR IT', title: 'THREE PLUS TWO', circle: false, tonic: 2, min: 4 * BAR, tail: 0 },
    { id: 'take5', segs: ['take5'], label: 'YOU HEAR IT IN', title: 'Take Five', sub: 'The Dave Brubeck Quartet · 1959', circle: false, tonic: 2, min: 4 * BAR, tail: 0 },
    { id: 'mi', segs: ['mi'], label: 'YOU HEAR IT IN', title: 'Mission: Impossible', sub: 'Lalo Schifrin · 1966', circle: false, tonic: 7, min: 4 * BAR, tail: 0 },
    { id: 'mars', segs: ['mars'], label: 'YOU HEAR IT IN', title: 'Mars', sub: 'Gustav Holst · The Planets · 1914–16', circle: false, tonic: 7, min: 5 * BAR, tail: 0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWOS AND THREES', circle: false, tonic: 2, tail: 0.6 },
    { id: 'four', segs: ['four'], label: 'FOUR BEATS', title: 'AN EVEN SPLIT', circle: false, tonic: 2, tail: 1.4 },
    { id: 'five', segs: ['five'], label: 'FIVE BEATS', title: 'IT CAN’T SPLIT', circle: false, tonic: 2, tail: 1.6 },
    { id: 'why3', segs: ['why3'], label: 'THE FEEL', title: 'UNEVEN GROUPS', circle: false, tonic: 2, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'TENSION', title: 'SPIES AND WAR', circle: false, tonic: 7, tail: 3.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BROKEN SYMMETRY', accent: true, circle: false, tonic: 2, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff';
    const GRID = { rows: 1, cols: 5, cw: 196, chh: 240, y: 580 };
    // one cell per beat; the first beat of each group carries an accent mark
    const cells = (groups, cols) => { const out = []; let n = 1; groups.forEach((g, gi) => { for (let k = 0; k < g; k++) out.push({ label: String(n++), color: cols[gi], size: 80, sub: k === 0 ? 'ACCENT' : undefined, subSize: 20 }); }); return out; };
    const C32 = cells([3, 2], [PINK, TEAL]), C23 = cells([2, 3], [GOLD, BLUE]), C22 = cells([2, 2], [GOLD, BLUE]);
    const BIG = { y: 1030, size: 120, family: 'DM Sans', weight: 800 };

    // one bar of a groove. style: 'jazz' | 'spy' | 'mars' | 'soft' | 'four'. Events stop at `stop`.
    const CH = { jazz: ['Dm7', 'G7'], soft: ['Dm7', 'G7'], spy: ['Gm', 'Gm'], four: ['Dm7', 'G7'] };
    function bar(t, style, k, beats, stop, grid) {
      const len = Math.min(beats * BEAT, stop - t);
      for (let b = 0; b < beats; b++) {
        const tb = t + b * BEAT;
        if (tb > stop - 0.02) break;
        if (grid) grid.active.push({ t0: tb, t1: Math.min(tb + BEAT, stop), i: b });
        const accent = beats === 5 ? (b === 0 || b === 3) : (b % 2 === 0);
        if (style === 'mars') {
          // the repeated-note ostinato on G: a triplet, two eighths, then three quarter notes
          const hits = b === 0 ? [0, 1 / 3, 2 / 3] : b === 1 ? [0, 0.5] : [0];
          hits.forEach(h => { a.note('G2', tb + h * BEAT, BEAT * 0.3, { vel: 0.5 }); a.note('G3', tb + h * BEAT, BEAT * 0.3, { vel: 0.34 }); a.perc('kick', tb + h * BEAT, accent ? 0.75 : 0.45); });
          if (accent) a.perc('snare', tb, 0.35);
          continue;
        }
        const soft = style === 'soft' ? 0.55 : 1;
        a.perc('hat', tb, (accent ? 0.5 : 0.32) * soft);
        if (style === 'jazz' || style === 'soft' || style === 'four') a.perc('hat', tb + BEAT * 2 / 3, 0.2 * soft);
        else a.perc('hat', tb + BEAT / 2, 0.28);
        if (accent) a.perc('kick', tb, 0.7 * soft);
        if (style === 'spy') { a.note('G1', tb, BEAT * 0.4, { vel: 0.42, show: false }); a.note('G1', tb + BEAT / 2, BEAT * 0.4, { vel: 0.3, show: false }); if (b === 2 || b === 4) a.perc('snare', tb, 0.4); }
        else if (!accent && b === beats - 1) a.perc('snare', tb, 0.35 * soft);
      }
      const name = CH[style] ? CH[style][k % 2] : null;
      if (name) {
        const strikes = beats === 5 ? [{ o: 0, v: 1 }, { o: 3 * BEAT, v: 0.8 }] : [{ o: 0, v: 1 }, { o: 2 * BEAT, v: 0.7 }];
        a.ch(name, t, t + len, { strikes: strikes.filter(s => s.o < len), vel: (style === 'soft' ? 0.5 : 0.8), bass: style === 'spy' ? false : undefined, notes: style === 'spy' ? ['G3', 'Bb3', 'D4'] : undefined, shape: false });
      }
    }
    // a run of bars from t0 to t1; style picked at each bar line
    function groove(t0, t1, styleAt, grid, beats = 5) {
      let k = 0;
      for (let t = t0; t < t1 - 0.05; t += beats * BEAT, k++) bar(t, styleAt(t), k, beats, t1, grid);
    }

    // ---- part 1: one continuous 5/4 groove, the grid lights every beat ----
    const g1 = a.grid(C32, 0.3, S('mars').t1, { ...GRID, revealStep: 0.12 });
    const p0 = 0.3, styleP1 = t => (t >= S('mars').t0 - 0.01 ? 'mars' : t >= S('mi').t0 - 0.01 ? 'spy' : 'jazz');
    groove(p0, S('mars').t1, styleP1, g1);
    a.big('5 / 4', 0.5, a.w('what2', 'three'), { ...BIG, color: '#ffffff' });
    a.big('3 + 2', a.w('what2', 'three'), S('mars').t1, { ...BIG, color: GOLD });
    a.big('FIVE BEATS PER BAR', a.w('what', 'five', 1), S('what').t1, { y: 880, size: 34, family: 'DM Mono', weight: 500, color: '#ffffff', blur: 10 });
    a.big('ACCENTS ON 1 AND 4', a.w('what2', 'three'), S('what2').t1, { y: 880, size: 34, family: 'DM Mono', weight: 500, color: GOLD, blur: 10 });

    // ---- part 2 ----
    // why1: soft groove, twos and threes
    const g2 = a.grid(C32, S('why1').t0, S('why1').t1, GRID);
    groove(S('why1').t0 + 0.05, S('why1').t1, () => 'soft', g2);
    a.big('2', a.w('why1', 'twos'), S('why1').t1, { ...BIG, x: 400, color: GOLD });
    a.big('3', a.w('why1', 'threes'), S('why1').t1, { ...BIG, x: 680, color: PINK });

    // four: switch to 4/4, it splits evenly
    const g4 = a.grid(C22, S('four').t0, S('four').t1, { ...GRID, cols: 4 });
    groove(S('four').t0 + 0.05, S('four').t1, () => 'four', g4, 4);
    a.big('2 + 2', a.w('four', 'two'), S('four').t1, { ...BIG, color: GOLD });

    // five: back to 5/4; three plus two, then two plus three
    const tOr = a.w('five', 'or');
    const g5 = a.grid(C32, S('five').t0, tOr, GRID), g5b = a.grid(C23, tOr, S('five').t1, GRID);
    groove(S('five').t0 + 0.05, tOr, () => 'jazz', g5);
    groove(tOr, S('five').t1, () => 'jazz', g5b);
    a.big('3 + 2', a.w('five', 'three'), tOr, { ...BIG, color: PINK });
    a.big('2 + 3', a.w('five', 'two'), S('five').t1, { ...BIG, color: BLUE });

    // why3 + why4 + essence: one more continuous groove
    const q0 = S('why3').t0 + 0.05, eHit = S('essence').t0 + 3 * BAR + 0.1;
    const tWar = a.w('why4', 'war');
    const g6 = a.grid(C32, S('why3').t0, S('essence').t1, GRID);
    groove(q0, eHit, t => (t >= tWar - 0.4 && t < S('essence').t0 - 0.01 ? 'mars' : t >= a.w('why4', 'spies') - 0.4 && t < S('essence').t0 - 0.01 ? 'spy' : 'jazz'), g6);
    a.big('A LIMP', a.w('why3', 'limp'), a.w('why3', 'lean'), { ...BIG, size: 96, color: PINK });
    a.big('A LEAN FORWARD', a.w('why3', 'lean'), S('why3').t1, { ...BIG, size: 84, color: TEAL });
    a.big('SPIES', a.w('why4', 'spies'), tWar, { ...BIG, size: 96, color: GOLD });
    a.big('WAR', tWar, S('why4').t1, { ...BIG, size: 110, color: '#ff5d6c' });
    a.big('TENSION', a.w('essence', 'tension'), S('essence').t1, { ...BIG, size: 96, color: GOLD });

    // the last hit: everything lands on beat one
    for (let i = 0; i < 5; i++) g6.active.push({ t0: eHit, t1: S('essence').t1, i });
    a.big('ONE EXTRA BEAT', S('essence').t0 + 0.3, a.w('essence', 'tension'), { ...BIG, size: 84, color: '#ffffff' });
    a.ch('Dm7', eHit, S('essence').t1 - 0.3, { notes: ['F3', 'A3', 'C4', 'E4'], bass: 'D2', vel: 1, shape: false });
    a.perc('kick', eHit, 1); a.perc('snare', eHit, 0.6); a.perc('hat', eHit, 0.6);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
