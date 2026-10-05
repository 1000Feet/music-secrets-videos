// Danse Macabre, decoded: Death's violin, retuned so its open strings form the devil's interval.
// Public domain elements used exactly as the brief gives them: the harp's D struck twelve times,
// the violin's open A + E flat played together, a G minor waltz in 3/4 (chords only), and the
// opening of the Dies irae (F E F D E C D D). No other Saint-Saëns melody is played.
const BEAT = 0.36, BAR = 3 * BEAT;
const STRIKE = 0.42;    // harp strikes at midnight
const DIES = ['F4', 'E4', 'F4', 'D4', 'E4', 'C4', 'D4', 'D4'];

module.exports = {
  slug: 'danse-macabre',
  title: 'Danse Macabre',
  segments: [
    { id: 'hook',    text: "Death plays the violin... tuned to the devil's interval." },
    { id: 'what',    text: 'This is Danse Macabre by Saint-Saëns, from 1874, based on a poem by Henri Cazalis.' },
    { id: 'what2',   text: 'At midnight, Death plays his fiddle and skeletons dance until dawn.' },
    { id: 'harp',    text: 'First, the harp plays a single note, D, twelve times. The clock strikes midnight.' },
    { id: 'tune',    text: 'Then the solo violin plays its open strings A and E flat together: Death tuning his fiddle.' },
    { id: 'waltz',   text: 'And the dance begins: a waltz in G minor.' },
    { id: 'why1',    text: 'So why so sinister? Saint-Saëns asked the soloist to tune the top string down, from E to E flat.' },
    { id: 'why1b',   text: "That's called scordatura." },
    { id: 'why2',    text: "Now the open strings A and E flat form a tritone. Six half steps, the devil's interval." },
    { id: 'why2b',   text: 'On the circle, exactly opposite.' },
    { id: 'why3',    text: 'The xylophone imitates rattling bones.' },
    { id: 'why4',    text: 'He also quotes the Dies irae, the medieval chant for the dead, a symbol of death.' },
    { id: 'why5',    text: "At dawn, the oboe plays a rooster's crow, and the skeletons flee." },
    { id: 'essence', text: "One detuned string turns a violin into Death's instrument. The tritone does the rest." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SAINT-SAËNS · 1874', title: 'DANSE MACABRE', accent: true, tonic: 7, min: 4.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'A SYMPHONIC POEM', title: 'DANSE MACABRE', sub: 'Saint-Saëns · 1874', circle: false, tonic: 7, gap: 0.25, tail: 0.5 },
    { id: 'harp', segs: ['harp'], label: 'THE HARP', title: 'MIDNIGHT', sub: 'one note, twelve times', tonic: 7, tail: 0.8 },
    { id: 'tune', segs: ['tune'], label: 'THE SOLO VIOLIN', title: 'DEATH TUNES UP', sub: 'open strings A + E flat', tonic: 7, tail: 0.9 },
    { id: 'waltz', segs: ['waltz'], label: 'THE DANCE', title: 'A WALTZ IN G MINOR', sub: 'in 3/4', tonic: 7, row: ['Gm', 'D7'], tail: 3 * BAR + 0.4 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'SCORDATURA', circle: false, tonic: 7, gap: 0.2, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE TRITONE', tonic: 7, gap: 0.2, tail: 1.1 },
    { id: 'why3', segs: ['why3'], label: 'THE XYLOPHONE', title: 'RATTLING BONES', circle: false, tonic: 7, tail: 1.6 },
    { id: 'why4', segs: ['why4'], label: 'A QUOTATION', title: 'DIES IRAE', tonic: 2, tail: 1.4 },
    { id: 'why5', segs: ['why5'], label: 'AT DAWN', title: 'THE ROOSTER', circle: false, tonic: 7, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE DETUNED STRING', accent: true, tonic: 7, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', GOLD = '#ffcf5a', TEAL = '#45d6c8', BONE = '#e8e2d0', BLUE = '#62a8ff', GREY = '#8a8a92', PURPLE = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const CH = { Gm: { notes: ['Bb3', 'D4', 'G4'], bass: 'G2' }, D7: { notes: ['A3', 'C4', 'D4', 'F#4'], bass: 'D2' } };

    // the violin's open A and E flat, together
    const dstop = (t, vel = 0.32, dur = 0.4, show = true) => { a.note('A4', t, dur, { vel, show }); a.note('Eb5', t, dur, { vel: vel * 0.9, show }); };
    // oom-pah-pah in G minor
    function waltz(t0, t1, o = {}) {
      const out = [];
      for (let t = t0, k = 0; t + BAR <= t1 + 0.02; t += BAR, k++) {
        const name = (o.seq || ['Gm', 'Gm', 'D7', 'Gm'])[k % (o.seq || [0, 0, 0, 0]).length];
        a.ch(name, t, t + BAR, { ...CH[name], vel: o.vel ?? 0.5, row: name === 'Gm' ? 0 : 1, shape: o.shape ?? true, hideName: o.hideName,
          strikes: [{ o: BEAT, v: 0.6 }, { o: 2 * BEAT, v: 0.5 }] });
        out.push(t);
      }
      return out;
    }
    // xylophone-like rattle: short, high, dry notes
    const RATTLE = ['G5', 'D5', 'Bb4', 'D5', 'G5', 'F#5', 'D5', 'A4'];
    function rattle(t0, t1, vel = 0.22, grid) {
      for (let t = t0, i = 0; t < t1 - 0.05; t += 0.09, i++) {
        a.note(RATTLE[i % 8], t, 0.05, { vel: vel * (i % 4 === 0 ? 1.2 : 0.9), show: false });
        if (grid) grid.active.push({ t0: t, t1: t + 0.12, i: (i * 5 + (i >> 2)) % 12 });
      }
    }

    // ---- hook: A and E flat light up, the red diameter between them (cover) ----
    a.scale(0.15, 'A', [0, 6], { popIn: { t0: 0.2, step: 0.15 } });
    a.line('A', 'Eb', 0.3, S('hook').t1, { color: RED });
    a.ring(['A', 'Eb'], 0.35, S('hook').t1, { color: RED });
    a.tag(0, 0.4, S('hook').t1, "DEVIL'S INTERVAL", { x: 540, y: 455, color: RED });
    a.note('G2', 0.3, 4.0, { vel: 0.22, show: false });
    for (let t = 0.3, k = 0; t < S('hook').t1 - 0.4; t += 0.55, k++) dstop(t, 0.3, 0.45);

    // ---- what: 1874, a poem, midnight to dawn ----
    const w0 = S('what').t0, w1 = S('what').t1;
    waltz(w0 + 0.1, w1, { vel: 0.3, shape: false });
    a.big('1874', w0 + 0.2, a.w('what', 'poem') - 0.05, { y: 680, size: 190, color: BONE, blur: 30 });
    a.big('A POEM BY HENRI CAZALIS', a.w('what', 'poem') - 0.05, a.at('what2'), { y: 700, size: 44, color: '#ffffff', ...MONO, blur: 8 });
    a.big('MIDNIGHT', a.w('what2', 'midnight') - 0.05, w1, { y: 640, size: 110, color: PURPLE, blur: 36 });
    a.big('SKELETONS DANCE', a.w('what2', 'skeletons') - 0.05, w1, { y: 790, size: 50, color: BONE, ...MONO, blur: 10 });
    a.big('UNTIL DAWN', a.w('what2', 'dawn') - 0.05, w1, { y: 880, size: 50, color: GOLD, ...MONO, blur: 10 });

    // ---- harp: D struck twelve times; the walker ticks round the circle like a clock ----
    const hp0 = a.w('harp', 'harp'), hp1 = S('harp').t1;
    a.scale(S('harp').t0, 'D', [0]);
    a.ring(['D'], hp0, hp1, { color: GOLD });
    const ticks = [[hp0 - 0.3, 0]];
    for (let k = 1; k <= 12; k++) {
      const t = hp0 + (k - 1) * STRIKE;
      a.note('D4', t, 0.6, { vel: 0.34 }); a.note('D3', t, 0.6, { vel: 0.18, show: false });
      ticks.push([t, k % 12]);
      a.big(String(k), t, k < 12 ? t + STRIKE : hp1, { y: 830, size: k < 12 ? 110 : 150, color: k < 12 ? '#ffffff' : PURPLE, blur: k < 12 ? 16 : 40 });
    }
    a.walker(ticks, { t1: hp1, dr: -40, color: PURPLE });

    // ---- tune: Death tunes his fiddle: A + E flat, again and again ----
    const tn0 = S('tune').t0, tn1 = S('tune').t1;
    a.scale(tn0, 'A', [0, 6]);
    const tA = a.w('tune', 'open') - 0.05;
    a.note('G2', tn0 + 0.1, tn1 - tn0 - 0.2, { vel: 0.18, show: false });
    for (let t = tA; t < tn1 - 0.4; t += 0.6) dstop(t, 0.32, 0.5);
    a.line('A', 'Eb', tA, tn1, { color: RED });
    a.tag('A', a.w('tune', 'A'), tn1, 'OPEN A', { dr: -92, color: RED });
    a.tag('Eb', a.w('tune', 'E'), tn1, 'OPEN E FLAT', { dr: -92, color: RED });

    // ---- waltz: G minor, oom-pah-pah ----
    const wz0 = S('waltz').t0, wz1 = S('waltz').t1;
    a.scale(wz0, 'G', a.T.MINOR);
    const bars = waltz(wz0 + 0.1, wz1 - 0.2, { vel: 0.55 });
    bars.forEach(t => a.perc('kick', t, 0.25));
    // the violin's open-string tritone keeps cutting in on beat 1
    bars.forEach((t, k) => { if (k % 2 === 1) dstop(t, 0.2, 0.3, false); });

    // ---- why1: retune the top string, E -> E flat ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const tDown = a.w('why1', 'down') - 0.05, tSc = a.w('why1b', 'scordatura') - 0.05;
    const STR = (top, col) => [
      { label: 'G', sub: 'STRING 4', color: GREY, size: 64, subSize: 22 },
      { label: 'D', sub: 'STRING 3', color: GREY, size: 64, subSize: 22 },
      { label: 'A', sub: 'STRING 2', color: GREY, size: 64, subSize: 22 },
      { label: top, sub: 'TOP STRING', color: col, size: 64, subSize: 22 },
    ];
    const gE = a.grid(STR('E', TEAL), y0 + 0.1, tDown + 0.3, { rows: 1, cols: 4, cw: 240, chh: 240, y: 560, revealStep: 0.12 });
    const gEb = a.grid(STR('Eb', RED), tDown + 0.3, y1, { rows: 1, cols: 4, cw: 240, chh: 240, y: 560 });
    gE.active.push({ t0: a.w('why1', 'top') - 0.05, t1: tDown + 0.3, i: 3 });
    gEb.active.push({ t0: tDown + 0.3, t1: y1, i: 3 }, { t0: tSc, t1: y1, i: 2 });
    [['G3', 0], ['D4', 1], ['A4', 2], ['E5', 3]].forEach(([n, i]) => a.note(n, y0 + 0.4 + i * 0.35, 0.6, { vel: 0.26 }));
    a.note('E5', a.w('why1', 'top') - 0.05, 0.6, { vel: 0.3 });
    a.note('Eb5', tDown + 0.3, 0.9, { vel: 0.32 });
    a.big('E  →  E FLAT', tDown + 0.3, tSc, { y: 920, size: 64, color: RED, ...MONO, blur: 14 });
    a.big('SCORDATURA', tSc, y1, { y: 920, size: 84, color: RED, blur: 30 });
    for (let t = tSc + 0.2; t < y1 - 0.3; t += 0.6) dstop(t, 0.26, 0.45);

    // ---- why2: A + E flat = tritone, exactly opposite on the circle ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    a.scale(z0, 'A', [0, 6]);
    const tTri = a.w('why2', 'tritone') - 0.05, tSix = a.w('why2', 'Six') - 0.05, tOpp = a.w('why2b', 'opposite') - 0.05;
    a.line('A', 'Eb', z0 + 0.2, z1, { color: RED });
    for (let t = z0 + 0.3; t < tSix; t += 0.6) dstop(t, 0.26, 0.45);
    a.arc('A', 'Eb', tSix, z1, { steps: 6, color: RED, dr: 30 });
    a.arc('A', 'Eb', tSix + 0.2, z1, { steps: -6, color: TEAL, dr: 30 });
    a.tag(0, tSix, z1, '6 HALF STEPS', { x: 540, y: 455, color: RED });
    a.tag(0, tTri, z1, 'TRITONE', { x: 540, y: 830, color: RED });
    for (let i = 0; i <= 6; i++) a.note(69 + i, tSix + 0.1 + i * 0.18, 0.3, { vel: 0.24 });
    a.big('EXACTLY OPPOSITE', tOpp, z1, { y: 1010, size: 34, color: '#ffffff', ...MONO, blur: 8 });
    for (let t = tOpp; t < z1 - 0.3; t += 0.6) dstop(t, 0.3, 0.45);

    // ---- why3: rattling bones (a 2 x 6 grid of bones clattering) ----
    const x0 = S('why3').t0, x1 = S('why3').t1;
    const BONES = Array.from({ length: 12 }, () => ({ label: '▮', color: BONE, size: 40 }));
    const gb = a.grid(BONES, x0 + 0.1, x1, { rows: 2, cols: 6, cw: 150, chh: 150, y: 560, revealStep: 0.04 });
    rattle(a.w('why3', 'xylophone') - 0.05, x1 - 0.2, 0.22, gb);
    waltz(x0 + 0.1, x1, { vel: 0.3, shape: false });
    a.big('XYLOPHONE = BONES', a.w('why3', 'rattling') - 0.05, x1, { y: 940, size: 52, color: BONE, ...MONO, blur: 12 });

    // ---- why4: the Dies irae, F E F D E C D D ----
    const d0 = S('why4').t0, d1 = S('why4').t1;
    a.scale(d0, 'D', a.T.MINOR);
    const tD = Math.min(a.w('why4', 'irae') + 0.5, d1 - 8 * 0.42 - 0.3);
    a.note('D2', d0 + 0.1, d1 - d0 - 0.2, { vel: 0.2, show: false });
    a.note('D3', tD, d1 - tD - 0.1, { vel: 0.18, show: false });
    const pts = DIES.map((n, i) => { const t = tD + i * 0.42; a.note(n, t, i === 7 ? 1.0 : 0.38, { vel: 0.36 }); a.note(a.T.midi(n) - 12, t, i === 7 ? 1.0 : 0.38, { vel: 0.2, show: false }); return [t, n.replace(/\d/, '')]; });
    a.walker(pts, { t1: d1, dr: -40, color: PURPLE });
    a.tag(0, a.w('why4', 'medieval'), d1, 'CHANT FOR THE DEAD', { x: 540, y: 455, color: PURPLE });
    a.tag(0, tD, d1, 'F E F D E C D D', { x: 540, y: 830, color: '#ffffff' });

    // ---- why5: dawn, the rooster, the skeletons flee ----
    const r0 = S('why5').t0, r1 = S('why5').t1;
    a.big('DAWN', r0 + 0.2, r1, { y: 640, size: 150, color: GOLD, blur: 50 });
    a.big('OBOE = ROOSTER', a.w('why5', 'oboe') - 0.05, r1, { y: 800, size: 46, color: '#ffffff', ...MONO, blur: 8 });
    a.big('THE SKELETONS FLEE', a.w('why5', 'skeletons') - 0.05, r1, { y: 880, size: 46, color: BONE, ...MONO, blur: 8 });
    a.ch('Gm', r0 + 0.1, a.w('why5', 'skeletons') - 0.1, { ...CH.Gm, vel: 0.25, shape: false });
    // the bones scatter: a fast run down, then silence
    const tF = a.w('why5', 'flee') - 0.05;
    ['G5', 'F5', 'D5', 'C5', 'Bb4', 'A4', 'G4', 'F4', 'D4', 'C4', 'Bb3', 'G3'].forEach((n, i) => a.note(n, tF + i * 0.06, 0.05, { vel: 0.22 - i * 0.012, show: false }));

    // ---- essence: the tritone once more, over the low G ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'A', [0, 6]);
    a.line('A', 'Eb', e0 + 0.2, e1, { color: RED });
    a.ring(['A', 'Eb'], a.w('essence', 'tritone') - 0.05, e1, { color: RED });
    waltz(e0 + 0.1, a.at('cta'), { vel: 0.35, shape: false });
    for (let t = e0 + 0.3; t < e1 - 0.6; t += 0.6) dstop(t, 0.28, 0.45);
    a.tag(0, a.w('essence', 'tritone') - 0.05, e1, 'TRITONE', { x: 540, y: 830, color: RED });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
