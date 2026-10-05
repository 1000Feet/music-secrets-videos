// The son clave (3-2): five hits in a 16-step cycle (steps 1, 4, 7 | 11, 13), from Cuba to the Bo Diddley beat.
// Copyrighted songs: only the clave pattern and generic grooves are played.
const P = 0.15, CYC = 16 * P;     // one 16-step cycle (two bars) = 2.4 s
const PB = 0.13, CYCB = 16 * PB;  // a faster cycle for the Bo Diddley beat

module.exports = {
  slug: 'son-clave',
  title: 'The Son Clave',
  segments: [
    { id: 'hook',    text: 'Five hits in two bars. This little rhythm runs through Cuban music... and rock and roll.' },
    { id: 'what',    text: 'It is the son clave. Sixteen steps, with hits on one, four, seven... then eleven and thirteen.' },
    { id: 'sticks',  text: 'Clave is also the name of the two wooden sticks that play it.' },
    { id: 's1',      text: 'In Cuban son and salsa, the clave organises the whole band.' },
    { id: 's2',      text: "Bo Diddley's song Bo Diddley rides the Bo Diddley beat: essentially the son clave." },
    { id: 's3',      text: 'The same beat drives Not Fade Away...' },
    { id: 's4',      text: "and George Michael's Faith." },
    { id: 'why1',    text: 'So why does it work? The first bar is the tresillo: three, three, two.' },
    { id: 'why1b',   text: 'The second bar answers with just two hits, on eleven and thirteen.' },
    { id: 'why2',    text: 'Five hits, unevenly spaced. Tension in the first bar, an answer in the second.' },
    { id: 'why3',    text: 'It can be played three two, or two three. Musicians say the band must be in clave.' },
    { id: 'why4',    text: 'Its roots are in sub Saharan African rhythms, carried to Cuba.' },
    { id: 'essence', text: 'Five hits, a question and an answer. A rhythm that travelled from Africa to Cuba to rock and roll.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'FIVE HITS', title: 'THE SON CLAVE', accent: true, circle: false, min: 3 * CYC + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what', 'sticks'], label: '16 STEPS · 3 – 2', title: '1 4 7 · 11 13', circle: false, gap: 0.4, min: 5 * CYC, tail: 0.4 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Son and Salsa', sub: 'Cuba', circle: false, min: 3 * CYC, tail: 0.4 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Bo Diddley', sub: 'Bo Diddley · 1955', circle: false, min: 4 * CYCB, tail: 0.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Not Fade Away', sub: 'Buddy Holly & the Crickets · 1957', circle: false, min: 2 * CYCB, tail: 0.4 },
    { id: 's4', segs: ['s4'], label: 'YOU HEAR IT IN', title: 'Faith', sub: 'George Michael · 1987', circle: false, min: 2 * CYC, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE 3 AND THE 2', circle: false, gap: 0.3, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'QUESTION, ANSWER', circle: false, min: 3 * CYC, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: '3 – 2 OR 2 – 3', circle: false, min: 3 * CYC, tail: 0.5 },
    { id: 'why4', segs: ['why4'], label: 'WHERE IT CAME FROM', title: 'AFRICA TO CUBA', circle: false, min: 2 * CYC, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'FIVE HITS', accent: true, circle: false, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREY = '#6a6a72', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1090, size: 48, ...MONO };
    const HITS = [0, 3, 6, 10, 12];       // 0-based steps of the 3-2 son clave
    const HITS23 = [2, 4, 8, 11, 14];     // the same pattern started from its second half (2-3)

    // two rows of eight cells: the "3 side" and the "2 side"
    const cells = (hits, from, col) => [...Array(8)].map((_, k) => {
      const i = from + k, on = hits.includes(i);
      return { label: on ? 'X' : '·', sub: String(i + 1), color: on ? col : GREY, size: on ? 60 : 46 };
    });
    const rows = (t0, t1, o = {}) => {
      const hits = o.hits || HITS, c1 = o.c1 || GOLD, c2 = o.c2 || TEAL;
      return [
        a.grid(cells(hits, 0, c1), t0, t1, { rows: 1, cols: 8, cw: 122, chh: 175, y: o.y ?? 510, caption: o.cap1 ?? '3 SIDE', revealStep: o.reveal }),
        a.grid(cells(hits, 8, c2), t0, t1, { rows: 1, cols: 8, cw: 122, chh: 175, y: (o.y ?? 510) + 270, caption: o.cap2 ?? '2 SIDE', revealStep: o.reveal }),
      ];
    };

    // one 16-step cycle; style: 'clave' (sticks + pulse), 'son' (band), 'bo' (Bo Diddley-style beat), 'faith'
    function cycle(t, o = {}) {
      const p = o.p ?? P, vel = o.vel ?? 1, style = o.style || 'clave', hits = o.hits || HITS;
      const G = typeof o.g === 'function' ? o.g(t + 0.01) : o.g;
      for (let i = 0; i < 16; i++) {
        const tp = t + i * p, hit = hits.includes(i);
        if (G) G[i < 8 ? 0 : 1].active.push({ t0: tp, t1: tp + p * (hit ? 2.5 : 0.95), i: i % 8 });
        if (hit && o.sticks !== false) { a.note('E5', tp, 0.08, { vel: 0.33 * vel, show: false }); a.perc('hat', tp, 0.42 * vel); }
        if (style === 'clave') {
          if (i % 4 === 0) a.perc('kick', tp, (o.pulse ?? 0.35) * vel);
        } else if (style === 'son') {
          // tumbao-style bass anticipations, light shaker, piano stabs on the off-beats
          a.perc('hat', tp, (i % 2 ? 0.1 : 0.16) * vel);
          if (i % 8 === 3 || i % 8 === 6) a.note(o.bass[i < 8 ? 0 : 1], tp, p * 2.5, { vel: 0.42 * vel, show: false });
          if (i % 4 === 0) a.perc('kick', tp, 0.3 * vel);
        } else if (style === 'bo') {
          // the drums and the guitar chop follow the clave hits, maracas on every step
          a.perc('hat', tp, (i % 2 ? 0.14 : 0.24) * vel);
          if (hit) { a.perc('kick', tp, 0.75 * vel); a.perc('snare', tp, 0.25 * vel); }
        } else if (style === 'faith') {
          a.perc('hat', tp, (i % 2 ? 0.1 : 0.18) * vel);
          if (hit) a.perc('kick', tp, 0.55 * vel);
          if (i === 4 || i === 12) a.perc('snare', tp, 0.35 * vel);
        }
      }
      if (o.chord) {
        const strikes = (o.chordOn || hits).map((i, k) => ({ o: i * p, v: k ? 0.75 : 1 }));
        a.ch(o.chord, t, t + 16 * p, { notes: o.notes, bass: o.cbass ?? false, strikes, vel: (o.cv ?? 0.45) * vel, hideName: true, shape: false });
      }
    }
    const loop = (t0, t1, f, cyc = CYC) => { let t = t0, n = 0; for (; t + cyc <= t1 + 0.05; t += cyc, n++) f(t, n); return t; };

    // ---- hook: the clave from the first frame ----
    const h0 = 0.3;
    const gH = rows(h0, S('hook').t1, { reveal: 0.03 });
    loop(h0, S('hook').t1, t => cycle(t, { g: gH }));
    a.big('3  +  2', h0, S('hook').t1, { y: 1095, size: 100, ...MONO, color: GOLD });

    // ---- what + sticks: step numbers on the words ----
    const gW = rows(S('what').t0, S('what').t1);
    loop(S('what').t0 + 0.05, S('what').t1, (t, n) => cycle(t, { g: gW, chord: n % 2 ? 'G7' : 'C', notes: n % 2 ? ['F3', 'G3', 'B3'] : ['E3', 'G3', 'C4'], chordOn: [0], cv: 0.3 }));
    a.big('HITS: 1 · 4 · 7', a.w('what', 'one'), a.w('what', 'eleven'), { ...LBL, color: GOLD });
    a.big('HITS: 1 · 4 · 7 · 11 · 13', a.w('what', 'eleven'), a.at('sticks'), { ...LBL, color: '#ffffff' });
    a.big('CLAVES = TWO WOODEN STICKS', a.w('sticks', 'sticks'), S('what').t1, { ...LBL, size: 40, color: GOLD });

    // ---- s1: son / salsa groove around the clave ----
    const gS1 = rows(S('s1').t0, S('s1').t1);
    const SON = [['C', ['E3', 'G3', 'C4'], ['C2', 'G2']], ['G7', ['F3', 'G3', 'B3'], ['G2', 'D2']]];
    loop(S('s1').t0 + 0.05, S('s1').t1, (t, n) => cycle(t, { g: gS1, style: 'son', bass: SON[n % 2][2], chord: SON[n % 2][0], notes: SON[n % 2][1], chordOn: [2, 5, 7, 10, 13, 15], cv: 0.32 }));
    a.big('THE CLAVE LEADS THE BAND', a.w('s1', 'organises'), S('s1').t1, { ...LBL, size: 40, color: TEAL });

    // ---- s2-s4: the Bo Diddley beat (generic, no riffs) ----
    const gS2 = rows(S('s2').t0, S('s4').t1, { cap1: 'BO DIDDLEY BEAT', cap2: '' });
    const tS4 = S('s4').t0;
    const tBo = loop(S('s2').t0 + 0.05, tS4, (t, n) => cycle(t, { p: PB, g: gS2, style: 'bo', chord: 'E', notes: ['E3', 'G#3', 'B3'], cbass: 'E2', cv: 0.4 }), CYCB);
    loop(tBo, S('s4').t1, (t, n) => cycle(t, { g: gS2, style: 'faith', chord: n % 2 ? 'A' : 'B', notes: n % 2 ? ['E3', 'A3', 'C#4'] : ['D#3', 'F#3', 'B3'], cbass: n % 2 ? 'A2' : 'B2', cv: 0.4 }));
    a.big('= SON CLAVE', a.w('s2', 'essentially'), S('s2').t1, { ...LBL, color: GOLD });
    a.big('SAME BEAT', S('s3').t0 + 0.2, S('s4').t1, { ...LBL, color: GOLD });

    // ---- why1: the 3 side is the tresillo, the 2 side answers ----
    const y0 = S('why1').t0, t2 = a.at('why1b');
    const gY = rows(y0, S('why1').t1, { cap1: '3 SIDE = TRESILLO', cap2: '2 SIDE' });
    loop(y0 + 0.05, S('why1').t1, t => cycle(t, { g: gY, pulse: 0.3 }));
    [['3', 0, 2], ['3', 3, 5], ['2', 6, 7]].forEach(([w, i0, i1], gi) =>
      a.big(w, a.w('why1', 'three', 0), S('why1').t1, { x: 540 - 488 + 61 + 122 * (i0 + i1) / 2, y: 470, size: 40, ...MONO, color: [PINK, TEAL, GOLD][gi], blur: 10 }));
    a.big('3 + 3 + 2', a.w('why1', 'tresillo'), t2, { ...LBL, size: 72, color: GOLD });
    a.big('11 · 13', a.w('why1b', 'two'), S('why1').t1, { ...LBL, size: 72, color: TEAL });

    // ---- why2: question and answer ----
    const gQ = rows(S('why2').t0, S('why2').t1, { cap1: 'QUESTION', cap2: 'ANSWER', c1: RED });
    loop(S('why2').t0 + 0.05, S('why2').t1, (t, n) => cycle(t, { g: gQ, chord: n % 2 ? 'G7' : 'C', notes: n % 2 ? ['F3', 'G3', 'B3'] : ['E3', 'G3', 'C4'], chordOn: [0, 10], cv: 0.35 }));
    a.big('TENSION', a.w('why2', 'Tension'), S('why2').t1, { x: 300, ...LBL, color: RED });
    a.big('ANSWER', a.w('why2', 'answer'), S('why2').t1, { x: 780, ...LBL, color: TEAL });

    // ---- why3: 3-2 or 2-3 ----
    const tTwo = a.w('why3', 'two', 1) - 0.1, tCl = a.w('why3', 'clave');
    const g32 = rows(S('why3').t0, tTwo, { cap1: '3 – 2', cap2: '' });
    const g23 = rows(tTwo, S('why3').t1, { hits: HITS23, c1: TEAL, c2: GOLD, cap1: '2 – 3', cap2: '' });
    const t23 = loop(S('why3').t0 + 0.05, tTwo, t => cycle(t, { g: g32 }));
    loop(t23, S('why3').t1, t => cycle(t, { g: g23, hits: [2, 4, 8, 11, 14] }));
    a.big('"IN CLAVE"', tCl, S('why3').t1, { ...LBL, size: 64, color: GOLD });

    // ---- why4: sub-Saharan Africa -> Cuba ----
    const MAP = [{ label: 'SUB-SAHARAN AFRICA', color: GOLD, size: 46 }, { label: '→', color: GREY, size: 60 }, { label: 'CUBA', color: TEAL, size: 64 }];
    const gM = a.grid(MAP, S('why4').t0, S('why4').t1, { rows: 3, cols: 1, cw: 760, chh: 150, y: 520 });
    gM.active.push({ t0: a.w('why4', 'African'), t1: S('why4').t1, i: 0 }, { t0: a.w('why4', 'carried'), t1: S('why4').t1, i: 1 }, { t0: a.w('why4', 'Cuba'), t1: S('why4').t1, i: 2 });
    loop(S('why4').t0 + 0.05, S('why4').t1, t => cycle(t, { pulse: 0.45 }));

    // ---- essence: Africa -> Cuba -> rock 'n' roll, the clave all the way ----
    const e0 = S('essence').t0;
    const gE = rows(e0, S('essence').t1);
    const TRIP = [['AFRICA', 'Africa', GOLD], ['CUBA', 'Cuba', TEAL], ["ROCK 'N' ROLL", 'rock', PINK]];
    TRIP.forEach(([l, w, c], i) => a.big(l, a.w('essence', w), S('essence').t1, { x: [230, 470, 790][i], y: 1060, size: i === 2 ? 40 : 46, ...MONO, color: c }));
    const tEnd = loop(e0 + 0.05, S('essence').t1 - 1.8, (t, n) => cycle(t, { g: gE, style: n < 1 ? 'son' : 'bo', bass: ['C2', 'G2'], chord: n % 2 ? 'G7' : 'C', notes: n % 2 ? ['F3', 'G3', 'B3'] : ['E3', 'G3', 'C4'], chordOn: [0, 3, 6, 10, 12], cv: 0.35 }));
    a.note('E5', tEnd, 0.1, { vel: 0.35, show: false }); a.perc('kick', tEnd, 1); a.perc('hat', tEnd, 0.5);
    gE[0].active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('C', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.7, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
