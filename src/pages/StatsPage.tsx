import { allCards, allTopics } from '../services/cards'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { getReviewState, getTopicSummaries, isCardMastered, reviewsToday } from '../utils/stats'

const getRememberedCount = (reviewByCardId: ReturnType<typeof useFlashcardsStore.getState>['reviewByCardId']): number =>
  Object.values(reviewByCardId).reduce((accumulator, review) => accumulator + review.successCount, 0)

const getDifficultCount = (reviewByCardId: ReturnType<typeof useFlashcardsStore.getState>['reviewByCardId']): number =>
  Object.values(reviewByCardId).reduce(
    (accumulator, review) => accumulator + review.againCount + review.hardCount,
    0,
  )

export const StatsPage = () => {
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)
  const totalReviews = useFlashcardsStore((state) => state.totalReviews)
  const dailyActivity = useFlashcardsStore((state) => state.dailyActivity)

  const topicProgress = getTopicSummaries(allCards, allTopics, reviewByCardId)
  const masteredCards = allCards.filter((card) => isCardMastered(getReviewState(reviewByCardId, card.id))).length

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">Track progress and identify focus areas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Total reviews</p>
          <p className="text-2xl font-semibold">{totalReviews}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Reviews today</p>
          <p className="text-2xl font-semibold">{reviewsToday(dailyActivity)}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Correctly remembered</p>
          <p className="text-2xl font-semibold">{getRememberedCount(reviewByCardId)}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Difficult ratings</p>
          <p className="text-2xl font-semibold">{getDifficultCount(reviewByCardId)}</p>
        </article>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Topic progress</h2>
        <ul className="mt-4 space-y-2">
          {topicProgress.map((topic) => (
            <li className="flex items-center justify-between border-b border-slate-200 pb-2 text-sm last:border-b-0 dark:border-slate-800" key={topic.slug}>
              <span>{topic.topic}</span>
              <span>{topic.mastery}%</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Mastered cards: {masteredCards}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Daily activity</h2>
        <ul className="mt-4 space-y-2">
          {Object.entries(dailyActivity)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, 14)
            .map(([date, count]) => (
              <li className="flex items-center justify-between text-sm" key={date}>
                <span>{date}</span>
                <span>{count} reviews</span>
              </li>
            ))}
        </ul>
      </section>
    </section>
  )
}
