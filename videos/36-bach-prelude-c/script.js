// Bach's Prelude in C (BWV 846): one broken-chord pattern, one chord per bar, voices that barely move.
const SIX = 0.13;            // one sixteenth note
const BAR = 16 * SIX;        // the pattern, played twice

module.exports = {
  slug: 'bach-prelude-c',
  title: "Bach's Prelude in C",
  segments: [
    { id: 'hook',     text: 'No tune, no drama. Just one broken chord pattern, bar after bar... and it sounds like heaven.' },
    { id: 'what',     text: "This is Bach's Prelude in C major, from 1722." },
    { id: 'what2',    text: 'The first piece of The Well-Tempered Clavier, Book One.' },
    { id: 'play',     text: 'Here are the first four bars.' },
    { id: 'pattern',  text: 'Each bar is one chord, broken into the same shape of eight notes, played twice.' },
    { id: 'bars',     text: '35 bars, and almost every one works this way.' },
    { id: 'why1',     text: 'So where is the melody? There is none. The melody is the top note of each chord.' },
    { id: 'why2',     text: 'Listen: E, F, F, E. It moves by step.' },
    { id: 'why3',     text: 'Every voice moves as little as possible from chord to chord, so nothing jumps out.' },
    { id: 'pedal1',   text: 'Near the end, the bass holds a G for several bars. A dominant pedal, building tension...' },
    { id: 'pedal2',   text: 'then a long C in the bass brings it home.' },
    { id: 'gounod',   text: 'In 1853, Charles Gounod wrote a melody over it: the famous Ave Maria.' },
    { id: 'essence',  text: 'One pattern, 35 chords, nothing extra...' },
    { id: 'essence2', text: 'harmony alone can sing.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'J.S. BACH · 1722', title: 'PRELUDE IN C', accent: true, tonic: 0, min: 5.5, tail: 0.4 },
    { id: 'what', segs: ['what', 'what2'], gap: 0.3, label: 'WELL-TEMPERED CLAVIER', title: 'BOOK I · NO. 1', sub: 'BWV 846 · 1722', tonic: 0, tail: 0.4 },
    { id: 'play', segs: ['play'], label: 'LISTEN', title: 'THE FIRST FOUR BARS', tonic: 0, row: ['C', 'Dm7', 'G7', 'C'], tail: 0.2 + 4 * BAR + 0.5 },
    { id: 'pattern', segs: ['pattern'], label: 'ONE PATTERN', title: 'EIGHT NOTES, TWICE', tonic: 0, circle: false, tail: 0.6 },
    { id: 'bars', segs: ['bars'], label: 'ONE CHORD PER BAR', title: '35 BARS', tonic: 0, circle: false, tail: 0.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NO MELODY?', tonic: 0, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'THE TOP NOTE', title: 'E · F · F · E', tonic: 0, tail: 1.2 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE SMALLEST MOVES', tonic: 0, tail: 1.4 },
    { id: 'pedal', segs: ['pedal1', 'pedal2'], label: 'THE ENDING', title: 'TWO PEDALS', tonic: 0, gap: 0.35, tail: 1.6 },
    { id: 'gounod', segs: ['gounod'], label: 'CHARLES GOUNOD · 1853', title: 'AVE MARIA', sub: 'Bach / Gounod', tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'HARMONY SINGS', accent: true, tonic: 0, gap: 0.45, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c';
    // the five voices of bars 1-4 (bass, tenor, then the three upper notes)
    const B1 = ['C', ['C4', 'E4', 'G4', 'C5', 'E5']];
    const B2 = ['Dm7/C', ['C4', 'D4', 'A4', 'D5', 'F5']];
    const B3 = ['G7/B', ['B3', 'D4', 'G4', 'D5', 'F5']];
    const B4 = ['C', ['C4', 'E4', 'G4', 'C5', 'E5']];
    const FOUR = [B1, B2, B3, B4];
    // one bar: n0 n1 n2 n3 n4 n2 n3 n4, twice; the first two notes ring on
    const bar = ([name, v], t0, o = {}) => {
      const s = o.six ?? SIX, len = 16 * s, vel = o.vel ?? 1;
      a.ch(name, t0, t0 + len, { notes: v, bass: false, mute: true, row: o.row ?? null, hideName: o.hideName });
      const seq = [0, 1, 2, 3, 4, 2, 3, 4];
      for (let r = 0; r < 2; r++) seq.forEach((k, i) => {
        const t = t0 + (r * 8 + i) * s;
        const dur = i === 0 ? 8 * s : i === 1 ? 7 * s : s * 1.6;
        a.note(v[k], t, dur, { vel: (i === 0 ? 0.3 : i === 1 ? 0.24 : 0.2) * vel, show: o.show ?? false });
      });
      if (o.pedal) a.note(o.pedal, t0, len, { vel: 0.26 * vel, show: false });
      return t0 + len;
    };
    const bars = (list, t0, o = {}) => { let t = t0; list.forEach((b, i) => { t = bar(b, t, { ...o, row: o.rows ? o.rows[i] : null }); }); return t; };
    // fill [t0, t1) with whole bars of the same chord
    const fill = (b, t0, t1, o = {}) => { let t = t0; while (t + (o.six ?? SIX) * 16 <= t1 + 0.05) t = bar(b, t, o); return t; };

    // hook: C major pops in, the pattern starts
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    const hEnd = fill(B1, 0.3, S('hook').t1, { vel: 0.85, show: true });
    if (hEnd < S('hook').t1 - 0.3) a.ch('C', hEnd, S('hook').t1, { notes: ['C4', 'E4', 'G4', 'C5', 'E5'], bass: false, vel: 0.4 });

    // what: the pattern keeps going, softly
    const wEnd = fill(B1, S('what').t0 + 0.05, S('what').t1, { vel: 0.6 });
    a.ch('C', wEnd, S('what').t1, { notes: ['C4', 'E4', 'G4', 'C5', 'E5'], bass: false, vel: 0.35 });
    a.ring(['C'], a.w('what', 'C'), S('what').t1, { color: GOLD });

    // play: bars 1-4 (public domain)
    const p0 = a.end('play') + 0.2;
    a.ch('C', S('play').t0 + 0.05, p0, { notes: ['C4', 'E4', 'G4', 'C5', 'E5'], bass: false, mute: true, hideName: true });
    const pEnd = bars(FOUR, p0, { rows: [0, 1, 2, 3], show: true });
    a.note('C4', pEnd, 1.2, { vel: 0.25, show: false }); a.note('C3', pEnd, 1.2, { vel: 0.2, show: false });
    a.walker(FOUR.map(([, v], i) => [p0 + i * BAR, v[4].replace(/\d/, '')]), { t1: S('play').t1, dr: -40, color: GOLD, label: 'TOP', labelDr: -46 });

    // pattern: eight cells, lit as they play
    const g0 = S('pattern').t0 + 0.15, g1 = S('pattern').t1;
    const cells = ['C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5'];
    const pg = a.grid(cells.map((n, i) => ({ label: n.replace(/\d/, ''), sub: n, size: 56, subSize: 22, color: i < 2 ? '#ff7a93' : i < 5 ? TEAL : GOLD })),
      g0, g1, { rows: 1, cols: 8, cw: 116, chh: 190, y: 600, revealStep: 0.08, caption: 'SAME SHAPE · EVERY BAR · TWICE' });
    const s0 = a.w('pattern', 'shape') - 0.1;
    let t = S('pattern').t0 + 0.1;
    const six2 = (g1 - t - 0.1) / 32;
    for (let r = 0; r < 2; r++) {
      bar(B1, t, { six: six2, vel: 0.8 });
      for (let i = 0; i < 16; i++) { const tt = t + i * six2; if (tt >= s0) pg.active.push({ t0: tt, t1: tt + six2, i: i % 8 }); }
      t += 16 * six2;
    }
    a.big('× 2', a.w('pattern', 'twice'), g1, { y: 930, size: 72, family: 'DM Mono', weight: 500, color: GOLD });

    // bars: 35 cells, one chord each
    const b0 = S('bars').t0 + 0.1, bEnd = S('bars').t1;
    a.grid(Array.from({ length: 35 }, (_, i) => ({ label: String(i + 1), size: 34, color: i % 2 ? TEAL : GOLD })),
      b0, bEnd, { rows: 5, cols: 7, cw: 128, chh: 92, y: 520, revealStep: 0.06, caption: 'ONE CHORD PER BAR' });
    bars([B1, B2, B3], b0, { six: (bEnd - b0 - 0.1) / 48, vel: 0.7 });

    // why1: no melody - just the top note of each chord
    const tTop = a.w('why1', 'top');
    const q = bars([B1, B2], S('why1').t0 + 0.05, { vel: 0.7 });
    fill(B3, q, S('why1').t1, { vel: 0.7 });
    a.ring(['E'], a.w('why1', 'There'), tTop, { color: '#8a8a92' });
    a.ring(['E', 'F'], tTop, S('why1').t1, { color: GOLD });
    a.tag('F', tTop, S('why1').t1, 'TOP NOTE', { color: GOLD, dr: -75 });

    // why2: E F F E on the spoken names
    const tw = [a.w('why2', 'E', 0), a.w('why2', 'F', 0), a.w('why2', 'F', 1), a.w('why2', 'E', 1)];
    FOUR.forEach(([n, v], i) => {
      a.ch(n, tw[i] - 0.04, i < 3 ? tw[i + 1] - 0.04 : S('why2').t1, { notes: v, bass: false, vel: 0.5 });
      a.note(v[4], tw[i], 0.8, { vel: 0.4 });
    });
    a.ch('C', S('why2').t0 + 0.05, tw[0] - 0.04, { notes: B1[1], bass: false, vel: 0.4 });
    a.walker(tw.map((t, i) => [t, ['E', 'F', 'F', 'E'][i]]), { t1: S('why2').t1, dr: -40, color: GOLD, label: 'TOP', labelDr: -46 });
    a.arc('E', 'F', tw[1], tw[3], { steps: 1, color: GOLD, dr: 30 });
    a.arc('F', 'E', tw[3], S('why2').t1, { steps: -1, color: GOLD, dr: 30 });
    a.big('STEP BY STEP', a.w('why2', 'step'), S('why2').t1, { y: 462, size: 48, family: 'DM Mono', weight: 500, color: GOLD });

    // why3: all five voices move by a step or stay put
    const v0 = S('why3').t0 + 0.05, vl = (S('why3').t1 - v0) / 4;
    FOUR.forEach((b, i) => bar(b, v0 + i * vl, { six: vl / 16, vel: 0.8 }));
    a.walker(FOUR.map(([, v], i) => [v0 + i * vl, v[4].replace(/\d/, '')]), { t1: S('why3').t1, dr: -40, color: GOLD, label: 'TOP', labelDr: -46 });
    a.walker(FOUR.map(([, v], i) => [v0 + i * vl, v[0].replace(/\d/, '')]), { t1: S('why3').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: -110 });
    a.big('A STEP, OR NO MOVE AT ALL', a.w('why3', 'little'), S('why3').t1, { y: 462, size: 40, family: 'DM Mono', weight: 500, color: TEAL });

    // pedal: G held in the bass (tension), then a long C (home)
    const d0 = S('pedal').t0 + 0.05, tC = a.w('pedal2', 'C') - 0.04, tHome = a.w('pedal2', 'home');
    const G7 = ['G7', ['G2', 'B3', 'D4', 'F4', 'B4']];
    fill(B1, d0, a.w('pedal1', 'G') - 0.04, { vel: 0.6 });
    const gp0 = a.w('pedal1', 'G') - 0.04;
    const gEnd = fill(G7, gp0, tC, { vel: 0.8 });
    a.note('G1', gp0, tC - gp0, { vel: 0.3, show: false });
    if (gEnd < tC - 0.2) a.ch('G7', gEnd, tC, { notes: ['B3', 'D4', 'F4', 'G4'], bass: 'G2', vel: 0.6 });
    a.walker([[gp0, 'G'], [tC, 'C']], { t1: S('pedal').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: -110 });
    a.ring(['G'], gp0, tC, { color: RED });
    a.tag('G', a.w('pedal1', 'dominant'), tC, 'DOMINANT PEDAL', { color: RED, x: 540, y: 462 });
    const cEnd = fill(['C', ['C2', 'G3', 'C4', 'E4', 'G4']], tC, tHome + 0.6, { vel: 0.8 });
    a.ch('C', cEnd, S('pedal').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.75 });
    a.ring(['C'], tC, S('pedal').t1, { color: TEAL });
    a.tag('C', tC + 0.1, S('pedal').t1, 'TONIC PEDAL', { color: TEAL, x: 540, y: 462 });

    // gounod: the pattern carries on underneath
    const n0 = S('gounod').t0 + 0.05;
    const nEnd = bars([B1, B2, B3, B4], n0, { vel: 0.7, six: (S('gounod').t1 - n0) / 64 });
    a.ring(['E', 'F'], a.w('gounod', 'melody'), nEnd, { color: GOLD });
    a.tag('F', a.w('gounod', 'melody'), nEnd, 'A NEW MELODY ON TOP', { color: GOLD, x: 540, y: 462 });

    // essence: bars 1-4 once more, then the final chord
    const e0 = S('essence').t0 + 0.05, eC = a.at('cta');
    const eEnd = bars([B1, B2, B3], e0, { vel: 0.8, six: Math.min(SIX, (eC - e0) / 48) });
    a.ch('C', Math.max(eEnd, eC - 0.1), S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5', 'E5'], bass: 'C2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
