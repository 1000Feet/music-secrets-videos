// Why the piano is called "piano": pianoforte = soft-loud. Dynamics controlled by touch.
// Haydn's Surprise theme (public domain) is played exactly as given in the brief.
module.exports = {
  slug: 'pianoforte',
  title: 'Why the Piano Is Called Piano',
  segments: [
    { id: 'hook',    text: 'In Italian, piano means soft. So why is the piano named... soft?' },
    { id: 'what',    text: 'Its full name is pianoforte. Soft, loud. And your touch decides which.' },
    { id: 'haydn',   text: "Haydn's Surprise Symphony, 1791. A quiet, gentle theme..." },
    { id: 'bang',    text: 'and then, out of nowhere, a loud chord.' },
    { id: 'cristo',  text: 'Around 1700 in Florence, Bartolomeo Cristofori built the first pianos.' },
    { id: 'cristo2', text: 'He called it gravicembalo col piano e forte. A harpsichord with soft and loud.' },
    { id: 'why1',    text: 'So why that name? A harpsichord plucks its strings. Press harder, and it hardly gets louder.' },
    { id: 'why2',    text: "A piano's hammers strike the strings. Press harder, and it plays louder." },
    { id: 'dyn',     text: "That's what dynamics are: from pianissimo to fortissimo." },
    { id: 'cresc',   text: 'Crescendo, getting louder. Diminuendo, getting softer.' },
    { id: 'pedal',   text: 'The sustain pedal lifts the dampers, so the notes keep ringing.' },
    { id: 'soft',    text: 'On a grand, the soft pedal shifts the hammers to strike fewer strings.' },
    { id: 'essence', text: 'Same notes, soft or loud. The piano gave every player control over both.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'PIANO = SOFT', title: 'WHY "PIANO"?', accent: true, circle: false, tonic: 0, min: 5.0, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'SOFT + LOUD', title: 'PIANOFORTE', tonic: 0, tail: 1.0 },
    { id: 'haydn', segs: ['haydn'], label: 'YOU HEAR IT IN', title: 'Surprise Symphony', sub: 'Haydn · No. 94 · 1791', circle: false, tonic: 0, tail: 4.6 },
    { id: 'bang', segs: ['bang'], label: 'YOU HEAR IT IN', title: 'Surprise Symphony', sub: 'Haydn · No. 94 · 1791', circle: false, tonic: 0, lead: 1.3, tail: 0.8 },
    { id: 'cristo', segs: ['cristo', 'cristo2'], label: 'FLORENCE · AROUND 1700', title: 'CRISTOFORI', circle: false, tonic: 0, gap: 0.35, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'PLUCKED', circle: false, tonic: 0, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'STRUCK', circle: false, tonic: 0, tail: 1.2 },
    { id: 'dyn', segs: ['dyn'], label: 'DYNAMICS', title: 'pp TO ff', circle: false, tonic: 0, tail: 1.4 },
    { id: 'cresc', segs: ['cresc'], label: 'DYNAMICS', title: 'LOUDER, SOFTER', circle: false, tonic: 0, tail: 1.2 },
    { id: 'pedal', segs: ['pedal'], label: 'THE RIGHT PEDAL', title: 'SUSTAIN', tonic: 0, tail: 1.4 },
    { id: 'soft', segs: ['soft'], label: 'THE LEFT PEDAL', title: 'UNA CORDA', tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SOFT OR LOUD', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', GREEN = '#7be07b', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };

    // a 10-cell loudness meter (green -> gold -> red); level 0..1 lights the first cells
    const MCOL = [GREEN, GREEN, GREEN, '#b9e05a', GOLD, GOLD, ORANGE, ORANGE, RED, RED];
    const meter = (t0, t1, o = {}) => a.grid(MCOL.map(c => ({ label: '', color: c })), t0, t1, { rows: 1, cols: 10, cw: 92, chh: o.chh ?? 120, y: o.y ?? 700, caption: o.caption, revealStep: o.revealStep ?? 0.03 });
    const level = (g, t0, t1, v) => { const n = Math.max(1, Math.round(v * 10)); for (let i = 0; i < n; i++) g.active.push({ t0: t0 + i * 0.012, t1, i }); };
    // a plucked harpsichord-like tone (sound only); the volume never changes with touch
    const pluck = (m, t, dur, vel = 0.3) => a.note(m, t, dur, { vel, show: false, tone: { partials: [1, 0.8, 0.65, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18, 0.14], attack: 0.002, release: 0.15, decay: 2.6 } });
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    const DYN = [['pp', 'PIANISSIMO', 34], ['p', 'PIANO', 42], ['mp', 'MEZZO PIANO', 50], ['mf', 'MEZZO FORTE', 58], ['f', 'FORTE', 68], ['ff', 'FORTISSIMO', 80]];
    const DCOL = [GREEN, '#9be06a', GOLD, ORANGE, '#ff7a6c', RED];
    const dynGrid = (t0, t1, o = {}) => a.grid(DYN.map(([l, s, z], i) => ({ label: l, sub: s, size: z, subSize: 17, color: DCOL[i] })), t0, t1, { rows: 1, cols: 6, cw: 170, chh: 190, y: o.y ?? 520, revealStep: o.revealStep ?? 0, caption: o.caption });
    const C = ['C4', 'E4', 'G4'];

    // ---- hook: the dynamics row, a soft chord and a loud one ----
    const h1 = S('hook').t1, tSoft = a.w('hook', 'soft'), tSoft2 = a.w('hook', 'soft', 1);
    const dg0 = dynGrid(0.15, h1, { revealStep: 0.07 });
    const mg0 = meter(0.2, h1, { y: 820 });
    [0.25, 0.5, 0.75, 1.0, 1.25, 1.5].forEach((t, i) => {
      a.ch('C', t, t + 0.25, { notes: C, bass: 'C3', vel: 0.15 + i * 0.22, hideName: true, shape: false });
      dg0.active.push({ t0: t, t1: t + 0.25, i }); level(mg0, t, t + 0.25, (i + 1) / 6);
    });
    a.ch('C', 1.75, tSoft - 0.1, { notes: C, bass: 'C3', vel: 1.4, hideName: true, shape: false });
    dg0.active.push({ t0: 1.75, t1: tSoft - 0.1, i: 5 }); level(mg0, 1.75, tSoft - 0.1, 1);
    a.ch('C', tSoft, a.w('hook', 'So'), { notes: C, bass: 'C3', vel: 0.12, hideName: true, shape: false });
    dg0.active.push({ t0: tSoft, t1: a.w('hook', 'So'), i: 1 }); level(mg0, tSoft, a.w('hook', 'So'), 0.2);
    a.big('PIANO = SOFT', a.w('hook', 'piano'), h1, { y: 1090, size: 46, ...MONO, color: GREEN });
    a.note('C4', tSoft2, 1.2, { vel: 0.08 }); dg0.active.push({ t0: tSoft2, t1: h1, i: 0 }); level(mg0, tSoft2, h1, 0.1);

    // ---- what: pianoforte - a soft chord, a loud chord ----
    const w0 = S('what').t0, w1 = S('what').t1, tS = a.w('what', 'Soft'), tL = a.w('what', 'loud'), tT = a.w('what', 'touch');
    a.scale(w0, 'C', [0, 4, 7]);
    a.big('PIANO + FORTE', a.w('what', 'pianoforte'), w1, { ...TOP, color: GOLD });
    a.ch('C', w0 + 0.1, tS, { notes: C, bass: 'C3', vel: 0.3, hideName: true, strikes: [{ o: 0, v: 1 }, { o: 0.5, v: 0.6 }, { o: 1.0, v: 0.6 }] });
    a.ch('C', tS, tL, { notes: C, bass: 'C3', vel: 0.15, hideName: true });
    a.big('p', tS, tL, { y: 830, size: 150, color: GREEN });
    a.ch('C', tL, tT, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 1.4, hideName: true });
    a.big('f', tL, tT, { y: 830, size: 190, color: RED });
    a.ring(['C', 'E', 'G'], tL, tT, { color: RED });
    [0.15, 0.5, 1.0, 0.3].forEach((v, i) => { const t = tT + i * 0.45; a.ch('C', t, i < 3 ? t + 0.45 : w1, { notes: C, bass: 'C3', vel: v * 1.2, hideName: true }); });
    a.big('YOUR TOUCH', tT, w1, { y: 830, size: 70, color: '#ffffff' });

    // ---- Haydn: the quiet theme exactly as in the brief, then a sudden loud chord ----
    const hy0 = S('haydn').t0, hy1 = S('haydn').t1, beat = 0.34;
    const THEME = [['C4', 1], ['C4', 1], ['E4', 1], ['E4', 1], ['G4', 1], ['G4', 1], ['E4', 2], ['F4', 1], ['F4', 1], ['D4', 1], ['D4', 1], ['B3', 1], ['B3', 1], ['G3', 2]];
    const th0 = Math.max(a.w('haydn', 'quiet') - 0.1, hy1 - 16 * beat - 0.05);
    const mg1 = meter(hy0 + 0.1, S('bang').t1, { y: 640, caption: 'LOUDNESS' });
    let tt = th0;
    THEME.forEach(([n, b]) => { a.note(n, tt, b * beat * 0.9, { vel: 0.1 }); level(mg1, tt, tt + b * beat * 0.85, 0.15); tt += b * beat; });
    const ACC = [['C', ['E3', 'G3'], 'C3', 6], ['C', ['E3', 'G3'], 'C3', 2], ['G7', ['F3', 'G3'], 'G2', 6], ['G', ['D3', 'G3'], 'G2', 2]];
    let ta = th0;
    ACC.forEach(([c, n, b, len]) => { a.ch(c, ta, ta + len * beat, { notes: n, bass: b, vel: 0.12, hideName: true, shape: false, strikes: [...Array(len)].map((_, k) => ({ o: k * beat, v: 0.7 })) }); ta += len * beat; });
    a.big('p', th0, hy1, { y: 960, size: 120, color: GREEN });
    a.big('QUIET...', a.w('haydn', 'quiet'), hy1, { y: 1100, size: 40, ...MONO, color: GREEN });
    // the surprise: a full, loud chord with a timpani-like thump
    const tb = S('bang').t0 + 0.02, b1 = S('bang').t1;
    a.ch('G', tb, b1 - 0.1, { notes: ['G3', 'B3', 'D4', 'G4', 'B4', 'D5'], bass: 'G2', vel: 1.9, hideName: true, shape: false });
    a.perc('kick', tb, 1.0); a.perc('snare', tb + 0.005, 0.5); a.perc('kick', tb + 0.12, 0.6);
    level(mg1, tb, tb + 1.4, 1.0); level(mg1, tb + 1.4, tb + 2.2, 0.7); level(mg1, tb + 2.2, b1, 0.4);
    a.big('ff', tb, b1, { y: 960, size: 200, color: RED, blur: 40 });
    a.big('SURPRISE!', tb + 0.05, b1, { y: 470, size: 56, ...MONO, color: RED });

    // ---- Cristofori: around 1700, Florence ----
    const c0 = S('cristo').t0, c1 = S('cristo').t1, t2 = a.at('cristo2');
    a.big('~1700', c0 + 0.2, t2, { y: 650, size: 140, color: '#ffffff' });
    a.big('FLORENCE', a.w('cristo', 'Florence'), t2, { y: 780, size: 48, ...MONO, color: GOLD });
    a.big('THE FIRST PIANOS', a.w('cristo', 'first'), t2, { y: 1080, size: 40, ...MONO, color: TEAL });
    a.big('GRAVICEMBALO', a.w('cristo2', 'gravicembalo'), c1, { y: 600, size: 84, color: '#ffffff' });
    a.big('col', a.w('cristo2', 'col'), c1, { y: 690, size: 44, ...MONO, color: '#b9b9c2' });
    a.big('PIANO', a.w('cristo2', 'piano'), c1, { x: 330, y: 790, size: 76, color: GREEN });
    a.big('e', a.w('cristo2', 'e'), c1, { y: 790, size: 44, ...MONO, color: '#b9b9c2' });
    a.big('FORTE', a.w('cristo2', 'forte'), c1, { x: 760, y: 790, size: 76, color: RED });
    a.big('A HARPSICHORD WITH SOFT AND LOUD', a.w('cristo2', 'harpsichord'), c1, { y: 1080, size: 32, ...MONO, color: GOLD });
    // an echo phrase: the same bar loud, then soft
    const ph = [['C4', 'E4', 'G4', 'E4'], ['F4', 'A4', 'C5', 'A4'], ['G4', 'B4', 'D5', 'B4'], ['E4', 'G4', 'C5', 'G4']];
    const pl = (c1 - c0 - 0.4) / 8;
    for (let k = 0; k < 8; k++) {
      const loud = k % 2 === 0, t = c0 + 0.2 + k * pl;
      ph[Math.floor(k / 2) % 4].forEach((n, j) => a.note(n, t + j * pl / 4, pl / 4, { vel: loud ? 0.34 : 0.08 }));
      a.note(['C3', 'F2', 'G2', 'C3'][Math.floor(k / 2) % 4], t, pl * 0.9, { vel: loud ? 0.3 : 0.08, show: false });
    }

    // ---- why1: a harpsichord plucks - more touch, same volume ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const touch1 = meter(y0 + 0.1, y1, { y: 560, chh: 100, caption: 'HOW HARD YOU PRESS' });
    const vol1 = meter(y0 + 0.1, y1, { y: 820, chh: 100, caption: 'HOW LOUD IT SOUNDS' });
    const tP = a.w('why1', 'plucks'), tH = a.w('why1', 'harder');
    a.big('PLUCK', tP, tH, { y: 1080, size: 48, ...MONO, color: TEAL });
    [[tP, 0.3], [tH - 0.1, 0.6], [tH + 0.7, 1.0], [a.w('why1', 'louder'), 0.5], [y1 - 1.2, 1.0]].forEach(([t, v], i, arr) => {
      const te = i < arr.length - 1 ? arr[i + 1][0] : y1;
      pluck(a.T.midi('C4'), t, 0.7, 0.32); pluck(a.T.midi('G4'), t + 0.01, 0.7, 0.2); keys(['C4', 'G4'], t, t + 0.5);
      level(touch1, t, te - 0.05, v); level(vol1, t, te - 0.05, 0.5);
    });
    a.big('SAME VOLUME', a.w('why1', 'hardly'), y1, { y: 1080, size: 48, ...MONO, color: RED });

    // ---- why2: a piano's hammers strike - more touch, more volume ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const touch2 = meter(z0 + 0.1, z1, { y: 560, chh: 100, caption: 'HOW HARD YOU PRESS' });
    const vol2 = meter(z0 + 0.1, z1, { y: 820, chh: 100, caption: 'HOW LOUD IT SOUNDS' });
    const tSt = a.w('why2', 'strike'), tH2 = a.w('why2', 'harder');
    a.big('HAMMER', tSt, tH2, { y: 1080, size: 48, ...MONO, color: TEAL });
    [[tSt, 0.2], [tH2 - 0.1, 0.5], [a.w('why2', 'plays'), 0.8], [a.w('why2', 'louder'), 1.0]].forEach(([t, v], i, arr) => {
      const te = i < arr.length - 1 ? arr[i + 1][0] : z1;
      a.ch('C', t, te, { notes: ['C4', 'G4'], bass: false, vel: 0.1 + v * 1.4, hideName: true, shape: false });
      level(touch2, t, te - 0.05, v); level(vol2, t, te - 0.05, v);
    });
    a.big('LOUDER', a.w('why2', 'louder'), z1, { y: 1080, size: 56, ...MONO, color: GOLD });

    // ---- dyn: pp -> ff ----
    const d0 = S('dyn').t0, d1 = S('dyn').t1, tPP = a.w('dyn', 'pianissimo'), tFF = a.w('dyn', 'fortissimo');
    const dg1 = dynGrid(d0 + 0.1, d1, { revealStep: 0.08, y: 560 });
    const mg2 = meter(d0 + 0.1, d1, { y: 860 });
    const ds = (d1 - 0.3 - tPP) / 6;
    for (let i = 0; i < 6; i++) {
      const t = tPP + i * ds;
      a.ch('C', t, t + ds, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.1 + i * 0.3, hideName: true, shape: false });
      dg1.active.push({ t0: t, t1: t + ds, i }); level(mg2, t, t + ds - 0.05, (i + 1) / 6);
    }
    a.big('PIANISSIMO → FORTISSIMO', tFF, d1, { ...TOP, size: 36, color: GOLD });

    // ---- cresc: hairpins, repeated notes swelling and fading ----
    const r0 = S('cresc').t0, r1 = S('cresc').t1, tCr = a.w('cresc', 'Crescendo'), tDi = a.w('cresc', 'Diminuendo');
    const mg3 = meter(r0 + 0.1, r1, { y: 860 });
    a.big('<', tCr, tDi, { y: 650, size: 220, weight: 400, color: GOLD });
    a.big('cresc.', tCr + 0.2, tDi, { y: 1090, size: 48, ...MONO, color: GOLD });
    a.big('>', tDi, r1, { y: 650, size: 220, weight: 400, color: BLUE });
    a.big('dim.', tDi + 0.2, r1, { y: 1090, size: 48, ...MONO, color: BLUE });
    const swell = (t0, t1, up) => { const n = 10, st = (t1 - t0) / n; for (let k = 0; k < n; k++) { const v = up ? (k + 1) / n : 1 - k / n; const t = t0 + k * st; a.note(['C4', 'E4', 'G4', 'C5', 'G4'][k % 5], t, st * 0.9, { vel: 0.04 + v * 0.36 }); a.note('C3', t, st * 0.9, { vel: 0.03 + v * 0.25, show: false }); level(mg3, t, t + st * 0.9, v); } };
    swell(tCr, tDi - 0.1, true); swell(tDi, r1 - 0.2, false);

    // ---- pedal: dry notes, then the dampers lift and everything rings ----
    const p0 = S('pedal').t0, p1 = S('pedal').t1, tLift = a.w('pedal', 'lifts'), tRing = a.w('pedal', 'ringing');
    a.scale(p0, 'C', [0, 4, 7]);
    ['C4', 'E4', 'G4', 'C5'].forEach((n, i) => a.note(n, p0 + 0.15 + i * 0.35, 0.18, { vel: 0.28 }));
    a.big('DRY', p0 + 0.2, tLift, { y: 830, size: 90, color: '#9a9aa2' });
    const AR = ['C3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5', 'G5'];
    AR.forEach((n, i) => a.note(n, tLift + i * 0.3, p1 - tLift - i * 0.3 - 0.1, { vel: 0.22 }));
    a.ring(['C', 'E', 'G'], tRing, p1, { color: GOLD });
    a.big('RING', tRing - 0.2, p1, { y: 830, size: 100, color: GOLD });
    a.big('DAMPERS UP', tLift, p1, { ...TOP, color: TEAL });

    // ---- soft pedal: the same phrase, hammers shifted, a softer colour ----
    const q0 = S('soft').t0, q1 = S('soft').t1, tShift = a.w('soft', 'shifts');
    a.scale(q0, 'C', [0, 4, 7]);
    const PH = ['E4', 'G4', 'C5', 'G4', 'E4', 'G4', 'C5', 'E5'];
    const ql = (q1 - q0 - 0.3) / 16;
    for (let k = 0; k < 16; k++) { const t = q0 + 0.15 + k * ql; a.note(PH[k % 8], t, ql * 1.6, { vel: t < tShift ? 0.3 : 0.1 }); if (k % 4 === 0) a.note('C3', t, ql * 3.8, { vel: t < tShift ? 0.25 : 0.08, show: false }); }
    a.big('FEWER STRINGS', a.w('soft', 'fewer'), q1, { y: 830, size: 62, color: BLUE });
    a.big('HAMMERS SHIFT', tShift, q1, { ...TOP, color: BLUE });
    a.big('GRAND PIANO', a.w('soft', 'grand'), tShift, { ...TOP, color: '#ffffff' });

    // ---- essence: the same notes soft, then loud, then home ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tC = a.at('cta'), tLo = a.w('essence', 'loud');
    a.scale(e0, 'C', [0, 4, 7]);
    a.ch('C', e0 + 0.1, tLo, { notes: C, bass: 'C3', vel: 0.14, label: 'p' });
    a.ch('C', tLo, tC - 0.1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 1.3, label: 'f' });
    a.ring(['C', 'E', 'G'], tLo, tC - 0.1, { color: RED });
    a.big('YOU CONTROL BOTH', a.w('essence', 'control'), e1, { ...TOP, color: GOLD });
    a.ch('C', tC - 0.1, e1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.6, label: 'C' });
    a.cta(tC + 0.6, 'Leave a song in the comments');
    void PINK;
  },
};
