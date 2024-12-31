"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import { UUID } from "crypto";
import { User } from "@supabase/supabase-js";

type Article = {
  id: string;
  title: string;
  description: string;
  authorid: UUID;
  likes: number;
  comment_count: number;
  created_date: string;
  users: {
    username: string;
  };
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const articlesPerPage = 5;


  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);
    };

    checkUser();
  }, []);


  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * articlesPerPage;

        const { data, error, count } = await supabase
          .from("articles")
          .select(
            `
            id,
            title,
            description,
            authorid,
            likes,
            created_date,
            users (username),
            comments (id)
          `,
            { count: "exact" }
          )
          .order("created_date", { ascending: false })
          .range(offset, offset + articlesPerPage - 1);

        if (error) {
          console.error("Error retrieving items :", error.message);
          setError("Unable to load items. Please try again later.");
          return;
        }

        const articlesWithCommentCount = (data || []).map((article) => ({
          ...article,
          comment_count: article.comments ? article.comments.length : 0,
          users: Array.isArray(article.users) ? article.users[0] : article.users || { username: "Unknown" },
        }));

        setArticles(articlesWithCommentCount as Article[]);
        setTotalPages(Math.ceil((count ?? 0) / articlesPerPage));
      } catch (error) {
        console.error("Unexpected error when retrieving items:", error);
        setError("Unable to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleWriteArticle = () => {
    router.push("/blog/new");
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white">Blog</h1>
        <span className="relative">
          {user ? (
            <div className="flex justify-between">
              <button
                className="text-white px-4 hover:animate-rotate-y"
                onClick={() => setShowSearch(!showSearch)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-11"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <button
                onClick={handleWriteArticle}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
                className="text-white px-4 hover:animate-rotate-y"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-11"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <p
              className="text-lg text-white cursor-pointer hover:underline"
              onClick={() => router.push("/connexion")}
            >
              Login to write an article.
            </p>

          )}
          {isTooltipVisible && (
            <div
              role="tooltip"
              className="absolute z-10 left-1/2 mt-2 px-3 py-2 text-sm font-medium text-yellow-400 bg-blue-900 rounded-lg "
            >
              Write a new article !
              <div className="absolute w-2 h-2 bg-blue-900 transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
            </div>
          )}
        </span>
      </div>
      <div className="mb-4">
        {showSearch && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
      {loading ? (
        <p className="h-screen text-white text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : articles.length === 0 ? (
        <p className="text-white">No items available at the moment.</p>
      ) : (
        <div className="space-y-8">
          {articles
            .filter(
              (article) =>
                searchTerm === "" || article.title.toLowerCase().includes(searchTerm)
            )
            .map((article) => (
              <div
                key={article.id}
                className="p-6 bg-white shadow-md rounded-lg animate-fade-up animate-once"
              >
                <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
                <p className="text-sm text-gray-500">
                  Publish on{" "}
                  {new Date(article.created_date).toLocaleDateString()} par{" "}
                  {article.users?.username || "Auteur inconnu"}
                </p>
                <p className="mt-4 text-gray-700">
                  {article.description.slice(0, 150)}...
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-red-600">
                      {article.likes}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </span>
                    <span className="flex items-center text-gray-600">
                      {article.comment_count}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 8.511c.884.636 1.5 1.67 1.5 2.864 0 1.87-1.64 3.375-3.75 3.375-.367 0-.72-.053-1.054-.15-.615.59-1.75 1.02-3.196 1.11-.24.014-.48.021-.723.021-.606 0-1.203-.04-1.785-.117-.617-.08-1.2-.212-1.737-.39C5.964 13.641 4.5 12.35 4.5 10.875c0-1.019.538-1.941 1.38-2.511-.045-.26-.078-.524-.097-.79C5.736 5.53 7.117 4.5 8.25 4.5c.676 0 1.296.243 1.768.648.678-.136 1.41-.148 2.122-.037.528.08 1.044.222 1.535.42A3.792 3.792 0 0 1 16.5 3c1.06 0 2.01.516 2.55 1.313.624.903.975 2.093.675 3.273a4.296 4.296 0 0 1 .525.425Z"
                        />
                      </svg>
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/articles/${article.id}`)}
                    className="w-2/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                  >
                    Read the article
                  </button>
                  {user?.id === article.authorid && (
                    <>
                      <button
                        onClick={() => router.push(`/blog/edit/${article.id}`)}
                        className="w-2/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                      >
                        Modify
                      </button>
                      <button
                        onClick={async () => {
                          const confirmDelete = confirm(
                            "Voulez-vous vraiment supprimer cet article ?"
                          );
                          if (confirmDelete) {
                            const { error } = await supabase
                              .from("articles")
                              .delete()
                              .eq("id", article.id);

                            if (!error) {
                              setArticles((prev) =>
                                prev.filter((a) => a.id !== article.id)
                              );
                            }
                          }
                        }}
                        className="w-2/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              className={`flex items-center justify-center w-1/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg ${currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-yellow-400 border hover:border-yellow-400 border-2"
                }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-xl font-bold text-white">
              Page {currentPage} on {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`flex items-center justify-center w-1/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg ${currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-yellow-400 border hover:border-yellow-400 border-2"
                }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}  