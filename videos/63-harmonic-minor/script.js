// The harmonic minor: raise the seventh of natural minor for a stronger pull home,
// and get an exotic augmented second as a side effect. Songs: scale only, no tunes.
module.exports = {
  slug: 'harmonic-minor',
  title: 'The Harmonic Minor',
  segments: [
    { id: 'hook',     text: 'Change one note of a minor scale... and a whole other world opens up.' },
    { id: 'what',     text: 'Take A natural minor: A, B, C, D, E, F, G. Now raise the seventh to G sharp.' },
    { id: 'what2',    text: "That's the harmonic minor." },
    { id: 'hava',     text: 'Start it on its fifth note, E, and you get the scale of Hava Nagila...' },
    { id: 'misirlou', text: 'and of Misirlou, the folk song Dick Dale made surf rock.' },
    { id: 'why1',     text: 'So why raise the G? In natural minor, the five chord is E minor: a weak pull home.' },
    { id: 'why2',     text: 'With G sharp, it becomes E major.' },
    { id: 'why2b',    text: 'G sharp sits a half step below A, and pulls hard into A minor.' },
    { id: 'why3',     text: 'Bach and Mozart used that major five chord in minor keys all the time.' },
    { id: 'why4',     text: 'The side effect: F to G sharp is three half steps, between neighbouring notes.' },
    { id: 'why5',     text: 'An augmented second, a gap the major scale never has.' },
    { id: 'why6',     text: 'That gap sounds exotic to Western ears...' },
    { id: 'why6b',    text: "and it's central to many Middle Eastern, Jewish and Balkan melodies." },
    { id: 'essence',  text: 'One raised note for a stronger homecoming... and a whole exotic world came with it.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE NOTE CHANGED', title: 'HARMONIC MINOR', accent: true, tonic: 9, min: 5.6 },
    { id: 'what', segs: ['what'], label: 'RAISE THE SEVENTH', title: 'G → G#', tonic: 9, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'A B C D E F G# A', title: 'HARMONIC MINOR', tonic: 9, tail: 1.9 },
    { id: 'hava', segs: ['hava'], label: 'YOU HEAR IT IN', title: 'Hava Nagila', sub: 'Jewish folk song · arr. Idelsohn · 1918', tonic: 4, tail: 3.8 },
    { id: 'misirlou', segs: ['misirlou'], label: 'YOU HEAR IT IN', title: 'Misirlou', sub: 'Traditional · Dick Dale · 1962', tonic: 4, tail: 3.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'A WEAK FIVE', tonic: 9, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE LEADING TONE', tonic: 9, gap: 0.3, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'BACH · MOZART', title: 'V – i', tonic: 9, row: ['V', 'i', 'V', 'i'], tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'THE SIDE EFFECT', title: 'THREE HALF STEPS', tonic: 9, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'THE SIDE EFFECT', title: 'AUGMENTED SECOND', tonic: 9, circle: false, tail: 0.9 },
    { id: 'why6', segs: ['why6', 'why6b'], label: 'THE EXOTIC GAP', title: 'F – G#', tonic: 9, gap: 0.3, tail: 2.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE RAISED NOTE', accent: true, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const HM = [0, 2, 3, 5, 7, 8, 11], PD = [0, 1, 4, 5, 7, 8, 10], MIN = a.T.MINOR, MAJ = a.T.MAJOR;
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const RUN = ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4', 'A4'];
    const Am = ['A3', 'C4', 'E4'], E = ['G#3', 'B3', 'E4'], Em = ['G3', 'B3', 'E4'];
    const gs = (t0, t1) => a.tag('G#', t0, t1, 'G#', { color: GOLD, dr: -75 });
    const run = (list, t0, step, vel = 0.3, show = true) => list.forEach((n, i) => a.note(n, t0 + i * step, step * 1.6, { vel, show }));

    // ---- hook: A harmonic minor pops in, run up, then E -> Am ----
    a.scale(0.2, 'A', HM, { popIn: { t0: 0.3, step: 0.22 } });
    run(RUN, 0.3, 0.22, 0.3);
    a.tag('G#', 1.7, S('hook').t1, 'G#', { color: GOLD, dr: -75 });
    a.ch('E', 2.3, 3.6, { notes: E, bass: 'E2', vel: 0.6 });
    a.ch('Am', 3.6, S('hook').t1, { notes: Am, bass: 'A2', vel: 0.65 });

    // ---- what: natural minor note by note, then G -> G# ----
    a.scale(S('what').t0, 'A', MIN);
    const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const tn = names.map(n => a.w('what', n, n === 'A' ? 1 : 0));
    names.forEach((n, i) => a.note(n + (i < 2 ? '3' : '4'), tn[i], 0.7, { vel: 0.3 }));
    a.walker(names.map((n, i) => [tn[i], n]), { t1: a.w('what', 'raise') + 0.3, dr: 34, color: '#ffffff' });
    const tRaise = a.w('what', 'raise'), tSharp = a.w('what', 'sharp');
    a.ring(['G'], a.w('what', 'seventh'), tSharp, { color: LILAC });
    a.tag('G', a.w('what', 'seventh'), tSharp + 0.2, 'SEVENTH', { color: LILAC });
    a.scale(tSharp, 'A', HM);
    a.arc('G', 'G#', a.w('what', 'seventh') + 0.3, S('what').t1, { steps: 1, color: GOLD, dr: 30 });
    a.ring(['G#'], tSharp, S('what').t1, { color: GOLD });
    a.tag('G#', tSharp, S('what').t1, 'RAISED', { color: GOLD });
    a.note('G#4', tSharp, 1.0, { vel: 0.36 });
    void tRaise;

    // ---- what2: the scale up, then E -> Am ----
    const w0 = a.at('what2') + 0.1;
    gs(S('what2').t0, S('what2').t1);
    a.ch('Am', S('what2').t0 + 0.05, S('what2').t1 - 1.6, { notes: Am, bass: 'A2', vel: 0.45, hideName: true });
    run(RUN, w0, 0.2, 0.3);
    a.ch('E', S('what2').t1 - 1.6, S('what2').t1 - 0.8, { notes: E, bass: 'E2', vel: 0.7 });
    a.ch('Am', S('what2').t1 - 0.8, S('what2').t1, { notes: Am, bass: 'A2', vel: 0.75 });

    // ---- Hava Nagila: same notes from E (Freygish / Phrygian dominant), scale only ----
    const tE = a.w('hava', 'E');
    a.scale(tE, 'E', PD);
    a.tag('E', tE, S('hava').t1, 'START ON E', { color: TEAL });
    gs(tE, S('misirlou').t1);
    a.big('FREYGISH', a.w('hava', 'scale'), S('hava').t1, { y: 460, size: 44, ...MONO, color: TEAL });
    const PDR = ['E3', 'F3', 'G#3', 'A3', 'B3', 'C4', 'D4', 'E4'];
    const h0 = a.end('hava') + 0.1, hs = 0.3;
    a.ch('E', tE, S('hava').t1, { notes: ['E3', 'G#3', 'B3'], bass: 'E2', vel: 0.4, shape: false, label: 'E', strikes: [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ o: i * 0.6, v: i % 2 ? 0.45 : 0.8 })) });
    const ladder = PDR.concat(PDR.slice(0, -1).reverse());
    run(ladder, h0, hs, 0.3);
    a.walker(ladder.map((n, i) => [h0 + i * hs, n.replace(/\d/, '')]), { t1: S('hava').t1, dr: 34, color: TEAL });
    for (let i = 0; i < 8; i++) { a.perc('kick', tE + i * 0.6, 0.55); a.perc('hat', tE + i * 0.6 + 0.3, 0.35); }

    // ---- Misirlou: the same scale, fast and driving (no melody, no riff) ----
    a.scale(S('misirlou').t0, 'E', PD);
    const m0 = S('misirlou').t0 + 0.1, m1 = S('misirlou').t1, mb = 0.4;
    for (let t = m0, i = 0; t < m1 - 0.2; t += mb, i++) {
      a.perc('kick', t, i % 2 ? 0.4 : 0.7); a.perc(i % 2 ? 'snare' : 'hat', t + mb / 2, 0.5); a.perc('hat', t + mb / 4, 0.25);
    }
    a.ch('E', m0, m1, { notes: ['E3', 'G#3', 'B3'], bass: 'E2', vel: 0.5, shape: false, label: 'E', strikes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({ o: i * 0.8, v: 0.6 })) });
    const fast = [];
    for (let k = 0; k < 2; k++) fast.push(...PDR.map(n => n.replace('3', '4').replace(/^E4$/, k ? 'E5' : 'E4')));
    const up = ['E4', 'F4', 'G#4', 'A4', 'B4', 'C5', 'D5', 'E5'], down = up.slice().reverse();
    const mr = a.end('misirlou') - 0.6;
    run([...up, ...down.slice(1), ...up.slice(1)], mr, 0.16, 0.26);
    a.ring(['F', 'G#'], a.w('misirlou', 'surf'), m1, { color: GOLD });
    void fast;

    // ---- why1: natural minor's five chord, E minor, weak pull ----
    a.scale(S('why1').t0, 'A', MIN);
    const tEm = a.w('why1', 'E') - 0.04;
    a.ch('Am', S('why1').t0 + 0.1, tEm, { notes: Am, bass: 'A2', vel: 0.5 });
    a.ch('Em', tEm, a.w('why1', 'home') + 0.1, { notes: Em, bass: 'E2', vel: 0.7 });
    a.ring(['G'], a.w('why1', 'minor', 1), S('why1').t1, { color: LILAC });
    a.line('E', 'A', a.w('why1', 'weak'), S('why1').t1, { arrow: true, dash: true, color: '#8a8a92', r: 200, label: 'WEAK PULL', ly: 70 });
    a.ch('Am', a.w('why1', 'home') + 0.1, S('why1').t1, { notes: Am, bass: 'A2', vel: 0.45 });

    // ---- why2: E major, G# a half step below A ----
    a.scale(S('why2').t0, 'A', HM);
    const tEM = a.w('why2', 'E') - 0.04, tPull = a.w('why2b', 'pulls') - 0.04;
    a.ch('E', tEM, tPull + 0.5, { notes: E, bass: 'E2', vel: 0.85 });
    a.arc('G', 'G#', a.w('why2', 'sharp'), a.w('why2', 'E'), { steps: 1, color: GOLD, dr: 30 });
    a.ring(['G#'], a.w('why2', 'sharp'), S('why2').t1, { color: GOLD });
    a.arc('G#', 'A', a.w('why2b', 'half'), S('why2').t1, { steps: 1, color: TEAL, dr: 30 });
    a.tag(0, a.w('why2b', 'half'), S('why2').t1, 'HALF STEP BELOW A', { x: 540, y: 1015, color: TEAL });
    a.tag('G#', a.w('why2b', 'sits'), S('why2').t1, 'LEADING TONE', { color: GOLD });
    gs(a.w('why2', 'sharp'), a.w('why2b', 'sits') - 0.1);
    a.note('G#4', a.w('why2b', 'G'), 1.0, { vel: 0.36 });
    a.ch('Am', tPull + 0.5, S('why2').t1, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.9 });
    a.note('A4', tPull + 0.5, 1.2, { vel: 0.3 });

    // ---- why3: classical V - i, again and again ----
    const c0 = S('why3').t0 + 0.05, cl = (S('why3').t1 - c0) / 4;
    ['E', 'Am', 'E', 'Am'].forEach((c, i) => a.ch(c, c0 + i * cl, c0 + (i + 1) * cl, {
      notes: c === 'E' ? ['B3', 'E4', 'G#4'] : ['C4', 'E4', 'A4'], bass: c === 'E' ? 'E2' : 'A2', row: i, vel: 0.8,
      strikes: [{ o: 0, v: 1 }, { o: cl / 3, v: 0.4 }, { o: 2 * cl / 3, v: 0.4 }] }));
    gs(S('why3').t0, S('why3').t1);

    // ---- why4: F to G#, three half steps ----
    a.ch('F', S('why4').t0 + 0.1, S('why4').t1, { notes: ['F3', 'A3', 'C4'], bass: false, vel: 0.35, shape: false, hideName: true });
    const tF = a.w('why4', 'F'), tG = a.w('why4', 'G');
    a.ring(['F'], tF, S('why4').t1, { color: RED });
    a.ring(['G#'], tG, S('why4').t1, { color: RED });
    a.note('F4', tF, 0.6, { vel: 0.34 }); a.note('G#4', tG, 0.8, { vel: 0.34 });
    a.arc('F', 'G#', a.w('why4', 'three'), S('why4').t1, { steps: 3, color: RED, dr: 30, label: '3 HALF STEPS', labelR: 165 });
    gs(tG, S('why4').t1);
    const n0 = a.w('why4', 'neighbouring');
    for (let k = 0; k < 2; k++) { a.note('F4', n0 + k * 0.9, 0.4, { vel: 0.3 }); a.note('G#4', n0 + k * 0.9 + 0.45, 0.45, { vel: 0.3 }); }

    // ---- why5: step sizes, major vs harmonic minor ----
    const g0 = S('why5').t0 + 0.1, g1 = S('why5').t1;
    a.big('MAJOR SCALE', g0, g1, { y: 540, size: 34, ...MONO, color: '#9a9aa2', blur: 0 });
    const gMaj = a.grid([2, 2, 1, 2, 2, 2, 1].map(s => ({ label: String(s), size: 50, color: TEAL })), g0, g1,
      { rows: 1, cols: 7, cw: 128, chh: 130, y: 570, revealStep: 0.06 });
    a.big('HARMONIC MINOR', g0 + 0.3, g1, { y: 760, size: 34, ...MONO, color: '#9a9aa2', blur: 0 });
    const gHm = a.grid([2, 1, 2, 2, 1, 3, 1].map(s => ({ label: String(s), size: 50, color: s === 3 ? RED : LILAC })), g0 + 0.3, g1,
      { rows: 1, cols: 7, cw: 128, chh: 130, y: 790, revealStep: 0.06, caption: 'HALF STEPS BETWEEN NEIGHBOURS' });
    const tAug = a.w('why5', 'augmented');
    gHm.active.push({ t0: tAug, t1: g1, i: 5 });
    a.note('F4', tAug, 0.5, { vel: 0.32, show: false }); a.note('G#4', tAug + 0.45, 0.8, { vel: 0.32, show: false });
    a.ch('Am', g0, g1, { notes: Am, bass: 'A2', vel: 0.35, shape: false, hideName: true });
    a.note('F4', a.w('why5', 'gap'), 0.5, { vel: 0.3, show: false }); a.note('G#4', a.w('why5', 'gap') + 0.4, 0.9, { vel: 0.3, show: false });

    // ---- why6: an original motif leaning on the gap, over an A minor drone ----
    a.scale(S('why6').t0, 'A', HM);
    a.ring(['F', 'G#'], S('why6').t0 + 0.2, S('why6').t1, { color: RED });
    a.arc('F', 'G#', S('why6').t0 + 0.2, S('why6').t1, { steps: 3, color: RED, dr: 30 });
    gs(S('why6').t0 + 0.2, S('why6').t1);
    const d0 = S('why6').t0 + 0.1, d1 = S('why6').t1;
    for (let t = d0; t < d1 - 0.3; t += 1.6) { a.note('A2', t, 1.7, { vel: 0.3, show: false }); a.note('E3', t, 1.7, { vel: 0.2, show: false }); }
    const motif = [['E4', 1], ['F4', 0.5], ['G#4', 1.5], ['A4', 1], ['G#4', 0.5], ['F4', 0.5], ['E4', 2],
      ['D4', 0.5], ['E4', 0.5], ['F4', 1], ['E4', 0.5], ['D4', 0.5], ['C4', 1], ['B3', 0.5], ['C4', 0.5], ['B3', 0.5], ['G#3', 0.5], ['A3', 3]];
    a.melody(motif, d0 + 0.4, 0.34, { vel: 0.32 });
    a.big('MIDDLE EAST · JEWISH · BALKAN', a.w('why6b', 'Middle'), d1, { y: 470, size: 34, ...MONO, color: GOLD });
    a.big('EXOTIC', a.w('why6', 'exotic'), a.at('why6b'), { y: 470, size: 48, ...MONO, color: RED });
    a.ch('Am', a.end('why6b') + 0.3, d1, { notes: Am, bass: false, vel: 0.4, hideName: false, shape: true });

    // ---- essence: E -> Am, the scale, home ----
    a.scale(S('essence').t0, 'A', HM);
    const e0 = S('essence').t0 + 0.1;
    a.ch('Am', e0, e0 + 1.0, { notes: Am, bass: 'A2', vel: 0.7 });
    a.ch('Dm', e0 + 1.0, e0 + 2.0, { notes: ['A3', 'D4', 'F4'], bass: 'D3', vel: 0.7 });
    a.ch('E', e0 + 2.0, e0 + 3.2, { notes: ['B3', 'E4', 'G#4'], bass: 'E2', vel: 0.8 });
    a.ring(['G#'], e0 + 2.0, S('essence').t1, { color: GOLD });
    gs(e0 + 2.0, S('essence').t1);
    a.ch('Am', e0 + 3.2, S('essence').t1 - 0.3, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.85 });
    run(RUN, e0 + 3.3, 0.18, 0.22);
    a.tag('A', e0 + 3.2, S('essence').t1, 'HOME', { dr: -75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void MAJ; void BLUE;
  },
};
