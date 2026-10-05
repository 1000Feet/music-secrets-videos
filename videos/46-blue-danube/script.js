// The Blue Danube, decoded: oom-pah-pah in 3/4, and a melody that climbs the home chord.
const BEAT = 0.35, BAR = 3 * BEAT;
// main theme (public domain, simplified): pickup D, then D F# A | A | - A A | - F# F#  ([note, beats], null = rest)
const THEME = [['D4', 1], ['D4', 1], ['F#4', 1], ['A4', 1], ['A4', 3], [null, 1], ['A5', 1], ['A5', 1], [null, 1], ['F#5', 1], ['F#5', 1]];
const THEME_BEATS = 13; // pickup + four bars

module.exports = {
  slug: 'blue-danube',
  title: 'The Blue Danube',
  segments: [
    { id: 'hook',    text: 'Three beats, one melody climbing slowly... and you are floating through space.' },
    { id: 'what',    text: 'This is The Blue Danube, a waltz by Johann Strauss the Second, composed in 1866 and 1867.' },
    { id: 'what2',   text: 'A century later, Stanley Kubrick used it for the spaceship scenes in 2001: A Space Odyssey.' },
    { id: 'play',    text: "Here's the main theme." },
    { id: 'why1',    text: 'So why does it make you want to dance? Count along: one, two, three.' },
    { id: 'why2',    text: 'The bass lands on one. The chord answers on two and three.' },
    { id: 'why3',    text: 'One strong beat and two light ones feels like turning in a circle...' },
    { id: 'why3b',   text: 'which is exactly the dance.' },
    { id: 'arp',     text: 'And the melody simply climbs the notes of the home chord: D, F sharp, A.' },
    { id: 'arp2',    text: 'An arpeggio. Calm, spacious, opening up.' },
    { id: 'lilt',    text: 'In a Viennese waltz, the second beat is often played slightly early.' },
    { id: 'lilt2',   text: 'A famous little lilt.' },
    { id: 'essence', text: 'One heavy beat, two light ones... and the whole room starts to spin.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'DECODED', title: 'THE BLUE DANUBE', accent: true, tonic: 2, min: THEME_BEATS * BEAT + 1.0 },
    { id: 'what', segs: ['what'], label: 'A WALTZ IN D MAJOR', title: 'THE BLUE DANUBE', sub: 'Johann Strauss II · 1866–67', tonic: 2, tail: 0.6 },
    { id: 'what2', segs: ['what2'], label: 'STANLEY KUBRICK · 1968', title: '2001: A SPACE ODYSSEY', circle: false, tonic: 2, tail: 0.8 },
    { id: 'play', segs: ['play'], label: 'THE MAIN THEME', title: 'THE BLUE DANUBE', sub: 'Strauss II · in 3/4 · in D', tonic: 2, tail: 2 * THEME_BEATS * BEAT + 1.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'COUNT TO THREE', circle: false, tonic: 2, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'OOM, PAH, PAH', circle: false, tonic: 2, tail: 1.2 },
    { id: 'why3', segs: ['why3', 'why3b'], label: 'ONE STRONG, TWO LIGHT', title: 'TURNING IN A CIRCLE', tonic: 2, gap: 0.2, tail: 1.4 },
    { id: 'arp', segs: ['arp', 'arp2'], label: 'THE MELODY', title: 'UP THE HOME CHORD', tonic: 2, gap: 0.3, tail: 1.4 },
    { id: 'lilt', segs: ['lilt', 'lilt2'], label: 'THE VIENNESE WALTZ', title: 'A LITTLE LILT', circle: false, tonic: 2, gap: 0.3, tail: 1.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE ROOM SPINS', accent: true, tonic: 2, gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff';
    const CH = { D: { notes: ['F#3', 'A3', 'D4'], bass: 'D2' }, A7: { notes: ['G3', 'A3', 'C#4'], bass: 'A2' } };
    const BEATS = [{ label: 'OOM', sub: 'ONE', color: PINK, size: 66 }, { label: 'pah', sub: 'TWO', color: TEAL, size: 58 }, { label: 'pah', sub: 'THREE', color: TEAL, size: 58 }];
    const GRID = { rows: 1, cols: 3, cw: 290, chh: 290, y: 600 };
    const BIG = { y: 1030, size: 56, family: 'DM Mono', weight: 500 };

    // oom-pah-pah: bass on beat 1, chord on beats 2 and 3; `early` moves beat 2 forward (the lilt)
    function waltz(t0, t1, o = {}) {
      const out = [];
      for (let t = t0, k = 0; t + BAR <= t1 + 0.02; t += BAR, k++) {
        const name = typeof o.chord === 'function' ? o.chord(k) : (o.chord || 'D');
        const b2 = BEAT * (1 - (o.early ?? 0));
        a.ch(name, t, t + BAR, { ...CH[name], vel: o.vel ?? 0.6, shape: o.shape ?? true, strikes: [{ o: b2, v: 0.75 }, { o: 2 * BEAT, v: 0.6 }], hideName: o.hideName });
        if (o.grid) [[t, t + b2, 0], [t + b2, t + 2 * BEAT, 1], [t + 2 * BEAT, t + BAR, 2]].forEach(([x0, x1, i]) => o.grid.active.push({ t0: x0, t1: x1, i }));
        if (o.perc) { a.perc('kick', t, 0.45); a.perc('hat', t + b2, 0.3); a.perc('hat', t + 2 * BEAT, 0.25); }
        out.push(t);
      }
      return out;
    }
    // the theme starting with its pickup at tp; returns walker points
    function theme(tp, o = {}) {
      let t = tp; const pts = [];
      for (const [n, b] of THEME) { if (n) { a.note(n, t, b * BEAT * 0.92, { vel: o.vel ?? 0.38, show: o.show ?? true }); pts.push([t, n.replace(/\d/, '')]); } t += b * BEAT; }
      return pts;
    }

    // hook: the theme over oom-pah-pah
    a.scale(0.2, 'D', a.T.MAJOR, { popIn: { t0: 0.3, step: 0.08 } });
    const hp = 0.35, hb = hp + BEAT;
    a.walker(theme(hp, { vel: 0.34 }), { t1: S('hook').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    waltz(hb, S('hook').t1, { vel: 0.5 });

    // what: a waltz in D
    const w0 = S('what').t0 + 0.05;
    waltz(w0, S('what').t1, { vel: 0.5 });
    a.tag('D', a.w('what', 'waltz'), S('what').t1, '3/4 · HOME KEY: D MAJOR', { x: 540, y: 455 });

    // what2: Kubrick, 1968
    a.big('2001', S('what2').t0 + 0.2, S('what2').t1, { y: 680, size: 220, color: BLUE, blur: 36 });
    a.big('SPACESHIP SCENES', a.w('what2', 'spaceship'), S('what2').t1, { y: 860, size: 44, family: 'DM Mono', weight: 500, color: '#ffffff', blur: 10 });
    a.big('A CENTURY LATER', a.w('what2', 'century'), a.w('what2', 'spaceship'), { y: 860, size: 44, family: 'DM Mono', weight: 500, color: '#8a8a92', blur: 0 });
    waltz(S('what2').t0 + 0.05, S('what2').t1, { vel: 0.45, shape: false });
    for (let t = S('what2').t0 + 0.05, k = 0; t < S('what2').t1 - BAR; t += BAR, k++) a.note(['A5', 'F#5'][k % 2], t + BEAT, 2 * BEAT, { vel: 0.18, show: false });

    // play: the theme twice, then home
    const pp = a.end('play') + 0.25, pb = pp + BEAT;
    a.ch('D', S('play').t0 + 0.05, pp, { ...CH.D, vel: 0.35 });
    const pts = [...theme(pp), ...theme(pp + (THEME_BEATS - 1) * BEAT)];
    a.walker(pts, { t1: S('play').t1, dr: -40, color: GOLD, label: 'MELODY', labelDr: -46 });
    const pEnd = pp + (2 * THEME_BEATS - 1) * BEAT;
    waltz(pb, pEnd, { vel: 0.6, perc: true });
    a.ch('D', pEnd, S('play').t1, { notes: ['F#3', 'A3', 'D4', 'F#4'], bass: 'D2', vel: 0.75 });
    a.note('D5', pEnd, 1.4, { vel: 0.34 });

    // why1: count one, two, three on the grid
    const g1 = a.grid(BEATS, S('why1').t0 + 0.05, S('why2').t1, GRID);
    const cnt = [a.w('why1', 'one'), a.w('why1', 'two'), a.w('why1', 'three')];
    waltz(S('why1').t0 + 0.1, cnt[0] - 0.05, { vel: 0.4, grid: g1, shape: false });
    cnt.forEach((t, i) => {
      g1.active.push({ t0: t, t1: i < 2 ? cnt[i + 1] : S('why1').t1, i });
      if (i === 0) a.note('D2', t, 0.6, { vel: 0.4 }); else CH.D.notes.forEach(n => a.note(n, t, 0.4, { vel: 0.2, show: false }));
    });

    // why2: bass on one, chord on two and three
    const tBass = a.w('why2', 'bass'), tChord = a.w('why2', 'chord');
    waltz(S('why2').t0 + 0.05, S('why2').t1, { vel: 0.6, grid: g1, shape: false, perc: true });
    a.big('BASS = ONE', tBass, tChord, { ...BIG, color: PINK });
    a.big('CHORD = TWO, THREE', tChord, S('why2').t1, { ...BIG, color: TEAL });

    // why3: one strong beat, two light: the walker goes round the D triangle, bar after bar
    const r0 = S('why3').t0 + 0.1, r1 = S('why3').t1;
    const bars = waltz(r0, r1, { vel: 0.55 });
    const spin = [];
    bars.forEach(t => spin.push([t, 'D'], [t + BEAT, 'F#'], [t + 2 * BEAT, 'A']));
    a.walker(spin, { t1: r1, dr: -40, color: '#ffffff' });
    a.tag('D', a.w('why3', 'strong'), r1, 'STRONG', { dr: -92, color: PINK });
    a.tag('A', a.w('why3', 'light'), r1, 'LIGHT', { dr: -92, color: TEAL });
    a.tag('F#', a.w('why3', 'light'), r1, 'LIGHT', { dr: -92, color: TEAL });

    // arp: D, F#, A on the spoken words, then a rising arpeggio
    const tD = a.w('arp', 'D') - 0.04, tF = a.w('arp', 'F') - 0.04, tA = a.w('arp', 'A') - 0.04, tArp = a.w('arp2', 'arpeggio') - 0.04;
    a.ch('D', S('arp').t0 + 0.05, tD, { ...CH.D, vel: 0.35, strikes: [{ o: BEAT, v: 0.6 }, { o: 2 * BEAT, v: 0.5 }] });
    a.ch('D', tD, S('arp').t1, { notes: ['D4', 'F#4', 'A4'], bass: false, mute: true });
    [['D4', tD], ['F#4', tF], ['A4', tA]].forEach(([n, t]) => a.note(n, t, 0.9, { vel: 0.38 }));
    a.tag('D', tD, S('arp').t1, 'ROOT', { dr: -92 });
    a.tag('F#', tF, S('arp').t1, 'THIRD', { dr: -92 });
    a.tag('A', tA, S('arp').t1, 'FIFTH', { dr: -92 });
    const ARP = ['D4', 'F#4', 'A4', 'D5', 'F#5', 'A5', 'D5'];
    ARP.forEach((n, i) => a.note(n, tArp + i * 0.22, i === ARP.length - 1 ? 1.6 : 0.5, { vel: 0.32 }));
    a.walker(ARP.map((n, i) => [tArp + i * 0.22, n.replace(/\d/, '')]), { t1: S('arp').t1, dr: -40, color: GOLD });
    waltz(tArp + ARP.length * 0.22, S('arp').t1, { vel: 0.4 });
    a.tag(0, a.w('arp2', 'opening'), S('arp').t1, 'CALM · SPACIOUS · OPEN', { x: 540, y: 455, color: GOLD });

    // lilt: the second beat comes a little early
    const g2 = a.grid(BEATS, S('lilt').t0 + 0.05, S('lilt').t1, GRID);
    const tE = a.w('lilt', 'early');
    waltz(S('lilt').t0 + 0.1, tE, { vel: 0.5, grid: g2, shape: false, perc: true });
    waltz(tE, S('lilt').t1, { vel: 0.6, grid: g2, shape: false, perc: true, early: 0.22 });
    a.big('BEAT TWO: A LITTLE EARLY', tE, S('lilt').t1, { ...BIG, size: 44, color: TEAL });
    a.big('OFTEN', a.w('lilt', 'often'), tE, { ...BIG, color: '#8a8a92' });

    // essence: the theme once more, then the home chord
    a.scale(S('essence').t0, 'D');
    const ep = S('essence').t0 + 0.15;
    a.walker(theme(ep, { vel: 0.3 }), { t1: ep + THEME_BEATS * BEAT + 0.5, dr: -40, color: GOLD });
    waltz(ep + BEAT, ep + THEME_BEATS * BEAT, { vel: 0.5, early: 0.15 });
    const eH = ep + THEME_BEATS * BEAT;
    a.ch('D', eH, S('essence').t1 - 0.3, { notes: ['F#3', 'A3', 'D4', 'F#4', 'A4'], bass: 'D2', vel: 0.85 });
    a.note('D5', eH, 2.0, { vel: 0.32, show: false });
    a.tag('D', eH + 0.1, S('essence').t1, 'HOME', { dr: -92 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
