import { Footer } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Vercel logomark"
          width={240}
          height={80}
        />
        <h1 className="text-2xl font-bold text-center">
          Welcome to next Bank Application
        </h1>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-black rounded-4xl cursor-pointer transition-transform duration-200 hover:scale-105 dark:invert dark:text-black"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/transfer"
            className="px-4 py-2 border border-black rounded-4xl cursor-pointer transition-transform duration-200 hover:scale-105 dark:invert dark:text-black"
          >
            Transfer Funds
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
