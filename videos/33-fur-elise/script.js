// Für Elise, decoded: a rocking half step, broken chords and a theme that keeps coming home.
module.exports = {
  slug: 'fur-elise',
  title: 'Für Elise, Decoded',
  segments: [
    { id: 'hook',     text: 'You know this melody from its very first notes.' },
    { id: 'what',     text: "It's Für Elise: Beethoven's Bagatelle in A minor, written around 1810." },
    { id: 'what2',    text: 'But it was published only in 1867, forty years after his death.' },
    { id: 'play',     text: 'Listen to how it opens.' },
    { id: 'mystery',  text: 'And the name? Nobody knows who Elise was.' },
    { id: 'mystery2', text: 'One theory: the manuscript said Therese, for Therese Malfatti, and was misread.' },
    { id: 'why1',     text: 'So why is it so catchy? It rocks on a half step: E, D sharp, E, D sharp.' },
    { id: 'why2',     text: 'D sharp is the leading tone of E, the fifth of A minor.' },
    { id: 'why3',     text: 'So the melody hovers around the dominant, then falls home to A.' },
    { id: 'bass',     text: 'The left hand answers with broken chords: A minor...' },
    { id: 'bass2',    text: 'then E major, with G sharp, the leading tone of A. Tension, and release.' },
    { id: 'form',     text: 'And the famous theme keeps returning between contrasting sections.' },
    { id: 'form2',    text: "A, B, A, C, A. That's a rondo." },
    { id: 'essence',  text: 'A half step, a broken chord, a returning theme. Your ear always knows where home is.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'FÜR ELISE', accent: true, tonic: 9, min: 5.2 },
    { id: 'what', segs: ['what'], label: 'BAGATELLE IN A MINOR', title: 'WoO 59', sub: 'Ludwig van Beethoven · c. 1810', tonic: 9, tail: 0.8 },
    { id: 'what2', segs: ['what2'], label: 'FORTY YEARS AFTER HIS DEATH', title: 'PUBLISHED IN 1867', tonic: 9, circle: false, tail: 1.0 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'FÜR ELISE', sub: 'Beethoven · in A minor', tonic: 9, tail: 7.6 },
    { id: 'mystery', segs: ['mystery', 'mystery2'], label: 'A MYSTERY', title: 'WHO WAS ELISE?', tonic: 9, circle: false, gap: 0.4, tail: 1.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE HALF STEP', tonic: 9, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'D# LEANS ON E', tonic: 9, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'HOVER, THEN HOME', tonic: 9, tail: 1.6 },
    { id: 'bass', segs: ['bass', 'bass2'], label: 'THE LEFT HAND', title: 'BROKEN CHORDS', tonic: 9, gap: 0.3, tail: 1.6 },
    { id: 'form', segs: ['form', 'form2'], label: 'THE FORM', title: 'A RONDO', tonic: 9, circle: false, gap: 0.3, tail: 2.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'HOME', accent: true, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    const HMIN = [0, 2, 3, 5, 7, 8, 11]; // A minor with G#
    const AM = ['A2', 'E3', 'A3', 'C4', 'E4'], EM = ['E2', 'E3', 'G#3', 'B3', 'E4'];
    const shape = (c, t0, t1, notes, label) => a.ch(c, t0, t1, { notes, bass: false, mute: true, label });
    // the opening (public domain): [note, start, length] in sixteenths
    const OPEN = [
      ['E5', 0, 1], ['D#5', 1, 1], ['E5', 2, 1], ['D#5', 3, 1], ['E5', 4, 1], ['B4', 5, 1], ['D5', 6, 1], ['C5', 7, 1],
      ['A4', 8, 3], ['A2', 8, 6], ['E3', 9, 5], ['A3', 10, 4], ['C4', 11, 1], ['E4', 12, 1], ['A4', 13, 1],
      ['B4', 14, 3], ['E2', 14, 6], ['E3', 15, 5], ['G#3', 16, 4], ['E4', 17, 1], ['G#4', 18, 1], ['B4', 19, 1],
      ['C5', 20, 3], ['A2', 20, 6], ['E3', 21, 5], ['A3', 22, 4], ['E4', 23, 1], ['E5', 24, 1], ['D#5', 25, 1],
      ['E5', 26, 1], ['D#5', 27, 1], ['E5', 28, 1], ['B4', 29, 1], ['D5', 30, 1], ['C5', 31, 1],
      ['A4', 32, 5], ['A2', 32, 6], ['E3', 33, 5], ['A3', 34, 4],
    ];
    const play = (list, t0, s, vel = 0.36) => list.forEach(([n, u, d]) => a.note(n, t0 + u * s, d * s * 0.95, { vel: /[23]$/.test(n) ? vel * 0.8 : vel }));
    const MOTIF = OPEN.slice(0, 9);
    const motifPts = (t0, s) => MOTIF.map(([n, u]) => [t0 + u * s, n.replace(/\d/, '')]);

    // hook: the famous first nine notes
    a.scale(0.2, 'A', HMIN, { popIn: { t0: 0.3, step: 0.1 } });
    const hs = 0.22, h0 = 0.5;
    play(MOTIF, h0, hs, 0.34);
    a.walker(motifPts(h0, hs), { t1: S('hook').t1, dr: -40, color: TEAL });
    a.note('A2', h0 + 8 * hs, 2.0, { vel: 0.26 }); a.note('E3', h0 + 9 * hs, 1.8, { vel: 0.24 }); a.note('A3', h0 + 10 * hs, 1.6, { vel: 0.24 });
    shape('Am', h0 + 8 * hs, S('hook').t1, AM, 'Am');

    // what: Bagatelle in A minor
    const tA = a.w('what', 'A') - 0.05;
    shape('Am', S('what').t0 + 0.05, tA, AM, 'Am');
    a.ch('Am', tA, S('what').t1, { notes: ['C4', 'E4', 'A4'], bass: 'A2', vel: 0.7 });
    a.tag('A', tA + 0.1, S('what').t1, 'HOME KEY: A MINOR', { x: 540, y: 455 });

    // what2: written ~1810, published 1867
    const g = a.grid([{ label: '1810', sub: 'WRITTEN (AROUND)', size: 80, color: '#8a8a92' }, { label: '1867', sub: 'PUBLISHED', size: 80, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 380, chh: 220, y: 680, revealStep: 0.2 });
    g.active.push({ t0: S('what2').t0 + 0.1, t1: a.w('what2', '1867') - 0.05, i: 0 }, { t0: a.w('what2', '1867') - 0.05, t1: S('what2').t1, i: 1 });
    a.tag(0, a.w('what2', 'forty'), S('what2').t1, '40 YEARS AFTER HIS DEATH', { x: 540, y: 1000, color: GOLD });
    a.ch('Am', S('what2').t0 + 0.1, S('what2').t1, { notes: ['C4', 'E4', 'A4'], bass: 'A2', vel: 0.4, strikes: [{ o: 0, v: 1 }, { o: 1.6, v: 0.6 }] });

    // play: the full opening phrase, right hand and left hand
    const p0 = a.end('play') + 0.2, ps = 0.19;
    play(OPEN, p0, ps);
    a.walker(motifPts(p0, ps), { t1: p0 + 8 * ps + 0.4, dr: -40, color: TEAL });
    a.walker(motifPts(p0 + 24 * ps, ps), { t1: S('play').t1, dr: -40, color: TEAL });
    shape('Am', p0 + 8 * ps, p0 + 14 * ps, AM, 'Am');
    shape('E', p0 + 14 * ps, p0 + 20 * ps, EM, 'E');
    a.tag(8, p0 + 14 * ps, p0 + 20 * ps, 'G#', { dr: -75 });
    shape('Am', p0 + 20 * ps, S('play').t1, AM, 'Am');

    // mystery: Elise? Therese?
    const m0 = S('mystery').t0 + 0.1, m1 = S('mystery').t1;
    for (let t = m0 + 0.3, i = 0; t < m1 - 0.3; t += 0.42, i++) a.note(i % 2 ? 'D#5' : 'E5', t, 0.38, { vel: 0.16 });
    a.note('A2', m0, m1 - m0, { vel: 0.16 }); a.note('E3', m0, m1 - m0, { vel: 0.13 });
    a.big('ELISE ?', a.w('mystery', 'Elise'), m1, { y: 650, size: 110, color: '#ffffff' });
    a.tag(0, a.w('mystery2', 'theory'), m1, 'ONE THEORY', { x: 540, y: 520, color: '#8a8a92' });
    a.big('THERESE ?', a.w('mystery2', 'Therese', 0), m1, { y: 820, size: 96, color: GOLD });
    a.big('Therese Malfatti', a.w('mystery2', 'Malfatti'), m1, { y: 925, size: 44, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('MISREAD ?', a.w('mystery2', 'misread'), m1, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: RED });

    // why1: rocking on E - D#
    a.scale(S('why1').t0, 'A', HMIN);
    const r = [a.w('why1', 'E', 0), a.w('why1', 'D', 0), a.w('why1', 'E', 1), a.w('why1', 'D', 1)];
    const tHalf = a.w('why1', 'half');
    a.note('E5', tHalf, 0.4, { vel: 0.3 }); a.note('D#5', tHalf + 0.4, 0.4, { vel: 0.3 });
    r.forEach((t, i) => a.note(i % 2 ? 'D#5' : 'E5', t, 0.5, { vel: 0.34 }));
    a.walker([[tHalf, 'E'], [tHalf + 0.4, 'D#'], ...r.map((t, i) => [t, i % 2 ? 'D#' : 'E'])], { t1: S('why1').t1, dr: -40, color: TEAL });
    shape('Am', S('why1').t0 + 0.1, tHalf, AM, 'Am');
    a.arc('E', 'D#', tHalf, S('why1').t1, { steps: -1, color: TEAL, dr: 30 });
    a.tag(0, tHalf, S('why1').t1, 'HALF STEP', { x: 540, y: 455, color: TEAL });
    shape('E', tHalf, S('why1').t1, ['E4', 'D#5'], 'E – D#');

    // why2: D# is the leading tone of E, and E is the fifth of A minor
    const tLead = a.w('why2', 'leading'), tFifth = a.w('why2', 'fifth');
    a.ring(['D#'], S('why2').t0 + 0.1, tFifth, { color: GOLD });
    shape('E', S('why2').t0 + 0.1, tFifth, ['D#4', 'E4'], 'D# → E');
    a.note('D#4', S('why2').t0 + 0.2, 0.6, { vel: 0.3 }); a.note('E4', tLead, 0.9, { vel: 0.32 });
    a.arc('D#', 'E', tLead, S('why2').t1, { steps: 1, color: TEAL, dr: 30 });
    a.tag(0, tLead, tFifth, 'LEADING TONE OF E', { x: 540, y: 455, color: GOLD });
    a.line('A', 'E', tFifth, S('why2').t1, { color: GOLD, label: 'FIFTH', dash: true });
    a.tag(0, tFifth, S('why2').t1, 'E = FIFTH OF A MINOR', { x: 540, y: 455, color: GOLD });
    a.ring(['E'], tFifth, S('why2').t1, { color: GOLD });
    a.note('A3', tFifth, 1.0, { vel: 0.26 }); a.note('E4', tFifth + 0.3, 1.0, { vel: 0.28 });

    // why3: hover around E, then fall home to A
    const tHov = a.w('why3', 'hovers'), tFall = a.w('why3', 'falls'), tHome = a.w('why3', 'A') - 0.05;
    const hov = [];
    for (let t = tHov, i = 0; t < tFall - 0.25; t += 0.3, i++) { a.note(i % 2 ? 'D#5' : 'E5', t, 0.28, { vel: 0.3 }); hov.push([t, i % 2 ? 'D#' : 'E']); }
    const fall = [['B4', tFall], ['D5', tFall + (tHome - tFall) / 3], ['C5', tFall + (2 * (tHome - tFall)) / 3]];
    fall.forEach(([n, t]) => a.note(n, t, 0.3, { vel: 0.32 }));
    a.walker([...hov, ...fall.map(([n, t]) => [t, n.replace(/\d/, '')]), [tHome, 'A']], { t1: S('why3').t1, dr: -40, color: TEAL });
    a.tag(0, tHov, tFall, 'HOVERING ON E', { x: 540, y: 455, color: TEAL });
    shape('Am', S('why3').t0 + 0.1, tHov, AM, 'Am');
    shape('E', tHov, tFall, ['E5', 'D#5'], 'E – D#');
    a.ch('Am', tHome, S('why3').t1, { notes: ['C4', 'E4', 'A4'], bass: 'A2', vel: 0.75 });
    a.note('A4', tHome, 1.2, { vel: 0.36 });
    a.tag('A', tHome + 0.1, S('why3').t1, 'HOME', { dr: -92 });

    // bass: broken chords, A minor then E major (G# leads to A), then A minor again
    const arp = (notes, t0, s = 0.17, vel = 0.3) => notes.forEach((n, i) => a.note(n, t0 + i * s, (notes.length - i) * s + 0.4, { vel }));
    const bA = a.w('bass', 'A') - 0.05, bE = a.w('bass2', 'E') - 0.05, bRel = a.w('bass2', 'release') - 0.05;
    shape('Am', S('bass').t0 + 0.1, bA, AM, 'Am');
    arp(['A2', 'E3', 'A3', 'C4', 'E4', 'A4'], bA);
    shape('Am', bA, bE, AM, 'Am');
    arp(['E2', 'E3', 'G#3', 'B3', 'E4', 'G#4'], bE);
    shape('E', bE, bRel, EM, 'E');
    a.ring(['G#'], a.w('bass2', 'G'), bRel, { color: RED });
    a.tag(8, a.w('bass2', 'G'), S('bass').t1, 'G#', { dr: -75, color: RED });
    a.tag(0, a.w('bass2', 'Tension'), bRel, 'TENSION', { x: 540, y: 455, color: RED });
    arp(['A2', 'E3', 'A3', 'C4', 'E4', 'A4'], bRel);
    shape('Am', bRel, S('bass').t1, AM, 'Am');
    a.arc('G#', 'A', bRel, S('bass').t1, { steps: 1, color: TEAL, dr: 30 });
    a.tag(0, bRel, S('bass').t1, 'RELEASE', { x: 540, y: 455, color: TEAL });

    // form: A B A C A
    const RC = { A: GOLD, B: '#62a8ff', C: '#b48cff' };
    const gf = a.grid(['A', 'B', 'A', 'C', 'A'].map(l => ({ label: l, size: 80, color: RC[l] })), S('form').t0 + 0.1, S('form').t1,
      { rows: 1, cols: 5, cw: 200, chh: 250, y: 620, revealStep: 0.12 });
    const fw = [a.w('form2', 'A', 0), a.w('form2', 'B'), a.w('form2', 'A', 1), a.w('form2', 'C'), a.w('form2', 'A', 2)].map(t => t - 0.05);
    const fEnd = S('form').t1;
    fw.forEach((t, i) => gf.active.push({ t0: t, t1: i < 4 ? fw[i + 1] : fEnd, i }));
    play(MOTIF.slice(0, 5), S('form').t0 + 0.3, 0.3, 0.2);
    const sect = { A: ['A2', ['C4', 'E4', 'A4']], B: ['F2', ['C4', 'F4', 'A4']], C: ['D2', ['D4', 'F4', 'A4']] };
    ['A', 'B', 'A', 'C'].forEach((l, i) => { a.note(sect[l][0], fw[i], fw[i + 1] - fw[i], { vel: 0.26 }); sect[l][1].forEach(n => a.note(n, fw[i], fw[i + 1] - fw[i], { vel: 0.18 })); });
    play(MOTIF, fw[4], 0.19, 0.34);
    a.note('A2', fw[4] + 8 * 0.19, 1.4, { vel: 0.26 }); a.note('E3', fw[4] + 9 * 0.19, 1.2, { vel: 0.22 });
    a.tag(0, a.w('form', 'theme'), fEnd, 'THE THEME = A', { x: 540, y: 960, color: GOLD });

    // essence: half step, broken chord, the theme returns... home
    a.scale(S('essence').t0, 'A', HMIN);
    const eH = a.w('essence', 'half'), eB = a.w('essence', 'broken'), eR = a.w('essence', 'returning'), eHome = a.w('essence', 'home') - 0.05;
    [0, 1, 2, 3].forEach(i => a.note(i % 2 ? 'D#5' : 'E5', eH + i * 0.25, 0.24, { vel: 0.28 }));
    a.walker([0, 1, 2, 3].map(i => [eH + i * 0.25, i % 2 ? 'D#' : 'E']), { t1: eB, dr: -40, color: TEAL });
    shape('E', S('essence').t0 + 0.1, eB, ['E5', 'D#5'], 'E – D#');
    arp(['A2', 'E3', 'A3', 'C4', 'E4'], eB, 0.15, 0.26);
    shape('Am', eB, eR, AM, 'Am');
    const rs = Math.min(0.2, (eHome - eR) / 8);
    play(MOTIF.slice(0, 8), eR, rs, 0.3);
    a.walker(motifPts(eR, rs).slice(0, 8), { t1: eHome, dr: -40, color: TEAL });
    a.ch('Am', eHome, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'A4'], bass: 'A2', vel: 0.85 });
    a.note('A4', eHome, 2.0, { vel: 0.36 });
    a.tag('A', eHome + 0.1, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
