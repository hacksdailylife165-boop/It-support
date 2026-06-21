import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';

const dummyData = [
  { month: 'Jan', resolved: 45, pending: 12, closed: 35 },
  { month: 'Feb', resolved: 52, pending: 15, closed: 40 },
  { month: 'Mar', resolved: 48, pending: 18, closed: 38 },
  { month: 'Apr', resolved: 61, pending: 22, closed: 42 },
  { month: 'May', resolved: 55, pending: 19, closed: 39 },
  { month: 'Jun', resolved: 67, pending: 25, closed: 45 },
];

const categoryData = [
  { name: 'Network', value: 30 },
  { name: 'Software', value: 25 },
  { name: 'Hardware', value: 20 },
  { name: 'Printer', value: 15 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export const ReportsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">Analyze ticket metrics and performance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Resolution Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resolution Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="closed" stroke="#6b7280" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Distribution by Category</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 lg:mt-0 lg:ml-8 space-y-2">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {category.name}: {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
