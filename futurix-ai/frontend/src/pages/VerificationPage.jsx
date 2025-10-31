import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FileUploadBox from '../components/common/FileUploadBox'
import Loader from '../components/common/Loader'
import AnalysisReport from '../components/verification/AnalysisReport'
import ExtractedDataView from '../components/verification/ExtractedDataView'
import useApiClient from '../hooks/useApiClient'
import { api, endpoints } from '../utils/api'

export default function VerificationPage() {
  const [poFile, setPoFile] = useState(null)
  const [invoiceFile, setInvoiceFile] = useState(null)
  const [grnFile, setGrnFile] = useState(null)
  const [result, setResult] = useState(null)

  const { loading, send } = useApiClient(async (formData) => {
    const res = await api.post(endpoints.uploadSet, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res.data
  })

  const handleVerify = async () => {
    const form = new FormData()
    form.append('po_file', poFile)
    form.append('invoice_file', invoiceFile)
    form.append('grn_file', grnFile)
    const data = await send(form)
    setResult(data)
  }

  const ready = !!poFile && !!invoiceFile && !!grnFile
  const discrepancies = result?.analysis_report?.discrepancies
  const explanation = discrepancies?.llm_explanation || '—'
  const extracted = result?.extracted_data || {}

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">New Verification Set</h1>

      <AnimatePresence mode="wait">
        {!result && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid md:grid-cols-3 gap-4"
          >
            <FileUploadBox label="Purchase Order" onFileSelect={setPoFile} disabled={loading} selectedFile={poFile} statusText={loading ? 'Uploading...' : poFile ? 'Attached' : undefined} showProgress={loading} />
            <FileUploadBox label="Invoice" onFileSelect={setInvoiceFile} disabled={loading} selectedFile={invoiceFile} statusText={loading ? 'Uploading...' : invoiceFile ? 'Attached' : undefined} showProgress={loading} />
            <FileUploadBox label="GRN" onFileSelect={setGrnFile} disabled={loading} selectedFile={grnFile} statusText={loading ? 'Uploading...' : grnFile ? 'Attached' : undefined} showProgress={loading} />
          </motion.div>
        )}
      </AnimatePresence>

      {!result && (
        <button
          onClick={handleVerify}
          disabled={!ready || loading}
          className={`px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${ready && !loading ? 'bg-purple-600 hover:shadow-lg text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
        >
          {loading ? 'Processing...' : 'Verify'}
        </button>
      )}

      {loading && !result && (
        <Loader label="Extracting... Analyzing... Generating Report..." />
      )}

      {result && (
        <div className="space-y-6">
          <AnalysisReport explanation={explanation} totalDiscrepancies={discrepancies?.total_discrepancies ?? 0} />
          <ExtractedDataView
            purchaseOrder={extracted.purchase_order}
            invoice={extracted.invoice}
            goodsReceivedNote={extracted.goods_received_note}
          />
        </div>
      )}
    </div>
  )
}


