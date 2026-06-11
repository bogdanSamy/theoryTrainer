import type { Card, ReviewState, TopicSummary } from '../types/flashcards'

export const getReviewState = (
  reviewByCardId: Record<string, ReviewState>,
  cardId: string,
): ReviewState | undefined => reviewByCardId[cardId]

export const isCardMastered = (review?: ReviewState): boolean => {
  if (!review || review.reviewCount < 3) {
    return false
  }

  return review.successCount / review.reviewCount >= 0.7
}

export const isCardDue = (review?: ReviewState): boolean => {
  if (!review) {
    return true
  }

  return new Date(review.nextReview).getTime() <= Date.now()
}

export const getTopicSummaries = (
  cards: Card[],
  topics: Array<{ topic: string; slug: string; cardsCount: number }>,
  reviewByCardId: Record<string, ReviewState>,
): TopicSummary[] =>
  topics.map((topic) => {
    const topicCards = cards.filter((card) => card.topic === topic.topic)
    const masteredCount = topicCards.filter((card) =>
      isCardMastered(getReviewState(reviewByCardId, card.id)),
    ).length

    const sortedByDate = topicCards
      .map((card) => getReviewState(reviewByCardId, card.id)?.lastReviewed)
      .filter((reviewDate): reviewDate is string => Boolean(reviewDate))
      .sort((a, b) => b.localeCompare(a))

    return {
      topic: topic.topic,
      slug: topic.slug,
      cardsCount: topicCards.length,
      mastery: topicCards.length ? Math.round((masteredCount / topicCards.length) * 100) : 0,
      lastStudied: sortedByDate[0],
    }
  })

export const reviewsToday = (dailyActivity: Record<string, number>): number => {
  const today = new Date().toISOString().slice(0, 10)
  return dailyActivity[today] ?? 0
}

// A card is considered "weak" if it has been rated Again or Hard at least once,
// or if the most recent rating was again/hard. This ensures cards show up in
// Weak Areas mode promptly after the first difficult review.
export const getWeakCards = (cards: Card[], reviewByCardId: Record<string, ReviewState>): Card[] =>
  cards.filter((card) => {
    const review = reviewByCardId[card.id]
    if (!review) {
      return false
    }

    return review.againCount + review.hardCount >= 1
  })
