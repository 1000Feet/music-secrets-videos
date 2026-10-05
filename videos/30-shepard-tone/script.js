// The Shepard tone: a sound that seems to rise forever. One pitch class in many octaves under a
// bell-shaped volume curve, stepping up a half step at a time, walking around the circle endlessly.
const STEP = 0.35;

module.exports = {
  slug: 'shepard-tone',
  title: 'The Shepard Tone',
  segments: [
    { id: 'hook',    text: 'Listen. This sound keeps rising... and rising... but it never gets any higher.' },
    { id: 'what',    text: "It's the Shepard tone, an auditory illusion described by Roger Shepard in 1964." },
    { id: 's1',      text: "Hans Zimmer built the score of Christopher Nolan's Dunkirk around it..." },
    { id: 's1b',     text: 'for tension that never ends.' },
    { id: 's2',      text: 'In Super Mario 64, the endless staircase music uses a Shepard scale.' },
    { id: 'why1',    text: 'So how does it work? Your ear judges pitch in two ways.' },
    { id: 'why2',    text: 'By the note name: C, C sharp, D... and by how high it sounds.' },
    { id: 'why3',    text: 'The trick plays one note in many octaves at once, loudest in the middle.' },
    { id: 'why4',    text: 'As it climbs, the top octave fades out... and a new one fades in at the bottom.' },
    { id: 'why5',    text: 'So the note name keeps rising, but the overall height stays put.' },
    { id: 'circle',  text: "Note names form a circle. After twelve half steps, you're back at C." },
    { id: 'circle2', text: 'The Shepard tone just walks around that circle... forever.' },
    { id: 'use',     text: 'Composers use it to build tension that never resolves.' },
    { id: 'essence', text: 'A staircase that only goes up, and never arrives. Tension with no ceiling.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'AN AUDITORY ILLUSION', title: 'THE SHEPARD TONE', accent: true, lead: 0.8, tail: 1.2 },
    { id: 'what', segs: ['what'], label: 'ROGER SHEPARD · 1964', title: 'ENDLESS RISE', tail: 1.2 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'Dunkirk', sub: 'Christopher Nolan · Hans Zimmer · 2017', gap: 0.25, tail: 2.6 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Super Mario 64', sub: '1996 · the endless staircase', tail: 2.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWO KINDS OF PITCH', tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'TWO KINDS OF PITCH', tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'THE TRICK', title: 'MANY OCTAVES', circle: false, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'THE TRICK', title: 'FADE OUT, FADE IN', circle: false, tail: 1.2 },
    { id: 'why5', segs: ['why5'], label: 'THE ILLUSION', title: 'RISING IN PLACE', tail: 1.0 },
    { id: 'circle', segs: ['circle'], label: 'ON THE CIRCLE', title: 'BACK TO C', tail: 0.6 },
    { id: 'circle2', segs: ['circle2'], label: 'ON THE CIRCLE', title: 'FOREVER', tail: 1.6 },
    { id: 'use', segs: ['use'], label: 'WHY COMPOSERS LOVE IT', title: 'NO RESOLUTION', tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'NO CEILING', accent: true, gap: 0.5, tail: 1.9 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', GOLD = '#ffcf5a', PINK = '#ff7a93', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const mod = (x, n) => ((x % n) + n) % n;

    // every step is anchored so the walk is exactly on C when the voice says "back at C"
    const anchor = a.w('circle', 'C');
    const pcAt = k => mod(k, 12);
    const kFrom = t => Math.ceil((t - anchor) / STEP - 1e-6);

    // the Shepard tone: one pitch class in octaves 2-6, bell-curve volume around the middle register
    const bell = m => Math.exp(-((m - 66) ** 2) / (2 * 11 * 11));
    function shepard(t0, t1, o = {}) {
      const pts = [];
      for (let k = kFrom(t0); anchor + k * STEP < t1 - 0.01; k++) {
        const t = anchor + k * STEP, pc = pcAt(k);
        const fadeIn = o.fadeIn ? Math.min(1, (t - t0) / o.fadeIn) : 1, fadeOut = o.fadeOut ? Math.min(1, (t1 - t) / o.fadeOut) : 1;
        for (let j = 0; j < 5; j++) {
          const m = 36 + pc + 12 * j;
          a.note(m, t, STEP * 1.15, { vel: (o.vel ?? 0.34) * bell(m) * fadeIn * fadeOut, show: j === 2 && o.spark !== false });
        }
        pts.push([t, pc, k]);
      }
      return pts;
    }
    const walk = (pts, t1, o = {}) => a.walker(pts.map(([t, pc]) => [t, pc]), { t1, color: '#ffffff', dr: 0, ...o });

    // all twelve note names lit: the chromatic circle
    const CHROM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    a.scale(0.2, 'C', CHROM, { popIn: { t0: 0.25, step: 0.04 } });

    // ---- part 1: one endless rise under hook, what and the two examples ----
    const p1 = shepard(0.7, S('s2').t1, { fadeIn: 1.2, fadeOut: 0.8 });
    walk(p1, S('s2').t1);
    a.big('↑', 1.0, a.w('hook', 'never'), { y: 830, size: 170, color: GOLD });
    a.big('NEVER', a.w('hook', 'never'), S('hook').t1, { y: 800, size: 54, color: '#ffffff', blur: 14 });
    a.big('HIGHER', a.w('hook', 'never') + 0.25, S('hook').t1, { y: 870, size: 54, color: GOLD, blur: 14 });
    a.big('ILLUSION', a.w('what', 'illusion'), S('what').t1, { y: 830, size: 56, color: TEAL, blur: 14 });
    // Dunkirk: rising tension (our own recreation), a low pulse underneath
    const d0 = S('s1').t0;
    for (let t = d0 + 0.2; t < S('s1').t1 - 0.4; t += 2 * STEP) a.note('D2', t, 0.25, { vel: 0.22, show: false });
    a.big('TENSION', a.w('s1b', 'tension'), S('s1').t1, { y: 830, size: 58, color: PINK, blur: 16 });
    // Mario 64: the endless staircase
    a.big('ENDLESS', a.w('s2', 'endless'), S('s2').t1, { y: 800, size: 50, color: '#ffffff', blur: 14 });
    a.big('STAIRCASE', a.w('s2', 'endless') + 0.2, S('s2').t1, { y: 865, size: 50, color: GOLD, blur: 14 });

    // ---- why1-2: name vs height ----
    const p2 = shepard(S('why1').t0 + 0.3, S('why2').t1, { vel: 0.26, fadeIn: 0.8, fadeOut: 0.6, spark: false });
    walk(p2, S('why2').t1);
    a.big('TWO WAYS', a.w('why1', 'two'), S('why1').t1, { y: 830, size: 58, color: '#ffffff', blur: 14 });
    a.big('NOTE NAME', a.w('why2', 'name'), S('why2').t1, { y: 790, size: 44, ...MONO, color: TEAL, blur: 12 });
    a.big('↑ HEIGHT', a.w('why2', 'high'), S('why2').t1, { y: 870, size: 44, ...MONO, color: GOLD, blur: 12 });
    // the voice names three notes: ring them as they are spoken
    a.ring(['C'], a.w('why2', 'C'), a.w('why2', 'C') + 0.7, { color: TEAL });
    a.ring(['C#'], a.w('why2', 'sharp'), a.w('why2', 'sharp') + 0.7, { color: TEAL });
    a.ring(['D'], a.w('why2', 'D'), a.w('why2', 'D') + 0.7, { color: TEAL });

    // ---- why3-4: the octave stack, loudest in the middle ----
    const LAY = [['OCTAVE 6', 'QUIET', '#2f6f69'], ['OCTAVE 5', 'LOUDER', '#3aa59a'], ['OCTAVE 4', 'LOUDEST', TEAL], ['OCTAVE 3', 'LOUDER', '#3aa59a'], ['OCTAVE 2', 'QUIET', '#2f6f69']];
    const gSt = a.grid(LAY.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 40, subSize: 22 })), S('why3').t0, S('why4').t1,
      { rows: 5, cols: 1, cw: 520, chh: 124, y: 490, x: 400, revealStep: 0.08 });
    const p3 = shepard(S('why3').t0 + 0.2, S('why4').t1, { vel: 0.34, spark: false });
    p3.forEach(([t]) => { for (let i = 0; i < 5; i++) gSt.active.push({ t0: t, t1: t + 0.17, i }); });
    const tTop = a.w('why4', 'top'), tNew = a.w('why4', 'new');
    gSt.active.push({ t0: tTop, t1: S('why4').t1, i: 0 }, { t0: tNew, t1: S('why4').t1, i: 4 });
    a.big('FADES OUT', tTop, S('why4').t1, { x: 850, y: 540, size: 32, ...MONO, color: PINK, blur: 10 });
    a.big('↓', tTop, S('why4').t1, { x: 850, y: 600, size: 60, color: PINK });
    a.big('↑', tNew, S('why4').t1, { x: 850, y: 960, size: 60, color: GOLD });
    a.big('FADES IN', tNew, S('why4').t1, { x: 850, y: 1030, size: 32, ...MONO, color: GOLD, blur: 10 });
    a.big('LOUDEST', a.w('why3', 'loudest'), S('why3').t1, { x: 850, y: 780, size: 32, ...MONO, color: TEAL, blur: 10 });

    // ---- why5 to the end: the walk resumes, anchored on C ----
    const p4 = shepard(S('why5').t0 + 0.2, S('essence').t1 - 0.4, { fadeIn: 0.8, fadeOut: 2.2 });
    walk(p4, S('essence').t1);
    a.big('NAME ↑', a.w('why5', 'rising'), S('why5').t1, { y: 790, size: 50, ...MONO, color: TEAL, blur: 12 });
    a.big('HEIGHT =', a.w('why5', 'height'), S('why5').t1, { y: 870, size: 50, ...MONO, color: GOLD, blur: 12 });
    // the circle: twelve half steps, back at C
    const tTw = a.w('circle', 'twelve');
    a.arc('C', 'C', tTw, S('circle').t1, { steps: 12, color: GOLD, dr: 34, label: '12 HALF STEPS', labelR: 150 });
    a.ring(['C'], anchor, S('circle').t1, { color: GOLD });
    a.tag('C', anchor, S('circle').t1, 'BACK AT C', { color: GOLD, dr: -92 });
    void tTw;
    a.big('FOREVER', a.w('circle2', 'forever'), S('circle2').t1, { y: 830, size: 60, color: '#ffffff', blur: 16 });
    a.big('NEVER', a.w('use', 'never'), S('use').t1, { y: 800, size: 54, color: '#ffffff', blur: 14 });
    a.big('RESOLVES', a.w('use', 'resolves'), S('use').t1, { y: 865, size: 54, color: PINK, blur: 14 });
    a.big('NO', a.w('essence', 'no'), S('essence').t1, { y: 795, size: 60, color: '#ffffff', blur: 14 });
    a.big('CEILING', a.w('essence', 'ceiling'), S('essence').t1, { y: 865, size: 60, color: GOLD, blur: 18 });
    void BLUE;
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
