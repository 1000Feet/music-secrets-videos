// The Roland TR-808: an analog drum machine that flopped, then became the sound of hip hop.
// Copyright/brief: Sexual Healing (Marvin Gaye) and Planet Rock (Afrika Bambaataa & the Soulsonic
// Force) are named only; every beat here is an ORIGINAL generic pattern. The 808-style voices are
// built with the engine: kick = a decaying sine with a quick pitch drop (note option `tone` + `bend`),
// clap = three fast noise bursts, hats = engine hat, cowbell = two square-like tones.
const hz = f => 69 + 12 * Math.log2(f / 440);
const SQ = [1, 0, 0.33, 0, 0.2, 0, 0.14];
const LANES = ['KICK', 'CLAP', 'HAT', 'COWBELL'];
const ev = n => Array.from({ length: 16 / n }, (_, i) => i * n);
// original patterns (steps 0-15)
const P_A = { KICK: [0, 10], CLAP: [4, 12], HAT: ev(2), COWBELL: [] };
const P_B = { KICK: [0, 7, 8], CLAP: [4, 12], HAT: [...ev(2), 15], COWBELL: [] };
const P_C = { KICK: [0, 5, 8, 13], CLAP: [4, 12], HAT: ev(1), COWBELL: [2, 7, 10, 15] };
const P_D = { KICK: [0, 6, 11], CLAP: [8], HAT: ev(1), COWBELL: [] };
const P_E = { KICK: [0, 3, 8, 10], CLAP: [4, 12], HAT: ev(2), COWBELL: [6, 14] };

