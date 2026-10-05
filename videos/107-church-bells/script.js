// Why bells sound sad: a bell's main partials (hum, prime, tierce, quint, nominal) put a MINOR third
// inside every bell note. Bells are additive synth recipes (engine note option `tone`), one sine per partial.
// Public domain: the Westminster Quarters, first quarter in E major (G#4 F#4 E4 B3), exactly as in the brief.
// Change ringing is shown with a generic plain hunt on four bells (a permutation pattern, not a tune);
// the carillon scene plays only a generic E major scale on bells.
const WQ = ['G#4', 'F#4', 'E4', 'B3'];

module.exports = {
  slug: 'church-bells',
  title: 'Why Bells Sound Sad',
  segments: [
    { id: 'hook',    text: 'Why do church bells sound a little sad... even when they ring a happy tune?' },
    { id: 'what',    text: 'Each bell note hides a minor chord.' },
    { id: 'west',    text: 'You hear it in the Westminster Quarters, written in 1793 for a Cambridge church...' },
    { id: 'west2',   text: 'and later used at Big Ben, in 1859.' },
    { id: 'change',  text: 'In English change ringing, bells ring in changing orders, not tunes.' },
    { id: 'hemony',  text: 'In the 17th century, the Dutch Hemony brothers became famous for tuning carillons accurately.' },
    { id: 'why1',    text: "So why the sadness? A string's overtones go one, two, three, four, five..." },
    { id: 'why1b',   text: 'and five gives a major third.' },
    { id: 'why2',    text: "A bell is different. Its main partials: hum, prime, tierce, quint, nominal." },
    { id: 'why3',    text: 'The tierce sits a minor third above the prime.' },
    { id: 'why4',    text: 'So every bell note carries its own minor chord.' },
    { id: 'why4b',   text: 'Even a major tune sounds faintly melancholy.' },
    { id: 'why5',    text: 'Founders tune these partials by shaving metal from inside the bell.' },
    { id: 'why6',    text: "And they don't quite line up with the piano. That's the shimmer." },
    { id: 'essence', text: "Every bell sings a minor chord inside itself. That's why bells sound bittersweet." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'A HAPPY TUNE, A SAD SOUND', title: 'CHURCH BELLS', accent: true, tonic: 4, lead: 0.4, tail: 0.6, min: 6.2 },
    { id: 'what', segs: ['what'], label: 'INSIDE ONE BELL NOTE', title: 'A MINOR CHORD', tonic: 4, tail: 1.2 },
    { id: 'west', segs: ['west', 'west2'], label: 'YOU HEAR IT IN', title: 'Westminster Quarters', sub: 'Cambridge · 1793 · in E', tonic: 4, gap: 0.3, tail: 2.6 },
    { id: 'change', segs: ['change'], label: 'YOU HEAR IT IN', title: 'Change Ringing', sub: 'English tradition', circle: false, tonic: 4, tail: 2.2 },
    { id: 'hemony', segs: ['hemony'], label: 'YOU HEAR IT IN', title: 'Carillons', sub: 'Hemony brothers · 17th century', circle: false, tonic: 4, tail: 2.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: "A STRING'S OVERTONES", circle: false, tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: "A BELL'S PARTIALS", circle: false, tonic: 0, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE TIERCE', tonic: 0, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'MINOR INSIDE MAJOR', tonic: 4, gap: 0.35, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'TUNED BY HAND', circle: false, tonic: 0, tail: 1.6 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'THE SHIMMER', tonic: 0, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BITTERSWEET', accent: true, tonic: 4, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => a.T.midi(n);
    const pcName = m => a.T.NAMES[a.T.mod(Math.round(m), 12)];

    // a bell: one sine per partial, each with its own decay; offsets in half steps from the prime
    // [offset, amplitude, decay/s]; the last two are short metallic upper partials for the strike
    const PARTS = [[-12, 0.8, 0.45], [0, 0.65, 0.8], [3, 0.6, 0.95], [7, 0.32, 1.3], [12, 0.6, 1.5], [19.2, 0.22, 3.5], [24.4, 0.16, 6]];
    function bell(n, t, vel = 0.3, o = {}) {
      const m = M(n), lit = o.lit ?? 0.9;
      PARTS.forEach(([d, amp, dec], i) => {
        const off = d + (o.detune ? o.detune[i] || 0 : 0);
        if (o.only && !o.only.includes(i)) return;
        a.note(m + off, t, o.dur ?? 2.4, { vel: vel * amp, show: false, tone: { partials: [1], attack: 0.004, release: 1.2, decay: dec * (o.slow ?? 1) } });
      });
      // light the hum, prime, tierce and quint on the keyboard (silent)
      if (lit) [-12, 0, 3, 7].forEach(d => { if (m + d <= 79) a.note(m + d, t, lit, { vel: 0, show: false }); });
    }
    // the minor triad inside a bell, drawn on the circle (silent)
    const shape = (n, t0, t1, o = {}) => {
      const m = M(n);
      return a.ch(pcName(m) + 'm', t0, t1, { notes: [m, m + 3, m + 7], bass: false, mute: true, hideName: o.hideName ?? true, label: o.label, snap: o.snap });
    };
    // Westminster first quarter on bells, returns end time
    function quarter(t0, step, o = {}) {
      const pts = [];
      WQ.forEach((n, i) => {
        const t = t0 + i * step;
        bell(n, t, o.vel ?? 0.3, { dur: i === 3 ? 3 : 2.2, lit: Math.min(step, 1.2) * 0.95 });
        if (o.shapes !== false) shape(n, t, i < 3 ? t + step : (o.t1 ?? t + 2.5), { hideName: false, label: n.replace(/\d/, '') + 'm' });
        pts.push([t, pcName(M(n))]);
      });
      if (o.walker !== false) a.walker(pts, { t1: o.t1 ?? t0 + 4 * step + 1, dr: -40, color: GOLD, label: o.label, labelDr: -46 });
      return t0 + 4 * step;
    }

    // ---- hook: the quarter on bells, each bell showing its minor triad (cover: all visible by 0.9 s) ----
    a.scale(0, 'E', a.T.MAJOR);
    const h1 = S('hook').t1;
    quarter(0.25, 1.15, { t1: h1, label: 'TUNE', vel: 0.32 });
    a.tag(4, 0.3, h1, 'E MAJOR TUNE', { x: 540, y: 462, color: GOLD });

    // ---- what: one bell, its partials light one by one ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const tMin = a.w('what', 'minor') - 0.05, tChord = tMin;
    bell('E4', w0 + 0.15, 0.32, { dur: 3, lit: false });
    a.note('E4', w0 + 0.15, tChord - w0 - 0.15, { vel: 0, show: false });
    a.ch('Em', tChord, w1, { notes: ['E4', 'G4', 'B4'], bass: false, mute: true, label: 'Em', tonic: 4 });
    [['E3', 0], ['E4', 0], ['G4', 0.25], ['B4', 0.5]].forEach(([n, d]) => a.note(n, tChord + d, w1 - tChord - d, { vel: 0, show: false }));
    [0, 3, 7].forEach((d, i) => a.note(64 + d, tChord + i * 0.25, 2.2, { vel: 0.16, show: false, tone: { partials: [1], attack: 0.01, release: 1, decay: 0.9 } }));
    a.tag('G', tMin + 0.3, w1, 'MINOR 3RD', { color: PINK, dr: -92 });
    bell('E4', w1 - 2.2, 0.28, { dur: 3, lit: false });

    // ---- Westminster Quarters (public domain): the first quarter, then again ----
    const q0 = S('west').t0 + 0.2, q1 = S('west').t1;
    const qStep = (a.at('west2') - q0 - 0.3) / 4;
    a.scale(S('west').t0, 'E', a.T.MAJOR);
    quarter(q0, Math.min(1.4, qStep), { t1: a.at('west2') - 0.05, label: 'QUARTER' });
    const q2 = a.at('west2') + 0.2;
    quarter(q2, Math.min(1.0, (q1 - q2 - 1.6) / 4), { t1: q1, label: 'QUARTER' });
    a.tag(4, a.w('west2', 'Big'), q1, 'BIG BEN · 1859', { x: 540, y: 462, color: GOLD });

    // ---- change ringing: plain hunt on four bells (bell 1 = treble, highest) ----
    const BELLS = ['E4', 'D#4', 'C#4', 'B3'];
    const HUNT = ['1234', '2143', '2413', '4231', '4321', '3412', '3142', '1324', '1234'];
    const c0 = S('change').t0 + 0.2, c1 = S('change').t1;
    const strike = 0.3, rowLen = 4 * strike + 0.12;
    const nRows = Math.min(HUNT.length, Math.floor((c1 - c0 - 0.6) / rowLen));
    const BCOL = [GOLD, PINK, TEAL, BLUE];
    a.big('4 BELLS · NEW ORDER EVERY ROW', c0, c1, { y: 1060, size: 34, ...MONO, color: GREY, blur: 0 });
    for (let r = 0; r < Math.min(nRows, 6); r++) {
      const t = c0 + r * rowLen, order = HUNT[r].split('').map(Number);
      // each row is its own grid; earlier rows stay on screen above it
      const g = a.grid(order.map(b => ({ label: String(b), color: BCOL[b - 1], size: 60 })), t, c1,
        { rows: 1, cols: 4, cw: 150, chh: 96, y: 450 + r * 92, x: 540 });
      order.forEach((b, k) => {
        const ts = t + k * strike;
        bell(BELLS[b - 1], ts, 0.22, { dur: 1.2, lit: 0.28 });
        g.active.push({ t0: ts, t1: ts + strike, i: k });
      });
    }

    // ---- carillon: a scale on tuned bells, up and down ----
    const k0 = S('hemony').t0 + 0.2, k1 = S('hemony').t1;
    const SC = ['E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D#5', 'E5'];
    const gk = a.grid(SC.map((n, i) => ({ label: n.replace(/\d/, ''), color: a.T.DEG12[a.T.mod(M(n) - 64, 12)], size: 44 })), k0 - 0.1, k1,
      { rows: 1, cols: 8, cw: 118, chh: 300, y: 520, revealStep: 0.05, caption: 'A CARILLON · TUNED BELLS' });
    const ks = Math.min(0.5, (k1 - k0 - 2.2) / 16);
    [...SC.keys(), ...[6, 5, 4, 3, 2, 1, 0]].forEach((j, i) => { const t = k0 + i * ks; bell(SC[j], t, 0.2, { dur: 1.2, lit: ks * 0.95 }); gk.active.push({ t0: t, t1: t + ks, i: j }); });
    bell('E4', k0 + 15 * ks, 0.26, { dur: 3, lit: 1.5 });
    gk.active.push({ t0: k0 + 15 * ks, t1: k1, i: 0 });
    a.big('HEMONY', a.w('hemony', 'Hemony') - 0.05, k1, { y: 980, size: 64, color: GOLD });
    a.big('TUNED ACCURATELY', a.w('hemony', 'tuning') - 0.05, k1, { y: 1060, size: 40, ...MONO, color: TEAL, blur: 0 });

    // ---- why1: a string's harmonics 1-5 on a low C: C C G C E -> the major third ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const H = [['C', '×1', 36], ['C', '×2', 48], ['G', '×3', 55], ['C', '×4', 60], ['E', '×5', 64]];
    const gh = a.grid(H.map(([l, s]) => ({ label: l, sub: s, color: l === 'E' ? GOLD : TEAL, size: 64 })), y0 + 0.1, y1,
      { rows: 1, cols: 5, cw: 184, chh: 220, y: 560, revealStep: 0.08, caption: 'A STRING: 1, 2, 3, 4, 5' });
    const nums = ['one', 'two', 'three', 'four', 'five'].map(w => a.w('why1', w) - 0.04);
    H.forEach(([, , m], i) => {
      a.note(m, nums[i], y1 - nums[i] - 0.3, { vel: i ? 0.12 : 0.22, show: false, tone: { partials: [1], attack: 0.02, release: 0.5 } });
      gh.active.push({ t0: nums[i], t1: nums[i] + 0.35, i });
    });
    const tMaj = a.w('why1b', 'major') - 0.05;
    gh.active.push({ t0: a.w('why1b', 'five') - 0.05, t1: y1, i: 4 }, { t0: tMaj, t1: y1, i: 3 });
    a.big('C + E = MAJOR 3RD', tMaj, y1, { y: 960, size: 56, ...MONO, color: GOLD });
    a.note('C4', tMaj, 1.6, { vel: 0.22 }); a.note('E4', tMaj, 1.6, { vel: 0.22 });

    // ---- why2: a bell's five partials on C ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const BP = [['HUM', 'C3', 'hum', TEAL], ['PRIME', 'C4', 'prime', TEAL], ['TIERCE', 'Eb4', 'tierce', PINK], ['QUINT', 'G4', 'quint', TEAL], ['NOMINAL', 'C5', 'nominal', TEAL]];
    const gb = a.grid(BP.map(([l, n, , c]) => ({ label: l, sub: n.replace(/\d/, ''), color: c, size: 34, subSize: 36 })), z0 + 0.1, z1,
      { rows: 1, cols: 5, cw: 196, chh: 220, y: 560, revealStep: 0.08, caption: 'A BELL ON C' });
    bell('C4', z0 + 0.2, 0.26, { dur: 2, lit: false });
    BP.forEach(([, n, w], i) => {
      const t = a.w('why2', w) - 0.04;
      gb.active.push({ t0: t, t1: i === 2 ? z1 : t + 0.5, i });
      a.note(n, t, z1 - t - 0.2, { vel: [0.2, 0.17, 0.17, 0.1, 0.12][i], tone: { partials: [1], attack: 0.01, release: 0.6, decay: 0.25 } });
    });
    a.big('Eb = A MINOR 3RD ABOVE C', a.w('why2', 'nominal') + 0.4, z1, { y: 960, size: 46, ...MONO, color: PINK });

    // ---- why3: the tierce on the circle ----
    const t30 = S('why3').t0, t31 = S('why3').t1;
    a.scale(t30, 'C', a.T.MINOR);
    const tTi = a.w('why3', 'minor') - 0.05;
    a.ch('Cm', t30 + 0.15, t31, { notes: ['C4', 'Eb4'], bass: false, mute: true, hideName: true });
    a.line('C', 'Eb', tTi, t31, { color: PINK, label: 'MINOR 3RD', ly: 200, lx: -127 });
    a.tag('C', t30 + 0.2, t31, 'PRIME', { color: TEAL, dr: -92 });
    a.tag('Eb', a.w('why3', 'tierce') - 0.05, t31, 'TIERCE', { color: PINK, dr: -92 });
    bell('C4', t30 + 0.2, 0.28, { dur: 2.5, lit: false });
    a.note('C4', t30 + 0.2, t31 - t30 - 0.4, { vel: 0, show: false });
    a.note('Eb4', a.w('why3', 'tierce'), t31 - a.w('why3', 'tierce') - 0.3, { vel: 0.2, tone: { partials: [1], attack: 0.01, release: 0.6, decay: 0.4 } });
    a.note('C4', tTi, 1.4, { vel: 0.18 }); a.note('Eb4', tTi + 0.5, 1.4, { vel: 0.18 });

    // ---- why4: every bell carries a minor chord; the quarter again (E major) ----
    const f0 = S('why4').t0, f1 = S('why4').t1;
    a.scale(f0, 'C', a.T.MINOR);
    const tCh = a.w('why4', 'chord') - 0.05;
    a.ch('Cm', f0 + 0.15, a.at('why4b') - 0.05, { notes: ['C4', 'Eb4', 'G4'], bass: false, mute: true, hideName: false, label: 'Cm' });
    a.ring(['C', 'Eb', 'G'], tCh, a.at('why4b') - 0.1, { color: PINK });
    bell('C4', f0 + 0.2, 0.26, { dur: 2, lit: 1.5 });
    bell('C4', tCh, 0.28, { dur: 2, lit: 1.5 });
    const tB = a.at('why4b');
    a.scale(tB - 0.1, 'E', a.T.MAJOR);
    quarter(tB + 0.1, Math.min(1.05, (f1 - tB - 1.4) / 4), { t1: f1, label: 'MAJOR TUNE' });
    a.tag(4, a.w('why4b', 'major'), f1, 'MINOR CHORDS INSIDE', { x: 540, y: 462, color: PINK });

    // ---- why5: shaving metal - the tierce slides into tune ----
    const v0 = S('why5').t0, v1 = S('why5').t1;
    const gt = a.grid(BP.map(([l, n, , c]) => ({ label: l, sub: n.replace(/\d/, ''), color: c, size: 34, subSize: 36 })), v0 + 0.1, v1,
      { rows: 1, cols: 5, cw: 196, chh: 220, y: 560, caption: 'EACH PARTIAL TUNED' });
    const tSh = a.w('why5', 'shaving') - 0.05;
    const OFF = [-0.35, 0.3, -0.45, 0.4, -0.25];
    // before: out of tune; then each partial pulled into place one after another
    bell('C4', v0 + 0.2, 0.24, { dur: 1.6, lit: false, detune: [...OFF, 0, 0] });
    [0, 1, 2, 3, 4].forEach(i => gt.active.push({ t0: tSh + i * 0.35, t1: tSh + i * 0.35 + 0.35, i }));
    const tTuned = tSh + 5 * 0.35 + 0.15;
    bell('C4', tTuned, 0.28, { dur: 2.5, lit: 1.6 });
    gt.active.push({ t0: tTuned, t1: v1, i: 2 });
    a.big('SHAVE METAL', tSh, v1, { y: 920, size: 64, color: GOLD });
    a.big('FROM INSIDE THE BELL', tSh + 0.2, v1, { y: 1010, size: 40, ...MONO, color: '#ffffff', blur: 0 });
    a.big('OUT OF TUNE', v0 + 0.3, tSh - 0.05, { y: 920, size: 52, ...MONO, color: GREY, blur: 0 });

    // ---- why6: piano chord vs bell - partials slightly off the piano's notes ----
    const s0 = S('why6').t0, s1 = S('why6').t1;
    a.scale(s0, 'C', a.T.MINOR);
    const tPi = a.w('why6', 'piano') - 0.05, tShim = a.w('why6', 'shimmer') - 0.05;
    a.ch('Cm', tPi, tShim, { notes: ['C3', 'C4', 'Eb4', 'G4', 'C5'], bass: false, vel: 0.55, label: 'PIANO' });
    a.ch('Cm', tShim, s1, { notes: ['C3', 'C4', 'Eb4', 'G4'], bass: false, mute: true, label: 'BELL' });
    bell('C4', s0 + 0.2, 0.26, { dur: 2, lit: 1.2, detune: [0.12, 0, -0.1, 0.14, -0.08] });
    bell('C4', tShim, 0.3, { dur: 3, lit: 2, detune: [0.12, 0, -0.1, 0.14, -0.08], slow: 0.6 });
    a.ghost('Cm', tShim, s1, { color: TEAL });
    a.tag('Eb', tShim, s1, 'NEVER EXACT', { color: TEAL, dr: -92 });

    // ---- essence: the quarter one last time, ending on a long low bell ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'E', a.T.MAJOR);
    const eEnd = quarter(e0 + 0.15, Math.min(1.1, (a.at('cta') - e0 - 0.3) / 4), { t1: e1, label: 'BITTERSWEET' });
    bell('E3', eEnd + 0.3, 0.3, { dur: 4, lit: 2.5, slow: 0.5 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
