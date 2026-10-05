// The major scale: W W H W W W H. Two half steps, placed unevenly, give every note a role.
module.exports = {
  slug: 'major-scale',
  title: 'The Major Scale',
  segments: [
    { id: 'hook',    text: 'Do, re, mi, fa, so, la, ti, do. But why these notes?' },
    { id: 'what',    text: 'The major scale is a pattern: whole, whole, half, whole, whole, whole, half.' },
    { id: 'what2',   text: "Start on C, and it's simply all the white keys." },
    { id: 'joy',     text: 'Joy to the World opens with the whole scale, going down.' },
    { id: 'doremi',  text: 'And Rodgers and Hammerstein built a whole song on its syllables: Do Re Mi.' },
    { id: 'why1',    text: 'So why does it work? There are only two half steps: mi to fa, and ti to do.' },
    { id: 'why2',    text: 'That uneven spacing tells your ear where home is.' },
    { id: 'lead',    text: 'Ti sits just a half step under do, so it pulls up into it: the leading tone.' },
    { id: 'chords',  text: 'The three main chords, C, F and G, contain exactly the seven notes of the scale.' },
    { id: 'fifths',  text: 'And those seven notes are seven stacked fifths: F, C, G, D, A, E, B.' },
    { id: 'guido',   text: "The syllables come from Guido d'Arezzo, in the 11th century..." },
    { id: 'guido2',  text: 'taken from the first syllables of the lines of a Latin hymn. Ut later became do.' },
    { id: 'essence', text: 'Seven notes, two half steps. That small asymmetry gives every note a role.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DO RE MI FA SO LA TI', title: 'THE MAJOR SCALE', accent: true, tonic: 0, min: 5.4, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'A PATTERN OF STEPS', title: 'W W H W W W H', tonic: 0, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'IN C', title: 'ALL WHITE KEYS', tonic: 0, tail: 1.2 },
    { id: 'joy', segs: ['joy'], label: 'YOU HEAR IT IN', title: 'Joy to the World', sub: 'Watts 1719 · Mason 1839', tonic: 0, tail: 4.6 },
    { id: 'doremi', segs: ['doremi'], label: 'YOU HEAR IT IN', title: 'Do-Re-Mi', sub: 'Rodgers & Hammerstein · 1959', tonic: 0, circle: false, tail: 1.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWO HALF STEPS', tonic: 0, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'UNEVEN SPACING', tonic: 0, circle: false, tail: 0.8 },
    { id: 'lead', segs: ['lead'], label: 'TI → DO', title: 'THE LEADING TONE', tonic: 0, tail: 1.0 },
    { id: 'chords', segs: ['chords'], label: 'I · IV · V', title: 'THREE CHORDS', tonic: 0, row: ['C', 'F', 'G'], tail: 1.0 },
    { id: 'fifths', segs: ['fifths'], label: 'THE CIRCLE OF FIFTHS', title: 'SEVEN IN A ROW', tonic: 0, tail: 1.0 },
    { id: 'guido', segs: ['guido', 'guido2'], label: "GUIDO D'AREZZO", title: 'UT QUEANT LAXIS', sub: '11th century', tonic: 0, circle: false, gap: 0.3, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'EVERY NOTE A ROLE', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', GREEN = '#7be07b', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const MAJ = a.T.MAJOR;
    const SC = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const SYL = ['DO', 'RE', 'MI', 'FA', 'SO', 'LA', 'TI'];
    const UP = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

    // ---- hook: the scale on the spoken syllables ----
    const h1 = S('hook').t1;
    const hw = ['Do', 're', 'mi', 'fa', 'so', 'la', 'ti', 'do'].map(w => a.w('hook', w));
    a.scale(0.2, 'C', MAJ, { popIn: { t0: 0.3, step: 0.12 } });
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].forEach((n, i) => a.note(n, 0.3 + i * 0.12, 0.5, { vel: 0.2, show: false }));
    UP.forEach((n, i) => a.note(n, hw[i], 0.6, { vel: 0.32 }));
    SC.forEach((n, i) => a.tag(n, 0.4 + i * 0.12, h1, SYL[i], { dr: n === 'E' || n === 'B' ? -128 : -80 }));
    a.ch('C', a.w('hook', 'why') - 0.1, h1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.55 });

    // ---- what: W W H W W W H, walked step by step ----
    const ww = [a.w('what', 'whole', 0), a.w('what', 'whole', 1), a.w('what', 'half', 0), a.w('what', 'whole', 2), a.w('what', 'whole', 3), a.w('what', 'whole', 4), a.w('what', 'half', 1)];
    const PAT = [2, 2, 1, 2, 2, 2, 1];
    const t0w = a.at('what');
    a.scale(S('what').t0, 'C', MAJ);
    a.note('C4', t0w + 0.2, 0.6, { vel: 0.3 });
    const wpts = [[t0w + 0.2, 'C']];
    PAT.forEach((st, i) => {
      const from = SC[i], to = SC[(i + 1) % 7];
      a.arc(from, to, ww[i], S('what').t1, { steps: st, color: st === 1 ? RED : TEAL, dr: 30 });
      a.note(UP[i + 1], ww[i], 0.6, { vel: 0.32 });
      wpts.push([ww[i], to]);
    });
    a.walker(wpts, { t1: S('what').t1, dr: 34, color: '#ffffff' });
    a.tag('C', ww[0], S('what').t1, 'W = WHOLE · H = HALF', { x: 540, y: 462, color: '#ffffff' });

    // ---- what2: in C it's all the white keys ----
    const tWhite = a.w('what2', 'white');
    a.scale(S('what2').t0, 'C', MAJ);
    a.ring(['C'], a.w('what2', 'C'), S('what2').t1, { color: GOLD });
    const white = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    white.forEach((n, i) => a.note(n, tWhite + i * 0.07, S('what2').t1 - tWhite - i * 0.07 - 0.1, { vel: i % 7 === 0 ? 0.14 : 0.08, show: false }));
    a.ch('C', S('what2').t0 + 0.1, S('what2').t1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.4, hideName: true, shape: false });
    a.big('NO BLACK KEYS', tWhite, S('what2').t1, { y: 462, size: 48, ...MONO, color: GOLD });

    // ---- Joy to the World (public domain): the scale, all the way down ----
    const j0 = a.end('joy') + 0.15, beat = 0.27; // one eighth note
    const JOY = [['C5', 2], ['B4', 1.5], ['A4', 0.5], ['G4', 3], ['F4', 1], ['E4', 2], ['D4', 2], ['C4', 4]];
    a.scale(S('joy').t0, 'C', MAJ);
    let tj = j0; const jpts = [];
    JOY.forEach(([n, b]) => { jpts.push([tj, n.replace(/\d/, '')]); tj += b * beat; });
    a.melody(JOY, j0, beat, { vel: 0.42 });
    a.walker(jpts, { t1: S('joy').t1, dr: 34, color: GOLD, label: 'DOWN', labelDr: 50 });
    a.ch('C', S('joy').t0 + 0.1, jpts[6][0], { notes: ['E3', 'G3'], bass: 'C2', vel: 0.45, hideName: true, shape: false });
    a.ch('G', jpts[6][0], jpts[7][0], { notes: ['D3', 'G3'], bass: 'G2', vel: 0.45, hideName: true, shape: false });
    a.ch('C', jpts[7][0], S('joy').t1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.5, hideName: true, shape: false });
    a.arc('C', 'C', a.w('joy', 'down'), S('joy').t1, { steps: -12, color: GOLD, dr: -30, label: 'ALL 8 NOTES', labelR: 140 });

    // ---- Do-Re-Mi (copyrighted): just the syllables, over plain I-IV-V-I chords ----
    const d0 = S('doremi').t0 + 0.1, d1 = S('doremi').t1;
    const g = a.grid([...SYL, 'DO'].map((s, i) => ({ label: s, size: 46, color: a.T.degColor(a.T.pc(SC[i % 7]), 0) })),
      d0, d1, { rows: 2, cols: 4, cw: 210, chh: 170, y: 560, revealStep: 0.1, caption: 'THE SOLFÈGE SYLLABLES' });
    const tSyl = a.w('doremi', 'syllables');
    for (let i = 0; i < 8; i++) g.active.push({ t0: tSyl + i * 0.18, t1: tSyl + i * 0.18 + 0.4, i });
    const dl = (d1 - d0) / 4;
    [['C', ['E3', 'G3', 'C4'], 'C2'], ['F', ['F3', 'A3', 'C4'], 'F2'], ['G', ['D3', 'G3', 'B3'], 'G2'], ['C', ['E3', 'G3', 'C4'], 'C2']]
      .forEach(([c, n, b], i) => a.ch(c, d0 + i * dl, d0 + (i + 1) * dl, { notes: n, bass: b, vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: dl / 2, v: 0.5 }] }));

    // ---- why1: only two half steps, mi-fa and ti-do ----
    const y0 = S('why1').t0, tMi = a.w('why1', 'mi'), tTi = a.w('why1', 'ti'), y1 = S('why1').t1;
    a.scale(y0, 'C', MAJ);
    a.ch('C', y0 + 0.1, y1, { notes: ['E3', 'G3', 'C4'], bass: 'C2', vel: 0.4, hideName: true, shape: false });
    a.arc('E', 'F', tMi, y1, { steps: 1, color: RED, dr: 30 });
    a.ring(['E', 'F'], tMi, y1, { color: RED });
    a.tag('E', tMi, y1, 'MI', { dr: -75 }); a.tag('F', a.w('why1', 'fa'), y1, 'FA', { dr: -75 });
    a.note('E4', tMi, 0.5, { vel: 0.32 }); a.note('F4', a.w('why1', 'fa'), 0.7, { vel: 0.32 });
    a.arc('B', 'C', tTi, y1, { steps: 1, color: RED, dr: 30 });
    a.ring(['B', 'C'], tTi, y1, { color: RED });
    a.tag('B', tTi, y1, 'TI', { dr: -75 }); a.tag('C', a.w('why1', 'do'), y1, 'DO', { dr: -75 });
    a.note('B4', tTi, 0.5, { vel: 0.32 }); a.note('C5', a.w('why1', 'do'), 0.7, { vel: 0.32 });
    a.big('ONLY 2 HALF STEPS', a.w('why1', 'two'), y1, { y: 462, size: 46, ...MONO, color: RED });

    // ---- why2: the pattern as boxes, the two half steps stand out ----
    const z0 = S('why2').t0 + 0.1, z1 = S('why2').t1;
    const PG = a.grid(PAT.map(st => ({ label: st === 1 ? 'H' : 'W', sub: st === 1 ? '1 KEY' : '2 KEYS', size: 60, color: st === 1 ? RED : TEAL })),
      z0, z1, { rows: 1, cols: 7, cw: 140, chh: 190, y: 640, revealStep: 0.08, caption: 'THE GAPS ARE NOT EQUAL' });
    PG.active.push({ t0: a.w('why2', 'uneven'), t1: z1, i: 2 }, { t0: a.w('why2', 'uneven'), t1: z1, i: 6 });
    a.big('HOME', a.w('why2', 'home'), z1, { y: 960, size: 72, color: GOLD });
    UP.forEach((n, i) => a.note(n, z0 + 0.1 + i * 0.22, 0.4, { vel: 0.22 }));
    a.ch('C', a.w('why2', 'home') - 0.05, z1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.55 });

    // ---- lead: ti pulls up into do (G7 -> C) ----
    const l0 = S('lead').t0, tPull = a.w('lead', 'pulls'), l1 = S('lead').t1;
    a.scale(l0, 'C', MAJ);
    a.ch('G7', l0 + 0.1, tPull + 0.3, { notes: ['B3', 'D4', 'F4', 'G4'], bass: 'G2', vel: 0.7 });
    a.ring(['B'], a.w('lead', 'Ti'), l1, { color: GOLD });
    a.tag('B', a.w('lead', 'Ti'), l1, 'TI', { dr: -75 });
    a.note('B4', a.w('lead', 'Ti'), 0.9, { vel: 0.34 });
    a.arc('B', 'C', tPull, l1, { steps: 1, color: GOLD, dr: 30 });
    a.ch('C', tPull + 0.3, l1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.8 });
    a.big('LEADING TONE', a.w('lead', 'leading'), l1, { y: 462, size: 50, ...MONO, color: GOLD });

    // ---- chords: C + F + G = all seven notes ----
    const c0 = S('chords').t0, c1 = S('chords').t1;
    const tc = [a.w('chords', 'C'), a.w('chords', 'F'), a.w('chords', 'G')].map(t => t - 0.05);
    a.scale(c0, 'C', [0]);
    a.scale(tc[0], 'C', [0, 4, 7]);
    a.ch('C', c0 + 0.1, tc[0], { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.5, hideName: true });
    const TRI = [['C', ['C4', 'E4', 'G4'], 'C3', ['C', 'E', 'G'], PINK], ['F', ['C4', 'F4', 'A4'], 'F2', ['F', 'A', 'C'], GREEN], ['G', ['B3', 'D4', 'G4'], 'G2', ['G', 'B', 'D'], TEAL]];
    TRI.forEach(([c, n, b, pcs, col], i) => {
      a.ch(c, tc[i], i < 2 ? tc[i + 1] : a.w('chords', 'seven') - 0.05, { notes: n, bass: b, row: i, vel: 0.8 });
      a.poly(pcs, tc[i] + 0.3, c1, { color: col, dash: false, width: 3, alpha: 0.75 });
    });
    a.scale(tc[1], 'C', [0, 4, 5, 7, 9]); a.scale(tc[2], 'C', MAJ);
    const tSev = a.w('chords', 'seven');
    a.ch('C', tSev - 0.05, c1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', row: 0, vel: 0.5, hideName: true, shape: false });
    a.big('3 CHORDS = 7 NOTES', tSev, c1, { y: 1110, size: 40, ...MONO, color: GOLD });

    // ---- fifths: rearrange the circle by fifths, seven neighbours in a row ----
    const f0 = S('fifths').t0, f1 = S('fifths').t1;
    const FI = ['F', 'C', 'G', 'D', 'A', 'E', 'B'], FM = ['F2', 'C3', 'G3', 'D4', 'A4', 'E5', 'B4'];
    a.scale(f0, 'C', MAJ);
    a.layout(f0 + 0.2, 1, 1.4);
    const fpts = FI.map((n, i) => [a.w('fifths', n, n === 'F' || n === 'C' || n === 'G' ? 0 : 0), n]);
    a.walker(fpts, { t1: f1, color: '#ffffff', dr: 34 });
    FI.forEach((n, i) => a.note(FM[i], fpts[i][0], f1 - fpts[i][0], { vel: 0.18 }));
    a.poly(FI, a.w('fifths', 'B') + 0.2, f1, { closed: false, dash: false, color: GOLD, glow: true, alpha: 0.9, width: 5 });
    a.poly(FI, a.w('fifths', 'stacked'), a.w('fifths', 'B') + 0.2, { closed: false, dash: true, color: GOLD, alpha: 0.5, width: 3 });
    a.layout(f1 - 0.05, 0, 0.9);

    // ---- guido: ut re mi fa sol la -> ut becomes do ----
    const u0 = S('guido').t0 + 0.1, u1 = S('guido').t1, tUt = a.w('guido2', 'Ut'), tDo = a.w('guido2', 'do');
    const UT = ['UT', 'RE', 'MI', 'FA', 'SOL', 'LA'];
    const ug = a.grid(UT.map((s, i) => ({ label: s, size: 52, color: a.T.degColor(a.T.pc(SC[i]), 0) })), u0, tDo, { rows: 2, cols: 3, cw: 260, chh: 180, y: 600, revealStep: 0.12, caption: 'FIRST SYLLABLES OF A LATIN HYMN' });
    const tFirst = a.w('guido2', 'first');
    UT.forEach((_, i) => ug.active.push({ t0: tFirst + i * 0.2, t1: tFirst + i * 0.2 + 0.45, i }));
    ug.active.push({ t0: tUt, t1: tDo, i: 0 });
    const dg = a.grid(['DO', 'RE', 'MI', 'FA', 'SOL', 'LA'].map((s, i) => ({ label: s, size: 52, color: a.T.degColor(a.T.pc(SC[i]), 0) })), tDo, u1, { rows: 2, cols: 3, cw: 260, chh: 180, y: 600, caption: 'UT BECAME DO' });
    a.big('UT → DO', tDo, u1, { y: 1060, size: 64, ...MONO, color: GOLD });
    dg.active.push({ t0: tDo, t1: u1, i: 0 });
    a.ch('C', u0, u1, { notes: ['G3', 'C4'], bass: 'C2', vel: 0.35, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: 3, v: 0.6 }, { o: 6, v: 0.6 }] });
    a.note('C4', tDo, 1.2, { vel: 0.3 });

    // ---- essence: the scale once more, the two half steps glowing, home chord ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'C', MAJ);
    UP.forEach((n, i) => a.note(n, e0 + i * 0.3, 0.6, { vel: 0.26 }));
    a.arc('E', 'F', e0 + 0.6, e1, { steps: 1, color: RED, dr: 30 });
    a.arc('B', 'C', e0 + 1.8, e1, { steps: 1, color: RED, dr: 30 });
    a.ch('C', e0 + 2.5, e1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
