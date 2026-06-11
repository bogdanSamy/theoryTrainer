import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { allCards, allTopics } from '../services/cards'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { formatDate } from '../utils/date'
import { getTopicSummaries } from '../utils/stats'

export const TopicsPage = () => {
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)
  const topics = getTopicSummaries(allCards, allTopics, reviewByCardId)

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Topics</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">Choose a topic and start studying.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <article
            className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            key={topic.slug}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{topic.topic}</h2>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs dark:bg-slate-800">
                {topic.cardsCount} cards
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mastery</span>
                <span>{topic.mastery}%</span>
              </div>
              <ProgressBar value={topic.mastery} />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Last studied: {formatDate(topic.lastStudied)}
              </p>
            </div>

            <Link
              className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              to={`/study/topic/${topic.slug}`}
            >
              Study topic
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
