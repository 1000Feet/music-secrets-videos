// The two wedding marches: Wagner's Bridal Chorus to walk in, Mendelssohn's Wedding March to walk out.
// Brief/copyright: only the Bridal Chorus' first four notes are played (F Bb Bb Bb, in B flat);
// everything else is chords: slow generic 4/4 chords in B flat, and C major chords struck in a
// generic triplet fanfare rhythm (no melody from either piece).
const SB = 0.7;  // slow beat (walking in)
const FB = 0.42; // fast beat (walking out)
const SLOW = { Bb: [['D3', 'F3', 'Bb3'], 'Bb2'], Eb: [['Eb3', 'G3', 'Bb3'], 'Eb2'], F: [['C3', 'F3', 'A3'], 'F2'], F7: [['C3', 'Eb3', 'A3'], 'F2'],
  Bbm: [['Db3', 'F3', 'Bb3'], 'Bb2'], Gb: [['Db3', 'Gb3', 'Bb3'], 'Gb2'], Gm: [['D3', 'G3', 'Bb3'], 'G2'] };
const FAST = { C: [['E4', 'G4', 'C5'], 'C3'], F: [['F4', 'A4', 'C5'], 'F2'], G7: [['F4', 'G4', 'B4'], 'G2'], G: [['D4', 'G4', 'B4'], 'G2'] };

