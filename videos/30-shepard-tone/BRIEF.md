# 30 — The Shepard Tone (slug: shepard-tone)
Idea: an auditory illusion of a sound that seems to rise (or fall) forever. Described by Roger Shepard in 1964.
Examples (part 1) — copyrighted, do not quote their music; recreate the illusion yourself:
- Dunkirk — Christopher Nolan / Hans Zimmer · 2017: the score is built around the Shepard tone illusion to create never-ending tension.
- Super Mario 64 · 1996: the endless staircase music uses a Shepard scale.
How to make it (audio): play the same pitch class in several octaves at once (e.g. octaves 2–6); give each octave a volume from a bell curve centred in the middle register. Step the pitch class up one half step every ~0.35 s: the top octave fades out while a new bottom one fades in, so it never actually gets higher. Use a.note(…, {vel, show:false}) for each octave layer.
Why (part 2), all true:
- Your ear judges pitch partly by pitch class (C, C#, D…) and partly by height; the illusion keeps the pitch class rising while the overall height stays put.
- Pitch classes form a circle — after twelve half steps you are "back" at C. The Shepard tone simply walks around that circle forever (great visual: a walker circling the chromatic circle endlessly).
- Composers use it to build tension that never resolves.
Essence: a staircase that only goes up and never arrives — tension with no ceiling.
