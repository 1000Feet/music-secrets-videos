// Dembow: four even kicks plus a snare on the tresillo spots, the beat under reggaeton.
// Copyrighted songs: only the generic dembow pattern and generic chords are played.
const B = 60 / 95, S16 = B / 4, BAR = 4 * B;   // about 95 BPM

module.exports = {
  slug: 'dembow',
  title: 'The Reggaeton Beat: Dembow',
  segments: [
    { id: 'hook',    text: "Boom, ch-boom, chick. That's the beat under reggaeton. It's called dembow." },
    { id: 'what',    text: 'Count sixteen steps. The kick hits every beat: one, five, nine, thirteen.' },
    { id: 'what2',   text: 'The snare answers on four and seven, then twelve and fifteen.' },
    { id: 's1',      text: 'The name comes from Dem Bow, a dancehall track by Shabba Ranks.' },
    { id: 's2',      text: 'Producers in Puerto Rico and Panama built a new genre on its rhythm.' },
    { id: 's3',      text: 'Then reggaeton went worldwide, with Gasolina...' },
    { id: 's4',      text: 'and Despacito.' },
    { id: 'why1',    text: 'So why does it work? It has two layers. The kick is perfectly even.' },
    { id: 'why2',    text: 'Add the snare, and you get three, three, two. The tresillo again.' },
    { id: 'why3',    text: 'Even against uneven. Your ear hears both at once...' },
    { id: 'why3b',   text: 'so the groove sways instead of marching.' },
    { id: 'why4',    text: 'It loops every bar, at a relaxed tempo, around ninety to a hundred beats per minute.' },
    { id: 'why5',    text: 'And it comes from a long Caribbean line: tresillo, habanera, dancehall, reggaeton.' },
    { id: 'essence', text: 'Even kicks, uneven snares... and the whole world starts to sway.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE REGGAETON BEAT', title: 'DEMBOW', accent: true, circle: false, tonic: 9, lead: 0.5, min: 3 * BAR, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'SIXTEEN STEPS', title: 'KICK + SNARE', circle: false, tonic: 9, gap: 0.35, min: 5 * BAR, tail: 0.3 },
    { id: 's1', segs: ['s1'], label: 'THE NAME', title: 'Dem Bow', sub: 'Shabba Ranks · 1990', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 's2', segs: ['s2'], label: 'BORN IN', title: 'Reggaeton', sub: 'Puerto Rico · Panama', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'Gasolina', sub: 'Daddy Yankee · 2004', circle: false, tonic: 9, min: 2 * BAR, tail: 0.8 },
    { id: 's4', segs: ['s4'], label: 'YOU HEAR IT IN', title: 'Despacito', sub: 'Luis Fonsi ft. Daddy Yankee · 2017', circle: false, tonic: 9, min: 2 * BAR, tail: 0.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWO LAYERS', circle: false, tonic: 9, min: 2 * BAR, tail: 0.3 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: '3 + 3 + 2', circle: false, tonic: 9, min: 2 * BAR, tail: 0.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'EVEN VS UNEVEN', circle: false, tonic: 9, gap: 0.3, min: 3 * BAR, tail: 0.4 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'ONE BAR, LOOPED', circle: false, tonic: 9, min: 3 * BAR, tail: 0.4 },
    { id: 'why5', segs: ['why5'], label: 'A CARIBBEAN LINE', title: 'TRESILLO TO DEMBOW', circle: false, tonic: 9, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'EVEN VS UNEVEN', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREY = '#55555d';
    const MONO = { family: 'DM Mono', weight: 500 };
    const KICK = [0, 4, 8, 12], SNARE = [3, 6, 11, 14];

    // ---- drum-machine lanes: a step counter plus kick and snare rows of sixteen ----
    const STEP = [...Array(16)].map((_, i) => ({ label: String(i + 1), color: i % 4 === 0 ? BLUE : '#7a7a86', size: 24 }));
    const lane = (hits, col) => [...Array(16)].map((_, i) => (hits.includes(i) ? { label: 'X', color: col, size: 40 } : { label: '', color: GREY }));
    const SETS = [];
    function lanes(t0, t1, o = {}) {
      const y = o.y ?? 470, cw = 62;
      const L = {
        t0, t1,
        step: a.grid(STEP, t0, t1, { rows: 1, cols: 16, cw, chh: 80, y }),
        kick: a.grid(lane(KICK, PINK), t0, t1, { rows: 1, cols: 16, cw, chh: 140, y: y + 100, caption: 'KICK' }),
        snare: o.noSnare ? null : a.grid(lane(SNARE, TEAL), o.snareFrom ?? t0, t1, { rows: 1, cols: 16, cw, chh: 140, y: y + 300, caption: 'SNARE' }),
      };
      SETS.push(L);
      return L;
    }
    const setAt = t => SETS.find(L => t >= L.t0 && t < L.t1);

    // generic chords (A minor loop), never a song's melody
    const PROG = [['Am', ['A3', 'C4', 'E4'], 'A1'], ['F', ['A3', 'C4', 'F4'], 'F1'], ['C', ['G3', 'C4', 'E4'], 'C2'], ['G', ['G3', 'B3', 'D4'], 'G1']];

    // one bar of dembow. o.snare=false drops the snare, o.chords=false drops the keys
    function bar(t, k, o = {}) {
      const vel = o.vel ?? 1;
      for (let s = 0; s < 16; s++) {
        const ts = t + s * S16;
        if (o.stop && ts > o.stop - 0.03) break;
        const L = setAt(ts + 0.01);
        if (L) L.step.active.push({ t0: ts, t1: ts + S16, i: s });
        if (KICK.includes(s)) {
          a.perc('kick', ts, 1.0 * vel);
          if (L) L.kick.active.push({ t0: ts, t1: ts + 0.18, i: s });
        }
        if (SNARE.includes(s) && o.snare !== false && ts >= (o.snareFrom ?? -1) - 0.03) {
          a.perc('snare', ts, 0.7 * vel); a.perc('snare', ts + 0.015, 0.3 * vel);
          if (L && L.snare) L.snare.active.push({ t0: ts, t1: ts + 0.18, i: s });
        }
        if (o.hat !== false && s % 2 === 0) a.perc('hat', ts, (s % 4 ? 0.28 : 0.16) * vel);
      }
      if (o.chords !== false) {
        const [n, notes, bass] = PROG[k % 4];
        const len = Math.min(BAR, (o.stop ?? Infinity) - t);
        const strikes = [{ o: 0, v: 1 }, { o: 3 * S16, v: 0.55 }, { o: 6 * S16, v: 0.7 }, { o: 8 * S16, v: 0.8 }, { o: 11 * S16, v: 0.55 }, { o: 14 * S16, v: 0.7 }].filter(x => x.o < len - 0.05);
        a.ch(n, t, t + len, { notes, bass: o.bass === false ? false : bass, strikes, vel: (o.cv ?? 0.45) * vel, hideName: true, shape: false });
      }
    }
    // whole bars, plus a cut-off partial bar so there is never a gap at a scene change
    const run = (t0, t1, o = {}) => { let t = t0, k = o.k0 ?? 0; for (; t < t1 - 0.3; t += BAR, k++) bar(t, k, { ...o, stop: t1 }); return Math.min(t, t1); };

    // ---- hook: the full groove from the very first frame ----
    lanes(0, S('hook').t1);
    run(0.15, S('hook').t1, { vel: 0.9 });
    a.big('BOOM, CH-BOOM, CHICK', 0.15, S('hook').t1, { y: 1050, size: 58, ...MONO, color: GOLD });

    // ---- what: kick alone, then the snare joins ----
    const w0 = S('what').t0, tSn = a.at('what2') - 0.1;
    lanes(w0, S('what').t1, { snareFrom: tSn - 0.3 });
    run(w0, S('what').t1, { snareFrom: tSn, chords: true, cv: 0.35, vel: 0.9 });
    const tN = ['one', 'five', 'nine', 'thirteen'].map(x => a.w('what', x));
    tN.forEach((t, i) => a.big(String(1 + 4 * i), t, a.at('what2'), { x: 540 - 496 + 31 + 62 * 4 * i, y: 1040, size: 54, ...MONO, color: PINK, blur: 12 }));
    a.big('FOUR ON THE FLOOR', tN[0] - 1.0, a.at('what2'), { y: 1110, size: 36, ...MONO, color: '#b9b9c2', blur: 0 });
    const tS = [['four', 3], ['seven', 6], ['twelve', 11], ['fifteen', 14]].map(([x, s]) => [a.w('what2', x), s]);
    tS.forEach(([t, s]) => a.big(String(s + 1), t, S('what').t1, { x: 540 - 496 + 31 + 62 * s, y: 1040, size: 54, ...MONO, color: TEAL, blur: 12 }));

    // ---- songs: the same generic beat, a different generic chord colour in each ----
    const songs = [['s1', 'DANCEHALL'], ['s2', 'A NEW GENRE'], ['s3', 'WORLDWIDE'], ['s4', 'WORLDWIDE']];
    const p1 = S('s1').t0;
    songs.forEach(([id]) => lanes(S(id).t0, S(id).t1));
    run(p1, S('s4').t1, { k0: 0, vel: 0.9 });
    songs.forEach(([id, txt]) => a.big(txt, S(id).t0 + 0.3, S(id).t1, { y: 1050, size: 56, ...MONO, color: GOLD }));

    // ---- why1: two layers, the kick alone and even ----
    const y0 = S('why1').t0, tSnr = a.w('why2', 'snare');
    lanes(y0, S('why2').t1, { snareFrom: tSnr - 0.2 });
    const tEven = a.w('why1', 'even');
    run(y0, S('why2').t1, { snareFrom: tSnr, cv: 0.35, vel: 0.85 });
    a.big('1 · 2 · 3 · 4', a.w('why1', 'kick'), tEven, { y: 1050, size: 64, ...MONO, color: PINK });
    a.big('EVEN', tEven, a.at('why2'), { y: 1050, size: 80, ...MONO, color: PINK });

    // why2: three, three, two over the half bar (kick on 1, snare on 4 and 7)
    const W2 = [a.w('why2', 'three'), a.w('why2', 'three', 1), a.w('why2', 'two'), a.w('why2', 'tresillo')];
    ['3', '3 + 3', '3 + 3 + 2'].forEach((txt, i) => a.big(txt, W2[i], W2[i + 1], { y: 1050, size: 80, ...MONO, color: GOLD }));
    a.big('THE TRESILLO', W2[3], S('why2').t1, { y: 1050, size: 70, ...MONO, color: GOLD });

    // ---- why3: even against uneven, two grids at once ----
    const e0 = S('why3').t0;
    const EV = [1, 2, 3, 4].map(n => ({ label: String(n), color: PINK, size: 48 }));
    const GC = [PINK, TEAL, GOLD];
    const UN = [...Array(8)].map((_, i) => ({ label: [0, 3, 6].includes(i) ? 'X' : '', color: GC[i < 3 ? 0 : i < 6 ? 1 : 2], size: 44 }));
    const gEv = a.grid(EV, e0, S('why3').t1, { rows: 1, cols: 4, cw: 248, chh: 140, y: 500, caption: 'EVEN: THE KICK' });
    const gUn = a.grid(UN, e0, S('why3').t1, { rows: 1, cols: 8, cw: 124, chh: 140, y: 740, caption: 'UNEVEN: 3 + 3 + 2' });
    let te = e0;
    for (let k = 0; te < S('why3').t1 - 0.3; te += BAR, k++) {
      bar(te, k, { vel: 0.85, cv: 0.35, stop: S('why3').t1 });
      for (let i = 0; i < 4; i++) gEv.active.push({ t0: te + i * B, t1: te + i * B + 0.2, i });
      for (let h = 0; h < 2; h++) [0, 3, 6].forEach(i => gUn.active.push({ t0: te + h * 2 * B + i * S16, t1: te + h * 2 * B + i * S16 + 0.2, i }));
    }
    const tSw = a.w('why3b', 'sways'), tMa = a.w('why3b', 'marching');
    a.big('SWAY', tSw, S('why3').t1, { x: 340, y: 1060, size: 72, ...MONO, color: GOLD });
    a.big('NOT MARCH', tMa, S('why3').t1, { x: 760, y: 1060, size: 44, ...MONO, color: '#7a7a86', blur: 0 });

    // ---- why4: one bar, looped; bar counter ----
    const l0 = S('why4').t0;
    lanes(l0, S('why4').t1);
    const BARS = [1, 2, 3, 4].map(n => ({ label: 'BAR ' + n, color: BLUE, size: 30 }));
    const gBars = a.grid(BARS, l0, S('why4').t1, { rows: 1, cols: 4, cw: 200, chh: 76, y: 985 });
    let tl = l0;
    for (let k = 0; tl < S('why4').t1 - 0.3; tl += BAR, k++) { bar(tl, k, { vel: 0.85, stop: S('why4').t1 }); gBars.active.push({ t0: tl, t1: tl + BAR, i: k % 4 }); }
    a.big('90–100 BPM', a.w('why4', 'ninety'), S('why4').t1, { y: 1112, size: 52, ...MONO, color: GOLD });

    // ---- why5: tresillo -> habanera -> dancehall -> reggaeton ----
    const c0 = S('why5').t0;
    const LINE = [['TRESILLO', 'tresillo'], ['HABANERA', 'habanera'], ['DANCEHALL', 'dancehall'], ['REGGAETON', 'reggaeton']];
    const gL = a.grid(LINE.map(([l], i) => ({ label: l, sub: String(i + 1), color: [PINK, TEAL, GOLD, BLUE][i], size: 40 })), c0, S('why5').t1,
      { rows: 4, cols: 1, cw: 560, chh: 150, y: 470, revealStep: 0.1 });
    LINE.forEach(([, w], i) => gL.active.push({ t0: a.w('why5', w), t1: S('why5').t1, i }));
    run(c0, S('why5').t1, { vel: 0.6, hat: true, cv: 0.35 });

    // ---- essence: the full groove, then the last kick ----
    const s0 = S('essence').t0;
    lanes(s0, S('essence').t1);
    let tEnd = s0;
    for (let k = 0; tEnd + BAR <= S('essence').t1 - 1.6; tEnd += BAR, k++) bar(tEnd, k, { vel: 0.9 });
    a.big('EVEN KICKS', a.w('essence', 'Even'), S('essence').t1, { x: 300, y: 1030, size: 48, ...MONO, color: PINK });
    a.big('UNEVEN SNARES', a.w('essence', 'uneven'), S('essence').t1, { x: 760, y: 1030, size: 48, ...MONO, color: TEAL });
    a.big('SWAY', a.w('essence', 'sway'), S('essence').t1, { y: 1115, size: 60, ...MONO, color: GOLD });
    a.perc('kick', tEnd, 1);
    setAt(tEnd).kick.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('Am', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4'], bass: 'A1', vel: 0.8, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
