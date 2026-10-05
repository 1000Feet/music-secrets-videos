// Chopin's Nocturne in E flat, decoded: a rocking 12/8 left hand, a singing right hand, ornaments and rubato.
// Per the brief, Chopin's melody is NOT reconstructed: only the accompaniment pattern (low bass note,
// then two rocking chords, on Eb - Bb7 - Eb) and an ORIGINAL short singing line written for this video.
const E8 = 0.27; // one eighth note
const BAR = 12 * E8;
// our own line, in eighths (bar 1 over Eb, bar 2 over Bb7, bar 3 over Eb)
const LINE = [['G4', 3], ['Bb4', 3], ['Eb5', 4], ['D5', 1], ['C5', 1],
  ['Bb4', 3], ['Ab4', 2], ['F4', 1], ['D5', 3], ['C5', 2], ['Ab4', 1],
  ['G4', 6], ['Eb4', 6]];
// the same line, decorated: a turn, a trill, a fast run, another turn
const TRILL = Array.from({ length: 12 }, (_, i) => [i % 2 ? 'F5' : 'Eb5', 0.25]);
const RUN = ['F4', 'G4', 'Ab4', 'Bb4', 'C5', 'D5', 'Eb5', 'F5'].map(n => [n, 0.25]);
const DECO = [['G4', 3], ['Bb4', 1.5], ['C5', 0.375], ['Bb4', 0.375], ['A4', 0.375], ['Bb4', 0.375], ...TRILL, ['Eb5', 1], ['D5', 1], ['C5', 1],
  ['Bb4', 3], ['Ab4', 2], ['F4', 1], ...RUN, ['D5', 1], ['C5', 2], ['Ab4', 1],
  ['G4', 4], ['Ab4', 0.5], ['G4', 0.5], ['F4', 0.5], ['G4', 0.5], ['Eb4', 6]];

