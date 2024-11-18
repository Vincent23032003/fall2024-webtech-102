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
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/ASM.png"
            width={100}
            height={70}
            alt="logo"
            className="left-0.5"
            priority={true}
          />
        </Link>

        {/* Navigation Links */}
        <div className="container justify-end space-x-4">
          <Link
            href="/"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            href="/club"
            className="relative font-custom text-lg pb-0.5 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-400 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-yellow-400"
          >
            The Club
          </Link>
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

        {/* User Profile */}
        {profile ? (
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-white" />
            <span className="font-custom text-white">{profile.username}</span>
          </div>
        ) : (
          <Link href="/connexion" className="hover:text-yellow-400">
            <button
              type="button"
              className="font-custom text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 text-base text-center me-2 mb-2 mr-2.5"
            >
              Sign in / Sign up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
