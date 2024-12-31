"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

type Match = {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  week_number: number;
};

export default function PreviousMatchesPage() {
  const [previousMatches, setPreviousMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  // Fetch data from Supabase
  useEffect(() => {
    const fetchPreviousMatches = async () => {
      try {
        const { data: matchesData, error: matchesError } = await supabase
          .from("matches")
          .select("*")
          .lt("week_number", 13)
          .order("week_number", { ascending: false })
          .order("match_date", { ascending: true });

        if (matchesError) {
          console.error("Error fetching previous matches:", matchesError.message);
        } else {
          setPreviousMatches(matchesData || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching previous matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousMatches();
  }, []);


  const matchesByWeek = previousMatches.reduce((acc: { [key: number]: Match[] }, match) => {
    if (!acc[match.week_number]) {
      acc[match.week_number] = [];
    }
    acc[match.week_number].push(match);
    return acc;
  }, {});

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Previous games</h1>

      {loading ? (
        <p className="h-screen text-white">Loading...</p>
      ) : previousMatches.length === 0 ? (
        <p className="h-screen text-white">No matches found for previous weeks.</p>
      ) : (
        Object.entries(matchesByWeek).map(([weekNumber, matches]) => (
          <section key={weekNumber} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Week {weekNumber} on 26
            </h2>
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/clubs/${match.home_team.toLowerCase().replace(/\s/g, '-')}.png`}
                      alt={`${match.home_team} logo`}
                      className="w-10 h-10"
                    />
                    <span className="text-lg font-semibold text-black">{match.home_team}</span>
                  </div>
                  <span className="text-gray-700 font-bold">
                    {match.home_score !== null && match.away_score !== null
                      ? `${match.home_score} - ${match.away_score}`
                      : "À venir"}
                  </span>
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

        ))
      )}
      <div className="mb-8">
        <button
          onClick={() => router.push("/results")}
          className="w-2/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
        >
          Back to results
        </button>
      </div>
    </main>
  );
}
