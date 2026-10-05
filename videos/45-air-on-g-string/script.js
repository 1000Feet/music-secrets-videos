// Air on the G String, decoded: a bass that walks down in octaves, and long notes that clash, then resolve.
const E8 = 0.42; // one eighth note, very slow
// the opening bass (public domain): eighth-note octaves walking down the D major scale
const BASS = [['D3', 'D2'], ['C#3', 'C#2'], ['B2', 'B1'], ['A2', 'A1'], ['G2', 'G1'], ['F#2', 'F#1'], ['E2', 'E1'], ['D2', 'D2']];
// harmony above each bass step (approximate): [name, upper notes]
const HARM = [['D', ['F#4', 'A4', 'D5']], ['A/C#', ['E4', 'A4', 'C#5']], ['Bm', ['D4', 'F#4', 'B4']], ['Bm/A', ['D4', 'F#4', 'B4']],
  ['G', ['D4', 'G4', 'B4']], ['D/F#', ['D4', 'F#4', 'A4']], ['A7/E', ['C#4', 'G4', 'A4']], ['D', ['D4', 'F#4', 'A4']]];
// the melody start (approximate rhythm): [note, eighths]
const MEL = [['F#5', 8], ['F#5', 1], ['B5', 1], ['G5', 1.5], ['E5', 0.5], ['D5', 1.5], ['C#5', 0.5], ['D5', 2]];
const BARS2 = 16 * E8;

