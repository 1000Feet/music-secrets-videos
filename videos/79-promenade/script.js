// The Promenade from Pictures at an Exhibition: a walk with an uneven step, bars of 5 and 6 beats.
// Mussorgsky's melody is NOT played: the music is an original call (one voice, 5/4) and
// response (full chords, 6/4) in B-flat major, on the same alternating bar grid.
const BEAT = 0.44, B5 = 5 * BEAT, B6 = 6 * BEAT, PAIR = B5 + B6;
// original material
const CALL = ['Bb4', 'C5', 'D5', 'F5', 'Eb5'];
const RESP = [['Bb', ['F4', 'Bb4', 'D5'], 'Bb2'], ['F', ['F4', 'A4', 'C5'], 'F2'], ['Gm', ['D4', 'G4', 'Bb4'], 'G2'],
  ['Cm', ['Eb4', 'G4', 'C5'], 'C3'], ['F', ['C4', 'F4', 'A4'], 'F2'], ['Bb', ['D4', 'F4', 'Bb4'], 'Bb2']];
const CALL_M = ['Bb4', 'C5', 'Db5', 'F5', 'Eb5'];
const RESP_M = [['Bbm', ['F4', 'Bb4', 'Db5'], 'Bb2'], ['F', ['F4', 'A4', 'C5'], 'F2'], ['Gb', ['Db4', 'Gb4', 'Bb4'], 'Gb2'],
  ['Ebm', ['Eb4', 'Gb4', 'Bb4'], 'Eb2'], ['F', ['C4', 'F4', 'A4'], 'F2'], ['Bbm', ['Db4', 'F4', 'Bb4'], 'Bb2']];

