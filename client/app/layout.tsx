"use client"

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="bg-gradient-to-t from-yellow-400 via-blue-600 to-blue-900">
        <Navbar />
        <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