module.exports = {
  slug: 'chopin-nocturne',
  title: "Chopin's Nocturne in E-flat",
  segments: [
    { id: 'hook',    text: 'A piano that sings like an opera voice... over a gentle, rocking pulse.' },
    { id: 'what',    text: "This is the world of Chopin's Nocturne in E flat, Opus 9 number 2, published in 1832." },
    { id: 'genre',   text: 'The piano nocturne, a night piece, was created by the Irish composer John Field. Chopin made it famous.' },
    { id: 'play',    text: 'Here is the kind of sound it lives in.' },
    { id: 'why1',    text: 'So why does it feel like breathing? First, the left hand rocks gently.' },
    { id: 'why1b',   text: 'A deep bass note, then two chords above, in a slow twelve eight lilt.' },
    { id: 'why2',    text: 'The right hand sings. Chopin loved Italian bel canto opera, and wrote piano melodies like a voice.' },
    { id: 'why3',    text: 'Each time the melody returns, it comes back more decorated...' },
    { id: 'why3b',   text: 'trills, turns, fast little runs, the way an opera singer ornaments a repeated phrase.' },
    { id: 'why4',    text: "And then there's rubato: stolen time." },
    { id: 'why4b',   text: 'The melody leans back or pushes ahead, while the accompaniment keeps a steadier pulse.' },
    { id: 'essence', text: 'A steady rocking below, a voice that breathes above... and time itself becomes expressive.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'FRÉDÉRIC CHOPIN', title: 'NOCTURNE IN E FLAT', accent: true, tonic: 3, min: 6.0 },
    { id: 'what', segs: ['what'], label: 'OP. 9 NO. 2 · 1832', title: 'NOCTURNE', sub: 'Frédéric Chopin · in Eb major · 12/8', tonic: 3, row: ['Eb', 'Bb7', 'Eb'], tail: 0.6 },
    { id: 'genre', segs: ['genre'], label: 'THE NOCTURNE', title: 'A NIGHT PIECE', circle: false, tonic: 3, tail: 0.6 },
    { id: 'play', segs: ['play'], label: 'THE SOUND', title: 'A SINGING LINE', sub: 'an original line in this style', tonic: 3, row: ['Eb', 'Bb7', 'Eb'], tail: 0.2 + 3 * BAR + 1.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE ROCKING LEFT HAND', circle: false, tonic: 3, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'BEL CANTO', title: 'A SINGING VOICE', tonic: 3, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MORE DECORATED', tonic: 3, gap: 0.3, tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'STOLEN TIME', title: 'RUBATO', circle: false, tonic: 3, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TIME THAT BREATHES', accent: true, tonic: 3, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', LILAC = '#b48cff', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff';
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, ...o });
    const pcOf = n => n.replace(/-?\d/, '');
    const V = {
      Eb: { bass: 'Eb2', up: ['G3', 'Bb3', 'Eb4'] },
      Bb7: { bass: 'Bb2', up: ['Ab3', 'D4', 'F4'] },
    };
    // the left hand: per dotted-quarter beat, a deep bass note then two soft chords
    function rock(c, t0, beats, o = {}) {
      const v = V[c], vel = o.vel ?? 1, e = o.e ?? E8;
      a.ch(c, t0, t0 + beats * 3 * e, { notes: v.up, bass: v.bass, mute: true, row: o.row ?? null, hideName: o.hideName });
      for (let b = 0; b < beats; b++) {
        const t = t0 + b * 3 * e;
        a.note(v.bass, t, 3 * e * 0.98, { vel: 0.3 * vel, show: false });
        [1, 2].forEach(k => v.up.forEach((n, j) => a.note(n, t + k * e + j * 0.008, e * 0.95, { vel: 0.11 * vel, show: false })));
      }
      return t0 + beats * 3 * e;
    }
    // Eb - Bb7 - Eb, one bar (4 beats) each
    const rock3 = (t0, o = {}) => ['Eb', 'Bb7', 'Eb'].reduce((t, c, i) => rock(c, t, 4, { ...o, row: o.rows ? i : null }), t0);
    // the singing line; `warp` maps an eighth position to a (rubato) position
    function sing(list, t0, o = {}) {
      const v = o.vel ?? 0.36, warp = o.warp || (x => x), e = o.e ?? E8, pts = [];
      let x = 0;
      for (const [n, d] of list) {
        const ta = t0 + warp(x) * e, tb = t0 + warp(x + d) * e;
        a.note(n, ta, Math.max(0.06, (tb - ta) * 0.97), { vel: d < 1 ? v * 0.75 : v, show: o.show ?? d >= 1 });
        if (d >= 1 || o.allPts) pts.push([ta, pcOf(n)]);
        x += d;
      }
      return pts;
    }
    const voice = (pts, t1, o = {}) => a.walker(pts, { t1, dr: -40, color: o.color || GOLD, label: o.label, labelDr: -52 });
    // rubato: lean back mid-bar, catch up by the bar line
    const RUB = x => x + 0.9 * Math.sin((2 * Math.PI * x) / 12);

    // hook: Eb major, the rocking starts, the line sings on top
    a.scale(0.1, 'Eb', a.T.MAJOR);
    const h0 = 0.25;
    rock('Eb', h0, 4, { vel: 0.9 }); rock('Bb7', h0 + BAR, Math.ceil((S('hook').t1 - h0 - BAR) / (3 * E8)), { vel: 0.9 });
    voice(sing(LINE.slice(0, 8), h0, { vel: 0.32 }), S('hook').t1);
    a.ring(['Eb'], h0, 1.6, { color: GOLD });

    // what: Eb - Bb7 - Eb under the title
    const w0 = S('what').t0 + 0.1, we = (S('what').t1 - w0) / 36;
    rock3(w0, { rows: true, e: we, vel: 0.85 });
    a.tag('Eb', Math.max(a.w('what', 'E'), w0 + 24 * we), S('what').t1, 'HOME KEY', { dr: -92, color: GOLD });

    // genre: John Field created it, Chopin made it famous
    const g = a.grid([{ label: 'JOHN FIELD', sub: 'CREATED IT', size: 52, color: LILAC }, { label: 'CHOPIN', sub: 'MADE IT FAMOUS', size: 52, color: GOLD }],
      S('genre').t0 + 0.1, S('genre').t1, { rows: 1, cols: 2, cw: 450, chh: 240, y: 600, revealStep: 0.25 });
    g.active.push({ t0: a.w('genre', 'John') - 0.05, t1: a.w('genre', 'Chopin') - 0.05, i: 0 }, { t0: a.w('genre', 'Chopin') - 0.05, t1: S('genre').t1, i: 1 });
    a.big('NIGHT PIECE', a.w('genre', 'night'), S('genre').t1, { y: 960, size: 72, color: BLUE });
    const ge = (S('genre').t1 - S('genre').t0 - 0.2) / 36;
    rock3(S('genre').t0 + 0.1, { e: ge, vel: 0.6, hideName: true });

    // play: three bars, the original line over Eb - Bb7 - Eb, then home
    const p0 = a.end('play') + 0.2;
    a.ch('Eb', S('play').t0 + 0.05, p0, { notes: V.Eb.up, bass: 'Eb2', vel: 0.3 });
    const pEnd = rock3(p0, { rows: true });
    voice(sing(LINE, p0), S('play').t1);
    a.ch('Eb', pEnd, S('play').t1, { notes: ['G3', 'Bb3', 'Eb4'], bass: 'Eb2', vel: 0.4, row: 2 });

    // why1: 12/8 - four groups of three: bass, chord, chord
    const C3 = [PINK, TEAL, TEAL];
    const g1 = a.grid(Array.from({ length: 12 }, (_, i) => ({ label: i % 3 ? 'C' : 'B', size: 42, color: C3[i % 3] })), S('why1').t0 + 0.1, S('why1').t1,
      { rows: 1, cols: 12, cw: 78, chh: 170, y: 640, revealStep: 0.05, caption: 'B = DEEP BASS NOTE · C = CHORD' });
    a.big('12 / 8', a.w('why1b', 'twelve'), S('why1').t1, { y: 520, size: 90, family: 'DM Mono', weight: 500, color: WHITE });
    a.big('ROCKING', a.w('why1', 'rocks'), a.w('why1b', 'twelve'), { y: 520, size: 72, color: TEAL });
    const r0 = a.w('why1', 'left') - 0.1;
    let rt = r0;
    while (rt < S('why1').t1 - 0.3) {
      const c = Math.floor((rt - r0) / BAR) % 2 ? 'Bb7' : 'Eb';
      const end = rock(c, rt, 4, { vel: 0.9 });
      for (let i = 0; i < 12; i++) if (rt + i * E8 < S('why1').t1) g1.active.push({ t0: rt + i * E8, t1: rt + (i + 1) * E8, i });
      rt = end;
    }
    a.big('BASS · CHORD · CHORD', a.w('why1b', 'bass'), a.w('why1b', 'twelve'), { y: 940, size: 46, family: 'DM Mono', weight: 500, color: PINK, blur: 0 });
    a.big('A SLOW LILT', a.w('why1b', 'lilt'), S('why1').t1, { y: 940, size: 56, color: TEAL });

    // why2: the right hand sings, like a voice
    const s0 = S('why2').t0 + 0.1;
    const sEnd = rock3(s0, { vel: 0.7, e: (S('why2').t1 - s0) / 36 });
    voice(sing(LINE, s0, { e: (S('why2').t1 - s0) / 36, vel: 0.38 }), S('why2').t1);
    big('LIKE A VOICE', a.w('why2', 'voice') - 0.3, S('why2').t1, { color: GOLD });
    big('BEL CANTO', a.w('why2', 'bel'), a.w('why2', 'voice') - 0.3, { color: LILAC });

    // why3: plain, then decorated
    const d0 = S('why3').t0 + 0.1, dMid = a.at('why3b') - 0.15;
    const de = (dMid - d0) / 36;
    rock3(d0, { e: de, vel: 0.65 });
    voice(sing(LINE, d0, { e: de, vel: 0.34 }), dMid, { color: TEAL });
    big('PLAIN', d0, dMid, { color: TEAL });
    const de2 = (S('why3').t1 - dMid - 0.3) / 36;
    rock3(dMid, { e: de2, vel: 0.7 });
    voice(sing(DECO, dMid, { e: de2, vel: 0.36 }), S('why3').t1);
    // label each ornament as it happens
    const at = x => dMid + x * de2;
    big('TURN', at(4.5), at(6), { color: LILAC });
    big('TRILL', at(6), at(12), { color: PINK });
    big('RUN', at(18), at(21), { color: BLUE });
    big('TURN', at(28), at(30), { color: LILAC });
    a.ring(['Eb', 'F'], at(6), at(9), { color: PINK });
    [[0, 4.5], [12, 18], [21, 28], [30, 40]].forEach(([x0, x1]) => big('DECORATED', at(x0), Math.min(at(x1), S('why3').t1), { color: GOLD }));

    // why4: rubato - melody (top) leans and pushes, accompaniment (bottom) stays steady
    const cells = [...Array.from({ length: 12 }, () => ({ label: '', color: GOLD })), ...Array.from({ length: 12 }, (_, i) => ({ label: '', color: i % 3 ? TEAL : PINK }))];
    const g4 = a.grid(cells, S('why4').t0 + 0.1, S('why4').t1, { rows: 2, cols: 12, cw: 78, chh: 110, y: 600, caption: 'TOP: MELODY · BOTTOM: ACCOMPANIMENT' });
    a.big('STOLEN TIME', a.w('why4', 'stolen'), S('why4').t1, { y: 500, size: 60, color: GOLD });
    const q0 = a.w('why4', 'rubato') - 0.1;
    let qt = q0, bar = 0;
    while (qt < S('why4').t1 - 0.4) {
      const c = bar % 2 ? 'Bb7' : 'Eb';
      rock(c, qt, 4, { vel: 0.8, hideName: true });
      for (let i = 0; i < 12; i++) if (qt + i * E8 < S('why4').t1) g4.active.push({ t0: qt + i * E8, t1: qt + (i + 1) * E8, i: 12 + i });
      // the line for this bar, with rubato
      const seg = bar % 2 ? LINE.slice(5, 11) : LINE.slice(0, 5);
      let x = 0;
      for (const [n, d] of seg) {
        const ta = qt + RUB(x) * E8, tb = qt + RUB(x + d) * E8;
        if (ta < S('why4').t1 - 0.1) { a.note(n, ta, (tb - ta) * 0.97, { vel: 0.36, show: false }); g4.active.push({ t0: ta, t1: tb, i: Math.round(x) % 12 }); }
        x += d;
      }
      qt += BAR; bar++;
    }
    a.big('LEANS BACK · PUSHES AHEAD', a.w('why4b', 'leans'), a.w('why4b', 'while'), { y: 960, size: 46, family: 'DM Mono', weight: 500, color: GOLD, blur: 0 });
    a.big('STEADIER PULSE', a.w('why4b', 'steadier'), S('why4').t1, { y: 960, size: 56, color: TEAL });

    // essence: the decorated line with rubato over the steady rocking, home on Eb
    a.scale(S('essence').t0, 'Eb', a.T.MAJOR);
    const e0 = S('essence').t0 + 0.1, ee = Math.min(E8, (a.at('cta') - e0 + 0.4) / 36);
    const eEnd = rock3(e0, { e: ee, vel: 0.85 });
    const RUB3 = x => x + 0.8 * Math.sin((2 * Math.PI * x) / 12);
    voice(sing(DECO, e0, { e: ee, vel: 0.36, warp: RUB3 }), eEnd);
    a.ch('Eb', eEnd, S('essence').t1 - 0.2, { notes: ['G3', 'Bb3', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.5 });
    a.note('Eb5', eEnd, 2.4, { vel: 0.3 });
    a.tag('Eb', eEnd + 0.1, S('essence').t1, 'HOME', { dr: -92, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
