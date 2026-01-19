'use client';

import { useActionState } from 'react';
import { addBmiRecord } from '@/app/actions/bmi';

export default function AddBmiForm() {
  const [state, action, isPending] = useActionState(addBmiRecord, null);

  return (
    <form action={action} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">New BMI Record</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input 
            type="number" 
            name="height" 
            step="0.1" 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input 
            type="number" 
            name="weight" 
            step="0.1" 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
        </div>
      </div>

      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state?.success && <p className="text-green-500 text-sm">Record added!</p>}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? 'Calculating...' : 'Calculate & Save'}
      </button>
    </form>
  );
}
