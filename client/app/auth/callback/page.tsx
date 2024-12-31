'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import React from 'react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Authentication error:', error.message)
          router.push('/connexion')
          return
        }

        if (session) {
          console.log('User session:', session)
          router.push('/settings') // Redirect after successful login
        } else {
          console.warn('No session found')
          router.push('/connexion') // Redirect if no session is found
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        router.push('/connexion')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Authentification en cours...</h2>
        <p className="text-gray-600">Veuillez patienter pendant que nous vérifions vos informations.</p>
      </div>
    </div>
  )
}
