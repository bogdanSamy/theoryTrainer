import type { Rating, ReviewState } from '../types/flashcards'

const minutes = (value: number): number => value * 60 * 1000
const days = (value: number): number => value * 24 * 60 * 60 * 1000

interface NextReviewResult {
  nextReview: string
  easeLevel: number
  wasSuccessful: boolean
}

export const scheduleNextReview = (
  rating: Rating,
  existingReview: ReviewState | undefined,
  now: Date,
): NextReviewResult => {
  const nowTime = now.getTime()
  const currentEase = existingReview?.easeLevel ?? 2

  if (rating === 'again') {
    return {
      nextReview: new Date(nowTime).toISOString(),
      easeLevel: Math.max(1, currentEase - 0.2),
      wasSuccessful: false,
    }
  }

  if (rating === 'hard') {
    return {
      nextReview: new Date(nowTime + minutes(10)).toISOString(),
      easeLevel: Math.max(1.3, currentEase - 0.1),
      wasSuccessful: true,
    }
  }

  if (rating === 'good') {
    const intervalDays = Math.max(1, Math.round(currentEase))
    return {
      nextReview: new Date(nowTime + days(intervalDays)).toISOString(),
      easeLevel: Math.min(3.5, currentEase + 0.05),
      wasSuccessful: true,
    }
  }

  const intervalDays = Math.max(3, Math.round(currentEase * 2))
  return {
    nextReview: new Date(nowTime + days(intervalDays)).toISOString(),
    easeLevel: Math.min(4, currentEase + 0.2),
    wasSuccessful: true,
  }
}
