// Ode to Joy, decoded: five neighbouring notes, even steps, plain beats and one early note.
module.exports = {
  slug: 'ode-to-joy',
  title: 'Ode to Joy, Decoded',
  segments: [
    { id: 'hook',     text: 'One of the most famous melodies ever written uses just five neighboring notes.' },
    { id: 'what',     text: "It's Ode to Joy, from the finale of Beethoven's Ninth Symphony." },
    { id: 'what2',    text: 'It premiered in Vienna in 1824, when Beethoven was almost completely deaf.' },
    { id: 'play',     text: "Here's how it goes." },
    { id: 'eu',       text: 'Since 1985, it has also been the anthem of the European Union.' },
    { id: 'eu2',      text: 'The Council of Europe adopted it first, in 1972.' },
    { id: 'why1',     text: 'So why does it work? Almost every note moves by step to the next.' },
    { id: 'why2',     text: 'The first phrase stays within five notes, from D up to A.' },
    { id: 'why2b',    text: 'No big leaps, no high notes. Anyone can sing it.' },
    { id: 'why3',     text: 'The rhythm is plain, too: steady, even quarter notes.' },
    { id: 'why4',     text: 'Its one surprise comes later: a note that arrives a beat too soon.' },
    { id: 'why4b',    text: 'That little push against the beat is called syncopation.' },
    { id: 'why5',     text: "Simple and singable means universal. That's why it works as an anthem." },
    { id: 'essence',  text: 'Five neighboring notes, even beats, one small surprise.' },
    { id: 'essence2', text: 'Greatness can be very simple.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'ODE TO JOY', accent: true, tonic: 2, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'SYMPHONY NO. 9 · FINALE', title: 'ODE TO JOY', sub: 'Ludwig van Beethoven', tonic: 2, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'THE PREMIERE', title: 'VIENNA, 1824', tonic: 2, circle: false, tail: 0.4 },
    { id: 'play', segs: ['play'], label: 'THE MELODY', title: 'ODE TO JOY', sub: 'Beethoven · 1824 · in D', tonic: 2, tail: 11.6 },
    { id: 'eu', segs: ['eu', 'eu2'], label: 'SINCE 1985', title: 'THE EU ANTHEM', tonic: 2, circle: false, gap: 0.3, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'STEP BY STEP', tonic: 2, tail: 1.7 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'FIVE NOTES', tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'THE RHYTHM', title: 'EVEN BEATS', tonic: 2, circle: false, tail: 2.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'THE ONE SURPRISE', title: 'TOO SOON', tonic: 2, circle: false, gap: 0.3, tail: 3.9 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'UNIVERSAL', tonic: 2, circle: false, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'SIMPLE IS GREAT', accent: true, tonic: 2, gap: 0.4, tail: 1.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    const FIVE = [0, 2, 4, 5, 7]; // D E F# G A
    const pcOf = n => n.replace(/-?\d/, '');
    const Q = ['F#4', 'F#4', 'G4', 'A4', 'A4', 'G4', 'F#4', 'E4', 'D4', 'D4', 'E4', 'F#4'].map(n => [n, 1]);
    const A1 = [...Q, ['F#4', 1.5], ['E4', 0.5], ['E4', 2]];
    const A2 = [...Q, ['E4', 1.5], ['D4', 0.5], ['D4', 2]];
    // play a melody and return walker points
    const mel = (list, t0, beat, vel = 0.4, show = true) => {
      const pts = []; let t = t0;
      for (const [n, b] of list) { a.note(n, t, b * beat * 0.95, { vel, show }); pts.push([t, pcOf(n)]); t += b * beat; }
      return { pts, end: t };
    };
    // soft low chords under the melody, one per bar (4 beats)
    const LOW = { D: ['A2', 'D3', 'F#3'], A: ['C#3', 'E3', 'A3'] };
    const LB = { D: 'D2', A: 'A2' };
    const bars = (names, t0, beat, o = {}) => names.forEach((c, i) => {
      const [nm, len] = Array.isArray(c) ? c : [c, 4];
      const st = names.slice(0, i).reduce((s, x) => s + (Array.isArray(x) ? x[1] : 4), 0);
      a.ch(nm, t0 + st * beat, t0 + (st + len) * beat, { notes: o.notes ? o.notes[nm] : LOW[nm], bass: LB[nm], vel: o.vel ?? 0.45, hideName: o.hideName, shape: o.shape, mute: o.mute });
    });
    const H1 = ['D', 'A', 'D', 'A'], H2 = ['D', 'A', 'D', ['A', 2], ['D', 2]];

    // hook: the first phrase, five dots popping in
    a.scale(0.2, 'D', FIVE, { popIn: { t0: 0.3, step: 0.18 } });
    const hb = 0.36, h0 = 0.6;
    const hp = mel(A1.slice(0, 9), h0, hb, 0.36);
    a.walker(hp.pts, { t1: S('hook').t1, dr: -40, color: TEAL });
    bars(['D', 'A'], h0, hb, { vel: 0.35, hideName: true });
    a.ch('D', h0 + 8 * hb, S('hook').t1, { notes: ['D4', 'E4', 'F#4', 'G4', 'A4'], bass: false, mute: true, label: '5 NOTES' });
    LOW.D.forEach(n => a.note(n, h0 + 8 * hb, 1.8, { vel: 0.14, show: false })); a.note('D2', h0 + 8 * hb, 1.8, { vel: 0.25, show: false });
    a.note('D4', h0 + 8 * hb, 1.4, { vel: 0.36, show: false });

    // what: Beethoven's Ninth
    const tN = a.w('what', 'Ninth') - 0.05;
    a.ch('D', S('what').t0 + 0.1, S('what').t1, { notes: ['D3', 'A3', 'D4', 'F#4'], bass: 'D2', vel: 0.6, hideName: true, strikes: [{ o: 0, v: 1 }, { o: tN - S('what').t0 - 0.1, v: 0.9 }] });
    a.big('Nº 9', tN, S('what').t1, { y: 830, size: 120, color: '#ffffff' });

    // what2: Vienna 1824, almost deaf (the music muffled, far away)
    const g2 = a.grid([{ label: 'VIENNA', sub: 'PREMIERE', size: 64, color: '#62a8ff' }, { label: '1824', sub: 'YEAR', size: 80, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 400, chh: 220, y: 600, revealStep: 0.25 });
    g2.active.push({ t0: a.w('what2', 'Vienna') - 0.05, t1: a.w('what2', '1824') - 0.05, i: 0 }, { t0: a.w('what2', '1824') - 0.05, t1: S('what2').t1, i: 1 });
    a.big('ALMOST', a.w('what2', 'almost'), S('what2').t1, { y: 960, size: 56, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 });
    a.big('COMPLETELY DEAF', a.w('what2', 'almost'), S('what2').t1, { y: 1040, size: 72, color: RED });
    mel(A1.slice(0, 9), S('what2').t0 + 0.3, 0.42, 0.07, false);
    a.note('D3', S('what2').t0 + 0.3, 3.6, { vel: 0.07, show: false });

    // play: the whole tune (A + A'), in D, with soft chords
    const pb = 0.35, p0 = a.end('play') + 0.3;
    const pa = mel(A1, p0, pb, 0.42);
    const pa2 = mel(A2, pa.end, pb, 0.42);
    bars([...H1, ...H2], p0, pb);
    a.walker([...pa.pts, ...pa2.pts], { t1: S('play').t1, dr: -40, color: TEAL });

    // eu: 1972 Council of Europe, 1985 European Union (the melody as soft block chords)
    const g3 = a.grid([{ label: '1972', sub: 'COUNCIL OF EUROPE', size: 80, color: '#8d98ff' }, { label: '1985', sub: 'EUROPEAN UNION', size: 80, color: GOLD }],
      S('eu').t0 + 0.1, S('eu').t1, { rows: 1, cols: 2, cw: 440, chh: 230, y: 640, revealStep: 0.25 });
    g3.active.push({ t0: a.w('eu', '1985') - 0.05, t1: a.at('eu2'), i: 1 }, { t0: a.w('eu2', 'Council') - 0.05, t1: a.w('eu2', '1972') - 0.05, i: 0 },
      { t0: a.w('eu2', '1972') - 0.05, t1: S('eu').t1, i: 0 });
    for (let k = 0; k < 12; k++) {
      const an = (k / 12) * Math.PI * 2 - Math.PI / 2;
      a.big('★', a.w('eu', 'European') + k * 0.06, S('eu').t1, { x: 540 + Math.cos(an) * 115, y: 1045 + Math.sin(an) * 115, size: 40, color: GOLD, blur: 12 });
    }
    const e0 = S('eu').t0 + 0.2, eb = 0.42;
    mel(A1, e0, eb, 0.2, false);
    bars(H1, e0, eb, { vel: 0.4 });

    // why1: every move is a step (arcs light up between neighbours)
    const s0 = S('why1').t0 + 0.5, sb = 0.38;
    const sp = mel(A1.slice(0, 13), s0, sb, 0.4);
    sp.pts.forEach(([t, p], i) => {
      if (!i) return;
      const prev = sp.pts[i - 1][1];
      if (prev !== p) a.arc(prev, p, t, t + 0.75, { color: GOLD, dr: 30 });
    });
    a.walker(sp.pts, { t1: S('why1').t1, dr: -40, color: TEAL });
    a.tag(0, s0 + 0.2, S('why1').t1, 'ONE STEP AT A TIME', { x: 540, y: 455, color: GOLD });
    bars(['D', 'A', 'D'], s0, sb, { vel: 0.35, hideName: true });
    a.ch('A', s0 + 12 * sb, S('why1').t1, { notes: LOW.A, bass: 'A2', vel: 0.35, hideName: true });

    // why2: five notes, D to A
    const tFive = a.w('why2', 'five'), tD = a.w('why2', 'D'), tA = a.w('why2', 'A');
    a.ring(['D'], tD, tA, { color: GOLD });
    a.ring(['D', 'E', 'F#', 'G', 'A'], tA, a.at('why2b'), { color: GOLD });
    a.note('D4', tD, 0.5, { vel: 0.32 }); a.note('A4', tA, 0.8, { vel: 0.32 });
    ['D4', 'E4', 'F#4', 'G4', 'A4'].forEach((n, i) => a.note(n, tFive + i * 0.16, 0.5, { vel: 0.26 }));
    a.ch('D', tFive, a.at('why2b'), { notes: ['D4', 'E4', 'F#4', 'G4', 'A4'], bass: false, mute: true, label: 'D – A' });
    a.arc('D', 'A', tA, S('why2').t1, { steps: 7, color: GOLD, dr: 34, label: '5 NOTES', labelR: 165 });
    const b0 = a.at('why2b') + 0.2, bb = 0.34, A2s = [...A2.slice(0, 8), ['D4', 2]];
    const bp = mel(A2s, b0, bb, 0.36);
    mel(A2s.map(([n, b]) => [n.replace('4', '3'), b]), b0, bb, 0.2, false);
    a.walker(bp.pts, { t1: S('why2').t1, dr: -40, color: TEAL });
    bars(['D', 'A', ['D', 2]], b0, bb, { vel: 0.35, hideName: true });
    a.tag(0, a.w('why2b', 'Anyone'), S('why2').t1, 'ANYONE CAN SING IT', { x: 540, y: 455, color: TEAL });

    // why3: one note per beat, a 3 x 4 grid of quarter notes
    const r0 = a.w('why3', 'steady') - 0.1, rb = 0.38;
    const g4 = a.grid(Q.map(([n]) => ({ label: pcOf(n), size: 58, color: a.T.DEG12[(a.T.pc(n) - 2 + 12) % 12] })), S('why3').t0 + 0.1, S('why3').t1,
      { rows: 3, cols: 4, cw: 200, chh: 150, y: 520, revealStep: 0.05, caption: 'ONE NOTE PER BEAT' });
    Q.forEach(([n], i) => { a.note(n, r0 + i * rb, rb * 0.9, { vel: 0.4, show: false }); a.perc('hat', r0 + i * rb, 0.5); g4.active.push({ t0: r0 + i * rb, t1: r0 + (i + 1) * rb, i }); });
    a.note('F#4', r0 + 12 * rb, rb * 1.4, { vel: 0.4, show: false });
    bars(['D', 'A', 'D'], r0, rb, { vel: 0.3, hideName: true });
    a.ch('D', S('why3').t0 + 0.1, r0, { notes: LOW.D, bass: 'D2', vel: 0.3, hideName: true });

    // why4: bars 12-13, the F# enters on beat 4 instead of beat 1
    const SY = [['D4', 1], ['E4', 1], ['A3', 1], ['F#4', 2], ['F#4', 1], ['G4', 1], ['A4', 1]];
    const cells = [['D', '1'], ['E', '2'], ['A', '3'], ['F#', '4'], ['~', '1'], ['F#', '2'], ['G', '3'], ['A', '4']];
    const g5 = a.grid(cells.map(([l, s], i) => ({ label: l, sub: s, size: 60, subSize: 32, color: i === 3 ? RED : i === 4 ? '#55555d' : '#62a8ff' })), S('why4').t0 + 0.1, S('why4').t1,
      { rows: 1, cols: 8, cw: 124, chh: 240, y: 620, revealStep: 0.06, caption: 'EXPECTED ON BEAT 1' });
    const yb = 0.42;
    const cellOf = [0, 1, 2, 3, 5, 6, 7];
    const playSync = t0 => {
      let t = t0;
      SY.forEach(([n, b], i) => {
        a.note(n, t, b * yb * 0.95, { vel: 0.4, show: false });
        g5.active.push({ t0: t, t1: t + b * yb, i: cellOf[i] });
        if (i === 3) g5.active.push({ t0: t + yb, t1: t + 2 * yb, i: 4 });
        t += b * yb;
      });
      for (let k = 0; k < 8; k++) a.perc(k % 4 === 0 ? 'kick' : 'hat', t0 + k * yb, k % 4 === 0 ? 0.6 : 0.4);
      a.ch('A', t0, t0 + 3 * yb, { notes: LOW.A, bass: 'A2', vel: 0.35, hideName: true });
      a.ch('D', t0 + 3 * yb, t0 + 8 * yb, { notes: LOW.D, bass: 'D2', vel: 0.35, hideName: true });
      return t;
    };
    playSync(a.w('why4', 'note') - 3 * yb - 0.1 > S('why4').t0 ? a.w('why4', 'note') - 3 * yb - 0.1 : S('why4').t0 + 0.3);
    playSync(a.end('why4b') + 0.3);
    a.big('TOO SOON!', a.w('why4', 'soon'), S('why4').t1, { y: 470, size: 64, color: RED });
    a.big('SYNCOPATION', a.w('why4b', 'syncopation'), S('why4').t1, { y: 1040, size: 72, family: 'DM Mono', weight: 500, color: GOLD });

    // why5: simple + singable = universal (the tune as a full anthem)
    const u0 = S('why5').t0 + 0.2, ub = 0.36;
    mel(A1, u0, ub, 0.3, false);
    mel(A1.map(([n, b]) => [n.replace('4', '5'), b]), u0, ub, 0.16, false);
    bars(H1, u0, ub, { vel: 0.6, notes: { D: ['D3', 'F#3', 'A3', 'D4'], A: ['C#3', 'E3', 'A3', 'C#4'] } });
    for (let k = 0; k < 4; k++) a.perc('kick', u0 + k * 4 * ub, 0.6);
    a.big('SIMPLE', a.w('why5', 'Simple'), S('why5').t1, { y: 560, size: 84, color: '#62a8ff' });
    a.big('+ SINGABLE', a.w('why5', 'singable'), S('why5').t1, { y: 680, size: 84, color: TEAL });
    a.big('= UNIVERSAL', a.w('why5', 'universal'), S('why5').t1, { y: 840, size: 96, color: GOLD });

    // essence: the second phrase, landing home on D
    a.scale(S('essence').t0, 'D', FIVE);
    const n0 = S('essence').t0 + 0.2, nb = 0.4;
    const np = mel(A2, n0, nb, 0.38);
    bars(H2, n0, nb, { vel: 0.45, hideName: true });
    a.walker(np.pts, { t1: np.end, dr: -40, color: TEAL });
    a.ch('D', np.end, S('essence').t1 - 0.3, { notes: ['D3', 'F#3', 'A3', 'D4'], bass: 'D2', vel: 0.7, label: 'D' });
    a.note('D4', np.end, 2.5, { vel: 0.3, show: false });
    a.ring(['D', 'E', 'F#', 'G', 'A'], a.w('essence', 'Five'), a.w('essence', 'even'), { color: GOLD });
    a.tag('D', np.end + 0.1, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
