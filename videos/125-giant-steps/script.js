// Giant Steps: three keys a major third apart (B, G, E flat), an equilateral triangle on the circle.
// Copyrighted: chords only (the opening changes from the brief), never the melody or solos.
const B = 0.3;   // one beat at 200 BPM (slower than the record, so the chords can be followed)

module.exports = {
  slug: 'giant-steps',
  title: 'Giant Steps',
  segments: [
    { id: 'hook',    text: 'Three keys, equally spaced, and a tune that never sits still. This is Giant Steps.' },
    { id: 'what',    text: 'John Coltrane recorded it in 1959, and it came out in 1960.' },
    { id: 's1',      text: 'Listen to the opening: B major seven, D seven, G major seven...' },
    { id: 's1b',     text: 'B flat seven, E flat major seven.' },
    { id: 's2',      text: 'Three keys in just three bars.' },
    { id: 's3',      text: 'Coltrane also used this cycle, the Coltrane changes, to reharmonise standard tunes.' },
    { id: 'why1',    text: 'So why does it sound like that? B, G and E flat are each a major third apart.' },
    { id: 'why2',    text: 'Together they form an augmented triad: on the circle, a perfect equilateral triangle.' },
    { id: 'why3',    text: 'Each new key is reached through its own dominant seventh: D seven to G...' },
    { id: 'why3b',   text: 'B flat seven to E flat, F sharp seven to B.' },
    { id: 'why4',    text: 'Because the keys are evenly spaced, no key feels like home for long. The tune keeps spinning.' },
    { id: 'why5',    text: "And it's played at a very fast tempo, a famous test for improvisers." },
    { id: 'essence', text: 'Three keys, equally spaced... and harmony turns into a spinning wheel.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THREE KEYS · ONE WHEEL', title: 'GIANT STEPS', accent: true, tonic: 11, lead: 0.5, tail: 0.6 },
    { id: 'what', segs: ['what'], label: 'JOHN COLTRANE', title: 'GIANT STEPS', circle: false, tonic: 11, tail: 0.6 },
    { id: 's1', segs: ['s1', 's1b'], label: 'YOU HEAR IT IN', title: 'Giant Steps', sub: 'John Coltrane · 1960', tonic: 11, row: ['Bmaj7', 'D7', 'Gmaj7', 'Bb7', 'Ebmaj7'], gap: 0.1, tail: 1.0 },
    { id: 's2', segs: ['s2'], label: 'YOU HEAR IT IN', title: 'Giant Steps', sub: 'John Coltrane · 1960', tonic: 11, tail: 1.2 },
    { id: 's3', segs: ['s3'], label: 'ON STANDARD TUNES', title: 'COLTRANE CHANGES', tonic: 0, tail: 1.0 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'MAJOR THIRDS', tonic: 11, tail: 0.8 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'A PERFECT TRIANGLE', tonic: 11, tail: 1.0 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'DOMINANT DOORS', tonic: 11, gap: 0.2, tail: 1.0 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'NO HOME', tonic: 11, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'VERY FAST', tonic: 11, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A SPINNING WHEEL', accent: true, tonic: 11, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    // the opening changes, in beats (4 per bar)
    const GS = [['Bmaj7', 2], ['D7', 2], ['Gmaj7', 2], ['Bb7', 2], ['Ebmaj7', 4], ['Am7', 2], ['D7', 2], ['Gmaj7', 2], ['Bb7', 2], ['Ebmaj7', 2], ['F#7', 2], ['Bmaj7', 4], ['Fm7', 2], ['Bb7', 2], ['Ebmaj7', 4]];
    // key each chord belongs to (for colour and for the walker)
    const KEY = { Bmaj7: 11, D7: 7, Gmaj7: 7, Bb7: 3, Ebmaj7: 3, Am7: 7, 'F#7': 11, Fm7: 3 };
    const KCOL = { 11: PINK, 7: TEAL, 3: GOLD };
    const ROOTPC = n => a.T.parseChord(n).root;
    const ride = (t0, t1, b = B, vel = 1) => {
      for (let t = t0, i = 0; t < t1 - 0.08; t += b, i++) { a.perc('hat', t, 0.3 * vel); if (i % 2) { a.perc('hat', t + b * 2 / 3, 0.2 * vel); a.perc('snare', t, 0.08 * vel); } }
    };
    // play the changes from t0 at beat length b, until t1; o.rows lights the scene row
    function changes(t0, t1, b = B, o = {}) {
      const out = [];
      let t = t0, i = o.from ?? 0;
      while (t < t1 - 0.15) {
        const [n, beats] = GS[i % GS.length], len = Math.min(beats * b, t1 - t);
        const strikes = [{ o: 0, v: 1 }]; if (beats === 4 && len > 2.67 * b) strikes.push({ o: 2.67 * b, v: 0.55 });
        out.push(a.ch(n, t, t + len, { vel: o.vel ?? 0.7, strikes, tonic: KEY[n], hideName: o.hideName, shape: o.shape, row: o.rows ? o.rows[i % GS.length] ?? null : null }));
        t += len; i++;
      }
      ride(t0, t1, b, o.vel ?? 0.9);
      return out;
    }
    const tri = (t0, t1, o = {}) => a.poly(['B', 'G', 'Eb'], t0, t1, { color: o.color || '#ffffff', alpha: o.alpha ?? 0.45, dash: o.dash ?? true, glow: o.glow, fill: o.fill, width: o.width });
    const keyWalker = (chs, t1, o = {}) => {
      const pts = []; let last = null;
      chs.forEach(c => { const k = KEY[c.name] ?? c.root; if (k !== last) { pts.push([c.t0, k]); last = k; } });
      a.walker(pts, { t1, dr: 34, color: o.color || GOLD, label: o.label ?? 'KEY', labelDr: 82 });
    };

    // ---- hook: the changes spin around the triangle ----
    const AUG = [0, 4, 8];   // B, D#/Eb, G
    a.scale(0, 'B', AUG, { popIn: { t0: 0.02, step: 0.08 } });
    tri(0.02, S('hook').t1);
    const hk = changes(0.08, S('hook').t1, B, { vel: 0.7 });
    keyWalker(hk, S('hook').t1);

    // ---- what: recorded / released ----
    const w0 = S('what').t0;
    const gD = a.grid([{ label: '1959', sub: 'RECORDED', color: TEAL, size: 72 }, { label: '1960', sub: 'RELEASED', color: GOLD, size: 72 }], w0, S('what').t1, { rows: 1, cols: 2, cw: 360, chh: 240, y: 600, revealStep: 0.2 });
    gD.active.push({ t0: a.w('what', '1959') - 0.1, t1: S('what').t1, i: 0 }, { t0: a.w('what', '1960') - 0.1, t1: S('what').t1, i: 1 });
    changes(w0, S('what').t1, B, { vel: 0.5, hideName: true, shape: false, from: 5 });

    // ---- s1: the opening chords on their names ----
    const s0 = S('s1').t0;
    const tw = [a.w('s1', 'B'), a.w('s1', 'D'), a.w('s1', 'G'), a.w('s1b', 'B'), a.w('s1b', 'E')].map(t => t - 0.05);
    const OPEN = ['Bmaj7', 'D7', 'Gmaj7', 'Bb7', 'Ebmaj7'];
    a.ch('Bmaj7', s0 + 0.05, tw[0], { vel: 0.4, hideName: true, tonic: 11 });
    const op = OPEN.map((n, i) => a.ch(n, tw[i], i < 4 ? tw[i + 1] : S('s1').t1, { row: i, tonic: KEY[n], vel: 0.75 }));
    keyWalker(op, S('s1').t1);
    tri(a.w('s1b', 'E'), S('s2').t1);
    ride(s0 + 0.05, S('s1').t1, B, 0.7);

    // ---- s2: three keys in three bars ----
    const t20 = S('s2').t0 + 0.05;
    const s2c = changes(t20, S('s2').t1, B);
    keyWalker(s2c, S('s2').t1);
    a.tag('B', a.w('s2', 'Three'), S('s2').t1, 'KEY 1', { color: PINK, dr: -92 });
    a.tag('G', a.w('s2', 'keys'), S('s2').t1, 'KEY 2', { color: TEAL, dr: -92 });
    a.tag('Eb', a.w('s2', 'just'), S('s2').t1, 'KEY 3', { color: GOLD, dr: -92 });
    a.big('3 KEYS · 3 BARS', a.w('s2', 'three'), S('s2').t1, { y: 462, size: 40, ...MONO, color: GOLD });

    // ---- s3: Coltrane changes on a standard ii - V - I (C, then via A flat and E) ----
    const c0 = S('s3').t0, tCyc = a.w('s3', 'cycle') - 0.05;
    a.scale(c0, 'C', a.T.MAJOR);
    const tReh = a.w('s3', 'reharmonise') - 0.05;
    const IIVI = [['Dm7', 'D3'], ['G7', 'G2'], ['Cmaj7', 'C3']];
    const il = (tReh - c0 - 0.1) / 3;
    const iv = IIVI.map(([n, bs], i) => a.ch(n, c0 + 0.1 + i * il, c0 + 0.1 + (i + 1) * il, { bass: bs, vel: 0.6, tonic: 0 }));
    a.big('ii – V – I', c0 + 0.2, tReh, { ...TOP, size: 52, color: '#ffffff' });
    const CC = [['Dm7', 0], ['Eb7', 8], ['Abmaj7', 8], ['B7', 4], ['Emaj7', 4], ['G7', 0], ['Cmaj7', 0]];
    const cl = (S('s3').t1 - tReh - 0.2) / CC.length;
    const cc = CC.map(([n, k], i) => a.ch(n, tReh + i * cl, tReh + (i + 1) * cl, { vel: 0.7, tonic: k }));
    a.walker([[iv[0].t0, 'D'], [iv[1].t0, 'G'], [iv[2].t0, 'C']], { t1: tReh, dr: 34, color: '#ffffff' });
    a.walker([[cc[0].t0, 'C'], [cc[2].t0, 'Ab'], [cc[4].t0, 'E'], [cc[6].t0, 'C']], { t1: S('s3').t1, dr: 34, color: GOLD, label: 'KEY', labelDr: 82 });
    a.poly(['C', 'Ab', 'E'], tReh, S('s3').t1, { color: GOLD, alpha: 0.4 });
    a.big('THROUGH THREE KEYS', tReh, S('s3').t1, { ...TOP, color: GOLD });
    ride(c0 + 0.1, S('s3').t1, 0.36, 0.7);

    // ---- why1: major thirds apart ----
    const y0 = S('why1').t0;
    a.scale(y0, 'B', AUG);
    a.ch('Bmaj7', y0 + 0.05, a.w('why1', 'B') - 0.05, { vel: 0.4, hideName: true, tonic: 11 });
    const kB = a.w('why1', 'B'), kG = a.w('why1', 'G'), kE = a.w('why1', 'E');
    a.ch('B', kB - 0.05, kG - 0.05, { notes: ['B3', 'D#4', 'F#4'], bass: 'B2', vel: 0.6, tonic: 11, label: 'B' });
    a.ch('G', kG - 0.05, kE - 0.05, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.6, tonic: 7, label: 'G' });
    a.ch('Eb', kE - 0.05, S('why1').t1, { notes: ['Bb3', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.6, tonic: 3, label: 'Eb' });
    const tM3 = a.w('why1', 'major');
    a.arc('B', 'G', tM3, S('why2').t1, { steps: -4, color: PINK, dr: 34, label: 'M3', labelR: 345 });
    a.arc('G', 'Eb', tM3 + 0.3, S('why2').t1, { steps: -4, color: TEAL, dr: 34, label: 'M3', labelR: 345 });
    a.arc('Eb', 'B', tM3 + 0.6, S('why2').t1, { steps: -4, color: GOLD, dr: 34, label: 'M3', labelR: 345 });
    a.big('4 HALF STEPS EACH', tM3, S('why1').t1, { ...TOP, color: '#ffffff' });

    // ---- why2: the augmented triad = equilateral triangle ----
    const z0 = S('why2').t0, tAug = a.w('why2', 'augmented') - 0.05, tTri = a.w('why2', 'triangle') - 0.3;
    a.ch('Eb', z0, tAug, { notes: ['Bb3', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.4, tonic: 3, label: 'Eb' });
    a.ch('Gaug', tAug, S('why2').t1, { notes: ['G3', 'B3', 'Eb4', 'G4'], bass: 'G2', vel: 0.6, tonic: 7, label: 'AUG' });
    a.poly(['B', 'G', 'Eb'], a.w('why2', 'equilateral') - 0.1, S('why2').t1, { color: GOLD, alpha: 0.9, dash: false, glow: true, width: 4, fill: true });
    a.big('AUGMENTED TRIAD', tAug, tTri, { ...TOP, color: GOLD });
    a.big('EQUILATERAL', tTri, S('why2').t1, { ...TOP, size: 52, color: GOLD });

    // ---- why3: each key through its own dominant ----
    const d0 = S('why3').t0;
    tri(d0, S('why3').t1, { alpha: 0.35 });
    const DOOR = [['why3', 'D', 'D7', 'Gmaj7', 'D', 'G', TEAL], ['why3b', 'B', 'Bb7', 'Ebmaj7', 'Bb', 'Eb', GOLD], ['why3b', 'F', 'F#7', 'Bmaj7', 'F#', 'B', PINK]];
    const td = DOOR.map(([seg, w]) => a.w(seg, w) - 0.05);
    a.ch('Bmaj7', d0 + 0.05, td[0], { vel: 0.45, tonic: 11 });
    DOOR.forEach(([seg, w, v7, I, rv, ri, col], i) => {
      const t0 = td[i], t1 = i < 2 ? td[i + 1] : S('why3').t1, mid = t0 + Math.min(0.9, (t1 - t0) / 2);
      a.ch(v7, t0, mid, { vel: 0.75, tonic: KEY[I] });
      a.ch(I, mid, t1, { vel: 0.75, tonic: KEY[I] });
      a.arc(rv, ri, t0 + 0.1, S('why3').t1, { steps: 5, color: col, dr: 34 });
      a.tag(rv, t0, S('why3').t1, 'V7', { color: col, dr: -75 });
    });
    ride(d0 + 0.05, S('why3').t1, 0.36, 0.7);
    a.big('V7  →  I', a.w('why3', 'dominant'), S('why3').t1, { ...TOP, size: 52, color: '#ffffff' });

    // ---- why4: it keeps spinning ----
    const r0 = S('why4').t0;
    tri(r0, S('why4').t1, { alpha: 0.5 });
    const sp = changes(r0 + 0.05, S('why4').t1, B, { vel: 0.7 });
    keyWalker(sp, S('why4').t1);
    a.big('NO HOME FOR LONG', a.w('why4', 'home'), a.w('why4', 'tune'), { ...TOP, color: PINK });
    a.big('IT KEEPS SPINNING', a.w('why4', 'tune'), S('why4').t1, { ...TOP, color: GOLD });

    // ---- why5: very fast ----
    const f0 = S('why5').t0, FB = 0.21;
    tri(f0, S('why5').t1, { alpha: 0.5 });
    const fs = changes(f0 + 0.05, S('why5').t1, FB, { vel: 0.75 });
    keyWalker(fs, S('why5').t1, { label: '' });
    a.big('A TEST FOR IMPROVISERS', a.w('why5', 'test'), S('why5').t1, { ...TOP, size: 40, color: GOLD });
    a.big('VERY FAST', f0 + 0.2, a.w('why5', 'test'), { ...TOP, size: 52, color: PINK });

    // ---- essence: the wheel once more, landing on Ebmaj7 ----
    const e0 = S('essence').t0;
    a.poly(['B', 'G', 'Eb'], e0, S('essence').t1, { color: GOLD, alpha: 0.8, dash: false, glow: true, width: 3 });
    const ec = changes(e0 + 0.05, a.at('cta') + 0.3, 0.36, { vel: 0.7 });
    keyWalker(ec, S('essence').t1);
    const eEnd = ec[ec.length - 1].t1;
    a.ch('Ebmaj7', eEnd, S('essence').t1 - 0.2, { notes: ['G3', 'Bb3', 'D4', 'Eb4', 'G4'], bass: 'Eb2', vel: 0.8, tonic: 3 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
