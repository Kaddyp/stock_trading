import LoginForm from './form';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="card mb-3">
      <div className="card-header text-center">
        <h1 className="card-title text-3xl font-bold">Login</h1>
        <p className="text-gray-500">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="card-body mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
