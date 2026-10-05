// The James Bond chord: Em(maj9) - a minor chord with a major seventh that never resolves.
// Copyrighted theme: no melody, no guitar riff - only generic chords (the vamp's chord line and the final chord).
const B = 0.5;   // slow pulse

module.exports = {
  slug: 'bond-chord',
  title: 'The James Bond Chord',
  segments: [
    { id: 'hook',    text: 'One chord instantly sounds like a spy movie. It ends the James Bond Theme.' },
    { id: 'what',    text: 'Take E minor, then add a major seventh and a ninth: E, G, B, D sharp, F sharp.' },
    { id: 'what2',   text: 'E minor major nine.' },
    { id: 'theme',   text: 'The theme was written by Monty Norman, arranged by John Barry, and first heard in Dr. No, in 1962.' },
    { id: 'vamp',    text: 'Underneath, a line creeps inside E minor: B rises to C, C sharp, then back to C.' },
    { id: 'vamp2',   text: 'A minor line cliché.' },
    { id: 'why1',    text: 'So why does it sound so dangerous? E minor alone is dark.' },
    { id: 'why2',    text: 'Add D sharp: a major seventh, just a half step below the root.' },
    { id: 'why3',    text: 'A leading tone. It wants to resolve up to E... and it never does.' },
    { id: 'why3b',   text: 'Permanent tension.' },
    { id: 'why4',    text: 'Add F sharp, the ninth, and it turns lush and wide. Dark, elegant, suspicious.' },
    { id: 'why5',    text: 'And that line, B, C, C sharp, C, creeps by half steps, like someone sneaking around.' },
    { id: 'why6',    text: 'Film noir and spy music love this minor major seventh sound.' },
    { id: 'essence', text: 'A minor chord with a note that refuses to resolve. Danger, style and suspense in one sound.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE FINAL CHORD', title: 'THE BOND CHORD', accent: true, tonic: 4, tail: 1.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'E · G · B · D# · F#', title: 'Em(maj9)', tonic: 4, gap: 0.4, tail: 1.0 },
    { id: 'theme', segs: ['theme'], label: 'YOU HEAR IT IN', title: 'James Bond Theme', sub: 'Monty Norman · arr. John Barry · 1962', tonic: 4, tail: 1.9 },
    { id: 'vamp', segs: ['vamp', 'vamp2'], label: 'THE VAMP UNDERNEATH', title: 'B · C · C# · C', tonic: 4, row: ['Em', 'Em(#5)', 'Em6', 'Em(#5)'], gap: 0.3, tail: 1.9 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'A DARK CHORD', tonic: 4, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE MAJOR SEVENTH', tonic: 4, tail: 0.5 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'NEVER RESOLVES', tonic: 4, gap: 0.4, tail: 0.8 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'THE NINTH', tonic: 4, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'SNEAKING AROUND', tonic: 4, tail: 0.9 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'FILM NOIR & SPIES', tonic: 4, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'DANGER IN ONE SOUND', accent: true, tonic: 4, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 46, ...MONO, ...o });
    const spell = (p, t0, t1, col = '#ffffff') => a.tag(p, t0, t1, p, { dr: 58, color: col });
    const BOND = ['E3', 'G3', 'B3', 'D#4', 'F#4'];
    // the final chord, with a slow shimmer of repeated soft strikes
    const bond = (t0, t1, o = {}) => {
      const len = t1 - t0, st = [{ o: 0, v: 1 }];
      if (o.shimmer !== false) for (let k = 1; k * 0.9 < len - 0.4; k++) st.push({ o: k * 0.9, v: 0.32 });
      return a.ch('Em', t0, t1, { notes: o.notes ?? BOND, bass: 'E2', label: o.label ?? 'Em(maj9)', vel: o.vel ?? 0.75, strikes: st, hideName: o.hideName });
    };
    // the chord line of the vamp (generic sustained chords, no riff): B, C, C#, C over E minor
    const VAMP = [['Em', ['E3', 'G3', 'B3'], 'Em'], ['Em', ['E3', 'G3', 'C4'], 'Em(#5)'], ['Em6', ['E3', 'G3', 'C#4'], 'Em6'], ['Em', ['E3', 'G3', 'C4'], 'Em(#5)']];
    const LINE = ['B', 'C', 'C#', 'C'];
    const vamp = (t0, t1, o = {}) => {
      const len = (t1 - t0) / 4;
      VAMP.forEach(([n, v, l], i) => a.ch(n, t0 + i * len, t0 + (i + 1) * len, {
        notes: v, bass: 'E2', label: l, row: o.rows ? i : null, vel: o.vel ?? 0.6, hideName: o.hideName,
        strikes: [{ o: 0, v: 1 }, { o: len / 2, v: 0.45 }],
      }));
      if (o.walker !== false) a.walker(LINE.map((p, i) => [t0 + i * len, p]), { t1: o.wt1 ?? t1, dr: -40, color: GOLD, label: o.label, labelDr: -46 });
      if (o.brush) for (let t = t0; t < t1 - 0.1; t += B) { a.perc('hat', t, 0.22); a.perc('hat', t + B * 2 / 3, 0.14); }
      return len;
    };

    // ---------- hook: the chord, at once ----------
    const h1 = S('hook').t1;
    a.scale(0, 'E', [0, 3, 7, 11, 2]);
    bond(0.05, h1, { vel: 0.7 });
    a.ring(['D#'], 0.15, h1, { color: RED });
    spell('D#', 0.15, h1, RED);
    a.tag('D#', 0.2, h1, 'MAJ 7', { color: RED, x: 905, y: 905 });
    a.tag('F#', 0.2, h1, 'NINTH', { color: LILAC, x: 640, y: 1150 });
    a.ring(['F#'], 0.15, h1, { color: LILAC });

    // ---------- what: build it - E minor, + D#, + F# ----------
    const w0 = S('what').t0, tD = a.w('what', 'D') - 0.05, tF = a.w('what', 'F') - 0.05, tN = a.at('what2') - 0.05;
    a.scale(w0, 'E', [0, 3, 7]);
    a.ch('Em', w0 + 0.1, tD, { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.6 });
    a.scale(tD, 'E', [0, 3, 7, 11]);
    a.ch('Em', tD, tF, { notes: ['E3', 'G3', 'B3', 'D#4'], bass: 'E2', vel: 0.65, label: 'Em(maj7)' });
    a.note('D#4', tD, 0.8, { vel: 0.36 });
    a.ring(['D#'], tD, S('what').t1, { color: RED });
    spell('D#', tD, S('what').t1, RED);
    a.scale(tF, 'E', [0, 3, 7, 11, 2]);
    bond(tF, S('what').t1, { vel: 0.75 });
    a.note('F#4', tF, 0.8, { vel: 0.36 });
    a.ring(['F#'], tF, S('what').t1, { color: LILAC });
    big('+ MAJOR 7TH', a.w('what', 'major'), a.w('what', 'ninth'), { color: RED });
    big('+ 9TH', a.w('what', 'ninth'), tN, { color: LILAC });
    big('E MINOR MAJOR 9', tN, S('what').t1, { color: GOLD });

    // ---------- theme: the vamp chords softly, then the final chord ----------
    const t0 = S('theme').t0 + 0.1, tEnd = a.end('theme') + 0.1;
    a.scale(S('theme').t0, 'E', [0, 3, 7]);
    vamp(t0, tEnd, { vel: 0.4, brush: true, walker: false, hideName: false });
    a.scale(tEnd, 'E', [0, 3, 7, 11, 2]);
    bond(tEnd, S('theme').t1, { vel: 0.9 });
    a.ring(['D#', 'F#'], tEnd, S('theme').t1, { color: GOLD });
    spell('D#', tEnd, S('theme').t1, GOLD);
    big('DR. NO · 1962', a.w('theme', 'heard'), tEnd, { color: '#ffffff' });
    big('THE FINAL CHORD', tEnd, S('theme').t1, { color: GOLD });

    // ---------- vamp: the minor line cliché, on the spoken notes ----------
    const v0 = S('vamp').t0;
    a.scale(v0, 'E', [0, 3, 7]);
    const vt = [a.w('vamp', 'B'), a.w('vamp', 'C'), a.w('vamp', 'C', 1), a.w('vamp', 'C', 2)].map(t => t - 0.05);
    a.ch('Em', v0 + 0.1, vt[0], { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.5, row: 0 });
    VAMP.forEach(([n, v, l], i) => a.ch(n, vt[i], i < 3 ? vt[i + 1] : a.at('vamp2') - 0.05, { notes: v, bass: 'E2', label: l, row: i, vel: 0.7 }));
    a.walker(LINE.map((p, i) => [vt[i], p]), { t1: a.at('vamp2'), dr: -40, color: GOLD });
    [[0, 1, 1], [1, 2, 1], [2, 3, -1]].forEach(([x, y, st]) => a.arc(LINE[x], LINE[y], vt[y], vt[y] + 1.2, { steps: st, color: GOLD, dr: 30 }));
    // then the vamp loops
    vamp(a.at('vamp2') - 0.05, S('vamp').t1 - 0.1, { rows: true, vel: 0.6, brush: true });

    // ---------- why1: E minor alone - dark ----------
    const y0 = S('why1').t0;
    a.scale(y0, 'E', [0, 3, 7]);
    a.ch('Em', y0 + 0.1, S('why1').t1, { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.6 });
    big('DARK', a.w('why1', 'dark'), S('why1').t1, { color: BLUE, size: 64 });
    big('DANGEROUS?', a.w('why1', 'dangerous'), a.w('why1', 'dark') - 0.1, { color: RED });

    // ---------- why2: D#, a half step below the root ----------
    const z0 = S('why2').t0, tDs = a.w('why2', 'D') - 0.05, tHalf = a.w('why2', 'half') - 0.05;
    a.scale(z0, 'E', [0, 3, 7]);
    a.ch('Em', z0 + 0.1, tDs, { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.5 });
    a.scale(tDs, 'E', [0, 3, 7, 11]);
    a.ch('Em', tDs, S('why2').t1, { notes: ['E3', 'G3', 'B3', 'D#4'], bass: 'E2', vel: 0.65, label: 'Em(maj7)' });
    a.ring(['D#'], tDs, S('why2').t1, { color: RED });
    spell('D#', tDs, S('why2').t1, RED);
    a.arc('E', 'D#', tHalf, S('why2').t1, { steps: -1, color: RED, dr: 30 });
    a.note('E4', tHalf, 0.5, { vel: 0.34 }); a.note('D#4', tHalf + 0.5, 1.0, { vel: 0.36 });
    big('MAJOR SEVENTH', a.w('why2', 'major'), tHalf, { color: RED });
    big('HALF STEP BELOW E', tHalf, S('why2').t1, { color: RED });

    // ---------- why3: it wants to rise to E - and never does ----------
    const q0 = S('why3').t0, tWant = a.w('why3', 'wants') - 0.05, tNever = a.w('why3', 'never') - 0.05, tPerm = a.at('why3b') - 0.05;
    a.scale(q0, 'E', [0, 3, 7, 11]);
    a.ch('Em', q0 + 0.1, S('why3').t1, { notes: ['E3', 'G3', 'B3', 'D#4'], bass: 'E2', vel: 0.6, label: 'Em(maj7)',
      strikes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => ({ o: k * 0.8, v: k ? 0.35 : 1 })).filter(s => s.o < S('why3').t1 - q0 - 0.5) });
    a.ring(['D#'], q0 + 0.1, S('why3').t1, { color: RED });
    spell('D#', q0 + 0.1, S('why3').t1, RED);
    a.arc('D#', 'E', tWant, tNever + 0.3, { steps: 1, color: TEAL, dr: 30 });
    big('LEADING TONE → E', a.w('why3', 'leading'), tNever, { color: TEAL });
    big('IT NEVER DOES', tNever, tPerm, { color: RED });
    big('PERMANENT TENSION', tPerm, S('why3').t1, { color: RED });

    // ---------- why4: add F#, the ninth ----------
    const r0 = S('why4').t0, tFs = a.w('why4', 'F') - 0.05;
    a.scale(r0, 'E', [0, 3, 7, 11]);
    a.ch('Em', r0 + 0.1, tFs, { notes: ['E3', 'G3', 'B3', 'D#4'], bass: 'E2', vel: 0.5, label: 'Em(maj7)' });
    a.scale(tFs, 'E', [0, 3, 7, 11, 2]);
    bond(tFs, S('why4').t1, { vel: 0.8, notes: ['E3', 'B3', 'D#4', 'F#4', 'G4'] });
    a.ring(['F#'], tFs, S('why4').t1, { color: LILAC });
    spell('D#', r0 + 0.1, S('why4').t1);
    a.note('F#5', tFs, 1.0, { vel: 0.3 });
    big('LUSH & WIDE', a.w('why4', 'lush'), a.w('why4', 'Dark'), { color: LILAC });
    [['Dark', 'DARK', BLUE], ['elegant', 'ELEGANT', GOLD], ['suspicious', 'SUSPICIOUS', RED]].forEach(([w, txt, col], i, arr) => {
      const t = a.w('why4', w) - 0.05;
      big(txt, t, i < 2 ? a.w('why4', arr[i + 1][0]) - 0.05 : S('why4').t1, { color: col, size: 56 });
    });

    // ---------- why5: the line creeps by half steps ----------
    const p0 = S('why5').t0;
    a.scale(p0, 'E', [0, 3, 7]);
    const pt = [a.w('why5', 'B'), a.w('why5', 'C'), a.w('why5', 'C', 1), a.w('why5', 'C', 2)].map(t => t - 0.05);
    a.ch('Em', p0 + 0.1, pt[0], { notes: ['E3', 'G3', 'B3'], bass: 'E2', vel: 0.45 });
    VAMP.forEach(([n, v, l], i) => a.ch(n, pt[i], i < 3 ? pt[i + 1] : a.w('why5', 'creeps') - 0.05, { notes: v, bass: 'E2', label: l, vel: 0.65 }));
    a.walker(LINE.map((p, i) => [pt[i], p]), { t1: a.w('why5', 'creeps'), dr: -40, color: GOLD });
    const tCr = a.w('why5', 'creeps') - 0.05;
    vamp(tCr, S('why5').t1 - 0.1, { vel: 0.55, brush: true });
    big('HALF STEP · HALF STEP', tCr, S('why5').t1, { color: GOLD });

    // ---------- why6: film noir and spy music ----------
    const n0 = S('why6').t0;
    a.scale(n0, 'E', [0, 3, 7, 11]);
    a.ch('Em', n0 + 0.1, S('why6').t1, { notes: ['E3', 'G3', 'B3', 'D#4'], bass: 'E2', vel: 0.6, label: 'Em(maj7)',
      strikes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => ({ o: k * 1.0, v: k ? 0.3 : 1 })).filter(s => s.o < S('why6').t1 - n0 - 0.5) });
    for (let t = n0 + 0.1; t < S('why6').t1 - 0.2; t += B) { a.perc('hat', t, 0.18); a.perc('hat', t + B * 2 / 3, 0.12); }
    spell('D#', n0 + 0.1, S('why6').t1, RED);
    a.ring(['D#'], n0 + 0.1, S('why6').t1, { color: RED });
    big('FILM NOIR', a.w('why6', 'Film'), a.w('why6', 'spy'), { color: '#ffffff' });
    big('SPY MUSIC', a.w('why6', 'spy'), a.w('why6', 'minor'), { color: GOLD });
    big('MINOR + MAJOR 7TH', a.w('why6', 'minor'), S('why6').t1, { color: RED });

    // ---------- essence: the vamp, then the final chord ----------
    const e0 = S('essence').t0 + 0.1, eL = a.w('essence', 'Danger') - 0.05, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'E', [0, 3, 7]);
    vamp(e0, eL, { vel: 0.55, brush: true });
    a.scale(eL, 'E', [0, 3, 7, 11, 2]);
    bond(eL, e1 + 0.1, { vel: 0.9 });
    a.ring(['D#'], eL, e1 + 1, { color: RED });
    spell('D#', eL, e1 + 1, RED);
    a.tag('D#', eL, e1 + 1, 'NEVER RESOLVES', { color: RED, x: 880, y: 905 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
