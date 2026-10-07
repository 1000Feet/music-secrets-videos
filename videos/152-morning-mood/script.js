// Morning Mood (Grieg, Peer Gynt): a sunrise that is actually in the Moroccan desert.
// Brief/copyright: Grieg's melody is NOT reconstructed. We play E major chords and our OWN short phrase on
// the five notes of the E major pentatonic scale (even quarter notes, leaping shape), passed back and forth
// between two additive "instruments": a flute (close to pure) and an oboe (strong 2nd and 3rd overtones).
const B = 0.4;   // one beat of our phrase
// our own phrases: flute (over E), then the oboe answers a fourth lower (over B)
const FLUTE_PH = [['E5', 1], ['B4', 1], ['F#5', 2], ['C#5', 1], ['E5', 1], ['B4', 2]];
const OBOE_PH = [['B4', 1], ['F#4', 1], ['C#5', 2], ['G#4', 1], ['B4', 1], ['F#4', 2]];
const FLUTE = { partials: [1, 0.2, 0.07, 0.03, 0.015, 0.01], attack: 0.06, release: 0.25 };
const OBOE = { partials: [0.55, 1, 0.8, 0.5, 0.42, 0.3, 0.2, 0.14], attack: 0.04, release: 0.2 };
const PENTA = [0, 2, 4, 7, 9];

