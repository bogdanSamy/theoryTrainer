interface ProgressBarProps {
  value: number
}

export const ProgressBar = ({ value }: ProgressBarProps) => (
  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
    <div
      className="h-full rounded-full bg-emerald-500"
      style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
    />
  </div>
)
