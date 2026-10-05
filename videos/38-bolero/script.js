// Boléro, decoded: one snare rhythm, one tune, one key... and a crescendo that never stops.
// No melody here: only the snare ostinato idea and C major harmony, as the brief asks.
const BEAT = 0.72, BAR = 3 * BEAT, CYC = 2 * BAR;
// the two-bar snare figure, in beats: eighth + triplet sixteenths on 1 and 2; bar 2 ends with two triplets
const BAR1 = [0, 0.5, 0.5 + 1 / 6, 0.5 + 2 / 6, 1, 1.5, 1.5 + 1 / 6, 1.5 + 2 / 6, 2, 2.5];
const BAR2 = [0, 0.5, 0.5 + 1 / 6, 0.5 + 2 / 6, 1, 1.5, 1.5 + 1 / 6, 1.5 + 2 / 6, 2, 2 + 1 / 6, 2 + 2 / 6, 2.5, 2.5 + 1 / 6, 2.5 + 2 / 6];

module.exports = {
  slug: 'bolero',
  title: 'Boléro',
  segments: [
    { id: 'hook',    text: 'One rhythm, one melody, repeated for about fifteen minutes... and it just keeps getting louder.' },
    { id: 'what',    text: 'This is Boléro, by Maurice Ravel, from 1928.' },
    { id: 'what2',   text: 'Ravel himself called it a piece for orchestra without music.' },
    { id: 'play',    text: 'Listen to the snare drum.' },
    { id: 'why1',    text: 'So how does it hypnotize? That two bar rhythm repeats the whole time.' },
    { id: 'why1b',   text: 'By a common count, one hundred and sixty nine times.' },
    { id: 'why2',    text: 'The melody repeats too, passed from instrument to instrument.' },
    { id: 'why3',    text: 'Only two things change: the color of the orchestra, and the volume.' },
    { id: 'why4',    text: 'One continuous crescendo, from very quiet to full orchestra.' },
    { id: 'key',     text: 'And the harmony stays in C major... until, near the very end, it suddenly lurches into E major.' },
    { id: 'key2',    text: 'Then it crashes back to C, and collapses.' },
    { id: 'essence', text: 'No development, no new themes. Just repetition and growing intensity...' },
    { id: 'essence2', text: 'and it hypnotizes the whole world.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MAURICE RAVEL · 1928', title: 'BOLÉRO', accent: true, circle: false, tonic: 0, min: 2 * CYC + 0.3 },
    { id: 'what', segs: ['what'], label: 'ONE LONG CRESCENDO', title: 'BOLÉRO', sub: 'Maurice Ravel · 1928 · in C', circle: false, tonic: 0, tail: 0.5 },
    { id: 'what2', segs: ['what2'], label: 'RAVEL HIMSELF SAID', title: 'NO MUSIC?', circle: false, tonic: 0, tail: 1.0 },
    { id: 'play', segs: ['play'], label: 'THE SNARE DRUM', title: 'THE RHYTHM', sub: 'two bars · in 3/4', circle: false, tonic: 0, tail: 2 * CYC + 0.4 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'SAME TWO BARS', circle: false, tonic: 0, gap: 0.4, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'SAME MELODY', circle: false, tonic: 0, tail: 0.8 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'ONLY TWO THINGS CHANGE', title: 'COLOR AND VOLUME', circle: false, tonic: 0, gap: 0.4, tail: 1.2 },
    { id: 'key', segs: ['key', 'key2'], label: 'THE TWIST', title: 'SUDDENLY, E MAJOR', tonic: 0, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'PURE REPETITION', accent: true, circle: false, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93';
    const tE = a.w('key', 'lurches') - 0.04, tCrash = a.w('key2', 'crashes') - 0.04, tColl = a.w('key2', 'collapses') - 0.04;

    // loudness over time: one long crescendo up to the crash
    const KEYS = [[0, 0.3], [S('play').t0, 0.38], [S('play').t1, 0.55], [S('why3').t0, 0.6], [S('key').t0, 0.85], [tCrash, 1]];
    const vol = t => { for (let i = 1; i < KEYS.length; i++) if (t < KEYS[i][0]) { const [t0, v0] = KEYS[i - 1], [t1, v1] = KEYS[i]; return v0 + (v1 - v0) * (t - t0) / (t1 - t0); } return 1; };

    // grids: the drum pad (one cell per beat, flashing on every hit), the tune grid, the volume meter
    const PAD = [1, 2, 3, 1, 2, 3].map((n, i) => ({ label: String(n), color: i < 3 ? GOLD : PINK, size: 72 }));
    const pad = (t0, t1, o = {}) => a.grid(PAD, t0, t1, { rows: 2, cols: 3, cw: 250, chh: 185, y: 500, caption: 'TWO BARS · ON REPEAT', ...o });
    const MCOL = ['#45d6c8', '#4fdcaa', '#7be07b', '#ffd84a', '#ffc04f', '#ffa45c', '#ff8f6e', '#ff7a93', '#ff5d6c'];
    const meter = (t0, t1) => a.grid(MCOL.map(c => ({ label: '', color: c })), t0, t1, { rows: 1, cols: 9, cw: 96, chh: 70, y: 1040, caption: 'VOLUME' });

    // one two-bar cycle of snare + C major pizzicato harmony; events stop at `stop`
    const pads = [];
    function cycle(t0, v, stop, chord = 'C') {
      [BAR1, BAR2].forEach((hits, b) => {
        const tb = t0 + b * BAR;
        hits.forEach((h, j) => {
          const t = tb + h * BEAT;
          if (t >= stop - 0.02) return;
          a.perc('snare', t, v * (Number.isInteger(h) ? 1 : h % 1 === 0.5 ? 0.8 : 0.55));
          const next = j < hits.length - 1 ? tb + hits[j + 1] * BEAT : tb + BAR;
          for (const g of pads) if (t >= g.t0 && t < g.t1) g.active.push({ t0: t, t1: Math.min(next, stop), i: b * 3 + Math.floor(h) });
        });
        if (tb < stop - 0.05) {
          const end = Math.min(tb + BAR, stop);
          const notes = chord === 'C' ? ['E3', 'G3', 'C4'] : ['E3', 'G#3', 'B3'];
          a.ch(chord, tb, end, { notes, bass: chord === 'C' ? 'C2' : 'E2', vel: 0.35 + 0.6 * v, strikes: [{ o: 0, v: 1 }, { o: 2 * BEAT, v: 0.7 }].filter(s => s.o < end - tb) });
        }
      });
    }
    // continuous loop from t0 to stop; returns cycle start times
    function loop(t0, stop, o = {}) {
      const starts = [];
      for (let t = t0; t < stop - 0.05; t += CYC) { starts.push(t); cycle(t, o.vel ?? vol(t), stop, o.chord ? o.chord(t) : 'C'); }
      return starts;
    }

    // ---- the drum pad and meter are visible in every grid scene ----
    pads.push(pad(0.3, S('what').t1, { revealStep: 0.08 }), pad(S('play').t0, S('why1').t1), pad(S('essence').t0, S('essence').t1));
    const meters = [meter(0.3, S('why3').t1), meter(S('essence').t0, S('essence').t1)];

    // ---- one continuous crescendo from the hook to the crash ----
    const L0 = 0.3, starts = loop(L0, tE);
    starts.forEach((t, i) => {
      const lv = Math.max(1, Math.round(vol(t) * 9));
      for (let c = 0; c < lv; c++) meters[0].active.push({ t0: t, t1: Math.min(t + CYC, S('why3').t1), i: c });
    });

    // repetition counter (hook to play)
    starts.forEach((t, i) => { if (t < S('why1').t0 - 0.2 && (t < S('what2').t0 || t >= S('play').t0)) a.big('× ' + (i + 1), t, Math.min(t + CYC, S('why1').t0), { y: 975, size: 64, family: 'DM Mono', weight: 500, color: '#ffffff', blur: 12 }); });

    // what2: Ravel's own words
    a.big('A PIECE FOR ORCHESTRA', a.w('what2', 'piece'), S('what2').t1, { y: 640, size: 58, color: '#ffffff' });
    a.big('WITHOUT MUSIC', a.w('what2', 'without'), S('what2').t1, { y: 760, size: 84, color: GOLD });

    // why1: 169 times
    a.big('× 169', a.w('why1b', 'one'), S('why1').t1, { y: 990, size: 92, family: 'DM Mono', weight: 500, color: GOLD });

    // why2 - why3: the same tune, a new colour every time
    const TC = ['#62a8ff', '#45d6c8', '#7be07b', '#ffd84a', '#ffa45c', '#ff7a93', '#b48cff', '#8d98ff', '#ff5d6c'];
    const tg = a.grid(TC.map(c => ({ label: 'TUNE', color: c, size: 40 })), S('why2').t0 + 0.1, S('why3').t1, { rows: 3, cols: 3, cw: 250, chh: 140, y: 500, revealStep: 0.06 });
    for (let t = a.w('why2', 'passed'), i = 0; t < S('why3').t1 - 0.1; t += BAR, i++) tg.active.push({ t0: t, t1: Math.min(t + BAR, S('why3').t1), i: i % 9 });
    a.big('SAME TUNE, NEW COLOR', a.w('why2', 'instrument'), S('why2').t1, { y: 970, size: 44, family: 'DM Mono', weight: 500, color: TEAL, blur: 10 });
    a.big('COLOR', a.w('why3', 'color'), a.w('why3', 'volume'), { y: 970, size: 64, color: TEAL });
    a.big('COLOR + VOLUME', a.w('why3', 'volume'), S('why3').t1, { y: 970, size: 64, color: GOLD });

    // key: C major, the lurch to E major, the crash back to C, the collapse
    a.scale(S('key').t0, 'C');
    a.ring(['C'], a.w('key', 'C'), tE, { color: GOLD });
    a.tag('C', a.w('key', 'C'), tE, 'C MAJOR', { color: GOLD, dr: -92 });
    loop(tE, tCrash, { vel: 0.95, chord: () => 'E' });
    a.scale(tE, 'E');
    a.ring(['E', 'G#', 'B'], tE, tCrash, { color: RED });
    a.tag('G#', tE + 0.2, tCrash, 'G#', { color: RED, dr: -75 });
    a.tag('Eb', tE + 0.2, tCrash, 'D#', { color: '#8d98ff', dr: -75 });
    a.tag(0, tE + 0.1, tCrash, 'E MAJOR!', { x: 540, y: 455, color: RED });
    a.ch('C', tCrash, tColl, { notes: ['C3', 'E3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 1.2, strikes: [{ o: 0, v: 1 }, { o: 2 * BEAT / 3, v: 0.8 }] });
    a.scale(tCrash, 'C');
    a.perc('kick', tCrash, 1); a.perc('snare', tCrash, 1);
    for (let i = 0; i < 9; i++) a.perc('snare', tCrash + 0.1 + i * 0.07, 0.9 - i * 0.05);
    a.tag(0, tCrash + 0.1, tColl, 'BACK TO C', { x: 540, y: 455, color: GOLD });
    // the collapse: everything slides down and stops
    const fall = ['C5', 'B4', 'Bb4', 'A4', 'Ab4', 'G4', 'F#4', 'F4', 'E4', 'Eb4', 'D4', 'C#4', 'C4'];
    fall.forEach((n, i) => a.note(n, tColl + i * 0.07, 0.12, { vel: 0.3 - i * 0.012 }));
    a.ch('C', tColl + fall.length * 0.07, S('key').t1 - 0.2, { notes: ['C2', 'G2', 'C3', 'Db3'], bass: 'C2', vel: 1.0, label: 'CRASH' });
    a.perc('kick', tColl + fall.length * 0.07, 1); a.perc('snare', tColl + fall.length * 0.07, 1);

    // essence: one more cycle, quiet to loud, everything lit on the last hit
    const e0 = S('essence').t0 + 0.2, eHit = e0 + 2 * CYC;
    [0, 1].forEach(k => cycle(e0 + k * CYC, 0.3 + 0.35 * k, eHit));
    for (let c = 0; c < 9; c++) {
      const tOn = e0 + (c / 9) * 2 * CYC;
      meters[1].active.push({ t0: tOn, t1: S('essence').t1, i: c });
    }
    for (let i = 0; i < 6; i++) pads[2].active.push({ t0: eHit, t1: S('essence').t1, i });
    a.ch('C', eHit, S('essence').t1 - 0.3, { notes: ['C3', 'E3', 'G3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 1.0 });
    a.perc('kick', eHit, 0.9); a.perc('snare', eHit, 0.9);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
