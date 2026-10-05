// The leitmotif: a short idea tied to a character, which returns and changes with the story.
// All music here is an ORIGINAL four-note motif - no copyrighted themes are played.
const RHY = [0.5, 0.5, 0.5, 1.5]; // beats of the four notes
const MOODS = {
  hero:   { mel: ['C4', 'G4', 'E4', 'C5'], dbl: ['C3', 'G3', 'E3', 'C4'], chord: 'C', notes: ['E3', 'G3', 'C4'], bass: 'C2', beat: 0.3, vel: 0.46 },
  sad:    { mel: ['C4', 'G4', 'Eb4', 'C5'], dbl: null, chord: 'Cm', notes: ['Eb3', 'G3', 'C4'], bass: 'C2', beat: 0.62, vel: 0.3 },
  menace: { mel: ['C2', 'F#2', 'Eb2', 'C3'], dbl: ['C3', 'F#3', 'Eb3', 'C4'], chord: 'Cdim', notes: ['C3', 'Eb3', 'F#3'], bass: false, beat: 0.5, vel: 0.4 },
};

module.exports = {
  slug: 'leitmotif',
  title: 'The Leitmotif',
  segments: [
    { id: 'hook',     text: "Before a character even appears, the music already tells you who's coming." },
    { id: 'what',     text: "That's a leitmotif: a short musical idea tied to a character, place or emotion." },
    { id: 'what2',    text: 'It returns again and again, and it changes as the story develops.' },
    { id: 'wagner',   text: "Richard Wagner's operas are the classic example." },
    { id: 'wagner2',  text: 'His Ring cycle, first performed complete in 1876, has dozens of motifs for characters and objects.' },
    { id: 'starwars', text: 'In Star Wars, John Williams gives characters their own themes, like the Imperial March for Darth Vader.' },
    { id: 'jaws',     text: 'And in Jaws, from 1975, just two notes mean the shark is near.' },
    { id: 'why1',     text: 'So why does it work? A motif triggers the memory of a character...' },
    { id: 'why1b',    text: "even when they're not on screen. The music tells the story ahead of the picture." },
    { id: 'why2',     text: 'Change the harmony, the tempo or the instrument, and the motif shows how the character changes.' },
    { id: 'demo1',    text: 'Take four notes. Heroic: major, and loud.' },
    { id: 'demo2',    text: 'Sad: minor, and slow.' },
    { id: 'demo3',    text: 'Menacing: low, and diminished.' },
    { id: 'essence',  text: "Give an idea a melody, and the music can tell you who's coming before they arrive." },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MUSICAL STORYTELLING', title: 'THE LEITMOTIF', accent: true, tonic: 0, min: 5.6 },
    { id: 'what', segs: ['what', 'what2'], label: 'A SHORT MUSICAL IDEA', title: 'LEITMOTIF', tonic: 0, gap: 0.35, tail: 1.2 },
    { id: 'wagner', segs: ['wagner', 'wagner2'], label: 'YOU HEAR IT IN', title: 'The Ring Cycle', sub: 'Richard Wagner · complete 1876', circle: false, tonic: 0, gap: 0.3, tail: 0.8 },
    { id: 'starwars', segs: ['starwars'], label: 'YOU HEAR IT IN', title: 'Star Wars', sub: 'John Williams', circle: false, tonic: 0, tail: 0.9 },
    { id: 'jaws', segs: ['jaws'], label: 'YOU HEAR IT IN', title: 'Jaws', sub: 'John Williams · 1975', circle: false, tonic: 0, tail: 1.2 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'MEMORY', circle: false, tonic: 0, gap: 0.2, tail: 0.9 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'IT CHANGES', tonic: 0, tail: 1.0 },
    { id: 'demo1', segs: ['demo1'], label: 'SAME FOUR NOTES', title: 'HEROIC', tonic: 0, tail: 0.3 + 6 * 0.3 + 0.7 },
    { id: 'demo2', segs: ['demo2'], label: 'SAME FOUR NOTES', title: 'SAD', tonic: 0, tail: 0.3 + 3 * 0.62 + 0.8 },
    { id: 'demo3', segs: ['demo3'], label: 'SAME FOUR NOTES', title: 'MENACING', tonic: 0, tail: 0.3 + 3 * 0.5 + 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: "WHO'S COMING?", accent: true, tonic: 0, gap: 0.5, tail: 2.2 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#8d98ff', RED = '#ff5d6c';
    const bare = n => n.replace(/\d/, '');
    const NOTE = { y: 1110, size: 24, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 };

    // the motif in a mood at t; returns [walker points, end]
    function motif(mood, t, o = {}) {
      const M = MOODS[mood], b = o.beat ?? M.beat, v = (o.vel ?? 1) * M.vel, pts = [];
      let u = 0;
      M.mel.forEach((n, i) => {
        const tn = t + u * b, d = RHY[i] * b * (i === 3 ? (o.hold ?? 1) : 0.92);
        a.note(n, tn, d, { vel: v, show: o.show ?? true });
        if (M.dbl && o.dbl !== false) a.note(M.dbl[i], tn, d, { vel: v * 0.6, show: false });
        pts.push([tn, bare(n)]);
        u += RHY[i];
      });
      return [pts, t + u * b];
    }
    // the harmony under a mood: hero = strong pulses + timpani, sad = soft pad, menace = low tremolo
    function bed(mood, t0, t1, o = {}) {
      const M = MOODS[mood], b = M.beat, strikes = [];
      if (mood === 'hero') for (let s = 0; s < t1 - t0 - 0.05; s += b) strikes.push({ o: s, v: s ? 0.6 : 1 });
      if (mood === 'sad') strikes.push({ o: 0, v: 1 });
      if (mood === 'menace') for (let s = 0; s < t1 - t0 - 0.05; s += 0.11) strikes.push({ o: s, v: 0.45 + 0.1 * Math.sin(s * 9) });
      a.ch(M.chord, t0, t1, { notes: M.notes, bass: M.bass, vel: (o.vel ?? 1) * (mood === 'menace' ? 0.5 : mood === 'sad' ? 0.45 : 0.6), strikes, shape: o.shape ?? true, hideName: o.hideName });
      if (mood === 'hero' && o.timp !== false) for (let s = 0; s < t1 - t0 - 0.05; s += 2 * b) a.perc('kick', t0 + s, 0.5 * (o.vel ?? 1));
      if (mood === 'menace') a.note('C2', t0, t1 - t0, { vel: 0.25 * (o.vel ?? 1), show: false });
    }
    // motif + bed together, from t; the bed lasts until t1
    function play(mood, t, t1, o = {}) {
      const [pts, e] = motif(mood, t, o);
      bed(mood, t, t1, o);
      if (o.walker !== false) a.walker(pts, { t1, dr: -40, color: o.color ?? GOLD, label: o.label, labelDr: -46 });
      return e;
    }

    // hook: the motif, heroic, then answered in minor
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const [hp, h1] = motif('hero', 0.4);
    motif('hero', h1, { hold: 1.4 });
    const h2 = h1 + 3 * 0.3 + 0.5;
    bed('hero', 0.4, h2);
    a.walker(hp, { t1: h2, dr: -40, color: GOLD, label: 'MOTIF', labelDr: -46 });
    play('sad', h2, S('hook').t1, { vel: 0.8, label: 'MOTIF', color: BLUE });

    // what: character, place, emotion; then it returns and changes
    const tCh = a.w('what', 'character'), tPl = a.w('what', 'place'), tEm = a.w('what', 'emotion');
    bed('sad', S('what').t0 + 0.05, tCh - 0.04, { vel: 0.6 });
    a.big('CHARACTER', tCh, tPl, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('PLACE', tPl, tEm, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('EMOTION', tEm, a.at('what2'), { y: 462, size: 44, family: 'DM Mono', weight: 500, color: PINK });
    play('hero', tCh - 0.04, a.at('what2') - 0.05, { vel: 0.6, beat: 0.36 });
    const tRet = a.w('what2', 'returns') - 0.04, tChg = a.w('what2', 'changes') - 0.04;
    bed('hero', a.at('what2') - 0.05, tRet, { vel: 0.4, timp: false });
    play('hero', tRet, tChg, { vel: 0.6, beat: 0.36, timp: false });
    play('sad', tChg, S('what').t1, { vel: 0.8 });
    a.big('IT RETURNS', tRet, tChg, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('IT CHANGES', tChg, S('what').t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: BLUE });

    // wagner: dozens of motifs for characters and objects
    const tDz = a.w('wagner2', 'dozens') - 0.1;
    const cells = Array.from({ length: 12 }, (_, i) => ({ label: 'MOTIF', sub: i % 2 ? 'OBJECT' : 'CHARACTER', size: 32, subSize: 20, color: [GOLD, TEAL, PINK, BLUE][i % 4] }));
    const gw = a.grid(cells, tDz, S('wagner').t1, { rows: 3, cols: 4, cw: 225, chh: 150, y: 470, revealStep: 0.1, caption: 'DOZENS OF MOTIFS' });
    for (let i = 0; i < 12; i++) gw.active.push({ t0: tDz + 0.3 + i * 0.25, t1: tDz + 0.55 + i * 0.25, i });
    a.big('RICHARD WAGNER', S('wagner').t0 + 0.3, tDz, { y: 600, size: 64, color: '#ffffff' });
    a.big('THE CLASSIC EXAMPLE', a.w('wagner', 'classic'), tDz, { y: 700, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('ORIGINAL MOTIF · NOT THE REAL THEMES', S('wagner').t0 + 0.3, S('wagner').t1, NOTE);
    { const t0 = S('wagner').t0 + 0.1, b = 0.48; bed('sad', t0, t0 + 3 * b + 0.3, { vel: 0.6, shape: false }); motif('sad', t0, { beat: b, vel: 0.8, show: false });
      const t2 = t0 + 3 * b + 0.3; bed('hero', t2, S('wagner').t1, { vel: 0.4, shape: false, timp: false }); motif('hero', t2, { beat: 0.5, vel: 0.6, show: false, hold: 2 }); }

    // star wars: a character gets a theme (names only - nothing of the real music)
    const SW = [{ label: 'DARTH VADER', sub: 'CHARACTER', size: 40, color: '#b9b9c2' }, { label: 'IMPERIAL MARCH', sub: 'HIS THEME', size: 40, color: RED }];
    const tIm = a.w('starwars', 'Imperial') - 0.1, tDv = a.w('starwars', 'Darth') - 0.1;
    const gs = a.grid(SW, tIm, S('starwars').t1, { rows: 1, cols: 2, cw: 470, chh: 240, y: 620, revealStep: 0.3 });
    gs.active.push({ t0: tIm, t1: tDv, i: 1 }, { t0: tDv, t1: S('starwars').t1, i: 0 }, { t0: tDv + 0.6, t1: S('starwars').t1, i: 1 });
    a.big('CHARACTERS', a.w('starwars', 'characters'), tIm, { y: 620, size: 60, color: '#ffffff' });
    a.big('GET THEMES', a.w('starwars', 'themes') - 0.2, tIm, { y: 710, size: 60, color: GOLD });
    a.big('ORIGINAL MOTIF · NOT THE REAL THEME', S('starwars').t0 + 0.3, S('starwars').t1, NOTE);
    { const t0 = S('starwars').t0 + 0.1; bed('hero', t0, S('starwars').t1, { vel: 0.45, shape: false, timp: false });
      for (let t = t0; t + 1.2 < S('starwars').t1; t += 2.2) motif('hero', t, { beat: 0.4, vel: 0.6, show: false, dbl: false }); }

    // jaws: two notes = danger (names only)
    const tTwo = a.w('jaws', 'two') - 0.1, tSh = a.w('jaws', 'shark') - 0.1;
    a.big('2 NOTES', tTwo, S('jaws').t1, { y: 640, size: 150, color: '#ffffff', blur: 26 });
    a.big('THE SHARK IS NEAR', tSh, S('jaws').t1, { y: 820, size: 56, family: 'DM Mono', weight: 500, color: RED });
    a.big('ORIGINAL MOTIF · NOT THE REAL THEME', S('jaws').t0 + 0.3, S('jaws').t1, NOTE);
    { const t0 = S('jaws').t0 + 0.1; bed('menace', t0, S('jaws').t1, { vel: 0.7, shape: false }); motif('menace', tSh, { show: false, vel: 0.8 }); }

    // why1: motif -> character; music first, picture second
    const tMem = a.w('why1', 'memory') - 0.1;
    const M1 = [{ label: 'MOTIF', sub: 'YOU HEAR', size: 60, color: GOLD }, { label: 'CHARACTER', sub: 'YOU REMEMBER', size: 50, color: TEAL }];
    const g1 = a.grid(M1, S('why1').t0 + 0.1, a.at('why1b') + 0.1, { rows: 1, cols: 2, cw: 440, chh: 260, y: 600, revealStep: 0.3 });
    const tMot = a.w('why1', 'motif') - 0.04;
    g1.active.push({ t0: tMot, t1: tMem, i: 0 }, { t0: tMem, t1: a.at('why1b') + 0.1, i: 1 });
    bed('hero', S('why1').t0 + 0.1, tMot, { vel: 0.35, shape: false, timp: false });
    play('hero', tMot, a.at('why1b'), { vel: 0.6, shape: false, walker: false, beat: 0.36, timp: false });
    const tNot = a.w('why1b', 'not') - 0.1, tAh = a.w('why1b', 'ahead') - 0.1;
    a.big('NOT ON SCREEN', tNot, tAh, { y: 1000, size: 50, family: 'DM Mono', weight: 500, color: PINK });
    const M2 = [{ label: 'MUSIC', sub: 'FIRST', size: 60, color: GOLD }, { label: 'PICTURE', sub: 'THEN', size: 60, color: '#8a8a92' }];
    const g2 = a.grid(M2, a.at('why1b') + 0.1, S('why1').t1, { rows: 1, cols: 2, cw: 440, chh: 260, y: 600, revealStep: 0.3 });
    const tPic = a.w('why1b', 'picture') - 0.04;
    g2.active.push({ t0: tAh, t1: S('why1').t1, i: 0 }, { t0: tPic + 0.3, t1: S('why1').t1, i: 1 });
    a.big('AHEAD OF THE PICTURE', tAh, S('why1').t1, { y: 1000, size: 46, family: 'DM Mono', weight: 500, color: GOLD });
    bed('sad', a.at('why1b'), tAh, { vel: 0.45, shape: false });
    play('sad', tAh, S('why1').t1, { vel: 0.7, shape: false, walker: false, beat: 0.42 });

    // why2: harmony, tempo, instrument
    a.scale(S('why2').t0, 'C');
    const tH = a.w('why2', 'harmony') - 0.04, tT = a.w('why2', 'tempo') - 0.04, tI = a.w('why2', 'instrument') - 0.04, tS = a.w('why2', 'shows') - 0.04;
    play('hero', S('why2').t0 + 0.1, tH, { vel: 0.6, beat: 0.3, timp: false });
    play('sad', tH, tT, { beat: 0.25, vel: 0.9 });
    play('sad', tT, tI, { beat: 0.45, vel: 0.9 });
    { const [pts] = motif('sad', tI, { beat: 0.3, vel: 0.9, dbl: false });
      ['C5', 'G5', 'Eb5', 'C5'].forEach((n, i) => a.note(n, tI + [0, 0.5, 1, 1.5][i] * 0.3, 0.3, { vel: 0.18, show: false }));
      bed('sad', tI, tS, {}); a.walker(pts, { t1: tS, dr: -40, color: GOLD }); }
    play('menace', tS, S('why2').t1, { vel: 0.7, beat: 0.4, color: RED });
    a.big('HARMONY: MAJOR TO MINOR', tH, tT, { y: 462, size: 40, family: 'DM Mono', weight: 500, color: BLUE });
    a.big('TEMPO: SLOWER', tT, tI, { y: 462, size: 40, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('INSTRUMENT: NEW COLOR', tI, tS, { y: 462, size: 40, family: 'DM Mono', weight: 500, color: PINK });
    a.big('THE CHARACTER CHANGES', tS, S('why2').t1, { y: 462, size: 40, family: 'DM Mono', weight: 500, color: RED });

    // demos: the same four notes, three characters
    const tag = (txt, color, t0, t1) => a.big(txt, t0, t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color });
    // demo1: heroic
    const d1 = a.end('demo1') + 0.2;
    a.ch('C', S('demo1').t0 + 0.1, d1, { notes: MOODS.hero.notes, bass: 'C2', vel: 0.35 });
    a.big('C · G · E · C', a.w('demo1', 'four'), a.w('demo1', 'Heroic'), { y: 462, size: 44, family: 'DM Mono', weight: 500, color: '#ffffff' });
    tag('MAJOR · LOUD', GOLD, a.w('demo1', 'Heroic'), S('demo1').t1);
    { const e = play('hero', d1, d1 + 3 * 0.3, { vel: 1.1, label: 'MOTIF' }); play('hero', e, S('demo1').t1, { vel: 1.1, walker: false, hold: 1.5 }); }
    // demo2: sad
    const d2 = a.end('demo2') + 0.15;
    a.ch('Cm', S('demo2').t0 + 0.05, d2, { notes: MOODS.sad.notes, bass: 'C2', vel: 0.3 });
    tag('MINOR · SLOW', BLUE, a.w('demo2', 'minor'), S('demo2').t1);
    play('sad', d2, S('demo2').t1, { vel: 1.1, label: 'MOTIF', color: BLUE, hold: 1.4 });
    a.tag('Eb', a.w('demo2', 'minor'), S('demo2').t1, 'Eb', { color: BLUE, dr: -92 });
    // demo3: menacing
    const d3 = a.end('demo3') + 0.15;
    bed('menace', S('demo3').t0 + 0.05, d3, { vel: 0.5 });
    tag('LOW · DIMINISHED', RED, a.w('demo3', 'low'), S('demo3').t1);
    play('menace', d3, S('demo3').t1, { vel: 1.1, label: 'MOTIF', color: RED, hold: 1.6 });

    // essence: heroic once more, home on C
    a.scale(S('essence').t0, 'C');
    const e0 = S('essence').t0 + 0.15;
    const e1 = play('sad', e0, e0 + 3 * 0.5 + 0.1, { beat: 0.5, vel: 0.8, color: BLUE });
    const [ep, e2] = motif('hero', e1 + 0.1, { beat: 0.32, vel: 0.9 });
    motif('hero', e2, { beat: 0.32, vel: 0.9, hold: 2.5 });
    bed('hero', e1 + 0.1, S('essence').t1 - 0.3, { vel: 0.9 });
    a.walker(ep, { t1: S('essence').t1, dr: -40, color: GOLD, label: 'MOTIF', labelDr: -46 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
