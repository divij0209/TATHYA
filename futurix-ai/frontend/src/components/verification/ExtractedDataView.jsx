import { motion } from 'framer-motion'

function FieldRow({ label, po, invoice, grn }) {
  const mismatch = (a, b) => a !== undefined && b !== undefined && a !== b
  const allEqual = po === invoice && invoice === grn

  const poClass = mismatch(po, invoice) || mismatch(po, grn) ? 'text-red-600' : 'text-green-600'
  const invClass = mismatch(invoice, po) || mismatch(invoice, grn) ? 'text-red-600' : 'text-green-600'
  const grnClass = mismatch(grn, po) || mismatch(grn, invoice) ? 'text-red-600' : 'text-green-600'

  return (
    <div className="grid grid-cols-4 gap-3 py-2 border-b border-slate-100 text-sm">
      <div className="text-slate-600">{label}</div>
      <div className={`${poClass}`}>{String(po ?? '')}</div>
      <div className={`${invClass}`}>{String(invoice ?? '')}</div>
      <div className={`${grnClass}`}>{String(grn ?? '')}</div>
    </div>
  )
}

export default function ExtractedDataView({ purchaseOrder = {}, invoice = {}, goodsReceivedNote = {} }) {
  const keys = Array.from(new Set([
    ...Object.keys(purchaseOrder || {}),
    ...Object.keys(invoice || {}),
    ...Object.keys(goodsReceivedNote || {})
  ]))

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-card rounded-xl p-6 shadow-md"
    >
      <div className="grid grid-cols-4 gap-3 font-medium text-slate-700 pb-2 border-b border-slate-200">
        <div>Field</div>
        <div>PO</div>
        <div>Invoice</div>
        <div>GRN</div>
      </div>
      <div className="divide-y divide-slate-100">
        {keys.map((k) => (
          <FieldRow key={k} label={k} po={purchaseOrder?.[k]} invoice={invoice?.[k]} grn={goodsReceivedNote?.[k]} />
        ))}
      </div>
    </motion.div>
  )
}


