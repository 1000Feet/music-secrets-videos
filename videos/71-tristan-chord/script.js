// The Tristan chord: the opening of Wagner's Tristan und Isolde, one chord that refuses to resolve.
// The opening (public domain) is played exactly as given in the brief; the rhythm is approximate.
const BEAT = 0.7;
const PHRASE = 9 * BEAT; // cellos A3 F4 E4 D#4, Tristan chord, oboe G#4 A4 A#4 B4 over E7

module.exports = {
  slug: 'tristan-chord',
  title: 'The Tristan Chord',
  segments: [
    { id: 'hook',    text: 'One mysterious chord. It refuses to resolve... and musicians have argued about it for over 150 years.' },
    { id: 'what',    text: "It opens Richard Wagner's opera, Tristan and Isolde." },
    { id: 'what2',   text: 'He composed it from 1857 to 1859, and it premiered in Munich in 1865.' },
    { id: 'play',    text: 'Here is how it begins.' },
    { id: 'again',   text: 'Then the phrase comes back, each time a little higher. And each time... silence.' },
    { id: 'why1',    text: 'So why is it so restless? Its two lowest notes, F and B, form a tritone: pure tension.' },
    { id: 'why2',    text: 'Its notes sound like a familiar chord, a half diminished seventh...' },
    { id: 'why2b',   text: "but they behave differently. So your ear can't tell where it's going." },
    { id: 'why3',    text: 'Then it moves to E seven, a dominant chord that wants to resolve to A minor.' },
    { id: 'why3b',   text: 'It never does. Just silence.' },
    { id: 'why4',    text: "That's the point. It's an opera about longing, and the harmony keeps longing too." },
    { id: 'why4b',   text: 'The full resolution is held back for hours, until the very end of the opera.' },
    { id: 'debate',  text: "No wonder it's often seen as a gateway to modern harmony." },
    { id: 'essence', text: 'One chord that never comes home... and music learned to long for something.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'RICHARD WAGNER', title: 'THE TRISTAN CHORD', accent: true, tonic: 9, min: 6.2 },
    { id: 'what', segs: ['what', 'what2'], label: 'AN OPERA BY RICHARD WAGNER', title: 'TRISTAN UND ISOLDE', circle: false, tonic: 9, gap: 0.25, tail: 0.4 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'TRISTAN UND ISOLDE', sub: 'Richard Wagner · 1865', tonic: 9, tail: 0.3 + PHRASE + 1.4 },
    { id: 'again', segs: ['again'], label: 'THE OPENING', title: 'AGAIN, A LITTLE HIGHER', circle: false, tonic: 9, tail: 0.8 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'A TRITONE INSIDE', tonic: 9, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'A CHORD IN DISGUISE', tonic: 9, gap: 0.2, tail: 0.6 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'NO HOMECOMING', tonic: 9, gap: 0.3, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'THE POINT', title: 'ENDLESS LONGING', tonic: 9, tail: 0.4 },
    { id: 'why4b', segs: ['why4b'], label: 'THE POINT', title: 'ENDLESS LONGING', circle: false, tonic: 9, tail: 0.6 },
    { id: 'debate', segs: ['debate'], label: 'OVER 150 YEARS OF DEBATE', title: 'MODERN HARMONY', tonic: 9, tail: 0.9 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'NEVER COMING HOME', accent: true, tonic: 9, gap: 0.5, tail: 1.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8', LILAC = '#b48cff', GREY = '#8a8a92';
    const TRI = ['F3', 'B3', 'D#4', 'G#4'], E7 = ['E3', 'G#3', 'D4', 'B4'];
    const pcOf = n => n.replace(/-?\d/, '');
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, ...o });
    // spelling tags for the black keys the circle names Eb / Ab / Bb
    const spell = (t0, t1, list = ['D#', 'G#'], o = {}) => list.forEach(p => a.tag(p, t0, t1, p, { dr: 58, color: o.color || '#ffffff' }));
    // the Tristan chord, sounding (display + audio)
    const tristan = (t0, t1, o = {}) => {
      a.ch('Fm7b5', t0, t1, { notes: TRI, bass: false, mute: true, label: o.label ?? 'TRISTAN', hideName: o.hideName });
      TRI.forEach((n, i) => a.note(n, t0 + i * 0.015, (o.dur ?? t1 - t0), { vel: (o.vel ?? 0.26) * (i === 3 ? 1.2 : 1), show: false }));
    };
    const e7 = (t0, t1, o = {}) => {
      a.ch('E7', t0, t1, { notes: E7, bass: false, mute: true, hideName: o.hideName, label: o.label });
      E7.forEach((n, i) => a.note(n, t0 + i * 0.015, (o.dur ?? t1 - t0), { vel: (o.vel ?? 0.26) * (i === 3 ? 1.2 : 1), show: false }));
    };
    // the opening phrase from t0 (beat b); returns the key times
    function phrase(t0, b, o = {}) {
      const v = o.vel ?? 1, show = o.show ?? true;
      const T = { a: t0, f: t0 + b, e: t0 + 3.5 * b, ds: t0 + 4 * b, an: t0 + 6 * b, as: t0 + 6.5 * b, b: t0 + 7 * b, end: t0 + 9 * b };
      a.note('A3', T.a, b * 0.98, { vel: 0.34 * v, show });
      a.note('F4', T.f, 2.5 * b * 0.98, { vel: 0.36 * v, show });
      a.note('E4', T.e, 0.5 * b * 0.98, { vel: 0.32 * v, show });
      a.note('D#4', T.ds, T.as - T.ds, { vel: 0.34 * v, show });
      a.note('F3', T.ds, T.as - T.ds, { vel: 0.26 * v, show: false });
      a.note('B3', T.ds + 0.015, T.as - T.ds, { vel: 0.26 * v, show: false });
      a.note('G#4', T.ds + 0.03, T.an - T.ds, { vel: 0.36 * v, show: false });
      a.ch('Fm7b5', T.ds, T.as, { notes: TRI, bass: false, mute: true, label: 'TRISTAN', row: o.row ? 0 : null });
      a.note('A4', T.an, 0.5 * b, { vel: 0.34 * v, show });
      a.note('A#4', T.as, 0.5 * b, { vel: 0.34 * v, show });
      a.note('B4', T.b, 2 * b, { vel: 0.38 * v, show });
      ['E3', 'G#3', 'D4'].forEach((n, i) => a.note(n, T.as + i * 0.015, T.end - T.as, { vel: 0.26 * v, show: false }));
      a.ch('E7', T.as, T.end, { notes: E7, bass: false, mute: true, row: o.row ? 1 : null });
      return T;
    }

    // hook: the chord itself, at once - then E7, then silence
    a.scale(0.1, 'A', a.T.MINOR);
    const tNever = a.w('hook', 'refuses') - 0.05, tSil = a.w('hook', 'resolve') + 0.7;
    tristan(0.25, tNever, { vel: 0.3, dur: tNever - 0.25 });
    a.line('F', 'B', 0.25, tNever, { color: RED });
    spell(0.25, tNever);
    a.ch('E7', tNever, tSil, { notes: E7, bass: false, mute: true });
    E7.forEach((n, i) => a.note(n, tNever + i * 0.015, tSil - tNever, { vel: 0.26, show: false }));
    a.ghost('Am', tNever + 0.3, tSil + 0.6, { label: 'HOME?', ly: 120, color: GREY });
    big('SILENCE', tSil, a.w('hook', 'argued'), { color: GREY });
    big('150+ YEARS OF DEBATE', a.w('hook', 'argued'), S('hook').t1, { color: GOLD });
    tristan(a.w('hook', 'argued'), S('hook').t1, { vel: 0.16, label: '?' });

    // what: the dates
    const g = a.grid([{ label: '1857–59', sub: 'COMPOSED', size: 70, color: LILAC }, { label: '1865', sub: 'PREMIERE · MUNICH', size: 70, color: GOLD }],
      S('what').t0 + 0.1, S('what').t1, { rows: 1, cols: 2, cw: 440, chh: 250, y: 620, revealStep: 0.25 });
    g.active.push({ t0: a.w('what2', 'composed') - 0.05, t1: a.w('what2', 'premiered') - 0.05, i: 0 }, { t0: a.w('what2', 'premiered') - 0.05, t1: S('what').t1, i: 1 });
    a.big('OPERA', a.at('what') + 0.2, S('what').t1, { y: 960, size: 64, color: '#ffffff' });
    tristan(S('what').t0 + 0.1, S('what').t1, { vel: 0.12, hideName: true });

    // play: the opening, with the cellos and the oboe as walkers
    const p = phrase(a.end('play') + 0.3, BEAT);
    a.walker([[p.a, 'A'], [p.f, 'F'], [p.e, 'E'], [p.ds, 'D#']], { t1: p.end, dr: -40, color: TEAL });
    a.arc('A', 'F', p.f, p.e, { steps: 8, color: TEAL, label: 'LEAP', labelR: 165, dr: 30 });
    spell(p.ds, p.as);
    a.walker([[p.ds, 'G#'], [p.an, 'A'], [p.as, 'A#'], [p.b, 'B']], { t1: p.end, dr: 34, color: GOLD });
    a.tag('A#', p.as, p.end, 'A#', { dr: 58, color: GOLD });
    big('CELLOS', p.a, p.ds, { color: TEAL });
    big('THE TRISTAN CHORD', p.ds, p.an, { color: GOLD });
    big('OBOE RISES → E7', p.an, p.end, { color: '#ffffff' });
    big('SILENCE', p.end, S('play').t1, { color: GREY });

    // again: the phrase returns, a little higher each time, with silence between
    const r0 = S('again').t0 + 0.2, tEach = a.w('again', 'each'), tSil2 = a.w('again', 'silence');
    const STEPS = [[230, 1020, a.w('again', 'phrase')], [540, 870, tEach], [850, 720, a.w('again', 'higher')]];
    STEPS.forEach(([x, y, t], i) => a.big('PHRASE ' + (i + 1), t, S('again').t1, { x, y, size: 50, color: [TEAL, GOLD, RED][i] }));
    [[385, 945], [695, 795]].forEach(([x, y], i) => a.big('· · ·', STEPS[i + 1][2] - 0.2, S('again').t1, { x, y, size: 40, color: GREY, blur: 0 }));
    a.big('SILENCE', tSil2, S('again').t1, { y: 560, size: 64, color: GREY, blur: 0 });
    tristan(r0, tEach - 0.1, { vel: 0.14, hideName: true });

    // why1: F and B, a tritone at the bottom of the chord
    const tLow = a.w('why1', 'lowest'), tTri = a.w('why1', 'tritone');
    tristan(S('why1').t0 + 0.1, tLow - 0.1, { vel: 0.22 });
    a.ch('Fm7b5', tLow - 0.1, S('why1').t1, { notes: TRI, bass: false, mute: true, label: 'TRISTAN' });
    a.note('F3', a.w('why1', 'F') - 0.05, 1.2, { vel: 0.34 }); a.note('B3', a.w('why1', 'B') - 0.05, 1.2, { vel: 0.34 });
    a.ring(['F', 'B'], a.w('why1', 'F'), S('why1').t1, { color: RED });
    a.line('F', 'B', tTri, S('why1').t1, { color: RED, label: 'TRITONE', ly: 78 });
    a.note('F3', tTri, 1.6, { vel: 0.3, show: false }); a.note('B3', tTri, 1.6, { vel: 0.3, show: false });
    spell(S('why1').t0 + 0.1, S('why1').t1);
    big('PURE TENSION', a.w('why1', 'pure'), S('why1').t1, { color: RED });

    // why2: it sounds like a half-diminished seventh (F Ab Cb Eb) - but behaves differently
    const tHalf = a.w('why2', 'half'), tBeh = a.w('why2b', 'behave'), tEar = a.w('why2b', 'ear');
    tristan(S('why2').t0 + 0.1, tBeh, { vel: 0.22, label: 'TRISTAN' });
    a.ch('Fm7b5', tHalf - 0.05, tBeh, { notes: TRI, bass: false, mute: true, label: 'Fø7' });
    [['B', 'Cb'], ['Eb', 'Eb'], ['Ab', 'Ab'], ['F', 'F']].forEach(([pc, nm]) => a.tag(pc, tHalf, tBeh, nm, { dr: -92, color: LILAC }));
    big('HALF-DIMINISHED 7TH?', tHalf, tBeh, { color: LILAC, size: 46 });
    // behaves differently: it slides on to E7 by half steps
    a.ch('Fm7b5', tBeh, tEar - 0.05, { notes: TRI, bass: false, mute: true, label: '?' });
    [['F', 'E', -1], ['D#', 'D', -1], ['G#', 'B', 3]].forEach(([f, t2, st]) => a.arc(f, t2, tBeh + 0.2, S('why2').t1, { steps: st, color: GOLD, dr: 30 }));
    e7(tEar - 0.05, S('why2').t1, { vel: 0.22, label: '?' });
    big('WHERE IS IT GOING?', tEar, S('why2').t1, { color: GOLD, size: 46 });

    // why3: E7 should resolve to A minor - it never does
    const tE7 = a.w('why3', 'E') - 0.05, tAm = a.w('why3', 'A', 0), tNo = a.w('why3b', 'never');
    tristan(S('why3').t0 + 0.1, tE7, { vel: 0.2 });
    e7(tE7, tNo, { vel: 0.26 });
    a.ghost('Am', tAm, tNo + 0.8, { label: 'A MINOR', ly: 120, color: TEAL });
    a.arc('G#', 'A', tAm, tNo, { steps: 1, color: TEAL, dr: 30 });
    a.arc('D', 'C', tAm, tNo, { steps: -2, color: TEAL, dr: 30 });
    big('DOMINANT', a.w('why3', 'dominant'), tAm, { color: '#ffffff' });
    big('WANTS → A MINOR', tAm, tNo, { color: TEAL, size: 46 });
    big('SILENCE', a.w('why3b', 'silence'), S('why3').t1, { color: GREY, size: 64 });

    // why4: longing - the chord keeps reaching, home never arrives
    const l0 = S('why4').t0 + 0.1, ll = (S('why4').t1 - l0) / 4;
    [0, 1, 2, 3].forEach(i => (i % 2 ? e7 : tristan)(l0 + i * ll, l0 + (i + 1) * ll, { vel: 0.17 + 0.03 * i }));
    a.ghost('Am', a.w('why4', 'longing'), S('why4').t1, { label: 'HOME', ly: 120, color: GREY });
    big('LONGING', a.w('why4', 'longing'), S('why4').t1, { color: GOLD });

    // why4b: the full resolution waits until the very end of the opera
    const g2 = a.grid([{ label: 'OPENING', sub: 'NO RESOLUTION', size: 56, color: RED }, { label: 'THE END', sub: 'RESOLUTION', size: 56, color: GOLD }],
      S('why4b').t0 + 0.1, S('why4b').t1, { rows: 1, cols: 2, cw: 440, chh: 250, y: 600, revealStep: 0.3 });
    g2.active.push({ t0: S('why4b').t0 + 0.1, t1: a.w('why4b', 'hours'), i: 0 }, { t0: a.w('why4b', 'end'), t1: S('why4b').t1, i: 1 });
    a.big('HOURS LATER', a.w('why4b', 'hours'), S('why4b').t1, { y: 960, size: 72, color: '#ffffff' });
    tristan(S('why4b').t0 + 0.1, S('why4b').t1, { vel: 0.12, hideName: true });

    // debate: a gateway to modern harmony
    tristan(S('debate').t0 + 0.1, S('debate').t1, { vel: 0.2, label: '?' });
    spell(S('debate').t0 + 0.1, S('debate').t1, ['D#', 'G#'], { color: GOLD });
    a.ring(['F', 'B', 'D#', 'G#'], a.w('debate', 'gateway'), S('debate').t1, { color: GOLD });
    big('A GATEWAY', a.w('debate', 'gateway'), S('debate').t1, { color: GOLD });

    // essence: the opening once more, ending unresolved
    a.scale(S('essence').t0, 'A', a.T.MINOR);
    const q = phrase(S('essence').t0 + 0.2, 0.62, { vel: 0.85 });
    a.walker([[q.a, 'A'], [q.f, 'F'], [q.e, 'E'], [q.ds, 'D#']], { t1: q.end, dr: -40, color: TEAL });
    a.walker([[q.ds, 'G#'], [q.an, 'A'], [q.as, 'A#'], [q.b, 'B']], { t1: q.end, dr: 34, color: GOLD });
    a.ghost('Am', q.end, a.at('cta'), { label: 'HOME?', ly: 120, color: GREY });
    tristan(a.at('cta'), S('essence').t1 - 0.2, { vel: 0.16, label: '?' });
    spell(a.at('cta'), S('essence').t1);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
