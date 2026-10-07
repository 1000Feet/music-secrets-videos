// What is a fugue: one short theme (the subject) that voices take turns to play, overlapping.
// Bach's subjects are NOT reconstructed: every musical example uses an ORIGINAL demo subject in C
// (checked for consonance in exposition, episode and stretto). The Musical Offering scene plays
// only generic C minor chords (the royal theme is named, never played).
const B = 0.28;   // one beat
// the original subject: two bars of 4/4, [note, beats]
const SUBJ = [['C4', 1], ['G4', 0.5], ['A4', 0.5], ['B4', 1], ['A4', 1], ['E4', 0.5], ['F4', 0.5], ['G4', 1], ['D4', 1], ['C4', 1]];
// the countersubject (written against the answer in G, invertible against the subject in C)
const CS = [['B3', 1.5], ['C4', 0.5], ['A3', 1], ['G3', 0.5], ['C4', 0.5], ['D4', 0.5], ['E4', 0.5], ['B3', 1], ['C4', 1], ['B3', 1]];
const ALTO3 = [['G3', 1], ['C4', 1], ['G3', 1], ['A3', 1], ['C4', 1], ['B3', 2], ['C4', 1]];
// stretto free parts
const BASSF = [['G2', 2], ['D2', 1], ['C2', 1], ['G2', 1], ['B2', 1], ['D2', 1], ['G2', 1]];
const ALTOF = [['G4', 1], ['G4', 1], ['F#4', 1], ['D4', 1]];
// episode: a falling-fifths sequence through E7 Am, A7 Dm, D7 G, G7 C
const EP_S = [['G#4', 0.5], ['B4', 0.5], ['A4', 0.5], ['E4', 0.5], ['C#5', 0.5], ['E5', 0.5], ['D5', 0.5], ['A4', 0.5], ['F#4', 0.5], ['A4', 0.5], ['G4', 0.5], ['D4', 0.5], ['B4', 0.5], ['D5', 0.5], ['C5', 0.5], ['G4', 0.5]];
const EP_A = [['D4', 1], ['C4', 1], ['G4', 1], ['F4', 1], ['C4', 1], ['B3', 1], ['F4', 1], ['E4', 1]];
const EP_B = [['E3', 1], ['A2', 1], ['A3', 1], ['D3', 1], ['D3', 1], ['G2', 1], ['G3', 1], ['C3', 1]];
// the same subject and countersubject in minor keys (A minor -> E minor answer, D minor -> A minor answer)
const SUBJ_Am = [['A3', 1], ['E4', 0.5], ['F4', 0.5], ['G#4', 1], ['F4', 1], ['C4', 0.5], ['D4', 0.5], ['E4', 1], ['B3', 1], ['A3', 1]];
const CS_Em = [['G3', 1.5], ['A3', 0.5], ['F#3', 1], ['E3', 0.5], ['A3', 0.5], ['B3', 0.5], ['C4', 0.5], ['G3', 1], ['A3', 1], ['G3', 1]];
const SUBJ_Dm = [['D4', 1], ['A4', 0.5], ['Bb4', 0.5], ['C#5', 1], ['Bb4', 1], ['F4', 0.5], ['G4', 0.5], ['A4', 1], ['E4', 1], ['D4', 1]];
const CS_Am = [['C4', 1.5], ['D4', 0.5], ['B3', 1], ['A3', 0.5], ['D4', 0.5], ['E4', 0.5], ['F4', 0.5], ['C4', 1], ['D4', 1], ['C4', 1]];

// voices: V1 (alto), V2 (soprano), V3 (bass); each part = [material, start beat, transpose]
const EXPO = [[[SUBJ, 0, 0], [CS, 8, 0], [ALTO3, 16, 0]], [[SUBJ, 8, 7], [CS, 16, 5]], [[SUBJ, 16, -24]]];
const STRETTO = [[[SUBJ, 4, 0], [ALTOF, 12, 0]], [[SUBJ, 8, 7]], [[SUBJ, 0, -24], [BASSF, 8, 0]]];
const EPISODE = [[[EP_A, 0, 0]], [[EP_S, 0, 0]], [[EP_B, 0, 0]]];
const MINOR_A = [[[SUBJ_Am, 0, 0], [CS_Em, 8, 0]], [[SUBJ_Am, 8, 7]]];
const MINOR_D = [[[SUBJ_Dm, 0, 0], [CS_Am, 8, 0]], [[SUBJ_Dm, 8, 7]]];

