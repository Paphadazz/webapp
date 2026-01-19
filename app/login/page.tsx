'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 w-full py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input name="username" type="text" required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input name="password" type="password" required className="w-full border p-2 rounded" />
          </div>
          {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
          <button disabled={isPending} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
