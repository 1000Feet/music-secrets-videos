// Boogie-woogie: a rolling left-hand pattern (C E G A Bb A G E) over the 12-bar blues.
// Copyrighted recordings: only the generic left-hand pattern, generic right-hand chords and an
// original short riff are played, over a 12-bar blues in C. No melodies from any record.
const BAR = 1.6, BEAT = BAR / 4, SW = 2 / 3;   // 150 BPM, swung eighths

module.exports = {
  slug: 'boogie-woogie',
  title: 'Boogie-Woogie',
  segments: [
    { id: 'hook',    text: 'One rolling left hand turned the blues into a dance. This is boogie woogie.' },
    { id: 'what',    text: 'Eight notes per bar: up the chord, plus the sixth and the flat seven, then back down.' },
    { id: 'what2',   text: 'C, E, G, A, B flat, A, G, E.' },
    { id: 's1',      text: "In 1928, Pinetop's Boogie Woogie by Pinetop Smith gave the style its name." },
    { id: 's2',      text: 'Then in 1938, the From Spirituals to Swing concert at Carnegie Hall...' },
    { id: 's2b',     text: 'with pianists Albert Ammons, Meade Lux Lewis and Pete Johnson,' },
    { id: 's2c',     text: 'helped launch a boogie woogie craze.' },
    { id: 'why1',    text: 'So why does it work? It runs over the twelve bar blues: one, four, five.' },
    { id: 'why1b',   text: 'The same shape simply moves to F and G.' },
    { id: 'why2',    text: 'The eighth notes are usually swung: long, short, long, short.' },
    { id: 'why2b',   text: 'That gives it the rolling, driving feel.' },
    { id: 'why3',    text: 'On top, the right hand plays bluesy riffs and repeated chords. Two independent layers.' },
    { id: 'why4',    text: "Early rock and roll guitar riffs, like Chuck Berry's, adapted these boogie bass patterns." },
    { id: 'essence', text: 'One rolling left hand, eight notes per bar... and the blues started to dance.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE ROLLING LEFT HAND', title: 'BOOGIE-WOOGIE', accent: true, tonic: 0, lead: 0.5, min: 4 * BAR, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'THE LEFT HAND', title: 'EIGHT NOTES A BAR', tonic: 0, gap: 0.3, tail: BAR + 0.2 },
    { id: 's1', segs: ['s1'], label: 'THE NAME', title: "Pinetop's Boogie Woogie", sub: 'Pinetop Smith · 1928', circle: false, tonic: 0, min: 4 * BAR, tail: 0.3 },
    { id: 's2', segs: ['s2', 's2b', 's2c'], label: 'THE CRAZE', title: 'From Spirituals to Swing', sub: 'Carnegie Hall · 1938', circle: false, tonic: 0, gap: 0.2, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWELVE BAR BLUES', circle: false, tonic: 0, tail: 0.5 },
    { id: 'why1b', segs: ['why1b'], label: 'WHY IT WORKS', title: 'SAME SHAPE', tonic: 0, min: 3 * BAR, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'SWUNG EIGHTHS', circle: false, tonic: 0, gap: 0.3, tail: 0.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'TWO LAYERS', circle: false, tonic: 0, min: 4 * BAR, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHAT CAME NEXT', title: 'ROCK AND ROLL', tonic: 0, min: 4 * BAR, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE BLUES DANCES', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', LILAC = '#8d98ff', GREY = '#55555d';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const PAT = [0, 4, 7, 9, 10, 9, 7, 4];             // C E G A Bb A G E
    const DEGS = [0, 4, 7, 9, 10];
    const NN = ['C', 'E', 'G', 'A', 'Bb', 'A', 'G', 'E'];
    const NCOL = [PINK, '#ffd84a', TEAL, BLUE, LILAC, BLUE, TEAL, '#ffd84a'];
    const ROOT = { C7: 36, F7: 41, G7: 43 };
    const RH = { C7: ['E4', 'G4', 'Bb4', 'C5'], F7: ['Eb4', 'F4', 'A4', 'C5'], G7: ['F4', 'G4', 'B4', 'D5'] };
    const PC = { C7: 'C', F7: 'F', G7: 'G' };
    const FORM = ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'C7'];
    const ROMAN = { C7: 'I', F7: 'IV', G7: 'V' }, COL = { C7: PINK, F7: GREEN, G7: TEAL };
    const eighth = (t, j) => t + Math.floor(j / 2) * BEAT + (j % 2 ? BEAT * SW : 0);
    const OFF = [1, 3, 5, 7].map(j => ({ o: eighth(0, j), v: j % 4 === 1 ? 0.85 : 0.65 }));

    // one bar of boogie: rolling left hand, offbeat right-hand chords, light swung kit.
    // o.lh / o.rh: grids to light (8 cells each), o.walk: collect walker points
    function bar(name, t, o = {}) {
      const vel = o.vel ?? 1, stop = o.stop ?? Infinity, r = ROOT[name];
      const tr = o.tonic ?? 0;
      PAT.forEach((iv, j) => {
        const tt = eighth(t, j);
        if (tt > stop - 0.05) return;
        const dur = (j % 2 ? BEAT * (1 - SW) : BEAT * SW) * 0.92;
        a.note(r + iv, tt, dur, { vel: 0.5 * vel, show: false, tonic: tr });
        if (o.lh) o.lh.active.push({ t0: tt, t1: tt + (j % 2 ? BEAT * (1 - SW) : BEAT * SW), i: j });
        if (o.walk) o.walk.push([tt, (ROOT[name] + iv) % 12]);
      });
      if (o.rh !== false) {
        const len = Math.min(BAR, stop - t);
        a.ch(name, t, t + len, { notes: RH[name], bass: false, strikes: OFF.filter(s => s.o < len - 0.05), vel: (o.cv ?? 0.6) * vel, hideName: o.hideName, shape: o.shape, row: o.row, tonic: tr });
      }
      for (let b = 0; b < 4; b++) {
        const tb = t + b * BEAT;
        if (tb > stop - 0.05) break;
        a.perc('hat', tb, 0.3 * vel); a.perc('hat', tb + BEAT * SW, 0.2 * vel);
        if (b % 2) a.perc('snare', tb, 0.16 * vel); else a.perc('kick', tb, 0.3 * vel);
      }
    }
    // bars from a list between t0 and t1, returns end time
    function play(t0, t1, names, o = {}) {
      let t = t0, i = 0;
      for (; t < t1 - 0.4; t += BAR, i++) {
        const n = names[i % names.length];
        if (o.grid) o.grid.active.push({ t0: t, t1: Math.min(t + BAR, t1), i: (o.i0 ?? 0) + i });
        bar(n, t, { ...o, stop: t1, row: o.rows ? i % names.length : undefined });
      }
      return t;
    }
    const twelve = (t0, t1, o = {}) => a.grid(FORM.map(c => ({ label: ROMAN[c], sub: c, color: COL[c], size: o.size ?? 48 })), t0, t1, { rows: 3, cols: 4, cw: o.cw ?? 200, chh: o.chh ?? 130, y: o.y ?? 700, revealStep: o.revealStep });

    // ---- hook: the pattern lights up on the circle from the first frame ----
    a.scale(0, 'C', DEGS, { popIn: { t0: 0.02, step: 0.06 } });
    const hw = [];
    const hEnd = play(0.1, S('hook').t1, ['C7', 'C7', 'F7', 'C7'], { walk: hw, vel: 0.9 });
    a.walker(hw, { t1: S('hook').t1, dr: 34, label: 'LEFT HAND', labelDr: 82, color: GOLD });

    // ---- what: the eight notes, one by one on their names ----
    const w0 = S('what').t0;
    a.scale(w0, 'C', DEGS);
    const gN = a.grid(NN.map((n, i) => ({ label: n, color: NCOL[i], size: 44 })), w0, S('what').t1, { rows: 1, cols: 8, cw: 112, chh: 100, y: 382, revealStep: 0.05 });
    const tUp = a.w('what', 'up'), tSix = a.w('what', 'sixth'), tSev = a.w('what', 'seven'), tDown = a.w('what', 'down');
    a.ch('C', w0 + 0.05, tUp, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45 });
    a.ch('C', tUp, tSix - 0.05, { notes: ['C3', 'E3', 'G3'], bass: false, mute: true });
    a.note('C3', tUp, 0.3, { vel: 0.3 }); a.note('E3', tUp + 0.2, 0.3, { vel: 0.3 }); a.note('G3', tUp + 0.4, 0.3, { vel: 0.3 });
    a.ch('C6', tSix - 0.05, tSev - 0.05, { notes: ['C3', 'E3', 'G3', 'A3'], bass: false, vel: 0.5, label: 'C6' });
    a.ring(['A'], tSix, S('what').t1, { color: BLUE });
    a.tag('A', tSix, S('what').t1, 'SIXTH', { color: BLUE, dr: -92 });
    a.ch('C7', tSev - 0.05, a.at('what2') - 0.1, { notes: ['C3', 'E3', 'G3', 'Bb3'], bass: false, vel: 0.5 });
    a.ring(['Bb'], tSev, S('what').t1, { color: LILAC });
    a.tag('Bb', tSev, S('what').t1, 'FLAT 7', { color: LILAC, dr: -92 });
    a.note('Bb3', tDown, 0.25, { vel: 0.3 }); a.note('A3', tDown + 0.18, 0.25, { vel: 0.3 }); a.note('G3', tDown + 0.36, 0.25, { vel: 0.3 }); a.note('E3', tDown + 0.54, 0.4, { vel: 0.3 });
    // the note names, spoken
    const spoken = [['C', 0], ['E', 0], ['G', 0], ['A', 0], ['B', 0], ['A', 1], ['G', 1], ['E', 1]].map(([w, n]) => a.w('what2', w, n) - 0.03);
    spoken.forEach((t, j) => {
      a.note(36 + PAT[j], t, 0.35, { vel: 0.42 });
      gN.active.push({ t0: t, t1: j < 7 ? spoken[j + 1] : t + 0.5, i: j });
    });
    a.walker(spoken.map((t, j) => [t, PAT[j]]), { t1: a.end('what2') + 0.3, dr: 34, color: GOLD });
    // then the pattern, in time
    const wp = a.end('what2') + 0.25, ww = [];
    play(wp, S('what').t1, ['C7'], { lh: gN, walk: ww, rh: false, vel: 0.9 });
    a.walker(ww, { t1: S('what').t1, dr: 34, color: GOLD });

    // ---- s1 + s2: one full 12-bar chorus, a card on top ----
    const c0 = S('s1').t0, cEnd = S('s2').t1;
    const g12 = twelve(c0, cEnd, { revealStep: 0.04 });
    play(c0 + 0.05, cEnd, [...FORM, ...FORM], { grid: g12, hideName: true, shape: false });
    const gName = a.grid([{ label: '1928', sub: 'GAVE THE STYLE ITS NAME', color: GOLD, size: 64, subSize: 26 }], c0, S('s1').t1, { rows: 1, cols: 1, cw: 640, chh: 190, y: 470 });
    gName.active.push({ t0: a.w('s1', 'name') - 0.3, t1: S('s1').t1, i: 0 });
    const PIAN = [['AMMONS', 'ALBERT', PINK, 'Albert'], ['LEWIS', 'MEADE LUX', TEAL, 'Meade'], ['JOHNSON', 'PETE', BLUE, 'Pete']];
    const gP = a.grid(PIAN.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 40, subSize: 22 })), S('s2').t0, cEnd, { rows: 1, cols: 3, cw: 300, chh: 190, y: 470, revealStep: 0.15 });
    PIAN.forEach(([, , , w], i) => gP.active.push({ t0: a.w('s2b', w) - 0.1, t1: cEnd, i }));

    // ---- why1: the 12-bar form, I / IV / V lit on their words ----
    const y0 = S('why1').t0;
    const gF = twelve(y0, S('why1').t1, { y: 520, cw: 235, chh: 170, size: 54 });
    const tI = a.w('why1', 'one'), tIV = a.w('why1', 'four'), tV = a.w('why1', 'five');
    FORM.forEach((c, i) => {
      if (c === 'C7') gF.active.push({ t0: tI - 0.05, t1: S('why1').t1, i });
      if (c === 'F7') gF.active.push({ t0: tIV - 0.05, t1: S('why1').t1, i });
      if (c === 'G7') gF.active.push({ t0: tV - 0.05, t1: S('why1').t1, i });
    });
    const yEnd = play(y0 + 0.05, tI - 0.05, ['C7'], { hideName: true, shape: false, vel: 0.7 });
    play(yEnd, S('why1').t1, ['C7', 'F7', 'G7', 'C7'], { hideName: true, shape: false, vel: 0.8 });

    // ---- why1b: the same shape rotates to F and G ----
    const b0 = S('why1b').t0, tF = a.w('why1b', 'F') - 0.05, tG = a.w('why1b', 'G') - 0.05;
    const tF2 = Math.max(tF, b0 + BAR), tG2 = Math.max(tG, tF2 + BAR);
    a.scale(b0, 'C', DEGS);
    a.scale(tF2, 'F', DEGS);
    a.scale(tG2, 'G', DEGS);
    const bw = [];
    play(b0 + 0.05, tF2, ['C7'], { walk: bw, vel: 0.85 });
    play(tF2, tG2, ['F7'], { walk: bw, vel: 0.85 });
    play(tG2, S('why1b').t1, ['G7'], { walk: bw, vel: 0.85 });
    a.walker(bw, { t1: S('why1b').t1, dr: 34, color: GOLD });
    a.big('SAME SHAPE, NEW ROOT', a.w('why1b', 'same'), S('why1b').t1, { ...TOP, color: GOLD });

    // ---- why2: the eighths, swung long-short ----
    const s0 = S('why2').t0;
    const gS = a.grid(NN.map((n, i) => ({ label: n, color: NCOL[i], size: 48 })), s0, S('why2').t1, { rows: 1, cols: 8, cw: 120, chh: 150, y: 560, caption: 'LEFT HAND · EIGHTH NOTES' });
    const LS = [...Array(8)].map((_, i) => ({ label: i % 2 ? 'S' : 'L', color: i % 2 ? TEAL : GOLD, size: 40 }));
    const gL = a.grid(LS, a.w('why2', 'long') - 0.1, S('why2').t1, { rows: 1, cols: 8, cw: 120, chh: 110, y: 790, caption: 'LONG · SHORT' });
    const sEnd = play(s0 + 0.05, S('why2').t1, ['C7', 'C7', 'F7', 'C7'], { lh: gS, hideName: true, shape: false });
    for (let t = s0 + 0.05; t < S('why2').t1 - 0.4; t += BAR) for (let j = 0; j < 8; j++) gL.active.push({ t0: eighth(t, j), t1: eighth(t, j) + (j % 2 ? BEAT * (1 - SW) : BEAT * SW), i: j });
    a.big('ROLLING · DRIVING', a.w('why2b', 'rolling'), S('why2').t1, { y: 1080, size: 50, ...MONO, color: GOLD });

    // ---- why3: two independent layers ----
    const r0 = S('why3').t0;
    const RHC = [...Array(8)].map((_, i) => ({ label: String(Math.floor(i / 2) + 1) + (i % 2 ? '&' : ''), color: PINK, size: 30 }));
    const gR = a.grid(RHC, r0, S('why3').t1, { rows: 1, cols: 8, cw: 120, chh: 130, y: 500, caption: 'RIGHT HAND · RIFFS + CHORDS' });
    const gLH = a.grid(NN.map((n, i) => ({ label: n, color: NCOL[i], size: 40 })), r0, S('why3').t1, { rows: 1, cols: 8, cw: 120, chh: 130, y: 760, caption: 'LEFT HAND · ROLLING BASS' });
    const tRiff = a.w('why3', 'riffs') - 0.1;
    let tb = r0 + 0.05, k = 0;
    for (; tb < S('why3').t1 - 0.4; tb += BAR, k++) {
      const name = ['C7', 'C7', 'F7', 'C7', 'G7', 'C7'][k % 6];
      const riff = tb >= tRiff - BAR / 2 && k % 2 === 0;
      bar(name, tb, { lh: gLH, rh: !riff, stop: S('why3').t1, hideName: true, shape: false });
      if (!riff) OFF.forEach((s, i) => gR.active.push({ t0: tb + s.o, t1: tb + s.o + 0.2, i: [1, 3, 5, 7][i] }));
      else {
        // an original little blues riff: Eb-E grace, G, E, C, then a chord stab
        const RIFF = [[0, 'E5', 'Eb5'], [1, 'G5'], [3, 'E5'], [4, 'C5'], [5, 'G4']];
        RIFF.forEach(([j, n, g]) => {
          const tt = eighth(tb, j);
          if (g) a.note(g, tt - 0.07, 0.07, { vel: 0.3 });
          a.note(n, tt, 0.22, { vel: 0.42 });
          gR.active.push({ t0: tt, t1: tt + 0.2, i: j });
        });
        a.ch(name, eighth(tb, 7), tb + BAR, { notes: RH[name], bass: false, vel: 0.6, hideName: true, shape: false });
        gR.active.push({ t0: eighth(tb, 7), t1: eighth(tb, 7) + 0.2, i: 7 });
      }
    }
    a.big('TWO INDEPENDENT LAYERS', a.w('why3', 'Two'), S('why3').t1, { y: 1060, size: 44, ...MONO, color: GOLD });

    // ---- why4: the boogie bass becomes a guitar riff (generic 5-6 shuffle) ----
    const k0 = S('why4').t0;
    a.scale(k0, 'C', DEGS);
    const DY = [['C5', 'G3'], ['C5', 'G3'], ['C6', 'A3'], ['C6', 'A3'], ['C7', 'Bb3'], ['C7', 'Bb3'], ['C6', 'A3'], ['C6', 'A3']];
    let tk = k0 + 0.1;
    const tTag = a.w('why4', 'guitar');
    for (; tk < S('why4').t1 - 0.4; tk += BAR) {
      for (let b = 0; b < 4; b++) {
        const t1 = Math.min(tk + (b + 1) * BEAT, S('why4').t1);
        const [lbl, top] = DY[b * 2];
        a.ch('C5', tk + b * BEAT, t1, { notes: ['C3', top], bass: 'C2', vel: 0.75, hideName: true, strikes: [{ o: 0, v: 1 }, { o: BEAT * SW, v: 0.7 }] });
        a.perc('kick', tk + b * BEAT, 0.6); if (b % 2) a.perc('snare', tk + b * BEAT, 0.55);
        a.perc('hat', tk + b * BEAT, 0.35); a.perc('hat', tk + b * BEAT + BEAT * SW, 0.25);
      }
    }
    a.tag('G', tTag, S('why4').t1, '5TH', { color: TEAL, dr: -92 });
    a.tag('A', tTag + 0.15, S('why4').t1, '6TH', { color: BLUE, dr: -92 });
    a.tag('Bb', tTag + 0.3, S('why4').t1, 'FLAT 7', { color: LILAC, dr: -92 });
    a.big('BOOGIE BASS → GUITAR RIFF', a.w('why4', 'adapted'), S('why4').t1, { ...TOP, size: 40, color: GOLD });
    a.big('EARLY ROCK AND ROLL', k0 + 0.3, a.w('why4', 'adapted'), { ...TOP, size: 40, color: '#ffffff' });

    // ---- essence: the pattern once more, then a final C7 ----
    const e0 = S('essence').t0;
    a.scale(e0, 'C', DEGS);
    const ew = [];
    const eEnd = play(e0 + 0.1, a.at('cta') + 0.4, ['C7', 'F7', 'C7'], { walk: ew });
    a.walker(ew, { t1: S('essence').t1, dr: 34, color: GOLD, label: 'LEFT HAND', labelDr: 82 });
    a.ch('C7', eEnd, S('essence').t1 - 0.2, { notes: ['E3', 'Bb3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.85 });
    a.perc('kick', eEnd, 0.7); a.perc('hat', eEnd, 0.5);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
