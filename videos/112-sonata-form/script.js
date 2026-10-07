// Sonata form: exposition (two themes, two keys), development (conflict), recapitulation (both themes home).
// Mozart's themes are NOT reconstructed: the Symphony No. 40 scenes play only generic chords in the keys
// given in the brief (G minor, B flat major). The demo uses two ORIGINAL short themes in C major.
const B = 0.32;   // one beat of the demo themes
// theme 1 (energetic, home key C): bar over C, bar over G
const T1 = [[['C5', 0.5], ['G4', 0.5], ['E4', 0.5], ['G4', 0.5], ['C5', 1], ['E5', 1]], [['D5', 0.5], ['B4', 0.5], ['G4', 0.5], ['B4', 0.5], ['D5', 1], ['G4', 1]]];
// theme 2 (lyrical, contrasting): in G major (exposition) - bar over G, bar over D7
const T2 = [[['B4', 1.5], ['A4', 0.5], ['G4', 1], ['D5', 1]], [['C5', 1.5], ['B4', 0.5], ['A4', 2]]];
const tr = (bars, n) => bars.map(bar => bar.map(([m, d]) => [m, d, n]));

module.exports = {
  slug: 'sonata-form',
  title: 'Sonata Form',
  segments: [
    { id: 'hook',    text: 'Leave home. Get lost. Find your way back.' },
    { id: 'what',    text: "That's sonata form, the classic plan for first movements: exposition, development, recapitulation." },
    { id: 'moz',     text: "You hear it in Mozart's Symphony No. 40 in G minor, from 1788." },
    { id: 'moz2',    text: 'The second theme arrives in B flat major... and in the recapitulation, it returns in G minor.' },
    { id: 'hmb',     text: 'Haydn, Mozart and Beethoven used it for most first movements: symphonies, sonatas, quartets.' },
    { id: 'why1',    text: 'So why does it work? First, the exposition.' },
    { id: 'why2a',   text: 'A first theme, in the home key.' },
    { id: 'why2b',   text: 'Then a contrasting second theme, in a new key, often the dominant.' },
    { id: 'why3a',   text: 'In the development, the themes break into fragments...' },
    { id: 'why3b',   text: "pushed through key after key. That's the conflict." },
    { id: 'why4',    text: 'Then the recapitulation: both themes return, now both in the home key.' },
    { id: 'why5',    text: 'Conflict resolved. Often, a coda closes it out.' },
    { id: 'why6',    text: "Home, journey, struggle, return. It's a story." },
    { id: 'essence', text: 'Two themes, two keys, one conflict... and the return home makes it all make sense.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'MUSIC AS A STORY', title: 'SONATA FORM', accent: true, tonic: 0, min: 5.6, tail: 1.2 },
    { id: 'what', segs: ['what'], label: 'THREE PARTS', title: 'E · D · R', circle: false, tonic: 0, tail: 1.6 },
    { id: 'moz', segs: ['moz'], label: 'YOU HEAR IT IN', title: 'Symphony No. 40', sub: 'Mozart · 1788 · in G minor', tonic: 7, tail: 0.6 },
    { id: 'moz2', segs: ['moz2'], label: 'YOU HEAR IT IN', title: 'Symphony No. 40', sub: 'Mozart · 1788 · in G minor', tonic: 7, tail: 1.4 },
    { id: 'hmb', segs: ['hmb'], label: 'YOU HEAR IT IN', title: 'First Movements', sub: 'symphonies · sonatas · quartets', circle: false, tonic: 0, tail: 1.2 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'THE EXPOSITION', circle: false, tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2a', 'why2b'], label: 'EXPOSITION', title: 'TWO THEMES', tonic: 0, gap: 0.4, min: 0.2 + 16 * B + 1.2, tail: 1.6 },
    { id: 'why3', segs: ['why3a', 'why3b'], label: 'DEVELOPMENT', title: 'THE CONFLICT', tonic: 9, gap: 0.2, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'RECAPITULATION', title: 'BOTH THEMES HOME', tonic: 0, min: 0.2 + 12 * B + 1.4, tail: 1.6 },
    { id: 'why5', segs: ['why5'], label: 'AND OFTEN', title: 'THE CODA', circle: false, tonic: 0, tail: 1.4 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'A STORY', circle: false, tonic: 0, tail: 1.4 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'THE RETURN HOME', accent: true, tonic: 0, gap: 0.5, tail: 2.4 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', RED = '#ff5d6c', PURPLE = '#b48cff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const pcOf = m => a.T.NAMES[a.T.mod(a.T.midi(m), 12)];

    // melody: bars of [note, beats, transpose?]
    function play(bars, t0, b, o = {}) {
      const pts = []; let t = t0;
      bars.forEach(bar => bar.forEach(([n, d, x]) => {
        const m = a.T.midi(n) + (x ?? 0) + (o.oct ?? 0);
        a.note(m, t, d * b * 0.93, { vel: o.vel ?? 0.4, show: o.show ?? true });
        pts.push([t, pcOf(m)]); t += d * b;
      }));
      return { pts, end: t };
    }
    // classical accompaniment: chord shape on the circle, Alberti-style eighths + bass underneath
    function alberti(name, t0, len, o = {}) {
      const c = a.T.parseChord(name), base = 48 + c.root;
      const iv = p => a.T.mod(p - c.root, 12);
      const third = base + iv(c.pcs[1]), fifth = base + iv(c.pcs[2]), top = c.pcs[3] !== undefined ? base + iv(c.pcs[3]) : fifth;
      a.ch(name, t0, t0 + len, { notes: [base, third, fifth, ...(c.pcs[3] !== undefined ? [top] : [])], bass: false, mute: true, shape: o.shape, hideName: o.hideName, row: o.row });
      const pat = [base, fifth, third, top], e = (o.b ?? B) / 2, v = o.vel ?? 0.2;
      for (let k = 0; t0 + k * e < t0 + len - 0.02; k++) a.note(pat[k % 4], t0 + k * e, e * 0.9, { vel: v * (k % 4 ? 0.75 : 1), show: false });
      a.note(36 + c.root, t0, Math.min(len, 4 * (o.b ?? B)) * 0.95, { vel: v * 1.2, show: false });
    }
    // agitated repeated-eighth chords (generic texture)
    function pulse(name, t0, len, o = {}) {
      const e = o.e ?? 0.17, n = Math.max(1, Math.round(len / e));
      a.ch(name, t0, t0 + len, { notes: o.notes, bass: o.bass, vel: o.vel ?? 0.55, hideName: o.hideName, shape: o.shape,
        strikes: Array.from({ length: n }, (_, k) => ({ o: k * len / n, v: k % 2 ? 0.45 : 0.8 })) });
    }
    const walk = (pts, t1, color = GOLD, dr = -40) => a.walker(pts, { t1, dr, color });
    // E / D / R (+ coda) timeline
    const PARTS = [['E', 'EXPOSITION', TEAL], ['D', 'DEVELOPMENT', RED], ['R', 'RECAPITULATION', GOLD], ['CODA', 'TAIL', PURPLE]];
    const timeline = (t0, t1, n = 3, o = {}) => a.grid(PARTS.slice(0, n).map(([l, s, c]) => ({ label: l, sub: s, color: c, size: l.length > 1 ? 56 : 110, subSize: 20 })),
      t0, t1, { rows: 1, cols: n, cw: n === 3 ? 300 : 236, chh: o.chh ?? 260, y: o.y ?? 520, revealStep: o.reveal ?? 0.1, caption: o.caption });

    // ---------- hook: home (C), lost (minor keys), back (G7 -> C) ----------
    a.scale(0.15, 'C', a.T.MAJOR, { popIn: { t0: 0.2, step: 0.04 } });
    const tLost = a.w('hook', 'Get') - 0.05, tBack = a.w('hook', 'back') - 0.05, tFind = a.w('hook', 'Find') - 0.05;
    alberti('C', 0.3, tLost - 0.3, { b: 0.3 });
    play([T1[0]], 0.3, 0.3, { vel: 0.38 });
    a.tag('C', 0.3, tLost, 'HOME', { color: GOLD, dr: -92 });
    a.scale(tLost, 'A', a.T.MINOR);
    pulse('Am', tLost, (tFind - tLost) / 2, { vel: 0.6 });
    pulse('Dm', tLost + (tFind - tLost) / 2, (tFind - tLost) / 2, { vel: 0.6 });
    a.tag(0, tLost, tFind, 'LOST', { x: 540, y: 462, color: RED });
    a.scale(tFind, 'C', a.T.MAJOR);
    pulse('G7', tFind, tBack + 0.25 - tFind, { vel: 0.6 });
    a.ch('C', tBack + 0.25, S('hook').t1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.8 });
    a.note('C5', tBack + 0.25, 1.4, { vel: 0.35 });
    a.tag('C', tBack + 0.25, S('hook').t1, 'HOME', { color: GOLD, dr: -92 });
    a.walker([[0.3, 'C'], [tLost, 'A'], [tLost + (tFind - tLost) / 2, 'D'], [tFind, 'G'], [tBack + 0.25, 'C']], { t1: S('hook').t1, dr: 34, color: '#ffffff' });

    // ---------- what: exposition, development, recapitulation ----------
    const tE = a.w('what', 'exposition') - 0.05, tD = a.w('what', 'development') - 0.05, tR = a.w('what', 'recapitulation') - 0.05;
    const gW = timeline(S('what').t0 + 0.1, S('what').t1);
    gW.active.push({ t0: tE, t1: S('what').t1, i: 0 }, { t0: tD, t1: S('what').t1, i: 1 }, { t0: tR, t1: S('what').t1, i: 2 });
    alberti('C', S('what').t0 + 0.1, (tE - S('what').t0 - 0.1) / 2, { vel: 0.14, shape: false });
    alberti('G', S('what').t0 + 0.1 + (tE - S('what').t0 - 0.1) / 2, (tE - S('what').t0 - 0.1) / 2, { vel: 0.14, shape: false });
    alberti('C', tE, tD - tE, { shape: false });
    play([T1[0].slice(0, 4)], tE, (tD - tE) / 2, { show: false, vel: 0.36 });
    pulse('Am', tD, (tR - tD) / 2, { shape: false, vel: 0.55 }); pulse('Dm', tD + (tR - tD) / 2, (tR - tD) / 2, { shape: false, vel: 0.55 });
    pulse('G7', tR, 0.7, { shape: false, vel: 0.55 });
    a.ch('C', tR + 0.7, S('what').t1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.75, shape: false });
    a.big('THE CLASSIC PLAN', a.w('what', 'classic') - 0.05, S('what').t1, { y: 930, size: 48, ...MONO, color: '#ffffff', blur: 0 });
    a.big('FOR FIRST MOVEMENTS', a.w('what', 'first') - 0.05, S('what').t1, { y: 1010, size: 40, ...MONO, color: GOLD, blur: 0 });

    // ---------- Mozart 40: home in G minor (generic agitated chords only) ----------
    a.scale(S('moz').t0, 'G', a.T.MINOR);
    const z0 = S('moz').t0 + 0.1, zl = (S('moz').t1 - z0) / 4;
    const GM = { notes: ['G3', 'Bb3', 'D4'], bass: 'G2' }, D7 = { notes: ['F#3', 'C4', 'D4'], bass: 'D2' };
    [['Gm', GM], ['D7', D7], ['Gm', GM], ['D7', D7]].forEach(([n, v], i) => pulse(n, z0 + i * zl, zl, v));
    a.ring(['G'], a.w('moz', 'G') - 0.05, S('moz').t1, { color: PINK });
    a.tag('G', a.w('moz', 'G') - 0.05, S('moz').t1, 'G MINOR', { color: PINK, dr: -92 });
    // second theme in B flat major (relative major), back to G minor in the recap
    const tBb = a.w('moz2', 'B') - 0.05, tRet = a.w('moz2', 'returns') - 0.05, tRec = a.w('moz2', 'recapitulation') - 0.05;
    pulse('Gm', S('moz2').t0, tBb - S('moz2').t0, { ...GM, vel: 0.45 });
    a.scale(tBb, 'Bb', a.T.MAJOR);
    const BB = { notes: ['F3', 'Bb3', 'D4'], bass: 'Bb2' }, F7 = { notes: ['F3', 'A3', 'Eb4'], bass: 'F2' };
    const bl = (tRec - tBb) / 3;
    [['Bb', BB], ['F7', F7], ['Bb', BB]].forEach(([n, v], i) => a.ch(n, tBb + i * bl, tBb + (i + 1) * bl, { ...v, vel: 0.6, strikes: [{ o: 0, v: 1 }, { o: bl / 2, v: 0.5 }] }));
    a.ring(['Bb'], tBb, tRec, { color: BLUE });
    a.tag(0, tBb, tRec, 'RELATIVE MAJOR', { x: 540, y: 462, color: BLUE });
    a.arc('G', 'Bb', tBb, tRec, { steps: 3, color: BLUE, dr: 30 });
    pulse('D7', tRec, tRet - tRec, { ...D7, vel: 0.5 });
    a.scale(tRet, 'G', a.T.MINOR);
    const rl = (S('moz2').t1 - tRet) / 3;
    [['Gm', GM], ['D7', D7], ['Gm', GM]].forEach(([n, v], i) => pulse(n, tRet + i * rl, rl, v));
    a.ring(['G'], tRet, S('moz2').t1, { color: PINK });
    a.tag(0, tRet, S('moz2').t1, 'BACK IN G MINOR', { x: 540, y: 462, color: PINK });
    a.arc('Bb', 'G', tRet, S('moz2').t1, { steps: -3, color: PINK, dr: 30 });

    // ---------- Haydn, Mozart, Beethoven: first movements (generic Alberti cadence) ----------
    const gC = a.grid([{ label: 'HAYDN', size: 50, color: TEAL }, { label: 'MOZART', size: 50, color: GOLD }, { label: 'BEETHOVEN', size: 40, color: PINK }],
      S('hmb').t0 + 0.05, S('hmb').t1, { rows: 1, cols: 3, cw: 310, chh: 200, y: 520, revealStep: 0.15 });
    ['Haydn', 'Mozart', 'Beethoven'].forEach((w, i) => gC.active.push({ t0: a.w('hmb', w) - 0.05, t1: S('hmb').t1, i }));
    [['symphonies', 'SYMPHONIES', 820, TEAL], ['sonatas', 'SONATAS', 910, GOLD], ['quartets', 'STRING QUARTETS', 1000, PINK]].forEach(([w, txt, y, c]) =>
      a.big(txt, a.w('hmb', w) - 0.05, S('hmb').t1, { y, size: 46, ...MONO, color: c, blur: 8 }));
    const hc = ['C', 'F', 'G7', 'C'], h0 = S('hmb').t0 + 0.1, hl = (S('hmb').t1 - h0 - 1.0) / 4;
    hc.forEach((c, i) => alberti(c, h0 + i * hl, hl, { shape: false, vel: 0.24 }));
    a.ch('C', h0 + 4 * hl, S('hmb').t1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.6, shape: false });

    // ---------- why1: the exposition ----------
    const g1 = timeline(S('why1').t0 + 0.05, S('why1').t1, 3);
    g1.active.push({ t0: a.w('why1', 'exposition') - 0.05, t1: S('why1').t1, i: 0 });
    alberti('C', S('why1').t0 + 0.1, (S('why1').t1 - S('why1').t0 - 0.1) / 2, { shape: false, vel: 0.18 });
    alberti('G7', S('why1').t0 + 0.1 + (S('why1').t1 - S('why1').t0 - 0.1) / 2, (S('why1').t1 - S('why1').t0 - 0.1) / 2, { shape: false, vel: 0.18 });

    // ---------- why2: theme 1 at home (C), theme 2 in the dominant (G) ----------
    a.scale(S('why2').t0, 'C');
    const p0 = a.w('why2a', 'first') - 0.1;
    alberti('C', S('why2').t0 + 0.05, p0 - S('why2').t0 - 0.05, { vel: 0.12 });
    const m1 = play(T1, p0, B);
    alberti('C', p0, 4 * B); alberti('G', p0 + 4 * B, 4 * B);
    walk(m1.pts, m1.end + 0.3, GOLD);
    a.tag(0, p0, m1.end, 'THEME 1 · HOME KEY', { x: 540, y: 462, color: GOLD });
    const p1 = Math.max(m1.end, a.w('why2b', 'contrasting') - 0.1);
    if (p1 > m1.end) alberti('G', m1.end, p1 - m1.end, { vel: 0.14 });
    a.scale(Math.min(p1, a.w('why2b', 'new') - 0.05), 'G');
    const m2 = play(T2, p1, B * 1.1, { vel: 0.42 });
    alberti('G', p1, 4 * B * 1.1, { b: B * 1.1, vel: 0.16 }); alberti('D7', p1 + 4 * B * 1.1, 4 * B * 1.1, { b: B * 1.1, vel: 0.16 });
    a.ch('G', m2.end, S('why2').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.55 });
    walk(m2.pts, S('why2').t1, TEAL, 36);
    a.tag(0, p1, S('why2').t1, 'THEME 2 · NEW KEY', { x: 540, y: 462, color: TEAL });
    a.arc('C', 'G', a.w('why2b', 'dominant') - 0.05, S('why2').t1, { steps: 7, color: TEAL, label: 'THE DOMINANT', labelR: 165 });

    // ---------- why3: development - fragments through key after key ----------
    a.scale(S('why3').t0, 'A', a.T.MINOR);
    const FR = [['Am', 'A', ['A4', 'E4', 'C4', 'E4']], ['Dm', 'D', ['D5', 'A4', 'F4', 'A4']], ['Em', 'E', ['E5', 'B4', 'G4', 'B4']], ['Am', 'A', ['A4', 'E4', 'C4', 'E4']]];
    const f0 = a.w('why3a', 'fragments') - 0.1, fend = a.w('why3b', 'conflict') - 0.05, fl = (fend - f0) / FR.length;
    alberti('C', S('why3').t0 + 0.05, (f0 - S('why3').t0 - 0.05) / 2, { vel: 0.16 });
    play([T1[0].slice(0, 4)], S('why3').t0 + 0.05, (f0 - S('why3').t0 - 0.05) / 4, { vel: 0.36 });
    a.ch('Am', S('why3').t0 + 0.05 + (f0 - S('why3').t0 - 0.05) / 2, f0, { vel: 0.4, strikes: [{ o: 0, v: 1 }] });
    const fpts = [];
    FR.forEach(([ch, key, frag], i) => {
      const t = f0 + i * fl;
      if (i > 0) a.scale(t, key, a.T.MINOR);
      pulse(ch, t, fl, { vel: 0.6, e: fl / 8 });
      [0, 1].forEach(r => frag.forEach((n, j) => { const tt = t + (r * 4 + j) * fl / 8; a.note(n, tt, fl / 8 * 0.9, { vel: 0.4 }); fpts.push([tt, pcOf(n)]); }));
    });
    walk(fpts, fend + 0.3, RED);
    const KEYS = ['A MINOR', 'D MINOR', 'E MINOR', 'A MINOR'];
    KEYS.forEach((k, i) => a.tag(0, f0 + i * fl, f0 + (i + 1) * fl, k, { x: 540, y: 462, color: RED }));
    pulse('G7', fend, S('why3').t1 - fend, { vel: 0.7, e: 0.14 });
    a.tag(0, fend, S('why3').t1, 'CONFLICT', { x: 540, y: 462, color: RED });

    // ---------- why4: recapitulation - both themes, both in C ----------
    a.scale(S('why4').t0, 'C');
    const r0 = Math.max(S('why4').t0 + 0.2, a.w('why4', 'both') - 0.1);
    pulse('G7', S('why4').t0, r0 - S('why4').t0, { vel: 0.45, e: 0.16 });
    const n1 = play([T1[0]], r0, B);
    alberti('C', r0, 4 * B);
    const n2 = play(tr(T2, 5), n1.end, B * 1.1, { vel: 0.42 });
    alberti('C', n1.end, 4 * B * 1.1, { b: B * 1.1, vel: 0.16 }); alberti('G7', n1.end + 4 * B * 1.1, 4 * B * 1.1, { b: B * 1.1, vel: 0.16 });
    a.ch('C', n2.end, S('why4').t1, { notes: ['E4', 'G4', 'C5'], bass: 'C3', vel: 0.65 });
    walk(n1.pts, n1.end + 0.4, GOLD);
    walk(n2.pts, S('why4').t1, TEAL, 36);
    a.tag(0, r0, n1.end, 'THEME 1 · HOME', { x: 540, y: 462, color: GOLD });
    a.tag(0, n1.end, S('why4').t1, 'THEME 2 · NOW HOME TOO', { x: 540, y: 462, color: TEAL });
    a.ring(['C'], a.w('why4', 'home') - 0.05, S('why4').t1, { color: GOLD });

    // ---------- why5: conflict resolved, the coda ----------
    const g5 = timeline(S('why5').t0 + 0.05, S('why5').t1, 4, { chh: 240 });
    const tRes = a.w('why5', 'resolved') - 0.05, tCoda = a.w('why5', 'coda') - 0.05;
    g5.active.push({ t0: S('why5').t0 + 0.1, t1: S('why5').t1, i: 0 }, { t0: S('why5').t0 + 0.1, t1: S('why5').t1, i: 1 }, { t0: a.w('why5', 'Conflict') - 0.05, t1: S('why5').t1, i: 2 }, { t0: tCoda, t1: S('why5').t1, i: 3 });
    a.ch('F', S('why5').t0 + 0.05, tRes - 0.3, { notes: ['F3', 'A3', 'C4', 'F4'], bass: 'F2', vel: 0.55, shape: false });
    a.ch('G7', tRes - 0.3, tRes + 0.2, { notes: ['F3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.6, shape: false });
    a.ch('C', tRes + 0.2, tCoda, { notes: ['E3', 'G3', 'C4', 'E4'], bass: 'C2', vel: 0.75, shape: false });
    const cl = (S('why5').t1 - tCoda - 0.3) / 4;
    [['C', ['E4', 'G4', 'C5']], ['G7', ['F4', 'G4', 'B4']], ['C', ['E4', 'G4', 'C5']], ['C', ['C4', 'E4', 'G4', 'C5']]].forEach(([n, notes], i) =>
      a.ch(n, tCoda + i * cl, i < 3 ? tCoda + (i + 1) * cl : S('why5').t1, { notes, bass: n === 'C' ? 'C3' : 'G2', vel: i === 3 ? 0.85 : 0.6, shape: false }));
    a.big('RESOLVED', tRes, S('why5').t1, { y: 930, size: 70, color: GOLD, blur: 20 });
    a.big('THE TAIL END', tCoda, S('why5').t1, { y: 1040, size: 40, ...MONO, color: PURPLE, blur: 0 });

    // ---------- why6: home, journey, struggle, return ----------
    const ST = [['HOME', 'THEME 1', GOLD, 'Home', 'C'], ['JOURNEY', 'THEME 2', TEAL, 'journey', 'G'], ['STRUGGLE', 'DEVELOPMENT', RED, 'struggle', 'Am'], ['RETURN', 'RECAP', GOLD, 'return', 'C']];
    const g6 = a.grid(ST.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 44, subSize: 20 })), S('why6').t0 + 0.05, S('why6').t1,
      { rows: 2, cols: 2, cw: 420, chh: 220, y: 480, revealStep: 0.1 });
    const sw = ST.map(([, , , w]) => a.w('why6', w) - 0.05);
    ST.forEach(([, , , , ch], i) => {
      g6.active.push({ t0: sw[i], t1: i < 3 ? sw[i + 1] : S('why6').t1, i });
      if (i === 2) pulse('Am', sw[i], sw[3] - sw[i] - 0.35, { shape: false, vel: 0.55 });
      else a.ch(ch, sw[i], i < 3 ? sw[i + 1] : S('why6').t1, { vel: 0.6, shape: false, strikes: [{ o: 0, v: 1 }, { o: 0.4, v: 0.5 }] });
    });
    a.ch('G7', sw[3] - 0.35, sw[3], { vel: 0.55, shape: false });
    a.big("IT'S A STORY", a.w('why6', 'story') - 0.3, S('why6').t1, { y: 1010, size: 60, color: '#ffffff', blur: 16 });

    // ---------- essence: two themes, two keys, one conflict, the return ----------
    a.scale(S('essence').t0, 'C');
    const ew = ['Two', 'keys', 'conflict', 'return'].map((w, i) => a.w('essence', w, w === 'Two' ? 0 : 0) - 0.05);
    const e1 = play([T1[0]], S('essence').t0 + 0.1, (ew[1] - S('essence').t0 - 0.1) / 4, { vel: 0.38 });
    alberti('C', S('essence').t0 + 0.1, ew[1] - S('essence').t0 - 0.1, { b: (ew[1] - S('essence').t0 - 0.1) / 4, vel: 0.16 });
    a.tag(0, S('essence').t0 + 0.1, ew[1], 'THEME 1 · C', { x: 540, y: 462, color: GOLD });
    a.scale(ew[1], 'G');
    play([T2[0]], ew[1], (ew[2] - ew[1]) / 4, { vel: 0.4 });
    alberti('G', ew[1], ew[2] - ew[1], { b: (ew[2] - ew[1]) / 4, vel: 0.16 });
    a.tag(0, ew[1], ew[2], 'THEME 2 · G', { x: 540, y: 462, color: TEAL });
    a.scale(ew[2], 'A', a.T.MINOR);
    pulse('Am', ew[2], (ew[3] - ew[2]) / 2, { vel: 0.6 }); pulse('Dm', ew[2] + (ew[3] - ew[2]) / 2, (ew[3] - ew[2]) / 2 - 0.4, { vel: 0.6 });
    a.ch('G7', ew[3] - 0.4, ew[3], { vel: 0.6 });
    a.tag(0, ew[2], ew[3], 'CONFLICT', { x: 540, y: 462, color: RED });
    a.scale(ew[3], 'C');
    a.ch('C', ew[3], S('essence').t1 - 0.3, { notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.8 });
    a.note('C5', ew[3], 2.0, { vel: 0.3 }); a.note('E5', ew[3] + 0.35, 2.0, { vel: 0.28 }); a.note('G5', ew[3] + 0.7, 2.4, { vel: 0.26 });
    a.ring(['C'], ew[3], S('essence').t1, { color: GOLD });
    a.tag('C', ew[3], S('essence').t1, 'HOME', { color: GOLD, dr: -92 });
    a.walker([[S('essence').t0 + 0.1, 'C'], [ew[1], 'G'], [ew[2], 'A'], [ew[2] + (ew[3] - ew[2]) / 2, 'D'], [ew[3] - 0.4, 'G'], [ew[3], 'C']], { t1: S('essence').t1, dr: 34, color: '#ffffff' });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
