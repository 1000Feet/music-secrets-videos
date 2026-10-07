// The trap beat: a 140 BPM grid with a half-time clap on beat 3, a booming 808 that plays the bass
// line, and racing hi-hats that break into 32nd and triplet rolls.
// Copyright/brief: T.I., Lex Luger and Metro Boomin are named only. Every beat and the little
// melody here are ORIGINAL generic patterns. 808 voice = a decaying sine with a quick pitch drop.
const S16 = 60 / 140 / 4, BAR = 16 * S16; // 140 BPM: one sixteenth, one bar
const hz = f => 69 + 12 * Math.log2(f / 440);
const LANES = ['HAT', 'CLAP', '808'];
const ALL16 = Array.from({ length: 16 }, (_, i) => i);
// original 808 line (one bar, C minor): [step, length in steps, note]
const BASS = [[0, 6, 'C2'], [7, 3, 'C2'], [10, 4, 'Eb2'], [14, 2, 'G2']];
// hi-hat bars: per step, how many hits (1 = sixteenth, 2 = 32nd roll, 1.5 = triplet pair)
const H_PLAIN = ALL16.map(() => 1);
const H_ROLL = ALL16.map(s => (s >= 12 ? 2 : 1));
const H_TRIP = ALL16.map(s => (s >= 8 && s < 12 ? 1.5 : s >= 14 ? 2 : 1));
const HATS = [H_PLAIN, H_ROLL, H_PLAIN, H_TRIP];

