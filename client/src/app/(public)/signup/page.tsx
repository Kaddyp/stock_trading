import SignupForm from './form';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="container mx-auto w-80 py-12">
      <div className="card mb-3">
        <div className="card-header text-center">
          <h1 className="card-title text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>
        <div className="card-body mt-6">
          <SignupForm />
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link className="underline" href="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
