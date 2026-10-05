// Vivaldi's Spring, decoded: music that paints birds, streams and thunder.
// Per the brief, Vivaldi's melody is NOT reconstructed: only the harmony (E - B - E, I-V-I),
// generic textures (running notes, tremolo, scales) and our own short birdsong trills.
module.exports = {
  slug: 'vivaldi-spring',
  title: "Vivaldi's Spring",
  segments: [
    { id: 'hook',    text: 'No words. No pictures. And yet you can hear birds, a stream, and a thunderstorm.' },
    { id: 'what',    text: "This is Spring, from Vivaldi's The Four Seasons, published in 1725." },
    { id: 'what2',   text: "It's Concerto number one, in E major." },
    { id: 'sonnet',  text: 'Each concerto came with a sonnet, possibly by Vivaldi himself, describing the scene.' },
    { id: 'birds',   text: 'Birds greet the season with song...' },
    { id: 'streams', text: 'streams murmur...' },
    { id: 'storm',   text: 'a storm comes, with thunder and lightning...' },
    { id: 'again',   text: 'and then the birds sing again.' },
    { id: 'why1',    text: 'So how does it work? First, ritornello form.' },
    { id: 'why1b',   text: "The orchestra's opening theme keeps returning, like a refrain, between solo episodes." },
    { id: 'why2',    text: 'In those episodes, the solo violins paint the sonnet:' },
    { id: 'why2b',   text: 'trills for birds, soft running notes for streams, fast tremolos and scales for thunder.' },
    { id: 'why3',    text: 'Phrases repeat softly, like an echo. Baroque music often switched between loud and soft in blocks.' },
    { id: 'why4',    text: 'And a concerto sets one soloist against the whole group. The contrast is the drama.' },
    { id: 'why5',    text: 'Music that tells a story like this is called program music.' },
    { id: 'essence', text: 'No words, no pictures... and you still see spring.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ANTONIO VIVALDI', title: "VIVALDI'S SPRING", accent: true, tonic: 4, min: 7.0, tail: 0.2 },
    { id: 'what', segs: ['what', 'what2'], label: 'THE FOUR SEASONS · OP. 8', title: 'SPRING', sub: 'Antonio Vivaldi · 1725 · in E major', tonic: 4, row: ['E', 'B', 'E'], gap: 0.2, tail: 0.4 },
    { id: 'sonnet', segs: ['sonnet'], label: 'EACH CONCERTO', title: 'A SONNET', sub: 'possibly by Vivaldi himself', circle: false, tonic: 4, tail: 0.4 },
    { id: 'birds', segs: ['birds'], label: 'THE SONNET', title: 'BIRDS', tonic: 4, tail: 2.5 },
    { id: 'streams', segs: ['streams'], label: 'THE SONNET', title: 'STREAMS', tonic: 4, tail: 2.0 },
    { id: 'storm', segs: ['storm'], label: 'THE SONNET', title: 'THE STORM', tonic: 4, tail: 2.2 },
    { id: 'again', segs: ['again'], label: 'THE SONNET', title: 'BIRDS AGAIN', tonic: 4, tail: 2.5 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'RITORNELLO FORM', circle: false, tonic: 4, gap: 0.2, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b'], label: 'WHY IT WORKS', title: 'PAINTING THE SONNET', tonic: 4, gap: 0.2, tail: 0.5 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'ECHO EFFECTS', circle: false, tonic: 4, tail: 0.5 },
    { id: 'why4', segs: ['why4'], label: 'THE CONCERTO', title: 'ONE AGAINST MANY', tonic: 4, tail: 0.6 },
    { id: 'why5', segs: ['why5'], label: 'A STORY WITHOUT WORDS', title: 'PROGRAM MUSIC', circle: false, tonic: 4, tail: 0.6 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'YOU STILL SEE SPRING', accent: true, tonic: 4, gap: 0.5, tail: 1.5 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8', GREEN = '#7be07b', BLUE = '#62a8ff', LILAC = '#b48cff', GREY = '#8a8a92', WHITE = '#ffffff';
    const big = (txt, t0, t1, o = {}) => a.big(txt, t0, t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, ...o });
    const EV = ['E3', 'G#3', 'B3'], BV = ['D#3', 'F#3', 'B3'];
    // harmony: E or B, sounding
    const E = (t0, t1, o = {}) => a.ch('E', t0, t1, { notes: o.notes || EV, bass: o.bass ?? 'E2', vel: o.vel ?? 0.5, row: o.row ?? null, strikes: o.strikes || null, hideName: o.hideName });
    const B = (t0, t1, o = {}) => a.ch('B', t0, t1, { notes: o.notes || BV, bass: o.bass ?? 'B1', vel: o.vel ?? 0.5, row: o.row ?? null, strikes: o.strikes || null, hideName: o.hideName });
    const pulse = (len, n = 4, v = 0.5) => Array.from({ length: n }, (_, i) => ({ o: (i * len) / n, v: i ? v : 1 }));
    // our own birdsong: a trill, high repeated notes, another trill
    const trill = (n1, n2, t0, dur, v = 0.24, st = 0.06) => { for (let t = t0, i = 0; t < t0 + dur - 0.01; t += st, i++) a.note(i % 2 ? n2 : n1, t, st * 0.9, { vel: v }); };
    const reps = (n, t0, k, st, v = 0.26) => { for (let i = 0; i < k; i++) a.note(n, t0 + i * st, st * 0.6, { vel: v }); };
    function birdsong(t0, v = 1) {
      trill('B4', 'C#5', t0, 0.6, 0.22 * v);
      reps('E5', t0 + 0.7, 4, 0.13, 0.26 * v);
      trill('G#4', 'A4', t0 + 1.3, 0.5, 0.2 * v);
      a.note('B4', t0 + 1.85, 0.5, { vel: 0.26 * v });
      return t0 + 2.4;
    }
    // soft running notes (streams)
    const RUN = ['E4', 'F#4', 'G#4', 'B4', 'G#4', 'F#4', 'E4', 'F#4'];
    function stream(t0, t1, v = 1, notes = RUN) { let i = 0; for (let t = t0; t < t1 - 0.05; t += 0.11, i++) a.note(notes[i % notes.length], t, 0.16, { vel: 0.13 * v, show: i % 2 === 0 }); }
    // storm: low tremolo, fast scales, thunder on the drum
    const UP = ['E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D#4', 'E4'];
    function storm(t0, t1, v = 1) {
      for (let t = t0, i = 0; t < t1 - 0.04; t += 0.055, i++) a.note(i % 2 ? 'B2' : 'E2', t, 0.07, { vel: 0.2 * v, show: false });
      for (let s = t0 + 0.3; s < t1 - 0.5; s += 1.1) UP.forEach((n, i) => a.note(n, s + i * 0.05, 0.08, { vel: 0.22 * v }));
      for (let s = t0; s < t1 - 0.2; s += 1.1) { a.perc('kick', s, 0.9 * v); a.perc('snare', s + 0.02, 0.4 * v); }
    }

    // the circle names black keys Eb / Ab: in E major these are D# and G#
    a.scale(0.1, 'E', a.T.MAJOR);
    a.tag('D#', 0.1, a.duration, 'D#', { dr: 58, color: '#cfcfd6' });
    a.tag('G#', 0.1, a.duration, 'G#', { dr: 58, color: '#cfcfd6' });

    // hook: E major; birds, a stream, thunder - each on its word
    const tB = a.w('hook', 'birds') - 0.05, tS = a.w('hook', 'stream') - 0.05, tT = a.w('hook', 'thunderstorm') - 0.05;
    E(0.25, tT, { vel: 0.35 });
    trill('B4', 'C#5', 0.3, 0.7, 0.16); reps('E5', 1.1, 3, 0.15, 0.18);
    birdsong(tB, 0.9);
    stream(tS, tT + 0.4, 1.1);
    a.ch('E', tT, S('hook').t1, { notes: ['E3', 'B3'], bass: 'E2', vel: 0.3, mute: true });
    storm(tT, S('hook').t1 - 0.3, 0.9);
    big('BIRDS', tB, tS, { color: GREEN });
    big('A STREAM', tS, tT, { color: BLUE });
    big('THUNDER', tT, S('hook').t1, { color: RED, size: 64, family: 'DM Sans', weight: 800 });

    // what: E - B - E, the home harmony
    const w0 = S('what').t0 + 0.1, wl = (S('what').t1 - w0) / 3;
    E(w0, w0 + wl, { row: 0, strikes: pulse(wl, 4, 0.45) });
    B(w0 + wl, w0 + 2 * wl, { row: 1, strikes: pulse(wl, 4, 0.45) });
    E(w0 + 2 * wl, S('what').t1, { row: 2, strikes: pulse(wl, 4, 0.45) });
    a.tag('E', a.w('what2', 'E') - 0.05, S('what').t1, 'I – V – I', { dr: -92, color: GOLD });

    // sonnet: four pictures
    const g = a.grid([{ label: 'BIRDS', sub: 'SONG', color: GREEN, size: 58 }, { label: 'STREAMS', sub: 'MURMUR', color: BLUE, size: 58 },
      { label: 'STORM', sub: 'THUNDER', color: RED, size: 58 }, { label: 'BIRDS', sub: 'AGAIN', color: GOLD, size: 58 }],
    S('sonnet').t0 + 0.1, S('sonnet').t1, { rows: 2, cols: 2, cw: 430, chh: 230, y: 520, revealStep: 0.25 });
    const tSc = a.w('sonnet', 'scene');
    [0, 1, 2, 3].forEach(i => g.active.push({ t0: tSc + i * 0.25, t1: tSc + i * 0.25 + 0.6, i }));
    E(S('sonnet').t0 + 0.1, S('sonnet').t1, { vel: 0.3, hideName: true });
    trill('B4', 'C#5', a.w('sonnet', 'sonnet'), 0.5, 0.12);

    // birds: E major, our own trills and repeated notes
    const b0 = a.end('birds') + 0.05;
    E(S('birds').t0 + 0.1, S('birds').t1, { vel: 0.4 });
    trill('G#4', 'A4', S('birds').t0 + 0.3, 0.5, 0.14);
    birdsong(b0);
    a.ring(['B', 'C#', 'E'], b0, S('birds').t1, { color: GREEN });
    big('TRILLS · HIGH REPEATED NOTES', b0, S('birds').t1, { color: GREEN, size: 38 });

    // streams: soft running notes over E, then B
    const s0 = S('streams').t0 + 0.1, sm = (S('streams').t1 + s0) / 2;
    E(s0, sm, { vel: 0.3 }); B(sm, S('streams').t1, { vel: 0.3 });
    stream(s0 + 0.1, sm, 1.1); stream(sm, S('streams').t1 - 0.1, 1.1, ['D#4', 'F#4', 'B4', 'F#4']);
    a.walker([[s0 + 0.1, 'E'], [s0 + 0.32, 'F#'], [s0 + 0.54, 'G#'], [s0 + 0.76, 'B'], [s0 + 0.98, 'G#'], [s0 + 1.2, 'F#'], [s0 + 1.42, 'E'], [sm, 'D#'], [sm + 0.22, 'F#'], [sm + 0.44, 'B'], [sm + 0.66, 'F#']],
      { t1: S('streams').t1, dr: -40, color: BLUE });
    big('SOFT RUNNING NOTES', a.end('streams'), S('streams').t1, { color: BLUE, size: 44 });

    // storm: tremolo, fast scales, thunder
    const st0 = a.w('storm', 'storm') - 0.05;
    a.ch('E', st0, S('storm').t1, { notes: ['E3', 'B3'], bass: 'E2', mute: true });
    storm(st0, S('storm').t1 - 0.2);
    big('TREMOLO · FAST SCALES', a.w('storm', 'thunder'), S('storm').t1, { color: RED, size: 44 });
    a.ring(['E', 'B'], st0, S('storm').t1, { color: RED });

    // again: the birds return, home in E
    const ag = a.end('again') + 0.05;
    E(S('again').t0 + 0.1, S('again').t1, { vel: 0.4 });
    birdsong(ag);
    a.ring(['B', 'C#', 'E'], ag, S('again').t1, { color: GOLD });
    big('BIRDS AGAIN', ag, S('again').t1, { color: GOLD });

    // why1: ritornello - tutti theme returns between solo episodes
    const RIT = [{ label: 'R', sub: 'TUTTI', color: GOLD, size: 64 }, { label: 'S', sub: 'SOLO', color: TEAL, size: 64 }, { label: 'R', sub: 'TUTTI', color: GOLD, size: 64 },
      { label: 'S', sub: 'SOLO', color: TEAL, size: 64 }, { label: 'R', sub: 'TUTTI', color: GOLD, size: 64 }];
    const g1 = a.grid(RIT, S('why1').t0 + 0.1, S('why1').t1, { rows: 1, cols: 5, cw: 190, chh: 230, y: 560, revealStep: 0.12, caption: 'R = RITORNELLO · S = SOLO EPISODE' });
    const r0 = a.w('why1', 'ritornello') - 0.1, r1 = S('why1').t1 - 0.1, rl = (r1 - r0) / 5;
    for (let i = 0; i < 5; i++) {
      const t = r0 + i * rl;
      g1.active.push({ t0: t, t1: t + rl, i });
      if (i % 2 === 0) { E(t, t + rl / 2, { vel: 0.55, strikes: pulse(rl / 2, 2, 0.6), notes: ['E3', 'G#3', 'B3', 'E4'] }); B(t + rl / 2, t + rl, { vel: 0.55, strikes: pulse(rl / 2, 2, 0.6), notes: ['D#3', 'F#3', 'B3', 'D#4'] }); }
      else { trill('B4', 'C#5', t + 0.1, 0.6, 0.16); reps('E5', t + 0.8, 3, 0.14, 0.18); a.note('E2', t, rl, { vel: 0.14, show: false }); }
    }
    a.big('A REFRAIN', a.w('why1b', 'refrain'), S('why1').t1, { y: 940, size: 64, color: GOLD });

    // why2: the soloist paints each image
    const p0 = S('why2').t0 + 0.1;
    E(p0, S('why2').t1, { vel: 0.28, hideName: true });
    const tTr = a.w('why2b', 'trills') - 0.05, tRu = a.w('why2b', 'running') - 0.05, tTm = a.w('why2b', 'tremolos') - 0.05;
    trill('B4', 'C#5', tTr, 0.8, 0.2);
    big('TRILLS → BIRDS', tTr, tRu, { color: GREEN, size: 46 });
    stream(tRu, tTm, 1.2);
    big('RUNNING → STREAMS', tRu, tTm, { color: BLUE, size: 46 });
    storm(tTm, S('why2').t1 - 0.2, 0.8);
    big('TREMOLO → THUNDER', tTm, S('why2').t1, { color: RED, size: 46 });
    a.walker([[tTr, 'B'], [tTr + 0.06, 'C#'], [tTr + 0.12, 'B'], [tTr + 0.18, 'C#'], [tRu, 'E'], [tRu + 0.22, 'G#'], [tRu + 0.44, 'B'], [tRu + 0.66, 'F#'], [tTm, 'E'], [tTm + 0.3, 'E']],
      { t1: S('why2').t1, dr: -40, color: TEAL });

    // why3: loud, then the same softly - an echo
    const ec0 = S('why3').t0 + 0.2, tEcho = a.w('why3', 'echo') - 0.4, tLoud = a.w('why3', 'loud') - 0.05;
    const g3 = a.grid([{ label: 'LOUD', sub: 'FORTE', color: GOLD, size: 64 }, { label: 'SOFT', sub: 'PIANO · ECHO', color: TEAL, size: 64 }],
      S('why3').t0 + 0.1, S('why3').t1, { rows: 1, cols: 2, cw: 400, chh: 280, y: 560, revealStep: 0.3 });
    const phrase = (t, v) => { E(t, t + 0.9, { vel: v * 1.4, notes: ['E3', 'G#3', 'B3', 'E4'], hideName: true }); reps('B4', t, 2, 0.22, 0.3 * v); a.note('G#4', t + 0.45, 0.2, { vel: 0.3 * v }); a.note('E5', t + 0.7, 0.3, { vel: 0.3 * v }); };
    [[ec0, 1, 0], [ec0 + 1.2, 0.35, 1], [tLoud, 1, 0], [tLoud + 1.2, 0.35, 1]].forEach(([t, v, i]) => { phrase(t, v); g3.active.push({ t0: t, t1: t + 1.15, i }); });
    a.big('BLOCKS: LOUD · SOFT', a.w('why3', 'blocks'), S('why3').t1, { y: 980, size: 52, color: WHITE });

    // why4: one soloist (a single walker) against the whole group (full chord)
    const tSolo = a.w('why4', 'soloist') - 0.05, tGroup = a.w('why4', 'group') - 0.05, tDrama = a.w('why4', 'contrast') - 0.05;
    E(S('why4').t0 + 0.1, tSolo, { vel: 0.3 });
    trill('G#4', 'A4', tSolo, 0.5, 0.2); reps('B4', tSolo + 0.6, 3, 0.14, 0.24);
    a.walker([[tSolo, 'G#'], [tSolo + 0.6, 'B']], { t1: tGroup, dr: -40, color: TEAL });
    E(tGroup, tDrama, { vel: 0.85, notes: ['E3', 'G#3', 'B3', 'E4', 'G#4'], strikes: pulse(tDrama - tGroup, 3, 0.7) });
    big('ONE SOLOIST', tSolo, tGroup, { color: TEAL });
    big('THE WHOLE GROUP', tGroup, tDrama, { color: GOLD });
    const dl = (S('why4').t1 - tDrama) / 4;
    [0, 1, 2, 3].forEach(i => {
      const t = tDrama + i * dl;
      if (i % 2) B(t, t + dl, { vel: 0.8, notes: ['D#3', 'F#3', 'B3', 'D#4'] });
      else { a.ch('E', t, t + dl, { notes: ['E4'], bass: false, mute: true, shape: false }); trill('B4', 'C#5', t, dl - 0.1, 0.2); }
    });
    big('CONTRAST = DRAMA', tDrama, S('why4').t1, { color: RED });

    // why5: program music
    a.big('PROGRAM MUSIC', a.w('why5', 'program'), S('why5').t1, { y: 700, size: 92, color: GOLD });
    a.big('MUSIC THAT TELLS A STORY', S('why5').t0 + 0.2, S('why5').t1, { y: 560, size: 40, family: 'DM Mono', weight: 500, color: GREY, blur: 0 });
    const g5 = a.grid([{ label: 'BIRDS', color: GREEN, size: 40 }, { label: 'STREAMS', color: BLUE, size: 40 }, { label: 'STORM', color: RED, size: 40 }],
      a.w('why5', 'story'), S('why5').t1, { rows: 1, cols: 3, cw: 300, chh: 140, y: 840, revealStep: 0.15 });
    E(S('why5').t0 + 0.1, S('why5').t1, { vel: 0.3, hideName: true });
    stream(S('why5').t0 + 0.2, S('why5').t1 - 0.2, 0.7);

    // essence: E - B - E with birdsong on top, home in E
    a.scale(S('essence').t0, 'E', a.T.MAJOR);
    const e0 = S('essence').t0 + 0.1, el = 1.3;
    E(e0, e0 + el, { strikes: pulse(el, 4, 0.45) }); B(e0 + el, e0 + 2 * el, { strikes: pulse(el, 4, 0.45) });
    E(e0 + 2 * el, S('essence').t1 - 0.2, { vel: 0.6, notes: ['E3', 'G#3', 'B3', 'E4'] });
    birdsong(e0 + 2 * el + 0.1, 0.9);
    birdsong(a.at('cta') + 0.4, 0.6);
    a.tag('E', e0 + 2 * el, S('essence').t1, 'HOME', { dr: -92, color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
