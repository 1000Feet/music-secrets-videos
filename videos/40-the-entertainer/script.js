// The Entertainer, decoded: a steady oom-pah left hand against a syncopated, chromatic right hand.
const SX = 0.15, E8 = 2 * SX, BAR = 8 * SX; // sixteenth, eighth, one 2/4 bar
// the opening (public domain), in sixteenths from the downbeat: [note, start, length]
const MOTIF = [['D4', -2, 1], ['D#4', -1, 1], ['E4', 0, 1], ['C5', 1, 2], ['E4', 3, 1], ['C5', 4, 2], ['E4', 6, 1], ['C5', 7, 9]];

module.exports = {
  slug: 'the-entertainer',
  title: 'The Entertainer',
  segments: [
    { id: 'hook',    text: 'You know this tune from the very first notes. But why does it bounce?' },
    { id: 'what',    text: 'This is The Entertainer, a piano rag by Scott Joplin, from 1902.' },
    { id: 'what2',   text: 'It became hugely popular again in 1973, when the film The Sting used it.' },
    { id: 'play',    text: "Here's how it opens." },
    { id: 'why1',    text: 'So what makes it ragtime? The left hand is steady, like a march.' },
    { id: 'why1b',   text: 'Bass note on the beat, chord on the off beat. Oom, pah, oom, pah.' },
    { id: 'why2',    text: 'Against it, the right hand is syncopated. It lands between the beats.' },
    { id: 'why2b',   text: 'Ragged time. That is ragtime.' },
    { id: 'why3',    text: 'And the opening? D, D sharp, E: chromatic steps, leaning into the leap.' },
    { id: 'why4',    text: 'Joplin even wrote on some of his rags: it is never right to play ragtime fast.' },
    { id: 'why4b',   text: 'A steady tempo is what makes the syncopation swing.' },
    { id: 'essence', text: 'A steady heartbeat below, a playful melody tripping ahead of it.' },
    { id: 'essence2', text: "That's ragtime, and the seed of jazz." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SCOTT JOPLIN · 1902', title: 'THE ENTERTAINER', accent: true, tonic: 0, min: 6.0 },
    { id: 'what', segs: ['what'], label: 'A PIANO RAG', title: 'THE ENTERTAINER', sub: 'Scott Joplin · 1902 · in C', tonic: 0, tail: 0.5 },
    { id: 'what2', segs: ['what2'], label: 'A SECOND LIFE', title: 'THE STING', circle: false, tonic: 0, tail: 0.9 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'THE ENTERTAINER', sub: 'Scott Joplin · in C', tonic: 0, tail: 0.3 + 4 * BAR + 2 * SX + 1.4 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'THE LEFT HAND', title: 'OOM - PAH', circle: false, tonic: 0, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'THE RIGHT HAND', title: 'SYNCOPATION', circle: false, tonic: 0, gap: 0.3, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'CHROMATIC STEPS', tonic: 0, tail: 2.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'SCOTT JOPLIN SAID', title: 'NEVER FAST', circle: false, tonic: 0, gap: 0.4, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'THE SEED OF JAZZ', accent: true, tonic: 0, gap: 0.45, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c';
    // left-hand voicings: [oom 1, oom 2, chord]
    const LH = { C: ['C3', 'G2', ['E3', 'G3', 'C4']], G7: ['G2', 'D3', ['F3', 'B3', 'D4']] };
    // oom-pah from t0 for a list of bar chords; grid (optional) lights one cell per eighth
    function oompah(t0, bars, o = {}) {
      const v = o.vel ?? 1, stop = o.stop ?? Infinity;
      bars.forEach((c, b) => {
        const tb = t0 + b * BAR;
        if (tb >= stop - 0.05) return;
        const [b1, b2, ch] = LH[c], end = Math.min(tb + BAR, stop);
        a.ch(c, tb, end, { notes: [b1, ...ch], bass: false, mute: true, hideName: o.hideName, strikes: [1, 2, 3].map(k => ({ o: k * E8, v: k % 2 ? 0.5 : 0.8 })).filter(s => s.o < end - tb) });
        for (let k = 0; k < 4; k++) {
          const t = tb + k * E8;
          if (t >= stop - 0.02) break;
          if (k % 2 === 0) a.note(k ? b2 : b1, t, E8 * 0.85, { vel: 0.34 * v, show: false });
          else ch.forEach((n, j) => a.note(n, t + j * 0.008, E8 * 0.6, { vel: 0.17 * v, show: false }));
          if (o.grid) o.grid.active.push({ t0: t, t1: Math.min(t + E8, stop), i: k });
        }
      });
      return t0 + bars.length * BAR;
    }
    // the opening motif: downbeat at tD; returns walker points
    function motif(tD, o = {}) {
      const pts = [];
      MOTIF.forEach(([n, u, d], i) => {
        const len = i === MOTIF.length - 1 ? (o.hold ?? d) : d;
        a.note(n, tD + u * SX, len * SX * 0.92, { vel: o.vel ?? 0.4, show: o.show ?? true });
        pts.push([tD + u * SX, n.replace(/\d/, '')]);
        if (o.grid && u >= 0) o.grid.active.push({ t0: tD + u * SX, t1: tD + (u + Math.min(d, 2)) * SX, i: 8 + u });
      });
      return pts;
    }

    // hook: C major pops in, the motif over an oom-pah left hand
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const h0 = 0.6;
    const hp = motif(h0, { hold: 7 });
    a.walker(hp, { t1: S('hook').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    oompah(h0, ['C', 'C', 'C', 'G7', 'C'], { vel: 0.8, stop: S('hook').t1 });

    // what: a quiet oom-pah, the key of C
    const wb = Math.ceil((S('what').t1 - S('what').t0 - 0.1) / BAR);
    oompah(S('what').t0 + 0.05, Array.from({ length: wb }, (_, i) => (i % 4 === 3 ? 'G7' : 'C')), { vel: 0.55, stop: S('what').t1 });
    a.tag(0, a.w('what', 'rag'), S('what').t1, 'RAGTIME', { x: 540, y: 455, color: GOLD });

    // what2: 1902, then 1973 and The Sting
    const g2 = a.grid([{ label: '1902', sub: 'THE RAG', size: 80, color: '#8a8a92' }, { label: '1973', sub: 'THE STING', size: 80, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 380, chh: 220, y: 640, revealStep: 0.2 });
    g2.active.push({ t0: S('what2').t0 + 0.1, t1: a.w('what2', '1973') - 0.05, i: 0 }, { t0: a.w('what2', '1973') - 0.05, t1: S('what2').t1, i: 1 });
    a.big('HUGELY POPULAR AGAIN', a.w('what2', 'hugely'), S('what2').t1, { y: 980, size: 44, family: 'DM Mono', weight: 500, color: GOLD, blur: 10 });
    const w2 = Math.ceil((S('what2').t1 - S('what2').t0) / BAR);
    oompah(S('what2').t0 + 0.05, Array.from({ length: w2 }, (_, i) => (i % 4 === 3 ? 'G7' : 'C')), { vel: 0.5, stop: S('what2').t1 });

    // play: the opening twice over the oom-pah, then a final C chord
    const p0 = a.end('play') + 0.3 + 2 * SX;
    const pp1 = motif(p0, { hold: 7 }), pp2 = motif(p0 + 2 * BAR, { hold: 9 });
    a.walker(pp1, { t1: p0 + 2 * BAR - 2 * SX, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    a.walker(pp2, { t1: p0 + 4 * BAR, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    const pEnd = oompah(p0, ['C', 'C', 'C', 'C']);
    a.ch('C', pEnd, S('play').t1 - 0.1, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.9 });
    a.note('C5', pEnd, 1.0, { vel: 0.36 });

    // why1: the oom-pah grid, one cell per eighth note
    const OP = [{ label: 'OOM', sub: 'BASS', color: TEAL, size: 46 }, { label: 'PAH', sub: 'CHORD', color: PINK, size: 46 }, { label: 'OOM', sub: 'BASS', color: TEAL, size: 46 }, { label: 'PAH', sub: 'CHORD', color: PINK, size: 46 }];
    const g1 = a.grid(OP, S('why1').t0 + 0.1, S('why1').t1, { rows: 1, cols: 4, cw: 230, chh: 210, y: 600, revealStep: 0.1, caption: 'ONE BAR · STEADY AS A MARCH' });
    const n1 = Math.floor((S('why1').t1 - S('why1').t0 - 0.2) / BAR);
    oompah(S('why1').t0 + 0.15, Array.from({ length: n1 }, (_, i) => (i % 4 === 3 ? 'G7' : 'C')), { grid: g1, vel: 0.85 });
    a.big('ON THE BEAT', a.w('why1b', 'beat'), a.w('why1b', 'chord'), { y: 960, size: 56, color: TEAL });
    a.big('OFF THE BEAT', a.w('why1b', 'chord'), a.w('why1b', 'Oom'), { y: 960, size: 56, color: PINK });

    // why2: left hand vs right hand, sixteenth by sixteenth
    const lhCells = ['OOM', '', 'PAH', '', 'OOM', '', 'PAH', ''].map(l => ({ label: l, color: TEAL, size: 28 }));
    const rhCells = MOTIF.slice(2).map(([n]) => n.replace(/\d/, '')).reduce((arr, n, i) => { arr[MOTIF[i + 2][1]] = { label: n, color: GOLD, size: 40 }; return arr; }, Array.from({ length: 8 }, () => ({ label: '', color: GOLD })));
    const g2b = a.grid([...lhCells, ...rhCells], S('why2').t0 + 0.1, S('why2').t1, { rows: 2, cols: 8, cw: 122, chh: 150, y: 560, revealStep: 0.03 });
    const lhGrid = { active: [] };
    let q = S('why2').t0 + 0.4 + 2 * SX;
    while (q + 2 * BAR < S('why2').t1 + 0.1) {
      motif(q, { hold: 7, grid: g2b, vel: 0.36, show: false });
      oompah(q, ['C', 'C'], { grid: lhGrid, vel: 0.8 });
      q += 2 * BAR;
    }
    lhGrid.active.forEach(e => g2b.active.push({ t0: e.t0, t1: e.t1, i: e.i * 2 }));
    a.big('LEFT HAND', S('why2').t0 + 0.3, S('why2').t1, { x: 540, y: 520, size: 24, family: 'DM Mono', weight: 500, color: TEAL, blur: 0 });
    a.big('RIGHT HAND', S('why2').t0 + 0.3, S('why2').t1, { x: 540, y: 890, size: 24, family: 'DM Mono', weight: 500, color: GOLD, blur: 0 });
    a.big('BETWEEN THE BEATS', a.w('why2', 'between'), a.w('why2b', 'Ragged'), { y: 990, size: 52, color: GOLD });
    a.big('RAGGED TIME', a.w('why2b', 'Ragged'), S('why2').t1, { y: 990, size: 72, color: RED });

    // why3: D, D#, E... then the leap to C
    a.scale(S('why3').t0, 'C');
    const tw = [a.w('why3', 'D', 0), a.w('why3', 'D', 1), a.w('why3', 'E')].map(x => x - 0.04);
    const tLeap = a.w('why3', 'leap') - 0.04;
    a.ch('C', S('why3').t0 + 0.1, S('why3').t1, { notes: ['E3', 'G3', 'C4'], bass: 'C3', vel: 0.4, strikes: [{ o: 0, v: 1 }] });
    ['D4', 'D#4', 'E4'].forEach((n, i) => a.note(n, tw[i], 0.5, { vel: 0.38 }));
    a.walker([[tw[0], 'D'], [tw[1], 'D#'], [tw[2], 'E'], [tLeap, 'C']], { t1: S('why3').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    a.arc('D', 'D#', tw[1], S('why3').t1, { steps: 1, color: GOLD, dr: 30 });
    a.arc('D#', 'E', tw[2], S('why3').t1, { steps: 1, color: GOLD, dr: 30 });
    a.tag('D#', a.w('why3', 'chromatic'), S('why3').t1, 'CHROMATIC', { color: GOLD, dr: -92 });
    a.ring(['C'], tLeap, S('why3').t1, { color: TEAL });
    a.tag('C', tLeap, S('why3').t1, 'THE LEAP', { color: TEAL, dr: -92 });
    a.note('E4', tLeap, 0.12, { vel: 0.3 }); a.note('C5', tLeap + 0.12, 1.0, { vel: 0.42 });
    // the motif once more at the end of the scene
    motif(S('why3').t1 - 2.0, { hold: 6, vel: 0.36, show: false });

    // why4: Joplin's instruction, then the rag at a steady tempo
    a.big('IT IS NEVER RIGHT', a.w('why4', 'never'), S('why4').t1, { y: 600, size: 62, color: '#ffffff' });
    a.big('TO PLAY RAGTIME FAST', a.w('why4', 'never') + 0.3, S('why4').t1, { y: 700, size: 62, color: GOLD });
    a.big('— SCOTT JOPLIN', a.w('why4', 'never') + 0.6, S('why4').t1, { y: 790, size: 30, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('STEADY TEMPO = SWING', a.w('why4b', 'steady'), S('why4').t1, { y: 960, size: 50, color: TEAL });
    const s0 = a.at('why4b') + 0.2;
    const ns = Math.floor((S('why4').t1 - s0) / BAR);
    oompah(s0, Array.from({ length: ns }, () => 'C'), { vel: 0.8 });
    for (let k = 0; k + 1 < ns; k += 2) motif(s0 + k * BAR, { hold: 7, vel: 0.32, show: false });
    oompah(S('why4').t0 + 0.1, Array.from({ length: Math.max(1, Math.floor((s0 - S('why4').t0 - 0.1) / BAR)) }, () => 'C'), { vel: 0.45, stop: s0 });

    // essence: the motif twice more, landing on C
    const e0 = S('essence').t0 + 0.2 + 2 * SX;
    const ep = motif(e0, { hold: 7 });
    a.walker(ep, { t1: e0 + 2 * BAR, dr: -40, color: GOLD });
    const eEnd = oompah(e0, ['C', 'C', 'C', 'C']);
    motif(e0 + 2 * BAR, { hold: 9, vel: 0.34 });
    a.ch('C', eEnd, S('essence').t1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.9 });
    a.note('C5', eEnd, 2.0, { vel: 0.36 });
    a.tag(0, a.w('essence2', 'jazz'), S('essence').t1, 'THE SEED OF JAZZ', { x: 540, y: 455, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
