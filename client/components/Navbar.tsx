import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="text-white p-4 w-full">
      <div className="w-full l-full container flex justify-between items-center mx-auto ">
        <Link href="/">
          <Image
            src="/assets/ASM.png"
            width={100}
            height={70}
            alt='logo'
            className="left-0.5"
            priority={true}
          />
        </Link>
        <div className="container justify-end space-x-4">
          <Link href="/" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            Home
          </Link>
          <Link href="/club" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            The Club
          </Link>
          <Link href="/team" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            Team Roster
          </Link>
          <Link href="/results" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            Results
          </Link>
          <Link href="/blog" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            News & Blog
          </Link>
          <Link href="/support" className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400">
            Support
          </Link>
        </div>
        <Link href="/connexion" className="hover:text-yellow-400">
          <button type="button" className="font-custom text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 text-base text-center me-2 mb-2 mr-2.5">
            Sign in / Sign up
          </button>
        </Link>
      </div>
    </nav>
  );
}
