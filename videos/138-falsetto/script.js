// Falsetto: a light, high register above the chest voice - only the thin edges of the vocal folds vibrate.
// Copyright: Stayin' Alive, Kiss and Sherry are named only. No melodies or riffs from them are played: every
// sung line is an ORIGINAL short phrase jumping between a chest-range line and a high falsetto line, over
// generic patterns (a disco beat, funk stabs, a doo-wop I-vi-IV-V). Voices are additive tones (engine `tone`):
// the chest voice is rich in overtones, the falsetto voice nearly pure.
const CHEST = [1, 0.85, 0.7, 0.55, 0.45, 0.35, 0.28, 0.22, 0.17, 0.13, 0.1, 0.08];
const FALS = [1, 0.22, 0.07, 0.03];
const BREAK = 64.5;                        // where the phrases flip register (between E4 and F4)

module.exports = {
  slug: 'falsetto',
  title: 'Falsetto',
  segments: [
    { id: 'hook',    text: "A man's voice suddenly floats up, light and high." },
    { id: 'what',    text: "That's falsetto: a light register above the normal chest voice." },
    { id: 's1',      text: "You hear it in Stayin' Alive: Barry Gibb's falsetto." },
    { id: 's2',      text: "In Prince's Kiss, the whole lead vocal is falsetto." },
    { id: 's3',      text: 'And Sherry, by Frankie Valli and the Four Seasons, with its famous falsetto hook.' },
    { id: 'why1',    text: 'So why does it work? In chest voice, the vocal folds vibrate along their full thickness.' },
    { id: 'why2',    text: 'In falsetto, only their thin edges vibrate.' },
    { id: 'why3',    text: 'The sound gets lighter, breathier, higher.' },
    { id: 'why4',    text: "So men can reach a range usually associated with women's voices..." },
    { id: 'why4b',   text: 'and the voice sounds more fragile and intimate.' },
    { id: 'why5',    text: 'The break, where the voice flips between registers, is part of the effect.' },
    { id: 'why6',    text: 'Yodelling exploits it on purpose.' },
    { id: 'why7',    text: 'Classical countertenors use a related technique.' },
    { id: 'essence', text: 'Let the voice go light, and a whole new register opens up.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'A LIGHT, HIGH REGISTER', title: 'FALSETTO', accent: true, circle: false, tonic: 9, lead: 0.4, gap: 0.35, tail: 0.9 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: "Stayin' Alive", sub: 'Bee Gees · 1977', circle: false, tonic: 4, tail: 3.0 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Kiss', sub: 'Prince · 1986', circle: false, tonic: 9, tail: 3.0 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Sherry', sub: 'Frankie Valli & the Four Seasons · 1962', circle: false, tonic: 0, tail: 3.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'CHEST VOICE', circle: false, tonic: 9, tail: 1.4 },
    { id: 'why2', segs: ['why2', 'why3'], label: 'WHY IT WORKS', title: 'FALSETTO', circle: false, tonic: 9, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'A NEW RANGE', circle: false, tonic: 9, gap: 0.3, tail: 1.6 },
    { id: 'why5', segs: ['why5', 'why6'], label: 'WHY IT WORKS', title: 'THE BREAK', circle: false, tonic: 0, gap: 0.3, tail: 1.8 },
    { id: 'why7', segs: ['why7'], label: 'IN CLASSICAL MUSIC', title: 'COUNTERTENORS', circle: false, tonic: 7, tail: 3.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'GO LIGHT', accent: true, circle: false, tonic: 9, gap: 0.4, tail: 2.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', ORANGE = '#ffa45c', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const nrm = P => 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0));
    const M = n => (typeof n === 'number' ? n : a.T.midi(n));
    const COL = { c: ORANGE, f: TEAL };

    // ---------- voices ----------
    const vibBend = (dur, depth, scoop) => {
      const b = [[0, scoop], [0.08, 0]];
      for (let x = 0.25; x < dur + 0.4; x += 0.02) b.push([x, depth * Math.min(1, (x - 0.25) / 0.3) * Math.sin(2 * Math.PI * 5.6 * (x - 0.25))]);
      return b;
    };
    const sing = (n, t, dur, reg, vel = 0.3) => {
      const P = reg === 'f' ? FALS : CHEST, m = M(n);
      a.note(m + 0.0001, t, dur, { vel: vel * nrm(P) * (reg === 'f' ? 0.9 : 1), show: false, tone: { partials: P, attack: reg === 'f' ? 0.07 : 0.03, release: 0.2, bend: vibBend(dur, reg === 'f' ? 0.2 : 0.25, reg === 'f' ? -0.3 : -0.6) } });
      a.note(m, t, dur, { vel: 0, show: false });
    };
    // phrase: [[note, beats, reg]], returns [{t, d, m, reg}]
    const phrase = (list, t0, beat, vel) => {
      const out = []; let t = t0;
      list.forEach(([n, b, reg]) => { if (n) { sing(n, t, b * beat * 0.92, reg, vel); out.push({ t, d: b * beat * 0.92, m: M(n), reg }); } t += b * beat; });
      return out;
    };
    const plen = (list, beat) => list.reduce((s, x) => s + x[1], 0) * beat;

    // ---------- piano roll: chest zone below the break, falsetto zone above ----------
    const X0 = 170, XW = 820, Y = m => 1085 - (m - 45) * 15;
    function zones(t0, t1, o = {}) {
      const yb = Y(BREAK);
      a.grid([{ label: '', color: ORANGE }], t0, t1, { rows: 1, cols: 1, cw: XW + 40, chh: 1100 - yb + 16, x: X0 + XW / 2, y: yb - 8 });
      a.grid([{ label: '', color: TEAL }], t0, t1, { rows: 1, cols: 1, cw: XW + 40, chh: yb - Y(77.5) + 16, x: X0 + XW / 2, y: Y(77.5) - 8 });
      a.big('CHEST', t0, t1, { x: X0 - 85, y: (yb + 1090) / 2, size: 26, ...MONO, color: ORANGE, blur: 0 });
      a.big('FALSETTO', t0, t1, { x: X0 - 85, y: (yb + Y(77.5)) / 2, size: 22, ...MONO, color: TEAL, blur: 0 });
      const bl = a.grid([{ label: '', color: RED }], t0, t1, { rows: 1, cols: 1, cw: XW + 60, chh: 22, x: X0 + XW / 2, y: yb - 11 });
      if (o.breakLit) o.breakLit.forEach(([r0, r1]) => bl.active.push({ t0: r0, t1: r1, i: 0 }));
      if (o.breakLabel !== false) a.big('BREAK', t0, t1, { x: 1010, y: yb - 26, size: 22, ...MONO, color: RED, blur: 0 });
      return bl;
    }
    // draw the notes of a phrase as bars (appear on time, lit while sounding); span = seconds across the roll
    function roll(notes, t0, span, t1, o = {}) {
      const k = XW / span;
      notes.forEach(n => {
        const ta = o.preview !== undefined ? o.preview + (n.t - t0) * 0.15 : n.t;
        const g = a.grid([{ label: '', color: COL[n.reg] }], ta, t1, { rows: 1, cols: 1, cw: Math.max(30, n.d * k) + 16, chh: 46, x: X0 + (n.t - t0 + n.d / 2) * k, y: Y(n.m) - 23 });
        g.active.push({ t0: o.preview !== undefined ? ta : n.t, t1, i: 0 });
      });
    }

    // ---------- backing patterns (generic) ----------
    const chord = (notes, t, dur, vel = 0.5) => a.ch('C', t, t + dur, { notes, bass: false, vel, shape: false, hideName: true });
    function disco(t0, t1, vel = 0.7) {
      const b = 0.58;
      for (let t = t0, i = 0; t < t1 - 0.1; t += b, i++) { a.perc('kick', t, vel); a.perc('hat', t + b / 2, vel * 0.7); if (i % 2) a.perc('snare', t, vel * 0.7); }
      for (let t = t0, i = 0; t < t1 - 0.3; t += 2 * b, i++) chord(i % 2 ? ['A3', 'C4', 'E4'] : ['E3', 'G3', 'B3', 'D4'], t, 2 * b - 0.05, 0.35);
    }
    function funk(t0, t1, vel = 0.7) {
      const b = 0.5;
      for (let t = t0, i = 0; t < t1 - 0.1; t += 2 * b, i++) {
        a.perc('kick', t, vel); a.perc('kick', t + 0.75 * b, vel * 0.6); a.perc('snare', t + b, vel * 0.8);
        [0, 0.5, 1, 1.5].forEach(o => a.perc('hat', t + o * b, vel * 0.4));
        chord(['G3', 'C#4', 'E4'], t + 0.5 * b, 0.16, 0.45); chord(['G3', 'C#4', 'E4'], t + 1.5 * b, 0.16, 0.4);
      }
    }
    function doowop(t0, t1, vel = 0.45) {
      const P = [['C3', 'E3', 'G3', 'C4'], ['A2', 'E3', 'A3', 'C4'], ['F2', 'F3', 'A3', 'C4'], ['G2', 'D3', 'G3', 'B3']];
      const bar = 1.6;
      for (let t = t0, i = 0; t < t1 - 0.3; t += bar, i++) {
        const c = P[i % 4];
        for (let k = 0; k < 4; k++) chord(c.slice(1), t + k * bar / 4, bar / 4 - 0.03, vel * (k ? 0.7 : 1));
        a.note(c[0], t, bar * 0.9, { vel: 0.3, show: false });
      }
    }

    // ---- hook: a chest line that flips up into falsetto (cover: whole roll drawn at once) ----
    const h1 = S('hook').t1;
    zones(0.05, h1);
    const HOOK = [['A3', 1, 'c'], ['C4', 1, 'c'], ['D4', 1, 'c'], ['E4', 1.5, 'c'], ['A4', 1.2, 'f'], ['C5', 1, 'f'], ['B4', 1, 'f'], ['A4', 2.2, 'f']];
    const beatH = 0.3;
    const tFl = a.w('hook', 'floats') - 0.05;
    const n0 = phrase(HOOK, 0.15, beatH, 0.3);
    roll(n0, 0.15, plen(HOOK, beatH) + 0.1, h1, { preview: 0.1 });
    a.big('CHEST VOICE', 0.1, h1, { x: 330, y: 520, size: 34, ...MONO, color: ORANGE, blur: 0 });
    a.big('FALSETTO', 0.1, h1, { x: 770, y: 520, size: 40, color: TEAL, blur: 10 });
    const tW = Math.max(tFl - 1.2, plen(HOOK, beatH) + 0.4);
    phrase(HOOK, tW, beatH * 1.1, 0.26);
    const tCh = a.w('what', 'chest') - 0.05;
    sing('E4', tCh, 0.9, 'c', 0.26); sing('A4', tCh + 0.9, h1 - tCh - 1.2, 'f', 0.26);
    chord(['A2', 'E3', 'A3'], 0.15, h1 - 0.5, 0.25);

    // ---- songs (named only): original falsetto phrases over generic grooves ----
    function song(id, list, beat, groove, label) {
      const s0 = S(id).t0, s1 = S(id).t1;
      zones(s0 + 0.05, s1);
      groove(s0 + 0.2, s1 - 0.2);
      const len = plen(list, beat);
      const t1p = Math.max(s0 + 0.3, a.end(id) - len + 0.3);
      const nA = phrase(list, s0 + 0.3, beat, 0.24);
      const nB = phrase(list, Math.max(s0 + 0.3 + len + 0.3, a.end(id) + 0.1), beat, 0.3);
      roll(nA, s0 + 0.3, len + 0.05, nB[0].t - 0.05, {});
      roll(nB, nB[0].t, len + 0.05, s1, {});
      a.big(label, s0 + 0.3, s1, { y: 480, size: 34, ...MONO, color: TEAL, blur: 6 });
      void t1p;
    }
    song('s1', [['B4', 1, 'f'], ['D5', 1, 'f'], ['E5', 2, 'f'], ['D5', 1, 'f'], ['B4', 1, 'f'], ['A4', 2, 'f']], 0.29, disco, 'DISCO · FALSETTO LEAD');
    song('s2', [['E3', 1, 'c'], [null, 1], ['A4', 1, 'f'], ['C5', 1, 'f'], ['A4', 1, 'f'], ['G4', 2, 'f'], ['E4', 1, 'c']], 0.25, funk, 'FUNK · FALSETTO LEAD');
    song('s3', [['G3', 1, 'c'], ['C4', 1, 'c'], ['E4', 1, 'c'], ['C5', 2.5, 'f'], ['A4', 1, 'f'], ['G4', 2.5, 'f']], 0.27, doowop, 'DOO-WOP · FALSETTO HOOK');

    // ---------- vocal folds: cross-section, 4 strips per fold (outer = thick ... inner = thin edge) ----------
    const STRIP = [[250, 380], [330, 290], [405, 200], [466, 110]];   // [x of left fold strip, height]
    function folds(t0, t1, mode, ring, y = 720) {
      const gs = [];
      STRIP.forEach(([x, h], i) => {
        [x, 1080 - x].forEach(xx => {
          const inner = i === 3, col = mode === 'f' && !inner ? '#6a6a74' : mode === 'f' ? TEAL : ORANGE;
          const g = a.grid([{ label: '', color: col }], t0, t1, { rows: 1, cols: 1, cw: inner ? 50 : 70, chh: h, x: xx, y: y - h / 2 });
          if (mode === 'c' || inner) for (const [r0, r1] of ring) for (let t = r0 + (i % 2) * 0.05; t < r1; t += 0.1) g.active.push({ t0: t, t1: Math.min(r1, t + 0.05), i: 0 });
          gs.push(g);
        });
      });
      a.big('↑ AIR', t0, t1, { x: 540, y: y + 225, size: 30, ...MONO, color: GREY, blur: 0 });
      a.big('LEFT FOLD', t0, t1, { x: 330, y: y + 225, size: 22, ...MONO, color: GREY, blur: 0 });
      a.big('RIGHT FOLD', t0, t1, { x: 750, y: y + 225, size: 22, ...MONO, color: GREY, blur: 0 });
      return gs;
    }
    function spectrum(P, t0, t1, col, y = 1110) {
      P.forEach((h, i) => {
        const hh = Math.round(110 * h) + 16;
        a.grid([{ label: '', color: col }], t0 + i * 0.03, t1, { rows: 1, cols: 1, cw: 56, chh: hh, x: 540 + (i - 5.5) * 58, y: y - hh }).active.push({ t0: t0 + i * 0.03, t1, i: 0 });
      });
      a.big('OVERTONES', t0, t1, { x: 540, y: y + 22, size: 20, ...MONO, color: GREY, blur: 0 });
    }

    // ---- why1: chest voice - the folds vibrate along their full thickness ----
    const c0 = S('why1').t0, c1 = S('why1').t1, tFo = a.w('why1', 'folds') - 0.05, tTh = a.w('why1', 'thickness') - 0.05;
    folds(c0 + 0.1, c1, 'c', [[tFo, c1]], 730);
    a.big('FULL THICKNESS', tTh, c1, { y: 500, size: 50, color: ORANGE, blur: 10 });
    a.big('VOCAL FOLDS', tFo, tTh, { y: 500, size: 44, ...MONO, color: WHITE, blur: 6 });
    spectrum(CHEST, tTh, c1, ORANGE);
    sing('A3', tFo, c1 - tFo - 0.3, 'c', 0.32);
    chord(['A2', 'E3'], c0 + 0.2, c1 - c0 - 0.4, 0.2);

    // ---- why2-3: falsetto - only the thin edges vibrate; lighter, breathier, higher ----
    const f0 = S('why2').t0, f1 = S('why2').t1, tEd = a.w('why2', 'edges') - 0.05, tLi = a.w('why3', 'lighter') - 0.05;
    folds(f0 + 0.1, f1, 'f', [[tEd, f1]], 730);
    a.big('ONLY THE THIN EDGES', tEd, tLi, { y: 500, size: 46, color: TEAL, blur: 10 });
    a.big('LIGHTER · BREATHIER · HIGHER', tLi, f1, { y: 500, size: 38, ...MONO, color: TEAL, blur: 8 });
    spectrum(FALS.concat([0, 0, 0, 0, 0, 0, 0, 0]).slice(0, 12), tLi, f1, TEAL);
    sing('A3', f0 + 0.2, tEd - f0 - 0.4, 'c', 0.28);
    sing('A4', tEd, f1 - tEd - 0.3, 'f', 0.32);
    chord(['A2', 'E3'], f0 + 0.2, f1 - f0 - 0.4, 0.2);

    // ---- why4: ranges over the keyboard - the falsetto range reaches higher ----
    const r0 = S('why4').t0, r1 = S('why4').t1;
    const KW = 1020 / 26;
    const WH = []; for (let m = 36; m <= 79; m++) if (![1, 3, 6, 8, 10].includes(m % 12)) WH.push(m);
    const keyCx = m => ([1, 3, 6, 8, 10].includes(m % 12) ? 30 + WH.indexOf(m - 1) * KW + KW * 0.68 + KW * 0.32 : 30 + WH.indexOf(m) * KW + KW / 2);
    const band = (lo, hi, y, col, label, t0, t1, lit) => {
      const x0 = keyCx(M(lo)) - 14, x1 = keyCx(M(hi)) + 14;
      const g = a.grid([{ label, color: col, size: 40 }], t0, t1, { rows: 1, cols: 1, cw: x1 - x0 + 16, chh: 150, x: (x0 + x1) / 2, y });
      (lit || []).forEach(([p, q]) => g.active.push({ t0: p, t1: q, i: 0 }));
    };
    const tRa = a.w('why4', 'range') - 0.05, tWo = a.w('why4', "women's") - 0.05, tFr = a.w('why4b', 'fragile') - 0.05;
    band('A2', 'E4', 1000, ORANGE, 'CHEST', r0 + 0.1, r1, [[r0 + 0.2, r1]]);
    band('E4', 'D5', 820, TEAL, 'FALSETTO', r0 + 0.3, r1, [[tRa, r1]]);
    a.big('A RANGE OFTEN HEARD', tWo, r1, { x: keyCx(70), y: 690, size: 30, ...MONO, color: PINK, blur: 0 });
    a.big("IN WOMEN'S VOICES", tWo, r1, { x: keyCx(70), y: 735, size: 30, ...MONO, color: PINK, blur: 0 });
    a.big('FRAGILE · INTIMATE', tFr, r1, { y: 520, size: 46, color: TEAL, blur: 10 });
    phrase([['A2', 1, 'c'], ['C3', 1, 'c'], ['E3', 1, 'c'], ['A3', 1, 'c'], ['C4', 1, 'c'], ['E4', 2, 'c']], r0 + 0.2, 0.3, 0.26);
    phrase([['E4', 1, 'f'], ['A4', 1, 'f'], ['C5', 1, 'f'], ['D5', 2.5, 'f']], tRa, 0.32, 0.28);
    phrase([['C5', 1.5, 'f'], ['B4', 1, 'f'], ['A4', 3, 'f']], tFr, 0.36, 0.26);
    chord(['A2', 'E3', 'C4'], r0 + 0.2, r1 - r0 - 0.4, 0.2);

    // ---- why5-6: the break - flipping back and forth (an original yodel-like figure) ----
    const b0 = S('why5').t0, b1 = S('why5').t1, tFlip = a.w('why5', 'flips') - 0.05, tYo = a.w('why6', 'Yodelling') - 0.05;
    const FLIP = [['C4', 1, 'c'], ['G4', 1, 'f'], ['E4', 1, 'c'], ['C5', 1, 'f'], ['G4', 1, 'f'], ['E4', 1, 'c'], ['G4', 1, 'f'], ['C4', 2, 'c']];
    const lit = [];
    const nF = phrase(FLIP, tFlip, 0.26, 0.28);
    nF.forEach((n, i) => { if (i && n.reg !== nF[i - 1].reg) lit.push([n.t - 0.05, n.t + 0.2]); });
    const tY2 = Math.max(tYo, nF[nF.length - 1].t + 0.7);
    const nY = phrase(FLIP, tY2, 0.2, 0.3);
    nY.forEach((n, i) => { if (i && n.reg !== nY[i - 1].reg) lit.push([n.t - 0.05, n.t + 0.16]); });
    zones(b0 + 0.05, b1, { breakLit: lit });
    roll(nF, tFlip, plen(FLIP, 0.26) + 0.05, tY2 - 0.05);
    roll(nY, tY2, plen(FLIP, 0.2) + 0.05, b1);
    a.big('THE FLIP', tFlip, tYo, { y: 500, size: 46, color: RED, blur: 10 });
    a.big('YODELLING: ON PURPOSE', tYo, b1, { y: 500, size: 42, color: GOLD, blur: 10 });
    sing('E4', b0 + 0.2, 0.7, 'c', 0.24); sing('A4', b0 + 0.9, Math.max(0.4, tFlip - b0 - 1.1), 'f', 0.24);
    [['C3', 'G3', 'E4'], ['G2', 'D3', 'B3'], ['C3', 'G3', 'E4']].forEach((c, i) => chord(c, tFlip + i * 1.2, 1.15, 0.3));
    for (let t = tY2; t < b1 - 0.4; t += 0.8) chord(['C3', 'E3', 'G3'], t, 0.3, 0.3), chord(['G2', 'D3', 'B3'], t + 0.4, 0.3, 0.25);

    // ---- why7: countertenors - a slow, original phrase in the falsetto zone ----
    const k0 = S('why7').t0, k1 = S('why7').t1;
    zones(k0 + 0.05, k1);
    const CT = [['D5', 2, 'f'], ['C5', 1, 'f'], ['B4', 1, 'f'], ['A4', 2, 'f'], ['B4', 1, 'f'], ['G4', 3, 'f']];
    const nC = phrase(CT, k0 + 0.25, 0.42, 0.3);
    roll(nC, k0 + 0.25, plen(CT, 0.42) + 0.05, k1);
    a.big('A RELATED TECHNIQUE', a.w('why7', 'related') - 0.05, k1, { y: 500, size: 40, ...MONO, color: TEAL, blur: 8 });
    [[['G3', 'B3', 'D4'], 0], [['A3', 'D4', 'F#4'], 1.68], [['G3', 'B3', 'E4'], 2.52], [['D3', 'A3', 'F#4'], 3.36], [['G3', 'B3', 'D4'], 4.2]].forEach(([c, o]) => {
      for (let k = 0; k < 3; k++) a.note(c[k], k0 + 0.25 + o + k * 0.05, 0.6, { vel: 0.22, show: false, tone: { partials: [1, 0.6, 0.5, 0.35, 0.3, 0.2, 0.15], attack: 0.003, decay: 3.5, release: 0.2 } });
    });

    // ---- essence: chest line, then up into the light register ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tCta = a.at('cta'), tLg = a.w('essence', 'light') - 0.05, tOp = a.w('essence', 'opens') - 0.05;
    zones(e0 + 0.05, e1);
    const ES = [['A3', 1, 'c'], ['C4', 1, 'c'], ['E4', 2, 'c'], ['A4', 1, 'f'], ['C5', 1, 'f'], ['E5', 3, 'f']];
    const nE = phrase(ES, Math.max(e0 + 0.2, tLg - 1.0), 0.3, 0.28);
    roll(nE, nE[0].t, plen(ES, 0.3) + 0.05, tCta);
    a.big('LET IT GO LIGHT', tLg, e1, { y: 500, size: 44, color: TEAL, blur: 10 });
    a.big('A NEW REGISTER', tOp, e1, { y: 565, size: 34, ...MONO, color: WHITE, blur: 0 });
    const nE2 = phrase([['E4', 1, 'c'], ['A4', 1, 'f'], ['C5', 1, 'f'], ['B4', 1, 'f'], ['A4', 3, 'f']], tCta + 0.1, 0.32, 0.28);
    roll(nE2, nE2[0].t, 2.4, e1);
    chord(['A2', 'E3', 'A3'], e0 + 0.2, tCta - e0 - 0.2, 0.22);
    chord(['F2', 'C3', 'A3'], tCta, 1.3, 0.22); chord(['A2', 'E3', 'C#4'], tCta + 1.3, e1 - tCta - 1.6, 0.25);
    void BLUE;
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