module.exports = {
  slug: 'morning-mood',
  title: 'Morning Mood',
  segments: [
    { id: 'hook',    text: "You know this sunrise... but the sun isn't rising where you think." },
    { id: 'what',    text: "This is Morning Mood, from Grieg's music for Ibsen's play Peer Gynt, in 1875." },
    { id: 'what2',   text: 'The same work gave us In the Hall of the Mountain King.' },
    { id: 'desert',  text: 'You might picture a Norwegian fjord.' },
    { id: 'desert2', text: "But in the play, it's a sunrise in the Moroccan desert, in Act 4." },
    { id: 'desert3', text: 'Not a fjord in sight.' },
    { id: 'why1',    text: 'So why does it sound like dawn? Start with just five notes.' },
    { id: 'why1b',   text: 'E, F sharp, G sharp, B, C sharp. The major pentatonic scale.' },
    { id: 'why1c',   text: 'No half steps, so nothing clashes. Calm, and folk-like.' },
    { id: 'why2',    text: 'The phrase is passed back and forth between flute and oboe...' },
    { id: 'why2b',   text: 'like birds calling to each other at dawn.' },
    { id: 'why3',    text: 'The key is E major: bright and open, like morning light.' },
    { id: 'why4',    text: 'Then it slowly grows louder and fuller...' },
    { id: 'why4b',   text: 'until the full orchestra arrives. The sun is up.' },
    { id: 'essence', text: 'Five notes, two instruments, one slow crescendo... and the sun comes up.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'EDVARD GRIEG · PEER GYNT', title: 'MORNING MOOD', accent: true, tonic: 4, min: 0.3 + 16 * B + 0.4 },
    { id: 'what', segs: ['what'], label: 'MUSIC FOR A PLAY', title: 'MORNING MOOD', sub: 'Grieg · Peer Gynt · 1875 · in E', tonic: 4, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'THE SAME WORK', title: 'PEER GYNT', circle: false, tonic: 4, tail: 0.9 },
    { id: 'desert', segs: ['desert', 'desert2', 'desert3'], label: 'PEER GYNT · ACT 4', title: 'NOT NORWAY', circle: false, tonic: 4, gap: 0.35, tail: 1.2 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT WORKS', title: 'FIVE NOTES', tonic: 4, gap: 0.35, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'CALL AND ANSWER', circle: false, tonic: 4, gap: 0.3, tail: 2.2 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'E MAJOR', tonic: 4, tail: 1.0 },
    { id: 'why4', segs: ['why4', 'why4b'], label: 'WHY IT WORKS', title: 'THE SUN RISES', circle: false, tonic: 4, gap: 0.3, tail: 2.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SUNRISE', accent: true, tonic: 4, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', GREY = '#8a8a92', WHITE = '#ffffff', ORANGE = '#ffa45c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = n => n.replace(/-?\d/, '');
    const midi = n => a.T.midi(n);
    const CH = { E: [['E3', 'G#3', 'B3'], 'E2'], B: [['D#3', 'F#3', 'B3'], 'B1'], A: [['E3', 'A3', 'C#4'], 'A2'] };

    // one instrument plays a phrase; a silent integer note lights the key; returns { end, pts }
    function phrase(list, t0, b, inst, o = {}) {
      let t = t0; const pts = [];
      list.forEach(([n, d]) => {
        a.note(n, t, d * b * 0.92, { vel: o.vel ?? 0.4, show: false, tone: inst });
        if (o.show !== false) a.note(n, t, d * b * 0.92, { vel: 0, show: true });
        pts.push([t, pcOf(n)]); t += d * b;
      });
      return { end: t, pts };
    }
    // soft held chord under a phrase (gentle repeated strikes)
    function pad(c, t0, t1, o = {}) {
      const [notes, bass] = CH[c], len = t1 - t0;
      a.ch(c, t0, t1, { notes: o.notes ?? notes, bass, vel: o.vel ?? 0.3, shape: o.shape, hideName: o.hideName, strikes: [{ o: 0, v: 1 }, { o: len / 2, v: 0.4 }] });
    }
    // flute then oboe, chords E then B; returns end time
    function dialogue(t0, b, o = {}) {
      const f = phrase(FLUTE_PH, t0, b, FLUTE, o);
      pad('E', t0, f.end, o);
      const ob = phrase(OBOE_PH, f.end, b, OBOE, o);
      pad('B', f.end, ob.end, o);
      if (o.walk !== false) {
        a.walker(f.pts, { t1: f.end + 0.3, dr: -40, color: GOLD, label: 'FLUTE', labelDr: -50 });
        a.walker(ob.pts, { t1: ob.end + 0.3, dr: 34, color: TEAL, label: 'OBOE', labelDr: 50 });
      }
      return { mid: f.end, end: ob.end };
    }

    // ---------- hook (cover): five glowing notes, flute and oboe ----------
    a.scale(0.15, 'E', PENTA, { popIn: { t0: 0.2, step: 0.08 } });
    const h = dialogue(0.3, B);
    a.tag(0, 0.3, h.mid, 'FLUTE', { x: 540, y: 462, color: GOLD });
    a.tag(0, h.mid, S('hook').t1, 'OBOE', { x: 540, y: 462, color: TEAL });
    a.ch('E', h.end, S('hook').t1, { notes: CH.E[0], bass: 'E2', vel: 0.3 });

    // ---------- what: Morning Mood, Peer Gynt, 1875 ----------
    const w0 = S('what').t0 + 0.05, wb = (S('what').t1 - w0 - 0.1) / 16;
    dialogue(w0, wb, { vel: 0.3 });
    a.tag(0, a.w('what', 'play') - 0.05, S('what').t1, "IBSEN'S PLAY", { x: 540, y: 462, color: PINK });

    // ---------- what2: the same work as the Mountain King ----------
    const g2 = a.grid([{ label: 'MORNING', sub: 'MOOD', size: 52, color: GOLD }, { label: 'MOUNTAIN', sub: 'KING', size: 52, color: RED }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 420, chh: 260, y: 520, revealStep: 0.15, caption: 'BOTH FROM PEER GYNT' });
    g2.active.push({ t0: S('what2').t0 + 0.1, t1: a.w('what2', 'Hall') - 0.05, i: 0 }, { t0: a.w('what2', 'Hall') - 0.05, t1: S('what2').t1, i: 1 });
    a.big('IN THE HALL OF THE', a.w('what2', 'Hall') - 0.05, S('what2').t1, { y: 960, size: 40, ...MONO, color: WHITE, blur: 4 });
    a.big('MOUNTAIN KING', a.w('what2', 'Mountain') - 0.05, S('what2').t1, { y: 1040, size: 66, color: RED, blur: 18 });
    pad('E', S('what2').t0 + 0.05, S('what2').t1, { shape: false, vel: 0.25 });

    // ---------- desert: Norway? No - Morocco, Act 4 ----------
    const d0 = S('desert').t0, d1 = S('desert').t1;
    const gD = a.grid([{ label: 'NORWAY', sub: 'A FJORD?', size: 52, color: BLUE }, { label: 'MOROCCO', sub: 'THE DESERT', size: 52, color: ORANGE }],
      d0 + 0.1, d1, { rows: 1, cols: 2, cw: 420, chh: 260, y: 520, revealStep: 0.2 });
    const tFj = a.w('desert', 'fjord') - 0.3, tMo = a.w('desert2', 'Moroccan') - 0.05, tNot = a.at('desert3');
    gD.active.push({ t0: tFj, t1: a.at('desert2'), i: 0 }, { t0: tMo, t1: d1, i: 1 });
    a.big('IN THE PLAY', a.at('desert2') + 0.2, tMo, { y: 960, size: 50, ...MONO, color: WHITE, blur: 4 });
    a.big('A DESERT SUNRISE', tMo, d1, { y: 960, size: 64, color: ORANGE, blur: 20 });
    a.big('ACT 4', a.w('desert2', 'Act') - 0.05, d1, { y: 1050, size: 50, ...MONO, color: GOLD, blur: 8 });
    a.big('✕', tNot, d1, { x: 315, y: 650, size: 150, color: RED, blur: 20, family: 'DejaVu Sans' });
    const db = (d1 - d0 - 0.3) / 32;
    dialogue(d0 + 0.1, db, { vel: 0.26, shape: false, show: false, walk: false });
    dialogue(d0 + 0.1 + 16 * db, db, { vel: 0.3, shape: false, show: false, walk: false });

    // ---------- why1: the five notes of E major pentatonic ----------
    const y0 = S('why1').t0, y1 = S('why1').t1;
    const NM = [['E', 0, 'E4'], ['F', 0, 'F#4'], ['G', 0, 'G#4'], ['B', 0, 'B4'], ['C', 0, 'C#5']];
    const tn = NM.map(([w, k]) => a.w('why1b', w, k) - 0.05);
    a.scale(y0, 'E', [], {});
    NM.forEach(([, , n], i) => {
      a.scale(tn[i], 'E', PENTA.slice(0, i + 1));
      a.note(n, tn[i], 0.7, { vel: 0.38, tone: FLUTE });
      a.note(n, tn[i], 0.5, { vel: 0, show: true });
    });
    a.scale(a.w('why1b', 'pentatonic') - 0.05, 'E', PENTA);
    a.tag(0, a.w('why1', 'five') - 0.05, tn[0], '5 NOTES', { x: 540, y: 462, color: GOLD });
    a.tag(0, a.w('why1b', 'major') - 0.05, a.at('why1c'), 'MAJOR PENTATONIC', { x: 540, y: 462, color: GOLD });
    const tNo = a.w('why1c', 'half') - 0.1, tCl = a.w('why1c', 'clashes') - 0.05;
    a.poly(['E', 'F#', 'G#', 'B', 'C#'], tNo, y1, { color: GOLD, glow: true, alpha: 0.7 });
    a.tag(0, tNo, tCl, 'NO HALF STEPS', { x: 540, y: 462, color: TEAL });
    a.tag(0, tCl, y1, 'NOTHING CLASHES', { x: 540, y: 462, color: TEAL });
    a.ch('E', a.at('why1c'), y1, { notes: ['E3', 'B3', 'E4', 'G#4'], bass: 'E2', vel: 0.32, shape: false });
    phrase(FLUTE_PH, a.w('why1c', 'Calm') - 0.05, 0.3, FLUTE, { vel: 0.36 });
    a.ch('E', y0 + 0.1, tn[0], { notes: CH.E[0], bass: 'E2', vel: 0.22, shape: false });

    // ---------- why2: the phrase passes between flute and oboe, like birds ----------
    const z0 = S('why2').t0, z1 = S('why2').t1;
    const cells = [];
    ['FLUTE', 'OBOE'].forEach((ins, r) => [0, 1, 2, 3].forEach(c => cells.push((c % 2) === r ? { label: ins, sub: c < 2 ? 'CALL' : 'AGAIN', size: 34, subSize: 18, color: r ? TEAL : GOLD } : { label: '·', size: 34, color: '#3a3a42' })));
    cells.forEach((c, i) => { if (i >= 4 && c.label === 'OBOE') c.sub = 'ANSWER'; });
    const gW = a.grid(cells, z0 + 0.1, z1, { rows: 2, cols: 4, cw: 240, chh: 170, y: 500, revealStep: 0.04, caption: 'BACK AND FORTH' });
    const p0 = a.w('why2', 'passed') - 0.05, pb = 0.27;
    let t = p0;
    for (let k = 0; k < 4; k++) {
      const fl = k % 2 === 0, len = 8 * pb;
      phrase(fl ? FLUTE_PH : OBOE_PH, t, pb, fl ? FLUTE : OBOE, { vel: 0.4, show: false });
      pad(fl ? 'E' : 'B', t, t + len, { shape: false, vel: 0.24 });
      gW.active.push({ t0: t, t1: t + len, i: fl ? k : 4 + k });
      t += len;
    }
    // the tail: birds calling - short high calls, back and forth
    const tBird = a.w('why2b', 'birds') - 0.05;
    for (let k = 0, u = Math.max(t, tBird); u < z1 - 0.4; k++, u += 0.6) {
      const fl = k % 2 === 0, n = fl ? ['B5', 'G#5'] : ['F#5', 'E5'];
      a.note(midi(n[0]) - 12, u, 0.14, { vel: 0.3, show: false, tone: fl ? FLUTE : OBOE });
      a.note(midi(n[1]) - 12, u + 0.16, 0.22, { vel: 0.26, show: false, tone: fl ? FLUTE : OBOE });
      gW.active.push({ t0: u, t1: u + 0.4, i: fl ? 2 : 7 });
    }
    if (t < z1) pad('E', t, z1, { shape: false, vel: 0.22 });
    a.big('LIKE BIRDS AT DAWN', tBird, z1, { y: 960, size: 54, color: GOLD, blur: 16 });

    // ---------- why3: E major, bright and open ----------
    a.scale(S('why3').t0, 'E');
    const tK = a.w('why3', 'E') - 0.05, tBr = a.w('why3', 'bright') - 0.05;
    a.ch('E', S('why3').t0 + 0.1, tK, { notes: CH.E[0], bass: 'E2', vel: 0.3 });
    a.ch('E', tK, S('why3').t1, { notes: ['E3', 'B3', 'E4', 'G#4', 'B4'], bass: 'E2', vel: 0.5, snap: true });
    a.ring(['E'], tK, S('why3').t1, { color: GOLD });
    a.tag('E', tK, S('why3').t1, 'HOME', { color: GOLD, dr: -92 });
    a.tag(0, tBr, S('why3').t1, 'BRIGHT · OPEN', { x: 540, y: 462, color: GOLD });
    [['E5', 0], ['B4', 0.35], ['G#5', 0.7]].forEach(([n, u]) => a.note(n, tBr + u, 1.2, { vel: 0.3, tone: FLUTE }));

    // ---------- why4: louder and fuller, up to the full orchestra ----------
    const s0 = S('why4').t0, s1 = S('why4').t1;
    const N = 8, tSun = a.w('why4b', 'sun') - 0.05, sl = (tSun - s0 - 0.2) / (N - 1);
    const HGT = [60, 90, 125, 165, 210, 260, 315, 380];
    const COL = [BLUE, BLUE, TEAL, TEAL, GOLD, GOLD, ORANGE, ORANGE];
    const DYN = ['pp', 'p', 'p', 'mp', 'mf', 'f', 'f', 'ff'];
    const VOI = [['B3', 'E4'], ['G#3', 'B3', 'E4'], ['G#3', 'B3', 'E4'], ['E3', 'G#3', 'B3', 'E4'], ['E3', 'G#3', 'B3', 'E4', 'G#4'], ['E3', 'B3', 'E4', 'G#4', 'B4'], ['E3', 'B3', 'E4', 'G#4', 'B4', 'E5'], ['E3', 'G#3', 'B3', 'E4', 'G#4', 'B4', 'E5']];
    const BASS = [null, null, 'E2', 'E2', 'E2', 'E2', 'E2', 'E1'];
    const bars = HGT.map((hh, i) => a.grid([{ label: DYN[i], size: 34, color: COL[i] }], s0 + 0.1 + i * 0.04, s1, { rows: 1, cols: 1, cw: 106, chh: hh, x: 540 + (i - 3.5) * 110, y: 880 - hh }));
    for (let i = 0; i < N; i++) {
      const t = s0 + 0.2 + i * sl, v = 0.15 + i * 0.11, len = i === N - 1 ? s1 - 0.2 - t : sl;
      const c = i % 2 && i < 6 ? 'B' : 'E';
      a.ch(c, t, t + len, { notes: c === 'B' ? ['D#3', 'F#3', 'B3', 'F#4'].slice(0, Math.min(4, 2 + i)) : VOI[i], bass: BASS[i] ? (c === 'B' ? 'B1' : BASS[i]) : false, vel: v, shape: false,
        strikes: [0, 1, 2, 3, 4].map(k => ({ o: k * sl / 2, v: k ? 0.6 : 1 })).filter(s => s.o < len - 0.3) });
      const ph = (i % 2 ? OBOE_PH : FLUTE_PH).slice(0, 3);
      phrase(ph, t, sl / 4, i % 2 ? OBOE : FLUTE, { vel: 0.22 + i * 0.03, show: false });
      if (i >= 6) [0, 0.25, 0.5, 0.75].forEach(k => a.perc('kick', t + k * sl, 0.25 + 0.15 * (i - 6)));
      bars[i].active.push({ t0: t, t1: i === N - 1 ? s1 : t + sl + 0.2, i: 0 });
    }
    a.big('LOUDER · FULLER', a.w('why4', 'louder') - 0.05, a.at('why4b'), { y: 960, size: 50, ...MONO, color: TEAL, blur: 6 });
    a.big('FULL ORCHESTRA', a.w('why4b', 'orchestra') - 0.3, a.w('why4b', 'sun') - 0.05, { y: 960, size: 64, color: ORANGE, blur: 20 });
    a.big('THE SUN IS UP', a.w('why4b', 'sun') - 0.05, s1, { y: 960, size: 72, color: GOLD, blur: 30 });

    // ---------- essence: the dialogue once more, swelling into a full E chord ----------
    a.scale(S('essence').t0, 'E', PENTA);
    const e0 = S('essence').t0 + 0.1, eb = Math.min(0.3, (a.at('cta') - e0) / 16);
    const ed = dialogue(e0, eb, { vel: 0.36 });
    a.ch('E', ed.end, S('essence').t1 - 0.3, { notes: ['E3', 'B3', 'E4', 'G#4', 'B4', 'E5'], bass: 'E2', vel: 0.7 });
    phrase([['E5', 2], ['G#5', 3]], ed.end, 0.4, FLUTE, { vel: 0.3, show: false });
    a.scale(ed.end, 'E');
    a.ring(['E', 'G#', 'B'], ed.end, S('essence').t1, { color: GOLD });
    a.tag(0, a.w('essence', 'Five') - 0.05, a.w('essence', 'crescendo') - 0.05, '5 NOTES · 2 INSTRUMENTS', { x: 540, y: 462, color: TEAL });
    a.tag(0, a.w('essence', 'crescendo') - 0.05, S('essence').t1, 'ONE SLOW CRESCENDO', { x: 540, y: 462, color: GOLD });
    // the circle spells black keys Ab / Eb: in E major they are G sharp and D sharp
    const SP = '#b9b9c2';
    [['hook', 'what'], ['why3', 'why3'], ['essence', 'essence']].forEach(([s, e]) => a.tag(8, S(s).t0 + 0.3, S(e).t1, '= G#', { dr: 150, color: SP }));
    a.tag(8, tn[2], S('why1').t1, '= G#', { dr: 150, color: GOLD });
    a.tag(3, a.w('why3', 'major') - 0.05, S('why3').t1, '= D#', { dr: 150, color: SP });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
