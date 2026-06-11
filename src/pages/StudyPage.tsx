import { Link } from 'react-router-dom'
import { FlashcardPanel } from '../components/FlashcardPanel'
import { useStudyKeyboard } from '../hooks/useStudyKeyboard'
import { useStudySession } from '../hooks/useStudySession'
import type { Card } from '../types/flashcards'

interface StudyPageProps {
  cards: Card[]
  title: string
}

const ratingButtonClass =
  'rounded-lg px-4 py-2 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950'

export const StudyPage = ({ cards, title }: StudyPageProps) => {
  const { currentCard, queue, revealed, reveal, rateCurrentCard, goNext, goPrevious } = useStudySession(cards)

  useStudyKeyboard({
    revealed,
    onReveal: reveal,
    onRate: rateCurrentCard,
    onNext: goNext,
    onPrevious: goPrevious,
  })

  if (!cards.length) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          No cards available for this mode yet.
        </p>
        <Link className="text-emerald-600 hover:underline" to="/topics">
          Browse topics
        </Link>
      </section>
    )
  }

  if (!currentCard) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Session complete. Great job!
        </p>
        <Link className="text-emerald-600 hover:underline" to="/topics">
          Pick another topic
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Cards left in queue: <strong>{queue.length}</strong>
          </p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Shortcuts: Space / 1 / 2 / 3 / 4 / ← / →</p>
      </div>

      <FlashcardPanel card={currentCard} revealed={revealed} />

      <div className="flex flex-wrap gap-2">
        {!revealed ? (
          <button
            className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
            onClick={reveal}
            type="button"
          >
            Reveal answer (Space)
          </button>
        ) : (
          <>
            <button
              className={`${ratingButtonClass} bg-rose-600 hover:bg-rose-500 focus:ring-rose-500`}
              onClick={() => rateCurrentCard('again')}
              type="button"
            >
              Again (1)
            </button>
            <button
              className={`${ratingButtonClass} bg-amber-600 hover:bg-amber-500 focus:ring-amber-500`}
              onClick={() => rateCurrentCard('hard')}
              type="button"
            >
              Hard (2)
            </button>
            <button
              className={`${ratingButtonClass} bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-500`}
              onClick={() => rateCurrentCard('good')}
              type="button"
            >
              Good (3)
            </button>
            <button
              className={`${ratingButtonClass} bg-blue-600 hover:bg-blue-500 focus:ring-blue-500`}
              onClick={() => rateCurrentCard('easy')}
              type="button"
            >
              Easy (4)
            </button>
          </>
        )}
        <button
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700"
          onClick={goPrevious}
          type="button"
        >
          Previous (←)
        </button>
        <button
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700"
          onClick={goNext}
          type="button"
        >
          Next (→)
        </button>
      </div>
    </section>
  )
}
