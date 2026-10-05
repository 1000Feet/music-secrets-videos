// AABA song form: 32 bars - A, A again, the bridge, and A back home.
const BAR = 0.6;   // one bar of the compressed demo (a fast-forward through the form)

module.exports = {
  slug: 'aaba-form',
  title: 'AABA Song Form',
  segments: [
    { id: 'hook',    text: 'Say it. Say it again. Take a detour... and come home.' },
    { id: 'what',    text: 'This is A A B A form. Thirty two bars, in four sections of eight.' },
    { id: 'a1',      text: 'A: the main tune, eight bars.' },
    { id: 'a2',      text: 'A again. Same tune.' },
    { id: 'b',       text: 'B: the bridge. Something new.' },
    { id: 'a3',      text: 'And A once more... home.' },
    { id: 's1',      text: 'You hear it in Over the Rainbow.' },
    { id: 's2',      text: 'Yesterday goes verse, verse, bridge, verse...' },
    { id: 's2b',     text: 'then the bridge and the last verse repeat. Still an A A B A shape.' },
    { id: 's3',      text: 'And in many jazz standards and Tin Pan Alley songs, from the twenties to the fifties.' },
    { id: 'why1',    text: 'So why does it work? Hearing A twice makes the melody familiar.' },
    { id: 'why2',    text: 'Then the bridge brings contrast: different chords, often a new key area.' },
    { id: 'why3',    text: "It's sometimes called the middle eight." },
    { id: 'why4',    text: 'And after the detour, the return of A feels like coming home.' },
    { id: 'essence', text: 'Say it, say it again, take a detour, come home. The shape of a story, in thirty two bars.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: '32-BAR SONG FORM', title: 'A A B A', accent: true, circle: false, tail: 1.2 },
    { id: 'what', segs: ['what'], label: 'FOUR SECTIONS', title: '32 BARS', circle: false, tail: 0.4 },
    { id: 'a1', segs: ['a1'], label: 'BARS 1 – 8', title: 'A', circle: false, min: 8 * BAR + 0.15, tail: 0 },
    { id: 'a2', segs: ['a2'], label: 'BARS 9 – 16', title: 'A AGAIN', circle: false, min: 8 * BAR, tail: 0 },
    { id: 'b', segs: ['b'], label: 'BARS 17 – 24', title: 'B · THE BRIDGE', circle: false, min: 8 * BAR, tail: 0 },
    { id: 'a3', segs: ['a3'], label: 'BARS 25 – 32', title: 'A · HOME', circle: false, min: 8 * BAR + 1.2, tail: 0 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Over the Rainbow', sub: 'Harold Arlen · 1939', circle: false, min: 5.4 },
    { id: 's2', segs: ['s2', 's2b'], label: 'YOU HEAR IT IN', title: 'Yesterday', sub: 'The Beatles · 1965', circle: false, gap: 0.2, tail: 0.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Jazz Standards', sub: 'Tin Pan Alley · 1920s – 50s', circle: false, tail: 0.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'REPETITION', circle: false, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'CONTRAST', tonic: 0, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'THE BRIDGE', title: 'THE MIDDLE EIGHT', circle: false, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'COMING HOME', tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE SHAPE OF A STORY', accent: true, circle: false, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', GOLD = '#ffcf5a', PINK = '#ff7a93', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    // generic progressions (not taken from any song): A ends open, then closed; B is a chain of dominants
    const A1 = ['C', 'Am', 'Dm', 'G7', 'C', 'Am', 'Dm', 'G7'];
    const A2 = ['C', 'Am', 'Dm', 'G7', 'C', 'Am', 'G7', 'C'];
    const BR = ['E7', 'E7', 'A7', 'A7', 'D7', 'D7', 'G7', 'G7'];
    const tr = (name, n) => { const m = /^([A-G][#b]?)(.*)$/.exec(name); return a.T.NAMES[a.T.mod(a.T.pc(m[1]) + n, 12)] + m[2]; };
    const COL = { A: TEAL, B: GOLD };

    // the four big blocks
    const blocks = (labels, t0, t1, o = {}) => a.grid(labels.map(l => ({ label: l, sub: o.sub ?? '8 BARS', color: COL[l[0]] || (l === 'BRIDGE' ? GOLD : TEAL), size: o.size ?? (o.sub === '' ? 110 : 84), subSize: 24 })),
      t0, t1, { rows: 1, cols: labels.length, cw: o.cw ?? 225, chh: o.chh ?? 250, y: o.y ?? 480, revealStep: o.reveal, caption: o.caption });
    // 32 bars: four rows of eight
    const BARS = Array.from({ length: 32 }, (_, i) => ({ label: String(i + 1), color: Math.floor(i / 8) === 2 ? GOLD : TEAL, size: 26 }));
    const barGrid = (t0, t1, o = {}) => a.grid(BARS, t0, t1, { rows: 4, cols: 8, cw: 108, chh: 74, y: o.y ?? 790, revealStep: o.reveal });

    // a bar of comping: chord on 1 and 3, brushes on every beat
    function bar(name, t, len, o = {}) {
      a.ch(name, t, t + len, { strikes: [{ o: 0, v: 1 }, { o: len / 2, v: 0.6 }], vel: o.vel ?? 0.8, hideName: o.hideName, shape: o.shape });
      for (let k = 0; k < 4; k++) a.perc('hat', t + k * len / 4, (k % 2 ? 0.25 : 0.4) * (o.vel ?? 0.8));
      if (o.kick !== false) a.perc('kick', t, 0.35 * (o.vel ?? 0.8));
    }
    const section = (prog, t0, len, o = {}) => prog.forEach((c, i) => bar(tr(c, o.key ?? 0), t0 + i * len, len, o));

    // ---------- hook: one block per phrase ----------
    const hW = [a.w('hook', 'Say'), a.w('hook', 'Say', 1), a.w('hook', 'detour'), a.w('hook', 'home')].map(t => t - 0.05);
    const gH = blocks(['A', 'A', 'B', 'A'], 0.2, S('hook').t1, { sub: '', reveal: 0.12 });
    hW.forEach((t, i) => gH.active.push({ t0: t, t1: i < 3 ? hW[i + 1] : S('hook').t1, i }));
    const tCome = a.w('hook', 'come') - 0.05;
    a.ch('C', hW[0], hW[0] + 0.5, { vel: 0.8 }); a.ch('Am', hW[0] + 0.5, hW[1], { vel: 0.7 });
    a.ch('C', hW[1], hW[1] + 0.5, { vel: 0.8 }); a.ch('Am', hW[1] + 0.5, hW[2], { vel: 0.7 });
    a.ch('E7', hW[2], tCome, { vel: 0.8, strikes: [{ o: 0, v: 1 }, { o: 0.5, v: 0.6 }] });
    a.ch('G7', tCome, hW[3], { vel: 0.75 });
    a.ch('C', hW[3], S('hook').t1 - 0.1, { vel: 0.9, notes: ['E4', 'G4', 'C5'], bass: 'C3' });
    a.big('SAY IT', hW[0], hW[1], { y: 900, size: 54, ...MONO, color: TEAL, blur: 10 });
    a.big('AGAIN', hW[1], hW[2], { y: 900, size: 54, ...MONO, color: TEAL, blur: 10 });
    a.big('DETOUR', hW[2], hW[3], { y: 900, size: 54, ...MONO, color: GOLD, blur: 10 });
    a.big('HOME', hW[3], S('hook').t1, { y: 900, size: 54, ...MONO, color: TEAL, blur: 10 });

    // ---------- what: 4 x 8 = 32 ----------
    const w0 = S('what').t0;
    const gWb = blocks(['A', 'A', 'B', 'A'], w0, S('a3').t1, {});
    const gBars = barGrid(a.w('what', 'Thirty') - 0.1, S('a3').t1, { reveal: 0.04 });
    a.ch('C', w0 + 0.1, a.w('what', 'Thirty') - 0.05, { vel: 0.5 });
    a.ch('Am', a.w('what', 'Thirty') - 0.05, a.w('what', 'four') - 0.05, { vel: 0.5 });
    a.ch('Dm', a.w('what', 'four') - 0.05, a.w('what', 'eight') - 0.05, { vel: 0.5 });
    a.ch('G7', a.w('what', 'eight') - 0.05, S('what').t1, { vel: 0.5 });

    // ---------- the demo: 32 bars, fast-forward ----------
    const parts = [['a1', A1, 0], ['a2', A2, 1], ['b', BR, 2], ['a3', A2, 3]];
    parts.forEach(([id, prog, k]) => {
      const t0 = S(id).t0 + (k === 0 ? 0.15 : 0);
      section(prog, t0, BAR, { vel: k === 2 ? 0.9 : 0.8 });
      gWb.active.push({ t0, t1: k === 3 ? S(id).t1 : t0 + 8 * BAR, i: k });
      for (let j = 0; j < 8; j++) gBars.active.push({ t0: t0 + j * BAR, t1: S('a3').t1, i: k * 8 + j });
    });
    const tEnd = S('a3').t0 + 8 * BAR;
    a.ch('C', tEnd, S('a3').t1 - 0.05, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.85 });
    a.big('SOMETHING NEW', a.w('b', 'Something') - 0.05, S('b').t1, { y: 1110, size: 40, ...MONO, color: GOLD, blur: 8 });

    // ---------- songs: generic chords only ----------
    // Over the Rainbow: the four blocks light up in turn (generic progression, transposed)
    const s10 = S('s1').t0 + 0.1, sl = (S('s1').t1 - 0.35 - s10) / 4;
    const g1 = blocks(['A', 'A', 'B', 'A'], S('s1').t0, S('s1').t1, {});
    [A1, A2, BR, A2].forEach((p, k) => {
      section([p[0], p[2], p[4], p[7]], s10 + k * sl, sl / 4, { key: 3, vel: 0.7 });
      g1.active.push({ t0: s10 + k * sl, t1: s10 + (k + 1) * sl, i: k });
    });

    // Yesterday: verse, verse, bridge, verse ... then bridge and last verse again
    const yW = [a.w('s2', 'verse'), a.w('s2', 'verse', 1), a.w('s2', 'bridge'), a.w('s2', 'verse', 2), a.w('s2b', 'bridge'), a.w('s2b', 'verse')].map(t => t - 0.05);
    const Y = ['VERSE', 'VERSE', 'BRIDGE', 'VERSE', 'BRIDGE', 'VERSE'].map((l, i) => ({ label: l, color: l === 'BRIDGE' ? GOLD : TEAL, size: 30, sub: i < 4 ? 'AABA'[i] : 'AGAIN', subSize: i < 4 ? 40 : 22 }));
    const g2 = a.grid(Y, S('s2').t0 + 0.05, S('s2').t1, { rows: 2, cols: 3, cw: 290, chh: 200, y: 520, revealStep: 0.08 });
    yW.forEach((t, i) => {
      const t1 = i < 5 ? yW[i + 1] : S('s2').t1;
      g2.active.push({ t0: t, t1: i < 4 ? S('s2').t1 : t1, i });
      const p = Y[i].label === 'BRIDGE' ? ['A7', 'D7'] : ['C', 'G7'];
      a.ch(tr(p[0], 5), t, t + Math.min(0.5, (t1 - t) / 2), { vel: 0.75 });
      a.ch(tr(p[1], 5), t + Math.min(0.5, (t1 - t) / 2), t1, { vel: 0.6 });
    });
    a.big('A A B A', a.w('s2b', 'Still'), S('s2').t1, { y: 1050, size: 64, ...MONO, color: TEAL, blur: 10 });

    // jazz standards: the 32-bar grid fills, blocks above
    const g3 = blocks(['A', 'A', 'B', 'A'], S('s3').t0, S('s3').t1, { chh: 200 });
    const gB3 = barGrid(S('s3').t0, S('s3').t1, { y: 740 });
    const s30 = S('s3').t0 + 0.1, bl = (S('s3').t1 - 0.4 - s30) / 32;
    [A1, A2, BR, A2].forEach((p, k) => {
      section(p, s30 + k * 8 * bl, bl, { key: 10, vel: 0.6, kick: false });
      g3.active.push({ t0: s30 + k * 8 * bl, t1: S('s3').t1, i: k });
      for (let j = 0; j < 8; j++) gB3.active.push({ t0: s30 + (k * 8 + j) * bl, t1: S('s3').t1, i: k * 8 + j });
    });
    a.big('1920s – 50s', a.w('s3', 'twenties') - 0.1, S('s3').t1, { y: 1120, size: 44, ...MONO, color: GOLD, blur: 8 });

    // ---------- part 2 ----------
    // why1: A twice = familiar
    const gY1 = blocks(['A', 'A', 'B', 'A'], S('why1').t0, S('why1').t1, {});
    const tTw = a.w('why1', 'twice') - 0.05, tFam = a.w('why1', 'familiar') - 0.05;
    gY1.active.push({ t0: a.w('why1', 'A') - 0.05, t1: S('why1').t1, i: 0 }, { t0: tTw, t1: S('why1').t1, i: 1 });
    section(A1.slice(0, 4), S('why1').t0 + 0.1, (tTw - S('why1').t0 - 0.1) / 4, { vel: 0.55, kick: false });
    section(A2.slice(0, 4), tTw, (S('why1').t1 - 0.2 - tTw) / 4, { vel: 0.6, kick: false });
    a.big('FAMILIAR', tFam, S('why1').t1, { y: 900, size: 80, color: TEAL });

    // why2: the bridge on the circle - a chain of new chords, roots walking E A D G
    a.scale(S('why2').t0, 'C');
    const tCon = a.w('why2', 'contrast') - 0.05, tDif = a.w('why2', 'different') - 0.05, tKey = a.w('why2', 'key') - 0.05;
    a.ch('C', S('why2').t0 + 0.1, tCon, { vel: 0.6 });
    const chain = ['E7', 'A7', 'D7', 'G7'], cl = (S('why2').t1 - 0.2 - tCon) / 4;
    chain.forEach((c, i) => a.ch(c, tCon + i * cl, tCon + (i + 1) * cl, { vel: 0.75, strikes: [{ o: 0, v: 1 }, { o: cl / 2, v: 0.6 }] }));
    a.walker(chain.map((c, i) => [tCon + i * cl, c[0]]), { t1: S('why2').t1, dr: 34, color: GOLD, label: 'BRIDGE', labelDr: 82 });
    a.tag(0, tKey, S('why2').t1, 'NEW KEY AREA', { x: 540, y: 455, color: GOLD });

    // why3: the middle eight - bars 17 to 24
    const gB4 = barGrid(S('why3').t0, S('why3').t1, { y: 560 });
    const tMid = a.w('why3', 'middle') - 0.05;
    for (let j = 16; j < 24; j++) gB4.active.push({ t0: tMid + (j - 16) * 0.08, t1: S('why3').t1, i: j });
    section(BR.filter((_, i) => i % 2 === 0), S('why3').t0 + 0.1, (S('why3').t1 - 0.3 - S('why3').t0) / 4, { vel: 0.6, kick: false });
    a.big('MIDDLE EIGHT', tMid, S('why3').t1, { y: 960, size: 72, color: GOLD });

    // why4: the return - G7 resolves home to C
    const tDet = a.w('why4', 'detour') - 0.05, tRet = a.w('why4', 'return') - 0.05, tHome = a.w('why4', 'home') - 0.05;
    a.scale(S('why4').t0, 'C');
    a.ch('D7', S('why4').t0 + 0.1, tDet + 0.5, { vel: 0.6 });
    a.ch('G7', tDet + 0.5, tRet, { vel: 0.7 });
    a.ch('C', tRet, S('why4').t1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.85 });
    a.arc('G', 'C', tRet, S('why4').t1, { steps: 5, color: TEAL, label: 'BACK TO A', labelR: 165 });
    a.ring(['C'], tHome, S('why4').t1, { color: TEAL });
    a.tag(0, tHome, S('why4').t1, 'HOME', { x: 540, y: 455, color: TEAL });

    // essence: the whole story once more, a block per phrase
    const eW = [a.w('essence', 'Say'), a.w('essence', 'again'), a.w('essence', 'detour'), a.w('essence', 'home')].map(t => t - 0.05);
    const gE = blocks(['A', 'A', 'B', 'A'], S('essence').t0 + 0.05, S('essence').t1, { sub: '' });
    eW.forEach((t, i) => gE.active.push({ t0: t, t1: i < 3 ? eW[i + 1] : S('essence').t1, i }));
    a.ch('C', eW[0], eW[1], { vel: 0.75 }); a.ch('C', eW[1], eW[2], { notes: ['E4', 'G4', 'C5'], vel: 0.75 });
    a.ch('E7', eW[2], eW[2] + (eW[3] - eW[2]) / 2, { vel: 0.8 }); a.ch('G7', eW[2] + (eW[3] - eW[2]) / 2, eW[3], { vel: 0.75 });
    a.ch('C', eW[3], a.at('cta'), { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.85 });
    a.big('32 BARS', a.w('essence', 'thirty'), S('essence').t1, { y: 900, size: 80, color: GOLD });
    a.ch('Am', a.at('cta'), a.at('cta') + 0.8, { vel: 0.5 }); a.ch('Dm', a.at('cta') + 0.8, a.at('cta') + 1.6, { vel: 0.5 });
    a.ch('G7', a.at('cta') + 1.6, a.at('cta') + 2.4, { vel: 0.5 });
    a.ch('C', a.at('cta') + 2.4, S('essence').t1 - 0.2, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.7 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
