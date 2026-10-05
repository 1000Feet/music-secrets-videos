// The ii-V-I: two falling fifths and two half steps, the progression jazz is built from.
// Copyrighted songs: chords only, no melodies.
const B = 0.5; // one beat at 120 BPM

module.exports = {
  slug: 'ii-v-i',
  title: 'The ii–V–I',
  segments: [
    { id: 'hook',    text: "Jazz has a favourite sentence. It's only three chords long." },
    { id: 'what',    text: 'Two, five, one. In C major: D minor seven, G seven, C major seven.' },
    { id: 'satin',   text: 'Satin Doll stacks them up: D minor, G seven... then E minor, A seven, one step higher.' },
    { id: 'autumn',  text: 'Autumn Leaves...' },
    { id: 'fly',     text: 'and Fly Me to the Moon are built from them too.' },
    { id: 'why1',    text: 'So why does it work? The roots fall by a fifth, and then by a fifth again.' },
    { id: 'why1b',   text: 'D to G, G to C. The strongest move in harmony, twice in a row.' },
    { id: 'why2',    text: 'The two chord prepares the five. D minor seven already holds F, A and C: the four chord.' },
    { id: 'guide1',  text: 'Now follow the sevenths. C, the seventh of D minor, slips down to B.' },
    { id: 'guide2',  text: 'F, the seventh of G, slips down to E.' },
    { id: 'guide3',  text: 'Two quiet half steps carry the whole progression.' },
    { id: 'moves',   text: 'Jazz players use it as a building block, moving it to new keys...' },
    { id: 'tritone', text: 'or swapping in the tritone substitution: A flat minor seven, D flat seven, home.' },
    { id: 'essence', text: 'Two falling fifths, two tiny half steps. The sentence jazz says a thousand ways.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: "JAZZ'S FAVOURITE SENTENCE", title: 'THE ii – V – I', accent: true, tonic: 0, row: ['Dm7', 'G7', 'Cmaj7'], min: 6 * B * 2, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'IN C MAJOR', title: 'TWO, FIVE, ONE', tonic: 0, tail: 1.2 },
    { id: 'satin', segs: ['satin'], label: 'YOU HEAR IT IN', title: 'Satin Doll', sub: 'Ellington & Strayhorn · 1953 · in C', tonic: 0, row: ['Dm7', 'G7', 'Em7', 'A7', 'Am7', 'D7', 'Abm7', 'Db7'], min: 9 * 2 * B + 0.6, tail: 0.4 },
    { id: 'autumn', segs: ['autumn'], label: 'YOU HEAR IT IN', title: 'Autumn Leaves', sub: 'ii – V – I in G', tonic: 7, row: ['Am7', 'D7', 'Gmaj7'], min: 8 * B + 0.3, tail: 0.3 },
    { id: 'fly', segs: ['fly'], label: 'YOU HEAR IT IN', title: 'Fly Me to the Moon', sub: 'ii – V – I in C', tonic: 0, row: ['Dm7', 'G7', 'Cmaj7'], min: 8 * B + 0.4, tail: 0.6 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'TWO FALLING FIFTHS', tonic: 0, gap: 0.3, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE PRE-DOMINANT', tonic: 0, tail: 0.8 },
    { id: 'guide', segs: ['guide1', 'guide2', 'guide3'], label: 'GUIDE TONES', title: 'TWO HALF STEPS', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'moves', segs: ['moves'], label: 'BUILDING BLOCKS', title: 'NEW KEYS', tonic: 0, tail: 0.6 },
    { id: 'tritone', segs: ['tritone'], label: 'BUILDING BLOCKS', title: 'TRITONE SUB', tonic: 0, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A THOUSAND WAYS', accent: true, tonic: 0, row: ['Dm7', 'G7', 'Cmaj7'], gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    // guide-tone voicings: the sevenths fall a half step into the next third
    const V = {
      Dm7: [['F3', 'A3', 'C4', 'D4'], 'D3'], G7: [['F3', 'G3', 'B3', 'D4'], 'G2'], Cmaj7: [['E3', 'G3', 'B3', 'C4'], 'C3'],
      Em7: [['G3', 'B3', 'D4', 'E4'], 'E3'], A7: [['G3', 'A3', 'C#4', 'E4'], 'A2'], Dmaj7: [['F#3', 'A3', 'C#4', 'D4'], 'D3'],
      Am7: [['G3', 'A3', 'C4', 'E4'], 'A2'], D7: [['F#3', 'A3', 'C4', 'D4'], 'D3'], Gmaj7: [['F#3', 'G3', 'B3', 'D4'], 'G2'],
      Abm7: [['Gb3', 'Ab3', 'B3', 'Eb4'], 'Ab2'], Db7: [['F3', 'Ab3', 'B3', 'Db4'], 'Db3'], Fmaj7: [['E3', 'F3', 'A3', 'C4'], 'F2'],
      F: [['F3', 'A3', 'C4'], 'F2'],
    };
    const swing = len => [{ o: 0, v: 1 }, { o: len * 0.67, v: 0.5 }];
    // one chord; o.row for the row highlight, o.label to rename
    const C = (name, t0, t1, o = {}) => a.ch(name, t0, t1, { notes: V[name][0], bass: V[name][1], vel: o.vel ?? 0.8, row: o.row ?? null, strikes: o.strikes, label: o.label, hideName: o.hideName });
    // soft brushes: hat on every beat, a little snare on 2 and 4
    const brushes = (t0, t1, vel = 1) => { for (let t = t0, i = 0; t < t1 - 0.1; t += B, i++) { a.perc('hat', t, 0.28 * vel); a.perc('hat', t + B * 0.67, 0.16 * vel); if (i % 2) a.perc('snare', t, 0.14 * vel); } };
    // a run of evenly spaced chords
    const run = (names, t0, t1, o = {}) => { const len = (t1 - t0) / names.length; return names.map((n, i) => C(n, t0 + i * len, t0 + (i + 1) * len, { row: o.rows ? o.rows[i] : null, strikes: swing(len), vel: o.vel })); };

    // ---- hook: the progression twice, the root walking D -> G -> C ----
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const h0 = 0.3, hl = (S('hook').t1 - h0) / 6;
    const hk = run(['Dm7', 'G7', 'Cmaj7', 'Dm7', 'G7', 'Cmaj7'], h0, S('hook').t1, { rows: [0, 1, 2, 0, 1, 2], vel: 0.7 });
    a.walker(['D', 'G', 'C', 'D', 'G', 'C'].map((r, i) => [hk[i].t0, r]), { t1: S('hook').t1, dr: 34, label: 'ROOT', labelDr: 82 });
    brushes(h0, S('hook').t1, 0.8);

    // ---- what: chords on their names ----
    const tw = [a.w('what', 'D'), a.w('what', 'G'), a.w('what', 'C', 1)].map(t => t - 0.05);
    a.ch('Cmaj7', S('what').t0, tw[0], { notes: V.Cmaj7[0], bass: 'C3', vel: 0.4, hideName: true, shape: false });
    ['Dm7', 'G7', 'Cmaj7'].forEach((c, i) => C(c, tw[i], i < 2 ? tw[i + 1] : S('what').t1, { row: i }));
    a.walker([[tw[0], 'D'], [tw[1], 'G'], [tw[2], 'C']], { t1: S('what').t1, dr: 34, label: 'ROOT', labelDr: 82 });
    [['ii', 'Two', 0], ['V', 'five', 1], ['I', 'one', 2]].forEach(([r, w, i]) => a.big(r, a.w('what', w), S('what').t1, { ...TOP, x: 540 + (i - 1) * 200, size: 64, color: GOLD }));

    // ---- Satin Doll: chains of ii-V's (chords only) ----
    const sd0 = S('satin').t0 + 0.1, sl = 2 * B;
    const SD = ['Dm7', 'G7', 'Em7', 'A7', 'Am7', 'D7', 'Abm7', 'Db7'];
    const tS = [a.w('satin', 'D') - 0.05, a.w('satin', 'G') - 0.05, a.w('satin', 'E') - 0.05, a.w('satin', 'A') - 0.05];
    const tRest = Math.max(tS[3] + 1.0, a.w('satin', 'higher'));
    const SDt = [sd0, tS[1], tS[2], tS[3], tRest, tRest + sl, tRest + 2 * sl, tRest + 3 * sl, tRest + 4 * sl];
    SD.forEach((c, i) => C(c, i ? SDt[i] : Math.min(sd0, tS[0]), SDt[i + 1], { row: i, strikes: swing(SDt[i + 1] - SDt[i]) }));
    C('Cmaj7', SDt[8], S('satin').t1, { strikes: swing(sl) });
    brushes(sd0, S('satin').t1);
    a.walker(['D', 'G', 'E', 'A', 'A', 'D', 'Ab', 'Db', 'C'].map((r, i) => [SDt[i], r]), { t1: S('satin').t1, dr: 34 });

    // ---- Autumn Leaves / Fly Me to the Moon: their ii-V-I's ----
    a.scale(S('autumn').t0, 'G');
    run(['Am7', 'D7', 'Gmaj7', 'Cmaj7'], S('autumn').t0 + 0.05, S('autumn').t1, { rows: [0, 1, 2, null] });
    brushes(S('autumn').t0 + 0.05, S('autumn').t1);
    a.scale(S('fly').t0, 'C');
    run(['Dm7', 'G7', 'Cmaj7', 'Fmaj7'], S('fly').t0 + 0.05, S('fly').t1, { rows: [0, 1, 2, null] });
    brushes(S('fly').t0 + 0.05, S('fly').t1);

    // ---- why1: on the circle of fifths, D, G and C are neighbours ----
    const y0 = S('why1').t0, tFall = a.w('why1', 'fall');
    a.layout(y0 + 0.2, 1, 1.4);
    a.layout(S('why1').t1 - 0.2, 0, 0.6);
    const fl = (S('why1').t1 - 0.4 - tFall) / 6;
    const fk = run(['Dm7', 'G7', 'Cmaj7', 'Dm7', 'G7', 'Cmaj7'], tFall - 0.05, S('why1').t1 - 0.4);
    a.ch('Cmaj7', y0 + 0.05, tFall - 0.05, { notes: V.Cmaj7[0], bass: 'C3', vel: 0.4 });
    a.walker(['D', 'G', 'C', 'D', 'G', 'C'].map((r, i) => [fk[i].t0, r]), { t1: S('why1').t1 - 0.2, dr: 34, label: 'ROOT', labelDr: 82 });
    a.big('D  →  G  →  C', a.w('why1', 'fifth'), a.w('why1b', 'strongest'), { ...TOP, size: 52, color: GOLD });
    a.big('DOWN A FIFTH, TWICE', a.w('why1b', 'strongest'), S('why1').t1, { ...TOP, color: '#ffffff' });

    // ---- why2: ii contains IV (F A C), the pre-dominant ----
    const p0 = S('why2').t0, tHold = a.w('why2', 'holds'), tFour = a.w('why2', 'four');
    C('Dm7', p0 + 0.05, tFour - 0.05);
    a.ghost('F', tHold, S('why2').t1, { color: GOLD, label: 'F · A · C', ly: 120 });
    a.ring(['F', 'A', 'C'], tHold, tFour, { color: GOLD });
    C('F', tFour - 0.05, tFour + 1.0, { label: 'F = IV' });
    C('Dm7', tFour + 1.0, S('why2').t1 - 1.4, { vel: 0.7 });
    C('G7', S('why2').t1 - 1.4, S('why2').t1 - 0.5, { vel: 0.7 });
    C('Cmaj7', S('why2').t1 - 0.5, S('why2').t1, { vel: 0.7 });
    a.big('ii PREPARES V', a.w('why2', 'prepares'), S('why2').t1, { ...TOP, color: GOLD });

    // ---- guide tones: C -> B, F -> E ----
    const g0 = S('guide').t0, tB = a.w('guide1', 'B') - 0.05, tE = a.w('guide2', 'E') - 0.05, g3 = a.at('guide3');
    C('Dm7', g0 + 0.05, tB);
    C('G7', tB, tE);
    C('Cmaj7', tE, g3 - 0.1);
    a.tag('C', a.w('guide1', 'C'), tB + 0.6, '7TH', { color: PINK, dr: -75 });
    a.arc('C', 'B', a.w('guide1', 'slips'), S('guide').t1, { steps: -1, color: PINK, dr: 30 });
    a.note('C5', a.w('guide1', 'C'), 0.6, { vel: 0.3 }); a.note('B4', tB, 0.8, { vel: 0.3 });
    a.big('C  →  B', a.w('guide1', 'slips'), a.at('guide2'), { ...TOP, size: 60, color: PINK });
    a.tag('F', a.w('guide2', 'F'), tE + 0.6, '7TH', { color: TEAL, dr: -75 });
    a.arc('F', 'E', a.w('guide2', 'slips'), S('guide').t1, { steps: -1, color: TEAL, dr: 30 });
    a.note('F4', a.w('guide2', 'F'), 0.6, { vel: 0.3 }); a.note('E4', tE, 0.8, { vel: 0.3 });
    a.big('F  →  E', a.w('guide2', 'slips'), g3, { ...TOP, size: 60, color: TEAL });
    // guide3: the whole progression again, slowly
    const gl = (S('guide').t1 - g3) / 3;
    run(['Dm7', 'G7', 'Cmaj7'], g3 - 0.1, S('guide').t1, { vel: 0.75 });
    a.big('C → B  ·  F → E', a.w('guide3', 'half'), S('guide').t1, { ...TOP, color: GOLD });

    // ---- moves: the ii-V moved up a whole step (as in Satin Doll) ----
    const m0 = S('moves').t0 + 0.05, tNew = a.w('moves', 'new') - 0.05;
    const ml = (tNew - m0) / 2;
    C('Dm7', m0, m0 + ml, { row: 0, strikes: swing(ml) }); C('G7', m0 + ml, tNew, { row: 1, strikes: swing(ml) });
    a.scale(tNew, 'D');
    const nl = (S('moves').t1 - tNew) / 2;
    C('Em7', tNew, tNew + nl, { row: 2, strikes: swing(nl) }); C('A7', tNew + nl, S('moves').t1, { row: 3, strikes: swing(nl) });
    brushes(m0, S('moves').t1);
    a.walker([[m0, 'D'], [m0 + ml, 'G'], [tNew, 'E'], [tNew + nl, 'A']], { t1: S('moves').t1, dr: 34 });
    a.big('UP A WHOLE STEP', tNew, S('moves').t1, { ...TOP, color: TEAL });

    // ---- tritone sub: Abm7 Db7 instead of Dm7 G7 ----
    const r0 = S('tritone').t0 + 0.05, tAb = a.w('tritone', 'A') - 0.05, tDb = a.w('tritone', 'D') - 0.05, tHome = a.w('tritone', 'home') - 0.05;
    a.scale(S('tritone').t0, 'C');
    C('Dm7', r0, (r0 + tAb) / 2, { vel: 0.6 }); C('G7', (r0 + tAb) / 2, tAb, { vel: 0.6 });
    C('Abm7', tAb, tDb, { row: 0 }); C('Db7', tDb, tHome, { row: 1, label: 'Db7' });
    C('Cmaj7', tHome, S('tritone').t1 - 0.2, { row: 2 });
    a.line('G', 'Db', a.w('tritone', 'tritone'), S('tritone').t1, { color: RED, label: 'TRITONE', ly: 90, r: 255 });
    a.tag('Db', tDb, S('tritone').t1, 'Db', { color: BLUE, dr: -75 });
    a.big('Db7 REPLACES G7', tDb, S('tritone').t1, { ...TOP, color: RED });

    // ---- essence: the sentence once more, landing home ----
    const e0 = S('essence').t0 + 0.1, eL = a.at('cta') - 0.2, el = (eL - e0) / 3;
    const ek = ['Dm7', 'G7', 'Cmaj7'].map((c, i) => C(c, e0 + i * el, i < 2 ? e0 + (i + 1) * el : S('essence').t1 - 0.3, { row: i, strikes: swing(el) }));
    a.walker([[ek[0].t0, 'D'], [ek[1].t0, 'G'], [ek[2].t0, 'C']], { t1: S('essence').t1, dr: 34 });
    a.arc('C', 'B', ek[1].t0, S('essence').t1, { steps: -1, color: PINK, dr: 30 });
    a.arc('F', 'E', ek[2].t0, S('essence').t1, { steps: -1, color: TEAL, dr: 30 });
    brushes(e0, eL, 0.8);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
