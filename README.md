# React Learning Environment

A structured, documentation-first curriculum for engineers who want to understand React deeply — not just ship code.

## What this is

40 sessions split across 7 layers, progressing from JavaScript fundamentals through real-world React. Every session has a pre-quiz, concept explanation, lab, commit checkpoint, and post-quiz. You must score 80% on quizzes to advance.

## Curriculum Layers

| Layer | Topic | Sessions |
|-------|-------|----------|
| 1 | JavaScript Foundations | 01 – 07 |
| 2 | React Fundamentals | 08 – 15 |
| 3 | State | 16 – 22 |
| 4 | Mock Data | 23 – 26 |
| 5 | Testing | 27 – 31 |
| 6 | Architecture | 32 – 36 |
| 7 | Real World | 37 – 40 |

## Docs

All curriculum documentation lives in `/docs/` as static HTML. Serve it locally:

```bash
python -m http.server 6969 --directory docs
```

Then open `http://localhost:6969`.

## Tech Stack

- **Framework:** React via Vite
- **Package manager:** npm
- **Language:** Plain JavaScript (no TypeScript)
- **Styling:** Plain CSS
- **Testing:** Vitest + React Testing Library (Layer 5+)

## Rules

1. Never skip a session
2. One session = one commit
3. JavaScript concept always before the React concept
4. Score below 80% on a quiz = repeat the session
