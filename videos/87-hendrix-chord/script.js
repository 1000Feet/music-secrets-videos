// The Hendrix chord: E7#9 - a major third and a "minor third" (the sharp nine) in one grip.
// Copyrighted songs: only the chord itself with generic grooves, never their riffs or melodies.
const B = 0.42;   // a medium rock tempo, about 143 BPM

module.exports = {
  slug: 'hendrix-chord',
  title: 'The Hendrix Chord',
  segments: [
    { id: 'hook',    text: 'One chord sounds major and minor at the same time. Guitarists call it the Hendrix chord.' },
    { id: 'what',    text: 'Take E seven: E, G sharp, D. Now add a G on top.' },
    { id: 'what2',   text: "That's E seven sharp nine." },
    { id: 'purple',  text: "It's the chord at the heart of Purple Haze, from 1967..." },
    { id: 'taxman',  text: 'The Beatles used a seven sharp nine in Taxman, a year earlier.' },
    { id: 'jazz',    text: 'And jazz and R&B players had used it long before rock adopted it.' },
    { id: 'why1',    text: 'So why does it bite? E seven contains G sharp, the major third.' },
    { id: 'why2',    text: 'The sharp nine adds G natural, which sounds like the minor third. Both at once.' },
    { id: 'why3',    text: 'Blues singers and guitarists bend between those two thirds.' },
    { id: 'why3b',   text: 'This chord freezes that bend into one grip.' },
    { id: 'why4',    text: 'On guitar, G sharp sits low and G sits high, almost an octave apart.' },
    { id: 'why4b',   text: 'So instead of a muddy clash, you get a gritty, biting sound.' },
    { id: 'why5',    text: 'And the flat seventh, D, adds the bluesy pull of a dominant seventh.' },
    { id: 'essence', text: 'Major and minor in one chord. The blues, in a single grip.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MAJOR + MINOR', title: 'THE HENDRIX CHORD', accent: true, tonic: 4, tail: 0.8 },
    { id: 'what', segs: ['what', 'what2'], label: 'E7 + G', title: 'E7#9', tonic: 4, gap: 0.4, tail: 0.9 },
    { id: 'purple', segs: ['purple'], label: 'YOU HEAR IT IN', title: 'Purple Haze', sub: 'The Jimi Hendrix Experience · 1967', tonic: 4, tail: 8 * B + 0.3 },
    { id: 'taxman', segs: ['taxman'], label: 'YOU HEAR IT IN', title: 'Taxman', sub: 'The Beatles · 1966', tonic: 4, tail: 6 * B + 0.2 },
    { id: 'jazz', segs: ['jazz'], label: 'BEFORE ROCK', title: 'JAZZ & R&B', tonic: 4, tail: 2.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE MAJOR THIRD', tonic: 4, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'PLUS A MINOR THIRD', tonic: 4, tail: 0.9 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'A FROZEN BEND', tonic: 4, gap: 0.3, tail: 1.0 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'SPREAD APART', tonic: 4, gap: 0.3, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'THE FLAT SEVENTH', tonic: 4, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE BLUES IN ONE GRIP', accent: true, tonic: 4, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', BLUE = '#62a8ff', RED = '#ff5d6c', TEAL = '#45d6c8', PINK = '#ff7a93';
    const MONO = { family: 'DM Mono', weight: 500 };
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 46, ...MONO, ...o });
    // the guitar grip: E in the bass, G# low, D, and G on top (almost an octave above G#)
    const GRIP = ['E3', 'G#3', 'D4', 'G4'];
    const hx = (t0, t1, o = {}) => a.ch('E7', t0, t1, { notes: GRIP, bass: o.bass ?? 'E2', label: o.label ?? 'E7#9', vel: o.vel ?? 0.8, strikes: o.strikes, hideName: o.hideName, shape: o.shape });
    const spellGs = (t0, t1, col = '#ffffff') => a.tag('G#', t0, t1, 'G#', { dr: 58, color: col });
    // generic rock beat: kick on 1 and 3, snare on 2 and 4, eighth hats
    const rock = (t0, t1, v = 0.7) => { for (let t = t0, i = 0; t < t1 - 0.1; t += B, i++) { a.perc(i % 2 ? 'snare' : 'kick', t, 0.8 * v); a.perc('hat', t, 0.35 * v); a.perc('hat', t + B / 2, 0.25 * v); } };
    // generic stabs: on 1 and on the "and" of 2, per bar
    const stabs = len => { const s = []; for (let o = 0; o < len - 0.1; o += 4 * B) { s.push({ o, v: 1 }); if (o + 1.5 * B < len) s.push({ o: o + 1.5 * B, v: 0.75 }); if (o + 3 * B < len) s.push({ o: o + 3 * B, v: 0.6 }); } return s; };

    // ---------- hook: the chord itself, with both thirds lit ----------
    const h1 = S('hook').t1;
    a.scale(0, 'E', [0, 3, 4, 10]);
    hx(0.05, h1, { vel: 0.7, strikes: stabs(h1 - 0.05) });
    rock(0.05, h1, 0.5);
    a.ring(['G#'], 0.15, h1, { color: GOLD });
    a.ring(['G'], 0.15, h1, { color: BLUE });
    a.tag('G#', 0.2, h1, 'MAJOR 3RD', { color: GOLD, x: 140, y: 960 });
    a.tag('G', 0.2, h1, 'MINOR 3RD', { color: BLUE, x: 225, y: 1120 });
    spellGs(0.15, h1, GOLD);

    // ---------- what: E7 (E G# D), then G on top ----------
    const w0 = S('what').t0, tG = a.w('what', 'G', 1) - 0.05, tN = a.at('what2');
    a.scale(w0, 'E', [0, 4, 10]);
    a.ch('E7', w0 + 0.1, tG, { notes: ['E3', 'G#3', 'D4'], bass: 'E2', vel: 0.65, label: 'E7' });
    [['E', a.w('what', 'E', 1)], ['G#', a.w('what', 'G')], ['D', a.w('what', 'D')]].forEach(([p, t]) => a.ring([p], t - 0.05, tG, { color: '#ffffff' }));
    spellGs(a.w('what', 'G') - 0.05, S('what').t1);
    a.scale(tG, 'E', [0, 3, 4, 10]);
    hx(tG, S('what').t1, { vel: 0.8 });
    a.note('G4', tG, 0.9, { vel: 0.38 });
    a.ring(['G'], tG, S('what').t1, { color: BLUE });
    a.tag('G', tG, S('what').t1, '#9', { color: BLUE, dr: -80 });
    big('E · G# · D  +  G', tG, S('what').t1, { color: '#ffffff' });

    // ---------- purple haze: the chord over a generic rock beat (no riff) ----------
    const p0 = a.end('purple') + 0.05, p1 = S('purple').t1;
    a.scale(S('purple').t0, 'E', [0, 3, 4, 10]);
    hx(S('purple').t0 + 0.1, p0, { vel: 0.45 });
    hx(p0, p1 - 0.1, { vel: 0.9, strikes: stabs(p1 - 0.1 - p0) });
    rock(p0, p1 - 0.2, 0.8);
    big('THE HENDRIX CHORD', a.w('purple', 'heart'), p1, { color: GOLD });
    spellGs(S('purple').t0 + 0.1, p1, GOLD);

    // ---------- taxman: a 7#9 chord (generic stabs, no melody) ----------
    const x0 = a.end('taxman') + 0.05, x1 = S('taxman').t1;
    hx(S('taxman').t0 + 0.1, x0, { vel: 0.4, label: '7#9' });
    const xs = []; for (let o = 0; o < x1 - x0 - 0.3; o += B) xs.push({ o: o + B / 2, v: o % (2 * B) < 0.01 ? 0.9 : 0.6 });
    hx(x0, x1 - 0.1, { vel: 0.75, label: '7#9', strikes: [{ o: 0, v: 1 }, ...xs] });
    for (let t = x0, i = 0; t < x1 - 0.2; t += B, i++) { a.perc(i % 2 ? 'snare' : 'kick', t, 0.55); a.perc('hat', t + B / 2, 0.3); }
    big('7#9', a.w('taxman', 'seven'), x1, { color: GOLD, size: 64 });
    spellGs(S('taxman').t0 + 0.1, x1);

    // ---------- jazz & R&B: an original swung comp around the chord ----------
    const j0 = S('jazz').t0 + 0.1, j1 = S('jazz').t1, JB = 0.5, SW = JB * 2 / 3;
    a.scale(S('jazz').t0, 'E', [0, 3, 4, 10]);
        hx(j0, j1 - 0.1, { vel: 0.6, bass: false, strikes: [...Array(24).keys()].map(k => ({ o: k * JB + (k % 2 ? SW : 0), v: k % 2 ? 0.75 : 0.5 })).filter(s => s.o < j1 - j0 - 0.3) });
    const WALK = ['E2', 'G#2', 'B2', 'D3', 'E3', 'D3', 'B2', 'G#2'];
    for (let k = 0; j0 + k * JB < j1 - 0.3; k++) a.note(WALK[k % 8], j0 + k * JB, JB * 0.9, { vel: 0.4, show: false });
    for (let t = j0; t < j1 - 0.1; t += JB) { a.perc('hat', t, 0.3); a.perc('hat', t + SW, 0.18); }
    big('JAZZ → R&B → ROCK', a.w('jazz', 'before'), j1, { color: PINK });
    spellGs(j0, j1);

    // ---------- why1: G# is the major third ----------
    const y0 = S('why1').t0, tGs = a.w('why1', 'G') - 0.05;
    a.scale(y0, 'E', [0, 4, 7, 10]);
    a.ch('E7', y0 + 0.1, S('why1').t1, { notes: ['E3', 'G#3', 'B3', 'D4'], bass: 'E2', vel: 0.6, label: 'E7' });
    a.arc('E', 'G#', tGs, S('why1').t1, { steps: 4, color: GOLD, dr: 30 });
    a.ring(['G#'], tGs, S('why1').t1, { color: GOLD });
    spellGs(y0 + 0.1, S('why1').t1, GOLD);
    a.note('E4', tGs, 0.5, { vel: 0.32 }); a.note('G#4', tGs + 0.45, 1.0, { vel: 0.34 });
    big('4 HALF STEPS', tGs + 0.3, a.w('why1', 'major'), { color: GOLD });
    big('MAJOR THIRD', a.w('why1', 'major'), S('why1').t1, { color: GOLD });

    // ---------- why2: G natural sounds like the minor third - both at once ----------
    const z0 = S('why2').t0, tGn = a.w('why2', 'G') - 0.05, tBoth = a.w('why2', 'Both') - 0.05;
    a.scale(z0, 'E', [0, 3, 4, 10]);
    a.ch('E7', z0 + 0.1, tBoth, { notes: ['E3', 'G#3', 'B3', 'D4'], bass: 'E2', vel: 0.5, label: 'E7' });
    a.arc('E', 'G#', z0 + 0.1, S('why2').t1, { steps: 4, color: GOLD, dr: 30 });
    a.arc('E', 'G', tGn, S('why2').t1, { steps: 3, color: BLUE, dr: 62 });
    big('3 HALF STEPS', tGn + 0.3, a.w('why2', 'minor'), { color: BLUE });
    a.ring(['G'], tGn, S('why2').t1, { color: BLUE });
    a.ring(['G#'], z0 + 0.1, S('why2').t1, { color: GOLD });
    spellGs(z0 + 0.1, S('why2').t1, GOLD);
    a.note('E4', tGn, 0.5, { vel: 0.32 }); a.note('G4', tGn + 0.45, 1.0, { vel: 0.34 });
    big('SOUNDS LIKE A MINOR THIRD', a.w('why2', 'minor'), tBoth, { color: BLUE, size: 40 });
    hx(tBoth, S('why2').t1, { vel: 0.85 });
    big('BOTH AT ONCE', tBoth, S('why2').t1, { color: '#ffffff', size: 52 });

    // ---------- why3: the blue bend, frozen ----------
    const b0 = S('why3').t0, tBend = a.w('why3', 'bend') - 0.05, tFr = a.w('why3b', 'freezes') - 0.05;
    a.scale(b0, 'E', [0, 3, 4, 10]);
    a.ch('E7', b0 + 0.1, tFr, { notes: ['E3', 'B3', 'D4'], bass: 'E2', vel: 0.45, label: 'E7', hideName: true, shape: false });
    for (let k = 0; k < 3; k++) {
      const t = tBend - 0.6 + k * 1.0;
      if (t + 0.9 > tFr) break;
      a.note('G4', t, 0.2, { vel: 0.36 }); a.note(67.5, t + 0.2, 0.15, { vel: 0.3, show: false }); a.note('G#4', t + 0.35, 0.5, { vel: 0.34 });
    }
    a.arc('G', 'G#', b0 + 0.2, tFr, { steps: 1, color: BLUE, dr: 30, label: 'BEND', labelR: 345 });
    a.ring(['G', 'G#'], b0 + 0.2, S('why3').t1, { color: BLUE });
    big('THE BLUE NOTE BEND', b0 + 0.3, tFr, { color: BLUE });
    hx(tFr, S('why3').t1, { vel: 0.9 });
    big('FROZEN INTO ONE GRIP', tFr, S('why3').t1, { color: GOLD });
    spellGs(b0 + 0.2, S('why3').t1);

    // ---------- why4: spread almost an octave apart vs a muddy half-step clash ----------
    const q0 = S('why4').t0, tLow = a.w('why4', 'low') - 0.05, tHigh = a.w('why4', 'high') - 0.05, tMud = a.w('why4b', 'muddy') - 0.05, tGrit = a.w('why4b', 'gritty') - 0.05;
    a.scale(q0, 'E', [0, 3, 4, 10]);
    hx(q0 + 0.1, tMud, { vel: 0.55, shape: true });
    a.note('G#3', tLow, 1.2, { vel: 0.38 }); a.note('G4', tHigh, 1.4, { vel: 0.38 });
    big('G#3  ↔  G4', tLow, tHigh + 0.3, { color: '#ffffff', size: 52 });
    big('ALMOST AN OCTAVE', tHigh + 0.3, tMud, { color: TEAL });
    spellGs(q0 + 0.1, S('why4').t1);
    // close together: muddy
    a.ch('E7', tMud, tGrit, { notes: ['E3', 'D4', 'G4', 'G#4'], bass: 'E2', vel: 0.6, label: 'CLOSE', strikes: [{ o: 0, v: 1 }, { o: 0.6, v: 0.7 }] });
    a.line('G', 'G#', tMud, tGrit, { color: RED, width: 6 });
    big('HALF STEP: MUDDY', tMud, tGrit, { color: RED });
    // spread: gritty
    hx(tGrit, S('why4').t1, { vel: 0.95, label: 'SPREAD', strikes: [{ o: 0, v: 1 }, { o: 1.5 * B, v: 0.8 }, { o: 3 * B, v: 0.7 }] });
    big('SPREAD: GRITTY', tGrit, S('why4').t1, { color: GOLD });

    // ---------- why5: the flat seventh D, the dominant pull ----------
    const f0 = S('why5').t0, tD = a.w('why5', 'D') - 0.05, tPull = a.w('why5', 'pull') - 0.05;
    a.scale(f0, 'E', [0, 3, 4, 10]);
    hx(f0 + 0.1, tPull, { vel: 0.6 });
    a.ring(['D'], tD, S('why5').t1, { color: PINK });
    a.tag('D', tD, S('why5').t1, 'b7', { color: PINK, dr: -80 });
    a.note('D4', tD, 0.9, { vel: 0.36 });
    a.arc('E', 'D', tD, S('why5').t1, { steps: -2, color: PINK, dr: 30 });
    spellGs(f0 + 0.1, S('why5').t1);
    // the dominant pull: the chord leans toward A
    hx(tPull, S('why5').t1, { vel: 0.8, strikes: [{ o: 0, v: 1 }, { o: 3 * B, v: 0.8 }] });
    big('BLUESY PULL', tPull, S('why5').t1, { color: PINK });
    rock(tPull, S('why5').t1 - 0.1, 0.45);

    // ---------- essence: the groove once more, ending on the grip ----------
    const e0 = S('essence').t0 + 0.1, eL = a.at('cta') - 0.1, e1 = S('essence').t1;
    a.scale(S('essence').t0, 'E', [0, 3, 4, 10]);
    hx(e0, eL, { vel: 0.85, strikes: stabs(eL - e0) });
    rock(e0, eL, 0.75);
    a.ring(['G#'], e0, e1 + 1, { color: GOLD });
    a.ring(['G'], e0, e1 + 1, { color: BLUE });
    a.tag('G#', a.w('essence', 'Major'), e1 + 1, 'MAJOR', { color: GOLD, x: 150, y: 960 });
    a.tag('G', a.w('essence', 'minor'), e1 + 1, 'MINOR', { color: BLUE, x: 235, y: 1120 });
    spellGs(e0, e1 + 1, GOLD);
    hx(eL, e1 + 0.1, { vel: 0.9, bass: 'E2' });
    a.perc('kick', eL, 1); a.perc('snare', eL, 0.6);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
