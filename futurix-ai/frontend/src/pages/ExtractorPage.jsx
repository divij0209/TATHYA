import { useState } from 'react'
import FileUploadBox from '../components/common/FileUploadBox'
import Loader from '../components/common/Loader'
import useApiClient from '../hooks/useApiClient'
import { extractionApi, endpoints } from '../utils/api'

export default function ExtractorPage() {
  const [file, setFile] = useState(null)
  const [json, setJson] = useState(null)
  const { loading, send } = useApiClient(async (formData) => {
    const res = await extractionApi.post(endpoints.extract, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res.data
  })

  const handleExtract = async () => {
    const form = new FormData()
    form.append('file', file)
    const data = await send(form)
    setJson(data)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Standalone Extractor</h1>
      <div className="max-w-xl">
        <FileUploadBox label="Upload a document" onFileSelect={setFile} disabled={loading} />
        <button
          onClick={handleExtract}
          disabled={!file || loading}
          className={`mt-4 px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${file && !loading ? 'bg-purple-600 hover:shadow-lg text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
        >
          {loading ? 'Processing...' : 'Extract'}
        </button>
      </div>

      {loading && <Loader label="Extracting..." />}

      {json && (
        <div className="glass-card rounded-xl p-4 shadow-md overflow-auto">
          <pre className="text-sm text-slate-800"><code>{JSON.stringify(json, null, 2)}</code></pre>
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(json, null, 2))}
            className="mt-3 px-3 py-2 bg-slate-800 text-white rounded-md hover:opacity-90"
          >
            Copy JSON
          </button>
        </div>
      )}
    </div>
  )
}


