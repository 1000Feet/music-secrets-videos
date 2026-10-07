// The Indian raga: more than a scale - notes, ways of moving, phrases, mood and time of day.
// No recordings are quoted: only a C tanpura-style drone, the Yaman scale and ORIGINAL short phrases
// on an additive "sitar-like" tone (with small glides via the tone `bend` option).
// Norwegian Wood is named only; its scene plays a generic drone + original phrase.
const SITAR = [1, 0.85, 0.7, 0.6, 0.55, 0.5, 0.42, 0.36, 0.3, 0.25, 0.2, 0.16, 0.12];
const TANP = [1, 0.7, 0.55, 0.5, 0.42, 0.36, 0.3, 0.26, 0.22, 0.18, 0.15, 0.12];

module.exports = {
  slug: 'raga',
  title: 'The Indian Raga',
  segments: [
    { id: 'hook',     text: 'Seven notes... with rules, a mood, and even a time of day.' },
    { id: 'what',     text: 'This is a raga, from Indian classical music.' },
    { id: 'shankar',  text: 'Ravi Shankar brought the sitar and this music to Western audiences...' },
    { id: 'harrison', text: 'George Harrison played it on Norwegian Wood, and later studied with Shankar.' },
    { id: 'yaman',    text: 'Raga Yaman, a classic evening raga, raises the fourth, like the Lydian mode.' },
    { id: 'why1',     text: 'So why is it more than a scale? A raga sets the notes, and how to move.' },
    { id: 'why2',     text: 'The way up, aroha, and the way down, avaroha, can differ.' },
    { id: 'why3',     text: 'Characteristic phrases and important notes make it recognisable.' },
    { id: 'why4',     text: 'Each raga has a mood, its rasa. Many belong to a time of day, or a season.' },
    { id: 'why5',     text: 'Underneath, the tanpura drone holds home and the fifth.' },
    { id: 'why6',     text: 'Rhythm comes from tala, a repeating cycle. Teentaal has sixteen beats, four groups of four...' },
    { id: 'why6b',    text: 'and everyone meets on beat one: the sam.' },
    { id: 'why7',     text: 'North and South, Hindustani and Carnatic music both use ragas.' },
    { id: 'essence',  text: 'Not just which notes, but how they behave. A raga is a scale with a soul.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MORE THAN A SCALE', title: 'THE RAGA', accent: true, tonic: 0, lead: 0.4, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'INDIAN CLASSICAL MUSIC', title: 'THE RAGA', tonic: 0, tail: 1.0 },
    { id: 'shankar', segs: ['shankar'], label: 'THE SITAR GOES WEST', title: 'Ravi Shankar', sub: 'sitar · Indian classical music', tonic: 0, tail: 1.8 },
    { id: 'harrison', segs: ['harrison'], label: 'YOU HEAR IT IN', title: 'Norwegian Wood', sub: 'The Beatles · 1965 · sitar', tonic: 0, tail: 1.6 },
    { id: 'yaman', segs: ['yaman'], label: 'THE EVENING RAGA', title: 'Raga Yaman', sub: 'in C · C D E F# G A B', tonic: 0, tail: 2.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NOTES + MOVES', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'UP AND DOWN', title: 'AROHA · AVAROHA', tonic: 0, tail: 1.8 },
    { id: 'why3', segs: ['why3'], label: 'ITS FINGERPRINT', title: 'SIGNATURE PHRASES', tonic: 0, tail: 1.3 },
    { id: 'why4', segs: ['why4'], label: 'MOOD AND TIME', title: 'RASA', circle: false, tonic: 0, tail: 0.9 },
    { id: 'why5', segs: ['why5'], label: 'THE TANPURA', title: 'HOME + FIFTH', tonic: 0, tail: 1.0 },
    { id: 'why6', segs: ['why6', 'why6b'], label: 'THE RHYTHM CYCLE', title: 'TALA', circle: false, tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'why7', segs: ['why7'], label: 'NORTH AND SOUTH', title: 'TWO TRADITIONS', circle: false, tonic: 0, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A SCALE WITH A SOUL', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const YAMAN = [0, 2, 4, 6, 7, 9, 11];
    const pcOf = n => n.replace(/-?\d$/, '');

    // tanpura-style drone on C: Pa, Sa, Sa, low Sa, cycling
    const tanpura = (t0, t1, vel = 0.16) => {
      const PL = ['G3', 'C4', 'C4', 'C3'];
      for (let t = t0, i = 0; t < t1 - 0.3; t += 0.6, i++)
        a.note(PL[i % 4], t, 2.2, { vel: i % 4 === 3 ? vel * 1.2 : vel, show: false, tone: { partials: TANP, attack: 0.03, decay: 0.7, release: 0.6 } });
    };
    // a sitar-like pluck; `from` = semitones to glide in from (meend)
    const pluck = (n, t, dur, vel = 0.3, from = 0) => a.note(n, t, dur, { vel, show: true, tone: { partials: SITAR, attack: 0.004, decay: 1.4, release: 0.25, ...(from ? { bend: [[0, from], [0.22, 0]] } : {}) } });
    // phrase: [[note, beats, glideFrom?], ...]; returns end time; optional walker
    const phrase = (list, t0, beat, o = {}) => {
      let t = t0; const pts = [];
      for (const [n, b, g] of list) { if (n) { pluck(n, t, b * beat * 1.1, o.vel ?? 0.3, g || 0); pts.push([t, pcOf(n)]); } t += b * beat; }
      if (o.walk) a.walker(pts, { t1: o.walk, dr: 34, color: o.color || '#ffffff', label: o.label, labelDr: 82 });
      return t;
    };
    // tabla-ish strokes: low drum with a downward glide, high "na"
    const bayan = (t, v = 0.4) => a.note('C3', t, 0.35, { vel: v, show: false, tone: { partials: [1, 0.35, 0.1], attack: 0.003, decay: 6, release: 0.1, bend: [[0, 3], [0.18, 0]] } });
    const dayan = (t, v = 0.3) => a.note('C5', t, 0.2, { vel: v, show: false, tone: { partials: [1, 0.2, 0.5, 0.1], attack: 0.002, decay: 14, release: 0.05 } });

    // ---- hook: Yaman pops in over the drone; the raised fourth glows ----
    const h1 = S('hook').t1;
    a.scale(0.1, 'C', YAMAN, { popIn: { t0: 0.15, step: 0.14 } });
    tanpura(0.1, S('what').t1);
    ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4'].forEach((n, i) => pluck(n, 0.15 + i * 0.14, 0.6, 0.22));
    a.ring(['F#'], 1.0, h1, { color: GOLD });
    a.tag('F#', 1.0, h1, 'RAISED 4TH', { color: GOLD });
    a.tag('C', 0.6, S('what').t1, 'DRONE', { color: TEAL });
    a.ring(['C'], 0.6, S('what').t1, { color: TEAL });
    phrase([['G4', 1, -1], ['F#4', 0.5], ['E4', 0.5], ['D4', 1], ['E4', 1, -2], ['C4', 2]], 2.2, 0.4, { walk: h1, color: GOLD });

    // ---- what: an original phrase floats over the drone ----
    const tw = a.w('what', 'raga');
    a.big('NOTES · RULES · MOOD', tw, S('what').t1, { y: 460, size: 36, ...MONO, color: GOLD, blur: 6 });
    phrase([['B3', 1], ['D4', 1], ['E4', 1.5, -2], ['F#4', 0.5], ['E4', 1], ['D4', 1], ['C4', 2]], tw, 0.36, { walk: S('what').t1 });

    // ---- Shankar: drone + a faster original phrase with glides ----
    const k0 = S('shankar').t0 + 0.1, k1 = S('shankar').t1;
    tanpura(k0, k1);
    a.big('SITAR', a.w('shankar', 'sitar'), k1, { y: 460, size: 48, ...MONO, color: GOLD, blur: 10 });
    const ks = a.w('shankar', 'Western');
    phrase([['C4', 0.5], ['D4', 0.5], ['E4', 0.5], ['F#4', 0.5], ['G4', 1.5, -1], ['A4', 0.5], ['G4', 0.5], ['F#4', 0.5], ['E4', 1, -2], ['D4', 0.5], ['C4', 1.5]], ks - 0.6, 0.27, { walk: k1, color: GOLD });

    // ---- Norwegian Wood: named only - generic drone + an original sitar figure ----
    const n0 = S('harrison').t0 + 0.1, n1 = S('harrison').t1;
    tanpura(n0, n1);
    a.big('SITAR · 1965', a.w('harrison', 'Norwegian'), n1, { y: 470, size: 40, ...MONO, color: GOLD, blur: 6 });
    const nr = a.w('harrison', 'studied') - 0.3;
    phrase([['E4', 0.5], ['G4', 1, -1], ['A4', 0.5], ['B4', 1], ['A4', 0.5], ['G4', 0.5], ['E4', 2, -2]], nr, 0.3, { walk: n1, color: PINK });
    a.ring(['C'], n0, n1, { color: TEAL });

    // ---- Yaman: the scale with F#, like Lydian ----
    const y0 = S('yaman').t0 + 0.1, y1 = S('yaman').t1;
    a.scale(y0, 'C', YAMAN);
    tanpura(y0, y1);
    const tEv = a.w('yaman', 'evening'), tRa = a.w('yaman', 'raises'), tLy = a.w('yaman', 'Lydian');
    a.big('EVENING', tEv, tRa, { y: 470, size: 48, ...MONO, color: LILAC, blur: 10 });
    a.ring(['F#'], tRa, y1, { color: GOLD });
    a.arc('F', 'F#', tRa, y1, { steps: 1, color: GOLD, dr: 30 });
    a.tag('F#', tRa, tLy, 'RAISED 4TH', { color: GOLD });
    a.tag('F#', tLy, y1, 'LIKE LYDIAN', { color: GOLD });
    a.note('F4', tRa, 0.4, { vel: 0.18, show: false, tone: { partials: SITAR, attack: 0.004, decay: 1.4 } });
    pluck('F#4', tRa + 0.35, 0.8, 0.32);
    const yr = a.end('yaman') + 0.05;
    phrase([['C4', 1], ['D4', 1], ['E4', 1], ['F#4', 1], ['G4', 1], ['A4', 1], ['B4', 1], ['C5', 2]], yr, 0.28, { walk: y1, color: GOLD });

    // ---- why1: notes + moves ----
    const w0 = S('why1').t0 + 0.1, w1 = S('why1').t1;
    tanpura(w0, S('why3').t1);
    const tNo = a.w('why1', 'notes'), tMo = a.w('why1', 'move');
    a.big('WHICH NOTES', tNo, tMo, { y: 460, size: 40, ...MONO, color: '#ffffff', blur: 0 });
    a.big('+ HOW TO MOVE', tMo, w1, { y: 460, size: 40, ...MONO, color: GOLD, blur: 6 });
    YAMAN.forEach((d, i) => pluck(['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4'][i], tNo + i * 0.12, 0.5, 0.18));
    phrase([['E4', 1], ['F#4', 0.5], ['G4', 0.5], ['F#4', 1, -1], ['E4', 1], ['D4', 1, -2], ['C4', 1.5]], tMo, 0.3, { walk: w1, color: GOLD });

    // ---- why2: an example of a different way up and way down ----
    const u0 = S('why2').t0 + 0.1, u1 = S('why2').t1, tUp = a.w('why2', 'aroha') - 0.1, tDn = a.w('why2', 'avaroha') - 0.1;
    const UP = ['B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'C5'], DOWN = ['C5', 'B4', 'A4', 'G4', 'F#4', 'E4', 'D4', 'C4'];
    const us = (tDn - tUp - 0.3) / UP.length;
    UP.forEach((n, i) => pluck(n, tUp + i * us, us * 1.4, 0.28));
    a.walker(UP.map((n, i) => [tUp + i * us, pcOf(n)]), { t1: tDn, dr: 34, color: TEAL, label: 'UP', labelDr: 82 });
    const ds = Math.min(0.42, (u1 - tDn - 0.6) / DOWN.length);
    DOWN.forEach((n, i) => pluck(n, tDn + i * ds, ds * 1.4, 0.28));
    a.walker(DOWN.map((n, i) => [tDn + i * ds, pcOf(n)]), { t1: u1, dr: 34, color: PINK, label: 'DOWN', labelDr: 82 });
    a.big('AROHA · UP', tUp, tDn, { y: 460, size: 40, ...MONO, color: TEAL, blur: 6 });
    a.big('AVAROHA · DOWN', tDn, u1, { y: 460, size: 40, ...MONO, color: PINK, blur: 6 });
    a.tag(0, tUp, u1, 'EXAMPLE', { x: 540, y: 1010, color: GREY });
    void u0;

    // ---- why3: one original signature phrase, heard twice ----
    const p0 = S('why3').t0 + 0.1, p1 = S('why3').t1;
    const SIG = [['B3', 0.5], ['D4', 0.5], ['E4', 1.5, -2], ['F#4', 0.5], ['E4', 1], ['C4', 1.5]];
    const tCh = a.w('why3', 'characteristic') - 0.1;
    const pe = phrase(SIG, tCh, 0.3, { walk: a.w('why3', 'important') });
    phrase(SIG, Math.max(pe + 0.3, a.end('why3') - 0.4), 0.3, { walk: p1, color: GOLD });
    a.big('A FAMILIAR PHRASE', tCh, a.w('why3', 'important'), { y: 460, size: 38, ...MONO, color: '#ffffff', blur: 0 });
    a.big('RECOGNISABLE', a.w('why3', 'recognisable'), p1, { y: 460, size: 44, ...MONO, color: GOLD, blur: 8 });
    a.ring(['E'], a.w('why3', 'important'), a.w('why3', 'recognisable'), { color: GOLD });
    a.poly(['B', 'D', 'E', 'F#', 'E', 'C'], tCh + 0.4, p1, { closed: false, color: GOLD, alpha: 0.5 });
    void p0;

    // ---- why4: mood, time of day, season ----
    const m0 = S('why4').t0 + 0.1, m1 = S('why4').t1;
    tanpura(m0, m1);
    const g4 = a.grid([{ label: 'MOOD', sub: 'RASA', size: 54, color: PINK }, { label: 'TIME OF DAY', sub: 'YAMAN · EVENING', size: 44, color: LILAC }, { label: 'SEASON', size: 54, color: GREEN }],
      m0, m1, { rows: 3, cols: 1, cw: 720, chh: 190, y: 480, revealStep: 0.25 });
    const tMood = a.w('why4', 'mood'), tTime = a.w('why4', 'time'), tSea = a.w('why4', 'season');
    g4.active.push({ t0: tMood - 0.05, t1: tTime - 0.05, i: 0 }, { t0: tTime - 0.05, t1: tSea - 0.05, i: 1 }, { t0: tSea - 0.05, t1: m1, i: 2 });
    phrase([['G4', 2, -1], ['F#4', 1], ['E4', 1], ['D4', 1], ['E4', 2, -2], ['C4', 3]], m0 + 0.4, 0.42, { vel: 0.22 });

    // ---- why5: tanpura - home and fifth ----
    const d0 = S('why5').t0 + 0.1, d1 = S('why5').t1;
    a.scale(d0, 'C', [0, 7]);
    tanpura(d0, d1, 0.22);
    const tHome = a.w('why5', 'home'), tFif = a.w('why5', 'fifth');
    a.ring(['C'], tHome, d1, { color: GOLD });
    a.tag('C', tHome, d1, 'HOME · SA', { color: GOLD });
    a.ring(['G'], tFif, d1, { color: TEAL });
    a.tag('G', tFif, d1, 'FIFTH · PA', { color: TEAL });
    a.line('C', 'G', tFif, d1, { color: TEAL, dash: true });
    a.big('THE DRONE', a.w('why5', 'drone'), d1, { y: 460, size: 44, ...MONO, color: '#ffffff', blur: 6 });
    a.note('C3', d0, d1 - d0, { vel: 0, show: false }); a.note('G3', d0, d1 - d0, { vel: 0, show: false });

    // ---- why6: teentaal - 16 beats, 4 + 4 + 4 + 4, meet on sam ----
    const c0 = S('why6').t0, c1 = S('why6').t1;
    const SAMC = [...Array(16)].map((_, i) => ({ label: String(i + 1), size: i % 4 === 0 ? 58 : 46, color: [GOLD, TEAL, PINK, BLUE][Math.floor(i / 4)], sub: i === 0 ? 'SAM' : undefined, subSize: 22 }));
    const g6 = a.grid(SAMC, c0 + 0.1, c1, { rows: 4, cols: 4, cw: 200, chh: 140, y: 470, revealStep: 0.04, caption: '4 + 4 + 4 + 4' });
    const tSix = a.w('why6', 'sixteen') - 0.1, tSam = a.w('why6b', 'sam') - 0.05;
    // one full cycle from "sixteen" so that beat one comes back exactly on "sam"
    const B = Math.max(0.2, Math.min(0.4, (tSam - tSix) / 16)), startC = tSam - 16 * B;
    for (let i = 0; startC + i * B < c1 - 0.2; i++) {
      const t = startC + i * B, j = i % 16;
      if (t < c0 + 0.1) continue;
      g6.active.push({ t0: t, t1: t + B, i: j });
      if (j === 0) { bayan(t, 0.55); dayan(t, 0.35); a.perc('kick', t, 0.3); }
      else if (j % 4 === 0) { bayan(t, 0.35); dayan(t, 0.25); }
      else dayan(t, j % 2 ? 0.16 : 0.22);
    }
    tanpura(c0 + 0.1, c1, 0.12);
    a.big('MEET ON ONE: SAM', tSam - 0.1, c1, { y: 1135, size: 44, ...MONO, color: GOLD, blur: 10 });
    a.big('16 BEATS · TEENTAAL', a.w('why6', 'Teentaal'), tSam - 0.1, { y: 1135, size: 38, ...MONO, color: '#ffffff', blur: 0 });

    // ---- why7: Hindustani and Carnatic ----
    const r0 = S('why7').t0 + 0.1, r1 = S('why7').t1;
    tanpura(r0, r1);
    const g7 = a.grid([{ label: 'HINDUSTANI', sub: 'NORTH INDIA', size: 50, color: GOLD }, { label: 'CARNATIC', sub: 'SOUTH INDIA', size: 50, color: TEAL }],
      r0, r1, { rows: 2, cols: 1, cw: 720, chh: 210, y: 500, revealStep: 0.3 });
    g7.active.push({ t0: a.w('why7', 'Hindustani') - 0.05, t1: a.w('why7', 'Carnatic') - 0.05, i: 0 }, { t0: a.w('why7', 'Carnatic') - 0.05, t1: a.w('why7', 'both'), i: 1 },
      { t0: a.w('why7', 'both'), t1: r1, i: 0 }, { t0: a.w('why7', 'both'), t1: r1, i: 1 });
    a.big('BOTH USE RAGAS', a.w('why7', 'both'), r1, { y: 1010, size: 46, ...MONO, color: '#ffffff', blur: 8 });
    phrase([['C4', 1], ['E4', 1], ['F#4', 1, -1], ['G4', 1], ['B4', 1], ['C5', 2]], r0 + 0.5, 0.38, { vel: 0.22 });

    // ---- essence: Yaman, a last phrase, landing on home ----
    const e0 = S('essence').t0 + 0.1, e1 = S('essence').t1;
    a.scale(e0, 'C', YAMAN);
    tanpura(e0, e1 - 0.3);
    a.ring(['C'], e0, e1, { color: TEAL });
    const ee = phrase([['B3', 0.5], ['D4', 0.5], ['E4', 1, -2], ['F#4', 1], ['G4', 1.5, -1], ['F#4', 0.5], ['E4', 1], ['D4', 1], ['C4', 2.5]], e0 + 0.3, 0.36, { walk: a.at('cta'), color: GOLD });
    a.tag('C', ee - 0.9, e1, 'HOME', { color: TEAL });
    a.big('HOW THE NOTES BEHAVE', a.w('essence', 'behave') - 0.2, e1, { y: 460, size: 36, ...MONO, color: GOLD, blur: 6 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
