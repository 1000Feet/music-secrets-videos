// Maqam: Arabic modes, some with quarter tones - pitches between the piano's keys.
// Only scales and ORIGINAL short phrases. Quarter tones are fractional midi notes on an additive
// "oud-like" plucked tone (engine note option `tone`, with small `bend` slides). Fractional notes
// don't light keys, so the two neighbouring keys are lit silently ("between the keys").
const OUD = [1, 0.75, 0.55, 0.4, 0.3, 0.22, 0.15, 0.1, 0.06];
const DRONE = [1, 0.5, 0.3, 0.18, 0.1];

module.exports = {
  slug: 'maqam',
  title: 'Maqam: Notes Between the Keys',
  segments: [
    { id: 'hook',    text: "Some music lives between the piano's keys... in notes a piano simply doesn't have." },
    { id: 'what',    text: 'Arabic music is built on modes called maqamat, and some of them use quarter tones.' },
    { id: 'oud',     text: 'The oud, a fretless lute, can play those in-between pitches freely...' },
    { id: 'taqsim',  text: 'and an improvised prelude that explores a maqam is called a taqsim.' },
    { id: 'why1',    text: 'So how does it work? Take Maqam Rast: C, D, E half flat, F, G, A, B half flat, C.' },
    { id: 'why2',    text: 'That E sits halfway between E flat and E natural, about a quarter tone off the piano.' },
    { id: 'why3',    text: 'Maqam Hijaz has a wide gap: D, E flat, F sharp, G.' },
    { id: 'why3b',   text: 'The same exotic augmented second as the harmonic minor.' },
    { id: 'why4',    text: "And a maqam isn't just a scale. It has typical phrases and important notes..." },
    { id: 'why4b',   text: 'and ways of moving between ajnas, building blocks of three to five notes.' },
    { id: 'why5',    text: 'Twelve note equal temperament has no quarter tones...' },
    { id: 'why5b',   text: "so a piano literally can't play Maqam Rast in tune." },
    { id: 'essence', text: "Music that lives between the keys... and a whole world of colours the piano can't reach." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'BETWEEN THE KEYS', title: 'MAQAM', accent: true, tonic: 0, lead: 0.5, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'ARABIC MODES', title: 'MAQAMAT', tonic: 0, tail: 1.2 },
    { id: 'oud', segs: ['oud'], label: 'YOU HEAR IT ON', title: 'The Oud', sub: 'fretless lute', tonic: 0, tail: 2.2 },
    { id: 'taqsim', segs: ['taqsim'], label: 'YOU HEAR IT IN', title: 'Taqsim', sub: 'an improvised prelude', tonic: 0, tail: 2.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'MAQAM RAST', tonic: 0, tail: 1.4 },
    { id: 'why2', segs: ['why2'], label: 'HALFWAY', title: 'A QUARTER TONE', circle: false, tonic: 0, tail: 1.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'D  Eb  F#  G', title: 'MAQAM HIJAZ', tonic: 2, gap: 0.3, tail: 2.0 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'MORE THAN A SCALE', title: 'AJNAS', tonic: 0, gap: 0.3, tail: 1.6 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'TWELVE KEYS ONLY', title: 'THE PIANO CAN’T', tonic: 0, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BETWEEN THE KEYS', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c', LILAC = '#b48cff', GREY = '#8a8a92', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    // note names incl. half flats ("Eh" = E half flat)
    const NM = { C: 0, D: 2, Eb: 3, Eh: 3.5, E: 4, F: 5, 'F#': 6, G: 7, A: 9, Bb: 10, Bh: 10.5, B: 11 };
    const M = n => { const m = /^([A-G][#bh]?)(\d)$/.exec(n); return (+m[2] + 1) * 12 + NM[m[1]]; };
    const pcx = n => NM[n.replace(/\d$/, '')];
    // oud pluck at any pitch; half flats light both neighbouring keys silently
    const oud = (n, t, dur, vel = 0.3, from = 0) => {
      const m = M(n), frac = m % 1 !== 0;
      a.note(m, t, dur, { vel, show: !frac, tone: { partials: OUD, attack: 0.004, decay: 1.8, release: 0.2, ...(from ? { bend: [[0, from], [0.2, 0]] } : {}) } });
      if (frac) { a.note(Math.floor(m), t, Math.max(0.3, dur), { vel: 0, show: false }); a.note(Math.ceil(m), t, Math.max(0.3, dur), { vel: 0, show: false }); }
    };
    const phrase = (list, t0, beat, o = {}) => {
      let t = t0; const pts = [];
      for (const [n, b, g] of list) { if (n) { oud(n, t, b * beat * 1.1, o.vel ?? 0.3, g || 0); pts.push([t, pcx(n)]); } t += b * beat; }
      if (o.walk) a.walker(pts, { t1: o.walk, dr: 34, color: o.color || '#ffffff', label: o.label, labelDr: 82 });
      return t;
    };
    const drone = (notes, t0, t1, vel = 0.14) => { for (let t = t0; t < t1 - 0.3; t += 1.6) notes.forEach(n => a.note(n, t, Math.min(1.9, t1 - t), { vel, show: false, tone: { partials: DRONE, attack: 0.25, release: 0.5 } })); };
    // a solid dot at an in-between position (single-point walker), optionally sliding in from `from`
    const dot = (pos, t0, t1, color, from) => a.walker(from === undefined ? [[t0, pos]] : [[t0, from], [t0 + 0.35, pos]], { t1, color });
    const RAST_I = [0, 2, 5, 7, 9];   // the notes Rast shares with the piano

    // ---- hook: C major, then E and B slide down a quarter tone -> Rast ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'C', a.T.MAJOR, { popIn: { t0: 0.1, step: 0.08 } });
    a.scale(0.75, 'C', RAST_I);
    dot(3.5, 0.75, S('what').t1, GOLD, 4);
    dot(10.5, 0.75, S('what').t1, GOLD, 11);
    a.tag(3.5, 1.1, S('what').t1, '¼ TONE', { color: GOLD });
    a.tag(10.5, 1.1, S('what').t1, '¼ TONE', { color: GOLD });
    drone(['C2', 'G2'], 0.1, S('what').t1);
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].forEach((n, i) => a.note(n, 0.1 + i * 0.08, 0.5, { vel: 0.16, show: false }));
    oud('Eh4', 0.75, 1.2, 0.3, 0.5); oud('Bh4', 0.95, 1.2, 0.26, 0.5);
    phrase([['G4', 1], ['F4', 0.5], ['Eh4', 1.5], ['D4', 1], ['Eh4', 0.5], ['F4', 0.5], ['D4', 1], ['C4', 2]], 2.4, 0.34, { walk: h1, color: '#ffffff' });

    // ---- what: maqamat; a Rast run over the drone ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.big('MAQAM · PLURAL MAQAMAT', a.w('what', 'maqamat'), w1, { y: 460, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    const RUN = ['C4', 'D4', 'Eh4', 'F4', 'G4', 'A4', 'Bh4', 'C5'];
    const tq = a.w('what', 'quarter') - 0.2;
    phrase(RUN.map(n => [n, 1]), tq, 0.22, { walk: w1, color: GOLD });
    void w0;

    // ---- oud: a slow, sliding original phrase ----
    const o0 = S('oud').t0 + 0.1, o1 = S('oud').t1;
    drone(['C2', 'G2'], o0, S('taqsim').t1);
    dot(3.5, o0, S('taqsim').t1, GOLD); dot(10.5, o0, S('taqsim').t1, GOLD);
    a.scale(o0, 'C', RAST_I);
    a.big('NO FRETS', a.w('oud', 'fretless'), o1, { y: 460, size: 44, ...MONO, color: GOLD, blur: 8 });
    phrase([['D4', 1], ['Eh4', 1.5, -0.5], ['F4', 0.5], ['G4', 1.5, -1], ['F4', 0.5], ['Eh4', 1, 0.5], ['D4', 1], ['C4', 2]], a.w('oud', 'play') - 0.2, 0.3, { walk: o1, color: TEAL });

    // ---- taqsim: freer, improvised-sounding original line ----
    const q0 = S('taqsim').t0 + 0.1, q1 = S('taqsim').t1;
    a.big('IMPROVISED', a.w('taqsim', 'improvised'), q1, { y: 460, size: 44, ...MONO, color: PINK, blur: 8 });
    const tq0 = a.w('taqsim', 'explores');
    phrase([['G4', 0.5], ['A4', 0.5], ['Bh4', 1.5, 0.5], ['A4', 0.5], ['G4', 0.75], ['F4', 0.25], ['Eh4', 1.5, -0.5], [null, 0.5], ['F4', 0.5], ['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['Eh4', 0.5], ['D4', 1], ['C4', 2.5]], tq0, 0.24, { walk: q1, color: PINK });
    void q0;

    // ---- why1: Rast named note by note ----
    const r0 = S('why1').t0 + 0.1, r1 = S('why1').t1;
    a.scale(r0, 'C', RAST_I);
    drone(['C2', 'G2'], r0, r1);
    const RN = [['C', 'C4', 0], ['D', 'D4', 0], ['E', 'Eh4', 0], ['F', 'F4', 0], ['G', 'G4', 0], ['A', 'A4', 0], ['B', 'Bh4', 0], ['C', 'C5', 1]];
    const tr = RN.map(([w, , n]) => a.w('why1', w, n) - 0.05);
    RN.forEach(([, n], i) => oud(n, tr[i], 0.7, 0.32));
    a.walker(RN.map(([, n], i) => [tr[i], pcx(n)]), { t1: r1, dr: 34, color: '#ffffff' });
    dot(3.5, tr[2], r1, GOLD); dot(10.5, tr[6], r1, GOLD);
    a.tag(3.5, tr[2], r1, 'E HALF FLAT', { color: GOLD });
    a.tag(10.5, tr[6], r1, 'B HALF FLAT', { color: GOLD });

    // ---- why2: Eb | E half flat | E ----
    const z0 = S('why2').t0 + 0.1, z1 = S('why2').t1;
    const tH = a.w('why2', 'halfway'), tEb = a.w('why2', 'flat'), tEn = a.w('why2', 'natural'), tQ = a.w('why2', 'quarter');
    const g2 = a.grid([{ label: 'E♭', sub: 'PIANO KEY', size: 64, color: BLUE }, { label: 'E½♭', sub: 'RAST', size: 64, color: GOLD }, { label: 'E', sub: 'PIANO KEY', size: 64, color: BLUE }],
      z0, z1, { rows: 1, cols: 3, cw: 300, chh: 220, y: 560, revealStep: 0.2 });
    g2.active.push({ t0: z0 + 0.2, t1: tEb, i: 1 }, { t0: tEb, t1: tEn, i: 0 }, { t0: tEn, t1: tQ, i: 2 }, { t0: tQ, t1: z1, i: 1 });
    drone(['C2', 'G2'], z0, z1);
    oud('Eh4', z0 + 0.2, 1.0, 0.32);
    a.note('Eb4', tEb, 0.8, { vel: 0.3, tone: { partials: OUD, attack: 0.004, decay: 1.8 } });
    a.note('E4', tEn, 0.8, { vel: 0.3, tone: { partials: OUD, attack: 0.004, decay: 1.8 } });
    oud('Eh4', tQ, 1.4, 0.34);
    a.big('½ OF A HALF STEP', tH, tQ, { y: 900, size: 44, ...MONO, color: '#ffffff', blur: 0 });
    a.big('≈ A QUARTER TONE', tQ, z1, { y: 900, size: 50, ...MONO, color: GOLD, blur: 10 });

    // ---- why3: Hijaz - D Eb F# G, the augmented second ----
    const j0 = S('why3').t0 + 0.1, j1 = S('why3').t1;
    a.scale(j0, 'D', [0, 1, 4, 5]);
    drone(['D2', 'A2'], j0, j1);
    const JN = [['D', 'D4', 0], ['E', 'Eb4', 0], ['F', 'F#4', 0], ['G', 'G4', 0]];
    const tj = JN.map(([w, , n]) => a.w('why3', w, n) - 0.05);
    JN.forEach(([, n], i) => a.note(n, tj[i], 0.7, { vel: 0.32, tone: { partials: OUD, attack: 0.004, decay: 1.8 } }));
    const tAug = a.w('why3b', 'augmented');
    a.arc('Eb', 'F#', a.w('why3', 'gap'), j1, { steps: 3, color: RED, dr: 30, label: 'AUGMENTED 2ND', labelR: 170 });
    a.ring(['Eb', 'F#'], a.w('why3', 'gap'), j1, { color: RED });
    a.big('LIKE HARMONIC MINOR', a.w('why3b', 'harmonic'), j1, { y: 460, size: 36, ...MONO, color: RED, blur: 4 });
    const tp = a.end('why3b') + 0.05;
    [['D4', 1], ['Eb4', 0.5], ['F#4', 1.5], ['G4', 1], ['F#4', 0.5], ['Eb4', 0.5], ['D4', 2]].reduce((t, [n, b]) => { a.note(n, t, b * 0.3, { vel: 0.3, tone: { partials: OUD, attack: 0.004, decay: 1.8 } }); return t + b * 0.3; }, tp);
    void tAug;

    // ---- why4: phrases, important notes, ajnas ----
    const k0 = S('why4').t0 + 0.1, k1 = S('why4').t1;
    a.scale(k0, 'C', RAST_I);
    dot(3.5, k0, k1, GOLD); dot(10.5, k0, k1, GOLD);
    drone(['C2', 'G2'], k0, k1);
    const tPh = a.w('why4', 'phrases') - 0.1, tImp = a.w('why4', 'important');
    phrase([['F4', 0.5], ['Eh4', 0.5], ['D4', 1], ['Eh4', 1, -0.5], ['C4', 1.5]], tPh, 0.28, { walk: tImp });
    a.ring(['C', 'G'], tImp, a.w('why4b', 'ajnas'), { color: TEAL });
    a.tag('G', tImp, a.w('why4b', 'ajnas'), 'IMPORTANT', { color: TEAL });
    const tAj = a.w('why4b', 'ajnas'), tBl = a.w('why4b', 'blocks');
    a.poly([0, 2, 3.5, 5], tAj, k1, { closed: false, dash: false, color: PINK, glow: true, alpha: 0.9, width: 6 });
    a.poly([7, 9, 10.5, 12], tBl, k1, { closed: false, dash: false, color: BLUE, glow: true, alpha: 0.9, width: 6 });
    a.big('JINS · 4 NOTES  +  JINS · 4 NOTES', tBl, k1, { y: 460, size: 30, ...MONO, color: '#ffffff', blur: 0 });
    ['C4', 'D4', 'Eh4', 'F4'].forEach((n, i) => oud(n, tAj + i * 0.2, 0.5, 0.28));
    ['G4', 'A4', 'Bh4', 'C5'].forEach((n, i) => oud(n, tBl + i * 0.2, 0.5, 0.28));
    phrase([['G4', 1], ['A4', 0.5], ['Bh4', 1.5], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['Eh4', 1], ['D4', 0.5], ['C4', 2]], a.end('why4b') + 0.1, 0.24);

    // ---- why5: twelve keys only - the half flats have no key ----
    const p0 = S('why5').t0 + 0.1, p1 = S('why5').t1;
    a.scale(p0, 'C', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], { popIn: { t0: p0, step: 0.06 } });
    const tNo = a.w('why5', 'quarter');
    dot(3.5, tNo, p1, RED); dot(10.5, tNo, p1, RED);
    a.ring([3.5, 10.5], tNo, p1, { color: RED });
    a.tag(3.5, tNo, p1, 'NO KEY', { color: RED });
    a.tag(10.5, tNo, p1, 'NO KEY', { color: RED });
    a.big('12 EQUAL STEPS', a.w('why5', 'Twelve'), tNo, { y: 460, size: 40, ...MONO, color: '#ffffff', blur: 0 });
    a.big('RAST: OUT OF REACH', a.w('why5b', 'piano'), p1, { y: 460, size: 40, ...MONO, color: RED, blur: 6 });
    ['C4', 'C#4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'].forEach((n, i) => a.note(n, p0 + i * 0.06, 0.4, { vel: 0.14 }));
    // the piano tries: Eb and E, never the note between; then the real thing
    const tTry = a.w('why5b', 'tune') - 0.6;
    a.note('Eb4', tTry, 0.5, { vel: 0.3 }); a.note('E4', tTry + 0.5, 0.5, { vel: 0.3 });
    oud('Eh4', p1 - 1.2, 1.2, 0.32);

    // ---- essence: Rast, a last phrase, home on C ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(e0, 'C', RAST_I);
    dot(3.5, e0, e1, GOLD); dot(10.5, e0, e1, GOLD);
    drone(['C2', 'G2'], e0, e1 - 0.3);
    const ee = phrase([['C4', 0.5], ['D4', 0.5], ['Eh4', 1, -0.5], ['F4', 0.5], ['G4', 1.5], ['A4', 0.5], ['Bh4', 1, 0.5], ['A4', 0.5], ['G4', 0.5], ['F4', 0.5], ['Eh4', 1], ['D4', 0.5], ['C4', 2.5]], e0 + 0.3, 0.3, { walk: a.at('cta'), color: GOLD });
    a.tag('C', ee - 0.8, e1, 'HOME', { color: TEAL });
    a.big('COLOURS BETWEEN THE KEYS', a.w('essence', 'colours') - 0.2, e1, { y: 460, size: 34, ...MONO, color: GOLD, blur: 6 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void LILAC; void GREY;
  },
};
