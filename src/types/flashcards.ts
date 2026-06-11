export interface Card {
  id: string
  topic: string
  question: string
  answer: string
}

export interface TopicCardCollection {
  topic: string
  cards: Array<Omit<Card, 'topic'>>
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export interface ReviewState {
  cardId: string
  lastReviewed: string
  nextReview: string
  easeLevel: number
  reviewCount: number
  successCount: number
  againCount: number
  hardCount: number
}

export interface TopicSummary {
  topic: string
  slug: string
  cardsCount: number
  mastery: number
  lastStudied?: string
}
