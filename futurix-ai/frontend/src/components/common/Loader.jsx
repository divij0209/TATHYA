export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-purple-600 animate-spin" />
      <p className="text-slate-700">{label}</p>
    </div>
  )
}


