// Clair de lune, decoded: a blurred 9/8 beat, five flats, pianissimo and chords chosen for colour.
// Audio is NOT the real melody: only a soft, slow Db major texture in its spirit (per the brief).
module.exports = {
  slug: 'clair-de-lune',
  title: 'Clair de Lune, Decoded',
  segments: [
    { id: 'hook',     text: "Some music doesn't march. It floats." },
    { id: 'what',     text: 'This is the world of Clair de lune, by Claude Debussy.' },
    { id: 'whatb',    text: "It's the third movement of his Suite bergamasque." },
    { id: 'what2',    text: 'He began the suite around 1890, and it was published in 1905.' },
    { id: 'play',     text: 'Here is the kind of sound it lives in: soft, slow chords in D flat major.' },
    { id: 'why1',     text: 'So why does it float? First, the meter: nine eight.' },
    { id: 'why1b',    text: 'Three groups of three, played with a very free tempo, called rubato.' },
    { id: 'why1c',    text: 'Together, they blur the beat. Nothing marches.' },
    { id: 'why2',     text: 'Then the key: D flat major has five flats.' },
    { id: 'why2b',    text: 'On the piano, that means lots of black keys, and a soft, rounded sound.' },
    { id: 'why3',     text: "And it's marked pianissimo: very soft." },
    { id: 'why4',     text: "This is Debussy's impressionism: color and atmosphere, instead of strong tension and release." },
    { id: 'why4b',    text: 'Chords are chosen for their sound, not for their pull.' },
    { id: 'essence',  text: 'Blur the beat, soften the chords...' },
    { id: 'essence2', text: 'and music starts to look like moonlight on water.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'CLAIR DE LUNE', accent: true, tonic: 1, min: 5.4 },
    { id: 'what', segs: ['what', 'whatb'], gap: 0.3, label: 'SUITE BERGAMASQUE · III', title: 'CLAIR DE LUNE', sub: 'Claude Debussy', tonic: 1, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'SUITE BERGAMASQUE', title: '1890 → 1905', tonic: 1, circle: false, tail: 0.6 },
    { id: 'play', segs: ['play'], label: 'THE SOUND', title: 'SOFT AND SLOW', sub: 'a texture in Db major', tonic: 1, row: ['Db', 'Bbm', 'Gb', 'Ab'], tail: 10.4 },
    { id: 'why1', segs: ['why1', 'why1b', 'why1c'], label: 'WHY IT FLOATS', title: 'NINE EIGHT', tonic: 1, circle: false, gap: 0.25, tail: 1.0 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT FLOATS', title: 'FIVE FLATS', tonic: 1, gap: 0.3, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'THE MARKING', title: 'PIANISSIMO', tonic: 1, circle: false, tail: 1.8 },
    { id: 'why4', segs: ['why4'], label: 'IMPRESSIONISM', title: 'COLOR, NOT PULL', tonic: 1, circle: false, tail: 0.6 },
    { id: 'why4b', segs: ['why4b'], label: 'IMPRESSIONISM', title: 'COLOR, NOT PULL', tonic: 1, row: ['Db', 'Gb', 'Bbm', 'Ab'], tail: 2.4 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'MOONLIGHT ON WATER', accent: true, tonic: 1, gap: 0.4, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', BLUE = '#62a8ff', RED = '#ff5d6c', MOON = '#dfe6ff';
    const pcOf = n => n.replace(/-?\d/, '');
    // high, open arpeggios (six notes rising, three eighths of space), with a soft low bass
    const V = {
      Db: { arp: ['Ab3', 'Db4', 'F4', 'Ab4', 'Db5', 'F5'], bass: 'Db2' },
      Bbm: { arp: ['F3', 'Bb3', 'Db4', 'F4', 'Bb4', 'Db5'], bass: 'Bb1' },
      Gb: { arp: ['Gb3', 'Bb3', 'Db4', 'Gb4', 'Bb4', 'Db5'], bass: 'Gb2' },
      Ab: { arp: ['Ab3', 'C4', 'Eb4', 'Ab4', 'C5', 'Eb5'], bass: 'Ab2' },
    };
    const SHAPE = { Db: ['Db4', 'F4', 'Ab4'], Bbm: ['Bb3', 'Db4', 'F4'], Gb: ['Gb3', 'Bb3', 'Db4'], Ab: ['Ab3', 'C4', 'Eb4'] };
    // roll one chord over a 9/8 bar (`e` = seconds per eighth); returns the top-note times
    const roll = (c, t0, e, o = {}) => {
      const v = V[c], vel = o.vel ?? 0.2, len = 9 * e;
      a.ch(c, t0, t0 + len, { notes: SHAPE[c], bass: false, mute: true, row: o.row ?? null, hideName: o.hideName });
      a.note(v.bass, t0, len + 0.6, { vel: vel * 1.1, show: false });
      const gaps = o.gaps || [0, 1, 2, 3, 4, 5].map(i => i * e);
      v.arp.forEach((n, i) => a.note(n, t0 + gaps[i], len - gaps[i] + 0.8, { vel: vel * (1 - i * 0.06), show: o.show !== false }));
      return t0 + len;
    };
    const rolls = (names, t0, e, o = {}) => names.reduce((t, c, i) => roll(c, t, e, { ...o, row: o.rows ? o.rows[i] : null }), t0);

    // hook: Db major dots appear, two slow rolls
    a.scale(0.2, 'Db', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.12 } });
    rolls(['Db', 'Gb'], 0.4, 0.3, { vel: 0.18 });
    a.tag('C#', 0.6, S('hook').t1, 'Db', { dr: -75, color: MOON });

    // what: Clair de lune, Debussy
    rolls(['Db', 'Bbm', 'Gb'], S('what').t0 + 0.1, (S('what').t1 - S('what').t0 - 0.2) / 27, { vel: 0.16, hideName: false });
    a.tag('C#', S('what').t0 + 0.1, S('what').t1, 'Db', { dr: -75, color: MOON });

    // what2: begun around 1890, published 1905
    const g2 = a.grid([{ label: '1890', sub: 'BEGUN (AROUND)', size: 80, color: '#8a8a92' }, { label: '1905', sub: 'PUBLISHED', size: 80, color: GOLD }],
      S('what2').t0 + 0.1, S('what2').t1, { rows: 1, cols: 2, cw: 400, chh: 230, y: 620, revealStep: 0.25 });
    g2.active.push({ t0: a.w('what2', '1890') - 0.05, t1: a.w('what2', '1905') - 0.05, i: 0 }, { t0: a.w('what2', '1905') - 0.05, t1: S('what2').t1, i: 1 });
    rolls(['Gb', 'Ab'], S('what2').t0 + 0.1, 0.34, { vel: 0.15, show: false });

    // play: the texture itself, Db - Bbm - Gb - Ab, then home on Db
    const p0 = a.end('play') + 0.3, pe = 0.26;
    const pEnd = rolls(['Db', 'Bbm', 'Gb', 'Ab'], p0, pe, { vel: 0.22, rows: [0, 1, 2, 3] });
    a.ch('Db', pEnd, S('play').t1, { notes: SHAPE.Db, bass: false, mute: true, row: 0 });
    a.note('Db2', pEnd, 2, { vel: 0.22, show: false }); ['Ab3', 'Db4', 'F4', 'Ab4', 'Db5'].forEach((n, i) => a.note(n, pEnd + i * 0.05, 2.2, { vel: 0.14, show: false }));
    a.tag('C#', a.w('play', 'D'), S('play').t1, 'Db', { dr: -75, color: MOON });

    // why1: 9/8 = three groups of three, rubato blurs the beat
    const C3 = ['#62a8ff', '#45d6c8', '#b48cff'];
    const g = a.grid([0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ label: String((i % 3) + 1), size: 54, color: C3[Math.floor(i / 3)] })), S('why1').t0 + 0.1, S('why1').t1,
      { rows: 1, cols: 9, cw: 108, chh: 170, y: 640, revealStep: 0.05, caption: '9 / 8  =  3 GROUPS OF 3' });
    a.big('9 / 8', a.w('why1', 'nine'), S('why1').t1, { y: 520, size: 96, family: 'DM Mono', weight: 500, color: '#ffffff' });
    // straight eighths in groups of three
    const ARP9 = ['Db4', 'F4', 'Ab4', 'Db5', 'Ab4', 'F4', 'Db5', 'F5', 'Ab4'];
    const e0 = a.w('why1b', 'Three') - 0.1, ee = 0.26;
    ARP9.forEach((n, i) => { a.note(n, e0 + i * ee, ee * 2.5, { vel: i % 3 ? 0.14 : 0.22, show: false }); g.active.push({ t0: e0 + i * ee, t1: e0 + (i + 1) * ee, i }); });
    a.note('Db2', e0, 9 * ee, { vel: 0.18, show: false });
    // rubato: the same nine notes, stretched and squeezed
    const tRub = a.w('why1b', 'free') - 0.1;
    const RG = [0, 0.42, 0.74, 1.0, 1.22, 1.46, 1.78, 2.2, 2.75];
    ARP9.forEach((n, i) => { a.note(n, tRub + RG[i], 1.4, { vel: 0.17, show: false }); g.active.push({ t0: tRub + RG[i], t1: tRub + (RG[i + 1] ?? RG[i] + 0.6), i }); });
    a.note('Gb2', tRub, 3.2, { vel: 0.16, show: false });
    a.big('RUBATO', a.w('why1b', 'rubato'), a.at('why1c'), { y: 960, size: 64, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('BLURRED BEAT', a.w('why1c', 'blur'), S('why1').t1, { y: 960, size: 64, color: MOON, blur: 40 });
    const tBl = a.at('why1c');
    ['Ab3', 'Db4', 'F4', 'Ab4', 'Db5', 'F5'].forEach((n, i) => a.note(n, tBl + [0, 0.5, 0.75, 1.3, 1.5, 2.2][i], 2.4, { vel: 0.14, show: false }));
    a.note('Db2', tBl, 3.5, { vel: 0.16, show: false });

    // why2: five flats -> lots of black keys
    a.scale(S('why2').t0, 'Db');
    const FLATS = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
    const tF = a.w('why2', 'five');
    a.ring(FLATS, tF, S('why2').t1, { color: MOON });
    a.tag('C#', S('why2').t0 + 0.2, S('why2').t1, 'Db', { dr: -75, color: MOON });
    a.tag('F#', tF, S('why2').t1, 'Gb', { dr: -75, color: MOON });
    a.ch('Db', S('why2').t0 + 0.1, tF, { notes: SHAPE.Db, bass: false, mute: true });
    a.note('Db2', S('why2').t0 + 0.1, 2, { vel: 0.18, show: false }); SHAPE.Db.forEach(n => a.note(n, S('why2').t0 + 0.15, 1.8, { vel: 0.12 }));
    a.ch('Db', tF, a.w('why2b', 'soft') - 0.1, { notes: ['Db4', 'Eb4', 'Gb4', 'Ab4', 'Bb4'], bass: false, mute: true, label: '5 FLATS' });
    ['Db4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'C5', 'Db5'].forEach((n, i) => a.note(n, tF + i * 0.22, 0.6, { vel: 0.2 }));
    const tBk = a.w('why2b', 'black') - 0.1;
    ['Db4', 'Eb4', 'Gb4', 'Ab4', 'Bb4', 'Db5', 'Eb5', 'Gb5'].forEach((n, i) => a.note(n, tBk + i * 0.16, 1.4, { vel: 0.16 }));
    a.tag(0, tBk, S('why2').t1, 'BLACK KEYS: 5 OF 7 NOTES', { x: 540, y: 455, color: MOON });
    const tSoft = a.w('why2b', 'soft') - 0.1;
    roll('Gb', tSoft, 0.28, { vel: 0.18, hideName: false });

    // why3: pp = very soft (the quietest roll in the video)
    a.big('pp', S('why3').t0 + 0.3, S('why3').t1, { y: 700, size: 260, family: 'DM Mono', weight: 400, color: MOON, blur: 30 });
    a.big('PIANISSIMO', a.w('why3', 'pianissimo'), S('why3').t1, { y: 900, size: 56, family: 'DM Mono', weight: 500, color: '#b9b9c2', blur: 0 });
    a.big('VERY SOFT', a.w('why3', 'very'), S('why3').t1, { y: 990, size: 64, color: GOLD });
    rolls(['Db'], S('why3').t0 + 0.2, 0.34, { vel: 0.1, show: false });

    // why4: colour and atmosphere instead of tension and release
    const g4 = a.grid([{ label: 'COLOR', sub: '+ ATMOSPHERE', size: 64, color: GOLD }, { label: 'TENSION', sub: '+ RELEASE', size: 64, color: RED }],
      S('why4').t0 + 0.1, S('why4').t1, { rows: 1, cols: 2, cw: 440, chh: 230, y: 620, revealStep: 0.25 });
    g4.active.push({ t0: a.w('why4', 'color') - 0.05, t1: a.w('why4', 'instead'), i: 0 }, { t0: a.w('why4', 'tension') - 0.05, t1: a.w('why4', 'release') + 0.4, i: 1 },
      { t0: a.w('why4', 'release') + 0.4, t1: S('why4').t1, i: 0 });
    a.big('INSTEAD OF', a.w('why4', 'instead'), S('why4').t1, { y: 940, size: 48, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 });
    rolls(['Gb', 'Db'], S('why4').t0 + 0.2, 0.34, { vel: 0.16, show: false });
    // a quick, strong pull for contrast on "tension and release": Ab7 -> Db, louder
    const tT = a.w('why4', 'tension') - 0.05, tRel = a.w('why4', 'release') - 0.05;
    ['Ab2', 'Eb3', 'Gb3', 'C4'].forEach(n => a.note(n, tT, tRel - tT, { vel: 0.22, show: false }));
    ['Db3', 'F3', 'Ab3', 'Db4'].forEach(n => a.note(n, tRel, 0.9, { vel: 0.22, show: false }));

    // why4b: chords for their sound, floating with no arrows
    const f0 = S('why4b').t0 + 0.1;
    rolls(['Db', 'Gb', 'Bbm', 'Ab'], f0, (S('why4b').t1 - f0) / 36, { vel: 0.19, rows: [0, 1, 2, 3], hideName: true });
    a.tag(0, a.w('why4b', 'sound'), S('why4b').t1, 'SOUND, NOT PULL', { x: 540, y: 830, color: GOLD });

    // essence: the texture once more, a moonlight walker drifting over the top notes, ending on Db
    a.scale(S('essence').t0, 'Db');
    const n0 = S('essence').t0 + 0.1, ne = (S('essence').t1 - n0 - 2.0) / 36;
    const nEnd = rolls(['Db', 'Bbm', 'Gb', 'Ab'], n0, ne, { vel: 0.2, rows: [null, null, null, null] });
    const tops = ['Db', 'F', 'Db', 'F', 'Bb', 'Db', 'Gb', 'Bb', 'Db', 'Ab', 'C', 'Eb'];
    a.walker(tops.map((p, i) => [n0 + i * 3 * ne + 1.5 * ne, p]), { t1: S('essence').t1, dr: -40, color: MOON });
    a.ch('Db', nEnd, S('essence').t1 - 0.3, { notes: SHAPE.Db, bass: false, mute: true });
    a.note('Db2', nEnd, 3, { vel: 0.2, show: false }); ['Ab3', 'Db4', 'F4', 'Ab4', 'Db5', 'F5'].forEach((n, i) => a.note(n, nEnd + i * 0.12, 3, { vel: 0.13, show: false }));
    a.tag('C#', nEnd, S('essence').t1, 'HOME', { dr: -75, color: MOON });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