module.exports = {
  slug: 'fugue',
  title: 'What Is a Fugue?',
  segments: [
    { id: 'hook',    text: 'One short tune. A second voice plays it, then a third... and it all fits.' },
    { id: 'what',    text: "That's a fugue: a whole piece grown from one theme, called the subject." },
    { id: 'wtc',     text: "You hear it in Bach's Well-Tempered Clavier: forty eight preludes and fugues, in two books." },
    { id: 'aof',     text: 'in The Art of Fugue, left unfinished when he died in 1750...' },
    { id: 'mo',      text: 'and The Musical Offering, on a theme King Frederick the Great gave him in Potsdam.' },
    { id: 'why1',    text: 'So how does it work? One voice plays the subject alone.' },
    { id: 'why2',    text: 'A second voice answers: the same tune, a fifth higher.' },
    { id: 'why3',    text: 'Meanwhile, the first voice continues with a countermelody, the countersubject.' },
    { id: 'why4',    text: 'More voices enter one by one. Between entries, episodes travel through other keys.' },
    { id: 'why5',    text: "Near the end, entries overlap more tightly. That's stretto: the intensity builds." },
    { id: 'why6',    text: 'Entries on the home key and the fifth establish the key. Imitation gives it unity.' },
    { id: 'essence', text: 'One small idea, layered against itself... and it grows into a cathedral of sound.' },
    { id: 'cta',     text: 'What should I break down next?' },
  ],
  scenes: [
    { id: 'hook', segs: ['hook'], label: 'ONE THEME, MANY VOICES', title: 'THE FUGUE', accent: true, circle: false, tonic: 0, min: 0.3 + 24 * B + 1.4 },
    { id: 'what', segs: ['what'], label: 'ONE THEME', title: 'THE SUBJECT', sub: 'an original demo theme · in C', tonic: 0, min: 0.15 + 16 * B + 0.6 },
    { id: 'wtc', segs: ['wtc'], label: 'YOU HEAR IT IN', title: 'Well-Tempered Clavier', sub: 'J. S. Bach · two books', circle: false, tonic: 9, min: 0.15 + 16 * B + 1.2 },
    { id: 'aof', segs: ['aof'], label: 'YOU HEAR IT IN', title: 'The Art of Fugue', sub: 'J. S. Bach · 1750', circle: false, tonic: 2, tail: 1.6 },
    { id: 'mo', segs: ['mo'], label: 'YOU HEAR IT IN', title: 'The Musical Offering', sub: 'J. S. Bach · 1747 · Potsdam', circle: false, tonic: 0, tail: 1.4 },
    { id: 'why1', segs: ['why1'], label: 'WHY IT WORKS', title: 'ONE VOICE ALONE', tonic: 0, tail: 0.6 },
    { id: 'why2', segs: ['why2'], label: 'WHY IT WORKS', title: 'THE ANSWER', tonic: 0, tail: 1.4 },
    { id: 'why3', segs: ['why3'], label: 'WHY IT WORKS', title: 'COUNTERSUBJECT', tonic: 0, tail: 0.9 },
    { id: 'why4', segs: ['why4'], label: 'WHY IT WORKS', title: 'ENTRIES & EPISODES', circle: false, tonic: 0, min: 0.3 + 16 * B + 1.4, tail: 1.0 },
    { id: 'why5', segs: ['why5'], label: 'NEAR THE END', title: 'STRETTO', circle: false, tonic: 0, min: 0.2 + 16 * B + 1.2, tail: 0.6 },
    { id: 'why6', segs: ['why6'], label: 'WHY IT WORKS', title: 'HOME AND FIFTH', tonic: 0, tail: 1.2 },
    { id: 'essence', segs: ['essence', 'cta'], label: 'THE ESSENCE', title: 'A CATHEDRAL OF SOUND', accent: true, tonic: 0, gap: 0.5, tail: 2.6 },
  ],
  build(a) {
    const S = id => a.scene(id);
    const GOLD = '#ffcf5a', TEAL = '#45d6c8', PINK = '#ff7a93', BLUE = '#62a8ff', GRAY = '#3a3a42', RED = '#ff5d6c';
    const MONO = { family: 'DM Mono', weight: 500 };
    const VCOL = [GOLD, TEAL, PINK], VDR = [36, -40, -88], VVEL = [0.36, 0.34, 0.4];
    const pcOf = m => a.T.NAMES[a.T.mod(a.T.midi(m), 12)];

    // play a set of voices (see EXPO); beats [from, to) are mapped to start at t0; cut stops all sound
    function voices(spec, t0, b, o = {}) {
      const from = o.from ?? 0, to = o.to ?? 1e9;
      return spec.map((parts, k) => {
        const pts = [];
        parts.forEach(([mat, st, tr]) => {
          let beat = st;
          mat.forEach(([n, d]) => {
            if (beat >= from && beat < to) {
              const t = t0 + (beat - from) * b, m = a.T.midi(n) + tr;
              let dur = d * b * 0.94;
              if (o.cut !== undefined) dur = Math.min(dur, o.cut - t);
              if (o.cut === undefined || t < o.cut - 0.02) {
                a.note(m, t, dur, { vel: (o.vel ?? 1) * VVEL[k], show: o.show ?? false });
                pts.push([t, pcOf(m)]);
              }
            }
            beat += d;
          });
        });
        return pts;
      });
    }
    const walkers = (pts, t1, labels) => pts.forEach((p, k) => p.length && a.walker(p, { t1, dr: VDR[k], color: VCOL[k], label: labels ? labels[k] : undefined, labelDr: k ? -42 : 50 }));
    const shape = (name, t0, t1, notes) => a.ch(name, t0, t1, { notes, bass: false, mute: true });
    const C_TRI = ['C4', 'E4', 'G4'], G_TRI = ['G3', 'B3', 'D4'];
    const fin = (t0, t1, vel = 0.7) => a.ch('C', t0, t1, { notes: ['C3', 'G3', 'C4', 'E4', 'G4', 'C5'], bass: 'C2', vel });
    // voice lanes: rows = voices, cells [label, sub, color] or null (empty)
    const lanes = (rows, t0, t1, o = {}) => {
      const cells = [];
      rows.forEach(r => r.forEach(c => cells.push(c ? { label: c[0], sub: c[1], color: c[2], size: o.size ?? 36, subSize: 20 } : { label: '·', color: GRAY, size: 36 })));
      return a.grid(cells, t0, t1, { rows: rows.length, cols: rows[0].length, cw: o.cw ?? 300, chh: o.chh ?? 160, y: o.y ?? 480, x: o.x, revealStep: o.reveal ?? 0.03, caption: o.caption });
    };

    // ---------- hook: the exposition, three voices entering one after another ----------
    const h0 = 0.3;
    const gH = lanes([
      [['SUBJECT', 'VOICE 1', GOLD], ['COUNTER', 'VOICE 1', GOLD], ['FREE', 'VOICE 1', GOLD]],
      [null, ['ANSWER', 'VOICE 2', TEAL], ['COUNTER', 'VOICE 2', TEAL]],
      [null, null, ['SUBJECT', 'VOICE 3', PINK]],
    ], 0.05, S('hook').t1, { reveal: 0.02, caption: 'EACH VOICE ENTERS IN TURN' });
    voices(EXPO, h0, B);
    [[0, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2, 2]].forEach(([r, c]) => gH.active.push({ t0: h0 + c * 8 * B, t1: h0 + (c + 1) * 8 * B, i: r * 3 + c }));
    fin(h0 + 24 * B, S('hook').t1, 0.6);

    // ---------- what: the subject alone, twice ----------
    a.scale(S('what').t0, 'C', a.T.MAJOR, { popIn: { t0: S('what').t0 + 0.1, step: 0.06 } });
    const w0 = S('what').t0 + 0.15;
    const wp = voices([[[SUBJ, 0, 0], [SUBJ, 8, 0]]], w0, B, { show: true, vel: 1.1 });
    walkers(wp, S('what').t1);
    a.big('FUGUE', a.w('what', 'fugue'), S('what').t1, { y: 830, size: 96, color: '#ffffff', blur: 20 });
    a.tag(0, a.w('what', 'subject') - 0.05, S('what').t1, 'THE SUBJECT', { x: 540, y: 462, color: GOLD });

    // ---------- Well-Tempered Clavier: 2 books x 24 (demo subject in A minor) ----------
    const nums = Array.from({ length: 24 }, (_, i) => ({ label: String(i + 1), size: 26, color: BLUE }));
    const nums2 = Array.from({ length: 24 }, (_, i) => ({ label: String(i + 1), size: 26, color: TEAL }));
    const gw1 = a.grid(nums, S('wtc').t0 + 0.05, S('wtc').t1, { rows: 6, cols: 4, cw: 96, chh: 62, x: 300, y: 520, revealStep: 0.015 });
    const gw2 = a.grid(nums2, S('wtc').t0 + 0.2, S('wtc').t1, { rows: 6, cols: 4, cw: 96, chh: 62, x: 780, y: 520, revealStep: 0.015 });
    a.big('BOOK I', S('wtc').t0 + 0.05, S('wtc').t1, { x: 300, y: 480, size: 34, ...MONO, color: BLUE, blur: 0 });
    a.big('BOOK II', S('wtc').t0 + 0.2, S('wtc').t1, { x: 780, y: 480, size: 34, ...MONO, color: TEAL, blur: 0 });
    const tF = a.w('wtc', 'forty') - 0.05, sw = 1.6;
    for (let i = 0; i < 24; i++) { gw1.active.push({ t0: tF + i * sw / 48, t1: S('wtc').t1, i }); gw2.active.push({ t0: tF + (24 + i) * sw / 48, t1: S('wtc').t1, i }); }
    a.big('48', tF, S('wtc').t1, { y: 1000, size: 110, color: GOLD, blur: 24 });
    a.big('PRELUDES & FUGUES', a.w('wtc', 'preludes') - 0.05, S('wtc').t1, { y: 1105, size: 36, ...MONO, color: '#ffffff', blur: 0 });
    const m0 = S('wtc').t0 + 0.15;
    voices(MINOR_A, m0, B);
    a.ch('Am', m0 + 16 * B, S('wtc').t1, { notes: ['A3', 'C4', 'E4', 'A4'], bass: 'A2', vel: 0.5, shape: false, hideName: true });

    // ---------- The Art of Fugue: unfinished (demo subject in D minor, cut off mid-phrase) ----------
    const gA = lanes([[['SUBJECT', 'VOICE 1', GOLD], ['COUNTER', 'VOICE 1', GOLD], ['?', '', '#9a9aa2']], [null, ['ANSWER', 'VOICE 2', TEAL], ['?', '', '#9a9aa2']]],
      S('aof').t0 + 0.05, S('aof').t1, { y: 500, chh: 170 });
    const d0 = S('aof').t0 + 0.15, tCut = d0 + 12.5 * B;
    voices(MINOR_D, d0, B, { cut: tCut });
    gA.active.push({ t0: d0, t1: d0 + 8 * B, i: 0 }, { t0: d0 + 8 * B, t1: tCut, i: 1 }, { t0: d0 + 8 * B, t1: tCut, i: 4 });
    a.big('UNFINISHED', a.w('aof', 'unfinished') - 0.05, S('aof').t1, { y: 950, size: 76, color: RED, blur: 24 });
    a.big('1750', a.w('aof', '1750') - 0.05, S('aof').t1, { y: 1070, size: 56, ...MONO, color: '#ffffff', blur: 0 });

    // ---------- The Musical Offering: a king's theme (named only; generic C minor chords) ----------
    const gM = a.grid([{ label: 'KING', sub: 'FREDERICK', size: 52, color: GOLD }, { label: 'THEME', sub: 'GIVEN TO BACH', size: 52, color: TEAL }, { label: 'BACH', sub: 'A FUGUE', size: 52, color: PINK }],
      S('mo').t0 + 0.05, S('mo').t1, { rows: 1, cols: 3, cw: 310, chh: 230, y: 560, revealStep: 0.12 });
    const tTh = a.w('mo', 'theme') - 0.05, tK = a.w('mo', 'King') - 0.05, tHim = a.w('mo', 'him') - 0.05;
    gM.active.push({ t0: tTh, t1: S('mo').t1, i: 1 }, { t0: tK, t1: S('mo').t1, i: 0 }, { t0: tHim, t1: S('mo').t1, i: 2 });
    a.big('1747', S('mo').t0 + 0.4, a.w('mo', 'Potsdam') - 0.1, { y: 960, size: 64, ...MONO, color: '#ffffff', blur: 0 });
    a.big('POTSDAM', a.w('mo', 'Potsdam') - 0.05, S('mo').t1, { y: 960, size: 64, color: GOLD, blur: 20 });
    const MO = [['Cm', ['G3', 'C4', 'Eb4'], 'C2'], ['Fm', ['Ab3', 'C4', 'F4'], 'F2'], ['G', ['G3', 'B3', 'D4'], 'G2'], ['Cm', ['G3', 'C4', 'Eb4'], 'C2']];
    const o0 = S('mo').t0 + 0.1, ol = (S('mo').t1 - o0 - 0.1) / 4;
    MO.forEach(([n, notes, bass], i) => a.ch(n, o0 + i * ol, o0 + (i + 1) * ol, { notes, bass, vel: 0.5, shape: false, hideName: true,
      strikes: [0, 1, 2, 3].map(k => ({ o: k * ol / 4, v: k ? 0.4 : 0.9 })) }));

    // ---------- why1: one voice, the subject alone, on C ----------
    a.scale(S('why1').t0, 'C');
    const y0 = a.w('why1', 'One') - 0.05;
    shape('C', S('why1').t0 + 0.1, S('why1').t1, C_TRI);
    walkers(voices([[[SUBJ, 0, 0]]], y0, B, { show: true, vel: 1.1 }), S('why1').t1);
    a.tag(0, y0, S('why1').t1, 'SUBJECT ON C', { x: 540, y: 462, color: GOLD });

    // ---------- why2: the answer, a fifth higher, on G (voice 1 goes on underneath) ----------
    const z0 = a.w('why2', 'answers') - 0.05;
    shape('C', S('why2').t0, z0, C_TRI);
    shape('G', z0, S('why2').t1, G_TRI);
    const zp = voices([[[CS, 0, 0]], [[SUBJ, 0, 7]]], z0, B, { show: true });
    walkers([zp[0], zp[1]], S('why2').t1);
    a.arc('C', 'G', a.w('why2', 'fifth') - 0.1, S('why2').t1, { steps: 7, color: TEAL, label: 'A FIFTH UP', labelR: 165 });
    a.tag(0, z0, S('why2').t1, 'ANSWER ON G', { x: 540, y: 462, color: TEAL });

    // ---------- why3: answer + countersubject together ----------
    const x0 = a.w('why3', 'first') - 0.05, XB = 0.36;
    const xp = voices([[[CS, 0, 0]], [[SUBJ, 0, 7]]], x0, XB, { show: true, vel: 1.1 });
    walkers([xp[0], xp[1]], S('why3').t1);
    a.big('ANSWER', x0, x0 + 8 * XB, { y: 795, size: 52, color: TEAL, blur: 14 });
    a.big('+ COUNTER', x0 + 0.3, x0 + 8 * XB, { y: 865, size: 52, color: GOLD, blur: 14 });
    a.ch('G', x0 + 8 * XB, S('why3').t1, { notes: ['G3', 'B3', 'D4', 'G4'], bass: 'G2', vel: 0.45 });
    a.tag(0, a.w('why3', 'countermelody') - 0.05, S('why3').t1, 'COUNTERSUBJECT', { x: 540, y: 462, color: GOLD });

    // ---------- why4: the third entry, then an episode through new keys ----------
    const gE = lanes([
      [['SUBJECT', 'ENTRY', GOLD], ['COUNTER', '', GOLD], ['FREE', '', GOLD], ['EPISODE', 'NEW KEYS', BLUE]],
      [null, ['ANSWER', 'ENTRY', TEAL], ['COUNTER', '', TEAL], ['EPISODE', 'NEW KEYS', BLUE]],
      [null, null, ['SUBJECT', 'ENTRY', PINK], ['EPISODE', 'NEW KEYS', BLUE]],
    ], S('why4').t0 + 0.05, S('why4').t1, { cw: 232, chh: 150, size: 32, y: 470, caption: 'ENTRY · ENTRY · ENTRY · EPISODE' });
    const e0 = S('why4').t0 + 0.3;
    voices(EXPO, e0, B, { from: 16, to: 24 });
    voices(EPISODE, e0 + 8 * B, B);
    fin(e0 + 16 * B, S('why4').t1, 0.55);
    const tMore = a.w('why4', 'More') - 0.05;
    [[0, a.w('why4', 'More')], [5, a.w('why4', 'voices')], [10, a.w('why4', 'enter')]].forEach(([i, t]) => gE.active.push({ t0: t - 0.05, t1: e0 + 8 * B, i }));
    gE.active.push({ t0: e0, t1: e0 + 8 * B, i: 2 }, { t0: e0, t1: e0 + 8 * B, i: 6 });
    [3, 7, 11].forEach(i => gE.active.push({ t0: e0 + 8 * B, t1: e0 + 16 * B, i }));
    a.big('THROUGH OTHER KEYS', a.w('why4', 'keys') - 0.3, S('why4').t1, { y: 1060, size: 42, ...MONO, color: BLUE, blur: 10 });

    // ---------- why5: stretto - entries every bar instead of every two bars ----------
    const S6 = (rows) => rows.map(r => r.map(c => (c ? [c[0], '', c[1]] : null)));
    lanes(S6([[['S', GOLD], ['S', GOLD], null, null, null, null], [null, null, ['A', TEAL], ['A', TEAL], null, null], [null, null, null, null, ['S', PINK], ['S', PINK]]]),
      S('why5').t0 + 0.05, S('why5').t1, { cw: 140, chh: 76, y: 465, size: 34, reveal: 0.01, caption: 'EXPOSITION · EVERY 2 BARS' });
    const gS = lanes(S6([[null, ['S', GOLD], ['S', GOLD], null, null, null], [null, null, ['A', TEAL], ['A', TEAL], null, null], [['S', PINK], ['S', PINK], null, null, null, null]]),
      S('why5').t0 + 0.4, S('why5').t1, { cw: 140, chh: 76, y: 815, size: 34, reveal: 0.01, caption: 'STRETTO · EVERY BAR' });
    const s0 = S('why5').t0 + 0.2;
    voices(STRETTO, s0, B);
    fin(s0 + 16 * B, S('why5').t1, 0.7);
    [[2, 0, 0], [2, 1, 1], [0, 1, 1], [0, 2, 2], [1, 2, 2], [1, 3, 3]].forEach(([r, c, k]) => gS.active.push({ t0: s0 + k * 4 * B, t1: s0 + (k + 1) * 4 * B, i: r * 6 + c }));
    a.big('MORE INTENSITY', a.w('why5', 'intensity') - 0.05, S('why5').t1, { y: 1130, size: 40, ...MONO, color: GOLD, blur: 10 });

    // ---------- why6: home key and fifth ----------
    a.scale(S('why6').t0, 'C');
    const u0 = S('why6').t0 + 0.15;
    shape('C', u0, u0 + 8 * B, C_TRI);
    shape('G', u0 + 8 * B, u0 + 16 * B, G_TRI);
    const up = voices([[[SUBJ, 0, 0], [CS, 8, 0]], [[SUBJ, 8, 7]]], u0, B, { show: true });
    walkers(up, u0 + 16 * B + 0.6);
    a.ch('C', u0 + 16 * B, S('why6').t1, { notes: ['C4', 'E4', 'G4', 'C5'], bass: 'C3', vel: 0.55 });
    a.ring(['C'], a.w('why6', 'home') - 0.05, S('why6').t1, { color: GOLD });
    a.tag('C', a.w('why6', 'home') - 0.05, S('why6').t1, 'HOME', { color: GOLD, dr: -92 });
    a.ring(['G'], a.w('why6', 'fifth') - 0.05, S('why6').t1, { color: TEAL });
    a.tag('G', a.w('why6', 'fifth') - 0.05, S('why6').t1, 'FIFTH', { color: TEAL, dr: -92 });
    a.tag(0, a.w('why6', 'Imitation') - 0.05, S('why6').t1, 'IMITATION = UNITY', { x: 540, y: 462, color: PINK });

    // ---------- essence: the stretto once more, three walkers, then the full C chord ----------
    a.scale(S('essence').t0, 'C');
    const q0 = S('essence').t0 + 0.15, qb = 0.3;
    walkers(voices(STRETTO, q0, qb, { show: true }), q0 + 16 * qb + 0.5);
    a.big('ONE IDEA', a.w('essence', 'One') - 0.05, a.w('essence', 'layered') - 0.05, { y: 830, size: 70, color: '#ffffff', blur: 18 });
    a.big('LAYERED', a.w('essence', 'layered') - 0.05, q0 + 16 * qb, { y: 830, size: 70, color: GOLD, blur: 18 });
    fin(q0 + 16 * qb, S('essence').t1 - 0.3, 0.85);
    a.ring(['C', 'E', 'G'], q0 + 16 * qb, S('essence').t1, { color: GOLD });
    a.cta(a.at('cta') + 0.6, 'Leave a song in the comments');
  },
};
