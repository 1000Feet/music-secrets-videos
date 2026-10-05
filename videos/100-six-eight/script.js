// 6/8: six quick notes per bar grouped 3 + 3 (two big beats), versus 3/4 grouped 2 + 2 + 2.
// Greensleeves (public domain): first phrase exactly as given in the brief.
// House of the Rising Sun: chords only (no arrangement). Jig and lullaby figures are original.
const E = 0.22, BAR = 6 * E;     // one eighth note, one bar

module.exports = {
  slug: 'six-eight',
  title: '6/8 Time',
  segments: [
    { id: 'hook',    text: 'Count to six, but feel only two... and the music starts to rock.' },
    { id: 'what',    text: "That's six eight: six quick notes per bar, in two groups of three." },
    { id: 'what2',   text: 'Two big beats, each divided in three: one and a, two and a.' },
    { id: 'green',   text: 'You hear it in Greensleeves, an English tune from the sixteenth century.' },
    { id: 'rising',  text: "In The Animals' House of the Rising Sun, from 1964." },
    { id: 'jigs',    text: 'And in Irish jigs, lullabies and boat songs.' },
    { id: 'why1',    text: 'So why does it rock? Three four also has six eighth notes...' },
    { id: 'why2',    text: 'but grouped in twos: one and, two and, three and.' },
    { id: 'why3',    text: 'Six eight groups them in threes: one and a, two and a. Same notes, new feel.' },
    { id: 'why4',    text: 'Two big beats swing like a boat: down, up, down, up.' },
    { id: 'why4b',   text: "That's why lullabies and barcarolles love it." },
    { id: 'why5',    text: 'And each beat, split in three, rolls along, close to a shuffle.' },
    { id: 'why6',    text: 'Musicians call it compound duple: two beats, each made of three.' },
    { id: 'essence', text: 'The same six notes, grouped in threes... and the music starts to rock.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE ROCKING RHYTHM', title: '6/8 TIME', accent: true, circle: false, min: 4 * BAR + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what', 'what2'], label: 'SIX QUICK NOTES', title: '3 + 3', circle: false, gap: 0.35, tail: 0.6 },
    { id: 'green', segs: ['green'], label: 'YOU HEAR IT IN', title: 'Greensleeves', sub: 'English · 16th century · in A minor', circle: false, tail: 2.6 },
    { id: 'rising', segs: ['rising'], label: 'YOU HEAR IT IN', title: 'House of the Rising Sun', sub: 'The Animals · 1964 · in A minor', circle: false, row: ['Am', 'C', 'D', 'F', 'Am', 'C', 'E'], min: 7 * 1.0 + 0.6, tail: 0.6 },
    { id: 'jigs', segs: ['jigs'], label: 'YOU HEAR IT IN', title: 'Jigs & Lullabies', sub: 'Irish jigs · boat songs', circle: false, tail: 2.4 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: '3/4: 2 + 2 + 2', circle: false, gap: 0.3, tail: 0.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: '6/8: 3 + 3', circle: false, tail: 0.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'TWO BIG BEATS', title: 'A ROCKING BOAT', circle: false, gap: 0.3, tail: 0.8 },
    { id: 'why5', segs: ['why5'], label: 'EACH BEAT IN THREE', title: 'ROLLING', circle: false, tail: 0.8 },
    { id: 'why6', segs: ['why6'], label: 'THE NAME', title: 'COMPOUND DUPLE', circle: false, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'GROUPED IN THREES', accent: true, circle: false, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', WHITE = '#ffffff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const LBL = { y: 1110, size: 48, ...MONO };

    // six cells: 6/8 counts 1 & a 2 & a, 3/4 counts 1 & 2 & 3 &
    const C68 = ['1', '&', 'a', '2', '&', 'a'].map((l, i) => ({ label: l, color: i < 3 ? PINK : TEAL, size: i % 3 === 0 ? 64 : 48, sub: i % 3 === 0 ? 'BEAT' : undefined, subSize: 18 }));
    const C34 = ['1', '&', '2', '&', '3', '&'].map((l, i) => ({ label: l, color: [GOLD, BLUE, GREEN][Math.floor(i / 2)], size: i % 2 === 0 ? 64 : 48, sub: i % 2 === 0 ? 'BEAT' : undefined, subSize: 18 }));
    const g68 = (t0, t1, o = {}) => a.grid(C68, t0, t1, { rows: 1, cols: 6, cw: 150, chh: 190, y: o.y ?? 790, caption: o.caption ?? '6/8 · TWO GROUPS OF THREE', ...o });
    const g34 = (t0, t1, o = {}) => a.grid(C34, t0, t1, { rows: 1, cols: 6, cw: 150, chh: 190, y: o.y ?? 500, caption: o.caption ?? '3/4 · THREE GROUPS OF TWO', ...o });

    // one bar. mode '68' (accents on 1 and 4) or '34' (accents on 1, 3, 5).
    // o.chord: [notes] stabbed on the accents; o.bass: bass note on beat one; o.mel: six notes, one per eighth
    function bar(t, mode, o = {}) {
      const e = o.e ?? E, vel = o.vel ?? 1, stop = o.stop ?? Infinity;
      const accs = mode === '68' ? [0, 3] : [0, 2, 4];
      for (let i = 0; i < 6; i++) {
        const tp = t + i * e;
        if (tp > stop - 0.05) break;
        const acc = accs.includes(i);
        if (o.g) o.g.active.push({ t0: tp, t1: tp + e * 0.95, i });
        if (o.hat !== false) a.perc('hat', tp, (acc ? 0.4 : 0.22) * vel);
        if (acc && o.kick !== false) a.perc('kick', tp, (i === 0 ? 0.7 : 0.45) * vel);
        if (o.mel) a.note(o.mel[i], tp, e * (o.legato ?? 0.9), { vel: (acc ? 0.3 : 0.2) * vel });
      }
      if (o.chord) {
        const len = Math.min(6 * e, stop - t), strikes = accs.map(k => ({ o: k * e, v: k ? 0.6 : 1 })).filter(s => s.o < len);
        a.ch(o.name || 'C', t, t + len, { notes: o.chord, bass: o.bass ?? false, vel: 0.5 * vel, strikes, shape: false, hideName: true, row: o.row ?? null });
      }
      return t + 6 * e;
    }
    const run = (t0, t1, mode, list, o = {}) => { let t = t0, k = 0; while (t < t1 - 0.4) { t = bar(t, mode, { ...o, ...list[k % list.length], stop: t1 }); k++; } return t; };

    // harmony pools
    const AM = { chord: ['A3', 'C4', 'E4'], bass: 'A2', name: 'Am' }, DM = { chord: ['A3', 'D4', 'F4'], bass: 'D3', name: 'Dm' };
    const EE = { chord: ['G#3', 'B3', 'E4'], bass: 'E2', name: 'E' }, CC = { chord: ['G3', 'C4', 'E4'], bass: 'C3', name: 'C' };
    // an original rocking figure, six eighths per bar
    const ROCK = [
      { ...AM, mel: ['A4', 'C5', 'E5', 'A4', 'C5', 'E5'] },
      { ...DM, mel: ['A4', 'D5', 'F5', 'A4', 'D5', 'F5'] },
      { ...EE, mel: ['G#4', 'B4', 'E5', 'G#4', 'B4', 'E5'] },
      { ...AM, mel: ['A4', 'C5', 'E5', 'A4', 'C5', 'E5'] },
    ];

    // ---- hook + what: the 6/8 grid rocking, big beats on 1 and 2 ----
    const h68 = g68(0, S('what').t1, { y: 640 });
    const tEnd0 = run(0.25, S('what').t1 - 0.4, '68', ROCK, { g: h68 });
    a.ch('Am', tEnd0, S('what').t1, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.45, shape: false, hideName: true });
    a.big('1  2  3  4  5  6', 0.2, a.w('hook', 'feel'), { y: 1060, size: 56, ...MONO, color: WHITE });
    a.big('ONE ... TWO', a.w('hook', 'feel'), S('hook').t1, { y: 1060, size: 64, ...MONO, color: GOLD });
    a.big('6 NOTES · 2 GROUPS', a.w('what', 'six', 1), a.at('what2'), { y: 1060, size: 52, ...MONO, color: WHITE });
    a.big('1 & a  2 & a', a.w('what2', 'one'), S('what').t1, { y: 1060, size: 64, ...MONO, color: GOLD });

    // ---- Greensleeves (public domain), first phrase as given, in A minor ----
    const gS = S('green'), tG = a.w('green', 'Greensleeves');
    const gGrid = g68(gS.t0, gS.t1, { y: 640, caption: 'TWO BIG BEATS PER BAR' });
    const GE = 0.24;  // eighth note here
    const PHRASE = [['A4', 1], ['C5', 2], ['D5', 1], ['E5', 1.5], ['F5', 0.5], ['E5', 1], ['D5', 2], ['B4', 1], ['G4', 1.5], ['A4', 0.5], ['B4', 1],
      ['C5', 2], ['A4', 1], ['A4', 1.5], ['G#4', 0.5], ['A4', 1], ['B4', 2], ['G#4', 1], ['E4', 3]];
    const g0 = tG + 0.1;               // the pickup A; bar one starts one eighth later
    a.melody(PHRASE, g0, GE, { vel: 0.4 });
    const gb = g0 + GE;
    const GH = [{ ...AM }, { chord: ['G3', 'B3', 'D4'], bass: 'G2', name: 'G' }, { ...AM }, { ...EE }];
    GH.forEach((h, k) => bar(gb + k * 6 * GE, '68', { ...h, e: GE, g: gGrid, vel: 0.7, kick: false }));
    a.ch('E', gb + 3 * 6 * GE + 3 * GE, gb + 4 * 6 * GE, { notes: ['G#3', 'B3', 'E4'], bass: 'E2', vel: 0.35, shape: false, hideName: true });
    a.ch('Am', gb + 4 * 6 * GE, gS.t1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.35, shape: false, hideName: true });
    a.big('ONE ... TWO', tG + 0.3, gS.t1, { ...LBL, color: GOLD });

    // ---- House of the Rising Sun: chords only, one per bar, stabbed on the two big beats ----
    const rS = S('rising'), r0 = rS.t0 + 0.1, rb = (rS.t1 - 0.4 - r0) / 7;
    const rGrid = g68(rS.t0, rS.t1, { y: 640, caption: 'ONE CHORD PER BAR · 3 + 3' });
    const RS = [
      { name: 'Am', chord: ['A3', 'C4', 'E4'], bass: 'A2' }, { name: 'C', chord: ['G3', 'C4', 'E4'], bass: 'C3' },
      { name: 'D', chord: ['A3', 'D4', 'F#4'], bass: 'D3' }, { name: 'F', chord: ['A3', 'C4', 'F4'], bass: 'F2' },
      { name: 'Am', chord: ['A3', 'C4', 'E4'], bass: 'A2' }, { name: 'C', chord: ['G3', 'C4', 'E4'], bass: 'C3' },
      { name: 'E', chord: ['G#3', 'B3', 'E4'], bass: 'E2' },
    ];
    RS.forEach((h, k) => bar(r0 + k * rb, '68', { ...h, e: rb / 6, g: rGrid, row: k, vel: 0.85 }));
    a.ch('E', r0 + 7 * rb, rS.t1, { notes: ['G#3', 'B3', 'E4'], bass: 'E2', vel: 0.3, shape: false, hideName: true, row: 6 });

    // ---- jigs & lullabies: an original jig figure, fast, then a slow rocking bar ----
    const jS = S('jigs'), j0 = jS.t0 + 0.1;
    const jGrid = g68(jS.t0, jS.t1, { y: 640, caption: 'FAST: A JIG · SLOW: A LULLABY' });
    const D = { chord: ['F#3', 'A3', 'D4'], bass: 'D3', name: 'D' }, A7 = { chord: ['G3', 'C#4', 'E4'], bass: 'A2', name: 'A7' }, G = { chord: ['G3', 'B3', 'D4'], bass: 'G2', name: 'G' };
    const JIG = [
      { ...D, mel: ['D5', 'E5', 'F#5', 'A4', 'D5', 'F#5'] }, { ...G, mel: ['G5', 'F#5', 'E5', 'D5', 'B4', 'A4'] },
      { ...D, mel: ['D5', 'E5', 'F#5', 'A4', 'D5', 'F#5'] }, { ...A7, mel: ['E5', 'D5', 'C#5', 'D5', 'D5', 'D5'] },
    ];
    const tLull = a.end('jigs') + 0.1;
    let tj = j0, kj = 0;
    while (tj + 6 * 0.15 <= tLull + 0.3 && kj < 4) { tj = bar(tj, '68', { ...JIG[kj], e: 0.15, g: jGrid, vel: 0.9 }); kj++; }
    // lullaby: one slow, soft rocking bar, then the tonic
    const tl = bar(tj, '68', { ...D, mel: ['D5', 'A4', 'F#4', 'E5', 'A4', 'F#4'], e: 0.3, g: jGrid, vel: 0.6, kick: false, legato: 1.6 });
    a.ch('D', tl, jS.t1, { notes: ['F#3', 'A3', 'D4'], bass: 'D2', vel: 0.35, shape: false, hideName: true });
    a.big('JIG', j0, tj, { ...LBL, size: 60, color: PINK });
    a.big('LULLABY', tj, jS.t1, { ...LBL, size: 60, color: TEAL });

    // ---- why1 + why2: 3/4, the same six eighths grouped in twos ----
    const yS = S('why1');
    const y34 = g34(yS.t0, S('why3').t1), y68 = g68(yS.t0, S('why3').t1);
    // three four: a waltz, bass on one, chords on two and three
    const W34 = [{ ...AM, mel: ['A4', 'C5', 'E5', 'A4', 'C5', 'E5'] }, { ...DM, mel: ['A4', 'D5', 'F5', 'A4', 'D5', 'F5'] }];
    const tW = a.w('why1', 'Three');
    run(tW, yS.t1, '34', W34, { g: y34, vel: 0.85 });
    a.big('2 + 2 + 2', a.w('why2', 'twos'), yS.t1, { ...LBL, size: 64, color: GOLD });
    a.big('SIX EIGHTHS', a.w('why1', 'six'), a.w('why2', 'twos'), { ...LBL, color: WHITE });

    // ---- why3: 6/8, same six notes, accents on 1 and 4 ----
    const zS = S('why3');
    run(zS.t0 + 0.05, zS.t1, '68', W34, { g: y68, vel: 0.85 });
    a.big('3 + 3', a.w('why3', 'threes'), a.w('why3', 'Same'), { ...LBL, size: 64, color: PINK });
    a.big('SAME NOTES, NEW FEEL', a.w('why3', 'Same'), zS.t1, { ...LBL, color: GOLD });

    // ---- why4: a rocking boat - two big beats, down and up ----
    const bS = S('why4'), b0 = bS.t0 + 0.1;
    const bGrid = g68(bS.t0, bS.t1, { y: 500, caption: 'TWO BIG BEATS' });
    const LULL = [
      { ...AM, mel: ['A4', 'E4', 'C4', 'B4', 'E4', 'C4'] }, { ...EE, mel: ['G#4', 'E4', 'B3', 'B4', 'E4', 'B3'] },
      { ...AM, mel: ['C5', 'E4', 'A3', 'B4', 'E4', 'G#3'] }, { ...AM, mel: ['A4', 'E4', 'C4', 'A4', 'E4', 'C4'] },
    ];
    const LE = 0.3;
    const boat = a.grid([{ label: 'DOWN', color: PINK, size: 56 }, { label: 'UP', color: TEAL, size: 56 }], bS.t0, bS.t1,
      { rows: 1, cols: 2, cw: 450, chh: 170, y: 780, caption: 'BEAT 1 · BEAT 2' });
    let tb = b0, kb = 0;
    for (; tb < bS.t1 - 0.5; kb++) {
      const h = LULL[kb % LULL.length];
      bar(tb, '68', { ...h, e: LE, g: bGrid, vel: 0.65, kick: false, legato: 1.5, stop: bS.t1 });
      // the boat: DOWN on beat one, UP on beat two
      boat.active.push({ t0: tb, t1: Math.min(tb + 3 * LE, bS.t1), i: 0 }, { t0: tb + 3 * LE, t1: Math.min(tb + 6 * LE, bS.t1), i: 1 });
      tb += 6 * LE;
    }

    // ---- why5: each beat split in three - rolling, close to a shuffle ----
    const sS = S('why5');
    const sGrid = g68(sS.t0, sS.t1, { y: 640, caption: 'LONG · SHORT  LONG · SHORT' });
    // shuffle-like: on each beat, play the 1st and 3rd of the three (long-short), the middle ghosted
    const SH = [{ ...AM, mel: ['A3', 'A3', 'C4', 'A3', 'A3', 'E4'] }, { ...DM, mel: ['D3', 'D3', 'F3', 'D3', 'D3', 'A3'] }];
    let ts = sS.t0 + 0.1, ks = 0;
    const se = 0.18;
    while (ts < sS.t1 - 0.4) {
      const h = SH[ks % SH.length];
      for (let i = 0; i < 6; i++) {
        const tp = ts + i * se;
        if (tp > sS.t1 - 0.1) break;
        sGrid.active.push({ t0: tp, t1: tp + se * 0.95, i });
        if (i % 3 !== 1) { a.note(h.mel[i], tp, se * (i % 3 ? 0.9 : 1.8), { vel: i % 3 ? 0.22 : 0.3 }); a.perc('hat', tp, i % 3 ? 0.3 : 0.45); }
        else a.perc('hat', tp, 0.1);
        if (i % 3 === 0) a.perc(i ? 'snare' : 'kick', tp, 0.5);
      }
      a.ch(h.name, ts, Math.min(ts + 6 * se, sS.t1), { notes: h.chord, bass: false, vel: 0.35, strikes: [{ o: 0, v: 1 }, { o: 3 * se, v: 0.6 }], shape: false, hideName: true });
      ts += 6 * se; ks++;
    }
    a.big('ROLLING', a.w('why5', 'rolls'), a.w('why5', 'shuffle'), { ...LBL, color: PINK });
    a.big('≈ SHUFFLE', a.w('why5', 'shuffle'), sS.t1, { ...LBL, color: GOLD });

    // ---- why6: compound duple - two beats on top, each made of three below ----
    const cS = S('why6');
    const two = a.grid([{ label: 'BEAT 1', color: PINK, size: 52 }, { label: 'BEAT 2', color: TEAL, size: 52 }], cS.t0, cS.t1,
      { rows: 1, cols: 2, cw: 450, chh: 170, y: 520, caption: 'DUPLE · TWO BEATS' });
    const six = g68(cS.t0, cS.t1, { y: 780, caption: 'COMPOUND · EACH MADE OF THREE' });
    const tTwo = a.w('why6', 'two'), tThree = a.w('why6', 'three');
    let tc = cS.t0 + 0.15, kc = 0;
    while (tc < cS.t1 - 0.4) {
      const h = ROCK[kc % ROCK.length];
      bar(tc, '68', { ...h, e: 0.24, g: six, vel: 0.75, stop: cS.t1 });
      two.active.push({ t0: tc, t1: tc + 3 * 0.24, i: 0 }, { t0: tc + 3 * 0.24, t1: tc + 6 * 0.24, i: 1 });
      tc += 6 * 0.24; kc++;
    }
    a.big('2 BEATS × 3', tTwo, cS.t1, { ...LBL, y: 1120, color: GOLD });
    void tThree;

    // ---- essence: 3/4 dims, 6/8 rocks, a final chord ----
    const eS = S('essence'), e0 = eS.t0 + 0.1;
    const e68 = g68(eS.t0, eS.t1, { y: 640 });
    const eEnd = run(e0, a.at('cta') + 0.3, '68', ROCK, { g: e68 });
    a.ch('Am', eEnd, eS.t1 - 0.2, { notes: ['E3', 'A3', 'C4', 'E4', 'A4'], bass: 'A1', vel: 0.75, shape: false, hideName: true });
    a.perc('kick', eEnd, 0.9);
    e68.active.push({ t0: eEnd, t1: eS.t1, i: 0 });
    a.big('1 & a  2 & a', a.w('essence', 'threes'), eS.t1, { y: 1060, size: 64, ...MONO, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
    void GREY;
  },
};
