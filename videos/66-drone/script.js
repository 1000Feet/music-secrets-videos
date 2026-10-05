// The drone: one note held under everything, so every melody note becomes a colour against it.
// Amazing Grace (New Britain, 1829) is public domain and is played in A over an A drone.
// Tomorrow Never Knows is named only: the audio there is just a generic C drone.
module.exports = {
  slug: 'drone',
  title: 'The Drone',
  segments: [
    { id: 'hook',    text: 'One note that never moves... and it makes every other note glow.' },
    { id: 'what',    text: "That's a drone: one note held underneath, while the melody moves above it." },
    { id: 'grace',   text: "It's Amazing Grace on the bagpipes, with drones tuned to A under the melody..." },
    { id: 'tanpura', text: 'the tanpura in Indian classical music, holding home and the fifth under every raga...' },
    { id: 'tnk',     text: 'and Tomorrow Never Knows by The Beatles, which sits on a single C drone.' },
    { id: 'why1',    text: 'So why does it work? A drone fixes home permanently: you never forget where the tonic is.' },
    { id: 'why2',    text: 'Every melody note is heard against it. The fifth sounds sweet, the octave pure...' },
    { id: 'why2b',   text: 'the second rubs, and the tritone grinds.' },
    { id: 'why3',    text: 'The drone turns each interval into a colour.' },
    { id: 'why4',    text: "It's one of the oldest forms of harmony: bagpipes, the hurdy gurdy, early medieval organum." },
    { id: 'why5',    text: "A held bass note under changing chords is called a pedal point, after the organ's pedals." },
    { id: 'essence', text: 'One note that never moves... and every other note discovers its own colour against it.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE NOTE', title: 'THE DRONE', accent: true, tonic: 0, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'HELD UNDERNEATH', title: 'THE DRONE', tonic: 0, tail: 1.0 },
    { id: 'grace', segs: ['grace'], label: 'YOU HEAR IT IN', title: 'Amazing Grace', sub: 'Bagpipes · New Britain · 1829 · in A', tonic: 9, tail: 3.6 },
    { id: 'tanpura', segs: ['tanpura'], label: 'YOU HEAR IT IN', title: 'The Tanpura', sub: 'Indian classical music', tonic: 0, tail: 2.6 },
    { id: 'tnk', segs: ['tnk'], label: 'YOU HEAR IT IN', title: 'Tomorrow Never Knows', sub: 'The Beatles · 1966 · on C', tonic: 0, tail: 2.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'HOME IS FIXED', tonic: 0, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'AGAINST THE DRONE', title: 'EVERY INTERVAL', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'why3', segs: ['why3'], label: 'AGAINST THE DRONE', title: 'TWELVE COLOURS', tonic: 0, tail: 2.2 },
    { id: 'why4', segs: ['why4'], label: 'ONE OF THE OLDEST', title: 'ANCIENT HARMONY', tonic: 2, circle: false, tail: 1.2 },
    { id: 'why5', segs: ['why5'], label: 'IN THE BASS', title: 'PEDAL POINT', tonic: 0, row: ['C', 'F/C', 'G/C', 'C'], tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE NOTE, EVERY COLOUR', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // a sustained drone: soft notes re-struck so the piano never dies away
    const drone = (notes, t0, t1, vel = 0.2, every = 1.2) => {
      for (let t = t0; t < t1 - 0.2; t += every) notes.forEach(n => a.note(n, t, Math.min(every + 0.3, t1 - t), { vel, show: false }));
    };
    const sing = (list, t0, beat, vel = 0.32) => a.melody(list, t0, beat, { vel });

    // ---- hook: a C drone, then a few notes glow against it ----
    a.scale(0.2, 'C', [0], { popIn: { t0: 0.3, step: 0.2 } });
    drone(['C2', 'C3'], 0.3, S('what').t1, 0.22);
    a.ring(['C'], 0.4, S('what').t1, { color: GOLD });
    a.tag('C', 1.0, S('what').t1, 'DRONE', { color: GOLD });
    a.scale(2.0, 'C', [0, 2, 4, 7, 9], { popIn: { t0: 2.0, step: 0.25 } });
    sing([['G4', 1], ['E4', 1], ['D4', 1], ['C4', 1], ['A4', 2]], 2.0, 0.42, 0.3);
    a.walker([[2.0, 'G'], [2.42, 'E'], [2.84, 'D'], [3.26, 'C'], [3.68, 'A']], { t1: S('hook').t1, dr: 34, color: '#ffffff' });

    // ---- what: held underneath, the melody moves above ----
    const tM = a.w('what', 'melody');
    a.walker([[a.at('what') + 0.2, 'C'], [tM, 'E'], [tM + 0.45, 'G'], [tM + 0.9, 'A'], [tM + 1.35, 'G'], [tM + 1.8, 'E'], [tM + 2.25, 'D'], [tM + 2.7, 'E']],
      { t1: S('what').t1, dr: 34, color: '#ffffff', label: 'MELODY', labelDr: 82 });
    sing([['E4', 1], ['G4', 1], ['A4', 1], ['G4', 1], ['E4', 1], ['D4', 1], ['E4', 2]], tM, 0.45, 0.3);
    a.tag(0, a.w('what', 'underneath'), S('what').t1, 'HELD UNDERNEATH', { x: 540, y: 1010, color: GOLD });

    // ---- Amazing Grace (public domain) in A over an A drone ----
    a.scale(S('grace').t0, 'A', a.T.MAJOR);
    const g0 = S('grace').t0 + 0.1, g1 = S('grace').t1;
    drone(['A2', 'A3'], g0, g1, 0.22, 1.0);
    a.ring(['A'], g0 + 0.2, g1, { color: GOLD });
    a.tag('A', a.w('grace', 'A'), g1, 'DRONE ON A', { color: GOLD });
    const mg = a.w('grace', 'bagpipes') + 0.2;
    sing([['E4', 1], ['A4', 2], ['C#5', 0.5], ['A4', 0.5], ['C#5', 2], ['B4', 1], ['A4', 2], ['F#4', 1], ['E4', 2],
      ['E4', 1], ['A4', 2], ['C#5', 0.5], ['A4', 0.5], ['C#5', 2], ['B4', 1], ['E5', 3]], mg, 0.34, 0.36);

    // ---- tanpura: home and fifth, plucked in a cycle (C as home) ----
    a.scale(S('tanpura').t0, 'C', [0, 7]);
    const t0 = S('tanpura').t0 + 0.1, t1 = S('tanpura').t1;
    const PL = ['G3', 'C4', 'C4', 'C3'];
    for (let t = t0, i = 0; t < t1 - 0.2; t += 0.55, i++) a.note(PL[i % 4], t, 1.6, { vel: i % 4 === 3 ? 0.26 : 0.2, show: i % 4 === 0 || i % 4 === 3 });
    a.tag('C', a.w('tanpura', 'home'), t1, 'HOME', { color: GOLD });
    a.tag('G', a.w('tanpura', 'fifth'), t1, 'FIFTH', { color: TEAL });
    a.ring(['C'], a.w('tanpura', 'home'), t1, { color: GOLD });
    a.ring(['G'], a.w('tanpura', 'fifth'), t1, { color: TEAL });
    a.line('C', 'G', a.w('tanpura', 'fifth'), t1, { color: TEAL, dash: true });
    a.big('HOME + FIFTH', a.w('tanpura', 'fifth') + 0.3, t1, { x: 690, y: 830, size: 40, ...MONO, color: '#ffffff' });

    // ---- Tomorrow Never Knows: named only; a generic low C drone with a plain beat ----
    a.scale(S('tnk').t0, 'C', [0]);
    const k0 = S('tnk').t0 + 0.1, k1 = S('tnk').t1;
    drone(['C2', 'G2', 'C3'], k0, k1, 0.22, 1.1);
    a.ring(['C'], k0 + 0.2, k1, { color: GOLD });
    a.tag('C', a.w('tnk', 'C'), k1, 'ONE C DRONE', { color: GOLD });
    a.big('C', k0 + 0.3, k1, { y: 840, size: 200, color: GOLD, blur: 40 });
    for (let t = k0, i = 0; t < k1 - 0.2; t += 0.275, i++) { if (i % 4 === 0) a.perc('kick', t, 0.6); if (i % 4 === 2) a.perc('snare', t, 0.45); a.perc('hat', t, 0.18); }

    // ---- why1: home is fixed; the melody wanders, the tonic never leaves ----
    a.scale(S('why1').t0, 'C', a.T.MAJOR);
    const w0 = S('why1').t0 + 0.1, w1 = S('why1').t1;
    drone(['C2', 'C3'], w0, S('why3').t1, 0.2);
    a.ring(['C'], w0, S('why3').t1, { color: GOLD });
    a.tag('C', a.w('why1', 'home'), w1, 'HOME, ALWAYS', { color: GOLD });
    const wander = ['E4', 'F4', 'A4', 'G4', 'B4', 'D5', 'C5', 'A4', 'F4', 'D4', 'E4', 'C4'];
    const wt = a.w('why1', 'permanently'), ws = (w1 - wt - 0.4) / wander.length;
    wander.forEach((n, i) => a.note(n, wt + i * ws, ws * 1.2, { vel: 0.26 }));
    a.walker(wander.map((n, i) => [wt + i * ws, n.replace(/\d/, '')]), { t1: w1, dr: 34, color: '#ffffff' });
    a.big('TONIC: NEVER FORGOTTEN', a.w('why1', 'tonic'), w1, { y: 460, size: 34, ...MONO, color: GOLD });

    // ---- why2: each interval against the C drone ----
    const IV = [['fifth', 'G', 'G4', 'SWEET', TEAL, 'why2'], ['octave', 'C', 'C5', 'PURE', '#ffffff', 'why2'],
      ['second', 'D', 'D4', 'RUBS', GOLD, 'why2b'], ['tritone', 'F#', 'F#4', 'GRINDS', RED, 'why2b']];
    const ti = IV.map(([w, , , , , seg]) => a.w(seg, w) - 0.05);
    IV.forEach(([w, pc, n, label, col], i) => {
      const s0 = ti[i], s1 = i < 3 ? ti[i + 1] : S('why2').t1;
      a.note(n, s0, s1 - s0, { vel: 0.3 });
      a.note(n, s0 + 0.9, Math.max(0.3, s1 - s0 - 0.9), { vel: 0.18, show: false });
      if (pc === 'C') a.ring(['C'], s0, s1, { color: '#ffffff' });
      else a.line('C', pc, s0, s1, { color: col });
      a.big(label, s0, s1, { y: 460, size: 48, ...MONO, color: col });
      a.tag(pc, s0, s1, label === 'PURE' ? 'OCTAVE' : w.toUpperCase(), { color: col, dr: -75, ...(pc === 'C' ? { x: 540, y: 1010 } : {}) });
    });
    a.big('AGAINST THE DRONE', S('why2').t0 + 0.2, ti[0], { y: 460, size: 34, ...MONO, color: GOLD });

    // ---- why3: twelve colours ----
    a.scale(S('why3').t0 + 0.1, 'C', ALL, { popIn: { t0: S('why3').t0 + 0.1, step: 0.12 } });
    const cols = ['C4', 'G4', 'E4', 'A4', 'D4', 'B4', 'F#4', 'Eb4', 'Ab4', 'F4', 'Bb4', 'C#4', 'C5'];
    const c0 = a.w('why3', 'colour') - 0.3;
    cols.forEach((n, i) => a.note(n, c0 + i * 0.28, 0.9, { vel: 0.24 }));
    a.big('EACH INTERVAL, A COLOUR', a.w('why3', 'colour'), S('why3').t1, { y: 460, size: 34, ...MONO, color: GOLD });

    // ---- why4: bagpipes, hurdy gurdy, organum ----
    const h0 = S('why4').t0 + 0.1, h1 = S('why4').t1;
    const g = a.grid([{ label: 'BAGPIPES', size: 38, color: GOLD }, { label: 'HURDY GURDY', size: 38, color: TEAL }, { label: 'ORGANUM', sub: 'EARLY MEDIEVAL', size: 38, color: LILAC }],
      h0, h1, { rows: 3, cols: 1, cw: 620, chh: 150, y: 520, revealStep: 0.3 });
    g.active.push({ t0: a.w('why4', 'bagpipes') - 0.05, t1: a.w('why4', 'hurdy') - 0.05, i: 0 }, { t0: a.w('why4', 'hurdy') - 0.05, t1: a.w('why4', 'organum') - 0.3, i: 1 },
      { t0: a.w('why4', 'organum') - 0.3, t1: h1, i: 2 });
    drone(['D2', 'A2', 'D3'], h0, h1, 0.2, 1.3);
    sing([['D4', 2], ['E4', 1], ['F4', 1], ['G4', 2], ['F4', 1], ['E4', 1], ['D4', 2], ['C4', 1], ['E4', 1], ['D4', 4]], h0 + 0.8, 0.42, 0.24);

    // ---- why5: pedal point, C held under changing chords ----
    a.scale(S('why5').t0, 'C', a.T.MAJOR);
    const p0 = S('why5').t0 + 0.1, p1 = S('why5').t1, pl = (p1 - p0) / 4;
    const PED = [['C', ['E4', 'G4', 'C5']], ['F/C', ['F4', 'A4', 'C5']], ['G/C', ['D4', 'G4', 'B4']], ['C', ['E4', 'G4', 'C5']]];
    PED.forEach(([c, v], i) => a.ch(c, p0 + i * pl, p0 + (i + 1) * pl, { notes: v, bass: false, row: i, vel: 0.65, strikes: [{ o: 0, v: 1 }, { o: pl / 2, v: 0.5 }] }));
    drone(['C2', 'C3'], p0, p1, 0.24, 1.0);
    a.ring(['C'], p0, p1, { color: GOLD });
    a.tag('C', a.w('why5', 'pedal'), p1, 'PEDAL POINT', { color: GOLD, dr: -75 });
    a.tag('C', a.w('why5', 'held'), a.w('why5', 'pedal'), 'HELD BASS', { color: GOLD, dr: -75 });

    // ---- essence: the drone, colours glowing, landing on C ----
    a.scale(S('essence').t0, 'C', ALL);
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    drone(['C2', 'C3'], e0, e1 - 0.3, 0.22);
    a.ring(['C'], e0, e1, { color: GOLD });
    const glow = ['G4', 'E4', 'A4', 'D5', 'B4', 'F#4', 'G4', 'C5'];
    glow.forEach((n, i) => a.note(n, e0 + 0.3 + i * 0.5, 0.9, { vel: 0.24 }));
    a.ch('C', e0 + 4.4, e1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.7 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
