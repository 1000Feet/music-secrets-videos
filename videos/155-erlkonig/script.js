// Schubert's Erlkönig: one singer, four characters, over a galloping piano.
// Brief/copyright: Schubert's melody is NOT reconstructed. We play generic G minor chords in a
// relentless repeated-note triplet figure (right hand) over a simple bass, our own short lines
// for the four characters (in their ranges), and our own two-note cry, stepping up each time.
const BEAT = 0.42, TRIP = BEAT / 3, BAR = 4 * BEAT; // fast 4/4, each beat hammered in triplets
// right-hand repeated chords and bass, per chord
const RH = {
  Gm: [['G4', 'Bb4', 'D5'], 'G2'], Cm: [['G4', 'C5', 'Eb5'], 'C3'], D7: [['F#4', 'C5', 'D5'], 'D2'],
  Eb: [['G4', 'Bb4', 'Eb5'], 'Eb2'], Bb: [['F4', 'Bb4', 'D5'], 'Bb2'],
  E7: [['G#4', 'D5', 'E5'], 'E2'], 'F#7': [['A#4', 'E5', 'F#5'], 'F#2'],
};
const PROG = ['Gm', 'Gm', 'Cm', 'D7'];

module.exports = {
  slug: 'erlkonig',
  title: 'Erlkönig',
  segments: [
    { id: 'hook',    text: 'One singer. Four characters. And a piano that never stops galloping.' },
    { id: 'what',    text: "This is Schubert's Erlkönig, written in 1815, when he was eighteen..." },
    { id: 'what2',   text: 'setting a poem by Goethe.' },
    { id: 'story',   text: 'A father rides through the night with his sick son.' },
    { id: 'story2',  text: 'And the Erl King, a supernatural being, tempts the boy.' },
    { id: 'why1',    text: 'So why is it so gripping? First, the piano.' },
    { id: 'why1b',   text: 'The right hand hammers fast repeated triplets, almost nonstop.' },
    { id: 'why1c',   text: 'A galloping horse... a racing heartbeat. Famously tiring to play.' },
    { id: 'why2',    text: 'Then, each character has its own sound. The narrator, in the middle.' },
    { id: 'why2b',   text: 'The father, low and calm.' },
    { id: 'why2c',   text: 'The son, high and increasingly frantic.' },
    { id: 'why2d',   text: 'And the Erl King: sweet, gentle, often in major keys.' },
    { id: 'why3',    text: "Each time the boy cries my father, my father, it's pitched higher." },
    { id: 'why3b',   text: 'Rising panic.' },
    { id: 'why4',    text: 'At the end, the galloping stops.' },
    { id: 'why4b',   text: 'And the narrator says, almost spoken, that the child was dead.' },
    { id: 'essence', text: 'One voice, four characters, a piano that never stops galloping... until it does.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'FRANZ SCHUBERT · 1815', title: 'ERLKÖNIG', accent: true, tonic: 7, min: 5.4 },
    { id: 'what', segs: ['what', 'what2'], label: 'A SONG BY SCHUBERT', title: 'ERLKÖNIG', sub: 'Franz Schubert · 1815 · in G minor', tonic: 7, gap: 0.2, tail: 0.6 },
    { id: 'story', segs: ['story', 'story2'], label: 'THE STORY', title: 'A RIDE IN THE NIGHT', circle: false, tonic: 7, gap: 0.3, tail: 0.8 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'THE GALLOP', circle: false, tonic: 7, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c', 'why2d'], label: 'WHY IT WORKS', title: 'FOUR CHARACTERS', circle: false, tonic: 7, gap: 0.3, tail: 1.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MY FATHER!', tonic: 7, gap: 0.3, tail: 1.2 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'THE ENDING', title: 'THE GALLOP STOPS', circle: false, tonic: 7, gap: 0.6, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'UNTIL IT STOPS', accent: true, tonic: 7, gap: 0.6, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const ORANGE = '#ffa45c', GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', GREY = '#8a8a92', BLUE = '#62a8ff', PINK = '#ff7a93', LILAC = '#b48cff', WHITE = '#ffffff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const VOX = { partials: [1, 0.5, 0.3, 0.15, 0.08], attack: 0.05, release: 0.25 };

    // the gallop: every beat hammered as three repeated chords; bass on beats 1 and 3.
    // prog = one chord per bar (cycling); returns the time it stopped
    function gallop(t0, t1, prog, o = {}) {
      let t = t0, i = 0;
      for (; t < t1 - 0.05; t += BEAT, i++) {
        const c = prog[Math.floor(i / 4) % prog.length], [rh, bs] = RH[c], end = Math.min(t + BEAT, t1);
        a.ch(c, t, end, { notes: rh, bass: false, vel: o.vel ?? 0.5, strikes: [{ o: 0, v: 1 }, { o: TRIP, v: 0.62 }, { o: 2 * TRIP, v: 0.72 }],
          shape: o.shape, hideName: o.hideName });
        if (i % 2 === 0) a.note(bs, t, BEAT * 1.8, { vel: (o.vel ?? 0.5) * 0.7, show: false });
        if (o.grid) [0, 1, 2].forEach(k => o.grid.active.push({ t0: t + k * TRIP, t1: t + (k + 1) * TRIP, i: (i * 3 + k) % o.grid.cells.length }));
      }
      return t;
    }
    // a short original line for one character, in its own range
    function sing(list, t0, beat, vel = 0.26) {
      let t = t0;
      for (const [n, b] of list) { a.note(n, t, b * beat * 0.92, { vel, show: false, tone: VOX }); t += b * beat; }
      return t;
    }
    // our own two-note cry (high, then a step down), held over a tense seventh chord
    function cry(t0, top, low, chord, o = {}) {
      a.note(top, t0, 0.45, { vel: o.vel ?? 0.3, tone: VOX, show: false });
      a.note(low, t0 + 0.45, 0.55, { vel: (o.vel ?? 0.3) * 0.85, tone: VOX, show: false });
      a.ch(chord, t0, t0 + (o.dur ?? 1.0), { notes: RH[chord][0], bass: RH[chord][1], vel: 0.55, strikes: [{ o: 0, v: 1 }, { o: TRIP, v: 0.6 }, { o: 2 * TRIP, v: 0.7 }, { o: BEAT, v: 0.8 }, { o: BEAT + TRIP, v: 0.6 }, { o: BEAT + 2 * TRIP, v: 0.7 }] });
    }

    // ---- hook (cover): G minor pops in, the gallop starts at once ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'G', a.T.MINOR, { popIn: { t0: 0.15, step: 0.06 } });
    gallop(0.25, h1 - 0.1, PROG, { vel: 0.5 });
    a.big('1 VOICE · 4 CHARACTERS', 0.3, h1, { y: 462, size: 46, ...MONO, color: GOLD, blur: 12 });
    a.ring(['G'], 0.3, h1, { color: GOLD });

    // ---- what: Schubert, 1815, age eighteen, a poem by Goethe ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'G', a.T.MINOR);
    gallop(w0 + 0.05, w1, PROG, { vel: 0.38 });
    a.tag('G', a.w('what', "Schubert's"), w1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('AGE 18', a.w('what', 'eighteen') - 0.1, a.at('what2') - 0.05, { y: 462, size: 60, color: GOLD, blur: 16 });
    a.big('POEM BY GOETHE', a.w('what2', 'poem') - 0.05, w1, { y: 462, size: 50, ...MONO, color: WHITE, blur: 10 });

    // ---- story: a father, a sick son, the Erl King ----
    const s0 = S('story').t0, s1 = S('story').t1;
    gallop(s0 + 0.05, s1, PROG, { vel: 0.32, shape: false });
    const gs = a.grid([
      { label: 'FATHER', sub: 'RIDES', color: BLUE, size: 52, subSize: 24 },
      { label: 'SON', sub: 'SICK', color: PINK, size: 56, subSize: 24 },
      { label: 'ERL KING', sub: 'TEMPTS', color: LILAC, size: 46, subSize: 24 },
    ], s0 + 0.1, s1, { rows: 1, cols: 3, cw: 330, chh: 250, y: 560, revealStep: 0.12 });
    gs.active.push({ t0: a.w('story', 'father') - 0.05, t1: a.at('story2') - 0.05, i: 0 }, { t0: a.w('story', 'son') - 0.05, t1: a.at('story2') - 0.05, i: 1 },
      { t0: a.w('story2', 'Erl') - 0.05, t1: s1, i: 2 });
    a.big('THROUGH THE NIGHT', s0 + 0.3, a.at('story2') - 0.05, { y: 920, size: 54, color: WHITE, blur: 12 });
    a.big('A SUPERNATURAL BEING', a.w('story2', 'supernatural') - 0.05, s1, { y: 920, size: 46, ...MONO, color: LILAC, blur: 12 });

    // ---- why1: the right hand hammers triplets - a gallop, a heartbeat ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const TWELVE = Array.from({ length: 12 }, (_, i) => ({ label: String(i % 3 + 1), color: i % 3 === 0 ? GOLD : TEAL, size: i % 3 === 0 ? 56 : 40 }));
    const g1 = a.grid(TWELVE, y0 + 0.1, y1, { rows: 1, cols: 12, cw: 82, chh: 150, y: 560, revealStep: 0.04, caption: 'ONE BAR · 4 BEATS × 3' });
    const tPiano = a.w('why1', 'piano') - 0.05, tTr = a.w('why1b', 'triplets') - 0.05;
    a.ch('Gm', y0 + 0.1, tPiano, { notes: ['G4', 'Bb4', 'D5'], bass: 'G2', vel: 0.35, shape: false });
    gallop(tPiano, y1, PROG, { vel: 0.5, shape: false, grid: g1 });
    a.big('THE PIANO', y0 + 0.3, a.w('why1b', 'right') - 0.05, { y: 900, size: 64, color: WHITE, blur: 14 });
    a.big('RIGHT HAND', a.w('why1b', 'right') - 0.05, tTr, { y: 900, size: 64, color: WHITE, blur: 14 });
    a.big('REPEATED TRIPLETS', tTr, a.at('why1c') - 0.05, { y: 900, size: 64, color: TEAL, blur: 18 });
    a.big('A GALLOPING HORSE', a.at('why1c') - 0.05, a.w('why1c', 'racing') - 0.05, { y: 900, size: 60, color: GOLD, blur: 18 });
    a.big('A RACING HEARTBEAT', a.w('why1c', 'racing') - 0.05, a.w('why1c', 'tiring') - 0.1, { y: 900, size: 60, color: RED, blur: 18 });
    a.big('TIRING TO PLAY', a.w('why1c', 'tiring') - 0.1, y1, { y: 900, size: 64, ...MONO, color: ORANGE, blur: 14 });

    // ---- why2: four characters, four sounds (short original lines in each range) ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const g2 = a.grid([
      { label: 'NARRATOR', sub: 'MIDDLE', color: WHITE, size: 50, subSize: 24 },
      { label: 'FATHER', sub: 'LOW · CALM', color: BLUE, size: 50, subSize: 24 },
      { label: 'SON', sub: 'HIGH · FRANTIC', color: PINK, size: 50, subSize: 24 },
      { label: 'ERL KING', sub: 'SWEET · MAJOR', color: LILAC, size: 50, subSize: 24 },
    ], z0 + 0.1, z1, { rows: 2, cols: 2, cw: 450, chh: 230, y: 470, revealStep: 0.12 });
    const tN = a.w('why2', 'narrator') - 0.05, tF = a.at('why2b') - 0.05, tS = a.at('why2c') - 0.05, tE = a.at('why2d') - 0.05;
    g2.active.push({ t0: tN, t1: tF, i: 0 }, { t0: tF, t1: tS, i: 1 }, { t0: tS, t1: tE, i: 2 }, { t0: tE, t1: z1, i: 3 });
    gallop(z0 + 0.1, tE, PROG, { vel: 0.26, shape: false });
    sing([['D4', 1], ['F4', 1], ['G4', 1], ['A4', 1], ['Bb4', 2]], tN + 0.1, 0.24, 0.24);
    sing([['D3', 2], ['Bb2', 1], ['A2', 1], ['G2', 3]], tF + 0.15, 0.3, 0.3);
    sing([['F5', 0.5], ['G5', 0.5], ['F5', 0.5], ['Eb5', 0.5], ['F5', 0.5], ['G5', 1.5]], tS + 0.2, 0.26, 0.22);
    // the Erl King: gentle, in major - the gallop softens into a Bb major lullaby
    const tSweet = tE + 0.1;
    for (let k = 0, t = tSweet; t < z1 - 0.3; k++, t += 2 * BEAT) {
      a.ch('Bb', t, t + 2 * BEAT, { notes: ['F4', 'Bb4', 'D5'], bass: 'Bb2', vel: 0.28, shape: false, strikes: [{ o: 0, v: 1 }, { o: 2 * TRIP, v: 0.5 }, { o: 4 * TRIP, v: 0.5 }] });
    }
    sing([['F5', 1.5], ['D5', 0.5], ['Bb4', 1], ['C5', 1], ['D5', 2]], tSweet + 0.2, 0.32, 0.2);
    a.big('LOW · MIDDLE · HIGH', a.w('why2', 'own') - 0.05, tE, { y: 1030, size: 40, ...MONO, color: GREY, blur: 0 });
    a.big('B FLAT MAJOR · SWEET', tE + 0.2, z1, { y: 1030, size: 40, ...MONO, color: LILAC, blur: 8 });

    // ---- why3: each cry pitched higher (our own cry, a whole step up each time) ----
    const c0 = S('why3').t0, c1 = S('why3').t1;
    a.scale(c0, 'G', a.T.MINOR);
    const tC = [a.w('why3', 'cries') - 0.05, a.w('why3', 'father', 1) - 0.05, a.w('why3', 'higher') - 0.05];
    gallop(c0 + 0.1, tC[0], ['Gm'], { vel: 0.35 });
    const CRIES = [['D5', 'C5', 'D7', 'D'], ['E5', 'D5', 'E7', 'E'], ['F#5', 'E5', 'F#7', 'F#']];
    const tEnd = [tC[1], tC[2], a.at('why3b') + 0.9];
    CRIES.forEach(([top, low, ch], i) => cry(tC[i], top, low, ch, { dur: tEnd[i] - tC[i] }));
    a.walker(CRIES.map(([, , , p], i) => [tC[i], p]), { t1: c1, dr: -40, color: RED });
    ['1ST', '2ND', '3RD'].forEach((l, i) => a.tag(CRIES[i][3], tC[i], c1, l, { dr: -92, color: [GOLD, '#ffa45c', RED][i] }));
    a.arc('D', 'E', tC[1], c1, { steps: 2, color: '#ffa45c', dr: 30 });
    a.arc('E', 'F#', tC[2], c1, { steps: 2, color: RED, dr: 30 });
    a.big('HIGHER EACH TIME', tC[2], a.at('why3b') - 0.05, { y: 462, size: 50, ...MONO, color: '#ffa45c', blur: 10 });
    a.big('RISING PANIC', a.at('why3b') - 0.05, c1, { y: 462, size: 60, color: RED, blur: 20 });
    gallop(tEnd[2], c1, ['Gm'], { vel: 0.4 });

    // ---- why4: the gallop stops; silence; then a quiet ending ----
    const e0 = S('why4').t0, e1 = S('why4').t1;
    const g4 = a.grid(TWELVE, e0 + 0.1, e1, { rows: 1, cols: 12, cw: 82, chh: 150, y: 560, revealStep: 0.02, caption: 'THE GALLOP' });
    const tStop = a.w('why4', 'stops');
    const stopAt = e0 + 0.1 + Math.ceil((tStop - e0 - 0.1) / BEAT) * BEAT;
    gallop(e0 + 0.1, stopAt, PROG, { vel: 0.5, shape: false, grid: g4 });
    a.big('AT THE END', e0 + 0.3, stopAt + 0.1, { y: 900, size: 60, ...MONO, color: WHITE, blur: 8 });
    a.big('SILENCE', stopAt + 0.1, a.at('why4b') - 0.05, { y: 900, size: 96, color: GREY, blur: 0 });
    a.big('ALMOST SPOKEN', a.w('why4b', 'almost') - 0.05, a.w('why4b', 'dead') - 0.05, { y: 900, size: 60, ...MONO, color: WHITE, blur: 8 });
    a.big('THE CHILD WAS DEAD', a.w('why4b', 'dead') - 0.1, e1, { y: 900, size: 64, color: RED, blur: 20 });
    const tDead = a.w('why4b', 'dead') + 0.25;
    a.ch('D7', tDead, tDead + 0.7, { notes: ['F#3', 'C4', 'D4'], bass: 'D2', vel: 0.45, shape: false });
    a.ch('Gm', tDead + 0.7, e1 - 0.1, { notes: ['G3', 'Bb3', 'D4'], bass: 'G2', vel: 0.4, shape: false });

    // ---- essence: gallop, then it stops on 'does'; a final G minor ----
    const f0 = S('essence').t0, f1 = S('essence').t1;
    a.scale(f0, 'G', a.T.MINOR);
    const tDoes = a.w('essence', 'does') - 0.05;
    const fStop = gallop(f0 + 0.1, tDoes, PROG, { vel: 0.5 });
    a.ch('Gm', fStop + 0.15, f1 - 0.2, { notes: ['G3', 'Bb3', 'D4', 'G4'], bass: 'G2', vel: 0.55 });
    a.big('UNTIL IT DOES', tDoes, f1, { y: 462, size: 54, ...MONO, color: RED, blur: 12 });
    a.ring(['G'], fStop + 0.15, f1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
