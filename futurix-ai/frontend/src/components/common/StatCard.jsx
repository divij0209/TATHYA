export default function StatCard({ title, value, delta }) {
  return (
    <div className="glass-card rounded-xl p-5 shadow-md elevate">
      <p className="text-slate-600 text-sm">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-800">{value}</span>
        {delta !== undefined && (
          <span className={`text-sm ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</span>
        )}
      </div>
    </div>
  )
}


