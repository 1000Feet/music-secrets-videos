// Bohemian Rhapsody: a six-minute single built from contrasting sections instead of a repeating chorus.
// The song is copyrighted: NO melody, riff or chords from it are played. Each section type is illustrated
// with a GENERIC texture (choir pad, piano ballad, band + original guitar-like lick, choir stabs,
// power-chord chugging, soft piano) on generic chords chosen for the demo.
module.exports = {
  slug: 'bohemian-rhapsody',
  title: 'Bohemian Rhapsody',
  segments: [
    { id: 'hook',    text: 'A six minute single... with no chorus at all.' },
    { id: 'what',    text: "That's Bohemian Rhapsody, by Queen, from 1975. Freddie Mercury wrote it." },
    { id: 'chart',   text: "It spent nine weeks at number one in the UK, then hit number one again in 1991, after Mercury's death." },
    { id: 'secs',    text: 'Instead of verses and choruses, it moves through six sections:' },
    { id: 's1',      text: 'an a cappella intro, a piano ballad, a guitar solo...' },
    { id: 's2',      text: 'a mock operatic section, a hard rock section, and a quiet outro.' },
    { id: 'why1',    text: 'So why does it work? No section ever comes back as a chorus.' },
    { id: 'why2',    text: 'Music that keeps moving forward like this is called through-composed, like opera.' },
    { id: 'why3',    text: 'Each section has its own texture, tempo and mood:' },
    { id: 'why3b',   text: 'voices alone, piano and voice, full band, choir-like vocals, heavy rock.' },
    { id: 'why4',    text: 'It moves through several keys, so each section feels like a new scene.' },
    { id: 'why5',    text: 'The contrast itself becomes the hook. You wait to hear what comes next.' },
    { id: 'essence', text: 'No chorus, all story. Six scenes in six minutes.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'A HIT WITH NO CHORUS', title: 'BOHEMIAN RHAPSODY', accent: true, circle: false, tonic: 7, min: 5.6, tail: 1.2 },
    { id: 'what', segs: ['what'], label: 'QUEEN · 1975', title: 'Bohemian Rhapsody', sub: 'written by Freddie Mercury', circle: false, tonic: 9, tail: 0.8 },
    { id: 'chart', segs: ['chart'], label: 'UK SINGLES CHART', title: 'NUMBER ONE', circle: false, tonic: 0, tail: 1.0 },
    { id: 'secs', segs: ['secs'], label: 'NO VERSE, NO CHORUS', title: 'SIX SECTIONS', circle: false, tonic: 7, tail: 0.4 },
    { id: 'tour', segs: ['s1', 's2'], label: 'NO VERSE, NO CHORUS', title: 'SIX SECTIONS', circle: false, tonic: 7, gap: 0.7, tail: 2.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'NOTHING RETURNS', circle: false, tonic: 0, tail: 1.0 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THROUGH-COMPOSED', circle: false, tonic: 0, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'SIX TEXTURES', circle: false, tonic: 7, gap: 0.3, tail: 1.4 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'NEW KEYS', tonic: 7, tail: 1.2 },
    { id: 'why5', segs: ['why5'], label: 'WHY IT WORKS', title: 'CONTRAST IS THE HOOK', circle: false, tonic: 0, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ALL STORY', accent: true, circle: false, tonic: 5, gap: 0.6, tail: 2.6, min: 0.2 + 6 * 0.75 + 4.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const TEAL = '#45d6c8', BLUE = '#62a8ff', GOLD = '#ffcf5a', PURPLE = '#b48cff', RED = '#ff5d6c', SLATE = '#9aa7c7', PINK = '#ff7a93', GRAY = '#2c2c34';
    const MONO = { family: 'DM Mono', weight: 500 };
    // the six sections: label, sub, colour, intensity (1-5)
    const SECS = [['INTRO', 'A CAPPELLA', TEAL, 1], ['BALLAD', 'PIANO', BLUE, 2], ['SOLO', 'GUITAR', GOLD, 4], ['OPERA', 'MOCK', PURPLE, 3], ['ROCK', 'HARD', RED, 5], ['OUTRO', 'QUIET', SLATE, 1]];

    // ---------- grids: six section blocks + an intensity "equalizer" ----------
    const blocks = (t0, t1, o = {}) => a.grid(SECS.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 28, subSize: 17 })), t0, t1,
      { rows: 1, cols: 6, cw: 152, chh: o.chh ?? 140, y: o.y ?? 460, revealStep: o.reveal ?? 0.05 });
    const eq = (t0, t1, o = {}) => {
      const cells = [];
      for (let r = 0; r < 5; r++) SECS.forEach(([, , c, lv]) => cells.push({ label: '', color: 5 - r <= lv ? c : GRAY }));
      return a.grid(cells, t0, t1, { rows: 5, cols: 6, cw: 152, chh: o.chh ?? 56, y: o.y ?? 630, revealStep: o.reveal ?? 0.01, caption: 'INTENSITY' });
    };
    // light section c in a blocks grid (and its column in an eq grid)
    const lightUp = (gb, ge, c, t0, t1) => {
      if (gb) gb.active.push({ t0, t1, i: c });
      if (ge) for (let r = 0; r < 5; r++) if (5 - r <= SECS[c][3]) ge.active.push({ t0, t1, i: r * 6 + c });
    };

    // ---------- textures (generic, not from the song) ----------
    const VOX = { partials: [1, 0.45, 0.25, 0.12, 0.06], attack: 0.16, release: 0.45 };
    const VOXS = { partials: [1, 0.5, 0.3, 0.15, 0.08], attack: 0.02, release: 0.12 };
    const LEAD = { partials: [1, 0.62, 0.45, 0.34, 0.27, 0.21, 0.17, 0.14, 0.11, 0.09], attack: 0.01, release: 0.15 };
    const span = (chords, t0, t1, fn) => { const L = (t1 - t0) / chords.length; chords.forEach((c, i) => fn(c, t0 + i * L, L, i)); };
    // voices alone: a soft choir-like pad
    const choir = (chords, t0, t1, v = 1) => span(chords, t0, t1, (c, t, L) => {
      const ev = a.ch(c, t, t + L, { mute: true, bass: false, shape: false, hideName: true });
      ev.notes.forEach(m => a.note(m, t, L * 0.98, { vel: 0.13 * v, tone: VOX }));
      a.note(ev.notes[0] - 12, t, L * 0.98, { vel: 0.1 * v, tone: VOX });
      a.note(ev.notes[2] + 12, t, L * 0.98, { vel: 0.06 * v, tone: VOX });
    });
    // piano and voice: slow piano arpeggios
    const ballad = (chords, t0, t1, v = 1) => span(chords, t0, t1, (c, t, L) => {
      const ev = a.ch(c, t, t + L, { mute: true, bass: false, shape: false, hideName: true });
      const pat = [ev.notes[0] - 12, ev.notes[2] - 12, ev.notes[1], ev.notes[2] - 12, ev.notes[0], ev.notes[2] - 12];
      const e = L / 6;
      pat.forEach((m, k) => a.note(m, t + k * e, e * 1.6, { vel: (k ? 0.18 : 0.24) * v }));
      a.note(36 + ev.root, t, L * 0.95, { vel: 0.18 * v, show: false });
    });
    // full band: drums, bass, chords, plus an ORIGINAL pentatonic lead lick with bends
    const LICK = [['A4', 0.5], ['C5', 0.5], ['D5', 1, 2], ['C5', 0.5], ['A4', 0.5], ['G4', 1], ['A4', 2, 0, true]];
    const solo = (t0, t1, v = 1) => {
      const chords = ['Am', 'G', 'F', 'G'];
      span(chords, t0, t1, (c, t, L) => {
        const bb = L / 2;
        a.ch(c, t, t + L, { vel: 0.5 * v, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: bb, v: 0.6 }] });
        a.perc('kick', t, 0.8 * v); a.perc('snare', t + bb, 0.7 * v);
        for (let k = 0; k < 4; k++) a.perc('hat', t + k * bb / 2, 0.35 * v);
      });
      const total = LICK.reduce((s, [, d]) => s + d, 0), b = (t1 - t0) / total;
      let t = t0;
      LICK.forEach(([n, d, bend, vib]) => {
        const tone = { ...LEAD };
        if (bend) tone.bend = [[0, 0], [0.12, bend], [d * b, bend]];
        if (vib) tone.bend = Array.from({ length: 12 }, (_, k) => [k * 0.08, k % 2 ? 0.25 : -0.1]);
        a.note(n, t, d * b * 0.95, { vel: 0.16 * v, tone });
        t += d * b;
      });
    };
    // layered choir-like stabs, alternating high and low
    const opera = (t0, t1, v = 1) => {
      const CH = [['E', 0], ['A', 12], ['E', 0], ['B', 12], ['E', 0], ['A', 12]];
      const n = Math.max(4, Math.round((t1 - t0) / 0.26)), e = (t1 - t0) / n;
      for (let k = 0; k < n; k++) {
        const [c, up] = CH[k % CH.length], ev = a.ch(c, t0 + k * e, t0 + (k + 1) * e, { mute: true, bass: false, shape: false, hideName: true });
        ev.notes.forEach(m => a.note(m, t0 + k * e, e * 0.7, { vel: 0.14 * v, tone: VOXS }));
        ev.notes.forEach(m => a.note(m + up, t0 + k * e, e * 0.7, { vel: 0.1 * v, tone: VOXS }));
        if (k % 2 === 0) a.perc('kick', t0 + k * e, 0.45 * v);
      }
    };
    // heavy rock: power chords chugging in eighths, driving drums
    const rock = (t0, t1, v = 1) => span(['E5', 'G5', 'A5', 'E5'], t0, t1, (c, t, L) => {
      const root = a.T.pc(c[0]), r = 40 + a.T.mod(root - 4, 12);
      const n = 8, e = L / n;
      a.ch(c, t, t + L, { notes: [r + 12, r + 19, r + 24], bass: r, vel: 0.85 * v, hideName: true, shape: false,
        strikes: Array.from({ length: n }, (_, k) => ({ o: k * e, v: k % 2 ? 0.7 : 1 })) });
      for (let k = 0; k < n; k++) { a.perc(k % 4 === 2 ? 'snare' : 'kick', t + k * e, (k % 4 === 2 ? 0.85 : 0.6) * v); a.perc('hat', t + k * e, 0.35 * v); }
    });
    // quiet outro: soft sustained piano chords
    const outro = (t0, t1, v = 1) => span(['F', 'C/E', 'Dm', 'F'], t0, t1, (c, t, L, i) =>
      a.ch(c, t, t + L, { vel: 0.35 * v, hideName: true, shape: false, bass: i === 1 ? 'E2' : undefined }));
    const TEX = [(t0, t1, v) => choir(['G', 'Em', 'C', 'D'], t0, t1, v), (t0, t1, v) => ballad(['Am', 'F', 'C', 'E'], t0, t1, v), solo, opera, rock, outro];

    // ---------- hook: six blocks, intensity, no chorus ----------
    const gH = blocks(0.05, S('hook').t1, { reveal: 0.03 });
    const eH = eq(0.05, S('hook').t1, { reveal: 0.005 });
    const hl = (S('hook').t1 - 0.4) / 6;
    TEX.forEach((f, c) => { f(0.3 + c * hl, 0.3 + (c + 1) * hl, 0.8); lightUp(gH, eH, c, 0.3 + c * hl, 0.3 + (c + 1) * hl); });
    a.big('NO CHORUS', a.w('hook', 'no') - 0.05, S('hook').t1, { y: 1060, size: 64, color: PINK, blur: 20 });

    // ---------- what: Queen, 1975, Freddie Mercury, about six minutes ----------
    ballad(['Am', 'F', 'C', 'E'], S('what').t0 + 0.1, S('what').t1 - 0.1, 1);
    a.big('QUEEN', a.w('what', 'Queen') - 0.05, S('what').t1, { y: 480, size: 64, ...MONO, color: '#ffffff', blur: 0 });
    a.big('1975', a.w('what', '1975') - 0.05, S('what').t1, { y: 640, size: 150, color: GOLD, blur: 30 });
    a.big('FREDDIE MERCURY', a.w('what', 'Freddie') - 0.05, S('what').t1, { y: 830, size: 52, ...MONO, color: '#ffffff', blur: 0 });
    a.big('ABOUT SIX MINUTES', S('what').t0 + 0.3, S('what').t1, { y: 960, size: 40, ...MONO, color: '#8a8a92', blur: 0 });

    // ---------- chart: nine weeks at No. 1, and again in 1991 ----------
    const gWk = a.grid(Array.from({ length: 9 }, (_, i) => ({ label: String(i + 1), sub: 'WEEK', size: 44, subSize: 16, color: GOLD })), S('chart').t0 + 0.05, S('chart').t1,
      { rows: 1, cols: 9, cw: 108, chh: 140, y: 480, revealStep: 0.03, caption: 'NO. 1 IN THE UK · 1975–76' });
    const tNine = a.w('chart', 'nine') - 0.05;
    for (let i = 0; i < 9; i++) gWk.active.push({ t0: tNine + i * 0.14, t1: S('chart').t1, i });
    a.big('1991', a.w('chart', '1991') - 0.05, S('chart').t1, { y: 820, size: 120, color: TEAL, blur: 26 });
    a.big('NO. 1 AGAIN', a.w('chart', 'again') - 0.05, S('chart').t1, { y: 940, size: 48, ...MONO, color: '#ffffff', blur: 0 });
    span(['C', 'G/B', 'Am', 'F', 'C', 'G'], S('chart').t0 + 0.1, S('chart').t1 - 0.1, (c, t, L) =>
      a.ch(c, t, t + L, { vel: 0.4, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: L / 2, v: 0.5 }] }));

    // ---------- secs + tour: the six sections, each with its own generic texture ----------
    const gT = blocks(S('secs').t0 + 0.05, S('tour').t1, { reveal: 0.0 });
    const eT = eq(S('secs').t0 + 0.05, S('tour').t1, { reveal: 0.0 });
    a.big('NOT VERSE · CHORUS', S('secs').t0 + 0.2, a.w('secs', 'six') - 0.05, { y: 1080, size: 44, ...MONO, color: '#8a8a92', blur: 0 });
    a.big('6 SECTIONS', a.w('secs', 'six') - 0.05, S('secs').t1, { y: 1080, size: 56, color: GOLD, blur: 16 });
    choir(['G', 'D/F#', 'Em', 'D'], S('secs').t0 + 0.1, S('secs').t1, 0.8);
    const tw = [a.w('s1', 'cappella'), a.w('s1', 'piano'), a.w('s1', 'guitar'), a.w('s2', 'mock'), a.w('s2', 'hard'), a.w('s2', 'quiet')].map(t => t - 0.25);
    tw[0] = S('tour').t0 + 0.05;
    TEX.forEach((f, c) => {
      const t0 = tw[c], t1 = c < 5 ? tw[c + 1] : S('tour').t1 - 0.1;
      f(t0, t1, 1);
      lightUp(gT, eT, c, t0, t1);
    });

    // ---------- why1: a typical hit repeats its chorus; here nothing returns ----------
    const POP = [['V', BLUE], ['C', PINK], ['V', BLUE], ['C', PINK], ['B', TEAL], ['C', PINK]];
    const gP = a.grid(POP.map(([l, c]) => ({ label: l, color: c, size: 50 })), S('why1').t0 + 0.05, S('why1').t1,
      { rows: 1, cols: 6, cw: 152, chh: 120, y: 470, revealStep: 0.04, caption: 'A TYPICAL HIT: THE CHORUS RETURNS' });
    const tChor = a.w('why1', 'chorus') - 0.05;
    [1, 3, 5].forEach((i, k) => gP.active.push({ t0: S('why1').t0 + 0.4 + k * 0.35, t1: S('why1').t1, i }));
    const gN = a.grid(SECS.map(([, , c], i) => ({ label: String(i + 1), color: c, size: 50 })), S('why1').t0 + 0.3, S('why1').t1,
      { rows: 1, cols: 6, cw: 152, chh: 120, y: 760, revealStep: 0.04, caption: 'BOHEMIAN RHAPSODY: NOTHING RETURNS' });
    for (let i = 0; i < 6; i++) gN.active.push({ t0: tChor + i * 0.18, t1: S('why1').t1, i });
    span(['C', 'G', 'Am', 'F', 'C', 'G', 'Am', 'F'], S('why1').t0 + 0.1, S('why1').t1 - 0.1, (c, t, L) =>
      a.ch(c, t, t + L, { vel: 0.4, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: L / 2, v: 0.5 }] }));

    // ---------- why2: through-composed - always moving forward, like opera ----------
    const gF = a.grid(SECS.map(([l, , c]) => ({ label: l, color: c, size: 28 })), S('why2').t0 + 0.05, S('why2').t1,
      { rows: 2, cols: 3, cw: 300, chh: 140, y: 470, revealStep: 0.05, caption: '1 → 2 → 3 → 4 → 5 → 6' });
    const f0 = S('why2').t0 + 0.15, fl = (S('why2').t1 - f0 - 0.2) / 6;
    const FWD = ['C', 'Am', 'Em', 'F', 'Dm', 'G'];
    for (let i = 0; i < 6; i++) gF.active.push({ t0: f0 + i * fl, t1: S('why2').t1, i });
    choir(FWD, f0, f0 + 6 * fl, 1);
    a.ch('C', f0 + 6 * fl, S('why2').t1, { vel: 0.3, hideName: true, shape: false });
    a.big('THROUGH-COMPOSED', a.w('why2', 'throughcomposed') - 0.05, S('why2').t1, { y: 930, size: 58, color: GOLD, blur: 18 });
    a.big('LIKE OPERA', a.w('why2', 'opera') - 0.05, S('why2').t1, { y: 1040, size: 44, ...MONO, color: PURPLE, blur: 0 });

    // ---------- why3: texture, tempo, mood - then each texture on its word ----------
    const gTT = a.grid([['TEXTURE', TEAL], ['TEMPO', GOLD], ['MOOD', PINK]].map(([l, c]) => ({ label: l, color: c, size: 40 })), S('why3').t0 + 0.05, S('why3').t1,
      { rows: 1, cols: 3, cw: 300, chh: 120, y: 450, revealStep: 0.1 });
    ['texture', 'tempo', 'mood'].forEach((w, i) => gTT.active.push({ t0: a.w('why3', w) - 0.05, t1: S('why3').t1, i }));
    const g3 = blocks(S('why3').t0 + 0.3, S('why3').t1, { y: 640 });
    choir(['G', 'C/G'], S('why3').t0 + 0.1, a.at('why3b') - 0.1, 0.6);
    const xw = [a.w('why3b', 'voices'), a.w('why3b', 'piano'), a.w('why3b', 'full'), a.w('why3b', 'choirlike'), a.w('why3b', 'heavy')].map(t => t - 0.1);
    const XS = ['VOICES ALONE', 'PIANO + VOICE', 'FULL BAND', 'CHOIR-LIKE', 'HEAVY ROCK'];
    xw.forEach((t0, c) => {
      const t1 = c < 4 ? xw[c + 1] : S('why3').t1 - 0.2;
      TEX[c](t0, t1, 0.9);
      lightUp(g3, null, c, t0, t1);
      a.big(XS[c], t0, t1, { y: 900, size: 52, color: SECS[c][2], blur: 16 });
    });

    // ---------- why4: several keys, each section a new scene (generic keys on the circle) ----------
    const KEYS = [['G', 'G', ['G3', 'B3', 'D4'], 'G2'], ['A', 'A', ['A3', 'C#4', 'E4'], 'A2'], ['Eb', 'Eb', ['G3', 'Bb3', 'Eb4'], 'Eb2'], ['E', 'E', ['G#3', 'B3', 'E4'], 'E2'], ['F', 'F', ['A3', 'C4', 'F4'], 'F2']];
    const k0 = S('why4').t0 + 0.1, kl = (S('why4').t1 - k0) / KEYS.length;
    a.scale(S('why4').t0, 'G', a.T.MAJOR, { popIn: { t0: S('why4').t0 + 0.05, step: 0.04 } });
    KEYS.forEach(([key, ch, notes, bass], i) => {
      const t = k0 + i * kl;
      if (i) a.scale(t, key);
      a.ch(ch, t, t + kl, { notes, bass, vel: 0.55, strikes: [0, 1, 2, 3].map(k => ({ o: k * kl / 4, v: k ? 0.45 : 1 })) });
      a.tag(key, t, t + kl, 'SCENE ' + (i + 1), { color: GOLD, dr: -92 });
    });
    a.walker(KEYS.map(([key], i) => [k0 + i * kl, key]), { t1: S('why4').t1, dr: 34, color: '#ffffff' });
    a.tag(0, a.w('why4', 'new') - 0.05, S('why4').t1, 'A NEW SCENE', { x: 540, y: 462, color: GOLD });

    // ---------- why5: the contrast is the hook - cut between textures ----------
    const gC = blocks(S('why5').t0 + 0.05, S('why5').t1, { reveal: 0.02 });
    const eC = eq(S('why5').t0 + 0.05, S('why5').t1, { reveal: 0.005 });
    const ORDER = [0, 4, 1, 2, 5];
    const tNext = a.w('why5', 'next') - 0.05, c0 = S('why5').t0 + 0.1, cl = (a.w('why5', 'wait') - 0.1 - c0) / ORDER.length;
    ORDER.forEach((c, k) => { TEX[c](c0 + k * cl, c0 + (k + 1) * cl, 0.9); lightUp(gC, eC, c, c0 + k * cl, c0 + (k + 1) * cl); });
    const tW = c0 + ORDER.length * cl;
    choir(['D'], tW, tNext + 0.2, 0.5);
    a.big('CONTRAST = HOOK', a.w('why5', 'contrast') - 0.05, tW, { y: 1060, size: 56, color: GOLD, blur: 18 });
    a.big('WHAT COMES NEXT?', tW, S('why5').t1, { y: 1060, size: 56, color: PINK, blur: 18 });
    lightUp(gC, eC, 3, tNext + 0.2, S('why5').t1);
    opera(tNext + 0.2, S('why5').t1 - 0.2, 0.9);

    // ---------- essence: six scenes, one after another, then the quiet end ----------
    const gE = blocks(S('essence').t0 + 0.05, S('essence').t1, { reveal: 0.02 });
    const eE = eq(S('essence').t0 + 0.05, S('essence').t1, { reveal: 0.005 });
    const e0 = S('essence').t0 + 0.2, el = 0.75;
    TEX.forEach((f, c) => { const t1 = c < 5 ? e0 + (c + 1) * el : S('essence').t1 - 0.3; f(e0 + c * el, c < 5 ? t1 : Math.min(t1, e0 + 6 * el + 2.4), 0.85); lightUp(gE, eE, c, e0 + c * el, S('essence').t1); });
    a.big('NO CHORUS · ALL STORY', a.w('essence', 'No') - 0.05, S('essence').t1, { y: 1060, size: 46, ...MONO, color: GOLD, blur: 10 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
