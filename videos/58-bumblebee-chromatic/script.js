// Flight of the Bumblebee: the chromatic scale at top speed - every half step, no resting notes.
// the opening idea (public domain, Rimsky-Korsakov), in sixteenth notes
const FRAG = ['E5', 'Eb5', 'D5', 'Db5', 'C5', 'Db5', 'C5', 'B4', 'Bb4', 'A4', 'Ab4', 'G4', 'F#4', 'F4', 'E4', 'Eb4'];
const SX = 0.095;   // one sixteenth
const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

module.exports = {
  slug: 'bumblebee-chromatic',
  title: 'Flight of the Bumblebee',
  segments: [
    { id: 'hook',    text: 'A whole orchestra, buzzing like an insect... using every note there is.' },
    { id: 'what',    text: 'This is Flight of the Bumblebee, by Nikolai Rimsky-Korsakov.' },
    { id: 'what2',   text: 'An orchestral interlude from his opera The Tale of Tsar Saltan, written in 1899 and 1900.' },
    { id: 'what3',   text: "Today it's famous as a virtuoso showpiece." },
    { id: 'play',    text: 'Listen to how it begins.' },
    { id: 'chrom',   text: "That's the chromatic scale: all twelve notes, every half step." },
    { id: 'why1',    text: 'So why does it sound like a bee? It uses every half step, with no clear scale.' },
    { id: 'why2',    text: 'So there are no resting notes. Nothing to land on, like something that never stops buzzing.' },
    { id: 'why3',    text: "It's also very fast, and moves mostly by step..." },
    { id: 'why3b',   text: "with tiny back and forth turns. That's the sound of wings." },
    { id: 'why4',    text: 'And on the circle, the chromatic scale is just a walk around it, one step at a time.' },
    { id: 'essence', text: 'Twelve notes, no stops, top speed... and an orchestra turns into an insect.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'RIMSKY-KORSAKOV', title: 'THE BUMBLEBEE', accent: true, tonic: 0, min: 6.0, tail: 0.8 },
    { id: 'what', segs: ['what', 'what2', 'what3'], label: 'FROM TSAR SALTAN', title: 'BUMBLEBEE', sub: 'Rimsky-Korsakov · 1899–1900', tonic: 0, gap: 0.35, tail: 0.6 },
    { id: 'play', segs: ['play'], label: 'THE OPENING', title: 'TOP SPEED', sub: 'sixteenth notes, all the way down', tonic: 0, tail: 0.3 + 48 * SX + 2.0 },
    { id: 'chrom', segs: ['chrom'], label: 'ALL TWELVE NOTES', title: 'THE CHROMATIC SCALE', tonic: 0, tail: 2.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NO CLEAR SCALE', tonic: 0, tail: 1.4 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'NO RESTING NOTES', tonic: 0, tail: 1.4 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'THE SOUND OF WINGS', tonic: 0, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4'], label: 'ONE STEP AT A TIME', title: 'AROUND THE CIRCLE', tonic: 0, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TWELVE NOTES, NO STOPS', accent: true, tonic: 0, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff';
    const midi = n => a.T.midi(n), pcn = m => a.T.NAMES[a.T.mod(m, 12)];
    // play a list of notes (names or midi) in sixteenths from t0; returns { end, pts }
    function run(list, t0, o = {}) {
      const sx = o.sx ?? SX, sh = o.shift ?? 0, v = o.vel ?? 0.34, pts = [];
      list.forEach((n, i) => {
        const m = midi(n) + sh, t = t0 + i * sx;
        a.note(m, t, sx * 0.95, { vel: v * (i % 4 === 0 ? 1.1 : 1), show: o.show ?? true });
        pts.push([t, pcn(m)]);
      });
      if (o.walk !== false) a.walker(pts, { t1: o.t1 ?? t0 + list.length * sx + 0.4, dr: -40, color: o.color ?? GOLD });
      return { end: t0 + list.length * sx, pts };
    }
    // a soft low pulse underneath (not from the score - just a heartbeat for the runs)
    const pulse = (t0, t1, n = 'E2', v = 0.18) => { for (let t = t0; t < t1 - 0.1; t += 8 * SX) a.note(n, t, 4 * SX, { vel: v, show: false }); };
    // a word in the middle of the circle
    const mid = (text, t0, t1, color = GOLD, size = 46) => a.big(text, t0, t1, { y: 830, size, family: 'DM Mono', weight: 500, color, blur: 14 });
    const chrom = (from, count, dir = 1) => Array.from({ length: count }, (_, i) => midi(from) + dir * i);

    // ---------- hook: the buzz, then all twelve notes light up ----------
    a.scale(0.2, 'C', ALL, { popIn: { t0: 0.3, step: 0.07 } });
    let t = 0.35;
    const r1 = run(FRAG, t, { vel: 0.32, color: GOLD });
    const r2 = run(FRAG, r1.end, { shift: -12, vel: 0.32, color: PINK });
    const r3 = run(FRAG, r2.end, { vel: 0.34, color: GOLD });
    pulse(0.35, r3.end);
    const tEv = a.w('hook', 'every') - 0.05;
    a.ring(ALL, tEv, S('hook').t1, { color: BLUE });
    mid('bzzzz...', 0.5, tEv, GOLD, 60);
    mid('12 NOTES', tEv, S('hook').t1, BLUE, 64);
    const rh = run(chrom('E3', 25), Math.max(r3.end, tEv), { vel: 0.3, color: BLUE, sx: 0.08, t1: S('hook').t1 });
    a.note('E3', rh.end, 0.8, { vel: 0.3 }); a.note('E2', rh.end, 0.8, { vel: 0.3, show: false });

    // ---------- what: the fragment buzzes quietly under the title ----------
    const w0 = S('what').t0 + 0.2;
    let tw = w0, k = 0;
    while (tw + 16 * SX < S('what').t1 - 0.3) {
      const r = run(FRAG, tw, { vel: 0.18, shift: k % 2 ? -12 : 0, color: k % 2 ? PINK : GOLD, show: false });
      tw = r.end + (k % 2 ? 0.8 : 0); k++;
    }
    pulse(w0, S('what').t1, 'E2', 0.12);
    mid('RIMSKY-KORSAKOV', a.w('what', 'Nikolai') - 0.05, a.w('what2', 'opera') - 0.05, '#ffffff', 40);
    mid('TSAR SALTAN', a.w('what2', 'opera') - 0.05, a.w('what2', '1899') - 0.05, PINK, 48);
    mid('1899–1900', a.w('what2', '1899') - 0.05, a.w('what3', 'virtuoso') - 0.05, BLUE, 56);
    mid('SHOWPIECE', a.w('what3', 'virtuoso') - 0.05, S('what').t1, GOLD, 56);

    // ---------- play: the opening, three times down the keyboard ----------
    const p0 = a.end('play') + 0.3;
    const q1 = run(FRAG, p0, { vel: 0.38, color: GOLD });
    const q2 = run(FRAG, q1.end, { shift: -12, vel: 0.38, color: PINK });
    const q3 = run(FRAG, q2.end, { vel: 0.4, color: GOLD, t1: S('play').t1 });
    pulse(S('play').t0 + 0.2, q3.end, 'E2', 0.2);
    a.note('E4', q3.end, 1.0, { vel: 0.34 }); a.note('E2', q3.end, 1.0, { vel: 0.3, show: false });
    mid('HALF STEPS', p0, q1.end, GOLD, 50);
    mid('LOWER', q1.end, q2.end, PINK, 50);
    mid('AND AGAIN', q2.end, S('play').t1, GOLD, 50);

    // ---------- chrom: all twelve, one by one ----------
    const c0 = a.w('chrom', 'chromatic') - 0.1, tTw = a.w('chrom', 'twelve') - 0.05, tHalf = a.w('chrom', 'half') - 0.05;
    a.scale(c0, 'C', ALL, { popIn: { t0: c0 + 0.1, step: 0.13 } });
    chrom('C4', 13).forEach((m, i) => a.note(m, c0 + 0.1 + i * 0.13, 0.3, { vel: 0.3 }));
    a.big('12', tTw, tHalf, { y: 830, size: 150, color: '#ffffff' });
    a.arc('E', 'F', tHalf, S('chrom').t1, { steps: 1, color: TEAL, dr: 30 });
    mid('HALF STEPS', tHalf, S('chrom').t1, TEAL, 50);
    a.arc('B', 'C', tHalf + 0.3, S('chrom').t1, { steps: 1, color: TEAL, dr: 30 });
    a.arc('F#', 'G', tHalf + 0.6, S('chrom').t1, { steps: 1, color: TEAL, dr: 30 });
    run(chrom('C5', 13, -1), tHalf, { vel: 0.26, color: TEAL, sx: 0.12, t1: S('chrom').t1 });

    // ---------- part 2 ----------
    // why1: a normal scale (7 notes) versus every half step
    const y0 = S('why1').t0, tEv1 = a.w('why1', 'every') - 0.05, tNo = a.w('why1', 'clear') - 0.05;
    a.scale(y0, 'C');
    a.ch('C', y0 + 0.1, tEv1, { notes: ['G3', 'C4', 'E4'], bass: 'C3', vel: 0.45 });
    [0, 2, 4, 5, 7, 9, 11, 12].forEach((d, i) => a.note(60 + d, y0 + 0.2 + i * 0.16, 0.3, { vel: 0.28 }));
    a.scale(tEv1, 'C', ALL);
    run(FRAG, tEv1 + 0.1, { vel: 0.3, color: GOLD, t1: S('why1').t1 });
    run(FRAG, tEv1 + 0.1 + 16 * SX, { vel: 0.3, shift: -12, color: PINK, t1: S('why1').t1 });
    mid('NO CLEAR SCALE', tNo, S('why1').t1, GOLD, 36);

    // why2: nothing to land on - the run never stops
    const z0 = S('why2').t0 + 0.1, tRest = a.w('why2', 'resting') - 0.05, tLand = a.w('why2', 'land') - 0.05;
    a.scale(S('why2').t0, 'C', ALL);
    let tz = z0, kz = 0;
    while (tz + 16 * SX < S('why2').t1 - 0.2) { const r = run(FRAG, tz, { vel: 0.26, shift: kz % 2 ? -12 : 0, color: kz % 2 ? PINK : GOLD, t1: S('why2').t1 }); tz = r.end; kz++; }
    pulse(z0, tz, 'E2', 0.14);
    mid('NO REST', tRest, tLand, RED, 60);
    mid('NOWHERE TO LAND', tLand, S('why2').t1, RED, 36);

    // why3: mostly by step, with little back-and-forth turns (the Db5 C5 Db5 C5 inside the opening)
    const v0 = S('why3').t0, tStep = a.w('why3', 'step') - 0.05, tTurn = a.w('why3b', 'turns') - 0.05, tWing = a.w('why3b', 'wings') - 0.05;
    a.scale(v0, 'C', ALL);
    run(FRAG.slice(0, 5), v0 + 0.3, { sx: 0.3, vel: 0.3, color: GOLD, t1: tStep + 0.6 });
    for (let i = 0; i < 4; i++) a.arc(['E', 'Eb', 'D', 'C#'][i], ['Eb', 'D', 'C#', 'C'][i], tStep + i * 0.15, a.at('why3b'), { steps: -1, color: GOLD, dr: 30 });
    mid('STEP BY STEP', tStep, a.at('why3b'), GOLD, 46);
    // the turn, slowly, then at speed
    const turn = ['D5', 'Db5', 'C5', 'Db5', 'C5', 'B4'];
    run(turn, tTurn, { sx: 0.22, vel: 0.32, color: TEAL, t1: tWing });
    a.arc('C#', 'C', tTurn + 0.22, tWing, { steps: -1, color: TEAL, dr: 30 });
    a.arc('C', 'C#', tTurn + 0.66, tWing, { steps: 1, color: TEAL, dr: 55 });
    mid('BACK AND FORTH', tTurn, tWing, TEAL, 38);
    run(FRAG, tWing, { vel: 0.34, color: GOLD, t1: S('why3').t1 });
    run(FRAG, tWing + 16 * SX, { vel: 0.34, shift: -12, color: PINK, t1: S('why3').t1 });
    mid('WINGS', tWing, S('why3').t1, PINK, 70);

    // why4: the chromatic scale = walking round the circle one step at a time
    const u0 = S('why4').t0, tWalk = a.w('why4', 'walk') - 0.05;
    a.scale(u0, 'C', ALL);
    run(chrom('C4', 13), u0 + 0.3, { sx: 0.2, vel: 0.26, color: TEAL, t1: tWalk });
    const lap = run(chrom('C3', 25), tWalk, { sx: 0.085, vel: 0.3, color: GOLD, t1: S('why4').t1 });
    run(chrom('C5', 25, -1), lap.end, { sx: 0.085, vel: 0.3, color: PINK, t1: S('why4').t1 });
    mid('ONE STEP', a.w('why4', 'step') - 0.05, S('why4').t1, GOLD, 56);
    a.big('AT A TIME', a.w('why4', 'step') - 0.05, S('why4').t1, { y: 900, size: 34, family: 'DM Mono', weight: 500, color: GOLD, blur: 10 });

    // essence: once more at top speed, then stop
    const e0 = S('essence').t0 + 0.15;
    a.scale(S('essence').t0, 'C', ALL);
    const ea = run(FRAG, e0, { vel: 0.36, color: GOLD });
    const eb = run(FRAG, ea.end, { vel: 0.36, shift: -12, color: PINK });
    const ec = run(FRAG, eb.end, { vel: 0.36, color: GOLD });
    pulse(e0, ec.end, 'E2', 0.18);
    const tIns = a.w('essence', 'insect') - 0.05;
    mid('12 NOTES', a.w('essence', 'Twelve') - 0.05, a.w('essence', 'stops') - 0.05, '#ffffff', 56);
    mid('NO STOPS', a.w('essence', 'stops') - 0.05, a.w('essence', 'speed') - 0.05, RED, 56);
    mid('TOP SPEED', a.w('essence', 'speed') - 0.05, a.at('cta'), GOLD, 56);
    const ed = run(chrom('E3', 25), Math.max(ec.end, tIns - 25 * 0.08), { sx: 0.08, vel: 0.32, color: BLUE, t1: a.at('cta') + 1.0 });
    a.note('E5', ed.end, 1.2, { vel: 0.36 }); a.note('E3', ed.end, 1.2, { vel: 0.3 }); a.note('E2', ed.end, 1.2, { vel: 0.3, show: false });
    a.ring(ALL, ed.end, S('essence').t1, { color: BLUE });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
