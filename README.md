# Theory Trainer

A personal flashcards learning app for senior Java/Spring technical interview preparation.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- Local JSON card datasets
- LocalStorage persistence

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Architecture

All logic is client-side under `src/`:

- `components/` reusable UI blocks
- `pages/` route-level screens
- `hooks/` theme/study hooks
- `store/` Zustand persisted review state
- `services/` JSON card loading
- `data/` flashcard topics in JSON
- `types/` shared domain types
- `utils/` spaced repetition/date/stats helpers
- `router/` route definitions

## Features

- Dashboard with total cards, mastered cards, due cards, streak, and topic progress
- Topics page with card count, mastery, and last studied date
- Study mode by topic
- Random mode (mixed cards)
- Weak areas mode (cards frequently marked Again/Hard)
- Search across topic/question/answer
- Dark mode toggle
- Keyboard shortcuts:
  - `Space` reveal answer
  - `1` Again
  - `2` Hard
  - `3` Good
  - `4` Easy
  - `←` / `→` navigation
- Statistics page for review activity and topic progress

## Spaced repetition logic

Implemented in `src/utils/spacedRepetition.ts`:

- **Again**: due immediately (kept in current session queue)
- **Hard**: due in ~10 minutes
- **Good**: due roughly next day (based on ease)
- **Easy**: due in several days (based on ease)

Per-card review state is stored in LocalStorage with:

- `lastReviewed`
- `nextReview`
- `easeLevel`
- `reviewCount`
- `successCount`
- `againCount`
- `hardCount`

## Add new flashcards

1. Create a new JSON file in `src/data/`.
2. Follow this format:

```json
{
  "topic": "Topic name",
  "cards": [
    {
      "id": "topic-001",
      "question": "Your question",
      "answer": "Your answer"
    }
  ]
}
```

3. The app auto-loads all `src/data/*.json` files.

## Notes

- No backend, no database, no authentication.
- Progress persists entirely in browser LocalStorage.
