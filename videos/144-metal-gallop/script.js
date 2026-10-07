// The metal gallop: long-short-short (an eighth plus two sixteenths) on palm-muted low power chords.
// Copyright/brief: The Trooper and Run to the Hills (Iron Maiden) are named only. Every riff here is
// an ORIGINAL generic gallop on an E5 power chord. Guitar = a bright additive tone with a fast decay
// (palm muted) or a slow one (open); bass and drums double the rhythm.
const B = 0.4, U = B / 4; // 150 BPM: one beat, one sixteenth
const LSS = [0, 2, 3], SSL = [0, 1, 2]; // hit positions (in sixteenths) inside one beat
const RIFF = ['E2', 'E2', 'E2', 'E2', 'E2', 'E2', 'G2', 'A2']; // one power chord per beat (2 bars)

module.exports = {
  slug: 'metal-gallop',
  title: 'The Metal Gallop',
  segments: [
    { id: 'hook',    text: 'Long, short, short. Again and again. This one rhythm makes heavy metal charge forward.' },
    { id: 'what',    text: "It's the metal gallop: one eighth note, then two sixteenths, on every beat." },
    { id: 's1',      text: 'Iron Maiden made it famous, in The Trooper, from 1983...' },
    { id: 's2',      text: 'and Run to the Hills, from 1982, both driven by bassist Steve Harris.' },
    { id: 'flip',    text: 'Remember William Tell? That rhythm was short, short, long.' },
    { id: 'flip2',   text: 'The metal gallop flips it: long, short, short.' },
    { id: 'why1',    text: 'So why does it work? Long, short, short sounds like hooves. A horse, running forward.' },
    { id: 'why2',    text: 'Then palm muting: the picking hand rests on the strings, near the bridge...' },
    { id: 'why2b',   text: 'so every note is short and percussive.' },
    { id: 'why3',    text: 'Play it on low power chords, like in our power chord video, and it becomes a wall of rhythm.' },
    { id: 'why4',    text: 'And often the bass, the guitars and the drums all gallop together.' },
    { id: 'why4b',   text: 'So it hits even harder.' },
    { id: 'essence', text: 'Long, short, short, again and again, and the whole band charges forward.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'LONG · SHORT · SHORT', title: 'THE METAL GALLOP', accent: true, circle: false, lead: 0.4, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ONE BEAT', title: '1/8 + 1/16 + 1/16', circle: false, tail: 0.8 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'The Trooper', sub: 'Iron Maiden · 1983', circle: false, tail: 1.4 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Run to the Hills', sub: 'Iron Maiden · 1982', circle: false, tail: 1.6 },
    { id: 'flip', segs: ['flip', 'flip2'], label: 'COMPARE', title: 'FLIPPED', circle: false, gap: 0.5, tail: 1.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'HOOVES', circle: false, tail: 1.4 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'PALM MUTING', circle: false, gap: 0.4, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'LOW POWER CHORDS', tonic: 4, row: ['E5', 'G5', 'A5', 'E5'], tail: 1.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'ALL TOGETHER', circle: false, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'CHARGE FORWARD', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', RED = '#ff5d6c', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => a.T.midi(n);

    // ---------- voices ----------
    const GTR = [1, 0.75, 0.6, 0.5, 0.4, 0.33, 0.27, 0.22, 0.17, 0.13, 0.1, 0.08];
    // power chord (root, fifth, octave) - muted: short and percussive; open: rings
    function chord(root, t, dur, o = {}) {
      const r = M(root), open = !!o.open;
      [r, r + 7, r + 12].forEach((m, k) => a.note(m, t, dur, { vel: (o.vel ?? 0.15) * (k === 2 ? 0.7 : 1), show: false, tone: { partials: GTR, attack: 0.002, release: open ? 0.5 : 0.03, decay: open ? 1.2 : 16 } }));
    }
    const bass = (root, t, dur, v = 0.3) => a.note(M(root) - 12, t, dur, { vel: v, show: false, tone: { partials: [1, 0.5, 0.25, 0.12], attack: 0.003, release: 0.05, decay: 6 } });
    const kick = (t, v = 0.8) => a.perc('kick', t, v);
    // one beat of gallop. o: { guitar, bass, drums, hooves, open, pat, beat } ; returns hit times
    function beat(t, root, o = {}) {
      const pat = o.pat || LSS, u = o.u ?? U;
      const hits = pat.map(p => t + p * u);
      hits.forEach((h, k) => {
        const len = (k < pat.length - 1 ? pat[k + 1] : 4) - pat[k];
        if (o.guitar !== false) chord(root, h, len * u * 0.9, { vel: (o.gv ?? 0.15) * (k ? 0.85 : 1), open: o.open });
        if (o.bass) bass(root, h, len * u * 0.85);
        if (o.drums) kick(h, k ? 0.6 : 0.85);
        if (o.hooves) { a.perc(k ? 'hat' : 'kick', h, k ? 0.5 : 0.9); if (!k) a.perc('snare', h, 0.2); }
        if (o.note) a.note(o.note, h, len * u * 0.85, { vel: 0.32, show: false });
      });
      if (o.drums) { if (o.beat % 2) { a.perc('snare', t, 0.85); a.perc('snare', t + 0.015, 0.3); } a.perc('hat', t, 0.35); a.perc('hat', t + 2 * u, 0.25); }
      return hits;
    }

    // ---------- the gallop grid: 4 beats × (1 long + 2 short) cells, widths in sixteenths ----------
    const CU = 62; // px per sixteenth
    function ggrid(t0, t1, o = {}) {
      const pat = o.pat || LSS, y = o.y ?? 580, chh = o.chh ?? 240, col = o.color || GOLD, x0 = 540 - 8 * CU;
      const cells = [];
      for (let b = 0; b < 4; b++) pat.forEach((p, k) => {
        const len = (k < pat.length - 1 ? pat[k + 1] : 4) - p, long = len === 2;
        const g = a.grid([{ label: long ? 'DA' : 'da', sub: o.subs && long ? '1/8' : undefined, subSize: 20, size: long ? 44 : 28, color: long ? col : (o.short || TEAL) }],
          t0, t1, { rows: 1, cols: 1, cw: len * CU, chh, x: x0 + (b * 4 + p + len / 2) * CU, y, revealStep: o.reveal ?? 0 });
        cells.push({ g, len });
      });
      if (o.beats !== false) ['1', '2', '3', '4'].forEach((n, b) => a.big(n, t0, t1, { x: x0 + (b * 4 + 2) * CU, y: y + chh + 22, size: 24, ...MONO, color: GREY, blur: 0 }));
      if (o.caption) a.big(o.caption, t0, t1, { y: y - 30, size: 26, ...MONO, color: o.capColor || GREY, blur: 0 });
      // light: play(beatIndex, hits)
      return (bi, hits, u = U) => hits.forEach((h, k) => { const c = cells[(bi % 4) * pat.length + k]; c.g.active.push({ t0: h, t1: h + c.len * u * 0.95, i: 0 }); });
    }
    // run the band from t0 to t1 on the riff; light = grid lighter
    function band(t0, t1, light, o = {}) {
      let n = 0;
      for (let t = t0; t + B <= t1 + 0.02; t += B, n++) {
        const root = (o.riff || RIFF)[n % (o.riff || RIFF).length];
        const hits = beat(t, root, { bass: o.bass ?? true, drums: o.drums ?? true, beat: n, gv: o.gv, guitar: o.guitar });
        if (light) light(n, hits);
        if (o.onBeat) o.onBeat(n, t, root);
      }
      return t0 + n * B;
    }

    // ---------- hook (cover): the grid is fully drawn from the first frame, the band gallops ----------
    const h1 = S('hook').t1;
    const L1 = ggrid(0.02, S('what').t1, { subs: true });
    band(0.25, S('what').t1 - 0.3, L1);
    a.big('LONG · SHORT · SHORT', 0.05, a.at('what') - 0.1, { y: 1040, size: 48, ...MONO, color: GOLD, blur: 8 });
    a.big('1 EIGHTH + 2 SIXTEENTHS', a.w('what', 'eighth') - 0.05, S('what').t1, { y: 1040, size: 40, ...MONO, color: TEAL, blur: 8 });
    a.big('PER BEAT', a.w('what', 'every') - 0.05, S('what').t1, { y: 1100, size: 32, ...MONO, color: GREY, blur: 0 });
    chord('E2', S('what').t1 - 0.3, 0.6, { open: true, vel: 0.14 });

    // ---------- songs: an original generic gallop riff ----------
    const s10 = S('s1').t0, s21 = S('s2').t1;
    const L2 = ggrid(s10, s21, {});
    const sEnd = band(s10 + 0.1, s21 - 0.5, L2);
    chord('E2', sEnd, 0.6, { open: true, vel: 0.15 }); kick(sEnd); a.perc('snare', sEnd, 0.6);
    a.big('IRON MAIDEN', a.w('s1', 'Iron') - 0.05, S('s1').t1, { y: 1040, size: 52, ...MONO, color: GOLD, blur: 10 });
    a.big('BASSIST STEVE HARRIS', a.w('s2', 'Steve') - 0.1, s21, { y: 1040, size: 44, ...MONO, color: PINK, blur: 8 });

    // ---------- flip: William Tell (short, short, long) vs the metal gallop (long, short, short) ----------
    const f0 = S('flip').t0, f1 = S('flip').t1, tF2 = a.at('flip2');
    const LW = ggrid(f0, f1, { pat: SSL, y: 520, chh: 170, caption: 'WILLIAM TELL:  SHORT · SHORT · LONG', capColor: TEAL, beats: false, color: GOLD });
    const LM = ggrid(a.w('flip2', 'flips') - 0.1, f1, { pat: LSS, y: 800, chh: 170, caption: 'METAL GALLOP:  LONG · SHORT · SHORT', capColor: GOLD });
    for (let t = f0 + 0.2, n = 0; t + B <= tF2 - 0.1; t += B, n++) LW(n, beat(t, 'E2', { pat: SSL, guitar: false, note: 'B3' }));
    const tL = a.w('flip2', 'long') - 0.05;
    for (let t = a.w('flip2', 'flips') - 0.05, n = 0; t + B <= f1 - 0.1; t += B, n++) LM(n, beat(t, 'E2', { gv: t < tL ? 0.09 : 0.15, bass: t >= tL, hooves: false }));
    a.big('LONG · SHORT · SHORT', tL, f1, { y: 1060, size: 40, ...MONO, color: GOLD, blur: 8 });

    // ---------- why1: hooves - percussion only, then the guitars join ----------
    const w10 = S('why1').t0, w11 = S('why1').t1, tHo = a.w('why1', 'hooves') - 0.05, tHr = a.w('why1', 'horse') - 0.05;
    const LH = ggrid(w10, w11, { color: GOLD });
    for (let t = w10 + 0.15, n = 0; t + B <= w11 - 0.1; t += B, n++) {
      const hits = beat(t, n % 8 < 6 ? 'E2' : 'G2', { guitar: t >= tHr, gv: 0.12, hooves: true, bass: t >= tHr });
      LH(n, hits);
    }
    a.big('HOOVES', tHo, tHr, { y: 1050, size: 64, color: PINK, blur: 14 });
    a.big('FORWARD  →  →  →', tHr, w11, { y: 1050, size: 52, ...MONO, color: GOLD, blur: 10 });

    // ---------- why2: open (rings) vs palm muted (short, percussive): envelope bars ----------
    const p0 = S('why2').t0, p1 = S('why2').t1;
    const tMute = a.w('why2', 'muting') - 0.05, tShort = a.w('why2b', 'short') - 0.05;
    function env(t0, t1, y, k, col, label) {
      const N = 22, W = 860, bw = W / N;
      a.big(label, t0, t1, { y: y - 120, size: 30, ...MONO, color: col, blur: 0 });
      for (let i = 0; i < N; i++) {
        const v = Math.exp(-k * i / N), h = Math.max(14, 190 * v);
        const ta = t0 + i * 0.04;
        a.grid([{ label: '', color: col }], ta, t1, { rows: 1, cols: 1, cw: bw, chh: h + 16, x: 540 - W / 2 + (i + 0.5) * bw, y: y - h / 2 - 8 }).active.push({ t0: ta, t1, i: 0 });
      }
    }
    // open ring first
    env(p0 + 0.1, p1, 690, 1.2, BLUE, 'OPEN: IT RINGS');
    chord('E2', p0 + 0.15, Math.max(0.8, tMute - p0 - 0.3), { open: true, vel: 0.16 });
    // palm muted: short bars, chugging
    env(tMute, p1, 990, 9, GOLD, 'PALM MUTED: SHORT');
    for (let t = tMute + 0.1, n = 0; t + B <= p1 - 0.1; t += B, n++) beat(t, 'E2', { gv: 0.16, bass: t > tShort, drums: t > tShort, beat: n });
    a.big('PERCUSSIVE', a.w('why2b', 'percussive') - 0.05, p1, { y: 470, size: 46, ...MONO, color: GOLD, blur: 8 });

    // ---------- why3: low power chords on the circle, galloping ----------
    const q0 = S('why3').t0, q1 = S('why3').t1;
    a.scale(q0, 'E', [0, 7], { popIn: { t0: q0 + 0.1, step: 0.15 } });
    const PC = [['E5', 'E2'], ['G5', 'G2'], ['A5', 'A2'], ['E5', 'E2']];
    const per = 4 * B; // one bar per chord
    let qn = 0;
    for (let t = q0 + 0.15; t + per <= q1 - 0.5; t += per, qn++) {
      const [nm, r] = PC[qn % 4], m = M(r);
      a.ch(nm, t, t + per, { notes: [m + 12, m + 19], bass: m, row: qn % 4, vel: 0.001, mute: false });
      for (let b = 0; b < 4; b++) beat(t + b * B, r, { bass: true, drums: true, beat: b });
    }
    const qe = q0 + 0.15 + qn * per;
    a.ch('E5', qe, q1, { notes: ['E3', 'B3'], bass: 'E2', row: 3, vel: 0.001 });
    chord('E2', qe, q1 - qe, { open: true, vel: 0.16 }); kick(qe); a.perc('snare', qe, 0.6);
    a.tag(0, a.w('why3', 'low') - 0.05, a.w('why3', 'wall') - 0.1, 'ROOT + FIFTH', { x: 540, y: 1010, color: GOLD });
    a.tag(0, a.w('why3', 'wall') - 0.05, q1, 'A WALL OF RHYTHM', { x: 540, y: 1010, color: RED });

    // ---------- why4: bass, guitars and drums gallop together ----------
    const r0 = S('why4').t0, r1 = S('why4').t1;
    const tB = a.w('why4', 'bass') - 0.05, tG = a.w('why4', 'guitars') - 0.05, tD = a.w('why4', 'drums') - 0.05, tTo = a.w('why4', 'together') - 0.05;
    const lanes = [['BASS', tB, PINK, 560], ['GUITARS', tG, GOLD, 760], ['DRUMS', tD, BLUE, 960]].map(([l, t0, c, y]) => {
      a.big(l, t0, r1, { x: 540, y: y - 22, size: 24, ...MONO, color: c, blur: 0 });
      return ggrid(t0, r1, { y, chh: 120, color: c, short: c, beats: false });
    });
    for (let t = r0 + 0.15, n = 0; t + B <= r1 - 0.1; t += B, n++) {
      const root = RIFF[n % 8], on = [t >= tB - 0.2, t >= tG - 0.2, t >= tD - 0.2];
      const hits = beat(t, root, { guitar: on[1], bass: on[0], drums: on[2], beat: n, gv: 0.15 });
      if (!on[0] && !on[1]) LSS.forEach((p, k) => a.perc('hat', t + p * U, 0.3));
      lanes.forEach((L, i) => { if (on[i]) L(n, hits); });
    }
    a.big('ONE RHYTHM, WHOLE BAND', tTo, r1, { y: 470, size: 44, ...MONO, color: WHITE, blur: 10 });
    a.big('HARDER', a.w('why4b', 'harder') - 0.05, r1, { y: 1110, size: 56, color: RED, blur: 14 });

    // ---------- essence: the full band once more, ending on a ringing E5 ----------
    const z0 = S('essence').t0, z1 = S('essence').t1;
    const LZ = ggrid(z0, z1, { subs: true });
    const zEnd = band(z0 + 0.15, z1 - 2.2, LZ);
    chord('E2', zEnd, 1.6, { open: true, vel: 0.17 }); bass('E2', zEnd, 1.4, 0.32); kick(zEnd, 1); a.perc('snare', zEnd, 0.7);
    a.big('LONG · SHORT · SHORT', a.w('essence', 'Long') - 0.05, z1, { y: 1040, size: 48, ...MONO, color: GOLD, blur: 8 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
