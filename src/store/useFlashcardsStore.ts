import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dayKey } from '../utils/date'
import { scheduleNextReview } from '../utils/spacedRepetition'
import type { Rating, ReviewState } from '../types/flashcards'

interface FlashcardsState {
  reviewByCardId: Record<string, ReviewState>
  totalReviews: number
  dailyActivity: Record<string, number>
  streak: number
  lastStudyDate?: string
  theme: 'dark' | 'light'
  reviewCard: (cardId: string, rating: Rating) => void
  toggleTheme: () => void
}

const updateStreak = (lastStudyDate: string | undefined, now: Date, currentStreak: number): number => {
  if (!lastStudyDate) {
    return 1
  }

  const previous = new Date(lastStudyDate)
  const diffInDays = Math.floor((now.getTime() - previous.getTime()) / (24 * 60 * 60 * 1000))

  if (diffInDays <= 0) {
    return currentStreak
  }

  if (diffInDays === 1) {
    return currentStreak + 1
  }

  return 1
}

export const useFlashcardsStore = create<FlashcardsState>()(
  persist(
    (set) => ({
      reviewByCardId: {},
      totalReviews: 0,
      dailyActivity: {},
      streak: 0,
      lastStudyDate: undefined,
      theme: 'dark',
      reviewCard: (cardId, rating) =>
        set((state) => {
          const now = new Date()
          const existingReview = state.reviewByCardId[cardId]
          const nextSchedule = scheduleNextReview(rating, existingReview, now)
          const todayKey = dayKey(now)
          const dayCount = state.dailyActivity[todayKey] ?? 0

          const nextReviewState: ReviewState = {
            cardId,
            lastReviewed: now.toISOString(),
            nextReview: nextSchedule.nextReview,
            easeLevel: nextSchedule.easeLevel,
            reviewCount: (existingReview?.reviewCount ?? 0) + 1,
            successCount:
              (existingReview?.successCount ?? 0) + (nextSchedule.wasSuccessful ? 1 : 0),
            againCount: (existingReview?.againCount ?? 0) + (rating === 'again' ? 1 : 0),
            hardCount: (existingReview?.hardCount ?? 0) + (rating === 'hard' ? 1 : 0),
          }

          return {
            reviewByCardId: {
              ...state.reviewByCardId,
              [cardId]: nextReviewState,
            },
            totalReviews: state.totalReviews + 1,
            dailyActivity: {
              ...state.dailyActivity,
              [todayKey]: dayCount + 1,
            },
            streak: updateStreak(state.lastStudyDate, now, state.streak),
            lastStudyDate: now.toISOString(),
          }
        }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
    }),
    {
      name: 'flashcards-progress-v1',
    },
  ),
)
