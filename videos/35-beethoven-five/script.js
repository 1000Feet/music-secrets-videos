// Beethoven's Fifth: four notes, one rhythm, a whole symphony.
const E8 = 0.16;                    // one short note of the motif
const F1 = 1.3, GAP = 0.45, F2 = 1.7; // the two long notes and the breath between
const MOTIF_LEN = 3 * E8 + F1 + GAP + 3 * E8 + F2;

module.exports = {
  slug: 'beethoven-fifth',
  title: "Beethoven's Fifth",
  segments: [
    { id: 'hook',     text: 'Three short notes and one long one. Everybody knows them... but why do they hit so hard?' },
    { id: 'what',     text: "Beethoven's Symphony number five, in C minor, first performed in Vienna in 1808." },
    { id: 'play',     text: 'Here is how it opens.' },
    { id: 'names',    text: 'G, G, G, E flat. Then the same idea, one step lower: F, F, F, D.' },
    { id: 'why1',     text: "So why does it work? It's a motif: four notes, one rhythm. Short, short, short, long." },
    { id: 'why2',     text: 'And that rhythm comes back in all four movements, in some form.' },
    { id: 'why3',     text: 'Look at the notes too. G falls a major third, to E flat...' },
    { id: 'why4',     text: 'then F falls a minor third, to D. Two thirds that outline the world of C minor.' },
    { id: 'legend',   text: 'Legend says Beethoven called it fate knocking at the door.' },
    { id: 'legend2',  text: 'But the story comes from his secretary, Anton Schindler, and many historians doubt it.' },
    { id: 'journey',  text: 'What is certain: the symphony travels from C minor to a triumphant C major finale.' },
    { id: 'journey2', text: 'Darkness to light.' },
    { id: 'essence',  text: 'Four notes are enough. Repeat them, develop them, transform them...' },
    { id: 'essence2', text: 'and they can carry a whole symphony.' },
    { id: 'cta',      text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'FOUR NOTES', title: "BEETHOVEN'S FIFTH", accent: true, tonic: 0, lead: 2.5, tail: 0.5 },
    { id: 'what', segs: ['what'], label: 'SYMPHONY NO. 5', title: 'C MINOR', sub: 'Op. 67 · Vienna · 1808', tonic: 0, tail: 0.5 },
    { id: 'play', segs: ['play'], label: 'LISTEN', title: 'THE OPENING', sub: 'G G G Eb · F F F D', tonic: 0, tail: 0.25 + MOTIF_LEN + 0.4 },
    { id: 'names', segs: ['names'], label: 'THE SAME MOTIF', title: 'ONE STEP LOWER', tonic: 0, tail: 0.6 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'A MOTIF', tonic: 0, circle: false, tail: 0.9 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'ALL FOUR MOVEMENTS', tonic: 0, circle: false, tail: 0.9 },
    { id: 'why3', segs: ['why3', 'why4'], label: 'WHY IT WORKS', title: 'TWO FALLING THIRDS', tonic: 0, gap: 0.3, tail: 1.0 },
    { id: 'legend', segs: ['legend', 'legend2'], label: 'A LEGEND', title: 'FATE AT THE DOOR?', sub: 'the source: Anton Schindler', tonic: 0, gap: 0.4, tail: 0.7 },
    { id: 'journey', segs: ['journey', 'journey2'], label: 'C MINOR TO C MAJOR', title: 'DARKNESS TO LIGHT', tonic: 0, gap: 0.3, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'essence2', 'cta'], label: 'THE ESSENCE', title: 'FOUR NOTES', accent: true, tonic: 0, gap: 0.45, tail: 1.8 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', RED = '#ff5d6c', TEAL = '#45d6c8', BLUE = '#8d98ff';
    const MIN = a.T.MINOR, MAJ = a.T.MAJOR;
    // one note of the motif, in octaves like the orchestra's unison
    const oct = (p, t, d, vel, show = true) => {
      a.note(p + '4', t, d * 0.92, { vel, show });
      a.note(p + '3', t, d * 0.92, { vel: vel * 0.8, show: false });
      a.note(p + '2', t, d * 0.92, { vel: vel * 0.45, show: false });
    };
    // the motif: G G G Eb (hold) ... F F F D (hold). Returns walker points and end time.
    const motif = (t0, o = {}) => {
      const e = o.e ?? E8, vel = o.vel ?? 0.42;
      const seq = [['G', e], ['G', e], ['G', e], ['Eb', o.f1 ?? F1], [null, o.gap ?? GAP], ['F', e], ['F', e], ['F', e], ['D', o.f2 ?? F2]];
      const pts = [], hold = [];
      let t = t0;
      for (const [p, d] of seq.slice(0, o.half ? 4 : 9)) {
        if (p) { oct(p, t, d, vel, o.show ?? true); pts.push([t, p]); if (d > e) hold.push([t, t + d, p]); }
        t += d;
      }
      return { pts, hold, end: t };
    };
    // silent two-note shape (no audio) with a name in the centre
    const pair = (notes, label, t0, t1) => a.ch(notes[0].replace(/\d/, ''), t0, t1, { notes, bass: false, mute: true, label });

    // hook: the motif first, before the voice
    a.scale(0.2, 'C', MIN, { popIn: { t0: 0.3, step: 0.15 } });
    const h = motif(0.45, { half: true, f1: 1.6, vel: 0.46 });
    a.walker(h.pts, { t1: S('hook').t1, dr: -40, color: GOLD });
    pair(['Eb4', 'G4'], 'G – Eb', h.pts[3][0], S('hook').t1);
    ['C2', 'C3', 'Eb3', 'G3'].forEach(n => a.note(n, a.at('hook') + 0.1, S('hook').t1 - a.at('hook') - 0.3, { vel: 0.12, show: false }));

    // what: C minor
    a.ch('Cm', S('what').t0 + 0.05, S('what').t1, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.45 });
    a.ring(['C'], a.w('what', 'C'), S('what').t1, { color: GOLD });
    a.tag('C', a.w('what', 'C'), S('what').t1, 'TONIC', { color: GOLD, dr: -75 });

    // play: the opening (public domain), at tempo, in octaves
    const p = motif(a.end('play') + 0.25, { vel: 0.5 });
    a.walker(p.pts, { t1: S('play').t1, dr: -40, color: GOLD });
    pair(['Eb4', 'G4'], 'G – Eb', p.hold[0][0], p.hold[0][1] + GAP);
    pair(['D4', 'F4'], 'F – D', p.hold[1][0], S('play').t1);

    // names: each note on its spoken name
    const tn = [a.w('names', 'G', 0), a.w('names', 'G', 1), a.w('names', 'G', 2), a.w('names', 'E'),
      a.w('names', 'F', 0), a.w('names', 'F', 1), a.w('names', 'F', 2), a.w('names', 'D')];
    const nn = ['G', 'G', 'G', 'Eb', 'F', 'F', 'F', 'D'];
    nn.forEach((n, i) => a.note(n + '4', tn[i], i % 4 === 3 ? 0.9 : 0.25, { vel: 0.3 }));
    a.walker(nn.map((n, i) => [tn[i], n]), { t1: S('names').t1, dr: -40, color: GOLD });
    pair(['Eb4', 'G4'], 'G – Eb', tn[3], tn[4]);
    a.arc('G', 'F', a.w('names', 'step'), S('names').t1, { steps: -2, color: TEAL, dr: 30, label: 'ONE STEP DOWN', labelR: 360 });
    pair(['D4', 'F4'], 'F – D', tn[7], S('names').t1);

    // why1: four notes, one rhythm
    const r0 = a.w('why1', 'motif');
    const g1 = a.grid([['G', 'SHORT'], ['G', 'SHORT'], ['G', 'SHORT'], ['Eb', 'LONG']].map(([l, s], i) => ({ label: l, sub: s, size: 84, subSize: 26, color: i < 3 ? TEAL : GOLD })),
      r0, S('why1').t1, { rows: 1, cols: 4, cw: 240, chh: 280, y: 560, revealStep: 0.18, caption: 'FOUR NOTES · ONE RHYTHM' });
    const rt = [a.w('why1', 'Short'), a.w('why1', 'short', 0), a.w('why1', 'short', 1), a.w('why1', 'long')];
    rt.forEach((t, i) => { oct(nn[i], t, i === 3 ? 1.2 : 0.3, 0.3, false); g1.active.push({ t0: t, t1: i === 3 ? S('why1').t1 : rt[i + 1], i }); });
    const m1 = motif(r0 + 0.3, { half: true, f1: 0.8, vel: 0.3, show: false });
    m1.pts.forEach(([t], i) => g1.active.push({ t0: t, t1: i === 3 ? t + 0.8 : t + E8, i }));

    // why2: the rhythm returns in all four movements (shown as rhythm only)
    const g2 = a.grid(['I', 'II', 'III', 'IV'].map(l => ({ label: l, sub: 'MOVEMENT', size: 84, subSize: 22, color: GOLD })),
      S('why2').t0 + 0.1, S('why2').t1, { rows: 1, cols: 4, cw: 240, chh: 280, y: 560, caption: 'SHORT · SHORT · SHORT · LONG' });
    const q0 = a.w('why2', 'all'), ql = 0.95;
    for (let k = 0; k < 4; k++) {
      const t = q0 + k * ql;
      [0, 1, 2, 3].forEach(j => a.perc('kick', t + j * 0.15, j === 3 ? 0.9 : 0.6));
      a.note('C2', t + 0.45, 0.45, { vel: 0.3, show: false });
      g2.active.push({ t0: t, t1: k < 3 ? t + ql : S('why2').t1, i: k });
    }

    // why3: G -> Eb a major third, F -> D a minor third, inside C minor
    a.scale(S('why3').t0, 'C', MIN);
    const tG = a.w('why3', 'G'), tE = a.w('why3', 'E');
    const tF = a.w('why4', 'F'), tD = a.w('why4', 'D'), tC = a.w('why4', 'C');
    a.note('G4', tG, 0.6, { vel: 0.34 }); a.note('Eb4', tE, 1.0, { vel: 0.34 });
    a.arc('G', 'Eb', tG + 0.2, S('why3').t1, { steps: -4, color: GOLD, dr: 30 });
    a.big('G – Eb · MAJOR 3RD', tG + 0.2, tF, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: GOLD });
    a.big('F – D · MINOR 3RD', tF + 0.2, tC, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: TEAL });
    a.big('THE WORLD OF C MINOR', tC, S('why3').t1, { y: 462, size: 44, family: 'DM Mono', weight: 500, color: '#ff7a93' });
    pair(['Eb4', 'G4'], 'G – Eb', tG, tF);
    a.note('F4', tF, 0.6, { vel: 0.34 }); a.note('D4', tD, 1.0, { vel: 0.34 });
    a.arc('F', 'D', tF + 0.2, S('why3').t1, { steps: -3, color: TEAL, dr: 62 });
    pair(['D4', 'F4'], 'F – D', tF, tC - 0.04);
    a.ch('Cm', tC - 0.04, S('why3').t1, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.7 });
    a.ring(['G', 'Eb', 'F', 'D'], tC, S('why3').t1, { color: '#ffffff' });

    // legend: fate knocking? (only a legend)
    const tK = a.w('legend', 'knocking');
    a.ch('Cm', S('legend').t0 + 0.05, tK, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.4 });
    const k = motif(tK, { half: true, f1: 1.0, vel: 0.36 });
    k.pts.forEach(([t], i) => a.perc('kick', t, i === 3 ? 0.9 : 0.55));
    a.walker(k.pts, { t1: a.at('legend2'), dr: -40, color: GOLD });
    pair(['Eb4', 'G4'], 'G – Eb', k.pts[3][0], a.at('legend2'));
    a.big('A LEGEND', a.w('legend', 'Legend'), a.w('legend2', 'many'), { y: 462, size: 50, family: 'DM Mono', weight: 500, color: BLUE });
    a.big('DOUBTED', a.w('legend2', 'doubt'), S('legend').t1, { y: 462, size: 50, family: 'DM Mono', weight: 500, color: RED });
    a.ch('Cm', a.at('legend2'), S('legend').t1, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.4 });

    // journey: C minor to C major
    a.scale(S('journey').t0, 'C', MIN);
    const tMaj = a.w('journey', 'C', 1) - 0.04, tTri = a.w('journey', 'triumphant');
    a.ch('Cm', S('journey').t0 + 0.05, tMaj, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.6 });
    a.ch('C', tMaj, a.at('journey2'), { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.85, strikes: [{ o: 0, v: 1 }, { o: 0.6, v: 0.6 }, { o: 1.2, v: 0.8 }] });
    a.scale(tMaj, 'C', MAJ);
    a.arc('Eb', 'E', tMaj, a.at('journey2'), { steps: 1, color: GOLD, dr: 30 });
    a.tag('E', tMaj + 0.15, a.at('journey2'), 'MAJOR', { color: GOLD, dr: -75 });
    const tDk = a.w('journey2', 'Darkness') - 0.04, tLt = a.w('journey2', 'light') - 0.04;
    a.scale(tDk, 'C', MIN);
    a.ch('Cm', tDk, tLt, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.6 });
    a.scale(tLt, 'C', MAJ);
    a.ch('C', tLt, S('journey').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.95 });
    a.tag('Eb', tDk, tLt, 'DARK', { color: BLUE, dr: -75 });
    a.tag('E', tLt, S('journey').t1, 'LIGHT', { color: GOLD, dr: -75 });

    // essence: repeat (G G G Eb), develop (F F F D), transform (C major, same rhythm)
    a.scale(S('essence').t0, 'C', MIN);
    const tRep = a.w('essence', 'Repeat'), tDev = a.w('essence', 'develop'), tTr = a.w('essence', 'transform');
    const er = motif(tRep, { half: true, f1: 0.7, vel: 0.36 });
    const fm = [['F', 0], ['F', 1], ['F', 2], ['D', 3]].map(([n, i]) => { const t = tDev + i * E8; oct(n, t, i === 3 ? 0.7 : E8, 0.36); return [t, n]; });
    a.ch('Cm', S('essence').t0 + 0.05, tRep, { notes: ['C4', 'Eb4', 'G4'], bass: 'C3', vel: 0.5 });
    a.walker([...er.pts, ...fm], { t1: tTr + 0.4, dr: -40, color: GOLD });
    pair(['Eb4', 'G4'], 'G – Eb', er.pts[3][0], tDev);
    pair(['D4', 'F4'], 'F – D', fm[3][0], tTr);
    a.scale(tTr, 'C', MAJ);
    const cs = [0, 1, 2].map(i => ({ o: i * E8, v: 0.8 })).concat([{ o: 3 * E8, v: 1 }]);
    a.ch('C', tTr, a.at('essence2'), { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C2', vel: 0.8, strikes: cs });
    const cs2 = [0, 1, 2].map(i => ({ o: i * E8, v: 0.8 })).concat([{ o: 3 * E8, v: 1 }]);
    a.ch('C', a.at('essence2'), S('essence').t1 - 0.3, { notes: ['E4', 'G4', 'C5', 'E5'], bass: 'C2', vel: 0.9, strikes: cs2 });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
