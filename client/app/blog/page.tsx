import React from 'react';

export const revalidate = 60;  // Optionnel : mettez `false` pour ne jamais régénérer automatiquement.

export default async function BlogPage() {
  let articles = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
      next: { revalidate: 60 }  // pour configurer une régénération toutes les 60 secondes
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    articles = await res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}
