'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const leadData = [
  { name: 'Mon', leads: 4 }, { name: 'Tue', leads: 7 }, { name: 'Wed', leads: 5 }, { name: 'Thu', leads: 12 }, { name: 'Fri', leads: 9 }, { name: 'Sat', leads: 3 }, { name: 'Sun', leads: 2 },
];

const serviceData = [
  { name: 'SEO', value: 40 }, { name: 'PPC', value: 30 }, { name: 'Web', value: 20 }, { name: 'Brand', value: 10 },
];

export default function AdminPage() {
  return (
    <div className="pt-10 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <div className="text-sm text-slate-500">Welcome, Admin</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[{ label: 'Total Leads', value: '142', change: '+12%' }, { label: 'Demos Booked', value: '28', change: '+5%' }, { label: 'Conversion Rate', value: '19.7%', change: '+2.1%' }, { label: 'Pending Tasks', value: '5', change: '-1' }].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                <span className={`text-xs font-medium mb-1 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Lead Velocity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#0054D2" strokeWidth={3} dot={{ fill: '#0054D2', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Service Interest</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0054D2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[{ name: 'John Doe', email: 'john@example.com', service: 'Digital Marketing', status: 'New' }, { name: 'Jane Smith', email: 'jane@example.com', service: 'Web Development', status: 'Contacted' }, { name: 'Mike Johnson', email: 'mike@example.com', service: 'SEO', status: 'Qualified' }].map((lead, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-3 px-4 text-sm">{lead.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-500">{lead.email}</td>
                    <td className="py-3 px-4 text-sm text-slate-500">{lead.service}</td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' : lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{lead.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}