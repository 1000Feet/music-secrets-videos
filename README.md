# Music Secrets — videos

Vertical 9:16 music-theory explainers for the Music Secrets channel (Instagram, Facebook, TikTok, YouTube).
English narration (ElevenLabs `eleven_v4`, voice "Jeremy"), all music synthesized from scratch.

- `engine/` — renderer (see `AUTHORING.md` for how to write a new video)
- `reference/` — scripts of the first 10 videos (rendered in the sky-high-ai-scape repo)
- `videos/NN-slug/` — `BRIEF.md` (verified facts), `script.js`, narration (`vo/`, `voice.json`) and the final mp4

```
node engine/make.js videos/NN-slug                     # narration (only new lines) + render
node engine/make.js videos/NN-slug --no-tts --stills 5 30   # preview frames
```
