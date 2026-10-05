// The build-up and the drop: take the low end away, speed up, go silent... then give it all back on beat one.
const B = 60 / 124, BAR = 4 * B, S16 = B / 4;   // 124 BPM, a typical dance tempo

module.exports = {
  slug: 'the-drop',
  title: 'The Drop',
  segments: [
    { id: 'hook',    text: 'Every dance track has this moment.' },
    { id: 'hook2',   text: 'The beat pulls back, the tension climbs... and then everything hits at once.' },
    { id: 'what',    text: "That's the drop. In dance music, the build-up raises tension, and the drop releases it." },
    { id: 'groove',  text: "Let's build one. A groove: kick, bass, chords." },
    { id: 'strip',   text: 'The build-up begins. The kick and bass disappear.' },
    { id: 'q',       text: 'A snare roll comes in, and a riser starts to climb.' },
    { id: 'e',       text: 'Twice as fast...' },
    { id: 's',       text: 'and twice again.' },
    { id: 'why1',    text: 'So why does it work? Without kick and bass, your ears start to miss the low end.' },
    { id: 'why2',    text: 'The snare roll keeps doubling its speed...' },
    { id: 'why2b',   text: 'and that feels like acceleration.' },
    { id: 'why3',    text: 'The riser sweeps upward, and the sound gets brighter and brighter.' },
    { id: 'why4',    text: 'A breath of silence right before makes the return hit harder.' },
    { id: 'why5',    text: 'Then kick and bass come back together, right on beat one.' },
    { id: 'why6',    text: "It's tension and release, just like in harmony..." },
    { id: 'why6b',   text: 'but built with rhythm, texture and frequency.' },
    { id: 'essence', text: 'Take something away, make the listener wait, then give it all back at once.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2'], label: 'DANCE MUSIC', title: 'THE DROP', accent: true, circle: false, tonic: 9, gap: 0.25, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'TENSION AND RELEASE', title: 'BUILD-UP + DROP', circle: false, tonic: 9, tail: 0.5 },
    { id: 'groove', segs: ['groove'], label: 'STEP 1', title: 'THE GROOVE', circle: false, tonic: 9, min: 3 * BAR, tail: 0 },
    { id: 'strip', segs: ['strip'], label: 'STEP 2', title: 'NO LOW END', circle: false, tonic: 9, min: 3 * BAR, tail: 0 },
    { id: 'q', segs: ['q'], label: 'STEP 3', title: 'THE SNARE ROLL', circle: false, tonic: 9, min: 2 * BAR, tail: 0 },
    { id: 'e', segs: ['e'], label: 'STEP 3', title: 'THE SNARE ROLL', circle: false, tonic: 9, min: BAR, tail: 0 },
    { id: 's', segs: ['s'], label: 'STEP 3', title: 'THE SNARE ROLL', circle: false, tonic: 9, min: BAR + B, tail: 0 },
    { id: 'drop', segs: [], label: 'AND THEN...', title: 'THE DROP', accent: true, circle: false, tonic: 9, min: 4 * BAR },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'MISSING LOW END', circle: false, tonic: 9, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'DOUBLING SPEED', circle: false, tonic: 9, min: 0.15 + 3 * BAR + 0.5, gap: 0.4, tail: 0.3 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE RISER', circle: false, tonic: 9, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'ONE BREATH', circle: false, tonic: 9, tail: 0.9 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'BEAT ONE', circle: false, tonic: 9, tail: 1.2 },
    { id: 'why6', segs: ['why6', 'why6b'], label: 'THE SAME IDEA', title: 'TENSION, RELEASE', tonic: 0, gap: 0.3, tail: 0.9 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'GIVE IT ALL BACK', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', ORANGE = '#ffa45c', GOLD = '#ffcf5a', TEAL = '#45d6c8', BLUE = '#62a8ff', RED = '#ff5d6c', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const PROG = ['Am', 'F', 'C', 'G'];
    const VO = { Am: ['A3', 'C4', 'E4'], F: ['A3', 'C4', 'F4'], C: ['G3', 'C4', 'E4'], G: ['G3', 'B3', 'D4'] };
    const ROOT = { Am: 'A1', F: 'F1', C: 'C2', G: 'G1' };
    const mix = (c1, c2, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const x = p(c1), y = p(c2); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };

    // ---------- grids ----------
    // instruments: kick, bass, chords, hats
    const INST = (subs = {}) => [['KICK', PINK], ['BASS', ORANGE], ['CHORDS', TEAL], ['HATS', BLUE]].map(([l, c]) => ({ label: l, color: subs[l] ? '#6a6a72' : c, size: 50, sub: subs[l], subSize: 24 }));
    const instGrid = (t0, t1, subs, o = {}) => a.grid(INST(subs), t0, t1, { rows: 2, cols: 2, cw: 380, chh: 190, y: o.y ?? 560, caption: o.caption });
    // sixteen sixteenth-note slots, warm to hot
    const SIX = Array.from({ length: 16 }, (_, i) => ({ label: i % 4 === 0 ? String(i / 4 + 1) : '', color: mix(GOLD, RED, i / 15), size: 46 }));
    const sixGrid = (t0, t1, o = {}) => a.grid(SIX, t0, t1, { rows: 4, cols: 4, cw: 190, chh: 118, y: o.y ?? 480 });
    // riser meter: eight cells, dark blue to white
    const RIS = Array.from({ length: 8 }, (_, i) => ({ label: '', color: mix('#3a4cff', WHITE, i / 7) }));
    const riserGrid = (t0, t1) => a.grid(RIS, t0, t1, { rows: 1, cols: 8, cw: 95, chh: 72, y: 980, caption: 'RISER' });

    // ---------- music ----------
    // one bar of the groove: kick on the beat, hats + chord stab with bass on the off-beats
    function bar(t, k, o = {}) {
      const name = PROG[k % 4], v = o.vel ?? 1, g = o.g;
      for (let i = 0; i < 4; i++) {
        const tb = t + i * B, to = tb + B / 2;
        if (o.stop && to > o.stop - 0.05) break;
        if (o.kick !== false) { a.perc('kick', tb, 1.0 * v); if (g) g.active.push({ t0: tb, t1: tb + 0.16, i: 0 }); }
        if (o.hat !== false) { a.perc('hat', to, 0.55 * v); a.perc('hat', to + 0.03, 0.3 * v); if (g) g.active.push({ t0: to, t1: to + 0.16, i: 3 }); }
        if (o.clap && i % 2) { a.perc('snare', tb, 0.5 * v); a.perc('snare', tb + 0.02, 0.25 * v); }
        if (o.stab !== false) {
          a.ch(name, to, to + B * 0.45, { notes: VO[name], bass: o.bass === false ? false : ROOT[name], vel: 0.75 * v, hideName: true, shape: false });
          if (g) { g.active.push({ t0: to, t1: to + 0.2, i: 2 }); if (o.bass !== false) g.active.push({ t0: to, t1: to + 0.2, i: 1 }); }
        }
        if (o.six) o.six.active.push({ t0: tb, t1: tb + 0.16, i: i * 4 }, { t0: to, t1: to + 0.16, i: i * 4 + 2 });
      }
      if (o.pad) a.ch(name, t, t + BAR, { notes: VO[name], bass: false, vel: 0.45 * v, strikes: [{ o: 0, v: 1 }, { o: 2 * B, v: 0.5 }], hideName: true, shape: false });
    }
    const bars = (t0, n, k0, o) => { for (let j = 0; j < n; j++) bar(t0 + j * BAR, k0 + j, o); return t0 + n * BAR; };
    // a held pad chord (the build-up keeps only the chords)
    const pad = (name, t0, t1, v = 0.5, strikes) => a.ch(name, t0, t1, { notes: VO[name], bass: false, vel: v, strikes, hideName: true, shape: false });
    // the riser: notes climbing in sixteenths from lo to hi
    function riser(t0, t1, lo = 57, hi = 79, v0 = 0.08, v1 = 0.26) {
      const n = Math.floor((t1 - t0) / S16);
      for (let j = 0; j < n; j++) { const k = j / Math.max(1, n - 1); a.note(Math.round(lo + (hi - lo) * k), t0 + j * S16, S16 * 0.9, { vel: v0 + (v1 - v0) * k }); }
    }
    // the drop: kick + bass + full chord on beat one
    function hit(t, name = 'Am', v = 1) {
      a.perc('kick', t, 1); a.perc('snare', t, 0.8); a.perc('kick', t + 0.01, 0.6);
      a.ch(name, t, t + B * 0.9, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A1', vel: 1.1 * v, hideName: true, shape: false });
    }
    // an accelerating roll of n hits from t0 to t1 (gaps shrink geometrically)
    function accelRoll(t0, t1, n, g) {
      const r = 0.86, w = Array.from({ length: n }, (_, j) => Math.pow(r, j)), sum = w.reduce((s, x) => s + x, 0);
      let t = t0;
      for (let j = 0; j < n; j++) {
        a.perc('snare', t, 0.35 + 0.5 * j / n);
        if (g) g.active.push({ t0: t, t1, i: j });
        t += (t1 - t0) * w[j] / sum;
      }
    }

    // ---------- hook: groove, pull back, accelerate, silence, DROP ----------
    const tPull = a.w('hook2', 'pulls') - 0.05, tClimb = a.w('hook2', 'tension') - 0.05, tDrop = a.w('hook2', 'hits') - 0.03;
    const h0 = 0.25, sixH = sixGrid(h0, tDrop);
    let tt = h0, kk = 0;
    for (; tt + BAR <= tPull + 0.3; tt += BAR, kk++) bar(tt, kk, { six: sixH, vel: 0.85 });
    if (tt < tPull) bar(tt, kk, { six: sixH, vel: 0.85, stop: tPull });   // partial bar, cut where the beat pulls back
    pad('F', tPull, tClimb, 0.45);
    pad('G', tClimb, tDrop - B, 0.5, [{ o: 0, v: 1 }]);
    accelRoll(tClimb, tDrop - B, 16, sixH);
    riser(tClimb, tDrop - B, 57, 79);
    hit(tDrop);
    a.big('DROP', tDrop, S('hook').t1, { y: 720, size: 230, color: PINK, blur: 40 });
    for (let t = tDrop, k = 0; t + BAR <= a.end('what') - 0.2; t += BAR, k++) bar(t, k, { clap: true, vel: k === 0 ? 1 : 0.7, kick: true });

    // ---------- what: build-up = tension, drop = release ----------
    const gW = a.grid([{ label: 'BUILD-UP', sub: 'TENSION', color: GOLD, size: 64 }, { label: 'DROP', sub: 'RELEASE', color: PINK, size: 64 }],
      S('what').t0 + 0.1, S('what').t1, { rows: 2, cols: 1, cw: 640, chh: 230, y: 560, revealStep: 0.25 });
    gW.active.push({ t0: a.w('what', 'tension') - 0.1, t1: a.w('what', 'releases') - 0.1, i: 0 }, { t0: a.w('what', 'releases') - 0.1, t1: S('what').t1, i: 1 });
    pad('Am', a.end('what') - 0.2 - ((a.end('what') - 0.2 - tDrop) % BAR), S('what').t1, 0.55);

    // ---------- the demo: one continuous build-up at 128 BPM ----------
    // groove (2 bars)
    const g0 = S('groove').t0;
    const gG = instGrid(g0, S('groove').t1);
    const nG = Math.round((S('groove').t1 - g0) / BAR);
    bars(g0, nG, 0, { g: gG, clap: true });
    // strip (2 bars): kick and bass gone, chords and hats stay
    const st0 = S('strip').t0;
    const gS = instGrid(st0, S('strip').t1, { KICK: 'OFF', BASS: 'OFF' });
    bars(st0, Math.round((S('strip').t1 - st0) / BAR), nG, { g: gS, kick: false, bass: false, pad: true, vel: 0.85 });
    // roll: quarters (2 bars), eighths (1 bar), sixteenths (1 bar), one silent beat
    const q0 = S('q').t0, e0 = S('e').t0, s0 = S('s').t0, tD = s0 + BAR + B;
    const stages = [[q0, 4, 0], [q0 + BAR, 4, 1], [e0, 2, 2], [s0, 1, 3]];
    const g = sixGrid(q0, tD);   // the sixteen slots of the current bar, filling up
    stages.forEach(([t, step, k], si) => {
      for (let j = 0; j < 16; j += step) {
        const th = t + j * S16, prog = (si * BAR + j * S16) / (4 * BAR);
        a.perc('snare', th, 0.3 + 0.55 * prog);
        if (step === 1) a.perc('snare', th + 0.012, 0.2 + 0.3 * prog);
        g.active.push({ t0: th, t1: t + BAR, i: j });
      }
      pad(PROG[k], t, t + BAR, 0.4 + 0.1 * si, [{ o: 0, v: 1 }]);
      a.perc('hat', t, 0.2);
    });
    riser(q0, s0 + BAR, 52, 79, 0.06, 0.28);
    const rG = riserGrid(q0, tD);
    for (let i = 0; i < 8; i++) rG.active.push({ t0: q0 + i * (4 * BAR / 8), t1: tD, i });
    a.big('SILENCE', s0 + BAR - 0.1, tD + 0.05, { y: 720, size: 64, ...MONO, color: '#c9c9d2', blur: 10 });
    // the drop (4 bars), everything at once
    hit(tD);
    const gD = instGrid(tD, S('drop').t1, {}, { y: 460 });
    bars(tD, 4, 0, { g: gD, clap: true });
    a.big('DROP!', tD, S('drop').t1, { y: 1010, size: 150, color: PINK, blur: 40 });

    // ---------- part 2 ----------
    // why1: the low end is missing
    const w10 = S('why1').t0;
    const gY1 = instGrid(w10, S('why1').t1, { KICK: 'MISSING', BASS: 'MISSING' }, { caption: 'NO LOW END' });
    for (let t = w10 + 0.1, k = 0; t < S('why1').t1 - 0.3; t += BAR, k++) bar(t, k, { g: gY1, kick: false, bass: false, pad: true, vel: 0.6 });

    // why2: quarters, eighths, sixteenths
    const w20 = S('why2').t0 + 0.15;
    const ROWS = [[4, 'QUARTERS', 500], [8, 'EIGHTHS', 720], [16, 'SIXTEENTHS', 940]];
    ROWS.forEach(([n, cap, y], r) => {
      const cells = Array.from({ length: n }, (_, i) => ({ label: '', color: mix(GOLD, RED, r / 2) }));
      const g = a.grid(cells, S('why2').t0 + 0.05 + r * 0.2, S('why2').t1, { rows: 1, cols: n, cw: 800 / n, chh: 120, y, caption: cap });
      const tb = w20 + r * BAR;
      for (let j = 0; j < n; j++) {
        const th = tb + j * BAR / n;
        a.perc('snare', th, 0.35 + 0.15 * r + 0.1 * j / n);
        g.active.push({ t0: th, t1: S('why2').t1, i: j });
      }
      pad(['Am', 'F', 'G'][r], tb, tb + BAR, 0.4, [{ o: 0, v: 1 }]);
    });
    a.perc('kick', w20 + 3 * BAR, 0.9); a.ch('Am', w20 + 3 * BAR, S('why2').t1, { notes: VO.Am, bass: 'A1', vel: 0.6, hideName: true, shape: false });

    // why3: the riser - a meter filling from dark to bright
    const w30 = S('why3').t0 + 0.1, w31 = a.w('why3', 'brighter', 1) + 0.6;
    const MET = Array.from({ length: 8 }, (_, i) => ({ label: i === 0 ? 'BRIGHT' : i === 7 ? 'DARK' : '', color: mix(WHITE, '#3a4cff', i / 7), size: 34 }));
    const gM = a.grid(MET, S('why3').t0 + 0.05, S('why3').t1, { rows: 8, cols: 1, cw: 420, chh: 68, y: 470 });
    for (let i = 0; i < 8; i++) gM.active.push({ t0: w30 + (7 - i) * (w31 - w30) / 8, t1: S('why3').t1, i });
    riser(w30, w31, 50, 79, 0.06, 0.3);
    pad('F', w30, a.w('why3', 'brighter') - 0.05, 0.4); pad('G', a.w('why3', 'brighter') - 0.05, w31, 0.45);
    a.ch('Am', w31, S('why3').t1, { notes: ['A3', 'C4', 'E4', 'A4'], bass: false, vel: 0.5, hideName: true, shape: false });

    // why4: a roll, a breath of silence, then the hit
    const w40 = S('why4').t0 + 0.1, tSil = a.w('why4', 'silence') - 0.05, tHit = a.w('why4', 'hit') - 0.03;
    const gB = a.grid([{ label: 'ROLL', color: GOLD, size: 54 }, { label: '. . .', sub: 'SILENCE', color: '#9a9aa2', size: 54 }, { label: 'HIT', color: PINK, size: 54 }],
      S('why4').t0 + 0.05, S('why4').t1, { rows: 1, cols: 3, cw: 300, chh: 260, y: 600, revealStep: 0.15 });
    for (let t = w40, j = 0; t < tSil - 0.02; t += S16, j++) a.perc('snare', t, 0.3 + 0.4 * (t - w40) / (tSil - w40));
    pad('G', w40, tSil, 0.45);
    gB.active.push({ t0: w40, t1: tSil, i: 0 }, { t0: tSil, t1: tHit, i: 1 }, { t0: tHit, t1: S('why4').t1, i: 2 });
    hit(tHit);
    for (let t = tHit, k = 0; t + BAR <= S('why4').t1 + 0.1; t += BAR, k++) bar(t, k, { clap: true, vel: k ? 0.6 : 0.8 });

    // why5: kick and bass come back together on beat one
    const w50 = S('why5').t0, tKick = a.w('why5', 'kick') - 0.03, tBass = a.w('why5', 'bass') - 0.03, tTog = a.w('why5', 'together') - 0.03;
    const BEATS = [1, 2, 3, 4].map(n => ({ label: String(n), color: n === 1 ? PINK : '#8a8a92', size: n === 1 ? 120 : 80 }));
    const gBt = a.grid(BEATS, w50 + 0.1, S('why5').t1, { rows: 1, cols: 4, cw: 220, chh: 260, y: 560, caption: 'KICK + BASS ON BEAT ONE' });
    a.perc('kick', tKick, 0.9);
    a.ch('Am', tBass, tBass + 0.4, { notes: [], bass: 'A1', vel: 0.9, hideName: true, shape: false });
    pad('G', w50 + 0.1, tTog, 0.35);
    for (let t = tTog, k = 0; t < S('why5').t1 - 0.2; t += BAR, k++) {
      bar(t, k, { clap: true, vel: 0.8 });
      for (let i = 0; i < 4; i++) gBt.active.push({ t0: t + i * B, t1: t + (i + 1) * B, i });
    }
    a.big('KICK', tKick, tTog, { x: 380, y: 960, size: 70, color: PINK });
    a.big('BASS', tBass, tTog, { x: 700, y: 960, size: 70, color: ORANGE });
    a.big('TOGETHER', tTog, S('why5').t1, { y: 960, size: 70, color: GOLD });

    // why6: same principle as harmony - V7 -> I on the circle, then the three ingredients
    const tTen = a.w('why6', 'tension') - 0.04, tRel = a.w('why6', 'release') - 0.04;
    a.scale(S('why6').t0, 'C');
    a.ch('G7', tTen, tRel, { vel: 0.8 });
    a.ch('C', tRel, S('why6').t1, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.8 });
    a.tag(0, tTen, tRel, 'TENSION', { x: 540, y: 455, color: GOLD });
    a.tag(0, tRel, a.at('why6b'), 'RELEASE', { x: 540, y: 455, color: TEAL });
    [['rhythm', 'RHYTHM', 250, PINK], ['texture', 'TEXTURE', 540, TEAL], ['frequency', 'FREQUENCY', 830, BLUE]].forEach(([w, txt, x, c]) =>
      a.big(txt, a.w('why6b', w) - 0.05, S('why6').t1, { x, y: 455, size: 40, ...MONO, color: c, blur: 12 }));

    // essence: groove, take it away, wait, give it all back
    const ee0 = S('essence').t0 + 0.05, tAway = a.w('essence', 'away') - 0.05, tWait = a.w('essence', 'wait') - 0.05, tOnce = a.w('essence', 'once') - 0.03;
    const sixE = sixGrid(ee0, tOnce);
    bar(ee0, 0, { six: sixE, vel: 0.7 });
    pad('F', tAway, tWait, 0.45);
    pad('G', tWait, tOnce - B, 0.5, [{ o: 0, v: 1 }]);
    accelRoll(tWait, tOnce - B, 16, sixE);
    riser(tWait, tOnce - B, 60, 79);
    hit(tOnce);
    const tEndG = S('essence').t1 - 1.8;
    let te = tOnce, ke = 0;
    for (; te + BAR <= tEndG + 0.05; te += BAR, ke++) bar(te, ke, { clap: true, vel: ke ? 0.65 : 0.9 });
    a.perc('kick', te, 0.9);
    a.ch('Am', te, S('essence').t1 - 0.2, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A1', vel: 0.8, hideName: true, shape: false });
    a.big('DROP', tOnce, S('essence').t1, { y: 720, size: 230, color: PINK, blur: 40 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
