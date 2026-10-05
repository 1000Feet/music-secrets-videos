// The Stars and Stripes Forever: how a march is built - steady steps, strains, and a trio where layers stack.
// Brief/copyright: Sousa's melodies are NOT reconstructed. We play a generic oom-pah march in 2/4
// (E flat major, then the trio in A flat major) plus our own short piccolo-like trill line,
// our own simple melody and our own low brass line.
const BEAT = 0.5, E8 = BEAT / 2, BAR = 2 * BEAT; // 2/4: two beats per bar
const SX = BEAT / 4;
// left hand: [oom 1, oom 2, pah chord]
const LH = {
  Eb: ['Eb2', 'Bb2', ['Eb3', 'G3', 'Bb3']], Bb7: ['Bb2', 'F2', ['D3', 'F3', 'Ab3']],
  Ab: ['Ab2', 'Eb2', ['Eb3', 'Ab3', 'C4']], Eb7: ['Eb2', 'Bb2', ['Db3', 'G3', 'Bb3']],
};
const PROG_EB = ['Eb', 'Eb', 'Bb7', 'Eb'], PROG_AB = ['Ab', 'Ab', 'Eb7', 'Ab'];
// our own piccolo-like line, two bars: a trill, a quick run, a little leap (in sixteenths: [notes, 16ths each])
const PIC = {
  Eb: [['G5', 'F5', 'G5', 'F5', 'G5', 'F5', 'G5', 'F5'], ['Eb5', 'D5', 'C5', 'Bb4'], ['Eb5', 'Eb5'], ['G5']],
  Ab: [['F5', 'Eb5', 'F5', 'Eb5', 'F5', 'Eb5', 'F5', 'Eb5'], ['C5', 'Eb5', 'F5', 'G5'], ['F5', 'F5'], ['Eb5']],
};
// our own simple trio melody (4 bars, in beats) and a low brass line (4 bars, in beats)
const MEL = [['Eb4', 1], ['Ab4', 1], ['C5', 2], ['Bb4', 1], ['G4', 1], ['Ab4', 2]];
const BRASS = [['Ab2', 1], ['C3', 1], ['Eb3', 1], ['C3', 1], ['Bb2', 1], ['G2', 1], ['Ab2', 2]];

