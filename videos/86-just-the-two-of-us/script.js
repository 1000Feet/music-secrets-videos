// The "Just the Two of Us" progression: Dbmaj7 - C7 - Fm7 (- Ebm7 Ab7), a loop that never quite lands.
// Brief/copyright: chords only, with a generic soft groove. No melody, no lyrics.
module.exports = {
  slug: 'just-the-two-of-us',
  title: 'The Just the Two of Us Progression',
  segments: [
    { id: 'hook',    text: 'One loop sounds smooth forever, because it never quite lands.' },
    { id: 'what',    text: "That's Just the Two of Us, Grover Washington Junior featuring Bill Withers, 1981." },
    { id: 'what2',   text: 'D flat major seven, C seven, F minor seven... then E flat minor seven, A flat seven.' },
    { id: 'japan',   text: "In Japan, it's called the Marusa progression, after Sheena Ringo's Marunouchi Sadistic, from 1999." },
    { id: 'japan2',  text: "And it's all over J-pop." },
    { id: 'why1',    text: "So why is it so smooth? C seven doesn't belong to the key." },
    { id: 'why2',    text: 'It contains E natural, a half step below F.' },
    { id: 'why3',    text: "It's a secondary dominant, the five of F minor, so it pulls hard into F minor." },
    { id: 'why4',    text: 'Now the bass: D flat falls a half step to C, then leaps to F. Smooth, then decisive.' },
    { id: 'why5',    text: 'Major seven and minor seven chords sound soft and jazzy, with no harsh edges.' },
    { id: 'why6',    text: 'And E flat minor seven to A flat seven is a little two five, pointing back to D flat.' },
    { id: 'why6b',   text: 'So the loop restarts before it can settle. An endless spiral.' },
    { id: 'essence', text: "One borrowed note, and a loop that never quite lands. That's why it feels smooth forever." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'A LOOP THAT NEVER LANDS', title: 'JUST THE TWO OF US', accent: true, tonic: 5, row: ['Dbma7', 'C7', 'Fm7', 'Ebm7', 'Ab7'], min: 5.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'YOU HEAR IT IN', title: 'Just the Two of Us', sub: 'Grover Washington Jr. ft. Bill Withers · 1981', tonic: 5, row: ['Dbma7', 'C7', 'Fm7', 'Ebm7', 'Ab7'], gap: 0.3, tail: 1.2 },
    { id: 'japan', segs: ['japan', 'japan2'], label: 'IN JAPAN', title: 'THE MARUSA PROGRESSION', circle: false, tonic: 5, gap: 0.3, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'OUTSIDE THE KEY', tonic: 5, tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'E NATURAL', tonic: 5, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'A SECONDARY DOMINANT', title: 'C7 PULLS TO Fm', tonic: 5, tail: 0.8 },
    { id: 'why4', segs: ['why4'], label: 'THE BASS LINE', title: 'Db – C – F', tonic: 5, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'SEVENTH CHORDS', title: 'SOFT AND JAZZY', tonic: 5, tail: 0.8 },
    { id: 'why6', segs: ['why6', 'why6b'], label: 'A LITTLE ii – V', title: 'BACK TO THE START', tonic: 5, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SMOOTH FOREVER', accent: true, tonic: 5, row: ['Dbma7', 'C7', 'Fm7', 'Ebm7', 'Ab7'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', BLUE = '#62a8ff', PINK = '#ff7a93', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const FMIN = a.T.MINOR;
    const V = {
      Dbmaj7: [['Ab3', 'C4', 'Db4', 'F4'], 'Db2'], C7: [['G3', 'Bb3', 'C4', 'E4'], 'C2'], Fm7: [['Ab3', 'C4', 'Eb4', 'F4'], 'F2'],
      Ebm7: [['Gb3', 'Bb3', 'Db4', 'Eb4'], 'Eb2'], Ab7: [['Gb3', 'C4', 'Eb4', 'Ab4'], 'Ab2'],
    };
    const ROW = { Dbmaj7: 0, C7: 1, Fm7: 2, Ebm7: 3, Ab7: 4 };
    const chd = (c, t0, t1, o = {}) => a.ch(c, t0, t1, { notes: V[c][0], bass: V[c][1], ...o });
    // soft groove strikes: on 1, the "and" of 2, and 4 within a chord of length len (one bar = 4 beats)
    const comp = (len, beats) => {
      const b = len / beats, out = [{ o: 0, v: 1 }];
      for (let k = 1; k < beats; k++) out.push({ o: k * b + (k % 2 ? b * 0.5 : 0), v: 0.5 });
      return out.filter(s => s.o < len - 0.05);
    };
    // the loop: Dbmaj7 | C7 | Fm7 | Ebm7 Ab7, fitted between t0 and t1 (n cycles)
    const LOOP = [['Dbmaj7', 1], ['C7', 1], ['Fm7', 1], ['Ebm7', 0.5], ['Ab7', 0.5]];
    function loop(t0, t1, o = {}) {
      const cycles = o.cycles ?? 1, bar = (t1 - t0) / (4 * cycles);
      let t = t0;
      for (let c = 0; c < cycles; c++) for (const [name, w] of LOOP) {
        const len = bar * w;
        chd(name, t, t + len, { row: o.rows === false ? null : ROW[name], vel: o.vel ?? 0.7, strikes: comp(len, 4 * w), shape: o.shape, hideName: o.hideName });
        t += len;
      }
      if (o.drums !== false) for (let x = t0, i = 0; x < t1 - 0.05; x += bar / 4, i++) {
        const k = i % 4;
        if (k === 0) a.perc('kick', x, 0.5 * (o.dv ?? 1));
        if (k === 1 || k === 3) a.perc('snare', x, 0.32 * (o.dv ?? 1));
        a.perc('hat', x, 0.18 * (o.dv ?? 1)); a.perc('hat', x + bar / 8, 0.12 * (o.dv ?? 1));
        if (k === 2) a.perc('kick', x + bar / 8, 0.35 * (o.dv ?? 1));
      }
      return bar;
    }
    const dbTag = (t0, t1) => a.tag('C#', t0, t1, 'Db', { dr: 98, color: GREY });

    // ---- hook: F minor pops in, the loop plays (cover) ----
    const h1 = S('hook').t1;
    a.scale(0.15, 'F', FMIN, { popIn: { t0: 0.2, step: 0.07 } });
    loop(0.3, h1, { vel: 0.6, dv: 0.7 });
    dbTag(0.4, h1);

    // ---- what: the song, then the chords on their spoken names ----
    const w0 = S('what').t0, w1 = S('what').t1, w2 = a.at('what2') - 0.05;
    loop(w0 + 0.05, w2, { vel: 0.5, dv: 0.6 });
    const tw = [a.w('what2', 'D'), a.w('what2', 'C'), a.w('what2', 'F'), a.w('what2', 'E'), a.w('what2', 'A')].map(t => t - 0.05);
    const NAMES = ['Dbmaj7', 'C7', 'Fm7', 'Ebm7', 'Ab7'];
    NAMES.forEach((c, i) => chd(c, tw[i], i < 4 ? tw[i + 1] : w1 - 0.9, { row: i, vel: 0.75 }));
    chd('Dbmaj7', w1 - 0.9, w1, { row: 0, vel: 0.65 });
    dbTag(w0, w1);

    // ---- japan: the Marusa progression ----
    const j0 = S('japan').t0, j1 = S('japan').t1;
    a.big('Dbmaj7 – C7 – Fm7', j0 + 0.2, a.w('japan', 'Marusa') - 0.05, { y: 620, size: 52, ...MONO, color: '#ffffff', blur: 10 });
    a.big('MARUSA', a.w('japan', 'Marusa') - 0.05, j1, { y: 600, size: 110, color: GOLD, blur: 30 });
    a.big('MARUNOUCHI SADISTIC', a.w('japan', 'Marunouchi') - 0.05, j1, { y: 740, size: 52, color: '#ffffff', blur: 10 });
    a.big('SHEENA RINGO · 1999', a.w('japan', 'Marunouchi') + 0.2, j1, { y: 815, size: 36, ...MONO, color: GREY, blur: 0 });
    a.big('ALL OVER J-POP', a.w('japan2', 'all') - 0.05, j1, { y: 960, size: 56, ...MONO, color: PINK, blur: 14 });
    loop(j0 + 0.05, j1 - 0.05, { vel: 0.5, rows: false, shape: false, dv: 0.6, cycles: 2 });

    // ---- why1: C7 is outside F minor ----
    const a0 = S('why1').t0, a1 = S('why1').t1;
    a.scale(a0, 'F', FMIN);
    const tC = a.w('why1', 'C') - 0.05;
    chd('Fm7', a0 + 0.1, tC, { vel: 0.5 });
    chd('C7', tC, a1 + 0.6, { vel: 0.75 });
    a.ring(['E'], a.w('why1', 'belong') - 0.05, S('why2').t1, { color: RED });
    a.tag(0, a.w('why1', 'belong') - 0.05, a1, 'NOT IN F MINOR', { x: 540, y: 462, color: RED });

    // ---- why2: E natural, a half step below F ----
    const b0 = S('why2').t0, b1 = S('why2').t1;
    chd('C7', a1 + 0.6, b1, { vel: 0.5, strikes: [{ o: 0, v: 0.6 }] });
    a.tag('E', a.w('why2', 'E') - 0.05, b1, 'E NATURAL', { dr: -92, color: RED });
    a.note('E4', a.w('why2', 'E') - 0.05, 0.8, { vel: 0.36 });
    const tHalf = a.w('why2', 'half') - 0.05;
    a.arc('E', 'F', tHalf, b1, { steps: 1, color: TEAL, dr: 30, label: 'HALF STEP', labelR: 360 });
    a.note('F4', a.w('why2', 'F') - 0.05, 0.9, { vel: 0.36 });

    // ---- why3: C7 = V of F minor, pulls into Fm ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    const tFm = a.w('why3', 'F', 1) - 0.05;
    chd('C7', c0 + 0.1, tFm, { vel: 0.7, strikes: [{ o: 0, v: 1 }, { o: a.w('why3', 'five') - c0 - 0.15, v: 0.8 }] });
    a.big('V7 OF F MINOR', a.w('why3', 'five') - 0.05, c1, { y: 462, size: 44, ...MONO, color: GOLD });
    a.line('C', 'F', a.w('why3', 'pulls') - 0.05, c1, { color: GOLD, arrow: true, r: 230 });
    chd('Fm7', tFm, c1, { vel: 0.8 });
    a.ring(['E'], c0, tFm, { color: RED });
    a.arc('E', 'F', tFm, c1, { steps: 1, color: TEAL, dr: 30 });
    a.tag('F', tFm + 0.1, c1, 'HOME', { dr: -92, color: TEAL });

    // ---- why4: bass Db -> C (half step) -> F (leap) ----
    const d0 = S('why4').t0, d1 = S('why4').t1;
    const tDb = a.w('why4', 'D') - 0.05, tCb = a.w('why4', 'C') - 0.05, tFb = a.w('why4', 'F') - 0.05;
    chd('Fm7', d0 + 0.1, tDb, { vel: 0.4 });
    chd('Dbmaj7', tDb, tCb, { vel: 0.6 });
    chd('C7', tCb, tFb, { vel: 0.6 });
    chd('Fm7', tFb, d1, { vel: 0.7 });
    [[tDb, 'Db2'], [tCb, 'C2'], [tFb, 'F2']].forEach(([t, n]) => a.note(n, t, 0.9, { vel: 0.4, show: false }));
    a.walker([[tDb, 'Db'], [tCb, 'C'], [tFb, 'F']], { t1: d1, dr: 34, color: GOLD, label: 'BASS', labelDr: 82 });
    a.arc('Db', 'C', tCb, d1, { steps: -1, color: TEAL, dr: 30, label: 'HALF STEP', labelR: 165 });
    a.arc('C', 'F', tFb, d1, { steps: 5, color: PINK, dr: 30, label: 'LEAP', labelR: 165 });
    a.big('SMOOTH', a.w('why4', 'Smooth') - 0.05, a.w('why4', 'decisive') - 0.05, { y: 462, size: 48, ...MONO, color: TEAL });
    a.big('DECISIVE', a.w('why4', 'decisive') - 0.05, d1, { y: 462, size: 48, ...MONO, color: PINK });
    dbTag(tDb, d1);

    // ---- why5: maj7 and m7 - soft and jazzy ----
    const e0 = S('why5').t0, e1 = S('why5').t1;
    const tMaj = a.w('why5', 'Major') - 0.05, tMin = a.w('why5', 'minor') - 0.05, tSoft = a.w('why5', 'soft') - 0.05;
    chd('Dbmaj7', tMaj, tMin, { vel: 0.7 });
    chd('Fm7', tMin, tSoft, { vel: 0.7 });
    const el = (e1 - tSoft) / 2;
    chd('Dbmaj7', tSoft, tSoft + el, { vel: 0.6, strikes: comp(el, 4) });
    chd('Fm7', tSoft + el, e1, { vel: 0.6, strikes: comp(el, 4) });
    a.big('MAJOR SEVENTH', tMaj, tMin, { y: 462, size: 44, ...MONO, color: GOLD });
    a.big('MINOR SEVENTH', tMin, tSoft, { y: 462, size: 44, ...MONO, color: BLUE });
    a.big('SOFT · JAZZY', tSoft, a.w('why5', 'harsh') - 0.05, { y: 462, size: 48, ...MONO, color: GOLD });
    a.big('NO HARSH EDGES', a.w('why5', 'harsh') - 0.05, e1, { y: 462, size: 48, ...MONO, color: TEAL });
    dbTag(tMaj, tMin);

    // ---- why6: Ebm7 - Ab7 points back to Dbmaj7, and the loop restarts ----
    const f0 = S('why6').t0, f1 = S('why6').t1;
    const tEb = a.w('why6', 'E') - 0.05, tAb = a.w('why6', 'A') - 0.05, tBack = a.w('why6', 'D') - 0.05;
    chd('Fm7', f0 + 0.1, tEb, { row: null, vel: 0.4 });
    chd('Ebm7', tEb, tAb, { row: 0, vel: 0.7 });
    chd('Ab7', tAb, tBack, { row: 1, vel: 0.75 });
    a.line('Eb', 'Ab', tAb, tBack + 0.6, { color: GOLD, arrow: true, r: 230 });
    a.line('Ab', 'Db', tBack - 0.1, a.at('why6b'), { color: GOLD, arrow: true, r: 230 });
    chd('Dbmaj7', tBack, a.at('why6b') - 0.05, { row: 2, vel: 0.8 });
    a.big('ii – V  →  Db', a.w('why6', 'two') - 0.05, a.at('why6b') - 0.05, { y: 462, size: 48, ...MONO, color: GOLD });
    dbTag(tBack, a.at('why6b'));
    // why6b: the loop starts over before Fm can settle - the roots go round and round
    const g0 = a.at('why6b') - 0.05;
    const bar = loop(g0, f1, { rows: false, vel: 0.6, dv: 0.6, hideName: false });
    const roots = [];
    let t = g0;
    for (const [n, w] of LOOP) { roots.push([t, { Dbmaj7: 'Db', C7: 'C', Fm7: 'F', Ebm7: 'Eb', Ab7: 'Ab' }[n]]); t += bar * w; }
    roots.push([t - 0.05, 'Db']);
    a.walker(roots, { t1: f1, dr: 34, color: GOLD, label: 'ROOT', labelDr: 82 });
    a.big('AN ENDLESS SPIRAL', a.w('why6b', 'endless') - 0.05, f1, { y: 462, size: 48, ...MONO, color: GOLD });

    // ---- essence: the loop, the borrowed E marked, never landing ----
    const s0 = S('essence').t0 + 0.1, s1 = S('essence').t1, sL = a.at('cta') + 0.4;
    a.scale(S('essence').t0, 'F', FMIN);
    loop(s0, sL, { vel: 0.7, dv: 0.8 });
    chd('Dbmaj7', sL, s1 - 0.3, { row: 0, notes: ['Ab3', 'C4', 'Db4', 'F4', 'Ab4'], vel: 0.7 });
    a.ring(['E'], a.w('essence', 'borrowed') - 0.05, s1, { color: RED });
    a.tag('E', a.w('essence', 'borrowed') - 0.05, s1, 'BORROWED', { dr: -92, color: RED });
    dbTag(s0, s1);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
