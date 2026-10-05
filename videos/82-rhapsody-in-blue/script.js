// Rhapsody in Blue: jazz walks into the concert hall, announced by a clarinet glissando.
// Gershwin's themes are NOT played. Music used, as the brief allows: a low trill on F3, a fast rising
// chromatic run up to Bb5 standing in for the glissando, and original blues chords (Bb7, Eb7, F7).
const BT = 0.42, BAR = 4 * BT, SW = BT * 2 / 3;   // swing beat
const RUN_STEP = 0.034;

module.exports = {
  slug: 'rhapsody-in-blue',
  title: 'Rhapsody in Blue',
  segments: [
    { id: 'hook',    text: 'One clarinet slides up... and jazz walks into the concert hall.' },
    { id: 'what',    text: 'This is Rhapsody in Blue, by George Gershwin, premiered on February 12, 1924, at Aeolian Hall, New York.' },
    { id: 'what2',   text: "Paul Whiteman's orchestra played, with Gershwin at the piano. Ferde Grofé orchestrated it." },
    { id: 'open',    text: 'It opens with a clarinet trill... and a long, smooth slide upward, a glissando.' },
    { id: 'gorman',  text: "That slide was the clarinettist Ross Gorman's idea, first played as a joke in rehearsal." },
    { id: 'gorman2', text: 'Gershwin kept it.' },
    { id: 'why1',    text: 'So why does it work? A glissando slides through every pitch in between...' },
    { id: 'why1v',   text: 'like a voice, or a trombone.' },
    { id: 'why1b',   text: "A piano can't do that." },
    { id: 'why1c',   text: 'It sounds playful, cheeky, jazzy.' },
    { id: 'why2',    text: 'Then Gershwin filled a classical piece with blue notes: the flat third and the flat seventh.' },
    { id: 'why3',    text: 'Jazz rhythm and harmony, in the form of a concert piece for piano and orchestra.' },
    { id: 'why4',    text: 'And a rhapsody is a free, episodic form. Themes come and go, like improvisation.' },
    { id: 'essence', text: 'One cheeky slide... and jazz and classical music meet in the same room.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'GERSHWIN · 1924', title: 'RHAPSODY IN BLUE', accent: true, tonic: 10, min: 5.6, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'THE PREMIERE', title: 'RHAPSODY IN BLUE', sub: 'George Gershwin', circle: false, tonic: 10, tail: 0.5 },
    { id: 'what2', segs: ['what2'], label: 'THE PREMIERE', title: 'THE PERFORMERS', circle: false, tonic: 10, tail: 0.5 },
    { id: 'open', segs: ['open'], label: 'THE OPENING', title: 'TRILL AND SLIDE', tonic: 10, tail: 1.8 },
    { id: 'gorman', segs: ['gorman', 'gorman2'], label: 'THE CLARINETTIST', title: 'ROSS GORMAN', circle: false, tonic: 10, gap: 0.3, tail: 2.2 },
    { id: 'why1', segs: ['why1', 'why1v', 'why1b'], label: 'WHY IT WORKS', title: 'THE GLISSANDO', tonic: 0, gap: 0.3, tail: 1.8 },
    { id: 'why1c', segs: ['why1c'], label: 'WHY IT WORKS', title: 'CHEEKY', tonic: 10, tail: 1.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'BLUE NOTES', tonic: 10, tail: 1.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'JAZZ MEETS CLASSICAL', circle: false, tonic: 10, tail: 1.4 },
    { id: 'why4', segs: ['why4'], label: 'THE FORM', title: 'A RHAPSODY', circle: false, tonic: 10, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE CHEEKY SLIDE', accent: true, tonic: 10, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const NAMES = a.T.NAMES;
    const BLUES = [0, 3, 5, 6, 7, 10];

    // the low trill on F3 (with G3), from t0 to t1
    function trill(t0, t1, o = {}) {
      let k = 0;
      for (let t = t0; t < t1 - 0.03; t += 0.065, k++) a.note(k % 2 ? 'G3' : 'F3', t, 0.07, { vel: 0.3 * (o.vel ?? 1), show: o.show ?? true });
      return t1;
    }
    // the rising chromatic run F3 -> Bb5 (stands in for the glissando); returns { end, pts }
    function run(t0, o = {}) {
      const pts = [], lo = a.T.midi('F3'), hi = a.T.midi('Bb5');
      for (let m = lo; m <= hi; m++) {
        const t = t0 + (m - lo) * RUN_STEP;
        a.note(m, t, m === hi ? (o.hold ?? 1.0) : RUN_STEP * 2.2, { vel: (0.18 + 0.2 * (m - lo) / (hi - lo)) * (o.vel ?? 1), show: o.show ?? false });
        pts.push([t, NAMES[m % 12]]);
      }
      return { end: t0 + (hi - lo) * RUN_STEP, pts };
    }
    // swing comping: one chord per bar, Charleston hits, walking-ish bass, ride and hi-hat
    const V = { Bb7: ['F3', 'Ab3', 'Bb3', 'D4'], Eb7: ['G3', 'Bb3', 'Db4', 'Eb4'], F7: ['A3', 'C4', 'Eb4', 'F4'], Bb: ['D3', 'F3', 'Bb3', 'D4'] };
    const R = { Bb7: 'Bb2', Eb7: 'Eb2', F7: 'F2', Bb: 'Bb2' };
    function comp(t0, t1, prog, o = {}) {
      const v = o.vel ?? 1;
      let k = 0;
      for (let t = t0; t < t1 - 0.2; t += BAR, k++) {
        const c = prog[k % prog.length], end = Math.min(t + BAR, t1);
        const strikes = [{ o: 0, v: 1 }, { o: BT + SW, v: 0.75 }].filter(s => s.o < end - t - 0.05);
        a.ch(c, t, end, { notes: V[c], bass: false, strikes, vel: 0.6 * v, hideName: o.hideName, label: c === 'Bb7' && o.label ? o.label : undefined });
        const root = a.T.midi(R[c]);
        [0, 7, 12, 10].forEach((iv, b) => { if (t + b * BT < t1 - 0.05) a.note(root + iv, t + b * BT, BT * 0.85, { vel: 0.3 * v, show: false }); });
        for (let b = 0; b < 4; b++) {
          const tb = t + b * BT;
          if (tb >= t1 - 0.05) break;
          a.perc('hat', tb, 0.3 * v); if (b % 2) { a.perc('hat', tb + SW, 0.2 * v); a.perc('snare', tb, 0.18 * v); } else a.perc('kick', tb, 0.35 * v);
        }
      }
    }

    // ---------- hook: trill, run, then the blues chords ----------
    a.scale(0.1, 'Bb', BLUES, { popIn: { t0: 0.12, step: 0.06 } });
    const hR = 0.9;
    trill(0.25, hR);
    a.ring(['F', 'G'], 0.25, hR + 0.2, { color: TEAL });
    const hr = run(hR, { hold: 1.2 });
    a.walker([[0.25, 'F'], ...hr.pts], { t1: S('hook').t1, dr: -40, color: GOLD });
    a.arc('F', 'Bb', hR, S('hook').t1, { steps: 29, color: GOLD, dr: 30 });
    a.tag(0, 0.25, hr.end, 'TRILL... THEN SLIDE', { x: 540, y: 470, color: GOLD });
    a.tag(1, 0.2, S('hook').t1, 'Db', { color: BLUE, dr: -75 });
    comp(hr.end + 0.05, S('hook').t1 - 0.05, ['Bb7', 'Eb7'], { vel: 0.85 });
    a.tag(0, hr.end + 0.05, S('hook').t1, 'JAZZ', { x: 540, y: 470, color: BLUE });

    // ---------- what: 12 February 1924, Aeolian Hall ----------
    const gD = a.grid([{ label: '1924', sub: '12 FEBRUARY', size: 72, color: GOLD }, { label: 'AEOLIAN HALL', sub: 'NEW YORK', size: 44, color: BLUE }],
      S('what').t0 + 0.1, S('what').t1, { rows: 1, cols: 2, cw: 440, chh: 220, y: 580, revealStep: 0.2 });
    gD.active.push({ t0: a.w('what', 'February') - 0.05, t1: a.w('what', 'Aeolian') - 0.05, i: 0 }, { t0: a.w('what', 'Aeolian') - 0.05, t1: S('what').t1, i: 1 });
    a.big('GEORGE GERSHWIN', a.w('what', 'George'), S('what').t1, { y: 960, size: 64, color: '#ffffff' });
    comp(S('what').t0 + 0.05, S('what').t1, ['Bb7', 'Eb7', 'Bb7', 'F7'], { vel: 0.55, hideName: true });

    // ---------- what2: Whiteman, Gershwin at the piano, Grofé ----------
    const gP = a.grid([{ label: 'WHITEMAN', sub: 'ORCHESTRA', size: 40, color: TEAL }, { label: 'GERSHWIN', sub: 'PIANO', size: 40, color: GOLD }, { label: 'GROFÉ', sub: 'ORCHESTRATION', size: 40, color: PINK }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 3, cw: 320, chh: 200, y: 600, revealStep: 0.15 });
    gP.active.push({ t0: a.w('what2', 'Paul') - 0.05, t1: S('what2').t1, i: 0 }, { t0: a.w('what2', 'Gershwin') - 0.05, t1: S('what2').t1, i: 1 }, { t0: a.w('what2', 'Ferde') - 0.05, t1: S('what2').t1, i: 2 });
    a.big('PAUL WHITEMAN', a.w('what2', 'Paul'), a.w('what2', 'Gershwin'), { y: 960, size: 56, color: TEAL });
    a.big('AT THE PIANO', a.w('what2', 'Gershwin'), a.w('what2', 'Ferde'), { y: 960, size: 56, color: GOLD });
    a.big('FERDE GROFÉ', a.w('what2', 'Ferde'), S('what2').t1, { y: 960, size: 56, color: PINK });
    comp(S('what2').t0 + 0.05, S('what2').t1, ['Eb7', 'Bb7', 'F7', 'Bb7'], { vel: 0.5, hideName: true });

    // ---------- open: the trill on the word, the run on "slide" ----------
    a.scale(S('open').t0, 'Bb', BLUES);
    const oT = a.w('open', 'trill') - 0.1, oS = a.w('open', 'slide') - 0.05;
    trill(oT, oS);
    a.ring(['F', 'G'], oT, oS + 0.2, { color: TEAL });
    a.tag(5, oT, oS, 'TRILL', { color: TEAL, dr: -92 });
    const orun = run(oS, { hold: 1.4 });
    a.walker([[oT, 'F'], ...orun.pts], { t1: S('open').t1, dr: -40, color: GOLD });
    a.arc('F', 'Bb', oS, S('open').t1, { steps: 29, color: GOLD, dr: 30 });
    a.tag(0, a.w('open', 'glissando'), S('open').t1, 'GLISSANDO', { x: 540, y: 470, color: GOLD });
    a.tag(1, S('open').t0, S('open').t1, 'Db', { color: BLUE, dr: -75 });
    a.ch('Bb7', orun.end + 0.1, S('open').t1 - 0.1, { notes: V.Bb7, bass: 'Bb2', vel: 0.6 });

    // ---------- gorman: a joke in rehearsal, Gershwin kept it ----------
    a.big('HIS IDEA', a.w('gorman', 'idea'), a.w('gorman', 'joke'), { y: 560, size: 96, color: TEAL });
    a.big('A JOKE', a.w('gorman', 'joke'), S('gorman').t1, { y: 560, size: 96, color: GOLD });
    a.big('IN REHEARSAL', a.w('gorman', 'rehearsal'), S('gorman').t1, { y: 670, size: 56, color: '#ffffff' });
    a.big('GERSHWIN KEPT IT', a.w('gorman2', 'kept'), S('gorman').t1, { y: 900, size: 72, color: TEAL });
    a.big('CLARINET', a.w('gorman', 'clarinettist'), S('gorman').t1, { y: 470, size: 30, ...MONO, color: GREY, blur: 0 });
    comp(S('gorman').t0 + 0.05, a.w('gorman2', 'kept') - 0.1, ['Bb7', 'Eb7'], { vel: 0.45, hideName: true });
    const gK = a.w('gorman2', 'kept') + 0.1;
    trill(gK, gK + 0.5, { show: false });
    const gr = run(gK + 0.5, { hold: 1.0 });
    a.ch('Bb7', gr.end + 0.05, S('gorman').t1 - 0.1, { notes: V.Bb7, bass: 'Bb2', vel: 0.65, hideName: true });

    // ---------- why1: every pitch in between vs piano steps ----------
    a.scale(S('why1').t0, 'C', [...Array(12).keys()]);
    const tEv = a.w('why1', 'every') - 0.05;
    // the slide: very fine steps (eighth tones) from C4 up to C5
    for (let k = 0; k <= 48; k++) a.note(60 + k * 0.25, tEv + k * 0.03, 0.06, { vel: 0.22, show: false });
    a.arc('C', 'C', tEv, a.at('why1b'), { steps: 12, color: GOLD, dr: 30, label: 'EVERY PITCH', labelR: 165 });
    a.tag(0, a.w('why1v', 'voice'), a.w('why1v', 'trombone'), 'LIKE A VOICE', { x: 540, y: 470, color: GOLD });
    a.tag(0, a.w('why1v', 'trombone'), a.at('why1b'), 'LIKE A TROMBONE', { x: 540, y: 470, color: GOLD });
    const tPi = a.w('why1b', 'piano') - 0.05;
    const steps = [];
    for (let k = 0; k <= 12; k++) { const t = tPi + 0.3 + k * 0.14; a.note(60 + k, t, 0.13, { vel: 0.32 }); steps.push([t, NAMES[k % 12]]); }
    a.walker(steps, { t1: S('why1').t1, dr: -40, color: BLUE, label: 'PIANO', labelDr: -55 });
    a.tag(0, a.at('why1b'), S('why1').t1, 'A PIANO CAN ONLY STEP', { x: 540, y: 470, color: BLUE });

    // why1c: playful, cheeky, jazzy -- the run again, then the blues
    a.scale(S('why1c').t0, 'Bb', BLUES);
    a.tag(1, S('why1c').t0, S('why1c').t1, 'Db', { color: BLUE, dr: -75 });
    const cr = run(S('why1c').t0 + 0.15, { hold: 0.6, show: false });
    a.walker(cr.pts, { t1: cr.end + 0.6, dr: -40, color: GOLD });
    a.tag(0, a.w('why1c', 'playful'), a.w('why1c', 'cheeky'), 'PLAYFUL', { x: 540, y: 470, color: TEAL });
    a.tag(0, a.w('why1c', 'cheeky'), a.w('why1c', 'jazzy'), 'CHEEKY', { x: 540, y: 470, color: GOLD });
    a.tag(0, a.w('why1c', 'jazzy'), S('why1c').t1, 'JAZZY', { x: 540, y: 470, color: BLUE });
    comp(cr.end + 0.05, S('why1c').t1 - 0.05, ['Bb7', 'Eb7'], { vel: 0.7 });

    // ---------- why2: blue notes, flat third (Db) and flat seventh (Ab) in B-flat ----------
    a.scale(S('why2').t0, 'Bb', a.T.MAJOR);
    const b0 = S('why2').t0, t3 = a.w('why2', 'third') - 0.05, t7 = a.w('why2', 'seventh') - 0.05;
    a.ch('Bb', b0 + 0.1, a.w('why2', 'blue') - 0.05, { notes: V.Bb, bass: 'Bb2', vel: 0.45 });
    a.ch('Bb7', a.w('why2', 'blue') - 0.05, S('why2').t1 - 0.1, { notes: ['D3', 'Ab3', 'Db4', 'F4'], bass: 'Bb2', vel: 0.5, label: 'Bb7 + Db', strikes: [{ o: 0, v: 1 }, { o: 1.0, v: 0.7 }, { o: 2.0, v: 0.8 }] });
    a.arc('D', 'C#', t3, S('why2').t1, { steps: -1, color: BLUE, dr: 30 });
    a.ring(['C#'], t3, S('why2').t1, { color: BLUE });
    a.tag(1, t3, S('why2').t1, 'FLAT 3RD · Db', { color: BLUE, dr: -92 });
    a.arc('A', 'Ab', t7, S('why2').t1, { steps: -1, color: BLUE, dr: 30 });
    a.ring(['Ab'], t7, S('why2').t1, { color: BLUE });
    a.tag(8, t7, S('why2').t1, 'FLAT 7TH', { color: BLUE, dr: -92 });
    a.note('Db4', t3, 0.6, { vel: 0.36 }); a.note('D4', t3 + 0.6, 0.6, { vel: 0.3 });
    a.note('Ab4', t7, 0.6, { vel: 0.36 }); a.note('Bb4', t7 + 0.6, 0.8, { vel: 0.3 });
    a.tag(0, a.w('why2', 'blue'), S('why2').t1, 'BLUE NOTES', { x: 540, y: 470, color: BLUE });

    // ---------- why3: jazz + concert piece ----------
    const gJ = a.grid([{ label: 'JAZZ', sub: 'RHYTHM · HARMONY', size: 64, color: BLUE }, { label: 'CONCERT', sub: 'PIANO + ORCHESTRA', size: 64, color: GOLD }],
      S('why3').t0 + 0.1, S('why3').t1, { rows: 1, cols: 2, cw: 440, chh: 230, y: 580, revealStep: 0.25 });
    const tForm = a.w('why3', 'form') - 0.1;
    gJ.active.push({ t0: S('why3').t0 + 0.2, t1: S('why3').t1, i: 0 }, { t0: tForm, t1: S('why3').t1, i: 1 });
    comp(S('why3').t0 + 0.1, tForm, ['Bb7', 'Eb7', 'Bb7', 'F7'], { vel: 0.75, hideName: true });
    a.ch('Bb', tForm, S('why3').t1 - 0.1, { notes: ['F3', 'Bb3', 'D4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.75, hideName: true, strikes: [{ o: 0, v: 1 }, { o: 1.2, v: 0.6 }] });
    for (let k = 0; k < 6; k++) a.note(['Bb4', 'D5', 'F5', 'Bb4', 'D5', 'F5'][k], tForm + 0.05 + k * 0.09, 0.4, { vel: 0.18, show: false });
    a.perc('kick', tForm, 0.6);
    a.big('+', S('why3').t0 + 0.4, S('why3').t1, { y: 695, size: 80, color: '#ffffff' });
    a.big('IN ONE PIECE', tForm, S('why3').t1, { y: 980, size: 64, color: '#ffffff' });

    // ---------- why4: free, episodic -- themes come and go ----------
    const EP = ['A', 'B', 'A', 'C', 'B', 'D'].map((l, i) => ({ label: l, sub: 'THEME', size: 60, subSize: 20, color: [GOLD, TEAL, GOLD, PINK, TEAL, BLUE][i] }));
    const gE = a.grid(EP, S('why4').t0 + 0.1, S('why4').t1, { rows: 1, cols: 6, cw: 160, chh: 190, y: 590, revealStep: 0.1, caption: 'FREE · EPISODIC' });
    const e0 = S('why4').t0 + 0.2, eLen = S('why4').t1 - e0 - 0.2;
    const DUR = [1.0, 0.7, 1.3, 0.8, 1.1, 1.2], tot = DUR.reduce((x, y) => x + y, 0);
    const EPC = [['Bb7'], ['Eb7'], ['Bb7'], ['F7'], ['Eb7'], ['Bb7']];
    let te = e0;
    DUR.forEach((d, i) => {
      const len = d * eLen / tot;
      gE.active.push({ t0: te, t1: te + len, i });
      if (i % 2 === 0) a.ch(EPC[i][0], te, te + len, { notes: V[EPC[i][0]], bass: R[EPC[i][0]], vel: 0.55, hideName: true, strikes: [{ o: 0, v: 1 }] });
      else comp(te, te + len, EPC[i], { vel: 0.55, hideName: true });
      te += len;
    });
    a.big('LIKE IMPROVISATION', a.w('why4', 'improvisation'), S('why4').t1, { y: 980, size: 56, color: GOLD });
    a.big('COME AND GO', a.w('why4', 'come'), a.w('why4', 'improvisation'), { y: 980, size: 64, color: TEAL });

    // ---------- essence: trill, slide, and a final blues chord ----------
    a.scale(S('essence').t0, 'Bb', BLUES);
    a.tag(1, S('essence').t0, S('essence').t1, 'Db', { color: BLUE, dr: -75 });
    const s0 = S('essence').t0 + 0.2;
    trill(s0, s0 + 0.7);
    const er = run(s0 + 0.7, { hold: 1.0 });
    a.walker([[s0, 'F'], ...er.pts], { t1: er.end + 1.0, dr: -40, color: GOLD });
    a.arc('F', 'Bb', s0 + 0.7, er.end + 1.0, { steps: 29, color: GOLD, dr: 30 });
    const fin = er.end + 0.1;
    comp(fin, fin + 2 * BAR, ['Bb7', 'Eb7'], { vel: 0.8 });
    a.ch('Bb7', fin + 2 * BAR, S('essence').t1 - 0.3, { notes: ['D3', 'Ab3', 'C4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.8 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
