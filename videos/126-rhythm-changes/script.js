// Rhythm changes: the chords of I Got Rhythm (A: I-vi-ii-V loop, bridge: D7 G7 C7 F7) as a jazz framework.
// Chords only. No Gershwin melody, no melodies of the bebop tunes; the only tunes heard are two
// original short motifs written for this video, to show "new melody, same chords".
const B = 0.3;   // one beat at 200 BPM, two beats per chord

module.exports = {
  slug: 'rhythm-changes',
  title: 'Rhythm Changes',
  segments: [
    { id: 'hook',    text: "The chords of one Gershwin song became one of jazz's most common frameworks." },
    { id: 'what',    text: 'I Got Rhythm, by George and Ira Gershwin, 1930, from the musical Girl Crazy.' },
    { id: 'what2',   text: 'Thirty two bars, usually in B flat.' },
    { id: 's1',      text: "Jazz musicians wrote new melodies on its chords: Charlie Parker's Anthropology..." },
    { id: 's2',      text: "Sonny Rollins' Oleo..." },
    { id: 's3',      text: "and Duke Ellington's Cotton Tail." },
    { id: 'why1',    text: 'So why does it work? The A sections loop a fast turnaround: one, six, two, five.' },
    { id: 'why1b',   text: 'B flat, G minor seven, C minor seven, F seven, round and round.' },
    { id: 'why2',    text: 'The bridge is a chain of dominant sevenths around the circle of fifths.' },
    { id: 'why2b',   text: 'D seven, G seven, C seven, F seven.' },
    { id: 'why2c',   text: 'Each one is the five of the next, and it lands back on B flat.' },
    { id: 'why3',    text: 'A simple, strong skeleton that musicians knew by heart, ready for new melodies and solos.' },
    { id: 'why4',    text: "Writing a new tune over existing chords was common in jazz. It's called a contrafact." },
    { id: 'essence', text: "One song's skeleton, a thousand new melodies. That's rhythm changes." },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE SONG · ENDLESS TUNES', title: 'RHYTHM CHANGES', accent: true, tonic: 10, row: ['Bb', 'Gm7', 'Cm7', 'F7'], lead: 0.5, tail: 0.5 },
    { id: 'what', segs: ['what', 'what2'], label: 'WHERE IT COMES FROM', title: 'I Got Rhythm', sub: 'George & Ira Gershwin · 1930', circle: false, tonic: 10, gap: 0.3, tail: 0.6 },
    { id: 's', segs: ['s1', 's2', 's3'], label: 'YOU HEAR IT IN', title: 'SAME CHORDS', sub: 'new melodies on I Got Rhythm', circle: false, tonic: 10, gap: 0.2, tail: 1.0 },
    { id: 'why1', segs: ['why1', 'why1b'], label: 'WHY IT WORKS', title: 'THE A SECTIONS', tonic: 10, row: ['Bb', 'Gm7', 'Cm7', 'F7'], gap: 0.2, tail: 0.6 },
    { id: 'why2', segs: ['why2', 'why2b', 'why2c'], label: 'WHY IT WORKS', title: 'THE BRIDGE', tonic: 10, gap: 0.25, tail: 1.0 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'A STRONG SKELETON', tonic: 10, tail: 1.2 },
    { id: 'why4', segs: ['why4'], label: 'OLD CHORDS · NEW TUNE', title: 'CONTRAFACT', circle: false, tonic: 10, tail: 0.8 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'ONE SKELETON', accent: true, tonic: 10, row: ['Bb', 'Gm7', 'Cm7', 'F7'], gap: 0.5, tail: 2.0 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const PINK = '#ff7a93', TEAL = '#45d6c8', GOLD = '#ffcf5a', BLUE = '#62a8ff', GREEN = '#7be07b', LILAC = '#8d98ff';
    const MONO = { family: 'DM Mono', weight: 500 };
    const TOP = { y: 462, size: 44, ...MONO };
    const A = [['Bb6', 'Bb', 'Bb2'], ['Gm7', 'Gm7', 'G2'], ['Cm7', 'Cm7', 'C3'], ['F7', 'F7', 'F2']];
    const BR = [['D7', 'D7', 'D3'], ['G7', 'G7', 'G2'], ['C7', 'C7', 'C3'], ['F7', 'F7', 'F2']];
    const comp = len => [{ o: 0, v: 1 }, { o: B * 1.67, v: 0.5 }].filter(s => s.o < len - 0.05);
    const kit = (t0, t1, vel = 1) => {
      for (let t = t0, i = 0; t < t1 - 0.08; t += B, i++) {
        a.perc('hat', t, 0.3 * vel); if (i % 2) { a.perc('hat', t + B * 2 / 3, 0.22 * vel); a.perc('snare', t, 0.1 * vel); }
        a.perc('kick', t, 0.12 * vel);
      }
    };
    // walking-ish bass: root on beat 1, a chord tone on beat 2
    const walk = (bassNote, t, len, vel = 1) => {
      a.note(bassNote, t, Math.min(B, len) * 0.9, { vel: 0.4 * vel, show: false });
      if (len > B * 1.5) a.note(a.T.midi(bassNote) + 7, t + B, B * 0.9, { vel: 0.32 * vel, show: false });
    };
    // loop a list of [name, label, bass] chords, two beats each, from t0 to t1
    function loop(list, t0, t1, o = {}) {
      const out = [];
      let t = t0, i = 0;
      while (t < t1 - 0.15) {
        const [n, lbl, bs] = list[i % list.length], len = Math.min(2 * B, t1 - t);
        out.push(a.ch(n, t, t + len, { label: lbl, bass: false, vel: o.vel ?? 0.6, strikes: comp(len), row: o.rows ? (i % list.length) : null, hideName: o.hideName, shape: o.shape }));
        walk(bs, t, len, o.vel ? o.vel / 0.6 : 1);
        if (o.grid) o.grid.active.push({ t0: t, t1: t + len, i: i % list.length });
        t += len; i++;
      }
      kit(t0, t1, o.kit ?? 0.9);
      return out;
    }
    const rootWalker = (chs, t1, o = {}) => a.walker(chs.map(c => [c.t0, c.root]), { t1, dr: 34, color: o.color || GOLD, label: o.label ?? 'ROOT', labelDr: 82 });
    // two original motifs (not from any song), in B flat, as [note, beats]
    const M1 = [['D5', 1], ['F5', 0.67], ['G5', 0.33], ['F5', 1], ['D5', 1], ['Eb5', 0.67], ['C5', 0.33], ['Bb4', 2], [null, 1]];
    const M2 = [['F4', 0.33], ['G4', 0.33], ['Bb4', 0.34], ['D5', 1], [null, 1], ['C5', 0.67], ['A4', 0.33], ['G4', 1], ['F4', 2], [null, 1]];
    const motif = (m, t0, vel = 0.36) => { let t = t0; for (const [n, b] of m) { if (n) a.note(n, t, b * B * 0.9, { vel }); t += b * B; } return t; };

    // ---- hook: the A-section loop, root walking on the circle ----
    a.scale(0, 'Bb', a.T.MAJOR, { popIn: { t0: 0.02, step: 0.05 } });
    const hk = loop(A, 0.08, S('hook').t1, { rows: true });
    rootWalker(hk, S('hook').t1);

    // ---- what: the source song, then its form ----
    const w0 = S('what').t0, tGirl = a.w('what', 'Girl') - 0.1, tThirty = a.at('what2') - 0.05;
    const gS = a.grid([{ label: 'GIRL CRAZY', sub: 'THE MUSICAL · 1930', color: PINK, size: 56 }], w0, S('what').t1, { rows: 1, cols: 1, cw: 640, chh: 190, y: 470 });
    gS.active.push({ t0: tGirl, t1: tThirty, i: 0 });
    const FORM = [['A', '8 BARS', TEAL], ['A', '8 BARS', TEAL], ['B', 'BRIDGE', GOLD], ['A', '8 BARS', TEAL]];
    const gF = a.grid(FORM.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 72, subSize: 22 })), w0 + 0.3, S('what').t1, { rows: 1, cols: 4, cw: 220, chh: 220, y: 720, revealStep: 0.12, caption: '32 BARS · AABA' });
    gF.active.push({ t0: tThirty + 0.5, t1: S('what').t1, i: 0 }, { t0: tThirty + 0.65, t1: S('what').t1, i: 1 }, { t0: tThirty + 0.8, t1: S('what').t1, i: 2 }, { t0: tThirty + 0.95, t1: S('what').t1, i: 3 });
    a.big('IN B FLAT', a.w('what2', 'B'), S('what').t1, { y: 1080, size: 50, ...MONO, color: GOLD });
    loop(A, w0, S('what').t1, { hideName: true, shape: false, vel: 0.5, kit: 0.7 });

    // ---- songs: three new melodies, same chords (named only) ----
    const s0 = S('s').t0;
    const TUNES = [['ANTHROPOLOGY', 'CHARLIE PARKER', PINK, 's1', 'Anthropology'], ['OLEO', 'SONNY ROLLINS', TEAL, 's2', 'Oleo'], ['COTTON TAIL', 'DUKE ELLINGTON', GOLD, 's3', 'Cotton']];
    const gT = a.grid(TUNES.map(([l, s, c]) => ({ label: l, sub: s, color: c, size: 52, subSize: 24 })), s0, S('s').t1, { rows: 3, cols: 1, cw: 660, chh: 150, y: 450, revealStep: 0.15 });
    TUNES.forEach(([, , , seg, w], i) => gT.active.push({ t0: a.w(seg, w) - 0.15, t1: i < 2 ? a.w(TUNES[i + 1][3], TUNES[i + 1][4]) - 0.15 : S('s').t1, i }));
    const gC = a.grid(A.map(([, l]) => ({ label: l, color: '#ffffff', size: 40 })), s0, S('s').t1, { rows: 1, cols: 4, cw: 170, chh: 100, y: 940, caption: 'THE SAME CHORDS UNDERNEATH' });
    loop(A, s0 + 0.05, S('s').t1, { hideName: true, shape: false, grid: gC });

    // ---- why1: the A section: I - vi - ii - V, round and round ----
    const y0 = S('why1').t0, tOne = a.w('why1', 'one') - 0.05;
    a.scale(y0, 'Bb', a.T.MAJOR);
    const ya = loop(A, y0 + 0.05, a.at('why1b') - 0.1, { rows: true, vel: 0.55 });
    [['I', 'one', 'Bb'], ['vi', 'six', 'G'], ['ii', 'two', 'C'], ['V', 'five', 'F']].forEach(([r, w, p]) => a.tag(p, a.w('why1', w), S('why1').t1, r, { color: GOLD, dr: -75 }));
    const nb = [a.w('why1b', 'B'), a.w('why1b', 'G'), a.w('why1b', 'C'), a.w('why1b', 'F')].map(t => t - 0.05);
    const yb = A.map(([n, l, bs], i) => {
      const t1 = i < 3 ? nb[i + 1] : a.w('why1b', 'round');
      walk(bs, nb[i], t1 - nb[i]);
      return a.ch(n, nb[i], t1, { label: l, bass: false, row: i, vel: 0.65 });
    });
    a.ch('Gm7', a.at('why1b') - 0.1, nb[0], { bass: false, vel: 0.3, hideName: true, shape: false });
    const yr = loop(A, a.w('why1b', 'round'), S('why1').t1, { rows: true });
    kit(a.at('why1b') - 0.1, a.w('why1b', 'round'), 0.7);
    rootWalker([...ya, ...yb, ...yr], S('why1').t1);

    // ---- why2: the bridge walks the circle of fifths ----
    const b0 = S('why2').t0;
    a.scale(b0, 'Bb', a.T.MAJOR);
    a.layout(a.w('why2', 'circle') - 0.3, 1, 1.4);
    a.layout(S('why2').t1 - 0.6, 0, 0.6);
    loop(A, b0 + 0.05, a.at('why2b') - 0.1, { vel: 0.5, hideName: true });
    const tb = [a.w('why2b', 'D'), a.w('why2b', 'G'), a.w('why2b', 'C'), a.w('why2b', 'F')].map(t => t - 0.05);
    const tHome = a.w('why2c', 'B') - 0.05;
    const bridge = BR.map(([n, l, bs], i) => {
      const t1 = i < 3 ? tb[i + 1] : tHome;
      walk(bs, tb[i], Math.min(t1 - tb[i], 2 * B));
      return a.ch(n, tb[i], t1, { label: l, bass: false, vel: 0.7, strikes: [{ o: 0, v: 1 }, { o: B * 1.67, v: 0.5 }, { o: 4 * B, v: 0.7 }, { o: 5.67 * B, v: 0.45 }].filter(s => s.o < t1 - tb[i] - 0.05) });
    });
    a.ch('Bb6', tHome, S('why2').t1, { label: 'Bb', bass: 'Bb2', vel: 0.75 });
    kit(tb[0], S('why2').t1 - 0.6, 0.8);
    a.walker([...bridge.map(c => [c.t0, c.root]), [tHome, 'Bb']], { t1: S('why2').t1, dr: 34, color: GOLD, label: 'ROOT', labelDr: 82 });
    const tFive = a.w('why2c', 'five');
    a.big('EACH ONE IS V OF THE NEXT', tFive, S('why2').t1, { ...TOP, size: 38, color: TEAL });
    a.big('SECONDARY DOMINANTS', a.w('why2', 'dominant'), tFive, { ...TOP, size: 40, color: '#ffffff' });
    a.tag('Bb', tHome, S('why2').t1, 'HOME', { color: GOLD, dr: -75 });

    // ---- why3: same skeleton, two new (original) melodies on top ----
    const k0 = S('why3').t0;
    a.scale(k0, 'Bb', a.T.MAJOR);
    const kc = loop(A, k0 + 0.05, S('why3').t1, { vel: 0.55 });
    rootWalker(kc, S('why3').t1, { color: '#ffffff', label: '' });
    const tMel = a.w('why3', 'melodies') - 0.3;
    const m1 = motif(M1, Math.max(k0 + 0.1, kc[0].t0 + 0.0));
    const tM2 = Math.max(tMel, m1 + 0.3);
    const m2start = kc.find(c => c.t0 >= tM2 - 0.01 && c.name === 'Bb') || kc.find(c => c.t0 >= tM2 - 0.01);
    if (m2start) motif(M2, m2start.t0);
    a.big('SKELETON: KNOWN BY HEART', a.w('why3', 'skeleton'), tMel, { ...TOP, size: 38, color: '#ffffff' });
    a.big('NEW MELODIES ON TOP', tMel, S('why3').t1, { ...TOP, size: 40, color: GOLD });

    // ---- why4: contrafact = old chords + new tune ----
    const c0 = S('why4').t0, tNew = a.w('why4', 'new') - 0.1, tCon = a.w('why4', 'contrafact') - 0.1;
    const gK = a.grid([{ label: 'EXISTING CHORDS', sub: 'Bb · Gm7 · Cm7 · F7', color: TEAL, size: 46 }, { label: 'NEW TUNE', sub: 'WRITTEN ON TOP', color: GOLD, size: 46 }], c0, S('why4').t1, { rows: 2, cols: 1, cw: 660, chh: 190, y: 470 });
    gK.active.push({ t0: a.w('why4', 'existing') - 0.1, t1: S('why4').t1, i: 0 }, { t0: tNew, t1: S('why4').t1, i: 1 });
    a.big('= CONTRAFACT', tCon, S('why4').t1, { y: 950, size: 64, ...MONO, color: GOLD });
    loop(A, c0 + 0.05, S('why4').t1, { hideName: true, shape: false, vel: 0.55 });
    motif(M2, tNew, 0.32);

    // ---- essence: the loop once more, then home on B flat ----
    const e0 = S('essence').t0;
    a.scale(e0, 'Bb', a.T.MAJOR);
    const ec = loop(A, e0 + 0.05, a.at('cta') + 0.4, { rows: true });
    rootWalker(ec, S('essence').t1);
    const eEnd = ec[ec.length - 1].t1;
    a.ch('Bb6', eEnd, S('essence').t1 - 0.2, { notes: ['D3', 'G3', 'Bb3', 'D4', 'F4'], bass: 'Bb1', label: 'Bb', row: 0, vel: 0.8 });
    a.perc('kick', eEnd, 0.6); a.perc('hat', eEnd, 0.5);
    motif(M1, e0 + 0.1, 0.3);
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
