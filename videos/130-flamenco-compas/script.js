// Flamenco's compás: a 12-beat cycle accented on 3, 6, 8, 10, 12 - threes, then twos.
// Only a generic compás: palmas-style claps, stamps, and rasgueado strums of the Andalusian cadence
// (Am G F E). No specific recordings or falsetas.
const B = 0.25;                       // one beat of the compás
const ACC = [3, 6, 8, 10, 12];

module.exports = {
  slug: 'flamenco-compas',
  title: "Flamenco's 12-Beat Cycle",
  segments: [
    { id: 'hook',    text: 'Twelve beats, five accents... and a rhythm that burns.' },
    { id: 'what',    text: 'This is compás, the rhythm of flamenco, from Andalusia in southern Spain.' },
    { id: 'unesco',  text: 'In 2010, UNESCO inscribed flamenco as Intangible Cultural Heritage of Humanity.' },
    { id: 'styles',  text: 'Styles like soleá and bulería are built on this twelve beat cycle.' },
    { id: 'listen',  text: 'Listen to the claps: one cycle of twelve beats, then around again.' },
    { id: 'why1',    text: 'So how does it work? Count to twelve, and accent three, six, eight, ten and twelve.' },
    { id: 'why2',    text: 'The first half groups in threes: three plus three.' },
    { id: 'why3',    text: 'The second half switches to twos: two plus two plus two.' },
    { id: 'why4',    text: 'That mixes six eight and three four: a hemiola, built right into the cycle.' },
    { id: 'why5',    text: 'Palmas, the handclaps, foot stamps and rasgueado guitar strums all mark the accents.' },
    { id: 'why6',    text: 'And the harmony leans on the Andalusian cadence: A minor, G, F, E.' },
    { id: 'why6b',   text: 'Resting on that E gives it the Phrygian sound.' },
    { id: 'essence', text: 'Twelve beats, accents that shift from threes to twos... and the rhythm burns.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TWELVE BEATS', title: 'COMPÁS', accent: true, circle: false, tonic: 9, lead: 0.5, min: 2 * 12 * B + 0.4, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ANDALUSIA · SPAIN', title: 'FLAMENCO', circle: false, tonic: 9, tail: 0.7 },
    { id: 'unesco', segs: ['unesco'], label: 'UNESCO · 2010', title: 'WORLD HERITAGE', circle: false, tonic: 9, tail: 0.8 },
    { id: 'styles', segs: ['styles'], label: 'YOU HEAR IT IN', title: 'Soleá · Bulería', sub: 'the 12-beat compás', circle: false, tonic: 9, tail: 1.5 },
    { id: 'listen', segs: ['listen'], label: 'LISTEN', title: 'ONE CYCLE', circle: false, tonic: 9, min: 12 * B * 2 + 0.6, tail: 12 * B + 0.3 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'COUNT TO 12', circle: false, tonic: 9, tail: 12 * B + 0.4 },
    { id: 'why2', segs: ['why2'], label: 'THE FIRST HALF', title: '3 + 3', circle: false, tonic: 9, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'THE SECOND HALF', title: '2 + 2 + 2', circle: false, tonic: 9, tail: 0.8 },
    { id: 'why4', segs: ['why4'], label: '6/8 MEETS 3/4', title: 'A BUILT-IN HEMIOLA', circle: false, tonic: 9, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'WHO MARKS THE ACCENTS', title: 'CLAP · STAMP · STRUM', circle: false, tonic: 9, tail: 1.0 },
    { id: 'why6', segs: ['why6', 'why6b'], label: 'THE HARMONY', title: 'ANDALUSIAN CADENCE', tonic: 9, row: ['Am', 'G', 'F', 'E'], gap: 0.3, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE RHYTHM BURNS', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const CW = 82, GY = 470, GH = 150;
    // the 12-beat grid: accents bigger and gold
    const cells = () => [...Array(12)].map((_, i) => ACC.includes(i + 1) ? { label: String(i + 1), size: 46, color: GOLD, sub: '>', subSize: 22 } : { label: String(i + 1), size: 34, color: GREY });
    const beats = (t0, t1) => a.grid(cells(), t0, t1, { rows: 1, cols: 12, cw: CW, chh: GH, y: GY, revealStep: t0 < 0.5 ? 0.04 : 0 });
    // the grouping under it: 3 + 3 + 2 + 2 + 2, each group a box spanning its beats
    const GR = [[0, 3, PINK], [3, 3, PINK], [6, 2, TEAL], [8, 2, TEAL], [10, 2, TEAL]];
    const groups = (t0, t1, reveal = 0) => GR.map(([s, n, col], k) => a.grid([{ label: String(n), size: 40, color: col }], t0 + k * reveal, t1,
      { rows: 1, cols: 1, cw: n * CW, chh: 96, y: GY + GH + 6, x: 540 + (s + n / 2 - 6) * CW }));
    const lightGroups = (G, ks, t0, t1) => ks.forEach(k => G[k].active.push({ t0, t1, i: 0 }));

    // sounds: palmas (claps), golpe (stamp), rasgueado strums
    const clap = (t, v) => { a.perc('snare', t, v); a.perc('hat', t + 0.004, v * 0.6); a.perc('snare', t + 0.012, v * 0.4); };
    const stamp = (t, v = 0.7) => a.perc('kick', t, v);
    const ras = [0, 0.045, 0.09, 0.135].map((o, i) => ({ o, v: 1 - i * 0.15 }));
    const V = { Am: [['A3', 'C4', 'E4', 'A4'], 'A2'], G: [['G3', 'B3', 'D4', 'G4'], 'G2'], F: [['F3', 'A3', 'C4', 'F4'], 'F2'], E: [['G#3', 'B3', 'E4', 'G#4'], 'E2'] };
    const strum = (c, t, dur, v = 0.6, full = true, row) => a.ch(c, t, t + dur, { notes: V[c][0], bass: V[c][1], vel: v, strikes: full ? ras : [{ o: 0, v: 1 }], shape: true, row });
    // chord for each beat of the cycle: Am (1-3) G (4-6) F (7-10) E (11-12)
    const HAR = i => (i < 3 ? 'Am' : i < 6 ? 'G' : i < 10 ? 'F' : 'E');
    // one cycle starting at t; o.grid / o.groups to light; o.chords to strum; o.stop to cut
    function cycle(t, o = {}) {
      for (let i = 0; i < 12; i++) {
        const tb = t + i * B;
        if (tb > (o.stop ?? Infinity) - 0.05) return;
        const acc = ACC.includes(i + 1), v = o.vel ?? 1;
        if (o.grid) o.grid.active.push({ t0: tb, t1: tb + B, i });
        if (o.groups) { const k = GR.findIndex(([s, n]) => i >= s && i < s + n); if (!o.only || o.only.includes(k)) o.groups[k].active.push({ t0: tb, t1: tb + B, i: 0 }); }
        clap(tb, (acc ? 0.85 : 0.28) * v);
        if (acc && (o.stamps ?? true)) stamp(tb, 0.55 * v);
        if (o.chords !== false) {
          const c = HAR(i), first = i === 0 || HAR(i - 1) !== c;
          if (acc || first) strum(c, tb, B * (acc ? 1 : 1), (acc ? 0.65 : 0.4) * v, acc);
        }
      }
    }
    const run = (t0, t1, o = {}) => { let t = t0; for (; t < t1 - 0.3; t += 12 * B) cycle(t, { ...o, stop: t1 }); return t; };

    // ---- part 1: one grid, compás running from the first frame ----
    const p1 = S('listen').t1;
    const g1 = beats(0.05, S('why1').t0);
    const G1 = groups(0.35, S('why1').t0, 0.08);
    run(0.3, p1, { grid: g1, groups: G1 });
    a.big('3 + 3 + 2 + 2 + 2', 0.9, S('hook').t1, { y: 900, size: 56, ...MONO, color: '#ffffff', blur: 8 });
    a.big('ANDALUSIA', a.w('what', 'Andalusia'), S('what').t1, { y: 900, size: 64, color: GOLD, blur: 18 });
    a.big('SOUTHERN SPAIN', a.w('what', 'southern'), S('what').t1, { y: 990, size: 36, ...MONO, color: GREY, blur: 0 });
    a.big('2010', a.w('unesco', '2010'), S('unesco').t1, { y: 900, size: 130, color: GOLD, blur: 24 });
    a.big('INTANGIBLE CULTURAL HERITAGE', a.w('unesco', 'Intangible'), S('unesco').t1, { y: 1030, size: 30, ...MONO, color: '#ffffff', blur: 0 });
    a.big('OF HUMANITY · UNESCO', a.w('unesco', 'Humanity'), S('unesco').t1, { y: 1080, size: 30, ...MONO, color: GREY, blur: 0 });
    a.big('SOLEÁ', a.w('styles', 'sole'), S('styles').t1, { x: 330, y: 920, size: 60, color: PINK, blur: 14 });
    a.big('BULERÍA', a.w('styles', 'bulera'), S('styles').t1, { x: 750, y: 920, size: 60, color: TEAL, blur: 14 });
    a.big('12-BEAT CYCLE', a.w('styles', 'cycle'), S('styles').t1, { y: 1040, size: 38, ...MONO, color: '#ffffff', blur: 0 });

    { const l0 = a.w('listen', 'cycle') - 0.1, cyc = 12 * B;
      // count along with the cycle that is already running (cycles start at 0.3 s)
      const k0 = Math.ceil((l0 - 0.3) / cyc), cs = 0.3 + k0 * cyc;
      const XS = { 3: 220, 6: 380, 8: 540, 10: 700, 12: 860 };
      for (let c = 0; cs + c * cyc < p1 - 0.3; c++) ACC.forEach(n => { const t = cs + c * cyc + (n - 1) * B; if (t < p1 - 0.1) a.big(String(n), t, Math.min(p1, cs + (c + 1) * cyc + 0.45), { x: XS[n], y: 920, size: 110, color: GOLD, blur: 24 }); });
      a.big('AND AROUND AGAIN', a.w('listen', 'around'), p1, { y: 1080, size: 36, ...MONO, color: GREY, blur: 0 }); }

    // ---- why1: count to twelve, accents on the spoken numbers, then one cycle ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const g2 = beats(w0 + 0.05, S('why4').t1);
    const G2 = groups(w0 + 0.05, S('why4').t1);
    const tCount = a.w('why1', 'Count');
    for (let i = 0; i < 12; i++) { const t = tCount + 0.15 + i * 0.12; g2.active.push({ t0: t, t1: t + 0.12, i }); a.perc('hat', t, 0.25); }
    const NUM = [['three', 0], ['six', 0], ['eight', 0], ['ten', 0], ['twelve', 1]];
    NUM.forEach(([w, n], k) => { const t = a.w('why1', w, n) - 0.03; g2.active.push({ t0: t, t1: a.end('why1') + 0.1, i: ACC[k] - 1 }); clap(t, 0.8); });
    a.big('ACCENTS: 3 · 6 · 8 · 10 · 12', a.w('why1', 'accent'), w1, { y: 900, size: 44, ...MONO, color: GOLD, blur: 8 });
    run(a.end('why1') + 0.3, w1, { grid: g2, groups: G2 });

    // ---- why2: 3 + 3 ----
    const x0 = S('why2').t0, x1 = S('why2').t1;
    lightGroups(G2, [0, 1], a.w('why2', 'threes'), x1);
    run(x0 + 0.05, x1, { grid: g2 });
    a.big('6/8 FEEL', a.w('why2', 'threes'), x1, { y: 900, size: 56, ...MONO, color: PINK, blur: 10 });
    a.big('ONE two three · FOUR five six', a.w('why2', 'plus'), x1, { y: 990, size: 32, ...MONO, color: GREY, blur: 0 });

    // ---- why3: 2 + 2 + 2 ----
    const y0 = S('why3').t0, y1 = S('why3').t1;
    lightGroups(G2, [2, 3, 4], a.w('why3', 'twos'), y1);
    run(y0 + 0.05, y1, { grid: g2 });
    a.big('3/4 FEEL', a.w('why3', 'twos'), y1, { y: 900, size: 56, ...MONO, color: TEAL, blur: 10 });
    a.big('ONE two · THREE four · FIVE six', a.w('why3', 'plus'), y1, { y: 990, size: 32, ...MONO, color: GREY, blur: 0 });

    // ---- why4: threes then twos, in one cycle = hemiola ----
    const z0 = S('why4').t0, z1 = S('why4').t1;
    run(z0 + 0.05, z1, { grid: g2, groups: G2 });
    a.big('6/8', a.w('why4', 'six'), z1, { x: 330, y: 900, size: 80, ...MONO, color: PINK, blur: 14 });
    a.big('+', a.w('why4', 'three'), z1, { x: 540, y: 900, size: 60, ...MONO, color: '#ffffff', blur: 0 });
    a.big('3/4', a.w('why4', 'three'), z1, { x: 750, y: 900, size: 80, ...MONO, color: TEAL, blur: 14 });
    a.big('= HEMIOLA', a.w('why4', 'hemiola'), z1, { y: 1030, size: 50, ...MONO, color: GOLD, blur: 10 });

    // ---- why5: palmas, stamps, rasgueado ----
    const v0 = S('why5').t0, v1 = S('why5').t1;
    const g3 = beats(v0 + 0.05, v1);
    const tPa = a.w('why5', 'Palmas'), tSt = a.w('why5', 'stamps'), tRa = a.w('why5', 'rasgueado'), tMk = a.w('why5', 'mark');
    const gW = a.grid([{ label: 'PALMAS', sub: 'HANDCLAPS', size: 34, color: PINK, subSize: 18 }, { label: 'STAMPS', sub: 'FEET', size: 34, color: BLUE, subSize: 18 }, { label: 'RASGUEADO', sub: 'GUITAR', size: 30, color: GOLD, subSize: 18 }],
      v0 + 0.05, v1, { rows: 1, cols: 3, cw: 320, chh: 150, y: 800 });
    gW.active.push({ t0: tPa, t1: tSt, i: 0 }, { t0: tSt, t1: tRa, i: 1 }, { t0: tRa, t1: tMk, i: 2 });
    [0, 1, 2].forEach(i => gW.active.push({ t0: tMk, t1: v1, i }));
    // palmas only, then + stamps, then + strums
    run(v0 + 0.05, tSt, { grid: g3, chords: false, stamps: false });
    const tS = run(tSt, tRa, { grid: g3, chords: false, stamps: true });
    void tS;
    run(tRa, v1, { grid: g3 });

    // ---- why6: the Andalusian cadence on the circle, strummed in compás ----
    const c0 = S('why6').t0, c1 = S('why6').t1;
    a.scale(c0, 'A', a.T.MINOR);
    const tC = [a.w('why6', 'A') , a.w('why6', 'G'), a.w('why6', 'F'), a.w('why6', 'E')].map(t => t - 0.04);
    const NAMES = ['Am', 'G', 'F', 'E'];
    a.ch('Am', c0 + 0.1, tC[0], { notes: V.Am[0], bass: V.Am[1], vel: 0.35, row: 0 });
    for (let t = c0 + 0.1, i = 0; t < tC[0] - 0.1; t += B, i++) clap(t, ACC.includes((i % 12) + 1) ? 0.6 : 0.2);
    NAMES.forEach((c, i) => strum(c, tC[i], (i < 3 ? tC[i + 1] : tC[3] + 0.8) - tC[i], 0.75, true, i));
    // then a full cycle of compás with the cadence, landing on E
    const ce = a.end('why6') + 0.5;
    for (let i = 0; i < 12 && ce + i * B < c1 - 0.2; i++) {
      const tb = ce + i * B, acc = ACC.includes(i + 1), c = HAR(i);
      clap(tb, acc ? 0.8 : 0.25); if (acc) stamp(tb, 0.5);
      a.ch(c, tb, tb + B, { notes: V[c][0], bass: V[c][1], vel: acc ? 0.7 : 0.4, strikes: acc ? ras : [{ o: 0, v: 1 }], row: NAMES.indexOf(c) });
    }
    a.ch('E', ce + 12 * B, c1, { notes: V.E[0], bass: V.E[1], vel: 0.7, strikes: ras, row: 3 });
    a.tag('E', a.w('why6b', 'Phrygian'), c1, 'PHRYGIAN', { color: TEAL });

    // ---- essence: the compás once more, ending on a final strike ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    const g4 = beats(e0 + 0.05, e1), G4 = groups(e0 + 0.05, e1);
    const tEnd = run(e0 + 0.1, a.at('cta') - 0.2, { grid: g4, groups: G4 });
    strum('E', tEnd, e1 - tEnd - 0.3, 0.8, true);
    clap(tEnd, 0.9); stamp(tEnd, 0.8);
    g4.active.push({ t0: tEnd, t1: e1, i: 11 });
    a.big('THREES → TWOS', a.w('essence', 'shift'), e1, { y: 900, size: 52, ...MONO, color: GOLD, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void RED; void GREEN;
  },
};
