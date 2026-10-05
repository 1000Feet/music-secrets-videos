// The Dorian mode: a minor scale with a raised sixth, minor with the lights left on.
module.exports = {
  slug: 'dorian',
  title: 'The Dorian Mode',
  segments: [
    { id: 'hook',    text: 'Take a minor scale, change just one note... and suddenly it sounds cool.' },
    { id: 'what',    text: "Play the white keys from D to D. That's D Dorian: D, E, F, G, A, B, C." },
    { id: 'what2',   text: 'Natural minor would have B flat here. Dorian raises it to B.' },
    { id: 'scar',    text: "It's the melody of Scarborough Fair..." },
    { id: 'oye',     text: 'the two chord groove of Oye Como Va...' },
    { id: 'sowhat',  text: 'So What by Miles Davis, a whole tune on one mode...' },
    { id: 'lucky',   text: 'and Get Lucky by Daft Punk.' },
    { id: 'why1',    text: 'So why does it work? Compared to natural minor, only the sixth note changes. It is raised a half step.' },
    { id: 'why2',    text: 'And that one note turns the four chord major. In A Dorian, D minor becomes D major.' },
    { id: 'why3',    text: 'Minor one, major four, back and forth. That vamp is the Dorian fingerprint.' },
    { id: 'why4',    text: 'Get Lucky does it in B: the four chord is E major, with a G sharp.' },
    { id: 'why5',    text: 'The result is still minor, but brighter, cooler, hopeful. Folk, jazz and funk players love it.' },
    { id: 'essence', text: 'Minor with the lights left on. One raised note changes the whole atmosphere.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MINOR, BUT BRIGHTER', title: 'THE DORIAN MODE', accent: true, tonic: 2, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'WHITE KEYS FROM D', title: 'D DORIAN', tonic: 2, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'VS NATURAL MINOR', title: 'ONE NOTE HIGHER', tonic: 2, tail: 0.7 },
    { id: 'scar', segs: ['scar'], label: 'YOU HEAR IT IN', title: 'Scarborough Fair', sub: 'Traditional · in D Dorian', tonic: 2, tail: 4.5 },
    { id: 'oye', segs: ['oye'], label: 'YOU HEAR IT IN', title: 'Oye Como Va', sub: 'Tito Puente · 1962 · in A Dorian', tonic: 9, row: ['Am7', 'D9'], min: 5.2 },
    { id: 'sowhat', segs: ['sowhat'], label: 'YOU HEAR IT IN', title: 'So What', sub: 'Miles Davis · 1959 · in D Dorian', tonic: 2, tail: 2.6 },
    { id: 'lucky', segs: ['lucky'], label: 'YOU HEAR IT IN', title: 'Get Lucky', sub: 'Daft Punk · 2013 · in B Dorian', tonic: 11, row: ['Bm7', 'D', 'F#m7', 'E'], min: 5.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'ONE NOTE', tonic: 2, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'THE FOUR CHORD', title: 'MINOR BECOMES MAJOR', tonic: 9, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'THE FINGERPRINT', title: 'i – IV', tonic: 9, row: ['i', 'IV', 'i', 'IV'], tail: 0.9 },
    { id: 'why4', segs: ['why4'], label: 'IN B DORIAN', title: 'E MAJOR', tonic: 11, tail: 1.1 },
    { id: 'why5', segs: ['why5'], label: 'STILL MINOR', title: 'BUT BRIGHTER', tonic: 2, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LIGHTS LEFT ON', accent: true, tonic: 2, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const DOR = [0, 2, 3, 5, 7, 9, 10], MIN = a.T.MINOR;
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    // a vamp: chords evenly spaced, with optional light drums (4 beats per chord)
    const vamp = (t0, t1, list, o = {}) => {
      const len = (t1 - t0) / list.length;
      list.forEach(([c, notes, bass, row], i) => a.ch(c, t0 + i * len, t0 + (i + 1) * len, {
        notes, bass, row: row ?? null, label: o.labels ? o.labels[i % o.labels.length] : undefined,
        strikes: o.strikes ? o.strikes(len) : [{ o: 0, v: 1 }, { o: len * 0.5, v: 0.55 }], vel: o.vel ?? 0.9,
      }));
      if (o.drums) {
        const beat = len / 4;
        for (let i = 0; i < list.length * 4; i++) {
          const t = t0 + i * beat;
          o.drums(t, i, beat);
        }
      }
    };
    const rock = (t, i, beat) => { a.perc(i % 2 ? 'snare' : 'kick', t, 0.6); a.perc('hat', t + beat / 2, 0.3); };

    const Dm7 = ['F3', 'A3', 'C4', 'D4'], G = ['G3', 'B3', 'D4'];

    // hook: D Dorian pops in, gentle i - IV vamp (Dm7 - G)
    a.scale(0.2, 'D', DOR, { popIn: { t0: 0.3, step: 0.2 } });
    vamp(0.3, S('hook').t1, [['Dm7', Dm7, 'D2'], ['G', G, 'G2'], ['Dm7', Dm7, 'D2'], ['G', G, 'G2']], { vel: 0.6 });
    a.ring(['B'], a.w('hook', 'one'), S('hook').t1, { color: GOLD });

    // what: white keys D to D, then the spoken names
    const tw = a.w('what', 'white');
    ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5'].forEach((n, i) => a.note(n, tw + i * 0.13, 0.4, { vel: 0.24 }));
    const names = ['D', 'E', 'F', 'G', 'A', 'B', 'C'];
    const tn = names.map((n, i) => a.w('what', n, i === 0 ? 3 : 0));
    names.forEach((n, i) => a.note(n + (n === 'C' ? '5' : '4'), tn[i], 0.7, { vel: 0.32 }));
    a.note('D5', tn[6] + 0.4, 1.0, { vel: 0.32 });
    a.walker(names.map((n, i) => [tn[i], n]), { t1: S('what').t1, dr: 34, color: '#ffffff' });

    // what2: natural minor has Bb; Dorian raises it to B
    const tNat = a.w('what2', 'Natural'), tFlat = a.w('what2', 'B'), tRaise = a.w('what2', 'raises');
    a.ch('Dm', S('what2').t0 + 0.1, S('what2').t1, { notes: ['D4', 'F4', 'A4'], bass: 'D3', vel: 0.55 });
    a.scale(tNat, 'D', MIN);
    a.ring(['Bb'], tFlat, tRaise, { color: '#8d98ff' });
    a.tag('Bb', tFlat, tRaise + 0.2, 'NATURAL MINOR', { color: '#8d98ff' });
    a.note('Bb4', tFlat, 0.9, { vel: 0.34 });
    a.scale(tRaise, 'D', DOR);
    a.arc('Bb', 'B', tRaise, S('what2').t1, { steps: 1, color: GOLD, dr: 30 });
    a.ring(['B'], a.w('what2', 'B', 1), S('what2').t1, { color: GOLD });
    a.tag('B', a.w('what2', 'B', 1), S('what2').t1, 'DORIAN', { color: GOLD });
    a.note('B4', a.w('what2', 'B', 1), 1.2, { vel: 0.36 });

    // Scarborough Fair (traditional): the opening phrase over a soft D minor drone
    a.scale(S('scar').t0, 'D', DOR);
    a.ch('Dm', S('scar').t0 + 0.1, S('scar').t1, { notes: ['A3', 'D4'], bass: 'D2', vel: 0.45, shape: false, hideName: true });
    const m0 = a.end('scar') + 0.2;
    a.melody([['D4', 2], ['D4', 1], ['A4', 1], ['A4', 1], ['A4', 1], ['E4', 1.5], ['F4', 0.5], ['E4', 1], ['D4', 3]], m0, 0.35, { vel: 0.44 });

    // Oye Como Va: the Am7 - D9 vamp with a latin pulse (chords only)
    a.scale(S('oye').t0, 'A', DOR);
    const Am7 = ['C4', 'E4', 'G4', 'A4'], D9 = ['C4', 'E4', 'F#4', 'A4'];
    const o0 = S('oye').t0 + 0.1, o1 = S('oye').t1;
    const latin = (t, i, beat) => { a.perc('hat', t, 0.35); a.perc('hat', t + beat / 2, 0.22); if (i % 4 === 0) a.perc('kick', t, 0.6); if (i % 4 === 2) a.perc('kick', t + beat / 2, 0.5); if (i % 4 === 3) a.perc('snare', t, 0.45); };
    vamp(o0, o1, [['Am7', Am7, 'A2', 0], ['D7', D9, 'D3', 1], ['Am7', Am7, 'A2', 0], ['D7', D9, 'D3', 1]], {
      labels: ['Am7', 'D9'], strikes: len => [{ o: 0, v: 1 }, { o: len * 0.375, v: 0.7 }, { o: len * 0.75, v: 0.6 }], drums: latin,
    });

    // So What: one long D Dorian sound, a walking scale bass, then up a half step
    const w0 = S('sowhat').t0 + 0.1, w1 = S('sowhat').t1, wUp = w1 - 1.9;
    a.scale(S('sowhat').t0, 'D', DOR);
    a.ch('Dm7', w0, wUp, { notes: ['F3', 'A3', 'C4', 'E4'], bass: false, label: 'Dm7', strikes: [{ o: 0, v: 1 }, { o: 1.6, v: 0.5 }, { o: 3.2, v: 0.6 }], vel: 0.8 });
    const walk = ['D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'C3', 'B2', 'A2', 'G2', 'F2', 'E2'];
    const ws = (wUp - w0) / walk.length;
    walk.forEach((n, i) => { a.note(n, w0 + i * ws, ws * 0.9, { vel: 0.4, show: false }); a.perc('hat', w0 + i * ws, i % 2 ? 0.35 : 0.2); });
    a.scale(wUp, 'Eb', DOR);
    a.ch('Ebm7', wUp, w1, { notes: ['Gb3', 'Bb3', 'Db4', 'F4'], bass: 'Eb2', vel: 0.85 });
    a.tag(0, wUp + 0.1, w1, 'UP A HALF STEP', { x: 540, y: 445, color: GOLD });

    // Get Lucky: Bm7 - D - F#m7 - E with a four on the floor (chords only)
    a.scale(S('lucky').t0, 'B', DOR);
    const k0 = S('lucky').t0 + 0.1, k1 = S('lucky').t1;
    const disco = (t, i, beat) => { a.perc('kick', t, 0.7); a.perc('hat', t + beat / 2, 0.4); if (i % 2) a.perc('snare', t, 0.45); };
    vamp(k0, k1, [['Bm7', ['A3', 'B3', 'D4', 'F#4'], 'B2', 0], ['D', ['A3', 'D4', 'F#4'], 'D3', 1], ['F#m7', ['A3', 'C#4', 'E4', 'F#4'], 'F#2', 2], ['E', ['G#3', 'B3', 'E4'], 'E2', 3]], {
      strikes: len => [{ o: 0, v: 1 }, { o: len * 0.375, v: 0.6 }, { o: len * 0.625, v: 0.5 }], drums: disco,
    });

    // why1: only the sixth changes, raised a half step
    a.scale(S('why1').t0, 'D', MIN);
    const tSix = a.w('why1', 'sixth'), tR = a.w('why1', 'raised');
    a.ch('Dm', S('why1').t0 + 0.1, S('why1').t1, { notes: ['D4', 'F4', 'A4'], bass: 'D3', vel: 0.5, hideName: true });
    a.ring(['Bb'], tSix, tR, { color: '#8d98ff' });
    a.tag('Bb', tSix, tR + 0.2, 'SIXTH NOTE', { color: '#8d98ff' });
    a.note('Bb4', tSix, 0.8, { vel: 0.32 });
    a.scale(tR, 'D', DOR);
    a.arc('Bb', 'B', tR, S('why1').t1, { steps: 1, color: GOLD, dr: 30 });
    a.tag('B', tR + 0.3, S('why1').t1, 'RAISED 6TH', { color: GOLD });
    a.note('B4', tR + 0.2, 1.2, { vel: 0.36 });

    // why2: in A Dorian, D minor becomes D major (F -> F#)
    a.scale(S('why2').t0, 'A', DOR);
    const tDm = a.w('why2', 'D') - 0.04, tDM = a.w('why2', 'D', 1) - 0.04;
    a.ch('Am', S('why2').t0 + 0.1, tDm, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.6 });
    a.ch('Dm', tDm, tDM, { notes: ['A3', 'D4', 'F4'], bass: 'D3', vel: 0.8 });
    a.ch('D', tDM, S('why2').t1, { notes: ['A3', 'D4', 'F#4'], bass: 'D3', vel: 0.9 });
    a.arc('F', 'F#', a.w('why2', 'becomes'), S('why2').t1, { steps: 1, color: GOLD, dr: 30 });
    a.tag('F#', tDM, S('why2').t1, 'RAISED 6TH', { color: GOLD });

    // why3: the i - IV vamp, Am - D, back and forth
    const v0 = S('why3').t0 + 0.05, v1 = S('why3').t1;
    const AmV = ['A3', 'C4', 'E4'], DV = ['A3', 'D4', 'F#4'];
    vamp(v0, v1, [['Am', AmV, 'A2', 0], ['D', DV, 'D3', 1], ['Am', AmV, 'A2', 2], ['D', DV, 'D3', 3]], { drums: rock, vel: 0.85 });
    a.ring(['F#'], a.w('why3', 'fingerprint'), v1, { color: GOLD });

    // why4: Get Lucky's four chord, E major with G#
    a.scale(S('why4').t0, 'B', DOR);
    const tE = a.w('why4', 'E') - 0.04, tG = a.w('why4', 'G');
    a.ch('Bm', S('why4').t0 + 0.1, tE, { notes: ['B3', 'D4', 'F#4'], bass: 'B2', vel: 0.7 });
    a.ch('E', tE, S('why4').t1 - 1.0, { notes: ['B3', 'E4', 'G#4'], bass: 'E2', vel: 0.9 });
    a.ch('Bm', S('why4').t1 - 1.0, S('why4').t1, { notes: ['B3', 'D4', 'F#4'], bass: 'B2', vel: 0.75 });
    a.ring(['G#'], tG, S('why4').t1, { color: GOLD });
    a.tag('G#', tG, S('why4').t1, 'RAISED 6TH', { color: GOLD });
    a.note('G#4', tG + 0.1, 0.9, { vel: 0.34 });

    // why5: still minor (F), but brighter (B) - the Dm6 chord holds both
    a.scale(S('why5').t0, 'D', DOR);
    const y0 = S('why5').t0 + 0.1, y1 = S('why5').t1;
    a.ch('Dm6', y0, y1, { notes: ['F3', 'A3', 'B3', 'D4'], bass: 'D2', vel: 0.75, strikes: [{ o: 0, v: 1 }, { o: 2.0, v: 0.5 }, { o: 4.0, v: 0.5 }] });
    a.tag('F', a.w('why5', 'minor'), y1, 'MINOR 3RD', { color: RED });
    a.tag('B', a.w('why5', 'brighter'), y1, 'BRIGHT 6TH', { color: GOLD });
    a.big('FOLK · JAZZ · FUNK', a.w('why5', 'Folk'), y1, { y: 445, size: 48, family: 'DM Mono', weight: 500, color: TEAL });
    const lick = ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'A4', 'F4', 'D4'];
    lick.forEach((n, i) => a.note(n, a.w('why5', 'brighter') + i * 0.2, 0.35, { vel: 0.22 }));

    // essence: the vamp one last time, landing on Dm6
    a.scale(S('essence').t0, 'D', DOR);
    const e0 = S('essence').t0 + 0.1, eL = e0 + 4.0;
    vamp(e0, eL, [['Dm7', Dm7, 'D2'], ['G', G, 'G2'], ['Dm7', Dm7, 'D2'], ['G', G, 'G2']], { drums: rock, vel: 0.85 });
    a.ch('Dm6', eL, S('essence').t1 - 0.3, { notes: ['F3', 'A3', 'B3', 'D4', 'F4'], bass: 'D2' });
    a.perc('kick', eL, 0.9);
    a.ring(['B'], eL, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