module.exports = {
  slug: 'stars-and-stripes',
  title: 'The Stars and Stripes Forever',
  segments: [
    { id: 'hook',    text: 'Steady steps, a key change, and a piccolo on top. How is a march built?' },
    { id: 'what',    text: 'This is The Stars and Stripes Forever, by John Philip Sousa, from 1896.' },
    { id: 'what2',   text: 'Sousa was known as the March King.' },
    { id: 'what3',   text: 'And since 1987, it has been the official National March of the United States.' },
    { id: 'trio',    text: 'Its final trio is famous for a high piccolo countermelody, soaring above the band.' },
    { id: 'why1',    text: 'So why does it work? First, steady steps: two four time.' },
    { id: 'why1b',   text: 'One, two. One, two. Left, right.' },
    { id: 'why2',    text: 'Bass on the beat, chord off the beat. Oom, pah. The sound of a marching band.' },
    { id: 'why3',    text: 'Next, a march is built from strains: sections that repeat.' },
    { id: 'why3b',   text: 'Then comes the trio, a contrasting section in a new key, usually a fourth higher.' },
    { id: 'why4',    text: 'Here, E flat major moves up to A flat major. It feels broader and warmer.' },
    { id: 'why5',    text: 'And in the last trio, Sousa stacks the layers.' },
    { id: 'why5b',   text: 'The melody, the piccolo above, and a low brass countermelody below.' },
    { id: 'why5c',   text: 'Three lines at once, all fitting together.' },
    { id: 'essence', text: "Steady steps, a new key, and layers that stack. That's how a march lifts a crowd." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE MARCH KING', title: 'STARS AND STRIPES', accent: true, tonic: 3, min: 5.6 },
    { id: 'what', segs: ['what'], label: 'A MARCH BY SOUSA', title: 'STARS AND STRIPES', sub: 'John Philip Sousa · 1896 · in Eb', tonic: 3, tail: 0.5 },
    { id: 'what2', segs: ['what2', 'what3'], label: 'A NICKNAME', title: 'JOHN PHILIP SOUSA', circle: false, tonic: 3, gap: 0.35, tail: 0.6 },
    { id: 'trio', segs: ['trio'], label: 'THE FINAL TRIO', title: 'A PICCOLO ON TOP', sub: 'trio in Ab', tonic: 8, tail: 2.9 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'STEADY STEPS', title: 'TWO FOUR TIME', circle: false, tonic: 3, gap: 0.3, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'BASS AND CHORD', title: 'OOM - PAH', circle: false, tonic: 3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'THE FORM', title: 'STRAINS AND A TRIO', circle: false, tonic: 3, gap: 0.3, tail: 0.5 },
    { id: 'why4', segs: ['why4'], label: 'A FOURTH HIGHER', title: 'Eb TO Ab', tonic: 3, tail: 1.2 },
    { id: 'why5', segs: ['why5', 'why5b', 'why5c'], label: 'THE LAST TRIO', title: 'THREE LINES AT ONCE', circle: false, tonic: 8, gap: 0.3, tail: 1.3 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'LAYERS THAT STACK', accent: true, tonic: 8, gap: 0.5, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/\d/, '');

    // oom-pah bars from t0 (one chord name per bar, cycling) until t1; layers can be switched off
    function march(t0, t1, prog, o = {}) {
      const v = o.vel ?? 1;
      for (let b = 0; ; b++) {
        const tb = t0 + b * BAR;
        if (tb >= t1 - 0.1) break;
        const c = prog[b % prog.length], [b1, b2, ch] = LH[c], end = Math.min(tb + BAR, t1);
        if (o.shape !== false) a.ch(c, tb, end, { notes: ch, bass: false, mute: true, hideName: o.hideName, strikes: [{ o: E8, v: 0.6 }, { o: 3 * E8, v: 0.6 }] });
        for (let k = 0; k < 4; k++) {
          const t = tb + k * E8;
          if (t >= t1 - 0.05) break;
          if (k % 2 === 0) {
            if (o.oom !== false) a.note(k ? b2 : b1, t, E8 * 0.9, { vel: 0.36 * v, show: false });
            a.perc('kick', t, (k ? 0.35 : 0.55) * v);
            if (o.grid) o.grid.active.push({ t0: t, t1: t + E8, i: k });
          } else {
            ch.forEach((n, j) => a.note(n, t + j * 0.008, E8 * 0.6, { vel: 0.16 * v, show: false }));
            a.perc('hat', t, 0.28 * v);
            if (o.grid) o.grid.active.push({ t0: t, t1: t + E8, i: k });
          }
        }
      }
    }
    // our piccolo-like line (2 bars) starting at t0; returns end time
    function piccolo(t0, key, o = {}) {
      const [trill, run, hop, top] = PIC[key];
      let t = t0;
      trill.forEach(n => { a.note(n, t, SX / 2 * 0.9, { vel: (o.vel ?? 0.3) * 0.8, show: false }); t += SX / 2; });
      if (o.show !== false) a.note(trill[1], t0, 0.5, { vel: 0, show: true });
      run.forEach(n => { a.note(n, t, SX * 0.85, { vel: o.vel ?? 0.3, show: o.show !== false }); t += SX; });
      a.note(hop[0], t, SX * 0.6, { vel: o.vel ?? 0.3, show: false }); t += SX;
      a.note(hop[1], t, SX * 0.9, { vel: o.vel ?? 0.3, show: o.show !== false }); t += SX;
      a.note(top[0], t, 6 * SX * 0.9, { vel: (o.vel ?? 0.3) * 1.1, show: o.show !== false });
      return t0 + 2 * BAR;
    }
    // a 4-bar line given in beats, looped from t0 (bar grid) and kept only after `from`
    function line(list, t0, t1, from, o = {}) {
      for (let c = t0; c < t1 - 0.1; c += 4 * BAR) {
        let t = c;
        for (const [n, b] of list) {
          if (t >= from - 0.02 && t < t1 - 0.1) a.note(n, t, Math.min(b * BEAT, t1 - t) * 0.92, { vel: o.vel ?? 0.3, show: o.show ?? false });
          t += b * BEAT;
        }
      }
    }
    // bar boundary at or after time x on the grid starting at g0
    const nextBar = (x, g0) => g0 + Math.ceil((x - g0 - 0.02) / BAR) * BAR;

    // ---- hook: E flat major pops in, an oom-pah march with a piccolo trill on top (cover) ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'Eb', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.07 } });
    march(0.3, h1, PROG_EB, { vel: 0.85 });
    piccolo(0.3, 'Eb', { vel: 0.3 });
    piccolo(0.3 + 2 * BAR, 'Eb', { vel: 0.3 });
    a.tag(0, 0.35, h1, 'A MARCH IN 2/4', { x: 540, y: 455, color: GOLD });

    // ---- what: the march, quietly, in E flat ----
    const w0 = S('what').t0, w1 = S('what').t1;
    march(w0 + 0.05, w1, PROG_EB, { vel: 0.55 });
    a.tag('Eb', a.w('what', 'Sousa'), w1, 'E FLAT MAJOR', { dr: -92, color: GOLD });

    // ---- what2: the March King, 1896 and 1987 ----
    const k0 = S('what2').t0, k1 = S('what2').t1;
    const gk = a.grid([{ label: '1896', sub: 'WRITTEN', size: 80, color: '#8a8a92' }, { label: '1987', sub: 'NATIONAL MARCH', size: 80, color: GOLD, subSize: 24 }],
      a.at('what3') - 0.1, k1, { rows: 1, cols: 2, cw: 400, chh: 230, y: 560, revealStep: 0.2 });
    gk.active.push({ t0: a.at('what3'), t1: a.w('what3', '1987') - 0.05, i: 0 }, { t0: a.w('what3', '1987') - 0.05, t1: k1, i: 1 });
    a.big('THE MARCH KING', k0 + 0.2, a.at('what3') - 0.1, { y: 680, size: 96, color: GOLD, blur: 30 });
    a.big('OF THE UNITED STATES', a.w('what3', 'United'), k1, { y: 930, size: 44, ...MONO, color: '#ffffff', blur: 8 });
    march(k0 + 0.05, k1, PROG_EB, { vel: 0.5 });

    // ---- trio: A flat major, then our piccolo line soaring above ----
    const t0 = S('trio').t0, tr1 = S('trio').t1;
    a.scale(t0, 'Ab', a.T.MAJOR);
    const pStart = nextBar(a.w('trio', 'piccolo') - 0.1, t0 + 0.1);
    march(t0 + 0.1, tr1 - 0.6, PROG_AB, { vel: 0.7 });
    for (let t = pStart; t + 2 * BAR <= tr1 - 0.55; t += 2 * BAR) piccolo(t, 'Ab', { vel: 0.34 });
    a.ch('Ab', tr1 - 0.6, tr1, { notes: ['Eb3', 'Ab3', 'C4', 'Eb4'], bass: 'Ab2', vel: 0.7 });
    a.tag('Ab', t0 + 0.4, tr1, 'TRIO', { dr: -92, color: GOLD });
    a.tag(0, a.w('trio', 'piccolo') - 0.05, tr1, 'HIGH PICCOLO', { x: 540, y: 485, color: TEAL });

    // ---- why1: 2/4 - one, two, left, right ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const g1 = a.grid([{ label: 'ONE', sub: 'LEFT', color: GOLD, size: 76 }, { label: 'two', sub: 'RIGHT', color: TEAL, size: 60 }],
      y0 + 0.1, y1, { rows: 1, cols: 2, cw: 400, chh: 260, y: 560, revealStep: 0.15 });
    a.big('2 / 4', a.w('why1', 'two') - 0.05, a.at('why1b'), { y: 960, size: 120, color: GOLD, blur: 26 });
    a.big('TWO BEATS PER BAR', a.at('why1b'), y1, { y: 960, size: 46, ...MONO, color: '#ffffff', blur: 8 });
    const s1 = a.w('why1', 'steady') - 0.05;
    for (let t = s1, i = 0; t < y1 - 0.1; t += BEAT, i++) {
      g1.active.push({ t0: t, t1: t + BEAT, i: i % 2 });
      a.note(i % 2 ? 'Bb2' : 'Eb2', t, 0.2, { vel: 0.32, show: false });
      a.perc('kick', t, i % 2 ? 0.4 : 0.7);
    }

    // ---- why2: oom-pah grid, eighth by eighth ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const OP = [{ label: 'OOM', sub: 'BASS', color: TEAL, size: 46 }, { label: 'PAH', sub: 'CHORD', color: PINK, size: 46 }, { label: 'OOM', sub: 'BASS', color: TEAL, size: 46 }, { label: 'PAH', sub: 'CHORD', color: PINK, size: 46 }];
    const g2 = a.grid(OP, z0 + 0.1, z1, { rows: 1, cols: 4, cw: 230, chh: 210, y: 580, revealStep: 0.1, caption: 'ONE BAR OF 2/4' });
    march(z0 + 0.15, z1, PROG_EB, { grid: g2, vel: 0.9 });
    a.big('ON THE BEAT', a.w('why2', 'beat') - 0.05, a.w('why2', 'chord') - 0.05, { y: 960, size: 56, color: TEAL });
    a.big('OFF THE BEAT', a.w('why2', 'chord') - 0.05, a.w('why2', 'sound') - 0.05, { y: 960, size: 56, color: PINK });
    a.big('A MARCHING BAND', a.w('why2', 'sound') - 0.05, z1, { y: 960, size: 56, color: GOLD });

    // ---- why3: strain, again, strain, again... then the trio in a new key ----
    const f0 = S('why3').t0, f1 = S('why3').t1;
    const FORM = [
      { label: '1', sub: 'STRAIN', color: TEAL, size: 64, subSize: 22 }, { label: '1', sub: 'AGAIN', color: TEAL, size: 64, subSize: 22 },
      { label: '2', sub: 'STRAIN', color: BLUE, size: 64, subSize: 22 }, { label: '2', sub: 'AGAIN', color: BLUE, size: 64, subSize: 22 },
      { label: 'TRIO', sub: 'NEW KEY', color: GOLD, size: 44, subSize: 22 },
    ];
    const g3 = a.grid(FORM, f0 + 0.1, f1, { rows: 1, cols: 5, cw: 196, chh: 210, y: 560, revealStep: 0.08 });
    const tS = a.w('why3', 'strains') - 0.05, tTrio = nextBar(a.w('why3b', 'trio') - 0.05, f0 + 0.15);
    const sl = (tTrio - tS) / 4;
    [0, 1, 2, 3].forEach(i => g3.active.push({ t0: tS + i * sl, t1: tS + (i + 1) * sl, i }));
    g3.active.push({ t0: tTrio, t1: f1, i: 4 });
    march(f0 + 0.15, tTrio, PROG_EB, { vel: 0.7 });
    march(tTrio, f1, PROG_AB, { vel: 0.85 });
    a.big('A FOURTH HIGHER', a.w('why3b', 'fourth') - 0.05, f1, { y: 900, size: 60, color: GOLD });

    // ---- why4: E flat up a fourth to A flat - the scale rotates ----
    const q0 = S('why4').t0, q1 = S('why4').t1;
    a.scale(q0, 'Eb', a.T.MAJOR);
    const tAb = nextBar(a.w('why4', 'A') - 0.08, q0 + 0.1);
    march(q0 + 0.1, tAb, PROG_EB, { vel: 0.75 });
    a.scale(tAb, 'Ab', a.T.MAJOR);
    march(tAb, q1 - 0.5, PROG_AB, { vel: 0.85 });
    a.ch('Ab', q1 - 0.5, q1, { notes: ['Eb3', 'Ab3', 'C4', 'Eb4'], bass: 'Ab2', vel: 0.6 });
    a.ring(['Eb'], q0 + 0.3, tAb, { color: TEAL });
    a.arc('Eb', 'Ab', tAb, q1, { steps: 5, color: GOLD, dr: 30, label: 'UP A FOURTH', labelR: 165 });
    a.ring(['Ab'], tAb, q1, { color: GOLD });
    a.tag('Ab', tAb + 0.2, q1, 'NEW KEY', { dr: -92, color: GOLD });
    a.big('BROADER · WARMER', a.w('why4', 'broader') - 0.05, q1, { y: 462, size: 44, ...MONO, color: GOLD });

    // ---- why5: three lines at once - melody, piccolo above, low brass below ----
    const l0 = S('why5').t0 + 0.1, l1 = S('why5').t1;
    const g5 = a.grid([
      { label: 'PICCOLO', sub: 'ABOVE', color: TEAL, size: 52, subSize: 22 },
      { label: 'MELODY', sub: 'MIDDLE', color: GOLD, size: 52, subSize: 22 },
      { label: 'LOW BRASS', sub: 'BELOW', color: PINK, size: 52, subSize: 22 },
    ], l0, l1, { rows: 3, cols: 1, cw: 640, chh: 165, y: 500, revealStep: 0.12 });
    const tMel = nextBar(a.w('why5b', 'melody') - 0.1, l0), tPic = nextBar(a.w('why5b', 'piccolo') - 0.1, l0), tBr = nextBar(a.w('why5b', 'brass') - 0.1, l0);
    const tAll = a.at('why5c') - 0.05, lEnd = l1 - 0.7;
    march(l0, lEnd, PROG_AB, { vel: 0.6, oom: false });
    for (let t = l0; t < tBr - 0.05; t += BEAT) a.note(((t - l0) / BEAT) % 2 < 0.5 ? 'Ab2' : 'Eb2', t, E8 * 0.9, { vel: 0.3, show: false });
    line(MEL, l0, lEnd, tMel, { vel: 0.36 });
    line(BRASS, l0, lEnd, tBr, { vel: 0.34 });
    for (let t = l0; t < lEnd - 0.1; t += 2 * BAR) if (t >= tPic - 0.02) piccolo(t, 'Ab', { vel: 0.26, show: false });
    g5.active.push({ t0: tMel, t1: tPic, i: 1 }, { t0: tPic, t1: tBr, i: 0 }, { t0: tBr, t1: tAll, i: 2 });
    [0, 1, 2].forEach(i => g5.active.push({ t0: tAll, t1: l1, i }));
    a.ch('Ab', lEnd, l1, { notes: ['Eb3', 'Ab3', 'C4', 'Ab4'], bass: 'Ab2', vel: 0.7 });
    a.big('ALL FITTING TOGETHER', a.w('why5c', 'fitting') - 0.05, l1, { y: 1050, size: 44, ...MONO, color: GOLD });

    // ---- essence: E flat steps, the new key, then every layer, landing on A flat ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'Eb', a.T.MAJOR);
    const eNew = nextBar(a.w('essence', 'new') - 0.1, e0), eLay = nextBar(a.w('essence', 'layers') - 0.1, eNew);
    const eEnd = eLay + 4 * BAR;
    march(e0, eNew, PROG_EB, { vel: 0.8 });
    a.scale(eNew, 'Ab', a.T.MAJOR);
    march(eNew, eEnd, PROG_AB, { vel: 0.85, oom: false });
    for (let t = eNew; t < eLay - 0.05; t += BEAT) a.note(((t - eNew) / BEAT) % 2 < 0.5 ? 'Ab2' : 'Eb2', t, E8 * 0.9, { vel: 0.32, show: false });
    line(MEL, eLay, eEnd, eLay, { vel: 0.36 });
    line(BRASS, eLay, eEnd, eLay, { vel: 0.34 });
    piccolo(eLay, 'Ab', { vel: 0.3 }); piccolo(eLay + 2 * BAR, 'Ab', { vel: 0.32 });
    a.ch('Ab', eEnd, e1 - 0.3, { notes: ['Eb3', 'Ab3', 'C4', 'Eb4', 'Ab4'], bass: 'Ab2', vel: 0.9 });
    a.note('Eb5', eEnd, 1.6, { vel: 0.3 });
    a.perc('kick', eEnd, 0.9); a.perc('snare', eEnd, 0.6);
    a.ring(['Ab'], eNew, e1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
