'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';

interface FormState {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state before making the request

    try {
      // Simulate a redirect after login
      redirect('/dashboard');

      // Uncomment and use when integrating with API
      /*
      const response = await axios.post('/auth/login', form, { withCredentials: true });
      const data = response.data;

      console.log('Login successful:', data);

      // Dispatch actions or handle response data
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      // Redirect based on roles or other criteria
      if (data.user.roles.includes('Admin')) {
        navigate('/dashboard');
      } else {
        navigate('/settings');
      }
      */
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message display */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-5 font-medium">
            Email
          </label>
          <input
            type="email"
            className="block h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label font-medium pb-3">
            Password
          </label>
          <input
            type="password"
            className="block h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            autoComplete="off"
          />
        </div>

        <button
          className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Sign In Now
        </button>
      </form>
    </>
  );
};

export default LoginForm;
