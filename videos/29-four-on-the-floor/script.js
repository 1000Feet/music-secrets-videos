// Four on the floor: a kick on every beat, the hi-hat in between, and why the body can't resist it.
const B1 = 60 / 104, B = 0.5;   // Stayin' Alive tempo, and 120 BPM for everything else

module.exports = {
  slug: 'four-on-the-floor',
  title: 'Four on the Floor',
  segments: [
    { id: 'hook',    text: "One kick drum, on every single beat. That's four on the floor." },
    { id: 'what',    text: 'The kick hits one, two, three, four... and the hi-hat answers in between.' },
    { id: 's1',      text: "Stayin' Alive runs at about a hundred and four beats per minute." },
    { id: 's1b',     text: "That's in the CPR range, a hundred to a hundred and twenty compressions a minute..." },
    { id: 's1c',     text: "so it's used in CPR training." },
    { id: 's2',      text: "Donna Summer's I Feel Love adds a pulsing synth sequencer." },
    { id: 's3',      text: "And Daft Punk's One More Time rides the same beat." },
    { id: 'why1',    text: 'So why does it work? A kick on every beat is the simplest pulse there is.' },
    { id: 'why2',    text: 'You cannot lose it, so your body locks in.' },
    { id: 'why2b',   text: 'We naturally move in time with a steady beat.' },
    { id: 'why3',    text: 'The open hi-hat between the kicks adds lift, like breathing in and out.' },
    { id: 'why4',    text: 'And around a hundred and twenty beats per minute, it matches a brisk walking pace.' },
    { id: 'why4b',   text: 'That is where dance music lives.' },
    { id: 'essence', text: 'One, two, three, four. A beat so simple, your body follows it before your mind does.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE DRUM BEAT', title: 'FOUR ON THE FLOOR', accent: true, circle: false, min: 4 * 4 * B + 0.3, tail: 0.3 },
    { id: 'what', segs: ['what'], label: 'KICK + HI-HAT', title: 'BOOM, TSS', circle: false, min: 4 * 4 * B, tail: 0.3 },
    { id: 's1', segs: ['s1', 's1b', 's1c'], label: 'YOU HEAR IT IN', title: "Stayin' Alive", sub: 'Bee Gees · 1977', circle: false, min: 6 * 4 * B1, gap: 0.25, tail: 0.6 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'I Feel Love', sub: 'Donna Summer · 1977', circle: false, min: 4 * 4 * B, tail: 0.6 },
    { id: 's3', segs: ['s3'], label: 'YOU HEAR IT IN', title: 'One More Time', sub: 'Daft Punk · 2000', circle: false, min: 4 * 4 * B, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE SIMPLEST PULSE', circle: false, min: 3 * 4 * B, tail: 0.3 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'LOCKED IN', circle: false, min: 3 * 4 * B, gap: 0.35, tail: 0.3 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'BREATHE IN, OUT', circle: false, min: 4 * 4 * B, tail: 0.3 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'A BRISK WALK', circle: false, min: 4 * 4 * B, gap: 0.35, tail: 0.3 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE, TWO, THREE, FOUR', accent: true, circle: false, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff';
    const MONO = { family: 'DM Mono', weight: 500 };

    // two staggered rows: kicks on the beats, hi-hats half a cell later (the off-beats)
    const KICKS = [1, 2, 3, 4].map(n => ({ label: String(n), color: PINK, size: 56 }));
    const HATS = [1, 2, 3, 4].map(() => ({ label: 'ts', color: TEAL, size: 46 }));
    const rows = (t0, t1, o = {}) => ({
      k: a.grid(KICKS, t0, t1, { rows: 1, cols: 4, cw: 220, chh: 150, y: o.y ?? 520, x: 485, caption: 'KICK' }),
      h: o.noHat ? null : a.grid(HATS, o.hatFrom ?? t0, t1, { rows: 1, cols: 4, cw: 220, chh: 130, y: (o.y ?? 520) + 240, x: 595, caption: 'HI-HAT' }),
    });

    // one bar: kick on every beat, open hi-hat on every off-beat
    function bar(t, o = {}) {
      const b = o.b ?? B, vel = o.vel ?? 1;
      for (let i = 0; i < 4; i++) {
        const tb = t + i * b, to = tb + b / 2;
        const g = typeof o.g === 'function' ? o.g(tb + 0.01) : o.g;
        a.perc('kick', tb, 1.0 * vel);
        if (g) g.k.active.push({ t0: tb, t1: tb + b / 2, i });
        if (o.hat !== false) {
          a.perc('hat', to, 0.6 * vel); a.perc('hat', to + 0.03, 0.4 * vel); a.perc('hat', to + 0.07, 0.25 * vel);
          if (g && g.h) g.h.active.push({ t0: to, t1: to + b / 2, i });
        }
        if (o.clap && i % 2) { a.perc('snare', tb, 0.45 * vel); a.perc('snare', tb + 0.02, 0.25 * vel); }
        if (o.octBass) { a.note(o.octBass, tb, b * 0.4, { vel: 0.4 * vel, show: false }); a.note(a.T.midi(o.octBass) + 12, to, b * 0.4, { vel: 0.3 * vel, show: false }); }
        if (o.arp) for (let s = 0; s < 4; s++) a.note(o.arp[(i * 4 + s) % o.arp.length], tb + s * b / 4, b / 4 * 0.8, { vel: 0.22 * vel, show: false });
      }
      if (o.chord) a.ch(o.chord, t, t + 4 * b, { bass: false, strikes: o.strikes || [{ o: b / 2, v: 0.8 }, { o: 1.5 * b, v: 0.6 }, { o: 2.5 * b, v: 0.8 }, { o: 3.5 * b, v: 0.6 }], vel: (o.cv ?? 0.55) * vel, hideName: true, shape: false, notes: o.notes });
    }
    const loop = (t0, t1, f) => { let t = t0, n = 0; for (; t + 4 * B <= t1 + 0.05; t += 4 * B, n++) f(t, n); return t; };

    // ---- hook: just the kick, then the hi-hat joins ----
    const h0 = 0.3, tFloor = a.w('hook', 'floor');
    const gH = rows(h0, S('hook').t1, { hatFrom: tFloor });
    loop(h0, S('hook').t1, (t, n) => bar(t, { g: gH, hat: t >= tFloor - 0.3, vel: 0.85 }));
    a.big('BOOM  BOOM  BOOM  BOOM', a.w('hook', 'One'), tFloor, { y: 1060, size: 44, ...MONO, color: PINK, blur: 12 });
    a.big('4 / 4', tFloor, S('hook').t1, { y: 1060, size: 60, ...MONO, color: GOLD });

    // ---- what + songs: one continuous groove at 120 BPM, except Stayin' Alive at 104 ----
    const gW = rows(S('what').t0, S('what').t1);
    const tK = ['one', 'two', 'three', 'four'].map(w => a.w('what', w));
    tK.forEach((t, i) => a.big(String(i + 1), t, a.w('what', 'hihat'), { x: 485 - 330 + 220 * i, y: 1070, size: 64, ...MONO, color: PINK, blur: 14 }));
    a.big('TSS', a.w('what', 'hihat'), S('what').t1, { y: 1070, size: 64, ...MONO, color: TEAL });
    loop(S('what').t0, S('what').t1, (t, n) => bar(t, { g: gW, chord: n % 2 ? 'Dm7' : 'Am7', notes: n % 2 ? ['F3', 'A3', 'C4'] : ['E3', 'G3', 'C4'] }));

    // Stayin' Alive at ~104 BPM (generic disco groove, no melody)
    const s10 = S('s1').t0, gS1 = rows(s10, S('s1').t1);
    { let t = s10, n = 0; for (; t + 4 * B1 <= S('s1').t1 + 0.05; t += 4 * B1, n++) bar(t, { b: B1, g: gS1, clap: true, octBass: n % 2 ? 'D2' : 'A1', chord: n % 2 ? 'Dm7' : 'Am7', notes: n % 2 ? ['F3', 'A3', 'C4'] : ['E3', 'G3', 'C4'] }); }
    a.big('104 BPM', a.w('s1', 'hundred') - 0.1, a.at('s1b'), { y: 1060, size: 80, ...MONO, color: GOLD });
    a.big('CPR: 100–120 / MIN', a.w('s1b', 'CPR'), S('s1').t1, { y: 1030, size: 50, ...MONO, color: '#ff5d6c' });
    a.big('104 BPM', a.w('s1b', 'CPR'), S('s1').t1, { y: 1110, size: 50, ...MONO, color: GOLD });

    // I Feel Love: four on the floor + a pulsing sixteenth-note sequencer (generic pattern)
    const s20 = S('s2').t0, gS2 = rows(s20, S('s2').t1);
    const ARP = [['A2', 'A3', 'E3', 'G3'], ['F2', 'F3', 'C3', 'Eb3']];
    loop(s20, S('s2').t1, (t, n) => bar(t, { g: gS2, arp: ARP[Math.floor(n / 2) % 2], cv: 0 }));
    a.big('+ SYNTH SEQUENCER', a.w('s2', 'pulsing'), S('s2').t1, { y: 1060, size: 52, ...MONO, color: BLUE });

    // One More Time: same beat, house chord stabs
    const s30 = S('s3').t0, gS3 = rows(s30, S('s3').t1);
    const ST = ['Fmaj7', 'Em7', 'Dm7', 'Dm7'];
    loop(s30, S('s3').t1, (t, n) => bar(t, { g: gS3, clap: true, octBass: ['F1', 'E2', 'D2', 'D2'][n % 4], chord: ST[n % 4], cv: 0.6 }));
    a.big('SAME BEAT', a.at('s3') + 0.3, S('s3').t1, { y: 1060, size: 64, ...MONO, color: GOLD });

    // ---- part 2 ----
    const p2 = S('why1').t0;
    // why1: strip it back to the kick alone
    const gY1 = rows(p2, S('why1').t1, { noHat: true, y: 560 });
    loop(p2, S('why1').t1, t => bar(t, { g: gY1, hat: false, vel: 0.8 }));
    a.big('SIMPLEST PULSE', a.w('why1', 'simplest'), S('why1').t1, { y: 930, size: 56, ...MONO, color: PINK });

    // why2: the count you cannot lose - a huge number on every kick
    const gY2 = { k: a.grid([1, 2, 3, 4].map(n => ({ label: String(n), color: PINK, size: 150 })), S('why2').t0, S('why2').t1,
      { rows: 1, cols: 4, cw: 240, chh: 380, y: 560, caption: 'KICK, KICK, KICK, KICK' }), h: null };
    loop(S('why2').t0, S('why2').t1, t => bar(t, { g: gY2, hat: false, vel: 0.85, octBass: 'A1' }));

    // why3: the hi-hat comes back, kick = in, hat = out
    const gY3 = rows(S('why3').t0, S('why3').t1, { hatFrom: a.w('why3', 'hihat') });
    const tHat = a.w('why3', 'hihat'), tBr = a.w('why3', 'breathing');
    const gIO = a.grid([{ label: 'IN', color: PINK, size: 50 }, { label: 'OUT', color: TEAL, size: 50 }], tBr, S('why3').t1, { rows: 1, cols: 2, cw: 260, chh: 120, y: 990 });
    loop(S('why3').t0, S('why3').t1, t => {
      bar(t, { g: gY3, hat: t >= tHat - 0.6, octBass: 'A1', chord: 'Am7', notes: ['E3', 'G3', 'C4'], cv: 0.4 });
      if (t + 4 * B > tBr) for (let i = 0; i < 4; i++) {
        const tb = Math.max(t + i * B, tBr);
        if (tb < t + i * B + B / 2) gIO.active.push({ t0: tb, t1: t + i * B + B / 2, i: 0 });
        gIO.active.push({ t0: Math.max(t + i * B + B / 2, tBr), t1: t + (i + 1) * B, i: 1 });
      }
    });

    // why4: 120 BPM, left, right, left, right
    const gY4 = rows(S('why4').t0, S('why4').t1);
    const PR = ['Am7', 'Dm7', 'Fmaj7', 'Em7'], PN = [['E3', 'G3', 'C4'], ['F3', 'A3', 'C4'], ['E3', 'A3', 'C4'], ['D3', 'G3', 'B3']];
    const tBrisk = a.w('why4', 'brisk');
    const gLR = a.grid([{ label: 'LEFT', color: GOLD, size: 44 }, { label: 'RIGHT', color: GOLD, size: 44 }], tBrisk, S('why4').t1, { rows: 1, cols: 2, cw: 260, chh: 110, y: 1035 });
    loop(S('why4').t0, S('why4').t1, (t, n) => {
      bar(t, { g: gY4, clap: true, octBass: ['A1', 'D2', 'F1', 'E2'][n % 4], chord: PR[n % 4], notes: PN[n % 4] });
      for (let i = 0; i < 4; i++) if (t + (i + 1) * B > tBrisk) gLR.active.push({ t0: Math.max(t + i * B, tBrisk), t1: t + (i + 1) * B, i: i % 2 });
    });
    a.big('120 BPM', a.w('why4', 'hundred'), S('why4').t1, { y: 990, size: 46, ...MONO, color: '#ffffff', blur: 10 });

    // essence: the voice counts, the kicks answer, then the full groove
    const e0 = S('essence').t0;
    const gE = rows(e0, S('essence').t1);
    const tC = ['One', 'two', 'three', 'four'].map(w => a.w('essence', w));
    const eg = tC[0];
    const tEnd = loop(eg, S('essence').t1 - 1.8, (t, n) => bar(t, { g: gE, clap: n > 0, octBass: ['A1', 'D2', 'F1', 'E2'][n % 4], chord: PR[n % 4], notes: PN[n % 4], vel: 0.9 }));
    a.big('1 · 2 · 3 · 4', tC[0], S('essence').t1, { y: 1060, size: 64, ...MONO, color: GOLD });
    a.perc('kick', tEnd, 1);
    gE.k.active.push({ t0: tEnd, t1: S('essence').t1, i: 0 });
    a.ch('Am7', tEnd, S('essence').t1 - 0.2, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'A1', vel: 0.8, hideName: true, shape: false });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
