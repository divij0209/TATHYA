import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseFinanceQuery, respondToFinanceQuery } from '@/utils/nlu'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! Ask me about PO status, mismatched invoices by vendor, or total owed.' }])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    const parsed = parseFinanceQuery(text)
    const reply = await respondToFinanceQuery(parsed)
    setMessages((m) => [...m, { role: 'assistant', content: reply }])
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Open chatbot"
        className="w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        onClick={() => setOpen(v => !v)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mt-3 w-96 glass-card rounded-xl p-4 shadow-xl flex flex-col"
          >
            <div className="text-slate-800 font-semibold mb-3">Assistant</div>
            <div className="flex-1 overflow-auto space-y-2 pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className={`text-sm ${m.role === 'assistant' ? 'text-slate-800' : 'text-slate-700'} ${m.role === 'assistant' ? '' : 'text-right'}`}>
                  <div className={`inline-block rounded-lg px-3 py-2 ${m.role === 'assistant' ? 'bg-white border border-slate-200' : 'bg-teal-500 text-white'}`}>{m.content}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Ask a finance question..."
              />
              <button onClick={sendMessage} className="p-2 rounded-md bg-teal-500 text-white hover:opacity-90">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "What's the status of PO-456?",
                "Show me all mismatched invoices from 'Acme Corp'.",
                "What's the total amount owed to 'Apex Supplies'?",
              ].map((q) => (
                <button key={q} className="text-xs px-2 py-1 rounded-full border border-slate-200 hover:bg-slate-50" onClick={() => setInput(q)}>{q}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


