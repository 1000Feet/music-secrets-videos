// The pump: sidechain compression. Every kick ducks the other sounds, which then swell back.
// Copyright: One More Time (Daft Punk) and Call on Me (Eric Prydz) are named only; the music is an
// original four-on-the-floor groove with generic sustained chords. The pump is simulated in the score:
// each beat the pad restarts from silence right on the kick and swells back (engine note option `tone`).
// The narration ducking is real: the engine mixes the music under the voice with a sidechain compressor.
const B = 60 / 124, BAR = 4 * B, S16 = B / 4;

module.exports = {
  slug: 'sidechain-pump',
  title: 'The Pump',
  segments: [
    { id: 'hook',    text: 'Listen to the chords. Every time the kick hits, they duck... and swell back.' },
    { id: 'hook2',   text: 'The whole track seems to breathe.' },
    { id: 'what',    text: "That's the pump. Producers make it with sidechain compression." },
    { id: 's1',      text: "You hear it all over French house, like Daft Punk's One More Time, from 2000..." },
    { id: 's2',      text: "and in Eric Prydz's Call on Me, from 2004: an extreme, famous pump." },
    { id: 'why1',    text: 'So how does it work? A compressor turns sounds down when a signal gets loud.' },
    { id: 'why2',    text: "In sidechain mode, the kick drum's signal controls the compressor on other tracks, like pads and bass." },
    { id: 'why3',    text: 'So on every kick, the chords dip. Between kicks, they swell back up.' },
    { id: 'why4',    text: 'Two effects: the kick cuts through clearly...' },
    { id: 'why4b',   text: 'and even long sustained chords start to pulse in rhythm.' },
    { id: 'why5',    text: 'And this video uses the same trick: our music ducks under my voice... then comes back.' },
    { id: 'essence', text: 'Let the kick push everything else aside... and the music starts to breathe.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'hook2'], label: 'DANCE MUSIC', title: 'THE PUMP', accent: true, circle: false, lead: 0.5, gap: 0.3, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'THE TRICK', title: 'SIDECHAIN', circle: false, tail: 0.6 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'One More Time', sub: 'Daft Punk · 2000 · French house', circle: false, tail: 2 * BAR },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Call on Me', sub: 'Eric Prydz · 2004', circle: false, tail: 2 * BAR },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE COMPRESSOR', circle: false, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'SIDECHAIN MODE', circle: false, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'DIP AND SWELL', circle: false, tail: BAR },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'TWO EFFECTS', circle: false, gap: 0.3, tail: BAR },
    { id: 'why5', segs: ['why5'], label: 'RIGHT NOW', title: 'UNDER MY VOICE', circle: false, tail: 2.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LET IT BREATHE', accent: true, circle: false, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', ORANGE = '#ffa45c', GREY = '#8a8a92', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => a.T.midi(n);
    const PAD = [1, 0.5, 0.33, 0.25, 0.2, 0.16, 0.13, 0.1];
    const CH = { Am7: ['A3', 'C4', 'E4', 'G4'], Fmaj7: ['A3', 'C4', 'E4', 'F4'], Dm7: ['A3', 'C4', 'D4', 'F4'], Em7: ['G3', 'B3', 'D4', 'E4'], Cmaj7: ['G3', 'B3', 'C4', 'E4'] };
    const ROOT = { Am7: 'A1', Fmaj7: 'F1', Dm7: 'D2', Em7: 'E2', Cmaj7: 'C2' };

    // ---------- sound ----------
    // a pad chord; pumped: restarts from silence on every beat and swells back over `swell` of a beat
    function pad(name, t0, t1, o = {}) {
      const notes = CH[name], v = o.vel ?? 0.05, pump = o.pump ?? 1, swell = o.swell ?? 0.6;
      const voices = notes.flatMap(n => [M(n), M(n) + 0.07]);
      if (pump > 0) {
        for (let tb = t0; tb < t1 - 0.05; tb += B) {
          const d = Math.min(B, t1 - tb);
          voices.forEach((m, j) => a.note(m, tb + 0.004, d - 0.03, { vel: v * pump * (j % 2 ? 0.7 : 1), show: false, tone: { partials: PAD, attack: swell * B, release: 0.03 } }));
        }
      }
      if (pump < 1) voices.forEach((m, j) => a.note(m, t0, t1 - t0, { vel: v * (1 - pump) * (j % 2 ? 0.7 : 1), show: false, tone: { partials: PAD, attack: 0.08, release: 0.3 } }));
    }
    // four on the floor; bass on the off-beats (ducked too); hats on the off-beats
    function drums(t0, t1, o = {}) {
      for (let tb = t0, i = 0; tb < t1 - 0.05; tb += B, i++) {
        if (o.kick !== false) a.perc('kick', tb, o.kv ?? 1);
        if (o.hat !== false) { a.perc('hat', tb + B / 2, 0.5); a.perc('hat', tb + B / 2 + 0.03, 0.3); }
        if (o.clap && i % 2) a.perc('snare', tb, 0.35);
        if (o.bass) a.note(o.bass(tb), tb + B / 2, B * 0.4, { vel: 0.3, show: false, tone: { partials: [1, 0.35, 0.1], attack: 0.01, release: 0.05 } });
      }
    }
    // a groove of chords (one per bar) with drums; returns end time
    function groove(t0, t1, prog, o = {}) {
      let t = t0, k = 0;
      for (; t < t1 - 0.1; t += BAR, k++) {
        const c = prog[k % prog.length], e = Math.min(t1, t + BAR);
        pad(c, t, e, o);
        drums(t, e, { ...o, bass: o.noBass ? null : () => ROOT[c] });
        if (o.keys !== false) CH[c].forEach(n => a.note(n, t, e - t - 0.02, { vel: 0, show: false }));
      }
      return t;
    }

    // ---------- visuals ----------
    // a volume envelope: 16 sixteenth-note bars over one bar, bottom-aligned at BASE; the playhead lights them
    const BASE = 930, EW = 50;
    const level = (p, pump, swell = 0.6) => pump ? 0.12 + 0.88 * Math.min(1, Math.pow(Math.min(1, p / swell), 1.3)) : 1;
    function envelope(t0, t1, o = {}) {
      const pump = o.pump ?? true, col = o.color ?? TEAL, hmax = o.hmax ?? 330, cx = o.cx ?? 540;
      const gs = [];
      for (let i = 0; i < 16; i++) {
        const p = (i % 4) / 4 + 0.125, hh = Math.round(hmax * level(p, pump, o.swell)) + 18;
        gs.push(a.grid([{ label: '', color: col }], t0 + (o.step ?? 0) * i, t1, { rows: 1, cols: 1, cw: EW, chh: hh, x: cx + (i - 7.5) * EW, y: BASE - hh + 8 }));
      }
      // playhead from `play` (aligned to the groove)
      const p0 = o.play ?? t0;
      for (let t = p0; t < t1 - 0.01; t += BAR) for (let i = 0; i < 16; i++) {
        const ta = t + i * S16;
        if (ta < t1) gs[i].active.push({ t0: ta, t1: Math.min(t1, ta + S16 * (o.trail ?? 1)), i: 0 });
      }
      if (o.caption !== false) a.big(o.caption ?? (pump ? 'CHORD VOLUME · PUMPED' : 'CHORD VOLUME · FLAT'), t0, t1, { x: cx, y: BASE + 40, size: 26, ...MONO, color: GREY, blur: 0 });
      return gs;
    }
    // the kick row: four cells under the envelope, one per beat
    function kicks(t0, t1, o = {}) {
      const g = a.grid([1, 2, 3, 4].map(() => ({ label: 'KICK', color: PINK, size: 30 })), t0, t1, { rows: 1, cols: 4, cw: EW * 4, chh: 96, y: o.y ?? 1000, x: o.cx ?? 540 });
      const p0 = o.play ?? t0;
      for (let t = p0; t < t1 - 0.01; t += BAR) for (let i = 0; i < 4; i++) { const tb = t + i * B; if (tb < t1) g.active.push({ t0: tb, t1: Math.min(t1, tb + 0.16), i }); }
      return g;
    }

    // ---- hook: the groove pumping (cover: envelope + kicks visible from ~0.5 s) ----
    const h0 = 0.15, h1 = S('hook').t1;
    const hEnd = groove(h0, a.end('what') + 0.2, ['Am7', 'Fmaj7', 'Cmaj7', 'Em7'], { clap: true });
    envelope(0.02, h1, { play: h0 });
    kicks(0.02, h1, { play: h0 });
    a.big('DUCK', a.w('hook', 'duck') - 0.05, h1, { x: 330, y: 480, size: 52, color: PINK });
    a.big('SWELL', a.w('hook', 'swell') - 0.05, h1, { x: 750, y: 480, size: 52, color: TEAL });

    // ---- what: same groove, the name ----
    const w0 = S('what').t0, w1 = S('what').t1;
    envelope(w0, w1, { play: h0 });
    kicks(w0, w1, { play: h0 });
    a.big('SIDECHAIN COMPRESSION', a.w('what', 'sidechain') - 0.05, w1, { y: 480, size: 52, color: GOLD });
    pad('Am7', hEnd, w1, { pump: 0, vel: 0.035 });

    // ---- s1: One More Time (named only): original groove, moderate pump ----
    const s10 = S('s1').t0, s11 = S('s1').t1;
    groove(s10 + 0.05, s11, ['Dm7', 'Am7'], { clap: true, pump: 0.8 });
    envelope(s10, s11, { play: s10 + 0.05 });
    kicks(s10, s11, { play: s10 + 0.05 });
    a.big('FRENCH HOUSE', a.w('s1', 'French') - 0.05, s11, { y: 480, size: 52, color: BLUE });

    // ---- s2: Call on Me (named only): one held chord, extreme pump ----
    const s20 = S('s2').t0, s21 = S('s2').t1;
    groove(s20 + 0.05, s21, ['Fmaj7', 'Fmaj7', 'Cmaj7', 'Cmaj7'], { pump: 1, swell: 0.9, vel: 0.06 });
    envelope(s20, s21, { play: s20 + 0.05, swell: 0.9, color: ORANGE, caption: 'CHORD VOLUME · EXTREME PUMP' });
    kicks(s20, s21, { play: s20 + 0.05 });
    a.big('EXTREME', a.w('s2', 'extreme') - 0.05, s21, { y: 480, size: 56, color: ORANGE });

    // ---- why1: a compressor turns sounds down when the signal is loud ----
    const c0 = S('why1').t0, c1 = S('why1').t1;
    const tLoud = a.w('why1', 'loud') - 0.05, tDown = a.w('why1', 'down') - 0.05;
    const meter = (x, label, col, t0, t1, h) => {
      const g = a.grid([{ label: '', color: col }], t0, t1, { rows: 1, cols: 1, cw: 200, chh: h, x, y: 900 - h });
      g.active.push({ t0, t1, i: 0 });
    };
    a.big('SIGNAL', c0 + 0.2, c1, { x: 360, y: 960, size: 34, ...MONO, color: PINK, blur: 0 });
    a.big('OUTPUT VOLUME', c0 + 0.2, c1, { x: 720, y: 960, size: 34, ...MONO, color: TEAL, blur: 0 });
    // quiet signal, full volume; then loud signal, volume turned down (alternating with each hit)
    meter(360, '', PINK, c0 + 0.2, tLoud, 120); meter(720, '', TEAL, c0 + 0.2, tLoud, 380);
    pad('Am7', c0 + 0.2, tLoud, { pump: 0, vel: 0.04 });
    for (let t = tLoud, i = 0; t < c1 - 0.2; t += 2 * B, i++) {
      const te = Math.min(c1, t + 2 * B), mid = t + 0.35;
      meter(360, '', PINK, t, Math.min(te, mid), 420); meter(720, '', TEAL, t, Math.min(te, mid), 110);
      if (mid < te) { meter(360, '', PINK, mid, te, 120); meter(720, '', TEAL, mid, te, 380); }
      a.perc('kick', t, 1);
      CH.Am7.forEach(n => [0, 0.07].forEach((dm, j) => a.note(M(n) + dm, t + 0.004, Math.min(2 * B, te - t) - 0.03, { vel: 0.045 * (j ? 0.7 : 1), show: false, tone: { partials: PAD, attack: 0.5, release: 0.03 } })));
    }
    a.big('LOUD → TURN DOWN', tDown, c1, { y: 470, size: 48, ...MONO, color: GOLD });

    // ---- why2: the kick's signal drives the compressor on the pads and bass ----
    const d0 = S('why2').t0, d1 = S('why2').t1;
    const tSide = a.w('why2', 'sidechain') - 0.05, tCtl = a.w('why2', 'controls') - 0.05, tPads = a.w('why2', 'pads') - 0.05;
    const FLOW = [{ label: 'KICK', sub: 'THE SIGNAL', color: PINK, size: 54 }, { label: 'COMPRESSOR', sub: '', color: GOLD, size: 50 }, { label: 'PADS · BASS', sub: 'TURNED DOWN', color: TEAL, size: 50 }];
    const gF = a.grid(FLOW, d0 + 0.1, d1, { rows: 3, cols: 1, cw: 640, chh: 190, y: 460, revealStep: 0.25 });
    const dg = d0 + 0.2;
    groove(dg, d1, ['Am7', 'Fmaj7'], { vel: 0.04, keys: false });
    for (let t = dg; t < d1 - 0.05; t += B) {
      gF.active.push({ t0: t, t1: t + 0.15, i: 0 });
      if (t >= tCtl) gF.active.push({ t0: t, t1: t + 0.15, i: 1 });
      if (t >= tPads) gF.active.push({ t0: t + B * 0.55, t1: t + B, i: 2 });
    }
    a.big('SIDECHAIN', tSide, tCtl, { y: 1130, size: 40, ...MONO, color: GOLD, blur: 0 });

    // ---- why3: dip on every kick, swell between ----
    const e0 = S('why3').t0, e1 = S('why3').t1;
    const eg = e0 + 0.1;
    groove(eg, e1, ['Am7', 'Am7', 'Fmaj7'], { pump: 1, swell: 0.75, vel: 0.055 });
    envelope(e0, e1, { play: eg, swell: 0.75 });
    kicks(e0, e1, { play: eg });
    a.big('DIP', a.w('why3', 'dip') - 0.05, e1, { x: 330, y: 480, size: 60, color: PINK });
    a.big('SWELL', a.w('why3', 'swell') - 0.05, e1, { x: 750, y: 480, size: 60, color: TEAL });

    // ---- why4: the kick cuts through; a long chord flat, then pumped ----
    const f0 = S('why4').t0, f1 = S('why4').t1, fB = a.at('why4b');
    const tCuts = a.w('why4', 'cuts') - 0.05, tLong = a.w('why4b', 'long') - 0.05, tPulse = a.w('why4b', 'pulse') - 0.05;
    // first: kick + pumped pad, the kick row glowing
    const fg = f0 + 0.1;
    groove(fg, tLong, ['Am7'], { pump: 1, vel: 0.05, hat: false, noBass: true });
    kicks(f0, tLong, { play: fg });
    envelope(f0, tLong, { play: fg });
    a.big('THE KICK CUTS THROUGH', tCuts, tLong, { y: 480, size: 44, ...MONO, color: PINK });
    // then: a long chord, flat (no pump) ... then pulsing
    const tFlat = Math.max(fB, tLong) - 0.05;
    const tP = tFlat + Math.max(BAR, tPulse - tFlat);
    pad('Fmaj7', tFlat, tP, { pump: 0, vel: 0.06 });
    CH.Fmaj7.forEach(n => a.note(n, tFlat, tP - tFlat, { vel: 0, show: false }));
    envelope(tFlat, tP, { pump: false, color: GREY, play: tFlat });
    a.big('LONG CHORD', tFlat, tP, { y: 480, size: 52, color: WHITE });
    groove(tP, f1, ['Fmaj7'], { pump: 1, vel: 0.06, swell: 0.7 });
    envelope(tP, f1, { play: tP, swell: 0.7 });
    a.big('PULSE', tP, f1, { y: 480, size: 64, color: TEAL });

    // ---- why5: the narration ducks the music (it is happening now) ----
    const v0 = S('why5').t0, v1 = S('why5').t1, vE = a.end('why5');
    const bar2 = (x, col, t0, t1, h) => { const g = a.grid([{ label: '', color: col }], t0, t1, { rows: 1, cols: 1, cw: 220, chh: h, x, y: 900 - h }); g.active.push({ t0, t1, i: 0 }); };
    a.big('VOICE', v0 + 0.1, v1, { x: 360, y: 960, size: 36, ...MONO, color: GOLD, blur: 0 });
    a.big('MUSIC', v0 + 0.1, v1, { x: 720, y: 960, size: 36, ...MONO, color: TEAL, blur: 0 });
    bar2(360, GOLD, v0 + 0.1, vE + 0.1, 400); bar2(720, TEAL, v0 + 0.1, vE + 0.1, 140);
    bar2(360, GOLD, vE + 0.1, v1, 30); bar2(720, TEAL, vE + 0.1, v1, 400);
    a.big('DUCKED', a.w('why5', 'ducks') - 0.05, vE + 0.1, { x: 720, y: 700, size: 40, ...MONO, color: TEAL });
    a.big('BACK UP', vE + 0.1, v1, { x: 720, y: 440, size: 40, ...MONO, color: TEAL });
    pad('Cmaj7', v0 + 0.1, v1, { pump: 0, vel: 0.075 });
    CH.Cmaj7.forEach(n => a.note(n, v0 + 0.1, v1 - v0 - 0.2, { vel: 0, show: false }));
    a.note('C2', v0 + 0.1, v1 - v0 - 0.2, { vel: 0.25, show: false, tone: { partials: [1, 0.3], attack: 0.1, release: 0.3 } });

    // ---- essence: the full groove, breathing ----
    const z0 = S('essence').t0, z1 = S('essence').t1, zg = z0 + 0.1;
    const zEnd = groove(zg, z1 - 1.6, ['Am7', 'Fmaj7', 'Cmaj7', 'Em7'], { clap: true });
    envelope(z0, z1, { play: zg });
    kicks(z0, z1, { play: zg });
    a.big('BREATHE', a.w('essence', 'breathe') - 0.05, z1, { y: 480, size: 60, color: TEAL });
    a.perc('kick', zEnd, 1);
    pad('Am7', zEnd, z1 - 0.2, { pump: 0, vel: 0.06 });
    a.note('A1', zEnd, z1 - zEnd - 0.4, { vel: 0.3, show: false, tone: { partials: [1, 0.3], attack: 0.01, release: 0.5 } });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
