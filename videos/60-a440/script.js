// Why A = 440 Hz: the standard tuning pitch is not magic, it's an agreement.
const hz = f => 69 + 12 * Math.log2(f / 440);   // frequency -> (fractional) midi note

module.exports = {
  slug: 'a440',
  title: 'Why A = 440 Hz',
  segments: [
    { id: 'hook',    text: 'Before a concert, the orchestra tunes to one single note. But who decided what that note is?' },
    { id: 'what',    text: "It's the A above middle C, and it vibrates 440 times every second." },
    { id: 'what2',   text: 'A equals 440 hertz: the standard tuning pitch.' },
    { id: 'oboe',    text: 'At the start of a concert, the oboe plays an A... and everyone tunes to it.' },
    { id: 'baroque', text: 'Baroque specialists often tune lower, to 415. About a half step down.' },
    { id: 'europe',  text: 'And many orchestras, especially in Europe, tune a little higher, around 442 or 443, for a brighter sound.' },
    { id: 'why1',    text: 'So why 440? For a long time, there was no single standard.' },
    { id: 'why2',    text: 'Tuning varied widely, from city to city and century to century.' },
    { id: 'london',  text: 'Then, in 1939, an international conference in London agreed on 440.' },
    { id: 'iso',     text: 'It later became the official standard ISO 16, in 1955, confirmed in 1975.' },
    { id: 'myth',    text: 'And 432? Some call it natural, or healing.' },
    { id: 'myth2',   text: 'There is no scientific evidence behind that claim.' },
    { id: 'essence', text: "There's nothing magic about 440. It's an agreement, so musicians everywhere can play together." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE TUNING NOTE', title: 'WHY A = 440 Hz', accent: true, tonic: 9, min: 6.0, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ABOVE MIDDLE C', title: 'A4', tonic: 9, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: '440 TIMES A SECOND', title: 'A = 440 Hz', tonic: 9, circle: false, tail: 0.6 },
    { id: 'oboe', segs: ['oboe'], label: 'YOU HEAR IT', title: "The Oboe's A", sub: 'Orchestra · start of a concert', tonic: 9, tail: 2.4 },
    { id: 'baroque', segs: ['baroque'], label: 'BAROQUE MUSIC TODAY', title: 'A = 415 Hz', tonic: 9, circle: false, tail: 2.2 },
    { id: 'europe', segs: ['europe'], label: 'MANY ORCHESTRAS', title: 'A = 442–443 Hz', tonic: 9, circle: false, tail: 1.4 },
    { id: 'why', segs: ['why1', 'why2'], label: 'BEFORE 1939', title: 'NO STANDARD', tonic: 9, gap: 0.35, tail: 0.8 },
    { id: 'london', segs: ['london'], label: 'LONDON · 1939', title: 'AN AGREEMENT', tonic: 9, circle: false, tail: 0.6 },
    { id: 'iso', segs: ['iso'], label: 'ISO 16', title: 'THE STANDARD', tonic: 9, circle: false, tail: 0.6 },
    { id: 'myth', segs: ['myth', 'myth2'], label: 'WHAT ABOUT 432?', title: 'THE 432 CLAIM', tonic: 9, circle: false, gap: 0.3, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'JUST AN AGREEMENT', accent: true, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', VIOLET = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    // light keys on the keyboard without sound
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    // a held tuning A at any frequency (sound only)
    const tone = (f, t0, dur, vel = 0.3) => a.note(hz(f), t0, dur, { vel, show: false });

    // ---- hook: one dot on A, the orchestra's A in every octave ----
    const h1 = S('hook').t1;
    a.scale(0.2, 'A', [0], { popIn: { t0: 0.3, step: 0.2 } });
    a.ring(['A'], 0.6, h1, { color: GOLD });
    a.big('440', 0.5, h1, { y: 800, size: 150, color: '#ffffff' });
    a.big('Hz', 0.7, h1, { y: 905, size: 44, ...MONO, color: GOLD });
    ['A4', 'A3', 'A5', 'A2'].forEach((n, i) => { const t = 0.4 + i * 0.7; tone(440 * Math.pow(2, +n[1] - 4), t, h1 - t - 0.3, i ? 0.2 : 0.3); });
    keys(['A4'], 0.4, 1.1); keys(['A3', 'A4'], 1.1, 1.8); keys(['A3', 'A4', 'A5'], 1.8, 2.5); keys(['A2', 'A3', 'A4', 'A5'], 2.5, h1);
    a.tag('A', a.w('hook', 'who'), h1, 'WHO CHOSE IT?', { color: GOLD, x: 540, y: 462 });

    // ---- what: the A, above middle C ----
    const tA = a.w('what', 'A'), tC = a.w('what', 'C'), t440 = a.w('what', '440'), wt1 = S('what').t1;
    a.scale(S('what').t0, 'A', [0]);
    a.note('A4', tA, tC - tA - 0.05, { vel: 0.3 });
    a.ring(['A'], tA, wt1, { color: GOLD });
    a.tag('A', tA, wt1, 'A4', { color: GOLD, dr: -92 });
    a.note('C4', tC, 0.7, { vel: 0.3 });
    a.tag('C', tC, wt1, 'MIDDLE C', { color: '#ffffff', dr: -92 });
    a.walker([[tC, 0], [tC + 0.45, 3], [tC + 0.6, 6], [tC + 0.75, 9]], { t1: wt1, dr: 34, color: '#ffffff' });
    a.arc('C', 'A', tC + 0.4, wt1, { steps: 9, color: TEAL, dr: 30, label: 'UP 9 HALF STEPS', labelR: 140 });
    a.note('A4', tC + 0.5, wt1 - tC - 0.6, { vel: 0.3 });
    a.big('440 per second', t440, wt1, { y: 462, size: 48, ...MONO, color: GOLD });

    // ---- what2: a vibrating wave, A = 440 Hz ----
    const w0 = S('what2').t0;
    a.lissajous(6, 1, w0 + 0.1, S('what2').t1, { drawIn: 1.6, drift: 0.9, r: 200, y: 800, color: TEAL });
    a.big('A = 440 Hz', w0 + 0.2, S('what2').t1, { y: 1060, size: 76, ...MONO, color: GOLD });
    a.big('THE STANDARD PITCH', a.w('what2', 'standard'), S('what2').t1, { y: 470, size: 40, ...MONO, color: '#ffffff' });
    tone(440, w0 + 0.1, S('what2').t1 - w0 - 0.2, 0.3);
    keys(['A4'], w0 + 0.1, S('what2').t1);

    // ---- oboe: one A, then the whole orchestra tunes in (slightly off, settling onto 440) ----
    const o0 = S('oboe').t0, tOboe = a.w('oboe', 'oboe'), tAll = a.w('oboe', 'everyone'), o1 = S('oboe').t1;
    a.scale(o0, 'A', [0]);
    tone(440, tOboe, o1 - tOboe - 0.2, 0.34);
    keys(['A4'], tOboe, tAll);
    a.ring(['A'], tOboe, o1, { color: GOLD });
    a.tag('A', tOboe, tAll, 'THE OBOE PLAYS A', { color: GOLD, x: 540, y: 830 });
    // other instruments come in a little sharp or flat and glide to the oboe's A
    const tuners = [[110, 0.5], [220, -0.35], [880, 0.3], [220, 0.2], [440, -0.25], [110, -0.4]];
    tuners.forEach(([f, cents], i) => {
      const t = tAll + 0.2 + i * 0.22, steps = 5;
      for (let k = 0; k < steps; k++) {
        const off = cents * (1 - k / steps) * (1 - k / steps);
        a.note(hz(f) + off, t + k * 0.28, 0.32, { vel: 0.11, show: false });
      }
      a.note(hz(f), t + steps * 0.28, Math.max(0.4, o1 - t - steps * 0.28 - 0.1), { vel: 0.12, show: false });
    });
    keys(['A2', 'A3', 'A4', 'A5'], tAll, o1);
    a.walker([[tAll, 8.6], [tAll + 0.5, 9.4], [tAll + 1.0, 8.75], [tAll + 1.5, 9.2], [tAll + 2.0, 8.9], [tAll + 2.5, 9]], { t1: o1, dr: 34, color: TEAL });
    a.tag('A', tAll + 0.2, o1, 'EVERYONE TUNES IN', { color: TEAL, x: 540, y: 830 });

    // ---- baroque / europe: three tuning pitches side by side ----
    const b0 = S('baroque').t0, e0 = S('europe').t0, e1 = S('europe').t1;
    const g = a.grid([
      { label: '415', sub: 'BAROQUE', size: 64, color: VIOLET },
      { label: '440', sub: 'STANDARD', size: 64, color: GOLD },
      { label: '442', sub: 'EUROPE', size: 64, color: TEAL },
    ], b0 + 0.1, e1, { rows: 1, cols: 3, cw: 300, chh: 230, y: 700, revealStep: 0.15, caption: 'A, IN HERTZ' });
    const tLow = a.w('baroque', 'lower'), t415 = a.w('baroque', '415');
    g.active.push({ t0: b0 + 0.3, t1: tLow, i: 1 });
    tone(440, b0 + 0.3, tLow - b0 - 0.4, 0.3);
    g.active.push({ t0: tLow, t1: e0, i: 0 });
    tone(415, tLow, a.end('baroque') - tLow, 0.3);
    a.big('ABOUT A HALF STEP LOWER', a.w('baroque', 'half'), e0, { y: 1070, size: 38, ...MONO, color: VIOLET });
    keys(['A4'], b0 + 0.3, tLow); keys(['Ab4'], tLow, e0);
    // a little cadence at A = 415 (everything shifted down)
    const low = n => a.T.midi(n) + hz(415) - 69;
    const CAD = [[['D3', 'F4', 'A4', 'D5'], 'Dm'], [['A2', 'E4', 'A4', 'C#5'], 'A'], [['D3', 'F4', 'A4', 'D5'], 'Dm']];
    const c0 = a.end('baroque') + 0.15, cl = (e0 - c0 - 0.2) / 3;
    CAD.forEach(([ns], i) => ns.forEach((n, j) => a.note(low(n), c0 + i * cl, cl * 0.95, { vel: j ? 0.18 : 0.24, show: false })));
    void t415;

    // europe: 440, then a touch higher - 442 - and a bright chord
    const tHigh = a.w('europe', 'higher'), tBright = a.w('europe', 'brighter');
    g.active.push({ t0: e0 + 0.2, t1: tHigh, i: 1 });
    tone(440, e0 + 0.2, tHigh - e0 - 0.3, 0.26);
    g.active.push({ t0: tHigh, t1: e1, i: 2 });
    tone(442, tHigh, tBright - tHigh, 0.28);
    keys(['A4'], e0 + 0.2, e1);
    a.big('442 – 443', a.w('europe', '442'), e1, { y: 1070, size: 52, ...MONO, color: TEAL });
    const high = n => a.T.midi(n) + hz(442) - 69;
    ['A2', 'E4', 'A4', 'C#5', 'E5'].forEach((n, j) => a.note(high(n), tBright, e1 - tBright - 0.1, { vel: j ? 0.16 : 0.22, show: false }));

    // ---- why: no standard - the A wobbles from city to city, century to century ----
    const y0 = S('why').t0, y1 = S('why').t1;
    a.scale(y0, 'A', [0]);
    const wob = [9, 8.3, 9.6, 8.6, 9.8, 8.2, 9.4, 8.5, 9.7, 8.35, 9.25, 8.8, 9.5, 8.4];
    const ws = (y1 - y0 - 0.6) / wob.length;
    const pts = wob.map((p, i) => [y0 + 0.3 + i * ws, p]);
    a.walker(pts, { t1: y1, dr: 0, color: PINK, label: 'A?', labelDr: -60 });
    pts.forEach(([t, p], i) => a.note(hz(440) + (p - 9), t, ws * 0.95, { vel: i ? 0.2 : 0.26, show: false }));
    a.arc(8.1, 9.9, a.w('why1', 'no'), y1, { steps: 1.8, color: PINK, dr: 34 });
    a.tag('A', a.w('why2', 'city'), a.w('why2', 'century'), 'CITY TO CITY', { x: 540, y: 462, color: PINK });
    a.tag('A', a.w('why2', 'century'), y1, 'CENTURY TO CENTURY', { x: 540, y: 462, color: PINK });

    // ---- london 1939: everyone agrees ----
    const l0 = S('london').t0, l1 = S('london').t1;
    a.big('1939', l0 + 0.2, l1, { y: 700, size: 150, color: '#ffffff' });
    a.big('LONDON', a.w('london', 'London'), l1, { y: 860, size: 56, ...MONO, color: TEAL });
    a.big('A = 440', a.w('london', 'agreed'), l1, { y: 1010, size: 64, ...MONO, color: GOLD });
    tone(440, a.w('london', 'agreed'), l1 - a.w('london', 'agreed') - 0.1, 0.3);
    tone(220, a.w('london', 'agreed') + 0.15, l1 - a.w('london', 'agreed') - 0.3, 0.2);
    keys(['A3', 'A4'], a.w('london', 'agreed'), l1);

    // ---- iso 16: 1955, confirmed 1975 ----
    const i0 = S('iso').t0, i1 = S('iso').t1;
    a.big('ISO 16', i0 + 0.2, i1, { y: 700, size: 130, color: '#ffffff' });
    const g2 = a.grid([{ label: '1955', sub: 'ADOPTED', size: 56, color: GOLD }, { label: '1975', sub: 'CONFIRMED', size: 56, color: TEAL }],
      a.w('iso', '1955') - 0.1, i1, { rows: 1, cols: 2, cw: 320, chh: 200, y: 840, revealStep: 0 });
    g2.active.push({ t0: a.w('iso', '1955'), t1: a.w('iso', '1975'), i: 0 });
    g2.active.push({ t0: a.w('iso', '1975'), t1: i1, i: 1 });
    a.ch('A', i0 + 0.1, i1 - 0.1, { notes: ['A3', 'C#4', 'E4', 'A4'], bass: 'A2', vel: 0.55, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: 2.4, v: 0.5 }] });

    // ---- myth: 432 vs evidence ----
    const m0 = S('myth').t0, m1 = S('myth').t1, tNo = a.w('myth2', 'no');
    a.big('432 Hz ?', m0 + 0.2, m1, { y: 700, size: 110, ...MONO, color: GOLD });
    a.big('"NATURAL"  "HEALING"', a.w('myth', 'natural'), tNo, { y: 880, size: 40, ...MONO, color: '#b9b9c2' });
    a.big('NO SCIENTIFIC EVIDENCE', tNo, m1, { y: 880, size: 46, ...MONO, color: RED });
    tone(432, m0 + 0.3, tNo - m0 - 0.4, 0.28);
    tone(440, tNo, m1 - tNo - 0.2, 0.22);
    keys(['A4'], m0 + 0.3, m1);

    // ---- essence: the A in every octave, then an A major chord, all at 440 ----
    const e2 = S('essence').t0 + 0.1, eEnd = S('essence').t1;
    a.scale(S('essence').t0, 'A', [0]);
    a.ring(['A'], e2, eEnd, { color: GOLD });
    a.big('440', e2, a.at('cta'), { y: 800, size: 150, color: '#ffffff' });
    a.big('Hz', e2 + 0.2, a.at('cta'), { y: 905, size: 44, ...MONO, color: GOLD });
    ['A2', 'A3', 'A4', 'A5'].forEach((n, i) => a.note(n, e2 + i * 0.3, a.at('cta') - e2 - i * 0.3, { vel: 0.2, show: false }));
    keys(['A2', 'A3', 'A4', 'A5'], e2, a.at('cta'));
    a.tag('A', a.w('essence', 'agreement'), a.at('cta'), 'AN AGREEMENT', { color: GOLD, x: 540, y: 462 });
    a.ch('A', a.at('cta') - 0.1, eEnd - 0.3, { notes: ['A3', 'C#4', 'E4', 'A4'], bass: 'A2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
