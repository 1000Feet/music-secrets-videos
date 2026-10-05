// Mozart's Rondo alla turca: little turns that climb the A minor chord, and a piano playing a military band.
// Public domain (K. 331, 1784). The opening is played exactly as given in the brief, one octave lower so
// that every note stays on the on-screen keyboard (C2-G5). The A major "Janissary" passages are original chords.
const SX = 0.13, BAR = 8 * SX;   // quick even sixteenths, 2/4 bars
// the opening as given in the brief: [note, sixteenths]
const OPEN = [['B4', 1], ['A4', 1], ['G#4', 1], ['A4', 1], ['C5', 4],
  ['D5', 1], ['C5', 1], ['B4', 1], ['C5', 1], ['E5', 4],
  ['F5', 1], ['E5', 1], ['D#5', 1], ['E5', 1], ['B5', 1], ['A5', 1], ['G#5', 1], ['A5', 1],
  ['B5', 1], ['A5', 1], ['G#5', 1], ['A5', 1], ['C6', 4]];
const OPEN_LEN = 4 * BAR;

module.exports = {
  slug: 'turkish-march',
  title: 'The Turkish March',
  segments: [
    { id: 'hook',    text: 'A piano pretending to be a military band... and a tune that circles around itself.' },
    { id: 'what',    text: "It's the Rondo alla turca, from Mozart's Piano Sonata number eleven, published in 1784." },
    { id: 'what2',   text: 'It opens in A minor, in quick, even notes.' },
    { id: 'jan',     text: 'It imitates the Ottoman Janissary bands, fashionable in Vienna, with bass drums, cymbals and triangles.' },
    { id: 'why1',    text: 'So why does it stick? Each group circles one note: a step above, a half step below, and back.' },
    { id: 'why1b',   text: 'B, A, G sharp, A... then it lands on C.' },
    { id: 'why2',    text: 'These turns start on A, then C, then E. Together, they climb the A minor chord.' },
    { id: 'why2b',   text: 'An arpeggio in disguise.' },
    { id: 'why3',    text: 'The G sharp and D sharp are raised notes, pulling up into A and E. Leading tones.' },
    { id: 'why4',    text: 'In the A major section, the left hand plays rolled, crashing chords, like drums and cymbals.' },
    { id: 'why4b',   text: 'Some pianos of that era even had a Janissary pedal, with a drum or bells.' },
    { id: 'why5',    text: "And it's a rondo: the main theme keeps coming back between contrasting sections." },
    { id: 'essence', text: 'Little turns climbing a chord, and a piano playing soldier.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MOZART · K. 331', title: 'THE TURKISH MARCH', accent: true, tonic: 9, min: 0.4 + OPEN_LEN + 0.8, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'THIRD MOVEMENT', title: 'RONDO ALLA TURCA', sub: 'W. A. Mozart · 1784', circle: false, tonic: 9, tail: 0.4 },
    { id: 'what2', segs: ['what2'], label: 'THE OPENING', title: 'ALLA TURCA', sub: 'in A minor', tonic: 9, tail: 0.3 + OPEN_LEN + 0.6 },
    { id: 'jan', segs: ['jan'], label: 'THE JANISSARY BANDS', title: 'A MILITARY BAND', circle: false, tonic: 9, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE TURN', tonic: 9, gap: 0.3, tail: 1.2 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'CLIMBING A CHORD', tonic: 9, gap: 0.3, tail: 1.3 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'LEADING TONES', tonic: 9, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'THE A MAJOR SECTION', title: 'DRUMS AND CYMBALS', tonic: 9, tail: 1.0 },
    { id: 'why4b', segs: ['why4b'], label: 'PIANOS OF THE ERA', title: 'THE JANISSARY PEDAL', circle: false, tonic: 9, tail: 0.6 },
    { id: 'why5', segs: ['why5'], label: 'THE FORM', title: 'RONDO', circle: false, tonic: 9, min: 5 * BAR + 0.8, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A PIANO PLAYING SOLDIER', accent: true, tonic: 9, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const down = n => a.T.midi(n) - 12;
    const AMIN = [0, 2, 3, 5, 7, 8, 10, 11, 6]; // A minor + the raised G# and D#

    // the opening (an octave lower); returns walker points
    function opening(t0, o = {}) {
      let t = t0; const pts = [];
      const list = o.bars ? OPEN.slice(0, o.bars === 1 ? 5 : 10) : OPEN;
      for (const [n, s] of list) {
        a.note(down(n), t, s * SX * (s > 1 ? 0.9 : 0.85), { vel: o.vel ?? 0.42, show: o.show ?? true });
        pts.push([t, pcOf(n)]);
        t += s * SX;
      }
      return { pts, end: t };
    }
    // left hand: bass on the beat, chord on the off beat; one chord name per bar
    const LH = { Am: ['A2', ['C3', 'E3', 'A3']], E: ['E2', ['G#2', 'B2', 'E3']] };
    function lh(t0, bars, o = {}) {
      bars.forEach((c, b) => {
        const tb = t0 + b * BAR, [bs, ch] = LH[c];
        a.ch(c, tb, tb + BAR, { notes: ch, bass: false, vel: 0.5 * (o.vel ?? 1), hideName: o.hideName, strikes: [{ o: 2 * SX, v: 0.8 }, { o: 6 * SX, v: 0.7 }] });
        a.note(bs, tb, 1.6 * SX, { vel: 0.3 * (o.vel ?? 1), show: false });
        a.note(bs, tb + 4 * SX, 1.6 * SX, { vel: 0.26 * (o.vel ?? 1), show: false });
      });
      return t0 + bars.length * BAR;
    }
    const OPEN_LH = ['Am', 'Am', 'E', 'Am'];
    // a rolled, crashing A major chord with a drum hit (original texture)
    const ROLL = { A: ['A2', 'E3', 'A3', 'C#4', 'E4'], E: ['E2', 'B2', 'E3', 'G#3', 'B3'] };
    function crash(name, t, len, o = {}) {
      ROLL[name].forEach((n, j) => a.note(n, t + j * 0.028, len * 0.9, { vel: 0.26 * (o.vel ?? 1), show: false }));
      a.ch(name, t, t + len, { notes: ROLL[name].slice(1), bass: a.T.midi(ROLL[name][0]), mute: true, hideName: o.hideName });
      for (const n of ROLL[name]) a.note(n, t, 0.01, { vel: 0, show: true });
      a.perc('kick', t, 0.8 * (o.vel ?? 1)); a.perc('snare', t, 0.35 * (o.vel ?? 1)); a.perc('hat', t, 0.6 * (o.vel ?? 1));
    }
    function janissary(t0, t1, o = {}) {
      const seq = ['A', 'A', 'E', 'A'];
      let k = 0;
      for (let t = t0; t < t1 - 0.2; t += 2 * SX * 2, k++) crash(seq[Math.floor(k / 2) % 4], t, Math.min(4 * SX, t1 - t), o);
    }

    // ---------- hook: the opening on the circle ----------
    a.scale(0.1, 'A', a.T.MINOR, { popIn: { t0: 0.15, step: 0.05 } });
    const h0 = 0.4;
    const hp = opening(h0);
    a.walker(hp.pts, { t1: S('hook').t1, dr: -40, color: GOLD });
    const hEnd = lh(h0, OPEN_LH, { vel: 0.9 });
    a.ch('Am', hEnd, S('hook').t1 - 0.1, { notes: ['C3', 'E3', 'A3'], bass: 'A2', vel: 0.6 });
    a.tag(0, 0.3, S('hook').t1, 'ALLA TURCA', { x: 540, y: 470, color: GOLD });

    // ---------- what: number 11, K. 331, 1784 ----------
    const gW = a.grid([{ label: 'Nº 11', sub: 'PIANO SONATA', size: 64, color: BLUE }, { label: 'K. 331', sub: 'IN A MAJOR', size: 64, color: TEAL }, { label: '1784', sub: 'PUBLISHED', size: 64, color: GOLD }],
      S('what').t0 + 0.1, S('what').t1, { rows: 1, cols: 3, cw: 310, chh: 220, y: 580, revealStep: 0.15 });
    gW.active.push({ t0: a.w('what', 'eleven') - 0.1, t1: a.w('what', 'published') - 0.1, i: 0 }, { t0: a.w('what', 'eleven') - 0.1, t1: a.w('what', 'published') - 0.1, i: 1 },
      { t0: a.w('what', '1784') - 0.1, t1: S('what').t1, i: 2 });
    a.big('ALLA TURCA', a.w('what', 'turca'), S('what').t1, { y: 980, size: 84, color: GOLD });
    const wb = Math.floor((S('what').t1 - S('what').t0 - 0.1) / BAR);
    lh(S('what').t0 + 0.05, Array.from({ length: wb }, (_, i) => (i % 4 === 2 ? 'E' : 'Am')), { vel: 0.6, hideName: true });
    opening(S('what').t0 + 0.05, { vel: 0.22, show: false, bars: 2 });

    // ---------- what2: the opening, twice ----------
    a.scale(S('what2').t0, 'A', a.T.MINOR);
    a.tag(0, a.w('what2', 'quick'), S('what2').t1, 'QUICK, EVEN NOTES', { x: 540, y: 470, color: GOLD });
    const p0 = a.end('what2') + 0.3;
    const pp1 = opening(p0);
    a.walker(pp1.pts, { t1: p0 + OPEN_LEN + 0.5, dr: -40, color: GOLD });
    const pEnd = lh(p0, OPEN_LH);
    a.ch('Am', pEnd, S('what2').t1 - 0.1, { notes: ['C3', 'E3', 'A3'], bass: 'A2', vel: 0.7 });
    lh(S('what2').t0 + 0.05, Array.from({ length: Math.max(0, Math.floor((p0 - S('what2').t0 - 0.1) / BAR)) }, () => 'Am'), { vel: 0.45 });

    // ---------- jan: bass drum, cymbals, triangle ----------
    const INST = [{ label: 'BASS DRUM', size: 40, color: RED }, { label: 'CYMBALS', size: 40, color: GOLD }, { label: 'TRIANGLE', size: 40, color: TEAL }];
    const gJ = a.grid(INST, S('jan').t0 + 0.1, S('jan').t1, { rows: 1, cols: 3, cw: 310, chh: 180, y: 600, revealStep: 0.15 });
    const tBD = a.w('jan', 'bass') - 0.05, tCy = a.w('jan', 'cymbals') - 0.05, tTr = a.w('jan', 'triangles') - 0.05;
    gJ.active.push({ t0: tBD, t1: S('jan').t1, i: 0 }, { t0: tCy, t1: S('jan').t1, i: 1 }, { t0: tTr, t1: S('jan').t1, i: 2 });
    a.big('OTTOMAN JANISSARY BANDS', a.w('jan', 'Ottoman'), S('jan').t1, { y: 470, size: 34, ...MONO, color: '#ffffff', blur: 10 });
    a.big('FASHIONABLE IN VIENNA', a.w('jan', 'Vienna'), S('jan').t1, { y: 940, size: 52, color: GOLD });
    const j0 = S('jan').t0 + 0.1, jEnd = S('jan').t1 - 0.2;
    lh(j0, Array.from({ length: Math.floor((jEnd - j0) / BAR) }, (_, i) => (i % 4 === 2 ? 'E' : 'Am')), { vel: 0.55, hideName: true });
    for (let t = j0, k = 0; t < jEnd - 0.05; t += 4 * SX, k++) {
      if (t >= tBD) a.perc('kick', t, 0.75);
      if (t >= tCy && k % 2 === 0) { a.perc('hat', t, 0.7); a.perc('snare', t, 0.25); }
      if (t >= tTr) { a.note(105, t + 2 * SX, 0.3, { vel: 0.1, show: false }); a.note(112, t + 2 * SX, 0.3, { vel: 0.05, show: false }); }
    }

    // ---------- why1: the turn B A G# A, landing on C ----------
    a.scale(S('why1').t0, 'A', AMIN);
    a.ch('Am', S('why1').t0 + 0.1, a.w('why1b', 'B') - 0.1, { notes: ['C3', 'E3', 'A3'], bass: 'A2', vel: 0.4 });
    a.ring(['A'], a.w('why1', 'one'), S('why1').t1, { color: GOLD });
    a.tag('B', a.w('why1', 'above'), S('why1').t1, 'STEP ABOVE', { color: TEAL, dr: -92 });
    a.tag('G#', a.w('why1', 'below'), S('why1').t1, 'HALF STEP BELOW · G#', { color: PINK, dr: -92 });
    // a slow demo of the turn while the sentence is spoken
    const d0 = a.w('why1', 'step') - 0.05;
    [['B4', 0], ['A4', 0.45], ['G#4', a.w('why1', 'below') - 0.05 - d0], ['A4', a.w('why1', 'back') - 0.05 - d0]].forEach(([n, o]) => a.note(down(n), d0 + o, 0.4, { vel: 0.36 }));
    const bw = [a.w('why1b', 'B'), a.w('why1b', 'A'), a.w('why1b', 'G'), a.w('why1b', 'A', 1), a.w('why1b', 'C')].map(t => t - 0.05);
    ['B4', 'A4', 'G#4', 'A4', 'C5'].forEach((n, i) => a.note(down(n), bw[i], i === 4 ? 1.0 : 0.4, { vel: 0.42 }));
    a.walker(['B', 'A', 'G#', 'A', 'C'].map((p, i) => [bw[i], p]), { t1: S('why1').t1, dr: -40, color: GOLD });
    a.tag('C', bw[4], S('why1').t1, 'LANDS', { color: GOLD, dr: -92 });
    a.ch('Am', bw[4], S('why1').t1 - 0.1, { notes: ['C3', 'E3', 'A3'], bass: 'A2', vel: 0.45 });
    opening(S('why1').t1 - 1.15, { bars: 1, vel: 0.36, show: false });

    // ---------- why2: turns on A, C, E climb the A minor chord ----------
    a.scale(S('why2').t0, 'A', AMIN);
    const TURNS = [['B4', 'A4', 'G#4', 'A4'], ['D5', 'C5', 'B4', 'C5'], ['F5', 'E5', 'D#5', 'E5']];
    const tw = [a.w('why2', 'A'), a.w('why2', 'C'), a.w('why2', 'E')].map(t => t - 0.12);
    TURNS.forEach((tn, k) => {
      tn.forEach((n, i) => a.note(down(n), tw[k] + i * SX, SX * (i === 3 ? 3 : 0.85), { vel: 0.4 }));
      a.ring([pcOf(tn[3])], tw[k] + 3 * SX, S('why2').t1, { color: GOLD });
    });
    const tCh = a.w('why2', 'chord') - 0.1;
    a.arc('A', 'C', tw[1] + 3 * SX, S('why2').t1, { steps: 3, color: GOLD, dr: 34 });
    a.arc('C', 'E', tw[2] + 3 * SX, S('why2').t1, { steps: 4, color: GOLD, dr: 34 });
    a.ch('Am', tCh, S('why2').t1 - 0.1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.5 });
    ['A3', 'C4', 'E4', 'A4'].forEach((n, i) => a.note(n, tCh + 0.1 + i * 0.18, 0.5, { vel: 0.3, show: false }));
    a.tag(0, a.w('why2b', 'arpeggio'), S('why2').t1, 'AN ARPEGGIO IN DISGUISE', { x: 540, y: 470, color: GOLD });
    const ar0 = a.end('why2b') + 0.15;
    opening(ar0, { bars: 1, vel: 0.36, show: false });

    // ---------- why3: G# -> A, D# -> E ----------
    a.scale(S('why3').t0, 'A', AMIN);
    const tG = a.w('why3', 'G') - 0.05, tD = a.w('why3', 'D') - 0.05, tPull = a.w('why3', 'pulling') - 0.05;
    a.tag('G#', tG, S('why3').t1, 'G#', { color: PINK, dr: -92 });
    a.tag('D#', tD, S('why3').t1, 'D#', { color: PINK, dr: -92 });
    a.note('G#3', tG, 0.6, { vel: 0.36 }); a.note('D#4', tD, 0.6, { vel: 0.36 });
    a.arc('G#', 'A', tPull, S('why3').t1, { steps: 1, color: GOLD, dr: 30 });
    a.arc('D#', 'E', tPull + 0.3, S('why3').t1, { steps: 1, color: GOLD, dr: 30 });
    a.note('G#3', tPull, 0.3, { vel: 0.36 }); a.note('A3', tPull + 0.3, 0.6, { vel: 0.4 });
    a.note('D#4', tPull + 0.9, 0.3, { vel: 0.36 }); a.note('E4', tPull + 1.2, 0.6, { vel: 0.4 });
    a.tag(0, a.w('why3', 'Leading'), S('why3').t1, 'LEADING TONES', { x: 540, y: 470, color: GOLD });
    a.ch('E', S('why3').t0 + 0.1, a.w('why3', 'Leading') - 0.1, { notes: ['G#2', 'B2', 'E3'], bass: 'E2', vel: 0.4 });
    a.ch('Am', a.w('why3', 'Leading') - 0.1, S('why3').t1 - 0.1, { notes: ['C3', 'E3', 'A3'], bass: 'A2', vel: 0.45 });

    // ---------- why4: A major, rolled crashing chords ----------
    a.scale(S('why4').t0, 'A', a.T.MAJOR);
    const k0 = a.w('why4', 'left') - 0.1;
    a.ch('A', S('why4').t0 + 0.1, k0, { notes: ['C#3', 'E3', 'A3'], bass: 'A2', vel: 0.45 });
    janissary(k0, S('why4').t1 - 0.1);
    a.tag(0, a.w('why4', 'rolled'), S('why4').t1, 'ROLLED · CRASHING', { x: 540, y: 470, color: RED });

    // ---------- why4b: the Janissary pedal ----------
    const gP = a.grid([{ label: 'DRUM', size: 56, color: RED }, { label: 'BELLS', size: 56, color: GOLD }], S('why4b').t0 + 0.1, S('why4b').t1,
      { rows: 1, cols: 2, cw: 380, chh: 200, y: 600, revealStep: 0.2, caption: 'A PEDAL ON SOME PIANOS' });
    gP.active.push({ t0: a.w('why4b', 'drum') - 0.05, t1: S('why4b').t1, i: 0 }, { t0: a.w('why4b', 'bells') - 0.05, t1: S('why4b').t1, i: 1 });
    a.big('JANISSARY PEDAL', a.w('why4b', 'Janissary'), S('why4b').t1, { y: 1010, size: 72, color: GOLD });
    janissary(S('why4b').t0 + 0.1, a.w('why4b', 'bells') - 0.1, { vel: 0.6, hideName: true });
    for (let k = 0; k < 4; k++) { a.note(93 + [0, 4, 7, 12][k], a.w('why4b', 'bells') + k * 0.16, 0.6, { vel: 0.12, show: false }); }
    a.ch('A', a.w('why4b', 'bells') - 0.1, S('why4b').t1 - 0.1, { notes: ['C#3', 'E3', 'A3'], bass: 'A2', vel: 0.4, hideName: true });

    // ---------- why5: rondo, theme / contrast / theme ----------
    const RONDO = ['THEME', 'CONTRAST', 'THEME', 'CONTRAST', 'THEME'].map((l, i) => ({ label: i % 2 ? 'B' : 'A', sub: l, size: 64, subSize: 20, color: i % 2 ? RED : GOLD }));
    const gR = a.grid(RONDO, S('why5').t0 + 0.1, S('why5').t1, { rows: 1, cols: 5, cw: 192, chh: 200, y: 600, revealStep: 0.08, caption: 'THE MAIN THEME KEEPS COMING BACK' });
    const r0 = S('why5').t0 + 0.3;
    for (let i = 0; i < 5; i++) {
      const t = r0 + i * BAR;
      gR.active.push({ t0: t, t1: t + BAR, i });
      if (i % 2 === 0) { opening(t, { bars: 1, vel: 0.4, show: false }); lh(t, ['Am'], { vel: 0.7, hideName: true }); }
      else janissary(t, t + BAR, { vel: 0.8, hideName: true });
    }
    a.big('THE THEME RETURNS', a.w('why5', 'coming'), S('why5').t1, { y: 1000, size: 56, color: GOLD });

    // ---------- essence: the opening once more, ending on A minor ----------
    a.scale(S('essence').t0, 'A', a.T.MINOR);
    const e0 = S('essence').t0 + 0.2;
    const ep = opening(e0);
    a.walker(ep.pts, { t1: e0 + OPEN_LEN + 0.6, dr: -40, color: GOLD });
    const eEnd = lh(e0, OPEN_LH);
    a.perc('kick', eEnd, 0.7);
    a.ch('Am', eEnd, S('essence').t1 - 0.3, { notes: ['C3', 'E3', 'A3', 'C4'], bass: 'A2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
