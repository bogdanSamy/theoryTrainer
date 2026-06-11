import type { Card, TopicCardCollection } from '../types/flashcards'

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const topicModules = import.meta.glob('../data/*.json', {
  eager: true,
}) as Record<string, TopicCardCollection>

const topicCollections = Object.values(topicModules)

export const allCards: Card[] = topicCollections.flatMap((topicCollection) =>
  topicCollection.cards.map((card) => ({
    ...card,
    topic: topicCollection.topic,
  })),
)

export const allTopics = topicCollections.map((topicCollection) => ({
  topic: topicCollection.topic,
  slug: slugify(topicCollection.topic),
  cardsCount: topicCollection.cards.length,
}))

export const randomCardsPool: Card[] = [...allCards].sort(() => Math.random() - 0.5)

export const getCardsByTopicSlug = (slug: string): Card[] => {
  const topic = allTopics.find((entry) => entry.slug === slug)
  if (!topic) {
    return []
  }

  return allCards.filter((card) => card.topic === topic.topic)
}