module.exports = {
  slug: 'tr-808',
  title: 'The TR-808',
  segments: [
    { id: 'hook',    text: 'This deep boom changed music, and it came from a drum machine that flopped.' },
    { id: 'what',    text: 'The Roland TR-808 Rhythm Composer, introduced in 1980.' },
    { id: 's1',      text: "Early hits used it, like Marvin Gaye's Sexual Healing, from 1982..." },
    { id: 's2',      text: 'and Planet Rock, by Afrika Bambaataa and the Soulsonic Force, the same year.' },
    { id: 's3',      text: 'Later, its booming kick became the bass of trap music.' },
    { id: 'why1',    text: "So why does it sound like that? It didn't play recordings of real drums." },
    { id: 'why2',    text: 'Analog circuits generated every sound, so its drums sound synthetic, not real.' },
    { id: 'why3',    text: 'The kick is basically a decaying sine wave.' },
    { id: 'why4',    text: 'Make the decay long, and it doubles as a deep bass note.' },
    { id: 'why7',    text: 'You programmed it on a step sequencer: sixteen buttons, one per sixteenth note, lit for each hit.' },
    { id: 'why5',    text: 'At first, musicians found it unrealistic, and it sold poorly.' },
    { id: 'why6',    text: 'But once it was cheap second hand, hip hop and electro producers embraced it.' },
    { id: 'essence', text: 'A failed drum machine with a fake sounding kick, and it shaped decades of music.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'THE DRUM MACHINE', title: 'THE TR-808', accent: true, circle: false, lead: 0.5, gap: 0.4, tail: 0.8 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Sexual Healing', sub: 'Marvin Gaye · 1982', circle: false, tail: 2.2 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Planet Rock', sub: 'Afrika Bambaataa & the Soulsonic Force · 1982', circle: false, tail: 2.2 },
    { id: 's3', segs: ['s3'], label: 'LATER', title: 'Trap Music', sub: 'the 808 kick becomes the bass', circle: false, tail: 2.4 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'ANALOG CIRCUITS', circle: false, gap: 0.3, tail: 1.4 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'WHY IT WORKS', title: 'A DECAYING SINE', circle: false, gap: 0.3, tail: 2.0 },
    { id: 'why7', segs: ['why7'], label: 'WHY IT WORKS', title: 'STEP SEQUENCER', circle: false, tail: 2.2 },
    { id: 'why5', segs: ['why5', 'why6'], label: 'WHY IT WORKS', title: 'FLOP, THEN LEGEND', circle: false, gap: 0.3, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE 808', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', RED = '#ff5d6c', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const COL = { KICK: PINK, CLAP: GOLD, HAT: TEAL, COWBELL: BLUE };

    // ---------- 808-style voices ----------
    // kick: a sine that drops quickly in pitch and then decays (rate = 1/seconds)
    function kick(t, o = {}) {
      const f = o.f ?? 49, dur = o.dur ?? 0.7;
      a.note(hz(f), t, dur, { vel: o.vel ?? 0.6, show: false, tone: { partials: [1, 0.12, 0.04], attack: 0.002, release: 0.08, decay: o.decay ?? 4, bend: [[0, 14], [0.025, 4], [0.07, 0]] } });
      if (o.key) a.note(o.key, t, Math.min(dur, 1.2), { vel: 0, show: false });
    }
    const clap = (t, v = 0.8) => { a.perc('snare', t, v * 0.55); a.perc('snare', t + 0.011, v * 0.55); a.perc('snare', t + 0.023, v); };
    const hat = (t, v = 0.55) => a.perc('hat', t, v);
    const cow = (t, v = 0.11) => [540, 800].forEach(f => a.note(hz(f), t, 0.22, { vel: v, show: false, tone: { partials: SQ, attack: 0.001, release: 0.05, decay: 12 } }));
    const HIT = { KICK: (t, o) => kick(t, o), CLAP: t => clap(t), HAT: (t, o) => hat(t, o.hatV), COWBELL: t => cow(t) };

    // ---------- the 16-step grid: 4 lanes, programmed cells lit, pulsing on each hit; a playhead row ----------
    const GX = 580, GY = 625, CW = 56, CH = 98;
    // play a pattern from tStart to t1 (grid visible t0..t1); o.kick = extra kick options per step
    function seq(t0, t1, pat, s16, tStart, o = {}) {
      const cells = [];
      LANES.forEach(l => { for (let s = 0; s < 16; s++) cells.push({ label: '', color: COL[l] }); });
      const g = a.grid(cells, t0, t1, { rows: 4, cols: 16, cw: CW, chh: CH, x: GX, y: GY, revealStep: o.reveal ?? 0 });
      const ph = a.grid(Array.from({ length: 16 }, (_, s) => ({ label: '', color: s % 4 ? GREY : WHITE })), t0, t1, { rows: 1, cols: 16, cw: CW, chh: 36, x: GX, y: GY - 48 });
      LANES.forEach((l, r) => a.big(l, t0, t1, { x: 66, y: GY + r * CH + CH / 2, size: l.length > 4 ? 19 : 23, ...MONO, color: COL[l], blur: 0 }));
      ['1', '2', '3', '4'].forEach((b, i) => a.big(b, t0, t1, { x: GX - 8 * CW + (i * 4 + 0.5) * CW, y: GY + 4 * CH + 26, size: 24, ...MONO, color: GREY, blur: 0 }));
      const hits = {};
      const end = o.stop ?? t1;
      let bar = 0;
      for (let tb = tStart; tb < end - 0.02; tb += 16 * s16, bar++) {
        for (let s = 0; s < 16; s++) {
          const t = tb + s * s16;
          if (t >= end - 0.02) break;
          ph.active.push({ t0: t, t1: t + s16, i: s });
          LANES.forEach((l, r) => {
            if (!pat[l].includes(s) || (o.mute && o.mute(l, t))) return;
            const i = r * 16 + s;
            (hits[i] = hits[i] || []).push(t);
            const ko = o.kick ? o.kick(s, bar, t) : {};
            HIT[l](t, { ...ko, hatV: o.hatV ? o.hatV(s) : 0.5 });
          });
          if (o.roll && o.roll(s, bar)) for (let k = 1; k < 3; k++) hat(t + k * s16 / 3, 0.35);
        }
      }
      // programmed cells: lit from `prog` (default t0); a new window at each hit restarts the pulse
      LANES.forEach((l, r) => pat[l].forEach(s => {
        const i = r * 16 + s, hs = (hits[i] || []).filter(x => x > t0 + 0.01);
        const p0 = o.prog ? o.prog(l, s) : t0;
        if (p0 >= t1) return;
        let last = p0;
        hs.filter(x => x > p0).forEach(x => { g.active.push({ t0: last, t1: x, i }); last = x; });
        g.active.push({ t0: last, t1, i });
      }));
      return g;
    }

    // ---- hook: the grid and a long booming kick (cover: grid fully programmed from the start) ----
    const h1 = S('hook').t1, s16a = 0.15;
    seq(0.02, h1, P_A, s16a, 0.3, { kick: s => ({ dur: s === 0 ? 1.2 : 0.8, decay: 2.2, vel: 0.65 }) });
    a.big('BOOM', a.w('hook', 'boom') - 0.05, a.at('what') - 0.05, { y: 480, size: 72, color: PINK, blur: 18 });
    a.big('ROLAND TR-808', a.w('what', 'Roland') - 0.05, h1, { y: 470, size: 56, color: GOLD, blur: 14 });
    a.big('RHYTHM COMPOSER · 1980', a.w('what', 'Rhythm') - 0.05, h1, { y: 535, size: 30, ...MONO, color: WHITE, blur: 0 });

    // ---- s1: Sexual Healing (named only): an original laid-back pattern ----
    const b0 = S('s1').t0, b1 = S('s1').t1;
    seq(b0, b1, P_B, 0.155, b0 + 0.15, { kick: () => ({ dur: 0.6, decay: 3, vel: 0.6 }), hatV: s => (s % 4 === 2 ? 0.6 : 0.4) });
    a.big('EARLY HITS', a.w('s1', 'Early') - 0.05, b1, { y: 480, size: 56, color: GOLD, blur: 14 });
    [['F3', 'A3', 'C4'], ['E3', 'G3', 'C4']].forEach((c, i) => c.forEach(n => a.note(n, b0 + 0.15 + i * (b1 - b0) / 2, (b1 - b0) / 2 - 0.2, { vel: 0.035, show: false, tone: { partials: [1, 0.4, 0.15], attack: 0.3, release: 0.4 } })));

    // ---- s2: Planet Rock (named only): an original electro pattern with cowbell ----
    const c0 = S('s2').t0, c1 = S('s2').t1;
    seq(c0, c1, P_C, 0.13, c0 + 0.15, { kick: () => ({ dur: 0.5, decay: 4, vel: 0.6 }), hatV: s => (s % 2 ? 0.3 : 0.5) });
    a.big('ELECTRO', a.w('s2', 'Planet') - 0.05, c1, { y: 480, size: 64, color: BLUE, blur: 14 });
    a.big('+ COWBELL', a.w('s2', 'same') - 0.05, c1, { y: 545, size: 30, ...MONO, color: BLUE, blur: 0 });

    // ---- s3: trap - half-time clap, rolling hats, the kick tuned as a bass line ----
    const d0 = S('s3').t0, d1 = S('s3').t1;
    const BASS = [['C2', 65.41], ['C2', 65.41], ['D#2', 77.78], ['A#1', 58.27], ['A#1', 58.27], ['G#1', 51.91]];
    let bi = 0;
    seq(d0, d1, P_D, 0.107, d0 + 0.15, {
      kick: () => { const [k, f] = BASS[bi++ % BASS.length]; return { f, dur: 0.55, decay: 1.2, vel: 0.62, key: a.T.midi(k) >= 36 ? k : null }; },
      roll: (s, bar) => s === 14 && bar % 2 === 1, hatV: s => (s % 2 ? 0.3 : 0.48),
    });
    a.big('THE KICK = THE BASS', a.w('s3', 'bass') - 0.05, d1, { y: 480, size: 50, color: PINK, blur: 14 });

    // ---- why1-2: not recordings - circuits ----
    const e0 = S('why1').t0, e1 = S('why1').t1;
    const tRec = a.w('why1', 'recordings') - 0.05, tAn = a.w('why2', 'Analog') - 0.05, tSyn = a.w('why2', 'synthetic') - 0.05;
    const gc = a.grid([{ label: 'RECORDINGS', sub: 'SAMPLES OF REAL DRUMS', color: GREY, size: 46 }, { label: 'CIRCUITS', sub: 'SOUND GENERATED LIVE', color: TEAL, size: 52 }],
      e0 + 0.1, e1, { rows: 2, cols: 1, cw: 820, chh: 200, y: 450, revealStep: 0.2 });
    gc.active.push({ t0: tRec, t1: tAn, i: 0 }, { t0: tAn, t1: e1, i: 1 });
    a.big('×', a.w('why1', 'recordings') + 0.3, e1, { x: 880, y: 535, size: 130, color: RED, blur: 16 });
    const gv = a.grid(LANES.map(l => ({ label: l, color: COL[l], size: l.length > 4 ? 30 : 36 })), tAn, e1, { rows: 1, cols: 4, cw: 220, chh: 130, y: 900, revealStep: 0.12 });
    const demo = [['KICK', 0], ['CLAP', 1], ['HAT', 2], ['COWBELL', 3]];
    demo.forEach(([l, i], k) => { const t = tAn + 0.3 + k * 0.5; HIT[l](t, { dur: 0.6, decay: 3, hatV: 0.6 }); gv.active.push({ t0: t, t1: t + 0.4, i }); });
    for (let k = 0; k < 8; k++) { const t = tSyn + k * 0.3; if (t > e1 - 0.3) break; const l = ['KICK', 'HAT', 'CLAP', 'HAT', 'KICK', 'COWBELL', 'CLAP', 'HAT'][k]; HIT[l](t, { dur: 0.5, decay: 3, hatV: 0.5 }); gv.active.push({ t0: t, t1: t + 0.25, i: LANES.indexOf(l) }); }
    a.big('SYNTHETIC, NOT REAL', tSyn, e1, { y: 1080, size: 40, ...MONO, color: TEAL, blur: 8 });
    // before: a sampled-sounding (engine) kit, quietly
    for (let t = e0 + 0.2, k = 0; t < tAn - 0.2; t += 0.3, k++) { if (k % 4 === 0) a.perc('kick', t, 0.7); if (k % 4 === 2) a.perc('snare', t, 0.6); a.perc('hat', t + 0.15, 0.3); }

    // ---- why3-4: the kick is a decaying sine - short, then long (a bass note) ----
    const k0 = S('why3').t0, k1 = S('why3').t1;
    const tDec = a.w('why3', 'decaying') - 0.05, tLong = a.w('why4', 'long') - 0.05, tBass = a.w('why4', 'bass') - 0.05;
    function sineDots(t0, t1, y, k, col, cycles = 4) {
      for (let i = 0; i < 72; i++) {
        const x = i / 71, ta = t0 + x * 0.5, v = Math.exp(-k * x) * Math.sin(2 * Math.PI * cycles * x);
        a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: 18, chh: 18, x: 130 + x * 820, y: y - 120 * v - 9 }).active.push({ t0: ta, t1, i: 0 });
      }
    }
    sineDots(tDec, k1, 640, 5, PINK);
    a.big('SHORT DECAY', tDec, k1, { x: 880, y: 470, size: 30, ...MONO, color: PINK, blur: 0 });
    kick(tDec, { dur: 0.5, decay: 6, vel: 0.65 }); kick(tDec + 0.7, { dur: 0.5, decay: 6, vel: 0.65 });
    sineDots(tLong, k1, 940, 0.4, ORANGE);
    a.big('LONG DECAY', tLong, k1, { x: 880, y: 770, size: 30, ...MONO, color: ORANGE, blur: 0 });
    a.big('= A BASS NOTE', tBass, k1, { y: 1110, size: 40, ...MONO, color: ORANGE, blur: 8 });
    a.big('ONE KICK', k0 + 0.2, tDec, { y: 640, size: 60, color: PINK, blur: 14 });
    kick(k0 + 0.3, { dur: 0.6, decay: 4, vel: 0.6 });
    [['C2', 65.41, 0], ['C2', 65.41, 0.9], ['D#2', 77.78, 1.35], ['G2', 98.0, 2.25]].forEach(([n, f, o]) => {
      const t = tLong + 0.1 + o;
      if (t < k1 - 0.4) kick(t, { f, dur: Math.min(1.1, k1 - t - 0.2), decay: 0.9, vel: 0.62, key: n });
    });
    for (let t = tLong + 0.1, k = 0; t < k1 - 0.3; t += 0.225, k++) hat(t, k % 2 ? 0.3 : 0.45);

    // ---- why7: the step sequencer - buttons get programmed, then the pattern plays ----
    const q0 = S('why7').t0, q1 = S('why7').t1;
    const tSx = a.w('why7', 'sixteen') - 0.05, tOne = a.w('why7', 'one') - 0.05, tLit = a.w('why7', 'lit') - 0.05;
    const tPlay = Math.max(tLit + 0.1, q0 + 0.5);
    const order = []; LANES.forEach(l => P_E[l].forEach(s => order.push([l, s])));
    const progSpan = Math.max(0.8, tLit - tOne);
    seq(q0 + 0.1, q1, P_E, 0.14, tPlay, {
      prog: (l, s) => { const k = order.findIndex(([ll, ss]) => ll === l && ss === s); return tOne + (k / order.length) * progSpan; },
      kick: () => ({ dur: 0.7, decay: 2.5, vel: 0.62 }),
    });
    a.big('16 STEPS', tSx, tOne, { y: 480, size: 60, color: WHITE, blur: 12 });
    a.big('1 STEP = 1 SIXTEENTH', tOne, tLit, { y: 480, size: 46, ...MONO, color: GOLD, blur: 8 });
    a.big('LIT = HIT', tLit, q1, { y: 480, size: 60, color: GOLD, blur: 14 });
    // programming clicks
    order.forEach((_, k) => a.perc('hat', tOne + (k / order.length) * progSpan, 0.12));

    // ---- why5-6: unrealistic, sold poorly ... then cheap, embraced ----
    const r0 = S('why5').t0, r1 = S('why5').t1;
    const tUn = a.w('why5', 'unrealistic') - 0.05, tPo = a.w('why5', 'poorly') - 0.05, tCh = a.w('why6', 'cheap') - 0.05, tHip = a.w('why6', 'hip') - 0.05;
    const gs = a.grid([{ label: 'UNREALISTIC', color: RED, size: 46 }, { label: 'SOLD POORLY', color: RED, size: 46 }, { label: 'CHEAP, SECOND HAND', color: TEAL, size: 46 }, { label: 'HIP HOP · ELECTRO', color: GOLD, size: 46 }],
      r0 + 0.1, r1, { rows: 4, cols: 1, cw: 820, chh: 150, y: 450 });
    gs.active.push({ t0: tUn, t1: tCh, i: 0 }, { t0: tPo, t1: tCh, i: 1 }, { t0: tCh, t1: r1, i: 2 }, { t0: tHip, t1: r1, i: 3 });
    // a lonely, quiet pattern at first; the full groove once it is embraced
    for (let t = r0 + 0.2, k = 0; t < tHip - 0.1; t += 0.3, k++) { if (k % 4 === 0) kick(t, { dur: 0.3, decay: 8, vel: 0.35 }); hat(t + 0.15, 0.2); }
    for (let t = tHip, k = 0; t < r1 - 0.2; t += 0.14, k++) {
      const s = k % 16;
      if (P_A.KICK.includes(s) || s === 7) kick(t, { dur: 0.9, decay: 2, vel: 0.65, f: s === 7 ? 58.27 : 49 });
      if (P_A.CLAP.includes(s)) clap(t);
      hat(t, s % 2 ? 0.3 : 0.5);
      if (s === 14) cow(t);
    }

    // ---- essence: the full grid one last time ----
    const z0 = S('essence').t0, z1 = S('essence').t1;
    seq(z0, z1, P_E, 0.14, z0 + 0.15, { kick: s => ({ dur: s === 0 ? 1.2 : 0.7, decay: 2.2, vel: 0.65 }), stop: z1 - 1.6 });
    kick(z1 - 1.6 + 0.05, { dur: 1.4, decay: 1.6, vel: 0.65 });
    a.big('FAKE KICK, REAL LEGACY', a.w('essence', 'shaped') - 0.05, z1, { y: 480, size: 46, color: GOLD, blur: 14 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
