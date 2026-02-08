'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/auth',
        { email, password },
        { withCredentials: true }
      );
      console.log('Login response:', res);
      if (res.status !== 200) throw new Error(res.statusText || 'Login failed');
      window.location.href = '/';
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="block text-sm text-gray-700 mb-1">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="block text-sm text-gray-700 mb-1">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          autoComplete="current-password"
        />
      </label>

      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'}`}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
