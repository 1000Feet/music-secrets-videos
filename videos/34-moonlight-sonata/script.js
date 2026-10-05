// Moonlight Sonata, first movement: nonstop triplets, a sinking bass and one Neapolitan chord.
const BEAT = 0.68, TR = BEAT / 3;
// the opening, as played in the 'play' scene: [chord, beats]
const OPENING_BEATS = 4 + 4 + 2 + 2 + 4 + 3;

module.exports = {
  slug: 'moonlight-sonata',
  title: 'Moonlight Sonata',
  segments: [
    { id: 'hook',     text: 'Three notes, rolling quietly over a deep bass... and the whole world calls it moonlight.' },
    { id: 'what',     text: "This is Beethoven's Piano Sonata number fourteen, in C sharp minor, from 1801." },
    { id: 'name',     text: 'The nickname Moonlight came years later, from the critic Ludwig Rellstab. Beethoven never used it.' },
    { id: 'play',     text: 'Here is how it begins.' },
    { id: 'why1',     text: 'So why does it work? First, the rhythm: triplets that never stop, over slow bass notes.' },
    { id: 'why2',     text: 'On top, the melody floats, almost like a voice.' },
    { id: 'why3',     text: 'Then the bass sinks: C sharp, B, A... and a strange chord appears. D major.' },
    { id: 'why4',     text: 'In C sharp minor, D is the lowered second degree. That is the Neapolitan chord.' },
    { id: 'why5',     text: 'It brings a dark, sinking color, early in the piece.' },
    { id: 'pedal',    text: 'And Beethoven asks for the pedal held down, so the notes blur into a mist.' },
    { id: 'essence',  text: 'One rhythm that never stops, one dark borrowed chord...' },
    { id: 'essence2', text: 'and a piece that sounds like moonlight, though Beethoven never called it that.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'BEETHOVEN · 1801', title: 'MOONLIGHT SONATA', accent: true, tonic: 1, min: 5.6 },
    { id: 'what', segs: ['what'], label: 'PIANO SONATA NO. 14', title: 'C# MINOR', sub: 'Op. 27 No. 2 · 1801', tonic: 1, tail: 0.5 },
    { id: 'name', segs: ['name'], label: 'THE NICKNAME', title: 'MOONLIGHT?', sub: 'Ludwig Rellstab · years later', tonic: 1, tail: 0.6 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'FIRST MOVEMENT', tonic: 1, row: ['C#m', 'C#m/B', 'A', 'D/F#', 'G#7', 'C#m'], tail: 0.25 + OPENING_BEATS * BEAT + 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NONSTOP TRIPLETS', tonic: 1, circle: false, tail: 0.5 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A FLOATING VOICE', tonic: 1, tail: 1.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'THE BASS SINKS', tonic: 1, tail: 0.9 },
    { id: 'why4', segs: ['why4', 'why5'], label: 'THE NEAPOLITAN', title: 'LOWERED SECOND', tonic: 1, gap: 0.4, tail: 1.0 },
    { id: 'pedal', segs: ['pedal'], label: 'THE PEDAL', title: 'A MIST', sub: 'sempre pianissimo e senza sordino', tonic: 1, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'MOONLIGHT', accent: true, tonic: 1, gap: 0.45, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8';
    // the harmony of the opening: triplet notes (per beat), bass octave, extra notes for the shape
    const H = {
      'C#m':   { trip: () => ['G#3', 'C#4', 'E4'], bass: ['C#2', 'C#3'] },
      'C#m/B': { trip: () => ['G#3', 'C#4', 'E4'], bass: ['B1', 'B2'] },
      'A':     { trip: () => ['A3', 'C#4', 'E4'], bass: ['A1', 'A2'] },
      'D/F#':  { trip: () => ['A3', 'D4', 'F#4'], bass: ['F#1', 'F#2'] },
      'G#7':   { trip: b => (b % 4 < 2 ? ['G#3', 'C4', 'F#4'] : ['G#3', 'C4', 'D#4']), bass: ['G#1', 'G#2'], extra: ['D#4', 'F#4'] },
    };
    // roll one chord as nonstop triplets between t0 and t1
    const roll = (name, t0, t1, o = {}) => {
      const h = H[name], v = o.vel ?? 1, sus = o.sus ?? 1.7;
      const shape = [...new Set([...h.trip(0), ...(h.extra || []), h.bass[1]])];
      a.ch(name, t0, t1, { notes: shape, bass: false, mute: true, row: o.row ?? null, hideName: o.hideName });
      a.note(h.bass[0], t0, t1 - t0, { vel: 0.3 * v, show: false });
      a.note(h.bass[1], t0, t1 - t0, { vel: 0.26 * v, show: false });
      const n = Math.max(1, Math.round((t1 - t0) / TR - 0.3));
      for (let i = 0; i < n; i++) {
        const tri = h.trip(Math.floor(i / 3)), k = i % 3;
        a.note(tri[k], t0 + i * TR, TR * sus, { vel: (k === 0 ? 0.25 : 0.21) * v, show: o.show ?? false });
      }
    };
    // a list of [chord, t] changes ending at t1
    const rolls = (list, t1, o = {}) => list.forEach(([c, t], i) => roll(c, t, i < list.length - 1 ? list[i + 1][1] : t1, { ...o, row: o.rows ? o.rows[i] : null }));

    // hook: C# minor pops in, the triplets start
    a.scale(0.2, 'C#', a.T.MINOR, { popIn: { t0: 0.3, step: 0.15 } });
    roll('C#m', 0.3, S('hook').t1, { vel: 0.85, show: true });

    // what: the key, C sharp minor
    roll('C#m', S('what').t0, S('what').t1, { vel: 0.7 });
    a.ring(['C#'], a.w('what', 'C'), S('what').t1, { color: GOLD });
    a.tag('C#', a.w('what', 'C'), S('what').t1, 'TONIC', { color: GOLD, dr: -75 });

    // name: Rellstab's nickname, not Beethoven's
    rolls([['C#m', S('name').t0], ['C#m/B', a.w('name', 'critic') - 0.04]], S('name').t1, { vel: 0.6 });
    a.big('RELLSTAB', a.w('name', 'Ludwig'), a.w('name', 'Beethoven'), { y: 462, size: 50, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('NOT BEETHOVEN', a.w('name', 'Beethoven'), S('name').t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, color: RED });

    // play: the opening (public domain), chord by chord
    const p0 = a.end('play') + 0.25;
    const pl = [['C#m', 4], ['C#m/B', 4], ['A', 2], ['D/F#', 2], ['G#7', 4], ['C#m', 3]];
    let pt = p0;
    const plist = pl.map(([c, b]) => { const r = [c, pt]; pt += b * BEAT; return r; });
    roll('C#m', S('play').t0 + 0.05, p0, { vel: 0.5, hideName: true });
    rolls(plist, pt, { rows: [0, 1, 2, 3, 4, 5], show: true });
    a.note('C#2', pt, 2.0, { vel: 0.28, show: false });
    a.walker(plist.map(([c, t]) => [t, H[c].bass[1].replace(/\d/, '')]), { t1: S('play').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: 82 });

    // why1: the triplet grid - three notes per beat, one slow bass note
    const w0 = S('why1').t0 + 0.2, w1 = S('why1').t1;
    roll('C#m', S('why1').t0 + 0.05, w1, { vel: 0.75 });
    const tripGrid = a.grid(Array.from({ length: 12 }, (_, i) => ({ label: ['G#', 'C#', 'E'][i % 3], size: 40, color: i % 3 ? '#ff7a93' : '#45d6c8' })),
      w0, w1, { rows: 1, cols: 12, cw: 78, chh: 170, y: 560, caption: '3 NOTES PER BEAT · NEVER STOPPING' });
    const bassGrid = a.grid([{ label: 'C#', sub: 'BASS', size: 44, color: '#ff7a93' }], a.w('why1', 'slow') - 0.1, w1, { rows: 1, cols: 1, cw: 936, chh: 190, y: 830 });
    const ws = S('why1').t0 + 0.05;
    for (let t = ws, i = 0; t < w1 - 0.05; t += TR, i++) if (t >= w0) tripGrid.active.push({ t0: t, t1: t + TR, i: i % 12 });
    bassGrid.active.push({ t0: a.w('why1', 'bass'), t1: w1, i: 0 });

    // why2: a voice on top - the repeated G sharp
    const v0 = S('why2').t0 + 0.05, v1 = S('why2').t1;
    roll('C#m', v0, v1, { vel: 0.7 });
    const m0 = a.w('why2', 'melody') - 0.05;
    a.melody([['G#4', 0.75], ['G#4', 0.25], ['G#4', 2], ['G#4', 0.75], ['G#4', 0.25], ['G#4', 2]], m0, BEAT, { vel: 0.42 });
    a.ring(['G#'], m0, v1, { color: GOLD });
    a.tag('G#', a.w('why2', 'voice'), v1, 'VOICE', { color: GOLD, dr: -92 });

    // why3: the bass sinks C# - B - A, then D major appears
    const tC = a.w('why3', 'C') - 0.04, tB = a.w('why3', 'B') - 0.04, tA = a.w('why3', 'A') - 0.04, tD = a.w('why3', 'D') - 0.04;
    rolls([['C#m', S('why3').t0 + 0.05], ['C#m/B', tB], ['A', tA], ['D/F#', tD]], S('why3').t1);
    a.walker([[tC, 'C#'], [tB, 'B'], [tA, 'A'], [tD, 'F#']], { t1: S('why3').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: 82 });
    a.ring(['D'], tD + 0.1, S('why3').t1, { color: GOLD });

    // why4: D is the lowered second degree of C# minor (D# -> D)
    const n0 = S('why4').t0 + 0.05, tLow = a.w('why4', 'lowered'), tNea = a.w('why4', 'Neapolitan');
    const tDark = a.w('why5', 'dark') - 0.04, tSink = a.w('why5', 'sinking') - 0.04, tEarly = a.w('why5', 'early') - 0.04;
    rolls([['D/F#', n0], ['G#7', tEarly], ['C#m', tEarly + 2 * BEAT]], S('why4').t1, { vel: 0.85 });
    a.ring(['D#'], a.w('why4', 'second') - 0.3, tLow + 0.6, { color: '#8d98ff' });
    a.tag('D#', a.w('why4', 'second') - 0.3, tLow + 0.6, '2ND DEGREE', { color: '#8d98ff', dr: -75 });
    a.arc('D#', 'D', tLow, tDark, { steps: -1, color: GOLD, dr: 30 });
    a.ring(['D'], tLow + 0.3, tEarly, { color: GOLD });
    a.tag('D', tNea, tDark, 'NEAPOLITAN', { color: GOLD, x: 540, y: 462 });
    a.big('DARK · SINKING', tDark, tEarly, { y: 462, size: 48, family: 'DM Mono', weight: 500, color: '#8d98ff' });
    a.walker([[tSink, 'F#'], [tEarly, 'G#'], [tEarly + 2 * BEAT, 'C#']], { t1: S('why4').t1, dr: 34, color: '#ffffff', label: 'BASS', labelDr: 82 });

    // pedal: everything rings on, blurring together
    const q0 = S('pedal').t0 + 0.05, q1 = S('pedal').t1, ql = (q1 - q0) / 4;
    rolls([['C#m', q0], ['C#m/B', q0 + ql], ['A', q0 + 2 * ql], ['D/F#', q0 + 3 * ql]], q1, { sus: 9, vel: 0.7 });
    a.ghost('C#m', q0 + ql, q0 + 3 * ql, { color: '#8d98ff' });
    a.ghost('A', q0 + 3 * ql, q1, { color: '#8d98ff' });
    a.big('PEDAL DOWN', a.w('pedal', 'pedal'), q1, { y: 462, size: 48, family: 'DM Mono', weight: 500, color: '#8d98ff' });

    // essence: rhythm, the dark chord, then home in C# minor
    const e0 = S('essence').t0 + 0.05, eD = a.w('essence', 'dark') - 0.04;
    const eG = a.at('essence2') - 0.1, eC = a.w('essence2', 'moonlight') - 0.04;
    rolls([['C#m', e0], ['D/F#', eD], ['G#7', eG], ['C#m', eC]], a.at('cta'), { vel: 0.85 });
    a.ring(['D'], eD, eG, { color: GOLD });
    a.tag('D', eD, eG, 'NEAPOLITAN', { color: GOLD, x: 540, y: 462 });
    a.ch('C#m', a.at('cta'), S('essence').t1 - 0.3, { notes: ['G#3', 'C#4', 'E4', 'G#4'], bass: 'C#2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
