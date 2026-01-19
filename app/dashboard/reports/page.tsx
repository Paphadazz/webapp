import { getMisReport } from '@/app/actions/bmi';

export default async function ReportsPage() {
  const report: any = await getMisReport();

  if (!report || report.totalRecords === 0) {
    return <div className="p-6 text-center text-gray-500">No data available to generate reports.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Health Summary Report</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500">Average BMI</p>
          <p className="text-3xl font-bold text-gray-900">{report.avgBmi?.toFixed(1)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500">Lowest BMI</p>
          <p className="text-3xl font-bold text-gray-900">{report.minBmi?.toFixed(1)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <p className="text-sm font-medium text-gray-500">Highest BMI</p>
          <p className="text-3xl font-bold text-gray-900">{report.maxBmi?.toFixed(1)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm font-medium text-gray-500">Total Records</p>
          <p className="text-3xl font-bold text-gray-900">{report.totalRecords}</p>
        </div>
      </div>
    </div>
  );
}
