// Equal temperament: twelve identical half steps. Every key works, every interval is a hair impure.
// Bach's Prelude in C (public domain): only its first four chords, as allowed by the brief.
// Pure intervals are synthesized at their exact ratios (fractional midi) so the difference is audible.
const ST = r => 12 * Math.log2(r);            // ratio -> semitones
const P5 = ST(3 / 2), M3 = ST(5 / 4);           // pure fifth (~7.02), pure major third (~3.86)

module.exports = {
  slug: 'equal-temperament',
  title: 'Equal Temperament',
  segments: [
    { id: 'hook',     text: 'Every piano is slightly out of tune. On purpose.' },
    { id: 'what',     text: 'Equal temperament splits the octave into twelve identical half steps.' },
    { id: 'bach',     text: "Bach's Well Tempered Clavier, from 1722, has preludes and fugues in all twenty four keys." },
    { id: 'choir',    text: 'Barbershop quartets and choirs often tune chords pure, by ear, so they ring.' },
    { id: 'why1',     text: 'Why compromise? Pure intervals use simple ratios.' },
    { id: 'why1b',    text: 'A fifth is three to two. A major third, five to four.' },
    { id: 'why2',     text: 'But stack pure fifths, and you overshoot by the Pythagorean comma.' },
    { id: 'wolf',     text: 'Older tunings kept some intervals pure, but distant keys sounded harsh.' },
    { id: 'wolf2',    text: 'One badly tuned fifth was even called the wolf.' },
    { id: 'equal',    text: 'Equal temperament spreads the error evenly: every half step is the twelfth root of two.' },
    { id: 'fifths',   text: 'Fifths end up a tiny bit narrow, barely audible.' },
    { id: 'thirds',   text: 'Major thirds get noticeably wide. They shimmer, or beat.' },
    { id: 'bachwell', text: "Bach's own tuning wasn't necessarily equal; that became standard later." },
    { id: 'essence',  text: 'A small compromise in every interval... and the freedom to play in every key.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EVERY PIANO', title: 'EQUAL TEMPERAMENT', accent: true, tonic: 0, min: 4.4, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ONE OCTAVE', title: '12 IDENTICAL STEPS', tonic: 0, tail: 1.0 },
    { id: 'bach', segs: ['bach'], label: 'YOU HEAR IT IN', title: 'Well-Tempered Clavier', sub: 'J.S. Bach · Book 1 · 1722', tonic: 0, row: ['C', 'Dm/C', 'G7/B', 'C'], tail: 1.2 },
    { id: 'choir', segs: ['choir'], label: 'YOU HEAR IT IN', title: 'Barbershop & Choirs', sub: 'chords tuned pure, by ear', circle: false, tonic: 0, tail: 2.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'SIMPLE RATIOS', circle: false, tonic: 0, gap: 0.3, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'THE PROBLEM', title: 'IT DOESN’T CLOSE', tonic: 0, tail: 1.4 },
    { id: 'wolf', segs: ['wolf', 'wolf2'], label: 'OLDER TUNINGS', title: 'THE WOLF', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'equal', segs: ['equal'], label: 'THE SOLUTION', title: 'SHARE THE ERROR', tonic: 0, tail: 0.9 },
    { id: 'fifths', segs: ['fifths'], label: 'PURE  →  EQUAL', title: 'THE FIFTH', circle: false, tonic: 0, tail: 2.4 },
    { id: 'thirds', segs: ['thirds'], label: 'PURE  →  EQUAL', title: 'THE MAJOR THIRD', circle: false, tonic: 0, tail: 3.0 },
    { id: 'bachwell', segs: ['bachwell'], label: "BACH'S OWN TUNING", title: 'WELL, NOT EQUAL', tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A SMALL COMPROMISE', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', WHITE = '#ffffff', GREY = '#b9b9c2';
    const MONO = { family: 'DM Mono', weight: 500 };
    const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const NM = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const pcOf = k => (k * 7) % 12;
    const FIFTHS = [...Array(12)].map((_, k) => pcOf(k));
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    // a sustained sound at an exact (fractional) pitch, no key light
    const tone = (m, t0, dur, vel = 0.24) => a.note(m, t0, dur, { vel, show: false });

    // Prelude in C, first four chords: one broken-chord figure per bar (public domain)
    const PRE = [['C', ['C4', 'E4', 'G4', 'C5', 'E5']], ['Dm/C', ['C4', 'D4', 'A4', 'D5', 'F5']], ['G7/B', ['B3', 'D4', 'G4', 'D5', 'F5']], ['C', ['C4', 'E4', 'G4', 'C5', 'E5']]];
    const preBar = ([name, v], t0, six, o = {}) => {
      a.ch(name, t0, t0 + 8 * six, { notes: v, bass: false, mute: true, row: o.row ?? null, hideName: o.hideName });
      [0, 1, 2, 3, 4, 2, 3, 4].forEach((k, i) => a.note(v[k], t0 + i * six, i === 0 ? 8 * six : i === 1 ? 7 * six : six * 1.6, { vel: (i < 2 ? 0.28 : 0.2) * (o.vel ?? 1), show: o.show ?? true }));
      return t0 + 8 * six;
    };

    // ---- hook: twelve evenly spaced dots, a regular dodecagon, a plain C chord ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'C', ALL, { popIn: { t0: 0.2, step: 0.06 } });
    a.poly(NM, 0.6, S('what').t1, { closed: true, dash: true, color: GOLD, width: 3, alpha: 0.55 });
    a.ch('C', 0.3, h1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.55, hideName: true, strikes: [{ o: 0, v: 1 }, { o: 1.8, v: 0.5 }] });
    a.big('SLIGHTLY OUT OF TUNE', a.w('hook', 'slightly'), a.w('hook', 'On') - 0.1, { y: 462, size: 40, ...MONO, color: GOLD });
    a.big('ON PURPOSE', a.w('hook', 'On') - 0.1, h1, { y: 462, size: 48, ...MONO, color: WHITE });

    // ---- what: twelve identical half steps around the octave ----
    const w0 = S('what').t0, w1 = S('what').t1, tTw = a.w('what', 'twelve');
    a.scale(w0, 'C', ALL);
    const steps = [...Array(13)].map((_, i) => [tTw + i * 0.16, i % 12]);
    a.walker(steps, { t1: w1, dr: 34, color: WHITE });
    steps.forEach(([t, p], i) => { a.note(60 + i, t, 0.35, { vel: 0.2 }); if (i < 12) a.arc(p, (p + 1) % 12, t, w1, { steps: 1, color: TEAL, dr: 30 }); });
    a.big('SAME SIZE', a.w('what', 'identical'), w1, { y: 830, size: 60, color: WHITE });
    a.big('12 × ONE HALF STEP', tTw, w1, { y: 462, size: 42, ...MONO, color: TEAL });

    // ---- bach: the first four chords of the Prelude in C ----
    const b0 = S('bach').t0 + 0.15, b1 = S('bach').t1;
    a.scale(S('bach').t0, 'C', a.T.MAJOR);
    const six = Math.min(0.2, (b1 - b0 - 1.2) / 32);
    let tb = b0;
    PRE.forEach((b, i) => { tb = preBar(b, tb, six, { row: i, hideName: true }); });
    a.ch('C', tb, b1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.5, row: 3, hideName: true });
    a.big('ALL 24 KEYS', a.w('bach', 'twenty'), b1, { y: 830, size: 56, color: WHITE });

    // ---- choir: a pure major chord (just intonation), it rings ----
    const c0 = S('choir').t0, c1 = S('choir').t1, tPure = a.w('choir', 'pure');
    a.lissajous(5, 4, c0 + 0.2, c1, { drawIn: 2.2, labelA: 'E × 5', labelB: 'C × 4', drift: 0.02, y: 800, r: 210 });
    a.big('PURE  5 : 4', tPure, c1, { y: 1100, size: 52, ...MONO, color: GOLD });
    [48, 48 + P5, 60, 60 + M3, 60 + P5].forEach((m, i) => tone(m, c0 + 0.3 + i * 0.25, c1 - c0 - 0.5 - i * 0.25, i ? 0.17 : 0.22));
    tone(60, tPure, c1 - tPure - 0.2, 0.2); tone(60 + M3, tPure, c1 - tPure - 0.2, 0.2); tone(60 + P5, tPure, c1 - tPure - 0.2, 0.18);
    keys(['C3', 'G3', 'C4', 'E4', 'G4'], c0 + 0.3, c1);
    a.big('IT RINGS', a.w('choir', 'ring'), c1, { y: 470, size: 48, ...MONO, color: WHITE });

    // ---- why1: simple ratios, fifth 3:2 then major third 5:4 ----
    const y0 = S('why1').t0, y1 = S('why1').t1, tFifth = a.w('why1b', 'fifth'), tThird = a.w('why1b', 'third');
    a.big('3 : 2   ·   5 : 4', a.w('why1', 'simple'), tFifth, { y: 830, size: 64, ...MONO, color: GOLD });
    a.lissajous(3, 2, tFifth - 0.1, tThird - 0.2, { drawIn: 1.4, labelA: 'G × 3', labelB: 'C × 2', drift: 0.03 });
    a.big('FIFTH  3 : 2', tFifth, tThird - 0.2, { y: 470, size: 52, ...MONO, color: GOLD });
    tone(60, tFifth, tThird - tFifth - 0.1, 0.24); tone(60 + P5, tFifth + 0.1, tThird - tFifth - 0.2, 0.22);
    keys(['C4', 'G4'], tFifth, tThird - 0.1);
    a.lissajous(5, 4, tThird - 0.1, y1, { drawIn: 1.6, labelA: 'E × 5', labelB: 'C × 4', drift: 0.03 });
    a.big('MAJOR THIRD  5 : 4', tThird, y1, { y: 470, size: 46, ...MONO, color: TEAL });
    tone(60, tThird, y1 - tThird - 0.1, 0.24); tone(60 + M3, tThird + 0.1, y1 - tThird - 0.2, 0.22);
    keys(['C4', 'E4'], tThird, y1);
    void y0;

    // ---- why2: stack twelve pure fifths -> you overshoot C by a comma ----
    const z0 = S('why2').t0, z1 = S('why2').t1, tSt = a.w('why2', 'stack'), tOver = a.w('why2', 'overshoot');
    a.scale(z0, 'C', ALL);
    const COMMA = 12 * P5 - 84;
    const zs = (tOver - tSt) / 12;
    const zp = [...Array(13)].map((_, k) => [tSt + k * zs, k === 12 ? COMMA : pcOf(k)]);
    a.walker(zp, { t1: z1, dr: 34, color: WHITE });
    for (let k = 1; k <= 12; k++) a.line(pcOf(k - 1), k === 12 ? COMMA : pcOf(k), zp[k][0], z1, { color: k === 12 ? GOLD : TEAL, width: 3 });
    zp.forEach(([t], k) => { let m = 60 + k * P5; while (m >= 72.5) m -= 12; tone(m, t, k === 12 ? z1 - t - 0.2 : zs + 0.25, 0.2); });
    tone(60, tOver + 0.3, z1 - tOver - 0.5, 0.22);
    keys(['C4'], tOver, z1);
    a.arc(0, COMMA, tOver, z1, { steps: COMMA, color: RED, dr: 62 });
    a.big('12 PURE FIFTHS', tSt, tOver, { y: 462, size: 44, ...MONO, color: TEAL });
    a.big('OVERSHOOT!', tOver, z1, { y: 462, size: 48, ...MONO, color: RED });
    a.big('B# ≠ C', a.w('why2', 'Pythagorean'), z1, { y: 830, size: 76, color: WHITE });

    // ---- wolf: an older tuning on the circle of fifths: pure fifths everywhere but one ----
    const f0 = S('wolf').t0, f1 = S('wolf').t1, tHarsh = a.w('wolf', 'harsh'), tWolf = a.w('wolf2', 'wolf');
    a.scale(f0, 'C', ALL);
    a.layout(f0 + 0.1, 1, 1.4);
    for (let k = 0; k < 11; k++) a.line(FIFTHS[k], FIFTHS[k + 1], f0 + 1.4 + k * 0.08, f1, { color: TEAL, width: 3 });
    a.line(8, 3, tHarsh, f1, { color: RED, width: 5, label: 'WOLF', ly: 0 });
    a.ring([8, 3], tWolf, f1, { color: RED });
    a.big('PURE FIFTHS', a.w('wolf', 'pure'), tHarsh, { y: 462, size: 44, ...MONO, color: TEAL });
    a.big('DISTANT KEYS: HARSH', tHarsh, tWolf, { y: 462, size: 40, ...MONO, color: RED });
    a.big('THE WOLF FIFTH', tWolf, f1, { y: 462, size: 44, ...MONO, color: RED });
    // sounds: a pure C - G, then G# - Eb in a Pythagorean tuning (narrow by a comma: it howls)
    const pyth = k => { let m = 60 + k * P5; while (m >= 72) m -= 12; while (m < 60) m += 12; return m; };
    tone(48, a.w('wolf', 'pure'), tHarsh - a.w('wolf', 'pure'), 0.22); tone(48 + P5, a.w('wolf', 'pure') + 0.1, tHarsh - a.w('wolf', 'pure') - 0.1, 0.2);
    keys(['C3', 'G3'], a.w('wolf', 'pure'), tHarsh);
    const gs = pyth(8) - 12, eb = pyth(-3);            // G#3 and Eb4 in Pythagorean tuning
    tone(gs, tHarsh, f1 - tHarsh - 0.2, 0.24); tone(eb, tHarsh + 0.05, f1 - tHarsh - 0.25, 0.24); tone(pyth(0), tHarsh + 0.1, a.at('wolf2') - tHarsh, 0.14);
    tone(gs, tWolf, f1 - tWolf - 0.1, 0.26); tone(eb, tWolf, f1 - tWolf - 0.1, 0.26);
    keys(['G#3', 'D#4'], tHarsh, f1);

    // ---- equal: back to the chromatic circle, twelve identical steps of 12th-root-of-2 ----
    const e0 = S('equal').t0, e1 = S('equal').t1, tEv = a.w('equal', 'evenly'), tRoot = a.w('equal', 'twelfth');
    a.layout(e0, 0, 1.2);
    a.scale(e0, 'C', ALL);
    a.poly(NM, tEv, e1, { closed: true, dash: false, glow: true, color: GOLD, width: 4, alpha: 0.8 });
    const es = [...Array(13)].map((_, i) => [tRoot + i * 0.14, i % 12]);
    a.walker(es, { t1: e1, dr: 34, color: WHITE });
    es.forEach(([t, p], i) => { a.note(60 + i, t, 0.3, { vel: 0.18 }); if (i < 12) a.arc(p, (p + 1) % 12, t, e1, { steps: 1, color: TEAL, dr: 30 }); });
    a.big('ERROR SPREAD EVENLY', tEv, tRoot, { y: 462, size: 40, ...MONO, color: GOLD });
    a.big('¹²√2 ≈ 1.0595', tRoot, e1, { y: 462, size: 48, ...MONO, color: GOLD });
    a.big('EVERY STEP', tRoot + 0.2, e1, { y: 830, size: 56, color: WHITE });
    a.ch('C', e0 + 0.1, tRoot, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.35, shape: false, hideName: true });

    // ---- fifths: pure then equal - nearly the same ----
    const p0 = S('fifths').t0, p1 = S('fifths').t1, pe = a.end('fifths') + 0.1, pm = pe + (p1 - pe) / 2;
    a.lissajous(3, 2, p0 + 0.1, pm, { drawIn: 1.2, labelA: 'PURE', labelB: '3 : 2', drift: 0.02 });
    a.lissajous(3, 2, pm, p1, { drawIn: 0.6, labelA: 'EQUAL', labelB: '≈ 3 : 2', drift: 0.18, color: TEAL });
    a.big('A TINY BIT NARROW', a.w('fifths', 'narrow'), pe, { y: 470, size: 44, ...MONO, color: WHITE });
    a.big('PURE', pe, pm, { y: 470, size: 56, ...MONO, color: GOLD });
    a.big('EQUAL', pm, p1, { y: 470, size: 56, ...MONO, color: TEAL });
    tone(60, p0 + 0.2, pe - p0 - 0.3, 0.18); tone(60 + P5, p0 + 0.2, pe - p0 - 0.3, 0.16);
    tone(60, pe, pm - pe - 0.05, 0.28); tone(60 + P5, pe, pm - pe - 0.05, 0.28);
    tone(60, pm, p1 - pm - 0.2, 0.28); tone(67, pm, p1 - pm - 0.2, 0.28);
    keys(['C4', 'G4'], p0 + 0.2, p1);

    // ---- thirds: pure then equal - the equal third shimmers (beats) ----
    const q0 = S('thirds').t0, q1 = S('thirds').t1, qe = a.end('thirds') + 0.1, qm = qe + (q1 - qe) * 0.45;
    a.lissajous(5, 4, q0 + 0.1, qe, { drawIn: 1.2, labelA: 'EQUAL', labelB: 'C · E', drift: 1.4, color: TEAL });
    a.lissajous(5, 4, qe, qm, { drawIn: 0.5, labelA: 'PURE', labelB: '5 : 4', drift: 0.02 });
    a.lissajous(5, 4, qm, q1, { drawIn: 0.5, labelA: 'EQUAL', labelB: '≈ 5 : 4', drift: 1.4, color: TEAL });
    a.big('NOTICEABLY WIDE', a.w('thirds', 'wide'), a.w('thirds', 'shimmer'), { y: 470, size: 44, ...MONO, color: WHITE });
    a.big('SHIMMER', a.w('thirds', 'shimmer'), qe, { y: 470, size: 52, ...MONO, color: TEAL });
    a.big('PURE', qe, qm, { y: 470, size: 56, ...MONO, color: GOLD });
    a.big('EQUAL: IT BEATS', qm, q1, { y: 470, size: 52, ...MONO, color: TEAL });
    tone(60, q0 + 0.2, qe - q0 - 0.3, 0.16); tone(64, q0 + 0.2, qe - q0 - 0.3, 0.16);
    tone(60, qe, qm - qe - 0.05, 0.3); tone(60 + M3, qe, qm - qe - 0.05, 0.3);
    tone(60, qm, q1 - qm - 0.2, 0.3); tone(64, qm, q1 - qm - 0.2, 0.3);
    keys(['C4', 'E4'], q0 + 0.2, q1);

    // ---- bachwell: the Prelude chords again; well, not equal ----
    const v0 = S('bachwell').t0 + 0.1, v1 = S('bachwell').t1;
    a.scale(S('bachwell').t0, 'C', a.T.MAJOR);
    const six2 = Math.min(0.17, (v1 - v0 - 0.6) / 32);
    let tv = v0;
    PRE.forEach(b => { tv = preBar(b, tv, six2, { vel: 0.8 }); });
    if (tv < v1 - 0.3) a.ch('C', tv, v1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.45 });
    a.big('WELL ≠ EQUAL', a.w('bachwell', 'equal'), a.w('bachwell', 'later') - 0.2, { y: 462, size: 48, ...MONO, color: GOLD });
    a.big('EQUAL: LATER', a.w('bachwell', 'later') - 0.2, v1, { y: 462, size: 48, ...MONO, color: TEAL });

    // ---- essence: a chord in every key, around the circle of fifths, home on C ----
    const s0 = S('essence').t0 + 0.1, s1 = S('essence').t1;
    a.scale(S('essence').t0, 'C', ALL);
    a.poly(NM, s0, s1, { closed: true, dash: true, color: GOLD, width: 3, alpha: 0.5 });
    const KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];
    const kl = Math.min(0.42, (a.at('cta') - s0) / 12);
    KEYS.forEach((k, i) => a.ch(k, s0 + i * kl, s0 + (i + 1) * kl, { vel: 0.6 }));
    a.ch('C', s0 + 12 * kl, s1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.75 });
    a.big('EVERY KEY', a.w('essence', 'freedom'), s1, { y: 462, size: 48, ...MONO, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void PINK; void GREY;
  },
};
