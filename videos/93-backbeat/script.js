// The backbeat: the snare on beats 2 and 4, the "weak" beats, and why it moves the body.
// Copyrighted songs: only generic grooves are played (no melodies, riffs or lyrics).
const B = 0.5, BAR = 4 * B;          // 120 BPM
const BR = 0.4, BARR = 4 * BR;       // a fast rock 'n' roll shuffle, 150 BPM
const BQ = 0.74, BARQ = 4 * BQ;      // a slow stomp, about 81 BPM

module.exports = {
  slug: 'backbeat',
  title: 'The Backbeat',
  segments: [
    { id: 'hook',    text: "Kick, snare, kick, snare. That snare on two and four is the backbeat." },
    { id: 'what',    text: 'One and three are the strong beats. Rock and pop put the loudest hit on the weak ones.' },
    { id: 's1',      text: 'New Orleans drummer Earl Palmer played on records by Little Richard and Fats Domino.' },
    { id: 's1b',     text: "He's credited with popularising the strong rock and roll backbeat." },
    { id: 's2',      text: 'We Will Rock You has no drums at all. Stomp, stomp, clap.' },
    { id: 's2b',     text: 'The clap is the backbeat.' },
    { id: 'why1',    text: 'So why does it work? In marches and polkas, the accent falls on one and three.' },
    { id: 'why2',    text: 'Move it to two and four, and you get a push and pull.' },
    { id: 'why2b',   text: 'The kick grounds you on one and three. The snare answers on two and four.' },
    { id: 'why3',    text: 'That contrast moves the body: step on one, clap on two.' },
    { id: 'why4',    text: 'Audiences used to march music clap on one and three.' },
    { id: 'why4b',   text: 'Rock, gospel and R and B audiences clap on two and four.' },
    { id: 'why5',    text: 'It comes from African American music: gospel, rhythm and blues, then rock and roll.' },
    { id: 'essence', text: 'Accent the weak beat, and the whole song starts to move your body.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SNARE ON 2 AND 4', title: 'THE BACKBEAT', accent: true, circle: false, min: 3 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'STRONG AND WEAK', title: 'THE WEAK BEATS', circle: false, min: 4 * BAR, tail: 0.4 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'Tutti Frutti', sub: 'Little Richard · 1955', circle: false, gap: 0.3, min: 6 * BARR, tail: 0.8 },
    { id: 's2', segs: ['s2', 's2b'], label: 'YOU HEAR IT IN', title: 'We Will Rock You', sub: 'Queen · 1977', circle: false, gap: 0.3, min: 4 * BARQ, tail: 0.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE MARCH', circle: false, min: 4 * BAR, tail: 0.4 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'PUSH AND PULL', circle: false, gap: 0.3, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'STEP, CLAP', circle: false, min: 4 * BAR, tail: 0.5 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHERE DO YOU CLAP?', title: '1 & 3 OR 2 & 4', circle: false, gap: 1.6, tail: 0.6 },
    { id: 'why5', segs: ['why5'], label: 'WHERE IT CAME FROM', title: 'GOSPEL TO ROCK', circle: false, min: 4 * BAR + 0.3, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ACCENT THE WEAK BEAT', accent: true, circle: false, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREY = '#8a8a92', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1080, size: 52, ...MONO };

    // the 4-beat grid: kick on 1 and 3 (pink), snare on 2 and 4 (teal)
    const BEATS = [1, 2, 3, 4].map(n => ({ label: String(n), sub: n % 2 ? 'KICK' : 'SNARE', color: n % 2 ? PINK : TEAL, size: 96, subSize: 30 }));
    const beatGrid = (t0, t1, o = {}) => a.grid(o.cells || BEATS, t0, t1, { rows: 1, cols: 4, cw: 245, chh: 290, y: o.y ?? 520, ...o });
    const clap = (t, vel = 1) => { a.perc('snare', t, 0.5 * vel); a.perc('snare', t + 0.012, 0.35 * vel); a.perc('hat', t + 0.006, 0.4 * vel); };

    // one bar of a rock/pop backbeat; o.g grid to light, o.chord harmony, o.claps [beats] for audience claps
    function bar(t, o = {}) {
      const b = o.b ?? B, vel = o.vel ?? 1, style = o.style || 'rock';
      for (let i = 0; i < 4; i++) {
        const tb = t + i * b;
        if (o.g) o.g.active.push({ t0: tb, t1: tb + b * 0.9, i });
        if (style === 'rock') {
          if (i % 2 === 0) a.perc('kick', tb, 0.9 * vel); else if (o.snare !== false) { a.perc('snare', tb, 0.85 * vel); a.perc('snare', tb + 0.015, 0.3 * vel); }
          if (o.hat !== false) { a.perc('hat', tb, 0.3 * vel); a.perc('hat', tb + b / 2, 0.2 * vel); }
          if (o.bass) a.note(o.bass, tb, b * 0.8, { vel: 0.35 * vel, show: false });
        } else if (style === 'shuffle') {
          // fast rock 'n' roll: swung hats, kick 1 & 3, a hard snare on 2 & 4, a generic boogie bass
          if (i % 2 === 0) a.perc('kick', tb, 0.85 * vel); else { a.perc('snare', tb, 1.0 * vel); a.perc('snare', tb + 0.015, 0.4 * vel); }
          a.perc('hat', tb, 0.3 * vel); a.perc('hat', tb + b * 2 / 3, 0.2 * vel);
          const R = a.T.midi(o.root || 'C2');
          for (let j = 0; j < 2; j++) a.note(R + [0, 4, 7, 9, 10, 9, 7, 4][i * 2 + j], tb + j * b * 2 / 3, b * (j ? 0.3 : 0.6), { vel: 0.32 * vel, show: false });
        } else if (style === 'march') {
          // oom-pah: a strong bass drum + low note on 1 and 3, light cymbal and chord on 2 and 4
          if (i % 2 === 0) { a.perc('kick', tb, 1.0 * vel); a.perc('snare', tb, 0.25 * vel); if (o.bass) a.note(o.bass, tb, b * 0.7, { vel: 0.45 * vel, show: false }); }
          else { a.perc('hat', tb, 0.22 * vel); }
          a.perc('hat', tb + b / 2, 0.12 * vel);
        }
        if (o.claps && o.claps.includes(i + 1)) { clap(tb, 0.9 * vel); if (o.cg) o.cg.active.push({ t0: tb, t1: tb + b * 0.9, i }); }
      }
      if (o.chord) {
        const strikes = style === 'march' ? [{ o: b, v: 0.8 }, { o: 3 * b, v: 0.7 }] : (o.strikes || [{ o: 0, v: 1 }, { o: 2 * b, v: 0.7 }]);
        a.ch(o.chord, t, t + 4 * b, { bass: style === 'shuffle' ? false : (o.chordBass ?? false), strikes, vel: (o.cv ?? 0.45) * vel, hideName: true, shape: false, notes: o.notes });
      }
    }
    const loop = (t0, t1, f, b = B) => { let t = t0, n = 0; for (; t + 4 * b <= t1 + 0.05; t += 4 * b, n++) f(t, n); return t; };
    const PROG = [['C', ['E3', 'G3', 'C4'], 'C2'], ['F', ['F3', 'A3', 'C4'], 'F2'], ['G', ['D3', 'G3', 'B3'], 'G2'], ['C', ['E3', 'G3', 'C4'], 'C2']];

    // ---- hook: the backbeat groove from the first frame ----
    const h0 = 0.3;
    const gH = beatGrid(h0, S('hook').t1, { revealStep: 0.08 });
    loop(h0, S('hook').t1, (t, n) => bar(t, { g: gH, chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));
    a.big('2  &  4', h0, S('hook').t1, { ...LBL, size: 110, color: TEAL, y: 1000 });

    // ---- what: strong beats 1 and 3, the big hit on the weak beats ----
    const STRONG = [1, 2, 3, 4].map(n => ({ label: String(n), sub: n % 2 ? 'STRONG' : 'WEAK', color: n % 2 ? PINK : TEAL, size: 96, subSize: 30 }));
    const gW = beatGrid(S('what').t0, S('what').t1, { cells: STRONG });
    loop(S('what').t0 + 0.05, S('what').t1, (t, n) => bar(t, { g: gW, chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));
    a.big('STRONG: 1 · 3', a.w('what', 'strong'), a.w('what', 'Rock'), { ...LBL, color: PINK });
    a.big('LOUDEST HIT: 2 · 4', a.w('what', 'loudest'), S('what').t1, { ...LBL, color: TEAL });

    // ---- s1: a generic fast rock 'n' roll shuffle with a hard backbeat ----
    const s10 = S('s1').t0 + 0.05;
    const gS1 = beatGrid(S('s1').t0, S('s1').t1);
    const BOOG = ['C2', 'C2', 'F2', 'C2', 'G2', 'C2'];
    loop(s10, S('s1').t1, (t, n) => bar(t, { b: BR, style: 'shuffle', g: gS1, root: BOOG[n % 6], chord: { C2: 'C7', F2: 'F7', G2: 'G7' }[BOOG[n % 6]], strikes: [{ o: BR, v: 1 }, { o: 3 * BR, v: 0.9 }], cv: 0.4 }), BR);
    a.big('EARL PALMER', a.w('s1', 'Earl'), S('s1').t1, { y: 1010, size: 64, ...MONO, color: GOLD });
    a.big('NEW ORLEANS DRUMMER', a.w('s1', 'Earl'), S('s1').t1, { y: 1090, size: 32, ...MONO, color: '#b9b9c2', blur: 0 });

    // ---- s2: stomp, stomp, clap (no drums, no melody) ----
    const s20 = S('s2').t0 + 0.05;
    const STOMP = [{ label: 'STOMP', color: PINK, size: 40 }, { label: 'STOMP', color: PINK, size: 40 }, { label: 'CLAP', color: TEAL, size: 44 }, { label: '·', color: GREY, size: 44 }];
    const gS2 = a.grid(STOMP, S('s2').t0, S('s2').t1, { rows: 1, cols: 4, cw: 240, chh: 200, y: 560 });
    const gS2b = a.grid([1, 2].map(n => ({ label: String(n), sub: n === 1 ? 'BEAT 1' : 'BEAT 2', color: n === 1 ? PINK : TEAL, size: 60 })), S('s2').t0, S('s2').t1, { rows: 1, cols: 2, cw: 480, chh: 170, y: 790 });
    loop(s20, S('s2').t1, t => {
      for (let h = 0; h < 2; h++) {
        const t0 = t + h * 2 * BQ;
        a.perc('kick', t0, 1.0); a.perc('kick', t0 + 0.01, 0.4); gS2.active.push({ t0, t1: t0 + BQ / 2, i: 0 });
        a.perc('kick', t0 + BQ / 2, 1.0); a.perc('kick', t0 + BQ / 2 + 0.01, 0.4); gS2.active.push({ t0: t0 + BQ / 2, t1: t0 + BQ, i: 1 });
        clap(t0 + BQ, 1.1); gS2.active.push({ t0: t0 + BQ, t1: t0 + 1.6 * BQ, i: 2 });
        gS2b.active.push({ t0, t1: t0 + BQ, i: 0 }); gS2b.active.push({ t0: t0 + BQ, t1: t0 + 2 * BQ, i: 1 });
      }
    }, BQ);
    a.big('NO DRUMS', a.w('s2', 'no'), a.at('s2b'), { ...LBL, y: 1060, color: '#ffffff' });
    a.big('CLAP = BACKBEAT', a.at('s2b'), S('s2').t1, { ...LBL, y: 1060, color: TEAL });

    // ---- why1: a march, the accent on 1 and 3 ----
    const MARCH = [1, 2, 3, 4].map(n => ({ label: String(n), sub: n % 2 ? 'ACCENT' : '', color: n % 2 ? GOLD : GREY, size: n % 2 ? 90 : 60 }));
    const gM = beatGrid(S('why1').t0, S('why1').t1, { cells: MARCH });
    const MB = ['C2', 'G1', 'C2', 'G1'];
    loop(S('why1').t0 + 0.05, S('why1').t1, (t, n) => bar(t, { style: 'march', g: gM, bass: MB[n % 4], chord: n % 2 ? 'G7' : 'C', notes: n % 2 ? ['F3', 'G3', 'B3'] : ['E3', 'G3', 'C4'], cv: 0.4 }));
    a.big('MARCHES · POLKAS', a.w('why1', 'marches'), S('why1').t1, { ...LBL, color: GOLD });

    // ---- why2: the accent moves to 2 and 4 - push and pull ----
    const w20 = S('why2').t0, tKick = a.w('why2b', 'kick'), tSnare = a.w('why2b', 'snare');
    const gP = beatGrid(w20, S('why2').t1);
    loop(w20 + 0.05, S('why2').t1, (t, n) => bar(t, { g: gP, chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));
    a.big('PUSH  ↔  PULL', a.w('why2', 'push'), tKick, { ...LBL, size: 64, color: GOLD });
    a.big('KICK GROUNDS: 1 · 3', tKick, S('why2').t1, { ...LBL, y: 1020, size: 44, color: PINK });
    a.big('SNARE ANSWERS: 2 · 4', tSnare, S('why2').t1, { ...LBL, y: 1100, size: 44, color: TEAL });

    // ---- why3: step on 1, clap on 2 ----
    const STEP = [1, 2, 3, 4].map(n => ({ label: n % 2 ? 'STEP' : 'CLAP', sub: String(n), color: n % 2 ? PINK : TEAL, size: 56 }));
    const gT = beatGrid(S('why3').t0, S('why3').t1, { cells: STEP });
    loop(S('why3').t0 + 0.05, S('why3').t1, (t, n) => bar(t, { g: gT, claps: [2, 4], chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));
    a.big('THE BODY MOVES', a.w('why3', 'body'), S('why3').t1, { ...LBL, color: GOLD });

    // ---- why4: clapping on 1 & 3 vs 2 & 4 ----
    const w4 = S('why4').t0, t24 = a.at('why4b') - 0.2;
    const CL13 = [1, 2, 3, 4].map(n => ({ label: n % 2 ? 'CLAP' : '·', sub: String(n), color: n % 2 ? GOLD : GREY, size: 52 }));
    const CL24 = [1, 2, 3, 4].map(n => ({ label: n % 2 ? '·' : 'CLAP', sub: String(n), color: n % 2 ? GREY : TEAL, size: 52 }));
    const g13 = a.grid(CL13, w4, S('why4').t1, { rows: 1, cols: 4, cw: 240, chh: 170, y: 520, caption: 'MARCH MUSIC CROWD' });
    const g24 = a.grid(CL24, Math.min(t24, w4 + 0.05 + Math.floor((t24 - w4 - 0.05 + 0.05) / BAR) * BAR), S('why4').t1, { rows: 1, cols: 4, cw: 240, chh: 170, y: 800, caption: 'ROCK · GOSPEL · R&B CROWD' });
    const tSwitch = loop(w4 + 0.05, t24, (t, n) => bar(t, { style: 'march', bass: MB[n % 4], claps: [1, 3], cg: g13, chord: n % 2 ? 'G7' : 'C', notes: n % 2 ? ['F3', 'G3', 'B3'] : ['E3', 'G3', 'C4'], cv: 0.35 }));
    loop(tSwitch, S('why4').t1, (t, n) => bar(t, { claps: [2, 4], cg: g24, snare: false, chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));

    // ---- why5: gospel -> rhythm and blues -> rock and roll ----
    const ROOTS = [['GOSPEL', 'gospel'], ['RHYTHM & BLUES', 'rhythm'], ["ROCK 'N' ROLL", 'rock']];
    const gR = a.grid(ROOTS.map(([l], i) => ({ label: l, color: [GOLD, BLUE, TEAL][i], size: l.length > 8 ? 46 : 56 })), S('why5').t0, S('why5').t1, { rows: 3, cols: 1, cw: 700, chh: 150, y: 520 });
    ROOTS.forEach(([, w], i) => gR.active.push({ t0: a.w('why5', w), t1: S('why5').t1, i }));
    a.big('AFRICAN AMERICAN MUSIC', a.w('why5', 'African'), S('why5').t1, { ...LBL, y: 1060, size: 40, color: '#ffffff' });
    // a gospel-flavoured groove: claps on 2 and 4, organ-like chords
    const GOS = [['C', ['E3', 'G3', 'C4']], ['F', ['F3', 'A3', 'C4']], ['C', ['E3', 'G3', 'C4']], ['G7', ['F3', 'G3', 'B3']]];
    loop(S('why5').t0 + 0.05, S('why5').t1, (t, n) => bar(t, { claps: [2, 4], snare: n > 1, chord: GOS[n % 4][0], notes: GOS[n % 4][1], bass: GOS[n % 4][0][0] + '2', cv: 0.5, strikes: [{ o: 0, v: 1 }, { o: B, v: 0.6 }, { o: 2 * B, v: 0.8 }, { o: 3 * B, v: 0.6 }] }));

    // ---- essence: the full groove, then one last hit ----
    const e0 = S('essence').t0;
    const gE = beatGrid(e0, S('essence').t1);
    const tEnd = loop(e0 + 0.05, S('essence').t1 - 1.8, (t, n) => bar(t, { g: gE, claps: [2, 4], chord: PROG[n % 4][0], notes: PROG[n % 4][1], bass: PROG[n % 4][2] }));
    a.big('2  &  4', a.w('essence', 'weak'), S('essence').t1, { ...LBL, size: 110, color: TEAL, y: 1000 });
    a.perc('kick', tEnd, 1); a.perc('snare', tEnd, 0.6);
    gE.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('C', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.7, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
