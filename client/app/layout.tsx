"use client"

import Footer from '../components/AppFooter';
import Navbar from '../components/AppNavbar';
import '../styles/globals.css';
import React, { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <div className="h-full w-full bg-gradient-to-t from-yellow-400 via-blue-600 to-blue-900">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
