// Modal jazz, through So What: one mode for many bars instead of racing chord changes.
// Copyrighted: the bass theme, the two-chord answer and the solos are never played. Only generic
// quartal ("So What") voicings, Dorian scales, a root-fifth pedal and original short motifs.
const B = 0.44, BAR = 4 * B;   // about 136 BPM

module.exports = {
  slug: 'so-what',
  title: 'Modal Jazz: So What',
  segments: [
    { id: 'hook',    text: 'Fewer chords, more space. This is modal jazz.' },
    { id: 'what',    text: 'Instead of racing through chord changes, you improvise on one mode.' },
    { id: 's1',      text: 'So What, by Miles Davis, from Kind of Blue, 1959.' },
    { id: 's1b',     text: 'Sixteen bars of D Dorian, eight of E flat Dorian, eight back on D.' },
    { id: 's2',      text: 'The bass states the theme, and the band answers with a two chord figure.' },
    { id: 's2b',     text: 'Pianist Bill Evans voiced it in stacked fourths: the So What chord.' },
    { id: 'why1',    text: 'So why does it work? In bebop, chords change every bar or two, and soloists race through them.' },
    { id: 'why2',    text: 'Modal jazz holds one mode for many bars.' },
    { id: 'why3',    text: 'D Dorian is just the white keys from D to D. Soloists explore the colours of one scale.' },
    { id: 'why4',    text: 'The So What chord stacks three perfect fourths, with a major third on top.' },
    { id: 'why4b',   text: 'Fourths sound open and ambiguous: neither clearly major nor minor.' },
    { id: 'why5',    text: 'The bridge shifts it all up a half step, to E flat Dorian: a sudden change of light.' },
    { id: 'essence', text: 'Hold one mode, leave space... and improvisation becomes exploration.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'FEWER CHORDS · MORE SPACE', title: 'MODAL JAZZ', accent: true, tonic: 2, lead: 0.5, min: 3 * BAR, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'ONE MODE', title: 'NO RACING', tonic: 2, tail: 1.2 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'So What', sub: 'Miles Davis · Kind of Blue · 1959', circle: false, tonic: 2, gap: 0.3, tail: 0.8 },
    { id: 's2', segs: ['s2'], label: 'THE TUNE', title: 'CALL AND ANSWER', circle: false, tonic: 2, tail: 0.4 },
    { id: 's2b', segs: ['s2b'], label: 'BILL EVANS · PIANO', title: 'THE SO WHAT CHORD', tonic: 2, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'BEBOP RACES', tonic: 10, row: ['Bbmaj7', 'G7', 'Cm7', 'F7'], tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'ONE MODE, MANY BARS', tonic: 2, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'D TO D', title: 'D DORIAN', tonic: 2, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'THE SO WHAT CHORD', title: 'STACKED FOURTHS', circle: false, tonic: 2, tail: 0.6 },
    { id: 'why4b', segs: ['why4b'], label: 'THE SO WHAT CHORD', title: 'OPEN SOUND', tonic: 2, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'THE BRIDGE', title: 'UP A HALF STEP', tonic: 2, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LEAVE SPACE', accent: true, tonic: 2, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', LILAC = '#8d98ff', GREY = '#9a9aa2';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const DOR = [0, 2, 3, 5, 7, 9, 10];
    // quartal voicings: three fourths + a major third on top
    const Q = {
      E: { name: 'Dm7', n: ['E3', 'A3', 'D4', 'G4', 'B4'], b: 'D2', f: 'A2', tonic: 2 },
      A: { name: 'Dm7', n: ['A3', 'D4', 'G4', 'C5', 'E5'], b: 'D2', f: 'A2', tonic: 2 },
      F: { name: 'Ebm7', n: ['F3', 'Bb3', 'Eb4', 'Ab4', 'C5'], b: 'Eb2', f: 'Bb2', tonic: 3 },
      Bb: { name: 'Ebm7', n: ['Bb3', 'Eb4', 'Ab4', 'Db5', 'F5'], b: 'Eb2', f: 'Bb2', tonic: 3 },
    };
    // soft ride (ding, ding-a) with a feathered kick and hi-hat foot on 2 and 4
    const ride = (t0, t1, vel = 1) => {
      for (let t = t0, i = 0; t < t1 - 0.1; t += B, i++) {
        a.perc('hat', t, 0.3 * vel); if (i % 2) { a.perc('hat', t + B * 2 / 3, 0.2 * vel); a.perc('snare', t, 0.08 * vel); }
        a.perc('kick', t, 0.12 * vel);
      }
    };
    // root-fifth pedal in half notes (generic two-beat bass)
    const pedal = (t0, t1, q, vel = 1) => {
      for (let t = t0, i = 0; t < t1 - 0.2; t += 2 * B, i++) a.note(i % 2 ? Q[q].f : Q[q].b, t, 2 * B * 0.9, { vel: 0.4 * vel, show: false, tonic: Q[q].tonic });
    };
    // a sustained quartal chord, re-struck sparsely
    const pad = (q, t0, t1, o = {}) => {
      const len = t1 - t0, strikes = [{ o: 0, v: 1 }];
      for (let s = o.every ?? 2 * BAR; s < len - 0.3; s += o.every ?? 2 * BAR) strikes.push({ o: s + B * 2 / 3, v: 0.7 });
      return a.ch(Q[q].name, t0, t1, { notes: Q[q].n, bass: false, vel: o.vel ?? 0.6, strikes, hideName: o.hideName ?? true, label: o.label, shape: o.shape, tonic: Q[q].tonic });
    };
    // an original wandering line in D Dorian: [note, beats]
    const LINE = [['A4', 1], ['C5', 0.67], ['D5', 0.33], ['E5', 1.5], [null, 0.5], ['D5', 0.67], ['B4', 0.33], ['A4', 1], ['G4', 2], [null, 1],
      ['F4', 0.67], ['G4', 0.33], ['A4', 1], ['C5', 1], ['B4', 2], [null, 1]];
    const line = (t0, shift = 0, vel = 0.34) => {
      let t = t0;
      for (const [n, b] of LINE) { if (n) a.note(a.T.midi(n) + shift, t, b * B * 0.92, { vel, tonic: 2 + shift }); t += b * B; }
      return t;
    };

    // ---- hook: D Dorian lights up, one open chord holds ----
    a.scale(0, 'D', DOR, { popIn: { t0: 0.02, step: 0.05 } });
    pad('E', 0.1, S('hook').t1, { vel: 0.6 });
    pedal(0.1, S('what').t0, 'E');
    ride(0.1, S('hook').t1, 0.8);
    a.big('D DORIAN', 0.1, S('hook').t1, { y: 830, size: 46, ...MONO, color: '#ffffff', blur: 14 });

    // ---- what: racing changes vs. one mode ----
    const w0 = S('what').t0, tRace = a.w('what', 'racing') - 0.05, tOne = a.w('what', 'one') - 0.05;
    const RACE = [['Dm7', 'D3'], ['G7', 'G2'], ['Cmaj7', 'C3'], ['A7', 'A2'], ['Dm7', 'D3'], ['G7', 'G2'], ['Cmaj7', 'C3'], ['A7', 'A2']];
    const rl = (tOne - tRace) / RACE.length;
    pad('E', w0, tRace, { vel: 0.45 });
    pedal(w0, tRace, 'E', 0.8);
    RACE.forEach(([c, b], i) => a.ch(c, tRace + i * rl, tRace + (i + 1) * rl, { bass: b, vel: 0.55, tonic: 2 }));
    a.big('CHANGE, CHANGE, CHANGE...', tRace, tOne, { ...TOP, color: PINK });
    a.walker(RACE.map(([c], i) => [tRace + i * rl, c.replace(/m7|maj7|7/, '')]), { t1: tOne, dr: 34, color: PINK });
    pad('E', tOne, S('what').t1, { vel: 0.6 });
    pedal(tOne, S('what').t1, 'E');
    a.big('ONE MODE', tOne, S('what').t1, { ...TOP, color: TEAL });
    line(a.w('what', 'mode') + 0.2);
    ride(w0, S('what').t1, 0.8);

    // ---- s1: the AABA form ----
    const s0 = S('s1').t0, s1e = S('s1').t1;
    const FORM = [['D', 'A · 8 BARS', TEAL], ['D', 'A · 8 BARS', TEAL], ['Eb', 'B · 8 BARS', GOLD], ['D', 'A · 8 BARS', TEAL]];
    const gF = a.grid(FORM.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 72, subSize: 24 })), s0, s1e, { rows: 1, cols: 4, cw: 240, chh: 260, y: 560, revealStep: 0.12, caption: 'AABA · 32 BARS · DORIAN' });
    const tSix = a.w('s1b', 'Sixteen') - 0.05, tEb = a.w('s1b', 'eight') - 0.05, tBack = a.w('s1b', 'eight', 1) - 0.05;
    gF.active.push({ t0: tSix, t1: tEb, i: 0 }, { t0: tSix, t1: tEb, i: 1 }, { t0: tEb, t1: tBack, i: 2 }, { t0: tBack, t1: s1e, i: 3 });
    a.big('16 BARS', tSix, tEb, { y: 1000, size: 54, ...MONO, color: TEAL });
    a.big('8 BARS, HALF STEP UP', tEb, tBack, { y: 1000, size: 46, ...MONO, color: GOLD });
    a.big('8 BARS, HOME', tBack, s1e, { y: 1000, size: 54, ...MONO, color: TEAL });
    pad('E', s0, tEb, { vel: 0.55 }); pedal(s0, tEb, 'E');
    pad('F', tEb, tBack, { vel: 0.55 }); pedal(tEb, tBack, 'F');
    pad('E', tBack, s1e, { vel: 0.55 }); pedal(tBack, s1e, 'E');
    ride(s0, s1e);

    // ---- s2: bass and band, call and answer (named only, not played) ----
    const c0 = S('s2').t0;
    const CA = [{ label: 'BASS', sub: 'STATES THE THEME', color: PINK, size: 64 }, { label: 'BAND', sub: 'ANSWERS · 2 CHORDS', color: TEAL, size: 64 }];
    const gC = a.grid(CA, c0, S('s2').t1, { rows: 2, cols: 1, cw: 600, chh: 220, y: 520 });
    gC.active.push({ t0: a.w('s2', 'bass') - 0.1, t1: a.w('s2', 'band') - 0.1, i: 0 }, { t0: a.w('s2', 'band') - 0.1, t1: S('s2').t1, i: 1 });
    pad('E', c0, S('s2').t1, { vel: 0.4 }); pedal(c0, S('s2').t1, 'E'); ride(c0, S('s2').t1, 0.8);

    // ---- s2b: the So What chord on the circle ----
    const e0 = S('s2b').t0, tFour = a.w('s2b', 'fourths') - 0.1;
    a.scale(e0, 'D', DOR);
    pad('E', e0, tFour, { vel: 0.4 });
    const SWN = ['E3', 'A3', 'D4', 'G4', 'B4'];
    SWN.forEach((n, i) => a.note(n, tFour + i * 0.16, 1.2, { vel: 0.32, tonic: 2 }));
    pad('E', tFour + 0.8, S('s2b').t1, { vel: 0.6, hideName: false, label: '4THS' });
    pedal(e0, S('s2b').t1, 'E'); ride(e0, S('s2b').t1, 0.8);

    // ---- why1: bebop, a new chord every bar ----
    const b0 = S('why1').t0, BB = 0.3, BBAR = 4 * BB;
    a.scale(b0, 'Bb', a.T.MAJOR);
    const BOP = [['Bbmaj7', 'Bb2'], ['G7', 'G2'], ['Cm7', 'C3'], ['F7', 'F2']];
    const bop = [];
    for (let t = b0 + 0.05, i = 0; t < S('why1').t1 - 0.3; t += BBAR, i++) {
      const [c, bs] = BOP[i % 4], t1 = Math.min(t + BBAR, S('why1').t1);
      bop.push(a.ch(c, t, t1, { bass: bs, row: i % 4, vel: 0.65, strikes: [{ o: 0, v: 1 }, { o: BB * 1.67, v: 0.6 }].filter(s => s.o < t1 - t) }));
      for (let k = 0; k < 4; k++) { if (t + k * BB > S('why1').t1 - 0.1) break; a.perc('hat', t + k * BB, 0.3); a.perc('hat', t + k * BB + BB * 2 / 3, 0.18); }
    }
    a.walker(bop.map(c => [c.t0, c.root]), { t1: S('why1').t1, dr: 34, color: PINK, label: 'ROOT', labelDr: 82 });
    a.big('A NEW CHORD EVERY BAR', a.w('why1', 'change'), S('why1').t1, { y: 1100, size: 40, ...MONO, color: PINK });

    // ---- why2: one mode, held ----
    const h0 = S('why2').t0;
    a.scale(h0, 'D', DOR);
    pad('E', h0 + 0.05, S('why2').t1, { vel: 0.6, hideName: false, label: 'D Dorian' });
    pedal(h0 + 0.05, S('why2').t1, 'E'); ride(h0 + 0.05, S('why2').t1);
    a.big('ONE MODE · MANY BARS', a.w('why2', 'holds'), S('why2').t1, { ...TOP, color: TEAL });
    line(a.w('why2', 'many'), 0, 0.3);

    // ---- why3: D Dorian = white keys from D to D, then an original line ----
    const d0 = S('why3').t0, tW = a.w('why3', 'white') - 0.1;
    a.scale(d0, 'D', DOR);
    a.ch('Dm7', d0, S('why3').t1, { notes: ['D3', 'A3'], bass: 'D2', vel: 0.35, hideName: true, shape: false, tonic: 2 });
    ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5'].forEach((n, i) => a.note(n, tW + i * 0.22, 0.4, { vel: 0.32, tonic: 2 }));
    a.walker(['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D'].map((n, i) => [tW + i * 0.22, n]), { t1: a.w('why3', 'explore'), dr: 34, color: '#ffffff', label: 'WHITE KEYS', labelDr: 82 });
    a.big('D  →  D', tW, a.w('why3', 'explore'), { ...TOP, size: 56, color: '#ffffff' });
    a.big('ONE SCALE, MANY COLOURS', a.w('why3', 'explore'), S('why3').t1, { ...TOP, color: TEAL });
    line(a.w('why3', 'explore'), 0, 0.34);
    ride(d0, S('why3').t1, 0.7);

    // ---- why4: build the chord bottom-up: E A D G + B ----
    const f0 = S('why4').t0;
    const ST = [['B', 'MAJOR 3RD', GOLD], ['G', '4TH', TEAL], ['D', '4TH', TEAL], ['A', '4TH', TEAL], ['E', 'BASE', GREY]];
    const gS = a.grid(ST.map(([n, s, c]) => ({ label: n, sub: s, color: c, size: 56, subSize: 22 })), f0, S('why4').t1, { rows: 5, cols: 1, cw: 420, chh: 120, y: 450 });
    const tStack = a.w('why4', 'stacks') - 0.05, tTop = a.w('why4', 'major') - 0.05;
    const stepT = [tStack, tStack + 0.45, tStack + 0.9, a.w('why4', 'fourths') - 0.05, tTop];
    SWN.forEach((n, i) => {
      a.note(n, stepT[i], S('why4').t1 - stepT[i] - 0.1, { vel: 0.3, tonic: 2 });
      gS.active.push({ t0: stepT[i], t1: S('why4').t1, i: 4 - i });
    });
    a.big('3 × 4TH', tStack + 0.9, tTop, { x: 860, y: 860, size: 44, ...MONO, color: TEAL });
    a.big('+ 3RD', tTop, S('why4').t1, { x: 860, y: 508, size: 44, ...MONO, color: GOLD });
    a.note('D2', f0 + 0.05, S('why4').t1 - f0 - 0.2, { vel: 0.3, show: false });

    // ---- why4b: open, ambiguous: quartal shapes planing inside D Dorian ----
    const o0 = S('why4b').t0, tAmb = a.w('why4b', 'neither') - 0.05;
    a.scale(o0, 'D', DOR);
    pad('E', o0 + 0.05, tAmb, { vel: 0.6, hideName: false, label: '4THS' });
    pad('A', tAmb, S('why4b').t1 - 0.9, { vel: 0.55, hideName: false, label: '4THS' });
    pad('E', S('why4b').t1 - 0.9, S('why4b').t1, { vel: 0.5, hideName: false, label: '4THS' });
    pedal(o0 + 0.05, S('why4b').t1, 'E'); ride(o0 + 0.05, S('why4b').t1, 0.8);
    a.big('OPEN', a.w('why4b', 'open'), tAmb, { ...TOP, size: 56, color: TEAL });
    a.big('MAJOR?  MINOR?  NEITHER', tAmb, S('why4b').t1, { ...TOP, size: 40, color: GOLD });

    // ---- why5: everything up a half step to E flat Dorian ----
    const u0 = S('why5').t0, tUp = a.w('why5', 'half') - 0.1;
    a.scale(u0, 'D', DOR);
    pad('E', u0 + 0.05, tUp, { vel: 0.55 }); pedal(u0 + 0.05, tUp, 'E');
    a.scale(tUp, 'Eb', DOR);
    pad('F', tUp, S('why5').t1, { vel: 0.65 }); pedal(tUp, S('why5').t1, 'F');
    a.arc('D', 'Eb', tUp, S('why5').t1, { steps: 1, color: GOLD, dr: 34, label: 'HALF STEP', labelR: 390 });
    a.big('D DORIAN', u0 + 0.2, tUp, { y: 830, size: 46, ...MONO, color: '#ffffff', blur: 14 });
    a.big('Eb DORIAN', tUp + 0.4, S('why5').t1, { y: 830, size: 46, ...MONO, color: GOLD, blur: 14 });
    a.big('A CHANGE OF LIGHT', a.w('why5', 'sudden'), S('why5').t1, { ...TOP, color: GOLD });
    ride(u0 + 0.05, S('why5').t1, 0.9);

    // ---- essence: home on D Dorian, the line once more, a final open chord ----
    const z0 = S('essence').t0;
    a.scale(z0, 'D', DOR);
    pad('E', z0 + 0.05, S('essence').t1 - 0.2, { vel: 0.6, every: 3 * BAR });
    pedal(z0 + 0.05, S('essence').t1 - 2.4, 'E');
    a.note('D2', S('essence').t1 - 2.4, 2.2, { vel: 0.4, show: false });
    ride(z0 + 0.05, S('essence').t1 - 2.4, 0.8);
    line(z0 + 0.3, 0, 0.3);
    a.big('D DORIAN', z0 + 0.2, S('essence').t1, { y: 830, size: 46, ...MONO, color: '#ffffff', blur: 14 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
