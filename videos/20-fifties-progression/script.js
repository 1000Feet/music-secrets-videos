// The 50s progression: I - vi - IV - V, four chords that glide because they share notes.
module.exports = {
  slug: 'fifties-progression',
  title: 'The 50s Progression',
  segments: [
    { id: 'hook',    text: "Four chords, and you're instantly back at a fifties slow dance." },
    { id: 'what',    text: "One, six, four, five. In C, that's C, A minor, F and G." },
    { id: 'name',    text: "It's called the fifties progression, or the doo-wop progression." },
    { id: 'earth',   text: "You hear it in Earth Angel..." },
    { id: 'stand',   text: 'Stand By Me, in A...' },
    { id: 'every',   text: 'and the verse of Every Breath You Take.' },
    { id: 'why1',    text: 'So why does it feel so smooth? C and A minor share two notes: C and E.' },
    { id: 'why2',    text: 'A minor and F share two notes too: A and C.' },
    { id: 'why3',    text: 'So only one note moves each time. The chords glide.' },
    { id: 'why4',    text: 'F to G shares nothing... but the bass just steps up,' },
    { id: 'why5',    text: 'and G, the five chord, pulls straight back to C. The loop closes itself.' },
    { id: 'bass',    text: 'Listen to the bass: C, A, F, G. Down a third, down a third, up a step.' },
    { id: 'order',   text: 'These are the same four chords as the modern one, five, six, four.' },
    { id: 'order2',  text: 'Just change the order, and fifties sweetness becomes a modern anthem.' },
    { id: 'essence', text: "Chords that share notes feel like one long breath. That's why this loop sounds so warm and safe." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'I – vi – IV – V', title: 'THE 50s PROGRESSION', accent: true, tonic: 0, row: ['I', 'vi', 'IV', 'V'], min: 5.2 },
    { id: 'what', segs: ['what'], label: 'FOUR CHORDS', title: 'ONE, SIX, FOUR, FIVE', tonic: 0, row: ['I', 'vi', 'IV', 'V'], tail: 0.7 },
    { id: 'name', segs: ['name'], label: 'ALSO CALLED', title: 'DOO-WOP CHORDS', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 0.8 },
    { id: 'earth', segs: ['earth'], label: 'YOU HEAR IT IN', title: 'Earth Angel', sub: 'The Penguins · 1954', tonic: 0, row: ['I', 'vi', 'IV', 'V'], min: 5.6 },
    { id: 'stand', segs: ['stand'], label: 'YOU HEAR IT IN', title: 'Stand By Me', sub: 'Ben E. King · 1961 · in A', tonic: 9, row: ['A', 'F#m', 'D', 'E'], min: 5.6 },
    { id: 'every', segs: ['every'], label: 'YOU HEAR IT IN', title: 'Every Breath You Take', sub: 'The Police · 1983 · verse', tonic: 0, row: ['I', 'vi', 'IV', 'V'], min: 6.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SHARED NOTES', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'SHARED NOTES', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE NOTE MOVES', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'THE LAST STEP', title: 'F TO G', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 0.3 },
    { id: 'why5', segs: ['why5'], label: 'THE FIVE CHORD', title: 'BACK TO C', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 1.4 },
    { id: 'bass', segs: ['bass'], label: 'THE BASS LINE', title: 'C, A, F, G', tonic: 0, row: ['C', 'Am', 'F', 'G'], tail: 1.0 },
    { id: 'order', segs: ['order'], label: 'SAME FOUR CHORDS', title: 'I – V – vi – IV', tonic: 0, row: ['I', 'V', 'vi', 'IV'], tail: 0.6 },
    { id: 'order2', segs: ['order2'], label: 'NEW ORDER, NEW MOOD', title: 'SWEET VS ANTHEM', tonic: 0, circle: false, tail: 2.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE LONG BREATH', accent: true, tonic: 0, row: ['I', 'vi', 'IV', 'V'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a';
    // smooth voicings: only one note moves from C to Am to F
    const V = { C: ['C4', 'E4', 'G4'], Am: ['C4', 'E4', 'A4'], F: ['C4', 'F4', 'A4'], G: ['B3', 'D4', 'G4'] };
    const BASS = { C: 'C3', Am: 'A2', F: 'F2', G: 'G2' };
    const PROG = ['C', 'Am', 'F', 'G'];
    const triplets = len => [1, 0.45, 0.45, 0.8, 0.45, 0.45].map((v, k) => ({ o: (k * len) / 6, v }));
    const eighths = len => [1, 0.5, 0.7, 0.5, 0.8, 0.5, 0.7, 0.5].map((v, k) => ({ o: (k * len) / 8, v }));
    const loop = (t0, t1, names, o = {}) => {
      const len = (t1 - t0) / names.length;
      return names.map((c, i) => a.ch(c, t0 + i * len, t0 + (i + 1) * len, {
        row: o.rows ? o.rows[i] : i % 4, notes: (o.voicing || V)[c], bass: (o.bass || BASS)[c], vel: o.vel ?? 0.85,
        strikes: o.strikes ? o.strikes(len) : undefined, label: o.labels ? o.labels[i] : undefined,
      }));
    };

    // hook: a slow doo-wop teaser in 12/8
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    loop(0.3, S('hook').t1, PROG, { vel: 0.6, strikes: triplets });

    // what: chords on the numbers, then again on their names
    const tn = ['One', 'six', 'four', 'five'].map(w => a.w('what', w) - 0.04);
    const tc = [['C', 1], ['A', 0], ['F', 0], ['G', 0]].map(([w, n]) => a.w('what', w, n) - 0.04);
    PROG.forEach((c, i) => a.ch(c, tn[i], i < 3 ? tn[i + 1] : tc[0], { row: i, notes: V[c], bass: BASS[c], vel: 0.75 }));
    PROG.forEach((c, i) => a.ch(c, tc[i], i < 3 ? tc[i + 1] : S('what').t1, { row: i, notes: V[c], bass: BASS[c] }));

    // name: the loop keeps going
    loop(S('name').t0 + 0.05, S('name').t1, PROG, { strikes: triplets, vel: 0.7 });

    // earth angel: slow 12/8 doo-wop, twice
    loop(S('earth').t0 + 0.05, S('earth').t1, [...PROG, ...PROG], { strikes: triplets });
    // stand by me: in A, steady pulse
    a.scale(S('stand').t0, 'A');
    const SV = { A: ['C#4', 'E4', 'A4'], 'F#m': ['C#4', 'F#4', 'A4'], D: ['D4', 'F#4', 'A4'], E: ['B3', 'E4', 'G#4'] };
    const SB = { A: 'A2', 'F#m': 'F#2', D: 'D3', E: 'E2' };
    const s0 = S('stand').t0 + 0.05, s1 = S('stand').t1;
    loop(s0, s1, ['A', 'F#m', 'D', 'E'], { voicing: SV, bass: SB, strikes: len => [0, 0.25, 0.5, 0.75].map(k => ({ o: len * k, v: k ? 0.55 : 1 })) });
    for (let t = s0; t < s1 - 0.1; t += (s1 - s0) / 8) { a.perc('kick', t, 0.5); a.perc('hat', t + (s1 - s0) / 16, 0.3); }
    // every breath you take: straight eighths with a light beat
    a.scale(S('every').t0, 'C');
    const e0 = S('every').t0 + 0.05, e1 = S('every').t1;
    loop(e0, e1, PROG, { strikes: eighths, vel: 0.8 });
    for (let i = 0; i < 8; i++) { const t = e0 + i * (e1 - e0) / 8; a.perc(i % 2 ? 'snare' : 'kick', t, 0.55); a.perc('hat', t + (e1 - e0) / 16, 0.3); }

    // why1: C -> Am share C and E; only G moves up to A
    const tAm = a.w('why1', 'A') - 0.04;
    a.ch('C', S('why1').t0 + 0.1, tAm, { row: 0, notes: V.C, bass: 'C3', vel: 0.8 });
    a.ch('Am', tAm, S('why1').t1, { row: 1, notes: V.Am, bass: 'A2' });
    a.ring(['C', 'E'], a.w('why1', 'two'), S('why1').t1, { color: '#ffffff' });
    a.tag(0, a.w('why1', 'two'), S('why1').t1, 'TWO SHARED NOTES', { x: 540, y: 474, color: '#ffffff' });
    a.arc('G', 'A', tAm, S('why1').t1, { steps: 2, color: TEAL, dr: 30 });
    // why2: Am -> F share A and C; only E moves up to F
    const tF = a.w('why2', 'F') - 0.04;
    a.ch('Am', S('why2').t0, tF, { row: 1, notes: V.Am, bass: 'A2', vel: 0.8 });
    a.ch('F', tF, S('why2').t1, { row: 2, notes: V.F, bass: 'F2' });
    a.ring(['A', 'C'], a.w('why2', 'two'), S('why2').t1, { color: '#ffffff' });
    a.tag(0, a.w('why2', 'two'), S('why2').t1, 'TWO SHARED NOTES', { x: 540, y: 474, color: '#ffffff' });
    a.arc('E', 'F', tF, S('why2').t1, { steps: 1, color: TEAL, dr: 30 });
    // why3: glide C -> Am -> F, one vertex at a time
    const g0 = S('why3').t0 + 0.05, gl = (S('why3').t1 - g0) / 6;
    ['C', 'Am', 'F', 'C', 'Am', 'F'].forEach((c, i) => a.ch(c, g0 + i * gl, g0 + (i + 1) * gl, { row: [0, 1, 2][i % 3], notes: V[c], bass: BASS[c], vel: 0.8 }));
    a.big('ONE NOTE MOVES', a.w('why3', 'one'), S('why3').t1, { y: 474, size: 42, family: 'DM Mono', weight: 500, color: TEAL });

    // why4: F -> G shares nothing, the bass steps up
    const tG = a.w('why4', 'G') - 0.04;
    a.ch('F', S('why4').t0, tG, { row: 2, notes: V.F, bass: 'F2', vel: 0.8 });
    a.ch('G', tG, a.w('why5', 'C') - 0.04, { row: 3, notes: V.G, bass: 'G2' });
    a.tag(0, a.w('why4', 'nothing'), S('why4').t1, 'NO SHARED NOTES', { x: 540, y: 474, color: RED });
    const tUp = a.w('why4', 'steps');
    a.walker([[S('why4').t0 + 0.1, 'F'], [tUp, 'G']], { t1: S('why4').t1, dr: 34, label: 'BASS', labelDr: 82 });
    a.note('F2', tUp - 0.3, 0.3, { vel: 0.3, show: false }); a.note('G2', tUp, 0.6, { vel: 0.35, show: false });
    // why5: G pulls back to C, and the loop starts over
    const tC = a.w('why5', 'C') - 0.04, tLoop = a.w('why5', 'loop') - 0.04;
    a.tag(0, a.w('why5', 'five'), tC, 'V → I', { x: 540, y: 474, color: GOLD });
    a.arc('B', 'C', a.w('why5', 'pulls'), S('why5').t1, { steps: 1, color: TEAL, dr: 30 });
    a.ch('C', tC, tLoop, { row: 0, notes: V.C, bass: 'C3' });
    a.tag('C', tC, S('why5').t1, 'HOME');
    loop(tLoop, S('why5').t1, PROG, { vel: 0.75 });

    // bass: C A F G, down a third, down a third, up a step
    const bw = [['C', 0], ['A', 0], ['F', 0], ['G', 0]].map(([w, n]) => a.w('bass', w, n) - 0.04);
    const bEnd = a.w('bass', 'Down');
    a.ch('C', S('bass').t0 + 0.05, bw[0], { row: 0, notes: V.C, bass: 'C3', vel: 0.6 });
    PROG.forEach((c, i) => a.ch(c, bw[i], i < 3 ? bw[i + 1] : bEnd, { row: i, notes: V[c], bass: BASS[c], vel: 0.7 }));
    const iv = [a.w('bass', 'third', 0), a.w('bass', 'third', 1), a.w('bass', 'step')].map(t => t - 0.25);
    const ivEnd = S('bass').t1;
    PROG.forEach((c, i) => a.ch(c, i ? iv[i - 1] : bEnd, i < 3 ? iv[i] : ivEnd, { row: i, notes: V[c], bass: BASS[c], vel: 0.75 }));
    a.walker(PROG.map((c, i) => [bw[i], c[0]]).concat([[bEnd, 'C'], [iv[0], 'A'], [iv[1], 'F'], [iv[2], 'G']]), { t1: ivEnd, dr: 34, label: 'BASS', labelDr: 82 });
    a.big('↓ 3RD', iv[0], iv[1], { y: 474, size: 42, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('↓ 3RD', iv[1], iv[2], { y: 474, size: 42, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('↑ STEP', iv[2], ivEnd, { y: 474, size: 42, family: 'DM Mono', weight: 500, color: GOLD });

    // order: same chords, modern order I - V - vi - IV
    const MOD = ['C', 'G', 'Am', 'F'];
    const to = [['one', 0], ['five', 0], ['six', 0], ['four', 1]].map(([w, n]) => a.w('order', w, n) - 0.04);
    a.ch('C', S('order').t0 + 0.05, to[0], { notes: V.C, bass: 'C3', vel: 0.6, row: 0 });
    MOD.forEach((c, i) => a.ch(c, to[i], i < 3 ? to[i + 1] : S('order').t1, { row: i, notes: V[c], bass: BASS[c] }));
    // order2: 50s order (sweet) vs modern order (anthem)
    const o0 = S('order2').t0 + 0.05, oMid = a.w('order2', 'becomes') - 0.04, o1 = S('order2').t1;
    const g = a.grid([{ label: 'C Am F G', sub: '1950s · SWEET', color: '#ff7a93', size: 44 }, { label: 'C G Am F', sub: 'MODERN · ANTHEM', color: GOLD, size: 44 }], o0, o1, { rows: 1, cols: 2, cw: 480, chh: 200, y: 680 });
    g.active.push({ t0: o0, t1: oMid, i: 0 }, { t0: oMid, t1: o1, i: 1 });
    loop(o0, oMid, PROG, { strikes: triplets, vel: 0.75, rows: [null, null, null, null] });
    const ml = (o1 - oMid - 0.1) / 4;
    MOD.forEach((c, i) => a.ch(c, oMid + i * ml, oMid + (i + 1) * ml, { notes: V[c], bass: BASS[c], strikes: eighths(ml), vel: 0.95 }));
    for (let i = 0; i < 16; i++) { const t = oMid + i * ml / 4; a.perc(i % 2 ? 'snare' : 'kick', t, 0.7); a.perc('hat', t + ml / 8, 0.4); }

    // essence: one last slow loop, landing home
    const x0 = S('essence').t0 + 0.1, xl = 1.15;
    PROG.forEach((c, i) => a.ch(c, x0 + i * xl, x0 + (i + 1) * xl, { row: i, notes: V[c], bass: BASS[c], strikes: triplets(xl), vel: 0.8 }));
    PROG.forEach((c, i) => a.ch(c, x0 + (4 + i) * xl, x0 + (5 + i) * xl, { row: i, notes: V[c], bass: BASS[c], strikes: triplets(xl), vel: 0.7 }));
    a.ch('C', x0 + 8 * xl, S('essence').t1 - 0.3, { row: 0, notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2' });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