module.exports = {
  slug: 'trap-beat',
  title: 'How a Trap Beat Works',
  segments: [
    { id: 'hook',    text: 'Listen. Slow, heavy drums under racing hi-hats. Two speeds at once. This is trap.' },
    { id: 'what',    text: 'It grew out of Southern hip hop in Atlanta, Georgia, in the two thousands.' },
    { id: 's1',      text: "T.I.'s 2003 album, Trap Muzik, helped give the style its name." },
    { id: 's2',      text: 'And producers like Lex Luger and Metro Boomin shaped its sound.' },
    { id: 'why1',    text: 'So why does it work? The tempo is fast, around 140 beats per minute.' },
    { id: 'why2',    text: 'But the snare, or clap, lands only on beat three of each bar. Half time. So it feels like 70.' },
    { id: 'why3',    text: 'Underneath sits the 808, from our TR-808 video.' },
    { id: 'why3b',   text: 'A deep kick with a long, pitched tail. It plays the bass line.' },
    { id: 'why4',    text: 'The hi-hats run in fast, steady sixteenths...' },
    { id: 'why4b',   text: "then switch to rolls of thirty second notes and triplets. That's the rattle." },
    { id: 'why5',    text: 'On top, sparse, dark melodies, often minor, leave room for the bass and the vocals.' },
    { id: 'essence', text: 'A slow, heavy backbeat under racing hats. Trap lives in two speeds at once.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TWO SPEEDS AT ONCE', title: 'THE TRAP BEAT', accent: true, circle: false, lead: 0.4, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'WHERE IT CAME FROM', title: 'ATLANTA', sub: 'Southern hip hop · 2000s', circle: false, tail: 0.6 },
    { id: 's1', segs: ['s1'], label: 'THE NAME', title: 'Trap Muzik', sub: 'T.I. · 2003', circle: false, tail: 0.8 },
    { id: 's2', segs: ['s2'], label: 'THE SOUND', title: 'The Producers', sub: 'Lex Luger · Metro Boomin', circle: false, tail: 2.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: '140 BPM', circle: false, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'HALF TIME', circle: false, tail: 1.7 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'THE 808', circle: false, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'THE RATTLE', circle: false, gap: 0.3, tail: 2.2 },
    { id: 'why5', segs: ['why5'], label: 'ON TOP', title: 'DARK AND SPARSE', sub: 'a minor melody', tonic: 0, tail: 2.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TWO SPEEDS AT ONCE', accent: true, circle: false, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', WHITE = '#ffffff', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const COL = { HAT: TEAL, CLAP: GOLD, '808': PINK };

    // ---------- voices ----------
    const FREQ = { C2: 65.41, Eb2: 77.78, G2: 98.0, F2: 87.31, Ab2: 103.83 };
    function boom(t, note, dur, o = {}) {
      a.note(hz(FREQ[note]), t, dur, { vel: o.vel ?? 0.62, show: false, tone: { partials: [1, 0.12, 0.04], attack: 0.002, release: 0.08, decay: o.decay ?? 1.3, bend: [[0, 14], [0.025, 4], [0.07, 0]] } });
      a.note(note, t, Math.min(dur, 1.0), { vel: 0, show: false });
    }
    const clap = (t, v = 0.85) => { a.perc('snare', t, v * 0.55); a.perc('snare', t + 0.011, v * 0.55); a.perc('snare', t + 0.023, v); };
    const hat = (t, v = 0.5) => a.perc('hat', t, v);
    // hit times (offsets in seconds) of one hat step with n hits (1, 2, or 1.5 = triplet: 3 hits over 2 steps)
    const hatHits = (s, n) => (n === 2 ? [0, S16 / 2] : n === 1.5 ? ((s % 2) ? [S16 / 3] : [0, (2 * S16) / 3]) : [0]);

    // ---------- the 16-step grid: HAT / CLAP / 808 lanes, 808 notes as long bars, a playhead ----------
    const GX = 580, GY = 600, CW = 56, CH = 108;
    // o.clap: clap steps; o.bass: 808 pattern; o.hats(bar) -> hat bar; o.mute(lane, t); o.stop
    function trap(t0, t1, tStart, o = {}) {
      const clapSteps = o.clap ?? [8], bass = o.bass ?? BASS;
      const top = a.grid([...ALL16.map(() => ({ label: '', color: COL.HAT })), ...ALL16.map(() => ({ label: '', color: COL.CLAP }))], t0, t1, { rows: 2, cols: 16, cw: CW, chh: CH, x: GX, y: GY });
      const ph = a.grid(ALL16.map(s => ({ label: '', color: s % 4 ? GREY : WHITE })), t0, t1, { rows: 1, cols: 16, cw: CW, chh: 36, x: GX, y: GY - 48 });
      const bars = bass.map(([s, len, n]) => a.grid([{ label: n.replace(/\d/, ''), color: COL['808'], size: 30 }], t0, t1, { rows: 1, cols: 1, cw: len * CW, chh: CH, x: GX - 8 * CW + (s + len / 2) * CW, y: GY + 2 * CH }));
      LANES.forEach((l, r) => a.big(l, t0, t1, { x: 66, y: GY + r * CH + CH / 2, size: 24, ...MONO, color: COL[l], blur: 0 }));
      ['1', '2', '3', '4'].forEach((b, i) => a.big(b, t0, t1, { x: GX - 8 * CW + (i * 4 + 0.5) * CW, y: GY + 3 * CH + 26, size: 26, ...MONO, color: b === '3' && clapSteps.length === 1 ? GOLD : GREY, blur: 0 }));
      const hits = {}; // cell -> times (for the HAT/CLAP lanes)
      const end = o.stop ?? t1, on = (l, t) => !(o.mute && o.mute(l, t));
      let bar = 0;
      for (let tb = tStart; tb < end - 0.02; tb += BAR, bar++) {
        const hb = o.hats ? o.hats(bar) : HATS[bar % 4];
        for (let s = 0; s < 16; s++) {
          const t = tb + s * S16;
          if (t >= end - 0.02) break;
          ph.active.push({ t0: t, t1: t + S16, i: s });
          if (on('HAT', t) && hb[s]) hatHits(s, hb[s]).forEach((h, k) => { hat(t + h, (k ? 0.36 : s % 2 ? 0.34 : 0.5) * (o.hatV ?? 1)); (hits[s] = hits[s] || []).push(t + h); });
          if (on('CLAP', t) && clapSteps.includes(s)) { clap(t); (hits[16 + s] = hits[16 + s] || []).push(t); }
          const bn = bass.findIndex(([bs]) => bs === s);
          if (bn >= 0 && on('808', t)) {
            const [, len, n] = bass[bn], d = len * S16;
            boom(t, n, d + 0.05, { decay: o.decay ?? 1.3 });
            bars[bn].active.push({ t0: t, t1: Math.min(t + d, end), i: 0 });
          }
        }
      }
      // programmed cells stay lit; every hit restarts the pulse
      const prog = [...ALL16.filter(s => Object.keys(hits).includes(String(s))), ...clapSteps.map(s => 16 + s)];
      prog.forEach(i => {
        const p0 = o.progT0 ? o.progT0(i < 16 ? 'HAT' : 'CLAP') : t0;
        const hs = (hits[i] || []).filter(x => x > p0 + 0.01);
        let last = p0;
        hs.forEach(x => { top.active.push({ t0: last, t1: x, i }); last = x; });
        top.active.push({ t0: last, t1, i });
      });
      return { top, bars };
    }

    // ---------- part 1: one continuous groove (cover: grid fully lit from the first frame) ----------
    const p1 = S('s2').t1;
    trap(0.02, p1, 0.25, { stop: p1 - 0.5 });
    boom(p1 - 0.5, 'C2', 0.45, { decay: 2 });
    a.big('140 BPM · FEELS LIKE 70', 0.05, a.at('what') - 0.1, { y: 480, size: 44, ...MONO, color: GOLD, blur: 8 });
    a.big('ATLANTA · 2000s', a.at('what') + 0.2, S('what').t1, { y: 480, size: 48, ...MONO, color: TEAL, blur: 8 });
    a.big('T.I. · TRAP MUZIK · 2003', a.at('s1') + 0.2, S('s1').t1, { y: 1080, size: 40, ...MONO, color: GOLD, blur: 8 });
    a.big('LEX LUGER · METRO BOOMIN', a.w('s2', 'Lex') - 0.05, S('s2').t1, { y: 1080, size: 40, ...MONO, color: PINK, blur: 8 });
    // a sparse, dark pad on top in the last scene of part 1 (original)
    [['C4', 'Eb4', 'G4'], ['Ab3', 'C4', 'Eb4']].forEach((c, i) => c.forEach(n => a.note(n, S('s2').t0 + 0.1 + i * 2 * BAR, 2 * BAR - 0.2, { vel: 0.05, show: false, tone: { partials: [1, 0.35, 0.12], attack: 0.4, release: 0.5 } })));

    // ---------- why1: the same tempo with a normal backbeat (clap on 2 and 4) - it feels fast ----------
    const w10 = S('why1').t0, w11 = S('why1').t1;
    trap(w10, w11, w10 + 0.1, { clap: [4, 12], bass: [[0, 3, 'C2'], [8, 3, 'C2']], hats: () => ALL16.map(s => (s % 2 ? 0 : 1)), decay: 5 });
    a.big('140 BEATS PER MINUTE', a.w('why1', '140') - 0.05, w11, { y: 480, size: 48, ...MONO, color: WHITE, blur: 8 });
    a.big('CLAP ON 2 AND 4 = FAST', a.w('why1', 'fast') - 0.05, w11, { y: 1080, size: 40, ...MONO, color: GREY, blur: 0 });

    // ---------- why2: half time - the clap only on beat 3 ----------
    const w20 = S('why2').t0, w21 = S('why2').t1, tThree = a.w('why2', 'three') - 0.05;
    trap(w20, w21, w20 + 0.1, { clap: [8], hats: () => ALL16.map(s => (s % 2 ? 0 : 1)) });
    a.big('ONLY ON BEAT 3', tThree, w21, { y: 480, size: 50, ...MONO, color: GOLD, blur: 10 });
    a.big('HALF TIME: FEELS LIKE 70', a.w('why2', 'feels') - 0.05, w21, { y: 1080, size: 42, ...MONO, color: GOLD, blur: 8 });

    // ---------- why3: the 808 alone first, then the beat comes back ----------
    const w30 = S('why3').t0, w31 = S('why3').t1, tBass = a.w('why3b', 'bass') - 0.05;
    trap(w30, w31, w30 + 0.1, { mute: (l, t) => l !== '808' && t < tBass, progT0: l => (l === '808' ? w30 : tBass), decay: 1.0 });
    a.big('KICK + LONG PITCHED TAIL', a.w('why3b', 'deep') - 0.05, tBass, { y: 480, size: 40, ...MONO, color: PINK, blur: 8 });
    a.big('THE 808 = THE BASS LINE', tBass, w31, { y: 480, size: 44, ...MONO, color: PINK, blur: 8 });
    a.big('C · C · Eb · G', a.w('why3b', 'pitched') - 0.05, w31, { y: 1080, size: 44, ...MONO, color: PINK, blur: 0 });

    // ---------- why4: three hat lanes - 16ths, 32nds, triplets ----------
    const w40 = S('why4').t0, w41 = S('why4').t1;
    const t32 = a.w('why4b', 'thirty') - 0.05, tTr = a.w('why4b', 'triplets') - 0.05, tRat = a.w('why4b', 'rattle') - 0.05;
    const ROWS = [['16THS', 16, w40 + 0.1, TEAL], ['32NDS', 32, t32, ORANGE], ['TRIPLETS', 24, tTr, BLUE]];
    const rg = ROWS.map(([l, n, t0, c], r) => {
      a.big(l, t0, w41, { x: 66, y: 610 + r * 170, size: l.length > 6 ? 18 : 22, ...MONO, color: c, blur: 0 });
      return a.grid(Array.from({ length: n }, () => ({ label: '', color: c })), t0, w41, { rows: 1, cols: n, cw: 896 / n, chh: 120, x: GX, y: 550 + r * 170 });
    });
    // beats under the lanes
    ['1', '2', '3', '4'].forEach((b, i) => a.big(b, w40 + 0.1, w41, { x: GX - 448 + (i + 0.5) * 224, y: 1060, size: 26, ...MONO, color: GREY, blur: 0 }));
    // clap on beat 3 + the 808 keep the slow groove underneath
    const runRow = (r, n, t0, t1, v = 0.45) => {
      const d = BAR / n;
      for (let t = t0, k = 0; t < t1 - 0.02; t += d, k++) { hat(t, (k % (n / 4) === 0 ? 1.15 : 0.85) * v); rg[r].active.push({ t0: t, t1: t + 0.3, i: k % n }); }
    };
    let tb = w40 + 0.1;
    const groove = (t0, t1) => { for (let t = t0; t < t1 - 0.02; t += BAR) { boom(t, 'C2', 6 * S16, { decay: 1.3 }); boom(t + 10 * S16, 'Eb2', 4 * S16, { decay: 1.3 }); if (t + 8 * S16 < t1) clap(t + 8 * S16, 0.7); } };
    // 16ths until "thirty", then a bar of 32nds, a bar of triplets, then a trap bar mixing them
    const b32 = tb + Math.ceil((t32 - tb) / BAR) * BAR, bTr = b32 + BAR, bMix = bTr + BAR;
    runRow(0, 16, tb, b32);
    runRow(1, 32, b32, bTr, 0.38);
    runRow(2, 24, bTr, bMix, 0.4);
    groove(tb, bMix);
    for (let t = bMix, k = 0; t < w41 - 0.3; t += BAR, k++) {
      for (let s = 0; s < 16; s++) {
        const ts = t + s * S16, roll = k % 2 ? s >= 12 : s >= 8 && s < 12;
        if (ts > w41 - 0.3) break;
        if (roll && k % 2) { hat(ts, 0.4); hat(ts + S16 / 2, 0.3); rg[1].active.push({ t0: ts, t1: ts + 0.3, i: s * 2 }, { t0: ts + S16 / 2, t1: ts + S16 / 2 + 0.3, i: s * 2 + 1 }); }
        else if (roll) { if (s % 2 === 0) [0, 2, 4].forEach(j => { const tt = ts + (j * S16) / 3; hat(tt, 0.38); rg[2].active.push({ t0: tt, t1: tt + 0.3, i: (s / 2) * 3 + j / 2 }); }); }
        else { hat(ts, s % 2 ? 0.32 : 0.48); rg[0].active.push({ t0: ts, t1: ts + 0.3, i: s }); }
      }
      groove(t, Math.min(t + BAR, w41 - 0.3));
    }
    a.big('ROLLS = THE RATTLE', tRat, w41, { y: 480, size: 56, color: ORANGE, blur: 12 });

    // ---------- why5: a sparse, dark C minor line on the circle, over the groove ----------
    const w50 = S('why5').t0, w51 = S('why5').t1;
    a.scale(w50, 'C', a.T.MINOR, { popIn: { t0: w50 + 0.1, step: 0.08 } });
    const BELL = { partials: [1, 0, 0.35, 0, 0.12], attack: 0.004, release: 0.4, decay: 1.6 };
    const MEL = [['G4', 0, 6], ['Eb4', 8, 4], ['D4', 12, 4], ['C4', 16, 10], ['G4', 32, 6], ['Ab4', 40, 4], ['G4', 44, 4], ['Eb4', 48, 10]];
    const m0 = w50 + 0.3;
    MEL.forEach(([n, s, l]) => { if (m0 + s * S16 < w51 - 0.6) a.note(n, m0 + s * S16, l * S16, { vel: 0.3, tone: BELL }); });
    for (let t = m0; t < w51 - 0.4; t += BAR) {
      boom(t, 'C2', 6 * S16); boom(t + 10 * S16, 'Ab2', 4 * S16);
      clap(t + 8 * S16, 0.6);
      for (let s = 0; s < 16; s += 2) if (t + s * S16 < w51 - 0.4) hat(t + s * S16, 0.3);
    }
    a.tag(0, a.w('why5', 'dark') - 0.05, w51, 'C MINOR', { x: 540, y: 452, color: BLUE });
    a.big('ROOM FOR BASS + VOCALS', a.w('why5', 'room') - 0.05, w51, { y: 830, size: 30, ...MONO, color: GREY, blur: 0 });

    // ---------- essence: the full trap grid once more, ending on a long 808 ----------
    const z0 = S('essence').t0, z1 = S('essence').t1;
    trap(z0, z1, z0 + 0.15, { stop: z1 - 1.8 });
    boom(z1 - 1.8, 'C2', 1.5, { decay: 1.2 });
    a.big('FAST HATS', a.w('essence', 'racing') - 0.05, z1, { y: 480, size: 44, ...MONO, color: TEAL, blur: 8 });
    a.big('SLOW, HEAVY BACKBEAT', a.w('essence', 'slow') - 0.05, z1, { y: 1080, size: 40, ...MONO, color: GOLD, blur: 8 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
