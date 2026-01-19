import { getBmiHistory } from '@/app/actions/bmi';
import AddBmiForm from '@/components/AddBmiForm';
import BmiChart from '@/components/BmiChart';

export default async function Dashboard() {
  const history = await getBmiHistory();
  const latest = history[history.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Stats Card */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-lg font-semibold text-gray-500">Current BMI</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold text-blue-600">{latest ? latest.bmi.toFixed(1) : '--'}</span>
            <p className="text-sm text-gray-500 mt-1">
              Category: <span className="font-medium text-gray-900">{latest ? latest.category : 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="col-span-1 md:col-span-2">
          <AddBmiForm />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <BmiChart data={history} />
      </div>

      {/* Recent History Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Recent History</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.slice().reverse().slice(0, 5).map((record: any) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.bmi}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
