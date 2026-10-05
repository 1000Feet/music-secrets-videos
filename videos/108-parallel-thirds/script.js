// Singing in thirds: a second voice sings the same melody a third above (diatonic, so it alternates
// major and minor thirds). Copyright: the Everly Brothers and mariachi / Neapolitan repertoire are named
// only; every demo is a public-domain melody (Twinkle Twinkle, Frere Jacques) harmonised in thirds.
// Voices are a soft additive "ooh" tone (engine note option `tone`); dyads are drawn as mute chords.
const BEAT = 0.36;
const TW1 = [['C4', 1], ['C4', 1], ['G4', 1], ['G4', 1], ['A4', 1], ['A4', 1], ['G4', 2]];
const TW2 = [['F4', 1], ['F4', 1], ['E4', 1], ['E4', 1], ['D4', 1], ['D4', 1], ['C4', 2]];
const FJ = [['C4', 1], ['D4', 1], ['E4', 1], ['C4', 1], ['C4', 1], ['D4', 1], ['E4', 1], ['C4', 1], ['E4', 1], ['F4', 1], ['G4', 2], ['E4', 1], ['F4', 1], ['G4', 2]];
// backing chords per line: [beat, beats, chord]
const H1 = [[0, 4, 'C'], [4, 2, 'F'], [6, 2, 'C']];
const H2 = [[0, 2, 'F'], [2, 2, 'C'], [4, 2, 'G'], [6, 2, 'C']];
const HF = [[0, 4, 'C'], [4, 4, 'C'], [8, 4, 'C'], [12, 4, 'C']];

