'use client';

import { FormEvent, useState } from 'react';
import { login } from '@/api/auth/login';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.status !== 200) throw new Error(res.statusText || 'Login failed');
      // window.location.href = '/';
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    window.location.href = '/api/auth/google';
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-lg font-semibold mb-3">Sign in</h1>

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

        <div className="text-center text-sm text-gray-500 my-3">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 rounded-md border border-gray-300 bg-white flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
            className="block"
          >
            <path
              fill="#fbbb00"
              d="M43.6 20.5H42V20H24v8h11.3C34.7 32.2 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.6 4.9 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11.1 0 20-9 20-20 0-1.3-.1-2.5-.4-3.5z"
            />
            <path
              fill="#518ef8"
              d="M6.3 14.7l6.6 4.8C14.9 16.9 19.1 14 24 14c3.1 0 5.9 1.2 8 3.2l5.7-5.7C34.6 4.9 29.6 3 24 3 16.6 3 10.1 6.8 6.3 14.7z"
            />
            <path
              fill="#28b446"
              d="M24 45c5.6 0 10.6-1.9 14.4-5.1l-6.9-5.6C29.9 34.9 27 36 24 36c-6.2 0-10.7-3.8-12.3-8.9l-6.6 5.1C8.1 39.9 15.5 45 24 45z"
            />
            <path
              fill="#f14336"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.3-5.5 7.1l6.9 5.6C40.8 37.6 46 29.4 46 23c0-1.3-.1-2.5-.4-3.5z"
            />
          </svg>
          <span className="text-sm">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
