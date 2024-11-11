// components/Header.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer le profil
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="header">
      <h1>My Application</h1>
      <nav>
        {userProfile ? (
          <div className="user-profile">
            <img src="/account-icon.png" alt="Account Icon" className="account-icon" />
            <span>{userProfile.username}</span>
          </div>
        ) : (
          <p>{error || 'Not logged in'}</p>
        )}
      </nav>
    </header>
  );
}
