// Bossa nova: samba's rhythm, softened, plus jazz chords. The Girl from Ipanema as the example.
// Copyrighted song: chords only (Fmaj7 | Fmaj7 | G7 | G7 | Gm7 | Gb7 | Fmaj7 | Gb7), no melody.
const Q = 0.4, E = Q / 2, BAR = 4 * Q;   // 150 quarter notes per minute, eighths drive the pattern

module.exports = {
  slug: 'bossa-nova',
  title: 'Bossa Nova',
  segments: [
    { id: 'hook',    text: "Take samba's rhythm, soften it, add jazz chords. That's bossa nova." },
    { id: 'what',    text: 'Born in Rio de Janeiro in the late 1950s, the name means new trend.' },
    { id: 'what2',   text: "João Gilberto's guitar style defined it." },
    { id: 's1',      text: 'Listen to The Girl from Ipanema, by Jobim and Vinícius de Moraes.' },
    { id: 's1b',     text: 'F major seven, G seven, G minor seven, G flat seven.' },
    { id: 's2',      text: "Stan Getz and João Gilberto's 1964 version won the Grammy for Record of the Year." },
    { id: 'why1',    text: "So why does it work? The thumb keeps the bass on the beat, like samba's big drum." },
    { id: 'why2',    text: 'The fingers pluck syncopated chords. Two layers, one guitar.' },
    { id: 'why3',    text: 'The harmony is jazz: major sevenths, like F major seven...' },
    { id: 'why3b',   text: 'and G seven, a secondary dominant: the five of five.' },
    { id: 'why4',    text: 'G flat seven is a tritone substitution for C seven...' },
    { id: 'why4b',   text: 'and slides down a half step, into F major seven.' },
    { id: 'why5',    text: 'The bridge jumps up a half step to G flat major seven: a sunny lift.' },
    { id: 'why6',    text: 'The singing is soft, almost whispered. Cool, not loud.' },
    { id: 'essence', text: "Samba's heartbeat, jazz colours, and a whisper. That's bossa nova." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'SAMBA + JAZZ', title: 'BOSSA NOVA', accent: true, tonic: 5, lead: 0.5, min: 4 * BAR, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'THE NEW TREND', title: 'BOSSA NOVA', circle: false, tonic: 5, gap: 0.3, tail: 0.4 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'The Girl from Ipanema', sub: 'Jobim & de Moraes · 1962 · in F', tonic: 5, gap: 0.3, row: ['Fmaj7', 'Fmaj7', 'G7', 'G7', 'Gm7', 'Gb7', 'Fmaj7', 'Gb7'], min: 8 * BAR + 0.2, tail: 0.3 },
    { id: 's2', segs: ['s2'], label: 'RECORD OF THE YEAR', title: 'Getz / Gilberto', sub: 'with Astrud Gilberto · 1964', circle: false, tonic: 5, min: 4 * BAR, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWO LAYERS', circle: false, tonic: 5, min: 2 * BAR, tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'TWO LAYERS', circle: false, tonic: 5, min: 2 * BAR, tail: 0.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'JAZZ HARMONY', tonic: 5, gap: 0.3, tail: 0.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'TRITONE SUB', tonic: 5, gap: 0.3, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'THE BRIDGE', tonic: 5, tail: 0.9 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'A WHISPER', circle: false, tonic: 5, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SAMBA + JAZZ', accent: true, tonic: 5, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', GREY = '#55555d', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };

    // voicings: four chord tones each, plus a root / fifth for the thumb
    const V = {
      Fmaj7:  { n: ['F3', 'A3', 'C4', 'E4'], b: ['F2', 'C3'] },
      G7:     { n: ['F3', 'G3', 'B3', 'D4'], b: ['G2', 'D3'] },
      Gm7:    { n: ['F3', 'G3', 'Bb3', 'D4'], b: ['G2', 'D3'] },
      Gb7:    { n: ['E3', 'Gb3', 'Bb3', 'Db4'], b: ['Gb2', 'Db3'] },
      Gbmaj7: { n: ['F3', 'Gb3', 'Bb3', 'Db4'], b: ['Gb2', 'Db3'] },
      C7:     { n: ['E3', 'G3', 'Bb3', 'C4'], b: ['C3', 'G2'] },
    };
    const IPA = ['Fmaj7', 'Fmaj7', 'G7', 'G7', 'Gm7', 'Gb7', 'Fmaj7', 'Gb7'];
    // the fingers: a two-bar syncopated pattern on eighths (x..x..x...x..x..)
    const FING = [0, 3, 6, 10, 13];

    // guitar lanes: counts, thumb (on every beat), fingers (syncopated)
    const COUNT = [...Array(16)].map((_, i) => ({ label: i % 2 ? '&' : String(i / 2 % 4 + 1), color: i % 2 ? '#7a7a86' : BLUE, size: 26 }));
    const lane = (hits, col) => [...Array(16)].map((_, i) => (hits.includes(i) ? { label: 'X', color: col, size: 40 } : { label: '', color: GREY }));
    const SETS = [];
    function lanes(t0, t1, o = {}) {
      const y = o.y ?? 470, cw = 62;
      const L = {
        t0, t1,
        step: a.grid(COUNT, t0, t1, { rows: 1, cols: 16, cw, chh: 80, y }),
        thumb: a.grid(lane([0, 2, 4, 6, 8, 10, 12, 14], PINK), t0, t1, { rows: 1, cols: 16, cw, chh: 140, y: y + 100, caption: 'THUMB: BASS ON THE BEAT' }),
        fing: a.grid(lane(FING, TEAL), o.fingFrom ?? t0, t1, { rows: 1, cols: 16, cw, chh: 140, y: y + 300, caption: 'FINGERS: SYNCOPATED CHORDS' }),
      };
      SETS.push(L);
      return L;
    }
    const setAt = t => SETS.find(L => t >= L.t0 && t < L.t1);

    // one 4/4 bar of the groove on chord `name`; k = bar count (fingers alternate a two-bar pattern)
    function bar(name, t, k, o = {}) {
      const vel = o.vel ?? 1, stop = o.stop ?? Infinity, v = V[name];
      const len = Math.min(BAR, stop - t);
      for (let s = 0; s < 8; s++) {
        const ts = t + s * E, step = (k % 2) * 8 + s;
        if (ts > stop - 0.03) break;
        const L = setAt(ts + 0.01);
        if (L) L.step.active.push({ t0: ts, t1: ts + E, i: step });
        a.perc('hat', ts, (s % 2 ? 0.1 : 0.16) * vel);
        if (s % 2 === 0 && o.thumb !== false) {
          a.note(v.b[(s / 2) % 2], ts, Q * 0.9, { vel: 0.42 * vel });
          a.perc('kick', ts, (s % 4 ? 0.22 : 0.32) * vel);
          if (L) L.thumb.active.push({ t0: ts, t1: ts + 0.2, i: step });
        }
        if (FING.includes(step) && o.fingers !== false && ts >= (o.fingFrom ?? -1) - 0.03 && L) L.fing.active.push({ t0: ts, t1: ts + 0.2, i: step });
      }
      const strikes = FING.filter(x => Math.floor(x / 8) === k % 2).map(x => ({ o: (x % 8) * E, v: x % 8 ? 0.7 : 1 })).filter(x => x.o < len - 0.05);
      if (o.fingers === false || t < (o.fingFrom ?? -1) - 0.03) a.ch(name, t, t + len, { notes: v.n, bass: false, vel: 0, hideName: o.hideName, shape: o.shape, label: o.label, row: o.row, mute: true });
      else {
        if (!strikes.length || strikes[0].o > 0) strikes.unshift({ o: 0, v: 0 });
        a.ch(name, t, t + len, { notes: v.n, bass: false, strikes, vel: (o.cv ?? 0.5) * vel, hideName: o.hideName, shape: o.shape, label: o.label, row: o.row });
      }
    }
    // play chords from a list, one per bar, between t0 and t1 (last bar cut at t1)
    function play(t0, t1, names, o = {}) {
      let t = t0, k = o.k0 ?? 0;
      for (let i = 0; t < t1 - 0.3; t += BAR, k++, i++) bar(names[i % names.length], t, k, { ...o, stop: t1, row: o.rows ? i % names.length : undefined });
      return Math.min(t, t1);
    }

    // ---- hook: F major scale on the circle, the groove from the first frame ----
    a.scale(0, 'F', a.T.MAJOR, { popIn: { t0: 0.05, step: 0.05 } });
    play(0.1, S('hook').t1, ['Fmaj7', 'G7', 'Gm7', 'Gb7'], { vel: 0.9 });

    // ---- what: four facts, lit on their words ----
    const w0 = S('what').t0;
    const FACTS = [['RIO DE JANEIRO', 'BRAZIL', PINK, ['what', 'Rio']], ['LATE 1950s', 'BORN', GOLD, ['what', 'late']], ['NEW TREND', 'BOSSA NOVA', TEAL, ['what', 'new']], ['JOÃO GILBERTO', 'GUITAR', BLUE, ['what2', 'guitar']]];
    const gF = a.grid(FACTS.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 50 })), w0, S('what').t1, { rows: 4, cols: 1, cw: 680, chh: 160, y: 450, revealStep: 0.12 });
    FACTS.forEach(([, , , [seg, w]], i) => gF.active.push({ t0: a.w(seg, w) - 0.1, t1: S('what').t1, i }));
    play(w0, S('what').t1, ['Fmaj7', 'G7', 'Gm7', 'Gb7'], { vel: 0.75, hideName: true, shape: false });

    // ---- s1: the progression of the A section, one chord per bar, on the circle ----
    const s10 = S('s1').t0 + 0.05;
    play(s10, S('s1').t1, IPA, { rows: true, vel: 0.95 });

    // ---- s2: Getz / Gilberto, Record of the Year ----
    const s20 = S('s2').t0;
    const gG = a.grid([{ label: 'GRAMMY', sub: 'RECORD OF THE YEAR', color: GOLD, size: 72, subSize: 30 }], s20, S('s2').t1, { rows: 1, cols: 1, cw: 720, chh: 260, y: 560 });
    gG.active.push({ t0: a.w('s2', 'Grammy') - 0.1, t1: S('s2').t1, i: 0 });
    a.big('STAN GETZ', s20 + 0.3, S('s2').t1, { x: 320, y: 930, size: 44, ...MONO, color: PINK, blur: 10 });
    a.big('JOÃO GILBERTO', s20 + 0.3, S('s2').t1, { x: 740, y: 930, size: 44, ...MONO, color: TEAL, blur: 10 });
    a.big('1964', a.w('s2', '1964'), S('s2').t1, { y: 1050, size: 72, ...MONO, color: GOLD });
    play(s20, S('s2').t1, IPA, { vel: 0.85, hideName: true, shape: false });

    // ---- why1 + why2: the two layers of the guitar ----
    const y0 = S('why1').t0, tF = a.w('why2', 'fingers');
    lanes(y0, S('why2').t1, { fingFrom: tF - 0.2 });
    play(y0, S('why2').t1, IPA, { fingFrom: tF, vel: 0.9, hideName: true, shape: false });
    a.big("SAMBA'S BIG DRUM", a.w('why1', "samba's"), S('why1').t1, { y: 1050, size: 54, ...MONO, color: PINK });
    a.big('TWO LAYERS, ONE GUITAR', a.w('why2', 'Two'), S('why2').t1, { y: 1050, size: 50, ...MONO, color: GOLD });

    // ---- why3: major seventh, then G7 = V of V ----
    const h0 = S('why3').t0, tG = a.w('why3b', 'G') - 0.05;
    a.scale(h0, 'F');
    play(h0, tG, ['Fmaj7'], { vel: 0.8 });
    a.tag('E', a.w('why3', 'major'), tG, 'MAJOR 7TH', { color: GOLD });
    play(tG, S('why3').t1, ['G7'], { vel: 0.8, k0: 0 });
    a.arc('G', 'C', a.w('why3b', 'five'), S('why3').t1, { color: TEAL, label: 'V', labelR: 165 });
    a.arc('C', 'F', a.w('why3b', 'five', 1), S('why3').t1, { color: GOLD, label: 'V', labelR: 165 });
    a.big('V OF V', a.w('why3b', 'five'), S('why3').t1, { y: 455, size: 52, ...MONO, color: GOLD });

    // ---- why4: Gb7 replaces C7 (tritone apart), then slides down a half step into Fmaj7 ----
    const t40 = S('why4').t0, tSub = a.w('why4', 'tritone') - 0.05, tSlide = a.w('why4b', 'slides') - 0.05;
    play(t40, tSlide, ['Gb7'], { vel: 0.8 });
    a.tag('F#', t40 + 0.2, tSlide, 'G FLAT', { color: BLUE, x: 660, y: 1143 });
    a.ghost('C7', a.w('why4', 'C'), tSlide, { label: 'C7', ly: -105 });
    a.line('C', 'F#', tSub, tSlide, { color: RED, label: 'TRITONE', ly: 78 });
    play(tSlide, S('why4').t1, ['Fmaj7'], { vel: 0.85, k0: 0 });
    a.arc('F#', 'F', a.w('why4b', 'half'), S('why4').t1, { color: GOLD, label: 'HALF STEP DOWN', labelR: 165 });

    // ---- why5: the bridge, up a half step to Gbmaj7 ----
    const t50 = S('why5').t0, tUp = a.w('why5', 'jumps') - 0.05;
    play(t50, tUp, ['Fmaj7'], { vel: 0.75 });
    play(tUp, S('why5').t1, ['Gbmaj7'], { vel: 0.85, label: 'Gbmaj7' });
    a.arc('F', 'F#', a.w('why5', 'half'), S('why5').t1, { color: GOLD, label: 'UP A HALF STEP', labelR: 165 });
    a.big('A SUNNY LIFT', a.w('why5', 'sunny'), S('why5').t1, { y: 455, size: 52, ...MONO, color: GOLD });

    // ---- why6: soft dynamics, a whisper ----
    const t60 = S('why6').t0;
    const DYN = ['pp', 'p', 'mp', 'mf', 'f', 'ff'].map((l, i) => ({ label: l, color: i < 2 ? TEAL : '#7a7a86', size: 50 }));
    const gD = a.grid(DYN, t60, S('why6').t1, { rows: 1, cols: 6, cw: 160, chh: 170, y: 560, caption: 'HOW LOUD?' });
    gD.active.push({ t0: a.w('why6', 'soft'), t1: S('why6').t1, i: 0 }, { t0: a.w('why6', 'soft'), t1: S('why6').t1, i: 1 });
    a.big('COOL', a.w('why6', 'Cool'), S('why6').t1, { x: 360, y: 960, size: 80, ...MONO, color: TEAL });
    a.big('NOT LOUD', a.w('why6', 'loud'), S('why6').t1, { x: 740, y: 960, size: 48, ...MONO, color: '#7a7a86', blur: 0 });
    play(t60, S('why6').t1, ['Fmaj7', 'G7', 'Gm7', 'Gb7'], { vel: 0.55, hideName: true, shape: false });

    // ---- essence: the progression once more, ending on Fmaj7 ----
    const e0 = S('essence').t0;
    a.scale(e0, 'F');
    const tEnd = play(e0, S('essence').t1 - 2.2, ['Fmaj7', 'G7', 'Gm7', 'Gb7'], { vel: 0.85 });
    a.note('F2', tEnd, 1.6, { vel: 0.45 }); a.perc('kick', tEnd, 0.35);
    a.ch('Fmaj7', tEnd, S('essence').t1 - 0.2, { notes: ['F3', 'A3', 'C4', 'E4', 'A4'], bass: false, vel: 0.7 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
