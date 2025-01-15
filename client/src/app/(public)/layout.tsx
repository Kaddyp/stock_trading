import Link from 'next/link';
import { Bars4Icon } from '@heroicons/react/24/outline';

const links = [
  { href: '/', title: 'Home' },
  { href: '/dashboard', title: 'Dashboard' },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="border-b border-gray-100">
        <div className="container mx-auto flex max-w-7xl items-center justify-end p-4 md:justify-between md:px-6">
          <nav className="hidden items-center space-x-4 text-sm md:flex">
            {links.map((link) => (
              <Link className="text-gray-900 font-medium" href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
              href="/login"
            >
              Sign In
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
              href="/login"
            >
              Login
            </Link>
            <button className="inline-flex rounded-md md:hidden" type="button">
              <Bars4Icon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      <main className="justify-center">
          <div className="container mx-auto w-80 py-12">
            {children}
          </div>
      </main>
    </div>
  );
}