module.exports = {
  slug: 'promenade',
  title: 'The Promenade',
  segments: [
    { id: 'hook',    text: 'This music walks... but with an uneven step.' },
    { id: 'what',    text: "It's the Promenade from Pictures at an Exhibition, by Modest Mussorgsky, 1874." },
    { id: 'what2',   text: 'Written for piano, after an exhibition of paintings by his friend...' },
    { id: 'what2b',  text: 'Viktor Hartmann, who had died in 1873.' },
    { id: 'walk',    text: 'The Promenade is the visitor, walking from one painting to the next.' },
    { id: 'ravel',   text: "Maurice Ravel's 1922 orchestration, opening with a solo trumpet, made it world famous." },
    { id: 'why1',    text: 'So why does it feel like walking? The bars alternate five and six beats.' },
    { id: 'why1b',   text: 'Five plus six: eleven beats before the pattern repeats.' },
    { id: 'why2',    text: 'Irregular, like a real walk. Strolling, looking, pausing.' },
    { id: 'why3',    text: 'Then, call and response. A single line states the tune...' },
    { id: 'why3b',   text: 'and full chords answer it, like a Russian choir.' },
    { id: 'why4',    text: "It's not a European march, in regular four four..." },
    { id: 'why4b',   text: "It's meant to sound Russian, like a folk song." },
    { id: 'why5',    text: 'And each time it returns between pictures, it has changed. Shorter, softer, sadder.' },
    { id: 'why5b',   text: "The visitor's mood, after each painting." },
    { id: 'essence', text: "An uneven step and a simple tune... and you're walking through a gallery." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MUSSORGSKY · 1874', title: 'THE PROMENADE', accent: true, circle: false, tonic: 10, min: 0.3 + PAIR + 0.2, tail: 0.2 },
    { id: 'what', segs: ['what'], label: 'PICTURES AT AN EXHIBITION', title: 'THE PROMENADE', sub: 'Modest Mussorgsky · 1874', tonic: 10, tail: 0.4 },
    { id: 'what2', segs: ['what2', 'what2b'], gap: 0.2, label: 'A FRIEND’S PAINTINGS', title: 'VIKTOR HARTMANN', circle: false, tonic: 10, tail: 0.4 },
    { id: 'walk', segs: ['walk'], label: 'FROM PICTURE TO PICTURE', title: 'THE VISITOR', circle: false, tonic: 10, tail: 0.6 },
    { id: 'ravel', segs: ['ravel'], label: 'ORCHESTRATED · 1922', title: 'MAURICE RAVEL', circle: false, tonic: 10, tail: 1.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'ELEVEN BEATS', circle: false, tonic: 10, gap: 0.3, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A REAL WALK', circle: false, tonic: 10, tail: 0.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'CALL AND RESPONSE', tonic: 10, gap: 0.3, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'NOT A MARCH', title: 'A RUSSIAN TUNE', circle: false, tonic: 10, gap: 0.3, tail: 2.6 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'EACH TIME IT RETURNS', title: 'A CHANGED MOOD', tonic: 10, gap: 0.3, tail: 2.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'AN UNEVEN WALK', accent: true, tonic: 10, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const cells = (n, col) => [...Array(n)].map((_, i) => ({ label: String(i + 1), color: col, size: 54 }));
    // the two bar grids: 5 beats (one voice) above 6 beats (full chords)
    function barGrids(t0, t1, o = {}) {
      const g5 = a.grid(cells(5, PINK), t0, t1, { rows: 1, cols: 5, cw: 150, chh: 150, y: 525, revealStep: o.reveal });
      const g6 = a.grid(cells(6, TEAL), t0, t1, { rows: 1, cols: 6, cw: 150, chh: 150, y: 725, revealStep: o.reveal });
      a.big('5 BEATS · ONE VOICE', t0, t1, { y: 505, size: 26, ...MONO, color: PINK, blur: 0 });
      a.big('6 BEATS · FULL CHORDS', t0, t1, { y: 705, size: 26, ...MONO, color: TEAL, blur: 0 });
      return { g5, g6 };
    }

    // one call (5/4) + response (6/4) from t; returns the end time
    function pair(t, o = {}) {
      const v = o.vel ?? 1, call = o.minor ? CALL_M : CALL, resp = o.minor ? RESP_M : RESP;
      const G = typeof o.grids === 'function' ? o.grids(t + 0.01) : o.grids;
      if (!o.noCall) call.forEach((n, i) => {
        const tb = t + i * BEAT;
        a.note(n, tb, BEAT * 0.92, { vel: 0.42 * v, show: o.show ?? true });
        if (o.trumpet) a.note(a.T.midi(n) - 12, tb, BEAT * 0.92, { vel: 0.3 * v, show: false });
        if (G) G.g5.active.push({ t0: tb, t1: tb + BEAT, i });
        a.perc('hat', tb, (i ? 0.18 : 0.32) * v);
        if (!i) a.perc('kick', tb, 0.5 * v);
      });
      if (o.callOnly) return t + B5;
      const r0 = t + B5;
      resp.forEach(([name, notes, bass], i) => {
        const tb = r0 + i * BEAT, last = i === resp.length - 1;
        a.ch(name, tb, tb + BEAT * (last ? (o.hold ?? 1) : 1), { notes, bass, vel: 0.85 * v, hideName: o.hideName });
        if (G) G.g6.active.push({ t0: tb, t1: tb + BEAT, i });
        a.perc('hat', tb, (i ? 0.18 : 0.32) * v);
        if (!i) a.perc('kick', tb, 0.55 * v);
      });
      return r0 + B6;
    }
    // continuous pairs from t0; any leftover time before t1 is a held chord
    function walkOn(t0, t1, o = {}) {
      let t = t0;
      while (t + PAIR <= t1 + 0.05) t = pair(t, { ...o, ...(o.styleAt ? o.styleAt(t) : {}) });
      if (t1 - t > B5 + 0.6) { t = pair(t, { ...o, callOnly: true }); }
      if (t1 - t > 0.4) a.ch('Bb', t, t1, { notes: ['D4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.55 * (o.vel ?? 1), hideName: o.hideName });
      return t;
    }

    // ---------- part 1: one continuous walk from the hook to the end of the Ravel scene ----------
    const hookG = barGrids(0.1, S('hook').t1, { reveal: 0.04 });
    const ravelG = barGrids(S('ravel').t0, S('ravel').t1);
    a.big('AN UNEVEN STEP', 0.3, S('hook').t1, { y: 1010, size: 72, color: GOLD });
    a.scale(S('what').t0, 'Bb', a.T.MAJOR, { popIn: { t0: S('what').t0 + 0.1, step: 0.06 } });
    const tSolo = a.w('ravel', 'solo') - 1.2;
    walkOn(0.3, S('ravel').t1 - 0.2, {
      grids: t => (t < S('hook').t1 ? hookG : t >= S('ravel').t0 ? ravelG : null),
      styleAt: t => (t >= tSolo ? { trumpet: true, vel: 1.1 } : t >= S('what2').t0 ? { vel: 0.6 } : t >= S('what').t0 - 0.5 ? { vel: 0.8 } : { vel: 0.9 }),
    });

    // what2: two years
    const gY = a.grid([{ label: '1873', sub: 'HARTMANN DIES', size: 80, color: GREY }, { label: '1874', sub: 'THE PICTURES', size: 80, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 400, chh: 230, y: 560, revealStep: 0.2 });
    gY.active.push({ t0: S('what2').t0 + 0.1, t1: a.w('what2b', '1873') - 0.05, i: 1 }, { t0: a.w('what2b', '1873') - 0.05, t1: S('what2').t1, i: 0 });
    a.big('FOR PIANO', a.w('what2', 'piano'), S('what2').t1, { y: 940, size: 64, color: '#ffffff' });
    a.big('AN EXHIBITION OF PAINTINGS', a.w('what2', 'exhibition'), S('what2').t1, { y: 1040, size: 40, ...MONO, color: GOLD, blur: 10 });

    // walk: picture, walk, picture, walk, picture
    const WALK = [{ label: '1', sub: 'PICTURE', size: 64, color: GOLD }, { label: '→', sub: 'WALK', size: 64, color: TEAL },
      { label: '2', sub: 'PICTURE', size: 64, color: GOLD }, { label: '→', sub: 'WALK', size: 64, color: TEAL }, { label: '3', sub: 'PICTURE', size: 64, color: GOLD }];
    const gW = a.grid(WALK, S('walk').t0 + 0.1, S('walk').t1, { rows: 1, cols: 5, cw: 196, chh: 220, y: 600, revealStep: 0.08 });
    const wk0 = a.w('walk', 'walking') - 0.6, wkStep = (S('walk').t1 - wk0) / 5;
    for (let i = 0; i < 5; i++) gW.active.push({ t0: wk0 + i * wkStep, t1: wk0 + (i + 1) * wkStep, i });
    a.big('THE VISITOR', a.w('walk', 'visitor'), S('walk').t1, { y: 980, size: 72, color: TEAL });

    // ravel: solo trumpet, world famous
    a.big('SOLO TRUMPET', a.w('ravel', 'trumpet'), S('ravel').t1, { y: 1000, size: 64, color: GOLD });
    a.big('WORLD FAMOUS', a.w('ravel', 'famous'), S('ravel').t1, { y: 1090, size: 44, ...MONO, color: '#ffffff', blur: 10 });

    // ---------- part 2 ----------
    // why1 + why2: the bar grids again, counting 5 + 6 = 11
    const p2G = barGrids(S('why1').t0, S('why2').t1);
    walkOn(S('why1').t0 + 0.2, S('why2').t1 - 0.1, { grids: p2G, vel: 0.8 });
    const tEl = a.w('why1b', 'eleven');
    a.big('5 + 6', a.w('why1', 'five'), tEl, { y: 1010, size: 110, ...MONO, color: '#ffffff' });
    a.big('5 + 6 = 11', tEl, S('why1').t1, { y: 1010, size: 110, ...MONO, color: GOLD });
    a.big('STROLLING', a.w('why2', 'Strolling'), S('why2').t1, { x: 290, y: 1000, size: 40, ...MONO, color: PINK });
    a.big('LOOKING', a.w('why2', 'looking'), S('why2').t1, { x: 560, y: 1000, size: 40, ...MONO, color: TEAL });
    a.big('PAUSING', a.w('why2', 'pausing'), S('why2').t1, { x: 800, y: 1000, size: 40, ...MONO, color: GOLD });
    a.big('IRREGULAR', a.w('why2', 'Irregular'), S('why2').t1, { y: 1090, size: 30, ...MONO, color: GREY, blur: 0 });

    // why3: call (one voice on the circle) and response (full chords)
    a.scale(S('why3').t0, 'Bb');
    const c0 = a.w('why3', 'single') - 0.1;
    a.ch('Bb', S('why3').t0 + 0.1, c0, { notes: ['D4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.4 });
    pair(c0, { callOnly: true, vel: 0.95 });
    a.walker(CALL.map((n, i) => [c0 + i * BEAT, n.replace(/\d/, '')]), { t1: c0 + B5 + 0.3, dr: -40, color: PINK });
    a.tag(0, c0, c0 + B5, 'THE CALL', { x: 540, y: 455, color: PINK });
    const r0 = Math.max(c0 + B5, a.w('why3b', 'full') - 0.1);
    a.tag(0, r0, S('why3').t1, 'THE ANSWER · A CHOIR', { x: 540, y: 455, color: TEAL });
    const rEnd = pair(r0 - B5, { vel: 0.95, show: false, noCall: true });
    a.ch('Bb', rEnd, S('why3').t1 - 0.1, { notes: ['D4', 'F4', 'Bb4', 'D5'], bass: 'Bb2', vel: 0.6 });

    // why4: a 4/4 march first, then the 5 + 6 Russian walk
    const MARCH = [...Array(8)].map((_, i) => ({ label: String((i % 4) + 1), color: BLUE, size: 44 }));
    const RUS = [...cells(5, PINK), ...cells(6, TEAL)].map(c => ({ ...c, size: 40 }));
    const gM = a.grid(MARCH, S('why4').t0 + 0.1, S('why4').t1, { rows: 1, cols: 8, cw: 112, chh: 120, y: 540, revealStep: 0.03 });
    const gR = a.grid(RUS, S('why4').t0 + 0.1, S('why4').t1, { rows: 1, cols: 11, cw: 88, chh: 120, y: 790, revealStep: 0.03 });
    a.big('A EUROPEAN MARCH · 4 + 4', S('why4').t0 + 0.1, S('why4').t1, { y: 515, size: 26, ...MONO, color: BLUE, blur: 0 });
    a.big('RUSSIAN, LIKE A FOLK SONG · 5 + 6', S('why4').t0 + 0.1, S('why4').t1, { y: 765, size: 26, ...MONO, color: PINK, blur: 0 });
    const m0 = S('why4').t0 + 0.2;
    const MCH = [['Bb', ['D4', 'F4', 'Bb4'], 'Bb2'], ['F7', ['C4', 'Eb4', 'A4'], 'F2']];
    for (let i = 0; i < 8; i++) {
      const tb = m0 + i * BEAT * 0.9, [nm, nt, bs] = MCH[Math.floor(i / 4)];
      gM.active.push({ t0: tb, t1: tb + BEAT * 0.9, i });
      a.perc(i % 2 ? 'snare' : 'kick', tb, i % 2 ? 0.45 : 0.6);
      a.note(i % 2 ? a.T.midi(bs) + 7 : bs, tb, BEAT * 0.5, { vel: 0.3, show: false });
      if (i % 2) a.ch(nm, tb, tb + BEAT * 0.5, { notes: nt, bass: false, vel: 0.45, hideName: true });
    }
    const rus0 = Math.max(m0 + 8 * BEAT * 0.9 + 0.1, a.w('why4b', 'Russian') - 0.3);
    const gRus = { g5: { active: [] }, g6: { active: [] } };
    pair(rus0, { grids: gRus, vel: 0.9 });
    gRus.g5.active.forEach(e => gR.active.push(e));
    gRus.g6.active.forEach(e => gR.active.push({ ...e, i: e.i + 5 }));
    a.big('NOT A MARCH', a.w('why4', 'march'), a.at('why4b'), { y: 1030, size: 64, color: BLUE });
    a.big('A FOLK SONG', a.w('why4b', 'folk'), S('why4').t1, { y: 1030, size: 64, color: PINK });

    // why5: each return is changed: shorter, softer, sadder (B-flat minor)
    a.scale(S('why5').t0, 'Bb');
    const f0 = S('why5').t0 + 0.2;
    pair(f0, { vel: 0.7 });
    a.walker(CALL.map((n, i) => [f0 + i * BEAT, n.replace(/\d/, '')]), { t1: f0 + B5 + 0.3, dr: -40, color: GOLD });
    const tSad = a.w('why5', 'sadder') - 0.05;
    a.tag(0, a.w('why5', 'Shorter'), a.w('why5', 'softer'), 'SHORTER', { x: 540, y: 455, color: GOLD });
    a.tag(0, a.w('why5', 'softer'), tSad, 'SOFTER', { x: 540, y: 455, color: TEAL });
    a.tag(0, tSad, S('why5').t1, 'SADDER', { x: 540, y: 455, color: BLUE });
    a.scale(tSad, 'Bb', a.T.MINOR);
    a.tag('C#', tSad, S('why5').t1, 'Db', { color: BLUE, dr: -75 });
    a.tag('F#', tSad, S('why5').t1, 'Gb', { color: BLUE, dr: -75 });
    const sEnd = pair(Math.max(f0 + PAIR, tSad), { minor: true, vel: 0.5, hold: 2 });
    if (S('why5').t1 - sEnd > 0.3) a.ch('Bbm', sEnd, S('why5').t1 - 0.1, { notes: ['Db4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.35 });

    // essence: once more in B-flat major, landing on a long B-flat chord
    a.scale(S('essence').t0, 'Bb');
    const eEnd = pair(S('essence').t0 + 0.2, { vel: 0.95 });
    a.ch('Bb', eEnd, S('essence').t1 - 0.3, { notes: ['F3', 'Bb3', 'D4', 'F4', 'Bb4'], bass: 'Bb2', vel: 0.85 });
    a.tag(10, eEnd, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
