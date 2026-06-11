import { useMemo, useState } from 'react'
import { allCards } from '../services/cards'

export const SearchPage = () => {
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return allCards
    }

    return allCards.filter((card) => {
      const searchable = `${card.topic} ${card.question} ${card.answer}`.toLowerCase()
      return searchable.includes(normalized)
    })
  }, [query])

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">Instantly filter by topic, question, or answer.</p>
      </div>

      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search JVM, Spring Boot, Kafka..."
        type="search"
        value={query}
      />

      <div className="space-y-3">
        {matches.map((card) => (
          <article
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            key={card.id}
          >
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{card.topic}</p>
            <h2 className="mt-1 font-semibold">{card.question}</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{card.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
