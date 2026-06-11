export const formatDate = (isoDate?: string): string => {
  if (!isoDate) {
    return 'Never'
  }

  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return 'Never'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const dayKey = (date = new Date()): string => date.toISOString().slice(0, 10)
