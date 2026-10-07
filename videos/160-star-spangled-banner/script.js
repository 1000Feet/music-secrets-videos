// Why the Star-Spangled Banner is so hard to sing: a borrowed club song with a range of a twelfth.
// Brief/copyright: the only melody played is the public-domain opening, in C:
// G3 E3 C3 E3 G3 C4 ("O say can you see"), also transposed to B flat once (lower key).
// Everything else is our own chords, our own short melisma-like run, and visuals
// (the high note on "free" is shown on the keyboard, never played as melody).
const OPEN = [['G3', 0.75], ['E3', 0.25], ['C3', 1], ['E3', 1], ['G3', 1], ['C4', 2]]; // pickup + 3/4 bar + long note

module.exports = {
  slug: 'star-spangled-banner',
  title: 'The Star-Spangled Banner',
  segments: [
    { id: 'hook',     text: 'Why is the Star-Spangled Banner so hard to sing?' },
    { id: 'what',     text: 'The words are by Francis Scott Key, 1814...' },
    { id: 'what2',    text: 'written after watching the bombardment of Fort McHenry.' },
    { id: 'tune',     text: 'But the tune was borrowed: To Anacreon in Heaven, by John Stafford Smith...' },
    { id: 'tune2',    text: 'written for the Anacreontic Society, a London music club.' },
    { id: 'tune3',    text: 'Often called a drinking song.' },
    { id: 'official', text: 'In 1931, it became the official US national anthem.' },
    { id: 'why0',     text: 'So why is it so hard?' },
    { id: 'why1',     text: 'It opens by tracing the major chord...' },
    { id: 'why1b',    text: 'down and back up, past where it started.' },
    { id: 'why2',     text: 'Later, it climbs even higher.' },
    { id: 'why3',     text: 'In all, it spans an octave and a fifth, a twelfth...' },
    { id: 'why3b',    text: 'wider than most untrained voices are comfortable with.' },
    { id: 'why4',     text: 'And the highest note comes near the end, on land of the free.' },
    { id: 'why4b',    text: 'Start too high, and you run out of voice.' },
    { id: 'why5',     text: "That's why singers often choose a lower key..." },
    { id: 'why5b',    text: 'or embellish it with melismas... see our melisma video.' },
    { id: 'essence',  text: 'A twelfth of range, and the high note saved for last. A real vocal obstacle course.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE US NATIONAL ANTHEM', title: 'SO HARD TO SING', accent: true, tonic: 0, min: 5.0 },
    { id: 'words', segs: ['what', 'what2'], label: 'THE WORDS', title: 'FRANCIS SCOTT KEY', circle: false, tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'tune', segs: ['tune', 'tune2', 'tune3'], label: 'THE MELODY', title: 'To Anacreon in Heaven', sub: 'John Stafford Smith · in C', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'official', segs: ['official'], label: 'OFFICIAL', title: 'THE US ANTHEM', circle: false, tonic: 0, tail: 1.5 },
    { id: 'why1', segs: ['why0', 'why1', 'why1b'], label: 'WHY IT IS HARD', title: 'DOWN, THEN UP', tonic: 0, gap: 0.25, tail: 1.2 },
    { id: 'why2', segs: ['why2', 'why3', 'why3b'], label: 'WHY IT IS HARD', title: 'A TWELFTH', circle: false, tonic: 0, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT IS HARD', title: 'THE HIGH NOTE', circle: false, tonic: 0, gap: 0.3, tail: 1.8 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'THE SOLUTION', title: 'GO LOWER', circle: false, tonic: 10, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'AN OBSTACLE COURSE', accent: true, tonic: 0, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const T = a.T;
    const pcOf = n => n.replace(/-?\d/, '');
    const tr = (n, k) => { const m = T.midi(n) + k; return T.NAMES[T.mod(m, 12)] + (Math.floor(m / 12) - 1); };

    // keyboard geometry (same as the player): range bars sit just above the keys
    const WH = []; for (let m = 36; m <= 79; m++) if (![1, 3, 6, 8, 10].includes(m % 12)) WH.push(m);
    const KW = 1020 / WH.length;
    const keyL = m => (WH.includes(m) ? 30 + WH.indexOf(m) * KW : 30 + WH.indexOf(m - 1) * KW + KW * 0.68);
    const keyR = m => (WH.includes(m) ? keyL(m) + KW : keyL(m) + KW * 0.64);
    function bar(lo, hi, t0, t1, o = {}) {
      const l = keyL(T.midi(lo)), r = keyR(T.midi(hi)), h = o.h ?? 58, y = o.y ?? 1195 - h - 22;
      const g = a.grid([{ label: o.label ?? '', size: o.size ?? 24, color: o.color ?? GOLD }], t0, t1,
        { rows: 1, cols: 1, cw: r - l + 16, chh: h + 16, x: (l + r) / 2, y });
      if (o.on !== false) g.active.push({ t0, t1: o.onT1 ?? t0 + 0.6, i: 0 });
      return g;
    }

    // the opening (public domain): G E | C E G | C - , one chord of C underneath
    function opening(t0, b, o = {}) {
      const k = o.shift ?? 0, pts = [];
      let t = t0;
      OPEN.forEach(([n, d]) => { const m = tr(n, k); a.note(m, t, d * b * 0.95, { vel: o.vel ?? 0.45 }); pts.push([t, pcOf(m), m]); t += d * b; });
      const root = tr('C4', k).replace(/-?\d/, ''), triad = ['C4', 'E4', 'G4'].map(n => tr(n, k));
      a.ch(root, t0, t, { notes: o.low ? triad.map(n => tr(n, -12)) : triad, bass: tr('C2', k), vel: o.chVel ?? 0.28, hideName: o.hideName, shape: o.shape,
        strikes: [{ o: 0, v: 0.6 }, { o: b, v: 1 }, { o: 2 * b, v: 0.4 }, { o: 3 * b, v: 0.4 }, { o: 4 * b, v: 0.9 }] });
      return { end: t, pts };
    }
    // our own chords in 3/4, one per bar (beats 1, 2, 3)
    const VO = { C: ['E3', 'G3', 'C4'], F: ['F3', 'A3', 'C4'], G: ['D3', 'G3', 'B3'], G7: ['D3', 'F3', 'B3'], Am: ['E3', 'A3', 'C4'], Dm: ['F3', 'A3', 'D4'] };
    const BS = { C: 'C2', F: 'F2', G: 'G2', G7: 'G2', Am: 'A2', Dm: 'D2' };
    function bars3(t0, t1, prog, b, o = {}) {
      for (let i = 0, t = t0; t < t1 - 0.3; t += 3 * b, i++) {
        const c = prog[i % prog.length], end = Math.min(t + 3 * b, t1);
        a.ch(c, t, end,
          { notes: VO[c], bass: BS[c], vel: o.vel ?? 0.38, hideName: o.hideName, shape: o.shape,
            strikes: [0, 1, 2].filter(j => t + j * b < end - 0.05).map(j => ({ o: j * b, v: j ? 0.42 : 1 })) });
      }
    }

    // ---- hook (cover): the opening on the circle ----
    a.scale(0.1, 'C', T.MAJOR, { popIn: { t0: 0.12, step: 0.05 } });
    const h1 = S('hook').t1;
    const ho = opening(0.25, 0.5, { vel: 0.46 });
    a.walker(ho.pts.map(([t, p]) => [t, p]), { t1: h1, dr: -40, color: WHITE });
    a.big('O SAY CAN YOU SEE', 0.15, h1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.tag('G', 0.3, h1, 'START', { dr: -92, color: TEAL });
    bars3(ho.end, h1, ['F', 'G7', 'C'], 0.5, { vel: 0.3 });

    // ---- words: Francis Scott Key, 1814, Fort McHenry ----
    const w0 = S('words').t0, w1 = S('words').t1;
    const tFort = a.w('what2', 'bombardment') - 0.05;
    a.big('1814', w0 + 0.2, w1, { y: 640, size: 190, color: WHITE, blur: 24 });
    a.big('THE BOMBARDMENT OF', tFort, w1, { y: 830, size: 40, ...MONO, color: GREY, blur: 0 });
    a.big('FORT McHENRY', a.w('what2', 'Fort') - 0.05, w1, { y: 910, size: 76, color: RED, blur: 22 });
    a.big('O SAY CAN YOU SEE', w0 + 0.5, w1, { y: 1040, size: 40, ...MONO, color: GOLD, blur: 8 });
    bars3(w0 + 0.1, tFort, ['C', 'F', 'G', 'C'], 0.55, { vel: 0.32, shape: false });
    for (let k = 0; k < 6; k++) a.perc('kick', tFort + k * 0.42 + (k % 2) * 0.08, 0.75 - k * 0.08);
    a.ch('Am', tFort, w1 - 0.05, { notes: ['A2', 'E3', 'A3', 'C4'], bass: 'A1', vel: 0.32, shape: false, hideName: true });

    // ---- tune: To Anacreon in Heaven - the same opening ----
    const u0 = S('tune').t0, u1 = S('tune').t1;
    a.scale(u0, 'C', T.MAJOR);
    const tTo = a.w('tune', 'To') - 0.05;
    bars3(u0 + 0.1, tTo, ['C'], 0.5, { vel: 0.25 });
    const uo = opening(tTo, 0.5, { vel: 0.45 });
    a.walker(uo.pts.map(([t, p]) => [t, p]), { t1: u1, dr: -40, color: WHITE });
    bars3(uo.end, u1, ['F', 'C', 'G7', 'C', 'F', 'G7', 'C'], 0.5, { vel: 0.34 });
    a.big('BORROWED', a.w('tune', 'borrowed') - 0.05, a.at('tune2') - 0.05, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('A LONDON MUSIC CLUB', a.w('tune2', 'London') - 0.05, a.at('tune3') - 0.05, { y: 462, size: 46, ...MONO, color: TEAL, blur: 10 });
    a.big('A DRINKING SONG?', a.at('tune3') - 0.05, u1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    for (let t = a.at('tune3'); t < u1 - 0.3; t += 1.5) { a.perc('kick', t, 0.4); a.perc('hat', t + 0.5, 0.3); a.perc('hat', t + 1.0, 0.3); }

    // ---- official: 1931 ----
    const f0 = S('official').t0, f1 = S('official').t1;
    const gY = a.grid([{ label: '1814', sub: 'THE WORDS', size: 76, subSize: 22, color: BLUE }, { label: '1931', sub: 'NATIONAL ANTHEM', size: 76, subSize: 22, color: GOLD }],
      f0 + 0.1, f1, { rows: 1, cols: 2, cw: 440, chh: 300, y: 560, revealStep: 0.2 });
    const t31 = a.w('official', '1931') - 0.05;
    gY.active.push({ t0: f0 + 0.1, t1: t31, i: 0 }, { t0: t31, t1: f1, i: 1 });
    a.big('OFFICIAL', a.w('official', 'official') - 0.05, f1, { y: 960, size: 70, color: GOLD, blur: 20 });
    bars3(f0 + 0.1, f1, ['C', 'F', 'G7', 'C'], 0.5, { vel: 0.38, shape: false });
    for (let t = f0 + 0.1; t < f1 - 0.3; t += 0.5) a.perc('snare', t, 0.2);

    // ---- why1: 5 3 1 3 5 8 on the circle ----
    const d0 = S('why1').t0, d1 = S('why1').t1;
    a.scale(d0, 'C', T.MAJOR);
    const tOp = a.w('why1', 'tracing') - 0.1;
    const dob = Math.min(0.62, (a.w('why1b', 'past') + 0.6 - tOp) / 6);
    const dop = opening(tOp, dob, { vel: 0.46 });
    a.walker(dop.pts.map(([t, p]) => [t, p]), { t1: d1, dr: -40, color: GOLD });
    const DEG = ['5', '3', '1', '3', '5', '8'];
    dop.pts.forEach(([t, p], i) => a.tag(p, t, i < 5 ? dop.pts[i + 1][0] : d1, DEG[i], { dr: -108, color: i === 5 ? GOLD : WHITE }));
    a.big('DOWN THE CHORD', a.w('why1b', 'down') - 0.05, a.w('why1b', 'back') - 0.05, { y: 462, size: 46, ...MONO, color: TEAL, blur: 10 });
    a.big('BACK UP', a.w('why1b', 'back') - 0.05, a.w('why1b', 'past') - 0.05, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('PAST THE START', a.w('why1b', 'past') - 0.05, d1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.arc('G', 'C', dop.pts[5][0], d1, { steps: 5, color: GOLD, dr: 30 });
    a.ch('C', dop.end, d1 - 0.05, { notes: ['C3', 'E3', 'G3', 'C4'], bass: 'C2', vel: 0.3 });
    bars3(d0 + 0.1, tOp, ['C'], 0.5, { vel: 0.22, shape: false });

    // ---- why2/why3: the range bar grows to a twelfth ----
    const r0 = S('why2').t0, r1 = S('why2').t1;
    const ro = opening(r0 + 0.15, 0.42, { vel: 0.44 });
    bar('C3', 'C4', r0 + 0.15, r1, { label: 'OPENING · OCTAVE', color: TEAL, onT1: ro.end });
    const tHi = a.w('why2', 'higher') - 0.05;
    // "climbs higher": our own chords, voiced higher and higher (no melody)
    const CL = [['C', ['C4', 'E4', 'G4']], ['F', ['C4', 'F4', 'A4']], ['G', ['D4', 'G4', 'B4']], ['C', ['E4', 'G4', 'C5']]];
    const c0 = Math.max(ro.end, tHi), cl = 0.5;
    CL.forEach(([c, n], i) => a.ch(c, c0 + i * cl, c0 + (i + 1) * cl, { notes: n, bass: BS[c], vel: 0.34, shape: false }));
    bar('C4', 'G4', tHi, r1, { label: 'LATER', color: GOLD, y: 1195 - 58 - 22 - 82, onT1: tHi + 1.5 });
    const tTw = a.w('why3', 'octave') - 0.05;
    bar('C3', 'G4', tTw, r1, { label: 'OCTAVE + FIFTH = A TWELFTH', color: RED, y: 1195 - 58 - 22 - 164, size: 22, onT1: r1 });
    a.ch('C', c0 + 4 * cl, r1 - 0.05, { notes: ['C3', 'G3', 'E4', 'G4'], bass: 'C2', vel: 0.32, shape: false, hideName: true,
      strikes: [{ o: 0, v: 1 }, { o: 1.5, v: 0.5 }, { o: 3, v: 0.5 }] });
    a.big('THE OPENING', r0 + 0.2, tHi, { y: 560, size: 80, color: TEAL, blur: 20 });
    a.big('CLIMBS HIGHER', tHi, tTw, { y: 560, size: 80, color: GOLD, blur: 20 });
    a.big('C TO G', tTw, r1, { y: 560, size: 96, color: WHITE, blur: 20 });
    a.big('19 HALF STEPS', a.w('why3', 'twelfth') - 0.05, r1, { y: 660, size: 40, ...MONO, color: GREY, blur: 0 });
    a.big('WIDER THAN MOST', a.w('why3b', 'wider') - 0.05, r1, { y: 760, size: 52, color: RED, blur: 16 });
    a.big('UNTRAINED VOICES FIND COMFORTABLE', a.w('why3b', 'untrained') - 0.05, r1, { y: 830, size: 36, ...MONO, color: RED, blur: 0 });

    // ---- why4: the highest note, near the end ----
    const q0 = S('why4').t0, q1 = S('why4').t1;
    const tStart = a.at('why4b') - 0.05;
    const SONG = [...Array(10)].map((_, i) => ({ label: i === 0 ? 'O SAY' : i === 8 ? 'FREE' : '', size: i === 8 ? 30 : 22, color: i === 8 ? RED : GREY }));
    const gS = a.grid(SONG, q0 + 0.1, tStart, { rows: 1, cols: 10, cw: 96, chh: 110, y: 560, revealStep: 0.05, caption: 'THE SONG, START TO END' });
    const tEnd = a.w('why4', 'end') - 0.05, tFree = a.w('why4', 'free') - 0.05;
    for (let i = 0; i < 10; i++) gS.active.push({ t0: q0 + 0.2 + i * Math.min(0.35, (tEnd - q0) / 10), t1: q0 + 0.2 + (i + 1) * Math.min(0.35, (tEnd - q0) / 10), i });
    gS.active.push({ t0: tEnd, t1: tStart, i: 8 });
    a.big('HIGHEST NOTE', tEnd, tStart, { y: 820, size: 64, color: RED, blur: 18 });
    a.big('LAND OF THE FREE', tFree, tStart, { y: 900, size: 40, ...MONO, color: RED, blur: 0 });
    bar('C3', 'G4', q0 + 0.1, tStart, { label: 'IN C', color: GOLD, on: false });
    const kc = n => (keyL(T.midi(n)) + keyR(T.midi(n))) / 2;
    bar('G4', 'G4', tEnd, tStart, { label: '', color: RED, y: 1195 - 58 - 22 - 82, onT1: tStart });
    a.big('FREE', tEnd, tStart, { x: kc('G4'), y: 1012, size: 26, ...MONO, color: RED, blur: 0 });
    bars3(q0 + 0.1, tEnd, ['C', 'F', 'C', 'G7'], 0.5, { vel: 0.32, shape: false });
    a.ch('C', tEnd, tStart, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.36, shape: false }); // G4 on top of a chord: shown, not sung
    // start too high: the whole range shifts up a major third, past the top
    const SH = 4;
    bar('E3', 'B4', tStart, q1, { label: 'START TOO HIGH · IN E', color: GOLD, size: 22, onT1: q1 });
    bar('B4', 'B4', tStart + 0.3, q1, { color: RED, y: 1195 - 58 - 22 - 82, onT1: q1 });
    a.big('FREE', tStart + 0.3, q1, { x: kc('B4'), y: 1012, size: 26, ...MONO, color: RED, blur: 0 });
    a.big('START TOO HIGH', tStart, q1, { y: 640, size: 72, color: GOLD, blur: 20 });
    a.big('NOW THE TOP IS B', tStart + 0.3, q1, { y: 900, size: 40, ...MONO, color: RED, blur: 0 });
    a.big('YOU RUN OUT OF VOICE', a.w('why4b', 'run') - 0.05, q1, { y: 760, size: 52, color: RED, blur: 18 });
    opening(tStart + 0.1, 0.4, { vel: 0.4, shift: SH });
    a.ch('E', tStart + 0.1 + 5 * 0.4, q1 - 0.05, { notes: ['G#4', 'B4', 'E5'], bass: 'E2', vel: 0.3, shape: false });

    // ---- why5: a lower key (B flat), or melismas ----
    const v0 = S('why5').t0, v1 = S('why5').t1;
    const tLow = a.w('why5', 'lower') - 0.05;
    bar('C3', 'G4', v0 + 0.1, v1, { label: 'IN C', color: GREY, on: false });
    a.big('IN C: UP TO G', v0 + 0.2, tLow, { y: 640, size: 64, ...MONO, color: GREY, blur: 0 });
    bar('Bb2', 'F4', tLow, v1, { label: 'IN Bb · LOWER', color: TEAL, onT1: v1, y: 1195 - 58 - 22 - 82 });
    const vo = opening(tLow, 0.42, { vel: 0.44, shift: -2 });
    const tMel = a.w('why5b', 'melismas') - 0.05;
    a.big('A LOWER KEY', tLow, tMel, { y: 640, size: 80, color: TEAL, blur: 22 });
    a.big('MELISMAS', tMel, v1, { y: 640, size: 90, color: GOLD, blur: 24 });
    a.big('MANY NOTES · ONE SYLLABLE', tMel + 0.2, v1, { y: 740, size: 34, ...MONO, color: GOLD, blur: 0 });
    a.big('SEE OUR MELISMA VIDEO', a.w('why5b', 'see') - 0.05, v1, { y: 840, size: 34, ...MONO, color: WHITE, blur: 0 });
    // our own short run on one syllable, over a B flat chord
    const RUN = ['D4', 'Eb4', 'F4', 'Eb4', 'D4', 'C4', 'D4'];
    const m0 = Math.max(vo.end, tMel);
    RUN.forEach((n, i) => a.note(n, m0 + i * 0.13, i === 6 ? 0.8 : 0.12, { vel: 0.36 }));
    a.ch('Bb', m0, v1 - 0.05, { notes: ['D3', 'F3', 'Bb3'], bass: 'Bb1', vel: 0.32, shape: false });

    // ---- essence: down the chord, back up, and the high note last ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'C', T.MAJOR);
    const eo = opening(e0 + 0.15, 0.5, { vel: 0.46 });
    a.walker(eo.pts.map(([t, p]) => [t, p]), { t1: e1, dr: -40, color: GOLD });
    const tSav = a.w('essence', 'high') - 0.05;
    const EC = [['F', ['C4', 'F4', 'A4'], 'F2'], ['G7', ['D4', 'F4', 'B4'], 'G2'], ['C', ['E4', 'G4', 'C5'], 'C2']];
    const ec0 = Math.max(eo.end, tSav - 1.0);
    EC.forEach(([c, n, bs], i) => a.ch(c, ec0 + i * 0.6, i < 2 ? ec0 + (i + 1) * 0.6 : e1 - 0.3, { notes: n, bass: bs, vel: 0.42 }));
    a.ring(['G'], tSav, e1, { color: RED });
    a.tag('G', tSav, e1, 'HIGH NOTE', { dr: -92, color: RED });
    a.big('A TWELFTH OF RANGE', a.w('essence', 'twelfth') - 0.05, tSav, { y: 462, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.big('HIGH NOTE LAST', tSav, e1, { y: 462, size: 46, ...MONO, color: RED, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
