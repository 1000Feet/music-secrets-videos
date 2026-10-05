// Beats: two notes very close in pitch pulse "wah-wah-wah"; the pulse rate equals the difference in Hz.
// No copyrighted music: honky-tonk and musette examples are original short motifs. Pure/sustained tones use
// the engine note option `tone`; the "scope" is a row of grid bars tracing the loudness of the two waves.
const hz = f => 69 + 12 * Math.log2(f / 440);
const STRING = [1, 0.45, 0.25, 0.12];
const REED = [1, 0.7, 0.55, 0.45, 0.35, 0.3, 0.22, 0.16];

module.exports = {
  slug: 'beats-tuning',
  title: 'Why Out-of-Tune Notes Wobble',
  segments: [
    { id: 'hook',     text: 'Play two notes that are almost, but not quite, the same... and the sound starts to wobble.' },
    { id: 'what',     text: 'That pulsing is called beats.' },
    { id: 'tune',     text: 'Musicians tune by ear with it: turn the peg until the wobble slows down... and disappears.' },
    { id: 'honky',    text: 'Honky tonk pianos detune the strings of each note on purpose, for that jangly sound.' },
    { id: 'musette',  text: 'And the French musette accordion tunes its reeds slightly apart, for a shimmering tone.' },
    { id: 'why1',     text: 'So why does it work? Play 440 and 442 hertz together.' },
    { id: 'why2',     text: 'The waves drift in and out of step, so the volume pulses twice per second.' },
    { id: 'why3',     text: '442 minus 440: two beats.' },
    { id: 'why4',     text: 'The closer the notes, the slower the beats. At exactly the same frequency, they vanish.' },
    { id: 'tuners',   text: 'Piano tuners listen to and count beats to set every interval.' },
    { id: 'strings',  text: 'Most piano notes have two or three strings.' },
    { id: 'strings2', text: 'Tiny differences between them make the sound warmer: a natural chorus.' },
    { id: 'lush',     text: 'A little detuning sounds lush. A lot sounds sour.' },
    { id: 'essence',  text: 'The wobble is two waves arguing. Tune them, and they agree.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook', 'what'], label: 'ALMOST THE SAME NOTE', title: 'BEATS', accent: true, circle: false, tonic: 9, lead: 0.5, gap: 0.4, tail: 1.2 },
    { id: 'tune', segs: ['tune'], label: 'YOU HEAR IT', title: 'Tuning by Ear', sub: 'guitar · violin · listen for the wobble', circle: false, tonic: 9, tail: 2.0 },
    { id: 'honky', segs: ['honky'], label: 'YOU HEAR IT IN', title: 'Honky-Tonk Piano', sub: 'strings detuned on purpose', tonic: 0, tail: 2.4 },
    { id: 'musette', segs: ['musette'], label: 'YOU HEAR IT IN', title: 'Musette Accordion', sub: 'France · reeds tuned apart', tonic: 9, tail: 2.4 },
    { id: 'why1', segs: ['why1', 'why2', 'why3'], label: 'WHY IT WORKS', title: '440 + 442 Hz', circle: false, tonic: 9, gap: 0.35, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'CLOSER = SLOWER', circle: false, tonic: 9, tail: 1.4 },
    { id: 'tuners', segs: ['tuners'], label: 'PIANO TUNERS', title: 'COUNT THE BEATS', tonic: 0, tail: 1.6 },
    { id: 'strings', segs: ['strings', 'strings2'], label: 'INSIDE THE PIANO', title: 'TWO OR THREE STRINGS', circle: false, tonic: 9, gap: 0.3, tail: 1.4 },
    { id: 'lush', segs: ['lush'], label: 'A LITTLE OR A LOT', title: 'LUSH OR SOUR', tonic: 0, tail: 1.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'TUNE THEM', accent: true, circle: false, tonic: 9, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GREY = '#8a8a92', RED = '#ff5d6c', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const keys = (notes, t0, t1) => notes.forEach(n => a.note(n, t0, t1 - t0, { vel: 0, show: false }));
    const tone = (f, t, dur, vel = 0.25, P = [1], o = {}) => a.note(hz(f), t, dur, { vel, show: false, tone: { partials: P, attack: o.attack ?? 0.05, release: o.release ?? 0.25, decay: o.decay } });

    // the scope: bars tracing the loudness of two waves df Hz apart (both started at ts), drawn live,
    // one window of W seconds after another
    function scope(df, ts, t0, t1, o = {}) {
      const W = o.W ?? 2, NB = o.n ?? 34, cw = o.cw ?? 26, y = o.y ?? 990, hm = o.h ?? 230, col = o.color ?? TEAL;
      for (let w0 = t0; w0 < t1 - 0.05; w0 += W) {
        const wEnd = Math.min(t1 + (o.hold ?? 0), w0 + W + 0.3);
        for (let i = 0; i < NB; i++) {
          const tb = w0 + (i / NB) * W;
          if (tb >= t1) break;
          const env = Math.abs(Math.cos(Math.PI * df * (tb - ts)));
          const hh = Math.round(hm * Math.max(0.05, env)) + 18;
          const g = a.grid([{ label: '', color: col }], o.static ? t0 : tb, wEnd, { rows: 1, cols: 1, cw, chh: hh, y: y - hh / 2, x: 540 + (i - (NB - 1) / 2) * cw });
          g.active.push({ t0: o.static ? t0 : tb, t1: wEnd, i: 0 });
        }
        if (o.static) break;
      }
    }
    // a pair of tones df apart, sounding together from ts
    const pair = (f, df, ts, dur, vel = 0.22, P = [1]) => { tone(f, ts, dur, vel, P); tone(f + df, ts, dur, vel, P); };
    const TWO_PI = 2 * Math.PI;

    // ---- hook: 220 and 221.5 Hz - the figure breathes, the loudness pulses (cover) ----
    const h1 = S('hook').t1, tBeats = a.w('what', 'beats');
    pair(220, 1.5, 0.1, h1 - 0.4, 0.26);
    a.lissajous(1, 1, 0.05, h1, { drawIn: 0.6, drift: TWO_PI * 1.5, r: 150, y: 640, color: TEAL, labelA: '221.5 Hz', labelB: '220 Hz' });
    scope(1.5, 0.1, 0.05, 2.05, { static: true, W: 2, y: 1000, h: 170 });
    scope(1.5, 0.1, 2.05, h1, { y: 1000, h: 170 });
    a.big('wah · wah · wah', a.w('hook', 'wobble'), tBeats, { y: 870, size: 40, ...MONO, color: GREY, blur: 0 });
    a.big('BEATS', tBeats, h1, { y: 870, size: 56, color: GOLD, blur: 16 });
    keys(['A3'], 0.1, h1);

    // ---- tune: turn the peg - the beats slow down, then vanish ----
    const u0 = S('tune').t0, u1 = S('tune').t1, tSlow = a.w('tune', 'slows') - 0.1, tDis = a.w('tune', 'disappears') - 0.1;
    const ul = (tDis - u0 - 0.1) / 4;
    const steps = [4, 3, 2, 1].map((df, i) => [u0 + 0.1 + i * ul, df]).concat([[tDis, 0]]);
    void tSlow;
    steps.forEach(([t, df], i) => {
      const t1 = i < steps.length - 1 ? steps[i + 1][0] : u1;
      pair(220, df, t, t1 - t + 0.05, 0.22, STRING);
      const hold = i < steps.length - 1 ? 0.4 : 0;
      scope(df, t, t, t1, { W: Math.max(0.8, Math.min(2, t1 - t)), y: 1000, h: 170, color: df ? TEAL : GOLD, hold });
      a.big(df ? df + (df === 1 ? ' BEAT' : ' BEATS') + ' PER SECOND' : 'IN TUNE', t, t1, { y: 620, size: df ? 48 : 72, ...MONO, color: df ? '#ffffff' : GOLD, blur: df ? 6 : 18 });
      a.big(df ? `${220 + df} Hz vs 220 Hz` : '220 Hz = 220 Hz', t, t1, { y: 720, size: 34, ...MONO, color: GREY, blur: 0 });
    });
    keys(['A3'], u0, u1);

    // ---- honky-tonk: an original stride motif, every note doubled a little sharp ----
    const k0 = S('honky').t0, k1 = S('honky').t1, BEAT = 0.3;
    const HT = [['C', ['E4', 'G4', 'C5'], 'C3'], ['F', ['F4', 'A4', 'C5'], 'F2'], ['G7', ['F4', 'G4', 'B4'], 'G2'], ['C', ['E4', 'G4', 'C5'], 'C3']];
    const RH = [['E5', 'G5', 'E5', 'C5'], ['F5', 'A5', 'F5', 'C5'], ['D5', 'F5', 'D5', 'B4'], ['C5', 'E5', 'G5', 'C5']];
    const detuned = (n, t, d, v) => { a.note(n, t, d, { vel: v }); a.note(a.T.midi(n) + 0.13, t, d, { vel: v * 0.9, show: false }); };
    const bars = Math.max(1, Math.floor((k1 - k0 - 0.2) / (8 * BEAT)));
    for (let b = 0; b < bars + 1; b++) {
      const t = k0 + 0.15 + b * 8 * BEAT, [nm, ch, bs] = HT[b % 4];
      if (t + 8 * BEAT > k1 + 0.2) break;
      a.ch(nm, t, t + 8 * BEAT, { notes: ch, bass: false, vel: 0.0001, hideName: false });
      for (let q = 0; q < 4; q++) {
        const tq = t + q * 2 * BEAT;
        if (q % 2 === 0) detuned(q ? a.T.midi(bs) + 7 : bs, tq, BEAT * 0.9, 0.3);
        else ch.forEach(n => detuned(n, tq, BEAT * 0.9, 0.16));
        detuned(RH[b % 4][q], tq + BEAT, BEAT * 0.9, 0.24);
      }
    }
    a.tag(0, a.w('honky', 'detune'), k1, 'EVERY NOTE DOUBLED, DETUNED', { x: 540, y: 462, color: GOLD });

    // ---- musette: an original waltz - three reeds per note, slightly apart ----
    const m0 = S('musette').t0, m1 = S('musette').t1, MB = 0.36;
    const reed = (n, t, d, v) => [0, 0.14, -0.1].forEach(dt => a.note(a.T.midi(n) + dt, t, d, { vel: v * 0.6, show: false, tone: { partials: REED, attack: 0.03, release: 0.08 } }));
    const WALTZ = [['Am', 'A2', ['C4', 'E4', 'A4'], ['E5', 'C5', 'A4']], ['Dm', 'D3', ['D4', 'F4', 'A4'], ['F5', 'D5', 'A4']], ['E7', 'E2', ['D4', 'E4', 'G#4'], ['G#4', 'B4', 'D5']], ['Am', 'A2', ['C4', 'E4', 'A4'], ['C5', 'A4', 'E4']]];
    for (let b = 0, t = m0 + 0.15; t + 3 * MB <= m1 - 0.1; b++, t += 3 * MB) {
      const [nm, bs, ch, mel] = WALTZ[b % 4];
      a.ch(nm, t, t + 3 * MB, { notes: ch, bass: false, mute: true, hideName: false });
      reed(bs, t, MB * 0.8, 0.22);
      ch.forEach(n => { reed(n, t + MB, MB * 0.5, 0.08); reed(n, t + 2 * MB, MB * 0.5, 0.08); });
      mel.forEach((n, i) => { reed(n, t + i * MB, MB * 0.95, 0.2); a.note(n, t + i * MB, MB * 0.9, { vel: 0 }); });
    }
    a.tag(0, a.w('musette', 'reeds'), m1, 'REEDS TUNED APART', { x: 540, y: 462, color: LILAC });

    // ---- why1-3: 440 and 442 Hz ----
    const w0 = S('why1').t0, w1 = S('why1').t1;
    const t440 = a.w('why1', '440') - 0.05, t442 = a.w('why1', '442') - 0.05, tTog = a.w('why1', 'together') - 0.05;
    const tDrift = a.w('why2', 'drift') - 0.05, tTw = a.w('why2', 'twice') - 0.05, tMin = a.at('why3') - 0.05;
    tone(440, t440, t442 - t440 - 0.1, 0.24);
    tone(442, t442, tTog - t442 - 0.1, 0.24);
    a.big('440', t440, tTog, { x: 330, y: 700, size: 90, ...MONO, color: TEAL, blur: 14 });
    a.big('442', t442, tTog, { x: 750, y: 700, size: 90, ...MONO, color: PINK, blur: 14 });
    pair(440, 2, tTog, w1 - tTog - 0.2, 0.24);
    a.lissajous(1, 1, tTog, w1, { drawIn: 0.6, drift: TWO_PI * 2, r: 140, y: 630, color: GOLD, labelA: '442', labelB: '440', colorA: PINK, colorB: TEAL });
    scope(2, tTog, tTog, w1, { y: 1000, h: 170 });
    a.big('IN STEP · OUT OF STEP', tDrift, tTw, { y: 860, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    a.big('2 PULSES PER SECOND', tTw, tMin, { y: 860, size: 40, ...MONO, color: GOLD, blur: 8 });
    a.big('442 − 440 = 2', tMin, w1, { y: 860, size: 54, ...MONO, color: GOLD, blur: 12 });
    // beat counter on each loud moment
    for (let t = tTw, k = 0; t < w1 - 0.3; t += 0.5, k++) {
      const tl = tTog + Math.ceil((t - tTog) / 0.5) * 0.5;
      if (tl >= w1 - 0.3) break;
      a.big(String(k % 2 + 1), tl, tl + 0.45, { x: 880, y: 640, size: 80, ...MONO, color: GOLD, blur: 12 });
    }
    keys(['A4'], t440, w1);

    // ---- why4: closer = slower, same = none ----
    const v0 = S('why4').t0, v1 = S('why4').t1, tSlw = a.w('why4', 'slower') - 0.05, tExa = a.w('why4', 'exactly') - 0.05;
    const plan = [[v0 + 0.1, 4], [v0 + 0.1 + (tSlw - v0) / 2, 2], [tSlw, 1], [tSlw + (tExa - tSlw) / 2, 0.5], [tExa, 0]];
    plan.forEach(([t, df], i) => {
      const t1 = i < plan.length - 1 ? plan[i + 1][0] : v1;
      pair(440, df, t, t1 - t + 0.05, 0.22);
      const hold = i < plan.length - 1 ? 0.4 : 0;
      scope(df, t, t, t1, { W: Math.max(0.8, Math.min(2, t1 - t)), y: 1000, h: 170, color: df ? TEAL : GOLD, hold });
      a.big(df ? `${df} Hz APART` : 'SAME FREQUENCY', t, t1, { y: 620, size: 54, ...MONO, color: df ? '#ffffff' : GOLD, blur: df ? 6 : 16 });
      a.big(df ? `${df} BEAT${df === 1 ? '' : 'S'} PER SECOND` : 'NO BEATS', t, t1, { y: 720, size: 36, ...MONO, color: df ? TEAL : GOLD, blur: 0 });
    });
    keys(['A4'], v0, v1);

    // ---- tuners: C and G - the tuner counts the slow beats of the fifth ----
    const n0 = S('tuners').t0, n1 = S('tuners').t1, tCnt = a.w('tuners', 'count') - 0.05;
    a.scale(n0, 'C', [0, 7]);
    a.ch('C5', n0 + 0.1, n1, { notes: ['C4', 'G4'], bass: false, vel: 0.0001, hideName: true });
    const CG = [1, 0.5, 0.38, 0.2];
    tone(261.63, n0 + 0.15, n1 - n0 - 0.4, 0.22, CG); tone(392.0, n0 + 0.15, n1 - n0 - 0.4, 0.22, CG);
    a.line('C', 'G', n0 + 0.2, n1, { color: GOLD, label: 'A FIFTH', ly: 0 });
    // equal-tempered fifth: 3 x 261.63 vs 2 x 392.00 -> about 0.9 beats per second
    const bp = 1 / Math.abs(3 * 261.63 - 2 * 392.0);
    for (let k = 0, t = n0 + 0.15 + bp; t < n1 - 0.4; k++, t += bp) if (t >= tCnt) a.big(String(k + 1), t, Math.min(n1, t + bp * 0.9), { x: 690, y: 840, size: 120, color: GOLD, blur: 20 });
    a.tag(0, n0 + 0.3, n1, 'LISTEN · COUNT · ADJUST', { x: 540, y: 462, color: '#ffffff' });

    // ---- strings: one note, three strings slightly apart ----
    const s0 = S('strings').t0, s1 = S('strings').t1, tTiny = a.w('strings2', 'Tiny') - 0.05, tCh = a.w('strings2', 'chorus') - 0.05;
    const gs = a.grid([{ label: 'STRING 1', color: TEAL, size: 34 }, { label: 'STRING 2', color: TEAL, size: 34 }, { label: 'STRING 3', color: TEAL, size: 34 }],
      s0 + 0.1, s1, { rows: 3, cols: 1, cw: 700, chh: 120, y: 560, revealStep: 0.25 });
    const tTwo = a.w('strings', 'two') - 0.05;
    [0, 1, 2].forEach(i => gs.active.push({ t0: tTwo + i * 0.3, t1: tTiny, i }));
    // one string, then three, then the "chorus"
    a.note('A4', s0 + 0.2, 1.4, { vel: 0.4 });
    [0, 0.03, -0.025].forEach((d, i) => a.note(69 + d, tTwo + i * 0.3, 1.8, { vel: 0.3, show: false }));
    [0, 0.04, -0.035].forEach(d => a.note(69 + d, tTiny, 2.4, { vel: 0.3, show: false }));
    [0, 0.04, -0.035].forEach(d => ['C#5', 'E5'].forEach(n => a.note(a.T.midi(n) + d, tCh, s1 - tCh, { vel: 0.18, show: false })));
    [0, 1, 2].forEach(i => gs.active.push({ t0: tTiny, t1: s1, i }));
    a.big('TINY DIFFERENCES', tTiny, tCh, { y: 1010, size: 46, ...MONO, color: TEAL, blur: 8 });
    a.big('A NATURAL CHORUS', tCh, s1, { y: 1010, size: 50, ...MONO, color: GOLD, blur: 12 });
    keys(['A4'], s0 + 0.2, tCh); keys(['A4', 'C#5', 'E5'], tCh, s1);

    // ---- lush or sour: the same C major chord, a little vs a lot detuned ----
    const l0 = S('lush').t0, l1 = S('lush').t1, tLot = a.w('lush', 'lot') - 0.05;
    const chord = (t, d, dt, cents) => ['C3', 'G3', 'C4', 'E4', 'G4'].forEach(n => [0, cents, -cents].forEach(c => a.note(a.T.midi(n) + c, t, d, { vel: 0.13, show: false })));
    a.ch('C', l0 + 0.1, tLot, { notes: ['C4', 'E4', 'G4'], bass: false, vel: 0.0001 });
    a.ch('C', tLot, l1, { notes: ['C4', 'E4', 'G4'], bass: false, vel: 0.0001, snap: true });
    chord(l0 + 0.15, tLot - l0 - 0.2, 0, 0.06);
    chord(tLot, l1 - tLot - 0.2, 0, 0.45);
    a.tag(0, a.w('lush', 'lush') - 0.05, tLot, 'A LITTLE: LUSH', { x: 540, y: 462, color: TEAL });
    a.tag(0, tLot, l1, 'A LOT: SOUR', { x: 540, y: 462, color: RED });
    keys(['C3', 'G3', 'C4', 'E4', 'G4'], l0 + 0.15, l1);

    // ---- essence: the figure slows to a still line; then an A major chord, in tune ----
    const e0 = S('essence').t0, e1 = S('essence').t1, tAg = a.w('essence', 'agree') - 0.05, tTn = a.w('essence', 'Tune') - 0.05;
    pair(220, 1.5, e0 + 0.1, tTn - e0 - 0.05, 0.24);
    a.lissajous(1, 1, e0 + 0.05, tAg + 0.3, { drawIn: 0.5, drift: TWO_PI * 1.5, r: 150, y: 640, color: PINK });
    a.lissajous(1, 1, tAg - 0.1, e1, { drawIn: 0.5, drift: 0, r: 150, y: 640, color: GOLD });
    scope(1.5, e0 + 0.1, e0 + 0.1, tTn, { y: 1000, h: 170, color: PINK });
    pair(220, 0.6, tTn, tAg - tTn, 0.24);
    scope(0.6, tTn, tTn, tAg, { W: Math.max(0.8, tAg - tTn), y: 1000, h: 170 });
    pair(220, 0, tAg, a.at('cta') - tAg, 0.24);
    scope(0, tAg, tAg, e1, { y: 1000, h: 170, color: GOLD });
    a.big('ARGUING', a.w('essence', 'arguing') - 0.05, tTn, { y: 870, size: 50, ...MONO, color: PINK, blur: 10 });
    a.big('AGREEING', tAg, e1, { y: 870, size: 50, ...MONO, color: GOLD, blur: 12 });
    const tc = a.at('cta');
    ['A2', 'E3', 'A3', 'C#4', 'E4'].forEach((n, i) => a.note(n, tc + i * 0.05, e1 - tc - 0.5, { vel: 0.22, show: false, tone: { partials: STRING, attack: 0.2, release: 0.4 } }));
    keys(['A3'], e0 + 0.1, tc); keys(['A2', 'E3', 'A3', 'C#4', 'E4'], tc, e1);
    a.cta(tc + 0.6, 'Leave a song in the comments');
  },
};
