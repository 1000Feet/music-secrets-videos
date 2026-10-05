# Authoring a new video

Every video is one folder `videos/NN-slug/` with a single `script.js`. Study two or three existing
scripts first (e.g. `reference/02-tritone/script.js`, `reference/05-pachelbel/script.js`,
`reference/08-circle-progression/script.js`) — they are the reference for tone, pacing and API use.

## Format (keep it consistent with the series)
- English narration, ~150–190 words total, **≤ 1000 characters** across all segments (ElevenLabs budget).
- Length target 80–100 s. Two halves:
  1. Hook → what it is → "You hear it in…" 2–4 songs (one short scene each, music plays in the tail).
  2. "So why does it work?" → 3–5 short scenes of real explanation → essence line → CTA
     (`'What should I break down next?'`, cta text `'Leave a song in the comments'`).
- Each segment ≤ ~14 words if it lives in a scene with other segments; never more than ~22 words
  (longer captions wrap to 4 lines and hit the keyboard — split them into two segments).
- Avoid quotes and hyphenated words you need to target with `a.w()` (e.g. "twenty-eight" cannot be
  matched; "Amen" in quotes cannot be matched). Words are matched case-sensitively first.
- Titles ≤ 22 chars, labels short and UPPERCASE. Song scenes: `label: 'YOU HEAR IT IN'`,
  `title: <song>`, `sub: '<Artist> · <year> · in <key>'` (omit the key if unsure).

## Facts and copyright — non-negotiable
- Use ONLY the facts given in your brief (songs, chords, keys, years). Do not add songs, dates or
  claims that are not in the brief. If something seems wrong, say so in your report instead.
- For copyrighted songs play only chord progressions, or at most a 2–3 note interval.
  Full melodies only for public-domain music (traditional, classical before ~1928).

## API cheatsheet (see engine/layout.js for all of it)
- `a.scene(id)` → `{t0,t1}`; `a.at(seg)` voice start; `a.end(seg)` speech end; `a.w(seg, 'word', n)` time of word.
- `a.scale(t, 'C', a.T.MAJOR | a.T.MINOR | [degs], { popIn: { t0, step } })` lit scale dots (same pattern → rotates).
- `a.ch('Am7', t0, t1, { notes:['A3','C4','E4'], bass:'A2' | false, row:i, label, strikes:[{o,v}], vel, shape:false, hideName, snap })`
- `a.seq(names, t0, t1, { rows, strikes:'pulse', vel })` evenly spaced chords.
- `a.note('C4', t, dur, { vel, show })`, `a.melody([['C4',1],['E4',2]], t0, beatSec)`, `a.perc('kick'|'snare'|'hat', t, vel)`.
- Overlays: `a.tag(pc, t0, t1, 'TEXT', {color, dr, x, y})`, `a.ring([pcs], t0, t1, {color})`,
  `a.arc(from, to, t0, t1, {steps, color, label, labelR})`, `a.line(a, b, t0, t1, {color, label, ly, arrow, dash})`,
  `a.ghost('Em', t0, t1, {label, ly})`, `a.poly([pcs], t0, t1, {closed, dash, color, glow})`,
  `a.walker([[t,'C'],[t,'D']], {t1, dr, color, label, labelDr})`, `a.big('3 : 2', t0, t1, {y, size, family, color})`,
  `a.lissajous(3, 2, t0, t1, {drawIn, labelA, labelB, res})`, `a.grid(cells, t0, t1, {rows, cols, cw, chh, y, revealStep})` (+ `g.active.push({t0,t1,i})`),
  `a.layout(t, 1)` morph to the circle of fifths (`a.layout(t, 0)` back).
- Scene options: `segs, label, title, sub, accent, tonic (pc number), row:[...], circle:false, min, tail, gap, lead`.
- Visual rules: the chord name sits at the circle centre — put line labels below it (`ly: 78`), tags at
  `dr:-92` (inside) or `dr:-75`, arc labels at `labelR: 70` or `165`. Walker labels outside: `labelDr: 82`.

## Workflow
1. Write `script.js`. 2. Preview without spending credits:
   `node engine/make.js videos/NN-slug --no-tts --stills 3 10 20 30 40 50 60 70 80`
   then look at `videos/NN-slug/build/still_*.jpg` (combine with ffmpeg hstack and Read the image).
   Fix overlaps, empty frames, captions over 3 lines, wrong sync.
3. Full render (spends ElevenLabs credits once): `node engine/make.js videos/NN-slug`
4. Check 6–8 frames of the final mp4 the same way, fix and re-render with `--no-tts` if needed.
5. Delete `videos/NN-slug/build/` when done (keeps disk usage low).

## Engine notes learned so far
- `a.tag`, rings, arcs, lines, walkers, ghosts and chord shapes fade with the circle: in `circle:false` scenes they are invisible — use `a.big` text or a grid there.
- The circle always labels black keys as C#, Eb, F#, Ab, Bb. If the narration says another spelling (G flat, G sharp…) add a small tag next to the note.
- The engine has no 9th/11th chord names: pass explicit `notes` and a `label` (e.g. `a.ch('D7', t0, t1, { notes: [...], label: 'D9' })`).
- Keyboard range is C2–G5.
- `a.note(m, t, dur, { tone: { partials: [1, 0.5, ...], attack, release, decay } })` plays an additive tone instead of the piano (`[1]` = pure sine; `m` may be fractional midi, e.g. `69 + 12 * Math.log2(f / 440)` for a frequency `f`). Fractional notes don't light keys: add a `vel: 0` integer note for that.
