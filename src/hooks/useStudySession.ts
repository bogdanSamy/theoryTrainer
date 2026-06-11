import { useMemo, useState } from 'react'
import { useFlashcardsStore } from '../store/useFlashcardsStore'
import { isCardDue } from '../utils/stats'
import type { Card, Rating } from '../types/flashcards'

export const useStudySession = (cards: Card[]) => {
  const reviewCard = useFlashcardsStore((state) => state.reviewCard)
  const reviewByCardId = useFlashcardsStore((state) => state.reviewByCardId)

  const initialQueue = useMemo(() => {
    const dueCards = cards.filter((card) => isCardDue(reviewByCardId[card.id]))
    return dueCards.length ? dueCards : cards
  }, [cards, reviewByCardId])

  const [queue, setQueue] = useState<Card[]>(initialQueue)
  const [revealed, setRevealed] = useState(false)
  const [history, setHistory] = useState<Card[]>([])

  const currentCard = queue[0]

  const reveal = () => {
    if (currentCard) {
      setRevealed(true)
    }
  }

  const rateCurrentCard = (rating: Rating) => {
    if (!currentCard) {
      return
    }

    reviewCard(currentCard.id, rating)
    setHistory((prev) => [...prev, currentCard])

    setQueue((prevQueue) => {
      if (!prevQueue.length) {
        return prevQueue
      }

      const [, ...rest] = prevQueue
      if (rating === 'again') {
        return [...rest, currentCard]
      }

      return rest
    })

    setRevealed(false)
  }

  const goNext = () => {
    if (queue.length <= 1) {
      return
    }

    setQueue((prevQueue) => {
      const [first, ...rest] = prevQueue
      if (!first) {
        return prevQueue
      }

      return [...rest, first]
    })

    setRevealed(false)
  }

  const goPrevious = () => {
    if (!history.length) {
      return
    }

    const previousCard = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setQueue((prevQueue) => [previousCard, ...prevQueue])
    setRevealed(true)
  }

  return {
    currentCard,
    queue,
    revealed,
    reveal,
    rateCurrentCard,
    goNext,
    goPrevious,
  }
}
