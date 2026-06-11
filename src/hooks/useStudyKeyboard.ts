import { useEffect } from 'react'
import type { Rating } from '../types/flashcards'

interface UseStudyKeyboardOptions {
  revealed: boolean
  onReveal: () => void
  onRate: (rating: Rating) => void
  onNext: () => void
  onPrevious: () => void
}

export const useStudyKeyboard = ({
  revealed,
  onReveal,
  onRate,
  onNext,
  onPrevious,
}: UseStudyKeyboardOptions): void => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        if (!revealed) {
          onReveal()
        }
      }

      if (!revealed) {
        return
      }

      if (event.key === '1') {
        onRate('again')
      }

      if (event.key === '2') {
        onRate('hard')
      }

      if (event.key === '3') {
        onRate('good')
      }

      if (event.key === '4') {
        onRate('easy')
      }

      if (event.key === 'ArrowRight') {
        onNext()
      }

      if (event.key === 'ArrowLeft') {
        onPrevious()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [revealed, onReveal, onRate, onNext, onPrevious])
}
