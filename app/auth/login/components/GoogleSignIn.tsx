'use client';

export default function GoogleSignIn() {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
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
  );
}
