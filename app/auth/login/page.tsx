import GoogleSignIn from './components/GoogleSignIn';
import LoginForm from './components/LoginForm';

export default async function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-lg font-semibold mb-3">Sign in</h1>

        <LoginForm />

        <div className="text-center text-sm text-gray-500 my-3">or</div>

        <GoogleSignIn />
      </div>
    </div>
  );
}
