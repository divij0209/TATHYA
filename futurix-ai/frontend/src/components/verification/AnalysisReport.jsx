import { motion } from 'framer-motion'

export default function AnalysisReport({ explanation, totalDiscrepancies }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-6 shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">AI Explanation</h3>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-100 border border-slate-200 text-slate-700">
          Total discrepancies: {totalDiscrepancies}
        </span>
      </div>
      <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-wrap">{explanation}</p>
    </motion.div>
  )
}


