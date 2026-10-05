// The ostinato: a short pattern repeated again and again while the music changes around it.
// Carol of the Bells / Shchedryk (Leontovych, 1914): only its public-domain four-note motif (Bb A Bb G, G minor, 3/4)
// is played; the changing chords under it are a generic descending-bass progression.
// Mission: Impossible is named only: the bass heard there is an ORIGINAL generic pattern, not Schifrin's.
// Boléro: a generic snare figure in 3/4.
const Q = 0.3;          // one beat of the motif (3/4)
const BAR = 3 * Q;
const MOTIF = [['Bb4', 1], ['A4', 0.5], ['Bb4', 0.5], ['G4', 1]];
// the music changing under the motif: a descending bass G F E Eb
const PROG = [
  ['Gm', ['G3', 'Bb3', 'D4'], 'G2'],
  ['Gm/F', ['F3', 'G3', 'Bb3', 'D4'], 'F2'],
  ['C7/E', ['E3', 'G3', 'Bb3', 'C4'], 'E2'],
  ['Eb', ['Eb3', 'G3', 'Bb3'], 'Eb2'],
];

module.exports = {
  slug: 'ostinato',
  title: 'The Ostinato',
  segments: [
    { id: 'hook',    text: 'Four notes, over and over and over... and it never gets boring.' },
    { id: 'what',    text: "That's an ostinato: Italian for obstinate." },
    { id: 'what2',   text: 'A short pattern, repeated again and again, while the music changes around it.' },
    { id: 'carol',   text: 'You hear it in Carol of the Bells. Four notes: B flat, A, B flat, G.' },
    { id: 'carol2',  text: "It comes from Shchedryk, a Ukrainian New Year's song by Mykola Leontovych, from 1914." },
    { id: 'mi',      text: "You hear it in the driving bass of Lalo Schifrin's Mission Impossible theme..." },
    { id: 'bolero',  text: "and in Ravel's Boléro, where the snare drum rhythm never stops." },
    { id: 'why1',    text: 'So why does it work? The motif spans just a minor third: G to B flat.' },
    { id: 'why2',    text: 'Small enough to fit with many different chords.' },
    { id: 'why3',    text: 'And because it never changes, your ear notices everything that does:' },
    { id: 'why3b',   text: 'new harmonies, new voices, rising volume.' },
    { id: 'why4',    text: 'Repetition builds tension, and a hypnotic momentum...' },
    { id: 'why4b',   text: 'the same idea behind riffs and loops in modern music.' },
    { id: 'essence', text: 'Say it again, and again... and repetition turns into momentum.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SAY IT AGAIN', title: 'THE OSTINATO', accent: true, tonic: 7, min: 0.3 + 6 * BAR + 0.4 },
    { id: 'what', segs: ['what', 'what2'], label: 'ITALIAN', title: 'OBSTINATE', circle: false, tonic: 7, row: ['Gm', 'Gm/F', 'C7/E', 'Eb'], gap: 0.4, tail: 0.8 },
    { id: 'carol', segs: ['carol', 'carol2'], label: 'YOU HEAR IT IN', title: 'Carol of the Bells', sub: 'Leontovych · 1914 · in G minor', tonic: 7, gap: 0.4, tail: 2.0 },
    { id: 'mi', segs: ['mi'], label: 'YOU HEAR IT IN', title: 'Mission: Impossible', sub: 'Lalo Schifrin', circle: false, tonic: 2, tail: 2.2 },
    { id: 'bolero', segs: ['bolero'], label: 'YOU HEAR IT IN', title: 'Boléro', sub: 'Maurice Ravel', circle: false, tonic: 0, tail: 2.2 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'A TINY RANGE', tonic: 7, gap: 0.4, tail: 1.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'SPOT THE CHANGE', circle: false, tonic: 7, gap: 0.3, tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'MOMENTUM', circle: false, tonic: 7, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'AGAIN, AND AGAIN', accent: true, tonic: 7, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');

    // the motif looped for n bars from t0, with chords from `prog` (one per bar); returns walker points and bar starts
    const loop = (t0, n, o = {}) => {
      const q = o.q ?? Q, L = 3 * q, pts = [], bars = [], prog = o.prog === undefined ? PROG : o.prog;
      for (let b = 0; b < n; b++) {
        const tb = t0 + b * L, vel = typeof o.vel === 'function' ? o.vel(b) : (o.vel ?? 0.4);
        bars.push(tb);
        let t = tb;
        MOTIF.forEach(([m, d], i) => {
          a.note(m, t, d * q * 0.9, { vel, show: o.show ?? true });
          if (o.high) a.note(a.T.midi(m) + 12, t, d * q * 0.9, { vel: vel * 0.5, show: false });
          if (o.onNote) o.onNote(i, t, d * q);
          pts.push([t, pcOf(m)]);
          t += d * q;
        });
        if (prog) {
          const [nm, notes, bass] = prog[b % prog.length];
          a.ch(nm, tb, b === n - 1 && o.lastEnd ? o.lastEnd : tb + L, { notes, bass, vel: (o.chordVel ?? 0.5) * vel / 0.4, row: o.rows ? b % prog.length : null, hideName: o.hideName, shape: o.shape,
            strikes: [{ o: 0, v: 1 }, { o: q, v: 0.45 }, { o: 2 * q, v: 0.45 }] });
        }
      }
      return { pts, bars, end: t0 + n * L };
    };

    // ---- hook: the motif loops while the chords change underneath ----
    a.scale(0.2, 'G', a.T.MINOR, { popIn: { t0: 0.3, step: 0.12 } });
    const hn = Math.floor((S('hook').t1 - 0.3 - 0.3) / BAR);
    const h = loop(0.3, hn, { vel: b => 0.32 + b * 0.012, lastEnd: S('hook').t1 });
    a.walker(h.pts, { t1: S('hook').t1, dr: -40, color: GOLD });
    h.bars.forEach((t, i) => a.big('× ' + (i + 1), t, Math.min(t + BAR, S('hook').t1), { y: 462, size: 44, ...MONO, color: GOLD, blur: 10 }));

    // ---- what: OSTINATO = OBSTINATE, then the four cells lit bar after bar, chords changing above ----
    a.big('OSTINATO', a.at('what') + 0.2, a.at('what2'), { y: 640, size: 110, color: '#ffffff' });
    a.big('= OBSTINATE', a.w('what', 'obstinate'), a.at('what2'), { y: 790, size: 72, ...MONO, color: GOLD });
    const w0 = a.at('what') + 0.1;
    loop(w0, Math.floor((a.at('what2') - w0) / BAR), { vel: 0.26, show: false, hideName: true, shape: false });
    const g2 = a.grid(MOTIF.map(([m, d]) => ({ label: pcOf(m), sub: d === 1 ? '♩' : '♪', size: 80, subSize: 34, color: GOLD })), a.at('what2'), S('what').t1,
      { rows: 1, cols: 4, cw: 210, chh: 230, y: 620, revealStep: 0.08, caption: 'SAME PATTERN · NEW CHORDS' });
    const w2 = a.at('what2') + 0.1, wn = Math.floor((S('what').t1 - w2 - 0.1) / BAR);
    const wl = loop(w2, wn, { vel: 0.4, show: false, rows: true, shape: false, onNote: (i, t, d) => g2.active.push({ t0: t, t1: t + d, i }) });
    wl.bars.forEach((t, i) => a.big('× ' + (i + 1), t, Math.min(t + BAR, S('what').t1), { y: 1010, size: 56, ...MONO, color: '#ffffff', blur: 10 }));

    // ---- Carol of the Bells: the four notes on their spoken names, then looping ----
    a.scale(S('carol').t0, 'G', a.T.MINOR);
    const tn = [a.w('carol', 'B', 0), a.w('carol', 'A'), a.w('carol', 'B', 1), a.w('carol', 'G')].map(t => t - 0.04);
    a.ch('Gm', S('carol').t0 + 0.1, tn[0], { notes: PROG[0][1], bass: 'G2', vel: 0.35 });
    MOTIF.forEach(([m], i) => a.note(m, tn[i], 0.45, { vel: 0.42 }));
    a.ch('Gm', tn[0], a.at('carol2'), { notes: PROG[0][1], bass: 'G2', vel: 0.3, strikes: [{ o: 0, v: 1 }] });
    a.walker(MOTIF.map(([m], i) => [tn[i], pcOf(m)]), { t1: a.at('carol2'), dr: -40, color: GOLD });
    const c0 = a.at('carol2') + 0.05, cn = Math.floor((S('carol').t1 - c0 - 0.1) / BAR);
    const cl = loop(c0, cn, { vel: 0.38, lastEnd: S('carol').t1 });
    a.walker(cl.pts, { t1: S('carol').t1, dr: -40, color: GOLD });
    a.walker(cl.bars.map((t, i) => [t, pcOf(PROG[i % 4][2])]), { t1: S('carol').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: 82 });
    a.tag(0, a.w('carol2', 'Shchedryk'), S('carol').t1, 'SHCHEDRYK · UKRAINE · 1914', { x: 540, y: 462, color: GOLD });

    // ---- Mission: Impossible (name only): an original, generic driving bass ostinato ----
    const BASS = ['D2', 'D2', 'D3', 'D2', 'C3', 'D2', 'A2', 'C3'];
    const m0 = S('mi').t0 + 0.15, me = 0.17;
    const gm = a.grid(BASS.map((n, i) => ({ label: pcOf(n), sub: n.slice(-1) === '3' ? 'HIGH' : 'LOW', size: 52, subSize: 22, color: i % 2 ? TEAL : BLUE })), m0, S('mi').t1,
      { rows: 1, cols: 8, cw: 120, chh: 190, y: 620, revealStep: 0.05, caption: 'A DRIVING BASS PATTERN' });
    for (let t = m0, i = 0; t < S('mi').t1 - 0.2; t += me, i++) {
      a.note(BASS[i % 8], t, me * 0.85, { vel: 0.45, show: false });
      gm.active.push({ t0: t, t1: t + me, i: i % 8 });
      a.perc('hat', t, i % 2 ? 0.3 : 0.5);
      if (i % 4 === 0) a.perc('kick', t, 0.7);
      if (i % 8 === 4) a.perc('snare', t, 0.5);
    }
    a.big('LOOPED, ON AND ON', a.w('mi', 'bass'), S('mi').t1, { y: 1000, size: 48, ...MONO, color: TEAL });

    // ---- Boléro: a snare rhythm that never stops ----
    const SN = [0, 0.5, 0.5 + 1 / 6, 0.5 + 2 / 6, 1, 1.5, 1.5 + 1 / 6, 1.5 + 2 / 6, 2, 2.5];
    const b0 = S('bolero').t0 + 0.15, bq = 0.5, bb = 3 * bq;
    const gb = a.grid([1, 2, 3].map(n => ({ label: String(n), size: 80, color: PINK })), b0, S('bolero').t1,
      { rows: 1, cols: 3, cw: 260, chh: 220, y: 620, revealStep: 0.1, caption: 'THE SNARE NEVER STOPS' });
    for (let tb = b0, k = 0; tb < S('bolero').t1 - 0.3; tb += bb, k++) {
      SN.forEach((h, j) => {
        const t = tb + h * bq;
        if (t > S('bolero').t1 - 0.2) return;
        a.perc('snare', t, Number.isInteger(h) ? 0.8 : 0.45);
        gb.active.push({ t0: t, t1: t + 0.12, i: Math.floor(h) });
      });
      a.ch('C', tb, tb + bb, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.3, shape: false, hideName: true, strikes: [{ o: 0, v: 1 }, { o: 2 * bq, v: 0.6 }] });
      a.big('× ' + (k + 1), tb, Math.min(tb + bb, S('bolero').t1), { y: 1010, size: 56, ...MONO, color: '#ffffff', blur: 10 });
    }

    // ---- why1-2: a minor third, G to Bb; fits many chords ----
    a.scale(S('why1').t0, 'G', a.T.MINOR);
    const tG = a.w('why1', 'G') - 0.04, tBb = a.w('why1', 'B') - 0.04;
    const y0 = S('why1').t0 + 0.1, yn = Math.max(1, Math.floor((tG - y0) / BAR));
    const y1 = loop(y0, yn, { vel: 0.34, prog: [PROG[0]], hideName: true, lastEnd: tG });
    a.walker(y1.pts, { t1: tG, dr: -40, color: GOLD });
    a.note('G4', tG, 0.6, { vel: 0.42 }); a.note('Bb4', tBb, 0.9, { vel: 0.42 });
    a.ch('Gm', tG, a.at('why2'), { notes: ['G4', 'A4', 'Bb4'], bass: false, mute: true, label: 'G – Bb' });
    a.arc('G', 'Bb', tBb, a.at('why2'), { steps: 3, color: GOLD, dr: 34, label: 'MINOR 3RD', labelR: 165 });
    a.ring(['G', 'A', 'Bb'], tBb, a.at('why2'), { color: GOLD });
    const z0 = a.at('why2') + 0.05, zn = Math.floor((S('why1').t1 - z0 - 0.1) / BAR);
    const zl = loop(z0, zn, { vel: 0.4, lastEnd: S('why1').t1 });
    a.walker(zl.pts, { t1: S('why1').t1, dr: -40, color: GOLD });
    a.tag(0, a.w('why2', 'many'), S('why1').t1, 'FITS MANY CHORDS', { x: 540, y: 462, color: TEAL });

    // ---- why3: the motif never changes; harmony, voices and volume do ----
    const gw = a.grid([{ label: 'MOTIF', sub: 'NEVER CHANGES', size: 52, color: GOLD }, { label: 'HARMONY', sub: 'CHANGES', size: 44, color: TEAL },
      { label: 'VOICES', sub: 'CHANGE', size: 44, color: PINK }, { label: 'VOLUME', sub: 'RISES', size: 44, color: RED }],
      S('why3').t0 + 0.1, S('why3').t1, { rows: 2, cols: 2, cw: 420, chh: 220, y: 560, revealStep: 0.15 });
    const tH = a.w('why3b', 'harmonies') - 0.04, tV = a.w('why3b', 'voices') - 0.04, tVol = a.w('why3b', 'volume') - 0.04;
    const x0 = S('why3').t0 + 0.1, xn = Math.floor((S('why3').t1 - x0 - 0.05) / BAR);
    loop(x0, xn, {
      show: false, vel: b => (x0 + b * BAR >= tVol ? 0.4 + 0.05 * (b - (tVol - x0) / BAR) : 0.34),
      onNote: (i, t, d) => gw.active.push({ t0: t, t1: t + d, i: 0 }),
      prog: null,
    });
    // what changes around it
    for (let b = 0; b < xn; b++) {
      const tb = x0 + b * BAR;
      const p = tb >= tH ? PROG[b % 4] : PROG[0];
      const v = tb >= tVol ? 0.5 + 0.08 * Math.min(4, (tb - tVol) / BAR) : 0.4;
      a.ch(p[0], tb, tb + BAR, { notes: p[1], bass: p[2], vel: v, shape: false, hideName: true, strikes: [{ o: 0, v: 1 }, { o: Q, v: 0.45 }, { o: 2 * Q, v: 0.45 }] });
      if (tb >= tV) a.note(['D5', 'C5', 'Bb4', 'Bb4'][b % 4], tb, BAR * 0.95, { vel: 0.22, show: false });
    }
    gw.active.push({ t0: tH, t1: S('why3').t1, i: 1 }, { t0: tV, t1: S('why3').t1, i: 2 }, { t0: tVol, t1: S('why3').t1, i: 3 });

    // ---- why4: tension and momentum; riffs and loops ----
    const r0 = S('why4').t0 + 0.1, rn = Math.floor((S('why4').t1 - r0 - 0.05) / BAR);
    const rl = loop(r0, rn, { show: false, vel: b => 0.3 + 0.012 * b, prog: [PROG[0], PROG[0], PROG[3], PROG[3]], shape: false, hideName: true });
    rl.bars.forEach((t, b) => { a.perc('kick', t, 0.5 + 0.02 * b); if (a.at('why4b') <= t) { a.perc('snare', t + Q, 0.5); a.perc('hat', t + 2 * Q, 0.4); } });
    a.big('TENSION', a.w('why4', 'tension'), S('why4').t1, { y: 560, size: 84, color: RED });
    a.big('+ MOMENTUM', a.w('why4', 'momentum'), S('why4').t1, { y: 680, size: 84, color: GOLD });
    a.big('RIFFS', a.w('why4b', 'riffs'), S('why4').t1, { x: 330, y: 880, size: 72, ...MONO, color: TEAL });
    a.big('LOOPS', a.w('why4b', 'loops'), S('why4').t1, { x: 750, y: 880, size: 72, ...MONO, color: PINK });
    a.big('THE SAME PRINCIPLE', a.w('why4b', 'idea'), S('why4').t1, { y: 1010, size: 40, ...MONO, color: '#8a8a92', blur: 0 });

    // ---- essence: louder each time, then home on G minor ----
    a.scale(S('essence').t0, 'G', a.T.MINOR);
    const e0 = S('essence').t0 + 0.1, en = Math.floor((a.at('cta') + 0.4 - e0) / BAR);
    const el = loop(e0, en, { vel: b => 0.28 + 0.03 * b, high: true });
    a.walker(el.pts, { t1: el.end, dr: -40, color: GOLD });
    a.ch('Gm', el.end, S('essence').t1 - 0.3, { notes: ['G3', 'Bb3', 'D4', 'G4'], bass: 'G2', vel: 0.85 });
    a.note('G5', el.end, 2, { vel: 0.25, show: false });
    a.perc('kick', el.end, 0.6);
    a.ring(['G'], el.end, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
