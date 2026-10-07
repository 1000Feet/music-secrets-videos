// Mozart's Requiem: the mass he left unfinished, and the Lacrimosa he barely started.
// Brief/copyright: Mozart's melody is NOT reconstructed. We play D minor chords rocking in 12/8
// and our own rising chromatic line (D up to A, one half step per beat, harmonized generically).
const E = 0.25, BEAT = 3 * E, BAR = 4 * BEAT; // 12/8: four beats per bar, each divided in three
// our own rising chromatic line, one chord per beat: [name, voicing (top = line note), bass]
const RISE = [
  ['Dm', ['F3', 'A3', 'D4'], 'D2'], ['Eb', ['G3', 'Bb3', 'Eb4'], 'Eb2'], ['A7', ['G3', 'C#4', 'E4'], 'A2'], ['Dm', ['A3', 'D4', 'F4'], 'D2'],
  ['D7', ['A3', 'C4', 'F#4'], 'D2'], ['Gm', ['Bb3', 'D4', 'G4'], 'G2'], ['E7', ['B3', 'D4', 'G#4'], 'E2'], ['A', ['C#4', 'E4', 'A4'], 'A2'],
];
const LINE = ['D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4'];
const V = {
  Dm: [['F3', 'A3', 'D4'], 'D2'], Gm: [['G3', 'Bb3', 'D4'], 'G2'], A7: [['G3', 'C#4', 'E4'], 'A2'], Bb: [['F3', 'Bb3', 'D4'], 'Bb2'],
};

