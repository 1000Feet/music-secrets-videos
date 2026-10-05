// Carmen's Habanera: a melody sliding down by half steps over a repeated low D in the habanera rhythm.
// Public domain (Bizet, 1875). Only the elements given in the brief are played: the six falling
// notes D5 C#5 C5 B4 Bb4 A4 (here in plain quarter notes) and the bass rhythm on a low D.
const SX = 0.2, BAR = 8 * SX;                    // sixteenth, one 2/4 bar
const HAB = [[0, 3], [3, 1], [4, 2], [6, 2]];    // habanera: dotted eighth, sixteenth, eighth, eighth
const TRES = [[0, 3], [3, 3], [6, 2]];           // tresillo: 3 + 3 + 2
const LINE = ['D5', 'C#5', 'C5', 'B4', 'Bb4', 'A4'];

module.exports = {
  slug: 'habanera',
  title: "Carmen's Habanera",
  segments: [
    { id: 'hook',    text: 'A melody that slides down, one half step at a time... over a rhythm that sways.' },
    { id: 'what',    text: "This is the Habanera, Carmen's aria from Bizet's opera, premiered in Paris in 1875." },
    { id: 'melody',  text: 'The tune slides down: D, C sharp, C, B, B flat, A.' },
    { id: 'bass',    text: 'Underneath, a low D repeats the habanera rhythm.' },
    { id: 'yr',      text: 'Bizet adapted the tune from El Arreglito, by Sebastián Yradier, believing it was a folk song.' },
    { id: 'yr2',     text: 'He later credited Yradier in the score.' },
    { id: 'why1',    text: 'So why is it so seductive? Six notes, each just a half step lower.' },
    { id: 'why1b',   text: 'Slippery, never settling... just like Carmen.' },
    { id: 'why2',    text: 'The rhythm comes from Cuba. It is related to the tresillo: three, three, two.' },
    { id: 'why2b',   text: 'The same family as many Latin and pop grooves.' },
    { id: 'why3',    text: "And the low D never moves. That's a pedal point." },
    { id: 'why3b',   text: 'So the sliding melody keeps rubbing against it.' },
    { id: 'why4',    text: 'The verse is in D minor. Then the refrain switches to D major.' },
    { id: 'why4b',   text: 'Dark and teasing turns bright and bold.' },
    { id: 'essence', text: 'A melody that slips through your fingers, over a rhythm that never stops swaying.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'GEORGES BIZET · 1875', title: 'THE HABANERA', accent: true, tonic: 2, min: 0.5 + 4 * BAR, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'CARMEN · OPÉRA-COMIQUE', title: 'HABANERA', sub: 'L’amour est un oiseau rebelle', tonic: 2, tail: 0.5 },
    { id: 'melody', segs: ['melody'], label: 'THE MELODY', title: 'SLIDING DOWN', sub: 'in D minor', tonic: 2, tail: 1.4 },
    { id: 'bass', segs: ['bass'], label: 'THE BASS · 2/4', title: 'THE HABANERA RHYTHM', circle: false, tonic: 2, min: 4 * BAR + 0.4, tail: 0.6 },
    { id: 'yr', segs: ['yr', 'yr2'], label: 'THE SOURCE', title: 'EL ARREGLITO', sub: 'Sebastián Yradier', circle: false, tonic: 2, gap: 0.3, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'HALF STEP BY HALF STEP', tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'FROM CUBA', title: 'THE TRESILLO FAMILY', circle: false, tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'THE LOW D', title: 'PEDAL POINT', tonic: 2, gap: 0.3, tail: 2.0 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'VERSE AND REFRAIN', title: 'MINOR TO MAJOR', tonic: 2, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SLIP AND SWAY', accent: true, tonic: 2, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const DM = ['F3', 'A3', 'D4'], DMAJ = ['F#3', 'A3', 'D4'];

    // habanera bars from t0 to t1: low D in the habanera rhythm, soft chord, light hats
    function groove(t0, t1, o = {}) {
      const v = o.vel ?? 1, cell = o.cell || HAB;
      let t = t0;
      while (t < t1 - 0.1) {
        const end = Math.min(t + BAR, t1);
        const chord = typeof o.chord === 'function' ? o.chord(t) : (o.chord || 'Dm');
        cell.forEach(([s, d]) => {
          const tb = t + s * SX;
          if (tb >= t1 - 0.05) return;
          a.note('D2', tb, d * SX * 0.9, { vel: 0.42 * v, show: false });
          a.note('D3', tb, d * SX * 0.8, { vel: 0.16 * v, show: false });
          if (o.grid) o.grid.active.push({ t0: tb, t1: tb + d * SX, i: s + (o.gridOffset || 0) });
        });
        if (o.chord !== false) a.ch(chord, t, end, { notes: chord === 'D' ? DMAJ : DM, bass: false, vel: 0.32 * v, hideName: o.hideName, strikes: [{ o: 0, v: 1 }, { o: 4 * SX, v: 0.6 }].filter(x => x.o < end - t), shape: o.shape });
        a.perc('hat', t, 0.22 * v); a.perc('hat', t + 4 * SX, 0.16 * v);
        t += BAR;
      }
    }
    // the six falling notes, one quarter each, the A held; returns walker points and end time
    function line(t0, o = {}) {
      const q = o.q ?? 4 * SX, pts = [];
      LINE.forEach((n, i) => {
        const t = t0 + i * q;
        a.note(n, t, (i === 5 ? (o.hold ?? 2) : 1) * q * 0.95, { vel: o.vel ?? 0.42, show: o.show ?? true });
        pts.push([t, pcOf(n)]);
        if (o.arcs && i) a.arc(pcOf(LINE[i - 1]), pcOf(n), t, o.arcs, { steps: -1, color: o.color || PINK, dr: 30 });
      });
      return { pts, end: t0 + 5 * q + (o.hold ?? 2) * q };
    }

    // ---------- hook: D minor, groove + the falling line with arcs ----------
    a.scale(0.1, 'D', a.T.MINOR, { popIn: { t0: 0.15, step: 0.05 } });
    groove(0.3, S('hook').t1, { vel: 0.9 });
    const hl = line(0.5, { arcs: S('hook').t1 });
    a.walker(hl.pts, { t1: S('hook').t1, dr: -40, color: PINK });
    a.ring(['D'], 0.3, S('hook').t1, { color: TEAL });
    a.tag(0, 0.3, S('hook').t1, 'OVER A LOW D', { x: 540, y: 470, color: TEAL });

    // ---------- what: the aria, Paris 1875 ----------
    groove(S('what').t0 + 0.05, S('what').t1, { vel: 0.7 });
    const wq0 = a.w('what', 'Habanera') + 0.2;
    line(wq0, { vel: 0.3, q: Math.min(4 * SX, (S('what').t1 - wq0 - 0.3) / 7) });
    a.tag(0, a.w('what', 'Paris'), S('what').t1, 'PARIS · 1875', { x: 540, y: 470, color: GOLD });

    // ---------- melody: on the spoken note names ----------
    const mw = [a.w('melody', 'D'), a.w('melody', 'C'), a.w('melody', 'C', 1), a.w('melody', 'B'), a.w('melody', 'B', 1), a.w('melody', 'A')].map(t => t - 0.05);
    LINE.forEach((n, i) => {
      a.note(n, mw[i], i === 5 ? 1.4 : 0.6, { vel: 0.42 });
      if (i) a.arc(pcOf(LINE[i - 1]), pcOf(n), mw[i], S('melody').t1, { steps: -1, color: PINK, dr: 30 });
    });
    a.walker(LINE.map((n, i) => [mw[i], pcOf(n)]), { t1: S('melody').t1, dr: -40, color: PINK });
    a.tag('C#', mw[1], S('melody').t1, 'C SHARP', { color: PINK, dr: -92 });
    a.tag('Bb', mw[4], S('melody').t1, 'B FLAT', { color: PINK, dr: -92 });
    a.ch('Dm', S('melody').t0 + 0.1, S('melody').t1, { notes: DM, bass: false, vel: 0.3 });
    groove(S('melody').t0 + 0.05, S('melody').t1 - 0.1, { vel: 0.5, chord: false });

    // ---------- bass: the rhythm grid, eight sixteenths ----------
    const HCELL = [...Array(8)].map((_, i) => {
      const hit = HAB.find(([s]) => s === i);
      return { label: hit ? (i === 3 ? 'da' : 'DUM') : '·', sub: String(i + 1), color: hit ? GOLD : GREY, size: hit ? 34 : 44, subSize: 22 };
    });
    const gB = a.grid(HCELL, S('bass').t0 + 0.1, S('bass').t1, { rows: 1, cols: 8, cw: 122, chh: 170, y: 560, revealStep: 0.05, caption: 'ONE BAR OF 2/4 · EIGHT SIXTEENTHS' });
    groove(S('bass').t0 + 0.3, S('bass').t1 - 0.1, { grid: gB, vel: 1, chord: false });
    a.big('DOTTED 8TH · 16TH · 8TH · 8TH', a.w('bass', 'rhythm'), S('bass').t1, { y: 880, size: 32, ...MONO, color: GOLD, blur: 10 });
    a.big('LOW D', a.w('bass', 'low'), S('bass').t1, { y: 1010, size: 96, color: TEAL });

    // ---------- yr: Yradier -> Bizet ----------
    const gY = a.grid([{ label: 'YRADIER', sub: 'EL ARREGLITO', size: 56, color: GREY }, { label: 'BIZET', sub: 'CARMEN · 1875', size: 56, color: GOLD }],
      S('yr').t0 + 0.1, S('yr').t1, { rows: 1, cols: 2, cw: 420, chh: 220, y: 560, revealStep: 0.3 });
    gY.active.push({ t0: a.w('yr', 'Yradier') - 0.1, t1: a.w('yr', 'believing'), i: 0 }, { t0: S('yr').t0 + 0.2, t1: a.w('yr', 'Yradier') - 0.1, i: 1 },
      { t0: a.w('yr2', 'credited') - 0.1, t1: S('yr').t1, i: 0 }, { t0: a.w('yr2', 'credited') - 0.1, t1: S('yr').t1, i: 1 });
    a.big('“A FOLK SONG?”', a.w('yr', 'folk'), a.at('yr2'), { y: 960, size: 72, color: '#ffffff' });
    a.big('CREDITED IN THE SCORE', a.w('yr2', 'credited'), S('yr').t1, { y: 960, size: 52, color: GOLD });
    groove(S('yr').t0 + 0.05, S('yr').t1, { vel: 0.6, chord: false });
    line(S('yr').t0 + 0.05 + BAR, { vel: 0.26, show: false });

    // ---------- why1: six notes, each a half step lower ----------
    const w0 = S('why1').t0;
    a.scale(w0, 'D', a.T.MINOR);
    groove(w0 + 0.05, S('why1').t1, { vel: 0.6 });
    const tSix = a.w('why1', 'Six') - 0.05;
    const wl = line(tSix, { arcs: S('why1').t1, q: 0.55, hold: 3, vel: 0.42 });
    a.walker(wl.pts, { t1: S('why1').t1, dr: -40, color: PINK });
    a.ring(['D', 'C#', 'C', 'B', 'Bb', 'A'], a.w('why1', 'half'), a.at('why1b'), { color: PINK });
    a.tag(0, a.w('why1b', 'Slippery'), a.w('why1b', 'never'), 'SLIPPERY', { x: 540, y: 470, color: PINK });
    a.tag(0, a.w('why1b', 'never'), a.w('why1b', 'just'), 'NEVER SETTLING', { x: 540, y: 470, color: PINK });
    a.tag(0, a.w('why1b', 'just'), S('why1').t1, 'JUST LIKE CARMEN', { x: 540, y: 470, color: GOLD });

    // ---------- why2: tresillo vs habanera ----------
    const cellsFor = (cell, cols) => [...Array(8)].map((_, i) => {
      const gi = i < 3 ? 0 : i < 6 ? 1 : 2, hit = cell.some(([s]) => s === i);
      return { label: hit ? 'X' : '·', sub: String(i + 1), color: cols[gi], size: hit ? 50 : 44, subSize: 22 };
    });
    const tTres = a.w('why2', 'tresillo') - 0.1;
    const gT = a.grid(cellsFor(TRES, [PINK, TEAL, GOLD]), S('why2').t0 + 0.1, S('why2').t1, { rows: 1, cols: 8, cw: 122, chh: 140, y: 560, revealStep: 0.04 });
    const gH = a.grid(cellsFor(HAB, [GOLD, GOLD, GOLD]), S('why2').t0 + 0.1, S('why2').t1, { rows: 1, cols: 8, cw: 122, chh: 140, y: 790, revealStep: 0.04 });
    a.big('TRESILLO · 3 + 3 + 2', S('why2').t0 + 0.1, S('why2').t1, { y: 535, size: 26, ...MONO, color: PINK, blur: 0 });
    a.big('HABANERA', S('why2').t0 + 0.1, S('why2').t1, { y: 765, size: 26, ...MONO, color: GOLD, blur: 0 });
    // habanera first, tresillo from the word on, then both together
    groove(S('why2').t0 + 0.2, tTres, { grid: gH, vel: 0.8, hideName: true, shape: false });
    const tB = tTres + Math.ceil((a.at('why2b') - tTres) / BAR) * BAR;
    for (let t = tTres; t < tB - 0.05; t += BAR) TRES.forEach(([s, d]) => {
      gT.active.push({ t0: t + s * SX, t1: t + (s + d) * SX, i: s });
      a.perc('kick', t + s * SX, 0.6); a.note('A4', t + s * SX, 0.12, { vel: 0.2, show: false });
    });
    groove(tB, S('why2').t1 - 0.1, { grid: gH, vel: 0.85, hideName: true, shape: false });
    a.big('CUBA', a.w('why2', 'Cuba'), tTres, { y: 1030, size: 96, color: GOLD });
    a.big('THREE, THREE, TWO', a.w('why2', 'three'), a.w('why2b', 'Latin'), { y: 1030, size: 64, color: PINK });
    a.big('LATIN · POP', a.w('why2b', 'Latin'), S('why2').t1, { y: 1030, size: 72, color: TEAL });

    // ---------- why3: the pedal point, rubbing ----------
    const p0 = S('why3').t0;
    a.scale(p0, 'D', a.T.MINOR);
    groove(p0 + 0.05, S('why3').t1 - 0.1, { vel: 0.7, chord: false });
    a.ring(['D'], p0 + 0.2, S('why3').t1, { color: TEAL });
    a.tag(2, a.w('why3', 'never'), S('why3').t1, 'NEVER MOVES', { color: TEAL, dr: -92 });
    const rq = 0.62, r0 = a.w('why3b', 'sliding') - 0.1;
    a.tag(0, a.w('why3', 'pedal'), r0, 'PEDAL POINT', { x: 540, y: 470, color: TEAL });
    a.tag(0, r0, S('why3').t1, 'RUBBING AGAINST D', { x: 540, y: 470, color: RED });
    LINE.forEach((n, i) => {
      const t = r0 + i * rq;
      a.note(n, t, rq * (i === 5 ? 2.5 : 0.95), { vel: 0.42 });
      if (i) a.line('D', pcOf(n), t, t + rq, { color: i === 5 ? TEAL : RED });
    });
    a.walker(LINE.map((n, i) => [r0 + i * rq, pcOf(n)]), { t1: S('why3').t1, dr: -40, color: PINK });

    // ---------- why4: D minor -> D major ----------
    const m0 = S('why4').t0, tMaj = a.w('why4', 'major') - 0.1;
    a.scale(m0, 'D', a.T.MINOR);
    a.scale(tMaj, 'D', a.T.MAJOR);
    groove(m0 + 0.05, tMaj, { vel: 0.75, chord: 'Dm' });
    groove(tMaj, S('why4').t1 - 0.1, { vel: 0.95, chord: 'D' });
    a.tag(5, a.w('why4', 'minor'), tMaj, 'F', { color: BLUE, dr: -92 });
    a.arc('F', 'F#', tMaj, S('why4').t1, { steps: 1, color: GOLD, dr: 30 });
    a.tag(6, tMaj, S('why4').t1, 'F#', { color: GOLD, dr: -92 });
    a.tag(0, a.w('why4b', 'Dark'), a.w('why4b', 'bright'), 'DARK AND TEASING', { x: 540, y: 470, color: BLUE });
    a.tag(0, a.w('why4b', 'bright'), S('why4').t1, 'BRIGHT AND BOLD', { x: 540, y: 470, color: GOLD });

    // ---------- essence: the line once more, landing on D minor ----------
    const e0 = S('essence').t0;
    a.scale(e0, 'D', a.T.MINOR);
    const eEnd = e0 + 0.05 + 4 * BAR;
    groove(e0 + 0.05, eEnd, { vel: 0.8 });
    const el = line(e0 + 0.25, { arcs: eEnd, hold: 2 });
    a.walker(el.pts, { t1: eEnd, dr: -40, color: PINK });
    a.ch('Dm', eEnd, S('essence').t1 - 0.3, { notes: ['F3', 'A3', 'D4', 'F4'], bass: 'D2', vel: 0.7 });
    a.note('D5', eEnd, 2.0, { vel: 0.3 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
