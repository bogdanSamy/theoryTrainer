interface StatCardProps {
  label: string
  value: string | number
  helper?: string
}

export const StatCard = ({ label, value, helper }: StatCardProps) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 text-2xl font-semibold">{value}</p>
    {helper ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
  </article>
)