module.exports = {
  slug: 'mozart-requiem',
  title: "Mozart's Requiem",
  segments: [
    { id: 'hook',    text: "Eight bars. That's all Mozart wrote of this music... before he died." },
    { id: 'what',    text: "This is Mozart's Requiem in D minor, a mass for the dead." },
    { id: 'what2',   text: 'He died in December 1791, leaving it unfinished.' },
    { id: 'comm',    text: 'It was commissioned anonymously by Count Franz von Walsegg...' },
    { id: 'comm2',   text: 'who wanted to present it as his own work.' },
    { id: 'finish',  text: "His pupil, Franz Xaver Süssmayr, completed it." },
    { id: 'amadeus', text: 'The 1984 film Amadeus spread a legend that Salieri poisoned him.' },
    { id: 'amadeus2', text: "There's no evidence for it." },
    { id: 'lacri',   text: 'In the Lacrimosa, Mozart wrote only the first eight bars.' },
    { id: 'why1',    text: 'So why is it so haunting? First, D minor.' },
    { id: 'why1b',   text: 'A dark key Mozart used for some of his most dramatic music.' },
    { id: 'why2',    text: 'Then the pulse: twelve eight. Four slow beats, each divided in three.' },
    { id: 'why2b',   text: 'A rocking, sighing motion.' },
    { id: 'why2c',   text: 'Lacrimosa dies illa: that day of tears.' },
    { id: 'why3',    text: 'Then a line climbs, half step after half step, building tension...' },
    { id: 'why3b',   text: 'on the words about rising from the ashes.' },
    { id: 'essence', text: "Eight bars, a rising line of half steps... and the music stops where Mozart's life did." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'W. A. MOZART · 1791', title: "MOZART'S REQUIEM", accent: true, tonic: 2, min: 6.0 },
    { id: 'what', segs: ['what', 'what2'], label: 'A MASS FOR THE DEAD', title: 'REQUIEM IN D MINOR', sub: 'W. A. Mozart · K. 626 · 1791', tonic: 2, gap: 0.3, tail: 0.6 },
    { id: 'comm', segs: ['comm', 'comm2'], label: 'A SECRET COMMISSION', title: 'ANONYMOUS', circle: false, tonic: 2, gap: 0.25, tail: 0.6 },
    { id: 'finish', segs: ['finish'], label: 'WHO FINISHED IT?', title: 'HIS PUPIL', circle: false, tonic: 2, tail: 0.5 },
    { id: 'amadeus', segs: ['amadeus', 'amadeus2'], label: 'AMADEUS · 1984', title: 'A FILM LEGEND', circle: false, tonic: 2, gap: 0.3, tail: 0.6 },
    { id: 'lacri', segs: ['lacri'], label: 'LACRIMOSA', title: 'ONLY 8 BARS', circle: false, tonic: 2, tail: 3.4 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'D MINOR', tonic: 2, gap: 0.3, tail: 0.8 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'TWELVE EIGHT', circle: false, tonic: 2, gap: 0.35, tail: 0.8 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'A RISING LINE', tonic: 2, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'WHERE IT STOPS', accent: true, tonic: 2, gap: 0.9, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', GREY = '#8a8a92', LILAC = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const STR = b => [{ o: 0, v: 0.45 }, { o: b / 3, v: 0.8 }, { o: 2 * b / 3, v: 0.55 }]; // rocking: low, then two sighs
    const VOX = { partials: [1, 0.45, 0.25, 0.12, 0.06], attack: 0.12, release: 0.35 };

    // rocking 12/8 accompaniment, one chord per beat (cycling prog)
    function rock(t0, t1, prog, o = {}) {
      const b = o.beat ?? BEAT;
      for (let i = 0, t = t0; t < t1 - 0.1; t += b, i++) {
        const c = prog[i % prog.length], [n, bs] = V[c];
        a.ch(c, t, Math.min(t + b, t1), { notes: n, bass: bs, vel: o.vel ?? 0.45, strikes: STR(b), hideName: o.hideName, shape: o.shape });
        if (o.grid) [0, 1, 2].forEach(k => o.grid.active.push({ t0: t + k * b / 3, t1: t + (k + 1) * b / 3, i: (i * 3 + k) % 12 }));
      }
    }
    // the rising chromatic line over its chords; returns the beat times (+ end)
    function rise(t0, b, o = {}) {
      const ts = RISE.map((_, i) => t0 + i * b);
      RISE.forEach(([c, n, bs], i) => {
        a.ch(c, ts[i], ts[i] + b, { notes: n, bass: bs, vel: o.vel ?? 0.55, strikes: STR(b), hideName: o.hideName, shape: o.shape });
        a.note(LINE[i], ts[i], b * 0.98, { vel: o.lineVel ?? 0.22, show: false, tone: VOX });
      });
      if (o.walker !== false) a.walker(LINE.map((n, i) => [ts[i], pcOf(n)]), { t1: o.wt1 ?? t0 + 8 * b + 0.8, dr: -40, color: GOLD });
      return ts.concat([t0 + 8 * b]);
    }

    // ---- hook (cover): D minor pops in, the line climbs ... and stops on 'died' ----
    a.scale(0.15, 'D', a.T.MINOR, { popIn: { t0: 0.2, step: 0.06 } });
    const tDied = a.w('hook', 'died');
    const hb = (tDied - 0.3) / 8;
    const ht = rise(0.3, hb, { vel: 0.5, wt1: S('hook').t1 });
    a.big('ONLY 8 BARS', 0.3, ht[8], { y: 462, size: 50, ...MONO, color: GOLD, blur: 14 });
    a.big('AND THEN · SILENCE', ht[8], S('hook').t1, { y: 462, size: 46, ...MONO, color: GREY, blur: 0 });
    a.tag('A', ht[8], S('hook').t1, 'BAR 8', { dr: -92, color: RED });

    // ---- what: the Requiem, rocking in D minor ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'D', a.T.MINOR);
    rock(w0 + 0.1, w1, ['Dm', 'Dm', 'Gm', 'A7'], { vel: 0.4 });
    a.tag('D', a.w('what', 'D') - 0.05, w1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('UNFINISHED', a.w('what2', 'unfinished') - 0.05, w1, { y: 462, size: 56, color: RED, blur: 14 });
    a.big('DECEMBER 1791', a.w('what2', 'December') - 0.05, a.w('what2', 'unfinished') - 0.05, { y: 462, size: 50, ...MONO, color: '#ffffff', blur: 8 });

    // ---- comm: an anonymous commission ----
    const c0 = S('comm').t0, c1 = S('comm').t1;
    rock(c0 + 0.1, c1, ['Dm', 'Bb', 'Gm', 'A7'], { vel: 0.3, shape: false });
    a.big('?', c0 + 0.2, a.w('comm', 'Count') - 0.05, { y: 720, size: 220, color: GREY, blur: 30 });
    a.big('COUNT FRANZ', a.w('comm', 'Count') - 0.05, c1, { y: 640, size: 84, color: '#ffffff', blur: 16 });
    a.big('VON WALSEGG', a.w('comm', 'Walsegg') - 0.1, c1, { y: 740, size: 84, color: GOLD, blur: 20 });
    a.big('WANTED IT TO PASS AS', a.w('comm2', 'present') - 0.05, c1, { y: 900, size: 40, ...MONO, color: '#b9b9c2', blur: 0 });
    a.big('HIS OWN WORK', a.w('comm2', 'own') - 0.05, c1, { y: 980, size: 64, color: RED, blur: 16 });

    // ---- finish: Süssmayr completed it ----
    const f0 = S('finish').t0, f1 = S('finish').t1;
    rock(f0 + 0.05, f1, ['Dm', 'Gm', 'A7', 'Dm'], { vel: 0.3, shape: false });
    const gf = a.grid([{ label: 'MOZART', sub: 'BEGAN IT', size: 56, color: GREY }, { label: 'SÜSSMAYR', sub: 'COMPLETED IT', size: 52, color: GOLD }],
      f0 + 0.1, f1, { rows: 1, cols: 2, cw: 440, chh: 250, y: 600, revealStep: 0.25 });
    gf.active.push({ t0: a.at('finish'), t1: a.w('finish', 'Franz') - 0.05, i: 0 }, { t0: a.w('finish', 'Franz') - 0.05, t1: f1, i: 1 });
    a.big('FRANZ XAVER SÜSSMAYR', a.w('finish', 'Franz'), f1, { y: 960, size: 44, ...MONO, color: '#ffffff', blur: 0 });

    // ---- amadeus: a legend, no evidence ----
    const m0 = S('amadeus').t0, m1 = S('amadeus').t1;
    rock(m0 + 0.05, m1, ['Dm', 'A7'], { vel: 0.26, shape: false });
    a.big('SALIERI', a.w('amadeus', 'Salieri') - 0.05, m1, { y: 620, size: 100, color: '#ffffff', blur: 18 });
    a.big('POISONED MOZART?', a.w('amadeus', 'poisoned') - 0.05, m1, { y: 730, size: 54, ...MONO, color: '#b9b9c2', blur: 0 });
    a.big('AMADEUS', m0 + 0.2, a.w('amadeus', 'Salieri') - 0.05, { y: 640, size: 110, color: '#ffffff', blur: 22 });
    a.big('A FILM · 1984', m0 + 0.4, a.w('amadeus', 'Salieri') - 0.05, { y: 760, size: 46, ...MONO, color: GREY, blur: 0 });
    a.big('NO EVIDENCE', a.w('amadeus2', 'evidence') - 0.1, m1, { y: 900, size: 80, color: RED, blur: 22 });
    a.big('A LEGEND', a.w('amadeus2', 'evidence') + 0.3, m1, { y: 1010, size: 46, ...MONO, color: RED, blur: 0 });

    // ---- lacri: eight bars, lit one by one, then Mozart stops ----
    const l0 = S('lacri').t0, l1 = S('lacri').t1;
    const BARS = Array.from({ length: 8 }, (_, i) => ({ label: String(i + 1), sub: 'BAR', size: 64, subSize: 22, color: i === 7 ? RED : GOLD }));
    const gl = a.grid(BARS, l0 + 0.1, l1, { rows: 2, cols: 4, cw: 225, chh: 190, y: 540, revealStep: 0.07 });
    const lb = (l1 - 1.4 - (l0 + 0.15)) / 8;
    const lt = rise(l0 + 0.15, lb, { vel: 0.5, walker: false, shape: false, hideName: true });
    lt.slice(0, 8).forEach((t, i) => gl.active.push({ t0: t, t1: i === 7 ? l1 : lt[i + 1], i }));
    a.big('MOZART STOPS HERE', lt[8], l1, { y: 1030, size: 54, color: RED, blur: 18 });

    // ---- why1: D minor, a dark key ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    a.scale(y0, 'D', a.T.MINOR);
    const tD = a.w('why1', 'D') - 0.05;
    a.ch('Dm', y0 + 0.1, tD, { notes: V.Dm[0], bass: V.Dm[1], vel: 0.4 });
    rock(tD, y1, ['Dm', 'Dm', 'Gm', 'A7'], { vel: 0.5 });
    a.ring(['D'], tD, y1, { color: GOLD });
    a.tag('D', tD, y1, 'HOME KEY', { dr: -92, color: GOLD });
    a.big('DARK · DRAMATIC', a.w('why1b', 'dark') - 0.05, y1, { y: 462, size: 48, ...MONO, color: LILAC, blur: 12 });

    // ---- why2: 12/8 - four beats, each divided in three; rocking, sighing ----
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const TWELVE = Array.from({ length: 12 }, (_, i) => ({ label: String(i % 3 + 1), color: i % 3 === 0 ? GOLD : TEAL, size: i % 3 === 0 ? 56 : 40 }));
    const g2 = a.grid(TWELVE, z0 + 0.1, z1, { rows: 1, cols: 12, cw: 82, chh: 150, y: 560, revealStep: 0.04, caption: 'ONE BAR OF 12/8' });
    const tTw = a.w('why2', 'twelve') - 0.05, tFour = a.w('why2', 'Four') - 0.05, tDiv = a.w('why2', 'divided') - 0.05;
    a.big('12/8', tTw, tFour, { y: 900, size: 150, color: GOLD, blur: 30 });
    a.big('4 BEATS', tFour, tDiv, { y: 900, size: 90, color: GOLD, blur: 24 });
    a.big('4 BEATS × 3', tDiv, a.at('why2b'), { y: 900, size: 90, color: TEAL, blur: 24 });
    [0, 3, 6, 9].forEach((i, k) => { g2.active.push({ t0: tFour + k * 0.2, t1: tDiv, i }); a.note('D2', tFour + k * 0.2, 0.3, { vel: 0.3, show: false }); });
    const tDivEnd = a.end('why2');
    for (let i = 0; i < 12; i++) g2.active.push({ t0: tDiv + i * (tDivEnd - tDiv) / 12, t1: tDivEnd + 0.2, i });
    rock(z0 + 0.1, tTw, ['Dm'], { vel: 0.25, shape: false });
    rock(a.at('why2b') - 0.1, z1, ['Dm', 'Dm', 'Gm', 'A7'], { vel: 0.45, shape: false, grid: g2 });
    a.big('ROCKING · SIGHING', a.at('why2b'), a.at('why2c') - 0.05, { y: 900, size: 54, ...MONO, color: TEAL, blur: 10 });
    a.big('LACRIMOSA DIES ILLA', a.at('why2c') - 0.05, z1, { y: 880, size: 54, color: '#ffffff', blur: 10 });
    a.big('THAT DAY OF TEARS', a.w('why2c', 'tears') - 0.3, z1, { y: 980, size: 50, ...MONO, color: GOLD, blur: 10 });

    // ---- why3: the line climbs, half step after half step ----
    const q0 = S('why3').t0, q1 = S('why3').t1;
    a.scale(q0, 'D', a.T.MINOR);
    const tCl = a.w('why3', 'climbs') - 0.05;
    a.ch('Dm', q0 + 0.1, tCl, { notes: V.Dm[0], bass: V.Dm[1], vel: 0.35 });
    const qb = (q1 - 0.9 - tCl) / 8;
    const qt = rise(tCl, qb, { vel: 0.55, lineVel: 0.26, wt1: q1 });
    a.ch('Dm', qt[8], q1, { notes: ['A3', 'D4', 'F4', 'A4'], bass: 'D2', vel: 0.5 });
    a.big('BUILDING TENSION', a.w('why3', 'tension') - 0.05, a.w('why3b', 'rising') - 0.05, { y: 462, size: 50, ...MONO, color: RED, blur: 12 });
    a.big('QUA RESURGET', a.w('why3b', 'rising') - 0.05, q1, { y: 462, size: 56, color: GOLD, blur: 16 });
    a.tag('D', tCl, qt[1], 'START', { dr: -92, color: TEAL });

    // ---- essence: the line once more, cut off at bar 8; then a quiet D minor ----
    const e0 = S('essence').t0, e1 = S('essence').t1;
    a.scale(e0, 'D', a.T.MINOR);
    const eb = Math.min(0.62, (a.w('essence', 'stops') - e0 - 0.2) / 8);
    const et = rise(e0 + 0.15, eb, { vel: 0.55, wt1: a.at('cta') });
    a.tag('A', et[8], a.at('cta'), 'BAR 8', { dr: -92, color: RED });
    a.big('THE MUSIC STOPS', a.w('essence', 'stops') - 0.05, a.at('cta'), { y: 462, size: 48, ...MONO, color: RED, blur: 10 });
    a.ch('Dm', a.at('cta'), e1 - 0.2, { notes: ['D3', 'A3', 'D4', 'F4'], bass: 'D2', vel: 0.35 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
