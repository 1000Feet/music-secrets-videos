// Chord functions: tonic (home), subdominant (away), dominant (tension that wants home).
// Copyrighted / traditional songs: chords and generic grooves only, no melodies or lyrics.
const B = 0.42; // one beat, about 143 BPM

module.exports = {
  slug: 'chord-functions',
  title: 'Home, Away, Tension: Chord Functions',
  segments: [
    { id: 'hook',     text: 'Chords have jobs. Just three of them: home, away, and tension.' },
    { id: 'what',     text: 'In C major: C is home, F moves away, G builds tension.' },
    { id: 'bamba',    text: 'La Bamba loops just those three: C, F, G.' },
    { id: 'twist',    text: 'Twist and Shout spins the same loop.' },
    { id: 'blues',    text: 'And the twelve bar blues is built from them too.' },
    { id: 'why1',     text: 'So why do they work? The tonic, chord one, is stable. The resting place.' },
    { id: 'why2',     text: 'The subdominant, four, or two, moves away from home and sets up the dominant.' },
    { id: 'why3',     text: 'The dominant, chord five, holds the leading tone: B, a half step below home.' },
    { id: 'why4',     text: 'Add the seventh, and B and F form a tritone that squeezes inward to C and E.' },
    { id: 'sub',      text: 'Chords that share notes can stand in for each other. A minor shares two notes with C...' },
    { id: 'dec',      text: 'so five to six sounds like home, but not quite: the deceptive cadence.' },
    { id: 'sentence', text: 'Tonic, subdominant, dominant, tonic. The basic sentence of tonal music.' },
    { id: 'essence',  text: 'Three jobs: home, away, tension. Almost every song is built from them.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'CHORD FUNCTIONS', title: 'HOME, AWAY, TENSION', accent: true, circle: false, tonic: 0, row: ['C', 'F', 'G'], min: 16 * B, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'IN C MAJOR', title: 'THREE JOBS', tonic: 0, tail: 1.0 },
    { id: 'bamba', segs: ['bamba'], label: 'YOU HEAR IT IN', title: 'La Bamba', sub: 'Traditional · Ritchie Valens 1958', tonic: 0, row: ['C', 'F', 'G'], min: 12 * B + 0.2, tail: 0.3 },
    { id: 'twist', segs: ['twist'], label: 'YOU HEAR IT IN', title: 'Twist and Shout', sub: 'Isley Brothers 1962 · Beatles 1963', tonic: 0, row: ['C', 'F', 'G'], min: 12 * B, tail: 0.3 },
    { id: 'blues', segs: ['blues'], label: 'YOU HEAR IT IN', title: 'The 12-Bar Blues', sub: 'I · IV · V', circle: false, tonic: 0, min: 16 * B + 0.4, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'T · TONIC', title: 'HOME', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'S · SUBDOMINANT', title: 'AWAY', tonic: 0, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'D · DOMINANT', title: 'TENSION', tonic: 0, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'D · DOMINANT', title: 'THE TRITONE', tonic: 0, tail: 1.4 },
    { id: 'sub', segs: ['sub', 'dec'], label: 'STAND-INS', title: 'THE DECEPTIVE CADENCE', tonic: 0, gap: 0.35, tail: 1.4 },
    { id: 'sentence', segs: ['sentence'], label: 'T → S → D → T', title: 'THE BASIC SENTENCE', circle: false, tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THREE JOBS', accent: true, tonic: 0, row: ['C', 'F', 'G', 'C'], gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', GREEN = '#7be07b', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', WHITE = '#ffffff', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const FN = { C: ['T', 'HOME', PINK], F: ['S', 'AWAY', GREEN], G: ['D', 'TENSION', TEAL] };
    const V = {
      C: [['E3', 'G3', 'C4'], 'C3'], F: [['F3', 'A3', 'C4'], 'F2'], G: [['D3', 'G3', 'B3'], 'G2'], G7: [['D3', 'F3', 'G3', 'B3'], 'G2'],
      Dm: [['D3', 'F3', 'A3'], 'D3'], Am: [['E3', 'A3', 'C4'], 'A2'], C7: [['E3', 'Bb3', 'C4'], 'C3'], F7: [['Eb3', 'A3', 'C4'], 'F2'],
    };
    const C = (name, t0, t1, o = {}) => a.ch(name, t0, t1, { notes: V[name][0], bass: V[name][1], vel: o.vel ?? 0.7, row: o.row ?? null, strikes: o.strikes, label: o.label, hideName: o.hideName, shape: o.shape });
    // a generic rock 'n' roll bar: kick 1 & 3, snare 2 & 4, eighth-note hats, chord on every beat
    const groove = (name, t, beats, o = {}) => {
      for (let i = 0; i < beats; i++) {
        const tb = t + i * B;
        a.perc(i % 2 ? 'snare' : 'kick', tb, (i % 2 ? 0.7 : 0.85) * (o.vel ?? 1));
        a.perc('hat', tb, 0.3); a.perc('hat', tb + (o.swing ? B * 2 / 3 : B / 2), 0.2);
      }
      return C(name, t, t + beats * B, { row: o.row, vel: 0.6 * (o.vel ?? 1), strikes: [...Array(beats)].map((_, i) => ({ o: i * B, v: i ? 0.55 : 1 })), hideName: o.hideName, shape: o.shape });
    };
    const fnCells = names => names.map(n => ({ label: FN[n][0], sub: FN[n][1], color: FN[n][2], size: 84, subSize: 26 }));

    // ---- hook: T S D grid, the loop C F G G ----
    const h1 = S('hook').t1;
    const g0 = a.grid(fnCells(['C', 'F', 'G']), 0.15, h1, { rows: 1, cols: 3, cw: 300, chh: 260, y: 560, revealStep: 0.12 });
    const LOOP = [['C', 0, 4], ['F', 1, 2], ['G', 2, 2], ['C', 0, 4], ['F', 1, 2], ['G', 2, 2]];
    let t = 0.2;
    LOOP.forEach(([n, r, b]) => { if (t < h1 - 0.1) { groove(n, t, b, { row: r, vel: 0.8 }); g0.active.push({ t0: t, t1: t + b * B, i: r }); } t += b * B; });
    if (t < h1) { C('C', t, h1, { row: 0 }); g0.active.push({ t0: t, t1: h1, i: 0 }); }
    [['home', 0], ['away', 1], ['tension', 2]].forEach(([w, i]) => g0.active.push({ t0: a.w('hook', w), t1: a.w('hook', w) + 0.5, i }));
    a.big('I · IV · V', 0.5, h1, { y: 920, size: 52, ...MONO, color: GOLD });

    // ---- what: C home, F away, G tension ----
    const w0 = S('what').t0, w1 = S('what').t1;
    const tw = [a.w('what', 'C', 1), a.w('what', 'F'), a.w('what', 'G')].map(x => x - 0.05);
    a.scale(w0, 'C');
    C('C', w0 + 0.05, tw[0], { vel: 0.4, row: 0 });
    ['C', 'F', 'G'].forEach((n, i) => {
      C(n, tw[i], i < 2 ? tw[i + 1] : w1 - 0.7, { row: i });
      a.big(`${FN[n][0]} · ${FN[n][1]}`, tw[i], i < 2 ? tw[i + 1] : w1, { ...TOP, color: FN[n][2] });
    });
    C('C', w1 - 0.7, w1, { row: 0, vel: 0.5 });

    // ---- La Bamba / Twist and Shout: the I-IV-V loop, generic grooves ----
    a.scale(S('bamba').t0, 'C');
    const loop = (t0, t1, o = {}) => {
      let tt = t0; const pts = []; let k = 0;
      while (tt + 4 * B <= t1 + 0.05) {
        [['C', 0, 2], ['F', 1, 1], ['G', 2, 1]].forEach(([n, r, b]) => { groove(n, tt, b, { row: r, swing: o.swing }); pts.push([tt, n]); tt += b * B; });
        k++;
      }
      a.walker(pts, { t1, dr: 34, label: 'ROOT', labelDr: 82 });
      ['C', 'F', 'G'].forEach(n => a.tag(n, t0 + 0.1, t1, FN[n][0], { color: FN[n][2], dr: -92 }));
      return tt;
    };
    loop(S('bamba').t0 + 0.1, S('bamba').t1);
    loop(S('twist').t0 + 0.05, S('twist').t1, { swing: true });

    // ---- blues: twelve bars of I, IV, V, coloured by job ----
    const b0 = S('blues').t0, b1 = S('blues').t1;
    const FORM = ['C', 'C', 'C', 'C', 'F', 'F', 'C', 'C', 'G', 'F', 'C', 'C'];
    const RN = { C: 'I', F: 'IV', G: 'V' };
    const bg = a.grid(FORM.map(n => ({ label: RN[n], sub: FN[n][0], color: FN[n][2], size: 52, subSize: 26 })), b0 + 0.1, b1, { rows: 3, cols: 4, cw: 225, chh: 160, y: 520, revealStep: 0.05 });
    const BB = (b1 - b0 - 0.3) / 12;
    FORM.forEach((n, i) => {
      const tb = b0 + 0.2 + i * BB, sev = n + '7';
      a.ch(sev === 'G7' ? 'G7' : sev, tb, tb + BB, { notes: V[sev][0], bass: V[sev][1], vel: 0.5, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: BB / 2, v: 0.6 }] });
      a.perc('kick', tb, 0.7); a.perc('snare', tb + BB / 2, 0.5); a.perc('hat', tb + BB / 4, 0.25); a.perc('hat', tb + 3 * BB / 4, 0.25);
      bg.active.push({ t0: tb, t1: tb + BB, i });
    });

    // ---- why1: the tonic - stable, the resting place ----
    const y0 = S('why1').t0, y1 = S('why1').t1, tTon = a.w('why1', 'tonic');
    a.scale(y0, 'C');
    C('C', y0 + 0.1, y1, { vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: 1.5, v: 0.5 }, { o: 3.0, v: 0.5 }, { o: 4.5, v: 0.5 }] });
    a.ring(['C', 'E', 'G'], tTon, y1, { color: PINK });
    a.tag('C', tTon, y1, 'I', { color: PINK, dr: -92 });
    a.big('STABLE', a.w('why1', 'stable'), y1, { ...TOP, color: PINK });

    // ---- why2: the subdominant (IV, also ii) moves away and sets up V ----
    const z0 = S('why2').t0, z1 = S('why2').t1, tTwo = a.w('why2', 'two'), tSet = a.w('why2', 'sets'), tDom = a.w('why2', 'dominant');
    C('C', z0 + 0.05, a.w('why2', 'subdominant') - 0.05, { vel: 0.4 });
    C('F', a.w('why2', 'subdominant') - 0.05, tTwo - 0.05, { label: 'F = IV' });
    C('Dm', tTwo - 0.05, tSet, { label: 'Dm = ii' });
    C('F', tSet, tDom - 0.05, { vel: 0.6 });
    C('G', tDom - 0.05, z1 - 0.6, { vel: 0.7 });
    C('C', z1 - 0.6, z1, { vel: 0.5 });
    a.big('S · AWAY FROM HOME', a.w('why2', 'away'), tDom, { ...TOP, size: 40, color: GREEN });
    a.big('SETS UP  D', tDom, z1, { ...TOP, color: TEAL });

    // ---- why3: the dominant holds B, the leading tone ----
    const d0 = S('why3').t0, d1 = S('why3').t1, tB = a.w('why3', 'B'), tHalf = a.w('why3', 'half');
    C('G', d0 + 0.05, d1 - 0.5, { strikes: [{ o: 0, v: 1 }, { o: 1.5, v: 0.5 }, { o: 3.0, v: 0.5 }] });
    a.ring(['B'], a.w('why3', 'leading'), d1, { color: GOLD });
    a.tag('B', a.w('why3', 'leading'), d1, 'LEADING TONE', { color: GOLD, dr: -92 });
    a.note('B4', tB, 0.8, { vel: 0.32 });
    a.arc('B', 'C', tHalf, d1, { steps: 1, color: GOLD, dr: 30, label: 'HALF STEP', labelR: 165 });
    a.note('C5', tHalf + 0.4, 0.8, { vel: 0.32 });
    a.big('D · TENSION', d0 + 0.3, d1, { ...TOP, color: TEAL });
    C('C', d1 - 0.5, d1, { vel: 0.45 });

    // ---- why4: G7 - the tritone B-F squeezes inward to C-E ----
    const f0 = S('why4').t0, f1 = S('why4').t1, tTri = a.w('why4', 'tritone'), tSq = a.w('why4', 'squeezes');
    const tRes = a.w('why4', 'C') - 0.05;
    C('G7', f0 + 0.05, tRes, { strikes: [{ o: 0, v: 1 }, { o: 1.4, v: 0.5 }, { o: 2.8, v: 0.5 }] });
    a.tag('F', a.w('why4', 'seventh'), tRes, '7TH', { color: RED, dr: -92 });
    a.line('B', 'F', tTri, tRes + 0.3, { color: RED, label: 'TRITONE', ly: 78 });
    a.arc('B', 'C', tSq, f1, { steps: 1, color: GOLD, dr: 30 });
    a.arc('F', 'E', tSq, f1, { steps: -1, color: GOLD, dr: 30 });
    a.note('B3', tSq, 0.6, { vel: 0.3 }); a.note('F4', tSq, 0.6, { vel: 0.3 });
    C('C', tRes, f1 - 0.1, { vel: 0.8 });
    a.note('C4', tRes, 1.2, { vel: 0.3 }); a.note('E4', tRes, 1.2, { vel: 0.3 });
    a.big('B → C  ·  F → E', tSq, f1, { ...TOP, color: GOLD });

    // ---- sub / dec: Am shares C and E with C; G7 -> Am, the deceptive cadence ----
    const s0 = S('sub').t0, s1 = S('sub').t1, tAm = a.w('sub', 'A') - 0.05, tShare = a.w('sub', 'two');
    const tFive = a.w('dec', 'five') - 0.05, tSix = a.w('dec', 'six') - 0.05;
    C('C', s0 + 0.05, tAm, { vel: 0.55 });
    C('Am', tAm, tFive, { vel: 0.6 });
    a.ghost('C', tAm, tFive, { color: PINK, label: 'C · E · G', ly: 120 });
    a.ring(['C', 'E'], tShare, tFive, { color: GOLD });
    a.big('2 SHARED NOTES', tShare, tFive, { ...TOP, color: GOLD });
    C('G7', tFive, tSix, { vel: 0.7 });
    C('Am', tSix, s1 - 0.1, { vel: 0.75, label: 'Am = vi' });
    a.big('V → vi', tFive, a.w('dec', 'deceptive'), { ...TOP, size: 56, color: TEAL });
    a.big('DECEPTIVE CADENCE', a.w('dec', 'deceptive'), s1, { ...TOP, color: BLUE });
    a.arc('B', 'C', tSix, s1, { steps: 1, color: GOLD, dr: 30 });

    // ---- sentence: T S D T ----
    const n0 = S('sentence').t0, n1 = S('sentence').t1;
    const SN = ['C', 'F', 'G', 'C'];
    const sg = a.grid([...fnCells(SN.slice(0, 3)), fnCells(['C'])[0]], n0 + 0.1, n1, { rows: 1, cols: 4, cw: 235, chh: 240, y: 560, revealStep: 0.1, caption: 'I  →  IV  →  V  →  I' });
    // case-sensitive: 'Tonic' is the first word, 'tonic' the fourth
    const sw = [a.w('sentence', 'Tonic'), a.w('sentence', 'subdominant'), a.w('sentence', 'dominant'), a.w('sentence', 'tonic')];
    SN.forEach((n, i) => {
      const t1 = i < 3 ? sw[i + 1] - 0.05 : n1 - 0.1;
      C(i === 2 ? 'G7' : n, sw[i] - 0.05, t1, { hideName: true, shape: false, vel: 0.7 });
      sg.active.push({ t0: sw[i] - 0.05, t1, i });
    });
    a.big('THE BASIC SENTENCE', a.w('sentence', 'basic'), n1, { y: 940, size: 44, ...MONO, color: GOLD });

    // ---- essence: the loop once more, home at the end ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1, tC = a.at('cta');
    a.scale(S('essence').t0, 'C');
    const el = (tC - 0.1 - e0) / 4;
    const ek = SN.map((n, i) => groove(n, e0 + i * el, Math.max(1, Math.floor(el / B)), { row: i, vel: 0.7 }));
    a.walker(SN.map((n, i) => [ek[i].t0, n]), { t1: e1, dr: 34 });
    ['C', 'F', 'G'].forEach(n => a.tag(n, e0, e1, FN[n][0], { color: FN[n][2], dr: -92 }));
    C('C', tC - 0.1, e1 - 0.3, { row: 3, vel: 0.75 });
    a.cta(tC + 0.6, 'Leave a song in the comments');
  },
};
