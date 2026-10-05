// Happy Birthday, decoded: a waltz on a pickup, a staircase of climaxes, one octave leap, three chords.
const BEAT = 0.4, BAR = 3 * BEAT;
// the melody in C (public domain): [note, beats]; beat 0 is the pickup "Hap-py"
const P1 = [['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2]];
const P2 = [['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2]];
const P3 = [['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1]];
const P4 = [['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3]];
const SONG = [...P1, ...P2, ...P3, ...P4]; // 25 beats
// harmony: [start beat, beats, chord]
const HARM = [[1, 3, 'C'], [4, 3, 'G'], [7, 3, 'G'], [10, 3, 'C'], [13, 3, 'C'], [16, 3, 'F'], [19, 2, 'C'], [21, 1, 'G'], [22, 3, 'C']];

module.exports = {
  slug: 'happy-birthday',
  title: 'Happy Birthday',
  segments: [
    { id: 'hook',    text: 'You sing it every year. But Happy Birthday hides a little musical trap.' },
    { id: 'what',    text: 'The melody comes from Good Morning to All, by the sisters Mildred and Patty Hill, in 1893.' },
    { id: 'claim',   text: 'For decades, it was claimed to be under copyright.' },
    { id: 'court',   text: 'In 2015, a US court ruled that claim invalid, and the case was settled in 2016.' },
    { id: 'free',    text: "So today it's public domain. Here it is." },
    { id: 'why1',    text: "So why does it work? First, it's a waltz: three beats in every bar." },
    { id: 'why1b',   text: 'And it starts on a pickup. Happy leads you into the strong beat.' },
    { id: 'why2',    text: 'Each phrase climbs higher than the last: C, then D, then the high G.' },
    { id: 'why2b',   text: 'A staircase of climaxes.' },
    { id: 'why3',    text: 'And here is the trap. The third phrase leaps a full octave, from G to G.' },
    { id: 'why3b',   text: "That's a big range for a song everyone is expected to sing." },
    { id: 'why4',    text: 'And the harmony? Just three chords: C, F and G. One, four and five.' },
    { id: 'essence', text: 'A pickup, three chords and one daring leap... and the whole room sings along.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'HAPPY BIRTHDAY', accent: true, tonic: 0, min: 0.4 + 12 * BEAT + 1.0 },
    { id: 'what', segs: ['what'], label: 'THE HILL SISTERS', title: 'GOOD MORNING TO ALL', sub: 'Mildred & Patty Hill · 1893', tonic: 0, tail: 0.4 },
    { id: 'copy', segs: ['claim', 'court'], label: 'THE COPYRIGHT', title: 'WHO OWNS IT?', circle: false, tonic: 0, gap: 0.3, tail: 0.5 },
    { id: 'play', segs: ['free'], label: 'PUBLIC DOMAIN', title: 'HAPPY BIRTHDAY', sub: 'Mildred & Patty Hill · in C', row: ['C', 'F', 'G'], tonic: 0, tail: 0.3 + 25 * BEAT + 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'A WALTZ IN 3/4', circle: false, tonic: 0, tail: 0.6 },
    { id: 'why1b', segs: ['why1b'], label: 'WHY IT WORKS', title: 'THE PICKUP', circle: false, tonic: 0, tail: 0.3 + 6 * BEAT + 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'A STAIRCASE', tonic: 0, gap: 0.25, tail: 0.8 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'THE TRAP', title: 'THE OCTAVE LEAP', circle: false, tonic: 0, gap: 0.3, tail: 0.9 },
    { id: 'why4', segs: ['why4'], label: 'THE HARMONY', title: 'THREE CHORDS', row: ['I', 'IV', 'V'], tonic: 0, tail: 0.9 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE DARING LEAP', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', RED = '#ff5d6c';
    const CH = { C: { notes: ['E3', 'G3', 'C4'], bass: 'C2' }, F: { notes: ['F3', 'A3', 'C4'], bass: 'F2' }, G: { notes: ['D3', 'G3', 'B3'], bass: 'G2' } };
    const ROW = { C: 0, F: 1, G: 2 };
    const pos = []; { let b = 0; SONG.forEach(([n, d]) => { pos.push(b); b += d; }); }

    // melody between song beats b0..b1, starting at time t (song beat b0 = time t); returns walker points
    function mel(t, b0, b1, o = {}) {
      const pts = [];
      SONG.forEach(([n, d], i) => {
        if (pos[i] < b0 - 1e-6 || pos[i] >= b1 - 1e-6) return;
        const tn = t + (pos[i] - b0) * BEAT;
        a.note(n, tn, d * BEAT * 0.92, { vel: o.vel ?? 0.4, show: o.show ?? true });
        pts.push([tn, n.replace(/\d/, '')]);
        if (o.onNote) o.onNote(n, tn, d * BEAT);
      });
      return pts;
    }
    // waltz accompaniment (bass on one, chord on two and three) between song beats b0..b1
    function acc(t, b0, b1, o = {}) {
      HARM.forEach(([s, len, c]) => {
        if (s < b0 - 1e-6 || s >= b1 - 1e-6) return;
        const ts = t + (s - b0) * BEAT, strikes = [{ o: 0, v: 0.8 }];
        for (let k = 1; k < len; k++) strikes.push({ o: k * BEAT, v: 0.6 });
        a.ch(c, ts, ts + len * BEAT, { ...CH[c], vel: o.vel ?? 0.55, strikes, row: o.row ? ROW[c] : null, shape: o.shape ?? true });
      });
    }
    // plain waltz on one chord from t0 to t1
    function vamp(t0, t1, chords, o = {}) {
      let k = 0;
      for (let t = t0; t + BAR <= t1 + 0.02; t += BAR, k++) {
        const c = chords[k % chords.length];
        a.ch(c, t, t + BAR, { ...CH[c], vel: o.vel ?? 0.45, strikes: [{ o: 0, v: 0.8 }, { o: BEAT, v: 0.6 }, { o: 2 * BEAT, v: 0.5 }], shape: o.shape ?? true });
        if (o.grid) [0, 1, 2].forEach(i => o.grid.active.push({ t0: t + i * BEAT, t1: t + (i + 1) * BEAT, i }));
      }
      return t0 + k * BAR;
    }

    // hook: phrases one and two over the waltz
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const h0 = 0.4;
    a.walker(mel(h0, 0, 12, { vel: 0.36 }), { t1: S('hook').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    acc(h0, 0, 12, { vel: 0.5 });
    a.ch('C', h0 + 12 * BEAT, S('hook').t1, { ...CH.C, vel: 0.45 });
    a.note('C5', h0 + 12 * BEAT, 1.0, { vel: 0.3, show: false });

    // what: a soft waltz, 1893
    vamp(S('what').t0 + 0.05, S('what').t1, ['C', 'C', 'G', 'G'], { vel: 0.4 });
    a.tag(0, a.w('what', 'sisters'), S('what').t1, '1893', { x: 540, y: 462, color: GOLD });

    // copy: claimed, ruled invalid, settled
    const cell = (label, sub, color, x, t0) => a.grid([{ label, sub, color, size: label.length > 3 ? 64 : 90, subSize: 24 }], t0, S('copy').t1, { rows: 1, cols: 1, cw: 310, chh: 270, x, y: 600 });
    const tC = a.w('claim', 'claimed'), t15 = a.w('court', '2015'), t16 = a.w('court', '2016');
    const g1 = cell('©', 'CLAIMED', RED, 230, tC - 0.2), g2 = cell('2015', 'RULED INVALID', TEAL, 540, t15 - 0.1), g3 = cell('2016', 'SETTLED', GOLD, 850, t16 - 0.1);
    g1.active.push({ t0: tC - 0.2, t1: t15 - 0.1, i: 0 }); g2.active.push({ t0: t15 - 0.1, t1: t16 - 0.1, i: 0 }); g3.active.push({ t0: t16 - 0.1, t1: S('copy').t1, i: 0 });
    a.big('FOR DECADES', a.w('claim', 'decades'), t15 - 0.1, { y: 960, size: 52, family: 'DM Mono', weight: 500, color: RED });
    a.big('CLAIM INVALID', a.w('court', 'invalid'), S('copy').t1, { y: 960, size: 52, family: 'DM Mono', weight: 500, color: TEAL });
    vamp(S('copy').t0 + 0.05, S('copy').t1, ['C', 'C', 'G', 'G'], { vel: 0.38, shape: false });

    // play: the whole song (public domain)
    const p0 = a.end('free') + 0.3;
    a.ch('C', S('play').t0 + 0.05, p0, { ...CH.C, vel: 0.35, row: 0 });
    a.walker(mel(p0, 0, 25), { t1: S('play').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    acc(p0, 0, 25, { vel: 0.6, row: true });
    a.big('PUBLIC DOMAIN', a.w('free', 'public'), p0 + 0.6, { y: 1040, size: 50, family: 'DM Mono', weight: 500, color: GOLD });

    // why1: count to three
    const BEATS = [{ label: 'ONE', sub: 'STRONG', color: PINK, size: 66 }, { label: 'two', sub: 'LIGHT', color: TEAL, size: 58 }, { label: 'three', sub: 'LIGHT', color: TEAL, size: 58 }];
    const gw = a.grid(BEATS, S('why1').t0 + 0.1, S('why1').t1, { rows: 1, cols: 3, cw: 290, chh: 290, y: 600, revealStep: 0.1, caption: 'THREE BEATS IN EVERY BAR' });
    vamp(S('why1').t0 + 0.1, S('why1').t1, ['C', 'G'], { vel: 0.5, grid: gw, shape: false });

    // why1b: the pickup leads into beat one
    const PU = [{ label: 'HAP · PY', sub: 'PICKUP', color: GOLD, size: 40 }, { label: 'BIRTH', sub: 'ONE', color: PINK, size: 40 },
      { label: 'DAY', sub: 'two', color: TEAL, size: 40 }, { label: 'TO', sub: 'three', color: TEAL, size: 40 }, { label: 'YOU', sub: 'ONE', color: PINK, size: 40 }];
    const gp = a.grid(PU, S('why1b').t0 + 0.1, S('why1b').t1, { rows: 1, cols: 5, cw: 200, chh: 230, y: 600, revealStep: 0.08 });
    const tP = a.w('why1b', 'pickup');
    gp.active.push({ t0: tP, t1: a.w('why1b', 'strong'), i: 0 });
    gp.active.push({ t0: a.w('why1b', 'strong'), t1: a.end('why1b') + 0.2, i: 1 });
    a.note('G4', tP, 0.75 * BEAT, { vel: 0.3 }); a.note('G4', tP + 0.75 * BEAT, 0.25 * BEAT, { vel: 0.3 }); a.note('A4', tP + BEAT, BEAT, { vel: 0.32 });
    a.big('INTO THE STRONG BEAT', a.w('why1b', 'strong'), S('why1b').t1, { y: 960, size: 50, family: 'DM Mono', weight: 500, color: PINK });
    const q0 = a.end('why1b') + 0.3;
    const cellOf = [0, 0, 1, 2, 3, 4];
    let qi = 0;
    mel(q0, 0, 6, { vel: 0.4, show: false, onNote: (n, t, d) => { gp.active.push({ t0: t, t1: t + d, i: cellOf[qi++] }); } });
    acc(q0, 0, 6, { vel: 0.5, shape: false });

    // why2: the peaks C, D, G - each run lands on the spoken name
    const peaks = [['C', 'C5', ['A4', 'G4'], 'C'], ['D', 'D5', ['A4', 'G4'], 'G'], ['G', 'G5', ['G4', 'G4'], 'C']];
    const tw = peaks.map(([w]) => a.w('why2', w) - 0.04);
    a.ch('C', S('why2').t0 + 0.1, tw[0], { ...CH.C, vel: 0.4 });
    peaks.forEach(([w, top, run, c], i) => {
      run.forEach((n, j) => a.note(n, tw[i] - (2 - j) * 0.16, 0.15, { vel: 0.3 }));
      a.note(top, tw[i], 0.9, { vel: 0.42 });
      a.ch(c, tw[i], i < 2 ? tw[i + 1] : S('why2').t1, { ...CH[c], vel: 0.5 });
      a.ring([w], tw[i], S('why2').t1, { color: GOLD });
      a.tag(w, tw[i], S('why2').t1, ['PEAK 1', 'PEAK 2', 'PEAK 3'][i], { color: GOLD, dr: -92 });
    });
    a.walker(peaks.map(([w], i) => [tw[i], w]), { t1: S('why2').t1, dr: 34, color: '#ffffff', label: 'HIGHER', labelDr: 82 });
    a.big('C  ·  D  ·  HIGH G', a.at('why2b'), S('why2').t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    // the three peaks once more, quickly
    const r0 = a.end('why2b') + 0.1;
    [['C5', 'C'], ['D5', 'G'], ['G5', 'C']].forEach(([n], i) => a.note(n, r0 + i * 0.3, 0.3, { vel: 0.3, show: false }));

    // why3: the octave ladder G4 .. G5
    const l0 = a.at('why3b') + 0.1;
    const LAD = ['G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4'];
    const gl = a.grid(LAD.map((n, i) => ({ label: n, size: 34, color: i === 0 || i === 7 ? GOLD : '#8d98ff' })), S('why3').t0 + 0.1, S('why3').t1,
      { rows: 8, cols: 1, cw: 320, chh: 70, x: 360, y: 450, revealStep: 0.05 });
    const lit = (n, t, d) => gl.active.push({ t0: t, t1: t + d, i: LAD.indexOf(n) });
    const tL = a.w('why3', 'leaps') - 0.04, tG0 = a.w('why3', 'G', 0) - 0.04, tG1 = a.w('why3', 'G', 1) - 0.04;
    [['G4', tL, 0.75 * BEAT], ['G4', tL + 0.75 * BEAT, 0.25 * BEAT], ['G5', tL + BEAT, 0.8], ['G4', tG0, 0.4], ['G5', tG1, 0.9]].forEach(([n, t, d]) => { a.note(n, t, d, { vel: 0.38 }); lit(n, t, Math.max(d, 0.3)); });
    a.ch('C', S('why3').t0 + 0.1, l0, { ...CH.C, vel: 0.35, shape: false });
    a.big('ONE', tL, a.at('why3b'), { x: 800, y: 680, size: 76, color: GOLD });
    a.big('OCTAVE', tL + 0.15, a.at('why3b'), { x: 800, y: 770, size: 76, color: GOLD });
    a.big('A BIG', a.at('why3b'), S('why3').t1, { x: 800, y: 680, size: 76, color: RED });
    a.big('RANGE', a.at('why3b') + 0.15, S('why3').t1, { x: 800, y: 770, size: 76, color: RED });
    mel(l0, 12, 18, { vel: 0.3, show: false, onNote: lit });
    acc(l0, 12, 18, { vel: 0.4, shape: false });

    // why4: C, F, G = I, IV, V
    const t3 = [a.w('why4', 'C'), a.w('why4', 'F'), a.w('why4', 'G')].map(t => t - 0.04);
    const tn = [a.w('why4', 'One'), a.w('why4', 'four'), a.w('why4', 'five')].map(t => t - 0.04);
    const cs = ['C', 'F', 'G'];
    cs.forEach((c, i) => a.ch(c, t3[i], i < 2 ? t3[i + 1] : tn[0], { ...CH[c], row: i, vel: 0.6 }));
    cs.forEach((c, i) => a.ch(c, tn[i], i < 2 ? tn[i + 1] : tn[2] + 0.7, { ...CH[c], row: i, vel: 0.6 }));
    a.ch('C', tn[2] + 0.7, S('why4').t1, { ...CH.C, row: 0, vel: 0.55 });
    ['I', 'IV', 'V'].forEach((r, i) => a.tag(cs[i], tn[i], S('why4').t1, r, { dr: -92 }));

    // essence: phrases three and four, home on C
    a.scale(S('essence').t0, 'C');
    const e0 = S('essence').t0 + 0.15;
    a.walker(mel(e0, 12, 25, { vel: 0.34 }), { t1: S('essence').t1, dr: -40, color: GOLD });
    acc(e0, 12, 22, { vel: 0.5 });
    a.ch('C', e0 + 10 * BEAT, S('essence').t1 - 0.3, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.8 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
