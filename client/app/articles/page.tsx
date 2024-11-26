// app/articles/page.tsx
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import React from 'react'

async function getArticles() {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
    
    if (error) {
      console.error('Supabase error details:', error)
      return []
    }

    if (!articles) {
      console.log('No articles found')
      return []
    }

    return articles
  } catch (e) {
    console.error('Unexpected error:', e)
    return []
  }
}

export default async function Articles() {
  const articles = await getArticles()

  // Ajout d'un message si pas d'articles
  if (!articles.length) {
    return (
      <div>
        <h1>Articles</h1>
        <p>Aucun article disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <Link href={`/articles/${article.id}`}>
              Lire la suite
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export const dynamic = 'force-static'