"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import AOS from "aos";
import { supabase } from "../supabaseClient";

export default function HomePage() {
  const [user, setUser] = useState<any>(null); // Stocker l'utilisateur dans l'état
  const [userDetails, setUserDetails] = useState<any>(null); // Stocker les détails de l'utilisateur

  useEffect(() => {
    AOS.init(); // Initialisation des animations AOS

    // Fonction pour récupérer l'utilisateur et ses détails supplémentaires
    const getUser = async () => {
      try {
        // Récupère l'utilisateur connecté
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
          // Gestion propre des cas où aucune session n'est active
          console.warn("Aucun utilisateur connecté ou session manquante.");
          setUser(null);
        } else {
          setUser(authData.user); // Stocke l'utilisateur dans l'état

          // Récupérer les détails de l'utilisateur depuis la table 'users'
          const { data, error } = await supabase
            .from("users") // Assurez-vous que votre table s'appelle 'users'
            .select("*") // Sélectionner toutes les colonnes ou des colonnes spécifiques comme 'name', 'avatar', etc.
            .eq("id", authData.user.id) // Filtrer par l'ID de l'utilisateur connecté
            .single(); // On prend seulement un utilisateur, car il est censé être unique

          if (error) {
            console.error("Erreur lors de la récupération des détails de l'utilisateur:", error.message);
          } else {
            setUserDetails(data); // Stocke les détails supplémentaires dans l'état
          }
        }
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération de l'utilisateur", error);
        setUser(null); // Réinitialiser l'utilisateur en cas d'erreur
      }
    };

    getUser(); // Appel de la fonction pour récupérer l'utilisateur
  }, []);

  return (
    <main>
      <div className="grid place-items-start">
        <div className="mt-24 mx-2 text-center">
          <h1 className="mb-4 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-fade-left dark:text-white">
            Join the ASM Movement ! Support, Connect, Celebrate all together
          </h1>
          <p className="mb-6 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 animate-fade-left animate-delay-[400ms] dark:text-white">
            Here is the ASM website, the ultimate hub for the ultimate ASM fans! Stay connected with your ASM latest updates, engage with the community, and celebrate the spirit of the game together.
          </p>
          <div className="flex justify-center inline-block">
            <a
              href="/blog"
              className="w-3/12 h-1/12 inline-flex items-center justify-center px-5 py-3 mx-4 text-base font-medium rounded-lg text-center text-white animate-fade-left animate-delay-[800ms] hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              See the latest articles
              <svg
                className="arrow w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="/blog"
              className="w-3/12 h-1/12 inline-flex items-center justify-center px-5 py-3 mx-4 text-base font-medium rounded-lg text-center text-white animate-fade-left animate-delay-[1300ms] hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              See the legends of the club
              <svg
                className="arrow w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="/blog"
              className="w-3/12 h-1/12 inline-flex items-center justify-center px-5 py-3 mx-4 text-base font-medium rounded-lg text-center text-white animate-fade-left animate-delay-[1800ms] hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              See all the players
              <svg
                className="arrow w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 rounded-lg m-2 min-h-screen">
          {/* Last Match */}
          <div className="flex text-center items-center justify-center">
            <span
              data-aos="fade-up"
              data-aos-duration="1000"
              className="block max-w-sm p-6 rounded-lg"
            >
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">
                Last Match
              </h5>
              <p className="font-normal text-white">23 novembre 2024</p>
              <p className="font-normal text-white">16h30</p>
              <p className="font-normal text-white">Stade Marcel Deflandre</p>
              <span className="grid grid-cols-3 m-2">
                <div>
                  <Image
                    src="/assets/stade-rochelais-logo.png"
                    width={120}
                    height={90}
                    alt="stade-rochelais-logo"
                  />
                </div>
                <div className="flex justify-center inline-block">
                  <p className="mb-2 text-xl tracking-tight text-white">22-</p>
                  <p className="mb-2 text-xl tracking-tight font-bold text-white">30</p>
                </div>
                <div>
                  <Image
                    src="/assets/Logo_ASM.svg"
                    width={120}
                    height={90}
                    alt="asm-logo"
                  />
                </div>
              </span>
              <a
                href="/blog"
                className="w-7/12 h-1/12 inline-flex items-center justify-center px-5 py-3 m-2 text-base font-medium rounded-lg text-center hover:text-white text-yellow-400 bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                See results
              </a>
            </span>
          </div>

          {/* Actual ASM Ranking */}
          <div className="flex items-center justify-center text-center">
            <span
              data-aos="fade-up"
              data-aos-duration="2000"
              className="block max-w-sm p-6 rounded-lg"
            >
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">
                Actual ASM Ranking
              </h5>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>
                      <span className="flex items-center text-white">Rank</span>
                    </th>
                    <th>
                      <span className="flex items-center text-white">Club</span>
                    </th>
                    <th>
                      <span className="flex items-center text-white">Victory</span>
                    </th>
                    <th>
                      <span className="flex items-center text-white">Points</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  <tr>
                    <td colSpan={4}>
                      <div className="flex justify-between text-center bg-white text-gray-800 p-2 m-2 rounded-lg">
                        <span className="text-lg font-bold">5</span>
                        <span>Castres</span>
                        <span>6</span>
                        <span>27</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <a href="/results">
                        <div className="flex justify-between text-center bg-blue-900 text-white p-2 m-2 rounded-lg hover:text-yellow-400 hover:font-bold">
                          <span className="text-lg font-bold">6</span>
                          <span className="flex justify-between">ASM</span>
                          <span className="text-center">6</span>
                          <span>27</span>
                        </div>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <div className="flex justify-between text-center bg-white text-gray-800 p-2 m-2 rounded-lg">
                        <span className="text-lg font-bold">7</span>
                        <span>Bayonne</span>
                        <span>6</span>
                        <span>26</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <div className="flex justify-between text-center bg-white text-gray-800 p-2 m-2 rounded-lg">
                        <span className="text-lg font-bold">8</span>
                        <span>Racing 92</span>
                        <span>5</span>
                        <span>22</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>

          {/* Next Match */}
          <div className="flex text-center items-center justify-center">
            <span
              data-aos="fade-up"
              data-aos-duration="3000"
              className="block max-w-sm p-6 rounded-lg"
            >
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">
                Next Match
              </h5>
              <p className="font-normal text-white">30 novembre 2024</p>
              <p className="font-normal text-white">16h30</p>
              <p className="font-normal text-white">Stade Marcel-Michelin</p>
              <span className="grid grid-cols-3 m-2">
                <div>
                  <Image
                    src="/assets/Logo_ASM.svg"
                    width={120}
                    height={90}
                    alt="asm-logo"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xl font-bold tracking-tight text-white">-</p>
                </div>
                <div>
                  <Image
                    src="/assets/Castres_Olympique.svg"
                    width={120}
                    height={90}
                    alt="castres-olympique-logo"
                  />
                </div>
              </span>
              <a
                href="/blog"
                className="w-7/12 h-1/12 inline-flex items-center justify-center px-5 py-3 m-2 text-base font-medium rounded-lg text-center hover:text-white text-yellow-400 hover:border-white hover:border-yellow-400 bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                See the team roster
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
