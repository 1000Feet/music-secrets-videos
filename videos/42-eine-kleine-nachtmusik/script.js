// Eine kleine Nachtmusik, decoded: the home chord spelled out, a dominant answer, and a rising rocket.
module.exports = {
  slug: 'eine-kleine-nachtmusik',
  title: 'Eine kleine Nachtmusik, Decoded',
  segments: [
    { id: 'hook',     text: 'You can recognize this music in about two seconds.' },
    { id: 'what',     text: "It's Eine kleine Nachtmusik: Mozart's Serenade number thirteen in G major, completed in 1787." },
    { id: 'what2',    text: 'The title simply means a little night music.' },
    { id: 'play',     text: "Here's how it opens." },
    { id: 'why1',     text: 'So why does it work? The first bars just spell out one chord.' },
    { id: 'why1b',    text: 'G, D, G, D... then up through G, B, D. The home chord: G major.' },
    { id: 'why2',     text: 'Then comes the answer: C, A, F sharp, down to D.' },
    { id: 'why2b',    text: "That's D seven, the dominant chord." },
    { id: 'why2c',    text: "In G major, it's the chord that pulls back home." },
    { id: 'why3',     text: 'A question and an answer, built from just two chords.' },
    { id: 'why4',     text: 'And that rising arpeggio? Composers of the time loved this rocket figure.' },
    { id: 'why4b',    text: 'It grabs your attention instantly.' },
    { id: 'why5',     text: "That's Mozart's style: balanced phrases, clear harmony, everything in proportion." },
    { id: 'essence',  text: 'Two chords, perfectly balanced.' },
    { id: 'essence2', text: 'And you recognize it in two seconds.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'A LITTLE NIGHT MUSIC', accent: true, tonic: 7, min: 5.2 },
    { id: 'what', segs: ['what'], label: 'SERENADE NO. 13 · K. 525', title: 'G MAJOR', sub: 'Wolfgang Amadeus Mozart · 1787', tonic: 7, tail: 0.5 },
    { id: 'what2', segs: ['what2'], label: 'THE TITLE', title: 'NIGHT MUSIC', tonic: 7, circle: false, tail: 1.0 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'EINE KLEINE NACHTMUSIK', sub: 'Mozart · 1787 · in G', tonic: 7, row: ['G', 'D7'], tail: 8.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'ONE CHORD', tonic: 7, gap: 0.3, tail: 0.9 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'THE ANSWER', tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'QUESTION AND ANSWER', title: 'TWO CHORDS', tonic: 7, row: ['G', 'D7', 'G'], tail: 4.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'THE ROCKET', title: 'RISING FAST', tonic: 7, circle: false, gap: 0.3, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: "MOZART'S STYLE", title: 'IN PROPORTION', tonic: 7, circle: false, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'TWO CHORDS', accent: true, tonic: 7, row: ['G', 'D7', 'G'], gap: 0.4, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff';
    const pcOf = n => n.replace(/-?\d/, '');
    const down = n => n.replace(/(\d)$/, d => String(+d - 1));
    const Q1 = [['G4', 1], [null, 0.5], ['D4', 0.5], ['G4', 1], [null, 0.5], ['D4', 0.5], ['G4', 0.5], ['D4', 0.5], ['G4', 0.5], ['B4', 0.5], ['D5', 2]];
    const A1 = [['C5', 1], [null, 0.5], ['A4', 0.5], ['C5', 1], [null, 0.5], ['A4', 0.5], ['C5', 0.5], ['A4', 0.5], ['F#4', 0.5], ['A4', 0.5], ['D4', 2]];
    const GV = ['G3', 'B3', 'D4'], DV = ['D4', 'F#4', 'A4', 'C5'];
    // play a melody (doubled an octave lower, like the string unison) and return walker points
    const mel = (list, t0, beat, vel = 0.4, o = {}) => {
      const pts = []; let t = t0;
      for (const [n, b] of list) {
        if (n) {
          a.note(n, t, b * beat * 0.8, { vel, show: o.show !== false });
          if (o.oct !== false) a.note(down(n), t, b * beat * 0.8, { vel: vel * 0.6, show: false });
          pts.push([t, pcOf(n)]);
        }
        t += b * beat;
      }
      return { pts, end: t };
    };
    const gShape = (t0, t1, o = {}) => a.ch('G', t0, t1, { notes: GV, bass: false, mute: true, ...o });
    const dShape = (t0, t1, o = {}) => a.ch('D7', t0, t1, { notes: DV, bass: false, mute: true, ...o });

    // hook: the opening gesture, the G major scale popping in
    a.scale(0.2, 'G', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const hb = 0.42, h0 = 0.5;
    const hp = mel(Q1, h0, hb, 0.36);
    a.walker(hp.pts, { t1: S('hook').t1, dr: -40, color: TEAL });
    gShape(h0, S('hook').t1, { row: 0 });

    // what: G major
    const tG = a.w('what', 'G') - 0.05;
    gShape(S('what').t0 + 0.1, tG);
    a.ch('G', tG, S('what').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.65 });
    a.tag('G', tG + 0.1, S('what').t1, 'HOME KEY', { dr: -75 });

    // what2: Eine = a, kleine = little, Nachtmusik = night music
    const g2 = a.grid([
      { label: 'EINE', sub: 'A', size: 64, color: BLUE }, { label: 'KLEINE', sub: 'LITTLE', size: 64, color: TEAL },
      { label: 'NACHTMUSIK', sub: 'NIGHT MUSIC', size: 64, color: GOLD },
    ], S('what2').t0 + 0.1, S('what2').t1, { rows: 3, cols: 1, cw: 720, chh: 170, y: 500, revealStep: 0.2 });
    const tw = [a.w('what2', 'a'), a.w('what2', 'little'), a.w('what2', 'night')].map(t => t - 0.05);
    tw.forEach((t, i) => g2.active.push({ t0: t, t1: i < 2 ? tw[i + 1] : S('what2').t1, i }));
    [0, 1, 2].forEach(i => g2.active.push({ t0: S('what2').t1 - 0.6, t1: S('what2').t1, i }));
    const w0 = S('what2').t0 + 0.2, wl = (S('what2').t1 - w0) / 4;
    ['G', 'D7', 'G', 'D7'].forEach((c, i) => a.ch(c, w0 + i * wl, w0 + (i + 1) * wl, { notes: c === 'G' ? GV : ['C4', 'D4', 'F#4', 'A4'], bass: c === 'G' ? 'G2' : 'D3', vel: 0.35, strikes: [{ o: 0, v: 1 }, { o: wl / 2, v: 0.6 }] }));

    // play: bars 1-4, G major then the D7 answer, landing on G
    const pb = 0.42, p0 = a.end('play') + 0.3;
    const q = mel(Q1, p0, pb, 0.42), an = mel(A1, q.end, pb, 0.42);
    gShape(p0, q.end, { row: 0 });
    dShape(q.end, an.end, { row: 1 });
    a.walker([...q.pts, ...an.pts], { t1: an.end, dr: -40, color: TEAL });
    a.ch('G', an.end, S('play').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.6, row: 0 });
    a.note('G4', an.end, 1.0, { vel: 0.38, show: false });

    // why1: G D G D, then up G B D -> G major
    const tWhy = a.at('why1');
    gShape(tWhy + 0.1, a.w('why1b', 'G', 3) - 0.05, { hideName: true });
    a.ring(['G', 'B', 'D'], a.w('why1', 'chord'), a.at('why1b') - 0.05, { color: GOLD });
    const wds = [['G', 0], ['D', 0], ['G', 1], ['D', 1], ['G', 2], ['B', 0], ['D', 2]];
    const NT = ['G4', 'D4', 'G4', 'D4', 'G4', 'B4', 'D5'];
    const t1b = wds.map(([w, n]) => a.w('why1b', w, n) - 0.04);
    t1b.forEach((t, i) => a.note(NT[i], t, i === 6 ? 0.9 : 0.4, { vel: 0.36 }));
    a.walker(t1b.map((t, i) => [t, pcOf(NT[i])]), { t1: S('why1').t1, dr: -40, color: TEAL });
    a.arc('G', 'B', t1b[5], S('why1').t1, { steps: 4, color: GOLD, dr: 34 });
    a.arc('B', 'D', t1b[6], S('why1').t1, { steps: 3, color: GOLD, dr: 34 });
    const tHome = a.w('why1b', 'G', 3) - 0.05;
    a.ch('G', tHome, S('why1').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.7 });
    a.tag('G', a.w('why1b', 'home'), S('why1').t1, 'HOME', { dr: -92 });

    // why2: C A F# D -> D7, the dominant, pulls back to G
    const w2 = [['C', 0], ['A', 0], ['F', 0], ['D', 0]].map(([w, n]) => a.w('why2', w, n) - 0.04);
    const N2 = ['C5', 'A4', 'F#4', 'D4'];
    w2.forEach((t, i) => a.note(N2[i], t, i === 3 ? 0.9 : 0.4, { vel: 0.36 }));
    a.walker(w2.map((t, i) => [t, pcOf(N2[i])]), { t1: a.at('why2b'), dr: -40, color: RED });
    dShape(w2[0], a.at('why2b') - 0.05, { hideName: true });
    const tD7 = a.w('why2b', 'D') - 0.05;
    a.ch('D7', tD7, a.at('why2c') + 0.6, { notes: DV, bass: 'D3', vel: 0.65 });
    a.tag('D', a.w('why2b', 'dominant'), a.w('why2c', 'pulls'), 'DOMINANT', { dr: -92, color: RED });
    const tPull = a.w('why2c', 'pulls') - 0.05, tBack = a.w('why2c', 'home') - 0.05;
    a.ch('D7', a.at('why2c') + 0.6, tBack, { notes: ['C4', 'D4', 'F#4', 'A4'], bass: 'D3', vel: 0.55 });
    a.line('D', 'G', tPull, S('why2').t1, { arrow: true, color: RED, r: 215 });
    a.ch('G', tBack, S('why2').t1, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.75 });
    a.tag('G', tBack + 0.1, S('why2').t1, 'HOME', { dr: -92 });

    // why3: question (G) and answer (D7), then home
    const qb = 0.4, q0 = a.w('why3', 'question') - 0.15;
    gShape(S('why3').t0 + 0.1, q0, { row: 0 });
    const qq = mel(Q1, q0, qb, 0.36), qa = mel(A1, qq.end, qb, 0.36);
    gShape(q0, qq.end, { row: 0, hideName: true });
    dShape(qq.end, qa.end, { row: 1, hideName: true });
    a.walker([...qq.pts, ...qa.pts], { t1: qa.end, dr: -40, color: TEAL });
    a.tag(0, q0, qq.end, 'QUESTION', { x: 540, y: 830, color: GOLD });
    a.tag(0, qq.end, qa.end, 'ANSWER', { x: 540, y: 830, color: RED });
    a.ch('G', qa.end, S('why3').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.6, row: 2 });
    a.note('G4', qa.end, 0.9, { vel: 0.36, show: false });

    // why4: the rocket, a fast rising arpeggio, notes climbing up the screen
    const RK = ['G3', 'B3', 'D4', 'G4', 'B4', 'D5', 'G5'];
    const rocket = (t0, step, vel, show) => RK.forEach((n, i) => {
      a.note(n, t0 + i * step, i === 6 ? 0.9 : step * 1.6, { vel });
      if (show) a.big(pcOf(n), t0 + i * step, S('why4').t1, { x: 240 + i * 100, y: 1060 - i * 82, size: 72, color: a.T.DEG12[(a.T.pc(n) - 7 + 12) % 12] });
    });
    const tR = a.w('why4', 'rising') - 0.1;
    rocket(tR, 0.12, 0.32, true);
    rocket(a.w('why4', 'rocket'), 0.09, 0.3, false);
    rocket(a.w('why4b', 'attention'), 0.08, 0.34, false);
    a.ch('G', S('why4').t0 + 0.1, S('why4').t1, { notes: ['G3', 'D4'], bass: 'G2', vel: 0.3, strikes: [{ o: 0, v: 1 }] });

    // why5: balanced phrases, clear harmony, in proportion (bars 1-4 with chords)
    const g5 = a.grid([
      { label: 'BALANCED PHRASES', size: 50, color: BLUE }, { label: 'CLEAR HARMONY', size: 50, color: TEAL }, { label: 'IN PROPORTION', size: 50, color: GOLD },
    ], S('why5').t0 + 0.1, S('why5').t1, { rows: 3, cols: 1, cw: 760, chh: 150, y: 520, revealStep: 0.15 });
    const t5 = [a.w('why5', 'balanced'), a.w('why5', 'clear'), a.w('why5', 'everything')].map(t => t - 0.05);
    t5.forEach((t, i) => g5.active.push({ t0: t, t1: i < 2 ? t5[i + 1] : S('why5').t1, i }));
    const m0 = S('why5').t0 + 0.2, mb = 0.4;
    const mq = mel(Q1, m0, mb, 0.3, { show: false }), ma = mel(A1, mq.end, mb, 0.3, { show: false });
    a.ch('G', m0, mq.end, { notes: GV, bass: 'G2', vel: 0.4, strikes: [0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ o: k * mb, v: k % 2 ? 0.5 : 0.8 })) });
    a.ch('D7', mq.end, ma.end, { notes: ['C4', 'D4', 'F#4', 'A4'], bass: 'D3', vel: 0.4, strikes: [0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ o: k * mb, v: k % 2 ? 0.5 : 0.8 })) });
    a.ch('G', ma.end, S('why5').t1, { notes: GV, bass: 'G2', vel: 0.45 });

    // essence: the opening once more, ending home
    a.scale(S('essence').t0, 'G');
    const e0 = S('essence').t0 + 0.2, eb = 0.42;
    const eq = mel(Q1, e0, eb, 0.38), ea = mel(A1, eq.end, eb, 0.38);
    gShape(e0, eq.end, { row: 0 });
    dShape(eq.end, ea.end, { row: 1 });
    a.walker([...eq.pts, ...ea.pts], { t1: ea.end, dr: -40, color: TEAL });
    a.line('G', 'D', eq.end, ea.end, { color: GOLD, dash: true });
    a.ch('G', ea.end, S('essence').t1 - 0.3, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.75, row: 2 });
    a.note('G4', ea.end, 2.0, { vel: 0.34, show: false });
    a.tag('G', ea.end + 0.1, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
