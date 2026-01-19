'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function BmiChart({ data }: { data: any[] }) {
  const formattedData = data.map(d => ({
    ...d,
    date: new Date(d.created_at).toLocaleDateString(),
  }));

  return (
    <div className="h-64 w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">BMI Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <ReferenceLine y={18.5} stroke="blue" strokeDasharray="3 3" />
          <ReferenceLine y={25} stroke="orange" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="bmi" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
