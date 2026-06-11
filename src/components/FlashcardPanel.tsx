import type { Card } from '../types/flashcards'

interface FlashcardPanelProps {
  card: Card
  revealed: boolean
}

export const FlashcardPanel = ({ card, revealed }: FlashcardPanelProps) => (
  <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {card.topic}
    </p>
    <h2 className="text-xl font-semibold">{card.question}</h2>
    {revealed ? (
      <p className="mt-4 whitespace-pre-wrap rounded-lg border border-emerald-300/60 bg-emerald-50 p-4 text-slate-800 dark:border-emerald-900/80 dark:bg-emerald-950/40 dark:text-slate-100">
        {card.answer}
      </p>
    ) : (
      <p className="mt-4 text-slate-500 dark:text-slate-400">
        Think first, then reveal the answer.
      </p>
    )}
  </article>
)
