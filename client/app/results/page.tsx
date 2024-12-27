"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

type Team = {
  id: string;
  team_name: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  rank: number;
  bonus_points: number;
  point_difference: number;
  logo_url: string;
};

type Match = {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  week_number: number;
};

export default function ResultsPage() {
  const [standings, setStandings] = useState<Team[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Utilisation de useRouter pour la navigation

  // Fetch data from Supabase
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const { data: standingsData, error: standingsError } = await supabase
          .from("standings")
          .select("*")
          .order("rank", { ascending: true });

        if (standingsError) {
          console.error("Error fetching standings:", standingsError.message);
        } else {
          setStandings(standingsData || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching standings:", err);
      }
    };

    const fetchUpcomingMatches = async () => {
      try {
        const { data: upcomingMatchesData, error: upcomingMatchesError } = await supabase
          .from("matches")
          .select("*")
          .eq("week_number", 13) // Prochaines rencontres
          .order("match_date", { ascending: true });

        if (upcomingMatchesError) {
          console.error("Error fetching upcoming matches:", upcomingMatchesError.message);
        } else {
          setUpcomingMatches(upcomingMatchesData || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching upcoming matches:", err);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchStandings();
      await fetchUpcomingMatches();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Top 14 Results & Standings</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {/* Classement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Standings</h2>
            <table className="w-full bg-white text-black rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Logo</th>
                  <th className="p-3 text-left">Team</th>
                  <th className="p-3 text-left">Matches Played</th>
                  <th className="p-3 text-left">Wins</th>
                  <th className="p-3 text-left">Losses</th>
                  <th className="p-3 text-left">Draws</th>
                  <th className="p-3 text-left">Points</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-100">
                    <td className="p-3">{team.rank}</td>
                    <td className="p-3">
                      <img
                        src={team.logo_url}
                        alt={`${team.team_name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </td>
                    <td className="p-3">{team.team_name}</td>
                    <td className="p-3">{team.matches_played}</td>
                    <td className="p-3">{team.wins}</td>
                    <td className="p-3">{team.losses}</td>
                    <td className="p-3">{team.draws}</td>
                    <td className="p-3 font-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Prochaines rencontres */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Matches - Week 13</h2>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/clubs/${match.home_team.toLowerCase().replace(/\s/g, '-')}.png`}
                      alt={`${match.home_team} logo`}
                      className="w-10 h-10"
                    />
                    <span className="text-lg font-semibold text-black">{match.home_team}</span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-black">{match.away_team}</span>
                    <img
                      src={`/clubs/${match.away_team.toLowerCase().replace(/\s/g, '-')}.png`}
                      alt={`${match.away_team} logo`}
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bouton pour accéder aux matchs précédents */}
          <section className="mb-8">
            <button
              onClick={() => router.push("/rencontres")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Matchs précédents
            </button>
          </section>
        </>
      )}
    </main>
  );
}