module.exports = {
  slug: 'air-on-g-string',
  title: 'Air on the G String',
  segments: [
    { id: 'hook',    text: 'One slow melody, floating over a bass that never stops walking.' },
    { id: 'what',    text: "This is the Air from Bach's Orchestral Suite Number Three, in D major, from around 1730." },
    { id: 'name',    text: 'The nickname came in 1871, when August Wilhelmj arranged it for violin...' },
    { id: 'name2',   text: 'so it could be played entirely on the lowest string: the G string.' },
    { id: 'play',    text: 'Here is how it begins.' },
    { id: 'why1',    text: 'So why is it so calm? Watch the bass.' },
    { id: 'why2',    text: 'It walks down the scale, step by step, jumping in octaves.' },
    { id: 'why3',    text: 'D, C sharp, B, A, G, F sharp... a steady heartbeat.' },
    { id: 'susp1',   text: 'On top, the melody holds very long notes.' },
    { id: 'susp2',   text: 'The harmony moves underneath, the held note clashes gently... then resolves.' },
    { id: 'susp3',   text: 'Those are suspensions, one after another.' },
    { id: 'whiter',  text: 'That descending bass inspired later music, like A Whiter Shade of Pale, in 1967.' },
    { id: 'essence', text: 'A bass that never stops walking, and a melody that refuses to hurry.' },
    { id: 'essence2', text: 'Calm, made of motion.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'AIR ON THE G STRING', accent: true, tonic: 2, min: BARS2 + 0.6 },
    { id: 'what', segs: ['what'], label: 'ORCHESTRAL SUITE NO. 3', title: 'AIR · BWV 1068', sub: 'J. S. Bach · around 1730', tonic: 2, tail: 0.8 },
    { id: 'name', segs: ['name', 'name2'], label: 'THE NICKNAME', title: 'THE G STRING', sub: 'August Wilhelmj · 1871', circle: false, tonic: 2, gap: 0.3, tail: 1.0 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'AIR', sub: 'J. S. Bach · in D major', tonic: 2, row: HARM.map(h => h[0]), tail: BARS2 + 1.2 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'A WALKING BASS', tonic: 2, gap: 0.3, tail: 0.6 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'A HEARTBEAT', tonic: 2, tail: 1.4 },
    { id: 'susp', segs: ['susp1', 'susp2'], label: 'THE MELODY', title: 'CLASH, THEN RESOLVE', tonic: 2, gap: 0.4, tail: 1.0 },
    { id: 'susp3', segs: ['susp3'], label: 'ONE AFTER ANOTHER', title: 'SUSPENSIONS', tonic: 2, tail: 2.6 },
    { id: 'whiter', segs: ['whiter'], label: 'IT INSPIRED', title: 'A Whiter Shade of Pale', sub: 'Procol Harum · 1967', tonic: 0, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'CALM MADE OF MOTION', accent: true, tonic: 2, gap: 0.5, tail: 1.9 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', TEAL = '#45d6c8', GOLD = '#ffcf5a', WHITE = '#ffffff';
    const bassWalker = (pts, t1) => a.walker(pts, { t1, dr: 34, color: WHITE, label: 'BASS', labelDr: 82 });
    const melWalker = (pts, t1) => a.walker(pts, { t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });

    // the walking bass from step i0 to i1 (exclusive), starting at t0, with the harmony above; returns walker points
    function walk(t0, i0 = 0, i1 = 8, o = {}) {
      const pts = [], e = o.e ?? E8;
      for (let i = i0; i < i1; i++) {
        const t = t0 + (i - i0) * 2 * e, [hi, lo] = BASS[i];
        a.note(hi, t, e * 0.95, { vel: 0.36 * (o.vel ?? 1) });
        a.note(lo, t + e, e * 0.95, { vel: 0.4 * (o.vel ?? 1) });
        if (o.chords !== false) a.ch(HARM[i][0], t, t + 2 * e, { notes: HARM[i][1], bass: false, vel: 0.42 * (o.vel ?? 1), row: o.row ? i : null });
        pts.push([t, hi.replace(/\d/, '')]);
      }
      return pts;
    }
    function melody(t0, list = MEL, o = {}) {
      let t = t0; const pts = [];
      for (const [n, d] of list) { a.note(n, t, d * E8 * 0.97, { vel: o.vel ?? 0.34, show: o.show ?? true }); pts.push([t, n.replace(/\d/, '')]); t += d * E8; }
      return pts;
    }

    // hook: the first two bars, softly
    a.scale(0.2, 'D', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    const h0 = 0.4;
    bassWalker(walk(h0, 0, 8, { vel: 0.8 }), S('hook').t1);
    melody(h0, MEL, { vel: 0.28, show: false });

    // what: D major
    const w0 = S('what').t0 + 0.1, tD = a.w('what', 'D') - 0.05;
    a.ch('D', w0, tD, { notes: ['F#4', 'A4', 'D5'], bass: 'D2', vel: 0.5 });
    a.ch('D', tD, S('what').t1, { notes: ['D4', 'F#4', 'A4', 'D5'], bass: 'D2', vel: 0.8 });
    a.note('F#5', tD, S('what').t1 - tD, { vel: 0.28 });
    a.tag('D', tD + 0.1, S('what').t1, 'HOME KEY: D MAJOR', { x: 540, y: 455 });

    // name: the four violin strings, the G string lights up
    const STR = [{ label: 'G', sub: 'LOWEST', color: GOLD, size: 90 }, { label: 'D', color: '#8a8a92', size: 90 }, { label: 'A', color: '#8a8a92', size: 90 }, { label: 'E', color: '#8a8a92', size: 90 }];
    const gs = a.grid(STR, S('name').t0 + 0.1, S('name').t1, { rows: 1, cols: 4, cw: 210, chh: 280, y: 600, revealStep: 0.15, caption: 'THE FOUR VIOLIN STRINGS' });
    const tViolin = a.w('name', 'violin');
    [0, 1, 2, 3].forEach(i => gs.active.push({ t0: tViolin + i * 0.18, t1: tViolin + i * 0.18 + 0.5, i }));
    gs.active.push({ t0: a.w('name2', 'lowest'), t1: S('name').t1, i: 0 });
    a.big('ONLY ONE STRING', a.w('name2', 'entirely'), S('name').t1, { y: 1060, size: 52, family: 'DM Mono', weight: 500, color: GOLD });
    const n0 = S('name').t0 + 0.2;
    walk(n0, 0, 8, { vel: 0.55, chords: false });
    walk(n0 + BARS2, 0, Math.min(8, Math.floor((S('name').t1 - n0 - BARS2) / (2 * E8))), { vel: 0.55, chords: false });
    melody(n0, MEL.map(([n, d]) => [n.replace('5', '4'), d]), { vel: 0.26, show: false });

    // play: the opening, bass + harmony + melody
    const p0 = a.end('play') + 0.3;
    a.ch('D', S('play').t0 + 0.1, p0, { notes: ['F#4', 'A4', 'D5'], bass: 'D2', vel: 0.35 });
    bassWalker(walk(p0, 0, 8, { row: true }), S('play').t1);
    melWalker(melody(p0), S('play').t1);
    a.ch('D', p0 + BARS2, S('play').t1, { notes: ['D4', 'F#4', 'A4'], bass: 'D2', row: 7, vel: 0.7 });
    a.note('D5', p0 + BARS2, 1.6, { vel: 0.3 });

    // why1/why2: the bass alone, walking down in octaves
    const b0 = S('why1').t0 + 0.2, bWalk = a.w('why2', 'walks') - 0.05;
    a.ch('D', b0, bWalk, { notes: ['F#4', 'A4', 'D5'], bass: 'D2', vel: 0.35 });
    const bp = walk(bWalk, 0, 8, { e: Math.min(E8, (S('why1').t1 - bWalk - 0.2) / 16), chords: true, vel: 0.9 });
    bassWalker(bp, S('why1').t1);
    a.tag('D', a.w('why2', 'octaves'), S('why1').t1, 'OCTAVE JUMPS', { x: 540, y: 455, color: WHITE });

    // why3: one step per spoken note name, then the pulse continues
    const names = [['D', 0], ['C', 0], ['B', 0], ['A', 0], ['G', 0], ['F', 0]].map(([w, n]) => a.w('why3', w, n) - 0.04);
    const tBeat = a.w('why3', 'heartbeat');
    const ht = [...names, tBeat];
    const hp = [];
    for (let i = 0; i < 6; i++) {
      const e = (ht[i + 1] - ht[i]) / 2;
      a.note(BASS[i][0], ht[i], e * 0.95, { vel: 0.4 }); a.note(BASS[i][1], ht[i] + e, e * 0.95, { vel: 0.42 });
      a.ch(HARM[i][0], ht[i], ht[i + 1], { notes: HARM[i][1], bass: false, vel: 0.4 });
      hp.push([ht[i], BASS[i][0].replace(/\d/, '')]);
    }
    hp.push(...walk(tBeat, 6, 8));
    const tEnd = tBeat + 4 * E8;
    hp.push(...walk(tEnd, 0, Math.floor((S('why3').t1 - tEnd) / (2 * E8))));
    bassWalker(hp, S('why3').t1);
    a.tag('D', tBeat, S('why3').t1, 'STEADY EIGHTH NOTES', { x: 540, y: 455, color: WHITE });

    // susp: a long G held over G, then D/F# moves under it (G against F#), then G falls to F#
    const s0 = S('susp').t0 + 0.1, tLong = a.w('susp1', 'long'), tMoves = a.w('susp2', 'moves') - 0.05;
    const tClash = a.w('susp2', 'clashes') - 0.05, tRes = a.w('susp2', 'resolves') - 0.05;
    a.ch('G', s0, tMoves, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.55 });
    a.note('G5', tLong - 0.1, tRes - tLong + 0.1, { vel: 0.3 });
    a.ring(['G'], tLong, tRes, { color: GOLD });
    a.tag('G', tLong, tRes, 'HELD', { dr: -92, color: GOLD });
    a.ch('D/F#', tMoves, tRes, { notes: ['A3', 'D4', 'F#4'], bass: 'F#2', vel: 0.6 });
    a.line('G', 'F#', tClash, tRes, { color: RED });
    a.tag(0, tClash, tRes, 'GENTLE CLASH', { x: 540, y: 455, color: RED });
    a.ch('D/F#', tRes, S('susp').t1, { notes: ['A3', 'D4', 'F#4'], bass: 'F#2', vel: 0.45 });
    a.note('F#5', tRes, S('susp').t1 - tRes, { vel: 0.32 });
    a.arc('G', 'F#', tRes, S('susp').t1, { steps: -1, color: TEAL, dr: 30 });
    a.tag(0, tRes, S('susp').t1, 'RESOLVES', { x: 540, y: 455, color: TEAL });

    // susp3: two suspensions in a row: G over D/F# -> F#, then D over A7/E -> C#, home to D
    const q0 = S('susp3').t0 + 0.1, q = 0.85;
    const SUS = [
      ['D/F#', ['F#3', 'A3', 'D4'], 'F#2', 'G5', 'F#5', 'G', 'F#'],
      ['A7/E', ['C#4', 'G4', 'A4'], 'E2', 'D5', 'C#5', 'D', 'C#'],
    ];
    SUS.forEach(([c, up, bs, held, res, hp1, hp2], k) => {
      const t = q0 + k * 2 * q;
      a.ch(c, t, t + q, { notes: up, bass: bs, vel: 0.6 });
      a.note(held, t, q * 0.97, { vel: 0.32 });
      a.line(hp1, hp2, t + 0.05, t + q, { color: RED });
      a.ch(c, t + q, t + 2 * q, { notes: up, bass: bs, vel: 0.45, strikes: [{ o: 0, v: 0.6 }] });
      a.note(res, t + q, q * 0.97, { vel: 0.32 });
      a.arc(hp1, hp2, t + q, t + 2 * q, { steps: -1, color: TEAL, dr: 30 });
    });
    a.tag(0, q0, q0 + 4 * q, 'CLASH → RESOLVE', { x: 540, y: 455, color: GOLD });
    const qH = q0 + 4 * q;
    a.ch('D', qH, S('susp3').t1 - 0.2, { notes: ['F#4', 'A4', 'D5'], bass: 'D2', vel: 0.75 });
    a.note('D5', qH, 2.2, { vel: 0.3 });
    a.tag('D', qH + 0.1, S('susp3').t1, 'HOME', { dr: -92 });

    // whiter shade: a generic descending bass under changing chords (progression only)
    a.scale(S('whiter').t0, 'C');
    const WS = ['C', 'Em/B', 'Am', 'Am/G', 'F', 'F/E', 'Dm', 'Dm/C'];
    const WB = ['C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];
    const x0 = S('whiter').t0 + 0.1, xl = (S('whiter').t1 - x0 - 0.1) / 8;
    WS.forEach((c, i) => a.ch(c, x0 + i * xl, x0 + (i + 1) * xl, { bass: WB[i], vel: 0.7, strikes: [{ o: 0, v: 1 }, { o: xl / 2, v: 0.45 }] }));
    bassWalker(WB.map((n, i) => [x0 + i * xl, n.replace(/\d/, '')]), S('whiter').t1);
    a.tag(0, a.w('whiter', 'descending'), S('whiter').t1, 'THE BASS WALKS DOWN', { x: 540, y: 455, color: GOLD });

    // essence: the opening once more, ending home on D
    a.scale(S('essence').t0, 'D');
    const e0 = S('essence').t0 + 0.15;
    bassWalker(walk(e0, 0, 8, { vel: 0.85 }), e0 + BARS2 + 1);
    melWalker(melody(e0, MEL, { vel: 0.3 }), e0 + BARS2 + 1);
    a.ch('D', e0 + BARS2, S('essence').t1 - 0.3, { notes: ['D4', 'F#4', 'A4', 'D5'], bass: 'D2', vel: 0.8 });
    a.note('F#5', e0 + BARS2, 2.4, { vel: 0.28, show: false });
    a.tag('D', e0 + BARS2 + 0.1, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
