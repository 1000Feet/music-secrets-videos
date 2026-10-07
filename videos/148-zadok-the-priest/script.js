// Zadok the Priest: the ultimate build-up. A long, quiet introduction that explodes when the choir enters.
// Brief/copyright: Handel's music is NOT reconstructed. We play our own rising broken-chord pattern
// in D major (D, G/D, D, A/C#) over a steady bass, then a generic full D major chord with timpani,
// a choir-like chord and a short trumpet-like fanfare on D major chord tones (our own).
// The Champions League anthem is only named, never played.
const BEAT = 0.5, S16 = BEAT / 4, BAR = 4 * BEAT;
const PROG = [['D', ['A3', 'D4', 'F#4'], 'D2'], ['G', ['B3', 'D4', 'G4'], 'D2'], ['D', ['A3', 'D4', 'F#4'], 'D2'], ['A', ['A3', 'C#4', 'E4'], 'C#2', 'A/C#']];
const PAT = [0, 1, 2, 1]; // per beat: low, middle, high, middle (sixteenths)

module.exports = {
  slug: 'zadok-the-priest',
  title: 'Zadok the Priest',
  segments: [
    { id: 'hook',    text: 'A quiet, rippling introduction... that builds, and builds... until it explodes.' },
    { id: 'what',    text: 'This is Zadok the Priest, by Handel, from 1727.' },
    { id: 'what2',   text: 'One of four Coronation Anthems he wrote for King George the Second.' },
    { id: 'since',   text: 'It has been performed at every British coronation since...' },
    { id: 'since2',  text: "including King Charles the Third's, in 2023." },
    { id: 'ucl',     text: 'And the Champions League anthem, by Tony Britten in 1992...' },
    { id: 'ucl2',    text: 'is an adaptation based on it.' },
    { id: 'why1',    text: 'So why does it give you chills? It starts with waiting.' },
    { id: 'why1b',   text: 'Soft broken chords repeat in the strings, over a steady bass...' },
    { id: 'why1c',   text: 'slowly gaining intensity. Pure anticipation.' },
    { id: 'why2',    text: 'Then, on the word Zadok, the full choir and orchestra burst in.' },
    { id: 'why3',    text: 'The key is D major: bright, and ideal for trumpets...' },
    { id: 'why3b',   text: 'as in the Hallelujah Chorus.' },
    { id: 'why4',    text: 'Holding back the entrance makes the release overwhelming.' },
    { id: 'why4b',   text: 'The longer the wait, the bigger the payoff.' },
    { id: 'essence', text: 'Make them wait... then give them everything.' },
    { id: 'essence2', text: 'The oldest trick in the book.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'G. F. HANDEL · 1727', title: 'ZADOK THE PRIEST', accent: true, tonic: 2, min: 6.0, tail: 1.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'A CORONATION ANTHEM', title: 'ZADOK THE PRIEST', sub: 'G. F. Handel · 1727 · in D', tonic: 2, gap: 0.3, tail: 0.6 },
    { id: 'since', segs: ['since', 'since2'], gap: 0.2, label: 'EVERY CORONATION SINCE', title: '1727 TO 2023', circle: false, tonic: 2, tail: 0.6 },
    { id: 'ucl', segs: ['ucl', 'ucl2'], gap: 0.2, label: 'A MODERN ADAPTATION', title: 'CHAMPIONS LEAGUE', circle: false, tonic: 2, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'THE WAIT', tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE ENTRANCE', tonic: 2, tail: 2.4 },
    { id: 'why3', segs: ['why3', 'why3b'], gap: 0.2, label: 'WHY IT WORKS', title: 'D MAJOR', tonic: 2, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'THE PAYOFF', title: 'WAIT, THEN RELEASE', circle: false, tonic: 2, gap: 0.3, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'GIVE THEM EVERYTHING', accent: true, tonic: 2, gap: 0.6, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', GREY = '#8a8a92', ORANGE = '#ffa45c', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n);
    const CHOIR = { partials: [1, 0.55, 0.35, 0.22, 0.12, 0.07], attack: 0.06, release: 0.5 };
    const BRASS = { partials: [1, 0.8, 0.65, 0.5, 0.38, 0.27, 0.18, 0.1], attack: 0.03, release: 0.15 };
    const MCOL = [TEAL, TEAL, TEAL, '#7be07b', '#7be07b', GOLD, GOLD, ORANGE, ORANGE, RED];

    // our rising broken-chord pattern from t0 to t1; intensity ramps v0 -> v1 (0..1)
    function build(t0, t1, o = {}) {
      const v0 = o.v0 ?? 0.15, v1 = o.v1 ?? 1;
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.05) break;
        const [name, notes, bass, label] = PROG[b % 4], end = Math.min(tb + BAR, t1);
        if (o.shape !== false) a.ch(name, tb, end, { notes, bass: false, mute: true, label, hideName: o.hideName });
        for (let k = 0; k < 16; k++) {
          const t = tb + k * S16;
          if (t >= t1 - 0.02) break;
          const lv = v0 + (v1 - v0) * (t - t0) / Math.max(0.1, t1 - t0);
          const n = midi(notes[PAT[k % 4]]) + (lv > 0.55 ? 12 : 0);
          a.note(n, t, S16 * 0.9, { vel: 0.1 + 0.2 * lv, show: false });
          if (lv > 0.8) a.note(n - 12, t, S16 * 0.9, { vel: 0.12 * lv, show: false });
          if (k % 2 === 0) a.note(bass, t, S16 * 1.6, { vel: 0.14 + 0.2 * lv, show: false });
        }
      }
    }
    // an intensity meter that fills from tA to tB (and stays full until t1):
    // two vertical VU-style meters beside the circle, or one horizontal bar (o.horizontal)
    function meter(t0, t1, tA, tB, o = {}) {
      const fill = (g, order) => order.forEach((i, k) => g.active.push({ t0: tA + (k + 1) * (tB - tA) / 10 - 0.05, t1: o.off ?? t1, i }));
      if (o.horizontal) {
        const g = a.grid(MCOL.map(c => ({ label: '', color: c })), t0, t1, { rows: 1, cols: 10, cw: o.cw ?? 78, chh: o.chh ?? 62, y: o.y ?? 425, revealStep: 0.02, caption: o.caption });
        fill(g, MCOL.map((_, i) => i));
        return;
      }
      const cells = MCOL.slice().reverse().map(c => ({ label: '', color: c }));
      [105, 975].forEach(x => {
        const g = a.grid(cells, t0, t1, { rows: 10, cols: 1, cw: 84, chh: 46, x, y: 600, revealStep: 0.02 });
        fill(g, MCOL.map((_, k) => 9 - k));
      });
    }
    // the entrance: full chord, timpani roll, choir and our trumpet-like fanfare
    function boom(t, dur, o = {}) {
      a.ch('D', t, t + dur, { notes: ['D3', 'A3', 'D4', 'F#4', 'A4', 'D5'], bass: 'D2', vel: o.vel ?? 1, snap: true, hideName: o.hideName, strikes: [{ o: 0, v: 1 }, { o: 1.2 * BEAT, v: 0.5 }] });
      for (let k = 0; k < 10; k++) a.perc('kick', t + k * 0.07, (k ? 0.5 - k * 0.03 : 1) * (o.vel ?? 1));
      a.perc('snare', t, 0.4);
      ['D3', 'A3', 'D4', 'F#4', 'A4', 'D5'].forEach((n, i) => a.note(n, t + i * 0.01, dur, { vel: 0.11, show: false, tone: CHOIR }));
      if (o.fanfare !== false) [['D5', 0.25], ['D5', 0.4], ['D5', 0.55], ['F#5', 0.75], ['A5', 1.05]].forEach(([n, u], i) =>
        a.note(n, t + u, i === 4 ? 1.0 : 0.13, { vel: 0.17, show: false, tone: BRASS }));
    }

    // ---- hook (cover): the build-up with a filling meter, then the explosion ----
    a.scale(0.15, 'D', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.06 } });
    const tEx = a.w('hook', 'explodes') - 0.05, h1 = S('hook').t1;
    build(0.25, tEx, { v0: 0.3, v1: 1 });
    meter(0.25, h1, 0.0, tEx);
    boom(tEx, h1 - tEx - 0.1, { hideName: true });
    a.big('ZADOK!', tEx, h1, { y: 830, size: 150, color: GOLD, blur: 60 });
    a.ring(['D', 'F#', 'A'], tEx, h1, { color: GOLD });

    // ---- what: the anthem, 1727, for George II ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'D', a.T.MAJOR);
    build(w0 + 0.1, w1, { v0: 0.15, v1: 0.45 });
    a.big('1 OF 4 CORONATION ANTHEMS', a.w('what2', 'four') - 0.05, a.w('what2', 'King') - 0.05, { y: 462, size: 40, ...MONO, color: GOLD, blur: 8 });
    a.big('FOR KING GEORGE II', a.w('what2', 'King') - 0.05, w1, { y: 462, size: 48, ...MONO, color: WHITE, blur: 8 });
    a.tag('D', a.w('what', 'Zadok'), w1, 'D MAJOR', { dr: -92, color: GOLD });

    // ---- since: every coronation since, up to 2023 ----
    const s0 = S('since').t0, s1 = S('since').t1;
    build(s0 + 0.05, s1, { v0: 0.2, v1: 0.5, shape: false });
    const gs = a.grid([{ label: '1727', sub: 'GEORGE II', size: 80, color: GREY }, { label: '2023', sub: 'CHARLES III', size: 80, color: GOLD }],
      s0 + 0.1, s1, { rows: 1, cols: 2, cw: 420, chh: 240, y: 560, revealStep: 0.25 });
    gs.active.push({ t0: s0 + 0.2, t1: a.w('since2', 'King') - 0.05, i: 0 }, { t0: a.w('since2', 'King') - 0.05, t1: s1, i: 1 });
    a.big('EVERY BRITISH CORONATION', a.w('since', 'every') - 0.05, s1, { y: 920, size: 44, ...MONO, color: WHITE, blur: 8 });

    // ---- ucl: named only ----
    const u0 = S('ucl').t0, u1 = S('ucl').t1;
    build(u0 + 0.05, u1, { v0: 0.25, v1: 0.55, shape: false });
    a.big('THE ANTHEM', u0 + 0.2, a.w('ucl', 'Tony') - 0.05, { y: 700, size: 90, color: GREY, blur: 10 });
    a.big('TONY BRITTEN', a.w('ucl', 'Tony') - 0.05, u1, { y: 620, size: 90, color: WHITE, blur: 16 });
    a.big('1992', a.w('ucl', '1992') - 0.05, u1, { y: 740, size: 64, ...MONO, color: GREY, blur: 0 });
    a.big('BASED ON ZADOK', a.w('ucl2', 'adaptation') - 0.05, u1, { y: 900, size: 64, color: GOLD, blur: 20 });
    a.big('AN ADAPTATION', a.w('ucl2', 'adaptation') - 0.05, u1, { y: 990, size: 40, ...MONO, color: '#b9b9c2', blur: 0 });

    // ---- why1: the wait - broken chords, steady bass, rising intensity ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    a.scale(y0, 'D', a.T.MAJOR);
    const tBr = a.w('why1b', 'broken') - 0.05, tBass = a.w('why1b', 'bass') - 0.05, tSl = a.w('why1c', 'slowly') - 0.05;
    a.ch('D', y0 + 0.1, tBr, { notes: ['A3', 'D4', 'F#4'], bass: 'D2', vel: 0.3 });
    build(tBr, y1, { v0: 0.1, v1: 0.75 });
    meter(tBr, y1, tBr, y1 + 0.6);
    a.big('BROKEN CHORDS', tBr, tSl, { y: 462, size: 44, ...MONO, color: TEAL, blur: 8 });
    a.ring(['D'], tBass, y1, { color: WHITE });
    a.tag('D', tBass, y1, 'STEADY BASS', { dr: -92, color: WHITE });
    a.big('ANTICIPATION', a.w('why1c', 'anticipation') - 0.1, y1, { y: 462, size: 56, color: GOLD, blur: 18 });
    a.big('GAINING INTENSITY', tSl, a.w('why1c', 'anticipation') - 0.1, { y: 462, size: 44, ...MONO, color: ORANGE, blur: 8 });

    // ---- why2: on 'Zadok' everything enters ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const tZ = a.w('why2', 'Zadok') - 0.05;
    build(z0 + 0.05, tZ, { v0: 0.7, v1: 1 });
    meter(z0 + 0.05, z1, z0 - 0.3, tZ);
    boom(tZ, z1 - tZ - 0.2, { hideName: true });
    a.big('ZADOK!', tZ, a.w('why2', 'full') - 0.05, { y: 830, size: 150, color: GOLD, blur: 60 });
    a.ring(['D', 'F#', 'A'], tZ, z1, { color: GOLD });
    a.big('FULL CHOIR + ORCHESTRA', a.w('why2', 'full') - 0.05, a.end('why2') + 0.3, { y: 462, size: 42, ...MONO, color: GOLD, blur: 10 });
    a.big('TRUMPETS · TIMPANI', a.end('why2') + 0.3, z1, { y: 462, size: 46, ...MONO, color: RED, blur: 10 });
    a.perc('kick', a.end('why2') + 0.3, 0.6);
    [['A4', 0], ['D5', 0.2], ['F#5', 0.4], ['A5', 0.6]].forEach(([n, u]) => a.note(n, a.end('why2') + 0.3 + u, 0.5, { vel: 0.16, show: false, tone: BRASS }));

    // ---- why3: D major, bright, ideal for trumpets ----
    const q0 = S('why3').t0, q1 = S('why3').t1;
    a.scale(q0, 'D', a.T.MAJOR);
    const tD = a.w('why3', 'D') - 0.05, tTr = a.w('why3', 'trumpets') - 0.05;
    a.ch('D', q0 + 0.1, q1, { notes: ['A3', 'D4', 'F#4', 'A4'], bass: 'D2', vel: 0.45, strikes: [{ o: 0, v: 0.6 }, { o: tTr - q0 - 0.1, v: 0.9 }] });
    a.ring(['D'], tD, q1, { color: GOLD });
    a.tag('D', tD, q1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('BRIGHT', a.w('why3', 'bright') - 0.05, tTr, { y: 462, size: 56, color: GOLD, blur: 18 });
    a.big('IDEAL FOR TRUMPETS', tTr, a.w('why3b', 'Hallelujah') - 0.05, { y: 462, size: 46, ...MONO, color: RED, blur: 10 });
    a.big('LIKE THE HALLELUJAH CHORUS', a.w('why3b', 'Hallelujah') - 0.05, q1, { y: 462, size: 38, ...MONO, color: WHITE, blur: 8 });
    [['D5', 0], ['D5', 0.15], ['D5', 0.3], ['F#5', 0.5], ['A5', 0.8]].forEach(([n, u], i) => a.note(n, tTr + u, i === 4 ? 0.8 : 0.12, { vel: 0.17, show: false, tone: BRASS }));
    a.perc('kick', tTr, 0.5); a.perc('kick', tTr + 0.8, 0.6);

    // ---- why4: the longer the wait, the bigger the payoff ----
    const p0 = S('why4').t0, p1 = S('why4').t1;
    const tLong = a.w('why4b', 'longer') - 0.05, tPay = a.w('why4b', 'payoff') - 0.05;
    build(p0 + 0.1, tPay, { v0: 0.15, v1: 1, shape: false });
    meter(p0 + 0.1, p1, p0 + 0.1, tPay, { horizontal: true, y: 560, cw: 90, chh: 110, caption: 'THE WAIT' });
    a.big('HOLD BACK', a.at('why4') + 0.1, tLong, { y: 820, size: 80, color: TEAL, blur: 16 });
    a.big('THE LONGER THE WAIT', tLong, tPay, { y: 820, size: 60, color: ORANGE, blur: 16 });
    a.big('PAYOFF!', tPay, p1, { y: 860, size: 140, color: GOLD, blur: 60 });
    boom(tPay, p1 - tPay - 0.2, { vel: 0.9 });

    // ---- essence: a quick wait, then everything ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'D', a.T.MAJOR);
    const tEv = a.w('essence', 'everything') - 0.05;
    build(e0 + 0.1, tEv, { v0: 0.2, v1: 1 });
    meter(e0 + 0.1, e1, e0 + 0.1, tEv);
    boom(tEv, e1 - tEv - 0.3);
    a.ring(['D', 'F#', 'A'], tEv, e1, { color: GOLD });
    a.big('THE OLDEST TRICK', a.w('essence2', 'oldest') - 0.05, e1, { y: 462, size: 48, ...MONO, color: GOLD, blur: 12 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
