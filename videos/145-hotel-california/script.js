// The chords of Hotel California: an eight-chord loop in B minor whose F#7 (the harmonic minor's
// major five chord) brings back a leading tone, A#, before every restart.
// Copyright: only the chord progression is played (block chords, generic groove) - no melody,
// no guitar parts, no lyrics.
const PROG = ['Bm', 'F#7', 'A', 'E', 'G', 'D', 'Em', 'F#7'];
const ROMAN = ['i', 'V7', 'VII', 'IV', 'VI', 'III', 'iv', 'V7'];
const V = {
  Bm: [['B3', 'D4', 'F#4'], 'B2'], 'F#7': [['A#3', 'C#4', 'E4', 'F#4'], 'F#2'], A: [['A3', 'C#4', 'E4'], 'A2'], E: [['G#3', 'B3', 'E4'], 'E2'],
  G: [['G3', 'B3', 'D4'], 'G2'], D: [['F#3', 'A3', 'D4'], 'D3'], Em: [['G3', 'B3', 'E4'], 'E2'],
};

module.exports = {
  slug: 'hotel-california',
  title: 'The Chords of Hotel California',
  segments: [
    { id: 'hook',    text: "Eight chords, looping forever. Here's the secret of Hotel California." },
    { id: 'what',    text: 'B minor, F sharp seven, A, E, G, D, E minor, F sharp seven, and back.' },
    { id: 'song',    text: 'The Eagles released it in 1976.' },
    { id: 'song2',   text: 'It won the Grammy for Record of the Year in 1978...' },
    { id: 'song3',   text: 'and it ends with a long dual guitar solo by Don Felder and Joe Walsh.' },
    { id: 'why1',    text: 'So why does it work? F sharp seven is the five chord of B minor.' },
    { id: 'why2',    text: 'It holds A sharp, the raised seventh: a leading tone, a half step below B.' },
    { id: 'why2b',   text: 'It pulls straight home, as in our harmonic minor video.' },
    { id: 'why3',    text: 'Then the pairs: A to E, and G to D. Each moves by a fifth, small steps around the circle.' },
    { id: 'why4',    text: 'The loop starts dark, then drifts through brighter major chords...' },
    { id: 'why4b',   text: 'until F sharp seven brings tension before every restart.' },
    { id: 'why5',    text: 'Eight chords that never quite feel finished. So the song turns hypnotic.' },
    { id: 'essence', text: 'One raised note, and a loop that keeps circling back. A hotel you can never leave.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EIGHT CHORDS, ONE LOOP', title: 'HOTEL CALIFORNIA', accent: true, tonic: 11, row: PROG, lead: 0.3, min: 6.0 },
    { id: 'what', segs: ['what'], label: 'THE PROGRESSION', title: 'IN B MINOR', tonic: 11, row: PROG, tail: 1.2 },
    { id: 'song', segs: ['song', 'song2', 'song3'], label: 'YOU HEAR IT IN', title: 'Hotel California', sub: 'Eagles · 1976 · in B minor', tonic: 11, circle: false, gap: 0.3, tail: 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE FIVE CHORD', tonic: 11, tail: 0.5 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE LEADING TONE', tonic: 11, gap: 0.3, tail: 0.9 },
    { id: 'why3', segs: ['why3'], label: 'CIRCLE OF FIFTHS', title: 'MOVING BY FIFTHS', tonic: 11, tail: 1.8 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'DARK, BRIGHT, TENSE', tonic: 11, row: PROG, gap: 0.2, tail: 0.9 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'NEVER FINISHED', tonic: 11, circle: false, tail: 2.1 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'YOU CAN NEVER LEAVE', accent: true, tonic: 11, row: PROG, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const MIN = a.T.MINOR, HM = [0, 2, 3, 5, 7, 8, 11];
    const ROOT = c => c.replace(/m$|7$/, '');
    const C = (c, t0, t1, o = {}) => a.ch(c, t0, t1, { notes: V[c][0], bass: V[c][1], ...o });
    // a loop of the progression; o.beats strikes per chord, o.drums a light generic groove
    function loop(t0, t1, o = {}) {
      const n = o.n ?? 8, len = (t1 - t0) / n, beats = o.beats ?? 2, pts = [];
      for (let i = 0; i < n; i++) {
        const c = PROG[(i + (o.from ?? 0)) % 8], t = t0 + i * len;
        C(c, t, t + len, { row: o.rows === false ? null : (i + (o.from ?? 0)) % 8, vel: o.vel ?? 0.75, hideName: o.hideName,
          strikes: Array.from({ length: beats }, (_, k) => ({ o: (k * len) / beats, v: k ? 0.55 : 1 })) });
        pts.push([t, ROOT(c)]);
        if (o.grid) o.grid.active.push({ t0: t, t1: t + len, i: (i + (o.from ?? 0)) % 8 });
        if (c === 'F#7' && o.ring !== false) a.ring(['Bb'], t + 0.05, t + len, { color: RED });
        if (o.drums) { const b = len / 2; for (let k = 0; k < 2; k++) { a.perc('kick', t + k * b, 0.5); a.perc('snare', t + k * b + b / 2, 0.4); a.perc('hat', t + k * b + b / 4, 0.2); a.perc('hat', t + k * b + (3 * b) / 4, 0.2); } }
      }
      if (o.walker !== false) a.walker(pts, { t1: o.wt1 ?? t1, dr: 34, color: o.wcolor || WHITE, label: o.wlabel, labelDr: 82 });
      return t0 + n * len;
    }

    // ---- hook (cover): the loop on the circle, roots walked, the A# lit on every F#7 ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'B', MIN, { popIn: { t0: 0.2, step: 0.06 } });
    loop(0.3, h1, { vel: 0.7, beats: 2 });
    a.tag('Bb', 0.4, h1, 'A#', { dr: 150, color: RED });

    // ---- what: each chord on its spoken name ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const tw = [a.w('what', 'B'), a.w('what', 'F'), a.w('what', 'A'), a.w('what', 'E'), a.w('what', 'G'), a.w('what', 'D'), a.w('what', 'E', 1), a.w('what', 'F', 1), a.w('what', 'back')].map(t => t - 0.05);
    const wp = [];
    PROG.forEach((c, i) => { C(c, i ? tw[i] : w0 + 0.05, tw[i + 1], { row: i, vel: 0.8 }); wp.push([i ? tw[i] : w0 + 0.05, ROOT(c)]); });
    C('Bm', tw[8], w1, { row: 0, vel: 0.85 }); wp.push([tw[8], 'B']);
    a.walker(wp, { t1: w1, dr: 34, color: WHITE, label: 'ROOT', labelDr: 82 });
    a.ring(['Bb'], tw[1], tw[2], { color: RED }); a.ring(['Bb'], tw[7], tw[8], { color: RED });
    a.tag('Bb', tw[1], w1, 'A#', { dr: 150, color: RED });

    // ---- song: the 8 chords as a grid, played as a loop with a generic groove ----
    const s0 = S('song').t0, s1 = S('song').t1;
    const gS = a.grid(PROG.map((c, i) => ({ label: c, sub: ROMAN[i], color: c === 'F#7' ? RED : c === 'Bm' ? BLUE : c === 'Em' ? TEAL : GOLD, size: 60 })), s0 + 0.05, s1,
      { rows: 2, cols: 4, cw: 235, chh: 190, y: 500, revealStep: 0.06 });
    const sl = (s1 - s0 - 0.6) / 16;
    let t = s0 + 0.15;
    for (let r = 0; r < 2; r++) t = loop(t, t + 8 * sl, { grid: gS, rows: false, walker: false, ring: false, drums: true, beats: 4, vel: 0.6, hideName: true });
    C('Bm', t, s1, { vel: 0.7, hideName: true, shape: false });
    a.big('GRAMMY · RECORD OF THE YEAR', a.w('song2', 'Grammy') - 0.05, a.at('song3') - 0.1, { y: 1010, size: 38, ...MONO, color: GOLD, blur: 8 });
    a.big('1978', a.w('song2', '1978') - 0.05, a.at('song3') - 0.1, { y: 1075, size: 40, ...MONO, color: GOLD, blur: 0 });
    a.big('DUAL GUITAR SOLO', a.w('song3', 'dual') - 0.05, s1, { y: 1010, size: 40, ...MONO, color: PINK, blur: 8 });
    a.big('DON FELDER · JOE WALSH', a.w('song3', 'Don') - 0.05, s1, { y: 1075, size: 36, ...MONO, color: WHITE, blur: 0 });

    // ---- why1: F#7 is the five chord of B minor ----
    const x0 = S('why1').t0, x1 = S('why1').t1, tF = a.w('why1', 'F') - 0.05;
    a.scale(x0, 'B', MIN);
    C('Bm', x0 + 0.05, tF, { vel: 0.55 });
    C('F#7', tF, x1, { vel: 0.8 });
    a.tag('F#', a.w('why1', 'five') - 0.05, S('why2').t1, 'V', { dr: -75, color: GOLD });
    a.tag('B', a.w('why1', 'B') - 0.05, x1, 'HOME', { dr: -75, color: BLUE });

    // ---- why2: the raised seventh A# - a leading tone a half step below B ----
    const y0 = S('why2').t0, y1 = S('why2').t1, tA = a.w('why2', 'A') - 0.05, tHome = a.w('why2b', 'home') - 0.05;
    C('F#7', y0, tHome, { vel: 0.7, strikes: [{ o: 0, v: 1 }, { o: tA - y0, v: 0.8 }] });
    a.scale(a.w('why2', 'raised') - 0.05, 'B', HM);
    a.ring(['Bb'], tA, y1, { color: RED });
    a.tag('Bb', tA, y1, 'A#', { dr: 150, color: RED });
    a.tag(0, a.w('why2', 'raised') - 0.05, y1, 'RAISED 7TH · LEADING TONE', { x: 540, y: 462, color: RED });
    a.arc('Bb', 'B', a.w('why2', 'half') - 0.05, y1, { steps: 1, color: RED, dr: 30, label: 'HALF STEP', labelR: 165 });
    a.note('A#4', a.w('why2', 'half') - 0.05, 0.9, { vel: 0.36 });
    a.note('A#4', tHome - 0.5, 0.45, { vel: 0.38 });
    C('Bm', tHome, y1, { notes: ['B3', 'D4', 'F#4', 'B4'], vel: 0.85 });

    // ---- why3: morph to the circle of fifths; A to E and G to D are neighbours ----
    const z0 = S('why3').t0, z1 = S('why3').t1;
    a.scale(z0, 'B', MIN);
    a.layout(z0 + 0.1, 1);
    const tA2 = a.w('why3', 'A') - 0.05, tE = a.w('why3', 'E') - 0.05, tG = a.w('why3', 'G') - 0.05, tD = a.w('why3', 'D') - 0.05, tEach = a.w('why3', 'Each') - 0.05;
    C('Bm', z0 + 0.05, tA2, { vel: 0.5 });
    C('A', tA2, tE, { vel: 0.8 }); C('E', tE, tG, { vel: 0.8 });
    C('G', tG, tD, { vel: 0.8 }); C('D', tD, tEach, { vel: 0.8 });
    a.line('A', 'E', tE, z1, { arrow: true, color: GOLD, r: 215 });
    a.line('G', 'D', tD, z1, { arrow: true, color: TEAL, r: 215 });
    a.tag(0, a.w('why3', 'fifth') - 0.05, z1, 'UP A FIFTH · NEXT DOOR', { x: 540, y: 462, color: GOLD });
    // after "Each": the two pairs again, then the whole loop walked on the circle of fifths
    const pl = (z1 - tEach - 0.2) / 4;
    ['A', 'E', 'G', 'D'].forEach((c, i) => C(c, tEach + i * pl, tEach + (i + 1) * pl, { vel: 0.7 }));
    a.walker([[tA2, 'A'], [tE, 'E'], [tG, 'G'], [tD, 'D'], [tEach, 'A'], [tEach + pl, 'E'], [tEach + 2 * pl, 'G'], [tEach + 3 * pl, 'D']], { t1: z1, dr: 34, color: WHITE, label: 'ROOT', labelDr: 82 });
    a.layout(z1 - 0.1, 0, 0.9);

    // ---- why4: dark -> brighter majors -> tension -> restart ----
    const q0 = S('why4').t0, q1 = S('why4').t1, tTen = a.w('why4b', 'F') - 0.05;
    a.scale(q0, 'B', MIN);
    const qa = a.w('why4', 'drifts') - 0.05, ql = (tTen - qa) / 5;
    C('Bm', q0 + 0.05, qa, { row: 0, vel: 0.8 });
    ['A', 'E', 'G', 'D', 'Em'].forEach((c, i) => C(c, qa + i * ql, qa + (i + 1) * ql, { row: i + 2, vel: 0.75 }));
    C('F#7', tTen, a.w('why4b', 'restart') - 0.05, { row: 7, vel: 0.85 });
    C('Bm', a.w('why4b', 'restart') - 0.05, q1, { row: 0, vel: 0.85 });
    a.ring(['Bb'], tTen, a.w('why4b', 'restart') - 0.05, { color: RED });
    a.tag(0, a.w('why4', 'dark') - 0.05, qa, 'DARK', { x: 540, y: 945, color: BLUE });
    a.tag(0, a.w('why4', 'brighter') - 0.05, tTen, 'BRIGHTER MAJOR CHORDS', { x: 540, y: 945, color: GOLD });
    a.tag(0, tTen, a.w('why4b', 'restart') - 0.05, 'TENSION', { x: 540, y: 945, color: RED });
    a.tag(0, a.w('why4b', 'restart') - 0.05, q1, 'RESTART', { x: 540, y: 945, color: BLUE });

    // ---- why5: the loop as an 8-step ring that never ends (grid lit in a cycle) ----
    const r0 = S('why5').t0, r1 = S('why5').t1;
    const gL = a.grid(PROG.map((c, i) => ({ label: c, sub: ROMAN[i], color: c === 'F#7' ? RED : c === 'Bm' ? BLUE : c === 'Em' ? TEAL : GOLD, size: 60 })), r0, r1,
      { rows: 2, cols: 4, cw: 235, chh: 190, y: 500 });
    const rl = (r1 - r0 - 0.2) / 10;
    let rt = r0 + 0.1;
    for (let k = 0; k < 10; k++, rt += rl) {
      const c = PROG[k % 8];
      C(c, rt, rt + rl, { vel: 0.7, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: rl / 2, v: 0.55 }] });
      gL.active.push({ t0: rt, t1: rt + rl, i: k % 8 });
    }
    a.big('↻  AND AGAIN', a.w('why5', 'finished') - 0.05, r1, { y: 1010, size: 46, ...MONO, color: WHITE, blur: 8 });
    a.big('HYPNOTIC', a.w('why5', 'hypnotic') - 0.05, r1, { y: 1080, size: 46, ...MONO, color: GOLD, blur: 8 });

    // ---- essence: the loop once more, ending on F#7 -> Bm ----
    const e0 = S('essence').t0, e1 = S('essence').t1, eL = a.at('cta') - 0.2;
    a.scale(e0, 'B', MIN);
    loop(e0 + 0.1, eL, { vel: 0.75, beats: 2, wt1: e1 });
    C('Bm', eL, e1 - 0.3, { row: 0, notes: ['B3', 'D4', 'F#4', 'B4'], bass: 'B2' });
    a.ring(['B'], eL, e1, { color: BLUE });
    a.tag('Bb', a.w('essence', 'raised') - 0.05, e1, 'A#', { dr: 150, color: RED });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
