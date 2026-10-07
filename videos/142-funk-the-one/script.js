// Funk and "the one": a heavy accent on beat one, with syncopated parts interlocking around it.
// Copyright: no James Brown melody, riff, horn line or drum break is reproduced (and NOT the Funky Drummer
// break). Every groove here is our own: a 16-step pattern on one E9 chord, generic funk drums.
const B = 0.56, S16 = B / 4, BAR = 16 * S16;   // about 107 BPM

module.exports = {
  slug: 'funk-the-one',
  title: 'Funk and The One',
  segments: [
    { id: 'hook',    text: "Everybody hits the first beat, hard. Then everything else dances around it. That's funk." },
    { id: 'what',    text: 'James Brown built funk around the one: a heavy accent on beat one.' },
    { id: 's1',      text: "Papa's Got a Brand New Bag, from 1965, and Cold Sweat, from 1967..." },
    { id: 's1b',     text: 'are often cited as founding funk records.' },
    { id: 's2',      text: "And Clyde Stubblefield's drum break on Funky Drummer, from 1970..." },
    { id: 's2b',     text: 'became one of the most widely sampled breaks in hip hop.' },
    { id: 'why1',    text: 'So why does it work? Funk lives on a sixteenth note grid: every beat split in four.' },
    { id: 'why2',    text: "On the one, everybody hits hard. That's the anchor." },
    { id: 'why3',    text: 'Everything else is syncopated: short guitar chops, the chicken scratch...' },
    { id: 'why3b',   text: 'bass notes between the beats, and horn stabs.' },
    { id: 'why4',    text: 'Each part is small and repeats. Together, they lock like gears.' },
    { id: 'why5',    text: 'The harmony often sits on one chord, often a dominant ninth, so rhythm carries the music.' },
    { id: 'essence', text: "Hit the one, then let every part dance around it. That's funk." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'HIT THE ONE', title: 'FUNK', accent: true, circle: false, tonic: 4, lead: 0.4, min: 3 * BAR, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'JAMES BROWN', title: 'THE ONE', circle: false, tonic: 4, min: 2 * BAR, tail: 0.5 },
    { id: 's1', segs: ['s1', 's1b'], label: 'FOUNDING FUNK RECORDS', title: 'James Brown', sub: '1965 · 1967', circle: false, tonic: 4, gap: 0.3, tail: 2.0 },
    { id: 's2', segs: ['s2', 's2b'], label: 'YOU HEAR IT IN', title: 'Funky Drummer', sub: 'James Brown · 1970', circle: false, tonic: 4, gap: 0.3, tail: 2.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SIXTEEN STEPS', circle: false, tonic: 4, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE ANCHOR', circle: false, tonic: 4, min: 2 * BAR, tail: 0.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'SYNCOPATION', circle: false, tonic: 4, gap: 0.3, tail: 1.8 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'LIKE GEARS', circle: false, tonic: 4, min: 2 * BAR, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'ONE CHORD', title: 'THE DOMINANT NINTH', tonic: 4, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'HIT THE ONE', accent: true, circle: false, tonic: 4, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', ORANGE = '#ffa45c', VIOLET = '#b48cff', GREY = '#3a3a42', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };

    // ---------- our own groove: E9, sixteen steps ----------
    const P = {
      K: [0, 3, 10],
      S: [4, 12], GH: [7, 9, 14],
      G: [0, 2, 5, 7, 10, 13, 15],
      B: [[0, 'E2'], [3, 'E3'], [7, 'G2'], [10, 'A2'], [11, 'B2'], [14, 'D3']],
      H: [0, 6, 11],
    };
    const LANES = [['K', 'KICK', PINK], ['S', 'SNARE', TEAL], ['G', 'GUITAR', ORANGE], ['B', 'BASS', BLUE], ['H', 'HORNS', VIOLET]];
    const hits = k => (k === 'B' ? P.B.map(x => x[0]) : k === 'S' ? P.S.concat(P.GH) : P[k]);
    const BASS = { partials: [1, 0.7, 0.3, 0.12], attack: 0.006, release: 0.06, decay: 4 };
    const BRASS = { partials: [1, 0.8, 0.65, 0.5, 0.38, 0.26, 0.16, 0.1], attack: 0.025, release: 0.08 };

    function hit(k, s, t, v = 1) {
      const one = s === 0;
      if (k === 'K') { a.perc('kick', t, (one ? 1.0 : 0.8) * v); if (one) a.perc('kick', t + 0.008, 0.5 * v); }
      else if (k === 'S') { const gh = P.GH.includes(s); a.perc('snare', t, (gh ? 0.18 : 0.85) * v); if (!gh) a.perc('snare', t + 0.012, 0.3 * v); }
      else if (k === 'G') a.ch('E7', t, t + (one ? 0.14 : 0.07), { notes: ['G#3', 'D4', 'F#4'], bass: false, vel: (one ? 0.75 : 0.5) * v, hideName: true, shape: false, label: 'E9' });
      else if (k === 'B') { const n = P.B.find(x => x[0] === s)[1]; a.note(n, t, one ? 0.3 : 0.16, { vel: (one ? 0.6 : 0.45) * v, tone: BASS, show: false }); }
      else if (k === 'H') ['D4', 'F#4', 'B4'].forEach(n => a.note(n, t, one ? 0.22 : 0.12, { vel: (one ? 0.13 : 0.1) * v, tone: BRASS, show: false }));
    }
    // play bars from t0 to t1. o.on = lanes playing, o.g = { lane: grid }, o.count = count grid, o.only = steps allowed
    function groove(t0, t1, o = {}) {
      const on = o.on || 'KSGBH', v = o.vel ?? 1, s16 = o.s16 ?? S16;
      let t = t0;
      for (; t < t1 - 0.15; t += 16 * s16) {
        for (let s = 0; s < 16; s++) {
          const ts = t + s * s16;
          if (ts > t1 - 0.05) break;
          if (o.count) o.count.active.push({ t0: ts, t1: ts + s16, i: s });
          if (o.hat !== false) a.perc('hat', ts, (s === 0 ? 0.5 : s % 2 ? 0.12 : 0.22) * v);
          if (o.only && !o.only.includes(s)) continue;
          for (const [k] of LANES) {
            if (!on.includes(k) || !hits(k).includes(s)) continue;
            if (o.from && o.from[k] && ts < o.from[k]) continue;
            hit(k, s, ts, v);
            if (o.g && o.g[k]) o.g[k].active.push({ t0: ts, t1: ts + Math.max(0.12, s16), i: s });
          }
        }
      }
      return t;
    }

    // ---------- grids: a count row and one lane per instrument ----------
    const CW = 54, GX = 590;
    const COUNT = [...Array(16)].map((_, i) => ({ label: i % 4 ? ['e', '&', 'a'][i % 4 - 1] : String(i / 4 + 1), color: i === 0 ? GOLD : i % 4 ? '#7a7a86' : BLUE, size: i % 4 ? 22 : 28 }));
    const laneCells = (k, col) => [...Array(16)].map((_, s) => (hits(k).includes(s) ? { label: '', color: s === 0 ? GOLD : col } : { label: '', color: GREY }));
    function lanes(t0, t1, o = {}) {
      const ks = o.lanes || 'KSGBH', y0 = o.y ?? 470, ch = o.ch ?? 96, out = {};
      out.count = a.grid(COUNT, t0, t1, { rows: 1, cols: 16, cw: CW, chh: 62, x: GX, y: y0 });
      let y = y0 + 70;
      for (const [k, name, col] of LANES) {
        if (!ks.includes(k)) continue;
        const ta = o.appear && o.appear[k] ? o.appear[k] : t0;
        out[k] = a.grid(laneCells(k, col), ta, t1, { rows: 1, cols: 16, cw: CW, chh: ch, x: GX, y });
        a.big(name, ta, t1, { x: 88, y: y + ch / 2, size: 24, ...MONO, color: col, blur: 0 });
        y += ch;
      }
      out.bottom = y;
      return out;
    }

    // ---- hook: the full groove from the first frame ----
    const h1 = S('hook').t1;
    const LH = lanes(0.05, h1);
    groove(0.2, h1, { g: LH, count: LH.count });
    a.big('THE ONE', 0.2, h1, { x: GX - 7.5 * CW, y: 435, size: 26, ...MONO, color: GOLD, blur: 10 });

    // ---- what: James Brown, the one ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const LW = lanes(w0, w1);
    groove(w0 + 0.05, w1, { g: LW, count: LW.count });
    a.big('THE ONE', w0 + 0.1, w1, { x: GX - 7.5 * CW, y: 435, size: 26, ...MONO, color: GOLD, blur: 10 });
    a.big('HEAVY ACCENT ON BEAT 1', a.w('what', 'heavy') - 0.05, w1, { y: LW.bottom + 70, size: 40, ...MONO, color: GOLD });

    // ---- s1: founding funk records (our own groove only) ----
    const s10 = S('s1').t0, s11 = S('s1').t1;
    const LS = lanes(s10, s11, { lanes: 'KSG', ch: 80 });
    groove(s10 + 0.05, s11, { g: LS, count: LS.count, vel: 0.85 });
    a.big("PAPA'S GOT A BRAND NEW BAG", a.at('s1'), s11, { y: 860, size: 40, color: WHITE, blur: 10 });
    a.big('1965', a.at('s1'), s11, { y: 915, size: 28, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('COLD SWEAT', a.w('s1', 'Cold') - 0.1, s11, { y: 990, size: 48, color: WHITE, blur: 10 });
    a.big('1967', a.w('s1', 'Cold') - 0.1, s11, { y: 1045, size: 28, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('FOUNDING FUNK RECORDS', a.w('s1b', 'founding') - 0.1, s11, { y: 1120, size: 34, ...MONO, color: GOLD });

    // ---- s2: an ORIGINAL funk drum break (not Stubblefield's) ----
    const d0 = S('s2').t0, d1 = S('s2').t1;
    const DR = { K: [0, 6, 10, 11], S: [4, 12], GH: [2, 9, 14] };
    const drumCells = (arr, col, ghost) => [...Array(16)].map((_, s) => (arr.includes(s) ? { label: '', color: s === 0 ? GOLD : col } : ghost && ghost.includes(s) ? { label: '·', color: '#7a7a86', size: 40 } : { label: '', color: GREY }));
    const dc = a.grid(COUNT, d0, d1, { rows: 1, cols: 16, cw: CW, chh: 62, x: GX, y: 470 });
    const dk = a.grid(drumCells(DR.K, PINK), d0, d1, { rows: 1, cols: 16, cw: CW, chh: 96, x: GX, y: 540 });
    const ds = a.grid(drumCells(DR.S, TEAL, DR.GH), d0, d1, { rows: 1, cols: 16, cw: CW, chh: 96, x: GX, y: 636 });
    a.big('KICK', d0, d1, { x: 88, y: 588, size: 24, ...MONO, color: PINK, blur: 0 });
    a.big('SNARE', d0, d1, { x: 88, y: 684, size: 24, ...MONO, color: TEAL, blur: 0 });
    for (let t = d0 + 0.05; t < d1 - 0.15; t += BAR) {
      for (let s = 0; s < 16; s++) {
        const ts = t + s * S16;
        if (ts > d1 - 0.05) break;
        dc.active.push({ t0: ts, t1: ts + S16, i: s });
        a.perc('hat', ts, s % 2 ? 0.14 : 0.26);
        if (DR.K.includes(s)) { a.perc('kick', ts, s === 0 ? 1 : 0.8); dk.active.push({ t0: ts, t1: ts + 0.14, i: s }); }
        if (DR.S.includes(s)) { a.perc('snare', ts, 0.85); a.perc('snare', ts + 0.012, 0.3); ds.active.push({ t0: ts, t1: ts + 0.14, i: s }); }
        if (DR.GH.includes(s)) { a.perc('snare', ts, 0.18); ds.active.push({ t0: ts, t1: ts + 0.12, i: s }); }
      }
    }
    a.big('DRUMS: CLYDE STUBBLEFIELD', a.w('s2', 'Clyde') - 0.1, d1, { y: 830, size: 40, ...MONO, color: WHITE, blur: 6 });
    a.big('A DRUM BREAK', a.w('s2', 'break') - 0.1, d1, { y: 900, size: 34, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('WIDELY SAMPLED', a.w('s2b', 'widely') - 0.1, d1, { y: 1010, size: 60, color: GOLD, blur: 20 });
    a.big('IN HIP HOP', a.w('s2b', 'hip') - 0.1, d1, { y: 1090, size: 40, ...MONO, color: GOLD });

    // ---- why1: four beats, each split in four ----
    const y10 = S('why1').t0, y11 = S('why1').t1, tSp = a.w('why1', 'split') - 0.05, tGr = a.w('why1', 'sixteenth') - 0.05;
    const gB4 = a.grid([1, 2, 3, 4].map(n => ({ label: String(n), color: n === 1 ? GOLD : BLUE, size: 72 })), y10 + 0.05, y11, { rows: 1, cols: 4, cw: 4 * CW, chh: 170, x: GX, y: 500 });
    const gC16 = a.grid(COUNT.map(c => ({ ...c, size: c.size + 6 })), tGr, y11, { rows: 1, cols: 16, cw: CW, chh: 130, x: GX, y: 700 });
    a.big('BEATS', y10 + 0.05, y11, { x: 88, y: 585, size: 24, ...MONO, color: BLUE, blur: 0 });
    a.big('STEPS', tGr, y11, { x: 88, y: 765, size: 24, ...MONO, color: '#9a9aa2', blur: 0 });
    for (let t = y10 + 0.1; t < y11 - 0.2; t += BAR) {
      for (let s = 0; s < 16; s++) {
        const ts = t + s * S16;
        if (ts > y11 - 0.05) break;
        if (s % 4 === 0) { gB4.active.push({ t0: ts, t1: ts + B, i: s / 4 }); a.perc(s ? 'snare' : 'kick', ts, s ? 0.25 : 0.7); }
        if (ts >= tGr) { gC16.active.push({ t0: ts, t1: ts + S16, i: s }); a.perc('hat', ts, s % 4 ? 0.22 : 0.4); }
      }
    }
    a.ch('E7', y10 + 0.1, y11 - 0.1, { notes: ['G#3', 'D4', 'F#4'], bass: 'E2', vel: 0.3, hideName: true, shape: false, label: 'E9' });
    a.big('1 · E · & · A', tSp, y11, { y: 960, size: 56, ...MONO, color: GOLD });
    a.big('EVERY BEAT IN FOUR', tSp + 0.3, y11, { y: 1050, size: 34, ...MONO, color: '#c9c9d2', blur: 0 });

    // ---- why2: the one, everybody together ----
    const a0 = S('why2').t0, a1 = S('why2').t1, tAn = a.w('why2', 'anchor') - 0.05;
    const LA = lanes(a0, a1);
    // first only the one (everybody at once), then the full groove from "anchor"
    groove(a0 + 0.05, tAn, { g: LA, count: LA.count, only: [0] });
    const ta = a0 + 0.05 + Math.ceil((tAn - a0 - 0.05) / BAR - 0.01) * BAR;
    groove(ta, a1, { g: LA, count: LA.count });
    a.big('EVERYBODY ON 1', a.w('why2', 'everybody') - 0.05, a1, { y: LA.bottom + 50, size: 44, ...MONO, color: GOLD });
    a.big('THE ANCHOR', tAn, a1, { y: LA.bottom + 110, size: 34, ...MONO, color: '#c9c9d2', blur: 0 });

    // ---- why3: syncopated parts enter one by one ----
    const b0 = S('why3').t0, b1 = S('why3').t1;
    const tG = a.w('why3', 'guitar') - 0.05, tB = a.w('why3b', 'bass') - 0.05, tH = a.w('why3b', 'horn') - 0.05;
    const LB = lanes(b0, b1, { appear: { G: tG, B: tB, H: tH } });
    groove(b0 + 0.05, b1, { g: LB, count: LB.count, from: { G: tG, B: tB, H: tH } });
    a.big('CHICKEN SCRATCH', a.w('why3', 'chicken') - 0.05, tB, { y: LB.bottom + 60, size: 44, ...MONO, color: ORANGE });
    a.big('BETWEEN THE BEATS', tB, tH, { y: LB.bottom + 60, size: 44, ...MONO, color: BLUE });
    a.big('HORN STABS', tH, b1, { y: LB.bottom + 60, size: 44, ...MONO, color: VIOLET });

    // ---- why4: small repeating parts, locked like gears ----
    const c0 = S('why4').t0, c1 = S('why4').t1;
    const LC = lanes(c0, c1);
    groove(c0 + 0.05, c1, { g: LC, count: LC.count });
    a.big('SMALL · REPEATING', a.w('why4', 'small') - 0.05, a.w('why4', 'Together') - 0.05, { y: LC.bottom + 60, size: 44, ...MONO, color: TEAL });
    a.big('LOCKED LIKE GEARS', a.w('why4', 'Together') - 0.05, c1, { y: LC.bottom + 60, size: 48, ...MONO, color: GOLD });

    // ---- why5: one chord, E9, on the circle; the rhythm keeps going ----
    const e0 = S('why5').t0, e1 = S('why5').t1;
    a.scale(e0, 'E', [0, 4, 7, 10, 2]);
    const tNi = a.w('why5', 'ninth') - 0.05, tRh = a.w('why5', 'rhythm') - 0.05;
    a.ch('E7', e0 + 0.1, e1 - 0.1, { notes: ['E3', 'G#3', 'D4', 'F#4'], bass: 'E2', vel: 0.4, label: 'E9', strikes: [{ o: 0, v: 1 }] });
    a.tag('F#', tNi, e1, 'NINTH', { color: GOLD, dr: -92 });
    a.tag('D', tNi, e1, 'FLAT 7', { color: VIOLET, dr: -92 });
    a.tag(4, a.w('why5', 'one') - 0.05, e1, 'ONE CHORD', { x: 540, y: 462, color: ORANGE });
    // drums + bass keep going: rhythm carries the music
    groove(e0 + 0.3, e1, { on: 'KSB', vel: 0.75 });
    groove(tRh, e1, { on: 'GH', vel: 0.7 });

    // ---- essence: the full groove, ending on the one ----
    const f0 = S('essence').t0, f1 = S('essence').t1;
    const LE = lanes(f0, f1);
    const tEnd = f0 + 0.05 + Math.max(1, Math.floor((f1 - 1.8 - f0 - 0.05) / BAR)) * BAR;
    groove(f0 + 0.05, tEnd, { g: LE, count: LE.count });
    for (const [k] of LANES) { hit(k, 0, tEnd, 1.05); LE[k].active.push({ t0: tEnd, t1: f1, i: 0 }); }
    a.perc('hat', tEnd, 0.6);
    a.ch('E7', tEnd, f1 - 0.2, { notes: ['E3', 'G#3', 'D4', 'F#4', 'B4'], bass: 'E2', vel: 0.55, hideName: true, shape: false, label: 'E9' });
    a.big('THE ONE', f0 + 0.1, f1, { x: GX - 7.5 * CW, y: 435, size: 26, ...MONO, color: GOLD, blur: 10 });
    a.big('HIT THE ONE', a.w('essence', 'Hit') - 0.05, f1, { y: LE.bottom + 60, size: 48, ...MONO, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
