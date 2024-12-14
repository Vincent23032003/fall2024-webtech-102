'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '../../../utils/supabaseClient'  
import React from 'react';

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erreur d\'authentification:', error.message)
          router.push('/connexion')
          return
        }

        if (session) {
          router.push('/settings')
        }
      } catch (error) {
        console.error('Erreur:', error)
        router.push('/connexion')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Authentification en cours...</h2>
      </div>
    </div>
  )
}