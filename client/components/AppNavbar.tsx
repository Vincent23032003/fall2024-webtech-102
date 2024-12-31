'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from "../supabaseClient";
import React from 'react';

export default function Navbar() {

  const gravatarList = [
    "https://gravatar.com/avatar/fb6d18d4bb9824850e8dfbe24d87809a?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a8bc016c863eebaa9c1f7d6a3599ed54?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/3d2da74f67c0737bd4eaeb8178b8a62f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/8d4b50ebd7b5c6671b70ac19a66c75de?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/1795377143f83fa72bddf4eb9503c9fa?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/2d9d9ca28b140d6693f88f275237a02a?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/d80b64c1976ab3241189805dca72f004?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/6b8571d69aa7bb4aa21b7e370d6e6846?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a1c64b32bb2a092e17e439b8f58203b4?s=400&d=robohash&r=x",
  ];

  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipVisible1, setIsTooltipVisible1] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(gravatarList[0]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    console.log(isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {


        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
          console.warn("No user logged in or session missing.");
          setUser(null);
        } else {
          setUser(authData.user);

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id)
            .single();

          if (error) {
            console.error("Error retrieving user details:", error.message);
          } else {
            setUserDetails(data);
            setSelectedAvatar(data.avatarUrl);
          }
        }
      } catch (error) {
        console.error("An error has occurred while retrieving the user", error);
        setUser(null);
      }
    };
    getUser();
  }, []);
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
            <div id="mega-menu-dropdown" className="absolute w-40 h-4/12 z-10 m-2 left-8 text-base bg-white rounded-lg">
              <div className="p-4 pb-0 text-dark md:pb-4">
                <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                  <li>
                    <a href="/club" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      ASM's History
                    </a>
                  </li>
                  <li>
                    <a href="/legends" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      Legend Players
                    </a>
                  </li>
                  <li>
                    <a href="/trophies" onClick={closeDropdown} className="text-black hover:text-blue-900 hover:font-bold">
                      Trophies
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
            Blog
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
            <span className="font-custom text-white">{profile.username}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 relative">
            <a
              href='/settings'
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:animate-rotate-y"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </a>
            {isTooltipVisible && (
              <div
                role="tooltip"
                className="absolute z-10 mt-20 px-3 py-2 text-sm font-medium text-yellow-400 bg-blue-900 rounded-lg "
              >
                Settings
                <div className="absolute w-2 h-2 bg-blue-900 transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
              </div>
            )}
            {user ? (
              <Link
                onMouseEnter={() => setIsTooltipVisible1(true)}
                onMouseLeave={() => setIsTooltipVisible1(false)}
                href="/connexion"
                className="flex inline-block hover:animate-rotate-y"
              >
                <img
                  src={selectedAvatar}
                  className="w-20 h-15 rounded-full object-cover mb-4 bg-gray-200"
                />
              </Link>
            ) : (

              <Link
                onMouseEnter={() => setIsTooltipVisible1(true)}
                onMouseLeave={() => setIsTooltipVisible1(false)}
                href="/connexion"
                className="flex inline-block hover:animate-rotate-y"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Link>
            )}
            {isTooltipVisible1 && (
              <div
                role="tooltip"
                className="absolute z-10 mt-20 px-3 py-2 text-sm left-1/2 font-medium text-yellow-400 bg-blue-900 rounded-lg "
              >
                Register
                <div className="absolute w-2 h-2 bg-blue-900  transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}