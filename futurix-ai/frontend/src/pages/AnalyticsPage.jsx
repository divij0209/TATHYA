import StatCard from '../components/common/StatCard'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const COLORS = ['#00C39A', '#E11D48']

const pieData = [
  { name: 'Matched', value: 72 },
  { name: 'Mismatched', value: 28 },
]

const barData = [
  { vendor: 'Vendor A', discrepancies: 12 },
  { vendor: 'Vendor B', discrepancies: 7 },
  { vendor: 'Vendor C', discrepancies: 3 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Analytics</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Total Invoices Processed" value={124} />
        <StatCard title="Avg. Match Rate" value="92%" delta={4} />
        <StatCard title="Total Discrepancies Found" value={43} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-4 shadow-md">
          <div className="text-slate-700 font-medium mb-3">Matched vs Mismatched</div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={pieData} outerRadius={90} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 shadow-md">
          <div className="text-slate-700 font-medium mb-3">Discrepancies by Vendor</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="discrepancies" fill="#00C39A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}


