// Guitar harmonics: touching (not pressing) a string at 1/2, 1/3, 1/4, 1/5 of its length makes a node and
// leaves only the 2nd, 3rd, 4th, 5th harmonic ringing. No copyrighted music: only demonstrations on the
// open A string (110 Hz) and original little harmonic arpeggios. Bell-like harmonics, plucks and the
// tuning beats are additive tones (engine note option `tone`) at the true harmonic frequencies.
const A2 = 110, E2 = 82.407;
const hz = f => 69 + 12 * Math.log2(f / 440);
const GUITAR = [1, 0.75, 0.5, 0.38, 0.28, 0.2, 0.14, 0.1, 0.07, 0.05];
const BELL = [1, 0.06, 0.02];
const NOTE = { 1: 'A', 2: 'A', 3: 'E', 4: 'A', 5: 'C#' };
const ORD = { 1: '1ST', 2: '2ND', 3: '3RD', 4: '4TH', 5: '5TH' };

module.exports = {
  slug: 'guitar-harmonics',
  title: 'Guitar Harmonics',
  segments: [
    { id: 'hook',    text: 'Barely touch a guitar string at the twelfth fret, then pluck. A bell rings out.' },
    { id: 'what',    text: "Those are natural harmonics: touch, don't press, over certain frets." },
    { id: 'more',    text: 'Over the seventh fret, a higher bell. Over the fifth, higher still.' },
    { id: 'why1',    text: 'So why does it work? A string hides a whole series of harmonics.' },
    { id: 'h2',      text: 'At the twelfth fret, halfway, the string splits into two halves: one octave up.' },
    { id: 'h3',      text: 'At the seventh, a third of the way: three segments, an octave and a fifth.' },
    { id: 'h4',      text: 'At the fifth, a quarter: four segments, two octaves.' },
    { id: 'h5',      text: 'Near the fourth: five segments, two octaves and a major third.' },
    { id: 'node',    text: 'Your light touch makes a still point, called a node.' },
    { id: 'node2',   text: 'It kills every vibration that would need to move there.' },
    { id: 'tune',    text: 'Guitarists even tune with harmonics.' },
    { id: 'tune2',   text: 'Fifth fret on one string, seventh on the next. If they differ, you hear beats.' },
    { id: 'essence', text: 'A light touch, the right spot, and the string reveals its hidden harmonics.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: "TOUCH, DON'T PRESS", title: 'GUITAR HARMONICS', accent: true, circle: false, tonic: 9, lead: 0.4, tail: 1.2 },
    { id: 'what', segs: ['what'], label: 'YOU HEAR IT', title: 'Natural Harmonics', sub: 'touch over the fret · pluck', circle: false, tonic: 9, tail: 2.0 },
    { id: 'more', segs: ['more'], label: 'YOU HEAR IT', title: 'Higher Bells', sub: '7th fret · 5th fret', circle: false, tonic: 9, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'HIDDEN HARMONICS', circle: false, tonic: 9, tail: 1.2 },
    { id: 'h2', segs: ['h2'], label: '12TH FRET · ONE HALF', title: '2ND HARMONIC', circle: false, tonic: 9, tail: 1.2 },
    { id: 'h3', segs: ['h3'], label: '7TH FRET · ONE THIRD', title: '3RD HARMONIC', circle: false, tonic: 9, tail: 1.2 },
    { id: 'h4', segs: ['h4'], label: '5TH FRET · ONE QUARTER', title: '4TH HARMONIC', circle: false, tonic: 9, tail: 1.2 },
    { id: 'h5', segs: ['h5'], label: '4TH FRET · ONE FIFTH', title: '5TH HARMONIC', circle: false, tonic: 9, tail: 1.4 },
    { id: 'node', segs: ['node', 'node2'], label: 'WHY IT WORKS', title: 'THE NODE', circle: false, tonic: 9, gap: 0.3, tail: 1.4 },
    { id: 'tune', segs: ['tune', 'tune2'], label: 'WHY IT WORKS', title: 'TUNING BY EAR', circle: false, tonic: 4, gap: 0.3, tail: 2.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A LIGHT TOUCH', accent: true, circle: false, tonic: 9, gap: 0.4, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', LILAC = '#b48cff';
    const HC = { 1: WHITE, 2: TEAL, 3: BLUE, 4: LILAC, 5: PINK };
    const MONO = { family: 'DM Mono', weight: 500 };

    // ---------- sound ----------
    const pluck = (f, t, dur = 1.6, vel = 0.3) => { a.note(hz(f), t, dur, { vel, show: false, tone: { partials: GUITAR, attack: 0.004, decay: 1.4, release: 0.3 } }); a.note(Math.round(hz(f)), t, Math.min(dur, 1.0), { vel: 0, show: false }); };
    const bell = (f, t, dur = 2.0, vel = 0.32, light = true) => {
      a.note(hz(f), t, dur, { vel, show: false, tone: { partials: BELL, attack: 0.004, decay: 1.1, release: 0.6 } });
      if (light) a.note(Math.round(hz(f)), t, Math.min(dur, 1.2), { vel: 0, show: false });
    };
    const harm = (h, t, dur, vel) => bell(A2 * h, t, dur, vel);

    // ---------- the neck: nut, frets, one string ----------
    const L = 110, R = 970, LEN = R - L;
    const fretX = k => L + (1 - Math.pow(2, -k / 12)) * LEN;
    const SY = 735;
    function neck(t0, t1, o = {}) {
      const y0 = o.y0 ?? SY - 105, y1 = o.y1 ?? SY + 105;
      const bar = (x, w, col, alpha) => a.grid([{ label: '', color: col }], t0, t1, { rows: 1, cols: 1, cw: w + 16, chh: y1 - y0 + 16, x, y: y0 - 8 });
      bar(L, 12, WHITE); bar(R, 12, WHITE);
      for (let k = 1; k <= 19; k++) bar(fretX(k), 3, '#9a9aa2');
      [3, 5, 7, 9, 12, 15, 17, 19].forEach(k => a.big(String(k), t0, t1, { x: (fretX(k - 1) + fretX(k)) / 2, y: y1 + 32, size: 24, ...MONO, color: [4, 5, 7, 12].includes(k) ? '#c9c9d0' : '#5a5a62', blur: 0 }));
      (o.strings ?? [SY]).forEach(y => a.grid([{ label: '', color: WHITE }], t0, t1, { rows: 1, cols: 1, cw: LEN + 16, chh: 20, x: L + LEN / 2, y: y - 10 }));
    }
    // a standing wave with n segments: two mirrored dotted curves that flicker while it rings
    function wave(n, t0, t1, o = {}) {
      const y = o.y ?? SY, A = o.amp ?? 85, x0 = o.x0 ?? L, x1 = o.x1 ?? R, col = o.color ?? HC[n] ?? TEAL, size = o.size ?? 13;
      const step = o.step ?? 13, N = Math.round((x1 - x0) / step), ring = o.ring ?? [[t0, t1]];
      for (const sgn of [1, -1]) {
        for (let i = 1; i < N; i++) {
          const u = i / N, yy = y + sgn * A * Math.sin(n * Math.PI * u);
          const g = a.grid([{ label: '', color: col }], t0, t1, { rows: 1, cols: 1, cw: size + 16, chh: size + 16, x: x0 + u * (x1 - x0), y: yy - (size + 16) / 2 });
          for (const [r0, r1] of ring) for (let t = r0 + (sgn > 0 ? 0 : 0.06); t < r1; t += 0.12) g.active.push({ t0: t, t1: Math.min(r1, t + 0.06), i: 0 });
        }
      }
      if (o.nodes !== false) for (let k = 1; k < n; k++) {
        const g = a.grid([{ label: '', color: GOLD }], t0, t1, { rows: 1, cols: 1, cw: 30, chh: 30, x: x0 + (k / n) * (x1 - x0), y: y - 15 });
        g.active.push({ t0, t1, i: 0 });
      }
    }
    // finger marker over a fret
    const finger = (x, t0, t1, o = {}) => {
      a.big(o.text ?? '▼ TOUCH', t0, t1, { x, y: (o.y ?? SY) - 150, size: o.size ?? 30, ...MONO, color: GOLD, blur: 8 });
      const g = a.grid([{ label: '', color: GOLD }], t0, t1, { rows: 1, cols: 1, cw: 40, chh: 40, x, y: (o.y ?? SY) - 20 });
      g.active.push({ t0, t1, i: 0 });
    };
    // ladder of the first five harmonics of the A string
    function ladder(t0, t1, lit = []) {
      const g = a.grid([1, 2, 3, 4, 5].map(h => ({ label: NOTE[h], sub: '×' + h, color: HC[h], size: 48 })), t0, t1, { rows: 1, cols: 5, cw: 176, chh: 140, y: 935 });
      lit.forEach(([h, r0, r1]) => g.active.push({ t0: r0, t1: r1, i: h - 1 }));
      return g;
    }
    const FR = { 2: 12, 3: 7, 4: 5, 5: 4 };
    const fx = h => (h === 5 ? L + LEN / 5 : fretX(FR[h]));

    // ---- hook: the 12th-fret harmonic on the A string (cover: neck, touch, two halves at once) ----
    const h1 = S('hook').t1;
    neck(0.05, h1);
    finger(fx(2), 0.1, h1);
    const tPl = a.w('hook', 'pluck') - 0.05, tBe = a.w('hook', 'bell') - 0.05;
    wave(2, 0.1, h1, { ring: [[0.1, 1.6], [tPl, h1]] });
    harm(2, 0.15, 1.8, 0.3);
    harm(2, tPl, 2.4, 0.34);
    harm(2, tBe + 0.3, h1 - tBe - 0.3, 0.26);
    a.big('1/2', 0.1, h1, { x: fx(2), y: SY + 95, size: 36, ...MONO, color: GOLD, blur: 6 });
    a.big('A BELL RINGS OUT', tBe, h1, { y: 500, size: 44, color: TEAL, blur: 10 });
    a.big('12TH FRET', a.w('hook', 'twelfth') - 0.05, tBe, { y: 500, size: 44, ...MONO, color: GOLD, blur: 6 });

    // ---- what: touch, don't press - pressed note vs harmonic, then an original harmonic arpeggio ----
    const w0 = S('what').t0, w1 = S('what').t1;
    neck(w0 + 0.05, w1);
    const tTo = a.w('what', 'touch') - 0.05, tPr = a.w('what', 'press') - 0.05;
    a.big('TOUCH ✓', tTo, w1, { x: 330, y: 500, size: 44, color: TEAL, blur: 8 });
    a.big("PRESS ✗", tPr, w1, { x: 760, y: 500, size: 44, color: RED, blur: 8 });
    finger(fx(2), tTo, w1);
    pluck(A2 * 2, tPr, 0.5, 0.3);    // a pressed 12th fret: a plain, plucky note
    const ARP = [2, 3, 4, 3, 2, 4, 3, 2];
    const tA = a.end('what') + 0.15;
    const ringW = [[w0 + 0.1, tTo]];
    harm(2, w0 + 0.15, 1.2, 0.28);
    ARP.forEach((h, i) => harm(h, tA + i * 0.24, 1.4, 0.24));
    ringW.push([tA, w1]);
    wave(2, w0 + 0.1, w1, { ring: ringW, amp: 70 });

    // ---- more: 7th fret (three segments) and 5th fret (four segments) ----
    const m0 = S('more').t0, m1 = S('more').t1, tSe = a.w('more', 'seventh') - 0.05, tFi = a.w('more', 'fifth') - 0.05;
    neck(m0 + 0.05, m1);
    wave(3, tSe, tFi, { amp: 75 }); finger(fx(3), tSe, tFi);
    wave(4, tFi, m1, { amp: 70 }); finger(fx(4), tFi, m1);
    harm(3, tSe + 0.1, 1.6, 0.32); harm(3, a.w('more', 'bell') - 0.05, 1.2, 0.26);
    harm(4, tFi + 0.1, 1.6, 0.32);
    a.big('HIGHER', tSe, tFi, { y: 500, size: 46, color: BLUE, blur: 10 });
    a.big('HIGHER STILL', tFi, m1, { y: 500, size: 46, color: LILAC, blur: 10 });
    const tM = a.end('more') + 0.1;
    [4, 3, 2, 3, 4, 5, 4].forEach((h, i) => harm(h, tM + i * 0.25, 1.2, 0.24));

    // ---- why1: the harmonic series, one string drawn five ways ----
    const y0 = S('why1').t0, y1 = S('why1').t1, tSer = a.w('why1', 'series') - 0.05;
    const ROWY = [570, 680, 790, 900, 1010];
    function stack(t0, t1, ringFn, o = {}) {
      ROWY.forEach((y, i) => {
        const h = i + 1, ta = t0 + i * (o.step ?? 0);
        a.grid([{ label: '', color: WHITE }], ta, t1, { rows: 1, cols: 1, cw: 700 + 16, chh: 18, x: 590, y: y - 9 });
        wave(h, ta, t1, { y, amp: 38, x0: 240, x1: 940, size: 10, step: 12, ring: ringFn(h, ta) });
        a.big('×' + h, ta, t1, { x: 105, y, size: 36, ...MONO, color: HC[h], blur: 0 });
        a.big(NOTE[h], ta, t1, { x: 185, y, size: 40, color: HC[h], blur: 6 });
      });
    }
    const tH = a.w('why1', 'harmonics') - 0.05;
    stack(y0 + 0.1, y1, (h, ta) => [[Math.max(ta, tSer + (h - 1) * 0.25), y1]], { step: 0.12 });
    pluck(A2, y0 + 0.2, 2.2, 0.32);
    [1, 2, 3, 4, 5].forEach(h => a.note(hz(A2 * h), tSer + (h - 1) * 0.25, y1 - tSer - (h - 1) * 0.25 - 0.2, { vel: 0.26 / h, show: false, tone: { partials: [1], attack: 0.05, release: 0.3 } }));
    a.big('ONE STRING · MANY VIBRATIONS', tH, y1, { y: 470, size: 32, ...MONO, color: WHITE, blur: 0 });

    // ---- h2..h5: touch at 1/n -> n segments -> the nth harmonic ----
    const RES = { 2: '+ 1 OCTAVE', 3: '+ OCTAVE AND A FIFTH', 4: '+ 2 OCTAVES', 5: '+ 2 OCTAVES AND A MAJOR 3RD' };
    const FRAC = { 2: '1/2', 3: '1/3', 4: '1/4', 5: '1/5' };
    [2, 3, 4, 5].forEach(h => {
      const id = 'h' + h, s0 = S(id).t0, s1 = S(id).t1;
      neck(s0 + 0.05, s1);
      const tSeg = a.w(id, h === 2 ? 'halves' : 'segments') - 0.05;
      finger(fx(h), s0 + 0.15, s1, { text: '▼ ' + FRAC[h] });
      wave(h, s0 + 0.15, s1, { amp: 80, ring: [[tSeg, s1]] });
      ladder(s0 + 0.1, s1, [[1, s0 + 0.1, s1], [h, tSeg, s1]]);
      harm(h, s0 + 0.3, 1.0, 0.24);
      harm(h, tSeg, 1.8, 0.32);
      pluck(A2, tSeg + 1.0, 0.6, 0.2);
      harm(h, s1 - 1.3, 1.2, 0.28);
      a.big(RES[h], a.w(id, h === 2 ? 'octave' : h === 5 ? 'major' : h === 3 ? 'octave' : 'octaves') - 0.3, s1, { y: 495, size: h === 5 ? 34 : 40, ...MONO, color: HC[h], blur: 8 });
    });

    // ---- node: the touched point stands still; odd harmonics would need to move there ----
    const n0 = S('node').t0, n1 = S('node').t1, tSt = a.w('node', 'still') - 0.05, tNo = a.w('node', 'node') - 0.05;
    const tK = a.w('node2', 'kills') - 0.05;
    neck(n0 + 0.05, tK);
    wave(2, n0 + 0.1, tK, { amp: 85 });
    finger(fx(2), n0 + 0.1, tK, { text: '▼ NODE' });
    a.big('STILL POINT', tSt, tK, { y: 500, size: 46, color: GOLD, blur: 10 });
    harm(2, n0 + 0.2, 2.0, 0.28); harm(2, tNo, 2.0, 0.26);
    // after "kills": four small strings, the ones that move at the middle are crossed out
    ROWY.slice(0, 4).forEach((y, i) => {
      const h = i + 1, ok = h % 2 === 0, x0 = 240, x1 = 940;
      a.grid([{ label: '', color: WHITE }], tK, n1, { rows: 1, cols: 1, cw: 716, chh: 18, x: 590, y: y - 9 });
      wave(h, tK + i * 0.12, n1, { y, amp: 38, x0, x1, size: 10, step: 12, color: ok ? HC[h] : '#5a5a62', ring: ok ? [[tK + 0.3, n1]] : [], nodes: false });
      a.big('×' + h, tK, n1, { x: 120, y, size: 36, ...MONO, color: ok ? HC[h] : RED, blur: 0 });
      a.big(ok ? '✓' : '✗', tK + 0.3, n1, { x: 1000, y, size: 44, color: ok ? TEAL : RED, blur: 6 });
    });
    a.grid([{ label: '', color: GOLD }], tK, n1, { rows: 1, cols: 1, cw: 22, chh: 470, x: 590, y: 530 }).active.push({ t0: tK, t1: n1, i: 0 });
    a.big('TOUCHED HERE', tK, n1, { x: 590, y: 1085, size: 28, ...MONO, color: GOLD, blur: 0 });
    pluck(A2, tK, 0.25, 0.3);
    harm(2, tK + 0.3, 1.6, 0.26); harm(4, tK + 0.3, 1.6, 0.12);

    // ---- tune: 5th-fret harmonic of the low E vs 7th-fret harmonic of the A string ----
    const u0 = S('tune').t0, u1 = S('tune').t1;
    const YE = 800, YA = 670;
    neck(u0 + 0.05, u1, { y0: 590, y1: 880, strings: [YA, YE] });
    a.big('A', u0 + 0.05, u1, { x: 60, y: YA, size: 40, color: WHITE, blur: 0 });
    a.big('E', u0 + 0.05, u1, { x: 60, y: YE, size: 40, color: WHITE, blur: 0 });
    const tF5 = a.w('tune2', 'Fifth') - 0.05, tS7 = a.w('tune2', 'seventh') - 0.05, tDi = a.w('tune2', 'differ') - 0.05, tBt = a.w('tune2', 'beats') - 0.05;
    const tOk = a.end('tune2') + 0.9;
    wave(4, tF5, u1, { y: YE, amp: 42, size: 11, color: LILAC, ring: [[tF5, tF5 + 1.2], [tDi, u1]] });
    a.big('5', tF5, u1, { x: fretX(5) - 30, y: YE - 60, size: 30, ...MONO, color: GOLD, blur: 6 });
    wave(3, tS7, u1, { y: YA, amp: 42, size: 11, color: BLUE, ring: [[tS7, tS7 + 1.2], [tDi, u1]] });
    a.big('7', tS7, u1, { x: fretX(7) - 30, y: YA - 60, size: 30, ...MONO, color: GOLD, blur: 6 });
    // harmonics with decays slow enough to hear the beating
    const sine = (f, t, dur, vel) => a.note(hz(f), t, dur, { vel, show: false, tone: { partials: BELL, attack: 0.004, decay: 0.35, release: 0.5 } });
    const EH = 4 * E2, AH = 3 * A2, DET = AH - 2.6;
    a.big('THE SAME E', u0 + 0.3, tF5, { y: 500, size: 44, ...MONO, color: WHITE, blur: 6 });
    sine(4 * E2, u0 + 0.3, 1.4, 0.28); sine(AH, u0 + 0.9, 1.4, 0.28); a.note('E4', u0 + 0.3, 1.6, { vel: 0, show: false });
    sine(DET, tF5, 1.5, 0.3); sine(AH, tS7, 1.5, 0.3); a.note('E4', tF5, tS7 - tF5 + 1.2, { vel: 0, show: false });
    sine(DET, tDi, tOk - tDi - 0.3, 0.3); sine(AH, tDi, tOk - tDi - 0.3, 0.3); a.note('E4', tDi, tOk - tDi, { vel: 0, show: false });
    const gb = a.grid([{ label: 'BEATS', color: RED, size: 46 }], tDi, tOk, { rows: 1, cols: 1, cw: 330, chh: 110, y: 950 });
    for (let t = tDi; t < tOk; t += 1 / 2.6) gb.active.push({ t0: t, t1: t + 0.16, i: 0 });
    a.big('WAH · WAH · WAH', tBt, tOk, { y: 500, size: 44, ...MONO, color: RED, blur: 8 });
    a.big('IN TUNE: ONE STEADY BELL', tOk, u1, { y: 500, size: 40, ...MONO, color: TEAL, blur: 8 });
    a.grid([{ label: 'STEADY', color: TEAL, size: 46 }], tOk, u1, { rows: 1, cols: 1, cw: 330, chh: 110, y: 950 }).active.push({ t0: tOk, t1: u1, i: 0 });
    a.big('(SEE OUR BEATS VIDEO)', tBt, u1, { y: 1100, size: 24, ...MONO, color: GREY, blur: 0 });
    sine(EH, tOk, u1 - tOk - 0.4, 0.3); sine(AH, tOk, u1 - tOk - 0.4, 0.3); a.note('E4', tOk, u1 - tOk - 0.3, { vel: 0, show: false });
    void EH;

    // ---- essence: the whole series again, rung one by one ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tCta = a.at('cta');
    stack(e0 + 0.1, e1, (h, ta) => [[ta, e1]], { step: 0.1 });
    [2, 3, 4, 5].forEach((h, i) => harm(h, e0 + 0.3 + i * 0.4, 1.6, 0.26));
    const tR = a.w('essence', 'reveals') - 0.05;
    [2, 3, 4, 5, 4, 3, 2].forEach((h, i) => harm(h, tR + i * 0.22, 1.2, 0.2));
    [2, 3, 4, 5].forEach((h, i) => harm(h, tCta + 0.2 + i * 0.08, e1 - tCta - 0.6, 0.18));
    a.cta(tCta + 0.6, 'Leave a song in the comments');
  },
};