module.exports = {
  slug: 'parallel-thirds',
  title: 'Singing in Thirds',
  segments: [
    { id: 'hook',     text: 'Two voices, one melody, a third apart. The sweetest trick in vocal harmony.' },
    { id: 'what',     text: 'Take a tune, and add a second voice singing the same melody, a third higher.' },
    { id: 'everly',   text: "You hear it in the Everly Brothers, like Bye Bye Love: Don and Phil's close harmony." },
    { id: 'mariachi', text: 'Mariachi, Mexican trios and Neapolitan songs often harmonize their melodies in thirds.' },
    { id: 'why1',     text: 'So why does it work? Octaves and fifths blend so well, they almost merge into one sound.' },
    { id: 'why2',     text: 'Thirds blend sweetly, but stay distinct. Two voices, one color.' },
    { id: 'why3',     text: 'To stay in the key, the harmony alternates: major thirds, four half steps...' },
    { id: 'why3b',    text: 'and minor thirds, three half steps, following the scale.' },
    { id: 'why4',     text: 'Flip a third upside down, and you get a sixth.' },
    { id: 'why4b',    text: 'Parallel sixths sound just as sweet.' },
    { id: 'why5',     text: 'Classical counterpoint allowed parallel thirds and sixths...' },
    { id: 'why5b',    text: 'but not parallel fifths or octaves, because the voices lose their independence.' },
    { id: 'essence',  text: 'Two voices a third apart: close enough to blend, far enough to be two.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'TWO VOICES, ONE MELODY', title: 'SINGING IN THIRDS', accent: true, tonic: 0, lead: 0.4, min: 0.3 + 16 * BEAT + 0.6 },
    { id: 'what', segs: ['what'], label: 'SAME MELODY', title: 'A THIRD HIGHER', tonic: 0, tail: 0.3 + 8 * BEAT + 0.3 },
    { id: 'everly', segs: ['everly'], label: 'YOU HEAR IT IN', title: 'Bye Bye Love', sub: 'The Everly Brothers · 1957', tonic: 0, tail: 0.2 + 8 * BEAT + 0.5 },
    { id: 'mariachi', segs: ['mariachi'], label: 'YOU HEAR IT IN', title: 'Mariachi', sub: 'Mexican trios · Neapolitan songs', tonic: 0, tail: 0.2 + 8 * 0.3 + 0.5 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'BLEND VS MERGE', circle: false, tonic: 0, gap: 0.35, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'WHY IT WORKS', title: 'MAJOR, MINOR', tonic: 0, gap: 0.3, tail: 1.6 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'FLIP IT: A SIXTH', tonic: 0, gap: 0.3, tail: 0.2 + 8 * BEAT + 0.4 },
    { id: 'why5', segs: ['why5', 'why5b'], label: 'THE OLD RULES', title: 'COUNTERPOINT', circle: false, tonic: 0, gap: 0.3, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'BLEND, BUT TWO', accent: true, tonic: 0, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92';
    const MONO = { family: 'DM Mono', weight: 500 };
    const M = n => a.T.midi(n);
    const DIAT = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const shift = (n, k) => { const i = DIAT.indexOf(n[0]) + 7 * +n.slice(-1) + k; return DIAT[((i % 7) + 7) % 7] + Math.floor(i / 7); };
    const bare = n => n.replace(/\d/, '');
    const VOX = [1, 0.55, 0.3, 0.16, 0.08, 0.04];
    const CH = { C: ['C3', 'G3'], F: ['F2', 'C3'], G: ['G2', 'D3'] };

    const sing = (n, t, dur, vel = 0.2) => a.note(n, t, dur, { vel, show: false, tone: { partials: VOX, attack: 0.05, release: 0.18 } });
    const backing = (H, t0, b, vel = 0.22) => H.forEach(([s, len, c]) => CH[c].forEach(n => a.note(n, t0 + s * b, len * b * 0.95, { vel, show: false })));
    // a sung duet: melody + a voice k diatonic steps away (2 = third above, -5 = sixth below)
    function duet(L, t0, b, o = {}) {
      const k = o.k ?? 2, pm = [], ph = [];
      let t = t0;
      L.forEach(([n, d], i) => {
        const h = shift(n, k), semis = Math.abs(M(h) - M(n));
        sing(n, t, d * b * 0.94, o.vel ?? 0.2);
        if (!o.solo) sing(h, t, d * b * 0.94, (o.vel ?? 0.2) * 0.85);
        const lab = o.solo ? '' : semis === 4 ? 'MAJ 3' : semis === 3 ? 'MIN 3' : semis === 9 ? 'MAJ 6' : semis === 8 ? 'MIN 6' : '';
        const lo = M(n) < M(h) ? n : h;
        if (o.shape !== false) a.ch(bare(lo), t, i < L.length - 1 ? t + d * b : (o.t1 ?? t + d * b + 0.6), { notes: o.solo ? [M(n)] : [M(n), M(h)], bass: false, mute: true, label: lab, hideName: !o.names || o.solo });
        pm.push([t, bare(n)]); ph.push([t, bare(h)]);
        if (o.onNote) o.onNote(i, t, d * b, semis);
        t += d * b;
      });
      if (o.walkers !== false) {
        a.walker(pm, { t1: o.t1 ?? t + 0.6, dr: -40, color: GOLD, label: o.labels ? 'MELODY' : undefined, labelDr: -46 });
        if (!o.solo) a.walker(ph, { t1: o.t1 ?? t + 0.6, dr: 40, color: TEAL, label: o.labels ? (k > 0 ? 'THIRD ABOVE' : 'SIXTH BELOW') : undefined, labelDr: 100 });
      }
      return t;
    }

    // ---- hook: Twinkle, lines 1-2, in thirds (cover: dyad + walkers visible from ~0.9 s) ----
    a.scale(0, 'C', a.T.MAJOR);
    const h0 = 0.35, h1 = S('hook').t1;
    backing(H1, h0, BEAT); backing(H2, h0 + 8 * BEAT, BEAT);
    const hEnd = duet([...TW1, ...TW2], h0, BEAT, { names: true, labels: true, t1: h1 });
    sing('C4', hEnd, h1 - hEnd - 0.2, 0.16); sing('E4', hEnd, h1 - hEnd - 0.2, 0.14);

    // ---- what: the melody alone, then the second voice joins ----
    const w0 = S('what').t0 + 0.15, w1 = S('what').t1;
    const tSec = a.w('what', 'second') - 0.05;
    backing(H1, w0, BEAT * 0.9, 0.18);
    const w2 = Math.max(w0 + 8 * BEAT * 0.9 + 0.2, a.end('what') + 0.15);
    duet(TW1, w0, BEAT * 0.9, { solo: true, t1: w2, vel: 0.2 });
    backing(H1, w2, BEAT);
    duet(TW1, w2, BEAT, { names: true, labels: true, t1: w1 });
    a.tag(0, a.w('what', 'higher') - 0.05, w1, 'A THIRD HIGHER', { x: 540, y: 462, color: TEAL });

    // ---- Everly Brothers (named only): the demo duet, Twinkle line 2 ----
    const e0 = S('everly').t0, e1 = S('everly').t1;
    const eDemo = a.end('everly') + 0.15;
    backing(H2, e0 + 0.2, (eDemo - e0 - 0.3) / 8, 0.16);
    duet(TW2, e0 + 0.2, (eDemo - e0 - 0.3) / 8, { vel: 0.12, names: true, t1: eDemo });
    backing(H2, eDemo, BEAT);
    duet(TW2, eDemo, BEAT, { names: true, t1: e1 });
    a.tag(0, a.w('everly', 'close') - 0.05, e1, 'CLOSE HARMONY', { x: 540, y: 462, color: GOLD });

    // ---- mariachi (named only): Frere Jacques in thirds, with a strummed waltz-free oom-pah ----
    const m0 = S('mariachi').t0, m1 = S('mariachi').t1;
    const mb = 0.3, mDemo = Math.max(a.at('mariachi') + 1.2, m1 - 0.4 - 16 * mb);
    for (let t = m0 + 0.2; t < m1 - 0.4; t += 2 * mb) { a.note('C3', t, mb * 0.8, { vel: 0.22, show: false }); a.note('E3', t + mb, mb * 0.6, { vel: 0.14, show: false }); a.note('G3', t + mb, mb * 0.6, { vel: 0.14, show: false }); }
    duet(FJ, m0 + 0.2, (mDemo - m0 - 0.35) / 16, { vel: 0.11, names: true, t1: mDemo });
    duet(FJ, mDemo, mb, { names: true, t1: m1 });
    a.tag(0, a.w('mariachi', 'thirds') - 0.05, m1, 'IN THIRDS', { x: 540, y: 462, color: TEAL });

    // ---- why1-2: octave and fifth merge, the third stays two ----
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const IV = [['OCTAVE', 'C + C', 'Octaves', ['C4', 'C5'], GREY, 'why1'], ['FIFTH', 'C + G', 'fifths', ['C4', 'G4'], GREY, 'why1'], ['THIRD', 'C + E', 'Thirds', ['C4', 'E4'], GOLD, 'why2']];
    const gi = a.grid(IV.map(([l, s, , , c]) => ({ label: l, sub: s, color: c, size: 46 })), y0 + 0.1, y1, { rows: 1, cols: 3, cw: 300, chh: 260, y: 540, revealStep: 0.15 });
    IV.forEach(([, , w, notes, , seg], i) => {
      const t = a.w(seg, w) - 0.05, t1 = i < 2 ? a.w(IV[i + 1][5], IV[i + 1][2]) - 0.1 : y1 - 0.2;
      gi.active.push({ t0: t, t1, i });
      notes.forEach(n => sing(n, t, Math.min(2.4, t1 - t - 0.1), 0.2));
    });
    a.big('MERGE INTO ONE', a.w('why1', 'merge') - 0.05, a.at('why2') - 0.1, { y: 900, size: 52, ...MONO, color: GREY });
    a.big('TWO VOICES', a.w('why2', 'Two') - 0.05, y1, { y: 900, size: 60, color: GOLD });
    a.big('ONE COLOR', a.w('why2', 'color') - 0.05, y1, { y: 990, size: 44, ...MONO, color: TEAL, blur: 0 });
    a.big('BLEND, BUT DISTINCT', a.w('why2', 'sweetly') - 0.05, a.w('why2', 'Two') - 0.1, { y: 900, size: 50, ...MONO, color: GOLD });

    // ---- why3: the harmony follows the scale - major and minor thirds alternate ----
    const z0 = S('why3').t0, z1 = S('why3').t1;
    const tMaj = a.w('why3', 'major') - 0.05, tMin = a.w('why3b', 'minor') - 0.05;
    a.ch('C', tMaj, tMin, { notes: ['C4', 'E4'], bass: false, mute: true, label: 'MAJ 3' });
    sing('C4', tMaj, 1.2, 0.2); sing('E4', tMaj, 1.2, 0.17);
    a.arc('C', 'E', tMaj + 0.2, tMin, { steps: 4, color: GOLD, label: '4 HALF STEPS', labelR: 165 });
    duet(TW1, z0 + 0.1, Math.min(0.3, (tMaj - z0 - 0.2) / 8), { names: true, walkers: false, vel: 0.12, t1: tMaj });
    a.ch('A', tMin, tMin + 1.6, { notes: ['A4', 'C5'], bass: false, mute: true, label: 'MIN 3' });
    sing('A4', tMin, 1.2, 0.2); sing('C5', tMin, 1.2, 0.17);
    a.arc('A', 'C', tMin + 0.2, tMin + 1.6, { steps: 3, color: TEAL, label: '3 HALF STEPS', labelR: 165 });
    const zs = a.w('why3b', 'scale') - 0.05;
    const zb = Math.min(BEAT, (z1 - zs - 0.3) / 8);
    const zz = Math.max(tMin + 1.6, zs);
    backing(H1, zz, zb, 0.16);
    duet(TW1, zz, zb, { names: true, t1: z1 });

    // ---- why4: flip the third: C-E becomes E-C, a sixth; then Twinkle in sixths ----
    const f0 = S('why4').t0, f1 = S('why4').t1;
    const tFlip = a.w('why4', 'Flip') - 0.05, tSix = a.w('why4', 'sixth') - 0.05;
    a.ch('C', f0 + 0.1, tSix, { notes: ['C4', 'E4'], bass: false, mute: true, label: '3RD' });
    sing('C4', f0 + 0.15, tSix - f0 - 0.3, 0.18); sing('E4', f0 + 0.15, tFlip - f0 + 0.3, 0.16);
    sing('E3', tFlip + 0.5, tSix - tFlip - 0.6, 0.16);
    a.ch('C', tSix, a.at('why4b') + 0.1, { notes: ['E3', 'C4'], bass: false, mute: true, label: '6TH', snap: true });
    sing('C4', tSix, 1.4, 0.18); sing('E3', tSix, 1.4, 0.16);
    a.tag('E', tFlip + 0.5, a.at('why4b'), 'E DROPS AN OCTAVE', { color: TEAL, x: 540, y: 462 });
    const fd = a.at('why4b') + 0.1;
    backing(H1, fd, BEAT, 0.16);
    duet(TW1, fd, BEAT, { k: -5, names: true, labels: true, t1: f1 });

    // ---- why5: the rules - thirds and sixths yes, fifths and octaves no ----
    const r0 = S('why5').t0, r1 = S('why5').t1;
    const RU = [['THIRDS', 'ALLOWED', TEAL, 'thirds', 'why5'], ['SIXTHS', 'ALLOWED', TEAL, 'sixths', 'why5'], ['FIFTHS', 'NOT ALLOWED', RED, 'fifths', 'why5b'], ['OCTAVES', 'NOT ALLOWED', RED, 'octaves', 'why5b']];
    const gr = a.grid(RU.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 50, subSize: 26 })), r0 + 0.1, r1, { rows: 2, cols: 2, cw: 420, chh: 200, y: 500, revealStep: 0.12, caption: 'PARALLEL MOTION' });
    RU.forEach(([, , , w, seg], i) => gr.active.push({ t0: a.w(seg, w) - 0.05, t1: i === 1 ? a.at('why5b') : i === 3 ? r1 : a.w(RU[i + 1][4], RU[i + 1][3]) - 0.05, i }));
    // short parallel examples, each three notes long
    const par = (t, k, vel) => ['C4', 'D4', 'E4'].forEach((n, j) => { sing(n, t + j * 0.28, 0.26, vel); sing(k === 7 ? shift(n, 7) : shift(n, k), t + j * 0.28, 0.26, vel * 0.85); });
    par(a.w('why5', 'thirds') - 0.05, 2, 0.17);
    par(a.w('why5', 'sixths') - 0.05, 5, 0.17);
    par(a.w('why5b', 'fifths') - 0.05, 4, 0.17);
    par(a.w('why5b', 'octaves') - 0.05, 7, 0.17);
    a.big('VOICES LOSE INDEPENDENCE', a.w('why5b', 'lose') - 0.05, r1, { y: 990, size: 42, ...MONO, color: RED });

    // ---- essence: Twinkle in thirds, ending on C + E ----
    const s0 = S('essence').t0 + 0.15, s1 = S('essence').t1;
    a.scale(S('essence').t0, 'C');
    const sb = Math.min(BEAT, (a.at('cta') - s0) / 16);
    backing(H1, s0, sb, 0.18); backing(H2, s0 + 8 * sb, sb, 0.18);
    const sEnd = duet([...TW1, ...TW2], s0, sb, { names: true, t1: s1 });
    ['C3', 'G3', 'C4', 'E4'].forEach((n, j) => sing(n, sEnd, s1 - sEnd - 0.4, j < 2 ? 0.12 : 0.17));
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
