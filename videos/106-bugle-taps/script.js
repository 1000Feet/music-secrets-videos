// Taps: a bugle can only play the harmonic series of its tube - and those notes form a major chord.
// Taps (1862) is public domain: played exactly as the brief gives it, in C (G4-G5). The rhythm of the short
// notes is a simple dotted pickup. Reveille is NOT played (no melody given): only an original C-E-G figure.
// The bugle is an additive tone (engine note option `tone`) tuned to the true harmonics of C3 (130.81 Hz).
const C3 = 130.81;
const hz = f => 69 + 12 * Math.log2(f / 440);
const BUGLE = [1, 0.8, 0.6, 0.45, 0.3, 0.2, 0.12, 0.07];
// harmonic number -> note name on the circle / keyboard
const HN = { 2: 'C4', 3: 'G4', 4: 'C5', 5: 'E5', 6: 'G5' };
const N2H = { G4: 3, C5: 4, E5: 5, G5: 6 };

module.exports = {
  slug: 'bugle-taps',
  title: 'Taps: Music from Physics',
  segments: [
    { id: 'hook',     text: 'A bugle has no valves and no keys. So how does it play a melody?' },
    { id: 'what',     text: 'It can only play the notes nature gives it, and they form a major chord.' },
    { id: 'taps',     text: 'You hear it in Taps, the American military bugle call.' },
    { id: 'taps2',    text: 'Union General Daniel Butterfield arranged it in 1862...' },
    { id: 'taps3',    text: 'with bugler Oliver Wilcox Norton, from an earlier call.' },
    { id: 'reveille', text: 'Other bugle calls, like Reveille, use the same few notes.' },
    { id: 'why1',     text: 'So why does it work? Blow harder or softer into a tube, and it jumps between its natural overtones.' },
    { id: 'why2',     text: 'Ratios two, three, four, five, six of the lowest frequency.' },
    { id: 'why3',     text: 'In C, those are C, G, C, E, G. A major chord!' },
    { id: 'why4',     text: "That's why every bugle call sounds like a broken major chord." },
    { id: 'why5',     text: "The next overtone, seven, is a flat B flat that doesn't match the piano, so bugle calls avoid it." },
    { id: 'why6',     text: 'Valves on a trumpet change the tube length: a new harmonic series for every valve combination.' },
    { id: 'essence',  text: 'One tube, a few overtones, and nature hands you a major chord.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'MUSIC FROM PHYSICS', title: 'TAPS', accent: true, tonic: 0, lead: 0.5, gap: 0.4, tail: 0.8 },
    { id: 'taps', segs: ['taps', 'taps2', 'taps3'], label: 'YOU HEAR IT IN', title: 'Taps', sub: 'Butterfield & Norton · 1862 · in C', tonic: 0, gap: 0.3, tail: 3.2 },
    { id: 'reveille', segs: ['reveille'], label: 'YOU HEAR IT IN', title: 'Reveille', sub: 'and other bugle calls', tonic: 0, tail: 2.0 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'NATURAL OVERTONES', circle: false, tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'WHY IT WORKS', title: 'A MAJOR CHORD', tonic: 0, gap: 0.4, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: 'THE SEVENTH OVERTONE', title: 'TOO FLAT', tonic: 0, tail: 1.4 },
    { id: 'why6', segs: ['why6'], label: 'THE TRUMPET', title: 'VALVES', tonic: 0, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: "NATURE'S CHORD", accent: true, tonic: 0, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c', GREY = '#8a8a92', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    // a bugle note: harmonic h of a fundamental f0 (C3 unless a valve lowers it); lights the nearest key
    const bugle = (h, t, dur, vel = 0.3, f0 = C3, light = true) => {
      a.note(hz(f0 * h), t, dur, { vel, show: false, tone: { partials: BUGLE, attack: 0.05, release: 0.18 } });
      if (light) a.note(Math.round(hz(f0 * h)), t, Math.max(0.25, dur), { vel: 0, show: true });
    };
    const MAJ = [0, 4, 7];

    // ---- hook: C, E, G - the only chord a bugle knows (cover) ----
    const h1 = S('hook').t1, tMaj = a.w('what', 'major');
    a.scale(0.1, 'C', MAJ, { popIn: { t0: 0.1, step: 0.12 } });
    a.ch('C', 0.2, h1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, label: 'C' });
    // a rising call on the harmonics, then the triad held
    [3, 4, 5, 6, 5, 4].forEach((h, i) => bugle(h, 0.25 + i * 0.28, i === 5 ? 0.9 : 0.24, 0.3));
    a.tag(0, a.w('hook', 'valves'), a.w('hook', 'how'), 'NO VALVES · NO KEYS', { x: 540, y: 462, color: '#ffffff' });
    a.tag(0, a.w('hook', 'how'), a.at('what'), 'HOW?', { x: 540, y: 462, color: '#ffffff' });
    a.tag(0, a.w('what', 'nature'), tMaj, "NATURE'S NOTES", { x: 540, y: 462, color: TEAL });
    a.tag(0, tMaj, h1, 'A MAJOR CHORD', { x: 540, y: 462, color: GOLD });
    a.ring(['C', 'E', 'G'], tMaj, h1, { color: GOLD });
    [3, 4, 5].forEach((h, i) => bugle(h, tMaj + i * 0.08, h1 - tMaj - 0.3, 0.2));

    // ---- Taps (public domain), exactly the pitches of the brief ----
    const T0 = S('taps').t0, T1 = S('taps').t1, B = 0.5;
    a.scale(T0, 'C', MAJ);
    a.ch('C', T0 + 0.1, T1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, hideName: true });
    const TAPS = [
      ['G4', 0.75], ['G4', 0.25], ['C5', 2.5],
      ['G4', 0.75], ['C5', 0.25], ['E5', 2.5],
      ['G4', 0.75], ['C5', 0.25], ['E5', 1], ['G4', 0.75], ['C5', 0.25], ['E5', 1], ['G4', 0.75], ['C5', 0.25], ['E5', 2.5],
      ['C5', 0.75], ['E5', 0.25], ['G5', 2], ['E5', 0.75], ['C5', 0.25], ['G4', 2],
      ['G4', 0.75], ['G4', 0.25], ['C5', 3],
    ];
    const total = TAPS.reduce((s, [, b]) => s + b, 0);
    const beat = Math.min(B, (T1 - T0 - 0.6) / total);
    let t = T0 + 0.3;
    const walk = [];
    TAPS.forEach(([n, b]) => { bugle(N2H[n], t, b * beat * 0.92, 0.36); walk.push([t, n.replace(/\d/, '')]); t += b * beat; });
    a.walker(walk, { t1: T1, color: '#ffffff', dr: 0 });
    a.tag(0, a.w('taps2', '1862'), T1, 'ONLY G · C · E', { x: 540, y: 462, color: GOLD });

    // ---- Reveille & co: same notes (an original C-E-G figure, not Reveille itself) ----
    const R0 = S('reveille').t0, R1 = S('reveille').t1;
    a.scale(R0, 'C', MAJ);
    a.ch('C', R0 + 0.1, R1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, hideName: true });
    const FIG = [[3, 0.5], [4, 0.5], [5, 0.5], [6, 1], [5, 0.5], [4, 0.5], [3, 1], [4, 1.5]];
    for (let tt = R0 + 0.2, k = 0; tt < R1 - 2.5; k++) {
      FIG.forEach(([h, b]) => { bugle(h, tt, b * 0.26 * 0.9, 0.3); tt += b * 0.26; });
      tt += 0.3;
      if (k > 3) break;
    }
    a.tag(0, a.w('reveille', 'same'), R1, 'SAME FEW NOTES', { x: 540, y: 462, color: GOLD });
    ['C', 'E', 'G'].forEach((p, i) => a.tag(p, a.w('reveille', 'notes') + i * 0.2, R1, p, { dr: -92, color: GOLD }));

    // ---- why1-2: the harmonics of the tube ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const H = [['C', '×1', GREY], ['C', '×2', PINK], ['G', '×3', TEAL], ['C', '×4', PINK], ['E', '×5', GOLD], ['G', '×6', TEAL]];
    const g = a.grid(H.map(([l, s, c]) => ({ label: l, sub: s, color: c })), w0 + 0.1, w1, { rows: 2, cols: 3, cw: 260, chh: 190, y: 520, revealStep: 0.1, caption: 'OVERTONES OF ONE TUBE' });
    const tBlow = a.w('why1', 'harder') - 0.05, tJump = a.w('why1', 'jumps') - 0.05;
    a.big('BLOW HARDER ↑   SOFTER ↓', tBlow, a.at('why2'), { y: 1010, size: 40, ...MONO, color: '#ffffff', blur: 6 });
    // jumping up and down the series
    [2, 3, 4, 5, 6, 5, 4, 3].forEach((h, i) => {
      const tt = tJump + i * 0.24;
      bugle(h, tt, 0.22, 0.26); g.active.push({ t0: tt, t1: tt + 0.24, i: h - 1 });
    });
    const words = ['two', 'three', 'four', 'five', 'six'];
    words.forEach((w, i) => {
      const tt = a.w('why2', w) - 0.05;
      bugle(i + 2, tt, 0.5, 0.28); g.active.push({ t0: tt, t1: w1, i: i + 1 });
    });
    a.big('2 · 3 · 4 · 5 · 6', a.at('why2'), w1, { y: 1010, size: 54, ...MONO, color: GOLD, blur: 10 });
    a.note('C3', w0 + 0.3, tBlow - w0 - 0.4, { vel: 0, show: false });
    bugle(2, w0 + 0.3, Math.max(0.4, tBlow - w0 - 0.6), 0.22);

    // ---- why3-4: C G C E G = a major chord; every call is a broken chord ----
    const m0 = S('why3').t0, m1 = S('why3').t1;
    a.scale(m0, 'C', MAJ);
    const cw = ['C', 'G', 'C', 'E', 'G'];
    cw.forEach((n, i) => { const tt = a.w('why3', n, n === 'C' ? [1, 0, 2, 0, 0][i] : n === 'G' ? [0, 0, 0, 0, 1][i] : 0) - 0.05; bugle(i + 2, tt, 0.6, 0.3); });
    const tCh = a.w('why3', 'major') - 0.05;
    a.ch('C', m0 + 0.1, tCh, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, hideName: true });
    a.ch('C', tCh, m1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, label: 'C' });
    [2, 3, 4, 5, 6].forEach((h, i) => bugle(h, tCh + i * 0.06, a.at('why4') - tCh - 0.2, 0.18, C3, false));
    keys(['C4', 'G4', 'C5', 'E5', 'G5'], tCh, a.at('why4'));
    a.ring(['C', 'E', 'G'], tCh, m1, { color: GOLD });
    const tBr = a.w('why4', 'broken') - 0.05;
    a.tag(0, tBr, m1, 'BROKEN CHORD', { x: 540, y: 462, color: GOLD });
    [3, 4, 5, 6, 5, 4, 3, 4].forEach((h, i) => bugle(h, tBr + i * 0.22, 0.2, 0.26));

    // ---- why5: the 7th overtone sits below the piano's B flat ----
    const s0 = S('why5').t0, s1 = S('why5').t1;
    a.scale(s0, 'C', [0, 4, 7, 10]);
    const t7 = a.w('why5', 'seven') - 0.05, tFlat = a.w('why5', 'flat') - 0.05, tPiano = a.w('why5', 'piano') - 0.05, tAv = a.w('why5', 'avoid') - 0.05;
    const f7 = C3 * 7, off = hz(f7) - 82;             // about -0.31 semitone below Bb5
    a.ch('C', s0 + 0.1, s1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, hideName: true });
    [4, 5, 6].forEach((h, i) => bugle(h, s0 + 0.2 + i * 0.3, 0.28, 0.26));
    a.note(hz(f7), t7, tPiano - t7 - 0.1, { vel: 0.3, show: false, tone: { partials: BUGLE, attack: 0.05, release: 0.18 } });
    a.walker([[t7, 10 + off]], { t1: s1, color: RED, dr: -34, label: '7×', labelDr: -40 });
    a.tag('Bb', tFlat, s1, '7×: TOO FLAT', { x: 290, y: 600, color: RED });
    a.note('Bb5', tPiano, 1.6, { vel: 0.35 });
    a.note(hz(f7), tPiano + 0.9, 1.4, { vel: 0.22, show: false, tone: { partials: BUGLE, attack: 0.05, release: 0.18 } });
    a.ring(['Bb'], tPiano, s1, { color: BLUE });
    a.tag(0, tPiano, tAv, "PIANO'S B FLAT", { x: 540, y: 462, color: BLUE });
    a.tag(0, tAv, s1, 'BUGLE CALLS AVOID IT', { x: 540, y: 462, color: RED });

    // ---- why6: valves = new tube lengths = new series (same major shape, new root) ----
    const v0 = S('why6').t0, v1 = S('why6').t1, tLen = a.w('why6', 'length') - 0.05;
    const roots = [['C', 0], ['B', -1], ['Bb', -2], ['A', -3]];
    const vl = (v1 - tLen - 0.3) / roots.length;
    a.scale(v0, 'C', MAJ);
    [3, 4, 5, 6].forEach((h, i) => bugle(h, v0 + 0.2 + i * 0.25, 0.23, 0.26));
    roots.forEach(([r, k], i) => {
      const tt = tLen + i * vl, f0 = C3 * Math.pow(2, k / 12);
      a.scale(tt, r, MAJ);
      [3, 4, 5, 6].forEach((h, j) => bugle(h, tt + j * 0.17, j === 3 ? vl - 0.6 : 0.16, 0.26, f0));
      a.tag(0, tt, tt + vl, i ? 'NEW TUBE · NEW SERIES' : 'NO VALVES', { x: 540, y: 462, color: i ? TEAL : '#ffffff' });
    });

    // ---- essence: the last phrase of Taps, on the C major triad ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'C', MAJ);
    a.ch('C', e0 + 0.1, e1, { notes: ['C4', 'E4', 'G4'], bass: false, mute: true, label: 'C' });
    a.ring(['C', 'E', 'G'], a.w('essence', 'major') - 0.05, e1, { color: GOLD });
    const tc = a.at('cta');
    [['G4', 0.75], ['G4', 0.25], ['C5', 3]].reduce((tt, [n, b]) => { bugle(N2H[n], tt, b * 0.5 * 0.92, 0.34); return tt + b * 0.5; }, tc - 0.2);
    [3, 4, 5].forEach((h, i) => bugle(h, e0 + 0.2 + i * 0.35, 1.0, 0.2));
    a.cta(tc + 0.6, 'Leave a song in the comments');
    void HN;
  },
};
