// Swing: pairs of eighth notes played long-short instead of even, and why that tiny delay makes music dance.
// Copyrighted songs: only a generic swing groove is played, never their melodies.
const B = 0.45, BAR = 4 * B;       // main tempo, about 133 BPM
const BF = 0.3;                    // a fast tempo, 200 BPM
const BS = 0.66;                   // a slow tempo, about 90 BPM

module.exports = {
  slug: 'swing-rhythm',
  title: 'Swing Rhythm',
  segments: [
    { id: 'hook',    text: 'Take a steady rhythm, make every second note a little late... and it starts to swing.' },
    { id: 'what',    text: 'Straight eighth notes are perfectly even: one and two and.' },
    { id: 'what2',   text: 'Swing plays them long, short. Long, short.' },
    { id: 'what3',   text: 'Roughly the first two thirds of a triplet, then the last third.' },
    { id: 's1',      text: 'That lilt drives In the Mood, by Glenn Miller...' },
    { id: 's2',      text: 'and Sing, Sing, Sing, by Benny Goodman.' },
    { id: 'why1',    text: 'So why does it feel so different? Here is a little tune, played straight...' },
    { id: 'why2',    text: 'and here it is swung.' },
    { id: 'why3',    text: 'Same notes. Only the and arrives late.' },
    { id: 'why4',    text: 'The amount of swing varies. Slower tempos often swing harder...' },
    { id: 'why4b',   text: 'very fast tempos get closer to even.' },
    { id: 'why5',    text: 'And the ride cymbal, plus a walking bass on every beat, carry the swing.' },
    { id: 'why6',    text: 'It grew out of jazz in the twenties and thirties, and big bands made it the dance music of the era.' },
    { id: 'essence', text: 'Delay one note by a hair, and a stiff rhythm starts to dance.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'LONG, SHORT', title: 'SWING', accent: true, circle: false, min: 4 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'EVEN EIGHTHS', title: 'STRAIGHT', circle: false, min: 2 * BAR, tail: 0.4 },
    { id: 'what2', segs: ['what2', 'what3'], label: 'UNEVEN EIGHTHS', title: 'SWUNG', circle: false, min: 4 * BAR, gap: 0.35, tail: 0.6 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'In the Mood', sub: 'Glenn Miller · 1939', circle: false, min: 4 * BAR, tail: 0.4 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Sing, Sing, Sing', sub: 'Benny Goodman · 1937', circle: false, min: 4 * 4 * BF + 0.4, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SAME TUNE...', circle: false, tail: 2 * BAR - 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: '...NOW SWUNG', circle: false, min: 2 * BAR + 0.5, tail: 0.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE LATE "AND"', circle: false, min: 2 * BAR, tail: 0.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'HOW MUCH SWING?', title: 'IT VARIES', circle: false, gap: 0.5, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'THE ENGINE', title: 'RIDE + WALKING BASS', circle: false, min: 3 * BAR, tail: 1.0 },
    { id: 'why6', segs: ['why6'], label: 'WHERE IT CAME FROM', title: 'THE SWING ERA', circle: false, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A STIFF RHYTHM DANCES', accent: true, circle: false, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREY = '#6a6a72', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1060, size: 52, ...MONO };

    // two aligned grids: 8 straight eighths (cw 120) over 12 triplet cells (cw 80) -> beats line up
    const ST = [...Array(8)].map((_, i) => ({ label: i % 2 ? '&' : String(i / 2 + 1), color: i % 2 ? TEAL : PINK, size: 50 }));
    const SW = [...Array(12)].map((_, i) => ({ label: i % 3 === 0 ? String(i / 3 + 1) : i % 3 === 1 ? '·' : '&', color: i % 3 === 0 ? PINK : i % 3 === 1 ? GREY : TEAL, size: i % 3 === 1 ? 40 : 46 }));
    const gST = (t0, t1, o = {}) => a.grid(ST, t0, t1, { rows: 1, cols: 8, cw: 120, chh: 150, y: 520, caption: 'STRAIGHT', ...o });
    const gSW = (t0, t1, o = {}) => a.grid(SW, t0, t1, { rows: 1, cols: 12, cw: 80, chh: 150, y: 780, caption: 'SWING', ...o });

    // the harmony: a generic I - VI - ii - V loop in C, with a walking bass
    const PROG = [
      { n: 'C6', v: ['E4', 'G4', 'A4', 'C5'], w: ['C2', 'E2', 'G2', 'A2'] },
      { n: 'A7', v: ['E4', 'G4', 'A4', 'C#5'], w: ['A2', 'G2', 'E2', 'C#2'] },
      { n: 'Dm7', v: ['F4', 'A4', 'C5', 'D5'], w: ['D2', 'F2', 'A2', 'C3'] },
      { n: 'G7', v: ['F4', 'G4', 'B4', 'D5'], w: ['G2', 'B2', 'D3', 'B2'] },
    ];

    // one bar. o.r = where the "and" falls (0.5 straight, 2/3 swung); o.st / o.sw = grids to light
    // style: 'demo' (eighths on the hat + a soft piano click), 'groove' (ride, bass, comp), 'drums' (fast, kick-driven)
    function bar(t, k, o = {}) {
      const b = o.b ?? B, r = o.r ?? 2 / 3, vel = o.vel ?? 1, style = o.style || 'groove', stop = o.stop ?? Infinity;
      const P = PROG[k % 4];
      for (let i = 0; i < 4; i++) {
        const tb = t + i * b, off = tb + r * b;
        if (tb > stop - 0.05) break;
        if (o.st) { o.st.active.push({ t0: tb, t1: tb + b / 2, i: i * 2 }); o.st.active.push({ t0: tb + b / 2, t1: tb + b, i: i * 2 + 1 }); }
        if (o.sw) { o.sw.active.push({ t0: tb, t1: off, i: i * 3 }); o.sw.active.push({ t0: tb, t1: off, i: i * 3 + 1 }); o.sw.active.push({ t0: off, t1: tb + b, i: i * 3 + 2 }); }
        if (o.ride) { o.ride.active.push({ t0: tb, t1: tb + b * 0.6, i: i * 3 }); if (i % 2) o.ride.active.push({ t0: off, t1: tb + b, i: i * 3 + 2 }); }
        if (o.walk) o.walk.active.push({ t0: tb, t1: tb + b, i });
        if (style === 'demo') {
          a.perc('hat', tb, 0.5 * vel); a.perc('hat', off, 0.36 * vel);
          if (o.click !== false) { a.note('C5', tb, b * r * 0.8, { vel: 0.22 * vel }); a.note('G4', off, b * (1 - r) * 0.8, { vel: 0.18 * vel }); }
          if (i === 0) a.perc('kick', tb, 0.5 * vel);
        } else if (style === 'groove') {
          // ride: ding, ding-a, ding, ding-a ; feathered kick ; hi-hat foot (soft snare) on 2 and 4 ; walking bass
          a.perc('hat', tb, 0.42 * vel);
          if (i % 2) { a.perc('hat', off, 0.3 * vel); a.perc('snare', tb, 0.16 * vel); }
          a.perc('kick', tb, 0.25 * vel);
          if (o.bass !== false) a.note(P.w[i], tb, b * 0.85, { vel: 0.42 * vel });
        } else if (style === 'drums') {
          a.perc('kick', tb, 0.85 * vel);
          a.perc('hat', tb, 0.3 * vel); a.perc('hat', off, 0.3 * vel);
          if (i % 2) a.perc('snare', off, 0.45 * vel);
          if (o.bass !== false) a.note(P.w[i], tb, b * 0.85, { vel: 0.4 * vel });
        }
      }
      if (o.comp !== false && style !== 'demo') {
        const len = Math.min(4 * b, stop - t), r2 = o.r ?? 2 / 3;
        const strikes = style === 'drums' ? [{ o: 0, v: 1 }, { o: (1 + r2) * b, v: 0.8 }] : [{ o: b, v: 0.9 }, { o: 3 * b, v: 0.8 }];
        a.ch(P.n, t, t + len, { notes: P.v, bass: false, vel: 0.55 * vel, strikes: strikes.filter(s => s.o < len), shape: false, hideName: true });
      }
    }
    const run = (t0, t1, o = {}) => {
      const b = o.b ?? B; let k = o.k0 ?? 0, t = t0;
      for (; t < t1 - 0.5; t += 4 * b, k++) bar(t, k, { ...o, stop: t1 });
      return t;
    };

    // ---- hook: swung demo eighths, grid lights long-short ----
    const sw0 = gSW(0.3, S('hook').t1, { revealStep: 0.05, y: 640 });
    run(0.3, S('hook').t1, { style: 'demo', sw: sw0, vel: 0.8 });
    a.big('LONG · SHORT', a.w('hook', 'late'), S('hook').t1, { ...LBL, color: GOLD });
    a.big('EVERY SECOND NOTE', a.w('hook', 'every'), a.w('hook', 'late'), { ...LBL, size: 44, color: '#ffffff' });

    // ---- what: straight eighths ----
    const st1 = gST(S('what').t0, S('what2').t1);
    run(S('what').t0 + 0.05, S('what').t1, { style: 'demo', st: st1, r: 0.5 });
    a.big('EVEN', a.w('what', 'even'), S('what').t1, { ...LBL, size: 72, color: TEAL });

    // ---- what2 + what3: swung, then the triplet explanation ----
    const sw1 = gSW(S('what2').t0, S('what2').t1);
    run(S('what2').t0 + 0.05, S('what2').t1, { style: 'demo', sw: sw1 });
    a.big('LONG · SHORT', a.w('what2', 'long'), a.at('what3'), { ...LBL, size: 72, color: GOLD });
    a.big('2/3  +  1/3', a.w('what3', 'two'), S('what2').t1, { ...LBL, size: 80, color: GOLD });
    a.big('OF A TRIPLET', a.w('what3', 'triplet'), S('what2').t1, { y: 1135, size: 30, ...MONO, color: '#b9b9c2', blur: 0 });

    // ---- songs: generic swing grooves (no melodies) ----
    const sw2 = gSW(S('s1').t0, S('s1').t1, { y: 640 });
    run(S('s1').t0 + 0.05, S('s1').t1, { sw: sw2 });
    a.big('BIG BAND SWING', S('s1').t0 + 0.4, S('s1').t1, { y: 980, size: 52, ...MONO, color: GOLD });
    const sw3 = gSW(S('s2').t0, S('s2').t1, { y: 640 });
    run(S('s2').t0 + 0.05, S('s2').t1, { style: 'drums', b: BF, sw: sw3 });
    a.big('FAST + DRIVING', S('s2').t0 + 0.4, S('s2').t1, { y: 980, size: 52, ...MONO, color: PINK });

    // ---- why1 / why2: the same original tune, straight then swung ----
    // tune in eighths: [note, eighths]; a null is a rest
    const TUNE = [['E4', 1], ['G4', 1], ['A4', 1], ['G4', 1], ['E4', 1], ['D4', 1], ['C4', 1], ['D4', 1], ['E4', 2], ['G4', 2], ['C5', 4]];
    function tune(t0, r, grid, style) {
      let e = 0;
      for (const [n, len] of TUNE) {
        const beat = Math.floor(e / 2), half = e % 2;
        const t = t0 + beat * B + (half ? r * B : 0);
        a.note(n, t, len === 1 ? (half ? (1 - r) : r) * B * 0.9 : len * B * 0.48, { vel: 0.42 });
        e += len;
      }
      for (let i = 0; i < 8; i++) {
        const tb = t0 + i * B, off = tb + r * B;
        a.perc('hat', tb, 0.35); if (i < 4) a.perc('hat', off, 0.25);
        if (style === 'st') { grid.active.push({ t0: tb, t1: tb + B / 2, i: (i % 4) * 2 }); if (i < 4) grid.active.push({ t0: tb + B / 2, t1: tb + B, i: (i % 4) * 2 + 1 }); }
        else { grid.active.push({ t0: tb, t1: off, i: (i % 4) * 3 }); grid.active.push({ t0: tb, t1: off, i: (i % 4) * 3 + 1 }); if (i < 4) grid.active.push({ t0: off, t1: tb + B, i: (i % 4) * 3 + 2 }); }
      }
      a.ch('C6', t0, t0 + 2 * BAR - 0.1, { notes: ['E3', 'G3', 'A3'], bass: 'C2', vel: 0.35, shape: false, hideName: true, strikes: [{ o: 0, v: 1 }, { o: BAR, v: 0.8 }] });
    }
    const tTune1 = a.w('why1', 'tune');
    const st2 = gST(S('why1').t0, S('why3').t1);
    const sw4 = gSW(S('why2').t0 - 0.3, S('why3').t1);
    tune(tTune1, 0.5, st2, 'st');
    tune(S('why2').t0 + 0.3, 2 / 3, sw4, 'sw');
    a.big('STRAIGHT', tTune1, S('why1').t1, { ...LBL, size: 64, color: TEAL });
    a.big('SWUNG', S('why2').t0 + 0.3, S('why2').t1, { ...LBL, size: 64, color: GOLD });

    // why3: both grids at once - the "and" moves right
    const w3 = S('why3').t0 + 0.05;
    for (let i = 0; i < 8; i++) {
      const tb = w3 + i * B;
      if (tb > S('why3').t1 - 0.3) break;
      a.perc('hat', tb, 0.35); a.perc('hat', tb + (2 / 3) * B, 0.28);
      st2.active.push({ t0: tb + B / 2, t1: tb + B, i: (i % 4) * 2 + 1 });
      sw4.active.push({ t0: tb + (2 / 3) * B, t1: tb + B, i: (i % 4) * 3 + 2 });
    }
    a.ch('C6', w3, S('why3').t1 - 0.1, { notes: ['E3', 'G3', 'A3'], bass: 'C2', vel: 0.3, shape: false, hideName: true });
    a.big('SAME NOTES', a.w('why3', 'Same'), a.w('why3', 'Only'), { ...LBL, color: '#ffffff' });
    a.big('THE "AND" ARRIVES LATE →', a.w('why3', 'Only'), S('why3').t1, { ...LBL, size: 44, color: TEAL });

    // why4: slow swings harder, fast gets closer to even
    const tFast = a.at('why4b') - 0.1;
    const sw5 = gSW(S('why4').t0, tFast, { y: 650, caption: 'SLOW · HEAVY SWING' });
    const st5 = gST(tFast, S('why4').t1, { y: 650, caption: 'FAST · NEARLY EVEN' });
    run(S('why4').t0 + 0.05, tFast, { b: BS, sw: sw5, r: 0.7 });
    run(tFast, S('why4').t1, { b: BF, st: st5, r: 0.56, k0: 0 });
    a.big('SLOW', a.w('why4', 'Slower'), tFast, { y: 1000, size: 80, ...MONO, color: GOLD });
    a.big('FAST', tFast + 0.1, S('why4').t1, { y: 1000, size: 80, ...MONO, color: BLUE });

    // why5: the ride pattern + the walking bass
    const RIDE = [...Array(12)].map((_, i) => {
      const on = i % 3 === 0 || (i % 3 === 2 && Math.floor(i / 3) % 2 === 1);
      return { label: on ? (i % 3 === 0 ? String(i / 3 + 1) : 'a') : '·', color: on ? GOLD : GREY, size: on ? 46 : 36 };
    });
    const WALK = ['1', '2', '3', '4'].map(n => ({ label: n, sub: 'BASS', color: GREEN, size: 56 }));
    const gR = a.grid(RIDE, S('why5').t0, S('why5').t1, { rows: 1, cols: 12, cw: 80, chh: 150, y: 520, caption: 'RIDE CYMBAL' });
    const gW = a.grid(WALK, a.w('why5', 'walking') - 0.2, S('why5').t1, { rows: 1, cols: 4, cw: 240, chh: 170, y: 780, caption: 'WALKING BASS · EVERY BEAT' });
    run(S('why5').t0 + 0.05, S('why5').t1, { ride: gR, walk: gW });

    // why6: the swing era - groove continues
    const ERA = [{ label: 'JAZZ', sub: '1920s – 30s', color: PINK, size: 60 }, { label: 'BIG BANDS', sub: 'THE SWING ERA', color: GOLD, size: 50 }, { label: 'DANCE', sub: 'MUSIC OF THE ERA', color: TEAL, size: 60 }];
    const gE = a.grid(ERA, S('why6').t0, S('why6').t1, { rows: 3, cols: 1, cw: 640, chh: 170, y: 500 });
    [['jazz', 0], ['big', 1], ['dance', 2]].forEach(([w, i]) => gE.active.push({ t0: a.w('why6', w) - 0.05, t1: S('why6').t1, i }));
    run(S('why6').t0 + 0.05, S('why6').t1, { vel: 0.9 });

    // essence: straight for a moment, then it swings - and one last hit
    const e0 = S('essence').t0 + 0.05, tHair = a.w('essence', 'hair');
    const st6 = gST(S('essence').t0, S('essence').t1), sw6 = gSW(S('essence').t0, S('essence').t1);
    run(e0, tHair, { style: 'demo', st: st6, r: 0.5, click: false });
    const tEnd = run(tHair, tHair + 2 * BAR + 0.6, { sw: sw6, vel: 0.95 });
    a.ch('C6', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.8, shape: false, hideName: true });
    a.perc('kick', tEnd, 1); a.perc('snare', tEnd, 0.6); a.perc('hat', tEnd, 0.6);
    a.big('IT DANCES', a.w('essence', 'dance'), S('essence').t1, { ...LBL, size: 72, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
