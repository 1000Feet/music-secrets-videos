// The half step: the smallest interval, the rub that makes tension, and the pull home.
module.exports = {
  slug: 'half-step',
  title: 'The Half Step',
  segments: [
    { id: 'hook',    text: 'Two notes, right next to each other. Nothing could be simpler... or scarier.' },
    { id: 'what',    text: "Go from E to the very next key, F. That's a half step: a ratio of about sixteen to fifteen." },
    { id: 'jaws',    text: "It's the shark in Jaws: just E and F, faster and faster..." },
    { id: 'elise',   text: 'the gentle rocking at the start of Für Elise...' },
    { id: 'lead',    text: 'and the pull that ends almost every song: B rising to C.' },
    { id: 'why1',    text: 'So why is it so tense? Two notes this close make their waves rub.' },
    { id: 'why2',    text: 'They interfere, and you hear a rough, buzzing beat. Your ear hears it as tension.' },
    { id: 'chrom',   text: 'Twelve half steps make the whole octave: the chromatic scale.' },
    { id: 'pull',    text: "When a half step resolves, B up to C, F down to E, it's the strongest pull in harmony." },
    { id: 'jaws2',   text: 'Jaws never resolves. It just keeps you waiting... that is suspense.' },
    { id: 'elise2',  text: 'Für Elise rocks on a half step too, but softly. Gentle tension instead of fear.' },
    { id: 'elise3',  text: 'Tempo and loudness change the meaning.' },
    { id: 'essence', text: 'The smallest step carries the biggest tension: fear, longing, or the final pull home.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'THE SMALLEST STEP', title: 'THE HALF STEP', accent: true, tonic: 0, min: 5.0 },
    { id: 'what', segs: ['what'], label: 'ONE KEY OVER', title: 'E TO F', tonic: 0, tail: 0.9 },
    { id: 'jaws', segs: ['jaws'], label: 'YOU HEAR IT IN', title: 'Jaws', sub: 'John Williams · 1975', tonic: 4, tail: 2.6 },
    { id: 'elise', segs: ['elise'], label: 'YOU HEAR IT IN', title: 'Für Elise', sub: 'Ludwig van Beethoven · 1810', tonic: 9, tail: 2.8 },
    { id: 'lead', segs: ['lead'], label: 'YOU HEAR IT IN', title: 'Almost Every Ending', sub: 'The leading tone · B to C', tonic: 0, tail: 1.6 },
    { id: 'why1', segs: ['why1', 'why2'], label: 'WHY IT WORKS', title: 'THE RUB', circle: false, gap: 0.4, tail: 0.9 },
    { id: 'chrom', segs: ['chrom'], label: 'THE CHROMATIC SCALE', title: 'TWELVE STEPS', tonic: 0, tail: 1.2 },
    { id: 'pull', segs: ['pull'], label: 'WHY IT WORKS', title: 'THE STRONGEST PULL', tonic: 0, tail: 1.0 },
    { id: 'jaws2', segs: ['jaws2'], label: 'NO RESOLUTION', title: 'SUSPENSE', tonic: 4, tail: 1.0 },
    { id: 'elise2', segs: ['elise2', 'elise3'], label: 'SAME STEP', title: 'NEW MEANING', tonic: 9, gap: 0.4, tail: 1.0 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'SMALL STEP, BIG PULL', accent: true, tonic: 0, gap: 0.5, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const RED = '#ff5d6c', GOLD = '#ffcf5a', TEAL = '#45d6c8';
    // E/F alternation, the gap between notes shrinking from g0 to g1
    // silent two-note shape with a name in the centre of the circle
    const pair = (lo, hi, label, t0, t1) => a.ch(lo.replace(/\d/, ''), t0, t1, { notes: [lo, hi], bass: false, mute: true, label });
    const rock = (lo, hi, t0, t1, g0, g1, vel, show = true) => {
      const pts = []; let t = t0, i = 0;
      while (t < t1 - 0.05) {
        const k = (t - t0) / (t1 - t0), g = g0 + (g1 - g0) * k;
        const n = i % 2 ? hi : lo;
        a.note(n, t, Math.min(g * 0.9, 0.5), { vel, show });
        pts.push([t, n.replace(/-?\d/, '')]);
        t += g; i++;
      }
      return pts;
    };

    // hook: two neighbours, E and F, rocking
    a.scale(0.2, 'C', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.1 } });
    a.ring(['E', 'F'], 0.9, 2.4, { color: GOLD });
    a.arc('E', 'F', 1.0, S('hook').t1, { steps: 1, color: GOLD });
    const hp = rock('E3', 'F3', 0.9, S('hook').t1 - 0.2, 0.7, 0.35, 0.3, false);
    a.walker(hp, { t1: S('hook').t1, dr: -40, color: GOLD });
    pair('E4', 'F4', 'E – F', 1.0, S('hook').t1);

    // what: one key over, about 16:15
    const tE = a.w('what', 'E'), tF = a.w('what', 'F');
    a.walker([[tE, 'E'], [tF, 'F']], { t1: S('what').t1, dr: -40, color: GOLD });
    a.note('E4', tE, 0.6, { vel: 0.32 }); a.note('F4', tF, 0.8, { vel: 0.32 });
    a.arc('E', 'F', tF, S('what').t1, { steps: 1, color: GOLD });
    a.tag('F', a.w('what', 'half'), S('what').t1, 'HALF STEP', { color: GOLD, x: 540, y: 905 });
    pair('E4', 'F4', 'E – F', tF, S('what').t1);
    a.big('≈ 16 : 15', a.w('what', 'sixteen'), S('what').t1, { y: 440, size: 64, family: 'DM Mono', weight: 500, color: GOLD });

    // jaws: only E2 and F2, getting faster
    const jp = rock('E2', 'F2', a.w('jaws', 'E'), S('jaws').t1 - 0.1, 0.65, 0.14, 0.5, false);
    a.walker(jp, { t1: S('jaws').t1, dr: -40, color: RED });
    a.arc('E', 'F', a.w('jaws', 'E'), S('jaws').t1, { steps: 1, color: RED });
    a.tag('E', a.w('jaws', 'faster'), S('jaws').t1, 'FASTER', { color: RED, x: 540, y: 905 });
    pair('E2', 'F2', 'E – F', a.w('jaws', 'E'), S('jaws').t1);

    // für elise (public domain): E D# E D# E B D C A, then the A minor bass
    a.scale(S('elise').t0, 'A', a.T.MINOR);
    const f0 = a.end('elise') + 0.1, fb = 0.2;
    const tA = a.melody([['E5', 1], ['D#5', 1], ['E5', 1], ['D#5', 1], ['E5', 1], ['B4', 1], ['D5', 1], ['C5', 1]], f0, fb, { vel: 0.38 });
    a.note('A4', tA, 1.2, { vel: 0.38 });
    [['A2', 0], ['E3', 1], ['A3', 2]].forEach(([n, i]) => a.note(n, tA + i * fb, 1.0 - i * fb, { vel: 0.3, show: false }));
    a.walker([0, 1, 2, 3, 4].map(i => [f0 + i * fb, i % 2 ? 'D#' : 'E']), { t1: S('elise').t1, dr: -40, color: TEAL });
    a.tag('E', f0 + 0.2, S('elise').t1, 'HALF STEP', { color: TEAL, x: 540, y: 458 });
    pair('E5', 'D#5', 'E – D#', f0, S('elise').t1);

    // lead: G to C, the leading tone B rises
    a.scale(S('lead').t0, 'C');
    const tB = a.w('lead', 'B') - 0.05, tC = a.w('lead', 'C') - 0.05;
    a.ch('G', S('lead').t0 + 0.1, tC, { notes: ['B3', 'D4', 'G4'], bass: 'G2', vel: 0.65 });
    a.ring(['B'], tB, tC, { color: GOLD });
    a.ch('C', tC, S('lead').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3' });
    a.arc('B', 'C', tC, S('lead').t1, { steps: 1, color: GOLD });
    a.tag('C', tC + 0.2, S('lead').t1, 'HOME', { dr: -75 });

    // why: two close waves rub -> beats
    const tW = a.w('why1', 'waves') - 0.4;
    a.lissajous(16, 15, tW, S('why1').t1, { drawIn: 2.5, labelA: 'F × 16', labelB: 'E × 15', drift: 0.6, res: 6000, color: RED, colorA: GOLD, colorB: '#ff7a93' });
    a.note('E4', tW, S('why1').t1 - tW - 0.3, { vel: 0.22, show: false });
    a.note('F4', tW, S('why1').t1 - tW - 0.3, { vel: 0.22, show: false });
    a.big('BUZZ', a.w('why2', 'buzzing'), a.w('why2', 'Your'), { y: 440, size: 64, family: 'DM Mono', weight: 500, color: RED });
    a.big('TENSION', a.w('why2', 'tension'), S('why1').t1, { y: 440, size: 64, family: 'DM Mono', weight: 500, color: RED });

    // chromatic: all twelve, one by one
    const tT = a.w('chrom', 'Twelve');
    a.scale(tT, 'C', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], { popIn: { t0: tT, step: 0.2 } });
    const cp = [];
    for (let i = 0; i <= 12; i++) { a.note(60 + i, tT + i * 0.2, 0.25, { vel: 0.22, show: false }); cp.push([tT + i * 0.2, i % 12]); }
    a.walker(cp, { t1: S('chrom').t1, dr: -40, color: GOLD });
    a.big('12 × ½ = 1 OCTAVE', a.w('chrom', 'octave'), S('chrom').t1, { y: 440, size: 52, family: 'DM Mono', weight: 500, color: GOLD });

    // pull: G7 resolves by two half steps
    a.scale(S('pull').t0, 'C');
    const tStrong = a.w('pull', 'strongest') - 0.05;
    a.ch('G7', S('pull').t0 + 0.1, tStrong, { notes: ['B3', 'D4', 'F4', 'G4'], bass: 'G2', vel: 0.75 });
    a.arc('B', 'C', a.w('pull', 'B'), S('pull').t1, { steps: 1, color: TEAL, label: 'UP', labelR: 345 });
    a.arc('F', 'E', a.w('pull', 'F'), S('pull').t1, { steps: -1, color: TEAL, label: 'DOWN', labelR: 345 });
    a.ch('C', tStrong, S('pull').t1, { notes: ['C4', 'E4', 'G4'], bass: 'C3' });
    a.tag('C', tStrong + 0.2, S('pull').t1, 'HOME', { dr: -75 });

    // jaws2: E and F forever, never home
    const j2 = rock('E2', 'F2', S('jaws2').t0 + 0.2, S('jaws2').t1 - 0.1, 0.45, 0.3, 0.4, false);
    a.walker(j2, { t1: S('jaws2').t1, dr: -40, color: RED });
    a.arc('E', 'F', S('jaws2').t0 + 0.2, S('jaws2').t1, { steps: 1, color: RED });
    a.tag('E', a.w('jaws2', 'waiting'), S('jaws2').t1, 'WAITING...', { color: RED, x: 540, y: 905 });
    pair('E2', 'F2', 'E – F', S('jaws2').t0 + 0.2, S('jaws2').t1);

    // elise2: the same rocking, soft and slow
    a.scale(S('elise2').t0, 'A', a.T.MINOR);
    const e2 = rock('E5', 'D#5', S('elise2').t0 + 0.2, a.at('elise3'), 0.4, 0.4, 0.2, false);
    a.walker(e2, { t1: a.at('elise3'), dr: -40, color: TEAL });
    a.arc('E', 'D#', S('elise2').t0 + 0.2, a.at('elise3') + 1.6, { steps: -1, color: TEAL });
    a.arc('E', 'F', a.at('elise3') + 1.7, S('elise2').t1, { steps: 1, color: RED });
    a.tag('E', a.w('elise2', 'Gentle'), a.at('elise3'), 'GENTLE', { color: TEAL, x: 540, y: 905 });
    pair('E5', 'D#5', 'E – D#', S('elise2').t0 + 0.2, a.at('elise3') + 1.6);
    pair('E2', 'F2', 'E – F', a.at('elise3') + 1.7, S('elise2').t1);
    // elise3: tempo and loudness: slow and soft vs fast and loud
    const t3 = a.at('elise3');
    rock('E5', 'D#5', t3, t3 + 1.6, 0.4, 0.4, 0.18);
    rock('E2', 'F2', t3 + 1.7, S('elise2').t1 - 0.1, 0.16, 0.13, 0.45);
    a.tag('E', t3, t3 + 1.6, 'SLOW + SOFT', { color: TEAL, x: 540, y: 905 });
    a.tag('E', t3 + 1.7, S('elise2').t1, 'FAST + LOUD', { color: RED, x: 540, y: 905 });

    // essence: rub, fear, longing, then the final pull home
    a.scale(S('essence').t0, 'C');
    const s0 = S('essence').t0 + 0.1, tFear = a.w('essence', 'fear'), tLong = a.w('essence', 'longing');
    const tFin = a.w('essence', 'final'), tHome = a.w('essence', 'home') - 0.05;
    a.note('E4', s0, tFear - s0, { vel: 0.22 }); a.note('F4', s0, tFear - s0, { vel: 0.22 });
    a.arc('E', 'F', s0, tFin, { steps: 1, color: GOLD });
    const ef = rock('E2', 'F2', tFear, tLong, 0.2, 0.14, 0.42, false);
    a.walker(ef, { t1: tLong, dr: -40, color: RED });
    const el = rock('E5', 'D#5', tLong, tFin, 0.32, 0.32, 0.22, false);
    a.walker(el, { t1: tFin, dr: -40, color: TEAL });
    pair('E4', 'F4', 'E – F', s0, tLong);
    pair('E5', 'D#5', 'E – D#', tLong, tFin - 0.05);
    a.tag('E', tFear, tLong, 'FEAR', { color: RED, x: 540, y: 905 });
    a.tag('E', tLong, tFin - 0.05, 'LONGING', { color: TEAL, x: 540, y: 905 });
    a.ch('G7', tFin - 0.05, tHome, { notes: ['B3', 'D4', 'F4', 'G4'], bass: 'G2', vel: 0.8 });
    a.ch('C', tHome, S('essence').t1 - 0.3, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2' });
    a.arc('B', 'C', tHome, S('essence').t1, { steps: 1, color: TEAL });
    a.arc('F', 'E', tHome, S('essence').t1, { steps: -1, color: TEAL });
    a.tag('C', tHome + 0.2, S('essence').t1, 'HOME', { dr: -75 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
