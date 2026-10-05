// Gymnopédie No. 1, decoded: two major seventh chords rocking in a slow waltz, and lots of space.
const BEAT = 0.62, BAR = 3 * BEAT;
// the melody opening (public domain), entering on beat 2 of a Gmaj7 bar: [note, beats]
const MEL = [['F#5', 1], ['A5', 1], ['G5', 1], ['F#5', 1], ['C#5', 1], ['B4', 1], ['C#5', 1], ['D5', 1], ['A4', 3], ['F#4', 4.5]];

module.exports = {
  slug: 'gymnopedie',
  title: 'Gymnopédie No. 1',
  segments: [
    { id: 'hook',    text: 'Just two chords, a slow waltz, and a lot of empty space... and it sounds like time stopping.' },
    { id: 'what',    text: 'This is Gymnopédie Number One, by Erik Satie, from 1888.' },
    { id: 'what2',   text: "It's in three four time, and Satie marked it lent et douloureux: slow and painful." },
    { id: 'play',    text: "Here's how it opens." },
    { id: 'why1',    text: "So why does it feel so calm? It's just two major seventh chords, rocking back and forth." },
    { id: 'why2',    text: 'Neither one settles into a clear home... so the music simply floats.' },
    { id: 'thread',  text: 'And the top note, F sharp, stays in both chords, like a thread connecting them.' },
    { id: 'thread2', text: "Over G, it's the dreamy seventh. Over D, it's the warm third." },
    { id: 'space',   text: 'Very few notes, lots of space, and a slow waltz pulse with no drive.' },
    { id: 'minimal', text: "It's minimalism, decades before minimalism." },
    { id: 'essence', text: 'Two chords, endless space. The calm comes from what Satie leaves out.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ERIK SATIE · 1888', title: 'GYMNOPÉDIE NO. 1', accent: true, tonic: 2, min: 4 * BAR + 0.3 },
    { id: 'what', segs: ['what'], label: 'TWO CHORDS', title: 'GYMNOPÉDIE NO. 1', sub: 'Erik Satie · 1888', tonic: 2, row: ['Gmaj7', 'Dmaj7'], tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'THE MARKING', title: 'SLOW AND PAINFUL', circle: false, tonic: 2, tail: 0.8 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'GYMNOPÉDIE NO. 1', sub: 'Erik Satie · in 3/4', tonic: 2, row: ['Gmaj7', 'Dmaj7'], tail: 6 * BAR - BEAT + 0.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'TWO MAJOR 7THS', tonic: 2, row: ['Gmaj7', 'Dmaj7'], tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'NO CLEAR HOME', tonic: 2, tail: 1.2 },
    { id: 'thread', segs: ['thread', 'thread2'], label: 'THE SHARED NOTE', title: 'A THREAD', tonic: 2, gap: 0.4, tail: 1.2 },
    { id: 'space', segs: ['space'], label: 'WHY IT WORKS', title: 'SPACE', circle: false, tonic: 2, tail: 1.2 },
    { id: 'minimal', segs: ['minimal'], label: 'ERIK SATIE · 1888', title: 'MINIMALISM', circle: false, tonic: 2, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'WHAT IS LEFT OUT', accent: true, tonic: 2, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', GREY = '#8a8a92';
    const GM7 = ['Gmaj7', ['B3', 'D4', 'F#4'], 'G2'], DM7 = ['Dmaj7', ['A3', 'C#4', 'F#4'], 'D2'];
    // one bar: bass on beat 1, chord on beat 2, held through beat 3 (the shape includes the bass)
    const bar = (c, t, t1, o = {}) => {
      const v = o.vel ?? 0.8, len = t1 - t;
      a.ch(c[0], t, t1, { notes: [c[2], ...c[1]], bass: false, mute: true, row: o.row ? (c === GM7 ? 0 : 1) : null, strikes: [{ o: BEAT, v: 1 }] });
      a.note(c[2], t, len, { vel: 0.34 * v, show: false });
      if (len > BEAT + 0.05) c[1].forEach((n, j) => a.note(n, t + BEAT + j * 0.012, len - BEAT, { vel: 0.19 * v, show: false }));
    };
    // alternate Gmaj7 / Dmaj7 bar by bar from t0 to t1; phase 1 starts on Dmaj7; grid lights beats
    const rock = (t0, t1, o = {}) => {
      const out = [];
      for (let j = 0, t = t0; t < t1 - 0.08; j++, t += BAR) {
        const c = (j + (o.phase ?? 0)) % 2 ? DM7 : GM7;
        bar(c, t, Math.min(t + BAR, t1), o);
        out.push([t, c]);
        if (o.grid) for (let b = 0; b < 3; b++) if (t + b * BEAT < t1) o.grid.active.push({ t0: t + b * BEAT, t1: Math.min(t + (b + 1) * BEAT, t1), i: b });
      }
      return out;
    };
    // melody from a bar start (rest on beat 1); returns walker points
    const melody = (tBar, list = MEL, o = {}) => {
      let t = tBar + BEAT; const pts = [];
      for (const [n, b] of list) { a.note(n, t, b * BEAT * 0.97, { vel: o.vel ?? 0.4 }); pts.push([t, n.replace(/\d/, '')]); t += b * BEAT; }
      return pts;
    };

    // hook: the scale pops in, the accompaniment rocks, the melody begins
    a.scale(0.2, 'D', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const g0 = 0.3;
    rock(g0, S('what2').t1, { vel: 0.7 });
    const hp = melody(g0, MEL.slice(0, 9), { vel: 0.36 });
    a.walker(hp, { t1: S('hook').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });

    // what: the two chords, named in the row
    a.ring(['F#'], a.w('what', 'Satie'), S('what').t1, { color: GOLD });

    // what2: three four, lent et douloureux
    a.big('3 / 4', a.w('what2', 'three'), S('what2').t1, { y: 640, size: 150, color: '#ffffff' });
    a.big('LENT ET DOULOUREUX', a.w('what2', 'lent'), S('what2').t1, { y: 860, size: 50, family: 'DM Mono', weight: 500, color: GOLD, blur: 12 });
    a.big('slow and painful', a.w('what2', 'slow'), S('what2').t1, { y: 950, size: 40, family: 'DM Mono', weight: 400, color: '#b9b9c2', blur: 0 });

    // play: two bars of accompaniment, then the melody on a Gmaj7 bar
    const p0 = S('play').t0 + 0.1;
    let k = 0; while (p0 + k * BAR + BEAT < a.end('play') + 0.25) k++;
    rock(p0, S('play').t1, { phase: k % 2, row: true, vel: 0.8 });
    const pp = melody(p0 + k * BAR);
    a.walker(pp, { t1: S('play').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });

    // why1: two major seventh chords rocking
    rock(S('why1').t0 + 0.05, S('why2').t1, { row: true, vel: 0.75 });

    // why2: no clear home, it floats
    a.tag(0, a.w('why2', 'clear'), S('why2').t1, 'NO CLEAR HOME', { x: 540, y: 455, color: TEAL });
    a.big('FLOATING...', a.w('why2', 'floats'), S('why2').t1, { y: 1100, size: 44, family: 'DM Mono', weight: 500, color: TEAL, blur: 14 });

    // thread: F# stays in both chords
    const tG = a.w('thread2', 'G') - 0.04, tD = a.w('thread2', 'D') - 0.04;
    rock(S('thread').t0 + 0.05, tG, { vel: 0.7 });
    a.ring(['F#'], a.w('thread', 'F'), S('thread').t1, { color: GOLD });
    a.tag(0, a.w('thread', 'both'), tG, 'IN BOTH CHORDS', { x: 540, y: 455, color: GOLD });
    for (let t = a.w('thread', 'F') + 0.1; t < tG - 0.3; t += BAR) a.note('F#5', t, BAR * 0.9, { vel: 0.18, show: false });
    bar(GM7, tG, tD, { vel: 0.85 });
    a.tag('F#', tG + 0.1, tD, 'THE 7TH OF G', { color: GOLD, dr: -92 });
    a.line('G', 'F#', tG + 0.1, tD, { color: GOLD, width: 3, dash: true });
    a.note('F#4', tG + 0.15, 1.2, { vel: 0.3 });
    bar(DM7, tD, S('thread').t1, { vel: 0.85 });
    a.tag('F#', tD + 0.1, S('thread').t1, 'THE 3RD OF D', { color: GOLD, dr: -92 });
    a.line('D', 'F#', tD + 0.1, S('thread').t1, { color: GOLD, width: 3, dash: true });
    a.note('F#4', tD + 0.15, 1.2, { vel: 0.3 });

    // space: the waltz bar, beat by beat; beat 3 adds nothing new
    const g = a.grid([{ label: '1', sub: 'BASS', color: PINK, size: 84 }, { label: '2', sub: 'CHORD', color: TEAL, size: 84 }, { label: '3', sub: 'SPACE', color: GREY, size: 84 }],
      S('space').t0 + 0.1, S('minimal').t1, { rows: 1, cols: 3, cw: 260, chh: 250, y: 560, revealStep: 0.15 });
    rock(S('space').t0 + 0.1, S('minimal').t1, { vel: 0.7, grid: g });
    a.big('FEW NOTES', a.w('space', 'few'), a.w('space', 'lots'), { y: 990, size: 64, color: '#ffffff' });
    a.big('LOTS OF SPACE', a.w('space', 'lots'), a.w('space', 'slow'), { y: 990, size: 64, color: GOLD });
    a.big('NO DRIVE', a.w('space', 'slow'), S('space').t1, { y: 990, size: 64, color: TEAL });

    // minimalism, decades early: the melody, sparse
    a.big('1888', a.w('minimal', 'minimalism'), S('minimal').t1, { y: 950, size: 110, color: GOLD });
    a.big('DECADES BEFORE MINIMALISM', a.w('minimal', 'decades'), S('minimal').t1, { y: 1060, size: 34, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });

    // essence: the rocking, then a long open Gmaj7 that never resolves
    const e0 = S('essence').t0 + 0.1, eL = e0 + 4 * BAR;
    rock(e0, eL, { vel: 0.75 });
    melody(e0, MEL.slice(0, 8), { vel: 0.3 });
    bar(GM7, eL, S('essence').t1 - 0.3, { vel: 0.9 });
    a.note('F#5', eL + BEAT, 3.0, { vel: 0.32 });
    a.ring(['F#'], eL, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
