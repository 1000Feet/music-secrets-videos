# Music Secrets — project memory

## Standard narration voice (always use for videos)
- ElevenLabs voice: **Jeremy – Warm, Trustworthy, Sincere** (male, English)
- Voice ID: `EwzF7Z2UMSib9JaKx0Kg`
- Model: `eleven_v4`
- Endpoint: `/v1/text-to-speech/{voice_id}/with-timestamps` (already wired in `engine/tts.js`)
- Use this voice for every new video unless Angelo explicitly asks for a different one.

## Workflow
- Read `AUTHORING.md` before writing a video script; facts come only from each video's `BRIEF.md`.
- Render: `node engine/make.js videos/NN-slug` (narration + video), `--no-tts` for visual-only re-renders.
