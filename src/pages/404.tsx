import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-color">
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-white">The page you are looking for does not exist.</p>
      <Link href="/">
        <p className="mt-4 text-white hover:underline">
          Go back to the homepage
        </p>
      </Link>
    </div>
  );
}