module.exports = {
  slug: 'wedding-marches',
  title: 'The Two Wedding Marches',
  segments: [
    { id: 'hook',    text: 'One march to walk in, another to walk out.' },
    { id: 'in',      text: 'Walking in, Here Comes the Bride...' },
    { id: 'in2',     text: "the Bridal Chorus from Wagner's opera Lohengrin, 1850." },
    { id: 'irony',   text: 'In the opera, the marriage quickly goes wrong.' },
    { id: 'out',     text: "Walking out, Mendelssohn's Wedding March..." },
    { id: 'out2',    text: "from his music for A Midsummer Night's Dream, 1842." },
    { id: 'royal',   text: 'Both were played at a royal wedding in 1858...' },
    { id: 'royalb',  text: 'and a tradition was born.' },
    { id: 'royal2',  text: "Queen Victoria's daughter Victoria married..." },
    { id: 'royal2b', text: 'Prince Frederick William of Prussia.' },
    { id: 'why0',    text: 'So why do they work?' },
    { id: 'why1',    text: 'The Bridal Chorus is slow and steady, in four four.' },
    { id: 'why1b',   text: 'It opens with a rising perfect fourth. Calm and solemn.' },
    { id: 'why2',    text: 'A rising fourth sounds like a call, an announcement...' },
    { id: 'why2b',   text: 'here comes the bride!' },
    { id: 'why3',    text: "Mendelssohn's march opens with a bright trumpet fanfare..." },
    { id: 'why3c',   text: 'of triplets, in C major.' },
    { id: 'why3b',   text: 'Fast and festive.' },
    { id: 'why4',    text: 'Slow and solemn going in, bright and fast coming out...' },
    { id: 'why4b',   text: 'the music tells the story of the ceremony.' },
    { id: 'essence', text: 'A calm fourth to walk in... a trumpet fanfare to walk out.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'WAGNER · MENDELSSOHN', title: 'THE WEDDING MARCHES', accent: true, circle: false, tonic: 10, min: 6.4 },
    { id: 'in', segs: ['in', 'in2'], label: 'WALKING IN', title: 'HERE COMES THE BRIDE', sub: 'Wagner · Lohengrin · 1850 · in Bb', tonic: 10, gap: 0.25, tail: 0.6 },
    { id: 'irony', segs: ['irony'], label: 'IN THE OPERA', title: 'IT GOES WRONG', circle: false, tonic: 10, tail: 1.0 },
    { id: 'out', segs: ['out', 'out2'], label: 'WALKING OUT', title: 'WEDDING MARCH', sub: 'Mendelssohn · 1842 · in C', tonic: 0, gap: 0.25, tail: 1.0 },
    { id: 'royal', segs: ['royal', 'royalb', 'royal2', 'royal2b'], label: 'A ROYAL WEDDING', title: '1858', circle: false, tonic: 10, gap: 0.3, tail: 0.7 },
    { id: 'why1', segs: ['why0', 'why1'], label: 'WALKING IN', title: 'SLOW AND STEADY', circle: false, tonic: 10, gap: 0.3, tail: 0.8 },
    { id: 'why1b', segs: ['why1b', 'why2', 'why2b'], label: 'WALKING IN', title: 'A RISING FOURTH', tonic: 10, gap: 0.35, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3c', 'why3b'], label: 'WALKING OUT', title: 'A TRIPLET FANFARE', circle: false, tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'IN AND OUT', title: 'THE CEREMONY', circle: false, tonic: 10, gap: 0.2, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'IN, THEN OUT', accent: true, tonic: 10, gap: 0.6, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', GREY = '#8a8a92', PINK = '#ff7a93', WHITE = '#ffffff', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const BRASS = { partials: [1, 0.8, 0.65, 0.5, 0.38, 0.27, 0.18, 0.1], attack: 0.025, release: 0.12 };

    // the only melody allowed: the Bridal Chorus' first four notes, F Bb Bb Bb (rising fourth, then repeats)
    function bride(t0, b = SB, o = {}) {
      const R = [['F4', 0, 1], ['Bb4', 1, 0.75], ['Bb4', 1.75, 0.25], ['Bb4', 2, 2]];
      const ts = R.map(([n, u, d]) => { a.note(n, t0 + u * b, d * b * 0.95, { vel: o.vel ?? 0.4 }); return t0 + u * b; });
      a.ch('Bb', t0 + b, t0 + 4 * b, { notes: SLOW.Bb[0], bass: SLOW.Bb[1], vel: (o.vel ?? 0.4) * 1.2, hideName: o.hideName, shape: o.shape,
        strikes: [{ o: 0, v: 1 }, { o: b, v: 0.4 }, { o: 2 * b, v: 0.4 }] });
      a.note('F2', t0, b, { vel: 0.18, show: false });
      return { ts, end: t0 + 4 * b };
    }
    // slow, steady 4/4 chords (one per bar, a soft strike on every beat)
    function slow(t0, t1, prog, o = {}) {
      const b = o.beat ?? SB;
      for (let i = 0, t = t0; t < t1 - 0.2; t += 4 * b, i++) {
        const c = prog[i % prog.length], [n, bs] = SLOW[c], end = Math.min(t + 4 * b, t1);
        a.ch(c, t, end, { notes: n, bass: bs, vel: o.vel ?? 0.45, hideName: o.hideName, shape: o.shape,
          strikes: [0, 1, 2, 3].filter(k => t + k * b < end - 0.1).map(k => ({ o: k * b, v: k ? 0.45 : 1 })) });
        if (o.grid) [0, 1, 2, 3].forEach(k => { if (t + k * b < end - 0.05) o.grid.active.push({ t0: t + k * b, t1: t + (k + 0.9) * b, i: k }); });
      }
    }
    // C major chords struck in a triplet fanfare rhythm: ta-ta-ta TAA, twice (generic rhythm, chords only)
    function fanfare(t0, b = FB, o = {}) {
      const hits = [];
      [0, 2].forEach(g => {
        [0, 1, 2].forEach(k => hits.push([t0 + g * b + k * b / 3, b / 3 * 0.75, 0.75, k]));
        hits.push([t0 + (g + 1) * b, b * 0.9, 1, 3]);
      });
      const [n, bs] = FAST.C;
      a.ch('C', t0, t0 + 4 * b, { notes: n, bass: false, mute: true, hideName: o.hideName, shape: o.shape });
      hits.forEach(([t, d, v, k]) => {
        ['C4', 'E4', 'G4', 'C5'].forEach((m, j) => a.note(m, t + j * 0.006, d, { vel: (o.vel ?? 0.13) * v, tone: BRASS }));
        a.perc(k === 3 ? 'kick' : 'snare', t, k === 3 ? 0.6 : 0.25);
        if (o.grid) o.grid.active.push({ t0: t, t1: t + Math.max(d, 0.12), i: k });
      });
      a.note(bs, t0 + b, 2 * b, { vel: 0.25, show: false });
      return t0 + 4 * b;
    }
    // fast, festive march chords in C (oom-pah)
    function fast(t0, t1, prog, o = {}) {
      const b = o.beat ?? FB;
      for (let i = 0, t = t0; t < t1 - 0.2; t += 2 * b, i++) {
        const c = prog[i % prog.length], [n, bs] = FAST[c], end = Math.min(t + 2 * b, t1);
        a.ch(c, t, end, { notes: n, bass: false, vel: o.vel ?? 0.45, hideName: o.hideName, shape: o.shape, strikes: [{ o: b / 2, v: 0.8 }, { o: 1.5 * b, v: 0.7 }].filter(s => t + s.o < end - 0.05) });
        a.note(bs, t, b * 0.8, { vel: 0.3, show: false }); if (t + b < end - 0.05) a.note(bs, t + b, b * 0.8, { vel: 0.24, show: false });
        a.perc('kick', t, 0.35); a.perc('hat', t + b / 2, 0.25);
      }
    }
    const inOut = (t0, t1, subs, o = {}) => a.grid([{ label: 'IN', sub: subs[0], size: 84, subSize: 22, color: TEAL }, { label: 'OUT', sub: subs[1], size: 84, subSize: 22, color: GOLD }],
      t0, t1, { rows: 1, cols: 2, cw: 440, chh: 300, y: o.y ?? 560, revealStep: 0.2 });

    // ---- hook (cover): two cards, IN with the four notes, OUT with the fanfare ----
    const h1 = S('hook').t1;
    const gH = inOut(0.15, h1, ['HERE COMES THE BRIDE', 'WEDDING MARCH'], { y: 520 });
    const hb = bride(0.3, 0.5, { vel: 0.42, shape: false });
    const tOut = hb.end + 0.05;
    gH.active.push({ t0: 0.3, t1: tOut, i: 0 });
    const hf = fanfare(tOut, FB, { vel: 0.14, shape: false });
    a.ch('C', hf, h1 - 0.1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.55, shape: false });
    gH.active.push({ t0: tOut, t1: h1, i: 1 });
    a.big('A RISING FOURTH', 0.3, tOut, { y: 940, size: 46, ...MONO, color: TEAL, blur: 10 });
    a.big('A TRIPLET FANFARE', tOut, h1, { y: 940, size: 46, ...MONO, color: GOLD, blur: 10 });

    // ---- in: Here Comes the Bride, B flat ----
    const i0 = S('in').t0, i1 = S('in').t1;
    a.scale(i0, 'Bb', a.T.MAJOR);
    const ib = bride(a.w('in', 'Here') - 0.05, SB, { vel: 0.4 });
    slow(ib.end, i1, ['Eb', 'F7', 'Bb'], { vel: 0.4 });
    a.tag('Bb', a.w('in', 'Bride') , i1, 'HOME', { dr: -92, color: TEAL });
    a.big('BRIDAL CHORUS', a.w('in2', 'Bridal') - 0.05, i1, { y: 462, size: 48, ...MONO, color: TEAL, blur: 10 });

    // ---- irony: the marriage goes wrong (the chords turn dark) ----
    const r0 = S('irony').t0, r1 = S('irony').t1;
    const tWr = a.w('irony', 'wrong') - 0.05;
    slow(r0 + 0.1, tWr, ['Bb'], { vel: 0.35, shape: false, beat: (tWr - r0 - 0.1) / 4 });
    slow(tWr, r1, ['Bbm', 'Gb'], { vel: 0.45, shape: false, beat: (r1 - tWr) / 8 });
    a.big('THE MARRIAGE', a.w('irony', 'marriage') - 0.05, r1, { y: 660, size: 84, color: WHITE, blur: 16 });
    a.big('QUICKLY GOES WRONG', tWr, r1, { y: 780, size: 56, color: RED, blur: 20 });
    a.big('LOHENGRIN · 1850', r0 + 0.2, r1, { y: 940, size: 40, ...MONO, color: GREY, blur: 0 });

    // ---- out: Mendelssohn's Wedding March, C major ----
    const o0 = S('out').t0, o1 = S('out').t1;
    a.scale(o0, 'C', a.T.MAJOR);
    const of = fanfare(a.w('out', "Mendelssohn's") - 0.05, FB, { vel: 0.13 });
    fast(of, o1, ['C', 'F', 'G7', 'C'], { vel: 0.45 });
    a.tag('C', a.w('out', 'Wedding'), o1, 'HOME', { dr: -92, color: GOLD });
    a.big("A MIDSUMMER NIGHT'S DREAM", a.w('out2', 'Midsummer') - 0.05, o1, { y: 462, size: 36, ...MONO, color: GOLD, blur: 8 });

    // ---- royal: 1858 ----
    const y0 = S('royal').t0, y1 = S('royal').t1;
    const tV = a.w('royal2', 'Queen') - 0.05, tP = a.w('royal2b', 'Prince') - 0.05;
    const gR = inOut(y0 + 0.1, tV - 0.1, ['WAGNER', 'MENDELSSOHN'], { y: 520 });
    gR.active.push({ t0: a.w('royal', 'Both') - 0.05, t1: tV, i: 0 }, { t0: a.w('royal', 'Both') + 0.3, t1: tV, i: 1 });
    a.big('A TRADITION', a.w('royalb', 'tradition') - 0.05, tV - 0.1, { y: 940, size: 72, color: GOLD, blur: 20 });
    const gC = a.grid([{ label: 'VICTORIA', sub: "QUEEN VICTORIA'S DAUGHTER", size: 60, subSize: 22, color: PINK }, { label: 'FREDERICK', sub: 'WILLIAM · OF PRUSSIA', size: 60, subSize: 22, color: BLUE }],
      tV, y1, { rows: 1, cols: 2, cw: 460, chh: 260, y: 520, revealStep: 0.3 });
    gC.active.push({ t0: tV, t1: tP, i: 0 }, { t0: tP, t1: y1, i: 1 });
    a.big('MARRIED · 1858', a.w('royal2', 'married') - 0.05, y1, { y: 940, size: 56, color: GOLD, blur: 16 });
    slow(y0 + 0.1, a.w('royalb', 'tradition') - 0.05, ['Bb', 'F'], { vel: 0.3, shape: false, beat: 0.5 });
    fast(a.w('royalb', 'tradition') - 0.05, y1, ['C', 'F', 'G', 'C'], { vel: 0.3, shape: false });

    // ---- why1: slow and steady 4/4 ----
    const s0 = S('why1').t0, s1 = S('why1').t1;
    const g4 = a.grid([1, 2, 3, 4].map((n, i) => ({ label: String(n), color: i ? TEAL : GOLD, size: i ? 70 : 90 })), s0 + 0.1, s1, { rows: 1, cols: 4, cw: 210, chh: 220, y: 560, revealStep: 0.1, caption: 'ONE BAR OF 4/4' });
    const tSl = a.w('why1', 'slow') - 0.05;
    slow(tSl, s1, ['Bb', 'Eb', 'F', 'Bb'], { vel: 0.45, shape: false, grid: g4 });
    a.big('4/4', a.w('why1', 'four') - 0.05, s1, { y: 960, size: 140, color: TEAL, blur: 28 });
    a.big('SLOW · STEADY', tSl, a.w('why1', 'four') - 0.05, { y: 960, size: 60, ...MONO, color: TEAL, blur: 12 });

    // ---- why1b + why2: the rising perfect fourth, F up to B flat - a call ----
    const f0 = S('why1b').t0, f1 = S('why1b').t1;
    a.scale(f0, 'Bb', a.T.MAJOR);
    const tR = a.w('why1b', 'rising') - 0.05;
    const fb = bride(tR, 0.55, { vel: 0.42 });
    a.arc('F', 'Bb', fb.ts[1], a.at('why2'), { steps: 5, color: TEAL, dr: 30, label: 'PERFECT 4TH', labelR: 165 });
    a.big('CALM · SOLEMN', a.w('why1b', 'Calm') - 0.05, a.at('why2'), { y: 462, size: 48, ...MONO, color: TEAL, blur: 10 });
    slow(fb.end, a.at('why2'), ['Bb'], { vel: 0.3, beat: 0.6 });
    const tCall = a.w('why2', 'call') - 0.05, tBr = a.w('why2b', 'here') - 0.05;
    a.ch('Bb', a.at('why2'), tBr, { notes: SLOW.Bb[0], bass: SLOW.Bb[1], vel: 0.3 });
    [0, 1].forEach(k => { a.note('F4', tCall + k * 0.7, 0.3, { vel: 0.34 }); a.note('Bb4', tCall + k * 0.7 + 0.3, 0.35, { vel: 0.36 }); });
    a.arc('F', 'Bb', tCall, f1, { steps: 5, color: GOLD, dr: 30, label: 'A CALL', labelR: 165 });
    a.big('AN ANNOUNCEMENT', a.w('why2', 'announcement') - 0.05, f1, { y: 462, size: 48, ...MONO, color: GOLD, blur: 10 });
    const fb2 = bride(tBr, 0.5, { vel: 0.42 });
    a.ch('Bb', fb2.end, f1 - 0.1, { notes: ['D4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.4 });

    // ---- why3: the triplet fanfare in C major, fast and festive ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    const gT = a.grid([{ label: 'ta', sub: 'TRIPLET', size: 56, color: GOLD }, { label: 'ta', sub: 'TRIPLET', size: 56, color: GOLD }, { label: 'ta', sub: 'TRIPLET', size: 56, color: GOLD }, { label: 'TAA', sub: 'LONG', size: 60, color: RED }],
      c0 + 0.1, c1, { rows: 1, cols: 4, cw: 220, chh: 230, y: 540, revealStep: 0.1 });
    const tFan = a.w('why3', 'fanfare') - 0.05, tC = a.w('why3c', 'C') - 0.05;
    const e1 = fanfare(tFan, 0.5, { vel: 0.14, shape: false, grid: gT });
    a.big('BRIGHT TRUMPETS', a.w('why3', 'bright') - 0.05, tC, { y: 920, size: 54, color: GOLD, blur: 16 });
    a.big('C MAJOR', tC, a.at('why3b'), { y: 920, size: 90, color: GOLD, blur: 24 });
    a.big('FAST · FESTIVE', a.at('why3b'), c1, { y: 920, size: 64, ...MONO, color: RED, blur: 16 });
    const e2 = fanfare(Math.max(e1, a.at('why3b') - 0.1), FB, { vel: 0.14, shape: false, grid: gT });
    fast(e2, c1, ['C', 'F', 'G7', 'C'], { vel: 0.45, shape: false });

    // ---- why4: slow and solemn in, bright and fast out ----
    const d0 = S('why4').t0, d1 = S('why4').t1;
    const tO = a.w('why4', 'bright') - 0.05;
    const gS = inOut(d0 + 0.1, d1, ['SLOW · SOLEMN', 'BRIGHT · FAST'], { y: 520 });
    gS.active.push({ t0: a.at('why4'), t1: tO, i: 0 }, { t0: tO, t1: a.at('why4b'), i: 1 });
    [0, 1].forEach(i => gS.active.push({ t0: a.at('why4b'), t1: d1, i }));
    slow(d0 + 0.1, tO, ['Bb', 'Eb'], { vel: 0.4, shape: false, beat: Math.min(SB, (tO - d0 - 0.1) / 4) });
    const df = fanfare(tO, FB, { vel: 0.13, shape: false });
    fast(df, d1, ['C', 'F', 'G7', 'C'], { vel: 0.4, shape: false });
    a.big('THE STORY OF THE CEREMONY', a.w('why4b', 'story') - 0.05, d1, { y: 920, size: 42, ...MONO, color: WHITE, blur: 8 });

    // ---- essence: the fourth in B flat, then the scale turns to C and the fanfare plays ----
    const n0 = S('essence').t0, n1 = S('essence').t1;
    a.scale(n0, 'Bb', a.T.MAJOR);
    const tTr = a.w('essence', 'trumpet') - 0.05;
    const nb = bride(n0 + 0.15, Math.min(0.55, (tTr - n0 - 0.3) / 4), { vel: 0.42 });
    a.arc('F', 'Bb', nb.ts[1], tTr, { steps: 5, color: TEAL, dr: 30, label: 'WALK IN', labelR: 165 });
    a.scale(tTr, 'C', a.T.MAJOR);
    const nf = fanfare(tTr, FB, { vel: 0.14 });
    a.ch('C', nf, n1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.6 });
    a.big('A CALM FOURTH', nb.ts[1], tTr, { y: 462, size: 48, ...MONO, color: TEAL, blur: 10 });
    a.big('A TRUMPET FANFARE', tTr, n1, { y: 462, size: 48, ...MONO, color: GOLD, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
