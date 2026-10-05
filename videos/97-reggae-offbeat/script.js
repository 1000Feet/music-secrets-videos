// Reggae: short chords on the offbeats (the skank) and drums that leave beat one empty (the one drop).
// Copyrighted recordings: only generic grooves and an original bass line are played.
const B = 0.8, E = B / 2, BAR = 4 * B;     // reggae, 75 BPM
const BK = 0.46, BR = 0.62;                // ska (fast) and rocksteady (slower), for the history scenes

module.exports = {
  slug: 'reggae-offbeat',
  title: 'Reggae: Living on the Offbeat',
  segments: [
    { id: 'hook',    text: 'In reggae, the chords dodge the beat, and the drums skip beat one.' },
    { id: 'what',    text: "The guitar and keys play short chords only on the and of each beat. That's the skank." },
    { id: 'what2',   text: 'The drums leave beat one empty: the one drop.' },
    { id: 's1',      text: "It's the sound of Bob Marley and the Wailers." },
    { id: 's1b',     text: 'Drummer Carlton Barrett is closely associated with the one drop.' },
    { id: 's2',      text: 'It grew out of ska in the early 1960s: fast, with offbeat horns and guitar.' },
    { id: 's3',      text: 'Then rocksteady slowed it down...' },
    { id: 's4',      text: 'and by the late 1960s, it was reggae.' },
    { id: 'why1',    text: 'So why does it work? The skank leaves every downbeat empty...' },
    { id: 'why1b',   text: 'and your ear fills them in by itself.' },
    { id: 'why2',    text: 'The one drop: kick and snare hit together on beat three, and beat one stays empty.' },
    { id: 'why2b',   text: 'So the beat seems to drop on three.' },
    { id: 'why3',    text: 'Underneath, the bass is deep and melodic. It carries the tune.' },
    { id: 'why4',    text: 'Empty downbeat, chords on the offbeat: the groove leans back instead of pushing forward.' },
    { id: 'essence', text: 'Leave the downbeat empty, play the offbeat... and the groove starts to float.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'REGGAE', title: 'THE OFFBEAT', accent: true, circle: false, tonic: 9, lead: 0.6, min: 2 * BAR, tail: 0.4 },
    { id: 'what', segs: ['what', 'what2'], label: 'TWO INGREDIENTS', title: 'SKANK + ONE DROP', circle: false, tonic: 9, gap: 0.35, min: 4 * BAR, tail: 0.4 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'Bob Marley', sub: '& the Wailers', circle: false, tonic: 9, gap: 0.3, min: 3 * BAR, tail: 0.6 },
    { id: 's2', segs: ['s2'], label: 'WHERE IT CAME FROM', title: 'Ska', sub: 'Jamaica · early 1960s', circle: false, tonic: 9, min: 4 * 4 * BK, tail: 0.5 },
    { id: 's3', segs: ['s3'], label: 'WHERE IT CAME FROM', title: 'Rocksteady', sub: 'slower', circle: false, tonic: 9, min: 2 * 4 * BR, tail: 0.3 },
    { id: 's4', segs: ['s4'], label: 'WHERE IT CAME FROM', title: 'Reggae', sub: 'late 1960s', circle: false, tonic: 9, min: 1.5 * BAR, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE SKANK', circle: false, tonic: 9, gap: 0.3, min: 2 * BAR, tail: 0.5 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'THE ONE DROP', circle: false, tonic: 9, gap: 0.3, min: 2 * BAR, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE BASS', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'LEANING BACK', circle: false, tonic: 9, min: 2 * BAR, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'PLAY THE OFFBEAT', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', ORANGE = '#ffa45c', GREY = '#55555d';
    const MONO = { family: 'DM Mono', weight: 500 };
    const OFF = [1, 3, 5, 7];

    // ---- lanes: counts, chords (skank) and drums (one drop), eight eighths per bar ----
    const COUNT = [...Array(8)].map((_, i) => ({ label: i % 2 ? '&' : String(i / 2 + 1), color: i % 2 ? TEAL : BLUE, size: 34 }));
    const lane = (hits, col, lbl = 'X') => [...Array(8)].map((_, i) => (hits.includes(i) ? { label: lbl, color: col, size: 44 } : { label: '', color: GREY }));
    const SETS = [];
    function lanes(t0, t1, o = {}) {
      const y = o.y ?? 470, cw = 120;
      const L = { t0, t1, o,
        step: a.grid(COUNT, t0, t1, { rows: 1, cols: 8, cw, chh: 90, y }),
        chord: a.grid(lane(OFF, TEAL), t0, t1, { rows: 1, cols: 8, cw, chh: 140, y: y + 105, caption: 'CHORDS: THE SKANK' }),
        drum: o.noDrum ? null : a.grid(lane([4], PINK, 'K+S'), o.drumFrom ?? t0, t1, { rows: 1, cols: 8, cw, chh: 140, y: y + 315, caption: 'KICK + SNARE: THE ONE DROP' }),
      };
      SETS.push(L);
      return L;
    }
    const setAt = t => SETS.find(L => t >= L.t0 && t < L.t1);

    // generic chords and an original bass line (A minor, two bars)
    const CH = [['Am', ['A3', 'C4', 'E4']], ['D', ['A3', 'D4', 'F#4']]];
    const BASS = [[['A1', 0, 1.4], ['C2', 2, 0.9], ['E2', 3, 0.9], ['G2', 4, 1.4], ['E2', 6, 0.9]], [['D2', 0, 1.4], ['F#2', 2, 0.9], ['A2', 3, 0.9], ['G2', 4, 1.4], ['E2', 6, 0.9]]];

    // one bar. style: 'reggae' (one drop) | 'ska' (fast) | 'rock' (rocksteady). b = beat length
    function bar(t, k, o = {}) {
      const b = o.b ?? B, e = b / 2, vel = o.vel ?? 1, stop = o.stop ?? Infinity, style = o.style || 'reggae';
      const [cn, cv] = CH[k % 2];
      for (let s = 0; s < 8; s++) {
        const ts = t + s * e;
        if (ts > stop - 0.05) break;
        const L = setAt(ts + 0.01);
        if (L) L.step.active.push({ t0: ts, t1: ts + e, i: s });
        // skank: short chord on every "and"
        if (s % 2 === 1 && o.skank !== false) {
          a.ch(cn, ts, ts + Math.min(0.28, e * 0.6), { notes: style === 'ska' ? cv.map(n => a.T.midi(n) + 12) : cv, bass: false, vel: 0.75 * vel, hideName: true, shape: false });
          a.perc('hat', ts, 0.12 * vel);
          if (L) L.chord.active.push({ t0: ts, t1: ts + 0.22, i: s });
        }
        a.perc('hat', ts + (s % 2 ? e * 0.5 : 0), 0.1 * vel);
        if (style === 'reggae' && s === 4 && o.drums !== false && ts >= (o.drumFrom ?? -1) - 0.05) {
          a.perc('kick', ts, 1.0 * vel); a.perc('snare', ts, 0.55 * vel); a.perc('hat', ts, 0.4 * vel);
          if (L && L.drum) L.drum.active.push({ t0: ts, t1: ts + 0.35, i: s });
        }
        if (style !== 'reggae' && s % 2 === 0) {
          a.perc('kick', ts, (s % 4 ? 0.45 : 0.75) * vel);
          if (s % 4 === 2) a.perc('snare', ts, 0.4 * vel);
        }
      }
      if (o.bass !== false) BASS[k % 2].forEach(([n, at, len]) => { const tn = t + at * e; if (tn < stop - 0.05) a.note(n, tn, Math.min(len * e, stop - tn), { vel: 0.55 * vel }); });
    }
    const run = (t0, t1, o = {}) => { let t = t0, k = o.k0 ?? 0; const b = o.b ?? B; for (; t < t1 - 0.3; t += 4 * b, k++) bar(t, k, { ...o, stop: t1 }); return Math.min(t, t1); };

    // ---- hook: the full groove from the first frame ----
    lanes(0, S('hook').t1);
    run(0.1, S('hook').t1, { vel: 0.95 });
    a.big('OFF THE BEAT', 0.1, S('hook').t1, { y: 1060, size: 60, ...MONO, color: GOLD });

    // ---- what: skank first, then the one drop joins ----
    const w0 = S('what').t0, tDrop = a.at('what2') - 0.1;
    lanes(w0, S('what').t1, { drumFrom: tDrop - 0.3 });
    run(w0, S('what').t1, { drumFrom: tDrop, vel: 0.95 });
    a.big('THE SKANK', a.w('what', 'skank'), a.at('what2'), { y: 1060, size: 64, ...MONO, color: TEAL });
    a.big('THE ONE DROP', a.w('what2', 'one', 1), S('what').t1, { y: 1060, size: 64, ...MONO, color: PINK });

    // ---- s1: Bob Marley & the Wailers, the one drop ----
    const s10 = S('s1').t0;
    lanes(s10, S('s1').t1);
    run(s10, S('s1').t1, { vel: 0.95 });
    a.big('DRUMS: CARLTON BARRETT', a.w('s1b', 'Carlton'), S('s1').t1, { y: 1060, size: 46, ...MONO, color: PINK });

    // ---- history: ska (fast) -> rocksteady (slower) -> reggae ----
    const HIST = [['SKA', PINK], ['ROCKSTEADY', GOLD], ['REGGAE', TEAL]];
    const gH = a.grid(HIST.map(([l, c], i) => ({ label: l, sub: ['FAST', 'SLOWER', 'LATE 1960s'][i], color: c, size: 44 })), S('s2').t0, S('s4').t1, { rows: 1, cols: 3, cw: 320, chh: 170, y: 470, revealStep: 0.1 });
    const hs = [S('s2').t0, S('s3').t0, S('s4').t0, S('s4').t1];
    hs.slice(0, 3).forEach((t, i) => gH.active.push({ t0: t, t1: hs[i + 1], i }));
    const STEP8 = [...Array(8)].map((_, i) => ({ label: i % 2 ? '&' : String(i / 2 + 1), color: i % 2 ? TEAL : '#7a7a86', size: 34 }));
    [['s2', BK, 'ska'], ['s3', BR, 'rock'], ['s4', B, 'reggae']].forEach(([id, b, style]) => {
      const g = a.grid(STEP8, S(id).t0, S(id).t1, { rows: 1, cols: 8, cw: 120, chh: 130, y: 720, caption: 'CHORDS ON THE AND' });
      SETS.push({ t0: S(id).t0, t1: S(id).t1, step: { active: [] }, chord: g, drum: null });
      run(S(id).t0, S(id).t1, { b, style, vel: 0.9 });
    });
    a.big('+ OFFBEAT HORNS', a.w('s2', 'horns'), S('s2').t1, { y: 1060, size: 52, ...MONO, color: PINK });

    // ---- why1: the empty downbeats, filled in by the ear ----
    const y10 = S('why1').t0, tFill = a.w('why1b', 'fills');
    const DB = [...Array(8)].map((_, i) => (i % 2 ? { label: 'X', color: TEAL, size: 44, sub: '&' } : { label: '?', color: '#7a7a86', size: 44, sub: String(i / 2 + 1) }));
    const gDB = a.grid(DB, y10, S('why1').t1, { rows: 1, cols: 8, cw: 120, chh: 200, y: 560, caption: 'DOWNBEATS: EMPTY' });
    let tt = y10;
    for (let k = 0; tt < S('why1').t1 - 0.3; tt += BAR, k++) {
      bar(tt, k, { drums: false, vel: 0.9, stop: S('why1').t1 });
      for (let s = 0; s < 8; s++) {
        const ts = tt + s * E;
        if (s % 2) gDB.active.push({ t0: ts, t1: ts + 0.22, i: s });
        else if (ts >= tFill - 0.05) gDB.active.push({ t0: ts, t1: ts + 0.25, i: s });
      }
    }
    a.big('EMPTY DOWNBEATS', a.w('why1', 'empty'), tFill, { y: 1000, size: 52, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('THE EAR FILLS THEM IN', tFill, S('why1').t1, { y: 1000, size: 48, ...MONO, color: GOLD });

    // ---- why2: the one drop, beat by beat ----
    const y20 = S('why2').t0;
    const BEATS = [{ label: '1', sub: 'EMPTY', color: '#7a7a86', size: 64 }, { label: '2', color: '#7a7a86', size: 64 }, { label: '3', sub: 'KICK + SNARE', color: PINK, size: 64, subSize: 22 }, { label: '4', color: '#7a7a86', size: 64 }];
    const gB = a.grid(BEATS, y20, S('why2').t1, { rows: 1, cols: 4, cw: 240, chh: 240, y: 520 });
    tt = y20;
    for (let k = 0; tt < S('why2').t1 - 0.3; tt += BAR, k++) { bar(tt, k, { vel: 0.9, stop: S('why2').t1 }); gB.active.push({ t0: tt + 2 * B, t1: tt + 2 * B + 0.4, i: 2 }); }
    a.big('BEAT 1: SILENCE', a.w('why2', 'one'), a.at('why2b'), { y: 900, size: 52, ...MONO, color: '#9a9aa2', blur: 0 });
    a.big('THE DROP IS ON 3', a.w('why2b', 'drop'), S('why2').t1, { y: 900, size: 60, ...MONO, color: PINK });

    // ---- why3: the bass, deep and melodic ----
    const y30 = S('why3').t0;
    const BN = ['A', 'C', 'E', 'G', 'E', 'D', 'F#', 'A', 'G', 'E'];
    const gBass = a.grid([...Array(8)].map((_, i) => ({ label: '', color: ORANGE })), y30, S('why3').t1, { rows: 1, cols: 8, cw: 120, chh: 140, y: 600, caption: 'BASS: DEEP AND MELODIC' });
    const lbl = [];
    tt = y30;
    for (let k = 0; tt < S('why3').t1 - 0.3; tt += BAR, k++) {
      bar(tt, k, { vel: 0.85, stop: S('why3').t1 });
      BASS[k % 2].forEach(([n, at]) => { const tn = tt + at * E; if (tn < S('why3').t1 - 0.1) { gBass.active.push({ t0: tn, t1: tn + 0.5, i: at }); lbl.push([tn, n.replace(/\d/, ''), at]); } });
    }
    lbl.forEach(([t0, n, at], j) => a.big(n, t0, Math.min(t0 + 0.75, S('why3').t1), { x: 540 - 480 + 60 + 120 * at, y: 600 + 70, size: 44, ...MONO, color: '#ffffff', blur: 12 }));
    a.big('IT CARRIES THE TUNE', a.w('why3', 'carries'), S('why3').t1, { y: 1000, size: 48, ...MONO, color: ORANGE });

    // ---- why4: leaning back ----
    const y40 = S('why4').t0;
    lanes(y40, S('why4').t1);
    run(y40, S('why4').t1, { vel: 0.9 });
    a.big('LEANS BACK', a.w('why4', 'leans'), S('why4').t1, { x: 330, y: 1060, size: 56, ...MONO, color: GOLD });
    a.big('NOT PUSHING', a.w('why4', 'pushing'), S('why4').t1, { x: 770, y: 1060, size: 40, ...MONO, color: '#7a7a86', blur: 0 });

    // ---- essence ----
    const e0 = S('essence').t0;
    lanes(e0, S('essence').t1);
    let tEnd = e0;
    for (let k = 0; tEnd + BAR <= S('essence').t1 - 1.8; tEnd += BAR, k++) bar(tEnd, k, { vel: 0.9 });
    a.big('FLOAT', a.w('essence', 'float'), S('essence').t1, { y: 1060, size: 80, ...MONO, color: GOLD });
    a.note('A1', tEnd, 1.6, { vel: 0.5 });
    a.ch('Am', tEnd + E, S('essence').t1 - 0.2, { notes: ['A3', 'C4', 'E4', 'A4'], bass: false, vel: 0.7, hideName: true, shape: false });
    setAt(tEnd + E + 0.01).chord.active.push({ t0: tEnd + E, t1: S('essence').t1, i: 1 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
