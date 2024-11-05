import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 w-full">
      <div className="w-full l-full container flex justify-between items-center mx-auto ">
        <Image
          src="/assets/ASM-logo.png"
          width={100}
          height={70}
          alt='logo'
          className = "left-0.5"
          priority={true}
        />
        <div className="container justify-end space-x-4">
          <Link href="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link href="/club" className="hover:text-yellow-400">
            The Club
          </Link>
          <Link href="/team" className="hover:text-yellow-400">
            Team Roster
          </Link>
          <Link href="/results" className="hover:text-yellow-400">
            Results
          </Link>
          <Link href="/blog" className="hover:text-yellow-400">
            News & Blog
          </Link>
          <Link href="/support" className="hover:text-yellow-400">
            Support
          </Link>
        </div>
          <button type="button" className="text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 text-base text-center me-2 mb-2 mr-2.5">
            <Link href="/support" className="hover:text-yellow-400">
                Sign in / Sign up
            </Link>
          </button>
      </div>
    </nav>
  );
}
