// 7/4 time: seven beats per bar, felt as 4 + 3 (or 2 + 2 + 3), and why the "skipped step" grooves.
const BEAT = 0.4, BAR7 = 7 * BEAT, BAR8 = 8 * BEAT;

module.exports = {
  slug: 'seven-four-time',
  title: '7/4 Time',
  segments: [
    { id: 'hook',    text: 'Most songs count to four. Now try counting to seven: one, two, three, four, five, six, seven.' },
    { id: 'what',    text: 'Seven beats in every bar, felt as four plus three... or two, two and three.' },
    { id: 's1',      text: "It's the bass riff of Money by Pink Floyd... until the guitar solo switches to four four." },
    { id: 's2',      text: 'Most of Solsbury Hill by Peter Gabriel...' },
    { id: 's3',      text: "and Dave Brubeck's Unsquare Dance, driven by hand claps." },
    { id: 'why1',    text: "So why does it work? Seven won't split into two equal halves." },
    { id: 'why2a',   text: 'Eight beats split evenly: four plus four.' },
    { id: 'why2b',   text: 'Take one away, and you get four plus three.' },
    { id: 'why3',    text: 'So every bar ends one beat early, like a skipped step.' },
    { id: 'why4a',   text: 'But repeat it, and your body learns the skip.' },
    { id: 'why4b',   text: 'It becomes a groove. Catchy, not chaotic.' },
    { id: 'essence', text: 'Lose one beat from eight, and a simple loop starts to stumble beautifully.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'COUNT TO SEVEN', title: '7/4 TIME', accent: true, circle: false, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'SEVEN BEATS A BAR', title: '4 + 3', circle: false, min: 3 * BAR7, tail: 0 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Money', sub: 'Pink Floyd · 1973', circle: false, min: 3 * BAR7, tail: 0.6 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Solsbury Hill', sub: 'Peter Gabriel · 1977', circle: false, min: 3 * BAR7, tail: 0.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Unsquare Dance', sub: 'Dave Brubeck · 1961', circle: false, min: 3 * BAR7, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NO EQUAL HALVES', circle: false, min: 2 * BAR7, tail: 0.3 },
    { id: 'why2a', segs: ['why2a'], label: 'WHY IT WORKS', title: 'EIGHT MINUS ONE', circle: false, min: 0.15 + 2 * BAR8, tail: 0 },
    { id: 'why2b', segs: ['why2b'], label: 'WHY IT WORKS', title: 'EIGHT MINUS ONE', circle: false, min: 2 * BAR7, tail: 0.2 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'A SKIPPED STEP', circle: false, min: 2 * BAR7, tail: 0.3 },
    { id: 'why4', segs: ['why4a', 'why4b'], label: 'WHY IT WORKS', title: 'THE BODY LEARNS', circle: false, min: 4 * BAR7, gap: 0.4, tail: 0.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A BEAUTIFUL STUMBLE', accent: true, circle: false, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', DARK = '#0b0b0d';
    const GCOL = [PINK, TEAL, GOLD];
    const MONO = { family: 'DM Mono', weight: 500 };

    // grid of beat cells coloured by group, e.g. [4, 3] or [2, 2, 3]
    const cellsFor = (groups, extra = 0) => {
      const out = [];
      groups.forEach((g, gi) => { for (let k = 0; k < g; k++) out.push({ label: String(out.length + 1), color: GCOL[gi], size: k ? 50 : 62 }); });
      for (let k = 0; k < extra; k++) out.push({ label: '', color: DARK });
      return out;
    };
    const row7 = (groups, t0, t1, o = {}) => a.grid(cellsFor(groups), t0, t1, { rows: 1, cols: 7, cw: 140, chh: 170, y: 540, ...o });
    // group names under a 7-cell grid (cell centre = 120 + 140 i)
    const groupNames = (groups, t0, t1, y = 790, cw = 140) => {
      const x0 = 540 - (groups.reduce((s, g) => s + g, 0) * cw) / 2 + cw / 2;
      let i = 0;
      groups.forEach((g, gi) => {
        const x = x0 + cw * (i + (g - 1) / 2);
        a.big(['ONE', 'TWO', 'THREE', 'FOUR'][g - 1], t0, t1, { x, y, size: 34, ...MONO, color: GCOL[gi], blur: 10 });
        i += g;
      });
    };

    // one bar of 7/4: kick on each group start, snare inside the group, hats on every beat
    function bar7(t, o = {}) {
      const groups = o.groups || [4, 3], vel = o.vel ?? 1;
      let i = 0;
      groups.forEach((g, gi) => {
        for (let k = 0; k < g; k++, i++) {
          const tb = t + i * BEAT;
          const gr = typeof o.grid === 'function' ? o.grid(tb + 0.01) : o.grid;
          if (gr) gr.active.push({ t0: tb, t1: tb + BEAT, i: i + (o.offset || 0) });
          if (o.drums !== false) {
            if (k === 0) a.perc('kick', tb, 0.95 * vel);
            if (k === (g === 4 ? 2 : 1)) a.perc('snare', tb, 0.7 * vel);
            a.perc('hat', tb, (k ? 0.35 : 0.5) * vel); a.perc('hat', tb + BEAT / 2, 0.22 * vel);
          }
          if (o.claps && (k === 0 ? gi > 0 : k % 2 === 1 || (g === 3 && k === 2))) { a.perc('snare', tb, 0.55 * vel); a.perc('snare', tb + 0.025, 0.35 * vel); }
          if (o.bass) a.note(o.bass[i], tb, BEAT * 0.8, { vel: 0.34 * vel, show: false });
        }
      });
      if (o.chord) {
        let s = 0; const strikes = groups.map((g, gi) => { const st = { o: s * BEAT, v: gi ? 0.75 : 1 }; s += g; return st; });
        if (o.strum) for (let k = 0; k < 7; k++) if (!strikes.find(x => Math.abs(x.o - k * BEAT) < 0.01)) strikes.push({ o: k * BEAT, v: 0.4 });
        a.ch(o.chord, t, t + BAR7, { bass: o.bassNote ?? false, strikes, vel: 0.75 * vel, hideName: true, shape: false });
      }
    }
    // one bar of eight beats (4 + 4) for comparison
    function bar8(t, grid, vel = 0.85) {
      for (let i = 0; i < 8; i++) {
        const tb = t + i * BEAT;
        grid.active.push({ t0: tb, t1: tb + BEAT, i });
        if (i % 4 === 0) a.perc('kick', tb, 0.95 * vel);
        if (i % 4 === 2) a.perc('snare', tb, 0.7 * vel);
        a.perc('hat', tb, (i % 4 ? 0.35 : 0.5) * vel); a.perc('hat', tb + BEAT / 2, 0.22 * vel);
      }
      a.ch('Am7', t, t + BAR8, { bass: 'A2', strikes: [{ o: 0, v: 1 }, { o: 4 * BEAT, v: 0.75 }], vel: 0.7 * vel, hideName: true, shape: false });
    }

    // ---- hook: the voice counts to seven, each cell lights on its number ----
    const gH = row7([4, 3], 0.3, S('hook').t1, { revealStep: 0.12 });
    const NUM = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const tN = NUM.map(n => a.w('hook', n, n === 'four' || n === 'seven' ? 1 : 0));
    tN.forEach((t, i) => {
      const t1 = i < 6 ? tN[i + 1] : t + 0.6;
      gH.active.push({ t0: t, t1, i });
      a.note(['A3', 'C4', 'E4', 'G4', 'A4', 'C5', 'E5'][i], t, 0.5, { vel: 0.3, show: false });
      a.perc(i === 0 || i === 4 ? 'kick' : 'hat', t, 0.7);
    });
    a.big('4', 0.4, tN[0], { y: 860, size: 150, color: '#55555d', blur: 0 });
    a.big('7', tN[6], S('hook').t1, { y: 860, size: 150, color: GOLD });
    a.ch('Am7', tN[6], S('hook').t1, { notes: ['G3', 'C4', 'E4'], bass: 'A2', vel: 0.6, hideName: true, shape: false });

    // ---- part 1: one continuous 7/4 groove under "what" and the three songs ----
    const p1 = S('what').t0, p1end = S('s3').t1;
    const tTwo = a.w('what', 'two');
    const gW1 = row7([4, 3], p1, tTwo);
    const gW2 = row7([2, 2, 3], tTwo, S('what').t1);
    groupNames([4, 3], a.w('what', 'four'), tTwo);
    groupNames([2, 2, 3], tTwo, S('what').t1);
    a.big('4 + 3', a.w('what', 'four'), tTwo, { y: 960, size: 110, ...MONO, color: '#ffffff' });
    a.big('2 + 2 + 3', tTwo, S('what').t1, { y: 960, size: 110, ...MONO, color: '#ffffff' });
    const gS1 = row7([4, 3], S('s1').t0, S('s1').t1);
    const gS2 = row7([4, 3], S('s2').t0, S('s2').t1);
    const gS3 = row7([2, 2, 3], S('s3').t0, S('s3').t1);
    groupNames([4, 3], S('s1').t0, S('s2').t1);
    groupNames([2, 2, 3], S('s3').t0, S('s3').t1);
    const tSolo = a.w('s1', 'four', 0);
    a.big('7 / 4', S('s1').t0 + 0.2, tSolo, { y: 980, size: 120, ...MONO, color: PINK });
    a.big('SOLO: 4 / 4', tSolo, S('s1').t1, { y: 980, size: 80, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('MOSTLY 7 / 4', S('s2').t0 + 0.2, S('s2').t1, { y: 980, size: 80, ...MONO, color: TEAL });
    a.big('CLAP  CLAP', a.at('s3') + 0.2, S('s3').t1, { y: 980, size: 80, ...MONO, color: GOLD });

    const RIFF = ['A2', 'A2', 'C3', 'E3', 'G2', 'G2', 'B2'];
    const gridAt = t => (t < tTwo ? (t < S('what').t0 ? null : gW1) : t < S('s1').t0 ? gW2 : t < S('s2').t0 ? gS1 : t < S('s3').t0 ? gS2 : gS3);
    let n = 0;
    const g = gridAt;
    for (let t = p1; t + BAR7 <= p1end + 0.05; t += BAR7, n++) {
      if (t < S('s1').t0 - 0.1) bar7(t, { grid: g, groups: t < tTwo - 0.1 ? [4, 3] : [2, 2, 3], vel: 0.8, chord: n % 2 ? 'Fmaj7' : 'Am7', bassNote: n % 2 ? 'F2' : 'A2' });
      else if (t < S('s2').t0 - 0.1) bar7(t, { grid: g, vel: 0.95, bass: RIFF, chord: n % 2 ? 'Em7' : 'Am7' });
      else if (t < S('s3').t0 - 0.1) bar7(t, { grid: g, vel: 0.85, strum: true, chord: n % 2 ? 'Dsus2' : 'G', bassNote: n % 2 ? 'D2' : 'G2' });
      else bar7(t, { grid: g, groups: [2, 2, 3], drums: false, claps: true, vel: 1, chord: n % 2 ? 'Dm7' : 'G7', bassNote: n % 2 ? 'D2' : 'G2' });
    }

    // ---- part 2 ----
    // why1: seven won't halve
    const w1 = S('why1').t0;
    const gY1 = row7([4, 3], w1, S('why1').t1);
    for (let t = w1; t + BAR7 <= S('why1').t1 + 0.05; t += BAR7) bar7(t, { grid: gY1, vel: 0.55, chord: 'Am7', bassNote: 'A2' });
    a.big('7 ÷ 2 = 3.5', a.w('why1', 'Seven'), S('why1').t1, { y: 940, size: 100, ...MONO, color: RED });

    // why2a: a bar of eight, 4 + 4 (two bars, starting on the word)
    const t8 = a.at('why2a');
    const EIGHT = [...Array(8)].map((_, i) => ({ label: String(i + 1), color: i < 4 ? PINK : TEAL, size: i % 4 ? 46 : 58 }));
    const g8 = a.grid(EIGHT, S('why2a').t0, S('why3').t1, { rows: 1, cols: 8, cw: 122, chh: 150, y: 500, caption: 'EIGHT: 4 + 4' });
    bar8(t8, g8); bar8(t8 + BAR8, g8);
    // why2b + why3: seven, the eighth cell missing
    const t7 = S('why2b').t0;
    const SEVEN = [...cellsFor([4, 3]).map(c => ({ ...c, size: c.size - 10 })), { label: '', color: RED }];
    const g7 = a.grid(SEVEN, t7, S('why3').t1, { rows: 1, cols: 8, cw: 122, chh: 150, y: 790, caption: 'SEVEN: 4 + 3' });
    const SKIP = [...Array(7)].map(() => ({ label: '', color: DARK })).concat([{ label: 'SKIP', size: 28, color: RED }]);
    const gSkip = a.grid(SKIP, a.w('why3', 'early'), S('why3').t1, { rows: 1, cols: 8, cw: 122, chh: 150, y: 790 });
    let k = 0;
    for (let t = t7; t + BAR7 <= S('why3').t1 + 0.05; t += BAR7, k++) {
      bar7(t, { grid: g7, vel: 0.85, chord: k % 2 ? 'Fmaj7' : 'Am7', bassNote: k % 2 ? 'F2' : 'A2' });
      gSkip.active.push({ t0: t + 6.6 * BEAT, t1: t + BAR7 + 0.3, i: 7 });
    }
    a.big('ONE BEAT EARLY', a.w('why3', 'early'), S('why3').t1, { y: 1060, size: 44, ...MONO, color: RED, blur: 10 });

    // why4: repeat, repeat, repeat - the skip becomes a groove
    const w4 = S('why4').t0;
    const gY4 = row7([4, 3], w4, S('essence').t1);
    groupNames([4, 3], w4, S('essence').t1);
    const PROG = ['Am7', 'Fmaj7', 'Dm7', 'Em7'], PB = ['A2', 'F2', 'D2', 'E2'];
    let r = 0, tEnd = w4;
    for (let t = w4; t + BAR7 <= S('essence').t1 - 1.8; t += BAR7, r++) {
      bar7(t, { grid: gY4, vel: t < S('essence').t0 ? 0.95 : 0.8, chord: PROG[r % 4], bassNote: PB[r % 4] });
      if (t < S('essence').t0 - 0.5) a.big('× ' + (r + 1), t, t + BAR7, { y: 980, size: 110, ...MONO, color: GOLD });
      tEnd = t + BAR7;
    }
    a.big('8 - 1 = 7', S('essence').t0 + 0.3, S('essence').t1, { y: 980, size: 110, ...MONO, color: GOLD });
    // final hit on the next downbeat
    a.perc('kick', tEnd, 1); a.perc('hat', tEnd, 0.5);
    gY4.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('Am7', tEnd, S('essence').t1 - 0.2, { notes: ['G3', 'C4', 'E4', 'A4'], bass: 'A1', vel: 0.85, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
