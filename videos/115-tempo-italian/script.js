// Why tempo markings are in Italian: Largo to Presto, and the metronome that put numbers on them.
// Public-domain pieces are NOT quoted: only a simple original pattern, played at different speeds.
module.exports = {
  slug: 'tempo-italian',
  title: 'Why Tempo Markings Are in Italian',
  segments: [
    { id: 'hook',    text: 'Allegro, Adagio, Presto. Why do composers tell you how fast to play... in Italian?' },
    { id: 'what',    text: 'One word at the top of the page sets the speed of the music.' },
    { id: 'moon',    text: 'The Moonlight Sonata opens Adagio sostenuto. Slow.' },
    { id: 'fifth',   text: 'The Fifth Symphony opens Allegro con brio: fast, with vigour.' },
    { id: 'why1',    text: 'So why Italian? In the 17th and 18th centuries, Italian music dominated Europe.' },
    { id: 'why2',    text: 'Opera, violin making, music printing. Italian became the international language of music.' },
    { id: 'lad1',    text: 'Largo is very slow and broad. Adagio, slow: literally at ease.' },
    { id: 'lad2',    text: 'Andante is a walking pace. Moderato, moderate.' },
    { id: 'lad3',    text: 'Allegro literally means cheerful: fast. And Presto, very fast.' },
    { id: 'metro',   text: 'In 1815, Johann Maelzel patented the mechanical metronome.' },
    { id: 'bpm',     text: 'It counts beats per minute. Sixty BPM is one beat per second.' },
    { id: 'beet1',   text: 'Beethoven was one of the first major composers to add metronome markings.' },
    { id: 'beet2',   text: 'In 1817, he published them for his first eight symphonies.' },
    { id: 'essence', text: 'One word on the page sets the heartbeat of the whole piece.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'LARGO TO PRESTO', title: 'WHY ITALIAN?', accent: true, circle: false, tonic: 0, min: 5.6, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'THE TEMPO MARKING', title: 'ONE WORD', tonic: 0, tail: 0.8 },
    { id: 'moon', segs: ['moon'], label: 'YOU HEAR IT IN', title: 'Moonlight Sonata', sub: 'Beethoven · 1st movement', tonic: 1, tail: 2.2 },
    { id: 'fifth', segs: ['fifth'], label: 'YOU HEAR IT IN', title: 'Fifth Symphony', sub: 'Beethoven · 1st movement', tonic: 0, tail: 1.6 },
    { id: 'why', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'ITALY LED THE WAY', circle: false, tonic: 5, gap: 0.35, tail: 0.5 },
    { id: 'ladder', segs: ['lad1', 'lad2', 'lad3'], label: 'THE TEMPO LADDER', title: 'SLOW TO FAST', circle: false, tonic: 0, gap: 0.45, tail: 1.2 },
    { id: 'metro', segs: ['metro'], label: 'JOHANN MAELZEL', title: 'THE METRONOME', tonic: 0, tail: 1.0 },
    { id: 'bpm', segs: ['bpm'], label: 'BEATS PER MINUTE', title: '60 BPM', circle: false, tonic: 0, tail: 1.1 },
    { id: 'beet', segs: ['beet1', 'beet2'], label: 'METRONOME MARKINGS', title: 'BEETHOVEN', circle: false, tonic: 0, gap: 0.35, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE HEARTBEAT', accent: true, tonic: 0, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', RED = '#ff5d6c', PINK = '#ff7a93', BLUE = '#62a8ff', VIOLET = '#b48cff', GREEN = '#7be07b';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };

    // a metronome click (sound only, above the keyboard range)
    const click = (t, acc = false) => a.note(acc ? 96 : 91, t, 0.03, { vel: acc ? 0.34 : 0.24, show: false, tone: { partials: [1, 0.3, 0.15], attack: 0.001, release: 0.03, decay: 70 } });
    // the original pattern: one note per beat, cycling through `notes`, a bass note every 4 beats
    // returns the beat times; o.g = grid of 4 beat cells to light, o.click = metronome
    function play(t0, t1, beat, notes, o = {}) {
      const ts = [];
      for (let t = t0, i = 0; t < t1 - 0.05; t += beat, i++) {
        ts.push(t);
        a.note(notes[i % notes.length], t, Math.min(beat * 0.95, 1.2), { vel: o.vel ?? 0.3, show: o.show !== false });
        if (o.bass && i % 4 === 0) a.note(o.bass, t, Math.min(beat * 3.8, 3), { vel: (o.vel ?? 0.3) * 0.9, show: false });
        if (o.g) o.g.active.push({ t0: t, t1: t + beat * 0.85, i: i % 4 });
        if (o.click) click(t, i % 4 === 0);
      }
      return ts;
    }
    const PAT = ['C4', 'E4', 'G4', 'E4'];
    const BEATS = [1, 2, 3, 4].map(n => ({ label: String(n), size: 56, color: n === 1 ? GOLD : TEAL }));
    const beatGrid = (t0, t1, y = 930) => a.grid(BEATS, t0, t1, { rows: 1, cols: 4, cw: 170, chh: 130, y });
    const TERMS = [['LARGO', 'VERY SLOW', VIOLET], ['ADAGIO', 'SLOW', BLUE], ['ANDANTE', 'WALKING', TEAL], ['MODERATO', 'MODERATE', GREEN], ['ALLEGRO', 'FAST', GOLD], ['PRESTO', 'VERY FAST', RED]];
    const ladderCells = TERMS.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 40, subSize: 24 }));
    const ladder = (t0, t1, o = {}) => a.grid(ladderCells, t0, t1, { rows: 2, cols: 3, cw: 320, chh: 170, y: 500, ...o });
    // my own speeds for the six words (seconds per beat)
    const SPD = [0.95, 0.78, 0.6, 0.48, 0.36, 0.24];
    // a pendulum ticking over the top of the circle, one swing per beat
    const pendulum = (ts, t1, o = {}) => a.walker(ts.map((t, i) => [t, i % 2 ? 1.3 : 10.7]), { t1, dr: o.dr ?? -92, color: o.color || GOLD });

    // ---- hook: the ladder, the same pattern at Allegro, Adagio, Presto ----
    const h1 = S('hook').t1;
    const g0 = ladder(0.15, h1, { revealStep: 0.06 });
    const bg0 = beatGrid(0.25, h1);
    const tAl = a.w('hook', 'Allegro'), tAd = a.w('hook', 'Adagio'), tPr = a.w('hook', 'Presto'), tWhy = a.w('hook', 'Why');
    play(0.25, tAl, SPD[3], PAT, { g: bg0, bass: 'C3', vel: 0.24 });
    play(tAl, tAd, SPD[4], PAT, { g: bg0, bass: 'C3' });
    play(tAd, tPr, SPD[1], PAT, { g: bg0, bass: 'C3' });
    play(tPr, tWhy + 0.6, SPD[5], PAT, { g: bg0, bass: 'C3' });
    play(tWhy + 0.6, h1, SPD[3], ['C4', 'E4', 'G4', 'C5'], { g: bg0, bass: 'C3', vel: 0.22 });
    g0.active.push({ t0: 0.3, t1: tAl, i: 3 }, { t0: tAl, t1: tAd, i: 4 }, { t0: tAd, t1: tPr, i: 1 }, { t0: tPr, t1: tWhy + 0.6, i: 5 });
    a.big('IN ITALIAN?', a.w('hook', 'Italian'), h1, { y: 1110, size: 44, ...MONO, color: GOLD });

    // ---- what: one word at the top of the page ----
    const w0 = S('what').t0, w1 = S('what').t1;
    a.scale(w0, 'C', [0, 4, 7]);
    const wt = play(w0 + 0.1, w1, SPD[4], PAT, { bass: 'C3' });
    pendulum(wt, w1);
    a.big('Allegro', w0 + 0.2, w1, { y: 840, size: 110, color: '#ffffff' });
    a.big('TEMPO = SPEED', a.w('what', 'speed'), w1, { ...TOP, color: GOLD });

    // ---- Moonlight Sonata: marked Adagio sostenuto (our own slow pattern, not the piece) ----
    const m0 = S('moon').t0, m1 = S('moon').t1;
    a.scale(m0, 'C#', a.T.MINOR);
    const mt = play(m0 + 0.1, m1, 0.85, ['C#4', 'G#4', 'E4', 'G#4'], { bass: 'C#3', vel: 0.28 });
    pendulum(mt, m1, { color: BLUE });
    a.ch('C#m', m0 + 0.1, m1, { notes: ['C#4', 'E4', 'G#4'], bass: false, vel: 0.0001, mute: true });
    a.big('ADAGIO SOSTENUTO', a.w('moon', 'Adagio'), m1, { ...TOP, size: 40, color: BLUE });

    // ---- Fifth Symphony: marked Allegro con brio (our own fast pattern, not the piece) ----
    const f0 = S('fifth').t0, f1 = S('fifth').t1;
    a.scale(f0, 'C', a.T.MINOR);
    const ft = play(f0 + 0.1, f1, 0.27, ['C4', 'Eb4', 'G4', 'Eb4'], { bass: 'C3', vel: 0.32 });
    pendulum(ft, f1, { color: RED });
    a.ch('Cm', f0 + 0.1, f1, { notes: ['C4', 'Eb4', 'G4'], bass: false, vel: 0.0001, mute: true });
    a.big('ALLEGRO CON BRIO', a.w('fifth', 'Allegro'), f1, { ...TOP, size: 40, color: RED });

    // ---- why: Italy in the 17th and 18th centuries ----
    const y0 = S('why').t0, y1 = S('why').t1, t2 = a.at('why2');
    a.big('ITALY', y0 + 0.2, y1, { y: 600, size: 130, color: '#ffffff' });
    a.big('17TH – 18TH CENTURIES', a.w('why1', '17th'), y1, { y: 715, size: 40, ...MONO, color: GOLD });
    const gw = a.grid([{ label: 'OPERA', size: 40, color: PINK }, { label: 'VIOLINS', size: 40, color: TEAL }, { label: 'PRINTING', size: 40, color: BLUE }],
      t2, y1, { rows: 1, cols: 3, cw: 320, chh: 170, y: 800, revealStep: 0.5 });
    gw.active.push({ t0: a.w('why2', 'Opera'), t1: a.w('why2', 'violin'), i: 0 }, { t0: a.w('why2', 'violin'), t1: a.w('why2', 'printing'), i: 1 }, { t0: a.w('why2', 'printing'), t1: a.w('why2', 'Italian'), i: 2 });
    a.big('THE LANGUAGE OF MUSIC', a.w('why2', 'international'), y1, { ...TOP, size: 40, color: GOLD });
    const YP = [['F', ['F3', 'A3', 'C4'], 'F2'], ['Bb', ['F3', 'Bb3', 'D4'], 'Bb2'], ['C', ['E3', 'G3', 'C4'], 'C3'], ['F', ['F3', 'A3', 'C4'], 'F2']];
    const yl = (y1 - y0 - 0.2) / 8;
    for (let k = 0; k < 8; k++) { const [c, n, b] = YP[k % 4]; a.ch(c, y0 + 0.1 + k * yl, y0 + 0.1 + (k + 1) * yl, { notes: n, bass: b, vel: 0.45, hideName: true, shape: false, strikes: [{ o: 0, v: 1 }, { o: yl / 2, v: 0.5 }] }); }

    // ---- ladder: each word lights up, the same pattern at its speed ----
    const l0 = S('ladder').t0, l1 = S('ladder').t1;
    const g1 = ladder(l0 + 0.1, l1, { revealStep: 0.05, caption: 'THE SAME PATTERN, SIX SPEEDS' });
    const bg1 = beatGrid(l0 + 0.1, l1, 950);
    const tw = [a.w('lad1', 'Largo'), a.w('lad1', 'Adagio'), a.w('lad2', 'Andante'), a.w('lad2', 'Moderato'), a.w('lad3', 'Allegro'), a.w('lad3', 'Presto')].map(t => t - 0.05);
    const ends = [...tw.slice(1), l1 - 0.2];
    play(l0 + 0.15, tw[0], SPD[3], PAT, { g: bg1, bass: 'C3', vel: 0.2 });
    tw.forEach((t, i) => { play(t, ends[i], SPD[i], PAT, { g: bg1, bass: 'C3', vel: 0.28 }); g1.active.push({ t0: t, t1: ends[i], i }); });
    a.big('“AT EASE”', a.w('lad1', 'literally'), tw[2], { y: 1120, size: 40, ...MONO, color: BLUE });
    a.big('“CHEERFUL”', a.w('lad3', 'literally'), tw[5], { y: 1120, size: 40, ...MONO, color: GOLD });

    // ---- metro: 1815, the mechanical metronome ticking ----
    const k0 = S('metro').t0, k1 = S('metro').t1;
    a.scale(k0, 'C', [0]);
    const kt = [];
    for (let t = k0 + 0.2; t < k1 - 0.1; t += 0.6) kt.push(t);
    kt.forEach((t, i) => click(t, i % 4 === 0));
    pendulum(kt, k1, { dr: -110 });
    a.big('1815', a.w('metro', '1815') - 0.1, k1, { y: 850, size: 140, color: '#ffffff' });
    a.big('PATENTED', a.w('metro', 'patented'), k1, { y: 960, size: 40, ...MONO, color: GOLD });
    a.ch('C', a.w('metro', 'metronome') - 0.05, k1 - 0.1, { notes: ['C4', 'E4', 'G4'], bass: 'C3', vel: 0.35, hideName: true, shape: false });

    // ---- bpm: sixty beats per minute = one beat per second ----
    const b0 = S('bpm').t0, b1 = S('bpm').t1;
    a.big('60', b0 + 0.1, b1, { y: 650, size: 170, color: '#ffffff' });
    a.big('BEATS PER MINUTE', b0 + 0.3, b1, { y: 770, size: 40, ...MONO, color: GOLD });
    const bg2 = beatGrid(b0 + 0.1, b1, 850);
    const bt = play(b0 + 0.2, b1, 1.0, PAT, { g: bg2, bass: 'C3', vel: 0.24, click: true });
    a.big('1 BEAT = 1 SECOND', a.w('bpm', 'one'), b1, { y: 1080, size: 44, ...MONO, color: TEAL });
    void bt;

    // ---- beet: one of the first, 1817, eight symphonies ----
    const e0 = S('beet').t0, e1 = S('beet').t1, tEight = a.w('beet2', 'eight');
    a.big('ONE OF THE FIRST', a.w('beet1', 'first'), a.at('beet2'), { y: 640, size: 64, color: '#ffffff' });
    a.big('MAJOR COMPOSERS', a.w('beet1', 'major'), a.at('beet2'), { y: 740, size: 40, ...MONO, color: GOLD });
    const bg3 = beatGrid(e0 + 0.15, e1, 1010);
    a.big('1817', a.w('beet2', '1817') - 0.1, e1, { y: 520, size: 90, color: '#ffffff' });
    const SY = [...Array(8)].map((_, i) => ({ label: 'No. ' + (i + 1), size: 40, color: i % 2 ? TEAL : GOLD }));
    const gs = a.grid(SY, a.w('beet2', 'published'), e1, { rows: 2, cols: 4, cw: 220, chh: 150, y: 620, revealStep: 0.08, caption: 'SYMPHONIES 1 – 8' });
    const st = play(e0 + 0.15, e1, 0.5, ['C4', 'E4', 'G4', 'E4', 'D4', 'F4', 'G4', 'F4'], { bass: 'C3', vel: 0.22, show: false });
    st.forEach((t, i) => { bg3.active.push({ t0: t, t1: t + 0.42, i: i % 4 }); if (t > tEight) gs.active.push({ t0: t, t1: t + 0.45, i: i % 8 }); });
    for (let t = e0 + 0.15; t < e1 - 0.1; t += 0.5) click(t);

    // ---- essence: the pattern at a walking pace, the pendulum, home chord ----
    const s0 = S('essence').t0, s1 = S('essence').t1, tC = a.at('cta');
    a.scale(s0, 'C', [0, 4, 7]);
    const et = play(s0 + 0.1, tC, SPD[2], PAT, { bass: 'C3', vel: 0.26 });
    pendulum([...et, tC], s1);
    a.big('ONE WORD', a.w('essence', 'One'), tC, { y: 840, size: 100, color: '#ffffff' });
    a.big('SETS THE PULSE', a.w('essence', 'heartbeat'), s1, { ...TOP, color: GOLD });
    a.ch('C', tC, s1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.7 });
    a.cta(tC + 0.6, 'Leave a song in the comments');
    void PINK;
  },
};
