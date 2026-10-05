// The Millennial Whoop: a melody bouncing between sol and mi, the fifth and the third.
// Copyrighted songs are not played: only an original wa-oh pattern (G-E in C) over I-V-vi-IV,
// plus the traditional playground chant (sol mi la sol mi).
const B = 0.5, BAR = 4 * B; // 120 BPM

module.exports = {
  slug: 'millennial-whoop',
  title: 'The Millennial Whoop',
  segments: [
    { id: 'hook',    text: 'Wa oh, wa oh. Two notes, bouncing back and forth... in a lot of pop hits.' },
    { id: 'what',    text: 'It jumps between the fifth and the third of the major scale: sol and mi.' },
    { id: 'what2',   text: "In C, that's G and E." },
    { id: 'name',    text: 'In 2016, Patrick Metzger gave it a name: the Millennial Whoop.' },
    { id: 'name2',   text: 'His article listed many pop hits of the 2000s and 2010s that use it.' },
    { id: 'chant',   text: "And it's older than pop. The same sol and mi make the playground chant." },
    { id: 'why1',    text: 'So why does it work? Sol down to mi is a falling minor third.' },
    { id: 'why1b',   text: 'And both notes belong to the home chord. No tension. Instantly singable.' },
    { id: 'why2',    text: "Kodály's method for teaching music starts children with exactly this interval..." },
    { id: 'why2b',   text: "because it's so easy to sing." },
    { id: 'why3',    text: 'Sing it on an open vowel, oh, and a whole stadium can join in.' },
    { id: 'why4',    text: 'And both notes fit many chords of a typical pop loop, so it can repeat all the way around.' },
    { id: 'essence', text: 'One simple interval, one open vowel... and a whole crowd can sing it.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'WA - OH - WA - OH', title: 'THE MILLENNIAL WHOOP', accent: true, tonic: 0, row: ['C', 'G', 'Am', 'F'], min: 3 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'TWO NOTES', title: 'SOL AND MI', tonic: 0, gap: 0.3, min: 4 * BAR, tail: 1.0 },
    { id: 'name', segs: ['name', 'name2'], label: 'NAMED IN 2016', title: 'THE MILLENNIAL WHOOP', sub: 'Patrick Metzger · 2016', tonic: 0, row: ['C', 'G', 'Am', 'F'], gap: 0.3, min: 6 * BAR, tail: 0.8 },
    { id: 'chant', segs: ['chant'], label: 'TRADITIONAL', title: 'THE PLAYGROUND CHANT', sub: 'sol · mi · la · sol · mi', tonic: 0, tail: 3.4 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'A FALLING THIRD', tonic: 0, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE FIRST INTERVAL', circle: false, gap: 0.2, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'AN OPEN VOWEL', circle: false, min: 4 * BAR + 0.2, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'FITS THE LOOP', tonic: 0, row: ['C', 'G', 'Am', 'F'], min: 5 * BAR + 0.4, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A WHOLE CROWD', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const V = {
      C: [['E3', 'G3', 'C4'], 'C2'], G: [['D3', 'G3', 'B3'], 'G1'], Am: [['E3', 'A3', 'C4'], 'A1'], F: [['F3', 'A3', 'C4'], 'F1'],
    };
    const LOOP = ['C', 'G', 'Am', 'F'];
    // one bar of a light pop groove under a chord
    function bar(name, t, o = {}) {
      const vel = o.vel ?? 1;
      a.ch(name, t, t + BAR, { notes: V[name][0], bass: V[name][1], row: o.row ?? null, vel: 0.5 * vel, hideName: o.hideName,
        strikes: [{ o: 0, v: 1 }, { o: 1.5 * B, v: 0.5 }, { o: 2 * B, v: 0.7 }, { o: 3.5 * B, v: 0.5 }] });
      if (o.drums === false) return;
      for (let i = 0; i < 4; i++) {
        const tb = t + i * B;
        a.perc(i % 2 ? 'snare' : 'kick', tb, (i % 2 ? 0.55 : 0.8) * vel);
        a.perc('hat', tb, 0.25 * vel); a.perc('hat', tb + B / 2, 0.18 * vel);
      }
    }
    // the original wa-oh pattern: G E G E, one bar
    const WHOOP = [['G4', 0.75], ['E4', 0.75], ['G4', 0.5], ['E4', 1.5], [null, 0.5]];
    const whoop = (t, vel = 0.42) => a.melody(WHOOP, t, B, { vel, legato: 0.9 });
    // a loop of bars from t0 while it fits before t1
    const loop = (t0, t1, f, fill = true) => {
      let t = t0, n = 0; for (; t + BAR <= t1 + 0.05; t += BAR, n++) f(t, n);
      if (fill && t1 - t > 0.3) { a.ch('C', t, t1, { notes: V.C[0], bass: V.C[1], vel: 0.4, hideName: true }); a.perc('kick', t, 0.6); }
      return t;
    };
    const sol = (t0, t1, o = {}) => a.tag('G', t0, t1, 'SOL', { color: '#45d6c8', dr: o.dr ?? -92 });
    const mi = (t0, t1, o = {}) => a.tag('E', t0, t1, 'MI', { color: '#ffd84a', dr: o.dr ?? -92 });

    // ---- hook: the whoop over I V vi IV ----
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const h0 = 0.3;
    loop(h0, S('hook').t1, (t, n) => { bar(LOOP[n % 4], t, { row: n % 4, hideName: true }); whoop(t); });
    sol(0.35, S('hook').t1); mi(0.35, S('hook').t1);
    a.arc('G', 'E', 0.4, S('hook').t1, { steps: -3, color: GOLD, dr: 30 });

    // ---- what: fifth and third of C major ----
    const w0 = S('what').t0, tFifth = a.w('what', 'fifth'), tThird = a.w('what', 'third');
    a.ch('C', w0 + 0.05, S('what').t1, { notes: ['C3', 'E3', 'G3'], bass: 'C2', vel: 0.45, strikes: [{ o: 0, v: 1 }, { o: BAR, v: 0.7 }, { o: 2 * BAR, v: 0.7 }, { o: 3 * BAR, v: 0.7 }] });
    a.note('G4', tFifth, 0.7, { vel: 0.4 }); a.note('E4', tThird, 0.7, { vel: 0.4 });
    a.tag('G', tFifth, a.w('what', 'sol'), '5TH', { color: TEAL, dr: -92 });
    a.tag('E', tThird, a.w('what', 'mi'), '3RD', { color: '#ffd84a', dr: -92 });
    sol(a.w('what', 'sol'), S('what').t1); mi(a.w('what', 'mi'), S('what').t1);
    a.note('G4', a.w('what', 'sol'), 0.4, { vel: 0.38 }); a.note('E4', a.w('what', 'mi'), 0.6, { vel: 0.38 });
    const tG = a.w('what2', 'G'), tE = a.w('what2', 'E');
    a.note('G4', tG, 0.4, { vel: 0.4 }); a.note('E4', tE, 0.6, { vel: 0.4 });
    a.big('SOL = G   ·   MI = E', tG, S('what').t1, { ...TOP, color: GOLD });
    a.big('5TH  ·  3RD', tFifth, tG, { ...TOP, color: '#ffffff' });

    // ---- name: the whoop named, groove plays on ----
    const n0 = S('name').t0 + 0.1;
    loop(n0, S('name').t1, (t, n) => { bar(LOOP[n % 4], t, { row: n % 4, hideName: true }); whoop(t); });
    sol(n0, S('name').t1); mi(n0, S('name').t1);
    a.arc('G', 'E', n0, S('name').t1, { steps: -3, color: GOLD, dr: 30 });
    a.big('2000s · 2010s POP', a.w('name2', 'pop'), S('name').t1, { y: 1150, size: 34, ...MONO, color: TEAL, blur: 8 });

    // ---- chant: the traditional sol mi la sol mi (public domain) ----
    const c0 = S('chant').t0, tCh = a.w('chant', 'playground');
    a.ch('C', c0 + 0.05, S('chant').t1 - 0.1, { notes: ['C3', 'E3', 'G3'], bass: 'C2', vel: 0.3, strikes: [{ o: 0, v: 1 }, { o: 2 * BAR, v: 0.6 }] });
    sol(a.w('chant', 'sol'), S('chant').t1); mi(a.w('chant', 'mi'), S('chant').t1);
    a.tag('A', tCh, S('chant').t1, 'LA', { color: BLUE, dr: -92 });
    const CHANT = [['G4', 1], ['E4', 1], ['A4', 0.5], ['G4', 0.5], ['E4', 1]];
    let tc = a.melody(CHANT, tCh, 0.42, { vel: 0.45 });
    tc = a.melody(CHANT, tc + 0.42, 0.42, { vel: 0.45 });
    a.big('SOL  MI  LA  SOL  MI', tCh, S('chant').t1, { ...TOP, color: GOLD });

    // ---- why1: a falling minor third, both notes in the home chord ----
    const y0 = S('why1').t0, tFall = a.w('why1', 'falling'), tHome = a.w('why1b', 'home');
    a.ch('C', y0 + 0.05, S('why1').t1 - 0.1, { notes: ['C3', 'E3', 'G3'], bass: 'C2', vel: 0.4, hideName: true, strikes: [{ o: 0, v: 1 }, { o: BAR, v: 0.6 }, { o: 2 * BAR, v: 0.6 }, { o: 3 * BAR, v: 0.6 }, { o: 4 * BAR, v: 0.6 }] });
    sol(y0 + 0.1, S('why1').t1); mi(y0 + 0.1, S('why1').t1);
    a.note('G4', a.w('why1', 'Sol'), 0.5, { vel: 0.42 }); a.note('E4', a.w('why1', 'mi'), 0.8, { vel: 0.42 });
    a.arc('G', 'E', tFall, S('why1').t1, { steps: -3, color: GOLD, dr: 30 });
    a.note('G4', tFall + 0.3, 0.4, { vel: 0.4 }); a.note('E4', tFall + 0.75, 0.8, { vel: 0.4 });
    a.big('MINOR 3RD · 3 HALF STEPS', tFall, tHome, { ...TOP, color: GOLD });
    a.ring(['C', 'E', 'G'], tHome, S('why1').t1, { color: PINK });
    a.big('C · E · G = HOME CHORD', tHome, S('why1').t1, { ...TOP, color: PINK });
    a.ghost('C', tHome, S('why1').t1, { color: PINK });
    whoop(a.w('why1b', 'Instantly'), 0.4);

    // ---- why2: Kodály starts children with sol-mi ----
    const k0 = S('why2').t0, k1 = S('why2').t1;
    const gK = a.grid([{ label: 'SOL', sub: 'G', subSize: 36, color: TEAL, size: 80 }, { label: 'MI', sub: 'E', subSize: 36, color: '#ffd84a', size: 80 }], k0, k1, { rows: 1, cols: 2, cw: 360, chh: 300, y: 560 });
    a.big("KODÁLY'S FIRST STEP", a.w('why2', 'starts'), k1, { y: 980, size: 50, ...MONO, color: GOLD });
    a.big('EASY TO SING', a.w('why2b', 'easy'), k1, { y: 1070, size: 40, ...MONO, color: '#ffffff', blur: 10 });
    // a teacher's call and a child's echo: sol mi sol sol mi, slow and simple
    const KM = [['G4', 1], ['E4', 1], ['G4', 0.5], ['G4', 0.5], ['E4', 1], [null, 1]];
    let tk = k0 + 0.3, kk = 0;
    while (tk + 5 * 0.45 < k1) {
      let tt = tk;
      for (const [n, b] of KM) { if (n) { a.note(n, tt, b * 0.45 * 0.9, { vel: kk % 2 ? 0.3 : 0.4, show: false }); gK.active.push({ t0: tt, t1: tt + b * 0.45, i: n === 'G4' ? 0 : 1 }); } tt += b * 0.45; }
      tk = tt; kk++;
    }
    a.ch('C', k0 + 0.1, k1 - 0.1, { notes: ['C3', 'E3', 'G3'], bass: 'C2', vel: 0.25, shape: false, hideName: true });

    // ---- why3: an open vowel, a crowd joining in ----
    const s0 = S('why3').t0, s1 = S('why3').t1, tOh = a.w('why3', 'oh'), tSt = a.w('why3', 'stadium');
    const CROWD = [...Array(12)].map((_, i) => ({ label: i % 2 ? 'OH' : 'WA', color: i % 2 ? '#ffd84a' : TEAL, size: 52 }));
    const gC = a.grid(CROWD, s0, s1, { rows: 3, cols: 4, cw: 220, chh: 140, y: 520 });
    const tLoop = loop(s0 + 0.1, s1, (t, n) => {
      bar(LOOP[n % 4], t, { hideName: true, vel: 0.9 });
      whoop(t, 0.45); whoop(t + 0.004, 0.18); // a doubled voice, like a crowd
      let tt = t;
      WHOOP.forEach(([n2, b], j) => {
        if (n2) {
          const lit = Math.min(12, 4 * (n + 1));
          for (let i = 0; i < lit; i++) if ((i % 2 === 0) === (n2 === 'G4')) gC.active.push({ t0: tt, t1: tt + b * B, i });
        }
        tt += b * B;
      });
    });
    a.big('"OH"', tOh, s1, { y: 1060, size: 64, ...MONO, color: GOLD });

    // ---- why4: G and E over the loop ----
    const f0 = S('why4').t0 + 0.1;
    const IN = { C: ['G', 'E'], G: ['G'], Am: ['E'], F: [] };
    loop(f0, S('why4').t1, (t, n) => {
      const c = LOOP[n % 4];
      bar(c, t, { row: n % 4 });
      whoop(t, 0.4);
      IN[c].forEach(p => a.ring([p], t, t + BAR, { color: p === 'G' ? TEAL : '#ffd84a' }));
    });
    sol(f0, S('why4').t1, { dr: -75 }); mi(f0, S('why4').t1, { dr: -75 });
    a.big('REPEAT ALL THE WAY AROUND', a.w('why4', 'repeat'), S('why4').t1, { y: 1150, size: 32, ...MONO, color: GOLD, blur: 8 });

    // ---- essence: the whoop once more, landing on the home chord ----
    const e0 = S('essence').t0 + 0.1, eL = a.at('cta') - 0.2;
    const tEnd = loop(e0, eL, (t, n) => { bar(LOOP[n % 4], t, { hideName: true }); whoop(t, 0.42); }, false);
    sol(e0, S('essence').t1); mi(e0, S('essence').t1);
    a.arc('G', 'E', e0, S('essence').t1, { steps: -3, color: GOLD, dr: 30 });
    a.ch('C', tEnd, S('essence').t1 - 0.3, { notes: ['C3', 'E3', 'G3', 'C4'], bass: 'C2', vel: 0.6 });
    a.note('G4', tEnd, 0.5, { vel: 0.4 }); a.note('E4', tEnd + 0.5, 1.6, { vel: 0.4 });
    a.perc('kick', tEnd, 0.8);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
