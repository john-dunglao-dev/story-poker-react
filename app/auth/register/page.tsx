'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error((await res.text()) || 'Registration failed');
      setSuccess('Registered successfully');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignup() {
    // Replace with your OAuth route/provider
    window.location.href = '/api/auth/google';
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Create an account
        </h1>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 mb-4 border rounded-md hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.6-1.6-34.7-4.6-51.1H272v96.8h146.9c-6.3 34-25 62.9-53.3 82.1v68.4h86.1c50.4-46.4 80.8-114.9 80.8-196.2z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.6 0 133.6-23.9 178.1-64.9l-86.1-68.4c-24 16.1-54.8 25.6-92 25.6-70.8 0-130.8-47.8-152.2-112.1H30.8v70.6C75.2 486.4 167.6 544.3 272 544.3z"
            />
            <path
              fill="#fbbc04"
              d="M119.8 322.5c-10.8-32.4-10.8-67.5 0-99.9V152H30.8c-41.8 83.7-41.8 183.1 0 266.8l89-70.3z"
            />
            <path
              fill="#ea4335"
              d="M272 107.1c39.4 0 74.8 13.6 102.6 40.4l77-77C405.1 24 343.5 0 272 0 167.6 0 75.2 57.9 30.8 152l89 70.6C141.2 154.9 201.2 107.1 272 107.1z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center my-3">
          <hr className="flex-1" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="flex-1" />
        </div>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        {success && (
          <div className="mb-3 text-sm text-green-600">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
