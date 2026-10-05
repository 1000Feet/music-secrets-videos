// The Hallelujah Chorus, decoded: D major for trumpets, and two textures - all together, then one after another.
const BEAT = 0.42;
// SATB block voicings (bass, tenor, alto, soprano) + a low doubling
const SATB = { D: ['D3', 'A3', 'F#4', 'D5'], G: ['G2', 'B3', 'G4', 'D5'], A: ['A2', 'A3', 'E4', 'C#5'] };
const LOW = { D: 'D2', G: 'G2', A: 'A2' };
// one shouted word: four strong short chords in 2.5 beats (generic rhythm, not Handel's)
const WORD = [[0, 0.5], [0.5, 0.5], [1, 0.5], [1.5, 1]];
const DMAJ = ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'];
// an original imitative motif in scale degrees: [degree, beats]
const MOTIF = [[0, 1], [4, 0.5], [5, 0.5], [4, 0.5], [3, 0.5], [2, 1]];

module.exports = {
  slug: 'hallelujah-chorus',
  title: 'The Hallelujah Chorus',
  segments: [
    { id: 'hook',    text: 'One word, sung again and again... and a whole audience rises to its feet.' },
    { id: 'what',    text: "This is the Hallelujah Chorus, from Handel's Messiah, first performed in Dublin in 1742." },
    { id: 'fast',    text: 'Handel composed the whole Messiah in about three and a half weeks, in 1741.' },
    { id: 'stand',   text: 'Audiences traditionally stand during this chorus.' },
    { id: 'legend1', text: 'A famous story says King George the Second stood up at a London performance.' },
    { id: 'legend2', text: "But there's no reliable evidence for it. It's a legend." },
    { id: 'why1',    text: 'So why is it so thrilling? First, the key: D major.' },
    { id: 'why1b',   text: 'Bright and ringing, perfect for trumpets and timpani, which join for the big moments.' },
    { id: 'why2',    text: 'Then, Handel switches between two textures.' },
    { id: 'homo',    text: "Everyone sings the same rhythm, in big block chords. That's homophony." },
    { id: 'poly',    text: "Then the voices enter one after another, in overlapping lines. That's polyphony." },
    { id: 'why4',    text: 'Together, then apart, then together again. The contrast is what makes it thrilling.' },
    { id: 'essence', text: 'Alternate one voice with many voices, add trumpets... and a chorus becomes a celebration.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'HANDEL · MESSIAH', title: 'HALLELUJAH!', accent: true, tonic: 2, min: 0.3 + 3 * 4 * BEAT + 0.6 },
    { id: 'what', segs: ['what'], label: 'FROM MESSIAH', title: 'HALLELUJAH CHORUS', sub: 'G. F. Handel · Dublin · 1742 · in D', tonic: 2, tail: 0.6 },
    { id: 'fast', segs: ['fast'], label: 'COMPOSED IN 1741', title: 'THE WHOLE MESSIAH', circle: false, tonic: 2, tail: 0.7 },
    { id: 'stand', segs: ['stand', 'legend1', 'legend2'], label: 'THE TRADITION', title: 'EVERYONE STANDS', circle: false, tonic: 2, gap: 0.35, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'D MAJOR', tonic: 2, gap: 0.3, tail: 1.3 },
    { id: 'tex', segs: ['why2'], label: 'WHY IT WORKS', title: 'TWO TEXTURES', circle: false, tonic: 2, tail: 0.4 },
    { id: 'homo', segs: ['homo'], label: 'ALL TOGETHER', title: 'HOMOPHONY', circle: false, tonic: 2, tail: 0.3 + 2 * 4 * BEAT + 0.3 },
    { id: 'poly', segs: ['poly'], label: 'ONE AFTER ANOTHER', title: 'POLYPHONY', circle: false, tonic: 2, tail: 0.3 + 10 * BEAT + 0.4 },
    { id: 'why4', segs: ['why4'], label: 'THE THRILL', title: 'THE CONTRAST', circle: false, tonic: 2, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A CELEBRATION', accent: true, tonic: 2, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#8d98ff', RED = '#ff5d6c';
    const T = a.T;
    const degN = (k, base) => { // base is a note in D major; step k scale degrees
      const pcs = [2, 4, 6, 7, 9, 11, 13];
      const m = T.midi(base), bi = pcs.indexOf(((m - 2) % 12 + 12) % 12 + 2);
      const i = bi + k, o = Math.floor(i / 7), r = ((i % 7) + 7) % 7;
      return m - pcs[bi] + pcs[r] + 12 * o;
    };

    // one block "word" at t: four strong short chords (+ timpani), lighting all voice rows
    function word(c, t, o = {}) {
      const b = o.beat ?? BEAT;
      WORD.forEach(([u, d], k) => {
        const t0 = t + u * b, t1 = k === 3 && o.sustain ? t + 4 * b : t0 + d * b * (k === 3 ? 1.6 : 0.8);
        a.ch(c, t0, t1, { notes: SATB[c], bass: LOW[c], vel: (o.vel ?? 0.8) * (k === 0 || k === 3 ? 1 : 0.8), hideName: o.hideName, shape: o.shape ?? true, row: o.row ?? null });
        if (o.timp !== false) a.perc('kick', t0, (k === 0 || k === 3 ? 0.7 : 0.45) * (o.vel ?? 0.8));
        if (o.grid) [0, 1, 2, 3].forEach(i => o.grid.active.push({ t0, t1, i }));
      });
      return t + 4 * b;
    }
    const words = (list, t, o = {}) => { list.forEach(c => { t = word(c, t, o); }); return t; };

    // imitative entries from t; voices: bass, tenor, alto, soprano (grid rows 3..0)
    function imitation(t, o = {}) {
      const b = o.beat ?? BEAT, v = o.vel ?? 0.36;
      const starts = ['D3', 'A3', 'D4', 'A4'], holds = ['A2', 'C#4', 'E4', null];
      starts.forEach((s, vi) => {
        let u = vi * 2;
        MOTIF.forEach(([k, d]) => {
          const tn = t + u * b;
          a.note(degN(k, s), tn, d * b * 0.92, { vel: v, show: o.show ?? false });
          if (o.grid) o.grid.active.push({ t0: tn, t1: tn + d * b * 0.92, i: 3 - vi });
          u += d;
        });
        if (holds[vi]) {
          const tn = t + u * b, len = (10 - u) * b;
          a.note(holds[vi], tn, len * 0.95, { vel: v * 0.8, show: false });
          if (o.grid) o.grid.active.push({ t0: tn, t1: tn + len * 0.95, i: 3 - vi });
        }
      });
      return t + 10 * b;
    }
    const VOICES = [['SOPRANO', PINK], ['ALTO', GOLD], ['TENOR', TEAL], ['BASS', BLUE]];
    const voiceGrid = (t0, t1, sub) => a.grid(VOICES.map(([l, c]) => ({ label: l, size: 40, color: c, sub })), t0, t1, { rows: 4, cols: 1, cw: 760, chh: 128, y: 470, revealStep: 0.06 });

    // hook: three shouted words with timpani
    a.scale(0.2, 'D', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const hEnd = words(['D', 'A', 'D'], 0.3, { vel: 0.85 });
    a.ch('D', hEnd, S('hook').t1, { notes: SATB.D, bass: LOW.D, vel: 0.45 });

    // what: softer words, key of D
    const wl = (S('what').t1 - S('what').t0 - 0.2) / 4;
    const wEnd = words(['D', 'G', 'D', 'A'], S('what').t0 + 0.1, { vel: 0.5, beat: wl / 4, timp: false, sustain: true });
    a.ch('D', wEnd, S('what').t1, { notes: SATB.D, bass: LOW.D, vel: 0.4 });
    a.tag('D', a.w('what', 'Dublin'), S('what').t1, 'DUBLIN · 1742', { x: 540, y: 462, color: GOLD });

    // fast: about three and a half weeks
    const WK = [{ label: 'WEEK 1', size: 40, color: TEAL }, { label: 'WEEK 2', size: 40, color: TEAL }, { label: 'WEEK 3', size: 40, color: TEAL }, { label: '+ HALF', size: 40, color: GOLD }];
    const tWk = a.w('fast', 'three') - 0.1;
    const gk = a.grid(WK, tWk, S('fast').t1, { rows: 1, cols: 4, cw: 230, chh: 200, y: 640, revealStep: 0.22 });
    [0, 1, 2, 3].forEach(i => gk.active.push({ t0: tWk + i * 0.22, t1: S('fast').t1, i }));
    a.big('THE WHOLE ORATORIO', a.w('fast', 'whole'), S('fast').t1, { y: 560, size: 40, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('ABOUT 3.5 WEEKS', tWk + 0.9, S('fast').t1, { y: 940, size: 60, color: GOLD });
    const fl = (S('fast').t1 - S('fast').t0 - 0.2) / 3;
    words(['D', 'G', 'A'], S('fast').t0 + 0.1, { vel: 0.4, beat: fl / 4, timp: false, shape: false });

    // stand: the tradition, and the legend
    a.big('AUDIENCES', a.at('stand') + 0.1, a.at('legend1'), { y: 600, size: 72, color: '#ffffff' });
    a.big('STAND', a.w('stand', 'stand'), a.at('legend1'), { y: 700, size: 90, color: GOLD });
    a.big('A TRADITION', a.w('stand', 'traditionally'), a.at('legend1'), { y: 840, size: 46, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('KING GEORGE II', a.w('legend1', 'King'), S('stand').t1, { y: 600, size: 72, color: '#ffffff' });
    a.big('LONDON', a.w('legend1', 'London'), S('stand').t1, { y: 690, size: 40, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('NO RELIABLE EVIDENCE', a.w('legend2', 'reliable'), S('stand').t1, { y: 840, size: 46, family: 'DM Mono', weight: 500, color: RED });
    a.big('A LEGEND', a.w('legend2', 'legend'), S('stand').t1, { y: 960, size: 90, color: RED });
    { const n = Math.floor((S('stand').t1 - S('stand').t0 - 0.2) / (8 * BEAT)); const prog = ['D', 'G', 'D', 'A', 'D', 'G', 'A', 'D'];
      words(prog.slice(0, Math.max(1, n)), S('stand').t0 + 0.1, { vel: 0.35, beat: 2 * BEAT, timp: false, shape: false }); }

    // why1: D major, bright; timpani with the big chords
    a.scale(S('why1').t0, 'D');
    const tD = a.w('why1', 'D') - 0.04, tTr = a.w('why1b', 'trumpets') - 0.04, tBig = a.w('why1b', 'big') - 0.04;
    a.ch('D', S('why1').t0 + 0.1, tTr, { notes: SATB.D, bass: LOW.D, vel: 0.45 });
    a.ring(['D'], tD, S('why1').t1, { color: GOLD });
    a.tag('D', tD, S('why1').t1, 'HOME KEY', { color: GOLD, dr: -92 });
    a.big('BRIGHT · RINGING', a.at('why1b'), tTr, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('TRUMPETS · TIMPANI', tTr, S('why1').t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: RED });
    // trumpet-like fanfare on D major chord tones (original), then a big word
    [['D4', 0], ['F#4', 0.2], ['A4', 0.4], ['D5', 0.6]].forEach(([n, u]) => a.note(n, tTr + u, 0.5, { vel: 0.34 }));
    a.ch('D', tTr, tBig, { notes: ['D4', 'F#4', 'A4', 'D5'], bass: 'D2', vel: 0.5, strikes: [{ o: 0, v: 1 }] });
    words(['A', 'D'], tBig, { vel: 0.8, beat: Math.min(BEAT, (S('why1').t1 - tBig - 0.2) / 8) });

    // tex: two textures
    const TX = [{ label: 'ALL', sub: 'TOGETHER', size: 72, color: GOLD }, { label: 'ONE', sub: 'BY ONE', size: 72, color: TEAL }];
    const gt = a.grid(TX, S('tex').t0 + 0.1, S('tex').t1, { rows: 1, cols: 2, cw: 400, chh: 300, y: 600, revealStep: 0.25 });
    const tTw = a.w('why2', 'two') - 0.04;
    gt.active.push({ t0: tTw, t1: tTw + 0.6, i: 0 }, { t0: tTw + 0.6, t1: S('tex').t1, i: 1 });
    a.ch('D', S('tex').t0 + 0.1, S('tex').t1, { notes: SATB.D, bass: LOW.D, vel: 0.35, shape: false });

    // homo: four voices, same rhythm
    const gh = voiceGrid(S('homo').t0 + 0.1, S('homo').t1, 'SAME RHYTHM');
    const tBl = a.w('homo', 'block') - 0.04;
    word('D', a.w('homo', 'same') - 0.04, { vel: 0.6, grid: gh, shape: false, timp: false });
    const h2 = a.end('homo') + 0.3;
    words(['A', 'D'], h2, { vel: 0.85, grid: gh, shape: false });
    a.big('ONE RHYTHM', tBl, S('homo').t1, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: GOLD });

    // poly: entries one after another (original motif)
    const gp = voiceGrid(S('poly').t0 + 0.1, S('poly').t1, 'ENTERS');
    const pE = a.w('poly', 'enter') - 0.04;
    imitation(pE, { vel: 0.3, grid: gp, beat: (a.end('poly') - pE) / 10 });
    const p2 = a.end('poly') + 0.3;
    const pEnd = imitation(p2, { vel: 0.4, grid: gp });
    a.big('OVERLAPPING LINES', a.w('poly', 'overlapping'), S('poly').t1, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: TEAL });

    // why4: together, apart, together again
    const gc = voiceGrid(S('why4').t0 + 0.1, S('why4').t1, '');
    const tTo = a.w('why4', 'Together') - 0.04, tAp = a.w('why4', 'apart') - 0.04, tAg = a.w('why4', 'together', 0) - 0.04;
    word('D', tTo, { vel: 0.7, grid: gc, shape: false, beat: Math.min(BEAT, (tAp - tTo) / 4) });
    imitation(tAp, { vel: 0.32, grid: gc, beat: (tAg - tAp) / 10 });
    const tEnd = words(['A', 'D'], tAg, { vel: 0.85, grid: gc, shape: false, beat: Math.min(BEAT, (S('why4').t1 - tAg - 0.1) / 8) });
    a.big('TOGETHER', tTo, tAp, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('APART', tAp, tAg, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('TOGETHER AGAIN', tAg, S('why4').t1, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: GOLD });

    // essence: words with timpani, fanfare, and the final D
    a.scale(S('essence').t0, 'D');
    const e0 = S('essence').t0 + 0.1, eb = Math.min(BEAT, (a.at('cta') - e0) / 16);
    const eEnd = words(['D', 'G', 'A', 'D'], e0, { vel: 0.75, beat: eb });
    a.ch('D', eEnd, S('essence').t1 - 0.3, { notes: ['D3', 'A3', 'D4', 'F#4', 'A4', 'D5'], bass: 'D2', vel: 0.9 });
    [0, 0.12, 0.24, 0.36].forEach((o, i) => a.perc('kick', eEnd + o, 0.5 + i * 0.1));
    [['A4', 0], ['D5', 0.25], ['F#5', 0.5]].forEach(([n, u]) => a.note(n, eEnd + u, 1.4, { vel: 0.3, show: false }));
    a.tag('D', eEnd, S('essence').t1, 'HOME', { color: GOLD, dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
