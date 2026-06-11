import { allCards, allTopics } from '../services/cards'
import { StatCard } from '../components/StatCard'
import { ProgressBar } from '../components/ProgressBar'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { getReviewState, getTopicSummaries, isCardDue, isCardMastered, reviewsToday } from '../utils/stats'

export const DashboardPage = () => {
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)
  const totalReviews = useFlashcardsStore((state) => state.totalReviews)
  const dailyActivity = useFlashcardsStore((state) => state.dailyActivity)
  const streak = useFlashcardsStore((state) => state.streak)

  const mastered = allCards.filter((card) => isCardMastered(getReviewState(reviewByCardId, card.id))).length
  const due = allCards.filter((card) => isCardDue(getReviewState(reviewByCardId, card.id))).length
  const topics = getTopicSummaries(allCards, allTopics, reviewByCardId)

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Focused preparation for senior Java and Spring interviews.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total cards" value={allCards.length} />
        <StatCard label="Mastered" value={mastered} helper={`${allCards.length ? Math.round((mastered / allCards.length) * 100) : 0}%`} />
        <StatCard label="Need review" value={due} />
        <StatCard label="Study streak" value={`${streak} day${streak === 1 ? '' : 's'}`} />
        <StatCard label="Reviews today" value={reviewsToday(dailyActivity)} />
        <StatCard label="Total reviews" value={totalReviews} />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Progress by topic</h2>
        <div className="mt-4 space-y-4">
          {topics.map((topic) => (
            <div key={topic.slug} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{topic.topic}</span>
                <span>{topic.mastery}%</span>
              </div>
              <ProgressBar value={topic.mastery} />
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
