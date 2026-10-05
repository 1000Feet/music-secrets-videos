// Blue notes: the flat third, flat five and flat seven, bent into a major key - a clash on purpose.
const BEAT = 0.5, SW = BEAT * 2 / 3;   // a slow shuffle

module.exports = {
  slug: 'blue-notes',
  title: 'Blue Notes',
  segments: [
    { id: 'hook',    text: "Three notes that don't belong in the key... yet they're the sound of the blues." },
    { id: 'what',    text: 'In C major, take the third, the fifth and the seventh... and flatten them.' },
    { id: 'what2',   text: 'E flat, G flat, B flat. These are the blue notes.' },
    { id: 'scale',   text: 'Mix them in, and you get the blues scale: C, E flat, F, G flat, G, B flat.' },
    { id: 's1',      text: 'In Smoke on the Water, the second phrase of the riff adds one extra note:' },
    { id: 's1b',     text: 'D flat, in the key of G. The flat five.' },
    { id: 's2',      text: 'And the flat five is everywhere in blues and rock guitar solos.' },
    { id: 'why1',    text: 'So why do they sound so bluesy? First, they live between the keys.' },
    { id: 'why2',    text: 'Singers and guitarists bend between the minor and the major third.' },
    { id: 'why3',    text: "The flat five sits right in the middle of the octave. That's the tritone, with its gritty edge." },
    { id: 'why4',    text: 'And over a major chord, a minor third clashes on purpose. That friction is the blues feeling.' },
    { id: 'why5',    text: 'These sounds come from African-American musical traditions that shaped the blues.' },
    { id: 'essence', text: "Notes between the keys, a clash on purpose. That's the sound of the blues." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE SOUND OF THE BLUES', title: 'BLUE NOTES', accent: true, tonic: 0, tail: 1.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'THREE FLATTENED NOTES', title: 'b3 · b5 · b7', tonic: 0, gap: 0.4, tail: 0.6 },
    { id: 'scale', segs: ['scale'], label: 'C Eb F Gb G Bb', title: 'THE BLUES SCALE', tonic: 0, tail: 1.2 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'Smoke on the Water', sub: 'Deep Purple · 1972 · in G', tonic: 7, gap: 0.3, tail: 1.0 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Guitar Solos', sub: 'blues · rock', tonic: 0, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'BETWEEN THE KEYS', tonic: 0, tail: 2.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE BEND', tonic: 0, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE FLAT FIVE', tonic: 0, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'A CLASH ON PURPOSE', tonic: 0, tail: 1.2 },
    { id: 'why5', segs: ['why5'], label: 'WHERE IT COMES FROM', title: 'THE ROOTS', tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A DELIBERATE CLASH', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const BLUE = '#62a8ff', GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8';
    const BLUES = [0, 3, 5, 6, 7, 10];
    const C7 = ['E3', 'Bb3', 'C4', 'E4'], F7 = ['Eb3', 'A3', 'C4', 'F4'];
    // a shuffle comp: chord on 2 and 4, soft drums
    function shuffle(name, t0, t1, o = {}) {
      const v = o.vel ?? 0.6, notes = o.notes ?? (name === 'F7' ? F7 : C7);
      const strikes = [];
      for (let t = BEAT; t < t1 - t0 - 0.05; t += 2 * BEAT) strikes.push({ o: t, v: 0.8 });
      a.ch(name, t0, t1, { notes, bass: o.bass ?? (name === 'F7' ? 'F2' : 'C2'), strikes: [{ o: 0, v: 1 }, ...strikes], vel: v, label: o.label, hideName: o.hideName, shape: o.shape });
      for (let t = t0; t < t1 - 0.05; t += BEAT) {
        a.perc('hat', t, 0.3 * v); a.perc('hat', t + SW, 0.18 * v);
        if (Math.round((t - t0) / BEAT) % 2) a.perc('snare', t, 0.25 * v); else a.perc('kick', t, 0.35 * v);
      }
    }
    // play a list of [note, beats] in shuffle feel
    const lick = (list, t0, beat = BEAT, v = 0.36) => a.melody(list, t0, beat, { vel: v, legato: 0.9 });

    // ---------- hook: three notes outside C major, then the bluesy sound ----------
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    const tThree = a.w('hook', 'Three') - 0.05, tBel = a.w('hook', 'belong') - 0.05, tBlues = a.w('hook', 'blues') - 0.05;
    a.ch('C', 0.3, tBlues, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.5 });
    const outs = ['Eb', 'F#', 'Bb'];
    outs.forEach((n, i) => {
      const t = tThree + 0.15 + i * (tBel + 0.4 - tThree) / 3;
      a.note(n + '4', t, 0.5, { vel: 0.38 });
      a.ring([n], t, S('hook').t1, { color: BLUE });
    });
    a.tag(0, tBel, tBlues, 'NOT IN THE KEY', { x: 540, y: 455, color: BLUE });
    shuffle('C7', tBlues, S('hook').t1, { vel: 0.7 });
    lick([['G4', 2 / 3], ['Bb4', 1 / 3], ['C5', 2 / 3], ['Eb5', 1 / 3], ['E5', 1], ['C5', 1]], tBlues + 0.1, BEAT * 0.9, 0.4);
    a.tag(0, tBlues, S('hook').t1, 'BLUE NOTES', { x: 540, y: 455, color: BLUE });

    // ---------- what: flatten 3, 5, 7 ----------
    const w0 = S('what').t0;
    a.scale(w0, 'C');
    a.ch('C', w0 + 0.1, S('what').t1, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.45, hideName: false });
    const tT = a.w('what', 'third') - 0.05, tF = a.w('what', 'fifth') - 0.05, tS = a.w('what', 'seventh') - 0.05, tFl = a.w('what', 'flatten') - 0.05;
    [['E', tT, '3RD'], ['G', tF, '5TH'], ['B', tS, '7TH']].forEach(([n, t, lab]) => {
      a.tag(n, t, tFl + 0.4, lab, { color: GOLD, dr: -75 });
      a.note(n + '4', t, 0.6, { vel: 0.32 });
    });
    [['E', 'Eb'], ['G', 'F#'], ['B', 'Bb']].forEach(([x, y], i) => {
      a.arc(x, y, tFl + i * 0.15, S('what').t1, { steps: -1, color: BLUE, dr: 30 });
      a.note(y + '4', tFl + 0.4 + i * 0.25, 0.5, { vel: 0.32 });
    });
    // what2: E flat, G flat, B flat
    const bW = [a.w('what2', 'E'), a.w('what2', 'G'), a.w('what2', 'B')].map(t => t - 0.05);
    [['Eb', 'E FLAT'], ['F#', 'G FLAT'], ['Bb', 'B FLAT']].forEach(([n, lab], i) => {
      a.ring([n], bW[i], S('what').t1, { color: BLUE });
      a.tag(n, bW[i], S('what').t1, lab, { color: BLUE, dr: -92 });
      a.note(n + '4', bW[i], 0.6, { vel: 0.36 });
    });
    a.tag(0, a.w('what2', 'blue'), S('what').t1, 'BLUE NOTES', { x: 540, y: 455, color: BLUE });

    // ---------- scale: C Eb F Gb G Bb ----------
    const sc0 = a.w('scale', 'blues') - 0.1;
    a.scale(sc0, 'C', BLUES);
    a.poly(['C', 'Eb', 'F', 'F#', 'G', 'Bb'], sc0 + 0.3, S('scale').t1, { color: BLUE, glow: true });
    const sW = [a.w('scale', 'C'), a.w('scale', 'E'), a.w('scale', 'F'), a.w('scale', 'G'), a.w('scale', 'G', 1), a.w('scale', 'B')].map(t => t - 0.04);
    ['C4', 'Eb4', 'F4', 'Gb4', 'G4', 'Bb4'].forEach((n, i) => a.note(n, sW[i], 0.45, { vel: 0.36 }));
    a.note('C5', sW[5] + 0.45, 0.8, { vel: 0.34 });
    a.tag('F#', sW[3], S('scale').t1, 'G FLAT', { color: BLUE, dr: -75 });
    shuffle('C7', S('scale').t0 + 0.1, sc0, { vel: 0.4, hideName: true });
    shuffle('C7', sc0, S('scale').t1 - 0.1, { vel: 0.3, hideName: true, shape: false });

    // ---------- s1: Smoke on the Water - the flat five, D flat in G (just the interval, no riff) ----------
    const p0 = S('s1').t0;
    a.scale(p0, 'G');
    const tDb = a.w('s1b', 'D') - 0.05;
    a.ch('G5', p0 + 0.1, tDb, { notes: ['G2', 'D3', 'G3'], bass: 'G1', vel: 0.6, label: 'G' });
    a.ch('G5', tDb, S('s1').t1, { notes: ['G3', 'Db4'], bass: 'G1', vel: 0.65, label: 'G + Db' });
    a.ring(['C#'], tDb, S('s1').t1, { color: BLUE });
    a.tag('C#', tDb, S('s1').t1, 'D FLAT', { color: BLUE, dr: -92 });
    a.tag(0, a.w('s1b', 'flat', 1), S('s1').t1, 'FLAT FIVE', { x: 540, y: 470, color: BLUE });

    // ---------- s2: guitar solos - an original lick down the blues scale ----------
    const g0 = S('s2').t0;
    a.scale(g0, 'C', BLUES);
    shuffle('C7', g0 + 0.1, S('s2').t1 - 0.2, { vel: 0.55 });
    const gl = a.at('s2') + 0.6;
    lick([['C5', 2 / 3], ['Bb4', 1 / 3], ['G4', 2 / 3], ['Gb4', 1 / 3], ['F4', 2 / 3], ['Eb4', 1 / 3], ['C4', 1],
      ['Eb4', 2 / 3], ['F4', 1 / 3], ['Gb4', 2 / 3], ['G4', 1 / 3], ['Bb4', 1], ['C5', 1.5]], gl, BEAT * 0.9, 0.4);
    a.ring(['F#'], a.w('s2', 'flat') - 0.05, S('s2').t1, { color: BLUE });
    a.tag('F#', a.w('s2', 'flat') - 0.05, S('s2').t1, 'FLAT FIVE', { color: BLUE, dr: -92 });

    // ---------- part 2 ----------
    // why1: between the keys - E flat, E, and the pitch in between
    const y0 = S('why1').t0;
    a.scale(y0, 'C');
    const tBtw = a.w('why1', 'between') - 0.05;
    a.ch('C', y0 + 0.1, S('why1').t1, { notes: ['G3', 'C4'], bass: 'C2', vel: 0.45 });
    a.note('Eb4', tBtw - 0.9, 0.6, { vel: 0.34 });
    a.note('E4', tBtw - 0.25, 0.6, { vel: 0.34 });
    for (let k = 0; k < 2; k++) a.note(63.5, tBtw + 0.5 + k * 1.1, 0.9, { vel: 0.38 });   // a pitch between Eb and E
    a.arc('Eb', 'E', tBtw, S('why1').t1, { steps: 1, color: BLUE, dr: 30 });
    a.ring(['Eb', 'E'], tBtw, S('why1').t1, { color: BLUE });
    a.tag(0, tBtw, S('why1').t1, 'IN THE CRACK', { x: 540, y: 455, color: BLUE });

    // why2: the bend from the minor third toward the major third
    const b0 = S('why2').t0, tBend = a.w('why2', 'bend') - 0.05, tMin = a.w('why2', 'minor') - 0.05, tMaj = a.w('why2', 'major') - 0.05;
    a.scale(b0, 'C');
    shuffle('C7', b0 + 0.1, S('why2').t1, { vel: 0.45 });
    a.tag(0, tMin, tMaj, 'MINOR 3RD', { x: 540, y: 455, color: BLUE });
    a.tag(0, tMaj, S('why2').t1, 'MAJOR 3RD', { x: 540, y: 455, color: GOLD });
    for (let k = 0; k < 3; k++) {
      const t = tBend + k * 1.0;
      a.note('Eb4', t, 0.2, { vel: 0.36 }); a.note(63.5, t + 0.2, 0.15, { vel: 0.3 }); a.note('E4', t + 0.35, 0.5, { vel: 0.34 });
    }
    a.arc('Eb', 'E', tBend, S('why2').t1, { steps: 1, color: BLUE, dr: 30 });

    // why3: C to G flat - halfway round the octave, the tritone
    const r0 = S('why3').t0, tMid = a.w('why3', 'middle') - 0.05, tTri = a.w('why3', 'tritone') - 0.05;
    a.scale(r0, 'C', BLUES);
    a.ring(['F#'], r0 + 0.2, S('why3').t1, { color: BLUE });
    a.tag('F#', r0 + 0.2, S('why3').t1, 'G FLAT', { color: BLUE, dr: -92 });
    a.arc('C', 'F#', tMid, S('why3').t1, { steps: 6, color: TEAL, dr: 30 });
    a.tag(0, tMid, S('why3').t1, 'HALFWAY ROUND', { x: 540, y: 455, color: TEAL });
    a.line('C', 'F#', tTri, S('why3').t1, { color: RED, label: 'TRITONE', ly: 78 });
    a.note('C4', r0 + 0.3, 0.5, { vel: 0.34 }); a.note('Gb4', r0 + 0.8, 0.6, { vel: 0.34 });
    a.ch('C', tTri, S('why3').t1, { notes: ['C4', 'Gb4'], bass: 'C2', vel: 0.6, label: 'C + Gb', strikes: [{ o: 0, v: 1 }, { o: 0.75, v: 0.7 }, { o: 1.5, v: 0.8 }] });

    // why4: a C major chord with a minor third on top
    const c0 = S('why4').t0, tCl = a.w('why4', 'clashes') - 0.05, tFr = a.w('why4', 'friction') - 0.05;
    a.scale(c0, 'C');
    a.ch('C', c0 + 0.1, tCl, { notes: ['G3', 'C4', 'E4'], bass: 'C2', vel: 0.6 });
    a.ch('C', tCl, S('why4').t1, { notes: ['G3', 'C4', 'E4', 'Eb5'], bass: 'C2', vel: 0.65, label: 'C + Eb', strikes: [{ o: 0, v: 1 }, { o: 1.0, v: 0.7 }, { o: 2.0, v: 0.8 }] });
    a.ring(['Eb'], tCl, S('why4').t1, { color: RED });
    a.line('Eb', 'E', tCl, S('why4').t1, { color: RED, width: 6 });
    a.tag(0, tCl, tFr, 'MINOR 3RD ON TOP', { x: 540, y: 455, color: RED });
    a.tag(0, tFr, S('why4').t1, 'FRICTION', { x: 540, y: 455, color: RED });

    // why5: the roots - a slow call and response on the blues scale (original)
    const z0 = S('why5').t0;
    a.scale(z0, 'C', BLUES);
    a.poly(['C', 'Eb', 'F', 'F#', 'G', 'Bb'], z0 + 0.3, S('why5').t1, { color: BLUE });
    shuffle('C7', z0 + 0.1, a.w('why5', 'shaped') - 0.05, { vel: 0.4 });
    shuffle('F7', a.w('why5', 'shaped') - 0.05, S('why5').t1, { vel: 0.4 });
    lick([['G4', 1], ['Bb4', 2 / 3], ['C5', 1 / 3], ['Bb4', 1], ['G4', 2], [null, 1], ['Eb4', 2 / 3], ['F4', 1 / 3], ['Gb4', 2 / 3], ['F4', 1 / 3], ['Eb4', 1], ['C4', 2]], z0 + 0.4, BEAT, 0.3);

    // essence: the vamp, a blue lick, ending on C7 with the minor third on top
    const e0 = S('essence').t0;
    a.scale(e0, 'C', BLUES);
    const tCla = a.w('essence', 'clash') - 0.05;
    shuffle('C7', e0 + 0.1, tCla, { vel: 0.55 });
    lick([['Eb4', 1 / 3], ['E4', 2 / 3], ['G4', 1], ['Bb4', 2 / 3], ['C5', 1 / 3], ['Eb5', 1 / 3], ['E5', 2 / 3]], e0 + 0.3, BEAT, 0.36);
    a.ch('C7', tCla, a.at('cta'), { notes: ['E3', 'Bb3', 'Eb4', 'G4'], bass: 'C2', vel: 0.7, label: 'C7 + Eb' });
    a.ring(['Eb'], tCla, a.at('cta'), { color: RED });
    shuffle('C7', a.at('cta'), S('essence').t1 - 1.5, { vel: 0.45 });
    a.ch('C7', S('essence').t1 - 1.5, S('essence').t1 - 0.2, { notes: ['E3', 'Bb3', 'Eb4', 'G4', 'C5'], bass: 'C2', vel: 0.6 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
