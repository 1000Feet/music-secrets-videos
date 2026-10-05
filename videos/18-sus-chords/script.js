// Suspended chords: the third is replaced by the fourth (sus4) or the second (sus2). Neither major nor minor.
module.exports = {
  slug: 'sus-chords',
  title: 'Suspended Chords',
  segments: [
    { id: 'hook',    text: 'Take the third out of a chord, and it stops being major or minor. It just hangs there.' },
    { id: 'what',    text: 'Swap the third for the fourth: C sus four. Or for the second: C sus two.' },
    { id: 'pinball', text: "It's the intro of Pinball Wizard, by The Who, built on sus four chords resolving..." },
    { id: 'free',    text: "and the little flicker in the riff of Free Fallin', by Tom Petty." },
    { id: 'why1',    text: 'So why does it hang? The name comes from an old technique called suspension.' },
    { id: 'why2',    text: 'A note from the previous chord is held over, then falls to the chord tone.' },
    { id: 'why3',    text: 'In C sus four, the F wants to fall a half step to E. And there it is: C major.' },
    { id: 'why4',    text: 'Tension and release, inside one chord.' },
    { id: 'why5a',   text: "And with no third at all, there's no major or minor color." },
    { id: 'why5',    text: "That's the sus two sound: open, ambiguous, modern." },
    { id: 'essence', text: 'A question held in the air, and an answer one half step away.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'NO THIRD', title: 'SUS CHORDS', accent: true, tonic: 0, min: 5.4 },
    { id: 'what', segs: ['what'], label: 'REPLACE THE THIRD', title: 'SUS4 & SUS2', tonic: 0, tail: 1.0 },
    { id: 'pinball', segs: ['pinball'], label: 'YOU HEAR IT IN', title: 'Pinball Wizard', sub: 'The Who · 1969', tonic: 11, row: ['Bsus4', 'B'], tail: 3.4 },
    { id: 'free', segs: ['free'], label: 'YOU HEAR IT IN', title: "Free Fallin'", sub: 'Tom Petty · 1989', tonic: 2, row: ['D', 'Dsus4', 'D'], tail: 3.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'SUSPENSION', tonic: 0, tail: 0.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'HELD OVER', tonic: 0, tail: 0.8 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ONE HALF STEP', tonic: 0, tail: 0.6 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'TENSION & RELEASE', tonic: 0, tail: 1.6 },
    { id: 'why5', segs: ['why5a', 'why5'], label: 'NO MAJOR, NO MINOR', title: 'OPEN SOUND', tonic: 0, gap: 0.4, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A QUESTION IN THE AIR', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8';
    const C = ['G3', 'C4', 'E4'], CS4 = ['G3', 'C4', 'F4'], CS2 = ['G3', 'C4', 'D4'];
    const eighths = (len, n = 8) => Array.from({ length: n }, (_, j) => ({ o: len * j / n, v: j ? (j % 2 ? 0.4 : 0.6) : 1 }));
    const SUSPCS = [0, 4, 5, 7];

    // hook: C, the third disappears, the chord hangs
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const hOut = a.w('hook', 'and') - 0.04, hMaj = a.w('hook', 'major') - 0.04, hMin = a.w('hook', 'minor') - 0.04, hHang = a.w('hook', 'hangs') - 0.04;
    a.ch('C', 0.4, hOut, { notes: C, bass: 'C3', vel: 0.75 });
    a.ring(['E'], a.w('hook', 'third'), hOut + 0.3, { color: RED });
    a.ch('C5', hOut, hHang, { notes: ['G3', 'C4', 'G4'], bass: 'C3', vel: 0.6, hideName: true });
    a.tag('E', hOut + 0.1, hHang, 'NO THIRD', { color: RED });
    a.ghost('C', hMaj, hMin, { color: GOLD });
    a.ghost('Cm', hMin, hHang, { color: TEAL });
    a.ch('Csus4', hHang, S('hook').t1, { notes: CS4, bass: 'C3' });
    a.ring(['F'], hHang, S('hook').t1, { color: GOLD });

    // what: third -> fourth, third -> second
    const wF = a.w('what', 'fourth') - 0.04, wS = a.w('what', 'second') - 0.04;
    a.ch('C', S('what').t0 + 0.1, wF, { notes: C, bass: 'C3', vel: 0.7 });
    a.ring(['E'], a.w('what', 'third'), wF + 0.3, { color: RED });
    a.ch('Csus4', wF, wS, { notes: CS4, bass: 'C3' });
    a.arc('E', 'F', wF, wS, { steps: 1, color: GOLD, dr: 30 });
    a.tag('F', wF + 0.2, wS, 'FOURTH', { color: GOLD });
    a.ch('Csus2', wS, S('what').t1, { notes: CS2, bass: 'C3' });
    a.arc('E', 'D', wS, S('what').t1, { steps: -2, color: TEAL, dr: 30 });
    a.tag('D', wS + 0.2, S('what').t1, 'SECOND', { color: TEAL });

    // pinball wizard: sus4 chords resolving, e.g. Bsus4 -> B
    a.scale(S('pinball').t0, 'B', SUSPCS);
    const BS4 = ['B3', 'E4', 'F#4'], B = ['B3', 'D#4', 'F#4'];
    const p0 = a.end('pinball') + 0.05, pl = (S('pinball').t1 - p0) / 4;
    a.ch('Bsus4', S('pinball').t0 + 0.1, p0, { notes: BS4, bass: 'B2', row: 0, vel: 0.55, strikes: eighths(p0 - S('pinball').t0 - 0.1, 12) });
    [0, 1, 2, 3].forEach(i => a.ch(i % 2 ? 'B' : 'Bsus4', p0 + i * pl, p0 + (i + 1) * pl, { notes: i % 2 ? B : BS4, bass: 'B2', row: i % 2, strikes: eighths(pl) }));
    a.arc('E', 'D#', p0 + pl, S('pinball').t1, { steps: -1, color: GOLD, dr: 30 });

    // free fallin': D -> Dsus4 -> D
    a.scale(S('free').t0, 'D', SUSPCS);
    const D = ['D4', 'F#4', 'A4'], DS4 = ['D4', 'G4', 'A4'];
    const f0 = a.end('free') + 0.05, fl = (S('free').t1 - f0) / 6;
    a.ch('D', S('free').t0 + 0.1, f0, { notes: D, bass: 'D3', row: 0, vel: 0.55 });
    [0, 1, 2, 3, 4, 5].forEach(i => a.ch(i % 3 === 1 ? 'Dsus4' : 'D', f0 + i * fl, f0 + (i + 1) * fl, {
      notes: i % 3 === 1 ? DS4 : D, bass: 'D3', row: i % 3, strikes: [{ o: 0, v: 1 }, { o: fl * 0.5, v: 0.5 }] }));
    a.walker([0, 1, 2, 3, 4, 5].map(i => [f0 + i * fl, i % 3 === 1 ? 'G' : 'F#']), { t1: S('free').t1, dr: -40, color: GOLD });

    // why1: suspension
    a.scale(S('why1').t0, 'C');
    a.ch('Csus4', S('why1').t0 + 0.1, S('why1').t1, { notes: CS4, bass: 'C3', vel: 0.55 });
    a.ring(['F'], a.w('why1', 'suspension'), S('why1').t1, { color: GOLD });
    a.tag(0, a.w('why1', 'suspension'), S('why1').t1, 'SUSPENDED = HELD', { x: 540, y: 450, color: GOLD });

    // why2: F chord -> F held over the C chord -> falls to E
    const tNote = a.w('why2', 'note') - 0.04, tHeld = a.w('why2', 'held') - 0.04, tFall = a.w('why2', 'falls') - 0.04;
    a.ch('F', tNote, tHeld, { notes: ['A3', 'C4', 'F4'], bass: 'F2' });
    a.ring(['F'], tNote + 0.2, tFall, { color: GOLD });
    a.ch('Csus4', tHeld, tFall, { notes: CS4, bass: 'C3' });
    a.tag('F', tHeld + 0.1, tFall + 0.4, 'HELD OVER', { color: GOLD });
    a.ch('C', tFall, S('why2').t1, { notes: C, bass: 'C3' });
    a.arc('F', 'E', tFall, S('why2').t1, { steps: -1, color: TEAL, dr: 30 });
    a.tag('E', a.w('why2', 'chord', 1), S('why2').t1, 'CHORD TONE', { color: TEAL });

    // why3: F falls a half step to E -> C major
    const tE = a.w('why3', 'E') - 0.04, tCM = a.w('why3', 'C', 1) - 0.04;
    a.ch('Csus4', S('why3').t0 + 0.1, tE, { notes: CS4, bass: 'C3', vel: 0.8 });
    a.ring(['F'], a.w('why3', 'F'), tE, { color: RED });
    a.arc('F', 'E', a.w('why3', 'fall'), S('why3').t1, { steps: -1, color: TEAL, dr: 30, label: 'HALF STEP', labelR: 170 });
    a.ch('C', tE, tCM, { notes: C, bass: 'C3', vel: 0.75 });
    a.ch('C', tCM, S('why3').t1, { notes: ['G3', 'C4', 'E4', 'G4'], bass: 'C3' });

    // why4: tension -> release, twice
    const tT = a.w('why4', 'Tension') - 0.04, tR = a.w('why4', 'release') - 0.04, r2 = a.end('why4') + 0.1;
    a.ch('Csus4', tT, tR, { notes: CS4, bass: 'C3' });
    a.ch('C', tR, r2, { notes: C, bass: 'C3' });
    a.ch('Csus4', r2, r2 + 0.7, { notes: CS4, bass: 'C3', vel: 0.8 });
    a.ch('C', r2 + 0.7, S('why4').t1, { notes: C, bass: 'C3', vel: 0.8 });
    a.tag(0, tT, S('why4').t1, 'TENSION', { x: 300, y: 450, color: RED });
    a.tag(0, tR, S('why4').t1, 'RELEASE', { x: 780, y: 450, color: TEAL });
    a.ring(['F'], tT, tR, { color: RED });
    a.ring(['E'], tR, S('why4').t1, { color: TEAL });

    // why5: no third -> no colour; the sus2 sound
    const tMa = a.w('why5a', 'major') - 0.04, tMi = a.w('why5a', 'minor') - 0.04;
    a.ch('Csus2', S('why5').t0 + 0.1, a.w('why5', 'open') - 0.04, { notes: CS2, bass: 'C3', vel: 0.7 });
    a.tag('E', a.w('why5a', 'third'), a.end('why5a') + 0.3, 'NO THIRD', { color: RED });
    a.ghost('C', tMa, tMi, { color: GOLD });
    a.ghost('Cm', tMi, a.end('why5a') + 0.3, { color: TEAL });
    const sw = ['open', 'ambiguous', 'modern'].map(w => a.w('why5', w) - 0.04);
    const SUS2 = [['Csus2', ['G3', 'C4', 'D4', 'G4'], 'C3'], ['Fsus2', ['G3', 'C4', 'F4', 'G4'], 'F2'], ['Gsus2', ['A3', 'D4', 'G4', 'A4'], 'G2'], ['Csus2', ['G3', 'C4', 'D4', 'G4'], 'C3']];
    const ends = [sw[1], sw[2], a.end('why5') + 0.3, S('why5').t1];
    const starts = [sw[0], sw[1], sw[2], ends[2]];
    SUS2.forEach(([c, n, b], i) => {
      a.ch(c, starts[i], ends[i], { notes: n, bass: b, vel: 0.8 });
      n.forEach((m, j) => a.note(a.T.midi(m) + 12, starts[i] + 0.12 + j * 0.12, 0.3, { vel: 0.16, show: false }));
    });
    ['OPEN', 'AMBIGUOUS', 'MODERN'].forEach((w, i) => a.big(w, sw[i], i < 2 ? sw[i + 1] : S('why5').t1, { y: 445, size: 52, family: 'DM Mono', weight: 500, color: GOLD }));

    // essence: the question, then the answer one half step away
    const eA = a.w('essence', 'answer') - 0.04;
    a.ch('Csus4', S('essence').t0 + 0.1, eA, { notes: ['G3', 'C4', 'F4', 'G4'], bass: 'C3' });
    a.tag(0, a.w('essence', 'question'), S('essence').t1, 'QUESTION', { x: 300, y: 450, color: RED });
    a.ring(['F'], a.w('essence', 'question'), eA, { color: RED });
    a.ch('C', eA, S('essence').t1 - 0.2, { notes: ['G3', 'C4', 'E4', 'G4'], bass: 'C2' });
    a.arc('F', 'E', eA, S('essence').t1, { steps: -1, color: TEAL, dr: 30 });
    a.tag(0, eA, S('essence').t1, 'ANSWER', { x: 780, y: 450, color: TEAL });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
