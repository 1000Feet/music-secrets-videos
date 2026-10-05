// Learn every interval with famous songs: the first two (or three) notes of each tune.
// Copyrighted tunes (Jaws, Maria, Over the Rainbow): only the two notes of the interval itself.
module.exports = {
  slug: 'interval-songs',
  title: 'Intervals by Song',
  segments: [
    { id: 'hook',    text: "Can't tell intervals apart? Learn them with songs you already know." },
    { id: 'what',    text: 'Listen to the first two notes, and count the half steps.' },
    { id: 'm2',      text: 'One half step: the Jaws theme.' },
    { id: 'M2',      text: 'Two: Happy Birthday.' },
    { id: 'm3',      text: 'Three, a minor third: Greensleeves.' },
    { id: 'M3',      text: 'Four, a major third: When the Saints Go Marching In.' },
    { id: 'P4',      text: 'Five, a perfect fourth: Here Comes the Bride.' },
    { id: 'TT',      text: 'Six, the tritone: Maria, from West Side Story.' },
    { id: 'P5',      text: 'Seven, a perfect fifth: Twinkle Twinkle.' },
    { id: 'M6',      text: 'Nine, a major sixth: My Bonnie.' },
    { id: 'P8',      text: 'Twelve, the octave: Somewhere Over the Rainbow.' },
    { id: 'why1',    text: 'So why does this work? Each interval is a fixed distance, whatever note you start on.' },
    { id: 'why2',    text: 'Small steps move a melody along. Big leaps make dramatic openings.' },
    { id: 'why2b',   text: "That's why so many anthems open with a leap." },
    { id: 'why3',    text: 'And you remember the distances, not the exact notes.' },
    { id: 'why3b',   text: 'So you can sing Happy Birthday starting anywhere.' },
    { id: 'why4',    text: 'Musicians use exactly this trick for ear training.' },
    { id: 'essence', text: 'Every melody is a chain of distances. Learn a few songs, and you can hear them all.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EAR TRAINING CHEAT SHEET', title: 'INTERVALS BY SONG', accent: true, circle: false, min: 5.0, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'THE FIRST TWO NOTES', title: 'COUNT HALF STEPS', tonic: 0, tail: 0.3 },
    { id: 'm2', segs: ['m2'], label: 'MINOR 2ND · 1 HALF STEP', title: 'Jaws', sub: 'John Williams · 1975', tonic: 4, tail: 1.5 },
    { id: 'M2', segs: ['M2'], label: 'MAJOR 2ND · 2 HALF STEPS', title: 'Happy Birthday', sub: 'Hap-py BIRTH-', tonic: 7, tail: 1.25 },
    { id: 'm3', segs: ['m3'], label: 'MINOR 3RD · 3 HALF STEPS', title: 'Greensleeves', sub: 'Traditional · A-las', tonic: 9, tail: 1.25 },
    { id: 'M3', segs: ['M3'], label: 'MAJOR 3RD · 4 HALF STEPS', title: 'When the Saints', sub: 'Traditional · Oh when', tonic: 0, tail: 1.2 },
    { id: 'P4', segs: ['P4'], label: 'PERFECT 4TH · 5 HALF STEPS', title: 'Here Comes the Bride', sub: 'Wagner · Bridal Chorus · 1850', tonic: 7, tail: 1.4 },
    { id: 'TT', segs: ['TT'], label: 'TRITONE · 6 HALF STEPS', title: 'Maria', sub: 'West Side Story · 1957', tonic: 0, tail: 1.25 },
    { id: 'P5', segs: ['P5'], label: 'PERFECT 5TH · 7 HALF STEPS', title: 'Twinkle Twinkle', sub: 'Traditional', tonic: 0, tail: 1.3 },
    { id: 'M6', segs: ['M6'], label: 'MAJOR 6TH · 9 HALF STEPS', title: 'My Bonnie', sub: 'Traditional · My Bon-', tonic: 7, tail: 1.25 },
    { id: 'P8', segs: ['P8'], label: 'OCTAVE · 12 HALF STEPS', title: 'Over the Rainbow', sub: '1939 · Some-where', tonic: 0, tail: 1.5 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'FIXED DISTANCES', tonic: 0, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'STEPS AND LEAPS', tonic: 0, gap: 0.3, tail: 0.6 },
    { id: 'why3', segs: ['why3', 'why3b'], gap: 0.2, label: 'WHY IT WORKS', title: 'RELATIVE MEMORY', tonic: 7, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'EAR TRAINING', circle: false, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A CHAIN OF DISTANCES', accent: true, tonic: 0, gap: 0.4, tail: 1.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const MONO = { family: 'DM Mono', weight: 500 };
    const T = a.T;
    const pcOf = n => n.replace(/-?\d/, '');
    // the cheat sheet: interval, half steps, song, colour, first notes [[note, beats]], beat seconds
    const IV = [
      { id: 'm2', iv: 'm2', n: 1, song: 'JAWS', col: '#ff5d6c', notes: [['E2', 1], ['F2', 1], ['E2', 1], ['F2', 1]], beat: 0.32 },
      { id: 'M2', iv: 'M2', n: 2, song: 'HAPPY B-DAY', col: '#ff8f6e', notes: [['G4', 0.75], ['G4', 0.25], ['A4', 1.5]], beat: 0.45 },
      { id: 'm3', iv: 'm3', n: 3, song: 'GREENSLEEVES', col: '#ffc04f', notes: [['A4', 1], ['C5', 2]], beat: 0.4 },
      { id: 'M3', iv: 'M3', n: 4, song: 'THE SAINTS', col: '#ffd84a', notes: [['C4', 1], ['E4', 2]], beat: 0.4 },
      { id: 'P4', iv: 'P4', n: 5, song: 'THE BRIDE', col: '#7be07b', notes: [['D4', 1], ['G4', 0.75], ['G4', 0.25], ['G4', 1.5]], beat: 0.48 },
      { id: 'TT', iv: 'TT', n: 6, song: 'MARIA', col: '#4fdcaa', notes: [['C4', 1], ['F#4', 2]], beat: 0.42 },
      { id: 'P5', iv: 'P5', n: 7, song: 'TWINKLE', col: '#45d6c8', notes: [['C4', 1], ['C4', 1], ['G4', 2]], beat: 0.4 },
      { id: 'M6', iv: 'M6', n: 9, song: 'MY BONNIE', col: '#62a8ff', notes: [['G4', 1], ['E5', 2]], beat: 0.45 },
      { id: 'P8', iv: 'OCT', n: 12, song: 'RAINBOW', col: '#b48cff', notes: [['C4', 2], ['C5', 2]], beat: 0.42 },
    ];
    const cells = IV.map(v => ({ label: v.iv, sub: v.song, color: v.col, size: 56, subSize: 26 }));
    const sheet = (t0, t1, o = {}) => a.grid(cells, t0, t1, { rows: 3, cols: 3, cw: 320, chh: 175, y: o.y ?? 545, revealStep: o.revealStep, caption: o.caption });
    // play the first notes of a tune; returns the time the second (different) note sounds
    const play = (v, t0, o = {}) => {
      let t = t0, second = null;
      const first = v.notes[0][0];
      v.notes.forEach(([n, b]) => {
        a.note(n, t, b * v.beat * 0.95, { vel: o.vel ?? 0.42, show: o.show ?? true });
        if (v.id === 'm2') a.note(n.replace('2', '3'), t, b * v.beat * 0.95, { vel: 0.18, show: false });
        if (second === null && n !== first) second = t;
        t += b * v.beat;
      });
      return { second, end: t };
    };

    // ---------- hook: the cheat sheet, every interval in turn ----------
    const h1 = S('hook').t1;
    const g0 = sheet(0, h1);
    const hs = (h1 - 0.5) / 9;
    IV.forEach((v, i) => {
      const t = 0.3 + i * hs;
      const lo = v.notes[0][0], hi = v.notes.find(([n]) => n !== lo)[0];
      a.note(lo, t, hs * 0.45, { vel: 0.32, show: false }); a.note(hi, t + hs * 0.45, hs * 0.6, { vel: 0.34, show: false });
      g0.active.push({ t0: t, t1: t + hs, i });
    });

    // ---------- what: first two notes, count the half steps ----------
    const w0 = S('what').t0, tCount = a.w('what', 'count');
    a.scale(w0, 'C', [0, 4]);
    a.note('C4', a.w('what', 'two') - 0.05, 0.6, { vel: 0.38 }); a.note('E4', a.w('what', 'notes') - 0.05, 0.9, { vel: 0.38 });
    const steps = [[tCount, 0]];
    for (let i = 1; i <= 4; i++) steps.push([tCount + 0.15 + i * 0.25, i]);
    a.walker(steps, { t1: S('what').t1, color: '#ffffff', dr: 0 });
    steps.slice(1).forEach(([t, p]) => a.note(60 + p, t, 0.22, { vel: 0.2, show: false }));
    a.arc('C', 'E', tCount + 0.2, S('what').t1, { steps: 4, color: '#ffd84a' });
    a.big('1 · 2 · 3 · 4', tCount + 0.4, S('what').t1, { y: 830, size: 50, ...MONO, color: '#ffd84a' });

    // ---------- the nine tunes ----------
    IV.forEach(v => {
      const sc = S(v.id), t0 = a.end(v.id) + 0.1;
      const lo = v.notes[0][0], hi = v.notes.find(([n]) => n !== lo)[0];
      a.scale(sc.t0, pcOf(lo), v.n === 12 ? [0] : [0, v.n]);
      a.note(T.midi(lo) - 12 >= 36 ? T.midi(lo) - 12 : T.midi(lo), sc.t0 + 0.1, t0 - sc.t0 - 0.1, { vel: 0.14, show: false });
      const r = play(v, t0 - 0.05);
      a.arc(pcOf(lo), pcOf(hi), r.second, sc.t1, { steps: v.n, color: v.col, dr: 30 });
      a.big(String(v.n), sc.t0 + 0.3, sc.t1, { y: 830, size: 150, color: v.col });
      a.big(v.n === 1 ? 'HALF STEP' : 'HALF STEPS', sc.t0 + 0.3, sc.t1, { y: 925, size: 30, ...MONO, color: '#b9b9c2', blur: 0 });
    });
    // spelling: Maria's F# (circle labels it F# already); Jaws plays its two notes again, faster
    const j = S('m2');

    // ---------- why1: nine arcs from C, then the same set from E and from A ----------
    const y0 = S('why1').t0, tAny = a.w('why1', 'whatever') - 0.05, tStart = a.w('why1', 'start') - 0.05, y1 = S('why1').t1;
    const set = (root, t0, t1, step = 0.12) => IV.forEach((v, i) => {
      a.arc(root, (T.pc(root) + v.n) % 12, t0 + i * step, t1, { steps: v.n, color: v.col, dr: 20 - i * 16 });
    });
    a.scale(y0, 'C', [0]);
    set('C', y0 + 0.2, tAny);
    a.note('C4', y0 + 0.2, 1.2, { vel: 0.3 });
    a.big('FROM C', y0 + 0.4, tAny, { y: 462, size: 46, ...MONO, color: '#ffffff' });
    a.scale(tAny, 'E', [0]);
    set('E', tAny, tStart + 0.3, 0.06);
    a.note('E4', tAny, 1.0, { vel: 0.3 });
    a.big('FROM E', tAny, tStart + 0.3, { y: 462, size: 46, ...MONO, color: '#ffffff' });
    a.scale(tStart + 0.3, 'A', [0]);
    set('A', tStart + 0.3, y1, 0.06);
    a.note('A3', tStart + 0.3, 1.0, { vel: 0.3 });
    a.big('FROM A · SAME SHAPES', tStart + 0.3, y1, { y: 462, size: 46, ...MONO, color: '#ffffff' });
    // a fifth from each start note
    [['C4', 'G4', y0 + 1.0], ['E4', 'B4', tAny + 0.6], ['A3', 'E4', tStart + 0.9]].forEach(([p, q, t]) => { a.note(p, t, 0.4, { vel: 0.3, show: false }); a.note(q, t + 0.4, 0.6, { vel: 0.3, show: false }); });

    // ---------- why2: small steps move, big leaps open ----------
    const s0 = S('why2').t0, tBig = a.w('why2', 'Big') - 0.05, tAnth = a.at('why2b') - 0.05;
    a.scale(s0, 'C', T.MAJOR);
    // an original stepwise line
    const STEP = ['C4', 'D4', 'E4', 'F4', 'E4', 'D4', 'E4', 'C4'];
    const sl = Math.min(0.32, (tBig - s0 - 0.3) / STEP.length);
    STEP.forEach((n, i) => a.note(n, s0 + 0.2 + i * sl, sl * 0.9, { vel: 0.34 }));
    a.walker(STEP.map((n, i) => [s0 + 0.2 + i * sl, pcOf(n)]), { t1: tBig, dr: -40, color: '#ff8f6e', label: 'STEPS', labelDr: -46 });
    a.big('SECONDS → MOVEMENT', a.w('why2', 'Small'), tBig, { y: 462, size: 44, ...MONO, color: '#ff8f6e' });
    // leaps: a sixth and an octave
    a.note('G3', tBig, 0.5, { vel: 0.36 }); a.note('E4', tBig + 0.5, 0.9, { vel: 0.38 });
    a.arc('G', 'E', tBig + 0.5, tAnth, { steps: 9, color: '#62a8ff', dr: 30 });
    a.note('C4', tBig + 1.6, 0.5, { vel: 0.36 }); a.note('C5', tBig + 2.1, 1.0, { vel: 0.4 });
    a.arc('C', 'C', tBig + 2.1, S('why2').t1, { steps: 12, color: '#b48cff', dr: 62 });
    a.big('SIXTHS · OCTAVES → DRAMA', tBig, S('why2').t1, { y: 462, size: 42, ...MONO, color: '#b48cff' });
    a.ch('C', tAnth, S('why2').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.6, shape: false, hideName: true });

    // ---------- why3: same distances from any start note (Happy Birthday's first three notes) ----------
    const r0 = S('why3').t0, tAnyw = a.w('why3b', 'anywhere') - 0.05, tSing = a.w('why3b', 'sing') - 0.05;
    const HB = (root, t, col) => {
      const m = T.midi(root);
      a.note(m, t, 0.3, { vel: 0.4 }); a.note(m, t + 0.34, 0.1, { vel: 0.36 }); a.note(m + 2, t + 0.45, 0.6, { vel: 0.4 });
      a.arc(root.replace(/\d/, ''), (T.pc(root.replace(/\d/, '')) + 2) % 12, t + 0.45, t + 1.6, { steps: 2, color: col, dr: 30 });
    };
    a.scale(r0, 'G', [0, 2]);
    HB('G4', r0 + 0.3, '#ff8f6e');
    a.big('DISTANCES, NOT NOTES', a.w('why3', 'distances'), tSing, { y: 462, size: 44, ...MONO, color: '#ffffff' });
    a.scale(tSing, 'C', [0, 2]); HB('C4', tSing, '#ff8f6e');
    a.scale(tSing + 0.95, 'E', [0, 2]); HB('E4', tSing + 0.95, '#ff8f6e');
    a.scale(tSing + 1.9, 'A', [0, 2]); HB('A3', tSing + 1.9, '#ff8f6e');
    a.big('ALWAYS +2', tSing, S('why3').t1, { y: 462, size: 50, ...MONO, color: '#ff8f6e' });

    // ---------- why4: ear training with the cheat sheet ----------
    const e0 = S('why4').t0, e1 = S('why4').t1;
    const g1 = sheet(e0, e1, { caption: 'EAR TRAINING' });
    const es = (e1 - e0 - 0.5) / 9;
    IV.forEach((v, i) => {
      const t = e0 + 0.3 + i * es;
      const lo = v.notes[0][0], hi = v.notes.find(([n]) => n !== lo)[0];
      a.note(lo, t, es * 0.45, { vel: 0.3, show: false }); a.note(hi, t + es * 0.45, es * 0.6, { vel: 0.32, show: false });
      g1.active.push({ t0: t, t1: t + es, i });
    });

    // ---------- essence: an original melody as a chain of distances ----------
    const q0 = S('essence').t0 + 0.2, q1 = S('essence').t1;
    a.scale(S('essence').t0, 'C', T.MAJOR);
    const MEL = [['C4', 0], ['G4', 7], ['E4', -3], ['F4', 1], ['A4', 4], ['G4', -2], ['C5', 5], ['C4', -12]];
    const ml = Math.min(0.7, (a.at('cta') - q0) / MEL.length);
    MEL.forEach(([n, d], i) => {
      const t = q0 + i * ml;
      a.note(n, t, ml * 0.95, { vel: 0.38 });
      if (i) a.arc(pcOf(MEL[i - 1][0]), pcOf(n), t, t + ml * 1.6, { steps: d, color: IV.find(v => v.n === Math.abs(d))?.col || '#ffffff', dr: 30 });
    });
    a.big('+7 · −3 · +1 · +4 · −2 · +5', q0 + ml, a.at('cta'), { y: 462, size: 40, ...MONO, color: '#ffffff' });
    const tEnd = q0 + MEL.length * ml;
    a.ch('C', tEnd, q1 + 0.1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.6, hideName: true });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
