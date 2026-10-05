// Hallelujah: a lyric that names the chords under it - the fourth, the fifth, the minor fall, the major lift.
module.exports = {
  slug: 'hallelujah-chords',
  title: 'Hallelujah',
  segments: [
    { id: 'hook',    text: "This song tells you exactly which chords it's playing, at the moment it plays them." },
    { id: 'what',    text: 'The lyric goes: the fourth, the fifth, the minor fall, the major lift.' },
    { id: 's1',      text: "It's Hallelujah, by Leonard Cohen..." },
    { id: 's2',      text: 'and the famous cover by Jeff Buckley.' },
    { id: 'map1',    text: 'In the original key of C, the fourth is F, and the fifth is G.' },
    { id: 'map2',    text: 'The minor fall is A minor. The major lift is F major.' },
    { id: 'why1',    text: 'So why does it work? Because the lyric is music theory, sung out loud.' },
    { id: 'home',    text: 'C is home. F is chord four. G is chord five.' },
    { id: 'pull',    text: 'After G, your ear expects to go back home, to C.' },
    { id: 'fall',    text: 'Instead, it lands on A minor, chord six. Home, swapped for a minor chord.' },
    { id: 'fall2',   text: 'That deceptive move is the emotional fall.' },
    { id: 'lift',    text: 'Then F, a major chord, lifts the mood again.' },
    { id: 'essence', text: "A song that tells you exactly what it's doing... and still makes you cry." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'A SONG ABOUT ITSELF', title: 'HALLELUJAH', accent: true, tonic: 0, min: 6.0, tail: 0.4 },
    { id: 'what', segs: ['what'], label: 'THE LYRIC', title: 'IT NAMES ITS CHORDS', tonic: 0, tail: 1.2 },
    { id: 's1', segs: ['s1'], label: 'YOU HEAR IT IN', title: 'Hallelujah', sub: 'Leonard Cohen · 1984 · in C', tonic: 0, row: ['C', 'F', 'G', 'Am', 'F'], min: 6.6 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Hallelujah', sub: 'Jeff Buckley · 1994 · cover', tonic: 0, row: ['C', 'F', 'G', 'Am', 'F'], min: 6.6 },
    { id: 'map', segs: ['map1', 'map2'], label: 'IN THE KEY OF C', title: 'WORDS = CHORDS', tonic: 0, row: ['IV', 'V', 'vi', 'IV'], gap: 0.35, tail: 1.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THEORY, SUNG', tonic: 0, tail: 0.6 },
    { id: 'home', segs: ['home'], label: 'THE CHORDS IN C', title: 'I – IV – V', tonic: 0, row: ['C', 'F', 'G'], tail: 0.8 },
    { id: 'pull', segs: ['pull'], label: 'AFTER THE FIVE', title: 'EXPECTING HOME', tonic: 0, tail: 0.6 },
    { id: 'fall', segs: ['fall', 'fall2'], label: 'THE DECEPTIVE MOVE', title: 'THE MINOR FALL', tonic: 0, gap: 0.35, tail: 0.9 },
    { id: 'lift', segs: ['lift'], label: 'BACK TO MAJOR', title: 'THE MAJOR LIFT', tonic: 0, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'IT EXPLAINS ITSELF', accent: true, tonic: 0, row: ['C', 'F', 'G', 'Am', 'F'], gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const VO = { C: ['C4', 'E4', 'G4'], F: ['C4', 'F4', 'A4'], G: ['B3', 'D4', 'G4'], Am: ['C4', 'E4', 'A4'] };
    const BS = { C: 'C3', F: 'F2', G: 'G2', Am: 'A2' };
    // gentle broken chords in a lilting triple feel (chords only, no melody)
    const ARP = { C: ['C4', 'G4', 'C5', 'E5', 'C5', 'G4'], F: ['C4', 'A4', 'C5', 'F5', 'C5', 'A4'], G: ['B3', 'G4', 'B4', 'D5', 'B4', 'G4'], Am: ['C4', 'A4', 'C5', 'E5', 'C5', 'A4'] };
    const E = 0.2;
    function play(name, t0, t1, o = {}) {
      const vel = o.vel ?? 0.8;
      a.ch(name, t0, t1, { notes: VO[name], bass: BS[name], row: o.row ?? null, vel: vel * 0.7, strikes: [{ o: 0, v: 1 }], shape: o.shape, hideName: o.hideName });
      if (o.arp === false) return;
      let k = 1;
      for (let t = t0 + E; t < t1 - 0.06; t += E, k++) a.note(ARP[name][k % 6], t, E * 1.5, { vel: 0.13 * vel * (k % 3 ? 0.85 : 1.15), show: false });
    }
    const loop = (t0, t1, names, o = {}) => {
      const len = (t1 - t0) / names.length;
      names.forEach((c, i) => play(c, t0 + i * len, t0 + (i + 1) * len, { ...o, row: o.rows ? o.rows[i] : null }));
    };
    const PROG = ['C', 'F', 'G', 'Am', 'F'];

    // ---- hook: the progression, softly ----
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    loop(0.3, S('hook').t1, PROG, { vel: 0.6 });

    // ---- what: each lyric phrase gets its chord ----
    const tw = [a.w('what', 'fourth'), a.w('what', 'fifth'), a.w('what', 'minor'), a.w('what', 'major')].map(t => t - 0.06);
    play('C', S('what').t0 + 0.05, tw[0], { vel: 0.6 });
    ['F', 'G', 'Am', 'F'].forEach((c, i) => play(c, tw[i], i < 3 ? tw[i + 1] : S('what').t1));
    const WORDS = [['THE FOURTH', GREEN], ['THE FIFTH', TEAL], ['THE MINOR FALL', BLUE], ['THE MAJOR LIFT', GREEN]];
    WORDS.forEach(([w, col], i) => a.big(w, tw[i], i < 3 ? tw[i + 1] : S('what').t1, { y: 470, size: 44, ...MONO, color: col }));

    // ---- songs ----
    loop(S('s1').t0 + 0.05, S('s1').t1, PROG, { rows: [0, 1, 2, 3, 4] });
    loop(S('s2').t0 + 0.05, S('s2').t1, PROG, { rows: [0, 1, 2, 3, 4], vel: 0.9 });

    // ---- map: the words become chord names ----
    const tm = [a.w('map1', 'fourth'), a.w('map1', 'fifth'), a.w('map2', 'minor'), a.w('map2', 'major')].map(t => t - 0.06);
    const tn = [a.w('map1', 'F'), a.w('map1', 'G'), a.w('map2', 'A'), a.w('map2', 'F')];
    play('C', S('map').t0 + 0.05, tm[0], { vel: 0.55 });
    ['F', 'G', 'Am', 'F'].forEach((c, i) => play(c, tm[i], i < 3 ? tm[i + 1] : S('map').t1, { row: i }));
    a.tag('C', a.w('map1', 'C'), tm[0] + 0.3, 'KEY OF C', { color: '#ff7a93', dr: -80 });
    a.tag('F', tn[0], tm[3], 'FOURTH', { color: GREEN, dr: -80 });
    a.tag('G', tn[1], S('map').t1, 'FIFTH', { color: TEAL, dr: -80 });
    a.tag('A', tn[2], S('map').t1, 'MINOR FALL', { color: BLUE, dr: -80 });
    a.tag('F', tn[3], S('map').t1, 'MAJOR LIFT', { color: GREEN, dr: -80 });

    // ---- why1: the theory, sung ----
    loop(S('why1').t0 + 0.05, S('why1').t1, ['F', 'G', 'Am', 'F'], { vel: 0.5 });
    a.big('FOURTH  FIFTH', a.w('why1', 'theory'), S('why1').t1, { y: 470, size: 40, ...MONO, color: GOLD });

    // ---- home: I, IV, V ----
    const th = [a.w('home', 'C'), a.w('home', 'F'), a.w('home', 'G')].map(t => t - 0.06);
    ['C', 'F', 'G'].forEach((c, i) => play(c, th[i], i < 2 ? th[i + 1] : S('home').t1, { row: i, vel: 0.75 }));
    a.tag('C', th[0] + 0.1, S('home').t1, 'HOME · I', { color: '#ff7a93', dr: -80 });
    a.tag('F', th[1] + 0.1, S('home').t1, 'IV', { color: GREEN, dr: -80 });
    a.tag('G', th[2] + 0.1, S('home').t1, 'V', { color: TEAL, dr: -80 });

    // ---- pull: G wants to go home to C ----
    const p0 = S('pull').t0;
    play('G', p0 + 0.05, S('pull').t1, { vel: 0.7 });
    a.ghost('C', a.w('pull', 'expects'), S('pull').t1, { label: 'EXPECTED', ly: 40, color: '#ffffff' });
    a.line('G', 'C', a.w('pull', 'home'), S('pull').t1, { arrow: true, color: GOLD, r: 200 });

    // ---- fall: G goes to A minor instead ----
    const f0 = S('fall').t0, tAm = a.w('fall', 'A') - 0.06;
    play('G', f0 + 0.05, tAm, { vel: 0.7 });
    play('Am', tAm, S('fall').t1, { vel: 0.85 });
    a.ghost('C', f0, tAm + 0.5, { color: '#ffffff' });
    a.line('G', 'A', tAm, S('fall').t1, { arrow: true, color: RED, r: 215, label: 'DECEPTIVE', ly: 40, lx: 95 });
    a.ring(['A'], a.w('fall', 'six'), S('fall').t1, { color: BLUE });
    a.big('vi · A MINOR', a.w('fall', 'six'), a.w('fall2', 'fall'), { y: 470, size: 44, ...MONO, color: BLUE });
    a.big('↓ THE FALL', a.w('fall2', 'fall'), S('fall').t1, { y: 470, size: 48, ...MONO, color: BLUE });

    // ---- lift: A minor to F major ----
    const l0 = S('lift').t0, tF = a.w('lift', 'F') - 0.06;
    play('Am', l0 + 0.05, tF, { vel: 0.6 });
    play('F', tF, S('lift').t1, { vel: 0.9 });
    a.arc('A', 'F', tF, S('lift').t1, { steps: -4, color: GREEN });
    a.tag('F', a.w('lift', 'major'), S('lift').t1, 'IV · MAJOR', { color: GREEN, dr: -80 });
    a.big('↑ THE LIFT', a.w('lift', 'lifts'), S('lift').t1, { y: 470, size: 48, ...MONO, color: GREEN });

    // ---- essence: the whole thing once more, landing home ----
    const e0 = S('essence').t0 + 0.1, el = 1.2;
    loop(e0, e0 + 5 * el, PROG, { rows: [0, 1, 2, 3, 4], vel: 0.85 });
    play('G', e0 + 5 * el, e0 + 6 * el, { vel: 0.8 });
    a.ch('C', e0 + 6 * el, S('essence').t1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4', 'G4'], bass: 'C2', vel: 0.75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
