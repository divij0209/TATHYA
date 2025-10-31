import { useRef } from 'react'

export default function FileUploadBox({ label, onFileSelect, disabled, selectedFile, statusText, showProgress }) {
  const inputRef = useRef(null)
  return (
    <div className={`glass-card rounded-xl p-6 text-center shadow-md elevate ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <p className="text-slate-700 font-medium mb-3">{label}</p>
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300"
        onClick={() => inputRef.current?.click()}
      >
        {selectedFile ? 'Change File' : 'Choose File'}
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
      />

      {selectedFile && (
        <div className="mt-4 text-left">
          <div className="text-sm text-slate-700 truncate" title={selectedFile.name}>{selectedFile.name}</div>
          <div className="text-xs text-slate-500">{Math.round(selectedFile.size / 1024)} KB</div>
        </div>
      )}

      {statusText && (
        <div className="mt-3 text-xs text-slate-600">{statusText}</div>
      )}

      {showProgress && (
        <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div className="h-full bg-teal-500 animate-[progress_1.2s_ease_infinite]" style={{ width: '50%' }} />
        </div>
      )}
    </div>
  )
}


