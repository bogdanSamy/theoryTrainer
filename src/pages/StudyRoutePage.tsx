import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { StudyPage } from './StudyPage'
import { allCards, allTopics, getCardsByTopicSlug, randomCardsPool } from '../services/cards'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { getWeakCards } from '../utils/stats'

export const StudyRoutePage = () => {
  const { mode = 'random', topicSlug } = useParams()
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)

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
      cards: randomCardsPool,
    }
  }, [mode, reviewByCardId, topicSlug])

  return <StudyPage cards={cards} title={title} />
}
