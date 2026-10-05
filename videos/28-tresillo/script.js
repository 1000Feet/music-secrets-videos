// The tresillo: eight pulses grouped 3 + 3 + 2, and why that off-balance cell drives so much music.
const P = 0.3, BAR = 8 * P;          // main groove: eight pulses per cycle
const PH = 0.25, BARH = 8 * PH;      // the habanera, a little slower

module.exports = {
  slug: 'tresillo',
  title: 'The Tresillo',
  segments: [
    { id: 'hook',    text: 'Count eight quick pulses, and hit only three of them. That is the tresillo.' },
    { id: 'what',    text: 'Eight pulses, grouped three, three, two. Accents on one, four and seven.' },
    { id: 'roots',   text: 'It comes from Afro-Cuban and West African traditions.' },
    { id: 's1',      text: 'Bizet built the Habanera from Carmen on it, under that slowly falling melody.' },
    { id: 's2',      text: 'The marimba groove of Shape of You is the same three, three, two.' },
    { id: 's3',      text: "And reggaeton's dembow beat grows from the very same cell." },
    { id: 'why1',    text: 'So why does it work? Three plus three plus two makes eight.' },
    { id: 'why2',    text: 'But the steady beat splits those eight into four even steps.' },
    { id: 'why3',    text: 'So the tresillo pushes against the beat... then lands back on one.' },
    { id: 'why4',    text: 'Tension, then release, in pure rhythm.' },
    { id: 'trip',    text: "It travelled from Africa, through Cuba, into the habanera, the tango, rock and roll, and today's pop." },
    { id: 'essence', text: "Three, three, two. The off-balance heartbeat under so many of today's hits." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE RHYTHM', title: 'THE TRESILLO', accent: true, circle: false, min: 3 * BAR, tail: 0.3 },
    { id: 'what', segs: ['what', 'roots'], label: 'EIGHT PULSES', title: '3 + 3 + 2', circle: false, min: 5 * BAR, gap: 0.4, tail: 0.3 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Habanera', sub: 'Georges Bizet · Carmen · 1875', circle: false, min: 5 * BARH, tail: 0.4 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Shape of You', sub: 'Ed Sheeran · 2017', circle: false, min: 4 * BAR, tail: 0.4 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Reggaeton', sub: 'the dembow beat', circle: false, min: 3 * BAR, tail: 0.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'EIGHT PULSES', circle: false, min: 2 * BAR, tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'AGAINST THE BEAT', circle: false, min: 3 * BAR, tail: 0.3 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'WHY IT WORKS', title: 'PUSH AND LAND', circle: false, min: 3 * BAR, gap: 0.4, tail: 0.4 },
    { id: 'trip', segs: ['trip'], label: 'A LONG JOURNEY', title: 'AFRICA TO POP', circle: false, min: 4 * BAR, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THREE, THREE, TWO', accent: true, circle: false, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', BLUE = '#62a8ff';
    const GCOL = [PINK, TEAL, GOLD];
    const MONO = { family: 'DM Mono', weight: 500 };
    const ACC = [0, 3, 6];

    // eight cells coloured 3 + 3 + 2, the accented pulses big and bright
    const CELLS = [...Array(8)].map((_, i) => ({ label: ACC.includes(i) ? 'X' : '·', sub: String(i + 1), color: GCOL[i < 3 ? 0 : i < 6 ? 1 : 2], size: ACC.includes(i) ? 54 : 50 }));
    const row8 = (t0, t1, o = {}) => a.grid(CELLS, t0, t1, { rows: 1, cols: 8, cw: 122, chh: 160, y: 540, ...o });
    const BEATS = [1, 2, 3, 4].map(n => ({ label: String(n), color: BLUE, size: 46 }));
    const row4 = (t0, t1, o = {}) => a.grid(BEATS, t0, t1, { rows: 1, cols: 4, cw: 244, chh: 130, y: 800, caption: 'THE STEADY BEAT', ...o });
    const groupNames = (t0, t1, y = 760) => {
      [['THREE', 0, 2], ['THREE', 3, 5], ['TWO', 6, 7]].forEach(([w, i0, i1], gi) =>
        a.big(w, t0, t1, { x: 540 - 488 + 61 + 122 * (i0 + i1) / 2, y, size: 34, ...MONO, color: GCOL[gi], blur: 10 }));
    };

    // one cycle of eight pulses in a given style
    function cycle(t, o = {}) {
      const p = o.p ?? P, vel = o.vel ?? 1, style = o.style || 'clave';
      for (let i = 0; i < 8; i++) {
        const tp = t + i * p, acc = ACC.includes(i);
        const gr = typeof o.grid === 'function' ? o.grid(tp + 0.01) : o.grid;
        if (gr) gr.active.push({ t0: tp, t1: tp + p, i });
        if (o.beatGrid && i % 2 === 0) o.beatGrid.active.push({ t0: tp, t1: tp + 2 * p, i: i / 2 });
        if (o.beat && i % 2 === 0) a.perc('kick', tp, 0.85 * vel);
        if (style === 'clave') {
          a.perc('hat', tp, (acc ? 0.45 : 0.22) * vel);
          if (acc && tp >= (o.hitsFrom ?? -1) - 0.05) { if (!o.beat) a.perc('kick', tp, 0.8 * vel); a.note(i === 0 ? 'A4' : 'E5', tp, 0.18, { vel: 0.3 * vel, show: false }); }
        } else if (style === 'habanera') {
          const hb = { 0: 'D2', 3: 'D2', 4: 'A2', 6: 'D3' };
          if (hb[i]) a.note(hb[i], tp, p * (i === 0 ? 2.6 : 0.9), { vel: 0.42 * vel, show: false });
          if (i === 0 || i === 4) a.perc('hat', tp, 0.2 * vel);
        } else if (style === 'marimba') {
          a.perc('hat', tp, (i % 2 ? 0.2 : 0.32) * vel);
          if (i === 0) a.perc('kick', tp, 0.85 * vel);
          if (i === 4) a.perc('snare', tp, 0.6 * vel);
          if (acc) {
            (o.stab || ['A4', 'C5', 'E5']).forEach(n => a.note(n, tp, 0.16, { vel: 0.2 * vel, show: false }));
            a.note(o.root || 'A2', tp, p * (i === 6 ? 1.8 : 2.8), { vel: 0.4 * vel, show: false });
          }
        } else if (style === 'dembow') {
          if (i === 0 || i === 4) a.perc('kick', tp, 0.95 * vel);
          if (i === 3 || i === 6) { a.perc('snare', tp, 0.75 * vel); a.perc('snare', tp + 0.02, 0.3 * vel); }
          a.perc('hat', tp, 0.25 * vel);
        }
      }
      if (o.chord) {
        const strikes = o.strikes || ACC.map((i, k) => ({ o: i * p, v: k ? 0.7 : 1 }));
        a.ch(o.chord, t, t + 8 * p, { bass: o.bass ?? false, strikes, vel: (o.cv ?? 0.6) * vel, hideName: true, shape: false, notes: o.notes });
      }
    }

    // ---- hook: pulses tick, then only three of them get hit ----
    const h0 = 0.3, tHit = a.w('hook', 'three');
    const gH = row8(h0, S('hook').t1, { revealStep: 0.1 });
    for (let t = h0; t + BAR <= S('hook').t1 + 0.05; t += BAR) cycle(t, { grid: gH, hitsFrom: tHit, vel: 0.8 });
    a.big('8 PULSES', a.w('hook', 'eight'), tHit, { y: 940, size: 80, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('3 HITS', tHit, S('hook').t1, { y: 940, size: 80, ...MONO, color: GOLD });

    // ---- what + roots: the cell, with group names ----
    const w0 = S('what').t0;
    const gW = row8(w0, S('what').t1);
    groupNames(a.w('what', 'grouped'), S('what').t1);
    let n = 0;
    const PROG = ['Am', 'Am', 'Dm', 'E7'];
    for (let t = w0; t + BAR <= S('what').t1 + 0.05; t += BAR, n++) cycle(t, { grid: gW, vel: 0.85, chord: PROG[n % 4], bass: PROG[n % 4][0] + '2' });
    a.big('ACCENTS: 1 · 4 · 7', a.w('what', 'Accents'), a.at('roots'), { y: 940, size: 56, ...MONO, color: '#ffffff' });
    a.big('WEST AFRICA', a.w('roots', 'West'), S('what').t1, { y: 1010, size: 56, ...MONO, color: GOLD });
    a.big('AFRO-CUBAN', a.w('roots', 'from'), S('what').t1, { y: 920, size: 56, ...MONO, color: TEAL });

    // ---- s1: Bizet's habanera (public domain): habanera bass + the falling chromatic line ----
    const c0 = S('s1').t0;
    const gC = row8(c0, S('s1').t1);
    groupNames(c0, S('s1').t1);
    let k = 0;
    for (let t = c0; t + BARH <= S('s1').t1 + 0.05; t += BARH, k++) cycle(t, { p: PH, grid: gC, style: 'habanera', chord: k < 3 ? 'Dm' : 'A7', notes: k < 3 ? ['F3', 'A3', 'D4'] : ['E3', 'G3', 'C#4'], strikes: [{ o: 0, v: 1 }, { o: 4 * PH, v: 0.6 }], cv: 0.45, bass: false });
    const m0 = c0 + BARH;
    a.melody([['D5', 3], ['C#5', 1], ['C5', 4], ['B4', 3], ['Bb4', 1], ['A4', 6]], m0, PH, { vel: 0.42 });
    a.big('THE HABANERA', c0 + 0.3, S('s1').t1, { y: 960, size: 64, ...MONO, color: PINK });

    // ---- s2: Shape of You (copyrighted): rhythm only, marimba-like stabs on 1, 4, 7 ----
    const s20 = S('s2').t0;
    const gS2 = row8(s20, S('s2').t1);
    groupNames(s20, S('s2').t1);
    const MAR = [['A4', 'C5', 'E5'], ['A4', 'D5', 'F5'], ['A4', 'C5', 'F5'], ['B4', 'D5', 'G5']], MR = ['A2', 'D2', 'F2', 'G2'];
    k = 0;
    for (let t = s20; t + BAR <= S('s2').t1 + 0.05; t += BAR, k++) cycle(t, { grid: gS2, style: 'marimba', stab: MAR[k % 4], root: MR[k % 4] });
    a.big('MARIMBA: 3 + 3 + 2', s20 + 0.3, S('s2').t1, { y: 960, size: 56, ...MONO, color: TEAL });

    // ---- s3: reggaeton's dembow ----
    const s30 = S('s3').t0;
    const gS3 = row8(s30, S('s3').t1);
    groupNames(s30, S('s3').t1);
    k = 0;
    for (let t = s30; t + BAR <= S('s3').t1 + 0.05; t += BAR, k++) cycle(t, { grid: gS3, style: 'dembow', chord: k % 2 ? 'F' : 'Am', notes: k % 2 ? ['A3', 'C4', 'F4'] : ['A3', 'C4', 'E4'], strikes: [{ o: 0, v: 1 }], cv: 0.45, bass: k % 2 ? 'F2' : 'A2' });
    a.big('DEMBOW', s30 + 0.3, S('s3').t1, { y: 960, size: 80, ...MONO, color: GOLD });

    // ---- part 2: one groove from why1 to the end ----
    const p2 = S('why1').t0, p2end = S('essence').t1 - 1.8;
    const gT = row8(p2, S('why3').t1, { y: 520 });
    const gB = row4(S('why2').t0, S('why3').t1);
    const PROG2 = ['Am', 'Dm', 'F', 'E7'];
    let r = 0, tEnd = p2;
    const gE = row8(S('trip').t0, S('essence').t1, { y: 520, chh: 140 });
    const gridAt = t => (t < S('trip').t0 ? gT : gE);
    for (let t = p2; t + BAR <= p2end + 0.05; t += BAR, r++) {
      const beat = t >= S('why2').t0 - 0.05 && t < S('why3').t1 - 0.05;
      cycle(t, { grid: gridAt, beatGrid: beat ? gB : null, beat, vel: 0.8, chord: PROG2[r % 4], bass: PROG2[r % 4][0] + '2', cv: 0.5 });
      tEnd = t + BAR;
    }
    // why1: 3 + 3 + 2 = 8, group by group on the words
    const W1 = [a.w('why1', 'Three'), a.w('why1', 'three', 0), a.w('why1', 'two'), a.w('why1', 'eight'), S('why1').t1];
    ['3', '3 + 3', '3 + 3 + 2', '3 + 3 + 2 = 8'].forEach((txt, i) =>
      a.big(txt, W1[i], W1[i + 1], { y: 900, size: 100, ...MONO, color: i === 3 ? GOLD : '#ffffff' }));
    a.big('FOUR EVEN STEPS', a.w('why2', 'four'), S('why2').t1, { y: 1050, size: 44, ...MONO, color: BLUE, blur: 12 });
    // why3: the push on pulse 4 falls between beats, the landing on one
    const tPush = a.w('why3', 'pushes'), tLand = a.w('why3', 'lands');
    a.big('PUSH', tPush, S('why3').t1, { x: 540 - 488 + 61 + 122 * 3, y: 1040, size: 40, ...MONO, color: RED, blur: 12 });
    a.big('LAND', tLand, S('why3').t1, { x: 540 - 488 + 61, y: 1040, size: 40, ...MONO, color: GOLD, blur: 12 });
    a.big('TENSION', a.w('why4', 'Tension'), S('why3').t1, { x: 330, y: 1110, size: 40, ...MONO, color: RED, blur: 12 });
    a.big('RELEASE', a.w('why4', 'release'), S('why3').t1, { x: 750, y: 1110, size: 40, ...MONO, color: GOLD, blur: 12 });

    // trip: Africa -> Cuba -> habanera -> tango -> rock and roll -> pop
    const STOPS = [['AFRICA', 'Africa'], ['CUBA', 'Cuba'], ['HABANERA', 'habanera'], ['TANGO', 'tango'], ["ROCK 'N' ROLL", 'rock'], ['POP', 'pop']];
    const gJ = a.grid(STOPS.map(([l], i) => ({ label: l, size: l.length > 8 ? 30 : 38, sub: String(i + 1), color: GCOL[i % 3] })), S('trip').t0, S('trip').t1,
      { rows: 2, cols: 3, cw: 320, chh: 150, y: 720, revealStep: 0.08 });
    STOPS.forEach(([, w], i) => gJ.active.push({ t0: a.w('trip', w), t1: S('trip').t1, i }));

    // essence
    a.big('3 + 3 + 2', a.at('essence'), S('essence').t1, { y: 900, size: 120, ...MONO, color: GOLD });
    a.perc('kick', tEnd, 1);
    gE.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('Am', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4'], bass: 'A1', vel: 0.8, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
