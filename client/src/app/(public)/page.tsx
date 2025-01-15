import Link from 'next/link';

export default function Page() {
  return (
    <div className="container my-16 grid items-center gap-4 px-4 py-2 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to our Heat Engineer Platform
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          We have been using Heat Engineer software for just over a year now & it transformed the way we conduct our heat loss surveys! 
        </p>
        <h2 className='text-gray-500 font-semibold my-4'>
          Start Your Heat Loss Journey Today
        </h2>
      </div>
      <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors  hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
