// Rounds: everyone sings the same melody, entering one after another; the tune fits on top of itself.
// Frère Jacques and Row, Row, Row Your Boat are public domain and are played as given in the brief (in C).
// Sumer Is Icumen In is named only (no melody given): the music there is a generic open-fifth drone.
const B = 0.4;            // quarter note (Frère Jacques)
const BAR = 4 * B;
// Frère Jacques in C: eight bars of [note, beats]
const FJ = [
  [['C4', 1], ['D4', 1], ['E4', 1], ['C4', 1]],
  [['C4', 1], ['D4', 1], ['E4', 1], ['C4', 1]],
  [['E4', 1], ['F4', 1], ['G4', 2]],
  [['E4', 1], ['F4', 1], ['G4', 2]],
  [['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['E4', 1], ['C4', 1]],
  [['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['E4', 1], ['C4', 1]],
  [['C4', 1], ['G3', 1], ['C4', 2]],
  [['C4', 1], ['G3', 1], ['C4', 2]],
];
// Row, Row, Row Your Boat in C, 6/8, in eighth notes
const ROW = [
  [['C4', 3], ['C4', 3]], [['C4', 2], ['D4', 1], ['E4', 3]], [['E4', 2], ['D4', 1], ['E4', 2], ['F4', 1]], [['G4', 6]],
  [['C5', 1], ['C5', 1], ['C5', 1], ['G4', 1], ['G4', 1], ['G4', 1]], [['E4', 1], ['E4', 1], ['E4', 1], ['C4', 1], ['C4', 1], ['C4', 1]],
  [['G4', 2], ['F4', 1], ['E4', 2], ['D4', 1]], [['C4', 6]],
];

module.exports = {
  slug: 'rounds',
  title: 'Rounds',
  segments: [
    { id: 'hook',    text: 'One melody. Everybody sings the same notes... and somehow, it turns into harmony.' },
    { id: 'what',    text: "That's a round: the same tune, with each voice entering a little later." },
    { id: 'frere',   text: 'You hear it in Frère Jacques, a French round from the 18th century...' },
    { id: 'row',     text: 'Row, Row, Row Your Boat, an American round from the 19th century...' },
    { id: 'sumer',   text: 'and Sumer Is Icumen In, from 13th century England: the oldest known round in English.' },
    { id: 'why1',    text: "So why isn't it a mess? The melody is built to fit on top of itself." },
    { id: 'why2',    text: 'Every bar of Frère Jacques outlines, or passes through, the same C major chord.' },
    { id: 'why3',    text: 'So any two bars, stacked together, agree.' },
    { id: 'why4',    text: 'Layer the voices two bars apart, and harmony appears by itself: thirds, fifths, octaves.' },
    { id: 'why5',    text: "That's counterpoint: independent lines that sound good together." },
    { id: 'why6',    text: "A canon is the stricter, composed version, like Pachelbel's Canon or Bach's canons." },
    { id: 'essence', text: 'One melody, staggered in time... turns into harmony.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE MELODY, MANY VOICES', title: 'ROUNDS', accent: true, tonic: 0, min: 0.4 + 5 * 4 * 0.34 + 0.3 },
    { id: 'what', segs: ['what'], label: 'SAME TUNE', title: 'ENTERING LATER', circle: false, tonic: 0, min: 0.2 + 8 * 1.2 + 0.4 },
    { id: 'frere', segs: ['frere'], label: 'YOU HEAR IT IN', title: 'Frère Jacques', sub: 'French round · 18th century · in C', tonic: 0, min: 0.2 + 4 * 0.36 * 4 + 0.6 },
    { id: 'row', segs: ['row'], label: 'YOU HEAR IT IN', title: 'Row Your Boat', sub: 'American round · 19th century · in C', tonic: 0, min: 0.2 + 8 * 6 * 0.17 + 0.6 },
    { id: 'sumer', segs: ['sumer'], label: 'YOU HEAR IT IN', title: 'Sumer Is Icumen In', sub: 'England · 13th century', circle: false, tonic: 0, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'IT FITS ITSELF', tonic: 0, tail: 1.2 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'ONE CHORD: C', tonic: 0, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'STACK ANY TWO', tonic: 0, tail: 2.2 },
    { id: 'why4', segs: ['why4'], label: 'TWO BARS APART', title: 'FREE HARMONY', tonic: 0, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: 'THE NAME FOR IT', title: 'COUNTERPOINT', circle: false, tonic: 0, tail: 1.0 },
    { id: 'why6', segs: ['why6'], label: 'THE STRICT VERSION', title: 'THE CANON', circle: false, tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TIME MAKES HARMONY', accent: true, tonic: 0, gap: 0.6, tail: 2.2, min: 0.15 + 7 * 4 * 0.27 + 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#8d98ff', GRAY = '#3a3a42';
    const VCOL = [GOLD, TEAL, PINK, BLUE];
    const VDR = [36, -40, -88, -136];
    const VOCT = [0, -12, 0, -12];   // voices 2 and 4 sing an octave lower
    const VVEL = [0.36, 0.34, 0.26, 0.26];
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => a.T.NAMES[a.T.mod(a.T.midi(n), 12)];

    // play one bar list at t (beat seconds b), voice k; push walker points into pts
    const playBar = (bar, t, b, k, pts, o = {}) => {
      bar.forEach(([n, d]) => {
        const m = a.T.midi(n) + (o.oct ?? VOCT[k]);
        a.note(m, t, d * b * 0.92, { vel: o.vel ?? VVEL[k], show: o.show ?? false });
        if (pts) pts.push([t, pcOf(n)]);
        t += d * b;
      });
    };
    // a round: voice k enters at slot 2k; `slots` bars in total; returns walker points per voice
    const round = (t0, voices, slots, b, o = {}) => {
      const L = 4 * b, pts = Array.from({ length: voices }, () => []);
      for (let s = 0; s < slots; s++) for (let k = 0; k < voices; k++) {
        const m = s - 2 * k;
        if (m < 0) continue;
        playBar(FJ[m % 8], t0 + s * L, b, k, pts[k], o);
        if (o.onBar) o.onBar(k, s, m % 8, t0 + s * L, L);
      }
      return pts;
    };
    const walkers = (pts, t1, o = {}) => pts.forEach((p, k) => p.length && a.walker(p, { t1, dr: VDR[k], color: VCOL[k], label: o.labels ? 'VOICE ' + (k + 1) : undefined, labelDr: k ? -40 : 46 }));
    // the C chord shape stays put (silent: the voices make the harmony)
    const cShape = (t0, t1, o = {}) => a.ch('C', t0, t1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, ...o });
    // staircase grid: 4 voices x 8 bars, phrases A A B B C C D D
    const PH = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'], PCOL = [GOLD, GOLD, TEAL, TEAL, PINK, PINK, BLUE, BLUE];
    const stairs = (t0, t1, o = {}) => {
      const cells = [];
      for (let k = 0; k < 4; k++) for (let s = 0; s < 8; s++) {
        const m = s - 2 * k;
        cells.push(m < 0 ? { label: '·', color: GRAY, size: 40 } : { label: PH[m], color: PCOL[m], size: 50 });
      }
      return a.grid(cells, t0, t1, { rows: 4, cols: 8, cw: 122, chh: 118, y: o.y ?? 500, revealStep: o.revealStep ?? 0.02, caption: o.caption });
    };

    // ---- hook: voice 1 alone, then voice 2 enters two bars later ----
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    cShape(0.3, S('hook').t1);
    const hp = round(0.4, 2, 5, 0.34);
    walkers(hp, S('hook').t1);
    a.tag(0, 0.4 + 8 * 0.34, S('hook').t1, '2ND VOICE ENTERS', { x: 540, y: 462, color: TEAL });

    // ---- what: the staircase, four voices entering two bars apart ----
    const w0 = S('what').t0 + 0.2, wb = 0.3;
    const gw = stairs(S('what').t0 + 0.05, S('what').t1, { caption: 'EACH VOICE ENTERS TWO BARS LATER' });
    round(w0, 4, 8, wb, { onBar: (k, s, m, t, L) => gw.active.push({ t0: t, t1: t + L, i: k * 8 + s }) });

    // ---- Frère Jacques: bars 1-4, voice 2 entering at bar 3 ----
    const f0 = S('frere').t0 + 0.2, fb = 0.36;
    cShape(S('frere').t0 + 0.05, S('frere').t1);
    walkers(round(f0, 2, 4, fb), S('frere').t1);

    // ---- Row, Row, Row Your Boat (6/8): voice 2 enters after two bars ----
    const r0 = S('row').t0 + 0.2, e = 0.17, RB = 6 * e;
    cShape(S('row').t0 + 0.05, S('row').t1);
    const rp = [[], []];
    for (let s = 0; s < 8; s++) {
      playBar(ROW[s], r0 + s * RB, e, 0, rp[0], { vel: 0.36 });
      if (s >= 2) playBar(ROW[s - 2], r0 + s * RB, e, 1, rp[1], { vel: 0.3 });
    }
    walkers(rp, S('row').t1);

    // ---- Sumer Is Icumen In: name only, over a soft open-fifth drone ----
    const s0 = S('sumer').t0 + 0.1;
    const gs = a.grid([{ label: 'ENGLAND', size: 60, color: TEAL }, { label: '13TH C.', size: 64, color: GOLD }], s0, S('sumer').t1,
      { rows: 1, cols: 2, cw: 420, chh: 200, y: 540, revealStep: 0.25 });
    gs.active.push({ t0: a.w('sumer', '13th') - 0.05, t1: a.w('sumer', 'England') + 0.4, i: 1 }, { t0: a.w('sumer', 'England') - 0.05, t1: a.w('sumer', 'oldest'), i: 0 });
    a.big('THE OLDEST KNOWN', a.w('sumer', 'oldest'), S('sumer').t1, { y: 870, size: 60, color: '#ffffff' });
    a.big('ROUND IN ENGLISH', a.w('sumer', 'round'), S('sumer').t1, { y: 960, size: 60, color: GOLD });
    for (let t = s0; t < S('sumer').t1 - 0.3; t += 1.6) { a.note('C2', t, 1.9, { vel: 0.22, show: false }); a.note('G2', t, 1.9, { vel: 0.18, show: false }); a.note('C3', t + 0.8, 1.2, { vel: 0.12, show: false }); }

    // ---- why1: two voices, the tune laid on top of itself ----
    const y0 = S('why1').t0 + 0.2;
    cShape(S('why1').t0 + 0.05, S('why1').t1);
    const yp = [[], []];
    for (let s = 0; s < 3; s++) { playBar(FJ[2 + (s % 2)], y0 + s * BAR * 0.9, B * 0.9, 0, yp[0]); playBar(FJ[s % 2], y0 + s * BAR * 0.9, B * 0.9, 1, yp[1]); }
    walkers(yp, S('why1').t1);
    a.tag(0, a.w('why1', 'fit'), S('why1').t1, 'BUILT TO FIT ITSELF', { x: 540, y: 462, color: GOLD });

    // ---- why2: bars 1, 3, 5, 7 each outline C major ----
    a.ring(['C', 'E', 'G'], a.w('why2', 'same'), S('why2').t1, { color: GOLD });
    cShape(S('why2').t0 + 0.05, S('why2').t1);
    const v0 = S('why2').t0 + 0.2, vb = 0.32, vp = [];
    [0, 2, 4, 6].forEach((m, i) => playBar(FJ[m], v0 + i * 4 * vb, vb, 0, vp, { show: true, vel: 0.4 }));
    a.walker(vp, { t1: S('why2').t1, dr: 36, color: GOLD });
    const BL = ['BAR 1', 'BAR 3', 'BAR 5', 'BAR 7'];
    BL.forEach((l, i) => a.tag(0, v0 + i * 4 * vb, v0 + (i + 1) * 4 * vb, l, { x: 540, y: 462, color: PCOL[2 * i] }));
    a.tag(0, v0 + 16 * vb, S('why2').t1, 'SAME C CHORD', { x: 540, y: 462, color: GOLD });

    // ---- why3: any two bars stacked agree ----
    const PAIRS = [[0, 2], [2, 4], [4, 6], [0, 6]];
    const z0 = S('why3').t0 + 0.2, zb = 0.3, zp = [[], []];
    cShape(S('why3').t0 + 0.05, S('why3').t1);
    PAIRS.forEach(([p, q], i) => { playBar(FJ[p], z0 + i * 4 * zb, zb, 0, zp[0]); playBar(FJ[q], z0 + i * 4 * zb, zb, 1, zp[1]); });
    walkers(zp, S('why3').t1);
    a.tag(0, a.w('why3', 'agree'), S('why3').t1, 'THEY AGREE', { x: 540, y: 462, color: TEAL });

    // ---- why4: four voices, two bars apart: thirds, fifths, octaves ----
    const x0 = S('why4').t0 + 0.15, xb = 0.3;
    cShape(S('why4').t0 + 0.05, S('why4').t1);
    const slots = Math.floor((S('why4').t1 - x0 - 0.2) / (4 * xb));
    walkers(round(x0, 4, slots, xb), S('why4').t1);
    a.line('C', 'E', a.w('why4', 'thirds'), S('why4').t1, { color: GOLD, label: '3RDS', ly: -60, lx: 40 });
    a.line('C', 'G', a.w('why4', 'fifths'), S('why4').t1, { color: TEAL, label: '5THS', ly: 0, lx: -110 });
    a.tag('C', a.w('why4', 'octaves'), S('why4').t1, 'OCTAVES', { color: PINK, x: 540, y: 462 });

    // ---- why5: counterpoint (the round goes on softly) ----
    const c0 = S('why5').t0 + 0.1, cb = 0.32;
    const gc = a.grid([0, 1, 2].map(k => ({ label: 'LINE ' + (k + 1), size: 44, color: VCOL[k] })), c0, S('why5').t1, { rows: 3, cols: 1, cw: 640, chh: 120, y: 520, revealStep: 0.2 });
    round(c0, 3, Math.floor((S('why5').t1 - c0) / (4 * cb)), cb, { vel: 0.24, onBar: (k, s, m, t, L) => gc.active.push({ t0: t, t1: t + L, i: k }) });
    a.big('INDEPENDENT LINES', a.w('why5', 'independent'), S('why5').t1, { y: 940, size: 52, ...MONO, color: '#ffffff' });
    a.big('THAT SOUND GOOD TOGETHER', a.w('why5', 'sound'), S('why5').t1, { y: 1030, size: 44, ...MONO, color: GOLD });

    // ---- why6: the canon, stricter and composed ----
    const k0 = S('why6').t0 + 0.1;
    const gk = a.grid([{ label: 'PACHELBEL', sub: 'CANON', size: 54, color: TEAL }, { label: 'BACH', sub: 'CANONS', size: 64, color: GOLD }], k0, S('why6').t1,
      { rows: 1, cols: 2, cw: 440, chh: 220, y: 640, revealStep: 0.2 });
    gk.active.push({ t0: a.w('why6', "Pachelbel's") - 0.05, t1: a.w('why6', "Bach's") - 0.05, i: 0 }, { t0: a.w('why6', "Bach's") - 0.05, t1: S('why6').t1, i: 1 });
    a.big('STRICTER · COMPOSED', a.w('why6', 'stricter'), S('why6').t1, { y: 540, size: 44, ...MONO, color: PINK });
    round(k0, 2, Math.floor((S('why6').t1 - k0) / (4 * 0.32)), 0.32, { vel: 0.2 });

    // ---- essence: the full four-voice staircase on the circle, ending on C ----
    a.scale(S('essence').t0, 'C');
    const e0 = S('essence').t0 + 0.15, eb = 0.27, eSlots = 7;
    cShape(S('essence').t0 + 0.05, e0 + eSlots * 4 * eb);
    walkers(round(e0, 4, eSlots, eb), e0 + eSlots * 4 * eb + 0.4);
    const eEnd = e0 + eSlots * 4 * eb;
    a.ch('C', eEnd, S('essence').t1 - 0.3, { notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.75 });
    a.ring(['C', 'E', 'G'], eEnd, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
