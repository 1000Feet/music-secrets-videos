// The secret order of sharps and flats: key signatures march around the circle of fifths.
// Public-domain pieces: only their keys (scales and tonic chords) are shown, no melodies.
module.exports = {
  slug: 'key-signatures',
  title: 'The Secret Order of Sharps and Flats',
  segments: [
    { id: 'hook',    text: 'Sharps and flats in a key signature always arrive in the same secret order.' },
    { id: 'what',    text: 'A key signature tells you which notes are sharp or flat for the whole piece.' },
    { id: 'elise',   text: 'Für Elise is in A minor: no sharps, no flats.' },
    { id: 'moon',    text: 'The Moonlight Sonata, in C sharp minor: four sharps.' },
    { id: 'clair',   text: 'Clair de lune, in D flat major: five flats.' },
    { id: 'why1',    text: "So what's the secret? Each step up the circle of fifths adds one sharp." },
    { id: 'why2',    text: 'G major has one: F sharp. D major adds C sharp. A major adds G sharp.' },
    { id: 'order',   text: 'Sharps always come in this order: Father Charles Goes Down And Ends Battle.' },
    { id: 'lead',    text: 'Each new key keeps six notes and raises one: its new leading tone.' },
    { id: 'flats',   text: 'Walk the other way, and each step adds a flat: B, E, A, D, G, C, F.' },
    { id: 'trick',   text: 'The shortcut: in sharp keys, the key is a half step above the last sharp.' },
    { id: 'trick2',  text: "In flat keys, except F, it's the second to last flat." },
    { id: 'essence', text: "Sharps and flats aren't random. They march around the circle of fifths, one at a time." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'KEY SIGNATURES', title: 'THE SECRET ORDER', accent: true, tonic: 0, min: 6.0, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'THE KEY SIGNATURE', title: 'SHARPS & FLATS', tonic: 0, tail: 0.8 },
    { id: 'elise', segs: ['elise'], label: 'YOU HEAR IT IN', title: 'Für Elise', sub: 'Beethoven · in A minor', tonic: 0, tail: 1.6 },
    { id: 'moon', segs: ['moon'], label: 'YOU HEAR IT IN', title: 'Moonlight Sonata', sub: 'Beethoven · in C# minor', tonic: 0, tail: 1.6 },
    { id: 'clair', segs: ['clair'], label: 'YOU HEAR IT IN', title: 'Clair de lune', sub: 'Debussy · in Db major', tonic: 0, tail: 1.8 },
    { id: 'why', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'UP A FIFTH', tonic: 0, gap: 0.35, tail: 0.5 },
    { id: 'order', segs: ['order'], label: 'THE ORDER OF SHARPS', title: 'F C G D A E B', tonic: 0, tail: 1.1 },
    { id: 'lead', segs: ['lead'], label: 'SIX STAY, ONE RISES', title: 'THE LEADING TONE', tonic: 0, tail: 1.2 },
    { id: 'flats', segs: ['flats'], label: 'THE ORDER OF FLATS', title: 'B E A D G C F', tonic: 0, tail: 1.1 },
    { id: 'trick', segs: ['trick', 'trick2'], label: 'THE SHORTCUT', title: 'NAME THAT KEY', tonic: 0, gap: 0.6, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE AT A TIME', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const MAJ = [0, 2, 4, 5, 7, 9, 11];
    // the seven notes of a major key, as absolute pitch classes (tonic 0 keeps the colours fixed per note)
    const keySet = k => MAJ.map(d => (k + d) % 12);
    const key = (t, k) => a.scale(t, 0, keySet(k));
    const SHARPS = [['F#', 6], ['C#', 1], ['G#', 8], ['D#', 3], ['A#', 10], ['E#', 5], ['B#', 0]];
    const FLATS = [['Bb', 10], ['Eb', 3], ['Ab', 8], ['Db', 1], ['Gb', 6], ['Cb', 11], ['Fb', 4]];
    const SKEYS = [['G', 7], ['D', 2], ['A', 9], ['E', 4], ['B', 11], ['F#', 6], ['C#', 1]];
    const FKEYS = [['F', 5], ['Bb', 10], ['Eb', 3], ['Ab', 8], ['Db', 1], ['Gb', 6], ['Cb', 11]];
    const acc = (list, n, t0, t1, color, step = 0) => list.slice(0, n).forEach(([txt, p], i) => a.tag(p, t0 + i * step, t1, txt, { color, dr: -75 }));

    // the whole video lives on the circle of fifths
    a.layout(0, 1, 0.01);

    // ---- hook: F C G D A E B pop in clockwise; sharps go clockwise, flats the other way ----
    const h1 = S('hook').t1, FC = [5, 0, 7, 2, 9, 4, 11], FN = ['F3', 'C4', 'G4', 'D4', 'A4', 'E4', 'B4'];
    a.scale(0.2, 0, FC, { popIn: { t0: 0.3, step: 0.08 } });
    FN.forEach((n, i) => a.note(n, 0.3 + i * 0.08, 1.2, { vel: 0.16 }));
    ['F', 'C', 'G', 'D', 'A', 'E', 'B'].forEach((l, i) => a.big(l, 0.3 + i * 0.08, h1, { x: 540 + (i - 3) * 78, y: 462, size: 46, ...MONO, color: GOLD }));
    a.ch('C', 0.9, h1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45, label: 'C', strikes: [{ o: 0, v: 1 }, { o: 1.6, v: 0.5 }, { o: 3.2, v: 0.5 }] });
    const tSame = a.w('hook', 'same');
    a.walker([[0.9, 'C'], [1.6, 'G'], [2.1, 'D'], [2.6, 'A'], [3.1, 'E'], [3.6, 'B']], { t1: tSame, dr: 34, color: GOLD, label: '#', labelDr: 82 });
    a.walker([[tSame, 'C'], [tSame + 0.4, 'F'], [tSame + 0.8, 'Bb'], [tSame + 1.2, 'Eb']], { t1: h1, dr: 34, color: BLUE, label: 'b', labelDr: 82 });

    // ---- what: G major - every F becomes F# ----
    const w0 = S('what').t0, w1 = S('what').t1;
    key(w0, 7);
    a.ch('G', w0 + 0.1, w1, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.5, label: 'G', strikes: [{ o: 0, v: 1 }, { o: 1.5, v: 0.5 }, { o: 3.0, v: 0.5 }] });
    a.tag(6, a.w('what', 'sharp'), w1, 'F#', { color: GOLD, dr: -75 });
    a.ring([6], a.w('what', 'sharp'), w1, { color: GOLD });
    a.big('EVERY F → F#', a.w('what', 'whole'), w1, { ...TOP, color: GOLD });
    ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G4'].forEach((n, i) => a.note(n, a.w('what', 'whole') + i * 0.18, 0.4, { vel: 0.22 }));

    // ---- Für Elise: A minor, no sharps or flats (scale and chords only) ----
    const e0 = S('elise').t0, e1 = S('elise').t1;
    a.scale(e0, 0, keySet(0));
    a.ring([9], e0 + 0.2, e1, { color: WHITE });
    a.big('0 SHARPS · 0 FLATS', a.w('elise', 'no'), e1, { ...TOP, size: 40, color: WHITE });
    const el = (e1 - e0 - 0.2) / 4;
    [['Am', ['A3', 'C4', 'E4'], 'A2'], ['E', ['G#3', 'B3', 'E4'], 'E2'], ['Am', ['A3', 'C4', 'E4'], 'A2'], ['Am', ['C4', 'E4', 'A4'], 'A2']]
      .forEach(([c, n, b], i) => a.ch(c, e0 + 0.1 + i * el, e0 + 0.1 + (i + 1) * el, { notes: n, bass: b, vel: 0.5, label: c === 'E' ? 'E' : 'Am', strikes: [{ o: 0, v: 1 }, { o: el / 2, v: 0.5 }] }));
    a.tag(8, e0 + 0.1 + el, e0 + 0.1 + 2 * el, 'G#', { color: '#9a9aa2', dr: -75 });

    // ---- Moonlight Sonata: C# minor, four sharps ----
    const m0 = S('moon').t0, m1 = S('moon').t1, tFour = a.w('moon', 'four');
    a.scale(m0, 0, keySet(4));   // C# minor shares its notes with E major
    acc(SHARPS, 4, tFour, m1, GOLD, 0.15);
    a.big('4 SHARPS', tFour, m1, { ...TOP, color: GOLD });
    a.ch('C#m', m0 + 0.1, m1, { notes: ['C#4', 'E4', 'G#4'], bass: 'C#3', vel: 0.5, strikes: [{ o: 0, v: 1 }, { o: 1.4, v: 0.5 }, { o: 2.8, v: 0.5 }, { o: 4.2, v: 0.5 }] });

    // ---- Clair de lune: Db major, five flats ----
    const c0 = S('clair').t0, c1 = S('clair').t1, tFive = a.w('clair', 'five');
    a.scale(c0, 0, keySet(1));
    acc(FLATS, 5, tFive, c1, BLUE, 0.15);
    a.big('5 FLATS', tFive, c1, { ...TOP, color: BLUE });
    a.ch('Db', c0 + 0.1, c1, { notes: ['F3', 'Ab3', 'Db4', 'F4'], bass: 'Db3', vel: 0.45, label: 'Db', strikes: [{ o: 0, v: 1 }, { o: 1.4, v: 0.5 }, { o: 2.8, v: 0.5 }, { o: 4.2, v: 0.5 }] });

    // ---- why: up a fifth, one more sharp: C, G, D, A ----
    const y0 = S('why').t0, y1 = S('why').t1, tWalk = a.w('why1', 'step');
    key(y0, 0);
    a.ch('C', y0 + 0.1, a.w('why2', 'G'), { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45 });
    a.big('C MAJOR · NO SHARPS', y0 + 0.2, a.w('why2', 'G'), { ...TOP, size: 40, color: WHITE });
    const tk = [a.w('why2', 'G'), a.w('why2', 'D'), a.w('why2', 'A')].map(t => t - 0.05);
    a.walker([[tWalk, 'C'], [tWalk + 0.5, 'G'], [tWalk + 0.9, 'D'], [tWalk + 1.3, 'A'], [tWalk + 1.9, 'C'], [tk[0], 'G'], [tk[1], 'D'], [tk[2], 'A']], { t1: y1, dr: 34, color: GOLD });
    const VO = { G: [['B3', 'D4', 'G4'], 'G2'], D: [['A3', 'D4', 'F#4'], 'D3'], A: [['A3', 'C#4', 'E4'], 'A2'] };
    SKEYS.slice(0, 3).forEach(([k, p], i) => {
      const t1 = i < 2 ? tk[i + 1] : y1;
      key(tk[i], p);
      a.ch(k, tk[i], t1, { notes: VO[k][0], bass: VO[k][1], vel: 0.55 });
      a.tag(SHARPS[i][1], tk[i] + 0.1, y1, SHARPS[i][0], { color: GOLD, dr: -75 });
      a.big(`${k} MAJOR · ${i + 1} #`, tk[i], t1, { ...TOP, color: GOLD });
    });

    // ---- order: Father Charles Goes Down And Ends Battle - all seven sharps, key by key ----
    const o0 = S('order').t0, o1 = S('order').t1;
    const OW = ['Father', 'Charles', 'Goes', 'Down', 'And', 'Ends', 'Battle'].map(w => a.w('order', w) - 0.05);
    key(o0, 0);
    a.ch('C', o0 + 0.1, OW[0], { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.4 });
    a.walker([[o0 + 0.1, 'C'], ...SKEYS.map(([, p], i) => [OW[i], p])], { t1: o1, dr: 34, color: GOLD });
    SKEYS.forEach(([k, p], i) => {
      const t1 = i < 6 ? OW[i + 1] : o1;
      key(OW[i], p);
      a.ch(k, OW[i], t1, { vel: 0.5 });
      a.tag(SHARPS[i][1], OW[i], o1, SHARPS[i][0], { color: GOLD, dr: -75 });
      a.big(SHARPS[i][0][0], OW[i], o1, { x: 540 + (i - 3) * 78, y: 462, size: 46, ...MONO, color: GOLD });
    });

    // ---- lead: C -> G keeps six notes, F rises to F#, the new leading tone ----
    const l0 = S('lead').t0, l1 = S('lead').t1, tKeep = a.w('lead', 'keeps'), tRaise = a.w('lead', 'raises'), tLead = a.w('lead', 'leading');
    key(l0, 0);
    a.ch('C', l0 + 0.1, tRaise, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.45, hideName: true });
    a.big('C MAJOR', l0 + 0.2, tRaise, { y: 830, size: 70, color: WHITE });
    a.ring([7, 9, 11, 0, 2, 4], tKeep, l1, { color: TEAL });
    a.big('6 STAY', tKeep, tRaise, { ...TOP, color: TEAL });
    key(tRaise, 7);
    a.tag(6, tRaise, l1, 'F → F#', { color: GOLD, dr: -75 });
    a.ring([6], tRaise, l1, { color: GOLD });
    a.note('F4', tRaise - 0.3, 0.3, { vel: 0.26 }); a.note('F#4', tRaise, 0.8, { vel: 0.3 });
    a.big('G MAJOR', tRaise, l1, { y: 830, size: 70, color: GOLD });
    a.big('1 RISES', tRaise, tLead, { ...TOP, color: GOLD });
    a.big('LEADING TONE', tLead, l1, { ...TOP, color: GOLD });
    a.ch('D7', tLead, tLead + 0.9, { notes: ['F#3', 'C4', 'D4', 'A4'], bass: 'D3', vel: 0.55, hideName: true, shape: false });
    a.note('F#4', tLead, 0.9, { vel: 0.32 });
    a.ch('G', tLead + 0.9, l1 - 0.1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.65, hideName: true, shape: false });

    // ---- flats: the other way round, B E A D G C F ----
    const f0 = S('flats').t0, f1 = S('flats').t1, tWay = a.w('flats', 'way');
    const FW = ['B', 'E', 'A', 'D', 'G', 'C', 'F'].map(w => a.w('flats', w) - 0.05);
    key(f0, 0);
    a.ch('C', f0 + 0.1, FW[0], { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.4 });
    a.walker([[f0 + 0.1, 'C'], [tWay, 'F'], [tWay + 0.4, 'C'], ...FKEYS.map(([, p], i) => [FW[i], p])], { t1: f1, dr: 34, color: BLUE });
    FKEYS.forEach(([k, p], i) => {
      const t1 = i < 6 ? FW[i + 1] : f1;
      key(FW[i], p);
      a.ch(k === 'Cb' ? 'B' : k, FW[i], t1, { vel: 0.5, label: k });
      a.tag(FLATS[i][1], FW[i], f1, FLATS[i][0], { color: BLUE, dr: -75 });
      a.big(FLATS[i][0][0], FW[i], f1, { x: 540 + (i - 3) * 78, y: 462, size: 46, ...MONO, color: BLUE });
    });

    // ---- trick: A major (last sharp G#, up a half step = A); Eb major (second-to-last flat = Eb) ----
    const k0 = S('trick').t0, k1 = S('trick').t1, t2 = a.at('trick2');
    key(k0, 9);
    acc(SHARPS, 3, k0 + 0.2, t2 - 0.1, GOLD, 0.2);
    const tLast = a.w('trick', 'last'), tHalf = a.w('trick', 'half');
    a.ring([8], tLast, tHalf + 0.6, { color: GOLD });
    a.ring([9], tHalf + 0.6, t2 - 0.1, { color: WHITE });
    a.big('?', k0 + 0.3, tHalf + 0.6, { y: 830, size: 130, color: WHITE });
    a.big('LAST SHARP G#', tLast - 0.6, tHalf + 0.6, { ...TOP, color: GOLD });
    a.big('G# + ½ STEP = A', tHalf + 0.6, t2 - 0.1, { ...TOP, color: GOLD });
    a.ch('E7', k0 + 0.1, tHalf + 0.6, { notes: ['G#3', 'B3', 'D4', 'E4'], bass: 'E2', vel: 0.45, hideName: true, shape: false });
    a.note('G#4', tLast, 0.6, { vel: 0.3 }); a.note('A4', tHalf + 0.6, 0.9, { vel: 0.3 });
    a.ch('A', tHalf + 0.6, t2 - 0.1, { notes: ['A3', 'C#4', 'E4', 'A4'], bass: 'A2', vel: 0.6 });
    // flat keys
    key(t2, 3);
    acc(FLATS, 3, t2 + 0.1, k1, BLUE, 0.2);
    const tSec = a.w('trick2', 'second');
    a.big('?', t2 + 0.1, tSec, { y: 830, size: 130, color: WHITE });
    a.big('EXCEPT F', a.w('trick2', 'except'), tSec, { ...TOP, color: '#b9b9c2' });
    a.ring([3], tSec, k1, { color: BLUE });
    a.big('Bb  Eb  Ab  →  Eb', tSec, k1, { ...TOP, color: BLUE });
    a.ch('Bb7', t2, tSec, { notes: ['D4', 'F4', 'Ab4', 'Bb4'], bass: 'Bb2', vel: 0.45, hideName: true, shape: false });
    a.ch('Eb', tSec, k1 - 0.1, { notes: ['G3', 'Bb3', 'Eb4', 'G4'], bass: 'Eb3', vel: 0.6 });

    // ---- essence: once around the circle of fifths, home on C ----
    const s0 = S('essence').t0, s1 = S('essence').t1, tC = a.at('cta');
    const ROUND = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'];
    const sl = (tC - 0.3 - s0) / 13;
    const pts = ROUND.map((r, i) => [s0 + 0.15 + i * sl, r]);
    a.walker(pts, { t1: s1, dr: 34, color: GOLD });
    ROUND.forEach((r, i) => {
      key(pts[i][0], a.T.pc(r));
      a.ch(r, pts[i][0], i < 12 ? pts[i][0] + sl : s1 - 0.3, { vel: i < 12 ? 0.45 : 0.7, label: r });
    });
    a.big('ONE AT A TIME', a.w('essence', 'one'), s1, { ...TOP, color: GOLD });
    a.cta(tC + 0.6, 'Leave a song in the comments');
    void PINK; void RED;
  },
};
