"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import AOS from "aos";
import { supabase } from "../supabaseClient";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [lastMatch, setLastMatch] = useState<any>(null);
  const [nextMatch, setNextMatch] = useState<any>(null);
  const [asmRanking, setAsmRanking] = useState<any>(null);

  useEffect(() => {
    AOS.init();

    const getUser = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
          console.warn("Aucun utilisateur connecté ou session manquante.");
          setUser(null);
        } else {
          setUser(authData.user);

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id);

          if (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error.message);
          } else if (data.length === 0) {
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                id: authData.user.id,
                email: authData.user.email,
                created_at: new Date(),
              })
              .select()
              .single();

            if (insertError) {
              console.error("Erreur lors de la création de l’utilisateur :", insertError.message);
            } else {
              setUserDetails(newUser);
            }
          } else {
            setUserDetails(data[0]);
          }
        }
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération de l'utilisateur", error);
        setUser(null);
      }
    };

    const fetchLastMatch = async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .or(`home_team.eq.Clermont,away_team.eq.Clermont`)
        .not("home_score", "is", null)
        .order("match_date", { ascending: false })
        .limit(1);

      if (error) console.error("Erreur lors de la récupération du dernier match :", error);
      else setLastMatch(data[0]);
    };

    const fetchNextMatch = async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .or(`home_team.eq.Clermont,away_team.eq.Clermont`)
        .is("home_score", null)
        .order("match_date", { ascending: true })
        .limit(1);

      if (error) console.error("Erreur lors de la récupération du prochain match :", error);
      else setNextMatch(data[0]);
    };

    const fetchAsmRanking = async () => {
      const { data, error } = await supabase
        .from("standings")
        .select("*")
        .order("rank", { ascending: true });

      if (error) console.error("Erreur lors de la récupération du classement :", error);
      else {
        const asmPosition = data.findIndex((team) => team.team_name === "Clermont");
        if (asmPosition !== -1) {
          const aboveTeam = data[asmPosition - 1] || null;
          const asmTeam = data[asmPosition];
          const belowTeam = data[asmPosition + 1] || null;

          setAsmRanking({ above: aboveTeam, asm: asmTeam, below: belowTeam });
        }
      }
    };

    getUser();
    fetchLastMatch();
    fetchNextMatch();
    fetchAsmRanking();
  }, []);

  const getTeamLogo = (teamName: string) => {
    return `/clubs/${teamName.toLowerCase().replace(/\s/g, "-")}.png`;
  };

  return (
    <main>
      <div className="grid place-items-start flex justify-center">
        <div className="mt-24 mx-2 text-center">
          <h1 className="mb-4 mt-10 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-left dark:text-white">
            Join the ASM Movement ! Support, Connect, Celebrate all together
          </h1>
          <p className="mb-6 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 animate-fade-left animate-delay-[400ms] dark:text-white">
            Here is the ASM website, the ultimate hub for the ASM fans! Stay connected with your ASM latest updates, engage with the community, and celebrate the spirit of the game together.
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
              href="/legends"
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
              href="/team"
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
      </div>
      <div className="grid grid-cols-3 gap-4 rounded-lg min-h-screen">
        <div className="flex text-center items-center justify-center">
          <span data-aos="fade-up" data-aos-duration="1000" className="block p-6 rounded-lg">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">Last Match</h5>
            {lastMatch ? (
              <>
                <p className="font-normal text-white">{new Date(lastMatch.match_date).toLocaleDateString()}</p>
                <span className="grid grid-cols-3 m-2">
                  <div>
                    <Image
                      src={getTeamLogo(lastMatch.home_team)}
                      width={120}
                      height={90}
                      alt={`${lastMatch.home_team}-logo`}
                    />
                  </div>
                  <div className="flex justify-center inline-block">
                    <p className="mb-2 text-xl tracking-tight text-white">
                      {lastMatch.home_score} - {lastMatch.away_score}
                    </p>
                  </div>
                  <div>
                    <Image
                      src={getTeamLogo(lastMatch.away_team)}
                      width={300}
                      height={90}
                      alt={`${lastMatch.away_team}-logo`}
                    />
                  </div>
                </span>
                <a href="/results"
                  className="w-1/2 h-1/12 inline-flex items-center justify-center px-5 py-3 mx-4 text-base font-medium rounded-lg text-center text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                  See results
                </a>
              </>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </span>
        </div>


        <div className="flex items-center justify-center text-center">
          <span data-aos="fade-up" data-aos-duration="2000" className="block max-w-sm p-6 rounded-lg">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">Actual ASM Ranking</h5>
            {asmRanking ? (
              <table className="w-full border-separate border-spacing-y-3">
                <thead className="text-white text-xl">
                  <tr>
                    <th className="py-2">Rank</th>
                    <th className="py-2">Club</th>
                    <th className="py-2">Victory</th>
                    <th className="py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {asmRanking.above && (
                    <tr className="text-white text-lg rounded-lg">
                      <td className="py-2 px-4 text-center">{asmRanking.above.rank}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.above.team_name}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.above.wins}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.above.points}</td>
                    </tr>
                  )}
                  <tr className="bg-blue-900 text-lg text-white rounded-lg hover:text-yellow-400">
                    <td className="py-2 px-4 text-center font-bold">{asmRanking.asm.rank}</td>
                    <td className="py-2 px-4 text-center font-bold">{asmRanking.asm.team_name}</td>
                    <td className="py-2 px-4 text-center font-bold">{asmRanking.asm.wins}</td>
                    <td className="py-2 px-4 text-center font-bold">{asmRanking.asm.points}</td>
                  </tr>
                  {asmRanking.below && (
                    <tr className="text-white text-lg rounded-lg">
                      <td className="py-2 px-4 text-center">{asmRanking.below.rank}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.below.team_name}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.below.wins}</td>
                      <td className="py-2 px-4 text-center">{asmRanking.below.points}</td>
                    </tr>
                  )}
                </tbody>
              </table>

            ) : (
              <p className="text-white">Loading...</p>
            )}
          </span>
        </div>


        <div className="flex text-center items-center justify-center">
          <span data-aos="fade-up" data-aos-duration="3000" className="block max-w-sm p-6 rounded-lg">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">Next Match</h5>
            {nextMatch ? (
              <>
                <p className="font-normal text-white">{new Date(nextMatch.match_date).toLocaleDateString()}</p>
                <span className="grid grid-cols-3 m-2">
                  <div>
                    <Image
                      src={getTeamLogo(nextMatch.home_team)}
                      width={300}
                      height={90}
                      alt={`${nextMatch.home_team}-logo`}
                    />
                  </div>
                  <div className="flex justify-center inline-block">
                    <p className="mb-2 text-xl tracking-tight text-white">-</p>
                  </div>
                  <div>
                    <Image
                      src={getTeamLogo(nextMatch.away_team)}
                      width={120}
                      height={90}
                      alt={`${nextMatch.away_team}-logo`}
                    />
                  </div>
                </span>
                <a href="/results"
                  className="w-3/4 h-1/12 inline-flex items-center justify-center px-5 py-3 mx-4 text-base font-medium rounded-lg text-center text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                  See results
                </a>
              </>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </span>
        </div>
      </div>
    </main>
  );
}