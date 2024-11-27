'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from 'lucide-react';
import React from 'react';

export default function Navbar() {
  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const supabase = createClientComponentClient();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    console.log(isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the session from Supabase
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.log('No session found');
          return;
        }

        // Call the profile API
        const response = await fetch('http://localhost:3000/api/profile', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.log('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [supabase]);

  return (
    <nav className="text-white p-4 w-full">
      <div className="w-full l-full container flex justify-between items-center mx-auto">
        <Link href="/">
          <Image
            src="/assets/ASM.png"
            width={100}
            height={70}
            alt="ASM-logo"
            className="left-0.5"
            priority={true}
          />
        </Link>

        <div className="container relative space-x-4 inline-block">
          <Link
            href="/"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            href=""
            id="mega-menu-dropdown-button"
            data-dropdown-toggle="mega-menu-dropdown"
            onClick={toggleDropdown}
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
            >
            The Club
          </Link> 
          {isDropdownOpen && (
            <div id="mega-menu-dropdown" className="absolute z-10 m-2 w-auto left-8 text-base bg-white rounded-lg">
              <div className="p-4 pb-0 text-dark md:pb-4">
                <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                  <li>
                    <a href="/club" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      ASM's History 
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      Legend Players
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      Awards
                    </a>
                  </li>
                </ul>
              </div>
            </div>)}
          <Link
            href="/team"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
            >
            Team Roster
          </Link>
          <Link
            href="/results"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            Results
          </Link>
          <Link
            href="/blog"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            News & Blog
          </Link>
          <Link
            href="/support"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            Support
          </Link>
        </div>

        {profile ? (
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-white" />
            <span className="font-custom text-white">{profile.username}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 relative">
            <a
              href='/settings'
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:animate-rotate-y"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

            </a>
            <Link href="/connexion" className="flex inline-block hover:text-yellow-400">
              <button
                type="button"
                className="font-custom text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 text-base text-center me-2 mb-2 mr-2.5"
              >
                Sign in / Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
