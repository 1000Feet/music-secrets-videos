// The missing fundamental: tiny speakers can't play deep bass, yet you still hear the bass line.
// No copyrighted music: the bass riff is original. Sounds are additive tones (engine note option `tone`):
// a "full" bass note has its fundamental, a "phone" version keeps only harmonics 2-6.
const hz = f => 69 + 12 * Math.log2(f / 440);
const FULL = [1, 0.5, 0.36, 0.26, 0.18, 0.12];
const PHONE = [0, 0.6, 0.5, 0.4, 0.3, 0.2];
const ORGAN = [1, 0.35, 0.18, 0.1];
// original riff, in eighths
const RIFF = ['E2', 'E2', 'G2', 'E2', 'A2', 'G2', 'D2', 'E2'];

module.exports = {
  slug: 'missing-fundamental',
  title: 'The Bass Your Phone Can\'t Play',
  segments: [
    { id: 'hook',    text: 'Your phone speaker is too small for deep bass. So how can you still hear the bass line?' },
    { id: 'what',    text: 'Your brain fills in the missing note.' },
    { id: 'phone',   text: "Play a bass heavy song on a phone: the lowest notes aren't really there, yet you still follow the bass." },
    { id: 'organ',   text: 'Pipe organs fake very low notes the same way: two higher pipes, a note and its fifth, together.' },
    { id: 'organ2',  text: "It's called a resultant stop." },
    { id: 'why1',    text: 'So how does it work? A note at 100 hertz has overtones at 200, 300, 400, 500.' },
    { id: 'why2',    text: 'Remove the 100 completely, and play only 200, 300 and 400.' },
    { id: 'why3',    text: 'Your brain still hears 100: the spacing between the overtones.' },
    { id: 'why4',    text: "That's the missing fundamental." },
    { id: 'prod',    text: 'So producers add harmonics to bass sounds, with saturation or distortion...' },
    { id: 'prod2',   text: 'and the bass survives on small speakers.' },
    { id: 'organ3',  text: 'Same with the organ: pipes at two and three times a note...' },
    { id: 'organ4',  text: 'imply that note, an octave below the lower pipe.' },
    { id: 'essence', text: "The bass you hear on your phone isn't there. Your brain is playing it." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'TINY SPEAKER, DEEP BASS', title: 'THE MISSING BASS', accent: true, circle: false, tonic: 4, lead: 0.5, gap: 0.4, tail: 1.2 },
    { id: 'phone', segs: ['phone'], label: 'YOU HEAR IT', title: 'Bass on a Phone', sub: 'any bass heavy song · tiny speaker', circle: false, tonic: 4, tail: 2.4 },
    { id: 'organ', segs: ['organ', 'organ2'], label: 'YOU HEAR IT IN', title: 'Pipe Organs', sub: 'the resultant stop', circle: false, tonic: 0, gap: 0.3, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'OVERTONES OF 100 Hz', circle: false, tonic: 0, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why3', 'why4'], label: 'WHY IT WORKS', title: 'REMOVE THE 100', circle: false, tonic: 0, gap: 0.4, tail: 1.4 },
    { id: 'prod', segs: ['prod', 'prod2'], label: 'IN THE STUDIO', title: 'ADD HARMONICS', circle: false, tonic: 4, gap: 0.3, tail: 1.8 },
    { id: 'organ3', segs: ['organ3', 'organ4'], label: 'THE ORGAN TRICK', title: '2× + 3× → 1×', circle: false, tonic: 0, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'YOUR BRAIN PLAYS IT', accent: true, circle: false, tonic: 4, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const midi = n => a.T.midi(n);
    const sine = (f, t, dur, vel = 0.25, o = {}) => a.note(hz(f), t, dur, { vel, show: false, tone: { partials: [1], attack: o.attack ?? 0.04, release: o.release ?? 0.2 } });
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));

    // bass riff with a recipe; hats/snare (no kick: it would add real low end); keys light the line
    function riff(P, t0, t1, o = {}) {
      const e = o.e ?? 0.3, vel = o.vel ?? 0.42, nrm = 1 / Math.sqrt(P.reduce((s, x) => s + x * x, 0));
      let k = 0;
      for (let t = t0; t + e <= t1 + 0.01; t += e, k++) {
        const n = RIFF[k % RIFF.length];
        a.note(n, t, e * 0.85, { vel: vel * nrm, show: false, tone: { partials: P, attack: 0.008, release: 0.06, decay: 1.2 } });
        if (o.keys !== false) a.note(n, t, e * 0.85, { vel: 0, show: false });
        if (o.drums !== false) { a.perc('hat', t, 0.5); if (k % 4 === 2) a.perc('snare', t, 0.7); }
      }
    }
    // a bar chart: one grid cell per entry {h, color, lit, label}
    const BASE = 1100;
    function bars(list, t0, t1, o = {}) {
      const cw = o.cw ?? 130, hmax = o.hmax ?? 400, cx = o.cx ?? 540, n = list.length;
      return list.map((b, i) => {
        const hh = Math.round(hmax * b.h) + 20, x = cx + (i - (n - 1) / 2) * cw;
        const g = a.grid([{ label: b.text ?? '', color: b.color, size: b.size ?? 54 }], t0 + i * (o.step ?? 0), t1,
          { rows: 1, cols: 1, cw, chh: hh, y: BASE - hh + 8, x });
        if (b.lit !== false) g.active.push({ t0: t0 + i * (o.step ?? 0), t1, i: 0 });
        if (b.label) a.big(b.label, t0 + i * (o.step ?? 0), t1, { x, y: BASE + 38, size: o.labelSize ?? 30, ...MONO, color: b.labelColor ?? GREY, blur: 0 });
        g.x = x; g.hh = hh;
        return g;
      });
    }
    const H = [1, 0.6, 0.5, 0.4, 0.3, 0.2];

    // ---- hook: phone speaker - harmonics only, the fundamental bar is an empty outline (cover) ----
    const h1 = S('hook').t1, tBr = a.w('what', 'brain');
    const hb = bars(H.map((h, i) => ({ h, color: i ? TEAL : GOLD, lit: i > 0, label: (i + 1) + '×', labelColor: i ? GREY : GOLD })), 0.05, h1, { step: 0.04 });
    a.big('?', 0.1, tBr, { x: hb[0].x, y: BASE - hb[0].hh / 2 + 8, size: 110, color: GOLD, blur: 20 });
    hb[0].active.push({ t0: tBr - 0.05, t1: h1, i: 0 });
    a.big('LOWEST NOTE: NOT PLAYED', 0.1, tBr - 0.05, { y: 560, size: 40, ...MONO, color: '#ffffff', blur: 6 });
    a.big('YOUR BRAIN ADDS IT', tBr - 0.05, h1, { y: 560, size: 46, ...MONO, color: GOLD, blur: 12 });
    riff(PHONE, 0.15, h1 - 0.2);

    // ---- phone: a bass line - first on a big speaker, then on a phone ----
    const p0 = S('phone').t0, p1 = S('phone').t1, tPh = a.w('phone', 'phone') - 0.05;
    const tAre = a.w('phone', "aren't") - 0.05, tFol = a.w('phone', 'follow') - 0.05;
    riff(FULL, p0 + 0.1, tPh, { vel: 0.4 });
    riff(PHONE, tPh, p1 - 0.2);
    const g1 = a.grid([{ label: 'BIG SPEAKER', sub: 'ALL THE BASS', color: BLUE, size: 50 }, { label: 'PHONE', sub: 'NO LOW END', color: PINK, size: 50 }],
      p0 + 0.1, p1, { rows: 1, cols: 2, cw: 440, chh: 220, y: 520, revealStep: 0.2 });
    g1.active.push({ t0: p0 + 0.1, t1: tPh, i: 0 }, { t0: tPh, t1: p1, i: 1 });
    // the bass notes' fundamentals: bars that vanish on "aren't"
    const fb = bars(RIFF.slice(0, 4).map(n => ({ h: (midi(n) - 30) / 20, color: GOLD })), p0 + 0.2, tAre, { cw: 110, hmax: 220 });
    void fb;
    bars(RIFF.slice(0, 4).map(n => ({ h: (midi(n) - 30) / 20, color: GOLD, lit: false })), tAre - 0.3, p1, { cw: 110, hmax: 220 });
    a.big('GONE', tAre, tFol, { y: 800, size: 72, color: RED, blur: 16 });
    a.big('YOU STILL HEAR THE LINE', tFol, p1, { y: 800, size: 44, ...MONO, color: TEAL, blur: 10 });

    // ---- organ: two pipes, a note and its fifth -> a deeper note you "hear" ----
    const o0 = S('organ').t0, o1 = S('organ').t1, tTwo = a.w('organ', 'two') - 0.05, tTog = a.w('organ', 'together') - 0.05;
    const tRes = a.w('organ2', 'resultant') - 0.05;
    // pipe lengths: a longer pipe = a lower note (C2 ghost, C3, G3)
    const PIPES = [{ n: 'C2', h: 1, f: 65.41 }, { n: 'C3', h: 0.5, f: 130.81 }, { n: 'G3', h: 0.333, f: 196.22 }];
    const pg = bars(PIPES.map((p, i) => ({ h: p.h, color: i ? TEAL : GOLD, lit: false, label: p.n, labelColor: i ? TEAL : GOLD })), o0 + 0.1, o1, { cw: 170, hmax: 460, step: 0.1 });
    a.big('?', o0 + 0.2, tTog, { x: pg[0].x, y: BASE - pg[0].hh / 2 + 8, size: 90, color: GOLD, blur: 16 });
    pg[1].active.push({ t0: tTwo, t1: o1, i: 0 }); pg[2].active.push({ t0: tTwo + 0.4, t1: o1, i: 0 });
    pg[0].active.push({ t0: tTog, t1: o1, i: 0 });
    const org = (f, t, d, v = 0.26) => a.note(hz(f), t, d, { vel: v, show: false, tone: { partials: ORGAN, attack: 0.12, release: 0.4 } });
    org(130.81, tTwo, o1 - tTwo - 0.3); org(196.22, tTwo + 0.4, o1 - tTwo - 0.7);
    keys(['C3'], tTwo, o1); keys(['G3'], tTwo + 0.4, o1);
    a.big('TWO PIPES', tTwo, tTog, { y: 520, size: 52, ...MONO, color: TEAL, blur: 10 });
    a.big('YOU HEAR: C2', tTog, tRes, { y: 520, size: 52, ...MONO, color: GOLD, blur: 12 });
    a.big('RESULTANT STOP', tRes, o1, { y: 520, size: 52, ...MONO, color: GOLD, blur: 12 });
    // before the pipes: a soft C major organ chord
    [130.81, 164.81, 196.0, 261.63].forEach((f, i) => org(f, o0 + 0.15, tTwo - o0 - 0.4, 0.14));

    // ---- why1: 100 Hz and its overtones ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const OV = [100, 200, 300, 400, 500];
    const tOvs = [a.w('why1', '100'), a.w('why1', '200'), a.w('why1', '300'), a.w('why1', '400'), a.w('why1', '500')].map(t => t - 0.05);
    tOvs[0] = Math.min(tOvs[0], w0 + 0.3);
    OV.forEach((f, i) => {
      bars([{ h: H[i], color: i ? TEAL : GOLD, label: String(f), labelColor: i ? '#ffffff' : GOLD }], tOvs[i], w1 + 0.4, { cx: 540 + (i - 2) * 160, cw: 160 });
      sine(f, tOvs[i], w1 - tOvs[i] + 0.3, 0.3 * H[i]);
    });
    a.big('ONE NOTE', w0 + 0.3, a.w('why1', 'overtones'), { y: 560, size: 50, ...MONO, color: '#ffffff', blur: 6 });
    a.big('+100 · +100 · +100 · +100', a.w('why1', 'overtones'), w1 + 0.4, { y: 560, size: 44, ...MONO, color: TEAL, blur: 8 });

    // ---- why2-4: remove the 100 - the brain still hears it ----
    const r0 = S('why2').t0, r1 = S('why2').t1;
    const tRem = a.w('why2', 'Remove') - 0.05, tOnly = a.w('why2', 'only') - 0.05, tHear = a.w('why3', 'hears') - 0.05;
    const tSp = a.w('why3', 'spacing') - 0.05, tMis = a.at('why4') - 0.05;
    // 100 Hz: lit until "Remove", then an outline
    bars([{ h: 1, color: GOLD, label: '100', labelColor: GOLD }], r0, tRem + 0.3, { cx: 220, cw: 160 });
    const ghost = bars([{ h: 1, color: GOLD, lit: false, label: '100', labelColor: GOLD }], tRem, r1, { cx: 220, cw: 160 })[0];
    ghost.active.push({ t0: tHear, t1: r1, i: 0 });
    [200, 300, 400].forEach((f, i) => bars([{ h: H[i + 1], color: TEAL, label: String(f), labelColor: '#ffffff' }], r0, r1, { cx: 540 + (i - 1) * 160, cw: 160 }));
    bars([{ h: H[4], color: TEAL, label: '500', labelColor: '#ffffff' }], r0, tOnly + 0.3, { cx: 860, cw: 160 });
    // sound: full stack, then without 100 (and 500), then the stack again
    [100, 200, 300, 400, 500].forEach((f, i) => sine(f, r0 + 0.1, tRem - r0 - 0.1, 0.3 * H[i]));
    [200, 300, 400].forEach((f, i) => sine(f, tOnly, r1 - tOnly - 0.4, 0.3 * H[i + 1]));
    a.big('×', tRem, tHear, { x: 220, y: BASE - 210, size: 170, color: RED, blur: 16 });
    a.big('ONLY 200 · 300 · 400', tOnly, tHear, { y: 560, size: 44, ...MONO, color: TEAL, blur: 8 });
    a.big('YOU STILL HEAR 100', tHear, tMis, { y: 560, size: 48, ...MONO, color: GOLD, blur: 12 });
    [460, 620].forEach(x => a.big('+100', tSp, tMis, { x, y: 790, size: 34, ...MONO, color: TEAL, blur: 8 }));
    a.big('THE MISSING FUNDAMENTAL', tMis, r1, { y: 560, size: 48, color: GOLD, blur: 16 });

    // ---- prod: a pure sine bass vs a saturated bass, then the phone ----
    const q0 = S('prod').t0, q1 = S('prod').t1, tAdd = a.w('prod', 'harmonics') - 0.05, tSur = a.w('prod2', 'survives') - 0.05;
    const tSmall = a.w('prod2', 'small') - 0.05;
    bars([{ h: 1, color: GOLD, label: '1×', labelColor: GOLD }], q0 + 0.1, tSmall, { cx: 540 - 2.5 * 130 });
    bars([{ h: 1, color: GOLD, lit: false, label: '1×', labelColor: GOLD }], tSmall - 0.3, q1, { cx: 540 - 2.5 * 130 });
    bars(H.slice(1).map((h, i) => ({ h, color: PINK, label: (i + 2) + '×' })), tAdd, q1, { cx: 540 + 0.5 * 130, step: 0.12 });
    a.big('PURE SINE BASS', q0 + 0.2, tAdd, { y: 560, size: 46, ...MONO, color: '#ffffff', blur: 6 });
    a.big('+ SATURATION', tAdd, tSmall, { y: 560, size: 50, ...MONO, color: PINK, blur: 10 });
    a.big('ON A PHONE: STILL THERE', tSmall, q1, { y: 560, size: 44, ...MONO, color: TEAL, blur: 8 });
    riff([1], q0 + 0.1, tAdd, { vel: 0.5, drums: false });
    riff([1, 0.7, 0.55, 0.45, 0.35, 0.28], tAdd, tSmall, { vel: 0.45 });
    riff([0, 0.7, 0.55, 0.45, 0.35, 0.28], tSmall, q1 - 0.2, { vel: 0.45 });
    void tSur;

    // ---- organ3: 200 + 300 -> 100, an octave below the lower pipe ----
    const x0 = S('organ3').t0, x1 = S('organ3').t1;
    const tT2 = a.w('organ3', 'two') - 0.05, tT3 = a.w('organ3', 'three') - 0.05, tImp = a.w('organ4', 'imply') - 0.05;
    const tOct = a.w('organ4', 'octave') - 0.05;
    const og = bars([{ h: 1, color: GOLD, lit: false, label: '1×', labelColor: GOLD }, { h: 0.5, color: TEAL, lit: false, label: '2×' }, { h: 0.333, color: TEAL, lit: false, label: '3×' }],
      x0 + 0.1, x1, { cw: 200, hmax: 440, step: 0.1 });
    og[1].active.push({ t0: tT2, t1: x1, i: 0 }); og[2].active.push({ t0: tT3, t1: x1, i: 0 }); og[0].active.push({ t0: tImp, t1: x1, i: 0 });
    org(200, tT2, x1 - tT2 - 0.3); org(300, tT3, x1 - tT3 - 0.3);
    a.big('200 Hz + 300 Hz', tT2, tImp, { y: 520, size: 50, ...MONO, color: TEAL, blur: 8 });
    a.big('→ YOU HEAR 100 Hz', tImp, x1, { y: 520, size: 50, ...MONO, color: GOLD, blur: 12 });
    a.big('AN OCTAVE BELOW 200', tOct, x1, { y: 600, size: 34, ...MONO, color: '#ffffff', blur: 0 });

    // ---- essence: the riff on the phone, the missing bar lit by the brain ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tPl = a.w('essence', 'playing') - 0.05;
    const eb = bars(H.map((h, i) => ({ h, color: i ? TEAL : GOLD, lit: i > 0, label: (i + 1) + '×', labelColor: i ? GREY : GOLD })), e0 + 0.1, e1, { step: 0.04 });
    eb[0].active.push({ t0: tPl, t1: e1, i: 0 });
    a.big("NOT THERE", e0 + 0.3, tPl, { x: eb[0].x, y: BASE - eb[0].hh - 40, size: 30, ...MONO, color: GOLD, blur: 0 });
    a.big('YOUR BRAIN', tPl, e1, { x: eb[0].x + 40, y: BASE - eb[0].hh - 40, size: 30, ...MONO, color: GOLD, blur: 8 });
    riff(PHONE, e0 + 0.15, e1 - 0.4, { vel: 0.4 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
