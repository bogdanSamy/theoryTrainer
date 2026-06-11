import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudyPage } from './StudyPage'
import { allCards, allTopics, getCardsByTopicSlug, getShuffledCards } from '../services/cards'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { getWeakCards } from '../utils/stats'

export const StudyRoutePage = () => {
  const { mode = 'random', topicSlug } = useParams()
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)

  // Shuffle once per StudyRoutePage mount so Random mode varies each session
  const [randomCards] = useState(() => getShuffledCards())

  const { title, cards } = useMemo(() => {
    if (mode === 'topic' && topicSlug) {
      const topicMeta = allTopics.find((topic) => topic.slug === topicSlug)
      return {
        title: topicMeta ? `${topicMeta.topic} Study` : 'Topic Study',
        cards: getCardsByTopicSlug(topicSlug),
      }
    }

    if (mode === 'weak') {
      return {
        title: 'Weak Areas Mode',
        cards: getWeakCards(allCards, reviewByCardId),
      }
    }

    return {
      title: 'Random Mode',
      cards: randomCards,
    }
  }, [mode, randomCards, reviewByCardId, topicSlug])

  // The key forces StudyPage to remount (and reset its queue) whenever the
  // mode or topic changes, preventing stale cards from a previous session.
  return <StudyPage cards={cards} key={`${mode}/${topicSlug ?? 'all'}`} title={title} />
}
