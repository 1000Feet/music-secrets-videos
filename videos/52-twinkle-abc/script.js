// One tune, three songs: Twinkle Twinkle, the Alphabet Song and Baa Baa Black Sheep share one melody.
const BEAT = 0.34;
// the melody in C (public domain): each line is six quarters and a long note
const L1 = [['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2]];
const L2 = [['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2]];
const LB = [['G4', 1], ['G4', 1], ['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 2]];
// harmony per line: [beat, beats, chord]
const H1 = [[0, 4, 'C'], [4, 2, 'F'], [6, 2, 'C']];
const H2 = [[0, 2, 'F'], [2, 2, 'C'], [4, 2, 'G'], [6, 2, 'C']];
const HB = [[0, 2, 'C'], [2, 2, 'F'], [4, 2, 'C'], [6, 2, 'G']];

module.exports = {
  slug: 'twinkle-abc',
  title: 'One Tune, Three Songs',
  segments: [
    { id: 'hook',    text: 'Three songs from your childhood... secretly sharing one tune.' },
    { id: 'what',    text: 'Same notes. Only the words change.' },
    { id: 'twinkle', text: 'You hear it in Twinkle Twinkle Little Star...' },
    { id: 'abc',     text: 'in the Alphabet Song...' },
    { id: 'baa',     text: 'and in Baa Baa Black Sheep.' },
    { id: 'origin',  text: 'All three come from an 18th century French song: Ah! vous dirai-je, maman.' },
    { id: 'mozart',  text: 'And Mozart wrote twelve variations on it, in the early 1780s.' },
    { id: 'why1',    text: 'So why does it stick? Look at the form: A, B, B, A.' },
    { id: 'why1b',   text: 'The opening phrase returns at the end. Perfect for memory.' },
    { id: 'why2',    text: 'It starts with a leap, a perfect fifth: C up to G.' },
    { id: 'why2b',   text: 'Then it walks down the scale, step by step, all the way home.' },
    { id: 'why2c',   text: 'Tension up, gravity down.' },
    { id: 'why3',    text: 'Every line ends on a long note. A place to breathe...' },
    { id: 'why3b',   text: 'and room to fit different words.' },
    { id: 'var',     text: "Mozart's variations show how one simple tune can be decorated endlessly." },
    { id: 'essence', text: 'A leap up, a staircase down, and a return. So simple that three songs, and Mozart, all used it.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE TUNE', title: 'THREE SONGS', accent: true, tonic: 0, min: 0.4 + 16 * BEAT + 0.5 },
    { id: 'what', segs: ['what'], label: 'SAME NOTES', title: 'NEW WORDS', tonic: 0, tail: 0.4 },
    { id: 'twinkle', segs: ['twinkle'], label: 'YOU HEAR IT IN', title: 'Twinkle Twinkle', sub: 'Little Star · traditional · in C', circle: false, tonic: 0, tail: 1.9 },
    { id: 'abc', segs: ['abc'], label: 'YOU HEAR IT IN', title: 'The Alphabet Song', sub: 'traditional · in C', circle: false, tonic: 0, tail: 2.1 },
    { id: 'baa', segs: ['baa'], label: 'YOU HEAR IT IN', title: 'Baa Baa Black Sheep', sub: 'traditional · in C', circle: false, tonic: 0, tail: 2.0 },
    { id: 'origin', segs: ['origin'], label: 'THE ORIGIN · 1700s', title: 'A FRENCH SONG', sub: 'Ah! vous dirai-je, maman', tonic: 0, tail: 0.6 },
    { id: 'mozart', segs: ['mozart'], label: 'W. A. MOZART · EARLY 1780s', title: '12 VARIATIONS', sub: 'K. 265', circle: false, tonic: 0, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'A · B · B · A', circle: false, tonic: 0, gap: 0.3, tail: 0.9 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'LEAP UP, STEP DOWN', tonic: 0, gap: 0.25, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'ROOM TO BREATHE', circle: false, tonic: 0, gap: 0.25, tail: 1.0 },
    { id: 'var', segs: ['var'], label: 'MOZART', title: 'DECORATED', sub: 'one tune, endlessly', tonic: 0, tail: 0.3 + 8 * BEAT * 1.25 + 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'UP, DOWN, HOME', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#8d98ff', RED = '#ff5d6c';
    const CH = { C: { notes: ['E3', 'G3', 'C4'], bass: 'C2' }, F: { notes: ['F3', 'A3', 'C4'], bass: 'F2' }, G: { notes: ['D3', 'G3', 'B3'], bass: 'G2' } };
    const DIAT = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const shift = (n, k) => { const i = DIAT.indexOf(n[0]) + 7 * +n.slice(-1) + k; return DIAT[((i % 7) + 7) % 7] + Math.floor(i / 7); };
    const bare = n => n.replace(/\d/, '');

    // one line of melody at t (beat seconds b); returns [walker points, end time]
    function line(L, t, o = {}) {
      const b = o.beat ?? BEAT, pts = [];
      L.forEach(([n, d], i) => {
        a.note(n, t, d * b * 0.92, { vel: o.vel ?? 0.4, show: o.show ?? true });
        pts.push([t, bare(n)]);
        if (o.onNote) o.onNote(i, t, d * b);
        t += d * b;
      });
      return [pts, t];
    }
    function harm(H, t, o = {}) {
      const b = o.beat ?? BEAT;
      H.forEach(([s, len, c]) => {
        const strikes = [];
        for (let k = 0; k < len; k++) strikes.push({ o: k * b, v: k ? 0.5 : 0.8 });
        a.ch(c, t + s * b, t + (s + len) * b, { ...CH[c], vel: o.vel ?? 0.5, strikes, shape: o.shape ?? true });
      });
    }
    // several lines in a row with harmony; returns end time
    function lines(list, t, o = {}) {
      const pts = [];
      list.forEach(([L, H]) => { harm(H, t, o); const [p, e] = line(L, t, o); pts.push(...p); t = e; });
      if (o.walker !== false) a.walker(pts, { t1: o.t1 ?? t + 0.5, dr: -40, color: GOLD, label: o.label, labelDr: -46 });
      return t;
    }

    // hook: lines one and two
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const hEnd = lines([[L1, H1], [L2, H2]], 0.4, { vel: 0.38, label: 'MELODY', t1: S('hook').t1 });
    a.ch('C', hEnd, S('hook').t1, { ...CH.C, vel: 0.4 });

    // what: the B line, softly
    const wEnd = lines([[LB, HB]], S('what').t0 + 0.1, { vel: 0.3, t1: S('what').t1 });
    a.ch('C', wEnd, S('what').t1, { ...CH.C, vel: 0.35 });

    // three songs: same syllable grid, same notes, new words
    function song(id, words) {
      const t0 = S(id).t0 + 0.1, t1 = S(id).t1;
      const cells = words.map((w, i) => ({ label: w, sub: bare(L1[i][0]), size: w.length > 4 ? 34 : 44, subSize: 24, color: i === 6 ? GOLD : i >= 2 && i < 4 ? TEAL : i >= 4 ? BLUE : PINK }));
      const g = a.grid(cells, t0, t1, { rows: 1, cols: 7, cw: 142, chh: 200, y: 600, revealStep: 0.06, caption: 'SAME NOTES · NEW WORDS' });
      const m0 = t1 - 0.4 - 8 * BEAT;
      harm(H1, m0, { vel: 0.45, shape: false });
      line(L1, m0, { onNote: (i, t, d) => { if (i < words.length) g.active.push({ t0: t, t1: t + d, i }); } });
      a.ch('C', t0, m0, { ...CH.C, vel: 0.3, shape: false });
    }
    song('twinkle', ['TWIN', 'KLE', 'TWIN', 'KLE', 'LIT', 'TLE', 'STAR']);
    song('abc', ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    song('baa', ['BAA', 'BAA', 'BLACK', 'SHEEP', 'HAVE', 'YOU…', 'WOOL']);

    // origin: the French song, line one
    const o0 = S('origin').t0 + 0.1;
    const oEnd = lines([[L1, H1], [L2, H2]], o0, { vel: 0.3, beat: (S('origin').t1 - o0 - 0.3) / 16, t1: S('origin').t1 });
    a.ch('C', oEnd, S('origin').t1, { ...CH.C, vel: 0.3 });
    a.tag(0, a.w('origin', '18th'), S('origin').t1, '18TH CENTURY · FRANCE', { x: 540, y: 462, color: GOLD });

    // mozart: twelve numbered cells, the decorated line underneath
    const z0 = S('mozart').t0 + 0.1;
    a.grid(Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), size: 54, color: i % 2 ? TEAL : GOLD })), z0, S('mozart').t1,
      { rows: 3, cols: 4, cw: 200, chh: 150, y: 520, revealStep: 0.12 });
    a.big('THEME', z0 + 0.1, a.w('mozart', 'twelve'), { y: 1040, size: 44, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 });
    a.big('+ 12 VARIATIONS', a.w('mozart', 'twelve'), S('mozart').t1, { y: 1040, size: 44, family: 'DM Mono', weight: 500, color: GOLD });

    // decorated version (original running notes): each quarter becomes four sixteenths around the note
    function deco(L, t, b, o = {}) {
      const pts = [];
      L.forEach(([n, d]) => {
        const fig = d === 1 ? [n, shift(n, -1), n, shift(n, 1)] : [n, shift(n, 1), shift(n, 2), shift(n, 1), n];
        const lens = d === 1 ? [1, 1, 1, 1] : [1, 1, 1, 1, 4];
        let u = 0;
        fig.forEach((m, k) => { a.note(m, t + u * b / 4, lens[k] * b / 4 * 0.9, { vel: o.vel ?? 0.34, show: o.show ?? true }); pts.push([t + u * b / 4, bare(m)]); u += lens[k]; });
        t += d * b;
      });
      return [pts, t];
    }
    { const db = (S('mozart').t1 - z0 - 0.4) / 8; harm(H1, z0, { beat: db, vel: 0.35, shape: false }); deco(L1, z0, db, { vel: 0.26, show: false }); }

    // why1: A B B A
    const FORM = [{ label: 'A', sub: 'OPENING', color: GOLD, size: 90 }, { label: 'B', sub: '', color: TEAL, size: 90 }, { label: 'B', sub: 'AGAIN', color: TEAL, size: 90 }, { label: 'A', sub: 'RETURN', color: GOLD, size: 90 }];
    const gf = a.grid(FORM, S('why1').t0 + 0.1, S('why1').t1, { rows: 1, cols: 4, cw: 230, chh: 260, y: 600, revealStep: 0.1 });
    const fw = [a.w('why1', 'A', 0), a.w('why1', 'B', 0), a.w('why1', 'B', 1), a.w('why1', 'A', 1)].map(t => t - 0.04);
    const FL = [[L1, H1], [LB, HB], [LB, HB], [L1, H1]];
    fw.forEach((t, i) => {
      gf.active.push({ t0: t, t1: i < 3 ? fw[i + 1] : a.at('why1b'), i });
      a.note(FL[i][0][0][0], t, 0.4, { vel: 0.34, show: false }); a.note(FL[i][0][1][0], t + 0.3, 0.4, { vel: 0.3, show: false });
    });
    a.ch('C', S('why1').t0 + 0.1, fw[0], { ...CH.C, vel: 0.35, shape: false });
    const tRet = a.w('why1b', 'returns') - 0.04, tMem = a.w('why1b', 'memory');
    gf.active.push({ t0: tRet, t1: S('why1').t1, i: 0 }, { t0: tRet, t1: S('why1').t1, i: 3 });
    a.big('THE OPENING RETURNS', tRet, tMem, { y: 980, size: 46, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('EASY TO REMEMBER', tMem, S('why1').t1, { y: 980, size: 46, family: 'DM Mono', weight: 500, color: GOLD });
    const r0 = tRet;
    harm(H1, r0, { vel: 0.35, shape: false }); line(L1, r0, { vel: 0.26, show: false });

    // why2: the leap C-G, then the walk down G F E D C
    const tC = a.w('why2', 'C') - 0.04, tG = a.w('why2', 'G') - 0.04;
    a.ch('C', S('why2').t0 + 0.1, tC, { ...CH.C, vel: 0.35 });
    a.note('C4', tC, 0.6, { vel: 0.4 }); a.note('G4', tG, 1.0, { vel: 0.42 });
    a.ch('C', tC, a.at('why2b'), { notes: ['C4', 'G4'], bass: 'C3', vel: 0.35, label: 'C + G', strikes: [{ o: 0, v: 0.5 }] });
    a.line('C', 'G', tG, a.at('why2b'), { color: GOLD, label: 'PERFECT 5TH', ly: 78 });
    a.big('TENSION UP', tG, a.at('why2b'), { y: 462, size: 44, family: 'DM Mono', weight: 500, color: RED });
    const DOWN = ['G4', 'F4', 'E4', 'D4', 'C4'];
    const d0 = a.w('why2b', 'walks') - 0.04, dl = (a.end('why2b') - d0) / 5;
    const DH = ['C', 'F', 'C', 'G', 'C'];
    DOWN.forEach((n, i) => { a.note(n, d0 + i * dl, dl * 0.95, { vel: 0.4 }); a.ch(DH[i], d0 + i * dl, i < 4 ? d0 + (i + 1) * dl : S('why2').t1, { ...CH[DH[i]], vel: 0.45 }); });
    a.walker([[tG, 'G'], ...DOWN.map((n, i) => [d0 + i * dl, bare(n)])], { t1: S('why2').t1, dr: -40, color: GOLD });
    a.tag('C', d0 + 4 * dl, S('why2').t1, 'HOME', { dr: -92, color: GOLD });
    a.big('GRAVITY DOWN', a.w('why2c', 'gravity'), S('why2').t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('TENSION UP', a.at('why2c'), a.w('why2c', 'gravity'), { y: 462, size: 44, family: 'DM Mono', weight: 500, color: RED });

    // why3: one line, the long note at the end
    const g3cells = L1.map(([n, d], i) => ({ label: bare(n), sub: d > 1 ? 'LONG' : '', size: 54, color: d > 1 ? GOLD : '#8d98ff' }));
    const g3 = a.grid(g3cells, S('why3').t0 + 0.1, S('why3').t1, { rows: 1, cols: 7, cw: 142, chh: 200, y: 600, revealStep: 0.05, caption: 'ONE LINE · ENDING ON A LONG NOTE' });
    const tLong = a.w('why3', 'long') - 0.04;
    const n0 = tLong - 6 * BEAT;
    harm(H1, n0, { vel: 0.4, shape: false });
    line(L1, n0, { vel: 0.38, show: false, onNote: (i, t, d) => g3.active.push({ t0: t, t1: i === 6 ? a.at('why3b') : t + d, i }) });
    a.ch('C', S('why3').t0 + 0.1, n0, { ...CH.C, vel: 0.3, shape: false });
    a.big('BREATHE', a.w('why3', 'breathe'), a.at('why3b'), { y: 980, size: 56, color: GOLD });
    const tDiff = a.w('why3b', 'different') - 0.04;
    ['STAR', 'G', 'WOOL'].forEach((w, i) => a.big(w, tDiff + i * 0.4, S('why3').t1, { x: 270 + i * 270, y: 980, size: 60, color: [PINK, TEAL, BLUE][i] }));
    g3.active.push({ t0: tDiff, t1: S('why3').t1, i: 6 });
    a.note('G4', tDiff, 1.4, { vel: 0.3, show: false });
    a.ch('C', a.at('why3b'), S('why3').t1, { ...CH.C, vel: 0.3, shape: false });

    // var: the decorated version (original), line one
    a.scale(S('var').t0, 'C');
    const v0 = a.end('var') + 0.3, vb = BEAT * 1.25;
    a.ch('C', S('var').t0 + 0.1, v0, { ...CH.C, vel: 0.35 });
    harm(H1, v0, { beat: vb, vel: 0.45 });
    const [vp] = deco(L1, v0, vb, { vel: 0.34 });
    a.walker(vp, { t1: S('var').t1, dr: -40, color: GOLD, label: 'RUNNING NOTES', labelDr: -46 });
    a.ch('C', v0 + 8 * vb, S('var').t1, { ...CH.C, vel: 0.4 });

    // essence: the last A, lines one and two, home on C
    const e0 = S('essence').t0 + 0.15;
    const eEnd = lines([[L1, H1], [L2, H2]], e0, { vel: 0.34, beat: Math.min(BEAT, (a.at('cta') - e0) / 16), t1: S('essence').t1 });
    a.ch('C', eEnd, S('essence').t1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.75 });
    a.tag('C', eEnd, S('essence').t1, 'HOME', { dr: -92, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
