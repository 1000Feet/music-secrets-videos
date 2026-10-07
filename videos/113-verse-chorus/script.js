// Verse, pre-chorus, chorus: tell a little, build a little, then give the hook.
// Smells Like Teen Spirit is copyrighted: its scenes play only GENERIC quiet/build/loud textures on
// generic chords (not the song's chords, riff or melody). The verse and chorus motifs are ORIGINAL.
const B = 0.3;   // one beat of the demo
// original motifs: a low, narrow verse line (over Am, F) and a higher chorus line (over C, G, Am, F)
const VERSE_M = [[['E4', 1], ['E4', 0.5], ['D4', 0.5], ['C4', 1], ['A3', 1]], [['C4', 1], ['C4', 0.5], ['A3', 0.5], ['C4', 1], ['D4', 1]]];
const CHORUS_M = [[['E5', 1], ['D5', 0.5], ['C5', 0.5], ['D5', 1], ['E5', 1]], [['D5', 1], ['D5', 0.5], ['B4', 0.5], ['G4', 2]],
  [['C5', 1], ['C5', 0.5], ['B4', 0.5], ['A4', 1], ['E5', 1]], [['F5', 1], ['E5', 0.5], ['D5', 0.5], ['C5', 2]]];

module.exports = {
  slug: 'verse-chorus',
  title: 'Verse, Pre-Chorus, Chorus',
  segments: [
    { id: 'hook',    text: 'Quiet. Building. Loud. Then do it all again.' },
    { id: 'what',    text: "That's the verse, pre-chorus, chorus structure behind most modern pop and rock songs." },
    { id: 'teen',    text: 'You hear it in Smells Like Teen Spirit: quiet verses, a building pre-chorus, a loud chorus.' },
    { id: 'teen2',   text: "Kurt Cobain said he was trying to rip off the Pixies' quiet-loud dynamics." },
    { id: 'pop',     text: 'And most chart pop since the sixties uses some version of it.' },
    { id: 'why1',    text: 'So why does it work? The verse tells the story: same melody, new words each time.' },
    { id: 'why2',    text: 'The pre-chorus builds tension, on chords that lean toward the chorus.' },
    { id: 'why3a',   text: 'Then the chorus: same words and melody every time.' },
    { id: 'why3b',   text: 'It carries the hook, and often the title.' },
    { id: 'why4',    text: "It's the energy peak: a higher melody, a fuller arrangement, landing on the home chord." },
    { id: 'why5',    text: 'A bridge adds contrast before the final chorus.' },
    { id: 'why6',    text: 'And repeating the chorus is what makes the song memorable.' },
    { id: 'essence', text: 'Tell a little, build a little, then give the hook... and repeat until everyone sings along.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE POP SONG MAP', title: 'VERSE · CHORUS', accent: true, circle: false, tonic: 0, min: 6.8 },
    { id: 'what', segs: ['what'], label: 'THE STRUCTURE', title: 'THE SONG MAP', circle: false, tonic: 0, min: 0.2 + 8 * 0.8 + 0.8, tail: 0.6 },
    { id: 'teen', segs: ['teen'], label: 'YOU HEAR IT IN', title: 'Smells Like Teen Spirit', sub: 'Nirvana · 1991', circle: false, tonic: 4, tail: 1.2 },
    { id: 'teen2', segs: ['teen2'], label: 'YOU HEAR IT IN', title: 'Smells Like Teen Spirit', sub: 'Nirvana · 1991', circle: false, tonic: 4, tail: 1.6 },
    { id: 'pop', segs: ['pop'], label: 'YOU HEAR IT IN', title: 'Chart Pop', sub: 'since the 1960s', circle: false, tonic: 0, tail: 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE VERSE', circle: false, tonic: 9, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE PRE-CHORUS', tonic: 0, tail: 1.0 },
    { id: 'why3', segs: ['why3a', 'why3b'], label: 'WHY IT WORKS', title: 'THE CHORUS', circle: false, tonic: 0, gap: 0.3, min: 0.15 + 3 * 8 * 0.28 + 0.6, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'THE ENERGY PEAK', circle: false, tonic: 0, tail: 1.4 },
    { id: 'why5', segs: ['why5'], label: 'FOR CONTRAST', title: 'THE BRIDGE', circle: false, tonic: 0, tail: 2.0 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT STICKS', title: 'REPETITION', circle: false, tonic: 0, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'GIVE THE HOOK', accent: true, circle: false, tonic: 0, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const BLUE = '#62a8ff', GOLD = '#ffcf5a', PINK = '#ff7a93', TEAL = '#45d6c8', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const mix = (c1, c2, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const x = p(c1), y = p(c2); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
    const SEC = { V: ['VERSE', BLUE], PC: ['PRE', GOLD], C: ['CHORUS', PINK], B: ['BRIDGE', TEAL] };
    const LEVEL = { V: 3, PC: 6, C: 10, B: 5 };

    // ---------- grids ----------
    const MAP = ['V', 'PC', 'C', 'V', 'PC', 'C', 'B', 'C'];
    const songMap = (t0, t1, o = {}) => a.grid(MAP.map(k => ({ label: k, sub: SEC[k][0], color: SEC[k][1], size: 54, subSize: 18 })), t0, t1,
      { rows: 1, cols: 8, cw: 122, chh: 170, y: o.y ?? 470, revealStep: o.reveal ?? 0.05 });
    const three = (t0, t1, subs, o = {}) => a.grid([['VERSE', BLUE], ['PRE-CHORUS', GOLD], ['CHORUS', PINK]].map(([l, c], i) => ({ label: l, sub: subs[i], color: c, size: l.length > 6 ? 36 : 48, subSize: 22 })),
      t0, t1, { rows: 1, cols: 3, cw: 310, chh: o.chh ?? 210, y: o.y ?? 470, revealStep: o.reveal ?? 0.08 });
    const meter = (t0, t1, o = {}) => a.grid(Array.from({ length: 10 }, (_, i) => ({ label: '', color: mix(BLUE, PINK, i / 9) })), t0, t1,
      { rows: 1, cols: 10, cw: 84, chh: 70, y: o.y ?? 760, caption: 'ENERGY' });
    // light the meter up to level l0 -> l1 (ramps in steps) between t0 and t1
    const level = (g, t0, t1, l0, l1 = l0) => {
      const n = Math.max(1, Math.abs(l1 - l0) + 1);
      for (let s = 0; s < n; s++) {
        const l = l0 + Math.sign(l1 - l0) * s, ts = t0 + s * (t1 - t0) / n, te = s === n - 1 ? t1 : t0 + (s + 1) * (t1 - t0) / n;
        for (let i = 0; i < l; i++) g.active.push({ t0: ts, t1: te, i });
      }
    };

    // ---------- music: one bar of each section texture ----------
    function bar(type, name, t, L, o = {}) {
      const bb = L / 4, v = o.vel ?? 1;
      if (type === 'V') {          // quiet: soft arpeggio, soft kick
        const ev = a.ch(name, t, t + L, { bass: false, mute: true, shape: false, hideName: true });
        const pat = [ev.notes[0] - 12, ev.notes[1] - 12, ev.notes[2] - 12, ev.notes[1] - 12, ev.notes[0], ev.notes[2] - 12, ev.notes[1] - 12, ev.notes[2] - 12];
        pat.forEach((m, k) => a.note(m, t + k * bb / 2, bb * 0.9, { vel: 0.17 * v, show: false }));
        a.note(36 + ev.root, t, L * 0.95, { vel: 0.2 * v, show: false });
        a.perc('kick', t, 0.3 * v); a.perc('kick', t + 2 * bb, 0.2 * v);
      } else if (type === 'PC') {  // building: pulsing eighths, crescendo, snare on 2 and 4
        const k0 = o.k ?? 0;
        a.ch(name, t, t + L, { vel: (0.4 + 0.12 * k0) * v, hideName: !o.shape, shape: o.shape ?? false,
          strikes: Array.from({ length: 8 }, (_, k) => ({ o: k * bb / 2, v: 0.55 + 0.45 * k / 7 })) });
        for (let k = 0; k < 4; k++) a.perc('kick', t + k * bb, (0.35 + 0.1 * k0) * v);
        a.perc('snare', t + bb, (0.3 + 0.1 * k0) * v); a.perc('snare', t + 3 * bb, (0.35 + 0.1 * k0) * v);
        if (o.roll) for (let k = 0; k < 4; k++) a.perc('snare', t + 3 * bb + k * bb / 4, (0.3 + 0.12 * k) * v);
      } else if (type === 'C') {   // loud: full strums, backbeat, hats
        a.ch(name, t, t + L, { vel: 0.95 * v, hideName: true, shape: o.shape ?? false, notes: o.notes,
          strikes: [0, 1, 1.5, 2, 3, 3.5].map((x, k) => ({ o: x * bb, v: k % 3 ? 0.6 : 1 })) });
        a.perc('kick', t, 0.9 * v); a.perc('kick', t + 1.5 * bb, 0.5 * v); a.perc('kick', t + 2 * bb, 0.8 * v);
        a.perc('snare', t + bb, 0.75 * v); a.perc('snare', t + 3 * bb, 0.8 * v);
        for (let k = 0; k < 8; k++) a.perc('hat', t + k * bb / 2, (k % 2 ? 0.3 : 0.45) * v);
      } else if (type === 'B') {   // bridge: half-time, sustained
        a.ch(name, t, t + L, { vel: 0.6 * v, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: 2 * bb, v: 0.5 }] });
        a.perc('kick', t, 0.6 * v); a.perc('snare', t + 2 * bb, 0.55 * v);
        for (let k = 0; k < 4; k++) a.perc('hat', t + k * bb, 0.25 * v);
      }
    }
    // a section: chords spread evenly over t0..t1
    const section = (type, chords, t0, t1, o = {}) => {
      const L = (t1 - t0) / chords.length;
      chords.forEach((c, i) => bar(type, c, t0 + i * L, L, { ...o, k: i, roll: o.roll && i === chords.length - 1 }));
    };
    const melody = (bars, t0, b, o = {}) => { let t = t0; bars.forEach(bar => bar.forEach(([n, d]) => { a.note(n, t, d * b * 0.92, { vel: o.vel ?? 0.38, show: false }); t += d * b; })); return t; };
    const PROG = { V: ['Am', 'F'], PC: ['F', 'G'], C: ['C', 'G', 'Am', 'F'], B: ['Dm', 'Em', 'F', 'G'] };
    const hit = (t, t1, v = 0.9) => { a.ch('C', t, t1, { notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: v, hideName: true, shape: false }); a.perc('kick', t, 0.9); a.perc('snare', t, 0.6); };

    // ---------- hook: quiet, building, loud ----------
    const tB = a.w('hook', 'Building') - 0.05, tL = a.w('hook', 'Loud') - 0.05, tAg = a.w('hook', 'again') - 0.05;
    const gH = three(0.05, S('hook').t1, ['QUIET', 'BUILDING', 'LOUD'], { reveal: 0.04 });
    const mH = meter(0.05, S('hook').t1);
    gH.active.push({ t0: 0.25, t1: tB, i: 0 }, { t0: tB, t1: tL, i: 1 }, { t0: tL, t1: S('hook').t1, i: 2 });
    section('V', ['Am'], 0.25, tB); section('PC', ['F', 'G'], tB, tL, { roll: true });
    const hb = 4 * B * 1.1;
    section('C', ['C', 'G', 'Am', 'F'].slice(0, Math.max(1, Math.round((S('hook').t1 - 0.4 - tL) / hb))), tL, S('hook').t1 - 0.4);
    hit(S('hook').t1 - 0.4, S('hook').t1);
    level(mH, 0.25, tB, 3); level(mH, tB, tL, 4, 7); level(mH, tL, S('hook').t1, 10);
    a.big('AND AGAIN', tAg, S('hook').t1, { y: 980, size: 56, ...MONO, color: PINK, blur: 10 });

    // ---------- what: the whole map, fast-forward ----------
    const w0 = S('what').t0 + 0.2, wl = 0.8;
    const gW = songMap(S('what').t0 + 0.05, S('what').t1);
    const mW = meter(S('what').t0 + 0.05, S('what').t1);
    MAP.forEach((k, i) => {
      const t = w0 + i * wl, ch = k === 'C' ? (i === 7 ? ['C', 'C'] : ['C', 'G']) : PROG[k].slice(0, 2);
      section(k, ch, t, t + wl, { roll: k === 'PC', vel: k === 'C' ? 0.85 : 1 });
      gW.active.push({ t0: t, t1: t + wl, i });
      if (k === 'PC') level(mW, t, t + wl, 5, 7); else level(mW, t, t + wl, LEVEL[k]);
    });
    hit(w0 + 8 * wl, S('what').t1, 0.7);
    a.big('POP · ROCK', a.w('what', 'pop') - 0.05, S('what').t1, { y: 980, size: 52, ...MONO, color: '#ffffff', blur: 0 });

    // ---------- Teen Spirit: quiet / build / loud (generic textures and chords only) ----------
    const tq = a.w('teen', 'quiet') - 0.05, tb = a.w('teen', 'building') - 0.05, tl = a.w('teen', 'loud') - 0.05;
    const gT = three(S('teen').t0 + 0.05, S('teen2').t1, ['QUIET', 'BUILDING', 'LOUD'], { chh: 170 });
    const mT = meter(S('teen').t0 + 0.05, S('teen2').t1, { y: 700 });
    gT.active.push({ t0: tq, t1: tb, i: 0 }, { t0: tb, t1: tl, i: 1 }, { t0: tl, t1: S('teen').t1, i: 2 });
    section('V', ['Em', 'C'], S('teen').t0 + 0.1, tb);
    section('PC', ['Am', 'B'], tb, tl, { roll: true });
    section('C', ['Em', 'C', 'G', 'D'], tl, S('teen').t1);
    level(mT, S('teen').t0 + 0.1, tb, 3); level(mT, tb, tl, 4, 7); level(mT, tl, S('teen').t1, 10);
    // Cobain and the Pixies: quiet, then loud
    const tQL = a.w('teen2', 'quietloud') - 0.05, tLoud = tQL + 0.7;
    a.big('KURT COBAIN', a.w('teen2', 'Kurt') - 0.05, S('teen2').t1, { y: 880, size: 50, ...MONO, color: '#ffffff', blur: 0 });
    a.big('THE PIXIES', a.w('teen2', "Pixies'") - 0.05, S('teen2').t1, { y: 950, size: 50, ...MONO, color: GOLD, blur: 0 });
    a.big('quiet', tQL, S('teen2').t1, { x: 330, y: 1070, size: 44, color: GREY, blur: 0 });
    a.big('LOUD', tLoud, S('teen2').t1, { x: 680, y: 1070, size: 96, color: PINK, blur: 30 });
    section('V', ['Em', 'C', 'Em', 'C'].slice(0, Math.max(1, Math.round((tLoud - S('teen2').t0) / (4 * B)))), S('teen2').t0, tLoud);
    gT.active.push({ t0: S('teen2').t0, t1: tLoud, i: 0 }, { t0: tLoud, t1: S('teen2').t1, i: 2 });
    level(mT, S('teen2').t0, tLoud, 3);
    section('C', ['Em', 'C', 'G', 'D'], tLoud, S('teen2').t1 - 0.4);
    a.ch('Em', S('teen2').t1 - 0.4, S('teen2').t1, { notes: ['E3', 'B3', 'E4', 'G4'], bass: 'E2', vel: 0.9, hideName: true, shape: false });
    level(mT, tLoud, S('teen2').t1, 10);

    // ---------- chart pop since the 1960s ----------
    const DEC = ["60s", "70s", "80s", "90s", "00s", "10s", "20s"];
    const gP = a.grid(DEC.map((d, i) => ({ label: d, size: 40, color: mix(BLUE, PINK, i / 6) })), S('pop').t0 + 0.05, S('pop').t1,
      { rows: 1, cols: 7, cw: 136, chh: 150, y: 520, revealStep: 0.05 });
    const tS = a.w('pop', 'sixties') - 0.05;
    DEC.forEach((_, i) => gP.active.push({ t0: tS + i * 0.25, t1: S('pop').t1, i }));
    a.big('SOME VERSION OF IT', a.w('pop', 'version') - 0.05, S('pop').t1, { y: 820, size: 46, ...MONO, color: '#ffffff', blur: 0 });
    section('C', ['C', 'G', 'Am', 'F'], S('pop').t0 + 0.1, S('pop').t1 - 0.4, { vel: 0.7 });
    melody(CHORUS_M, S('pop').t0 + 0.1, (S('pop').t1 - 0.5 - S('pop').t0) / 16, { vel: 0.3 });
    hit(S('pop').t1 - 0.4, S('pop').t1, 0.7);

    // ---------- why1: the verse - same melody, new words ----------
    const v0 = a.w('why1', 'verse') - 0.1, vb = Math.min(4 * B, (S('why1').t1 - v0 - 0.3) / 4);
    const gV = a.grid([{ label: 'VERSE 1', sub: 'WORDS #1', color: BLUE, size: 48, subSize: 22 }, { label: 'VERSE 2', sub: 'WORDS #2', color: TEAL, size: 48, subSize: 22 }],
      S('why1').t0 + 0.05, S('why1').t1, { rows: 1, cols: 2, cw: 420, chh: 220, y: 480, revealStep: 0.15, caption: 'SAME MELODY · NEW WORDS' });
    section('V', ['Am', 'F'], S('why1').t0 + 0.1, v0, { vel: 0.7 });
    [0, 1].forEach(r => {
      const t = v0 + r * 2 * vb;
      section('V', ['Am', 'F'], t, t + 2 * vb);
      melody(VERSE_M, t, vb / 4, { vel: 0.4 });
      gV.active.push({ t0: t, t1: t + 2 * vb, i: r });
    });
    a.ch('Am', v0 + 4 * vb, S('why1').t1, { notes: ['A3', 'C4', 'E4'], bass: 'A2', vel: 0.4, hideName: true, shape: false });
    a.big('SAME MELODY', a.w('why1', 'same') - 0.05, S('why1').t1, { y: 860, size: 56, color: BLUE, blur: 14 });
    a.big('NEW WORDS', a.w('why1', 'new') - 0.05, S('why1').t1, { y: 960, size: 56, color: TEAL, blur: 14 });

    // ---------- why2: the pre-chorus leans toward the chorus (on the circle) ----------
    a.scale(S('why2').t0, 'C', a.T.MAJOR, { popIn: { t0: S('why2').t0 + 0.1, step: 0.05 } });
    const p0 = S('why2').t0 + 0.15, p1 = S('why2').t1 - 0.05, pl = (p1 - p0) / 4;
    ['F', 'G', 'F', 'G'].forEach((c, i) => bar('PC', c, p0 + i * pl, pl, { k: i, shape: true, roll: i === 3 }));
    a.tag(0, a.w('why2', 'tension') - 0.05, a.w('why2', 'lean') - 0.05, 'TENSION', { x: 540, y: 462, color: GOLD });
    a.tag(0, a.w('why2', 'lean') - 0.05, S('why2').t1, 'LEANS TO THE CHORUS', { x: 540, y: 462, color: PINK });
    a.ghost('C', a.w('why2', 'lean') - 0.05, S('why2').t1, { color: PINK });
    a.arc('G', 'C', a.w('why2', 'lean') - 0.05, S('why2').t1, { steps: 5, color: PINK });

    // ---------- why3: the chorus - same words, same melody, every time ----------
    const c0 = S('why3').t0 + 0.15, cb = 0.28, cl = 8 * cb;
    const gC = a.grid([1, 2, 3].map(n => ({ label: 'CHORUS', sub: 'SAME WORDS · SAME TUNE', color: PINK, size: 44, subSize: 18 })), S('why3').t0 + 0.05, S('why3').t1,
      { rows: 3, cols: 1, cw: 680, chh: 120, y: 450, revealStep: 0.12 });
    [0, 1, 2].forEach(r => {
      const t = c0 + r * cl;
      section('C', ['C', 'G'], t, t + cl, { vel: 0.75 });
      melody(CHORUS_M.slice(0, 2), t, cb, { vel: 0.4 });
      gC.active.push({ t0: t, t1: r === 2 ? S('why3').t1 : t + cl, i: r });
    });
    hit(c0 + 3 * cl, S('why3').t1, 0.65);
    a.big('THE HOOK', a.w('why3b', 'hook') - 0.05, S('why3').t1, { y: 930, size: 76, color: PINK, blur: 26 });
    a.big('OFTEN THE TITLE', a.w('why3b', 'title') - 0.05, S('why3').t1, { y: 1040, size: 44, ...MONO, color: '#ffffff', blur: 0 });

    // ---------- why4: the energy peak, landing on the home chord ----------
    const gE = a.grid([['HIGHER MELODY', BLUE, 'higher'], ['FULLER ARRANGEMENT', GOLD, 'fuller'], ['HOME CHORD', PINK, 'home']].map(([l, c]) => ({ label: l, color: c, size: 42 })),
      S('why4').t0 + 0.05, S('why4').t1, { rows: 3, cols: 1, cw: 760, chh: 112, y: 450, revealStep: 0.1 });
    ['higher', 'fuller', 'home'].forEach((w, i) => gE.active.push({ t0: a.w('why4', w) - 0.05, t1: S('why4').t1, i }));
    const mE = meter(S('why4').t0 + 0.05, S('why4').t1, { y: 860 });
    const tHome = a.w('why4', 'home') - 0.05, e0 = S('why4').t0 + 0.1;
    section('C', ['C', 'G', 'Am', 'F'], e0, tHome);
    melody(CHORUS_M, e0, (tHome - e0) / 16, { vel: 0.42 });
    hit(tHome, S('why4').t1, 1.0);
    a.note('C5', tHome, 1.6, { vel: 0.4, show: false });
    level(mE, e0, S('why4').t1, 10);

    // ---------- why5: the bridge, then the final chorus ----------
    const gB = songMap(S('why5').t0 + 0.05, S('why5').t1, { reveal: 0.02 });
    const tBr = a.w('why5', 'bridge') - 0.05, tFin = a.w('why5', 'final') - 0.05;
    gB.active.push({ t0: tBr, t1: tFin, i: 6 }, { t0: tFin, t1: S('why5').t1, i: 7 });
    const mB = meter(S('why5').t0 + 0.05, S('why5').t1);
    section('C', ['F'], S('why5').t0 + 0.05, tBr, { vel: 0.6 });
    section('B', PROG.B, tBr, tFin);
    level(mB, S('why5').t0 + 0.05, tBr, 8); level(mB, tBr, tFin, 5);
    section('C', ['C', 'G', 'Am', 'F'].slice(0, Math.max(1, Math.round((S('why5').t1 - 0.5 - tFin) / (4 * B * 1.1)))), tFin, S('why5').t1 - 0.5);
    hit(S('why5').t1 - 0.5, S('why5').t1);
    level(mB, tFin, S('why5').t1, 10);
    a.big('CONTRAST', a.w('why5', 'contrast') - 0.05, tFin, { y: 980, size: 64, color: TEAL, blur: 18 });
    a.big('FINAL CHORUS', tFin, S('why5').t1, { y: 980, size: 64, color: PINK, blur: 18 });

    // ---------- why6: repetition makes it memorable ----------
    const gR = songMap(S('why6').t0 + 0.05, S('why6').t1, { reveal: 0.02 });
    const r0 = S('why6').t0 + 0.1, rl = (S('why6').t1 - r0 - 0.5) / 4;
    section('C', ['C', 'G', 'Am', 'F'], r0, r0 + 4 * rl, { vel: 0.8 });
    melody(CHORUS_M, r0, rl / 4, { vel: 0.4 });
    hit(r0 + 4 * rl, S('why6').t1, 0.8);
    const tRep = a.w('why6', 'repeating') - 0.05;
    [2, 5, 7].forEach((i, k) => gR.active.push({ t0: tRep + k * 0.3, t1: S('why6').t1, i }));
    a.big('× 3', tRep + 0.6, S('why6').t1, { y: 800, size: 110, color: PINK, blur: 30 });
    a.big('MEMORABLE', a.w('why6', 'memorable') - 0.05, S('why6').t1, { y: 980, size: 64, color: '#ffffff', blur: 16 });

    // ---------- essence: tell, build, give the hook, repeat ----------
    const tT = a.w('essence', 'Tell') - 0.05, tBu = a.w('essence', 'build') - 0.05, tG = a.w('essence', 'give') - 0.05, tR = a.w('essence', 'repeat') - 0.05, tAl = a.w('essence', 'along') - 0.05;
    const gX = three(S('essence').t0 + 0.05, S('essence').t1, ['TELL A LITTLE', 'BUILD A LITTLE', 'GIVE THE HOOK']);
    const mX = meter(S('essence').t0 + 0.05, S('essence').t1);
    gX.active.push({ t0: tT, t1: tBu, i: 0 }, { t0: tBu, t1: tG, i: 1 }, { t0: tG, t1: S('essence').t1, i: 2 });
    section('V', ['Am', 'F'], S('essence').t0 + 0.1, tBu);
    section('PC', ['F', 'G'], tBu, tG, { roll: true });
    const xEnd = tAl + 0.6;
    section('C', ['C', 'G', 'Am', 'F', 'C', 'G'].slice(0, Math.max(2, Math.round((xEnd - tG) / (4 * B * 1.1)))), tG, xEnd);
    melody(CHORUS_M, tG, (xEnd - tG) / 16, { vel: 0.36 });
    hit(xEnd, S('essence').t1 - 0.3, 0.85);
    level(mX, S('essence').t0 + 0.1, tBu, 3); level(mX, tBu, tG, 4, 7); level(mX, tG, S('essence').t1, 10);
    a.big('REPEAT', tR, S('essence').t1, { y: 980, size: 60, ...MONO, color: PINK, blur: 12 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
